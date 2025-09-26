<template>
  <Modal
    :show="isOpen"
    :title="modalTitle"
    :width="'442px'"
    @close="handleClose"
  >
    <form @submit.prevent="handleSubmit" class="organization-form">
      <div class="form-group">
        <label class="form-label">
          {{
            organizationType === 'headquarters'
              ? '본부명'
              : organizationType === 'group'
                ? '그룹명'
                : '팀명'
          }}
          <span class="required">*</span>
        </label>
        <Input
          v-model="form.name"
          :placeholder="`${organizationType === 'headquarters' ? '본부' : organizationType === 'group' ? '그룹' : '팀'}명을 입력하세요`"
          :error="errors.name"
        />
      </div>

      <!-- 본부 선택 (그룹, 팀 추가 시) -->
      <div
        v-if="organizationType === 'group' || organizationType === 'team'"
        class="form-group"
      >
        <label class="form-label">
          소속 본부
          <span class="required">*</span>
        </label>
        <Select
          v-model="form.headquarters_id"
          :options="headquartersOptions"
          placeholder="본부를 선택하세요"
          :error="errors.headquarters_id"
          @change="handleHeadquartersChange"
        />
      </div>

      <!-- 그룹 선택 (팀 추가 시) -->
      <div v-if="organizationType === 'team'" class="form-group">
        <label class="form-label">
          소속 그룹
          <span class="required">*</span>
        </label>
        <Select
          v-model="form.group_id"
          :options="groupOptions"
          placeholder="그룹을 선택하세요"
          :error="errors.group_id"
        />
      </div>

      <!-- 리더 선택 -->
      <div class="form-group">
        <label class="form-label">리더</label>
        <Select
          v-model="form.leader_id"
          :options="leaderOptions"
          placeholder="리더를 선택하세요 (선택사항)"
        />
      </div>

      <!-- 정렬 순서 -->
      <div class="form-group">
        <label class="form-label">정렬 순서</label>
        <Input
          v-model.number="form.sort_order"
          type="number"
          placeholder="정렬 순서를 입력하세요"
          :error="errors.sort_order"
        />
      </div>

      <div class="form-actions">
        <Button type="button" variant="secondary" @click="handleClose">
          취소
        </Button>
        <Button type="submit" variant="blue" :disabled="isSubmitting">
          {{ isEdit ? '수정' : '추가' }}
        </Button>
      </div>
    </form>
  </Modal>
</template>

<script setup>
import Modal from '~/components/ui/Modal.vue'
import Input from '~/components/ui/Input.vue'
import Select from '~/components/ui/Select.vue'
import Button from '~/components/ui/Button.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  organizationType: {
    type: String,
    required: true,
    validator: value => ['headquarters', 'group', 'team'].includes(value),
  },
  editData: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close', 'success'])

// 폼 데이터
const form = ref({
  name: '',
  headquarters_id: null,
  group_id: null,
  leader_id: null,
  sort_order: 0,
})

// 에러 메시지
const errors = ref({})

// 로딩 상태
const isSubmitting = ref(false)

// 옵션 데이터
const headquartersOptions = ref([])
const groupOptions = ref([])
const leaderOptions = ref([])

// 모달 제목
const modalTitle = computed(() => {
  const typeNames = {
    headquarters: '본부',
    group: '그룹',
    team: '팀',
  }
  return `${isEdit.value ? '수정' : '신규'} ${typeNames[props.organizationType]} ${isEdit.value ? '' : '추가'}`
})

// 편집 모드 여부
const isEdit = computed(() => !!props.editData)

// 본부 변경 핸들러
const handleHeadquartersChange = async headquartersId => {
  form.value.group_id = null
  if (headquartersId) {
    await loadGroups(headquartersId)
  } else {
    groupOptions.value = []
  }
}

