import { prisma } from '~/lib/prisma'

export default defineEventHandler(async event => {
  try {
    const query = getQuery(event)
    const group_id = query.group_id
      ? parseInt(query.group_id as string)
      : undefined

    const teams = await (prisma as any).dms_teams.findMany({
      where: group_id ? { group_id } : {},
      include: {
        group: {
          include: {
            headquarters: true,
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
      data: teams,
    }
  } catch (error) {
    console.error('Error fetching teams:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch teams',
    })
  }
})
