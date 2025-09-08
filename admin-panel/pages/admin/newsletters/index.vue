<template>
  <div>
    <!-- 페이지 헤더 -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">뉴스레터 관리</h1>
        <p class="text-sm text-gray-600 mt-1">뉴스레터를 작성하고 관리하세요</p>
      </div>
      <button
        @click="createNewsletter"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
      >
        <svg
          class="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        새 뉴스레터 작성
      </button>
    </div>
    <!-- 필터 및 검색 -->
    <div class="bg-card rounded-lg shadow p-4 mb-6">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="제목 또는 내용으로 검색..."
            class="w-full rounded-md border border-input px-3 py-2 text-sm bg-background"
            @input="debouncedSearch"
          />
        </div>
        <div class="flex gap-2">
          <select
            v-model="statusFilter"
            class="rounded-md border border-input px-3 py-2 text-sm bg-background"
            @change="fetchNewsletters"
          >
            <option value="">모든 상태</option>
            <option value="draft">초안</option>
            <option value="published">발행됨</option>
            <option value="archived">보관됨</option>
          </select>
          <button
            @click="resetFilters"
            class="px-3 py-2 text-sm border border-input rounded-md hover:bg-accent"
          >
            초기화
          </button>
        </div>
      </div>
    </div>

    <!-- 로딩 상태 -->
    <div v-if="loading" class="text-center py-8">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"
      ></div>
      <p class="text-muted-foreground mt-2">로딩 중...</p>
    </div>

    <!-- 뉴스레터 목록 -->
    <div v-else-if="newsletters.length > 0" class="space-y-4">
      <div
        v-for="newsletter in newsletters"
        :key="newsletter.id"
        class="bg-card rounded-lg shadow p-6"
      >
        <div class="flex justify-between items-start">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-2">
              <h3 class="text-lg font-medium text-foreground">
                {{ newsletter.title }}
              </h3>
              <span
                class="px-2 py-1 text-xs rounded-full"
                :class="getStatusBadgeClass(newsletter.status)"
              >
                {{ getStatusText(newsletter.status) }}
              </span>
            </div>

            <p
              class="text-sm text-muted-foreground mb-2"
              v-html="getExcerpt(newsletter.body_html)"
            ></p>

            <div
              class="flex items-center text-xs text-muted-foreground space-x-4"
            >
              <span>작성자: {{ newsletter.admin_users?.email }}</span>
              <span>생성: {{ formatDate(newsletter.created_at) }}</span>
              <span v-if="newsletter.published_at"
                >발행: {{ formatDate(newsletter.published_at) }}</span
              >
            </div>
          </div>

          <div class="flex items-center space-x-2 ml-4">
            <button
              @click="viewNewsletter(newsletter)"
              class="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-accent"
              title="보기"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>

            <button
              @click="editNewsletter(newsletter)"
              class="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-accent"
              title="수정"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>

            <button
              @click="deleteNewsletter(newsletter)"
              class="p-2 text-destructive hover:text-destructive/80 rounded-md hover:bg-destructive/10"
              title="삭제"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H7a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 빈 상태 -->
    <div v-else class="text-center py-12">
      <svg
        class="mx-auto h-12 w-12 text-muted-foreground"
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
      <h3 class="mt-2 text-sm font-medium text-foreground">뉴스레터 없음</h3>
      <p class="mt-1 text-sm text-muted-foreground">
        첫 번째 뉴스레터를 작성해보세요.
      </p>
      <div class="mt-6">
        <button
          @click="createNewsletter"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90"
        >
          <svg
            class="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          새 뉴스레터 작성
        </button>
      </div>
    </div>

    <!-- 페이지네이션 -->
    <div v-if="pagination.pages > 1" class="mt-6 flex justify-center">
      <div class="flex items-center space-x-2">
        <button
          @click="goToPage(pagination.page - 1)"
          :disabled="pagination.page <= 1"
          class="px-3 py-2 text-sm border border-input rounded-md disabled:opacity-50 hover:bg-accent"
        >
          이전
        </button>

        <span class="px-3 py-2 text-sm">
          {{ pagination.page }} / {{ pagination.pages }}
        </span>

        <button
          @click="goToPage(pagination.page + 1)"
          :disabled="pagination.page >= pagination.pages"
          class="px-3 py-2 text-sm border border-input rounded-md disabled:opacity-50 hover:bg-accent"
        >
          다음
        </button>
      </div>
    </div>
    <!-- 모달들은 여기에 추가 예정 -->
  </div>
