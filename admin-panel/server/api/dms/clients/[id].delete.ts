import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async event => {
  try {
    const clientId = getRouterParam(event, 'id')

    if (!clientId || isNaN(Number(clientId))) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Valid client ID is required',
      })
    }

    // 기존 클라이언트 존재 확인
    const existingClient = await prisma.dms_clients.findUnique({
      where: { id: Number(clientId) },
    })

    if (!existingClient) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Client not found',
      })
    }

    await prisma.dms_clients.delete({
      where: { id: Number(clientId) },
    })

    return {
      success: true,
      message: 'Client deleted successfully',
    }
  } catch (error: any) {
    console.error('Error deleting client:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete client',
    })
  } finally {
    await prisma.$disconnect()
  }
})
