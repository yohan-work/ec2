<template>
  <TitleArea title="Staff(Utility)">
    <template #left>
      <Select
        v-model="selectedYear"
        :options="yearOptions"
        placeholder="연도 선택"
        @update:modelValue="handleYearChange"
      />
    </template>
    <template #center>1</template>
    <template #right> 2 </template>
  </TitleArea>
  <ContentsArea>
    <p>내용</p>
  </ContentsArea>
</template>

<script setup>
import TitleArea from '~/components/delivery/TitleArea.vue'
import ContentsArea from '~/components/delivery/ContentsArea.vue'
import Select from '~/components/ui/Select.vue'
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
</script>

<style lang="scss" scoped>
/* 스타일이 필요한 경우 여기에 추가 */
</style>
