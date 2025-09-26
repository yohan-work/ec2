import { prisma } from '~/lib/prisma'
import { logDmsHistory } from '~/server/api/dms/history/utils'

export default defineEventHandler(async event => {
  try {
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

    // 해당 그룹 내에서 최대 sort_order 값 가져오기
    const maxSortOrder = await (prisma as any).dms_teams.aggregate({
      where: { group_id },
      _max: {
        sort_order: true,
      },
    })

    const newTeam = await (prisma as any).dms_teams.create({
      data: {
        name,
        group_id,
        leader_id: leader_id || null,
        sort_order: sort_order || (maxSortOrder._max.sort_order || 0) + 1,
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
        action_type: 'Insert',
        details: `신규 팀 추가: ${name} (그룹: ${group.name})`,
      },
      event
    )

    return {
      success: true,
      data: newTeam,
    }
  } catch (error: any) {
    console.error('Error creating team:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create team',
    })
  }
})
