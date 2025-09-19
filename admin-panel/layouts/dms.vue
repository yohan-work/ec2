<template>
  <AccessGuard>
    <div class="dms-layout">
      <!-- GNB (Global Navigation Bar) -->
      <Gnb
        :is-mobile-menu-open="isMobileMenuOpen"
        :is-login-page="false"
        @toggle-mobile-menu="toggleMobileMenu"
      />

      <!-- 툴바 레이어 -->
      <Toolbar
        :is-mobile-menu-open="isMobileMenuOpen"
        @close-menu="closeMobileMenu"
      />

      <!-- 메인 콘텐츠 -->
      <div class="page-container">
        <slot />
      </div>
    </div>
  </AccessGuard>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Gnb from '~/components/dms/Gnb.vue'
import Toolbar from '~/components/dms/Toolbar.vue'
import AccessGuard from '~/components/dms/AccessGuard.vue'

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

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// 브라우저 종료 시 세션 만료 처리
const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  // 새로고침을 감지하기 위한 플래그 설정
  // 새로고침인 경우 페이지가 다시 로드되므로 이 플래그가 설정됨
  sessionStorage.setItem('dms-page-refresh', 'true')
}

// 실제 브라우저 종료 감지를 위한 추가 이벤트
const handlePageHide = (event: PageTransitionEvent) => {
  // persisted가 false인 경우: 브라우저 종료, 탭 닫기, 새로고침
  // persisted가 true인 경우: 뒤로가기/앞으로가기 (bfcache 사용)

  if (event.persisted === false) {
    // 새로고침과 실제 종료를 구분하기 위해 페이지 복원 여부를 체크
    const isRefresh = sessionStorage.getItem('dms-page-refresh') === 'true'

    if (isRefresh) {
      // 새로고침인 경우 - 세션 유지
      sessionStorage.removeItem('dms-page-refresh')
    } else {
      // 실제 브라우저 종료/탭 닫기인 경우 - 세션 만료
      try {
        // navigator.sendBeacon을 사용하여 안정적인 로그아웃 요청
        if (navigator.sendBeacon) {
          const formData = new FormData()
          formData.append('method', 'POST')

          // sendBeacon으로 로그아웃 요청 전송
          const success = navigator.sendBeacon('/api/dms/logout', formData)

          if (!success) {
            // 로그아웃 요청 전송 실패 (에러 로깅은 하지 않음)
          }
        } else {
          // sendBeacon을 지원하지 않는 브라우저의 경우 동기 요청
          const xhr = new XMLHttpRequest()
          xhr.open('POST', '/api/dms/logout', false) // 동기 요청
          xhr.setRequestHeader('Content-Type', 'application/json')
          xhr.send(JSON.stringify({ method: 'POST' }))
        }
      } catch (error) {
        // 에러가 발생해도 브라우저 종료를 막지 않음
      }
    }
  } else {
    // bfcache 사용 (뒤로가기/앞으로가기) - 세션 유지
  }
}

// 페이지 이동 시 세션 정리 (SPA 내에서의 라우트 변경)
const handleRouteChange = async (toPath: string) => {
  try {
    // DMS에서 다른 사이트로 이동하는 경우에만 로그아웃
    if (!toPath.startsWith('/dms')) {
      await $fetch('/api/dms/logout', {
        method: 'POST',
      })
    }
  } catch (error) {
    // 페이지 이동 시 세션 정리 실패 (에러 로깅은 하지 않음)
  }
}

// 컴포넌트 마운트 시 이벤트 리스너 등록
onMounted(() => {
  if (process.client) {
    // 새로고침 플래그 정리 (페이지 로드 시)
    sessionStorage.removeItem('dms-page-refresh')

    // 페이지를 떠날 때 이벤트 (새로고침, 뒤로가기 등)
    window.addEventListener('beforeunload', handleBeforeUnload)

    // 페이지가 완전히 숨겨질 때 이벤트 (브라우저 종료, 탭 닫기)
    window.addEventListener('pagehide', handlePageHide)

    // 페이지 숨김 시 이벤트 (탭 전환, 최소화 등)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        // 페이지가 숨겨질 때는 로그아웃하지 않음 (탭 전환 등)
      }
    })
  }
})

// 컴포넌트 언마운트 시 이벤트 리스너 제거 및 세션 정리
onUnmounted(async () => {
  if (process.client) {
    window.removeEventListener('beforeunload', handleBeforeUnload)
    window.removeEventListener('pagehide', handlePageHide)

    // 컴포넌트가 언마운트될 때 (페이지 이동 시) 세션 정리
    try {
      await $fetch('/api/dms/logout', {
        method: 'POST',
      })
    } catch (error) {
      // 컴포넌트 언마운트 시 세션 정리 실패 (에러 로깅은 하지 않음)
    }
  }
})

// 라우트 변경 감지
const router = useRouter()
router.beforeEach((to, from) => {
  // DMS에서 다른 사이트로 이동하는 경우
  if (from.path.startsWith('/dms') && !to.path.startsWith('/dms')) {
    handleRouteChange(to.path)
  }
})
</script>

<style lang="scss" scoped>
@use './scss/dms.scss';
</style>
