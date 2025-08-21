import { prisma } from '../../lib/prisma'
import type { H3Event } from 'h3'

/**
 * AWS Cognito User ID로 실제 admin_users를 조회하는 함수
 */
export async function getAdminUserByCognitoId(cognitoUserId: string) {
  try {
    console.log('=== getAdminUserByCognitoId 시작 ===')
    console.log('조회할 Cognito User ID:', cognitoUserId)

    // 데이터베이스 연결 테스트
    console.log('Prisma 클라이언트 상태 확인 중...')

    const adminUser = await prisma.admin_users.findUnique({
      where: {
        cognito_id: cognitoUserId,
      },
      include: {
        departments: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
        roles: {
          select: {
            id: true,
            name: true,
            level: true,
          },
        },
      },
    })

    console.log(
      '데이터베이스 쿼리 결과:',
      adminUser ? '사용자 찾음' : '사용자 없음'
    )

    if (!adminUser) {
      console.log('ERROR: 사용자를 찾을 수 없음 - Cognito ID:', cognitoUserId)
      throw createError({
        statusCode: 404,
        statusMessage: '등록되지 않은 사용자입니다. 관리자에게 문의하세요.',
      })
    }

    if (!adminUser.is_active) {
      throw createError({
        statusCode: 403,
        statusMessage: '비활성화된 사용자입니다. 관리자에게 문의하세요.',
      })
    }

    return adminUser
  } catch (error: any) {
    console.error('=== Admin user lookup error ===')
    console.error('에러 타입:', error.constructor.name)
    console.error('에러 메시지:', error.message)
    console.error('에러 스택:', error.stack)
    console.error('에러 코드:', error.code)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: '사용자 정보를 조회하는 중 오류가 발생했습니다.',
    })
  }
}

/**
 * 요청에서 Cognito User ID를 추출하는 함수
 * TODO: 실제로는 JWT 토큰에서 추출해야 함
 */
export function getCognitoUserIdFromRequest(event: H3Event): string | null {
  // TODO: 실제 구현에서는 Authorization 헤더의 JWT 토큰을 파싱해서 sub (user id)를 추출해야 함
  // 현재는 임시로 body나 query에서 받아옴
  const body = event.context.body || {}
  const query = getQuery(event)

  return body.cognito_user_id || query.cognito_user_id || null
}

/**
 * 인증된 사용자 정보를 가져오는 미들웨어
 */
export async function requireAuth(event: H3Event) {
  const cognitoUserId = getCognitoUserIdFromRequest(event)

  if (!cognitoUserId) {
    throw createError({
      statusCode: 401,
      statusMessage: '인증이 필요합니다.',
    })
  }

  return await getAdminUserByCognitoId(cognitoUserId)
}
