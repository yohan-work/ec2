import { prisma } from '../../../../lib/prisma'

export default defineEventHandler(async event => {
  try {
    // TODO: 인증 검증 추가 필요

    const id = getRouterParam(event, 'id')

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID가 필요합니다.',
      })
    }

    // 기존 뉴스레터 확인
    const existingNewsletter = await prisma.newsletters.findUnique({
      where: { id: BigInt(id) },
    })

    if (!existingNewsletter) {
      throw createError({
        statusCode: 404,
        statusMessage: '뉴스레터를 찾을 수 없습니다.',
      })
    }

    // 관리자는 모든 상태의 뉴스레터를 삭제할 수 있음
    // 발행 중인 뉴스레터 삭제 시에는 audit log에 추가 정보 기록

    // 뉴스레터 삭제
    await prisma.newsletters.delete({
      where: { id: BigInt(id) },
    })

    // 발행된 뉴스레터였다면 순서 재정렬
    if (
      existingNewsletter.status === 'published' &&
      existingNewsletter.display_order &&
      existingNewsletter.display_order > 0
    ) {
      console.log(
        `발행된 뉴스레터 삭제 - 순서 재정렬 시작. 삭제된 순서: ${existingNewsletter.display_order}`
      )

      // 삭제된 뉴스레터보다 순서가 높은 뉴스레터들의 순서를 1씩 감소
      await prisma.newsletters.updateMany({
        where: {
          status: 'published',
          display_order: {
            gt: existingNewsletter.display_order,
          },
        },
        data: {
          display_order: {
            decrement: 1,
          },
        },
      })

      console.log('순서 재정렬 완료')
    }

    // audit log 기록
    await prisma.audit_logs.create({
      data: {
        user_id: existingNewsletter.author_id,
        entity: 'newsletters',
        entity_id: BigInt(id),
        action: 'delete',
        changes: {
          title: existingNewsletter.title,
          status: existingNewsletter.status,
          display_order: existingNewsletter.display_order,
        },
      },
    })

    return {
      success: true,
      message: '뉴스레터가 성공적으로 삭제되었습니다.',
    }
  } catch (error: any) {
    console.error('뉴스레터 삭제 오류:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: '뉴스레터 삭제 중 오류가 발생했습니다.',
    })
  }
})
