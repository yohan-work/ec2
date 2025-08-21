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

    // 기존 채용공고 확인
    const existingRecruit = await prisma.recruits.findUnique({
      where: { id: BigInt(id) }
    })

    if (!existingRecruit) {
      throw createError({
        statusCode: 404,
        statusMessage: '채용공고를 찾을 수 없습니다.'
      })
    }

    // 공개된 채용공고는 삭제 불가 (closed 또는 archived 상태로만 변경 가능)
    if (existingRecruit.status === 'open') {
      throw createError({
        statusCode: 403,
        statusMessage: '공개된 채용공고는 삭제할 수 없습니다. 마감 처리해주세요.'
      })
    }

    // 채용공고 삭제
    await prisma.recruits.delete({
      where: { id: BigInt(id) }
    })

    // audit log 기록
    await prisma.audit_logs.create({
      data: {
        user_id: existingRecruit.editor_id,
        entity: 'recruits',
        entity_id: BigInt(id),
        action: 'delete',
        changes: {
          title: existingRecruit.title,
          employment_type: existingRecruit.employment_type,
          status: existingRecruit.status
        }
      }
    })

    return {
      success: true,
      message: '채용공고가 성공적으로 삭제되었습니다.'
    }
  } catch (error: any) {
    console.error('채용공고 삭제 오류:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: '채용공고 삭제 중 오류가 발생했습니다.'
    })
  }
})
