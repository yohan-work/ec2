import { getCookie, createError } from 'h3'
import { prisma } from '../../../lib/prisma'
import { clearSessionCookie } from '../../utils/auth'

/**
 * 로그아웃 응답 타입 정의
 */
interface LogoutResponse {
  success: boolean
  message: string
}

/**
 * 관리자 로그아웃 API
 */
export default defineEventHandler(async event => {
  try {
    const sessionId = getCookie(event, 'session-id')

    if (!sessionId) {
      throw createError({
        statusCode: 400,
        statusMessage: '로그인 세션이 없습니다.',
      })
    }

    try {
      await prisma.sessions.delete({
        where: {
          id: sessionId,
        },
      })
    } catch (error) {
      console.warn('세션 삭제 중 오류 (이미 삭제되었을 수 있음):', error)
    }

    clearSessionCookie(event)

    const response: LogoutResponse = {
      success: true,
      message: '로그아웃이 완료되었습니다.',
    }

    return response
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    console.error('로그아웃 처리 중 오류:', error)

    try {
      clearSessionCookie(event)
    } catch (cookieError: unknown) {
      console.error('쿠키 제거 중 오류:', cookieError)
    }

    throw createError({
      statusCode: 500,
      statusMessage: '서버 내부 오류가 발생했습니다.',
    })
  }
})
