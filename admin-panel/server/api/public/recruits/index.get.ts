import { prisma } from '../../../../lib/prisma'
import { serializeBigInt } from '../../../utils/bigint'

export default defineEventHandler(async event => {
  try {
    const query = getQuery(event)
    const page = parseInt(query.page as string) || 1
    const limit = parseInt(query.limit as string) || 10
    const employment_type = (query.employment_type as string) || undefined
    const search = (query.search as string) || undefined

    const skip = (page - 1) * limit

    // 필터 조건 구성 (공개된 채용공고만)
    const where: any = {
      status: 'open',
    }

    if (employment_type) {
      where.employment_type = employment_type
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { location: { contains: search } },
      ]
    }

    // 전체 개수 조회
    const total = await prisma.recruits.count({ where })

    // 채용공고 목록 조회 (편집자 정보 포함)
    const recruits = await prisma.recruits.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        created_at: 'desc',
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
      data: serializeBigInt(recruits),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    }
  } catch (error: any) {
    console.error('공개 채용공고 목록 조회 오류:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '채용공고 목록을 가져오는 중 오류가 발생했습니다.',
    })
  }
})
