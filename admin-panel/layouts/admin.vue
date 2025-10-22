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
          <a href="/dashboard">
            <img src="~/public/assets/concentrix-logo.svg" alt="" />
          </a>
        </div>
      </div>

      <!-- 네비게이션 메뉴 -->
      <nav class="flex-1 flex flex-col mt-6 px-3 overflow-y-auto">
        <div class="space-y-1">
          <!-- Dashboard -->
          <NuxtLink
            to="/dashboard"
            class="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
            :class="{
              'bg-gray-100 text-gray-900': $route.path === '/dashboard',
            }"
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
          </NuxtLink>

          <!-- 뉴스레터 관리 -->
          <NuxtLink
            to="/admin/newsletters"
            class="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
            :class="{
              'bg-gray-100 text-gray-900':
                $route.path.startsWith('/admin/newsletters'),
            }"
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
            :class="{
              'bg-gray-100 text-gray-900':
                $route.path.startsWith('/admin/logs'),
            }"
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

        <!-- 하단 Documents 섹션 -->
        <div class="mt-8">
          <h3
            class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
          >
            Admin
          </h3>
          <div class="mt-2 space-y-1">
            <a
              href="#"
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
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Word Assistant
            </a>
          </div>
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
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  middleware: 'auth',
  name: 'admin',
})

// useAuth composable 사용
// @ts-ignore
const { user, isAuthenticated, getUserInfo, logout } = useAuth()
const isLoggingOut = ref(false)

// 사이드바 상태 (모바일용)
const sidebarOpen = ref(false)

// 사용자 표시 이름
const getUserDisplayName = () => {
  try {
    const userInfo = getUserInfo()
    return userInfo?.username || userInfo?.userId || '관리자'
  } catch (error) {
    return '관리자'
  }
}

// 로그아웃 처리
const handleLogout = async () => {
  try {
    isLoggingOut.value = true
    console.log('어드민 레이아웃에서 로그아웃 시작')
    await logout()
  } catch (error) {
    console.error('로그아웃 실패:', error)
    // 에러가 발생해도 로그아웃 중 상태는 해제
    isLoggingOut.value = false
  }
}
</script>

<style lang="scss" scoped>
// 기본 스타일은 Tailwind CSS로 처리됨
</style>
