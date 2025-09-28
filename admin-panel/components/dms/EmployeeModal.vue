<template>
  <Modal :show="show" @close="closeModal" :title="modalTitle" :width="876">
    <form @submit.prevent="handleSubmit" class="employee-form">
      <div class="form-row">
        <div class="left">
          <Input
            id="name"
            label="이름 *"
            v-model="formData.name"
            placeholder="홍길동"
            :error="errors.name"
            required
          />
          <Input
            id="email"
            label="이메일"
            v-model="formData.email"
            type="email"
            placeholder="concentrix@concentrix.com"
            :error="errors.email"
          />
          <Select
            id="group_id"
            label="그룹"
            v-model="formData.group_id"
            :options="groupOptions"
            placeholder="그룹 선택"
          />
          <Select
            id="team_id"
            label="팀"
            v-model="formData.team_id"
            :options="teamOptions"
            placeholder="팀 선택"
          />
          <Select
            id="career_level"
            label="직급(CL)"
            v-model="formData.career_level"
            :options="careerLevelOptions"
            placeholder="직급 선택"
          />
          <Input
            id="job_role"
            label="직무"
            v-model="formData.job_role"
            placeholder="개발자, 디자이너, 기획자 등"
          />
          <Checkbox
            v-model="formData.is_people_manager"
            :options="[{ value: true, label: '피플 매니저' }]"
            name="is_people_manager"
            :multiple="false"
          />
        </div>
        <div class="right">
          <Input
            id="start_date"
            label="입사일"
            v-model="formData.start_date"
            type="date"
          />
          <Select
            id="manager_id"
            label="매니저"
            v-model="formData.manager_id"
            :options="managerOptions"
            placeholder="매니저 선택"
          />
          <Radio
            title="상태"
            v-model="formData.status"
            :options="statusOptions"
            name="status"
            :multiple="false"
            :vertical="false"
          />
          <Input
            id="end_date"
            label="퇴사일"
            v-model="formData.end_date"
            type="date"
          />
        </div>
      </div>
    </form>

    <template #footer>
      <div class="modal-actions">
        <Button
          type="button"
          variant="outline-dark"
          :size="36"
          :padding="40"
          @click="closeModal"
          :disabled="isLoading"
        >
          취소
        </Button>
        <Button
          type="submit"
          variant="primary"
          :size="36"
          :padding="40"
          :disabled="isLoading"
          @click="handleSubmit"
        >
          {{ isLoading ? '처리 중...' : isEdit ? '수정' : '추가' }}
        </Button>
      </div>
    </template>
  </Modal>
</template>

<script setup>
import { ref, reactive, watch, onMounted, computed } from 'vue'
import {
  getCareerLevelLabel,
  getCareerLevelOptions,
} from '~/utils/dms/employee-utils'
import Modal from '~/components/ui/Modal.vue'
import Input from '~/components/ui/Input.vue'
import Select from '~/components/ui/Select.vue'
import Radio from '~/components/ui/Radio.vue'
import Button from '~/components/ui/Button.vue'
import Checkbox from '~/components/ui/Checkbox.vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  employee: {
    type: Object,
    default: null,
  },
  groupOptions: {
    type: Array,
    default: () => [],
  },
  teamOptions: {
    type: Array,
    default: () => [],
  },
  managerOptions: {
    type: Array,
    default: () => [],
  },
  statusOptions: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['close', 'submit'])

const isLoading = ref(false)
const isEdit = ref(false)

// 모달 제목
const modalTitle = computed(() => {
  return isEdit.value ? '직원 정보 수정' : '신규 직원 추가'
})

// 직급 옵션 생성
const careerLevelOptions = computed(() => {
  return getCareerLevelOptions()
})

const formData = reactive({
  email: '',
  name: '',
  headquarter_id: null,
  group_id: null,
  team_id: null,
  manager_id: null,
  job_role: '',
  career_level: null,
  status: 'active',
  is_people_manager: false,
  start_date: '',
  end_date: '',
})

const errors = reactive({
  email: '',
  name: '',
})

// 폼 초기화
const resetForm = () => {
  Object.assign(formData, {
    email: '',
    name: '',
    headquarter_id: null,
    group_id: null,
    team_id: null,
    manager_id: null,
    job_role: '',
    career_level: null,
    status: 'active',
    is_people_manager: false,
    start_date: '',
    end_date: '',
  })

  Object.assign(errors, {
    email: '',
    name: '',
  })
}

// 직원 데이터로 폼 채우기
const fillForm = employee => {
  if (employee) {
    Object.assign(formData, {
      email: employee.email || '',
      name: employee.name || '',
      headquarter_id: employee.headquarter_id || null,
      group_id: employee.group_id || null,
      team_id: employee.team_id || null,
      manager_id: employee.manager_id || null,
      job_role: employee.job_role || '',
      career_level: employee.career_level || null,
      status: employee.status || 'active',
      is_people_manager: employee.is_people_manager || false,
      start_date: employee.start_date
        ? new Date(employee.start_date).toISOString().split('T')[0]
        : '',
      end_date: employee.end_date
        ? new Date(employee.end_date).toISOString().split('T')[0]
        : '',
    })
  }
}

// 모달 열림/닫힘 감지
watch(
  () => props.show,
  newVal => {
    if (newVal) {
      if (props.employee) {
        isEdit.value = true
        fillForm(props.employee)
      } else {
        isEdit.value = false
        resetForm()
      }
    }
  }
)

// 폼 제출
const handleSubmit = async () => {
  // 유효성 검사
  if (!validateForm()) {
    return
  }

  isLoading.value = true

  try {
    const submitData = {
      ...formData,
      group_id: formData.group_id ? parseInt(formData.group_id) : null,
      team_id: formData.team_id ? parseInt(formData.team_id) : null,
      manager_id: formData.manager_id ? parseInt(formData.manager_id) : null,
      start_date: formData.start_date || null,
      end_date: formData.end_date || null,
    }

    emit('submit', submitData)
  } catch (error) {
    console.error('폼 제출 오류:', error)
  } finally {
    isLoading.value = false
  }
}

// 유효성 검사
const validateForm = () => {
  let isValid = true

  // 이메일 검사
  if (!formData.email || formData.email.trim().length === 0) {
    errors.email = '이메일을 입력해주세요.'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.'
    isValid = false
  } else {
    errors.email = ''
  }

  // 이름 검사
  if (!formData.name || formData.name.trim().length === 0) {
    errors.name = '이름을 입력해주세요.'
    isValid = false
  } else {
    errors.name = ''
  }

  return isValid
}

// 모달 닫기
const closeModal = () => {
  emit('close')
  resetForm()
}
</script>

<style lang="scss" scoped>
.employee-form {
  margin: 0 auto;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

// 반응형 디자인
@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
