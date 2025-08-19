<template>
  <div>
    <NuxtRouteAnnouncer />

    <!-- 로딩 중일 때 -->
    <div
      v-if="isInitializing"
      class="min-h-screen flex items-center justify-center bg-background"
    >
      <div class="text-center">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"
        ></div>
        <p class="mt-2 text-muted-foreground">로딩 중...</p>
      </div>
    </div>

    <!-- 로그인하지 않은 경우 -->
    <LoginForm v-else-if="!isLoggedIn" />

    <!-- 로그인한 경우 메인 페이지 -->
    <div v-else class="min-h-screen bg-background" data-logged-in="true">
      <!-- 헤더 -->
      <header class="border-b bg-card px-6 py-4">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold text-foreground">관리자 페이지</h1>

          <!-- 사용자 정보 및 로그아웃 -->
          <div class="flex items-center space-x-4">
            <div class="text-sm">
              <span class="text-muted-foreground">안녕하세요,</span>
              <span class="font-medium text-foreground">{{
                currentUser?.email
              }}</span>
              <span class="text-muted-foreground"
                >({{ currentUser?.dept_name }},
                {{ currentUser?.role_name }})</span
              >
            </div>
            <button
              @click="handleLogout"
              class="inline-flex items-center rounded-md bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <!-- 메인 컨텐츠 -->
      <main class="container mx-auto px-6 py-8">
        <div class="space-y-6">
          <!-- 환영 메시지 -->
          <div
            class="rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
          >
            <h2 class="text-xl font-semibold mb-2">✅ 로그인 성공!</h2>
            <p class="text-muted-foreground">
              인증 기능이 정상적으로 동작하고 있습니다.
            </p>
          </div>

          <!-- API 테스트 -->
          <div
            class="rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
          >
            <h3 class="mb-4 text-lg font-semibold">🧪 API 테스트</h3>
            <div class="space-y-2">
              <a
                href="/api/test"
                target="_blank"
                class="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors mr-2"
              >
                📊 /api/test - admin_users 데이터 조회
              </a>
              <a
                href="/api/me"
                target="_blank"
                class="inline-flex items-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                👤 /api/me - 내 정보 조회
              </a>
            </div>
          </div>

          <!-- 데이터베이스 스키마 정보 -->
          <div
            class="rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
          >
            <h3 class="mb-4 text-lg font-semibold">🗄️ 데이터베이스 스키마</h3>
            <div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              <div class="rounded border p-3 text-sm">
                <strong>admin_users</strong><br />
                <span class="text-muted-foreground">관리자 사용자</span>
              </div>
              <div class="rounded border p-3 text-sm">
                <strong>departments</strong><br />
                <span class="text-muted-foreground">부서 정보</span>
              </div>
              <div class="rounded border p-3 text-sm">
                <strong>roles</strong><br />
                <span class="text-muted-foreground">사용자 역할</span>
              </div>
              <div class="rounded border p-3 text-sm">
                <strong>newsletters</strong><br />
                <span class="text-muted-foreground">뉴스레터</span>
              </div>
              <div class="rounded border p-3 text-sm">
                <strong>recruits</strong><br />
                <span class="text-muted-foreground">채용 공고</span>
              </div>
              <div class="rounded border p-3 text-sm">
                <strong>audit_logs</strong><br />
                <span class="text-muted-foreground">감사 로그</span>
              </div>
              <div class="rounded border p-3 text-sm">
                <strong>sessions</strong><br />
                <span class="text-muted-foreground">사용자 세션</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '../composables/useAuth'
import LoginForm from '../components/LoginForm.vue'

const { currentUser, isLoggedIn, logout, initialize } = useAuth()
const isInitializing = ref(true)

const handleLogout = async () => {
  await logout()
}

onMounted(async () => {
  await initialize()
  isInitializing.value = false
})
</script>

<style>
@import '~/assets/css/main.css';
</style>
