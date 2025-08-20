<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">
        🎉 Nuxt 3 + AWS Cognito
      </h1>

      <!-- 로딩 상태 -->
      <div v-if="isLoading" class="text-center py-4">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"
        ></div>
        <p class="text-gray-600 mt-2">인증 상태 확인 중...</p>
      </div>

      <!-- 로그인 상태 -->
      <div v-else-if="isAuthenticated" class="space-y-4">
        <div class="bg-green-50 border border-green-200 rounded-lg p-4">
          <p class="text-green-800 font-semibold">✅ 로그인됨</p>
          <p class="text-green-600 text-sm mt-1">관리자로 로그인되었습니다</p>
          <div v-if="user" class="mt-2 text-xs text-green-700">
            <p><strong>사용자 ID:</strong> {{ user.username }}</p>
            <p><strong>User ID:</strong> {{ user.userId }}</p>
          </div>
        </div>

        <div class="space-y-3">
          <NuxtLink
            to="/test"
            class="block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-center transition-colors"
          >
            📊 테스트 페이지로 이동
          </NuxtLink>

          <button
            @click="handleLogout"
            class="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            🚪 로그아웃
          </button>
        </div>
      </div>

      <!-- 비로그인 상태 -->
      <div v-else class="space-y-4">
        <p class="text-gray-600 mb-6">
          관리자 페이지에 접근하려면 로그인이 필요합니다.
        </p>

        <div class="space-y-3">
          <NuxtLink
            to="/login"
            class="block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-center transition-colors"
          >
            🔐 관리자 로그인
          </NuxtLink>

          <NuxtLink
            to="/test"
            class="block bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 text-center transition-colors"
          >
            📊 테스트 페이지 (공개)
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 인증 상태 관리
const { user, isAuthenticated, isLoading, checkAuth, logout } = useAuth()

// 페이지 로드 시 인증 상태 확인
onMounted(async () => {
  console.log('Index page loaded! - 인증 상태 확인 시작')
  await checkAuth()
  console.log('인증 상태 확인 완료:', {
    isAuthenticated: isAuthenticated.value,
    isLoading: isLoading.value,
    hasUser: !!user.value,
  })
})

// 로그아웃 처리
const handleLogout = async () => {
  try {
    console.log('로그아웃 시작')
    await logout()
    console.log('로그아웃 완료')
  } catch (error) {
    console.error('로그아웃 실패:', error)
  }
}

useHead({
  title: 'Nuxt 3 + AWS Cognito 관리자 페이지',
})
</script>
