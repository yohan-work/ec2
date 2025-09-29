import { prisma } from '~/lib/prisma'
import { getCookie, getHeader } from 'h3'

export interface HistoryLogData {
  admin_name?: string // 선택사항으로 변경
  employee_id?: number
  menu_name: string
  action_type: 'Insert' | 'Update' | 'Delete'
  details: string
  ip_address?: string // 선택사항으로 변경
}

/**
 * 세션에서 관리자 정보를 가져오는 함수
 */
async function getAdminInfo(event: any) {
  try {
    // 쿠키에서 세션 정보 가져오기
    const sessionCookie = getCookie(event, 'dms_session')
    if (!sessionCookie) {
      console.log('세션 쿠키가 없습니다')
      return null
    }

    const sessionData = JSON.parse(sessionCookie)

    // 세션 만료 시간 체크 (8시간)
    const sessionExpiry = 8 * 60 * 60 * 1000
    const loginTime = new Date(sessionData.loginTime)
    const now = new Date()

    if (now.getTime() - loginTime.getTime() > sessionExpiry) {
      console.log('세션이 만료되었습니다')
      return null
    }

    // 쿠키에서 사용자 정보 직접 사용 (DB 조회 불필요)
    const result = {
      id: sessionData.id,
      email: sessionData.email,
      name: sessionData.name,
      employee_id: sessionData.employee_id,
    }
    return result
  } catch (error) {
    console.error('세션 정보 조회 오류:', error)
    return null
  }
}

/**
 * DMS 변경 히스토리를 기록하는 함수
 */
export async function logDmsHistory(data: HistoryLogData, event?: any) {
  try {
    // 세션에서 관리자 정보 가져오기
    let adminName = data.admin_name || 'System'
    let employeeId = data.employee_id
    let ipAddress = data.ip_address || '127.0.0.1'

    if (event) {
      const adminInfo = await getAdminInfo(event)
      if (adminInfo) {
        adminName = adminInfo.name
        employeeId = adminInfo.employee_id || employeeId
      } else {
        console.log('adminInfo가 null입니다')
      }

      // IP 주소 가져오기
      ipAddress = getClientIP(event)
    }

    await prisma.dms_change_history.create({
      data: {
        admin_name: adminName,
        employee_id: employeeId || null,
        menu_name: data.menu_name,
        action_type: data.action_type,
        details: data.details,
        ip_address: ipAddress,
      },
    })
  } catch (error) {
    console.error('히스토리 로깅 오류:', error)
    // 히스토리 로깅 실패는 메인 로직에 영향을 주지 않도록 에러를 던지지 않음
  }
}

/**
 * 클라이언트 IP 주소를 가져오는 함수
 */
export function getClientIP(event: any): string {
  const forwarded = getHeader(event, 'x-forwarded-for')
  const realIP = getHeader(event, 'x-real-ip')
  const cfConnectingIP = getHeader(event, 'cf-connecting-ip')
  const remoteAddr = getHeader(event, 'remote-addr')
  const clientIP = getHeader(event, 'client-ip')

  if (cfConnectingIP) return cfConnectingIP
  if (realIP) return realIP
  if (forwarded) return forwarded.split(',')[0].trim()
  if (remoteAddr) return remoteAddr
  if (clientIP) return clientIP

  return 'unknown' // 기본값
}

/**
 * 메뉴명 매핑 함수
 */
export function getMenuName(path: string): string {
  const menuMap: Record<string, string> = {
    '/dms/project-revenue': '프로젝트 수익',
    '/dms/project-mm': '프로젝트 MM',
    '/dms/sso': 'SSO 관리',
    '/dms/staff-utility': '직원 유틸리티',
    '/dms/project-list': '프로젝트 목록',
    '/dms/manage-employees': '직원 관리',
    '/dms/manage-clients': '고객사 관리',
    '/dms/manage-organizations': '조직 관리',
    '/dms/manage-users': '사용자 관리',
    '/dms/manage-permissions': '권한 관리',
    '/dms/manage-history': '변경 히스토리',
    '/dms/manage-access-control': '접근 제어',
  }

  return menuMap[path] || '알 수 없는 메뉴'
}
