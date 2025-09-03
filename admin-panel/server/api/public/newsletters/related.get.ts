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

    // 현재 뉴스레터보다 이전에 발행된 뉴스레터들을 가져옴
    const relatedNewsletters = await prisma.newsletters.findMany({
      where: {
        status: 'published',
        published_at: {
          lt: currentNewsletter.published_at || new Date(), // 현재 뉴스레터보다 더 오래된 것들
        },
      },
      take: limit,
      orderBy: {
        published_at: 'desc', // 최신 순서대로 정렬 (가장 최근에 발행된 것이 먼저)
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
