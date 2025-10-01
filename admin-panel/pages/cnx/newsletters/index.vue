<template>
  <div>
    <!-- 헤더 -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-xl font-bold text-gray-900">
              <img
                src="~/public/assets/concentrix-logo.svg"
                alt="Concentrix"
                class=""
              />
            </NuxtLink>
          </div>

          <nav class="flex space-x-8">
            <NuxtLink
              to="/newsletters"
              class="text-indigo-600 bg-indigo-50 px-3 py-2 rounded-md text-sm font-medium"
            >
              뉴스레터
            </NuxtLink>
            <NuxtLink
              to="/recruits"
              class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              채용공고
            </NuxtLink>
          </nav>
        </div>
      </div>
    </header>

    <!-- 메인 콘텐츠 -->
    <main>
      <div class="newsletter">
        <div class="inner">
          <!-- 제목 -->
          <AppTitle title="Newsroom" />

          <!-- 뉴스레터 목록 -->
          <NewsletterList
            :newsletters="newsletters"
            :loading="loading"
            @newsletter-click="handleNewsletterClick"
          />

          <!-- 더보기 버튼 -->
          <div
            v-if="shouldShowLoadMore && !loading"
            class="newsletter-load-more"
          >
            <AppButton
              color="primary"
              @click="loadMoreNewsletters"
              :disabled="loadingMore"
              :text="loadingMore ? '로딩 중...' : '더보기'"
            >
            </AppButton>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import AppButton from '~/components/cnx/AppButton.vue'
import AppTitle from '~/components/cnx/AppTitle.vue'
import NewsletterList from './NewsletterList.vue'

/**
 * 뉴스레터 목록 페이지
 *
 * === dummy data ===
 * for seungjoo Park
 * 실제 DB 연결 로직은 주석처리되어 있으며, 별도로 백업해두었습니다.
 * /public/data/newsletters-dummy.json 파일을 사용합니다.
 *
 */

// 상태 관리
const newsletters = ref([])
const loading = ref(true)
const loadingMore = ref(false)
const searchQuery = ref('')
const pagination = ref({
  page: 1,
  limit: 5,
  total: 0,
  pages: 0,
})
const displayedCount = ref(0)

// 스크롤 위치 관리
const scrollPosition = ref(0)
const lastClickedNewsletterId = ref(null)

// 환경 설정
const config = useRuntimeConfig()
const useDummy = config.public.useDummy

const fetchNewsletters = async () => {
  try {
    loading.value = true

    if (useDummy) {
      // === 더미 데이터 로직 ===
      const response = await $fetch('/data/newsletters-dummy.json')
      newsletters.value = response.data.slice(0, pagination.value.limit)
      pagination.value = {
        page: 1,
        limit: pagination.value.limit,
        total: response.data.length,
        pages: Math.ceil(response.data.length / pagination.value.limit),
      }
      displayedCount.value = newsletters.value.length
    } else {
      // === DB 연결 로직 ===
      const query = { page: 1, limit: pagination.value.limit }
      const response = await $fetch('/api/public/newsletters', { query })
      newsletters.value = response.data
      pagination.value = response.pagination
      displayedCount.value = response.data.length
    }
  } catch (error) {
    console.error('뉴스레터 목록 조회 실패:', error)
  } finally {
    loading.value = false
  }
}

// 더보기
const loadMoreNewsletters = async () => {
  try {
    loadingMore.value = true

    if (useDummy) {
      // === 더미 데이터 로직 ===
      const response = await $fetch('/data/newsletters-dummy.json')

      // 검색 필터링
      let filteredData = response.data
      if (searchQuery.value) {
        const searchTerm = searchQuery.value.toLowerCase()
        filteredData = response.data.filter(
          newsletter =>
            newsletter.title.toLowerCase().includes(searchTerm) ||
            newsletter.body_html.toLowerCase().includes(searchTerm)
        )
      }

      // 다음 페이지 데이터 계산
      const nextStartIndex = displayedCount.value
      const nextEndIndex = nextStartIndex + pagination.value.limit
      const nextPageData = filteredData.slice(nextStartIndex, nextEndIndex)

      // 기존 뉴스레터에 새로운 뉴스레터 추가
      newsletters.value = [...newsletters.value, ...nextPageData]
      displayedCount.value += nextPageData.length

      // pagination 정보 업데이트
      pagination.value = {
        page: Math.floor(displayedCount.value / pagination.value.limit),
        limit: pagination.value.limit,
        total: filteredData.length,
        pages: Math.ceil(filteredData.length / pagination.value.limit),
      }
    } else {
      // === DB 연결 로직 ===
      const nextPage =
        Math.floor(displayedCount.value / pagination.value.limit) + 1

      const query = {
        page: nextPage,
        limit: pagination.value.limit,
      }

      if (searchQuery.value) {
        query.search = searchQuery.value
      }

      const response = await $fetch('/api/public/newsletters', { query })

      // 기존 뉴스레터에 새로운 뉴스레터 추가
      newsletters.value = [...newsletters.value, ...response.data]
      displayedCount.value += response.data.length

      // pagination 정보 업데이트
      pagination.value = response.pagination
    }
  } catch (error) {
    console.error('추가 뉴스레터 로드 실패:', error)
  } finally {
    loadingMore.value = false
  }
}