// 데이터 로드
const loadHeadquarters = async () => {
  try {
    const response = await $fetch('/api/dms/organizations/headquarters')
    if (response.success) {
      headquartersOptions.value = response.data.map(hq => ({
        value: hq.id,
        label: hq.name,
      }))
    }
  } catch (error) {
    console.error('Error loading headquarters:', error)
  }
}

const loadGroups = async headquartersId => {
  try {
    const response = await $fetch(
      `/api/dms/organizations/groups?headquarters_id=${headquartersId}`
    )
    if (response.success) {
      groupOptions.value = response.data.map(group => ({
        value: group.id,
        label: group.name,
      }))
    }
  } catch (error) {
    console.error('Error loading groups:', error)
  }
}

const loadLeaders = async () => {
  try {
    const response = await $fetch('/api/dms/employees')
    if (response.success) {
      leaderOptions.value = response.data.map(emp => ({
        value: emp.id,
        label: `${emp.name} (${emp.email})`,
      }))
    }
  } catch (error) {
    console.error('Error loading leaders:', error)
  }
}

// 폼 초기화
const resetForm = () => {
  form.value = {
    name: '',
    headquarters_id: null,
    group_id: null,
    leader_id: null,
    sort_order: 0,
  }
  errors.value = {}
}

// 폼 검증
const validateForm = () => {
  errors.value = {}

  if (!form.value.name.trim()) {
    errors.value.name = `${props.organizationType === 'headquarters' ? '본부' : props.organizationType === 'group' ? '그룹' : '팀'}명을 입력해주세요`
  }

  if (props.organizationType === 'group' || props.organizationType === 'team') {
    if (!form.value.headquarters_id) {
      errors.value.headquarters_id = '소속 본부를 선택해주세요'
    }
  }

  if (props.organizationType === 'team') {
    if (!form.value.group_id) {
      errors.value.group_id = '소속 그룹을 선택해주세요'
    }
  }

  return Object.keys(errors.value).length === 0
}

// 제출 핸들러
const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true

  try {
    const endpoint = getEndpoint()
    const method = isEdit.value ? 'PUT' : 'POST'
    const url = isEdit.value ? `${endpoint}/${props.editData.id}` : endpoint

    const response = await $fetch(url, {
      method,
      body: form.value,
    })

    if (response.success) {
      emit('success', response.data)
      handleClose()
    }
  } catch (error) {
    console.error('Error submitting form:', error)
    // 에러 처리
  } finally {
    isSubmitting.value = false
  }
}

// API 엔드포인트 가져오기
const getEndpoint = () => {
  const endpoints = {
    headquarters: '/api/dms/organizations/headquarters',
    group: '/api/dms/organizations/groups',
    team: '/api/dms/organizations/teams',
  }
  return endpoints[props.organizationType]
}

// 모달 닫기
const handleClose = () => {
  resetForm()
  emit('close')
}

// 편집 데이터 설정
const setEditData = () => {
  if (props.editData) {
    form.value = {
      name: props.editData.name || '',
      headquarters_id: props.editData.headquarters_id || null,
      group_id: props.editData.group_id || null,
      leader_id: props.editData.leader_id || null,
      sort_order: props.editData.sort_order || 0,
    }
  }
}

// 모달이 열릴 때 데이터 로드
watch(
  () => props.isOpen,
  async isOpen => {
    if (isOpen) {
      resetForm()
      await loadHeadquarters()
      await loadLeaders()

      if (isEdit.value) {
        setEditData()
        if (form.value.headquarters_id) {
          await loadGroups(form.value.headquarters_id)
        }
      }
    }
  }
)

// 편집 데이터 변경 감지
watch(
  () => props.editData,
  () => {
    if (props.isOpen && props.editData) {
      setEditData()
    }
  }
)
</script>

<style lang="scss" scoped>
.organization-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-weight: 500;
  color: #374151;
  font-size: 14px;
  line-height: 20px;
}

.required {
  color: #ef4444;
  margin-left: 2px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
}
</style>
