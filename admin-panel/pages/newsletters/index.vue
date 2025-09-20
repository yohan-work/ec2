<template>
  <div class="min-h-screen bg-gray-50">
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
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <!-- 제목 및 검색 -->
        <div class="md:flex md:items-center md:justify-between mb-8">
          <div class="flex-1 min-w-0">
            <h2
              class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate"
            >
              뉴스레터
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

        <!-- 뉴스레터 목록 -->
        <div v-else-if="newsletters.length > 0" class="space-y-6">
          <div
            v-for="newsletter in newsletters"
            :key="newsletter.id"
            :id="`newsletter-${newsletter.id}`"
            class="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <div class="p-6">
              <div class="flex items-start space-x-6">
                <!-- 썸네일 이미지 (왼쪽) -->
                <div class="flex-shrink-0">
                  <div class="w-80 h-56 bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      :src="
                        newsletter.thumbnail_image ||
                        '/images/default-newsletter-thumbnail.png'
                      "
                      :alt="newsletter.title"
                      class="w-full h-full object-cover"
                      @error="handleImageError"
                    />
                  </div>
                </div>

                <!-- 텍스트 내용 (오른쪽) -->
                <div class="flex-1 min-w-0">
                  <NuxtLink
                    :to="`/newsletters/${newsletter.id}`"
                    @click="handleNewsletterClick(newsletter.id)"
                    class="text-lg font-medium text-gray-900 hover:text-indigo-600 line-clamp-2"
                  >
                    {{ newsletter.title }}
                  </NuxtLink>
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

                <!-- 액션 버튼 -->
                <div class="flex-shrink-0">
                  <NuxtLink
                    :to="`/newsletters/${newsletter.id}`"
                    @click="handleNewsletterClick(newsletter.id)"
                    class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
                  >
                    자세히 보기
                  </NuxtLink>
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

        <!-- 더보기 -->
        <div v-if="shouldShowLoadMore && !loading" class="mt-8 text-center">
          <button
            @click="loadMoreNewsletters"
            :disabled="loadingMore"
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span
              v-if="loadingMore"
              class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
            ></span>
            {{ loadingMore ? '로딩 중...' : '더보기' }}
          </button>
        </div>

        <!-- 페이지네이션 -->
        <!-- <div
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
        </div> -->
      </div>
    </main>
  </div>
</template>

<script setup>
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

// 뉴스레터 목록 조회
const fetchNewsletters = async () => {
  try {
    loading.value = true

    // === DB 연결 로직 (주석처리) ===
    // const query = {
    //   // pagination.value.page,
    //   page: 1,
    //   limit: pagination.value.limit,
    // }

    // if (searchQuery.value) {
    //   query.search = searchQuery.value
    // }

    // const response = await $fetch('/api/public/newsletters', { query })

    // newsletters.value = response.data
    // pagination.value = response.pagination
    // displayedCount.value = response.data.length

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

    // 페이지네이션 처리
    const startIndex = 0
    const endIndex = pagination.value.limit
    const paginatedData = filteredData.slice(startIndex, endIndex)

    newsletters.value = paginatedData
    pagination.value = {
      page: 1,
      limit: pagination.value.limit,
      total: filteredData.length,
      pages: Math.ceil(filteredData.length / pagination.value.limit),
    }
    displayedCount.value = paginatedData.length
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

    // === DB 연결 로직 (주석처리) ===
    // const nextPage =
    //   Math.floor(displayedCount.value / pagination.value.limit) + 1

    // const query = {
    //   page: nextPage,
    //   limit: pagination.value.limit,
    // }

    // if (searchQuery.value) {
    //   query.search = searchQuery.value
    // }

    // const response = await $fetch('/api/public/newsletters', { query })

    // // 기존 뉴스레터에 새로운 뉴스레터 추가
    // newsletters.value = [...newsletters.value, ...response.data]
    // displayedCount.value += response.data.length

    // // pagination 정보 업데이트
    // pagination.value = response.pagination

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

// HTML 내용 요약
const getExcerpt = html => {
  const text = html.replace(/<[^>]*>/g, '')
  return text.length > 200 ? text.substring(0, 200) + '...' : text
}

// 이미지 로딩 실패 시 기본 이미지 표시
const handleImageError = event => {
  // 기본 PNG 이미지로 대체
  event.target.src = '/images/default-newsletter-thumbnail.png'
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
