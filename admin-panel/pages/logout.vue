<template>
  <div class="min-h-screen flex items-center justify-center bg-background">
    <div class="w-full max-w-md p-8">
      <div class="rounded-lg border bg-card p-6 text-card-foreground shadow-lg">
        <!-- 로그아웃 확인 -->
        <div v-if="!isLoggingOut && isAuthenticated" class="text-center">
          <div class="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </div>
          <h2 class="text-lg font-semibold mb-2">로그아웃 하시겠습니까?</h2>
          <p class="text-sm text-muted-foreground mb-6">
            현재 {{ getUserDisplayName() }}님으로 로그인되어 있습니다
          </p>
          
          <div class="space-y-3">
            <button
              @click="handleLogout"
              class="w-full rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
            >
              로그아웃
            </button>
            <button
              @click="goBack"
              class="w-full rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
            >
              취소
            </button>
          </div>
        </div>

        <!-- 로그아웃 처리 중 -->
        <div v-else-if="isLoggingOut" class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 class="text-lg font-semibold mb-2">로그아웃 중...</h2>
          <p class="text-sm text-muted-foreground">
            안전하게 로그아웃 처리하고 있습니다
          </p>
        </div>

        <!-- 로그아웃 완료 -->
        <div v-else-if="logoutComplete" class="text-center">
          <div class="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 class="text-lg font-semibold mb-2 text-green-600">로그아웃 완료</h2>
          <p class="text-sm text-muted-foreground mb-4">
            안전하게 로그아웃되었습니다
          </p>
          <NuxtLink
            to="/"
            class="inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            홈으로 이동
          </NuxtLink>
        </div>

        <!-- 로그인되지 않은 상태 -->
        <div v-else class="text-center">
          <div class="w-12 h-12 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 class="text-lg font-semibold mb-2">이미 로그아웃된 상태입니다</h2>
          <p class="text-sm text-muted-foreground mb-4">
            현재 로그인되어 있지 않습니다
          </p>
          <div class="space-y-2">
            <NuxtLink
              to="/login"
              class="block w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors text-center"
            >
              로그인
            </NuxtLink>
            <NuxtLink
              to="/"
              class="block w-full rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors text-center"
            >
              홈으로 이동
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { logout, isAuthenticated, getUserInfo } = useAuth()

// 상태 관리
const isLoggingOut = ref(false)
const logoutComplete = ref(false)

// 사용자 표시 이름
const getUserDisplayName = () => {
  const userInfo = getUserInfo()
  return userInfo.username || userInfo.userId || 'User'
}

// 로그아웃 처리
const handleLogout = async () => {
  try {
    isLoggingOut.value = true
    await logout()
    
    // 로그아웃 완료 상태 표시
    logoutComplete.value = true
    
    // 3초 후 홈으로 리다이렉트
    setTimeout(() => {
      navigateTo('/')
    }, 3000)
  } catch (error) {
    console.error('Logout error:', error)
    // 에러가 발생해도 로그아웃 상태로 간주
    logoutComplete.value = true
  } finally {
    isLoggingOut.value = false
  }
}

// 이전 페이지로 돌아가기
const goBack = () => {
  const router = useRouter()
  if (window.history.length > 1) {
    router.back()
  } else {
    navigateTo('/')
  }
}

// 메타 태그
useHead({
  title: '로그아웃 - AWS Cognito',
  meta: [
    { name: 'description', content: 'AWS Cognito 로그아웃' }
  ]
})
</script>
