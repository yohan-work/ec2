<template>
  <TitleArea title="권한 관리">
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
        <span>권한 관리</span>
      </div>
    </template>
    <template #right>
      <div class="right-content">
        <Button variant="outline" :size="36"> 필터 </Button>
        <Button variant="primary" :size="36"> 새 권한 추가 </Button>
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
  { key: 'permissionName', label: '권한명' },
  { key: 'description', label: '설명' },
  { key: 'category', label: '카테고리' },
  { key: 'userCount', label: '사용자 수' },
  { key: 'status', label: '상태' },
  { key: 'actions', label: '작업' },
]

const tableData = ref([
  {
    permissionName: '사용자 관리',
    description: '사용자 정보 조회, 수정, 삭제',
    category: '관리',
    userCount: 5,
    status: '활성',
    actions: '관리',
  },
  {
    permissionName: '프로젝트 조회',
    description: '프로젝트 정보 조회',
    category: '조회',
    userCount: 25,
    status: '활성',
    actions: '관리',
  },
])

const isLoading = ref(false)
</script>

<style lang="scss" scoped>
.permissions-content {
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
