import { prisma } from '../../../../lib/prisma'
import { serializeBigInt } from '../../../utils/bigint'

export default defineEventHandler(async event => {
  try {
    const query = getQuery(event)
    const currentId = query.id as string
    const limit = parseInt(query.limit as string) || 3

    if (!currentId) {
      throw createError({
        statusCode: 400,
        statusMessage: '뉴스레터 ID가 필요합니다.',
      })
    }

    // 현재 뉴스레터 정보 조회
    const currentNewsletter = await prisma.newsletters.findUnique({
      where: { id: BigInt(currentId) },
      select: { published_at: true },
    })

    if (!currentNewsletter) {
      throw createError({
        statusCode: 404,
        statusMessage: '뉴스레터를 찾을 수 없습니다.',
      })
    }

    // 과거 기사 조회
    const olderNewsletters = await prisma.newsletters.findMany({
      where: {
        status: 'published',
        id: {
          not: BigInt(currentId), // 현재 뉴스레터 제외
        },
        published_at: {
          lt: currentNewsletter.published_at || new Date(), // 현재 뉴스레터보다 더 오래된 것들
        },
      },
      take: limit,
      orderBy: {
        published_at: 'desc', // 상대적 최신순 (오래된 것 중 가장 최신)
      },
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

    // 제일 오래된 게시글 접근 시 최신 기사로 보완
    let relatedNewsletters = [...olderNewsletters]

    if (relatedNewsletters.length < limit) {
      const remainingCount = limit - relatedNewsletters.length

      const newerNewsletters = await prisma.newsletters.findMany({
        where: {
          status: 'published',
          id: {
            not: BigInt(currentId), // 현재 뉴스레터 제외
          },
          published_at: {
            gte: currentNewsletter.published_at || new Date(), // 현재 뉴스레터와 같거나 최신 것들
          },
        },
        take: remainingCount,
        orderBy: {
          published_at: 'desc', // 최신순
        },
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

      relatedNewsletters = [...relatedNewsletters, ...newerNewsletters]
    }

    return {
      success: true,
      data: serializeBigInt(relatedNewsletters),
      count: relatedNewsletters.length,
    }
  } catch (error: any) {
    console.error('관련 뉴스레터 조회 오류:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '관련 뉴스레터를 가져오는 중 오류가 발생했습니다.',
    })
  }
})
