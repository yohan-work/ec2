<template>
  <div>
    <!-- 헤더 -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-xl font-bold text-gray-900">
              <img src="~/public/assets/concentrix-logo.svg" alt="Concentrix" />
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
          <!-- 로딩 상태 -->
          <div v-if="loading" class="text-center py-12">
            <div
              class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"
            ></div>
            <p class="mt-2 text-sm text-gray-500">뉴스레터를 불러오는 중...</p>
          </div>

          <!-- 에러 상태 -->
          <div v-else-if="error" class="text-center py-12">
            <div
              class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100"
            >
              <svg
                class="h-6 w-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 class="mt-2 text-sm font-medium text-gray-900">
              오류가 발생했습니다
            </h3>
            <p class="mt-1 text-sm text-gray-500">{{ error }}</p>
            <div class="mt-6">
              <button
                @click="fetchNewsletter"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                다시 시도
              </button>
            </div>
          </div>

          <!-- 뉴스레터 내용 -->
          <NewsletterContent v-else-if="newsletter" :newsletter="newsletter" />

          <!-- 관련 뉴스레터 -->
          <RelatedNewsletters
            v-if="newsletter"
            :newsletters="relatedNewsletters"
            @newsletter-click="handleRelatedNewsletterClick"
          />

          <!-- 더보기 버튼 -->
          <div class="newsletter-load-more">
            <AppButton effect="left" to="/newsletters" text="목록 보기">
            </AppButton>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
/**
 * 뉴스레터 상세 페이지
 *
 * 실제 DB 연결 로직으로 변경 완료
 * API: GET /api/public/newsletters/{id}
 *
 */

// 컴포넌트 import (같은 폴더에 있으므로 자동 import되지만 명시적으로 추가)
import NewsletterContent from './NewsletterContent.vue'
import RelatedNewsletters from './RelatedNewsletters.vue'
import AppButton from '~/components/cnx/AppButton.vue'

const route = useRoute()
const newsletterId = route.params.id

// 상태 관리
const newsletter = ref(null)
const loading = ref(true)
const error = ref(null)
const relatedNewsletters = ref([])

// 스크롤 위치 관리
const lastClickedNewsletterId = ref(null)

// 뉴스레터 조회
const fetchNewsletter = async () => {
  try {
    loading.value = true
    error.value = null

    const response = await $fetch(`/api/public/newsletters/${newsletterId}`)
    newsletter.value = response.data

    // 뉴스레터 조회 성공 시 관련 뉴스레터도 가져오기
    await fetchRelatedNewsletters()
  } catch (err) {
    console.error('뉴스레터 조회 실패:', err)
    if (err.statusCode === 404) {
      error.value = '뉴스레터를 찾을 수 없습니다.'
    } else {
      error.value = '뉴스레터를 불러올 수 없습니다.'
    }
  } finally {
    loading.value = false
  }
}

// 관련 뉴스레터 조회 (현재 뉴스레터 제외하고 최근 3개)
const fetchRelatedNewsletters = async () => {
  try {
    const response = await $fetch('/api/public/newsletters/related', {
      query: {
        id: newsletterId,
        limit: 5,
      },
    })
    relatedNewsletters.value = response.data
  } catch (err) {
    console.error('관련 뉴스레터 조회 실패:', err)
    // 관련 뉴스레터는 실패해도 메인 콘텐츠에 영향 없도록 빈 배열 유지
    relatedNewsletters.value = []
  }
}

// 날짜 포맷 (한국 시간대로 표시)
const formatDate = dateString => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}

// 관련 뉴스레터 클릭 핸들러
const handleRelatedNewsletterClick = newsletterId => {
  lastClickedNewsletterId.value = newsletterId
}

// HTML에서 텍스트 추출하여 요약 생성
const getTextSummary = htmlContent => {
  if (!htmlContent) return ''

  // HTML 태그 제거
  const textContent = htmlContent.replace(/<[^>]*>/g, ' ')
  // 연속된 공백 정리
  const cleanText = textContent.replace(/\s+/g, ' ').trim()
  // 120자로 제한하고 말줄임표 추가
  return cleanText.length > 120
    ? cleanText.substring(0, 120) + '...'
    : cleanText
}

// 컴포넌트 마운트 시 데이터 로드
onMounted(() => {
  fetchNewsletter()
})

// 메타 태그
useHead({
  title: () => (newsletter.value ? newsletter.value.title : '뉴스레터'),
  meta: [
    {
      name: 'description',
      content: () =>
        newsletter.value
          ? newsletter.value.body_html
              .replace(/<[^>]*>/g, '')
              .substring(0, 160) + '...'
          : '뉴스레터 상세 내용',
    },
  ],
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

/* Line clamp utility */
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  line-height: 1.5;
}
</style>
