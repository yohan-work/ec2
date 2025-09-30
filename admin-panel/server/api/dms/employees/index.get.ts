import { prisma } from '~/lib/prisma'

export default defineEventHandler(async event => {
  try {
    const query = getQuery(event)
    const {
      status,
      search,
      is_people_manager,
      group_id,
      team_id,
      job_role,
      career_level,
    } = query

    const where: any = {}

    if (status) {
      where.status = status
    }

    if (search) {
      where.OR = [
        { name: { contains: search as string } },
        { email: { contains: search as string } },
      ]
    }

    if (is_people_manager !== undefined) {
      where.is_people_manager = is_people_manager === 'true'
    }

    if (group_id) {
      where.group_id = parseInt(group_id as string)
    }

    if (team_id) {
      where.team_id = parseInt(team_id as string)
    }

    if (job_role) {
      where.job_role = job_role
    }

    if (career_level) {
      where.career_level = career_level
    }

    const employees = await (prisma as any).dms_employees.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        job_role: true,
        career_level: true,
        status: true,
        is_people_manager: true,
        group_id: true,
        team_id: true,
        manager_id: true,
        start_date: true,
        end_date: true,
        manager: {
          select: {
            name: true,
          },
        },
        group: {
          select: {
            name: true,
          },
        },
        team: {
          select: {
            name: true,
          },
        },
        leaves: {
          select: {
            id: true,
            start_date: true,
            end_date: true,
          },
          orderBy: {
            start_date: 'asc',
          },
        },
      },
      orderBy: [{ name: 'asc' }],
    })

    return {
      success: true,
      data: employees,
    }
  } catch (error) {
    console.error('Error fetching employees:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch employees',
    })
  }
})
