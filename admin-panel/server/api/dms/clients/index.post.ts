import { prisma } from '~/lib/prisma'
import { logDmsHistory, getClientIP } from '~/server/api/dms/history/utils'

export default defineEventHandler(async event => {
  try {
    const body = await readBody(event)
    const { name } = body

    if (!name || name.trim() === '') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Client name is required',
      })
    }

    // 중복 체크
    const existingClient = await prisma.dms_clients.findUnique({
      where: { name: name.trim() },
    })

    if (existingClient) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Client with this name already exists',
      })
    }

    const client = await prisma.dms_clients.create({
      data: {
        name: name.trim(),
      },
    })

    // 히스토리 로깅
    await logDmsHistory({
      admin_name: 'DMS 관리자', // TODO: 실제 관리자 이름으로 변경 필요
      menu_name: '고객사 관리',
      action_type: 'Insert',
      details: `고객사 "${name.trim()}" 추가`,
      ip_address: getClientIP(event),
    })

    return {
      success: true,
      data: client,
      message: 'Client created successfully',
    }
  } catch (error: any) {
    console.error('Error creating client:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create client',
    })
  }
})
