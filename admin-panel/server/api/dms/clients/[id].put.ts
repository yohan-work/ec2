import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async event => {
  try {
    const clientId = getRouterParam(event, 'id')
    const body = await readBody(event)
    const { name } = body

    if (!clientId || isNaN(Number(clientId))) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Valid client ID is required',
      })
    }

    if (!name || name.trim() === '') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Client name is required',
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

    // 중복 체크 (자기 자신 제외)
    const duplicateClient = await prisma.dms_clients.findFirst({
      where: {
        name: name.trim(),
        id: { not: Number(clientId) },
      },
    })

    if (duplicateClient) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Client with this name already exists',
      })
    }

    const updatedClient = await prisma.dms_clients.update({
      where: { id: Number(clientId) },
      data: {
        name: name.trim(),
      },
    })

    return {
      success: true,
      data: updatedClient,
      message: 'Client updated successfully',
    }
  } catch (error: any) {
    console.error('Error updating client:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update client',
    })
  } finally {
    await prisma.$disconnect()
  }
})
