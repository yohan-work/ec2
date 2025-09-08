<template>
  <TitleArea title="Project MM">
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
        <span>Project MM 관리</span>
      </div>
    </template>
    <template #right>
      <div class="right-content">
        <Button variant="primary" :size="36"> 새 프로젝트 MM 추가 </Button>
      </div>
    </template>
  </TitleArea>
  <ContentsArea>
    <p>내용</p>
  </ContentsArea>
</template>

<script setup>
import TitleArea from '~/components/delivery/TitleArea.vue'
import ContentsArea from '~/components/delivery/ContentsArea.vue'
import Select from '~/components/ui/Select.vue'
import Button from '~/components/ui/Button.vue'
import Card from '~/components/ui/Card.vue'
import Table from '~/components/ui/Table.vue'
import { useYear } from '~/composables/useYear'
import { onMounted } from 'vue'

definePageMeta({
  layout: 'delivery',
})

// 연도 관련 로직

// 페이지 로드 시 올해로 리셋
onMounted(() => {
  resetToCurrentYear()
})
const { selectedYear, yearOptions, setSelectedYear, resetToCurrentYear } = useYear()

// 연도 변경 핸들러
const handleYearChange = year => {
  setSelectedYear(year)
}

// 테이블 데이터
const tableHeaders = [
  { key: 'projectName', label: '프로젝트명' },
  { key: 'client', label: '고객사' },
  { key: 'totalMM', label: '총 MM' },
  { key: 'usedMM', label: '사용 MM' },
  { key: 'remainingMM', label: '잔여 MM' },
  { key: 'status', label: '상태' },
  { key: 'actions', label: '작업' },
]

const tableData = ref([
  {
    projectName: 'Project Alpha',
    client: 'ABC Corp',
    totalMM: 12.5,
    usedMM: 8.2,
    remainingMM: 4.3,
    status: '진행중',
    actions: '수정',
  },
  {
    projectName: 'Project Beta',
    client: 'XYZ Inc',
    totalMM: 24.0,
    usedMM: 24.0,
    remainingMM: 0.0,
    status: '완료',
    actions: '보기',
  },
  {
    projectName: 'Project Gamma',
    client: 'DEF Ltd',
    totalMM: 18.5,
    usedMM: 5.1,
    remainingMM: 13.4,
    status: '진행중',
    actions: '수정',
  },
])

const isLoading = ref(false)
</script>

<style lang="scss" scoped>
.project-mm-content {
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
