import { createError } from 'h3'
import { requireAuth, type CurrentUser } from '../utils/auth'

/**
 * 현재 사용자 정보 조회 응답 타입 정의
 */
interface MeResponse {
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
 * 현재 로그인한 사용자 정보 조회 API
 */
export default defineEventHandler(async event => {
  try {
    const user: CurrentUser = await requireAuth(event)

    const response: MeResponse = {
      id: user.id,
      email: user.email,
      dept_id: user.dept_id,
      role_id: user.role_id,
      dept_code: user.dept_code,
      dept_name: user.dept_name,
      role_name: user.role_name,
      role_level: user.role_level,
    }

    return response
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    console.error('사용자 정보 조회 중 오류:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '서버 내부 오류가 발생했습니다.',
    })
  }
})
