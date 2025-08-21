<template>
  <div class="min-h-screen bg-background">
    <!-- 헤더 -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-xl font-bold text-gray-900">
              📰 뉴스레터 & 채용공고
            </NuxtLink>
          </div>

          <nav class="flex space-x-8">
            <NuxtLink
              to="/newsletters"
              class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              📰 뉴스레터
            </NuxtLink>
            <NuxtLink
              to="/recruits"
              class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              💼 채용공고
            </NuxtLink>
          </nav>
        </div>
      </div>
    </header>

    <!-- 메인 콘텐츠 -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- 히어로 섹션 -->
      <div class="px-4 py-6 sm:px-0">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            뉴스레터 & 채용공고
          </h1>
          <p
            class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
          >
            최신 뉴스레터와 채용 정보를 확인하세요
          </p>

          <div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div class="rounded-md shadow">
              <NuxtLink
                to="/newsletters"
                class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              >
                📰 뉴스레터 보기
              </NuxtLink>
            </div>
            <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <NuxtLink
                to="/recruits"
                class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                💼 채용공고 보기
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- 최근 게시물 미리보기 -->
      <div class="mt-16">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
          <!-- 최근 뉴스레터 -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                📰 최근 뉴스레터
              </h3>
              <div class="text-center py-8 text-gray-500">
                <NuxtLink
                  to="/newsletters"
                  class="text-indigo-600 hover:text-indigo-500"
                >
                  뉴스레터 목록 보기 →
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- 최근 채용공고 -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                💼 최근 채용공고
              </h3>
              <div class="text-center py-8 text-gray-500">
                <NuxtLink
                  to="/recruits"
                  class="text-indigo-600 hover:text-indigo-500"
                >
                  채용공고 목록 보기 →
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 푸터 -->
    <footer class="bg-white">
      <div
        class="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8"
      >
        <div class="mt-8 md:mt-0 md:order-1">
          <p class="text-center text-base text-gray-400">
            &copy; 2024 뉴스레터 & 채용공고. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// 메타 태그
useHead({
  title: '뉴스레터 & 채용공고',
  meta: [
    { name: 'description', content: '최신 뉴스레터와 채용 정보를 확인하세요' },
  ],
})
</script>
