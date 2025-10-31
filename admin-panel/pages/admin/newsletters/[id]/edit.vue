<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 페이지 헤더 -->
    <div class="bg-white border-b border-gray-200 sticky top-0 z-50">
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
              @click="togglePreview"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <svg
                class="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  v-if="!showPreview"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  v-if="!showPreview"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
                <path
                  v-else
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                />
              </svg>
              {{ showPreview ? '편집 모드' : '미리보기' }}
            </button>

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
    <div class="mx-auto py-6 px-6">
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
      <form v-else @submit.prevent="saveDraft" class="space-y-6">
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

        <!-- 블록 에디터 영역 -->
        <div class="grid grid-cols-3 gap-6">
          <!-- 좌측 패널: 블록 추가 폼 -->
          <div class="col-span-1">
            <div
              class="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-24"
            >
              <div class="px-6 py-4 border-b border-gray-100">
                <h2 class="text-lg font-semibold text-gray-900">블록 추가</h2>
              </div>
              <div class="p-6 space-y-4">
                <!-- 블록 타입 선택 -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    블록 타입
                  </label>
                  <select
                    v-model="newBlock.type"
                    class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="subtitle">부제목</option>
                    <option value="paragraph">문단</option>
                    <option value="heading2">대제목 (H2)</option>
                    <option value="heading3">중제목 (H3)</option>
                    <option value="image">이미지</option>
                    <option value="quote">인용구</option>
                    <option value="list">리스트</option>
                    <option value="divider">구분선</option>
                  </select>
                </div>

                <!-- 부제목 입력 -->
                <div v-if="newBlock.type === 'subtitle'" class="space-y-3">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      내용
                    </label>
                    <input
                      v-model="newBlock.content"
                      type="text"
                      class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="부제목을 입력하세요"
                    />
                  </div>
                  <div class="flex items-center">
                    <input
                      v-model="newBlock.options.bold"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label class="ml-2 text-sm text-gray-700">굵게</label>
                  </div>
                </div>

                <!-- 문단 입력 -->
                <div v-if="newBlock.type === 'paragraph'">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    내용
                  </label>
                  <textarea
                    v-model="newBlock.content"
                    rows="4"
                    class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="문단 내용을 입력하세요"
                  ></textarea>
                </div>

                <!-- 제목 입력 -->
                <div
                  v-if="
                    newBlock.type === 'heading2' || newBlock.type === 'heading3'
                  "
                >
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    내용
                  </label>
                  <input
                    v-model="newBlock.content"
                    type="text"
                    class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :placeholder="
                      newBlock.type === 'heading2'
                        ? '대제목을 입력하세요'
                        : '중제목을 입력하세요'
                    "
                  />
                </div>

                <!-- 이미지 입력 -->
                <div v-if="newBlock.type === 'image'" class="space-y-3">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      이미지 URL
                    </label>
                    <input
                      v-model="newBlock.content"
                      type="text"
                      class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="이미지 URL을 입력하세요"
                    />
                  </div>
                  <button
                    type="button"
                    @click="uploadBlockImage"
                    class="w-full inline-flex justify-center items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
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
                  <div v-if="newBlock.content" class="mt-2">
                    <img
                      :src="newBlock.content"
                      alt="미리보기"
                      class="w-full rounded-lg border border-gray-200"
                    />
                  </div>
                </div>

                <!-- 인용구 입력 -->
                <div v-if="newBlock.type === 'quote'">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    내용
                  </label>
                  <textarea
                    v-model="newBlock.content"
                    rows="3"
                    class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="인용구를 입력하세요"
                  ></textarea>
                </div>

                <!-- 리스트 입력 -->
                <div v-if="newBlock.type === 'list'" class="space-y-3">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      리스트 타입
                    </label>
                    <select
                      v-model="newBlock.options.listType"
                      class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="ul">순서 없음 (•)</option>
                      <option value="ol">순서 있음 (1, 2, 3...)</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      항목 (줄바꿈으로 구분)
                    </label>
                    <textarea
                      v-model="newBlock.content"
                      rows="4"
                      class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder="항목 1&#10;항목 2&#10;항목 3"
                    ></textarea>
                  </div>
                </div>

                <!-- 구분선은 내용 입력 불필요 -->
                <div v-if="newBlock.type === 'divider'">
                  <p class="text-sm text-gray-500">
                    구분선을 추가합니다. 내용 입력이 필요하지 않습니다.
                  </p>
                </div>

                <!-- 블록 추가 버튼 -->
                <button
                  type="button"
                  @click="addBlock"
                  :disabled="!canAddBlock"
                  class="w-full inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                  블록 추가
                </button>
              </div>
            </div>
          </div>

          <!-- 우측 패널: 블록 리스트 -->
          <div class="col-span-2">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200">
              <div class="px-6 py-4 border-b border-gray-100">
                <h2 class="text-lg font-semibold text-gray-900">내용</h2>
              </div>
              <div class="p-6">
                <!-- 미리보기 모드 -->
                <div v-if="showPreview" class="preview-content">
                  <div
                    v-for="block in form.blocks"
                    :key="block.id"
                    class="mb-4 last:mb-0"
                  >
                    <!-- 부제목 -->
                    <h3
                      v-if="block.type === 'subtitle'"
                      :class="block.options?.bold ? 'font-bold' : 'font-normal'"
                      class="newsletter-subtitle"
                    >
                      {{ block.content }}
                    </h3>

                    <!-- 문단 -->
                    <p
                      v-if="block.type === 'paragraph'"
                      class="text-gray-800 leading-relaxed whitespace-pre-wrap"
                    >
                      {{ block.content }}
                    </p>

                    <!-- 대제목 -->
                    <h2
                      v-if="block.type === 'heading2'"
                      class="text-2xl font-bold text-gray-900 mb-3"
                    >
                      {{ block.content }}
                    </h2>

                    <!-- 중제목 -->
                    <h3
                      v-if="block.type === 'heading3'"
                      class="text-xl font-bold text-gray-900 mb-2"
                    >
                      {{ block.content }}
                    </h3>

                    <!-- 이미지 -->
                    <img
                      v-if="block.type === 'image'"
                      :src="block.content"
                      alt="Content Image"
                      class="w-full rounded-lg shadow-sm"
                    />

                    <!-- 인용구 -->
                    <blockquote
                      v-if="block.type === 'quote'"
                      class="border-l-4 border-blue-500 pl-4 italic text-gray-700"
                    >
                      {{ block.content }}
                    </blockquote>

                    <!-- 리스트 -->
                    <ul
                      v-if="
                        block.type === 'list' &&
                        block.options?.listType === 'ul'
                      "
                      class="list-disc list-inside text-gray-800"
                    >
                      <li
                        v-for="(item, index) in block.content
                          .split('\n')
                          .filter(i => i.trim())"
                        :key="index"
                      >
                        {{ item }}
                      </li>
                    </ul>
                    <ol
                      v-if="
                        block.type === 'list' &&
                        block.options?.listType === 'ol'
                      "
                      class="list-decimal list-inside text-gray-800"
                    >
                      <li
                        v-for="(item, index) in block.content
                          .split('\n')
                          .filter(i => i.trim())"
                        :key="index"
                      >
                        {{ item }}
                      </li>
                    </ol>

                    <!-- 구분선 -->
                    <hr
                      v-if="block.type === 'divider'"
                      class="border-t border-gray-300"
                    />
                  </div>

                  <div
                    v-if="form.blocks.length === 0"
                    class="text-center py-12"
                  >
                    <p class="text-gray-400">좌측에서 블록을 추가해주세요.</p>
                  </div>
                </div>

                <!-- 편집 모드: 드래그 가능한 블록 리스트 -->
                <draggable
                  v-else
                  v-model="form.blocks"
                  item-key="id"
                  class="space-y-3"
                  handle=".drag-handle"
                  :animation="200"
                >
                  <template #item="{ element: block, index }">
                    <div
                      class="block-item bg-gray-50 rounded-lg border border-gray-200 p-4 hover:border-blue-300 transition-colors"
                    >
                      <div class="flex items-start space-x-3">
                        <!-- 드래그 핸들 -->
                        <button
                          type="button"
                          class="drag-handle flex-shrink-0 mt-1 cursor-move text-gray-400 hover:text-gray-600"
                        >
                          <svg
                            class="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M4 8h16M4 16h16"
                            />
                          </svg>
                        </button>

                        <!-- 블록 아이콘 및 타입 -->
                        <div class="flex-shrink-0 mt-1">
                          <span
                            class="inline-flex items-center px-2 py-1 text-xs font-medium rounded"
                            :class="getBlockTypeClass(block.type)"
                          >
                            {{ getBlockTypeName(block.type) }}
                          </span>
                        </div>

                        <!-- 블록 내용 -->
                        <div class="flex-1 min-w-0">
                          <div v-if="block.type === 'subtitle'">
                            <input
                              v-model="block.content"
                              type="text"
                              class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="부제목을 입력하세요"
                            />
                            <div class="flex items-center mt-2">
                              <input
                                v-model="block.options.bold"
                                type="checkbox"
                                class="w-4 h-4 text-blue-600 rounded"
                              />
                              <label class="ml-2 text-sm text-gray-700"
                                >굵게</label
                              >
                            </div>
                          </div>

                          <div v-else-if="block.type === 'paragraph'">
                            <textarea
                              v-model="block.content"
                              rows="3"
                              class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                              placeholder="문단 내용을 입력하세요"
                            ></textarea>
                          </div>

                          <div
                            v-else-if="
                              block.type === 'heading2' ||
                              block.type === 'heading3'
                            "
                          >
                            <input
                              v-model="block.content"
                              type="text"
                              class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              :placeholder="
                                block.type === 'heading2'
                                  ? '대제목을 입력하세요'
                                  : '중제목을 입력하세요'
                              "
                            />
                          </div>

                          <div v-else-if="block.type === 'image'">
                            <input
                              v-model="block.content"
                              type="text"
                              class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="이미지 URL"
                            />
                            <img
                              v-if="block.content"
                              :src="block.content"
                              alt="Preview"
                              class="mt-2 w-full rounded-lg border border-gray-200"
                            />
                          </div>

                          <div v-else-if="block.type === 'quote'">
                            <textarea
                              v-model="block.content"
                              rows="3"
                              class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                              placeholder="인용구를 입력하세요"
                            ></textarea>
                          </div>

                          <div v-else-if="block.type === 'list'">
                            <select
                              v-model="block.options.listType"
                              class="w-full px-3 py-2 mb-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="ul">순서 없음</option>
                              <option value="ol">순서 있음</option>
                            </select>
                            <textarea
                              v-model="block.content"
                              rows="4"
                              class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                              placeholder="항목 1&#10;항목 2&#10;항목 3"
                            ></textarea>
                          </div>

                          <div v-else-if="block.type === 'divider'">
                            <hr class="border-t-2 border-gray-300" />
                          </div>
                        </div>

                        <!-- 삭제 버튼 -->
                        <button
                          type="button"
                          @click="removeBlock(index)"
                          class="flex-shrink-0 mt-1 text-red-500 hover:text-red-700"
                        >
                          <svg
                            class="w-5 h-5"
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
                    </div>
                  </template>
                </draggable>

                <!-- 빈 상태 (편집 모드) -->
                <div
                  v-if="!showPreview && form.blocks.length === 0"
                  class="text-center py-12"
                >
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
                    블록이 없습니다
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">
                    좌측 패널에서 블록을 추가해보세요.
                  </p>
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
import draggable from 'vuedraggable'

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

