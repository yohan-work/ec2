import { prisma } from '~/lib/prisma'

export default defineEventHandler(async event => {
  try {
    const id = parseInt(getRouterParam(event, 'id') || '0')

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: '유효하지 않은 사용자 ID입니다.',
      })
    }

    const user = await prisma.dms_admin_users.findUnique({
      where: { id },
    })

    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: '사용자를 찾을 수 없습니다.',
      })
    }

    return {
      success: true,
      data: user,
    }
  } catch (error: any) {
    console.error('DMS 사용자 조회 오류:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: '사용자 조회 중 오류가 발생했습니다.',
    })
  }
})
