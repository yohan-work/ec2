<template>
  <div class="min-h-screen bg-background">
    <!-- 헤더 -->
    <header class="bg-card border-b">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <NuxtLink
              :to="isEditing ? `/admin/recruits/${recruitId}` : '/admin/recruits'"
              class="text-muted-foreground hover:text-foreground"
            >
              ← {{ isEditing ? '채용공고 보기' : '채용공고 목록' }}
            </NuxtLink>
            <h1 class="text-xl font-semibold text-foreground">
              {{ isEditing ? '채용공고 편집' : '새 채용공고 작성' }}
            </h1>
          </div>
          
          <div class="flex items-center space-x-2">
            <button
              @click="saveDraft"
              :disabled="saving"
              class="inline-flex items-center px-3 py-2 border border-input text-sm font-medium rounded-md hover:bg-accent disabled:opacity-50"
            >
              <div
                v-if="saving"
                class="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"
              ></div>
              {{ saving ? '저장 중...' : '임시저장' }}
            </button>
            
            <button
              @click="saveAndOpen"
              :disabled="saving || !form.title.trim() || !form.description.trim()"
              class="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 disabled:opacity-50"
            >
              <div
                v-if="saving"
                class="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"
              ></div>
              {{ saving ? '저장 중...' : '저장 및 공개' }}
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

      <!-- 편집 폼 -->
      <form v-else @submit.prevent="saveDraft" class="space-y-6">
        <!-- 기본 정보 -->
        <div class="bg-card rounded-lg shadow p-6">
          <h2 class="text-lg font-medium text-foreground mb-4">기본 정보</h2>
          
          <div class="space-y-4">
            <div>
              <label for="title" class="block text-sm font-medium text-foreground mb-1">
                제목 *
              </label>
              <input
                id="title"
                v-model="form.title"
                type="text"
                required
                class="w-full rounded-md border border-input px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="채용공고 제목을 입력하세요"
              />
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="employment_type" class="block text-sm font-medium text-foreground mb-1">
                  고용형태 *
                </label>
                <select
                  id="employment_type"
                  v-model="form.employment_type"
                  required
                  class="w-full rounded-md border border-input px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="fulltime">정규직</option>
                  <option value="contract">계약직</option>
                  <option value="intern">인턴</option>
                  <option value="parttime">파트타임</option>
                </select>
              </div>
              
              <div>
                <label for="location" class="block text-sm font-medium text-foreground mb-1">
                  근무지
                </label>
                <input
                  id="location"
                  v-model="form.location"
                  type="text"
                  class="w-full rounded-md border border-input px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="예: 서울시 강남구"
                />
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="status" class="block text-sm font-medium text-foreground mb-1">
                  상태
                </label>
                <select
                  id="status"
                  v-model="form.status"
                  class="w-full rounded-md border border-input px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="draft">초안</option>
                  <option value="open">공개</option>
                  <option value="closed">마감</option>
                  <option value="archived">보관</option>
                </select>
              </div>
              
              <div v-if="isEditing">
                <label class="block text-sm font-medium text-foreground mb-1">
                  편집자
                </label>
                <div class="w-full px-3 py-2 text-sm bg-muted border border-input rounded-md">
                  {{ originalRecruit?.admin_users?.email || '알 수 없음' }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 내용 -->
        <div class="bg-card rounded-lg shadow p-6">
          <h2 class="text-lg font-medium text-foreground mb-4">상세 내용</h2>
          
          <div class="space-y-4">
            <!-- 에디터 툴바 -->
            <div class="flex flex-wrap gap-2 p-3 bg-muted rounded-md border border-input">
              <button
                type="button"
                @click="formatText('bold')"
                class="px-2 py-1 text-xs border border-input rounded hover:bg-background"
                title="굵게"
              >
                <strong>B</strong>
              </button>
              <button
                type="button"
                @click="formatText('italic')"
                class="px-2 py-1 text-xs border border-input rounded hover:bg-background"
                title="기울임"
              >
                <em>I</em>
              </button>
              <button
                type="button"
                @click="formatText('underline')"
                class="px-2 py-1 text-xs border border-input rounded hover:bg-background"
                title="밑줄"
              >
                <u>U</u>
              </button>
              <div class="border-l border-input mx-2"></div>
              <button
                type="button"
                @click="insertHeading(2)"
                class="px-2 py-1 text-xs border border-input rounded hover:bg-background"
                title="제목 2"
              >
                H2
              </button>
              <button
                type="button"
                @click="insertHeading(3)"
                class="px-2 py-1 text-xs border border-input rounded hover:bg-background"
                title="제목 3"
              >
                H3
              </button>
              <div class="border-l border-input mx-2"></div>
              <button
                type="button"
                @click="insertList('ul')"
                class="px-2 py-1 text-xs border border-input rounded hover:bg-background"
                title="불릿 목록"
              >
                •
              </button>
              <button
                type="button"
                @click="insertList('ol')"
                class="px-2 py-1 text-xs border border-input rounded hover:bg-background"
                title="번호 목록"
              >
                1.
              </button>
            </div>
            
            <!-- 에디터 -->
            <div class="border border-input rounded-md">
              <div
                ref="editorRef"
                contenteditable="true"
                @input="updateContent"
                @paste="handlePaste"
                class="min-h-[400px] p-4 focus:outline-none focus:ring-2 focus:ring-primary prose prose-sm max-w-none"
                style="white-space: pre-wrap;"
              ></div>
            </div>
            
            <!-- 미리보기 -->
            <div v-if="showPreview" class="mt-4">
              <h3 class="text-sm font-medium text-foreground mb-2">미리보기</h3>
              <div 
                class="p-4 border border-input rounded-md bg-muted prose prose-sm max-w-none"
                v-html="form.description"
              ></div>
            </div>
            
            <div class="flex justify-between items-center">
              <button
                type="button"
                @click="showPreview = !showPreview"
                class="text-sm text-primary hover:text-primary/80"
              >
                {{ showPreview ? '미리보기 숨기기' : '미리보기 보기' }}
              </button>
              
              <div class="text-sm text-muted-foreground">
                {{ getWordCount(form.description) }} 단어
              </div>
            </div>
          </div>
        </div>

        <!-- 하단 액션 -->
        <div class="flex justify-between items-center">
          <NuxtLink
            :to="isEditing ? `/admin/recruits/${recruitId}` : '/admin/recruits'"
            class="text-muted-foreground hover:text-foreground"
          >
            취소
          </NuxtLink>
          
          <div class="flex space-x-2">
            <button
              type="submit"
              :disabled="saving"
              class="inline-flex items-center px-4 py-2 border border-input text-sm font-medium rounded-md hover:bg-accent disabled:opacity-50"
            >
              {{ saving ? '저장 중...' : '임시저장' }}
            </button>
            
            <button
              type="button"
              @click="saveAndOpen"
              :disabled="saving || !form.title.trim() || !form.description.trim()"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 disabled:opacity-50"
            >
              {{ saving ? '저장 중...' : '저장 및 공개' }}
            </button>
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script setup>
// 인증 확인을 위한 미들웨어 적용
definePageMeta({
  middleware: 'auth',
})

const route = useRoute()
const { user, getUserInfo } = useAuth()
const recruitId = route.params.id

// 편집 모드 확인
const isEditing = computed(() => recruitId !== 'new')

// 상태 관리
const originalRecruit = ref(null)
const loading = ref(true)
const error = ref(null)
const saving = ref(false)
const showPreview = ref(false)

// 폼 데이터
const form = reactive({
  title: '',
  description: '',
  location: '',
  employment_type: 'fulltime',
  status: 'draft'
})

// 에디터 참조
const editorRef = ref(null)

// 채용공고 조회 (편집 모드일 때)
const fetchRecruit = async () => {
  if (!isEditing.value) {
    loading.value = false
    return
  }
  
  try {
    loading.value = true
    error.value = null
    
    const { data } = await $fetch(`/api/admin/recruits/${recruitId}`)
    originalRecruit.value = data.data
    
    // 폼에 데이터 채우기
    form.title = originalRecruit.value.title
    form.description = originalRecruit.value.description
    form.location = originalRecruit.value.location || ''
    form.employment_type = originalRecruit.value.employment_type
    form.status = originalRecruit.value.status
    
    // 에디터에 내용 설정
    nextTick(() => {
      if (editorRef.value) {
        editorRef.value.innerHTML = originalRecruit.value.description
      }
    })
  } catch (err) {
    console.error('채용공고 조회 실패:', err)
    error.value = err.data?.message || '채용공고를 불러올 수 없습니다.'
  } finally {
    loading.value = false
  }
}

// 에디터 내용 업데이트
const updateContent = () => {
  if (editorRef.value) {
    form.description = editorRef.value.innerHTML
  }
}

// 붙여넣기 처리
const handlePaste = (e) => {
  e.preventDefault()
  const text = e.clipboardData.getData('text/plain')
  document.execCommand('insertText', false, text)
}

// 텍스트 포맷팅
const formatText = (command) => {
  document.execCommand(command, false, null)
  updateContent()
}

// 제목 삽입
const insertHeading = (level) => {
  const selection = window.getSelection()
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0)
    const text = range.toString() || `제목 ${level}`
    
    range.deleteContents()
    const heading = document.createElement(`h${level}`)
    heading.textContent = text
    range.insertNode(heading)
    
    updateContent()
  }
}

