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
              :disabled="saving || !form.title.trim() || !hasContent()"
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

            <!-- 본문 이미지 -->
            <div>
              <label
                for="body-image"
                class="block text-sm font-medium text-foreground mb-1"
              >
                본문 이미지
              </label>
              <div class="flex items-center space-x-4">
                <div
                  v-if="form.body_image || originalNewsletter?.body_image"
                  class="flex-shrink-0"
                >
                  <img
                    :src="form.body_image || originalNewsletter?.body_image"
                    alt="본문 이미지 미리보기"
                    class="w-32 h-24 object-cover rounded-lg border border-input"
                  />
                </div>
                <div class="flex-1">
                  <input
                    id="body-image"
                    v-model="form.body_image"
                    type="text"
                    class="w-full rounded-md border border-input px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="이미지 URL을 입력하거나 아래 버튼으로 업로드하세요"
                  />
                  <div class="mt-2 flex space-x-2">
                    <button
                      type="button"
                      @click="uploadBodyImage"
                      class="inline-flex items-center px-3 py-1 border border-input text-xs font-medium rounded hover:bg-accent"
                    >
                      이미지 업로드
                    </button>
                    <button
                      v-if="form.body_image || originalNewsletter?.body_image"
                      type="button"
                      @click="removeBodyImage"
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
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-medium text-foreground">내용</h2>
            <div class="flex space-x-2">
              <button
                type="button"
                @click="addParagraph"
                class="inline-flex items-center px-3 py-1 border border-input text-xs font-medium rounded hover:bg-accent"
              >
                <svg
                  class="w-4 h-4 mr-1"
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
                문단 추가
              </button>
            </div>
          </div>

          <div class="space-y-4">
            <!-- Subtitle -->
            <div class="border border-input rounded-md p-4">
              <div class="flex justify-between items-center mb-2">
                <label class="text-sm font-medium text-foreground">
                  부제목 (선택사항)
                </label>
                <div class="flex items-center space-x-2">
                  <input
                    id="subtitle-bold"
                    v-model="form.subtitle_bold"
                    type="checkbox"
                    class="rounded border-input"
                  />
                  <label
                    for="subtitle-bold"
                    class="text-xs text-muted-foreground"
                  >
                    굵게
                  </label>
                </div>
              </div>
              <input
                v-model="form.subtitle"
                type="text"
                class="w-full rounded-md border border-input px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="부제목을 입력하세요 (선택사항)"
              />
              <div class="mt-2 text-xs text-muted-foreground">
                {{ form.subtitle.length }} 글자
              </div>
            </div>

            <!-- 문단들 -->
            <div
              v-for="(paragraph, index) in form.paragraphs"
              :key="paragraph.id"
              class="border border-input rounded-md p-4"
            >
              <div class="flex justify-between items-center mb-2">
                <label class="text-sm font-medium text-foreground">
                  문단 {{ index + 1 }}
                </label>
                <button
                  v-if="form.paragraphs.length > 1"
                  type="button"
                  @click="removeParagraph(index)"
                  class="inline-flex items-center px-2 py-1 border border-red-300 text-xs font-medium rounded text-red-600 hover:bg-red-50"
                >
                  <svg
                    class="w-3 h-3"
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
                </button>
              </div>
              <textarea
                v-model="paragraph.content"
                :placeholder="`문단 ${index + 1} 내용을 입력하세요...`"
                class="w-full rounded-md border border-input px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                rows="4"
              ></textarea>
              <div class="mt-2 text-xs text-muted-foreground">
                {{ paragraph.content.length }} 글자
              </div>
            </div>

            <!-- 미리보기 -->
            <div v-if="showPreview" class="mt-4">
              <h3 class="text-sm font-medium text-foreground mb-2">미리보기</h3>
              <div class="p-4 border border-input rounded-md bg-muted">
                <!-- 본문 이미지가 있으면 제일 위에 표시 -->
                <div v-if="form.body_image" class="mb-4">
                  <img
                    :src="form.body_image"
                    alt="본문 이미지"
                    class="w-full max-w-2xl mx-auto object-cover rounded-lg"
                  />
                </div>

                <!-- Subtitle -->
                <div v-if="form.subtitle.trim()" class="mb-4">
                  <h3
                    :class="form.subtitle_bold ? 'font-bold' : 'font-normal'"
                    class="text-lg text-foreground"
                  >
                    {{ form.subtitle }}
                  </h3>
                </div>

                <!-- 문단들 -->
                <div
                  v-for="(paragraph, index) in form.paragraphs"
                  :key="`preview-${paragraph.id}`"
                  class="mb-4 last:mb-0"
                >
                  <p
                    v-if="paragraph.content.trim()"
                    class="whitespace-pre-wrap"
                  >
                    {{ paragraph.content }}
                  </p>
                  <p v-else class="text-muted-foreground italic">
                    문단 {{ index + 1 }} 내용이 비어있습니다.
                  </p>
                </div>
              </div>
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
                {{ getTotalWordCount() }} 글자
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
              :disabled="saving || !form.title.trim() || !hasContent()"
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
  body_image: '',
  subtitle: '',
  subtitle_bold: false,
  status: 'draft',
  paragraphs: [
    { id: 1, content: '' },
    { id: 2, content: '' },
  ],
})

