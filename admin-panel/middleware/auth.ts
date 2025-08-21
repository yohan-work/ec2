// @ts-nocheck
export default defineNuxtRouteMiddleware(async (to, from) => {
  // 서버사이드에서는 실행하지 않음
  if (process.server) return

  // 클라이언트에서만 실행
  if (process.client) {
    try {
      const { isAuthenticated, isLoading, checkAuth } = useAuth()

      // 인증 상태 확인
      await checkAuth()

      // 인증되지 않은 경우 로그인 페이지로 리다이렉트
      if (!isAuthenticated.value) {
        console.log('인증되지 않음 - 로그인 페이지로 리다이렉트')
        return navigateTo('/login')
      }

      console.log('인증 확인됨 - 페이지 접근 허용')
    } catch (error) {
      console.error('인증 미들웨어 에러:', error)
      return navigateTo('/login')
    }
  }
})
