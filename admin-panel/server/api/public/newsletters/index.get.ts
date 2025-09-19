import { prisma } from '../../../../lib/prisma'
import { serializeBigInt } from '../../../utils/bigint'

export default defineEventHandler(async event => {
  try {
    const query = getQuery(event)
    const page = parseInt(query.page as string) || 1
    const limit = parseInt(query.limit as string) || 10
    const search = (query.search as string) || undefined

    const skip = (page - 1) * limit

    // 필터 조건 구성 (발행된 뉴스레터만)
    const where: any = {
      status: 'published',
    }

    // search 값 검증 (문자열이고 비어있지 않은 경우만)
    if (typeof search === 'string' && search.trim()) {
      where.OR = [
        { title: { contains: search.trim() } },
        { body_html: { contains: search.trim() } },
      ]
    }

    // 전체 개수 조회
    const total = await prisma.newsletters.count({ where })

    // 뉴스레터 목록 조회 (작성자 정보 포함)
    // display_order가 설정된 것은 순서대로, 설정되지 않은 것은 발행일 역순으로 정렬
    const newsletters = await prisma.newsletters.findMany({
      where,
      skip,
      take: limit,
      orderBy: [{ display_order: 'asc' }, { published_at: 'desc' }] as any,
      include: {
        admin_users: {
          select: {
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

    return {
      success: true,
      data: serializeBigInt(newsletters),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    }
  } catch (error: any) {
    console.error('공개 뉴스레터 목록 조회 오류:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '뉴스레터 목록을 가져오는 중 오류가 발생했습니다.',
    })
  }
})
