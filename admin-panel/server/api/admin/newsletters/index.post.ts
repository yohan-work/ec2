import { prisma } from '../../../../lib/prisma'
import { getAdminUserByCognitoId } from '../../../utils/auth'
import { serializeBigInt } from '../../../utils/bigint'

export default defineEventHandler(async event => {
  try {
    console.log('=== 뉴스레터 생성 API 시작 ===')

    // TODO: 인증 검증 추가 필요
    // const authUser = await verifyAuth(event)

    const body = await readBody(event)
    console.log('받은 요청 body:', JSON.stringify(body, null, 2))

    const { title, body_html, status, cognito_user_id } = body

    // 필수 필드 검증
    if (!title || !body_html || !cognito_user_id) {
      throw createError({
        statusCode: 400,
        statusMessage: '제목, 내용, 사용자 인증 정보는 필수입니다.',
      })
    }

    // 상태 검증
    const validStatuses = ['draft', 'published', 'archived']
    if (status && !validStatuses.includes(status)) {
      throw createError({
        statusCode: 400,
        statusMessage: '올바른 상태값이 아닙니다.',
      })
    }

    // 인증된 사용자 정보 조회
    console.log('Cognito User ID로 사용자 조회 시작:', cognito_user_id)
    const author = await getAdminUserByCognitoId(cognito_user_id)
    console.log('조회된 사용자:', { id: author.id, email: author.email })

    // 뉴스레터 생성
    console.log('뉴스레터 생성 시도:', { title, status, author_id: author.id })
    const newsletter = await prisma.newsletters.create({
      data: {
        title,
        body_html,
        status: status || 'draft',
        author_id: author.id,
        published_at: status === 'published' ? new Date() : null,
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
    console.log('audit log 생성 시도...')
    try {
      await prisma.audit_logs.create({
        data: {
          user_id: author.id,
          entity: 'newsletters',
          entity_id: newsletter.id,
          action: 'create',
          changes: {
            title,
            status: status || 'draft',
          },
        },
      })
      console.log('audit log 생성 성공')
    } catch (auditError: any) {
      console.error('audit log 생성 실패:', auditError)
      // audit log 실패해도 뉴스레터 생성은 성공으로 처리
    }

    console.log('응답 데이터 생성 중...')
    const responseData = {
      success: true,
      data: serializeBigInt(newsletter),
      message: '뉴스레터가 성공적으로 생성되었습니다.',
    }

    console.log('응답 반환 시도...')
    return responseData
  } catch (error: any) {
    console.error('뉴스레터 생성 오류:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: '뉴스레터 생성 중 오류가 발생했습니다.',
    })
  }
})
