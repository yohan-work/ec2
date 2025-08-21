import { prisma } from '../../../../lib/prisma'
import { getAdminUserByCognitoId } from '../../../utils/auth'
import { serializeBigInt } from '../../../utils/bigint'

export default defineEventHandler(async event => {
  try {
    // TODO: 인증 검증 추가 필요

    const body = await readBody(event)
    const {
      title,
      description,
      location,
      employment_type,
      status,
      cognito_user_id,
    } = body

    // 필수 필드 검증
    if (!title || !description || !cognito_user_id) {
      throw createError({
        statusCode: 400,
        statusMessage: '제목, 설명, 사용자 인증 정보는 필수입니다.',
      })
    }

    // 상태 검증
    const validStatuses = ['draft', 'open', 'closed', 'archived']
    if (status && !validStatuses.includes(status)) {
      throw createError({
        statusCode: 400,
        statusMessage: '올바른 상태값이 아닙니다.',
      })
    }

    // 고용형태 검증
    const validEmploymentTypes = ['fulltime', 'contract', 'intern', 'parttime']
    if (employment_type && !validEmploymentTypes.includes(employment_type)) {
      throw createError({
        statusCode: 400,
        statusMessage: '올바른 고용형태가 아닙니다.',
      })
    }

    // 인증된 사용자 정보 조회
    const editor = await getAdminUserByCognitoId(cognito_user_id)

    // 채용공고 생성
    const recruit = await prisma.recruits.create({
      data: {
        title,
        description,
        location: location || null,
        employment_type: employment_type || 'fulltime',
        status: status || 'draft',
        editor_id: editor.id,
        posted_at: status === 'open' ? new Date() : null,
      },
      include: {
        admin_users: {
          select: {
            id: true,
            email: true,
            departments: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })

    // audit log 기록
    await prisma.audit_logs.create({
      data: {
        user_id: editor.id,
        entity: 'recruits',
        entity_id: recruit.id,
        action: 'create',
        changes: {
          title,
          employment_type: employment_type || 'fulltime',
          status: status || 'draft',
        },
      },
    })

    return {
      success: true,
      data: serializeBigInt(recruit),
      message: '채용공고가 성공적으로 생성되었습니다.',
    }
  } catch (error: any) {
    console.error('채용공고 생성 오류:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: '채용공고 생성 중 오류가 발생했습니다.',
    })
  }
})
