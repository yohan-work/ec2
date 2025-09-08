<template>
  <TitleArea title="SSO">
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
        <span>SSO 설정 관리</span>
      </div>
    </template>
    <template #right>
      <div class="right-content">
        <Button variant="primary" size="md"> SSO 설정 추가 </Button>
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
import Badge from '~/components/ui/Badge.vue'
import Table from '~/components/ui/Table.vue'
import { useYear } from '~/composables/useYear'

definePageMeta({
  layout: 'delivery',
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
  { key: 'name', label: '설정명' },
  { key: 'type', label: '타입' },
  { key: 'status', label: '상태' },
  { key: 'lastSync', label: '마지막 동기화' },
  { key: 'users', label: '연동 사용자 수' },
  { key: 'actions', label: '작업' },
]

const tableData = ref([
  {
    name: 'AD Primary',
    type: 'Active Directory',
    status: '활성',
    lastSync: '2024-01-15 14:30',
    users: 156,
    actions: '관리',
  },
  {
    name: 'Google Workspace',
    type: 'OAuth 2.0',
    status: '활성',
    lastSync: '2024-01-15 14:25',
    users: 89,
    actions: '관리',
  },
  {
    name: 'SAML Provider',
    type: 'SAML 2.0',
    status: '비활성',
    lastSync: '2024-01-10 09:15',
    users: 0,
    actions: '관리',
  },
])

const isLoading = ref(false)
</script>

<style lang="scss" scoped>
.sso-content {
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
  gap: 32px;
}

.sso-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.sso-card {
  padding: 20px;
  border: 1px solid #e5e7eb;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;

    h4 {
      font-size: 18px;
      font-weight: 600;
      color: #1f2937;
      margin: 0;
    }
  }

  .card-content {
    p {
      color: #6b7280;
      font-size: 14px;
      margin-bottom: 16px;
    }

    .card-actions {
      display: flex;
      gap: 8px;
    }
  }
}

.settings-section {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  h4 {
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 16px;
  }
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
