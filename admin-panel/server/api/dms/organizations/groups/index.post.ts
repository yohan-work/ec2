import { prisma } from '~/lib/prisma'
import { logDmsHistory } from '~/server/api/dms/history/utils'

export default defineEventHandler(async event => {
  try {
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

    // 해당 본부 내에서 최대 sort_order 값 가져오기
    const maxSortOrder = await (prisma as any).dms_groups.aggregate({
      where: { headquarters_id },
      _max: {
        sort_order: true,
      },
    })

    const newGroup = await (prisma as any).dms_groups.create({
      data: {
        name,
        headquarters_id,
        leader_id: leader_id || null,
        sort_order: sort_order || (maxSortOrder._max.sort_order || 0) + 1,
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
        action_type: 'Insert',
        details: `신규 그룹 추가: ${name} (본부: ${headquarters.name})`,
      },
      event
    )

    return {
      success: true,
      data: newGroup,
    }
  } catch (error: any) {
    console.error('Error creating group:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create group',
    })
  }
})
