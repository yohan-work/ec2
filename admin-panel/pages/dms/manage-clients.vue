<template>
  <TitleArea title="고객사 관리">
    <template #right>
      <div class="right-content">
        <Button variant="blue" :size="38" @click="openAddModal">
          <div v-html="addSvg"></div>
          신규 고객사 추가
        </Button>
      </div>
    </template>
  </TitleArea>
  <ContentsArea>
    <div v-if="loading" class="loading-container">
      <Loading />
    </div>
    <div v-else-if="error" class="error-container">
      <p class="error-message">{{ error }}</p>
      <Button @click="fetchClients">다시 시도</Button>
    </div>
    <div v-else class="management-card-container">
      <ManagementCard
        v-for="client in clients"
        :key="client.id"
        :item-name="client.name"
        :item-id="client.id"
        @edit="editClient"
        @delete="deleteClient"
      >
        <template #info-items>
          <div class="info-item">
            <span class="info-value">
              <span>생성일</span><br />
              <strong>{{ formatDate(client.created_at) }}</strong>
            </span>
          </div>
        </template>
      </ManagementCard>
    </div>
  </ContentsArea>

  <!-- 고객사 추가/수정 모달 -->
  <Modal
    :show="showModal"
    @close="closeModal"
    class="client-modal"
    :title="isEdit ? '고객사 수정' : '고객사 추가'"
  >
    <Input
      id="clientName"
      label="고객사명*"
      v-model="formData.name"
      placeholder="고객사명을 입력하세요"
      :error="formErrors.name || duplicateError"
    />

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
          @click="saveClient"
          :disabled="saving"
        >
          {{ saving ? '저장 중...' : isEdit ? '수정' : '생성' }}
        </Button>
      </div>
    </template>
  </Modal>

  <!-- 삭제 확인 모달 -->
  <ConfirmModal
    :show="showDeleteModal"
    @close="closeDeleteModal"
    @confirm="confirmDelete"
    title="고객사 삭제"
    message="정말로 이 고객사를 삭제하시겠습니까?"
    warning="삭제된 데이터는 복구할 수 없습니다."
    confirm-text="삭제"
    :loading="deleting"
    loading-text="삭제 중..."
    modal-class="delete-modal"
  />
</template>

<script setup>
import addSvg from '~/components/assets/dms/icons/add.svg?raw'
import TitleArea from '~/components/dms/TitleArea.vue'
import ContentsArea from '~/components/dms/ContentsArea.vue'
import Button from '~/components/ui/Button.vue'
import ManagementCard from '~/components/dms/ManagementCard.vue'
import Modal from '~/components/ui/Modal.vue'
import Input from '~/components/ui/Input.vue'
import Loading from '~/components/ui/Loading.vue'
import ConfirmModal from '~/components/ui/ConfirmModal.vue'
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: 'dms',
  ssr: false,
})

// 메타 태그
useHead({
  title: 'CiX Delivery Management System - 고객사 관리',
  meta: [
    {
      name: 'description',
      content: 'CiX Delivery Management System - 고객사 관리',
    },
  ],
})

// 반응형 데이터
const clients = ref([])
const loading = ref(false)
const error = ref('')
const showModal = ref(false)
const isEdit = ref(false)
const saving = ref(false)
const editingClientId = ref(null)
const showDeleteModal = ref(false)
const deletingClientId = ref(null)
const deleting = ref(false)

// 중복 체크 설정
const duplicateCheckConfig = {
  apiEndpoint: '/api/dms/clients',
  fieldName: 'name',
  errorMessage: '이미 등록된 고객사입니다. 다른 이름으로 등록해주세요',
  formField: 'name',
}

// 범용 중복 체크 composable 사용
const {
  checking: checkingDuplicate,
  error: duplicateError,
  checkDuplicate,
  clearError,
} = useDuplicateCheck(duplicateCheckConfig)

// 폼 데이터
const formData = ref({
  name: '',
})

const formErrors = ref({
  name: '',
})