</template>

<script setup>
// 인증 확인을 위한 미들웨어 적용
definePageMeta({
  middleware: 'auth',
  layout: 'admin',
})

const { user, getUserInfo } = useAuth()

// 상태 관리
const newsletters = ref([])
const loading = ref(true)
const searchQuery = ref('')
const statusFilter = ref('')

// 페이지네이션
const pagination = ref({
  page: 1,
  limit: 10,
  total: 0,
  pages: 0,
})

// 뉴스레터 목록 조회
const fetchNewsletters = async () => {
  try {
    loading.value = true

    const query = {
      page: pagination.value.page,
      limit: pagination.value.limit,
    }

    if (statusFilter.value) {
      query.status = statusFilter.value
    }

    if (searchQuery.value) {
      query.search = searchQuery.value
    }

    const response = await $fetch('/api/admin/newsletters', {
      query,
    })

    newsletters.value = response.data
    pagination.value = response.pagination
  } catch (error) {
    console.error('뉴스레터 목록 조회 실패:', error)
    // TODO: 에러 알림 추가
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
    fetchNewsletters()
  }, 500)
}

// 필터 초기화
const resetFilters = () => {
  searchQuery.value = ''
  statusFilter.value = ''
  pagination.value.page = 1
  fetchNewsletters()
}

// 페이지 이동
const goToPage = page => {
  pagination.value.page = page
  fetchNewsletters()
}

// 상태 뱃지 클래스
const getStatusBadgeClass = status => {
  const classes = {
    draft: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
    published:
      'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-300',
    archived:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-300',
  }
  return classes[status] || classes.draft
}

// 상태 텍스트
const getStatusText = status => {
  const texts = {
    draft: '초안',
    published: '발행됨',
    archived: '보관됨',
  }
  return texts[status] || '알 수 없음'
}

// HTML 내용 요약
const getExcerpt = html => {
  const text = html.replace(/<[^>]*>/g, '')
  return text.length > 100 ? text.substring(0, 100) + '...' : text
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

// 뉴스레터 액션들
const createNewsletter = () => {
  navigateTo('/admin/newsletters/new/edit')
}

const viewNewsletter = newsletter => {
  navigateTo(`/admin/newsletters/${newsletter.id}`)
}

const editNewsletter = newsletter => {
  navigateTo(`/admin/newsletters/${newsletter.id}/edit`)
}

const deleteNewsletter = async newsletter => {
  // 발행된 뉴스레터의 경우 더 강한 경고
  let confirmMessage = `"${newsletter.title}" 뉴스레터를 삭제하시겠습니까?`
  if (newsletter.status === 'published') {
    confirmMessage = `⚠️ 주의: "${newsletter.title}" 뉴스레터는 현재 발행 중입니다.\n\n삭제하시면 복구할 수 없습니다. 정말 삭제하시겠습니까?`
  }

  if (!confirm(confirmMessage)) {
    return
  }

  // 한번 더 확인 (중요한 항목인 경우)
  if (newsletter.status === 'published') {
    if (!confirm('마지막 확인: 정말로 삭제하시겠습니까?')) {
      return
    }
  }

  try {
    loading.value = true
    await $fetch(`/api/admin/newsletters/${newsletter.id}`, {
      method: 'DELETE',
    })

    // 목록 새로고침
    await fetchNewsletters()
    alert('뉴스레터가 성공적으로 삭제되었습니다.')
  } catch (error) {
    console.error('뉴스레터 삭제 실패:', error)
    alert('삭제 중 오류가 발생했습니다. 다시 시도해주세요.')
  } finally {
    loading.value = false
  }
}

// 컴포넌트 마운트 시 데이터 로드
onMounted(() => {
  fetchNewsletters()
})

// 메타 태그
useHead({
  title: '뉴스레터 관리 - 관리자 대시보드',
  meta: [{ name: 'description', content: '뉴스레터 콘텐츠 관리' }],
})
</script>
