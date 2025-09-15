import { prisma } from '~/lib/prisma'

export default defineEventHandler(async event => {
  try {
    // 쿠키에서 세션 정보 가져오기
    const sessionCookie = getCookie(event, 'dms_session')

    if (!sessionCookie) {
      throw createError({
        statusCode: 401,
        statusMessage: '로그인이 필요합니다.',
      })
    }

    let sessionData
    try {
      sessionData = JSON.parse(sessionCookie)
    } catch (parseError) {
      throw createError({
        statusCode: 401,
        statusMessage: '유효하지 않은 세션입니다.',
      })
    }

    // 세션 만료 시간 체크 (8시간)
    const sessionExpiry = 8 * 60 * 60 * 1000 // 8시간을 밀리초로 변환
    const loginTime = new Date(sessionData.loginTime)
    const now = new Date()

    if (now.getTime() - loginTime.getTime() > sessionExpiry) {
      // 세션 만료 시 쿠키 삭제
      deleteCookie(event, 'dms_session', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })

      throw createError({
        statusCode: 401,
        statusMessage: '세션이 만료되었습니다. 다시 로그인해주세요.',
      })
    }

    // 사용자 정보 재확인
    const user = await prisma.dms_admin_users.findUnique({
      where: {
        id: sessionData.id,
      },
      select: {
        id: true,
        email: true,
        employee_id: true,
        is_active: true,
      },
    })

    if (!user || !user.is_active) {
      // 세션 쿠키 삭제
      deleteCookie(event, 'dms_session', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })

      throw createError({
        statusCode: 401,
        statusMessage: '유효하지 않은 사용자입니다.',
      })
    }

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        employee_id: user.employee_id,
      },
    }
  } catch (error: any) {
    console.error('DMS 세션 확인 오류:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: '세션 확인 중 오류가 발생했습니다.',
    })
  } finally {
    await prisma.$disconnect()
  }
})