// 폼 데이터
const form = reactive({
  title: '',
  thumbnail_image: '',
  status: 'draft',
  blocks: [],
})

// 새 블록 입력 폼
const newBlock = reactive({
  type: 'paragraph',
  content: '',
  options: {
    bold: false,
    listType: 'ul',
  },
})

// 블록 타입 정의
const blockTypes = {
  subtitle: { name: '부제목', class: 'bg-purple-100 text-purple-700' },
  paragraph: { name: '문단', class: 'bg-blue-100 text-blue-700' },
  heading2: { name: '대제목', class: 'bg-indigo-100 text-indigo-700' },
  heading3: { name: '중제목', class: 'bg-indigo-100 text-indigo-700' },
  image: { name: '이미지', class: 'bg-green-100 text-green-700' },
  quote: { name: '인용구', class: 'bg-yellow-100 text-yellow-700' },
  list: { name: '리스트', class: 'bg-orange-100 text-orange-700' },
  divider: { name: '구분선', class: 'bg-gray-100 text-gray-700' },
}

// 블록 타입 이름 가져오기
const getBlockTypeName = type => blockTypes[type]?.name || type

// 블록 타입 클래스 가져오기
const getBlockTypeClass = type =>
  blockTypes[type]?.class || 'bg-gray-100 text-gray-700'

