<template>
  <div>
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
import { _0 } from '#tailwind-config/theme/backdropBlur'

// 레이아웃 설정
definePageMeta({
  layout: 'concentrix',
})

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

      // 새로 로드된 첫 번째 뉴스레터로 스크롤 이동
      if (nextPageData.length > 0) {
        nextTick(() => {
          const firstNewNewsletterId = nextPageData[0].id
          const targetElement = document.getElementById(`newsletter-${firstNewNewsletterId}`)
          if (targetElement) {
            // 스크롤만 이동 (포커스 제거)
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            })
          }
        })
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

      // 새로 로드된 첫 번째 뉴스레터로 스크롤 이동
      if (response.data.length > 0) {
        nextTick(() => {
          const firstNewNewsletterId = response.data[0].id
          const targetElement = document.getElementById(`newsletter-${firstNewNewsletterId}`)
          if (targetElement) {
            // 스크롤만 이동 (포커스 제거)
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            })
          }
        })
      }
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
    displayedCount.value = _0
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
  // 포커스 이동 제거 - 단순 클릭만 처리
}


// 컴포넌트 마운트 시 데이터 로드
onMounted(() => {
  fetchNewsletters()
})
</script>

<style lang="scss" scoped>
.newsletter {
  margin-bottom: rem(100);
  @include tablet {
    margin-bottom: rem(160);
  }
  @include desktop {
    margin-bottom: rem(200);
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
