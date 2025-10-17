<template>
  <div class="cnx-layout">
    <TheHeader />
    <!-- 메인 콘텐츠 -->
    <main class="cnx-main" tabindex="-1">
      <slot />
    </main>

    <TheFooter />
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import TheHeader from '~/components/cnx/TheHeader.vue'
import TheFooter from '~/components/cnx/TheFooter.vue'

const route = useRoute()

// 전역 메타 태그 설정
const headers = useRequestHeaders()

useHead({
  htmlAttrs: {
    lang: 'ko',
  },
  link: [
    {
      rel: 'canonical',
      href: () => {
        // 현재 도메인과 경로를 기반으로 canonical URL 생성
        if (import.meta.client) {
          return `${window.location.origin}${route.fullPath}`
        }
        // SSR 시에는 요청 헤더에서 호스트 정보 가져오기
        const host = headers.host || 'localhost:3000'
        const protocol =
          headers['x-forwarded-proto'] ||
          (host.includes('localhost') ? 'http' : 'https')
        return `${protocol}://${host}${route.fullPath}`
      },
    },
  ],
})

watch(
  () => route.fullPath,
  () => {
    // 스크롤과 포커스 초기화
    window.scrollTo(0, 0)
    // 메뉴 호버 상태 초기화
    const activeDropdown = document.querySelector('.gnb-menu-item.active')
    if (activeDropdown) activeDropdown.classList.remove('active')
    // GNB 닫기
    const openedGNBLayer = document.querySelector('.gnb-dropdown-menu.active')
    if (openedGNBLayer) openedGNBLayer.classList.remove('active')
    // 메인 콘텐츠 영역에 포커스
    const main = document.querySelector('main.cnx-main')
    if (main) main.focus()
  }
)

defineOptions({
  name: 'concentrix',
})
</script>

<style lang="scss" scoped>
.cnx-layout {
  font-family:
    'Pretendard',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.cnx-main {
  flex: 1;
  /* 헤더가 sticky이므로 여백 불필요 */
}
</style>
