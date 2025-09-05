import os from 'os'
import { prisma } from '../../../lib/prisma'

export default defineEventHandler(async event => {
  try {
    // 시스템 메트릭 수집
    const totalMemory = os.totalmem()
    const freeMemory = os.freemem()
    const usedMemory = totalMemory - freeMemory
    const memoryUsagePercent = Math.round((usedMemory / totalMemory) * 100)

    const cpus = os.cpus()
    const loadAverage = os.loadavg()

    // 프로세스 메트릭
    const processMemory = process.memoryUsage()
    const processUptime = Math.floor(process.uptime())

    // 데이터베이스 메트릭 (간단한 쿼리 응답시간 측정)
    const dbStartTime = Date.now()
    const newsletterCount = await prisma.newsletters.count()
    const recruitCount = await prisma.recruits.count()
    const dbResponseTime = Date.now() - dbStartTime

    // 최근 24시간 활동 통계
    const twentyFourHoursAgo = new Date()
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24)

    const recentNewsletters = await prisma.newsletters.count({
      where: {
        created_at: {
          gte: twentyFourHoursAgo,
        },
      },
    })

    const recentRecruits = await prisma.recruits.count({
      where: {
        created_at: {
          gte: twentyFourHoursAgo,
        },
      },
    })

    return {
      success: true,
      data: {
        system: {
          memory: {
            total: Math.round((totalMemory / 1024 / 1024 / 1024) * 100) / 100, // GB
            used: Math.round((usedMemory / 1024 / 1024 / 1024) * 100) / 100, // GB
            free: Math.round((freeMemory / 1024 / 1024 / 1024) * 100) / 100, // GB
            usagePercent: memoryUsagePercent,
          },
          cpu: {
            cores: cpus.length,
            loadAverage: loadAverage.map(avg => Math.round(avg * 100) / 100),
            model: cpus[0]?.model || 'Unknown',
          },
          uptime: Math.floor(os.uptime()), // seconds
          platform: os.platform(),
          arch: os.arch(),
        },
        process: {
          memory: {
            rss: Math.round((processMemory.rss / 1024 / 1024) * 100) / 100, // MB
            heapUsed:
              Math.round((processMemory.heapUsed / 1024 / 1024) * 100) / 100, // MB
            heapTotal:
              Math.round((processMemory.heapTotal / 1024 / 1024) * 100) / 100, // MB
          },
          uptime: processUptime, // seconds
        },
        database: {
          responseTime: dbResponseTime, // ms
          connected: true,
        },
        application: {
          totalNewsletters: newsletterCount,
          totalRecruits: recruitCount,
          recentNewsletters: recentNewsletters,
          recentRecruits: recentRecruits,
        },
        timestamp: new Date().toISOString(),
      },
    }
  } catch (error: any) {
    console.error('시스템 메트릭 수집 오류:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '시스템 메트릭을 가져오는 중 오류가 발생했습니다.',
    })
  }
})
