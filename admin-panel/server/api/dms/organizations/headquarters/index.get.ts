import { prisma } from '~/lib/prisma'

export default defineEventHandler(async event => {
  try {
    const headquarters = await (prisma as any).dms_headquarters.findMany({
      include: {
        groups: {
          include: {
            teams: true,
          },
        },
        employees: true,
      },
      orderBy: {
        sort_order: 'asc',
      },
    })

    return {
      success: true,
      data: headquarters,
    }
  } catch (error) {
    console.error('Error fetching headquarters:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch headquarters',
    })
  }
})
