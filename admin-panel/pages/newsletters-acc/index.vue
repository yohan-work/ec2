<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 헤더 -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-xl font-bold text-gray-900">
              뉴스레터 & 채용공고
            </NuxtLink>
          </div>

          <nav class="flex space-x-8">
            <NuxtLink
              to="/newsletters-acc"
              class="text-indigo-600 bg-indigo-50 px-3 py-2 rounded-md text-sm font-medium"
            >
              뉴스레터 (acc)
            </NuxtLink>
            <NuxtLink
              to="/newsletters"
              class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
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
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <!-- 제목 및 검색 -->
        <div class="md:flex md:items-center md:justify-between mb-8">
          <div class="flex-1 min-w-0">
            <h2
              class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate"
            >
              뉴스레터 (acc)
            </h2>
            <p class="mt-1 text-sm text-gray-500">
              총 {{ pagination.total }}개의 뉴스레터
            </p>
          </div>

          <!-- 검색 -->
          <div class="mt-4 flex md:mt-0 md:ml-4">
            <div class="relative rounded-md shadow-sm">
              <input
                v-model="searchQuery"
                @input="debouncedSearch"
                type="text"
                placeholder="뉴스레터 검색..."
                class="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- 로딩 상태 -->
        <div v-if="loading" class="text-center py-12">
          <div
            class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"
          ></div>
          <p class="mt-2 text-sm text-gray-500">뉴스레터를 불러오는 중...</p>
        </div>

        <!-- 뉴스레터 아코디언 목록 -->
        <div v-else-if="newsletters.length > 0" class="space-y-4">
          <div
            v-for="(newsletter, index) in newsletters"
            :key="newsletter.id"
            class="bg-white shadow rounded-lg overflow-hidden"
          >
            <!-- 아코디언 헤더 -->
            <button
              @click="toggleAccordion(index)"
              class="w-full p-6 text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset transition-colors"
            >
              <div class="flex items-center justify-between">
                <div class="flex-1 min-w-0">
                  <h3 class="text-lg font-medium text-gray-900">
                    {{ newsletter.title }}
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">
                    {{ getExcerpt(newsletter.body_html) }}
                  </p>

                  <div class="mt-4 flex items-center text-sm text-gray-500">
                    <span>
                      {{
                        newsletter.admin_users?.departments?.name ||
                        '알 수 없음'
                      }}
                    </span>
                    <span class="mx-2">•</span>
                    <span>
                      {{ formatDate(newsletter.published_at) }}
                    </span>
                  </div>
                </div>

                <!-- 아코디언 화살표 -->
                <div class="ml-6 flex-shrink-0">
                  <svg
                    :class="[
                      'h-5 w-5 text-gray-400 transition-transform duration-200',
                      expandedItems.includes(index) ? 'rotate-180' : '',
                    ]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </button>

            <!-- 아코디언 콘텐츠 -->
            <div
              v-if="expandedItems.includes(index)"
              class="border-t border-gray-200"
            >
              <!-- 로딩 상태 (개별 뉴스레터) -->
              <div v-if="loadingDetails[newsletter.id]" class="p-6 text-center">
                <div
                  class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"
                ></div>
                <p class="mt-2 text-sm text-gray-500">
                  상세 내용을 불러오는 중...
                </p>
              </div>

              <!-- 상세 내용 -->
              <div v-else-if="newsletterDetails[newsletter.id]" class="p-6">
                <!-- 메타 정보 -->
                <div
                  class="flex items-center text-sm text-gray-500 space-x-4 mb-6"
                >
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
                      newsletterDetails[newsletter.id].admin_users?.departments
                        ?.name || '알 수 없음'
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {{
                      formatDate(newsletterDetails[newsletter.id].published_at)
                    }}
                  </div>
                </div>

                <!-- 본문 -->
                <div
                  class="prose prose-indigo max-w-none"
                  v-html="newsletterDetails[newsletter.id].body_html"
                ></div>

                <!-- 하단 정보 -->
                <div
                  class="mt-6 pt-6 bg-gray-50 border-t border-gray-200 rounded-md px-4 py-3"
                >
                  <div
                    class="flex items-center justify-between text-sm text-gray-500"
                  >
                    <div>
                      작성일:
                      {{
                        formatDate(newsletterDetails[newsletter.id].created_at)
                      }}
                    </div>
                    <div
                      v-if="
                        newsletterDetails[newsletter.id].updated_at !==
                        newsletterDetails[newsletter.id].created_at
                      "
                    >
                      수정일:
                      {{
                        formatDate(newsletterDetails[newsletter.id].updated_at)
                      }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- 에러 상태 -->
              <div
                v-else-if="detailErrors[newsletter.id]"
                class="p-6 text-center"
              >
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
                  상세 내용을 불러올 수 없습니다
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                  {{ detailErrors[newsletter.id] }}
                </p>
                <div class="mt-4">
                  <button
                    @click="fetchNewsletterDetail(newsletter.id)"
                    class="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
                  >
                    다시 시도
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 빈 상태 -->
        <div v-else class="text-center py-12">
          <svg
            class="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">
            뉴스레터가 없습니다
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            아직 발행된 뉴스레터가 없습니다.
          </p>
        </div>

        <!-- 페이지네이션 -->
        <div
          v-if="pagination.pages > 1"
          class="mt-8 flex items-center justify-between"
        >
          <div class="flex-1 flex justify-between sm:hidden">
            <button
              @click="goToPage(pagination.page - 1)"
              :disabled="pagination.page <= 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              이전
            </button>
            <button
              @click="goToPage(pagination.page + 1)"
              :disabled="pagination.page >= pagination.pages"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              다음
            </button>
          </div>

          <div
            class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
          >
            <div>
              <p class="text-sm text-gray-700">
                총 <span class="font-medium">{{ pagination.total }}</span
                >개 중
                <span class="font-medium">{{
                  (pagination.page - 1) * pagination.limit + 1
                }}</span
                >-<span class="font-medium">{{
                  Math.min(pagination.page * pagination.limit, pagination.total)
                }}</span
                >개 표시
              </p>
            </div>
            <div>
              <nav
                class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              >
                <button
                  @click="goToPage(pagination.page - 1)"
                  :disabled="pagination.page <= 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  이전
                </button>

                <button
                  v-for="page in getPageNumbers()"
                  :key="page"
                  @click="goToPage(page)"
                  :class="[
                    page === pagination.page
                      ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                  ]"
                >
                  {{ page }}
                </button>

                <button
                  @click="goToPage(pagination.page + 1)"
                  :disabled="pagination.page >= pagination.pages"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  다음
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// 상태 관리
const newsletters = ref([])
const loading = ref(true)
const searchQuery = ref('')
const pagination = ref({
  page: 1,
  limit: 10,
  total: 0,
  pages: 0,
})

