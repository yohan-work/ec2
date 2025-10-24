<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- 모바일 오버레이 -->
    <div
      v-if="sidebarOpen"
      @click="sidebarOpen = false"
      class="fixed inset-0 z-40 lg:hidden bg-black bg-opacity-25"
    ></div>

    <!-- 사이드바 -->
    <div
      :class="
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      "
      class="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:relative lg:z-0 lg:transform-none lg:h-screen flex flex-col"
    >
      <!-- 로고 영역 -->
      <div class="flex items-center px-6 py-4 border-b border-gray-200">
        <div class="flex items-center">
          <img src="~/public/assets/concentrix-logo.svg" alt="" />
        </div>
      </div>

      <!-- 네비게이션 메뉴 -->
      <nav class="flex-1 flex flex-col mt-6 px-3 overflow-y-auto">
        <div class="space-y-1">
          <!-- Dashboard -->
          <div
            class="bg-gray-100 text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"
          >
            <svg
              class="w-4 h-4 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2v2z"
              />
            </svg>
            Dashboard
          </div>

          <!-- 뉴스레터 관리 -->
          <NuxtLink
            to="/admin/newsletters"
            class="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
          >
            <svg
              class="w-4 h-4 mr-3"
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
            뉴스레터
          </NuxtLink>

          <!-- 시스템 로그 -->
          <NuxtLink
            to="/admin/logs"
            class="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
          >
            <svg
              class="w-4 h-4 mr-3"
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
            시스템 로그
          </NuxtLink>
        </div>

        <!-- 사용자 정보 및 로그아웃 -->
        <div
          class="mt-auto p-4 border-t border-gray-200 bg-white flex-shrink-0"
        >
          <div v-if="user" class="flex items-center">
            <div class="flex-shrink-0">
              <div
                class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
            <div class="ml-3 flex-1">
              <p class="text-sm font-medium text-gray-900">
                {{ getUserDisplayName() }}
              </p>
              <p class="text-xs text-gray-500">관리자</p>
            </div>
            <button
              @click="handleLogout"
              :disabled="isLoggingOut"
              class="ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
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
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </div>

    <!-- 메인 콘텐츠 영역 -->
    <div class="flex-1 flex flex-col min-h-0">
      <!-- 헤더 -->
      <header class="bg-white border-b border-gray-200">
        <div class="px-4 sm:px-6 py-4">
          <div class="flex items-center justify-between">
            <!-- 모바일 햄버거 메뉴 -->
            <button
              @click="sidebarOpen = !sidebarOpen"
              class="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 class="text-xl sm:text-2xl font-semibold text-gray-900">
              Admin
            </h1>
          </div>
        </div>
      </header>

      <!-- 메인 콘텐츠 -->
      <main class="flex-1 p-4 sm:p-6 overflow-y-auto min-h-0">
        <!-- 메트릭 카드들 -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <!-- 메모리 사용률 -->
          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">메모리 사용률</p>
                <div class="flex items-center mt-2">
                  <span class="text-2xl font-bold text-gray-900">
                    {{ metrics?.system.memory.usagePercent || '0' }}%
                  </span>
                  <span
                    class="ml-2 text-sm"
                    :class="
                      metrics?.system.memory.usagePercent >= 80
                        ? 'text-red-500'
                        : 'text-green-500'
                    "
                  >
                    <svg
                      class="w-4 h-4 inline mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                    {{
                      metrics?.system.memory.usagePercent >= 80
                        ? '높음'
                        : '정상'
                    }}
                  </span>
                </div>
                <p class="text-xs text-gray-500 mt-1">
                  {{ metrics?.system.memory.used || '0' }}GB /
                  {{ metrics?.system.memory.total || '0' }}GB 사용중
                </p>
              </div>
              <div class="p-3 bg-blue-50 rounded-lg">
                <svg
                  class="w-6 h-6 text-blue-600"
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
            </div>
          </div>

          <!-- CPU 로드 -->
          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">CPU 로드</p>
                <div class="flex items-center mt-2">
                  <span class="text-2xl font-bold text-gray-900">
                    {{ metrics?.system.cpu.loadAverage[0] || '0.0' }}
                  </span>
                  <span class="ml-2 text-sm text-green-500">
                    <svg
                      class="w-4 h-4 inline mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                    정상
                  </span>
                </div>
                <p class="text-xs text-gray-500 mt-1">
                  {{ metrics?.system.cpu.cores || '0' }}코어 시스템
                </p>
              </div>
              <div class="p-3 bg-green-50 rounded-lg">
                <svg
                  class="w-6 h-6 text-green-600"
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
            </div>
          </div>

          <!-- DB 응답시간 -->
          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">DB 응답시간</p>
                <div class="flex items-center mt-2">
                  <span class="text-2xl font-bold text-gray-900">
                    {{ metrics?.database.responseTime || '0' }}ms
                  </span>
                  <span
                    class="ml-2 text-sm"
                    :class="
                      metrics?.database.connected
                        ? 'text-green-500'
                        : 'text-red-500'
                    "
                  >
                    <div
                      :class="
                        metrics?.database.connected
                          ? 'bg-green-500'
                          : 'bg-red-500'
                      "
                      class="w-2 h-2 rounded-full inline-block mr-1"
                    ></div>
                    {{ metrics?.database.connected ? '연결됨' : '연결 끊김' }}
                  </span>
                </div>
                <p class="text-xs text-gray-500 mt-1">평균 응답 시간</p>
              </div>
              <div class="p-3 bg-purple-50 rounded-lg">
                <svg
                  class="w-6 h-6 text-purple-600"
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
            </div>
          </div>

          <!-- 24시간 활동 -->
          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">24시간 활동</p>
                <div class="flex items-center mt-2">
                  <span class="text-2xl font-bold text-gray-900">
                    {{
                      (metrics?.application.recentNewsletters || 0) +
                      (metrics?.application.recentRecruits || 0)
                    }}
                  </span>
                  <span class="ml-2 text-sm text-blue-500">
                    <svg
                      class="w-4 h-4 inline mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                    +4.5%
                  </span>
                </div>
                <p class="text-xs text-gray-500 mt-1">
                  뉴스레터 {{ metrics?.application.recentNewsletters || 0 }},
                </p>
              </div>
              <div class="p-3 bg-orange-50 rounded-lg">
                <svg
                  class="w-6 h-6 text-orange-600"
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
          </div>
        </div>

        <!-- 새로고침 버튼 -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-lg font-medium text-gray-900">시스템 모니터링</h2>
            <p class="text-sm text-gray-500">실시간 서버 상태 및 성능 지표</p>
          </div>
          <div class="flex items-center space-x-3">
            <span class="text-xs text-gray-500">
              {{
                metricsLastUpdated
                  ? `마지막 업데이트: ${formatTime(metricsLastUpdated)}`
                  : ''
              }}
            </span>
            <button
              @click="fetchMetrics"
              :disabled="metricsLoading"
              class="inline-flex items-center px-3 py-2 text-xs font-medium rounded-md border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 transition-colors disabled:opacity-50"
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
          </div>
        </div>

        <!-- 로딩 및 에러 상태 -->
        <div v-if="metricsLoading" class="text-center py-12">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"
          ></div>
          <p class="mt-4 text-gray-600">시스템 메트릭을 로드하는 중...</p>
        </div>

        <div
          v-else-if="metricsError"
          class="bg-red-50 border border-red-200 rounded-md p-4"
        >
          <div class="flex">
            <svg
              class="h-5 w-5 text-red-400"
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
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">메트릭 로드 실패</h3>
              <p class="mt-1 text-sm text-red-700">{{ metricsError }}</p>
              <button
                @click="fetchMetrics"
                class="mt-2 text-red-800 hover:text-red-900 text-sm underline"
              >
                다시 시도
              </button>
            </div>
          </div>
        </div>

        <!-- 차트 영역 -->
        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-lg font-medium text-gray-900">
                시스템 활동 추이
              </h3>
              <p class="text-sm text-gray-500">지난 3개월간의 활동 통계</p>
            </div>
            <div class="flex space-x-2">
              <button
                class="px-3 py-1 text-sm bg-gray-900 text-white rounded-md"
              >
                Last 3 months
              </button>
              <button
                class="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Last 30 days
              </button>
              <button
                class="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Last 7 days
              </button>
            </div>
          </div>

          <!-- 간단한 차트 영역 (실제 시스템 메트릭 데이터 시각화) -->
          <div class="h-auto w-full bg-gray-50 rounded-md p-6 mb-4">
            <!-- 데이터베이스 상세 정보 -->
            <div v-if="metrics" class="space-y-8">
              <!-- 전체 데이터 통계 -->
              <div>
                <h4 class="text-sm font-semibold text-gray-900 mb-4">
                  전체 데이터 통계
                </h4>
                <div class="grid grid-cols-3 gap-4">
                  <!-- 뉴스레터 통계 -->
                  <div class="bg-white rounded-lg p-4 border border-gray-200">
                    <div class="flex items-center justify-between mb-3">
                      <span class="text-sm font-medium text-gray-700"
                        >뉴스레터</span
                      >
                      <span class="text-2xl font-bold text-blue-600">{{
                        metrics.application.totalNewsletters
                      }}</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded h-2">
                      <div
                        :style="{
                          width:
                            Math.min(
                              metrics.application.totalNewsletters * 5,
                              100
                            ) + '%',
                        }"
                        class="h-2 bg-blue-500 rounded transition-all duration-300"
                      ></div>
                    </div>
                    <p class="text-xs text-gray-500 mt-2">
                      총 {{ metrics.application.totalNewsletters }}개 발행됨
                    </p>
                  </div>

                  <!-- DB 연결 상태 -->
                  <div class="bg-white rounded-lg p-4 border border-gray-200">
                    <div class="flex items-center justify-between mb-3">
                      <span class="text-sm font-medium text-gray-700"
                        >DB 연결</span
                      >
                      <div
                        :class="
                          metrics.database.connected
                            ? 'bg-green-500'
                            : 'bg-red-500'
                        "
                        class="w-3 h-3 rounded-full"
                      ></div>
                    </div>
                    <div class="flex items-center">
                      <span
                        :class="
                          metrics.database.connected
                            ? 'text-green-600'
                            : 'text-red-600'
                        "
                        class="text-sm font-bold"
                      >
                        {{
                          metrics.database.connected ? '연결됨' : '연결 끊김'
                        }}
                      </span>
                    </div>
                    <p class="text-xs text-gray-500 mt-2">
                      응답시간: {{ metrics.database.responseTime }}ms
                    </p>
                  </div>

                  <!-- DB 응답시간 -->
                  <div class="bg-white rounded-lg p-4 border border-gray-200">
                    <div class="flex items-center justify-between mb-3">
                      <span class="text-sm font-medium text-gray-700"
                        >DB 응답시간</span
                      >
                      <span class="text-2xl font-bold text-purple-600">{{
                        metrics.database.responseTime
                      }}</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded h-2">
                      <div
                        :style="{
                          width:
                            Math.min(metrics.database.responseTime * 5, 100) +
                            '%',
                        }"
                        :class="
                          metrics.database.responseTime > 100
                            ? 'bg-red-500'
                            : metrics.database.responseTime > 50
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                        "
                        class="h-2 rounded transition-all duration-300"
                      ></div>
                    </div>
                    <p class="text-xs text-gray-500 mt-2">
                      평균 응답 시간 (ms)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 데이터 없을 때 -->
            <div v-else class="flex items-center justify-center h-48">
              <div class="text-center">
                <svg
                  class="w-12 h-12 text-gray-300 mx-auto mb-2"
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
                <p class="text-sm text-gray-500">
                  데이터베이스 정보를 로드하는 중...
                </p>
              </div>
            </div>
          </div>

          <!-- 차트 하단 범례 -->
          <div class="flex items-center justify-center flex-wrap gap-6 text-sm">
            <div class="flex items-center">
              <div class="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span class="text-gray-600">뉴스레터</span>
            </div>
            <div class="flex items-center">
              <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span class="text-gray-600">활성</span>
            </div>
          </div>
        </div>

        <!-- 최근 활동 및 빠른 액션 -->
        <div class="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- 최근 활동 -->
          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">최근 활동</h3>
            <div class="space-y-3">
              <div v-if="metrics" class="text-sm">
                <div
                  class="flex items-center justify-between py-2 border-b border-gray-100"
                >
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span class="text-gray-700">새 뉴스레터 작성</span>
                  </div>
                  <span class="text-gray-500"
                    >{{ metrics.application.recentNewsletters }}개</span
                  >
                </div>
                <div class="flex items-center justify-between py-2">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    <span class="text-gray-700">시스템 모니터링</span>
                  </div>
                  <span class="text-gray-500">정상</span>
                </div>
              </div>
              <div v-else class="text-center py-8">
                <svg
                  class="mx-auto h-8 w-8 text-gray-300"
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
                <p class="mt-2 text-sm text-gray-500">
                  활동 내역을 불러오는 중...
                </p>
              </div>
            </div>
          </div>

          <!-- 빠른 액션 -->
          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">빠른 액션</h3>
            <div class="space-y-3">
              <NuxtLink
                to="/admin/newsletters/new"
                class="flex items-center w-full px-4 py-3 text-left border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
              >
                <div class="p-2 bg-blue-50 rounded-md mr-3">
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">
                    새 뉴스레터 작성
                  </p>
                  <p class="text-xs text-gray-500">뉴스레터 콘텐츠 생성</p>
                </div>
              </NuxtLink>

              <button
                @click="refreshPage"
                class="flex items-center w-full px-4 py-3 text-left border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
              >
                <div class="p-2 bg-gray-50 rounded-md mr-3">
                  <svg
                    class="w-4 h-4 text-gray-600"
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
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">
                    페이지 새로고침
                  </p>
                  <p class="text-xs text-gray-500">전체 대시보드 새로고침</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
// 인증 확인을 위한 미들웨어 적용
definePageMeta({
  middleware: 'auth',
})

const { user, isAuthenticated, getUserInfo, logout } = useAuth()
const isLoggingOut = ref(false)

// 사이드바 상태 (모바일용)
const sidebarOpen = ref(false)

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

    const response = await $fetch('/api/system/metrics')
    metrics.value = response.data
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

// 활동 추이 클래스 (뉴스레터 또는 채용공고 활동이 증가/감소)
const getActivityTrendClass = (current, total) => {
  if (total === 0) return 'text-gray-500'
  const percentageChange = Math.round((current / total) * 100)
  if (percentageChange > 0) {
    return 'text-green-500'
  } else if (percentageChange < 0) {
    return 'text-red-500'
  } else {
    return 'text-gray-500'
  }
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
  title: '관리자 대시보드',
  meta: [{ name: 'description', content: '관리자 전용 대시보드' }],
})
</script>
