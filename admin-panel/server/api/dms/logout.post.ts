export default defineEventHandler(async event => {
  try {
    // Content-Type 확인하여 FormData와 JSON 모두 처리
    const contentType = getHeader(event, 'content-type') || ''

    // FormData인 경우 (sendBeacon 사용 시)
    // JSON인 경우 (일반적인 로그아웃)
    // Content-Type이 없는 경우 (sendBeacon의 fallback)

    // 쿠키에서 세션 정보 제거
    deleteCookie(event, 'dms_session', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })

    return {
      success: true,
      message: '로그아웃되었습니다.',
    }
  } catch (error: any) {
    console.error('DMS 로그아웃 오류:', error)

    throw createError({
      statusCode: 500,
      statusMessage: '로그아웃 중 오류가 발생했습니다.',
    })
  }
})
