<template>
  <div>
    <!-- 메인 콘텐츠 -->
    <div class="space-y-6">
      <!-- 상단 액션 버튼 -->
      <div class="flex justify-end mb-6">
        <button
          @click="showCreateModal = true"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
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
          새 관리자 추가
        </button>
      </div>

      <!-- 필터 및 검색 -->
      <div class="bg-card rounded-lg shadow p-4 mb-6">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="이메일로 검색..."
              class="w-full rounded-md border border-input px-3 py-2 text-sm bg-background"
              @input="debouncedSearch"
            />
          </div>
          <div class="flex gap-2">
            <select
              v-model="activeFilter"
              class="rounded-md border border-input px-3 py-2 text-sm bg-background"
              @change="fetchAdmins"
            >
              <option value="">모든 상태</option>
              <option value="true">활성</option>
              <option value="false">비활성</option>
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

      <!-- 관리자 목록 -->
      <div v-else-if="mngr && mngr.length > 0" class="space-y-4">
        <div
          v-for="admin in mngr"
          :key="admin.id"
          class="bg-card rounded-lg shadow p-6"
        >
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-2">
                <h3 class="text-lg font-medium text-foreground">
                  {{ admin.email }}
                </h3>
                <span
                  class="px-2 py-1 text-xs rounded-full"
                  :class="
                    admin.is_active
                      ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-300'
                  "
                >
                  {{ admin.is_active ? '활성' : '비활성' }}
                </span>
                <span
                  v-if="admin.cognito_id"
                  class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-300"
                >
                  Cognito 연결됨
                </span>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                <p class="text-sm text-muted-foreground">
                  <span class="font-medium">부서 ID:</span> {{ admin.dept_id }}
                </p>
                <p class="text-sm text-muted-foreground">
                  <span class="font-medium">역할 ID:</span> {{ admin.role_id }}
                </p>
              </div>

              <div
                class="flex items-center text-xs text-muted-foreground space-x-4"
              >
                <span>생성: {{ formatDate(admin.created_at) }}</span>
                <span v-if="admin.updated_at !== admin.created_at">
                  수정: {{ formatDate(admin.updated_at) }}
                </span>
              </div>
            </div>

            <div class="flex items-center space-x-2 ml-4">
              <button
                @click="toggleAdminStatus(admin)"
                class="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-accent"
                :title="admin.is_active ? '비활성화' : '활성화'"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    v-if="admin.is_active"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"
                  />
                  <path
                    v-else
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
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
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-foreground">관리자 없음</h3>
        <p class="mt-1 text-sm text-muted-foreground">
          첫 번째 관리자를 추가해보세요.
        </p>
        <div class="mt-6">
          <button
            @click="showCreateModal = true"
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
            새 관리자 추가
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
    </div>

    <!-- 관리자 생성 모달 -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-card rounded-lg shadow-lg max-w-md w-full p-6 bg-white">
        <h2 class="text-lg font-semibold mb-4">새 관리자 추가</h2>

        <form @submit.prevent="createAdmin">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1">이메일</label>
              <input
                v-model="newAdmin.email"
                type="email"
                required
                class="w-full rounded-md border border-input px-3 py-2 text-sm bg-background"
                placeholder="admin@company.com"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">부서</label>
              <select
                v-model="newAdmin.dept_id"
                required
                class="w-full rounded-md border border-input px-3 py-2 text-sm bg-background"
              >
                <option value="">부서를 선택하세요</option>
                <option
                  v-for="dept in departments"
                  :key="dept.id"
                  :value="dept.id"
                >
                  {{ dept.name }} ({{ dept.code }})
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">역할</label>
              <select
                v-model="newAdmin.role_id"
                required
                class="w-full rounded-md border border-input px-3 py-2 text-sm bg-background"
              >
                <option value="">역할을 선택하세요</option>
                <option v-for="role in roles" :key="role.id" :value="role.id">
                  {{ role.name }} (레벨 {{ role.level }})
                </option>
              </select>
            </div>

            <!-- Cognito 설정 섹션 -->
            <div class="border-t pt-4">
              <h3 class="text-sm font-medium mb-3">AWS Cognito 설정</h3>

              <div class="space-y-3">
                <!-- Cognito 자동 생성 옵션 -->
                <div class="flex items-center space-x-2">
                  <input
                    v-model="newAdmin.create_cognito_user"
                    type="checkbox"
                    id="create_cognito_user"
                    class="rounded border-input"
                  />
                  <label for="create_cognito_user" class="text-sm">
                    Cognito 사용자 자동 생성
                  </label>
                </div>

                <!-- 수동 Cognito ID 입력 (자동 생성이 비활성화된 경우) -->
                <div v-if="!newAdmin.create_cognito_user">
                  <label class="block text-sm font-medium mb-1">
                    Cognito ID (선택)
                  </label>
                  <input
                    v-model="newAdmin.cognito_id"
                    type="text"
                    class="w-full rounded-md border border-input px-3 py-2 text-sm bg-background"
                    placeholder="AWS Cognito User ID"
                  />
                  <p class="text-xs text-muted-foreground mt-1">
                    기존 Cognito 사용자 ID를 입력하세요
                  </p>
                </div>

                <!-- 웰컴 이메일 발송 옵션 (자동 생성이 활성화된 경우) -->
                <div v-if="newAdmin.create_cognito_user" class="space-y-2">
                  <div class="flex items-center space-x-2">
                    <input
                      v-model="newAdmin.send_welcome_email"
                      type="checkbox"
                      id="send_welcome_email"
                      class="rounded border-input"
                    />
                    <label for="send_welcome_email" class="text-sm">
                      웰컴 이메일 발송
                    </label>
                  </div>
                  <p class="text-xs text-muted-foreground">
                    체크하면 사용자에게 로그인 정보가 이메일로 발송됩니다.
                    체크하지 않으면 임시 비밀번호를 직접 전달해야 합니다.
                  </p>
                </div>
              </div>
            </div>

            <div class="flex items-center">
              <input
                v-model="newAdmin.is_active"
                type="checkbox"
                id="is_active"
                class="rounded border-input"
              />
              <label for="is_active" class="ml-2 text-sm">활성 상태</label>
            </div>
          </div>

          <div class="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              @click="cancelCreate"
              class="px-4 py-2 text-sm border border-input rounded-md hover:bg-accent"
            >
              취소
            </button>
            <button
              type="submit"
              :disabled="createLoading"
              class="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
            >
              {{ createLoading ? '생성 중...' : '생성' }}
            </button>
          </div>
        </form>
      </div>
    </div>
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
const mngr = ref([])
const departments = ref([])
const roles = ref([])
const loading = ref(true)
const createLoading = ref(false)
const searchQuery = ref('')
const activeFilter = ref('')
const showCreateModal = ref(false)