// 블록 추가 가능 여부
const canAddBlock = computed(() => {
  if (newBlock.type === 'divider') return true
  return newBlock.content.trim().length > 0
})

// 블록 추가
const addBlock = () => {
  if (!canAddBlock.value) return

  const block = {
    id: Date.now(),
    type: newBlock.type,
    content: newBlock.content,
    options: { ...newBlock.options },
  }

  form.blocks.push(block)

  // 폼 초기화
  newBlock.content = ''
  newBlock.options = {
    bold: false,
    listType: 'ul',
  }
}

// 블록 제거
const removeBlock = index => {
  form.blocks.splice(index, 1)
}

// 미리보기 토글
const togglePreview = () => {
  showPreview.value = !showPreview.value
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

    if (file.size > 15 * 1024 * 1024) {
      alert('파일 크기가 너무 큽니다. (최대 15MB)')
      return
    }

    try {
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

// 블록 이미지 업로드
const uploadBlockImage = async () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.multiple = false

  input.addEventListener('change', async event => {
    const file = event.target.files[0]
    if (!file) return

    if (file.size > 15 * 1024 * 1024) {
      alert('파일 크기가 너무 큽니다. (최대 15MB)')
      return
    }

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await $fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      })

      if (response.success) {
        newBlock.content = response.data.url
      }
    } catch (error) {
      console.error('이미지 업로드 실패:', error)
      alert('이미지 업로드에 실패했습니다.')
    }
  })

  input.click()
}

