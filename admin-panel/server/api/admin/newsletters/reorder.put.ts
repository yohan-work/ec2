import { prisma } from '../../../../lib/prisma'
import { getAdminUserByCognitoId } from '../../../utils/auth'

export default defineEventHandler(async event => {
  try {
    const body = await readBody(event)
    const { newsletters, cognito_user_id } = body

    if (!newsletters || !Array.isArray(newsletters)) {
      throw createError({
        statusCode: 400,
        statusMessage: '뉴스레터 목록이 필요합니다.',
      })
    }

    // 사용자 인증
    let user = null
    if (cognito_user_id) {
      try {
        user = await getAdminUserByCognitoId(cognito_user_id)
      } catch (error) {
        console.warn('사용자 인증 실패:', error)
      }
    }

    console.log('뉴스레터 순서 일괄 업데이트 시작:', newsletters.length, '개')

    // 트랜잭션으로 모든 순서를 한 번에 업데이트
    await prisma.$transaction(async tx => {
      for (let i = 0; i < newsletters.length; i++) {
        const newsletter = newsletters[i]
        const newOrder = i + 1

        await tx.newsletters.update({
          where: {
            id: BigInt(newsletter.id),
            status: 'published', // 발행된 뉴스레터만 업데이트
          },
          data: {
            display_order: newOrder,
            updated_at: new Date(),
          },
        })

        console.log(`뉴스레터 ID ${newsletter.id}: 순서 ${newOrder}로 업데이트`)
      }
    })

    // 감사 로그 기록
    if (user) {
      await prisma.audit_logs.create({
        data: {
          user_id: user.id,
          entity: 'newsletters',
          entity_id: BigInt(0), // 일괄 업데이트이므로 0으로 설정
          action: 'update',
          changes: {
            action: 'bulk_reorder',
            count: newsletters.length,
            newsletter_ids: newsletters.map(n => n.id),
          },
        },
      })
    }

    return {
      success: true,
      message: '뉴스레터 순서가 성공적으로 변경되었습니다.',
      updated_count: newsletters.length,
    }
  } catch (error: any) {
    console.error('뉴스레터 순서 일괄 업데이트 실패:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: '뉴스레터 순서 변경 중 오류가 발생했습니다.',
    })
  }
})
