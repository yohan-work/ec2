import { PrismaClient } from '@prisma/client'
import { getAdminUserByCognitoId } from '~/server/utils/auth'

const prisma = new PrismaClient()

export default defineEventHandler(async event => {
  try {
    // 요청 파라미터, 파싱
    const newsletterId = getRouterParam(event, 'id')
    const body = await readBody(event)

    if (!newsletterId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Newsletter ID is required',
      })
    }

    const { display_order, cognito_user_id } = body

    if (display_order === undefined || display_order === null) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Display order is required',
      })
    }

    // 사용자 인증 (기존 방식과 동일)
    let user = null
    if (cognito_user_id) {
      try {
        user = await getAdminUserByCognitoId(cognito_user_id)
      } catch (error) {
        console.warn('사용자 인증 실패, 계속 진행:', error)
      }
    }

    // 뉴스레터 존재 확인
    const existingNewsletter = await prisma.newsletters.findUnique({
      where: { id: BigInt(newsletterId) },
    })

    if (!existingNewsletter) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Newsletter not found',
      })
    }

    // 발행된 뉴스레터만 순서 변경 가능
    if (existingNewsletter.status !== 'published') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Only published newsletters can be reordered',
      })
    }

    // 순서 업데이트
    const updatedNewsletter = await prisma.newsletters.update({
      where: { id: BigInt(newsletterId) },
      data: {
        display_order: parseInt(display_order),
        updated_at: new Date(),
      } as any,
      include: {
        admin_users: {
          include: {
            departments: true,
          },
        },
      },
    })

    // 감사 로그 기록 (사용자가 있는 경우만)
    if (user) {
      await prisma.audit_logs.create({
        data: {
          user_id: user.id,
          entity: 'newsletters',
          entity_id: BigInt(newsletterId),
          action: 'update',
          changes: JSON.stringify({
            display_order: {
              old: (existingNewsletter as any).display_order,
              new: parseInt(display_order),
            },
          }),
        },
      })
    }

    return {
      success: true,
      message: '뉴스레터 순서가 성공적으로 변경되었습니다.',
      data: {
        ...updatedNewsletter,
        id: updatedNewsletter.id.toString(),
        author_id: updatedNewsletter.author_id.toString(),
      },
    }
  } catch (error: any) {
    console.error('뉴스레터 순서 변경 실패:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  } finally {
    await prisma.$disconnect()
  }
})
