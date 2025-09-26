import { prisma } from '~/lib/prisma'

export default defineEventHandler(async event => {
  try {
    const query = getQuery(event)
    const headquarters_id = query.headquarters_id
      ? parseInt(query.headquarters_id as string)
      : undefined

    const groups = await (prisma as any).dms_groups.findMany({
      where: headquarters_id ? { headquarters_id } : {},
      include: {
        headquarters: true,
        teams: true,
        employees: true,
      },
      orderBy: {
        sort_order: 'asc',
      },
    })

    return {
      success: true,
      data: groups,
    }
  } catch (error) {
    console.error('Error fetching groups:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch groups',
    })
  }
})
