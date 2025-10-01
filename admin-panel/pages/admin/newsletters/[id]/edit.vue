<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 페이지 헤더 -->
    <div class="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div class="mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-4">
            <NuxtLink
              :to="
                isEditing
                  ? `/admin/newsletters/${newsletterId}`
                  : '/admin/newsletters'
              "
              class="inline-flex items-center text-gray-500 hover:text-gray-700 transition-colors"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {{ isEditing ? '뉴스레터 보기' : '뉴스레터 목록' }}
            </NuxtLink>
            <div class="h-6 w-px bg-gray-300"></div>
            <h1 class="text-xl font-semibold text-gray-900">
              {{ isEditing ? '뉴스레터 편집' : '새 뉴스레터 작성' }}
            </h1>
          </div>

          <div class="flex items-center space-x-3">
            <button
              @click="saveDraft"
              :disabled="saving"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <div
                v-if="saving"
                class="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400 mr-2"
              ></div>
              {{ saving ? '저장 중...' : '임시저장' }}
            </button>

            <button
              @click="saveAndPublish"
              :disabled="saving || !form.title.trim() || !hasContent()"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <div
                v-if="saving"
                class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
              ></div>
              {{ saving ? '저장 중...' : '저장 및 발행' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 메인 컨텐츠 -->
    <div class="mx-auto py-6">
      <!-- 로딩 상태 -->
      <div v-if="loading" class="flex items-center justify-center py-16">
        <div class="text-center">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"
          ></div>
          <p class="text-gray-500 mt-3">로딩 중...</p>
        </div>
      </div>

      <!-- 에러 상태 -->
      <div v-else-if="error" class="text-center py-16">
        <div
          class="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg
            class="w-8 h-8"
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
        <h3 class="text-lg font-semibold text-gray-900 mb-2">오류 발생</h3>
        <p class="text-gray-600">{{ error }}</p>
      </div>

      <!-- 편집 폼 -->
      <form v-else @submit.prevent="saveDraft" class="space-y-8">
        <!-- 기본 정보 -->
        <div
          class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <div class="px-6 py-4 border-b border-gray-100">
            <h2 class="text-lg font-semibold text-gray-900">기본 정보</h2>
          </div>
          <div class="p-6">
            <div class="space-y-6">
              <div>
                <label
                  for="title"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  제목 <span class="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  v-model="form.title"
                  type="text"
                  required
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="뉴스레터 제목을 입력하세요"
                />
              </div>

              <!-- 썸네일 이미지 -->
              <div>
                <label
                  for="thumbnail"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  썸네일 이미지
                </label>
                <div class="space-y-4">
                  <div
                    v-if="
                      form.thumbnail_image ||
                      originalNewsletter?.thumbnail_image
                    "
                    class="flex items-start space-x-4"
                  >
                    <div class="flex-shrink-0">
                      <img
                        :src="
                          form.thumbnail_image ||
                          originalNewsletter?.thumbnail_image
                        "
                        alt="썸네일 미리보기"
                        class="w-32 h-24 object-cover rounded-lg border border-gray-200 shadow-sm"
                      />
                    </div>
                    <div class="flex-1 min-w-0">
                      <input
                        id="thumbnail"
                        v-model="form.thumbnail_image"
                        type="text"
                        class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="이미지 URL을 입력하거나 아래 버튼으로 업로드하세요"
                      />
                    </div>
                  </div>
                  <div v-else>
                    <input
                      id="thumbnail"
                      v-model="form.thumbnail_image"
                      type="text"
                      class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="이미지 URL을 입력하거나 아래 버튼으로 업로드하세요"
                    />
                  </div>
                  <div class="flex space-x-3">
                    <button
                      type="button"
                      @click="uploadThumbnail"
                      class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
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
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      이미지 업로드
                    </button>
                    <button
                      v-if="
                        form.thumbnail_image ||
                        originalNewsletter?.thumbnail_image
                      "
                      type="button"
                      @click="removeThumbnail"
                      class="inline-flex items-center px-4 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      제거
                    </button>
                  </div>
                </div>
              </div>

              <!-- 본문 이미지 -->
              <div>
                <label
                  for="body-image"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  본문 이미지
                </label>
                <div class="space-y-4">
                  <div
                    v-if="form.body_image || originalNewsletter?.body_image"
                    class="flex items-start space-x-4"
                  >
                    <div class="flex-shrink-0">
                      <img
                        :src="form.body_image || originalNewsletter?.body_image"
                        alt="본문 이미지 미리보기"
                        class="w-32 h-24 object-cover rounded-lg border border-gray-200 shadow-sm"
                      />
                    </div>
                    <div class="flex-1 min-w-0">
                      <input
                        id="body-image"
                        v-model="form.body_image"
                        type="text"
                        class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="이미지 URL을 입력하거나 아래 버튼으로 업로드하세요"
                      />
                    </div>
                  </div>
                  <div v-else>
                    <input
                      id="body-image"
                      v-model="form.body_image"
                      type="text"
                      class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="이미지 URL을 입력하거나 아래 버튼으로 업로드하세요"
                    />
                  </div>
                  <div class="flex space-x-3">
                    <button
                      type="button"
                      @click="uploadBodyImage"
                      class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
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
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      이미지 업로드
                    </button>
                    <button
                      v-if="form.body_image || originalNewsletter?.body_image"
                      type="button"
                      @click="removeBodyImage"
                      class="inline-flex items-center px-4 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      제거
                    </button>
                  </div>
                </div>
              </div>

              <!-- 상태 및 작성자 정보 -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    for="status"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    상태
                  </label>
                  <select
                    id="status"
                    v-model="form.status"
                    class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="draft">초안</option>
                    <option value="published">발행</option>
                    <option value="archived">보관</option>
                  </select>
                </div>

                <div v-if="isEditing">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    작성자
                  </label>
                  <div
                    class="w-full px-4 py-3 text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg"
                  >
                    {{ originalNewsletter?.admin_users?.email || '알 수 없음' }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 내용 -->
        <div class="space-y-0" ref="contentSection">
          <div
            ref="stickyHeader"
            class="px-6 py-4 bg-white border border-gray-200 rounded-t-xl flex justify-between items-center transition-all duration-200"
            :class="{
              'fixed top-0 left-0 w-full z-30 shadow-lg border-b':
                isHeaderSticky,
            }"
            :style="isHeaderSticky ? { borderRadius: '0' } : {}"
          >
            <h2 class="text-lg font-semibold text-gray-900">내용</h2>
            <button
              type="button"
              @click="addParagraph"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
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
              문단 추가
            </button>
          </div>

          <!-- <div v-if="isHeaderSticky" class="h-20"></div> -->

          <!-- 내용 컨테이너 -->
          <div
            class="bg-white rounded-b-xl shadow-sm border-l border-r border-b border-gray-200"
          >
            <div class="p-6">
              <div class="space-y-6">
                <!-- Subtitle -->
                <div class="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <div class="flex justify-between items-center mb-3">
                    <label class="text-sm font-medium text-gray-700">
                      부제목 (선택사항)
                    </label>
                    <div class="flex items-center space-x-2">
                      <input
                        id="subtitle-bold"
                        v-model="form.subtitle_bold"
                        type="checkbox"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <label for="subtitle-bold" class="text-sm text-gray-600">
                        굵게
                      </label>
                    </div>
                  </div>
                  <input
                    v-model="form.subtitle"
                    type="text"
                    class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="부제목을 입력하세요 (선택사항)"
                  />
                  <div class="mt-2 text-xs text-gray-500">
                    {{ form.subtitle.length }} 글자
                  </div>
                </div>

                <!-- 문단들 -->
                <div
                  v-for="(paragraph, index) in form.paragraphs"
                  :key="paragraph.id"
                  class="bg-white rounded-lg border border-gray-200 p-5 shadow-sm"
                >
                  <div class="flex justify-between items-center mb-3">
                    <label class="text-sm font-medium text-gray-700">
                      문단 {{ index + 1 }}
                    </label>
                    <button
                      v-if="form.paragraphs.length > 1"
                      type="button"
                      @click="removeParagraph(index)"
                      class="inline-flex items-center p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                  <textarea
                    v-model="paragraph.content"
                    :placeholder="`문단 ${index + 1} 내용을 입력하세요...`"
                    class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                    rows="5"
                  ></textarea>
                  <div class="mt-2 text-xs text-gray-500">
                    {{ paragraph.content.length }} 글자
                  </div>
                </div>

                <!-- 미리보기 -->
                <div
                  v-if="showPreview"
                  class="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
                >
                  <div class="px-4 py-3 bg-gray-100 border-b border-gray-200">
                    <h3 class="text-sm font-medium text-gray-700">미리보기</h3>
                  </div>
                  <div class="p-6 bg-white">
                    <!-- 본문 이미지가 있으면 제일 위에 표시 -->
                    <div v-if="form.body_image" class="mb-6">
                      <img
                        :src="form.body_image"
                        alt="본문 이미지"
                        class="w-full max-w-2xl mx-auto object-cover rounded-lg shadow-sm"
                      />
                    </div>

                    <!-- Subtitle -->
                    <div v-if="form.subtitle.trim()" class="mb-6">
                      <h3
                        :class="
                          form.subtitle_bold ? 'font-bold' : 'font-normal'
                        "
                        class="newsletter-subtitle"
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
                        class="text-gray-800 leading-relaxed whitespace-pre-wrap"
                      >
                        {{ paragraph.content }}
                      </p>
                      <p v-else class="text-gray-400 italic">
                        문단 {{ index + 1 }} 내용이 비어있습니다.
                      </p>
                    </div>
                  </div>
                </div>

                <!-- 하단 컨트롤 -->
                <div
                  class="flex justify-between items-center pt-4 border-t border-gray-100"
                >
                  <button
                    type="button"
                    @click="showPreview = !showPreview"
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    <svg
                      v-if="!showPreview"
                      class="w-4 h-4 mr-2"
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
                    <svg
                      v-else
                      class="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                    {{ showPreview ? '미리보기 숨기기' : '미리보기 보기' }}
                  </button>

                  <div
                    class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full"
                  >
                    총 {{ getTotalWordCount() }} 글자
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 하단 액션 -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex justify-between items-center">
            <NuxtLink
              :to="
                isEditing
                  ? `/admin/newsletters/${newsletterId}`
                  : '/admin/newsletters'
              "
              class="inline-flex items-center text-gray-500 hover:text-gray-700 transition-colors"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              취소
            </NuxtLink>

            <div class="flex space-x-3">
              <button
                type="submit"
                :disabled="saving"
                class="inline-flex items-center px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <div
                  v-if="saving"
                  class="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400 mr-2"
                ></div>
                {{ saving ? '저장 중...' : '임시저장' }}
              </button>

              <button
                type="button"
                @click="saveAndPublish"
                :disabled="saving || !form.title.trim() || !hasContent()"
                class="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <div
                  v-if="saving"
                  class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
                ></div>
                {{ saving ? '저장 중...' : '저장 및 발행' }}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
// 인증 확인을 위한 미들웨어 적용
definePageMeta({
  middleware: 'auth',
  layout: 'admin',
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

// Sticky 헤더 관련
const isHeaderSticky = ref(false)
const stickyHeader = ref(null)
const contentSection = ref(null)
const originalHeaderTop = ref(0)

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
    nextTick(() => {
      saveOriginalHeaderPosition()
    })
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

  // 1. 본문 이미지가 있으면 제일 위에 추가
  //   if (form.body_image) {
  //     html += `<figure class="newsletter-hero-image"><img src="${form.body_image}" alt="${form.title}" /></figure>`
  //   }

  // 2. 부제목 추가 (Optional)
  //   if (form.subtitle && form.subtitle.trim()) {
  //     const fontWeight = form.subtitle_bold ? 'font-weight: bold;' : ''
  //     html += `<h3 class="newsletter-subtitle" style="${fontWeight}">${form.subtitle}</h3>`
  //   }

  // 3. 문단들 추가
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

// 스크롤 이벤트 처리
const handleScroll = () => {
  if (!stickyHeader.value || originalHeaderTop.value === 0) return

  const currentScrollY = window.scrollY
  const triggerPoint = originalHeaderTop.value

  isHeaderSticky.value = currentScrollY >= triggerPoint
}

// 기존 헤더 위치
const saveOriginalHeaderPosition = () => {
  if (stickyHeader.value && originalHeaderTop.value === 0) {
    const rect = stickyHeader.value.getBoundingClientRect()
    originalHeaderTop.value = rect.top + window.scrollY
  }
}

// 컴포넌트 마운트 시 데이터 로드 및 이벤트 리스너 등록
onMounted(() => {
  fetchNewsletter()

  // 헤더 위치 저장
  nextTick(() => {
    saveOriginalHeaderPosition()
    window.addEventListener('scroll', handleScroll)
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
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

<style lang="scss" scoped>
@use '~/layouts/scss/cnx.scss' as *;
@use '~/layouts/scss/cnx/_variables' as *;
@use '~/layouts/scss/cnx/_mixins' as *;
@use '~/layouts/scss/cnx/_functions' as *;

.newsletter {
  &-subtitle {
    font-weight: $font-weight-bold;
    font-size: rem(16);
    margin-bottom: rem(14);
    @include tablet {
      font-size: rem(34);
      margin-bottom: rem(17);
    }
    @include desktop {
      font-size: rem(24);
      margin-bottom: rem(24);
    }
    color: #003366;
  }
}
</style>
