<template>
  <TitleArea title="Staff(Utility)"> </TitleArea>
  <ContentsArea>
    <div class="main-container">
      <div class="main-container-header">
        <div class="select-year">
          <Select
            v-model="selectedYear"
            :options="yearOptions"
            placeholder="Year"
            @update:modelValue="handleYearChange"
          />
        </div>
        <div class="filter-buttons">
          <Tab v-model="activeTab" :tabs="tabs" @change="onTabChange" />
        </div>
        <div class="edit-button">
          <Button variant="blue" :size="40" :padding="16">
            <div v-html="editSvg"></div>
            Edit
          </Button>
        </div>
      </div>
      <p>Contents</p>
    </div>
  </ContentsArea>
</template>

<script setup>
import editSvg from '~/components/assets/delivery/icons/edit.svg?raw'
import TitleArea from '~/components/delivery/TitleArea.vue'
import ContentsArea from '~/components/delivery/ContentsArea.vue'
import Select from '~/components/ui/Select.vue'
import Button from '~/components/ui/Button.vue'
import Tab from '~/components/ui/TabButton.vue'
import { onMounted } from 'vue'
import { useYear } from '~/composables/useYear'

definePageMeta({
  layout: 'delivery',
})

const activeTab = ref('all')
const tabs = computed(() => [
  { label: 'All', value: 'all' },
  { label: 'My Staff', value: 'my-staff' },
])

// 연도 관련 로직
const { selectedYear, yearOptions, setSelectedYear, resetToCurrentYear } =
  useYear()

// 페이지 로드 시 올해로 리셋
onMounted(() => {
  resetToCurrentYear()
})

// 연도 변경 핸들러
const handleYearChange = year => {
  setSelectedYear(year)
}

// 탭 변경 핸들러
const onTabChange = (value, tab, index) => {
  console.log('탭 변경:', { value, tab, index })
  // 탭 변경 로직을 여기에 추가할 수 있습니다
}
</script>

<style lang="scss" scoped>
/* 스타일이 필요한 경우 여기에 추가 */
.main-container {
  position: relative;
  width: 100%;
  height: 100%;
  bottom: 0;
  border-radius: 20px 20px 0px 0px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #fff;
  padding: 24px 32px;
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }
}
</style>
