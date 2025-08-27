import { prisma } from '../../../../lib/prisma'
import { serializeBigInt } from '../../../utils/bigint'

export default defineEventHandler(async event => {
  try {
    const query = getQuery(event)
    const page = parseInt(query.page as string) || 1
    const limit = parseInt(query.limit as string) || 20
    const entity = (query.entity as string) || undefined
    const action = (query.action as string) || undefined
    const user_id = query.user_id ? BigInt(query.user_id as string) : undefined
    const start_date = (query.start_date as string) || undefined
    const end_date = (query.end_date as string) || undefined

    const skip = (page - 1) * limit

    // 필터 조건 구성
    const where: any = {}

    if (entity) {
      where.entity = entity
    }

    if (action) {
      where.action = action
    }

    if (user_id) {
      where.user_id = user_id
    }

    // 날짜 범위 필터
    if (start_date || end_date) {
      where.created_at = {}
      if (start_date) {
        where.created_at.gte = new Date(start_date + 'T00:00:00.000Z')
      }
      if (end_date) {
        where.created_at.lte = new Date(end_date + 'T23:59:59.999Z')
      }
    }

    // 전체 개수 조회
    const total = await prisma.audit_logs.count({ where })

    // 로그 목록 조회 (사용자 정보 포함)
    const logs = await prisma.audit_logs.findMany({
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
                code: true,
              },
            },
          },
        },
      },
    })

    return {
      success: true,
      data: serializeBigInt(logs),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    }
  } catch (error: any) {
    console.error('로그 목록 조회 오류:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '로그 목록을 가져오는 중 오류가 발생했습니다.',
    })
  }
})
