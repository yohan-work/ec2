<template>
  <div class="min-h-screen bg-background">
    <!-- 헤더 -->
    <header class="bg-card border-b">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <NuxtLink
              to="/admin/newsletters"
              class="text-muted-foreground hover:text-foreground"
            >
              ← 뉴스레터 목록
            </NuxtLink>
            <h1 class="text-xl font-semibold text-foreground">뉴스레터 보기</h1>
          </div>

          <div class="flex items-center space-x-2" v-if="newsletter">
            <NuxtLink
              :to="`/admin/newsletters/${newsletter.id}/edit`"
              class="inline-flex items-center px-3 py-2 border border-input text-sm font-medium rounded-md hover:bg-accent"
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              편집
            </NuxtLink>

            <button
              v-if="newsletter.status !== 'published'"
              @click="deleteNewsletter"
              class="inline-flex items-center px-3 py-2 border border-destructive text-sm font-medium rounded-md text-destructive hover:bg-destructive/10"
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H7a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              삭제
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- 메인 콘텐츠 -->
    <main class="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <!-- 로딩 상태 -->
      <div v-if="loading" class="text-center py-8">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"
        ></div>
        <p class="text-muted-foreground mt-2">로딩 중...</p>
      </div>

      <!-- 에러 상태 -->
      <div v-else-if="error" class="text-center py-8">
        <div
          class="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-foreground">오류 발생</h3>
        <p class="text-muted-foreground mt-1">{{ error }}</p>
      </div>

      <!-- 뉴스레터 내용 -->
      <div v-else-if="newsletter" class="space-y-6">
        <!-- 메타데이터 -->
        <div class="bg-card rounded-lg shadow p-6">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h1 class="text-2xl font-bold text-foreground mb-2">
                {{ newsletter.title }}
              </h1>
              <div
                class="flex items-center space-x-4 text-sm text-muted-foreground"
              >
                <span
                  class="px-2 py-1 text-xs rounded-full"
                  :class="getStatusBadgeClass(newsletter.status)"
                >
                  {{ getStatusText(newsletter.status) }}
                </span>
                <span>작성자: {{ newsletter.admin_users?.email }}</span>
                <span>생성: {{ formatDate(newsletter.created_at) }}</span>
                <span v-if="newsletter.published_at"
                  >발행: {{ formatDate(newsletter.published_at) }}</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- 본문 내용 -->
        <div class="bg-card rounded-lg shadow p-6">
          <h2 class="text-lg font-medium text-foreground mb-4">내용</h2>
          <div
            class="prose prose-sm max-w-none dark:prose-invert"
            v-html="newsletter.body_html"
          ></div>
        </div>

        <!-- 액션 버튼들 -->
        <div class="flex justify-between items-center">
          <NuxtLink
            to="/admin/newsletters"
            class="inline-flex items-center px-4 py-2 border border-input text-sm font-medium rounded-md hover:bg-accent"
          >
            ← 목록으로 돌아가기
          </NuxtLink>

          <div class="flex space-x-2">
            <NuxtLink
              :to="`/admin/newsletters/${newsletter.id}/edit`"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90"
            >
              편집하기
            </NuxtLink>

            <button
              v-if="newsletter.status === 'draft'"
              @click="publishNewsletter"
              :disabled="publishing"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
            >
              <div
                v-if="publishing"
                class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
              ></div>
              {{ publishing ? '발행 중...' : '발행하기' }}
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// 인증 확인을 위한 미들웨어 적용
definePageMeta({
  middleware: 'auth',
})

const route = useRoute()
const newsletterId = route.params.id

// 상태 관리
const newsletter = ref(null)
const loading = ref(true)
const error = ref(null)
const publishing = ref(false)

// 뉴스레터 조회
const fetchNewsletter = async () => {
  try {
    loading.value = true
    error.value = null

    const response = await $fetch(`/api/admin/newsletters/${newsletterId}`)
    newsletter.value = response.data
  } catch (err) {
    console.error('뉴스레터 조회 실패:', err)
    error.value = err.data?.message || '뉴스레터를 불러올 수 없습니다.'
  } finally {
    loading.value = false
  }
}

// 뉴스레터 삭제
const deleteNewsletter = async () => {
  if (!confirm(`"${newsletter.value.title}" 뉴스레터를 삭제하시겠습니까?`)) {
    return
  }

  try {
    await $fetch(`/api/admin/newsletters/${newsletterId}`, {
      method: 'DELETE',
    })

    // 목록 페이지로 이동
    navigateTo('/admin/newsletters')
  } catch (error) {
    console.error('뉴스레터 삭제 실패:', error)
    alert('삭제 중 오류가 발생했습니다.')
  }
}

// 뉴스레터 발행
const publishNewsletter = async () => {
  if (!confirm(`"${newsletter.value.title}" 뉴스레터를 발행하시겠습니까?`)) {
    return
  }

  try {
    publishing.value = true

    const response = await $fetch(`/api/admin/newsletters/${newsletterId}`, {
      method: 'PUT',
      body: {
        status: 'published',
      },
    })

    newsletter.value = response.data
    alert('뉴스레터가 성공적으로 발행되었습니다!')
  } catch (error) {
    console.error('뉴스레터 발행 실패:', error)
    alert('발행 중 오류가 발생했습니다.')
  } finally {
    publishing.value = false
  }
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
  fetchNewsletter()
})

// 메타 태그
useHead({
  title: () =>
    newsletter.value ? `${newsletter.value.title} - 뉴스레터` : '뉴스레터 보기',
  meta: [{ name: 'description', content: '뉴스레터 상세 보기' }],
})
</script>

<style>
/* Prose 스타일링 */
.prose {
  @apply text-foreground;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  @apply text-foreground;
}

.prose p {
  @apply text-foreground;
}

.prose a {
  @apply text-primary hover:text-primary/80;
}

.prose ul,
.prose ol {
  @apply text-foreground;
}

.prose blockquote {
  @apply text-muted-foreground border-l-border;
}

.prose code {
  @apply text-foreground bg-muted px-1 py-0.5 rounded;
}
</style>
