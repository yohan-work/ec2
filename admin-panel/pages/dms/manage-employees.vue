<template>
  <TitleArea title="직원 관리">
    <template #right>
      <div class="right-content">
        <Button variant="blue" :size="38" @click="openAddModal">
          <div v-html="addSvg"></div>
          신규 직원 추가
        </Button>
      </div>
    </template>
  </TitleArea>
  <ContentsArea>
    <MainContainer :round="true">
      <FilterContainer>
        <div class="filter-group">
          <Input
            v-model="searchQuery"
            type="text"
            placeholder="이름/이메일 검색"
            @keyup.enter="searchEmployees"
          />
        </div>
        <div class="filter-group">
          <Select
            v-model="selectedGroup"
            :options="groupOptions"
            placeholder="전체 그룹"
            @change="searchEmployees"
          />
          <Select
            v-model="selectedTeam"
            :options="teamOptions"
            placeholder="전체 팀"
            @change="searchEmployees"
          />
        </div>
        <div class="filter-group">
          <Select
            v-model="selectedJob"
            :options="jobRoleOptions"
            placeholder="전체 직무"
            @change="searchEmployees"
          />
        </div>
        <div class="filter-group">
          <Select
            v-model="selectedCl"
            :options="clOptions"
            placeholder="전체 직급"
            @change="searchEmployees"
          />
        </div>
        <div class="filter-group">
          <Select
            v-model="selectedStatus"
            :options="statusOptions"
            placeholder="전체 상태"
            @change="searchEmployees"
          />
        </div>
        <div class="filter-group">
          <Button
            variant="primary"
            :size="38"
            :padding="32"
            @click="searchEmployees"
          >
            검색
          </Button>
        </div>
        <div class="filter-info" v-if="allEmployees > 0">
          <div>
            총 {{ allEmployees }}명 중 <strong>{{ employees.length }}</strong
            >명 표시
          </div>
          <Button
            v-if="isSearchExecuted"
            variant="outline"
            :size="24"
            @click="resetFilters"
          >
            필터 해제
            <div v-html="resetSvg"></div>
          </Button>
        </div>
      </FilterContainer>

      <div v-if="isLoading" class="loading-container">
        <Loading />
      </div>

      <EmptyContainer
        v-else-if="employees.length === 0"
        message="등록된 직원이 없습니다."
      />

      <Table v-else variant="simple">
        <thead>
          <tr>
            <th>직원</th>
            <th>그룹</th>
            <th>팀</th>
            <th>매니저</th>
            <th>직무</th>
            <th>직급(CL)</th>
            <th>이메일</th>
            <th>상태</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in employees" :key="employee.id">
            <td>
              <div class="employee-info">
                <span class="name">{{ employee.name }}</span>
                <span v-if="employee.is_people_manager" class="manager-badge"
                  >M</span
                >
              </div>
            </td>
            <td>{{ employee.group?.name || '-' }}</td>
            <td>{{ employee.team?.name || '-' }}</td>
            <td>{{ employee.manager?.name || '-' }}</td>
            <td>{{ employee.job_role || '-' }}</td>
            <td>{{ employee.career_level || '-' }}</td>
            <td>{{ employee.email }}</td>
            <td>
              <Badge :class="getStatusBadgeClass(employee.status)">
                {{ getStatusLabel(employee.status) }}
              </Badge>
            </td>
            <td>
              <div class="employee-actions">
                <Button
                  variant="text"
                  :size="20"
                  @click="editEmployee(employee)"
                >
                  <div v-html="modifySvg"></div>
                  수정
                </Button>
                <Button
                  variant="text"
                  :size="20"
                  @click="deleteEmployee(employee)"
                >
                  <div v-html="deleteSvg"></div>
                  삭제
                </Button>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    </MainContainer>
  </ContentsArea>

  <!-- 직원 추가/수정 모달 -->
  <Modal
    :show="isModalOpen"
    @close="closeModal"
    :title="modalTitle"
    :width="876"
  >
    <form @submit.prevent="handleEmployeeFormSubmit" class="employee-form">
      <!-- 본부 hidden input -->
      <input type="hidden" v-model="employeeFormData.headquarter_id" />

      <div class="form-row">
        <div class="left">
          <Input
            id="name"
            label="이름 *"
            v-model="employeeFormData.name"
            placeholder="홍길동"
            :error="employeeFormErrors.name"
            required
          />
          <Input
            id="email"
            label="이메일"
            v-model="employeeFormData.email"
            type="email"
            placeholder="honggildong 또는 honggildong@concentrix.com"
            :error="employeeFormErrors.email"
          />
          <Input
            id="start_date"
            label="입사일"
            v-model="employeeFormData.start_date"
            type="date"
          />
          <Select
            id="manager_id"
            label="매니저"
            v-model="employeeFormData.manager_id"
            :options="managerOptions"
            placeholder="매니저 선택"
          />
        </div>
        <div class="right">
          <Select
            id="group_id"
            label="그룹"
            v-model="employeeFormData.group_id"
            :options="formGroupOptions"
            placeholder="그룹 선택"
            @change="filterTeamsByGroup(employeeFormData.group_id)"
          />
          <Select
            id="team_id"
            label="팀"
            v-model="employeeFormData.team_id"
            :options="formTeamOptions"
            placeholder="팀 선택"
          />
          <Select
            id="career_level"
            label="직급(CL) *"
            v-model="employeeFormData.career_level"
            :options="careerLevelOptions"
            placeholder="직급 선택"
            :error="employeeFormErrors.career_level"
          />
          <Select
            id="job_role"
            label="직무"
            v-model="employeeFormData.job_role"
            :options="jobRoleOptions"
            placeholder="직무 선택"
          />
          <Checkbox
            v-model="employeeFormData.is_people_manager"
            :options="[{ value: true, label: '피플 매니저' }]"
            name="is_people_manager"
            :multiple="false"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="left">
          <Radio
            title="상태"
            v-model="employeeFormData.status"
            :options="statusOptions"
            name="status"
            :multiple="false"
            :vertical="false"
          />
          <Input
            id="end_date"
            label="퇴사일"
            v-model="employeeFormData.end_date"
            type="date"
          />
        </div>
        <div class="right"></div>
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
          :disabled="isEmployeeFormLoading"
        >
          취소
        </Button>
        <Button
          type="submit"
          variant="primary"
          :size="36"
          :padding="40"
          :disabled="isEmployeeFormLoading"
          @click="handleEmployeeFormSubmit"
        >
          {{
            isEmployeeFormLoading ? '처리 중...' : isEditMode ? '수정' : '등록'
          }}
        </Button>
      </div>
    </template>
  </Modal>

  <!-- 삭제 확인 모달 -->
  <ConfirmModal
    :show="showDeleteModal"
    @close="closeDeleteModal"
    @confirm="confirmDelete"
    title="직원 삭제"
    :message="
      deletingEmployee
        ? `${deletingEmployee.name}님의 직원 정보를 삭제하시겠습니까?`
        : '직원 정보를 삭제하시겠습니까?'
    "
    warning="삭제한 데이터는 복구할 수 없습니다."
    confirm-text="삭제"
    :loading="deleting"
    loading-text="삭제 중..."
    modal-class="delete-modal"
  />