// 에디터 참조 (사용하지 않음)
// const editorRef = ref(null)

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
    form.body_image = originalNewsletter.value.body_image || ''
    form.subtitle = originalNewsletter.value.subtitle || ''
    form.subtitle_bold = originalNewsletter.value.subtitle_bold || false
    form.status = originalNewsletter.value.status

    // 기존 body_html을 문단으로 변환
    if (originalNewsletter.value.body_html) {
      let htmlContent = originalNewsletter.value.body_html

      // <br><br> 패턴을 문단 구분자로 변환
      htmlContent = htmlContent.replace(
        /<br\s*\/?>\s*<br\s*\/?>/gi,
        '|||PARAGRAPH_SEPARATOR|||'
      )

      // <p> 태그를 기준으로 분할
      const pTags = htmlContent.match(/<p[^>]*>.*?<\/p>/gi) || []

      if (pTags.length > 0) {
        // <p> 태그가 있는 경우
        form.paragraphs = pTags.map((pTag, index) => {
          // HTML 태그 제거하고 텍스트만 추출
          const content = pTag
            .replace(/<[^>]*>/g, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .trim()

          return {
            id: index + 1,
            content: content,
          }
        })
      } else {
        // <p> 태그가 없는 경우, 구분자로 분할
        const paragraphs = htmlContent
          .split('|||PARAGRAPH_SEPARATOR|||')
          .map(paragraph => {
            return paragraph
              .replace(/<[^>]*>/g, '')
              .replace(/&nbsp;/g, ' ')
              .replace(/&amp;/g, '&')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              .replace(/&quot;/g, '"')
              .trim()
          })
          .filter(p => p.length > 0)

        if (paragraphs.length > 0) {
          form.paragraphs = paragraphs.map((content, index) => ({
            id: index + 1,
            content: content,
          }))
        }
      }
    }
  } catch (err) {
    console.error('뉴스레터 조회 실패:', err)
    error.value = err.data?.message || '뉴스레터를 불러올 수 없습니다.'
  } finally {
    loading.value = false
  }
}

// 에디터 내용 업데이트 (사용하지 않음)
// const updateContent = () => {
//   if (editorRef.value) {
//     form.body_html = editorRef.value.innerHTML
//   }
// }

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

// 본문 이미지 업로드
const uploadBodyImage = async () => {
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
        form.body_image = response.data.url
      }
    } catch (error) {
      console.error('본문 이미지 업로드 실패:', error)
      alert('본문 이미지 업로드에 실패했습니다.')
    }
  })

  input.click()
}

// 본문 이미지 제거
const removeBodyImage = () => {
  form.body_image = ''
}

// 에디터 관련 함수들 (사용하지 않음)
// const insertTextAtCursor = text => { ... }
// const handlePaste = e => { ... }
// const formatText = command => { ... }
// const insertHeading = level => { ... }
// const insertList = type => { ... }
// const insertImage = async () => { ... }
// const insertLink = () => { ... }

// 문단 추가
const addParagraph = () => {
  const newId = Math.max(...form.paragraphs.map(p => p.id)) + 1
  form.paragraphs.push({ id: newId, content: '' })
}

// 문단 제거
const removeParagraph = index => {
  if (form.paragraphs.length > 1) {
    form.paragraphs.splice(index, 1)
  }
}

// 전체 글자 수 계산
const getTotalWordCount = () => {
  return form.paragraphs.reduce((total, paragraph) => {
    return total + paragraph.content.length
  }, 0)
}

// 문단들을 HTML로 변환
const convertParagraphsToHtml = () => {
  let html = ''

  // 본문 이미지가 있으면 제일 위에 추가
  if (form.body_image) {
    html += `<div class="body-image mb-4"><img src="${form.body_image}" alt="본문 이미지" style="max-width: 100%; height: auto; border-radius: 8px;" /></div>`
  }

  // Subtitle 추가
  if (form.subtitle.trim()) {
    const boldStyle = form.subtitle_bold ? 'font-weight: bold;' : ''
    html += `<h3 style="${boldStyle} font-size: 1.125rem; margin-bottom: 1rem;">${form.subtitle}</h3>`
  }

  // 문단들 추가
  const paragraphs = form.paragraphs
    .filter(p => p.content.trim())
    .map(p => `<p>${p.content.replace(/\n/g, '<br>')}</p>`)
    .join('<br>')

  html += paragraphs

  return html
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
  if (!form.title.trim() || !hasContent()) {
    alert('제목과 내용을 모두 입력해주세요.')
    return
  }

  if (confirm('뉴스레터를 저장하고 발행하시겠습니까?')) {
    await saveNewsletter('published')
  }
}

// 내용이 있는지 확인
const hasContent = () => {
  return form.paragraphs.some(p => p.content.trim())
}

// 뉴스레터 저장
const saveNewsletter = async status => {
  try {
    saving.value = true

    const userInfo = getUserInfo()
    const payload = {
      title: form.title,
      body_html: convertParagraphsToHtml(),
      thumbnail_image: form.thumbnail_image || null,
      body_image: form.body_image || null,
      subtitle: form.subtitle || null,
      subtitle_bold: form.subtitle_bold,
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
