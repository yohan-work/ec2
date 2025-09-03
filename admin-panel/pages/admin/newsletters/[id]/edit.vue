<template>
  <div class="min-h-screen bg-background">
    <!-- 헤더 -->
    <header class="bg-card border-b">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <NuxtLink
              :to="
                isEditing
                  ? `/admin/newsletters/${newsletterId}`
                  : '/admin/newsletters'
              "
              class="text-muted-foreground hover:text-foreground"
            >
              ← {{ isEditing ? '뉴스레터 보기' : '뉴스레터 목록' }}
            </NuxtLink>
            <h1 class="text-xl font-semibold text-foreground">
              {{ isEditing ? '뉴스레터 편집' : '새 뉴스레터 작성' }}
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
              @click="saveAndPublish"
              :disabled="saving || !form.title.trim() || !form.body_html.trim()"
              class="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 disabled:opacity-50"
            >
              <div
                v-if="saving"
                class="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"
              ></div>
              {{ saving ? '저장 중...' : '저장 및 발행' }}
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

      <!-- 편집 폼 -->
      <form v-else @submit.prevent="saveDraft" class="space-y-6">
        <!-- 기본 정보 -->
        <div class="bg-card rounded-lg shadow p-6">
          <h2 class="text-lg font-medium text-foreground mb-4">기본 정보</h2>

          <div class="space-y-4">
            <div>
              <label
                for="title"
                class="block text-sm font-medium text-foreground mb-1"
              >
                제목 *
              </label>
              <input
                id="title"
                v-model="form.title"
                type="text"
                required
                class="w-full rounded-md border border-input px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="뉴스레터 제목을 입력하세요"
              />
            </div>

            <!-- 썸네일 이미지 -->
            <div>
              <label
                for="thumbnail"
                class="block text-sm font-medium text-foreground mb-1"
              >
                썸네일 이미지
              </label>
              <div class="flex items-center space-x-4">
                <div
                  v-if="
                    form.thumbnail_image || originalNewsletter?.thumbnail_image
                  "
                  class="flex-shrink-0"
                >
                  <img
                    :src="
                      form.thumbnail_image ||
                      originalNewsletter?.thumbnail_image
                    "
                    alt="썸네일 미리보기"
                    class="w-32 h-24 object-cover rounded-lg border border-input"
                  />
                </div>
                <div class="flex-1">
                  <input
                    id="thumbnail"
                    v-model="form.thumbnail_image"
                    type="text"
                    class="w-full rounded-md border border-input px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="이미지 URL을 입력하거나 아래 버튼으로 업로드하세요"
                  />
                  <div class="mt-2 flex space-x-2">
                    <button
                      type="button"
                      @click="uploadThumbnail"
                      class="inline-flex items-center px-3 py-1 border border-input text-xs font-medium rounded hover:bg-accent"
                    >
                      이미지 업로드
                    </button>
                    <button
                      v-if="
                        form.thumbnail_image ||
                        originalNewsletter?.thumbnail_image
                      "
                      type="button"
                      @click="removeThumbnail"
                      class="inline-flex items-center px-3 py-1 border border-red-300 text-xs font-medium rounded text-red-600 hover:bg-red-50"
                    >
                      제거
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label
                  for="status"
                  class="block text-sm font-medium text-foreground mb-1"
                >
                  상태
                </label>
                <select
                  id="status"
                  v-model="form.status"
                  class="w-full rounded-md border border-input px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="draft">초안</option>
                  <option value="published">발행</option>
                  <option value="archived">보관</option>
                </select>
              </div>

              <div v-if="isEditing">
                <label class="block text-sm font-medium text-foreground mb-1">
                  작성자
                </label>
                <div
                  class="w-full px-3 py-2 text-sm bg-muted border border-input rounded-md"
                >
                  {{ originalNewsletter?.admin_users?.email || '알 수 없음' }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 내용 -->
        <div class="bg-card rounded-lg shadow p-6">
          <h2 class="text-lg font-medium text-foreground mb-4">내용</h2>

          <div class="space-y-4">
            <!-- 에디터 툴바 -->
            <div
              class="flex flex-wrap gap-2 p-3 bg-muted rounded-md border border-input"
            >
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
              <div class="border-l border-input mx-2"></div>
              <button
                type="button"
                @click="insertImage"
                class="px-2 py-1 text-xs border border-input rounded hover:bg-background"
                title="이미지 삽입"
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
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </button>
              <button
                type="button"
                @click="insertLink"
                class="px-2 py-1 text-xs border border-input rounded hover:bg-background"
                title="링크 삽입"
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
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
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
                style="white-space: pre-wrap"
              ></div>
            </div>

            <!-- 미리보기 -->
            <div v-if="showPreview" class="mt-4">
              <h3 class="text-sm font-medium text-foreground mb-2">미리보기</h3>
              <div
                class="p-4 border border-input rounded-md bg-muted prose prose-sm max-w-none"
                v-html="form.body_html"
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
                {{ getWordCount(form.body_html) }} 단어
              </div>
            </div>
          </div>
        </div>

        <!-- 하단 액션 -->
        <div class="flex justify-between items-center">
          <NuxtLink
            :to="
              isEditing
                ? `/admin/newsletters/${newsletterId}`
                : '/admin/newsletters'
            "
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
              @click="saveAndPublish"
              :disabled="saving || !form.title.trim() || !form.body_html.trim()"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 disabled:opacity-50"
            >
              {{ saving ? '저장 중...' : '저장 및 발행' }}
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
const newsletterId = route.params.id

// 편집 모드 확인
const isEditing = computed(() => newsletterId !== 'new')

// 상태 관리
const originalNewsletter = ref(null)
const loading = ref(true)
const error = ref(null)
const saving = ref(false)
const showPreview = ref(false)

// 폼 데이터
const form = reactive({
  title: '',
  body_html: '',
  thumbnail_image: '',
  status: 'draft',
})

// 에디터 참조
const editorRef = ref(null)

// 뉴스레터 조회 (편집 모드일 때)
const fetchNewsletter = async () => {
  if (!isEditing.value) {
    loading.value = false
    return
  }

  try {
    loading.value = true
    error.value = null

    const response = await $fetch(`/api/admin/newsletters/${newsletterId}`)
    originalNewsletter.value = response.data

    // 폼에 데이터 채우기
    form.title = originalNewsletter.value.title
    form.body_html = originalNewsletter.value.body_html
    form.thumbnail_image = originalNewsletter.value.thumbnail_image || ''
    form.status = originalNewsletter.value.status

    // 에디터에 내용 설정
    nextTick(() => {
      if (editorRef.value) {
        editorRef.value.innerHTML = originalNewsletter.value.body_html
      }
    })
  } catch (err) {
    console.error('뉴스레터 조회 실패:', err)
    error.value = err.data?.message || '뉴스레터를 불러올 수 없습니다.'
  } finally {
    loading.value = false
  }
}

// 에디터 내용 업데이트
const updateContent = () => {
  if (editorRef.value) {
    form.body_html = editorRef.value.innerHTML
  }
}

// 썸네일 이미지 업로드
const uploadThumbnail = async () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.multiple = false

  input.addEventListener('change', async event => {
    const file = event.target.files[0]
    if (!file) return

    // 파일 크기 검사 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('파일 크기가 너무 큽니다. (최대 5MB)')
      return
    }

    try {
      // FormData로 파일 업로드
      const formData = new FormData()
      formData.append('file', file)

      const response = await $fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      })

      if (response.success) {
        form.thumbnail_image = response.data.url
      }
    } catch (error) {
      console.error('썸네일 이미지 업로드 실패:', error)
      alert('썸네일 이미지 업로드에 실패했습니다.')
    }
  })

  input.click()
}