// 내용이 있는지 확인
const hasContent = () => {
  return form.blocks.length > 0
}

// 블록들을 HTML로 변환
const convertBlocksToHtml = () => {
  let html = ''

  for (const block of form.blocks) {
    switch (block.type) {
      case 'subtitle':
        const fontWeight = block.options?.bold ? 'font-weight: bold;' : ''
        html += `<h3 class="newsletter-subtitle" style="${fontWeight}">${block.content}</h3>`
        break

      case 'paragraph':
        html += `<p>${block.content.replace(/\n/g, '<br>')}</p><br>`
        break

      case 'heading2':
        html += `<h2>${block.content}</h2>`
        break

      case 'heading3':
        html += `<h3>${block.content}</h3>`
        break

      case 'image':
        html += `<figure class="newsletter-image"><img src="${block.content}" alt="Newsletter Image" /></figure>`
        break

      case 'quote':
        html += `<blockquote>${block.content}</blockquote>`
        break

      case 'list':
        const listType = block.options?.listType || 'ul'
        const items = block.content
          .split('\n')
          .filter(i => i.trim())
          .map(item => `<li>${item}</li>`)
          .join('')
        html += `<${listType}>${items}</${listType}>`
        break

      case 'divider':
        html += `<hr />`
        break
    }
  }

  return html
}

