<template>
  <div class="min-h-screen flex items-center justify-center bg-background">
    <div class="w-full max-w-md p-8">
      <div class="rounded-lg border bg-card p-6 text-card-foreground shadow-lg">
        <!-- 로딩 상태 -->
        <div v-if="isProcessing" class="text-center">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"
          ></div>
          <h2 class="text-lg font-semibold mb-2">로그인 처리 중...</h2>
          <p class="text-sm text-muted-foreground">
            AWS Cognito에서 인증 정보를 확인하고 있습니다
          </p>
        </div>

        <!-- 성공 상태 -->
        <div v-else-if="isSuccess && user" class="text-center">
          <div
            class="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 class="text-lg font-semibold mb-2 text-green-600">
            로그인 성공!
          </h2>
          <p class="text-sm text-muted-foreground mb-4">
            환영합니다, {{ getUserDisplayName() }}님
          </p>
          <button
            @click="redirectToHome"
            class="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            관리자 페이지로 이동
          </button>
        </div>

        <!-- 에러 상태 -->
        <div v-else-if="error" class="text-center">
          <div
            class="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 class="text-lg font-semibold mb-2 text-red-600">로그인 실패</h2>
          <p class="text-sm text-muted-foreground mb-4">{{ error }}</p>
          <div class="space-y-2">
            <button
              @click="retryAuth"
              class="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              다시 시도
            </button>
            <NuxtLink
              to="/login"
              class="block w-full rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors text-center"
            >
              로그인 페이지로 이동
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { handleOAuthCallback, checkAuth, user, isAuthenticated, getUserInfo } =
  useAuth()

// 상태 관리
const isProcessing = ref(true)
const isSuccess = ref(false)
const error = ref(null)

// 사용자 표시 이름
const getUserDisplayName = () => {
  const userInfo = getUserInfo()
  return userInfo.username || userInfo.userId || 'User'
}

// 홈으로 리다이렉트
const redirectToHome = () => {
  navigateTo('/')
}

// 재시도
const retryAuth = async () => {
  isProcessing.value = true
  error.value = null
  await processCallback()
}

// 콜백 처리
const processCallback = async () => {
  try {
    // URL에서 인증 코드 확인
    const route = useRoute()
    const code = route.query.code
    const state = route.query.state
    const error = route.query.error
    const errorDescription = route.query.error_description

    console.log('콜백 URL 파라미터:', {
      code,
      state,
      error,
      errorDescription,
      fullQuery: route.query,
      fullPath: route.fullPath,
    })

    // 현재 브라우저 URL 정보도 출력
    if (process.client) {
      console.log('브라우저 URL 정보:', {
        href: window.location.href,
        search: window.location.search,
        hash: window.location.hash,
        pathname: window.location.pathname,
      })
    }

    // OAuth 에러가 있는 경우
    if (error) {
      throw new Error(
        `OAuth 에러: ${error} - ${errorDescription || '알 수 없는 에러'}`
      )
    }

    if (!code) {
      throw new Error('인증 코드가 없습니다. AWS Cognito 설정을 확인해주세요.')
    }

    console.log('인증 코드 확인됨. OAuth 토큰 교환 시작...')

    // OAuth 토큰 교환 처리
    const tokenExchangeSuccess = await handleOAuthCallback()
    console.log('토큰 교환 완료:', tokenExchangeSuccess)

    if (!tokenExchangeSuccess) {
      throw new Error(
        'OAuth 토큰 교환에 실패했습니다. AWS Cognito 설정을 확인해주세요.'
      )
    }

    console.log('토큰 교환 성공! 인증 상태 확인 중...')

    // 인증 상태 확인
    await checkAuth()

    console.log('checkAuth 완료. 현재 상태:', {
      isAuthenticated: isAuthenticated.value,
      hasUser: !!user.value,
      userValue: user.value,
    })

    // 잠시 대기 (UI 개선을 위함)
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (isAuthenticated.value && user.value) {
      console.log('로그인 성공! 사용자 정보:', user.value)
      isSuccess.value = true

      // 3초 후 자동으로 홈으로 리다이렉트
      setTimeout(() => {
        console.log('홈으로 자동 리다이렉트')
        redirectToHome()
      }, 3000)
    } else {
      console.error('인증 실패. 상태:', {
        isAuthenticated: isAuthenticated.value,
        user: user.value,
      })
      throw new Error('인증에 실패했습니다. 다시 로그인해주세요.')
    }
  } catch (err) {
    console.error('Callback processing error:', err)
    error.value = err.message || '알 수 없는 오류가 발생했습니다.'
  } finally {
    isProcessing.value = false
  }
}

// 컴포넌트 마운트 시 콜백 처리
onMounted(async () => {
  // 클라이언트에서만 실행
  if (process.client) {
    await processCallback()
  }
})

// 메타 태그
useHead({
  title: '로그인 처리 중... - AWS Cognito',
  meta: [{ name: 'description', content: 'AWS Cognito 로그인 콜백 처리' }],
})
</script>
