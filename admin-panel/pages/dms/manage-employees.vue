<template>
  <TitleArea title="직원 관리">
    <template #right>
      <div class="right-content">
        <Button variant="blue" :size="38">
          <div v-html="addSvg"></div>
          신규 직원 추가
        </Button>
      </div>
    </template>
  </TitleArea>
  <ContentsArea>
    <p>내용</p>
  </ContentsArea>
</template>

<script setup>
import addSvg from '~/components/assets/dms/icons/add.svg?raw'
import TitleArea from '~/components/dms/TitleArea.vue'
import ContentsArea from '~/components/dms/ContentsArea.vue'
import Button from '~/components/ui/Button.vue'
import { useYear } from '~/composables/useYear'
import { onMounted } from 'vue'

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

// 테이블 데이터
const tableHeaders = [
  { key: 'name', label: '이름' },
  { key: 'employeeId', label: '사번' },
  { key: 'department', label: '부서' },
  { key: 'position', label: '직급' },
  { key: 'email', label: '이메일' },
  { key: 'status', label: '상태' },
  { key: 'actions', label: '작업' },
]

const tableData = ref([
  {
    name: '김철수',
    employeeId: 'EMP001',
    department: '개발팀',
    position: '팀장',
    email: 'kim@company.com',
    status: '활성',
    actions: '관리',
  },
  {
    name: '이영희',
    employeeId: 'EMP002',
    department: '마케팅팀',
    position: '대리',
    email: 'lee@company.com',
    status: '활성',
    actions: '관리',
  },
])

const isLoading = ref(false)
</script>

<style lang="scss" scoped>
.employees-content {
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
