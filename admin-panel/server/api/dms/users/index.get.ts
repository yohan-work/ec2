import { prisma } from '~/lib/prisma'

export default defineEventHandler(async event => {
  try {
    const query = getQuery(event)
    const page = parseInt(query.page as string) || 1
    const limit = parseInt(query.limit as string) || 10
    const search = (query.search as string) || ''
    const isActive = query.is_active as string

    const skip = (page - 1) * limit

    // 검색 조건 구성
    const where: any = {}

    if (search) {
      where.OR = [
        { email: { contains: search } },
        { name: { contains: search } },
      ]
    }

    if (isActive !== undefined) {
      where.is_active = isActive === 'true'
    }

    // 사용자 목록 조회
    const users = await prisma.dms_admin_users.findMany({
      where,
      orderBy: {
        created_at: 'desc',
      },
      skip,
      take: limit,
    })

    // 전체 개수 조회
    const total = await prisma.dms_admin_users.count({ where })

    return {
      success: true,
      data: {
        users,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    }
  } catch (error) {
    console.error('DMS 사용자 목록 조회 오류:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '사용자 목록을 조회할 수 없습니다.',
    })
  }
})
