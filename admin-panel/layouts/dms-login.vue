<template>
  <AccessGuard>
    <div class="dms-layout">
      <!-- 메인 콘텐츠 -->
      <div class="page-container">
        <slot />
      </div>
    </div>
  </AccessGuard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Gnb from '~/components/dms/Gnb.vue'
import AccessGuard from '~/components/dms/AccessGuard.vue'

defineOptions({
  name: 'dms-login',
})

// Pretendard 폰트 CSS 링크
useHead({
  link: [
    {
      // Pretendard 폰트 CSS 링크
      rel: 'stylesheet',
      href: '/assets/fonts/pretendard.css',
    },
  ],
  script: [
    {
      // warn 메시지 제거
      innerHTML: 'console.warn = () => {}',
      type: 'text/javascript',
    },
  ],
})

// 모바일 메뉴 상태 관리
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<style lang="scss" scoped>
@use './scss/dms.scss';
</style>
