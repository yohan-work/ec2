<template>
  <div class="layout">
    <!-- 히어로 섹션 -->
    <div class="px-4 py-6 sm:px-0">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          Main
        </h1>
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
  title: '홈',
  meta: [
    { name: 'description', content: '최신 뉴스레터와 채용 정보를 확인하세요' },
  ],
})
</script>

<style lang="scss" scoped>
@use '~/layouts/scss/mixins.scss' as *;
</style>
