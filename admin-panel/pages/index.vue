<template>
  <div class="layout">
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
              뉴스레터 보기
            </NuxtLink>
          </div>
          <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
            <NuxtLink
              to="/recruits"
              class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
            >
              채용공고 보기
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 레이아웃 설정
definePageMeta({
  layout: 'concentrix',
})

// 메타 태그
useHead({
  title: '뉴스레터 & 채용공고',
  meta: [
    { name: 'description', content: '최신 뉴스레터와 채용 정보를 확인하세요' },
  ],
})
</script>

<style lang="scss" scoped>
@use '~/layouts/scss/mixins.scss' as *;
</style>
