<template>
  <TitleArea title="사용자 관리">
    <template #right>
      <div class="right-content">
        <Button variant="blue" :size="38" @click="openAddModal">
          <div v-html="addSvg"></div>
          신규 사용자 추가
        </Button>
      </div>
    </template>
  </TitleArea>
  <ContentsArea>
    <div v-if="isLoading" class="loading-container">
      <Loading />
    </div>

    <EmptyContainer
      v-else-if="users.length === 0"
      message="등록된 사용자가 없습니다."
    />

    <div v-else class="management-card-container">
      <ManagementCard
        v-for="user in users"
        :key="user.id"
        :item-name="user.name"
        :item-info="user.role"
        :item-id="user.id"
        @edit="editUser"
        @delete="deleteUser"
      >
        <template #info-items>
          <div class="status-container">
            <Button
              :variant="user.is_active ? 'primary' : 'outline'"
              :size="24"
              @click="toggleUserStatus(user)"
              :disabled="loading"
            >
              {{ user.is_active ? '활성' : '비활성' }}
            </Button>
          </div>
          <div class="info-item">
            <span class="info-value">
              <span>{{ user.email }}</span>
            </span>
          </div>
          <div class="info-item">
            <span class="info-label">매니저 연결:</span>
            <span class="info-value">{{
              user.employee_id ? '연결됨' : '미연결'
            }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">상태:</span>
          </div>
          <div v-if="user.last_login_at" class="info-item">
            <span class="info-label">마지막 로그인:</span>
            <span class="info-value">
              {{ formatDateTime(user.last_login_at) }}
            </span>
          </div>
        </template>
      </ManagementCard>
    </div>
  </ContentsArea>

  <!-- 사용자 추가/수정 모달 -->
  <Modal
    :show="showModal"
    :title="isEdit ? '사용자 수정' : '사용자 추가'"
    @close="closeModal"
    class="user-modal"
  >
    <Select
      id="userRole"
      label="역할*"
      v-model="form.role"
      :options="roleOptions"
      placeholder="역할을 선택하세요"
      :error="formErrors.role"
    />

    <Select
      id="employeeId"
      label="매니저 연결 (선택사항)"
      v-model="form.employee_id"
      :options="peopleManagerOptions"
      placeholder="연결할 매니저를 선택하세요"
      @change="handleEmployeeSelection"
      @input="handleEmployeeSelection"
    />

    <Input
      id="userName"
      label="이름*"
      v-model="form.name"
      placeholder="사용자 이름을 입력하세요"
      :error="formErrors.name"
    />

    <Input
      id="userEmail"
      label="이메일*"
      v-model="form.email"
      type="email"
      placeholder="concentrix.com 이메일을 입력하세요"
      :error="formErrors.email"
    />

    <Input
      id="userPassword"
      :label="isEdit ? '비밀번호 (변경하지 않으려면 비워두세요)' : '비밀번호*'"
      v-model="form.password"
      :type="showPassword ? 'text' : 'password'"
      :placeholder="
        isEdit ? '비밀번호를 변경하려면 입력하세요' : '비밀번호를 입력하세요'
      "
      :error="formErrors.password"
    />

    <div class="status-toggle-group">
      <label class="status-toggle-label">계정 상태</label>
      <div class="status-toggle-wrapper">
        <Button
          :variant="form.is_active ? 'primary' : 'outline'"
          :size="28"
          @click="form.is_active = !form.is_active"
        >
          {{ form.is_active ? '활성' : '비활성' }}
        </Button>
      </div>
    </div>

    <template #footer>
      <div class="modal-actions">
        <Button
          variant="outline-dark"
          :size="36"
          :padding="40"
          @click="closeModal"
        >
          취소
        </Button>
        <Button
          variant="primary"
          :size="36"
          :padding="40"
          @click="handleSubmit"
          :disabled="loading"
        >
          {{ loading ? '저장 중...' : isEdit ? '수정' : '등록' }}
        </Button>
      </div>
    </template>
  </Modal>

  <!-- 삭제 확인 모달 -->
  <ConfirmModal
    :show="showDeleteModal"
    @close="closeDeleteModal"
    @confirm="handleDelete"
    title="사용자 삭제"
    :message="`정말로 '${userToDelete?.name}' 사용자를 삭제하시겠습니까?`"
    warning="삭제된 데이터는 복구할 수 없습니다."
    confirm-text="삭제"
    :loading="loading"
    loading-text="삭제 중..."
    modal-class="delete-modal"
  />
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import addSvg from '~/components/assets/dms/icons/add.svg?raw'
import TitleArea from '~/components/dms/TitleArea.vue'
import ContentsArea from '~/components/dms/ContentsArea.vue'
import Button from '~/components/ui/Button.vue'
import ManagementCard from '~/components/dms/ManagementCard.vue'
import Loading from '~/components/ui/Loading.vue'
import EmptyContainer from '~/components/dms/EmptyContainer.vue'
import Badge from '~/components/ui/Badge.vue'
import Modal from '~/components/ui/Modal.vue'
import Input from '~/components/ui/Input.vue'
import Checkbox from '~/components/ui/Checkbox.vue'
import ConfirmModal from '~/components/ui/ConfirmModal.vue'
import Select from '~/components/ui/Select.vue'

definePageMeta({
  layout: 'dms',
  ssr: false,
})

// 타입 정의
interface DmsUser {
  id: number
  email: string
  name: string
  password_hash: string
  employee_id: number | null
  role: string
  is_active: boolean
  permissions?: any
  last_login_at?: string | null
  created_at: string
  updated_at: string
}

// 반응형 데이터
const users = ref<DmsUser[]>([])
const isLoading = ref(false)

// 피플 매니저 관련
interface PeopleManager {
  id: number
  name: string
  email: string
  career_level: string
  job_role: string
  headquarters?: { name: string }
  group?: { name: string }
  team?: { name: string }
}

interface ApiResponse {
  success: boolean
  data: PeopleManager[]
}

const peopleManagers = ref<PeopleManager[]>([])
const peopleManagerOptions = ref<{ value: string | number; label: string }[]>(
  []
)

// 모달 관련
const showModal = ref(false)
const showDeleteModal = ref(false)
const selectedUser = ref<DmsUser | null>(null)
const userToDelete = ref<DmsUser | null>(null)
const isEdit = ref(false)
const loading = ref(false)

// 폼 데이터
const form = reactive({
  name: '',
  email: '',
  password: '',
  employee_id: '' as string | number,
  role: '',
  is_active: true,
})

const formErrors = ref({
  name: '',
  email: '',
  password: '',
  role: '',
})

// UI 상태
const showPassword = ref(false)

// 역할 옵션
const roleOptions = [
  { value: '대표이사', label: '대표이사' },
  { value: '부사장', label: '부사장' },
  { value: '본부장', label: '본부장' },
  { value: '그룹장', label: '그룹장' },
  { value: '팀장', label: '팀장' },
  { value: '기타', label: '기타' },
]

// 메서드
const fetchUsers = async () => {
  try {
    isLoading.value = true
    const { data } = await $fetch('/api/dms/users')

    if (data) {
      users.value = data.users as DmsUser[]
    }
  } catch (error) {
    console.error('사용자 목록 조회 오류:', error)
  } finally {
    isLoading.value = false
  }
}

const fetchPeopleManagers = async () => {
  try {
    const response = await $fetch<ApiResponse>(
      '/api/dms/employees?is_people_manager=true&status=active'
    )

    if (response.success && response.data) {
      peopleManagers.value = response.data

      // Select 옵션 생성
      peopleManagerOptions.value = [
        { value: '', label: '직원 미연결' },
        ...response.data.map((manager: PeopleManager) => ({
          value: manager.id,
          label: `${manager.name} ${manager.career_level} (${manager.email})`,
        })),
      ]
    }
  } catch (error) {
    console.error('피플매니저 목록 조회 오류:', error)
  }
}

const handleEmployeeSelection = (employeeId: string | number) => {
  if (!employeeId || employeeId === '') {
    // 직원 미연결 선택 시 이름과 이메일을 수동으로 입력할 수 있도록 함
    return
  }

  // 수정 모드에서는 자동 입력하지 않음
  if (isEdit.value) {
    return
  }

  // 선택된 직원 정보 찾기
  const selectedManager = peopleManagers.value.find(
    manager => manager.id === employeeId
  )

  if (selectedManager) {
    // 이름과 직급을 함께 입력, 이메일 자동 입력 (null 체크 포함)
    const name = selectedManager.name || ''
    const careerLevel = selectedManager.career_level || ''
    form.name = careerLevel ? `${name} ${careerLevel}` : name
    form.email = selectedManager.email || ''
  }
}

const openAddModal = () => {
  selectedUser.value = null
  isEdit.value = false
  initializeForm()
  showModal.value = true
}

const editUser = async (userId: number) => {
  try {
    // ID로 사용자 정보 다시 가져오기
    const response = await $fetch(`/api/dms/users/${userId}`)

    if (response.success && response.data) {
      selectedUser.value = response.data as DmsUser
      isEdit.value = true
      initializeForm()
      showModal.value = true
    } else {
      console.error('사용자 정보를 가져올 수 없습니다.')
    }
  } catch (error) {
    console.error('사용자 정보 조회 오류:', error)
  }
}

const deleteUser = (userId: number) => {
  // ID로 사용자 정보 찾기
  const user = users.value.find(u => u.id === userId)
  if (user) {
    userToDelete.value = user
    showDeleteModal.value = true
  }
}

const closeModal = () => {
  showModal.value = false
  selectedUser.value = null
  isEdit.value = false
  initializeForm()
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  userToDelete.value = null
}

const initializeForm = () => {
  if (selectedUser.value) {
    // 수정 모드: 기존 등록된 내용으로 표시
    form.name = selectedUser.value.name || ''
    form.email = selectedUser.value.email || ''
    form.password = ''
    form.employee_id = selectedUser.value.employee_id || ''
    form.role = selectedUser.value.role || ''
    form.is_active = selectedUser.value.is_active ?? true
  } else {
    // 새 사용자 초기화
    form.name = ''
    form.email = ''
    form.password = ''
    form.employee_id = ''
    form.role = ''
    form.is_active = true
  }

  // 에러 초기화
  formErrors.value = {
    name: '',
    email: '',
    password: '',
    role: '',
  }
}

const validateForm = () => {
  formErrors.value = { name: '', email: '', password: '', role: '' }

  if (!form.name || form.name.trim() === '') {
    formErrors.value.name = '이름을 입력해주세요.'
    return false
  }

  if (!form.email || form.email.trim() === '') {
    formErrors.value.email = '이메일을 입력해주세요.'
    return false
  }

  if (!form.role || form.role.trim() === '') {
    formErrors.value.role = '역할을 선택해주세요.'
    return false
  }

  if (!isEdit.value && (!form.password || form.password.trim() === '')) {
    formErrors.value.password = '비밀번호를 입력해주세요.'
    return false
  }

  return true
}

const handleSubmit = async () => {
  if (!validateForm()) return

  try {
    loading.value = true

    const submitData: any = {
      name: form.name,
      email: form.email,
      employee_id: form.employee_id
        ? parseInt(form.employee_id.toString())
        : null,
      role: form.role,
      is_active: form.is_active,
    }

    // 비밀번호가 입력된 경우에만 포함
    if (form.password) {
      submitData.password = form.password
    }

    const url = isEdit.value
      ? `/api/dms/users/${selectedUser.value!.id}`
      : '/api/dms/users'
    const method = isEdit.value ? 'PUT' : 'POST'

    await $fetch(url, {
      method,
      body: submitData,
    })

    await fetchUsers()
    closeModal()
  } catch (error: any) {
    console.error('사용자 저장 오류:', error)
    if (error.data?.statusMessage) {
      if (error.data.statusMessage.includes('이메일')) {
        formErrors.value.email = error.data.statusMessage
      } else {
        formErrors.value.name = error.data.statusMessage
      }
    }
  } finally {
    loading.value = false
  }
}

const handleDelete = async () => {
  if (!userToDelete.value) return

  try {
    await $fetch(`/api/dms/users/${userToDelete.value.id}`, {
      method: 'DELETE',
    })

    await fetchUsers()
    closeDeleteModal()
  } catch (error) {
    console.error('사용자 삭제 오류:', error)
  }
}

const toggleUserStatus = async (user: DmsUser) => {
  try {
    loading.value = true

    await $fetch(`/api/dms/users/${user.id}`, {
      method: 'PUT',
      body: {
        is_active: !user.is_active,
      },
    })

    // 목록 새로고침
    await fetchUsers()
  } catch (error) {
    console.error('사용자 상태 변경 오류:', error)
  } finally {
    loading.value = false
  }
}

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// 직원 ID 변화 감지
watch(
  () => form.employee_id,
  newEmployeeId => {
    console.log('form.employee_id 변화 감지:', newEmployeeId)
    handleEmployeeSelection(newEmployeeId)
  }
)

// 라이프사이클
onMounted(() => {
  fetchUsers()
  fetchPeopleManagers()
})
</script>

<style lang="scss" scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}
.management-card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  padding: 0 0 24px 0;
  overflow: auto;
  justify-content: flex-start;
  align-content: flex-start;
  > div {
    width: calc(25% - 60px / 4);
    @media (max-width: 1920px) {
      width: calc(33.3333% - 40px / 3);
    }
    @media (max-width: 1355px) {
      width: calc(50% - 10px);
    }
  }
  :deep(.card-body) {
    position: relative;
    .status-container {
      position: absolute;
      top: 12px;
      right: 12px;
    }
  }
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;

  .info-label {
    font-size: 12px;
    color: #666;
    font-weight: 500;
  }

  .info-value {
    font-size: 12px;
    color: #333;
  }
}

// 사용자 모달 커스텀 스타일
:deep(.user-modal) {
  .form-group {
    margin-bottom: 32px;
  }

  .form-label {
    display: block;
    font-size: 16px;
    font-weight: 700;
    color: #000;
    margin-bottom: 8px;
  }

  .checkbox-group {
    margin-top: 16px;
    margin-bottom: 16px;
  }

  .status-toggle-group {
    margin-top: 16px;
    margin-bottom: 16px;

    .status-toggle-label {
      display: block;
      font-size: 16px;
      font-weight: 700;
      color: #000;
      margin-bottom: 8px;
    }

    .status-toggle-wrapper {
      display: flex;
      align-items: center;
    }
  }

  .modal-actions {
    display: flex;
    gap: 12px;
    justify-content: center;
  }
}
</style>
