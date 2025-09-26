import { prisma } from '~/lib/prisma'
import { logDmsHistory } from '~/server/api/dms/history/utils'

export default defineEventHandler(async event => {
  try {
    const id = parseInt(getRouterParam(event, 'id') || '0')

    // 본부에 소속된 그룹이 있는지 확인
    const groupsCount = await (prisma as any).dms_groups.count({
      where: { headquarters_id: id },
    })

    if (groupsCount > 0) {
      throw createError({
        statusCode: 400,
        statusMessage: '소속 그룹이 있는 본부는 삭제할 수 없습니다',
      })
    }

    // 본부에 소속된 직원이 있는지 확인
    const employeesCount = await (prisma as any).dms_employees.count({
      where: { headquarter_id: id },
    })

    if (employeesCount > 0) {
      throw createError({
        statusCode: 400,
        statusMessage: '소속 직원이 있는 본부는 삭제할 수 없습니다',
      })
    }

    // 삭제 전 본부 정보 조회 (히스토리 기록용)
    const headquartersInfo = await (prisma as any).dms_headquarters.findUnique({
      where: { id },
      select: { name: true },
    })

    await (prisma as any).dms_headquarters.delete({
      where: { id },
    })

    // 히스토리 로깅
    await logDmsHistory(
      {
        menu_name: '조직 관리',
        action_type: 'Delete',
        details: `본부 삭제: ${headquartersInfo?.name || 'Unknown'} (ID: ${id})`,
      },
      event
    )

    return {
      success: true,
      message: '본부가 성공적으로 삭제되었습니다',
    }
  } catch (error: any) {
    console.error('Error deleting headquarters:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete headquarters',
    })
  }
})