</template>

<script setup>
import addSvg from '~/components/assets/dms/icons/add.svg?raw'
import modifySvg from '~/components/assets/dms/icons/modify.svg?raw'
import deleteSvg from '~/components/assets/dms/icons/delete.svg?raw'
import TitleArea from '~/components/dms/TitleArea.vue'
import ContentsArea from '~/components/dms/ContentsArea.vue'
import MainContainer from '~/components/dms/MainContainer.vue'
import FilterContainer from '~/components/dms/FilterContainer.vue'
import EmptyContainer from '~/components/dms/EmptyContainer.vue'
import Button from '~/components/ui/Button.vue'
import Input from '~/components/ui/Input.vue'
import Select from '~/components/ui/Select.vue'
import Table from '~/components/ui/Table.vue'
import Badge from '~/components/ui/Badge.vue'
import Loading from '~/components/ui/Loading.vue'
import Modal from '~/components/ui/Modal.vue'
import Radio from '~/components/ui/Radio.vue'
import Checkbox from '~/components/ui/Checkbox.vue'
import ConfirmModal from '~/components/ui/ConfirmModal.vue'
import { ref, reactive, onMounted, computed, watch } from 'vue'
import {
  getStatusLabel,
  getStatusCodeColor,
  getCareerLevelLabel,
  getCareerLevelOptions,
  getJobRoleOptions,
  filterManagerCandidates,
} from '~/utils/dms/employee-utils'

definePageMeta({
  layout: 'dms',
  ssr: false,
})

