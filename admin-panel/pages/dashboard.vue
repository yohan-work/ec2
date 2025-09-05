<template>
  <div class="min-h-screen bg-background">
    <!-- 헤더 -->
    <header class="bg-card border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-foreground">
              관리자 대시보드
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

        <!-- 시스템 성능 모니터링 -->
        <div class="mt-8">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-foreground">시스템 성능</h3>
            <div class="flex items-center space-x-2">
              <button
                @click="fetchMetrics"
                :disabled="metricsLoading"
                class="inline-flex items-center px-3 py-2 text-xs font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50"
              >
                <svg
                  :class="{ 'animate-spin': metricsLoading }"
                  class="w-3 h-3 mr-1"
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
              <div class="text-xs text-muted-foreground">
                {{ metricsLastUpdated ? formatTime(metricsLastUpdated) : '' }}
              </div>
            </div>
          </div>

          <!-- 성능 메트릭 그리드 -->
          <div
            v-if="metrics"
            class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            <!-- 메모리 사용률 -->
            <div class="bg-card rounded-lg border shadow-sm p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div
                    class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-4 h-4 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                      />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <h4 class="text-sm font-medium text-muted-foreground">
                      메모리
                    </h4>
                    <p class="text-lg font-semibold text-foreground">
                      {{ metrics.system.memory.usagePercent }}%
                    </p>
                    <p class="text-xs text-muted-foreground">
                      {{ metrics.system.memory.used }}GB /
                      {{ metrics.system.memory.total }}GB
                    </p>
                  </div>
                </div>
                <div class="flex flex-col items-end">
                  <div class="w-12 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      :class="
                        getProgressBarClass(metrics.system.memory.usagePercent)
                      "
                      class="h-full rounded-full transition-all duration-300"
                      :style="{
                        width: `${Math.min(metrics.system.memory.usagePercent, 100)}%`,
                      }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- CPU 로드 -->
            <div class="bg-card rounded-lg border shadow-sm p-4">
              <div class="flex items-center">
                <div
                  class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-4 h-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                    />
                  </svg>
                </div>
                <div class="ml-3">
                  <h4 class="text-sm font-medium text-muted-foreground">
                    CPU 로드
                  </h4>
                  <p class="text-lg font-semibold text-foreground">
                    {{ metrics.system.cpu.loadAverage[0] }}
                  </p>
                  <p class="text-xs text-muted-foreground">
                    {{ metrics.system.cpu.cores }}코어
                  </p>
                </div>
              </div>
            </div>

            <!-- DB 응답 시간 -->
            <div class="bg-card rounded-lg border shadow-sm p-4">
              <div class="flex items-center">
                <div
                  class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-4 h-4 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                    />
                  </svg>
                </div>
                <div class="ml-3">
                  <h4 class="text-sm font-medium text-muted-foreground">
                    DB 응답시간
                  </h4>
                  <p class="text-lg font-semibold text-foreground">
                    {{ metrics.database.responseTime }}ms
                  </p>
                  <div class="flex items-center">
                    <div
                      :class="
                        metrics.database.connected
                          ? 'bg-green-500'
                          : 'bg-red-500'
                      "
                      class="w-2 h-2 rounded-full mr-1"
                    ></div>
                    <span
                      class="text-xs"
                      :class="
                        metrics.database.connected
                          ? 'text-green-600'
                          : 'text-red-600'
                      "
                    >
                      {{ metrics.database.connected ? '연결됨' : '연결 끊김' }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 24시간 활동 -->
            <div class="bg-card rounded-lg border shadow-sm p-4">
              <div class="flex items-center">
                <div
                  class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-4 h-4 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div class="ml-3">
                  <h4 class="text-sm font-medium text-muted-foreground">
                    24시간 활동
                  </h4>
                  <p class="text-lg font-semibold text-foreground">
                    {{
                      metrics.application.recentNewsletters +
                      metrics.application.recentRecruits
                    }}
                  </p>
                  <p class="text-xs text-muted-foreground">
                    뉴스레터 {{ metrics.application.recentNewsletters }}, 채용
                    {{ metrics.application.recentRecruits }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- 로딩 상태 -->
          <div v-else-if="metricsLoading" class="text-center py-12">
            <div
              class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"
            ></div>
            <p class="mt-4 text-muted-foreground">
              시스템 메트릭을 로드하는 중...
            </p>
          </div>

          <!-- 에러 상태 -->
          <div v-else-if="metricsError" class="text-center py-12">
            <svg
              class="mx-auto h-12 w-12 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-foreground">
              메트릭 로드 실패
            </h3>
            <p class="mt-1 text-sm text-muted-foreground">{{ metricsError }}</p>
            <button
              @click="fetchMetrics"
              class="mt-4 text-primary hover:text-primary/80"
            >
              다시 시도
            </button>
          </div>
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

// 성능 모니터링 상태
const metrics = ref(null)
const metricsLoading = ref(false)
const metricsError = ref(null)
const metricsLastUpdated = ref(null)

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

// 시스템 메트릭 가져오기
const fetchMetrics = async () => {
  try {
    metricsLoading.value = true
    metricsError.value = null

    const { data } = await $fetch('/api/system/metrics')
    metrics.value = data
    metricsLastUpdated.value = new Date()
  } catch (error) {
    console.error('메트릭 가져오기 실패:', error)
    metricsError.value =
      error.data?.statusMessage || '메트릭을 가져올 수 없습니다.'
  } finally {
    metricsLoading.value = false
  }
}

// 진행바 색상 클래스
const getProgressBarClass = percentage => {
  if (percentage >= 90) return 'bg-red-500'
  if (percentage >= 70) return 'bg-yellow-500'
  return 'bg-green-500'
}

// 시간 포맷팅
const formatTime = date => {
  if (!date) return ''
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

// 페이지 새로고침
const refreshPage = () => {
  if (process.client) {
    window.location.reload()
  }
}

// 컴포넌트 마운트 시 메트릭 로드
onMounted(() => {
  fetchMetrics()

  // 30초마다 자동 새로고침 (옵션)
  const interval = setInterval(fetchMetrics, 30000)

  // 컴포넌트 언마운트 시 interval 정리
  onUnmounted(() => {
    clearInterval(interval)
  })
})

// 메타 태그
useHead({
  title: '관리자 대시보드 - AWS Cognito',
  meta: [{ name: 'description', content: '관리자 전용 대시보드' }],
})
</script>
