import { prisma } from '../../../../lib/prisma'
import { getAdminUserByCognitoId } from '../../../utils/auth'
import { serializeBigInt } from '../../../utils/bigint'
import { calculateDisplayOrder } from '../../../utils/newsletter-order'

export default defineEventHandler(async event => {
  try {
    console.log('=== 뉴스레터 생성 API 시작 ===')

    // TODO: 인증 검증 추가 필요
    // const authUser = await verifyAuth(event)

    const body = await readBody(event)
    console.log('받은 요청 body:', JSON.stringify(body, null, 2))

    const {
      title,
      body_html,
      thumbnail_image,
      body_image,
      subtitle,
      subtitle_bold,
      status,
      cognito_user_id,
      published_date,
    } = body

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

    // published_at 결정: published_date가 제공되면 해당 날짜 사용, 없으면 현재 시간 사용
    let publishedAt = null
    if (status === 'published') {
      publishedAt = published_date ? new Date(published_date) : new Date()
    }

    // display_order 계산 (발행된 뉴스레터의 경우에만)
    let displayOrder = 0
    if (status === 'published' && publishedAt) {
      console.log('발행된 뉴스레터의 display_order 계산 중...')
      console.log('발행일:', publishedAt)
      
      // 발행일과 등록일(현재 시간)을 기준으로 적절한 위치 계산
      const createdAt = new Date()
      displayOrder = await calculateDisplayOrder(publishedAt, createdAt)
      console.log('계산된 display_order:', displayOrder)
    }

    // 뉴스레터 생성
    console.log('뉴스레터 생성 시도:', {
      title,
      status,
      author_id: author.id,
      display_order: displayOrder,
      published_at: publishedAt,
    })
    
    const newsletter = await prisma.newsletters.create({
      data: {
        title,
        body_html,
        thumbnail_image: thumbnail_image || null,
        body_image: body_image || null,
        subtitle: subtitle || null,
        subtitle_bold: subtitle_bold || false,
        status: status || 'draft',
        author_id: author.id,
        published_at: publishedAt,
        display_order: displayOrder,
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
