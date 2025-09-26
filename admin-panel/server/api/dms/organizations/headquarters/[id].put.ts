import { prisma } from '~/lib/prisma'
import { logDmsHistory } from '~/server/api/dms/history/utils'

export default defineEventHandler(async event => {
  try {
    const id = parseInt(getRouterParam(event, 'id') || '0')
    const body = await readBody(event)
    const { name, leader_id, sort_order } = body

    if (!name) {
      throw createError({
        statusCode: 400,
        statusMessage: '본부명은 필수입니다',
      })
    }

    // 기존 본부 정보 조회 (히스토리 기록용)
    const existingHeadquarters = await (
      prisma as any
    ).dms_headquarters.findUnique({
      where: { id },
      select: { name: true },
    })

    if (!existingHeadquarters) {
      throw createError({
        statusCode: 404,
        statusMessage: '본부를 찾을 수 없습니다',
      })
    }

    const updatedHeadquarters = await (prisma as any).dms_headquarters.update({
      where: { id },
      data: {
        name,
        leader_id: leader_id || null,
        sort_order: sort_order || 0,
      },
      include: {
        groups: {
          include: {
            teams: true,
          },
        },
        employees: true,
      },
    })

    // 히스토리 로깅
    await logDmsHistory(
      {
        menu_name: '조직 관리',
        action_type: 'Update',
        details: `본부 "${existingHeadquarters.name}" → "${name}" 수정`,
      },
      event
    )

    return {
      success: true,
      data: updatedHeadquarters,
    }
  } catch (error: any) {
    console.error('Error updating headquarters:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update headquarters',
    })
  }
})
