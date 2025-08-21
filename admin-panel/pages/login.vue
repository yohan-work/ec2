<template>
  <div class="min-h-screen flex items-center justify-center bg-background">
    <div class="w-full max-w-md p-8">
      <!-- 로그인 카드 -->
      <div class="rounded-lg border bg-card p-6 text-card-foreground shadow-lg">
        <div class="mb-6 text-center">
          <h1 class="text-2xl font-bold text-foreground mb-2">
            🔐 관리자 로그인
          </h1>
          <p class="text-sm text-muted-foreground">
            AWS Cognito로 안전하게 로그인하세요
          </p>
        </div>

        <div class="space-y-4">
          <!-- 로딩 상태 -->
          <div v-if="isLoading" class="text-center py-4">
            <div
              class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"
            ></div>
            <p class="text-sm text-muted-foreground mt-2">로그인 중...</p>
          </div>

          <!-- 로그인 버튼 -->
          <template v-else>
            <button
              @click="handleLogin"
              :disabled="isLoading"
              class="w-full flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Cognito로 로그인
            </button>

            <div class="text-center pt-4">
              <p class="text-xs text-muted-foreground">
                AWS Cognito Hosted UI로 리다이렉트됩니다
              </p>
            </div>
          </template>
        </div>

        <!-- 설정 정보 -->
        <div class="mt-6 p-3 bg-muted rounded text-xs text-muted-foreground">
          <p><strong>설정:</strong></p>
          <p>리전: {{ config.public.cognitoRegion }}</p>
          <p>클라이언트 ID: {{ maskedClientId }}</p>
        </div>
      </div>

      <!-- 홈으로 돌아가기 -->
      <div class="mt-4 text-center">
        <NuxtLink
          to="/"
          class="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← 홈으로 돌아가기
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const { login, isLoading, isAuthenticated, checkAuth } = useAuth()
const config = useRuntimeConfig()

// 페이지 로드 시 인증 상태 확인
onMounted(async () => {
  console.log('로그인 페이지 마운트됨 - 인증 상태 확인 시작')
  await checkAuth()
  console.log('인증 상태 확인 완료')
})

// 클라이언트 ID 마스킹
const maskedClientId = computed(() => {
  const clientId = config.public.cognitoAppClientId
  if (!clientId) return 'N/A'
  if (clientId.length <= 8) return clientId
  return clientId.slice(0, 4) + '***' + clientId.slice(-4)
})

// 이미 로그인된 경우 대시보드로 리다이렉트
watch(isAuthenticated, newVal => {
  if (newVal) {
    console.log('이미 인증됨 - 대시보드로 리다이렉트')
    if (process.client) {
      navigateTo('/dashboard')
    }
  }
})

// 로그인 처리
const handleLogin = async () => {
  try {
    console.log('로그인 시도 시작')
    await login()
  } catch (error) {
    console.error('로그인 실패:', error)
    // 에러 처리를 위한 토스트나 알림을 여기에 추가할 수 있습니다
  }
}

// 메타 태그
useHead({
  title: '관리자 로그인 - AWS Cognito',
  meta: [{ name: 'description', content: 'AWS Cognito를 통한 관리자 로그인' }],
})
</script>
