<template>
  <IpAccessGuard>
    <div class="dms-layout">
      <!-- GNB (Global Navigation Bar) -->
      <Gnb
        :is-mobile-menu-open="isMobileMenuOpen"
        :is-login-page="false"
        @toggle-mobile-menu="toggleMobileMenu"
      />

      <!-- 툴바 레이어 -->
      <Toolbar :is-mobile-menu-open="isMobileMenuOpen" />

      <!-- 메인 콘텐츠 -->
      <div class="page-container">
        <slot />
      </div>
    </div>
  </IpAccessGuard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Gnb from '~/components/dms/Gnb.vue'
import Toolbar from '~/components/dms/Toolbar.vue'
import IpAccessGuard from '~/components/dms/IpAccessGuard.vue'

defineOptions({
  name: 'dms',
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
