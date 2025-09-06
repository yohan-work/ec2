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
              class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              뉴스레터
            </NuxtLink>
            <NuxtLink
              to="/recruits"
              class="text-indigo-600 bg-indigo-50 px-3 py-2 rounded-md text-sm font-medium"
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
            to="/recruits"
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
            채용공고 목록으로 돌아가기
          </NuxtLink>
        </div>

        <!-- 로딩 상태 -->
        <div v-if="loading" class="text-center py-12">
          <div
            class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"
          ></div>
          <p class="mt-2 text-sm text-gray-500">채용공고를 불러오는 중...</p>
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
              @click="fetchRecruit"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              다시 시도
            </button>
          </div>
        </div>

        <!-- 채용공고 내용 -->
        <article
          v-else-if="recruit"
          class="bg-white shadow rounded-lg overflow-hidden"
        >
          <!-- 헤더 -->
          <div class="px-6 py-8 border-b border-gray-200">
            <!-- 뱃지 -->
            <div class="flex items-center space-x-2 mb-4">
              <span
                :class="getEmploymentTypeBadgeClass(recruit.employment_type)"
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
              >
                {{ getEmploymentTypeText(recruit.employment_type) }}
              </span>
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
              >
                모집중
              </span>
            </div>

            <h1 class="text-3xl font-bold text-gray-900 mb-4">
              {{ recruit.title }}
            </h1>

            <!-- 기본 정보 -->
            <div
              class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500"
            >
              <div class="flex items-center">
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span class="font-medium">위치:</span>
                <span class="ml-1">{{ recruit.location || '위치 미정' }}</span>
              </div>

              <div class="flex items-center">
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <span class="font-medium">부서:</span>
                <span class="ml-1">{{
                  recruit.admin_users?.departments?.name || '알 수 없음'
                }}</span>
              </div>

              <div class="flex items-center">
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span class="font-medium">게시일:</span>
                <span class="ml-1">{{ formatDate(recruit.created_at) }}</span>
              </div>
            </div>
          </div>

          <!-- 본문 -->
          <div class="px-6 py-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">채용 상세</h2>
            <div
              class="prose prose-indigo max-w-none"
              v-html="recruit.description"
            ></div>
          </div>

          <!-- 하단 정보 -->
          <div class="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div
              class="flex items-center justify-between text-sm text-gray-500"
            >
              <div>작성일: {{ formatDate(recruit.created_at) }}</div>
              <div v-if="recruit.updated_at !== recruit.created_at">
                수정일: {{ formatDate(recruit.updated_at) }}
              </div>
            </div>
          </div>

          <!-- 지원 안내 -->
          <div class="px-6 py-6 bg-indigo-50 border-t border-gray-200">
            <div class="flex items-center">
              <svg
                class="h-6 w-6 text-indigo-600 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 class="text-lg font-medium text-indigo-900">지원 방법</h3>
                <p class="mt-1 text-sm text-indigo-700">
                  해당 채용공고에 지원하시려면 담당 부서로 직접 문의해 주시기
                  바랍니다.
                </p>
              </div>
            </div>
          </div>
        </article>

        <!-- 관련 채용공고 -->
        <div v-if="recruit && relatedRecruits.length > 0" class="mt-12">
          <div class="bg-white shadow rounded-lg overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-xl font-semibold text-gray-900">최근 채용공고</h2>
              <p class="text-sm text-gray-500 mt-1">
                다른 최신 채용공고도 확인해보세요
              </p>
            </div>

            <div class="divide-y divide-gray-200">
              <article
                v-for="item in relatedRecruits"
                :key="item.id"
                class="px-6 py-6 hover:bg-gray-50 transition-colors duration-200"
              >
                <NuxtLink :to="`/recruits/${item.id}`" class="block group">
                  <div class="flex items-start space-x-4">
                    <div class="flex-1 min-w-0">
                      <!-- 상단: 뱃지와 제목 -->
                      <div class="flex items-start space-x-3 mb-2">
                        <span
                          :class="
                            getEmploymentTypeBadgeClass(item.employment_type)
                          "
                          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium flex-shrink-0"
                        >
                          {{ getEmploymentTypeText(item.employment_type) }}
                        </span>
                        <h3
                          class="text-lg font-medium text-gray-900 group-hover:text-indigo-600 transition-colors duration-200"
                        >
                          {{ item.title }}
                        </h3>
                      </div>

                      <!-- 메타 정보 -->
                      <div
                        class="mt-2 flex items-center text-sm text-gray-500 space-x-4"
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
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {{ item.location || '위치 미정' }}
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
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                          </svg>
                          {{
                            item.admin_users?.departments?.name || '알 수 없음'
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
                          {{ formatDate(item.created_at) }}
                        </div>
                      </div>
                    </div>

                    <!-- 화살표 -->
                    <div class="flex-shrink-0">
                      <svg
                        class="h-5 w-5 text-gray-400 group-hover:text-indigo-600 transition-colors duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </NuxtLink>
              </article>
            </div>
          </div>
        </div>

        <!-- 하단 네비게이션 -->
        <div v-if="recruit" class="mt-8 flex justify-center">
          <NuxtLink
            to="/recruits"
            class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <svg
              class="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
            다른 채용공고 보기
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const route = useRoute()
const recruitId = route.params.id

// 상태 관리
const recruit = ref(null)
const loading = ref(true)
const error = ref(null)
const relatedRecruits = ref([])

// 채용공고 조회
const fetchRecruit = async () => {
  try {
    loading.value = true
    error.value = null

    const response = await $fetch(`/api/public/recruits/${recruitId}`)
    recruit.value = response.data

    // 채용공고 조회 성공 시 관련 채용공고도 가져오기
    await fetchRelatedRecruits()
  } catch (err) {
    console.error('채용공고 조회 실패:', err)
    if (err.statusCode === 404) {
      error.value = '채용공고를 찾을 수 없습니다.'
    } else {
      error.value = '채용공고를 불러올 수 없습니다.'
    }
  } finally {
    loading.value = false
  }
}

// 관련 채용공고 조회 (현재 채용공고 제외하고 최근 3개)
const fetchRelatedRecruits = async () => {
  try {
    const response = await $fetch('/api/public/recruits', {
      query: {
        limit: 4, // 현재 채용공고를 제외할 수 있도록 여분으로 가져오기
      },
    })

    // 현재 채용공고 제외하고 3개만 선택
    const filtered = response.data.filter(
      item => String(item.id) !== String(recruitId)
    )
    relatedRecruits.value = filtered.slice(0, 3)
  } catch (err) {
    console.error('관련 채용공고 조회 실패:', err)
    // 관련 채용공고는 실패해도 메인 콘텐츠에 영향 없도록 빈 배열 유지
    relatedRecruits.value = []
  }
}

// 고용형태 뱃지 클래스
const getEmploymentTypeBadgeClass = type => {
  const classes = {
    fulltime: 'bg-blue-100 text-blue-800',
    contract: 'bg-purple-100 text-purple-800',
    intern: 'bg-orange-100 text-orange-800',
    parttime: 'bg-pink-100 text-pink-800',
  }
  return classes[type] || classes.fulltime
}

// 고용형태 텍스트
const getEmploymentTypeText = type => {
  const texts = {
    fulltime: '정규직',
    contract: '계약직',
    intern: '인턴',
    parttime: '파트타임',
  }
  return texts[type] || '알 수 없음'
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
  fetchRecruit()
})

// 메타 태그
useHead({
  title: () => (recruit.value ? recruit.value.title : '채용공고'),
  meta: [
    {
      name: 'description',
      content: () =>
        recruit.value
          ? recruit.value.description
              .replace(/<[^>]*>/g, '')
              .substring(0, 160) + '...'
          : '채용공고 상세 내용',
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
