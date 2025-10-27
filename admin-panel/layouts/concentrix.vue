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
import { watch, computed, ref, provide } from 'vue'
import { useRoute } from 'vue-router'
import TheHeader from '~/components/cnx/TheHeader.vue'
import TheFooter from '~/components/cnx/TheFooter.vue'

const route = useRoute()

// 전역 메타 태그 설정
const headers = useRequestHeaders()
const requestUrl = useRequestURL()
const baseUrl = `${requestUrl.protocol}//${requestUrl.host}`

// 공통 메타데이터 상수
const siteName = 'Concentrix'

// 네비게이션 composable에서 페이지별 메타데이터 가져오기
const { getPageMeta, normalizeDynamicMeta } = useNavigation()

// 동적 메타데이터 상태 (페이지에서 설정 가능)
const dynamicMeta = ref(null)

// 페이지별 메타데이터 계산 (정적 + 동적)
const pageMeta = computed(() => {
  // 동적 메타데이터가 있으면 우선 사용
  if (dynamicMeta.value) {
    return normalizeDynamicMeta(dynamicMeta.value)
  }
  // 없으면 정적 메타데이터 사용
  return getPageMeta(route.path)
})

// SSR 안전한 OG 이미지 URL 생성
const metaOgImage = computed(() => {
  // SSR과 클라이언트 모두에서 안전한 URL 생성
  const imagePath = pageMeta.value.ogImage
  if (imagePath.startsWith('http')) {
    return imagePath
  }
  return `${baseUrl}${imagePath}`
})

// 동적 메타데이터 설정 함수 (페이지에서 사용)
const setPageMeta = meta => {
  dynamicMeta.value = meta
}

// 페이지에서 사용할 수 있도록 provide
provide('setPageMeta', setPageMeta)

// SSR 안전한 URL 생성 함수
const getCurrentUrl = computed(() => {
  if (import.meta.client) {
    return `${window.location.origin}${route.fullPath}`
  }
  // SSR 시에는 요청 헤더에서 호스트 정보 가져오기
  const host = headers.host || 'localhost:3000'
  const protocol =
    headers['x-forwarded-proto'] ||
    (host.includes('localhost') ? 'http' : 'https')
  return `${protocol}://${host}${route.fullPath}`
})

// 반응형 메타데이터 설정
const headConfig = computed(() => ({
  htmlAttrs: {
    lang: 'ko',
  },
  title: pageMeta.value.title,
  meta: [
    // 기본 메타 태그
    { name: 'robots', content: 'index, follow' },
    { name: 'author', content: siteName },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' },

    // 페이지별 메타데이터 (SSR 안전하게 설정)
    { name: 'title', content: pageMeta.value.title },
    { name: 'description', content: pageMeta.value.description },

    // Open Graph 설정
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: siteName },
    { property: 'og:url', content: getCurrentUrl.value },
    { property: 'og:title', content: pageMeta.value.title },
    { property: 'og:description', content: pageMeta.value.description },
    { property: 'og:image', content: metaOgImage.value },

    // Twitter Card 설정
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageMeta.value.title },
    { name: 'twitter:description', content: pageMeta.value.description },
    { name: 'twitter:image', content: metaOgImage.value },

    // Windows 타일 이미지 설정
    {
      name: 'msapplication-TileImage',
      content: `${baseUrl}/assets/favicon/favicon.png`,
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: getCurrentUrl.value,
    },
    // 파비콘 설정
    {
      rel: 'icon',
      href: `${baseUrl}/assets/favicon/favicon-150x150.png`,
      sizes: '32x32',
    },
    {
      rel: 'icon',
      href: `${baseUrl}/assets/favicon/favicon-195x195.png`,
      sizes: '192x192',
    },
    {
      rel: 'apple-touch-icon',
      href: `${baseUrl}/assets/favicon/favicon-150x150.png`,
    },
  ],
}))

// 반응형 메타데이터 적용
useHead(headConfig)

// 더보기 등 특정 액션에서 포커스 처리를 건너뛰기 위한 플래그
const skipFocusFlag = ref(false)

// skip-main-focus 이벤트 리스너
if (import.meta.client) {
  window.addEventListener('skip-main-focus', () => {
    skipFocusFlag.value = true
    // 이벤트 처리 후 즉시 플래그 해제 (단발성 이벤트 대응)
    setTimeout(() => {
      skipFocusFlag.value = false
    }, 100)
  })
}

watch(
  () => route.fullPath,
  () => {
    // 더보기 클릭 등 특정 액션의 경우 main 포커스 건너뛰기
    if (skipFocusFlag.value) {
      skipFocusFlag.value = false
      return
    }

    // 동적 메타데이터 초기화 (페이지 전환 시)
    dynamicMeta.value = null

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
  outline: none;
}
</style>
