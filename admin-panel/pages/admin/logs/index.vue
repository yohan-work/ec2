<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 헤더 -->
    <div class="bg-white shadow">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">활동 로그</h1>
            <p class="mt-2 text-sm text-gray-700">
              시스템 활동 기록을 조회할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 메인 컨텐츠 -->
    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <!-- 필터 영역 -->
      <div class="bg-white shadow rounded-lg mb-6">
        <div class="px-6 py-4">
          <h3 class="text-lg font-medium text-gray-900 mb-4">필터</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- 엔티티 필터 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                엔티티
              </label>
              <select
                v-model="entityFilter"
                @change="resetAndFetch"
                class="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 bg-white focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">전체</option>
                <option value="newsletters">뉴스레터</option>
                <option value="recruits">채용공고</option>
              </select>
            </div>

            <!-- 액션 필터 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                액션
              </label>
              <select
                v-model="actionFilter"
                @change="resetAndFetch"
                class="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 bg-white focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">전체</option>
                <option value="create">생성</option>
                <option value="update">수정</option>
                <option value="delete">삭제</option>
                <option value="publish">발행</option>
                <option value="close">마감</option>
              </select>
            </div>

            <!-- 시작 날짜 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                시작 날짜
              </label>
              <input
                type="date"
                v-model="startDate"
                @change="resetAndFetch"
                class="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <!-- 종료 날짜 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                종료 날짜
              </label>
              <input
                type="date"
                v-model="endDate"
                @change="resetAndFetch"
                class="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <!-- 필터 초기화 버튼 -->
          <div class="mt-4">
            <button
              @click="clearFilters"
              class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                class="mr-1.5 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              필터 초기화
            </button>
          </div>
        </div>
      </div>

      <!-- 로그 테이블 -->
      <div class="bg-white shadow rounded-lg overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">
            활동 로그 목록
            <span v-if="!loading" class="text-sm text-gray-500 font-normal">
              (총 {{ pagination.total }}개)
            </span>
          </h3>
        </div>

        <!-- 로딩 상태 -->
        <div v-if="loading" class="px-6 py-12 text-center">
          <div
            class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"
          ></div>
          <p class="mt-2 text-sm text-gray-500">로그를 불러오는 중...</p>
        </div>

        <!-- 에러 상태 -->
        <div v-else-if="error" class="px-6 py-12 text-center">
          <div
            class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100"
          >
            <svg
              class="h-6 w-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 class="mt-2 text-sm font-medium text-gray-900">
            오류가 발생했습니다
          </h3>
          <p class="mt-1 text-sm text-gray-500">{{ error }}</p>
        </div>

        <!-- 로그 목록 -->
        <div v-else-if="logs.length > 0" class="overflow-x-auto">
          <table class="min-w-full w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  일시
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  사용자
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  액션
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  대상
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  변경사항
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  작업
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="log in logs" :key="log.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatDate(log.created_at) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ log.admin_users?.email || '알 수 없음' }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ log.admin_users?.departments?.name || '부서 미상' }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="getActionBadgeClass(log.action)"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  >
                    {{ getActionText(log.action) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ getEntityText(log.entity) }}
                  </div>
                  <div class="text-sm text-gray-500">
                    ID: {{ log.entity_id }}
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-500">
                  <div class="max-w-xs truncate">
                    {{ formatChanges(log.changes) }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    @click="showLogDetail(log)"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    상세보기
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 빈 상태 -->
        <div v-else class="px-6 py-12 text-center">
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
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">
            로그가 없습니다
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            조건에 맞는 활동 로그가 없습니다.
          </p>
        </div>

        <!-- 페이지네이션 -->
        <div
          v-if="pagination.pages > 1"
          class="px-6 py-4 border-t border-gray-200"
        >
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-700">
              총 {{ pagination.total }}개 중
              {{ (pagination.page - 1) * pagination.limit + 1 }}~{{
                Math.min(pagination.page * pagination.limit, pagination.total)
              }}개 표시
            </div>
            <div class="flex items-center space-x-2">
              <button
                @click="goToPage(pagination.page - 1)"
                :disabled="pagination.page <= 1"
                class="px-3 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-50"
              >
                이전
              </button>

              <span class="px-3 py-2 text-sm">
                {{ pagination.page }} / {{ pagination.pages }}
              </span>

              <button
                @click="goToPage(pagination.page + 1)"
                :disabled="pagination.page >= pagination.pages"
                class="px-3 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-50"
              >
                다음
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 로그 상세보기 모달 -->
    <Transition name="modal" appear>
      <div
        v-if="selectedLog"
        class="fixed inset-0 bg-black bg-opacity-60 overflow-y-auto h-full w-full z-[9999] flex items-center justify-center p-4"
        @click="closeModal"
        style="backdrop-filter: blur(2px)"
      >
        <div
          class="relative bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden transform transition-all duration-300"
          @click.stop
        >
          <!-- 모달 헤더 -->
          <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-semibold text-gray-900">
                로그 상세 정보
              </h3>
              <button
                @click="closeModal"
                class="text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full p-2 transition-colors duration-200"
              >
                <svg
                  class="h-5 w-5"
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
          </div>

          <!-- 모달 내용 (스크롤 가능) -->
          <div class="px-6 py-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <div class="space-y-6">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700"
                    >일시</label
                  >
                  <p class="mt-1 text-sm text-gray-900">
                    {{ formatDate(selectedLog.created_at) }}
                  </p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700"
                    >사용자</label
                  >
                  <p class="mt-1 text-sm text-gray-900">
                    {{ selectedLog.admin_users?.email || '알 수 없음' }}
                    <span class="text-gray-500"
                      >({{
                        selectedLog.admin_users?.departments?.name ||
                        '부서 미상'
                      }})</span
                    >
                  </p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700"
                    >액션</label
                  >
                  <p class="mt-1">
                    <span
                      :class="getActionBadgeClass(selectedLog.action)"
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    >
                      {{ getActionText(selectedLog.action) }}
                    </span>
                  </p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700"
                    >대상</label
                  >
                  <p class="mt-1 text-sm text-gray-900">
                    {{ getEntityText(selectedLog.entity) }} (ID:
                    {{ selectedLog.entity_id }})
                  </p>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >변경사항</label
                >
                <div
                  class="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto border"
                >
                  <pre class="text-sm text-gray-900 whitespace-pre-wrap">{{
                    formatChangesDetailed(selectedLog.changes)
                  }}</pre>
                </div>
              </div>
            </div>
          </div>

          <!-- 모달 푸터 -->
          <div
            class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3"
          >
            <button
              @click="closeModal"
              class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-200"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
// 인증 확인을 위한 미들웨어 적용
definePageMeta({
  middleware: 'auth',
})

// 상태 관리
const logs = ref([])
const loading = ref(true)
const error = ref(null)
const selectedLog = ref(null)

// 필터 상태
const entityFilter = ref('')
const actionFilter = ref('')
const startDate = ref('')
const endDate = ref('')

// 페이지네이션
const pagination = ref({
  page: 1,
  limit: 20,
  total: 0,
  pages: 0,
})

// 로그 목록 조회
const fetchLogs = async () => {
  try {
    loading.value = true
    error.value = null

    const query = {
      page: pagination.value.page,
      limit: pagination.value.limit,
    }

    if (entityFilter.value) {
      query.entity = entityFilter.value
    }

    if (actionFilter.value) {
      query.action = actionFilter.value
    }

    if (startDate.value) {
      query.start_date = startDate.value
    }

    if (endDate.value) {
      query.end_date = endDate.value
    }

    const response = await $fetch('/api/admin/logs', { query })

    logs.value = response.data
    pagination.value = response.pagination
  } catch (err) {
    console.error('로그 목록 조회 실패:', err)
    error.value = '로그 목록을 불러올 수 없습니다.'
  } finally {
    loading.value = false
  }
}

// 필터 변경 시 첫 페이지로 이동 후 조회
const resetAndFetch = () => {
  pagination.value.page = 1
  fetchLogs()
}

// 필터 초기화
const clearFilters = () => {
  entityFilter.value = ''
  actionFilter.value = ''
  startDate.value = ''
  endDate.value = ''
  pagination.value.page = 1
  fetchLogs()
}

// 페이지 이동
const goToPage = page => {
  if (page >= 1 && page <= pagination.value.pages) {
    pagination.value.page = page
    fetchLogs()
  }
}

// 날짜 포맷
const formatDate = dateString => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Seoul',
  })
}

