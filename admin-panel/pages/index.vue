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
</script>

<style lang="scss" scoped>
@use '~/layouts/scss/mixins.scss' as *;
</style>
