<template>
  <div class="min-h-screen bg-background">
    <!-- 헤더 -->
    <header class="bg-card border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-foreground">
              🛠️ 관리자 대시보드
            </h1>
          </div>

          <div class="flex items-center space-x-4">
            <!-- 사용자 정보 -->
            <div v-if="user" class="flex items-center space-x-3">
              <div class="text-sm">
                <p class="font-medium text-foreground">
                  {{ getUserDisplayName() }}
                </p>
                <p class="text-muted-foreground">관리자</p>
              </div>

              <!-- 로그아웃 버튼 -->
              <button
                @click="handleLogout"
                :disabled="isLoggingOut"
                class="inline-flex items-center px-3 py-2 border border-destructive text-sm font-medium rounded-md text-destructive-foreground bg-destructive hover:bg-destructive/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg
                  v-if="!isLoggingOut"
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <div
                  v-else
                  class="animate-spin rounded-full h-4 w-4 border-b-2 border-destructive-foreground mr-2"
                ></div>
                {{ isLoggingOut ? '로그아웃 중...' : '로그아웃' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- 메인 콘텐츠 -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <!-- 환영 메시지 -->
        <div class="bg-card rounded-lg shadow p-6 mb-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div
                class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div class="ml-5">
              <h2 class="text-lg font-medium text-foreground">
                환영합니다, {{ getUserDisplayName() }}님!
              </h2>
              <p class="text-muted-foreground">
                관리자 대시보드에 성공적으로 로그인되었습니다.
              </p>
              <div
                class="mt-2 p-2 bg-muted rounded text-xs text-muted-foreground"
              >
                <strong>Cognito User ID:</strong>
                {{ getUserInfo().userId || getUserInfo().username || 'N/A' }}
              </div>
            </div>
          </div>
        </div>

        <!-- 대시보드 그리드 -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <!-- 뉴스레터 관리 -->
          <NuxtLink
            to="/admin/newsletters"
            class="bg-card rounded-lg shadow p-6 hover:shadow-md transition-shadow block"
          >
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div
                  class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5 text-blue-600 dark:text-blue-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <h3 class="text-lg font-medium text-foreground">
                  뉴스레터 관리
                </h3>
                <p class="text-sm text-muted-foreground">
                  뉴스레터 콘텐츠를 생성하고 관리합니다
                </p>
              </div>
            </div>
            <div class="mt-4">
              <span
                class="text-sm text-primary hover:text-primary/80 font-medium"
              >
                뉴스레터 관리 →
              </span>
            </div>
          </NuxtLink>

          <!-- 채용공고 관리 -->
          <NuxtLink
            to="/admin/recruits"
            class="bg-card rounded-lg shadow p-6 hover:shadow-md transition-shadow block"
          >
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div
                  class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5 text-green-600 dark:text-green-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"
                    />
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <h3 class="text-lg font-medium text-foreground">
                  채용공고 관리
                </h3>
                <p class="text-sm text-muted-foreground">
                  채용공고를 생성하고 관리합니다
                </p>
              </div>
            </div>
            <div class="mt-4">
              <span
                class="text-sm text-primary hover:text-primary/80 font-medium"
              >
                채용공고 관리 →
              </span>
            </div>
          </NuxtLink>

          <!-- 시스템 로그 -->
          <NuxtLink
            to="/admin/logs"
            class="bg-card rounded-lg shadow p-6 hover:shadow-md transition-shadow block"
          >
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div
                  class="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5 text-purple-600 dark:text-purple-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <h3 class="text-lg font-medium text-foreground">시스템 로그</h3>
                <p class="text-sm text-muted-foreground">
                  시스템 활동 로그를 확인합니다
                </p>
              </div>
            </div>
            <div class="mt-4">
              <span
                class="text-sm text-primary hover:text-primary/80 font-medium"
              >
                로그 보기 →
              </span>
            </div>
          </NuxtLink>
        </div>

        <!-- 최근 활동 -->
        <div class="mt-8">
          <div class="bg-card rounded-lg shadow">
            <div class="px-6 py-4 border-b">
              <h3 class="text-lg font-medium text-foreground">최근 활동</h3>
            </div>
            <div class="p-6">
              <div class="text-center py-12">
                <svg
                  class="mx-auto h-12 w-12 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <h3 class="mt-2 text-sm font-medium text-foreground">
                  활동 없음
                </h3>
                <p class="mt-1 text-sm text-muted-foreground">
                  아직 기록된 활동이 없습니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 빠른 액션 -->
        <div class="mt-8">
          <h3 class="text-lg font-medium text-foreground mb-4">빠른 액션</h3>
          <div class="flex flex-wrap gap-4">
            <NuxtLink
              to="/test"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
            >
              <svg
                class="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              테스트 페이지
            </NuxtLink>

            <button
              @click="refreshPage"
              class="inline-flex items-center px-4 py-2 border border-input text-sm font-medium rounded-md text-foreground bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <svg
                class="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              새로고침
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// 인증 확인을 위한 미들웨어 적용
definePageMeta({
  middleware: 'auth',
})

const { user, isAuthenticated, getUserInfo, logout } = useAuth()
const isLoggingOut = ref(false)

// 사용자 표시 이름
const getUserDisplayName = () => {
  const userInfo = getUserInfo()
  return userInfo.username || userInfo.userId || '관리자'
}

// 로그아웃 처리
const handleLogout = async () => {
  try {
    isLoggingOut.value = true
    console.log('대시보드에서 로그아웃 시작')
    await logout()
  } catch (error) {
    console.error('로그아웃 실패:', error)
    // 에러가 발생해도 로그아웃 중 상태는 해제
    isLoggingOut.value = false
  }
}

// 페이지 새로고침
const refreshPage = () => {
  if (process.client) {
    window.location.reload()
  }
}

// 메타 태그
useHead({
  title: '관리자 대시보드 - AWS Cognito',
  meta: [{ name: 'description', content: '관리자 전용 대시보드' }],
})
</script>
