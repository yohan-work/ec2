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
            :options="jobOptions"
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

      <div class="table-section">
        <div class="table-header"></div>
      </div>

      <div v-if="isLoading" class="loading-container">
        <Loading />
      </div>

      <div v-else-if="employees.length === 0" class="empty-container">
        <p>등록된 직원이 없습니다.</p>
      </div>

      <Table v-else>
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
                  >매니저</span
                >
                <span v-if="employee.is_on_leave" class="leave-badge"
                  >휴직</span
                >
              </div>
            </td>
            <td>{{ employee.group_id ? `그룹 ${employee.group_id}` : '-' }}</td>
            <td>{{ employee.team_id ? `팀 ${employee.team_id}` : '-' }}</td>
            <td>{{ employee.manager_name || '-' }}</td>
            <td>{{ employee.job_role || '-' }}</td>
            <td>{{ employee.career_level || '-' }}</td>
            <td>{{ employee.email }}</td>
            <td>
              <Badge :variant="getStatusVariant(employee.status)">
                {{ employee.status_label || getStatusLabel(employee.status) }}
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
  <EmployeeModal
    :show="isModalOpen"
    :employee="selectedEmployee"
    :groupOptions="groupOptions"
    :teamOptions="teamOptions"
    :managerOptions="managerOptions"
    :statusOptions="statusOptions"
    @close="closeModal"
    @submit="handleEmployeeSubmit"
  />

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
import Button from '~/components/ui/Button.vue'
import Input from '~/components/ui/Input.vue'
import Select from '~/components/ui/Select.vue'
import Table from '~/components/ui/Table.vue'
import Badge from '~/components/ui/Badge.vue'
import Loading from '~/components/ui/Loading.vue'
import EmployeeModal from '~/components/dms/EmployeeModal.vue'
import ConfirmModal from '~/components/ui/ConfirmModal.vue'
import { ref, reactive, onMounted, computed } from 'vue'
import { getStatusLabel, getStatusCodeColor } from '~/utils/dms/employee-utils'

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
const groupOptions = ref([])
const teamOptions = ref([])
const jobOptions = ref([])
const clOptions = ref([])
const statusOptions = ref([])
const managerOptions = ref([])

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

// 직원 목록 조회
// 전체 직원 수 가져오기 (필터링 전)
const fetchAllEmployeesCount = async () => {
  try {
    const { data } = await $fetch('/api/dms/employees')
    if (data) {
      allEmployees.value = data.employees.length
    }
  } catch (error) {
    console.error('전체 직원 수 조회 오류:', error)
  }
}

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

    const { data } = await $fetch(`/api/dms/employees?${params}`)

    if (data) {
      employees.value = data.employees
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
    const { data } = await $fetch('/api/dms/employees/options')

    if (data) {
      groupOptions.value = data.groups
      teamOptions.value = data.teams
      jobOptions.value = data.jobRoles
      clOptions.value = data.careerLevels
      statusOptions.value = data.statusOptions
    }
  } catch (error) {
    console.error('옵션 데이터 조회 오류:', error)
  }
}

// 매니저 옵션 조회
const fetchManagerOptions = async () => {
  try {
    const { data } = await $fetch('/api/dms/employees?limit=1000&status=active')

    if (data) {
      managerOptions.value = data.employees
        .filter(emp => emp.is_people_manager)
        .map(emp => ({
          value: emp.id,
          label: `${emp.name} (${emp.email})`,
        }))
    }
  } catch (error) {
    console.error('매니저 옵션 조회 오류:', error)
  }
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

// 모달 관련
const openAddModal = () => {
  console.log('신규 직원 추가 모달 열기')
  selectedEmployee.value = null
  isModalOpen.value = true
}

const editEmployee = employee => {
  selectedEmployee.value = employee
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedEmployee.value = null
}

// 직원 추가/수정 처리
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
  await Promise.all([
    fetchOptions(),
    fetchManagerOptions(),
    fetchAllEmployeesCount(),
    fetchEmployees(),
  ])
})
</script>

<style lang="scss" scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 0;
}

.empty-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 0;

  p {
    color: #6b7280;
    font-size: 16px;
  }
}

.employee-info {
  display: flex;
  flex-direction: column;
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
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: 500;
  }

  .leave-badge {
    display: inline-block;
    background-color: #fef3c7;
    color: #d97706;
    font-size: 11px;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: 500;
  }
}

.employee-actions {
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  z-index: 10;
}

// 반응형 디자인
@media (max-width: 768px) {
  .employee-actions {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
