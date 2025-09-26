import { prisma } from '~/lib/prisma'
import { logDmsHistory } from '~/server/api/dms/history/utils'

export default defineEventHandler(async event => {
  try {
    const id = parseInt(getRouterParam(event, 'id') || '0')

    // 그룹에 소속된 팀이 있는지 확인
    const teamsCount = await (prisma as any).dms_teams.count({
      where: { group_id: id },
    })

    if (teamsCount > 0) {
      throw createError({
        statusCode: 400,
        statusMessage: '소속 팀이 있는 그룹은 삭제할 수 없습니다',
      })
    }

    // 그룹에 소속된 직원이 있는지 확인
    const employeesCount = await (prisma as any).dms_employees.count({
      where: { group_id: id },
    })

    if (employeesCount > 0) {
      throw createError({
        statusCode: 400,
        statusMessage: '소속 직원이 있는 그룹은 삭제할 수 없습니다',
      })
    }

    // 삭제 전 그룹 정보 조회 (히스토리 기록용)
    const groupInfo = await (prisma as any).dms_groups.findUnique({
      where: { id },
      select: { name: true },
    })

    await (prisma as any).dms_groups.delete({
      where: { id },
    })

    // 히스토리 로깅
    await logDmsHistory(
      {
        menu_name: '조직 관리',
        action_type: 'Delete',
        details: `그룹 삭제: ${groupInfo?.name || 'Unknown'} (ID: ${id})`,
      },
      event
    )

    return {
      success: true,
      message: '그룹이 성공적으로 삭제되었습니다',
    }
  } catch (error: any) {
    console.error('Error deleting group:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete group',
    })
  }
})