// 썸네일 이미지 제거
const removeThumbnail = () => {
  form.thumbnail_image = ''
}

// 커서 위치에 텍스트 삽입
const insertTextAtCursor = text => {
  if (editorRef.value) {
    editorRef.value.focus()
    const selection = window.getSelection()
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      range.deleteContents()
      const textNode = document.createTextNode(text)
      range.insertNode(textNode)
      range.setStartAfter(textNode)
      range.setEndAfter(textNode)
      selection.removeAllRanges()
      selection.addRange(range)
    } else {
      // 커서가 없으면 에디터 끝에 추가
      const range = document.createRange()
      range.selectNodeContents(editorRef.value)
      range.collapse(false)
      const textNode = document.createTextNode(text)
      range.insertNode(textNode)
      selection.removeAllRanges()
      selection.addRange(range)
    }
  }
}

// 붙여넣기 처리
const handlePaste = e => {
  e.preventDefault()
  const text = e.clipboardData.getData('text/plain')
  document.execCommand('insertText', false, text)
}

// 텍스트 포맷팅
const formatText = command => {
  document.execCommand(command, false, null)
  updateContent()
}

// 제목 삽입
const insertHeading = level => {
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
const insertList = type => {
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

// 이미지 삽입
const insertImage = async () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.multiple = false

  input.addEventListener('change', async event => {
    const file = event.target.files[0]
    if (!file) return

    // 파일 크기 검사 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('파일 크기가 너무 큽니다. (최대 5MB)')
      return
    }

    try {
      // 로딩 상태 표시
      const loadingText = '[이미지 업로드 중...]'
      insertTextAtCursor(loadingText)

      // FormData로 파일 업로드
      const formData = new FormData()
      formData.append('file', file)

      const response = await $fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      })

      if (response.success) {
        // 로딩 텍스트 제거하고 이미지 삽입
        const editorContent = editorRef.value.innerHTML
        const imageHTML = `<img src="${response.data.url}" alt="${response.data.originalName}" style="max-width: 100%; height: auto; margin: 10px 0;" />`
        editorRef.value.innerHTML = editorContent.replace(
          loadingText,
          imageHTML
        )
        updateContent()
      }
    } catch (error) {
      console.error('이미지 업로드 실패:', error)
      alert('이미지 업로드에 실패했습니다.')

      // 로딩 텍스트 제거
      const editorContent = editorRef.value.innerHTML
      editorRef.value.innerHTML = editorContent.replace(
        '[이미지 업로드 중...]',
        ''
      )
    }
  })

  input.click()
}

