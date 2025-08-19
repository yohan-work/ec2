<template>
  <div class="min-h-screen flex items-center justify-center bg-background">
    <div class="max-w-md w-full space-y-8 p-8">
      <!-- 로고/제목 영역 -->
      <div class="text-center">
        <h2 class="text-3xl font-bold text-foreground">관리자 로그인</h2>
        <p class="mt-2 text-sm text-muted-foreground">
          계정 정보를 입력하여 로그인하세요
        </p>
      </div>

      <!-- 로그인 폼 -->
      <form @submit.prevent="handleLogin" class="mt-8 space-y-6">
        <div class="space-y-4">
          <!-- 이메일 입력 -->
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-foreground"
            >
              이메일
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="mt-1 block w-full px-3 py-2 border border-input bg-background rounded-md shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              placeholder="admin@example.com"
              :disabled="isLoading"
            />
          </div>

          <!-- 비밀번호 입력 -->
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-foreground"
            >
              비밀번호
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="mt-1 block w-full px-3 py-2 border border-input bg-background rounded-md shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              placeholder="••••••••"
              :disabled="isLoading"
            />
          </div>
        </div>

        <!-- 에러 메시지 -->
        <div v-if="errorMessage" class="rounded-md bg-destructive/10 p-4">
          <div class="flex">
            <div class="text-sm text-destructive">
              {{ errorMessage }}
            </div>
          </div>
        </div>

        <!-- 로그인 버튼 -->
        <div>
          <button
            type="submit"
            :disabled="isLoading || !form.email || !form.password"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span v-if="isLoading" class="flex items-center">
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-foreground"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              로그인 중...
            </span>
            <span v-else>로그인</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useAuth } from '../composables/useAuth'

const { login, isLoading } = useAuth()

// 폼 데이터
const form = reactive({
  email: '',
  password: '',
})

// 에러 메시지
const errorMessage = ref('')

const handleLogin = async () => {
  errorMessage.value = ''

  try {
    const result = await login({
      email: form.email,
      password: form.password,
    })

    if (result.error) {
      errorMessage.value = result.error
    }
  } catch (error) {
    errorMessage.value = '로그인 중 오류가 발생했습니다.'
  }
}
</script>