// 아코디언 관련 상태
const expandedItems = ref([])
const newsletterDetails = ref({})
const loadingDetails = ref({})
const detailErrors = ref({})

// 뉴스레터 목록 조회
const fetchNewsletters = async () => {
  try {
    loading.value = true

    const query = {
      page: pagination.value.page,
      limit: pagination.value.limit,
    }

    if (searchQuery.value) {
      query.search = searchQuery.value
    }

    const response = await $fetch('/api/public/newsletters', { query })

    newsletters.value = response.data
    pagination.value = response.pagination

    // 페이지가 바뀌면 아코디언 상태 초기화
    expandedItems.value = []
    newsletterDetails.value = {}
    loadingDetails.value = {}
    detailErrors.value = {}
  } catch (error) {
    console.error('뉴스레터 목록 조회 실패:', error)
  } finally {
    loading.value = false
  }
}

// 개별 뉴스레터 상세 조회
const fetchNewsletterDetail = async newsletterId => {
  try {
    loadingDetails.value[newsletterId] = true
    detailErrors.value[newsletterId] = null

    const response = await $fetch(`/api/public/newsletters/${newsletterId}`)
    newsletterDetails.value[newsletterId] = response.data
  } catch (error) {
    console.error(`뉴스레터 ${newsletterId} 조회 실패:`, error)
    detailErrors.value[newsletterId] =
      error.statusCode === 404
        ? '뉴스레터를 찾을 수 없습니다.'
        : '상세 내용을 불러올 수 없습니다.'
  } finally {
    loadingDetails.value[newsletterId] = false
  }
}

// 아코디언 토글
const toggleAccordion = async index => {
  const isExpanded = expandedItems.value.includes(index)

  if (isExpanded) {
    // 아코디언 닫기
    expandedItems.value = expandedItems.value.filter(i => i !== index)
  } else {
    // 아코디언 열기
    expandedItems.value.push(index)

    // 상세 내용이 없으면 가져오기
    const newsletter = newsletters.value[index]
    if (newsletter && !newsletterDetails.value[newsletter.id]) {
      await fetchNewsletterDetail(newsletter.id)
    }
  }
}

// 검색 디바운스
let searchTimeout
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    pagination.value.page = 1
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

// HTML 내용 요약
const getExcerpt = html => {
  const text = html.replace(/<[^>]*>/g, '')
  return text.length > 200 ? text.substring(0, 200) + '...' : text
}

// 날짜 포맷 (한국 시간대로 표시)
const formatDate = dateString => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Seoul',
  })
}

// 컴포넌트 마운트 시 데이터 로드
onMounted(() => {
  fetchNewsletters()
})

// 메타 태그
useHead({
  title: '뉴스레터 목록 (아코디언)',
  meta: [
    {
      name: 'description',
      content: '아코디언 형식으로 뉴스레터 목록과 상세 내용을 확인하세요',
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
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.prose h1 {
  font-size: 1.875rem;
}
.prose h2 {
  font-size: 1.5rem;
}
.prose h3 {
  font-size: 1.25rem;
}

.prose p {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.prose ul,
.prose ol {
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-left: 1.5rem;
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
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 0.5rem;
  max-width: 100%;
  height: auto;
}

.prose blockquote {
  border-left: 4px solid #e5e7eb;
  padding-left: 1rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: #6b7280;
}

/* 아코디언 애니메이션 */
.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.accordion-content.expanded {
  max-height: 1000px;
}
</style>
