import { prisma } from '~/lib/prisma'

export interface HistoryLogData {
  admin_name: string
  employee_id?: number
  menu_name: string
  action_type: 'Insert' | 'Update' | 'Delete'
  details: string
  ip_address: string
}

/**
 * DMS 변경 히스토리를 기록하는 함수
 */
export async function logDmsHistory(data: HistoryLogData) {
  try {
    await prisma.dms_change_history.create({
      data: {
        admin_name: data.admin_name,
        employee_id: data.employee_id || null,
        menu_name: data.menu_name,
        action_type: data.action_type,
        details: data.details,
        ip_address: data.ip_address,
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

  if (cfConnectingIP) return cfConnectingIP
  if (realIP) return realIP
  if (forwarded) return forwarded.split(',')[0].trim()

  return '127.0.0.1' // 기본값
}

/**
 * 메뉴명 매핑 함수
 */
export function getMenuName(path: string): string {
  const menuMap: Record<string, string> = {
    '/dms/manage-clients': '고객사 관리',
    '/dms/manage-employees': '직원 관리',
    '/dms/manage-organizations': '조직 관리',
    '/dms/manage-permissions': '권한 관리',
    '/dms/manage-users': '사용자 관리',
    '/dms/manage-access-control': '접근 제어 관리',
    '/dms/project-list': '프로젝트 목록',
    '/dms/project-revenue': '프로젝트 수익',
    '/dms/project-mm': '프로젝트 MM',
    '/dms/sso': 'SSO 관리',
    '/dms/staff-utility': '직원 유틸리티',
    '/dms/manage-history': '변경 히스토리',
  }

  return menuMap[path] || '알 수 없는 메뉴'
}
