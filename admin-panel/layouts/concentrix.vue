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
