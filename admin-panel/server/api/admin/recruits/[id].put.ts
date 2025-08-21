import { prisma } from '../../../../lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    // TODO: 인증 검증 추가 필요
    
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID가 필요합니다.'
      })
    }

    const { title, description, location, employment_type, status, editor_id } = body

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

    // 상태 검증
    const validStatuses = ['draft', 'open', 'closed', 'archived']
    if (status && !validStatuses.includes(status)) {
      throw createError({
        statusCode: 400,
        statusMessage: '올바른 상태값이 아닙니다.'
      })
    }

    // 고용형태 검증
    const validEmploymentTypes = ['fulltime', 'contract', 'intern', 'parttime']
    if (employment_type && !validEmploymentTypes.includes(employment_type)) {
      throw createError({
        statusCode: 400,
        statusMessage: '올바른 고용형태가 아닙니다.'
      })
    }

    // 업데이트 데이터 구성
    const updateData: any = {}
    const changes: any = {}

    if (title !== undefined) {
      updateData.title = title
      changes.title = { from: existingRecruit.title, to: title }
    }

    if (description !== undefined) {
      updateData.description = description
      changes.description = { changed: true }
    }

    if (location !== undefined) {
      updateData.location = location
      changes.location = { from: existingRecruit.location, to: location }
    }

    if (employment_type !== undefined) {
      updateData.employment_type = employment_type
      changes.employment_type = { from: existingRecruit.employment_type, to: employment_type }
    }

    if (status !== undefined) {
      updateData.status = status
      changes.status = { from: existingRecruit.status, to: status }
      
      // open 상태로 변경 시 posted_at 설정
      if (status === 'open' && existingRecruit.status !== 'open') {
        updateData.posted_at = new Date()
        changes.posted_at = { set: true }
      }
    }

    if (editor_id !== undefined) {
      // 편집자 존재 여부 확인
      const editor = await prisma.admin_users.findUnique({
        where: { id: BigInt(editor_id) }
      })

      if (!editor) {
        throw createError({
          statusCode: 404,
          statusMessage: '편집자를 찾을 수 없습니다.'
        })
      }

      updateData.editor_id = BigInt(editor_id)
      changes.editor_id = { from: existingRecruit.editor_id.toString(), to: editor_id }
    }

    updateData.updated_at = new Date()

    // 채용공고 업데이트
    const updatedRecruit = await prisma.recruits.update({
      where: { id: BigInt(id) },
      data: updateData,
      include: {
        admin_users: {
          select: {
            id: true,
            email: true,
            departments: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })

    // audit log 기록
    await prisma.audit_logs.create({
      data: {
        user_id: editor_id ? BigInt(editor_id) : existingRecruit.editor_id,
        entity: 'recruits',
        entity_id: BigInt(id),
        action: 'update',
        changes
      }
    })

    return {
      success: true,
      data: {
        ...updatedRecruit,
        id: updatedRecruit.id.toString(),
        editor_id: updatedRecruit.editor_id.toString()
      },
      message: '채용공고가 성공적으로 업데이트되었습니다.'
    }
  } catch (error: any) {
    console.error('채용공고 업데이트 오류:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: '채용공고 업데이트 중 오류가 발생했습니다.'
    })
  }
})
