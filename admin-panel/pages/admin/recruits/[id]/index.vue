<template>
  <div class="min-h-screen bg-background">
    <!-- 헤더 -->
    <header class="bg-card border-b">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <NuxtLink
              to="/admin/recruits"
              class="text-muted-foreground hover:text-foreground"
            >
              ← 채용공고 목록
            </NuxtLink>
            <h1 class="text-xl font-semibold text-foreground">채용공고 보기</h1>
          </div>
          
          <div class="flex items-center space-x-2" v-if="recruit">
            <NuxtLink
              :to="`/admin/recruits/${recruit.id}/edit`"
              class="inline-flex items-center px-3 py-2 border border-input text-sm font-medium rounded-md hover:bg-accent"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              편집
            </NuxtLink>
            
            <button
              v-if="recruit.status !== 'open'"
              @click="deleteRecruit"
              class="inline-flex items-center px-3 py-2 border border-destructive text-sm font-medium rounded-md text-destructive hover:bg-destructive/10"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H7a1 1 0 00-1 1v3M4 7h16" />
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
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p class="text-muted-foreground mt-2">로딩 중...</p>
      </div>

      <!-- 에러 상태 -->
      <div v-else-if="error" class="text-center py-8">
        <div class="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-foreground">오류 발생</h3>
        <p class="text-muted-foreground mt-1">{{ error }}</p>
      </div>

      <!-- 채용공고 내용 -->
      <div v-else-if="recruit" class="space-y-6">
        <!-- 메타데이터 -->
        <div class="bg-card rounded-lg shadow p-6">
          <div class="flex justify-between items-start mb-4">
            <div class="flex-1">
              <h1 class="text-2xl font-bold text-foreground mb-2">{{ recruit.title }}</h1>
              
              <div class="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                <span
                  class="px-2 py-1 text-xs rounded-full"
                  :class="getStatusBadgeClass(recruit.status)"
                >
                  {{ getStatusText(recruit.status) }}
                </span>
                <span
                  class="px-2 py-1 text-xs rounded-full"
                  :class="getEmploymentTypeBadgeClass(recruit.employment_type)"
                >
                  {{ getEmploymentTypeText(recruit.employment_type) }}
                </span>
                <span v-if="recruit.location">📍 {{ recruit.location }}</span>
              </div>
              
              <div class="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span>편집자: {{ recruit.admin_users?.email }}</span>
                <span>생성: {{ formatDate(recruit.created_at) }}</span>
                <span v-if="recruit.posted_at">게시: {{ formatDate(recruit.posted_at) }}</span>
                <span v-if="recruit.updated_at && recruit.updated_at !== recruit.created_at">
                  수정: {{ formatDate(recruit.updated_at) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 채용 정보 요약 -->
        <div class="bg-card rounded-lg shadow p-6">
          <h2 class="text-lg font-medium text-foreground mb-4">채용 정보</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="text-center p-4 bg-muted rounded-lg">
              <div class="text-2xl mb-2">💼</div>
              <div class="text-sm text-muted-foreground">고용형태</div>
              <div class="font-medium">{{ getEmploymentTypeText(recruit.employment_type) }}</div>
            </div>
            
            <div class="text-center p-4 bg-muted rounded-lg">
              <div class="text-2xl mb-2">📍</div>
              <div class="text-sm text-muted-foreground">근무지</div>
              <div class="font-medium">{{ recruit.location || '미정' }}</div>
            </div>
            
            <div class="text-center p-4 bg-muted rounded-lg">
              <div class="text-2xl mb-2">📊</div>
              <div class="text-sm text-muted-foreground">상태</div>
              <div class="font-medium">{{ getStatusText(recruit.status) }}</div>
            </div>
          </div>
        </div>

        <!-- 본문 내용 -->
        <div class="bg-card rounded-lg shadow p-6">
          <h2 class="text-lg font-medium text-foreground mb-4">상세 내용</h2>
          <div 
            class="prose prose-sm max-w-none dark:prose-invert"
            v-html="recruit.description"
          ></div>
        </div>

        <!-- 액션 버튼들 -->
        <div class="flex justify-between items-center">
          <NuxtLink
            to="/admin/recruits"
            class="inline-flex items-center px-4 py-2 border border-input text-sm font-medium rounded-md hover:bg-accent"
          >
            ← 목록으로 돌아가기
          </NuxtLink>
          
          <div class="flex space-x-2">
            <NuxtLink
              :to="`/admin/recruits/${recruit.id}/edit`"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90"
            >
              편집하기
            </NuxtLink>
            
            <button
              v-if="recruit.status === 'draft'"
              @click="openRecruit"
              :disabled="publishing"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
            >
              <div
                v-if="publishing"
                class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
              ></div>
              {{ publishing ? '공개 중...' : '공개하기' }}
            </button>
            
            <button
              v-if="recruit.status === 'open'"
              @click="closeRecruit"
              :disabled="publishing"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
            >
              <div
                v-if="publishing"
                class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
              ></div>
              {{ publishing ? '마감 중...' : '마감하기' }}
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
const recruitId = route.params.id

// 상태 관리
const recruit = ref(null)
const loading = ref(true)
const error = ref(null)
const publishing = ref(false)

// 채용공고 조회
const fetchRecruit = async () => {
  try {
    loading.value = true
    error.value = null
    
    const { data } = await $fetch(`/api/admin/recruits/${recruitId}`)
    recruit.value = data.data
  } catch (err) {
    console.error('채용공고 조회 실패:', err)
    error.value = err.data?.message || '채용공고를 불러올 수 없습니다.'
  } finally {
    loading.value = false
  }
}

// 채용공고 삭제
const deleteRecruit = async () => {
  if (!confirm(`"${recruit.value.title}" 채용공고를 삭제하시겠습니까?`)) {
    return
  }
  
  try {
    await $fetch(`/api/admin/recruits/${recruitId}`, {
      method: 'DELETE'
    })
    
    // 목록 페이지로 이동
    navigateTo('/admin/recruits')
  } catch (error) {
    console.error('채용공고 삭제 실패:', error)
    alert('삭제 중 오류가 발생했습니다.')
  }
}

// 채용공고 공개
const openRecruit = async () => {
  if (!confirm(`"${recruit.value.title}" 채용공고를 공개하시겠습니까?`)) {
    return
  }
  
  try {
    publishing.value = true
    
    const { data } = await $fetch(`/api/admin/recruits/${recruitId}`, {
      method: 'PUT',
      body: {
        status: 'open'
      }
    })
    
    recruit.value = data.data
    alert('채용공고가 성공적으로 공개되었습니다!')
  } catch (error) {
    console.error('채용공고 공개 실패:', error)
    alert('공개 중 오류가 발생했습니다.')
  } finally {
    publishing.value = false
  }
}

// 채용공고 마감
const closeRecruit = async () => {
  if (!confirm(`"${recruit.value.title}" 채용공고를 마감하시겠습니까?`)) {
    return
  }
  
  try {
    publishing.value = true
    
    const { data } = await $fetch(`/api/admin/recruits/${recruitId}`, {
      method: 'PUT',
      body: {
        status: 'closed'
      }
    })
    
    recruit.value = data.data
    alert('채용공고가 마감되었습니다.')
  } catch (error) {
    console.error('채용공고 마감 실패:', error)
    alert('마감 중 오류가 발생했습니다.')
  } finally {
    publishing.value = false
  }
}

// 상태 뱃지 클래스
const getStatusBadgeClass = (status) => {
  const classes = {
    draft: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
    open: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-300',
    closed: 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-300',
    archived: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-300'
  }
  return classes[status] || classes.draft
}

// 고용형태 뱃지 클래스
const getEmploymentTypeBadgeClass = (type) => {
  const classes = {
    fulltime: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-300',
    contract: 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-300',
    intern: 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-300',
    parttime: 'bg-pink-100 text-pink-800 dark:bg-pink-800 dark:text-pink-300'
  }
  return classes[type] || classes.fulltime
}

// 상태 텍스트
const getStatusText = (status) => {
  const texts = {
    draft: '초안',
    open: '공개',
    closed: '마감',
    archived: '보관됨'
  }
  return texts[status] || '알 수 없음'
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

// 날짜 포맷
const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 컴포넌트 마운트 시 데이터 로드
onMounted(() => {
  fetchRecruit()
})

// 메타 태그
useHead({
  title: () => recruit.value ? `${recruit.value.title} - 채용공고` : '채용공고 보기',
  meta: [
    { name: 'description', content: '채용공고 상세 보기' }
  ],
})
</script>
