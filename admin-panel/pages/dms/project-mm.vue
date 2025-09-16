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
    <MainContainer>
      <Table>
        <thead>
          <tr>
            <th rowspan="3">사업부/팀</th>
            <th rowspan="3" class="border-sticky-right">영문 계약 명</th>
            <th rowspan="3">MSA</th>
            <th rowspan="3" class="border-right">Type</th>
            <th colspan="2" rowspan="2" class="border-right">Project 기간</th>
            <th colspan="2" rowspan="2" class="border-right">계약금액</th>
            <th rowspan="3">단위</th>
            <th rowspan="3">계약 여부</th>
            <th rowspan="3">상태</th>
            <th rowspan="3" class="border-right">Remark</th>
            <th colspan="12">
              <div class="month-cell">
                <div class="month-cell-title">Total</div>
              </div>
            </th>
            <th colspan="13">
              <div class="month-cell">
                <div class="month-cell-title">1월</div>
              </div>
            </th>
            <th colspan="13">
              <div class="month-cell">
                <div class="month-cell-title">2월</div>
              </div>
            </th>
            <th colspan="13">
              <div class="month-cell">
                <div class="month-cell-title">3월</div>
              </div>
            </th>
            <th colspan="13">
              <div class="month-cell">
                <div class="month-cell-title">4월</div>
              </div>
            </th>
            <th colspan="13">
              <div class="month-cell">
                <div class="month-cell-title">5월</div>
              </div>
            </th>
            <th colspan="13">
              <div class="month-cell">
                <div class="month-cell-title">6월</div>
              </div>
            </th>
            <th colspan="13">
              <div class="month-cell">
                <div class="month-cell-title">7월</div>
              </div>
            </th>
            <th colspan="13">
              <div class="month-cell">
                <div class="month-cell-title">8월</div>
              </div>
            </th>
            <th colspan="13">
              <div class="month-cell">
                <div class="month-cell-title">9월</div>
              </div>
            </th>
            <th colspan="13">
              <div class="month-cell">
                <div class="month-cell-title">10월</div>
              </div>
            </th>
            <th colspan="13">
              <div class="month-cell">
                <div class="month-cell-title">11월</div>
              </div>
            </th>
            <th colspan="13">
              <div class="month-cell">
                <div class="month-cell-title">12월</div>
              </div>
            </th>
          </tr>
          <tr>
            <th colspan="6" class="border-right">CPT MM</th>
            <th colspan="6" class="border-right">실투입 MM</th>
            <th colspan="6" class="border-right">CPT MM</th>
            <th colspan="6" class="border-right">실투입 MM</th>
            <th rowspan="2" class="border-right">Labor Cost</th>
            <th colspan="6" class="border-right">CPT MM</th>
            <th colspan="6" class="border-right">실투입 MM</th>
            <th rowspan="2" class="border-right">Labor Cost</th>
            <th colspan="6" class="border-right">CPT MM</th>
            <th colspan="6" class="border-right">실투입 MM</th>
            <th rowspan="2" class="border-right">Labor Cost</th>
            <th colspan="6" class="border-right">CPT MM</th>
            <th colspan="6" class="border-right">실투입 MM</th>
            <th rowspan="2" class="border-right">Labor Cost</th>
            <th colspan="6" class="border-right">CPT MM</th>
            <th colspan="6" class="border-right">실투입 MM</th>
            <th rowspan="2" class="border-right">Labor Cost</th>
            <th colspan="6" class="border-right">CPT MM</th>
            <th colspan="6" class="border-right">실투입 MM</th>
            <th rowspan="2" class="border-right">Labor Cost</th>
            <th colspan="6" class="border-right">CPT MM</th>
            <th colspan="6" class="border-right">실투입 MM</th>
            <th rowspan="2" class="border-right">Labor Cost</th>
            <th colspan="6" class="border-right">CPT MM</th>
            <th colspan="6" class="border-right">실투입 MM</th>
            <th rowspan="2" class="border-right">Labor Cost</th>
            <th colspan="6" class="border-right">CPT MM</th>
            <th colspan="6" class="border-right">실투입 MM</th>
            <th rowspan="2" class="border-right">Labor Cost</th>
            <th colspan="6" class="border-right">CPT MM</th>
            <th colspan="6" class="border-right">실투입 MM</th>
            <th rowspan="2" class="border-right">Labor Cost</th>
            <th colspan="6" class="border-right">CPT MM</th>
            <th colspan="6" class="border-right">실투입 MM</th>
            <th rowspan="2" class="border-right">Labor Cost</th>
            <th colspan="6" class="border-right">CPT MM</th>
            <th colspan="6" class="border-right">실투입 MM</th>
            <th rowspan="2" class="border-right">Labor Cost</th>
          </tr>
          <tr>
            <th>from</th>
            <th class="border-right">to</th>
            <th>Total ECR</th>
            <th class="border-right">CiX Rev</th>
            <th>CL6</th>
            <th>CL7</th>
            <th>CL8B</th>
            <th>CL8A</th>
            <th>CL9B</th>
            <th class="border-right">CL9A</th>
            <th>CL6</th>
            <th>CL7</th>
            <th>CL8B</th>
            <th>CL8A</th>
            <th>CL9B</th>
            <th class="border-right">CL9A</th>
            <th>CL6</th>
            <th>CL7</th>
            <th>CL8B</th>
            <th>CL8A</th>
            <th>CL9B</th>
            <th class="border-right">CL9A</th>
            <th>CL6</th>
            <th>CL7</th>
            <th>CL8B</th>
            <th>CL8A</th>
            <th>CL9B</th>
            <th class="border-right">CL9A</th>
            <th>CL6</th>
            <th>CL7</th>
            <th>CL8B</th>
            <th>CL8A</th>
            <th>CL9B</th>
            <th class="border-right">CL9A</th>
            <th>CL6</th>
            <th>CL7</th>
            <th>CL8B</th>
            <th>CL8A</th>
            <th>CL9B</th>
            <th class="border-right">CL9A</th>
            <th>CL6</th>
            <th>CL7</th>
            <th>CL8B</th>
            <th>CL8A</th>
            <th>CL9B</th>
            <th class="border-right">CL9A</th>
            <th>CL6</th>
            <th>CL7</th>
            <th>CL8B</th>
            <th>CL8A</th>
            <th>CL9B</th>
            <th class="border-right">CL9A</th>
            <th>CL6</th>
            <th>CL7</th>
            <th>CL8B</th>
            <th>CL8A</th>
            <th>CL9B</th>
            <th class="border-right">CL9A</th>
            <th>CL6</th>
            <th>CL7</th>
            <th>CL8B</th>
            <th>CL8A</th>
            <th>CL9B</th>
            <th class="border-right">CL9A</th>
            <th>CL6</th>
            <th>CL7</th>
            <th>CL8B</th>
            <th>CL8A</th>
            <th>CL9B</th>
            <th class="border-right">CL9A</th>
            <th>CL6</th>
            <th>CL7</th>
            <th>CL8B</th>
            <th>CL8A</th>
            <th>CL9B</th>
            <th class="border-right">CL9A</th>
            <th>CL6</th>
            <th>CL7</th>
            <th>CL8B</th>
            <th>CL8A</th>
            <th>CL9B</th>
            <th class="border-right">CL9A</th>
            <th>CL6</th>
            <th>CL7</th>
            <th>CL8B</th>
            <th>CL8A</th>
            <th>CL9B</th>
            <th class="border-right">CL9A</th>
            <th>CL6</th>
            <th>CL7</th>
            <th>CL8B</th>
            <th>CL8A</th>
            <th>CL9B</th>
            <th class="border-right">CL9A</th>
            <th>CL6</th>
            <th>CL7</th>
            <th>CL8B</th>
            <th>CL8A</th>
            <th>CL9B</th>
            <th class="border-right">CL9A</th>
            <th>CL6</th>
            <th>CL7</th>
            <th>CL8B</th>
            <th>CL8A</th>
            <th>CL9B</th>
            <th class="border-right">CL9A</th>
            <th>CL6</th>
            <th>CL7</th>
            <th>CL8B</th>
            <th>CL8A</th>
            <th>CL9B</th>
            <th class="border-right">CL9A</th>
            <th>CL6</th>
            <th>CL7</th>
            <th>CL8B</th>
            <th>CL8A</th>
            <th>CL9B</th>
            <th class="border-right">CL9A</th>
            <th>CL6</th>
            <th>CL7</th>
            <th>CL8B</th>
            <th>CL8A</th>
            <th>CL9B</th>
            <th class="border-right">CL9A</th>
            <th>CL6</th>
            <th>CL7</th>
            <th>CL8B</th>
            <th>CL8A</th>
            <th>CL9B</th>
            <th class="border-right">CL9A</th>
            <th>CL6</th>
            <th>CL7</th>
            <th>CL8B</th>
            <th>CL8A</th>
            <th>CL9B</th>
            <th class="border-right">CL9A</th>
            <th>CL6</th>
            <th>CL7</th>
            <th>CL8B</th>
            <th>CL8A</th>
            <th>CL9B</th>
            <th class="border-right">CL9A</th>
            <th>CL6</th>
            <th>CL7</th>
            <th>CL8B</th>
            <th>CL8A</th>
            <th>CL9B</th>
            <th class="border-right">CL9A</th>
            <th>CL6</th>
            <th>CL7</th>
            <th>CL8B</th>
            <th>CL8A</th>
            <th>CL9B</th>
            <th class="border-right">CL9A</th>
            <th>CL6</th>
            <th>CL7</th>
            <th>CL8B</th>
            <th>CL8A</th>
            <th>CL9B</th>
            <th class="border-right">CL9A</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>본부1</td>
            <td class="border-sticky-right">Project Apollo</td>
            <td>Y</td>
            <td class="border-right">Type1</td>
            <td>2024-01-01</td>
            <td class="border-right">2024-12-31</td>
            <td>1,000,000</td>
            <td class="border-right">800,000</td>
            <td>USD</td>
            <td>Yes</td>
            <td>-</td>
            <td class="border-right">-</td>
            <td>12</td>
            <td>8</td>
            <td>7</td>
            <td>5</td>
            <td>3</td>
            <td class="border-right">3</td>
            <td>12</td>
            <td>8</td>
            <td>7</td>
            <td>5</td>
            <td>3</td>
            <td class="border-right">3</td>
            <td>12</td>
            <td>8</td>
            <td>7</td>
            <td>5</td>
            <td>3</td>
            <td class="border-right">3</td>
            <td>12</td>
            <td>8</td>
            <td>7</td>
            <td>5</td>
            <td>3</td>
            <td class="border-right">3</td>
            <td class="border-right">-</td>
            <td>12</td>
            <td>8</td>
            <td>7</td>
            <td>5</td>
            <td>3</td>
            <td class="border-right">3</td>
            <td>12</td>
            <td>8</td>
            <td>7</td>
            <td>5</td>
            <td>3</td>
            <td class="border-right">3</td>
            <td class="border-right">-</td>
            <td>12</td>
            <td>8</td>
            <td>7</td>
            <td>5</td>
            <td>3</td>
            <td class="border-right">3</td>
            <td>12</td>
            <td>8</td>
            <td>7</td>
            <td>5</td>
            <td>3</td>
            <td class="border-right">3</td>
            <td class="border-right">-</td>
            <td>12</td>
            <td>8</td>
            <td>7</td>
            <td>5</td>
            <td>3</td>
            <td class="border-right">3</td>
            <td>12</td>
            <td>8</td>
            <td>7</td>
            <td>5</td>
            <td>3</td>
            <td class="border-right">3</td>
            <td class="border-right">-</td>
            <td>12</td>
            <td>8</td>
            <td>7</td>
            <td>5</td>
            <td>3</td>
            <td class="border-right">3</td>
            <td>12</td>
            <td>8</td>
            <td>7</td>
            <td>5</td>
            <td>3</td>
            <td class="border-right">3</td>
            <td class="border-right">-</td>
            <td>12</td>
            <td>8</td>
            <td>7</td>
            <td>5</td>
            <td>3</td>
            <td class="border-right">3</td>
            <td>12</td>
            <td>8</td>
            <td>7</td>
            <td>5</td>
            <td>3</td>
            <td class="border-right">3</td>
            <td class="border-right">-</td>
            <td>12</td>
            <td>8</td>
            <td>7</td>
            <td>5</td>
            <td>3</td>
            <td class="border-right">3</td>
            <td>12</td>
            <td>8</td>
            <td>7</td>
            <td>5</td>
            <td>3</td>
            <td class="border-right">3</td>
            <td class="border-right">-</td>
            <td>12</td>
            <td>8</td>
            <td>7</td>
            <td>5</td>
            <td>3</td>
            <td class="border-right">3</td>
            <td>12</td>
            <td>8</td>
            <td>7</td>
            <td>5</td>
            <td>3</td>
            <td class="border-right">3</td>
            <td class="border-right">-</td>
            <td>12</td>
            <td>8</td>
            <td>7</td>
            <td>5</td>
            <td>3</td>
            <td class="border-right">3</td>
            <td>12</td>
            <td>8</td>
            <td>7</td>
            <td>5</td>
            <td>3</td>
            <td class="border-right">3</td>
            <td class="border-right">-</td>
            <td>12</td>
            <td>8</td>
            <td>7</td>
            <td>5</td>
            <td>3</td>
            <td class="border-right">3</td>
            <td>12</td>
            <td>8</td>
            <td>7</td>
            <td>5</td>
            <td>3</td>
            <td class="border-right">3</td>
            <td class="border-right">-</td>
            <td>12</td>
            <td>8</td>
            <td>7</td>
            <td>5</td>
            <td>3</td>
            <td class="border-right">3</td>
            <td>12</td>
            <td>8</td>
            <td>7</td>
            <td>5</td>
            <td>3</td>
            <td class="border-right">3</td>
            <td class="border-right">-</td>
            <td>12</td>
            <td>8</td>
            <td>7</td>
            <td>5</td>
            <td>3</td>
            <td class="border-right">3</td>
            <td>12</td>
            <td>8</td>
            <td>7</td>
            <td>5</td>
            <td>3</td>
            <td class="border-right">3</td>
            <td class="border-right">-</td>
          </tr>
        </tbody>
      </Table>
    </MainContainer>
  </ContentsArea>
