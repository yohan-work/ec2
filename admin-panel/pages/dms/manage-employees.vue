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
    <MainContainer>
      <Table>
        <thead>
          <tr>
            <th>이름</th>
          </tr>
        </thead>
      </Table>
    </MainContainer>
  </ContentsArea>
</template>

<script setup>
import addSvg from '~/components/assets/dms/icons/add.svg?raw'
import TitleArea from '~/components/dms/TitleArea.vue'
import ContentsArea from '~/components/dms/ContentsArea.vue'
import MainContainer from '~/components/dms/MainContainer.vue'
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

<style lang="scss" scoped></style>
