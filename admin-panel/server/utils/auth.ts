import type { H3Event } from 'h3'
import { getCookie, deleteCookie, createError } from 'h3'
import { prisma } from '../../lib/prisma'

/**
 * 현재 사용자 정보 타입 정의
 */
export interface CurrentUser {
  id: string
  email: string
  dept_id: string
  role_id: string
  dept_code: string
  dept_name: string
  role_name: string
  role_level: number
}

/**
 * 쿠키에서 세션 ID를 읽고 유효한 세션과 사용자 정보를 반환
 * @param event H3Event 객체
 * @returns 사용자 정보 또는 null
 */
export async function getSession(event: H3Event): Promise<CurrentUser | null> {
  try {
    // 쿠키에서 세션 ID 가져오기
    const sessionId = getCookie(event, 'session-id')

    if (!sessionId) {
      return null
    }

    // 세션과 사용자 정보를 조인해서 가져오기
    const session = await prisma.sessions.findFirst({
      where: {
        id: sessionId,
        expires_at: {
          gt: new Date(), // 만료되지 않은 세션만
        },
      },
      include: {
        admin_users: {
          include: {
            departments: true,
            roles: true,
          },
        },
      },
    })

    if (!session || !session.admin_users.is_active) {
      return null
    }

    const user = session.admin_users

    return {
      id: user.id.toString(),
      email: user.email,
      dept_id: user.dept_id.toString(),
      role_id: user.role_id.toString(),
      dept_code: user.departments.code,
      dept_name: user.departments.name,
      role_name: user.roles.name,
      role_level: user.roles.level,
    }
  } catch (error) {
    console.error('세션 조회 오류:', error)
    return null
  }
}

/**
 * 로그인이 필요한 API에서 사용. 인증되지 않은 경우 401 에러 반환
 * @param event H3Event 객체
 * @returns 현재 사용자 정보
 * @throws 401 Unauthorized
 */
export async function requireAuth(event: H3Event): Promise<CurrentUser> {
  const user = await getSession(event)

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: '로그인이 필요합니다.',
    })
  }

  return user
}

/**
 * 특정 역할 레벨 이상이 필요한 API에서 사용
 * @param event H3Event 객체
 * @param minLevel 최소 요구 레벨
 * @returns 현재 사용자 정보
 * @throws 401 Unauthorized 또는 403 Forbidden
 */
export async function requireRole(
  event: H3Event,
  minLevel: number
): Promise<CurrentUser> {
  const user = await requireAuth(event)

  if (user.role_level < minLevel) {
    throw createError({
      statusCode: 403,
      statusMessage: '권한이 부족합니다.',
    })
  }

  return user
}

/**
 * 특정 부서만 접근 가능한 API에서 사용
 * @param event H3Event 객체
 * @param departmentCode 허용할 부서 코드
 * @returns 현재 사용자 정보
 * @throws 401 Unauthorized 또는 403 Forbidden
 */
export async function requireDept(
  event: H3Event,
  departmentCode: string
): Promise<CurrentUser> {
  const user = await requireAuth(event)

  if (user.dept_code !== departmentCode) {
    throw createError({
      statusCode: 403,
      statusMessage: '해당 부서만 접근 가능합니다.',
    })
  }

  return user
}

/**
 * 세션 쿠키 제거
 * @param event H3Event 객체
 */
export function clearSessionCookie(event: H3Event): void {
  deleteCookie(event, 'session-id', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  })
}
