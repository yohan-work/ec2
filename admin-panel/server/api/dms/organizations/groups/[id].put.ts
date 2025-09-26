import { prisma } from '~/lib/prisma'
import { logDmsHistory } from '~/server/api/dms/history/utils'

export default defineEventHandler(async event => {
  try {
    const id = parseInt(getRouterParam(event, 'id') || '0')
    const body = await readBody(event)
    const { name, headquarters_id, leader_id, sort_order } = body

    if (!name) {
      throw createError({
        statusCode: 400,
        statusMessage: '그룹명은 필수입니다',
      })
    }

    if (!headquarters_id) {
      throw createError({
        statusCode: 400,
        statusMessage: '소속 본부는 필수입니다',
      })
    }

    // 기존 그룹 정보 조회 (히스토리 기록용)
    const existingGroup = await (prisma as any).dms_groups.findUnique({
      where: { id },
      select: { name: true },
    })

    if (!existingGroup) {
      throw createError({
        statusCode: 404,
        statusMessage: '그룹을 찾을 수 없습니다',
      })
    }

    // 본부 존재 확인
    const headquarters = await (prisma as any).dms_headquarters.findUnique({
      where: { id: headquarters_id },
    })

    if (!headquarters) {
      throw createError({
        statusCode: 400,
        statusMessage: '존재하지 않는 본부입니다',
      })
    }

    const updatedGroup = await (prisma as any).dms_groups.update({
      where: { id },
      data: {
        name,
        headquarters_id,
        leader_id: leader_id || null,
        sort_order: sort_order || 0,
      },
      include: {
        headquarters: true,
        teams: true,
        employees: true,
      },
    })

    // 히스토리 로깅
    await logDmsHistory(
      {
        menu_name: '조직 관리',
        action_type: 'Update',
        details: `그룹 "${existingGroup.name}" → "${name}" 수정`,
      },
      event
    )

    return {
      success: true,
      data: updatedGroup,
    }
  } catch (error: any) {
    console.error('Error updating group:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update group',
    })
  }
})
