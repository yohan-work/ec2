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

// 현재 요청 URL 가져오기
const requestUrl = useRequestURL()
const baseUrl = `${requestUrl.protocol}//${requestUrl.host}`
const currentUrl = `${baseUrl}${requestUrl.pathname}`

// 페이지별 메타데이터
const pageTitle = 'Concentrix - A Global Technology and Service Leader'
const pageDescription = ''
const pageKeywords = ''
const ogImage = `${baseUrl}/images/default-newsletter-thumbnail.jpg`

// 페이지별 메타 태그 (공통 메타데이터는 레이아웃에서 처리)
useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: pageDescription },
    { name: 'keywords', content: pageKeywords },

    // 페이지별 Open Graph 태그
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:url', content: currentUrl },
    { property: 'og:image', content: ogImage },

    // 페이지별 Twitter Card 태그
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: pageDescription },
    { name: 'twitter:image', content: ogImage },
  ],
})
</script>

<style lang="scss" scoped>
@use '~/layouts/scss/mixins.scss' as *;
</style>
