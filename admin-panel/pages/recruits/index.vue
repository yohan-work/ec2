<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 헤더 -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-xl font-bold text-gray-900">
              📰 뉴스레터 & 채용공고
            </NuxtLink>
          </div>
          
          <nav class="flex space-x-8">
            <NuxtLink
              to="/newsletters"
              class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              📰 뉴스레터
            </NuxtLink>
            <NuxtLink
              to="/recruits"
              class="text-indigo-600 bg-indigo-50 px-3 py-2 rounded-md text-sm font-medium"
            >
              💼 채용공고
            </NuxtLink>
          </nav>
        </div>
      </div>
    </header>

    <!-- 메인 콘텐츠 -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <!-- 제목 및 필터 -->
        <div class="md:flex md:items-center md:justify-between mb-8">
          <div class="flex-1 min-w-0">
            <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              💼 채용공고
            </h2>
            <p class="mt-1 text-sm text-gray-500">
              총 {{ pagination.total }}개의 채용공고
            </p>
          </div>
        </div>

        <!-- 검색 및 필터 -->
        <div class="mb-6 space-y-4 sm:flex sm:space-y-0 sm:space-x-4 sm:items-end">
          <!-- 검색 -->
          <div class="flex-1">
            <label for="search" class="block text-sm font-medium text-gray-700 mb-1">검색</label>
            <div class="relative rounded-md shadow-sm">
              <input
                id="search"
                v-model="searchQuery"
                @input="debouncedSearch"
                type="text"
                placeholder="채용공고 검색..."
                class="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- 고용형태 필터 -->
          <div class="w-full sm:w-48">
            <label for="employment-type" class="block text-sm font-medium text-gray-700 mb-1">고용형태</label>
            <select
              id="employment-type"
              v-model="employmentTypeFilter"
              @change="fetchRecruits"
              class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">전체</option>
              <option value="fulltime">정규직</option>
              <option value="contract">계약직</option>
              <option value="intern">인턴</option>
              <option value="parttime">파트타임</option>
            </select>
          </div>

          <!-- 초기화 버튼 -->
          <div>
            <button
              @click="resetFilters"
              class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <svg class="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              초기화
            </button>
          </div>
        </div>

        <!-- 로딩 상태 -->
        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p class="mt-2 text-sm text-gray-500">채용공고를 불러오는 중...</p>
        </div>

        <!-- 채용공고 목록 -->
        <div v-else-if="recruits.length > 0" class="space-y-6">
          <div
            v-for="recruit in recruits"
            :key="recruit.id"
            class="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <div class="p-6">
              <div class="flex items-start justify-between">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center space-x-2 mb-2">
                    <span
                      :class="getEmploymentTypeBadgeClass(recruit.employment_type)"
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    >
                      {{ getEmploymentTypeText(recruit.employment_type) }}
                    </span>
                  </div>
                  
                  <NuxtLink
                    :to="`/recruits/${recruit.id}`"
                    class="text-lg font-medium text-gray-900 hover:text-indigo-600"
                  >
                    {{ recruit.title }}
                  </NuxtLink>
                  
                  <p class="mt-1 text-sm text-gray-500">
                    {{ getExcerpt(recruit.description) }}
                  </p>
                  
                  <div class="mt-4 flex items-center text-sm text-gray-500 space-x-4">
                    <div class="flex items-center">
                      <svg class="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {{ recruit.location || '위치 미정' }}
                    </div>
                    
                    <div class="flex items-center">
                      <svg class="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {{ recruit.admin_users?.departments?.name || '알 수 없음' }}
                    </div>
                    
                    <div class="flex items-center">
                      <svg class="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {{ formatDate(recruit.created_at) }}
                    </div>
                  </div>
                </div>
                
                <div class="ml-6 flex-shrink-0">
                  <NuxtLink
                    :to="`/recruits/${recruit.id}`"
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
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0H8m8 0v10a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0V4a2 2 0 00-2-2H6a2 2 0 00-2 2v2" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">채용공고가 없습니다</h3>
          <p class="mt-1 text-sm text-gray-500">아직 공개된 채용공고가 없습니다.</p>
        </div>

        <!-- 페이지네이션 -->
        <div v-if="pagination.pages > 1" class="mt-8 flex items-center justify-between">
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
          
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                총 <span class="font-medium">{{ pagination.total }}</span>개 중
                <span class="font-medium">{{ (pagination.page - 1) * pagination.limit + 1 }}</span>-<span class="font-medium">{{ Math.min(pagination.page * pagination.limit, pagination.total) }}</span>개 표시
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
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
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium'
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
const recruits = ref([])
const loading = ref(true)
const searchQuery = ref('')
const employmentTypeFilter = ref('')
const pagination = ref({
  page: 1,
  limit: 10,
  total: 0,
  pages: 0
})

// 채용공고 목록 조회
const fetchRecruits = async () => {
  try {
    loading.value = true
    
    const query = {
      page: pagination.value.page,
      limit: pagination.value.limit
    }
    
    if (searchQuery.value) {
      query.search = searchQuery.value
    }
    
    if (employmentTypeFilter.value) {
      query.employment_type = employmentTypeFilter.value
    }
    
    const response = await $fetch('/api/public/recruits', { query })
    
    recruits.value = response.data
    pagination.value = response.pagination
  } catch (error) {
    console.error('채용공고 목록 조회 실패:', error)
  } finally {
    loading.value = false
  }
}

// 검색 디바운스
let searchTimeout
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    pagination.value.page = 1
    fetchRecruits()
  }, 500)
}

// 필터 초기화
const resetFilters = () => {
  searchQuery.value = ''
  employmentTypeFilter.value = ''
  pagination.value.page = 1
  fetchRecruits()
}

// 페이지 이동
const goToPage = (page) => {
  pagination.value.page = page
  fetchRecruits()
}

// 페이지 번호 배열 생성
const getPageNumbers = () => {
  const current = pagination.value.page
  const total = pagination.value.pages
  const delta = 2
  const range = []
  
  for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
    range.push(i)
  }
  
  return range
}

// 고용형태 뱃지 클래스
const getEmploymentTypeBadgeClass = (type) => {
  const classes = {
    fulltime: 'bg-blue-100 text-blue-800',
    contract: 'bg-purple-100 text-purple-800',
    intern: 'bg-orange-100 text-orange-800',
    parttime: 'bg-pink-100 text-pink-800'
  }
  return classes[type] || classes.fulltime
}

// 고용형태 텍스트
const getEmploymentTypeText = (type) => {
  const texts = {
    fulltime: '정규직',
    contract: '계약직',
    intern: '인턴',
    parttime: '파트타임'
  }
  return texts[type] || '알 수 없음'
}

// HTML 내용 요약
const getExcerpt = (html) => {
  const text = html.replace(/<[^>]*>/g, '')
  return text.length > 200 ? text.substring(0, 200) + '...' : text
}

// 날짜 포맷 (한국 시간대로 표시)
const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'Asia/Seoul'
  })
}

// 컴포넌트 마운트 시 데이터 로드
onMounted(() => {
  fetchRecruits()
})

// 메타 태그
useHead({
  title: '채용공고 목록',
  meta: [
    { name: 'description', content: '최신 채용공고 목록을 확인하세요' }
  ],
})
</script>
