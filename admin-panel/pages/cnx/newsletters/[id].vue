<template>
  <div class="min-h-screen bg-gray-50">
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
    <main class="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <!-- 뒤로가기 -->
        <div class="mb-6">
          <NuxtLink
            to="/newsletters"
            class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            <svg
              class="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            뉴스레터 목록으로 돌아가기
          </NuxtLink>
        </div>

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
        <article
          v-else-if="newsletter"
          class="bg-white shadow rounded-lg overflow-hidden"
        >
          <!-- 헤더 -->
          <div class="px-6 py-8 border-b border-gray-200">
            <div class="flex items-start space-x-6">
              <!-- 제목 및 메타 정보 -->
              <div class="flex-1">
                <h1 class="text-3xl font-bold text-gray-900 mb-4">
                  {{ newsletter.title }}
                </h1>

                <!-- 메타 정보 -->
                <div class="flex items-center text-sm text-gray-500 space-x-4">
                  <div class="flex items-center">
                    <svg
                      class="mr-1.5 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    {{
                      newsletter.admin_users?.departments?.name || '알 수 없음'
                    }}
                  </div>

                  <div class="flex items-center">
                    <svg
                      class="mr-1.5 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {{ formatDate(newsletter.published_at) }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 본문 -->
          <div class="px-6 py-8">
            <div
              class="prose prose-indigo max-w-none"
              v-html="newsletter.body_html"
            ></div>
          </div>

          <!-- 하단 정보 -->
          <div class="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div
              class="flex items-center justify-between text-sm text-gray-500"
            >
              <div>작성일: {{ formatDate(newsletter.created_at) }}</div>
              <div v-if="newsletter.updated_at !== newsletter.created_at">
                수정일: {{ formatDate(newsletter.updated_at) }}
              </div>
            </div>
          </div>
        </article>

        <!-- 관련 뉴스레터 -->
        <div v-if="newsletter && relatedNewsletters.length > 0" class="mt-12">
          <div class="bg-white shadow rounded-lg overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-xl font-semibold text-gray-900">최근 뉴스레터</h2>
              <p class="text-sm text-gray-500 mt-1">
                다른 최신 뉴스레터도 확인해보세요
              </p>
            </div>

            <div class="divide-y divide-gray-200">
              <article
                v-for="item in relatedNewsletters"
                :key="item.id"
                class="px-6 py-6 hover:bg-gray-50 transition-colors duration-200"
              >
                <NuxtLink
                  :to="`/newsletters/${item.id}`"
                  @click="handleRelatedNewsletterClick(item.id)"
                  class="block group"
                >
                  <div class="flex items-start space-x-4">
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center justify-between">
                        <h3
                          class="text-lg font-medium text-gray-900 group-hover:text-indigo-600 transition-colors duration-200"
                        >
                          {{ item.title }}
                        </h3>
                        <span
                          class="text-sm text-gray-500 ml-4 flex-shrink-0"
                          >{{ formatDate(item.published_at) }}</span
                        >
                      </div>
                    </div>
                  </div>
                </NuxtLink>
              </article>
            </div>
          </div>
        </div>

        <!-- 하단 네비게이션 -->
        <div v-if="newsletter" class="mt-8 flex justify-center">
          <NuxtLink
            to="/newsletters"
            class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            목록 보기
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
/**
 * 뉴스레터 상세 페이지
 *
 * === dummy data ===
 * for seungjoo Park
 * 실제 DB 연결 로직은 주석처리되어 있으며, 별도로 백업해두었습니다.
 * /public/data/newsletters-dummy.json 파일을 사용합니다.
 *
 */

const route = useRoute()
const newsletterId = route.params.id

// 상태 관리
const newsletter = ref(null)
const loading = ref(true)
const error = ref(null)
const relatedNewsletters = ref([])

// 스크롤 위치 관리
const scrollPosition = ref(0)
const lastClickedNewsletterId = ref(null)

// 뉴스레터 조회
const fetchNewsletter = async () => {
  try {
    loading.value = true
    error.value = null

    // === DB 연결 로직 (주석처리) ===
    // const response = await $fetch(`/api/public/newsletters/${newsletterId}`)
    // newsletter.value = response.data

    // === 더미 데이터 로직 ===
    const response = await $fetch('/data/newsletters-dummy.json')
    const foundNewsletter = response.data.find(item => item.id == newsletterId)

    if (!foundNewsletter) {
      error.value = '뉴스레터를 찾을 수 없습니다.'
      return
    }

    // 더미 데이터에 추가 필드 보완
    newsletter.value = {
      ...foundNewsletter,
      created_at: foundNewsletter.published_at,
      updated_at:
        foundNewsletter.id === 25
          ? '2025-09-19T19:35:00+09:00'
          : foundNewsletter.published_at,
    }

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
    // === DB 연결 로직 (주석처리) ===
    // const response = await $fetch('/api/public/newsletters/related', {
    //   query: {
    //     id: newsletterId,
    //     limit: 3,
    //   },
    // })
    // relatedNewsletters.value = response.data

    // === 더미 데이터 로직 ===
    const response = await $fetch('/data/newsletters-dummy.json')

    // 현재 뉴스레터를 제외하고 최근 3개 가져오기
    const filteredNewsletters = response.data
      .filter(item => item.id != newsletterId) // 현재 뉴스레터 제외
      .sort((a, b) => new Date(b.published_at) - new Date(a.published_at)) // 최신순 정렬
      .slice(0, 3) // 최대 3개만

    relatedNewsletters.value = filteredNewsletters
  } catch (err) {
    console.error('관련 뉴스레터 조회 실패:', err)
    // 관련 뉴스레터는 실패해도 메인 콘텐츠에 영향 없도록 빈 배열 유지
    relatedNewsletters.value = []
  }
}

// 날짜 포맷 (한국 시간대로 표시)
const formatDate = dateString => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Seoul',
  })
}

// 관련 뉴스레터 클릭 핸들러
const handleRelatedNewsletterClick = newsletterId => {
  // 현재 스크롤 위치 저장
  scrollPosition.value = window.scrollY
  lastClickedNewsletterId.value = newsletterId

  // 세션 스토리지에 저장 (목록 페이지로 돌아갔을 때 사용)
  sessionStorage.setItem(
    'newsletterScrollPosition',
    scrollPosition.value.toString()
  )
  sessionStorage.setItem('lastClickedNewsletterId', newsletterId.toString())
  sessionStorage.setItem('fromDetailPage', 'true')
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

<style scoped>
/* Prose 스타일링 */
.prose {
  color: #374151;
  line-height: 1.75;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  color: #111827;
  font-weight: 600;
  line-height: 1.25;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.prose h1 {
  font-size: 2.25rem;
}
.prose h2 {
  font-size: 1.875rem;
}
.prose h3 {
  font-size: 1.5rem;
}

.prose p {
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
}

.prose ul,
.prose ol {
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
  padding-left: 1.625rem;
}

.prose li {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.prose a {
  color: #4f46e5;
  text-decoration: underline;
}

.prose a:hover {
  color: #3730a3;
}

.prose img {
  margin-top: 2rem;
  margin-bottom: 2rem;
  border-radius: 0.5rem;
}

.prose blockquote {
  border-left: 4px solid #e5e7eb;
  padding-left: 1rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: #6b7280;
}

/* Line clamp utility */
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  line-height: 1.5;
  max-height: 3em;
}
</style>
