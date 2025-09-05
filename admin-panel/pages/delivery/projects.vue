<template>
  <DeliveryLayout>
    <TitleArea title="프로젝트 관리">
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
          <span>프로젝트 관리</span>
        </div>
      </template>
      <template #right>
        <div class="right-content">
          <Button variant="outline" size="md"> 필터 </Button>
          <Button variant="primary" size="md"> 새 프로젝트 추가 </Button>
        </div>
      </template>
    </TitleArea>
    <ContentsArea>
      <p>내용</p>
    </ContentsArea>
  </DeliveryLayout>
</template>

<script setup>
import DeliveryLayout from '~/components/layouts/delivery.vue'
import TitleArea from '~/components/delivery/TitleArea.vue'
import ContentsArea from '~/components/delivery/ContentsArea.vue'
import Select from '~/components/ui/Select.vue'
import Button from '~/components/ui/Button.vue'
import Card from '~/components/ui/Card.vue'
import Table from '~/components/ui/Table.vue'
import { useYear } from '~/composables/useYear'

definePageMeta({
  layout: false,
})

// 연도 관련 로직
const { selectedYear, setSelectedYear } = useYear()

// 사용 가능한 연도 목록 (최근 10년)
const currentYear = new Date().getFullYear()
const availableYears = Array.from({ length: 10 }, (_, i) => currentYear - i)

// Select 컴포넌트용 옵션 형식으로 변환
const yearOptions = availableYears.map(year => ({
  value: year,
  label: `${year}년`,
}))

// 연도 변경 핸들러
const handleYearChange = year => {
  setSelectedYear(year)
}

// 테이블 데이터
const tableHeaders = [
  { key: 'projectName', label: '프로젝트명' },
  { key: 'client', label: '고객사' },
  { key: 'status', label: '상태' },
  { key: 'startDate', label: '시작일' },
  { key: 'endDate', label: '종료일' },
  { key: 'progress', label: '진행률' },
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
    actions: '관리',
  },
  {
    projectName: 'Project Beta',
    client: 'XYZ Inc',
    status: '완료',
    startDate: '2023-10-01',
    endDate: '2024-01-15',
    progress: '100%',
    actions: '보기',
  },
])

const isLoading = ref(false)
</script>

<style lang="scss" scoped>
.projects-content {
  padding: 24px;
}

.content-header {
  margin-bottom: 24px;

  h3 {
    font-size: 24px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 8px;
  }

  p {
    color: #6b7280;
    font-size: 14px;
  }
}

.content-body {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.stat-card {
  padding: 20px;

  .stat-content {
    text-align: center;

    h4 {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 8px;
      font-weight: 500;
    }

    .stat-number {
      font-size: 28px;
      font-weight: 700;
      color: #1f2937;
    }
  }
}

.table-section {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.center-content {
  display: flex;
  align-items: center;
  font-weight: 500;
  color: #374151;
}

.right-content {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
