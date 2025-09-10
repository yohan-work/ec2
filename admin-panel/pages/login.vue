<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4"
  >
    <div class="w-full max-w-md space-y-6">
      <!-- 로고/브랜드 영역 -->
      <div class="text-center space-y-2">
        <div
          class="mx-auto bg-primary rounded-xl flex items-center justify-center mb-4"
        >
          <img src="~/public/assets/concentrix-logo.svg" alt="" />
        </div>
        <h1 class="text-3xl font-bold tracking-tight text-foreground">
          관리자 로그인
        </h1>
      </div>

      <!-- 로그인 카드 -->
      <div
        class="bg-card border border-border rounded-xl shadow-lg p-8 space-y-6"
      >
        <!-- 로딩 상태 -->
        <div v-if="isLoading" class="text-center py-8">
          <div
            class="mx-auto w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"
          ></div>
          <p class="text-sm text-muted-foreground mt-3">로그인 중...</p>
        </div>

        <!-- 로그인 버튼 -->
        <template v-else>
          <div class="space-y-4">
            <button
              @click="handleLogin"
              :disabled="isLoading"
              class="w-full group relative flex items-center justify-center gap-3 rounded-lg bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md"
            >
              <svg
                class="w-5 h-5 transition-transform group-hover:translate-x-0.5"
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
              AWS Cognito로 로그인
            </button>

            <div class="text-center">
              <p class="text-xs text-muted-foreground">
                AWS Cognito Hosted UI로 리다이렉트됩니다
              </p>
            </div>
          </div>
        </template>

        <!-- 구분선 -->

        <!-- 설정 정보 -->
        <div class="rounded-lg border border-border bg-muted/30 p-4 space-y-2">
          <div
            class="flex items-center gap-2 text-xs font-medium text-foreground"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            연결 설정
          </div>
          <div class="space-y-1 text-xs text-muted-foreground">
            <div class="flex justify-between">
              <span>리전:</span>
              <span class="font-mono">{{ config.public.cognitoRegion }}</span>
            </div>
            <div class="flex justify-between">
              <span>클라이언트 ID:</span>
              <span class="font-mono">{{ maskedClientId }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 홈으로 돌아가기 -->
      <div class="text-center">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
        >
          <svg
            class="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          홈으로 돌아가기
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
