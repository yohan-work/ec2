export default defineEventHandler(async (event) => {
  try {
    // 쿠키에서 세션 정보 제거
    deleteCookie(event, 'dms_session', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    })

    return {
      success: true,
      message: '로그아웃되었습니다.'
    }

  } catch (error: any) {
    console.error('DMS 로그아웃 오류:', error)
    
    throw createError({
      statusCode: 500,
      statusMessage: '로그아웃 중 오류가 발생했습니다.'
    })
  }
})
