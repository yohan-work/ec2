<template>
  <TitleArea title="Staff(Utility)">
    <template #center>
      <div class="center-content">
        <div class="filter-buttons">
          <Tab v-model="activeTab" :tabs="tabs" @change="onTabChange" />
        </div>
      </div>
    </template>
    <template #right>
      <div class="right-content">
        <Select
          v-model="selectedYear"
          :options="yearOptions"
          placeholder="Year"
          @update:modelValue="handleYearChange"
        />
        <Button variant="blue" :size="40" :padding="16">
          <div v-html="editSvg"></div>
          Edit
        </Button>
      </div>
    </template>
  </TitleArea>
  <ContentsArea>
    <div class="main-container">
      <Table>
        <thead>
          <tr>
            <th rowspan="2" colspan="7"></th>
            <th>Total</th>
            <th>Total HC</th>
            <th>Utilization(%)</th>
            <th>Total</th>
            <th>Total HC</th>
            <th>Utilization(%)</th>
            <th>Total</th>
            <th>Total HC</th>
            <th>Utilization(%)</th>
            <th>Total</th>
            <th>Total HC</th>
            <th>Utilization(%)</th>
            <th>Total</th>
            <th>Total HC</th>
            <th>Utilization(%)</th>
            <th>Total</th>
            <th>Total HC</th>
            <th>Utilization(%)</th>
            <th>Total</th>
            <th>Total HC</th>
            <th>Utilization(%)</th>
            <th>Total</th>
            <th>Total HC</th>
            <th>Utilization(%)</th>
            <th>Total</th>
            <th>Total HC</th>
            <th>Utilization(%)</th>
            <th>Total</th>
            <th>Total HC</th>
            <th>Utilization(%)</th>
            <th>Total</th>
            <th>Total HC</th>
            <th>Utilization(%)</th>
            <th>Total</th>
            <th>Total HC</th>
            <th>Utilization(%)</th>
          </tr>
          <tr>
            <td>40</td>
            <td>50</td>
            <td>80%</td>
            <td>40</td>
            <td>50</td>
            <td>80%</td>
            <td>40</td>
            <td>50</td>
            <td>80%</td>
            <td>40</td>
            <td>50</td>
            <td>80%</td>
            <td>40</td>
            <td>50</td>
            <td>80%</td>
            <td>40</td>
            <td>50</td>
            <td>80%</td>
            <td>40</td>
            <td>50</td>
            <td>80%</td>
            <td>40</td>
            <td>50</td>
            <td>80%</td>
            <td>40</td>
            <td>50</td>
            <td>80%</td>
            <td>40</td>
            <td>50</td>
            <td>80%</td>
            <td>40</td>
            <td>50</td>
            <td>80%</td>
            <td>40</td>
            <td>50</td>
            <td>80%</td>
          </tr>
          <tr>
            <th rowspan="2">그룹</th>
            <th rowspan="2">매니저</th>
            <th rowspan="2">이름</th>
            <th rowspan="2">직급</th>
            <th rowspan="2">직무</th>
            <th rowspan="2">CL</th>
            <th rowspan="2">변동사항</th>
            <th colspan="3">1월</th>
            <th colspan="3">2월</th>
            <th colspan="3">3월</th>
            <th colspan="3">4월</th>
            <th colspan="3">5월</th>
            <th colspan="3">6월</th>
            <th colspan="3">7월</th>
            <th colspan="3">8월</th>
            <th colspan="3">9월</th>
            <th colspan="3">10월</th>
            <th colspan="3">11월</th>
            <th colspan="3">12월</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
          </tr>
        </tbody>
      </Table>
    </div>
  </ContentsArea>
</template>

<script setup>
import editSvg from '~/components/assets/dms/icons/edit.svg?raw'
import TitleArea from '~/components/dms/TitleArea.vue'
import ContentsArea from '~/components/dms/ContentsArea.vue'
import Select from '~/components/ui/Select.vue'
import Button from '~/components/ui/Button.vue'
import Table from '~/components/ui/Table.vue'
import Tab from '~/components/ui/TabButton.vue'
import { onMounted } from 'vue'
import { useYear } from '~/composables/useYear'

definePageMeta({
  layout: 'dms',
  ssr: false,
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

.main-container {
  position: relative;
  width: 100%;
  height: 100%;
  bottom: 0;
  border-radius: 20px 20px 0px 0px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #fff;
  padding: 24px 32px 0;
  thead tr:first-child th {
    &:first-child {
      &:before {
        opacity: 0;
      }
    }
  }
}
</style>