// 페이지네이션
const pagination = ref({
  page: 1,
  limit: 10,
  total: 0,
  pages: 0,
})

// 새 관리자 폼 데이터
const newAdmin = ref({
  email: '',
  dept_id: '',
  role_id: '',
  cognito_id: '',
  is_active: true,
  create_cognito_user: false, // Cognito 자동 생성 옵션
  send_welcome_email: false, // 웰컴 이메일 발송 옵션
})

// 관리자 목록 조회
const fetchAdmins = async () => {
  try {
    loading.value = true

    const query = {
      page: pagination.value.page,
      limit: pagination.value.limit,
    }

    if (activeFilter.value) {
      query.is_active = activeFilter.value
    }

    if (searchQuery.value) {
      query.search = searchQuery.value
    }

    const response = await $fetch('/api/admin/mngr', {
      query,
    })

    mngr.value = response.data
    pagination.value = response.pagination
  } catch (error) {
    console.error('관리자 목록 조회 실패:', error)
    alert('관리자 목록을 불러오는데 실패했습니다.')
  } finally {
    loading.value = false
  }
}

// 부서 및 역할 목록 조회 (하드코딩된 기본 옵션)
const fetchDepartmentsAndRoles = async () => {
  // 실제 테이블이 없으므로 하드코딩된 기본값 사용
  departments.value = [
    { id: '1', name: '관리팀', code: 'ADMIN' },
    { id: '2', name: 'IT팀', code: 'IT' },
    { id: '3', name: '마케팅팀', code: 'MARKETING' },
    { id: '4', name: '영업팀', code: 'SALES' },
    { id: '5', name: '운영팀', code: 'OPS' },
  ]

  roles.value = [
    { id: '1', name: '관리자', level: 10 },
    { id: '2', name: '매니저', level: 5 },
    { id: '3', name: '사용자', level: 1 },
  ]
}

// 검색 디바운스
let searchTimeout
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    pagination.value.page = 1
    fetchAdmins()
  }, 500)
}

// 필터 초기화
const resetFilters = () => {
  searchQuery.value = ''
  activeFilter.value = ''
  pagination.value.page = 1
  fetchAdmins()
}

// 페이지 이동
const goToPage = page => {
  pagination.value.page = page
  fetchAdmins()
}

// 날짜 포맷
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

// 관리자 상태 토글 (임시로 비활성화)
const toggleAdminStatus = async admin => {
  alert('관리자 상태 변경 기능은 추후 구현 예정입니다.')
}

// 새 관리자 생성
const createAdmin = async () => {
  try {
    createLoading.value = true

    const response = await $fetch('/api/admin/mngr', {
      method: 'POST',
      body: newAdmin.value,
    })

    // 성공시 모달 닫기 및 목록 새로고침
    showCreateModal.value = false
    resetNewAdminForm()
    await fetchAdmins()

    // 임시 비밀번호가 있는 경우 사용자에게 알림
    if (response.data?.temporaryPassword) {
      alert(
        `새 관리자가 성공적으로 생성되었습니다.\n\n임시 비밀번호: ${response.data.temporaryPassword}\n\n이 비밀번호를 안전하게 사용자에게 전달해주세요.`
      )
    } else {
      alert(response.message || '새 관리자가 성공적으로 생성되었습니다.')
    }
  } catch (error) {
    console.error('관리자 생성 실패:', error)
    alert(error.data?.message || '관리자 생성에 실패했습니다.')
  } finally {
    createLoading.value = false
  }
}

// 생성 취소
const cancelCreate = () => {
  showCreateModal.value = false
  resetNewAdminForm()
}

// 새 관리자 폼 초기화
const resetNewAdminForm = () => {
  newAdmin.value = {
    email: '',
    dept_id: '',
    role_id: '',
    cognito_id: '',
    is_active: true,
    create_cognito_user: false,
    send_welcome_email: false,
  }
}

// 컴포넌트 마운트 시 데이터 로드
onMounted(() => {
  fetchAdmins()
  fetchDepartmentsAndRoles()
})

// 메타 태그
useHead({
  title: '관리자 관리 - 관리자 대시보드',
  meta: [{ name: 'description', content: '시스템 관리자 관리' }],
})

const pageTitle = '관리자 관리'
const breadcrumbs = [
  { label: '대시보드', to: '/dashboard' },
  { label: '관리자 관리', to: '/admin/mngr' },
]

provide('pageTitle', pageTitle)
provide('breadcrumbs', breadcrumbs)
</script>
