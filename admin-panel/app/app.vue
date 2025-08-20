<template>
  <div class="min-h-screen bg-background">
    <NuxtRouteAnnouncer />

    <!-- 헤더 -->
    <header class="border-b bg-card px-6 py-4">
      <h1 class="text-2xl font-bold text-foreground">
        관리자 페이지 - Nuxt 3 + Prisma + AWS Cognito 준비
      </h1>
    </header>

    <!-- 메인 컨텐츠 -->
    <main class="container mx-auto px-6 py-8">
      <div class="space-y-6">
        <!-- API 테스트 카드 -->
        <div
          class="rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
        >
          <h3 class="mb-4 text-lg font-semibold">🧪 API 테스트</h3>
          <p class="mb-4 text-sm text-muted-foreground">
            기본 데이터 조회는 여전히 작동합니다:
          </p>
          <a
            href="/api/test"
            target="_blank"
            class="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            📊 /api/test - admin_users 데이터 조회 (인증 없음)
          </a>
        </div>

        <!-- 데이터베이스 스키마 정보 -->
        <div
          class="rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
        >
          <h3 class="mb-4 text-lg font-semibold">
            🗄️ 업데이트된 데이터베이스 스키마
          </h3>
          <div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            <div class="rounded border p-3 text-sm">
              <strong>admin_users</strong><br />
              <span class="text-muted-foreground"
                >관리자 사용자 (cognito_id 추가)</span
              >
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
            <div class="rounded border p-3 text-sm bg-red-50 border-red-200">
              <strong>sessions</strong><br />
              <span class="text-red-600 text-xs"
                >⚠️ Cognito JWT 사용 pending</span
              >
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 10% 3.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
</style>
