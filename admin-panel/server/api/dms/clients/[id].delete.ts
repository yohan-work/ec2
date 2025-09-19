import { prisma } from '~/lib/prisma'
import { logDmsHistory, getClientIP } from '~/server/api/dms/history/utils'

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

    // 히스토리 로깅
    await logDmsHistory({
      admin_name: 'DMS 관리자', // TODO: 실제 관리자 이름으로 변경 필요
      menu_name: '고객사 관리',
      action_type: 'Delete',
      details: `고객사 "${existingClient.name}" 삭제`,
      ip_address: getClientIP(event),
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
  }
})
