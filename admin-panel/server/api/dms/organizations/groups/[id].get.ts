import { prisma } from '~/lib/prisma'

export default defineEventHandler(async event => {
  try {
    const id = parseInt(getRouterParam(event, 'id') || '0')

    const group = await (prisma as any).dms_groups.findUnique({
      where: { id },
      include: {
        headquarters: true,
        teams: true,
        employees: true,
      },
    })

    if (!group) {
      throw createError({
        statusCode: 404,
        statusMessage: '그룹을 찾을 수 없습니다',
      })
    }

    return {
      success: true,
      data: group,
    }
  } catch (error: any) {
    console.error('Error fetching group:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch group',
    })
  }
})
