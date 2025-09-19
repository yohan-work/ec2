import { prisma } from '~/lib/prisma'

/**
 * 클라이언트 IP 주소 추출
 */
function getClientIp(event: any): string {
  let ip = ''

  // X-Forwarded-For 헤더에서 IP 추출 (프록시 환경)
  const forwardedFor = event.node.req.headers['x-forwarded-for']
  if (forwardedFor) {
    const ips = forwardedFor.split(',').map((ip: string) => ip.trim())
    ip = ips[0]
  }
  // X-Real-IP 헤더에서 IP 추출
  else if (event.node.req.headers['x-real-ip']) {
    ip = event.node.req.headers['x-real-ip']
  }
  // 직접 연결인 경우
  else {
    ip = event.node.req.socket.remoteAddress || '127.0.0.1'
  }

  // IPv4-mapped IPv6 주소 처리 (::ffff:10.50.104.74 -> 10.50.104.74)
  if (ip.startsWith('::ffff:')) {
    return ip.substring(7)
  }

  return ip
}

/**
 * IP 주소가 지정된 범위에 있는지 확인
 */
function isIpInRange(
  clientIp: string,
  networkIp: string,
  subnetMask: number | null
): boolean {
  // IPv4-mapped IPv6 주소 처리
  if (clientIp.startsWith('::ffff:')) {
    clientIp = clientIp.substring(7)
  }

  if (!subnetMask) {
    // 서브넷 마스크가 없으면 정확히 일치하는지 확인
    return clientIp === networkIp
  }

  try {
    const clientIpNum = ipToNumber(clientIp)
    const networkIpNum = ipToNumber(networkIp)

    // 서브넷 마스크를 이용해 네트워크 주소 계산
    const mask = (0xffffffff << (32 - subnetMask)) >>> 0
    const networkAddress = (networkIpNum & mask) >>> 0

    // 클라이언트 IP가 같은 네트워크에 있는지 확인
    return (clientIpNum & mask) === networkAddress
  } catch (error) {
    console.error('IP 범위 확인 중 오류:', error)
    return false
  }
}

/**
 * IP 주소를 숫자로 변환
 */
function ipToNumber(ip: string): number {
  const parts = ip.split('.').map(Number)
  if (parts.length !== 4 || parts.some(part => part < 0 || part > 255)) {
    throw new Error(`Invalid IP address: ${ip}`)
  }
  return (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]
}

/**
 * IP 주소가 허용된 범위에 있는지 확인
 */
async function isIpAllowed(clientIp: string): Promise<boolean> {
  // localhost는 항상 허용
  if (
    clientIp === '127.0.0.1' ||
    clientIp === '::1' ||
    clientIp === 'localhost'
  ) {
    return true
  }

  // 개발 모드에서 10.50.104.0/24 대역 허용
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'dev'
  ) {
    if (isIpInRange(clientIp, '10.50.104.0', 24)) {
      return true
    }
  }

  try {
    // 활성화된 IP 규칙들을 조회
    const allowedIps = await (prisma as any).dms_ip_access_control.findMany({
      where: {
        is_active: true,
      },
      select: {
        ip_address: true,
        subnet_mask: true,
      },
    })

    // 각 IP 규칙에 대해 클라이언트 IP가 허용 범위에 있는지 확인
    for (const rule of allowedIps) {
      if (isIpInRange(clientIp, rule.ip_address, rule.subnet_mask)) {
        return true
      }
    }

    return false
  } catch (error) {
    console.error('IP 접근 제어 확인 중 오류:', error)
    // 오류 발생 시 보안을 위해 차단
    return false
  }
}

export default defineEventHandler(async event => {
  try {
    const clientIp = getClientIp(event)
    const allowed = await isIpAllowed(clientIp)

    return {
      allowed,
      clientIp,
    }
  } catch (error) {
    console.error('IP 접근 제어 확인 중 오류:', error)

    // 오류 발생 시 보안을 위해 차단
    return {
      allowed: false,
      clientIp: '알 수 없음',
    }
  }
})
