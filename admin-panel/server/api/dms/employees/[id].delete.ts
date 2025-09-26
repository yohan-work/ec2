import { prisma } from '~/lib/prisma'
import { logDmsHistory } from '~/server/api/dms/history/utils'

export default defineEventHandler(async event => {
  try {
    const id = parseInt(getRouterParam(event, 'id') || '0')

    if (!id || isNaN(id)) {
      throw createError({
        statusCode: 400,
        statusMessage: '올바른 직원 ID가 아닙니다.',
      })
    }

    // 직원 존재 확인
    const existingEmployee = await prisma.dms_employees.findUnique({
      where: { id },
      select: { id: true, name: true, email: true },
    })

    if (!existingEmployee) {
      throw createError({
        statusCode: 404,
        statusMessage: '해당 직원을 찾을 수 없습니다.',
      })
    }

    // 직원 삭제 (Cascade로 관련 데이터도 함께 삭제됨)
    await prisma.dms_employees.delete({
      where: { id },
    })

    // 변경 히스토리 기록
    await logDmsHistory(
      {
        menu_name: '직원 관리',
        action_type: 'Delete',
        details: `직원 삭제: ${existingEmployee.name} (${existingEmployee.email})`,
      },
      event
    )

    return {
      success: true,
      message: '직원이 성공적으로 삭제되었습니다.',
    }
  } catch (error: any) {
    console.error('직원 삭제 오류:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: '직원을 삭제하는 중 오류가 발생했습니다.',
    })
  }
})
