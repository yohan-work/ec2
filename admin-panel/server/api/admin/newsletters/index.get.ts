import { prisma } from '../../../../lib/prisma'
import { serializeBigInt } from '../../../utils/bigint'

export default defineEventHandler(async (event) => {
  try {
    // TODO: 인증 검증 추가 필요
    // const token = getCookie(event, 'auth-token') 또는 헤더에서 토큰 확인
    
    const query = getQuery(event)
    const page = parseInt(query.page as string) || 1
    const limit = parseInt(query.limit as string) || 10
    const status = query.status as string || undefined
    const search = query.search as string || undefined

    const skip = (page - 1) * limit

    // 필터 조건 구성
    const where: any = {}
    
    if (status) {
      where.status = status
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { body_html: { contains: search } }
      ]
    }

    // 전체 개수 조회
    const total = await prisma.newsletters.count({ where })

    // 뉴스레터 목록 조회 (작성자 정보 포함)
    const newsletters = await prisma.newsletters.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        created_at: 'desc'
      },
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

    return {
      success: true,
      data: serializeBigInt(newsletters),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  } catch (error: any) {
    console.error('뉴스레터 목록 조회 오류:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '뉴스레터 목록을 가져오는 중 오류가 발생했습니다.'
    })
  }
})