// 링크 삽입
const insertLink = () => {
  const selection = window.getSelection()
  if (selection.rangeCount === 0) {
    alert('링크를 적용할 텍스트를 먼저 선택해주세요.')
    return
  }

  const range = selection.getRangeAt(0)
  const selectedText = range.toString()

  if (!selectedText.trim()) {
    alert('링크를 적용할 텍스트를 선택해주세요.')
    return
  }

  const url = prompt('링크 URL을 입력하세요:', 'https://')
  if (!url) return

  // URL 유효성 검사
  try {
    new URL(url)
  } catch {
    alert('올바른 URL을 입력해주세요.')
    return
  }

  // 링크 생성
  const link = document.createElement('a')
  link.href = url
  link.textContent = selectedText
  link.target = '_blank'
  link.rel = 'noopener noreferrer'

  range.deleteContents()
  range.insertNode(link)

  updateContent()
}

// 단어 수 계산
const getWordCount = html => {
  const text = html.replace(/<[^>]*>/g, '')
  return text.trim().length
}

// 임시저장
const saveDraft = async () => {
  if (!form.title.trim()) {
    alert('제목을 입력해주세요.')
    return
  }

  await saveNewsletter('draft')
}

// 저장 및 발행
const saveAndPublish = async () => {
  if (!form.title.trim() || !form.body_html.trim()) {
    alert('제목과 내용을 모두 입력해주세요.')
    return
  }

  if (confirm('뉴스레터를 저장하고 발행하시겠습니까?')) {
    await saveNewsletter('published')
  }
}

// 뉴스레터 저장
const saveNewsletter = async status => {
  try {
    saving.value = true

    const userInfo = getUserInfo()
    const payload = {
      title: form.title,
      body_html: form.body_html,
      thumbnail_image: form.thumbnail_image || null,
      status: status || form.status,
      cognito_user_id: userInfo.userId || userInfo.username,
    }

    let response
    if (isEditing.value) {
      response = await $fetch(`/api/admin/newsletters/${newsletterId}`, {
        method: 'PUT',
        body: payload,
      })
    } else {
      response = await $fetch('/api/admin/newsletters', {
        method: 'POST',
        body: payload,
      })
    }

    const message =
      status === 'published'
        ? '뉴스레터가 발행되었습니다!'
        : '뉴스레터가 저장되었습니다.'
    alert(message)

    // 생성된 경우 해당 뉴스레터의 상세 페이지로 이동
    if (!isEditing.value) {
      navigateTo(`/admin/newsletters/${response.data.id}`)
    } else if (status === 'published') {
      navigateTo(`/admin/newsletters/${newsletterId}`)
    }
  } catch (error) {
    console.error('뉴스레터 저장 실패:', error)
    alert('저장 중 오류가 발생했습니다.')
  } finally {
    saving.value = false
  }
}

// 컴포넌트 마운트 시 데이터 로드
onMounted(() => {
  fetchNewsletter()
})

// 메타 태그
useHead({
  title: () => (isEditing.value ? '뉴스레터 편집' : '새 뉴스레터 작성'),
  meta: [{ name: 'description', content: '뉴스레터 편집 및 작성' }],
})
</script>

<style>
/* 에디터 스타일링 */
[contenteditable='true'] {
  outline: none;
}

[contenteditable='true'] h1,
[contenteditable='true'] h2,
[contenteditable='true'] h3,
[contenteditable='true'] h4,
[contenteditable='true'] h5,
[contenteditable='true'] h6 {
  @apply font-bold mb-2 mt-4;
}

[contenteditable='true'] h2 {
  @apply text-xl;
}

[contenteditable='true'] h3 {
  @apply text-lg;
}

[contenteditable='true'] p {
  @apply mb-2;
}

[contenteditable='true'] ul,
[contenteditable='true'] ol {
  @apply ml-4 mb-2;
}

[contenteditable='true'] ul {
  @apply list-disc;
}

[contenteditable='true'] ol {
  @apply list-decimal;
}

[contenteditable='true'] li {
  @apply mb-1;
}

[contenteditable='true'] blockquote {
  @apply border-l-4 border-border pl-4 italic text-muted-foreground;
}
</style>
