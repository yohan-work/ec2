import { prisma } from '../../../../lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    // TODO: 인증 검증 추가 필요
    
    const id = getRouterParam(event, 'id')
    
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID가 필요합니다.'
      })
    }

    // 기존 뉴스레터 확인
    const existingNewsletter = await prisma.newsletters.findUnique({
      where: { id: BigInt(id) }
    })

    if (!existingNewsletter) {
      throw createError({
        statusCode: 404,
        statusMessage: '뉴스레터를 찾을 수 없습니다.'
      })
    }

    // 발행된 뉴스레터는 삭제 불가 (archived 상태로만 변경 가능)
    if (existingNewsletter.status === 'published') {
      throw createError({
        statusCode: 403,
        statusMessage: '발행된 뉴스레터는 삭제할 수 없습니다. 보관 처리해주세요.'
      })
    }

    // 뉴스레터 삭제
    await prisma.newsletters.delete({
      where: { id: BigInt(id) }
    })

    // audit log 기록
    await prisma.audit_logs.create({
      data: {
        user_id: existingNewsletter.author_id,
        entity: 'newsletters',
        entity_id: BigInt(id),
        action: 'delete',
        changes: {
          title: existingNewsletter.title,
          status: existingNewsletter.status
        }
      }
    })

    return {
      success: true,
      message: '뉴스레터가 성공적으로 삭제되었습니다.'
    }
  } catch (error: any) {
    console.error('뉴스레터 삭제 오류:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: '뉴스레터 삭제 중 오류가 발생했습니다.'
    })
  }
})