</template>

<script setup>
import TitleArea from '~/components/dms/TitleArea.vue'
import ContentsArea from '~/components/dms/ContentsArea.vue'
import MainContainer from '~/components/dms/MainContainer.vue'
import Select from '~/components/ui/Select.vue'
import Button from '~/components/ui/Button.vue'
import Table from '~/components/ui/Table.vue'
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
</script>

<style lang="scss" scoped>
/* 스타일이 필요한 경우 여기에 추가 */
.main-container {
  thead tr {
    &:nth-child(1) th {
      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(10) {
        text-align: left;
        min-width: 200px;
      }
      &:nth-child(1) {
        position: sticky;
        left: 0;
        z-index: 2;
      }
      &:nth-child(2) {
        position: sticky;
        left: 200px;
        z-index: 2;
      }
    }
  }
  tbody td {
    text-align: center;
    white-space: nowrap;
    background: #fff;
    z-index: 1;
    &:nth-child(7),
    &:nth-child(8) {
      text-align: right;
      white-space: nowrap;
    }
    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(12) {
      text-align: left;
    }
    &:nth-child(1) {
      position: sticky;
      left: 0;
      z-index: 2;
      background: #fff;
    }
    &:nth-child(2) {
      position: sticky;
      left: 200px;
      z-index: 2;
    }
  }
}
</style>
