import { prisma } from '../../../lib/prisma'

/**
 * 기간별 활동 추이 API
 * GET /api/system/activity-trend?period=7|30
 */
export default defineEventHandler(async event => {
  try {
    const query = getQuery(event)
    const period = parseInt(query.period as string) || 30

    // 유효한 기간 값인지 확인
    if (![7, 30].includes(period)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid period',
        message: '유효하지 않은 기간입니다. 7 또는 30 중 하나를 선택하세요.',
      })
    }

    // 기간 계산
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - period)

    // 날짜별 뉴스레터 생성 건수 조회
    // Prisma에서는 raw SQL을 사용하여 날짜별 그룹화
    const activityData = await prisma.$queryRaw<
      Array<{ date: string; count: number }>
    >`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as count
      FROM newsletters
      WHERE created_at >= ${startDate} AND created_at <= ${endDate}
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `

    // 날짜 범위의 모든 날짜를 포함하도록 데이터 보완
    const completeData = []
    const currentDate = new Date(startDate)
    
    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0]
      const existing = activityData.find(
        item => new Date(item.date).toISOString().split('T')[0] === dateStr
      )
      
      completeData.push({
        date: dateStr,
        count: existing ? Number(existing.count) : 0,
      })
      
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return {
      success: true,
      data: {
        period,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        activities: completeData,
      },
    }
  } catch (error: any) {
    console.error('활동 추이 조회 오류:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: '활동 추이를 가져오는 중 오류가 발생했습니다.',
    })
  }
})