// HTML을 블록 배열로 파싱
const parseHtmlToBlocks = htmlString => {
  const blocks = []
  let idCounter = 1

  // HTML 파싱을 위한 임시 div
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = htmlString

  const children = Array.from(tempDiv.children)

  for (const element of children) {
    const tagName = element.tagName.toLowerCase()

    if (tagName === 'h3' && element.classList.contains('newsletter-subtitle')) {
      blocks.push({
        id: idCounter++,
        type: 'subtitle',
        content: element.textContent.trim(),
        options: {
          bold:
            element.style.fontWeight === 'bold' ||
            element.classList.contains('font-bold'),
        },
      })
    } else if (tagName === 'p') {
      const content = element.innerHTML.replace(/<br\s*\/?>/gi, '\n')
      if (content.trim()) {
        blocks.push({
          id: idCounter++,
          type: 'paragraph',
          content: content.replace(/<[^>]*>/g, '').trim(),
          options: {},
        })
      }
    } else if (tagName === 'h2') {
      blocks.push({
        id: idCounter++,
        type: 'heading2',
        content: element.textContent.trim(),
        options: {},
      })
    } else if (
      tagName === 'h3' &&
      !element.classList.contains('newsletter-subtitle')
    ) {
      blocks.push({
        id: idCounter++,
        type: 'heading3',
        content: element.textContent.trim(),
        options: {},
      })
    } else if (
      tagName === 'figure' &&
      element.classList.contains('newsletter-image')
    ) {
      const img = element.querySelector('img')
      if (img) {
        blocks.push({
          id: idCounter++,
          type: 'image',
          content: img.src,
          options: {},
        })
      }
    } else if (tagName === 'blockquote') {
      blocks.push({
        id: idCounter++,
        type: 'quote',
        content: element.textContent.trim(),
        options: {},
      })
    } else if (tagName === 'ul' || tagName === 'ol') {
      const items = Array.from(element.querySelectorAll('li'))
        .map(li => li.textContent.trim())
        .join('\n')
      blocks.push({
        id: idCounter++,
        type: 'list',
        content: items,
        options: {
          listType: tagName,
        },
      })
    } else if (tagName === 'hr') {
      blocks.push({
        id: idCounter++,
        type: 'divider',
        content: '',
        options: {},
      })
    }
  }

  return blocks.length > 0
    ? blocks
    : [{ id: 1, type: 'paragraph', content: '', options: {} }]
}

// 뉴스레터 조회
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
    form.thumbnail_image = originalNewsletter.value.thumbnail_image || ''
    form.status = originalNewsletter.value.status

    // body_html을 blocks로 변환
    if (originalNewsletter.value.body_html) {
      form.blocks = parseHtmlToBlocks(originalNewsletter.value.body_html)
    }
  } catch (err) {
    console.error('뉴스레터 조회 실패:', err)
    error.value = err.data?.message || '뉴스레터를 불러올 수 없습니다.'
  } finally {
    loading.value = false
  }
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

// 뉴스레터 저장
const saveNewsletter = async status => {
  try {
    saving.value = true

    const userInfo = getUserInfo()
    const payload = {
      title: form.title,
      body_html: convertBlocksToHtml(),
      thumbnail_image: form.thumbnail_image || null,
      body_image: null, // 블록 에디터에서는 body_image를 별도로 관리하지 않음
      subtitle: null, // 블록 에디터에서는 subtitle을 블록으로 관리
      subtitle_bold: false,
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

.block-item {
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}

.drag-handle {
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
}

.preview-content {
  h2 {
    @apply text-2xl font-bold text-gray-900 mb-4;
  }

  h3 {
    @apply text-xl font-bold text-gray-900 mb-3;
  }

  p {
    @apply text-gray-800 leading-relaxed mb-4;
  }

  img {
    @apply rounded-lg shadow-sm mb-4;
  }

  blockquote {
    @apply border-l-4 border-blue-500 pl-4 italic text-gray-700 mb-4;
  }

  ul,
  ol {
    @apply text-gray-800 mb-4;
  }

  li {
    @apply mb-1;
  }

  hr {
    @apply border-t border-gray-300 my-6;
  }
}
</style>
