import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async event => {
  try {
    const clients = await prisma.dms_clients.findMany({
      orderBy: {
        created_at: 'desc',
      },
    })

    return {
      success: true,
      data: clients,
    }
  } catch (error) {
    console.error('Error fetching clients:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch clients',
    })
  } finally {
    await prisma.$disconnect()
  }
})
