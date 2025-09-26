import { prisma } from '~/lib/prisma'
import { logDmsHistory } from '~/server/api/dms/history/utils'

export default defineEventHandler(async event => {
  try {
    const body = await readBody(event)
    const { name, leader_id, sort_order } = body

    if (!name) {
      throw createError({
        statusCode: 400,
        statusMessage: '본부명은 필수입니다',
      })
    }

    // 최대 sort_order 값 가져오기
    const maxSortOrder = await (prisma as any).dms_headquarters.aggregate({
      _max: {
        sort_order: true,
      },
    })

    const newHeadquarters = await (prisma as any).dms_headquarters.create({
      data: {
        name,
        leader_id: leader_id || null,
        sort_order: sort_order || (maxSortOrder._max.sort_order || 0) + 1,
      },
      include: {
        groups: true,
        employees: true,
      },
    })

    // 히스토리 로깅
    await logDmsHistory(
      {
        menu_name: '조직 관리',
        action_type: 'Insert',
        details: `신규 본부 추가: ${name}`,
      },
      event
    )

    return {
      success: true,
      data: newHeadquarters,
    }
  } catch (error: any) {
    console.error('Error creating headquarters:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create headquarters',
    })
  }
})
