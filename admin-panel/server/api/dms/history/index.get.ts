import { prisma } from '~/lib/prisma'

export default defineEventHandler(async event => {
  try {
    const query = getQuery(event)
    const {
      page = 1,
      limit = 20,
      year,
      month,
      menu,
      action,
      start_date,
      end_date,
      admin_name,
    } = query

    // 페이지네이션 설정
    const pageNum = parseInt(page as string)
    const limitNum = parseInt(limit as string)
    const skip = (pageNum - 1) * limitNum

    // 필터 조건 구성
    const where: any = {}

    // 날짜 범위 필터 (start_date, end_date 우선)
    if (start_date && end_date) {
      where.created_at = {
        gte: new Date(start_date as string),
        lt: new Date(end_date as string),
      }
    } else {
      // 연도 필터
      if (year) {
        const yearNum = parseInt(year as string)
        where.created_at = {
          gte: new Date(yearNum, 0, 1),
          lt: new Date(yearNum + 1, 0, 1),
        }
      }

      // 월 필터
      if (month) {
        const monthNum = parseInt(month as string)
        const currentYear = year
          ? parseInt(year as string)
          : new Date().getFullYear()
        where.created_at = {
          gte: new Date(currentYear, monthNum - 1, 1),
          lt: new Date(currentYear, monthNum, 1),
        }
      }
    }

    // 메뉴 필터
    if (menu) {
      where.menu_name = {
        contains: menu as string,
      }
    }

    // 작업 타입 필터
    if (action) {
      where.action_type = action as string
    }

    // 작업자 이름 필터
    if (admin_name) {
      where.admin_name = {
        contains: admin_name as string,
      }
    }

    // 데이터 조회
    const [histories, total] = await Promise.all([
      prisma.dms_change_history.findMany({
        where,
        orderBy: {
          created_at: 'desc',
        },
        skip,
        take: limitNum,
      }),
      prisma.dms_change_history.count({ where }),
    ])

    // 통계 데이터 계산 (첫 페이지일 때만)
    let statistics = null
    if (pageNum === 1) {
      const today = new Date()
      const todayStart = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      )
      const todayEnd = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1
      )
      const weekStart = new Date(today)
      weekStart.setDate(today.getDate() - today.getDay())
      weekStart.setHours(0, 0, 0, 0)

      const [todayCount, weekCount] = await Promise.all([
        prisma.dms_change_history.count({
          where: {
            created_at: {
              gte: todayStart,
              lt: todayEnd,
            },
          },
        }),
        prisma.dms_change_history.count({
          where: {
            created_at: {
              gte: weekStart,
              lt: todayEnd,
            },
          },
        }),
      ])

      statistics = {
        totalCount: total,
        todayCount,
        weekCount,
      }
    }

    return {
      success: true,
      data: {
        histories,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum),
        },
        statistics,
      },
    }
  } catch (error) {
    console.error('히스토리 조회 오류:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '히스토리 조회 중 오류가 발생했습니다.',
    })
  }
})
