import { prisma } from '~/lib/prisma'

export default defineEventHandler(async event => {
  try {
    const body = await readBody(event)
    const {
      admin_name,
      employee_id,
      menu_name,
      action_type,
      details,
      ip_address,
    } = body

    // 필수 필드 검증
    if (!admin_name || !menu_name || !action_type || !details || !ip_address) {
      throw createError({
        statusCode: 400,
        statusMessage: '필수 필드가 누락되었습니다.',
      })
    }

    // 액션 타입 검증
    const validActions = ['Insert', 'Update', 'Delete']
    if (!validActions.includes(action_type)) {
      throw createError({
        statusCode: 400,
        statusMessage: '유효하지 않은 작업 타입입니다.',
      })
    }

    // 히스토리 생성
    const history = await prisma.dms_change_history.create({
      data: {
        admin_name,
        employee_id: employee_id || null,
        menu_name,
        action_type,
        details,
        ip_address,
      },
    })

    return {
      success: true,
      data: history,
    }
  } catch (error) {
    console.error('히스토리 생성 오류:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '히스토리 생성 중 오류가 발생했습니다.',
    })
  }
})
