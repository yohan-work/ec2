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
        <!-- <span>SSO 설정 관리</span> -->
      </div>
    </template>
    <template #right>
      <div class="right-content">
        <!-- <Button variant="primary" :size="36"> SSO 설정 추가 </Button> -->
      </div>
    </template>
  </TitleArea>
  <ContentsArea>
    <div class="main-container">
      <Table>
        <thead>
          <tr>
            <th>Account</th>
            <th>Project Name</th>
            <th>MSA</th>
            <th>MSA Code</th>
            <th>MSA Description</th>
            <th>Competency</th>
            <th>Roadmap</th>
            <th>Vendor</th>
            <th>Service Month</th>
            <th>담당별 확인 필요</th>
            <th>사용여부</th>
            <th>Total</th>
            <th>1월</th>
            <th>2월</th>
            <th>3월</th>
            <th>4월</th>
            <th>5월</th>
            <th>6월</th>
            <th>7월</th>
            <th>8월</th>
            <th>9월</th>
            <th>10월</th>
            <th>11월</th>
            <th>12월</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>AccountA</td>
            <td>Project Apollo</td>
            <td>Y</td>
            <td>MSA001</td>
            <td>MSA 계약 설명</td>
            <td>Competency1</td>
            <td>2024 Roadmap</td>
            <td>VendorA</td>
            <td>12</td>
            <td>확인 필요</td>
            <td>사용</td>
            <td>120</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
          </tr>
          <tr>
            <td>AccountA</td>
            <td>Project Apollo</td>
            <td>Y</td>
            <td>MSA001</td>
            <td>MSA 계약 설명</td>
            <td>Competency1</td>
            <td>2024 Roadmap</td>
            <td>VendorA</td>
            <td>12</td>
            <td>확인 필요</td>
            <td>사용</td>
            <td>120</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
          </tr>
          <tr>
            <td>AccountA</td>
            <td>Project Apollo</td>
            <td>Y</td>
            <td>MSA001</td>
            <td>MSA 계약 설명</td>
            <td>Competency1</td>
            <td>2024 Roadmap</td>
            <td>VendorA</td>
            <td>12</td>
            <td>확인 필요</td>
            <td>사용</td>
            <td>120</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
          </tr>
          <tr>
            <td>AccountA</td>
            <td>Project Apollo</td>
            <td>Y</td>
            <td>MSA001</td>
            <td>MSA 계약 설명</td>
            <td>Competency1</td>
            <td>2024 Roadmap</td>
            <td>VendorA</td>
            <td>12</td>
            <td>확인 필요</td>
            <td>사용</td>
            <td>120</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
          </tr>
          <tr>
            <td>AccountA</td>
            <td>Project Apollo</td>
            <td>Y</td>
            <td>MSA001</td>
            <td>MSA 계약 설명</td>
            <td>Competency1</td>
            <td>2024 Roadmap</td>
            <td>VendorA</td>
            <td>12</td>
            <td>확인 필요</td>
            <td>사용</td>
            <td>120</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
          </tr>
        </tbody>
      </Table>
    </div>
  </ContentsArea>
</template>

<script setup>
import TitleArea from '~/components/delivery/TitleArea.vue'
import ContentsArea from '~/components/delivery/ContentsArea.vue'
import Select from '~/components/ui/Select.vue'
import Button from '~/components/ui/Button.vue'
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
const { selectedYear, yearOptions, setSelectedYear, resetToCurrentYear } =
  useYear()

// 연도 변경 핸들러
const handleYearChange = year => {
  setSelectedYear(year)
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
  padding: 24px 32px 0;
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
