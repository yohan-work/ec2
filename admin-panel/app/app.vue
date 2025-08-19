<template>
  <div class="min-h-screen bg-background">
    <NuxtRouteAnnouncer />

    <!-- 헤더 -->
    <header class="border-b bg-card px-6 py-4">
      <h1 class="text-2xl font-bold text-foreground">관리자 페이지</h1>
    </header>

    <!-- 메인 컨텐츠 -->
    <main class="container mx-auto px-6 py-8">
      <div class="space-y-6">
        <div
          class="rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
        >
          <h3 class="mb-4 text-lg font-semibold">API 테스트</h3>
          <a
            href="/api/test"
            target="_blank"
            class="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            📊 /api/test - admin_users 데이터 조회
          </a>
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
</template>

<style>
@import '~/assets/css/main.css';
</style>
