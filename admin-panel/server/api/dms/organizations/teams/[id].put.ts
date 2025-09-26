import { prisma } from '~/lib/prisma'
import { logDmsHistory } from '~/server/api/dms/history/utils'

export default defineEventHandler(async event => {
  try {
    const id = parseInt(getRouterParam(event, 'id') || '0')
    const body = await readBody(event)
    const { name, group_id, leader_id, sort_order } = body

    if (!name) {
      throw createError({
        statusCode: 400,
        statusMessage: '팀명은 필수입니다',
      })
    }

    if (!group_id) {
      throw createError({
        statusCode: 400,
        statusMessage: '소속 그룹은 필수입니다',
      })
    }

    // 기존 팀 정보 조회 (히스토리 기록용)
    const existingTeam = await (prisma as any).dms_teams.findUnique({
      where: { id },
      select: { name: true },
    })

    if (!existingTeam) {
      throw createError({
        statusCode: 404,
        statusMessage: '팀을 찾을 수 없습니다',
      })
    }

    // 그룹 존재 확인
    const group = await (prisma as any).dms_groups.findUnique({
      where: { id: group_id },
    })

    if (!group) {
      throw createError({
        statusCode: 400,
        statusMessage: '존재하지 않는 그룹입니다',
      })
    }

    const updatedTeam = await (prisma as any).dms_teams.update({
      where: { id },
      data: {
        name,
        group_id,
        leader_id: leader_id || null,
        sort_order: sort_order || 0,
      },
      include: {
        group: {
          include: {
            headquarters: true,
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
        details: `팀 "${existingTeam.name}" → "${name}" 수정`,
      },
      event
    )

    return {
      success: true,
      data: updatedTeam,
    }
  } catch (error: any) {
    console.error('Error updating team:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update team',
    })
  }
})
