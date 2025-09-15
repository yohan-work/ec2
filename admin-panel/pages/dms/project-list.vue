<template>
  <TitleArea title="Project List">
    <template #left>
      <Select
        v-model="selectedYear"
        :options="yearOptions"
        placeholder="연도 선택"
        @update:modelValue="handleYearChange"
      />
    </template>
    <template #center>
      <div class="center-content">
        <span>프로젝트 목록 관리</span>
      </div>
    </template>
    <template #right>
      <div class="right-content">
        <Button variant="outline" :size="36"> 필터 </Button>
        <Button variant="primary" :size="36"> 새 프로젝트 추가 </Button>
      </div>
    </template>
  </TitleArea>
  <ContentsArea>
    <MainContainer>
      <Table>
        <thead>
          <tr>
            <th>Account</th>
            <th>Deal Name KR</th>
            <th>Deal Name</th>
            <th>MSA</th>
            <th>Term</th>
            <th>Start</th>
            <th>End</th>
            <th>사용여부</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Samsung</td>
            <td>삼성 반도체 브랜드데스크</td>
            <td>Renewal_FY24: Semi-conductor brand desk operation</td>
            <td>DOPDGNSEC</td>
            <td>12</td>
            <td>2024-01-01</td>
            <td>2024-12-31</td>
            <td>사용</td>
          </tr>
        </tbody>
      </Table>
    </MainContainer>
  </ContentsArea>
</template>

<script setup>
import TitleArea from '~/components/dms/TitleArea.vue'
import ContentsArea from '~/components/dms/ContentsArea.vue'
import MainContainer from '~/components/dms/MainContainer.vue'
import Select from '~/components/ui/Select.vue'
import Button from '~/components/ui/Button.vue'
import Table from '~/components/ui/Table.vue'
import { useYear } from '~/composables/useYear'
import { onMounted } from 'vue'
import { computed, ref } from 'vue'

definePageMeta({
  layout: 'dms',
  ssr: false,
})

// 연도 관련 로직

// 페이지 로드 시 올해로 리셋
onMounted(() => {
  resetToCurrentYear()
})
const { selectedYear, yearOptions, setSelectedYear, resetToCurrentYear } =
  useYear()

// 연도 변경 핸들러
const handleYearChange = year => {
  setSelectedYear(year)
}

// 필터 상태
const statusFilter = ref('')
const clientFilter = ref('')
const searchQuery = ref('')

// 필터 옵션
const statusOptions = [
  { value: '', label: '전체' },
  { value: 'active', label: '진행중' },
  { value: 'completed', label: '완료' },
  { value: 'paused', label: '보류' },
  { value: 'cancelled', label: '취소' },
]

const clientOptions = [
  { value: '', label: '전체' },
  { value: 'abc-corp', label: 'ABC Corp' },
  { value: 'xyz-inc', label: 'XYZ Inc' },
  { value: 'def-ltd', label: 'DEF Ltd' },
  { value: 'ghi-co', label: 'GHI Co' },
]

// 테이블 데이터
const tableHeaders = [
  { key: 'projectName', label: '프로젝트명' },
  { key: 'client', label: '고객사' },
  { key: 'status', label: '상태' },
  { key: 'startDate', label: '시작일' },
  { key: 'endDate', label: '종료일' },
  { key: 'progress', label: '진행률' },
  { key: 'budget', label: '예산' },
  { key: 'actions', label: '작업' },
]

const tableData = ref([
  {
    projectName: 'Project Alpha',
    client: 'ABC Corp',
    status: '진행중',
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    progress: '75%',
    budget: '$50,000',
    actions: '관리',
  },
  {
    projectName: 'Project Beta',
    client: 'XYZ Inc',
    status: '완료',
    startDate: '2023-10-01',
    endDate: '2024-01-15',
    progress: '100%',
    budget: '$75,000',
    actions: '보기',
  },
  {
    projectName: 'Project Gamma',
    client: 'DEF Ltd',
    status: '진행중',
    startDate: '2024-02-01',
    endDate: '2024-08-31',
    progress: '45%',
    budget: '$120,000',
    actions: '관리',
  },
  {
    projectName: 'Project Delta',
    client: 'GHI Co',
    status: '보류',
    startDate: '2024-03-01',
    endDate: '2024-09-30',
    progress: '20%',
    budget: '$90,000',
    actions: '관리',
  },
])

// 필터링된 테이블 데이터
const filteredTableData = computed(() => {
  let filtered = tableData.value

  if (statusFilter.value) {
    const statusMap = {
      active: '진행중',
      completed: '완료',
      paused: '보류',
      cancelled: '취소',
    }
    filtered = filtered.filter(
      item => item.status === statusMap[statusFilter.value]
    )
  }

  if (clientFilter.value) {
    const clientMap = {
      'abc-corp': 'ABC Corp',
      'xyz-inc': 'XYZ Inc',
      'def-ltd': 'DEF Ltd',
      'ghi-co': 'GHI Co',
    }
    filtered = filtered.filter(
      item => item.client === clientMap[clientFilter.value]
    )
  }

  if (searchQuery.value) {
    filtered = filtered.filter(item =>
      item.projectName.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  return filtered
})

const isLoading = ref(false)
</script>

<style lang="scss" scoped>
/* 스타일이 필요한 경우 여기에 추가 */
.main-container {
  thead tr {
    &:first-child th {
      &:nth-child(2),
      &:nth-child(10) {
        text-align: left;
        min-width: 200px;
      }
    }
  }
  tbody td {
    text-align: center;
    white-space: nowrap;
    &:nth-child(2),
    &:nth-child(10) {
      text-align: left;
    }
  }
}
</style>
