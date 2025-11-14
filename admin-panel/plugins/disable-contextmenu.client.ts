/**
 * CNX 프로젝트 전용 우클릭 금지 플러그인
 * 메인 페이지(/) 및 /cnx/ 경로의 페이지만 대상으로 우클릭을 차단합니다.
 */

export default defineNuxtPlugin(() => {
  const router = useRouter()
  const route = useRoute()

  // CNX 페이지인지 확인하는 함수
  const isCNXPage = (path: string): boolean => {
    // 메인 페이지 (/) 또는 /cnx/로 시작하는 경로
    return path === '/' || path.startsWith('/cnx/')
  }

  // 우클릭 차단 핸들러
  const preventContextMenu = (event: Event) => {
    event.preventDefault()
    return false
  }

  // 이벤트 리스너 관리
  let isListenerActive = false

  const addContextMenuListener = () => {
    if (!isListenerActive) {
      document.addEventListener('contextmenu', preventContextMenu, { capture: true })
      isListenerActive = true
    }
  }

  const removeContextMenuListener = () => {
    if (isListenerActive) {
      document.removeEventListener('contextmenu', preventContextMenu, { capture: true })
      isListenerActive = false
    }
  }

  // 초기 페이지 로드 시 체크
  if (isCNXPage(route.path)) {
    addContextMenuListener()
  }

  // 라우트 변경 시 동적으로 적용/해제
  router.afterEach((to) => {
    if (isCNXPage(to.path)) {
      addContextMenuListener()
    } else {
      removeContextMenuListener()
    }
  })

  // 플러그인 언마운트 시 리스너 제거
  router.beforeEach((to, from, next) => {
    // 라우트 전환 전에 리스너 상태 업데이트
    if (!isCNXPage(to.path) && isListenerActive) {
      removeContextMenuListener()
    }
    next()
  })
})