// 목록 삽입
const insertList = (type) => {
  const selection = window.getSelection()
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0)
    const listElement = document.createElement(type)
    const listItem = document.createElement('li')
    listItem.textContent = '목록 항목'
    listElement.appendChild(listItem)
    
    range.insertNode(listElement)
    updateContent()
  }
}

// 단어 수 계산
const getWordCount = (html) => {
  const text = html.replace(/<[^>]*>/g, '')
  return text.trim().length
}

// 임시저장
const saveDraft = async () => {
  if (!form.title.trim()) {
    alert('제목을 입력해주세요.')
    return
  }
  
  await saveRecruit('draft')
}

// 저장 및 공개
const saveAndOpen = async () => {
  if (!form.title.trim() || !form.description.trim()) {
    alert('제목과 내용을 모두 입력해주세요.')
    return
  }
  
  if (confirm('채용공고를 저장하고 공개하시겠습니까?')) {
    await saveRecruit('open')
  }
}

// 채용공고 저장
const saveRecruit = async (status) => {
  try {
    saving.value = true
    
    const userInfo = getUserInfo()
    const payload = {
      title: form.title,
      description: form.description,
      location: form.location || null,
      employment_type: form.employment_type,
      status: status || form.status,
      cognito_user_id: userInfo.userId || userInfo.username
    }
    
    let response
    if (isEditing.value) {
      response = await $fetch(`/api/admin/recruits/${recruitId}`, {
        method: 'PUT',
        body: payload
      })
    } else {
      response = await $fetch('/api/admin/recruits', {
        method: 'POST',
        body: payload
      })
    }
    
    const message = status === 'open' ? '채용공고가 공개되었습니다!' : '채용공고가 저장되었습니다.'
    alert(message)
    
    // 생성된 경우 해당 채용공고의 상세 페이지로 이동
    if (!isEditing.value) {
      navigateTo(`/admin/recruits/${response.data.id}`)
    } else if (status === 'open') {
      navigateTo(`/admin/recruits/${recruitId}`)
    }
  } catch (error) {
    console.error('채용공고 저장 실패:', error)
    alert('저장 중 오류가 발생했습니다.')
  } finally {
    saving.value = false
  }
}

// 컴포넌트 마운트 시 데이터 로드
onMounted(() => {
  fetchRecruit()
})

// 메타 태그
useHead({
  title: () => isEditing.value ? '채용공고 편집' : '새 채용공고 작성',
  meta: [
    { name: 'description', content: '채용공고 편집 및 작성' }
  ],
})
</script>