// 필터 해제 아이콘
const resetSvg = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12.6874 6.125C12.6863 7.05295 12.3173 7.9426 11.6611 8.59876C11.005 9.25491 10.1153 9.62399 9.18736 9.625H2.80587L4.68439 11.503C4.76648 11.5851 4.8126 11.6964 4.8126 11.8125C4.8126 11.9286 4.76648 12.0399 4.68439 12.122C4.60229 12.2041 4.49095 12.2502 4.37486 12.2502C4.25876 12.2502 4.14742 12.2041 4.06532 12.122L1.44032 9.49703C1.39965 9.4564 1.36738 9.40815 1.34536 9.35504C1.32334 9.30193 1.31201 9.24499 1.31201 9.1875C1.31201 9.13001 1.32334 9.07308 1.34536 9.01996C1.36738 8.96685 1.39965 8.9186 1.44032 8.87797L4.06532 6.25297C4.14742 6.17088 4.25876 6.12476 4.37486 6.12476C4.49095 6.12476 4.60229 6.17088 4.68439 6.25297C4.76648 6.33506 4.8126 6.4464 4.8126 6.5625C4.8126 6.6786 4.76648 6.78994 4.68439 6.87203L2.80587 8.75H9.18736C9.88355 8.75 10.5512 8.47344 11.0435 7.98116C11.5358 7.48887 11.8124 6.82119 11.8124 6.125C11.8124 5.42881 11.5358 4.76113 11.0435 4.26884C10.5512 3.77656 9.88355 3.5 9.18736 3.5H4.37486C4.25882 3.5 4.14754 3.45391 4.0655 3.37186C3.98345 3.28981 3.93736 3.17853 3.93736 3.0625C3.93736 2.94647 3.98345 2.83519 4.0655 2.75314C4.14754 2.67109 4.25882 2.625 4.37486 2.625H9.18736C10.1153 2.62601 11.005 2.99509 11.6611 3.65125C12.3173 4.3074 12.6863 5.19705 12.6874 6.125Z" fill="#3C3C3C"></path>
</svg>`

// 검색이 실행되었는지 확인
const isSearchExecuted = ref(false)

// 반응형 데이터
const employees = ref([])
const allEmployees = ref([]) // 전체 직원 데이터 (필터링 전)
const isLoading = ref(false)
const isModalOpen = ref(false)
const selectedEmployee = ref(null)

// 직원 폼 관련
const isEmployeeFormLoading = ref(false)
const isEditMode = ref(false)

// 모달 제목
const modalTitle = computed(() => {
  return isEditMode.value ? '직원 정보 수정' : '신규 직원 추가'
})

// 직급 옵션 생성
const careerLevelOptions = computed(() => {
  return getCareerLevelOptions()
})

// 직무 옵션 생성
const jobRoleOptions = computed(() => {
  return [{ value: '', label: '선택 안함' }, ...getJobRoleOptions()]
})

// 직원 폼 데이터
const employeeFormData = reactive({
  email: '',
  name: '',
  headquarter_id: 1, // 본부는 항상 1번으로 고정
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

// 직원 폼 에러
const employeeFormErrors = reactive({
  email: '',
  name: '',
  career_level: '',
})

// 삭제 확인 모달
const showDeleteModal = ref(false)
const deletingEmployeeId = ref(null)
const deletingEmployee = ref(null) // 삭제할 직원 정보
const deleting = ref(false)

// 검색 및 필터링
const searchQuery = ref('')
const selectedGroup = ref('')
const selectedTeam = ref('')
const selectedJob = ref('')
const selectedCl = ref('')
const selectedStatus = ref('')

// 옵션 데이터
const groupOptions = ref([]) // 필터용 그룹 옵션
const teamOptions = ref([]) // 필터용 팀 옵션
const allTeamOptions = ref([]) // 모든 팀 옵션 (그룹별 필터링용)
const clOptions = ref([])
const statusOptions = ref([])
const managerOptions = ref([])

// 폼용 옵션 데이터
const formGroupOptions = ref([]) // 폼용 그룹 옵션
const formTeamOptions = ref([]) // 폼용 팀 옵션
const formAllTeamOptions = ref([]) // 폼용 모든 팀 옵션

// 상태 라벨 및 스타일 (utils 함수 사용)
const getStatusVariant = status => {
  const variantMap = {
    active: 'success',
    resigned: 'danger',
    on_leave: 'warning',
    transferred: 'info',
    pre_hire: 'secondary',
  }
  return variantMap[status] || 'secondary'
}

// 상태별 badge 클래스 반환
const getStatusBadgeClass = status => {
  const classMap = {
    active: 'badge-active',
    resigned: 'badge-resigned',
    on_leave: 'badge-on-leave',
    transferred: 'badge-transferred',
    pre_hire: 'badge-pre-hire',
  }
  return classMap[status] || 'badge-default'
}

// 직원 목록 조회 (통합)
const fetchEmployees = async () => {
  try {
    isLoading.value = true

    const params = new URLSearchParams()

    if (searchQuery.value) params.append('search', searchQuery.value)
    if (selectedGroup.value) params.append('group_id', selectedGroup.value)
    if (selectedTeam.value) params.append('team_id', selectedTeam.value)
    if (selectedJob.value) params.append('job_role', selectedJob.value)
    if (selectedCl.value) params.append('career_level', selectedCl.value)
    if (selectedStatus.value) params.append('status', selectedStatus.value)

    const response = await $fetch(`/api/dms/employees?${params}`)

    if (response.success && response.data) {
      employees.value = response.data

      // 전체 직원 수 업데이트 (필터링 전 전체 수를 별도로 조회하지 않고 현재 데이터로 추정)
      // 실제로는 API에서 total count를 반환해야 하지만, 현재는 필터링된 결과의 길이로 설정
      allEmployees.value = response.data.length

      // 매니저 옵션 업데이트
      updateManagerOptions()
    }
  } catch (error) {
    console.error('직원 목록 조회 오류:', error)
    // TODO: 에러 토스트 표시
  } finally {
    isLoading.value = false
  }
}

// 옵션 데이터 조회
const fetchOptions = async () => {
  try {
    const response = await $fetch('/api/dms/employees/options')

    if (response.success && response.data) {
      // 필터용 그룹 옵션에 "전체 그룹" 추가
      groupOptions.value = [
        { value: '', label: '전체 그룹' },
        ...response.data.groups,
      ]

      // 필터용 팀 옵션에 "전체 팀" 추가
      const teamOptionsWithNone = [
        { value: '', label: '전체 팀' },
        ...response.data.teams,
      ]

      allTeamOptions.value = teamOptionsWithNone // 모든 팀 옵션 저장
      teamOptions.value = teamOptionsWithNone // 초기에는 모든 팀 표시

      // 폼용 그룹 옵션에 "선택 안함" 추가
      formGroupOptions.value = [
        { value: '', label: '선택 안함' },
        ...response.data.groups,
      ]

      // 폼용 팀 옵션에 "선택 안함" 추가
      const formTeamOptionsWithNone = [
        { value: '', label: '선택 안함' },
        ...response.data.teams,
      ]

      formAllTeamOptions.value = formTeamOptionsWithNone // 폼용 모든 팀 옵션 저장
      formTeamOptions.value = formTeamOptionsWithNone // 폼용 팀 옵션 초기화

      clOptions.value = response.data.careerLevels
      statusOptions.value = response.data.statusOptions
    }
  } catch (error) {
    console.error('옵션 데이터 조회 오류:', error)
  }
}

// 매니저 옵션 업데이트 (직원 데이터에서 필터링)
const updateManagerOptions = (currentEmployee = null) => {
  try {
    // 현재 직원 목록에서 피플 매니저만 필터링
    const managerCandidates = employees.value.filter(
      emp => emp.is_people_manager && emp.status === 'active'
    )

    let candidates = managerCandidates

    // 수정 모드인 경우 필터링 적용
    if (currentEmployee) {
      candidates = filterManagerCandidates(managerCandidates, currentEmployee)
    }

    managerOptions.value = [
      { value: '', label: '매니저 없음' },
      ...candidates.map(emp => ({
        value: emp.id,
        label: `${emp.name} (${emp.email})`,
      })),
    ]
  } catch (error) {
    console.error('매니저 옵션 업데이트 오류:', error)
  }
}

// 그룹 선택 시 팀 옵션 필터링
const filterTeamsByGroup = groupId => {
  if (groupId) {
    // groupId를 숫자로 변환하여 비교
    const numericGroupId = parseInt(groupId)

    // 필터용 팀 옵션 필터링
    teamOptions.value = allTeamOptions.value.filter(
      team => team.group_id === numericGroupId || team.value === ''
    )

    // 폼용 팀 옵션 필터링
    formTeamOptions.value = formAllTeamOptions.value.filter(
      team => team.group_id === numericGroupId || team.value === ''
    )
  } else {
    teamOptions.value = allTeamOptions.value
    formTeamOptions.value = formAllTeamOptions.value
  }
  // 그룹이 변경되면 팀 선택 초기화
  employeeFormData.team_id = null
}

// 검색
const searchEmployees = () => {
  isSearchExecuted.value = true
  fetchEmployees()
}

// 필터 해제 함수
const resetFilters = () => {
  searchQuery.value = ''
  selectedGroup.value = ''
  selectedTeam.value = ''
  selectedJob.value = ''
  selectedCl.value = ''
  selectedStatus.value = ''
  isSearchExecuted.value = false
  fetchEmployees()
}

// 폼 초기화
const resetEmployeeForm = () => {
  Object.assign(employeeFormData, {
    email: '',
    name: '',
    headquarter_id: 1, // 본부는 항상 1번으로 고정
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

  Object.assign(employeeFormErrors, {
    email: '',
    name: '',
    career_level: '',
  })

  // 폼용 팀 옵션 초기화 (모든 팀 표시)
  formTeamOptions.value = formAllTeamOptions.value
}

// 직원 데이터로 폼 채우기
const fillEmployeeForm = employee => {
  if (employee) {
    Object.assign(employeeFormData, {
      email: employee.email || '',
      name: employee.name || '',
      headquarter_id: 1, // 본부는 항상 1번으로 고정
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

    // 그룹이 있으면 해당 그룹의 팀 목록으로 필터링
    if (employee.group_id) {
      filterTeamsByGroup(employee.group_id)
    } else {
      // 그룹이 없으면 모든 팀 옵션 표시
      formTeamOptions.value = formAllTeamOptions.value
    }
  }
}

// 모달 열림/닫힘 감지
watch(
  () => isModalOpen.value,
  newVal => {
    if (newVal) {
      if (selectedEmployee.value) {
        isEditMode.value = true
        fillEmployeeForm(selectedEmployee.value)
      } else {
        isEditMode.value = false
        resetEmployeeForm()
      }
    }
  }
)

// 모달 관련
const openAddModal = async () => {
  selectedEmployee.value = null
  isModalOpen.value = true

  // 신규 추가 시에는 필터링 없이 모든 피플 매니저 로드
  updateManagerOptions()
}

const editEmployee = async employee => {
  selectedEmployee.value = employee
  isModalOpen.value = true

  // 수정 시에는 현재 직원 기준으로 매니저 옵션 필터링
  updateManagerOptions(employee)
}

const closeModal = () => {
  isModalOpen.value = false
  selectedEmployee.value = null
  resetEmployeeForm()
}

// 폼 제출
const handleEmployeeFormSubmit = async () => {
  // 유효성 검사
  if (!validateEmployeeForm()) {
    return
  }

  isEmployeeFormLoading.value = true

  try {
    // 이메일 처리: @가 없으면 @concentrix.com 추가
    let processedEmail = employeeFormData.email.trim()
    if (processedEmail && !processedEmail.includes('@')) {
      processedEmail = `${processedEmail}@concentrix.com`
    }

    const submitData = {
      ...employeeFormData,
      email: processedEmail,
      headquarter_id: 1, // 본부는 항상 1번으로 고정
      group_id: employeeFormData.group_id
        ? parseInt(employeeFormData.group_id)
        : null,
      team_id: employeeFormData.team_id
        ? parseInt(employeeFormData.team_id)
        : null,
      manager_id: employeeFormData.manager_id
        ? parseInt(employeeFormData.manager_id)
        : null,
      start_date: employeeFormData.start_date || null,
      end_date: employeeFormData.end_date || null,
    }

    if (selectedEmployee.value) {
      // 수정
      await $fetch(`/api/dms/employees/${selectedEmployee.value.id}`, {
        method: 'PUT',
        body: submitData,
      })
    } else {
      // 추가
      await $fetch('/api/dms/employees', {
        method: 'POST',
        body: submitData,
      })
    }

    closeModal()
    await fetchEmployees()

    // TODO: 성공 토스트 표시
  } catch (error) {
    console.error('직원 처리 오류:', error)
    // TODO: 에러 토스트 표시
  } finally {
    isEmployeeFormLoading.value = false
  }
}

// 유효성 검사
const validateEmployeeForm = () => {
  let isValid = true

  // 이메일 검사
  if (!employeeFormData.email || employeeFormData.email.trim().length === 0) {
    employeeFormErrors.email = '이메일을 입력해주세요.'
    isValid = false
  } else {
    const email = employeeFormData.email.trim()

    // @가 있는 경우 도메인 검사
    if (email.includes('@')) {
      const domain = email.split('@')[1]
      if (domain !== 'concentrix.com') {
        employeeFormErrors.email =
          '이메일 도메인은 @concentrix.com이어야 합니다.'
        isValid = false
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        employeeFormErrors.email = '올바른 이메일 형식이 아닙니다.'
        isValid = false
      } else {
        employeeFormErrors.email = ''
      }
    } else {
      // @가 없는 경우 @concentrix.com을 추가한 후 검증
      const emailToValidate = `${email}@concentrix.com`
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailToValidate)) {
        employeeFormErrors.email = '올바른 이메일 형식이 아닙니다.'
        isValid = false
      } else {
        employeeFormErrors.email = ''
      }
    }
  }

  // 이름 검사
  if (!employeeFormData.name || employeeFormData.name.trim().length === 0) {
    employeeFormErrors.name = '이름을 입력해주세요.'
    isValid = false
  } else {
    employeeFormErrors.name = ''
  }

  // 직급 검사
  if (!employeeFormData.career_level) {
    employeeFormErrors.career_level = '직급을 선택해주세요.'
    isValid = false
  } else {
    employeeFormErrors.career_level = ''
  }

  return isValid
}

// 직원 추가/수정 처리 (기존 함수 유지)
const handleEmployeeSubmit = async formData => {
  try {
    isLoading.value = true

    if (selectedEmployee.value) {
      // 수정
      await $fetch(`/api/dms/employees/${selectedEmployee.value.id}`, {
        method: 'PUT',
        body: formData,
      })
    } else {
      // 추가
      await $fetch('/api/dms/employees', {
        method: 'POST',
        body: formData,
      })
    }

    closeModal()
    await fetchEmployees()

    // TODO: 성공 토스트 표시
  } catch (error) {
    console.error('직원 처리 오류:', error)
    // TODO: 에러 토스트 표시
  } finally {
    isLoading.value = false
  }
}

// 직원 삭제 (모달 열기)
const deleteEmployee = employee => {
  deletingEmployeeId.value = employee.id
  deletingEmployee.value = employee
  showDeleteModal.value = true
}

// 삭제 확인 모달 닫기
const closeDeleteModal = () => {
  showDeleteModal.value = false
  deletingEmployeeId.value = null
  deletingEmployee.value = null
}

// 삭제 확인
const confirmDelete = async () => {
  if (!deletingEmployeeId.value) return

  deleting.value = true

  try {
    await $fetch(`/api/dms/employees/${deletingEmployeeId.value}`, {
      method: 'DELETE',
    })

    await fetchEmployees()
    closeDeleteModal()

    // TODO: 성공 토스트 표시
  } catch (error) {
    console.error('직원 삭제 오류:', error)
    // TODO: 에러 토스트 표시
  } finally {
    deleting.value = false
  }
}

// 초기화
onMounted(async () => {
  await Promise.all([fetchOptions(), fetchEmployees()])
})
</script>

<style lang="scss" scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 0;
}

.filter-group {
  @media screen and (min-width: 1200px) {
    min-width: 13.5%;
    .form-group {
      width: 100%;
    }
    &:nth-child(1) {
      min-width: 20%;
      @media (max-width: 1450px) {
        min-width: 15%;
      }
    }
    &:nth-child(2) {
      min-width: calc(13.5% * 2 + 12px);
      .form-group {
        width: calc(50% - 6px);
      }
    }
    &:nth-child(6) {
      /* 검색 버튼 */
      min-width: 90px;
    }
  }
}

table {
  th,
  td {
    white-space: nowrap;
  }
}

.employee-info {
  display: flex;
  gap: 4px;

  .name {
    font-weight: 500;
    color: #111827;
  }

  .manager-badge {
    display: inline-block;
    background-color: #dbeafe;
    color: #1e40af;
    font-size: 11px;
    line-height: 24px;
    font-weight: 500;
    padding: 0;
    border-radius: 50%;
    min-width: 24px;
    width: 24px;
    height: 24px;
    text-align: center;
  }
}

.employee-actions {
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  z-index: 10;
}

// 직원 폼 스타일
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
  + .form-row {
    margin-top: 40px;
    border-top: 1px solid #ddd;
    padding-top: 20px;
  }
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

// 반응형 디자인
@media (max-width: 768px) {
  .employee-actions {
    flex-direction: column;
    gap: 8px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
