import { prisma } from '~/lib/prisma'

export default defineEventHandler(async event => {
  try {
    const query = getQuery(event)
    const { status = 'active', search } = query

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

    const employees = await (prisma as any).dms_employees.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        job_role: true,
        career_level: true,
        status: true,
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