// 더보기 버튼 표시 여부 계산
const shouldShowLoadMore = computed(() => {
  // 총 뉴스레터가 5개 미만이면 더보기 버튼 미노출
  if (pagination.value.total < 5) {
    return false
  }

  // 현재 표시된 개수가 총 개수보다 적으면 더보기 버튼 노출
  return displayedCount.value < pagination.value.total
})

// 검색 디바운스
let searchTimeout
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    pagination.value.page = 1
    displayedCount.value = 0
    fetchNewsletters()
  }, 500)
}

// 페이지 이동
const goToPage = page => {
  pagination.value.page = page
  fetchNewsletters()
}

// 페이지 번호 배열 생성
const getPageNumbers = () => {
  const current = pagination.value.page
  const total = pagination.value.pages
  const delta = 2
  const range = []

  for (
    let i = Math.max(1, current - delta);
    i <= Math.min(total, current + delta);
    i++
  ) {
    range.push(i)
  }

  return range
}

// 게시글 클릭 핸들러
const handleNewsletterClick = newsletterId => {
  scrollPosition.value = window.scrollY
  lastClickedNewsletterId.value = newsletterId

  sessionStorage.setItem(
    'newsletterScrollPosition',
    scrollPosition.value.toString()
  )
  sessionStorage.setItem('lastClickedNewsletterId', newsletterId.toString())
  sessionStorage.setItem('fromDetailPage', 'false')
}

// 스크롤 위치 복원
const restoreScrollPosition = () => {
  const savedPosition = sessionStorage.getItem('newsletterScrollPosition')
  const savedNewsletterId = sessionStorage.getItem('lastClickedNewsletterId')
  const fromDetailPage = sessionStorage.getItem('fromDetailPage')

  if (savedPosition && savedNewsletterId) {
    nextTick(() => {
      setTimeout(() => {
        const targetElement = document.getElementById(
          `newsletter-${savedNewsletterId}`
        )
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })

          // 하이라이트 효과(임시 처리)
          targetElement.style.transition = 'box-shadow 0.3s ease'
          targetElement.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.3)'

          setTimeout(() => {
            targetElement.style.boxShadow = ''
          }, 2000)
        } else {
          window.scrollTo(0, parseInt(savedPosition))
        }

        sessionStorage.removeItem('newsletterScrollPosition')
        sessionStorage.removeItem('lastClickedNewsletterId')
        sessionStorage.removeItem('fromDetailPage')
      }, 100)
    })
  }
}

// 컴포넌트 마운트 시 데이터 로드
onMounted(() => {
  fetchNewsletters()

  // 뒤로가기 시 스크롤 위치 복원
  restoreScrollPosition()
})

// 메타 태그
useHead({
  title: '뉴스레터 목록',
  meta: [{ name: 'description', content: '최신 뉴스레터 목록을 확인하세요' }],
})
</script>

<style lang="scss" scoped>
@use '~/layouts/scss/cnx.scss' as *;
@use '~/layouts/scss/cnx/_variables' as *;
@use '~/layouts/scss/cnx/_mixins' as *;
@use '~/layouts/scss/cnx/_functions' as *;

.newsletter {
  .inner {
    width: min(calc(100% - rem(48)), rem(1320));
    margin: 0 auto rem(200);
  }
  .newsletter-load-more {
    text-align: center;
    margin: rem(60) 0 rem(100);
    @include tablet {
      margin: rem(80) 0 rem(160);
    }
    @include desktop {
      margin: rem(120) 0 rem(200);
    }
  }
}
</style>