// 고객사 목록 조회
const fetchClients = async () => {
  loading.value = true
  error.value = ''

  try {
    const { data } = await $fetch('/api/dms/clients')
    clients.value = data
  } catch (err) {
    error.value = '고객사 목록을 불러오는데 실패했습니다.'
    console.error('Error fetching clients:', err)
  } finally {
    loading.value = false
  }
}

// 모달 열기 (추가)
const openAddModal = () => {
  isEdit.value = false
  editingClientId.value = null
  formData.value = { name: '' }
  formErrors.value = { name: '' }
  clearError() // 중복 체크 에러 초기화
  showModal.value = true
}

// 모달 열기 (수정)
const openEditModal = client => {
  isEdit.value = true
  editingClientId.value = client.id
  formData.value = { name: client.name }
  formErrors.value = { name: '' }
  clearError() // 중복 체크 에러 초기화
  showModal.value = true
}

// 모달 닫기
const closeModal = () => {
  showModal.value = false
  isEdit.value = false
  editingClientId.value = null
  formData.value = { name: '' }
  formErrors.value = { name: '' }
  clearError() // 중복 체크 에러 초기화
}

// 폼 유효성 검사 (중복 확인 포함)
const validateForm = async () => {
  formErrors.value = { name: '' }

  if (!formData.value.name || formData.value.name.trim() === '') {
    formErrors.value.name = '고객사명을 입력해주세요.'
    return false
  }

  // 범용 중복 확인 사용
  const excludeId = isEdit.value ? editingClientId.value : null
  const duplicateResult = await checkDuplicate(formData.value.name, excludeId)

  if (!duplicateResult.isValid) {
    formErrors.value.name = duplicateResult.error
    return false
  }

  return true
}

// 고객사 저장
const saveClient = async () => {
  if (!(await validateForm())) return

  saving.value = true

  try {
    if (isEdit.value) {
      // 수정
      await $fetch(`/api/dms/clients/${editingClientId.value}`, {
        method: 'PUT',
        body: { name: formData.value.name.trim() },
      })
    } else {
      // 추가
      await $fetch('/api/dms/clients', {
        method: 'POST',
        body: { name: formData.value.name.trim() },
      })
    }

    closeModal()
    await fetchClients() // 목록 새로고침
  } catch (err) {
    if (err.data?.statusMessage) {
      formErrors.value.name = err.data.statusMessage
    } else {
      error.value = '저장에 실패했습니다.'
    }
    console.error('Error saving client:', err)
  } finally {
    saving.value = false
  }
}

// 고객사 수정
const editClient = clientId => {
  const client = clients.value.find(c => c.id === clientId)
  if (client) {
    openEditModal(client)
  }
}

// 고객사 삭제 (모달 열기)
const deleteClient = clientId => {
  deletingClientId.value = clientId
  showDeleteModal.value = true
}

// 삭제 확인 모달 닫기
const closeDeleteModal = () => {
  showDeleteModal.value = false
  deletingClientId.value = null
}

// 실제 삭제 실행
const confirmDelete = async () => {
  if (!deletingClientId.value) return

  deleting.value = true

  try {
    await $fetch(`/api/dms/clients/${deletingClientId.value}`, {
      method: 'DELETE',
    })

    await fetchClients() // 목록 새로고침
    closeDeleteModal()
  } catch (err) {
    error.value = '삭제에 실패했습니다.'
    console.error('Error deleting client:', err)
  } finally {
    deleting.value = false
  }
}

// 날짜 포맷팅
const formatDate = dateString => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

// 컴포넌트 마운트 시 데이터 로드
onMounted(() => {
  fetchClients()
})
</script>

<style lang="scss" scoped>
.management-card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: calc(100% + 15px);
  height: 100%;
  padding: 0 15px 23px 0;
  margin-right: 15px;
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
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.error-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  gap: 16px;
}

.error-message {
  color: #e53e3e;
  font-size: 16px;
  margin: 0;
}

// 클라이언트 모달 커스텀 스타일
:deep(.client-modal) {
  .modal-content {
    padding: 32px;
    border-radius: 12px;
  }

  .modal-title {
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
    color: #000;
    margin: 0 0 24px 0;
  }

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

  .modal-actions {
    display: flex;
    gap: 12px;
    justify-content: center;
  }
}
</style>