// 액션 텍스트
const getActionText = action => {
  const actions = {
    create: '생성',
    update: '수정',
    delete: '삭제',
    publish: '발행',
    close: '마감',
  }
  return actions[action] || action
}

// 액션 뱃지 클래스
const getActionBadgeClass = action => {
  const classes = {
    create: 'bg-green-100 text-green-800',
    update: 'bg-yellow-100 text-yellow-800',
    delete: 'bg-red-100 text-red-800',
    publish: 'bg-blue-100 text-blue-800',
    close: 'bg-gray-100 text-gray-800',
  }
  return classes[action] || 'bg-gray-100 text-gray-800'
}

// 엔티티 텍스트
const getEntityText = entity => {
  const entities = {
    newsletters: '뉴스레터',
    recruits: '채용공고',
  }
  return entities[entity] || entity
}

// 변경사항 포맷 (간단)
const formatChanges = changes => {
  if (!changes) return '없음'

  try {
    const parsed = typeof changes === 'string' ? JSON.parse(changes) : changes
    const keys = Object.keys(parsed)
    if (keys.length === 0) return '없음'

    return keys.slice(0, 3).join(', ') + (keys.length > 3 ? '...' : '')
  } catch (e) {
    return '파싱 오류'
  }
}

// 변경사항 포맷 (상세)
const formatChangesDetailed = changes => {
  if (!changes) return '변경사항이 없습니다.'

  try {
    const parsed = typeof changes === 'string' ? JSON.parse(changes) : changes
    return JSON.stringify(parsed, null, 2)
  } catch (e) {
    return '변경사항을 파싱할 수 없습니다.'
  }
}

// 로그 상세보기
const showLogDetail = log => {
  selectedLog.value = log
}

// 모달 닫기
const closeModal = () => {
  selectedLog.value = null
}

// ESC 키로 모달 닫기
const handleKeydown = event => {
  if (event.key === 'Escape' && selectedLog.value) {
    closeModal()
  }
}

// 컴포넌트 마운트 시 데이터 로드 및 키보드 이벤트 등록
onMounted(() => {
  fetchLogs()
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

// 메타 태그
useHead({
  title: '활동 로그 - 관리자',
})
</script>

<style scoped>
/* 모달 애니메이션 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
}

/* 모달 내부 애니메이션 */
.modal-enter-active .relative {
  transition: all 0.3s ease;
  transform: scale(0.9) translateY(-50px);
}

.modal-enter-to .relative {
  transform: scale(1) translateY(0);
}

.modal-leave-active .relative {
  transition: all 0.2s ease;
  transform: scale(0.95) translateY(-20px);
}
</style>
