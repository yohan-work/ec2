<template>
  <TitleArea title="Staff(Utility)">
    <template #left>
      <div class="left-content">
        <Select
          v-model="selectedYear"
          :options="yearOptions"
          placeholder="Year"
          @update:modelValue="handleYearChange"
        />
      </div>
    </template>
    <template #center>
      <div class="center-content">
        <div class="filter-buttons">
          <Tab v-model="activeTab" :tabs="tabs" @change="onTabChange" />
        </div>
      </div>
    </template>
    <template #right>
      <div class="right-content">
        <Button variant="outline" :size="40" :padding="16">
          <div v-html="excelSvg"></div>
          Download
        </Button>
        <Button variant="blue" :size="40" :padding="16">
          <div v-html="editSvg"></div>
          Edit
        </Button>
      </div>
    </template>
  </TitleArea>
  <ContentsArea>
    <MainContainer>
      <Table>
        <thead>
          <tr>
            <th colspan="7" class="border-sticky-right">
              MSA & Billable Utilization
            </th>
            <th colspan="3">
              <div class="month-cell">
                <div class="month-cell-title">1월</div>
                <div class="month-cell-box">
                  <strong>10</strong>
                  <span>Total Util</span>
                </div>
                <div class="month-cell-box">
                  <strong>50</strong>
                  <span>Total HC</span>
                </div>
                <div class="month-cell-box">
                  <strong>80%</strong>
                  <span>Utilization(%)</span>
                </div>
              </div>
            </th>
            <th colspan="3">
              <div class="month-cell">
                <div class="month-cell-title">2월</div>
                <div class="month-cell-box">
                  <strong>10</strong>
                  <span>Total Util</span>
                </div>
                <div class="month-cell-box">
                  <strong>50</strong>
                  <span>Total HC</span>
                </div>
                <div class="month-cell-box">
                  <strong>80%</strong>
                  <span>Utilization(%)</span>
                </div>
              </div>
            </th>
            <th colspan="3">
              <div class="month-cell">
                <div class="month-cell-title">3월</div>
                <div class="month-cell-box">
                  <strong>10</strong>
                  <span>Total Util</span>
                </div>
                <div class="month-cell-box">
                  <strong>50</strong>
                  <span>Total HC</span>
                </div>
                <div class="month-cell-box">
                  <strong>80%</strong>
                  <span>Utilization(%)</span>
                </div>
              </div>
            </th>
            <th colspan="3">
              <div class="month-cell">
                <div class="month-cell-title">4월</div>
                <div class="month-cell-box">
                  <strong>10</strong>
                  <span>Total Util</span>
                </div>
                <div class="month-cell-box">
                  <strong>50</strong>
                  <span>Total HC</span>
                </div>
                <div class="month-cell-box">
                  <strong>80%</strong>
                  <span>Utilization(%)</span>
                </div>
              </div>
            </th>
            <th colspan="3">
              <div class="month-cell">
                <div class="month-cell-title">5월</div>
                <div class="month-cell-box">
                  <strong>10</strong>
                  <span>Total Util</span>
                </div>
                <div class="month-cell-box">
                  <strong>50</strong>
                  <span>Total HC</span>
                </div>
                <div class="month-cell-box">
                  <strong>80%</strong>
                  <span>Utilization(%)</span>
                </div>
              </div>
            </th>
            <th colspan="3">
              <div class="month-cell">
                <div class="month-cell-title">6월</div>
                <div class="month-cell-box">
                  <strong>10</strong>
                  <span>Total Util</span>
                </div>
                <div class="month-cell-box">
                  <strong>50</strong>
                  <span>Total HC</span>
                </div>
                <div class="month-cell-box">
                  <strong>80%</strong>
                  <span>Utilization(%)</span>
                </div>
              </div>
            </th>
            <th colspan="3">
              <div class="month-cell">
                <div class="month-cell-title">7월</div>
                <div class="month-cell-box">
                  <strong>10</strong>
                  <span>Total Util</span>
                </div>
                <div class="month-cell-box">
                  <strong>50</strong>
                  <span>Total HC</span>
                </div>
                <div class="month-cell-box">
                  <strong>80%</strong>
                  <span>Utilization(%)</span>
                </div>
              </div>
            </th>
            <th colspan="3">
              <div class="month-cell">
                <div class="month-cell-title">8월</div>
                <div class="month-cell-box">
                  <strong>10</strong>
                  <span>Total Util</span>
                </div>
                <div class="month-cell-box">
                  <strong>50</strong>
                  <span>Total HC</span>
                </div>
                <div class="month-cell-box">
                  <strong>80%</strong>
                  <span>Utilization(%)</span>
                </div>
              </div>
            </th>
            <th colspan="3">
              <div class="month-cell">
                <div class="month-cell-title">9월</div>
                <div class="month-cell-box">
                  <strong>10</strong>
                  <span>Total Util</span>
                </div>
                <div class="month-cell-box">
                  <strong>50</strong>
                  <span>Total HC</span>
                </div>
                <div class="month-cell-box">
                  <strong>80%</strong>
                  <span>Utilization(%)</span>
                </div>
              </div>
            </th>
            <th colspan="3">
              <div class="month-cell">
                <div class="month-cell-title">10월</div>
                <div class="month-cell-box">
                  <strong>10</strong>
                  <span>Total Util</span>
                </div>
                <div class="month-cell-box">
                  <strong>50</strong>
                  <span>Total HC</span>
                </div>
                <div class="month-cell-box">
                  <strong>80%</strong>
                  <span>Utilization(%)</span>
                </div>
              </div>
            </th>
            <th colspan="3">
              <div class="month-cell">
                <div class="month-cell-title">11월</div>
                <div class="month-cell-box">
                  <strong>10</strong>
                  <span>Total Util</span>
                </div>
                <div class="month-cell-box">
                  <strong>50</strong>
                  <span>Total HC</span>
                </div>
                <div class="month-cell-box">
                  <strong>80%</strong>
                  <span>Utilization(%)</span>
                </div>
              </div>
            </th>
            <th colspan="3">
              <div class="month-cell">
                <div class="month-cell-title">12월</div>
                <div class="month-cell-box">
                  <strong>10</strong>
                  <span>Total Util</span>
                </div>
                <div class="month-cell-box">
                  <strong>50</strong>
                  <span>Total HC</span>
                </div>
                <div class="month-cell-box">
                  <strong>80%</strong>
                  <span>Utilization(%)</span>
                </div>
              </div>
            </th>
          </tr>
          <tr>
            <th>그룹</th>
            <th>매니저</th>
            <th>직원</th>
            <th>직급</th>
            <th>직무</th>
            <th>CL</th>
            <th class="border-sticky-right">변동사항</th>
            <!-- 1월 -->
            <th>Util</th>
            <th>Project (영문)</th>
            <th class="border-right">MSA</th>
            <!-- 2월 -->
            <th>Util</th>
            <th>Project (영문)</th>
            <th class="border-right">MSA</th>
            <!-- 3월 -->
            <th>Util</th>
            <th>Project (영문)</th>
            <th class="border-right">MSA</th>
            <!-- 4월 -->
            <th>Util</th>
            <th>Project (영문)</th>
            <th class="border-right">MSA</th>
            <!-- 5월 -->
            <th>Util</th>
            <th>Project (영문)</th>
            <th class="border-right">MSA</th>
            <!-- 6월 -->
            <th>Util</th>
            <th>Project (영문)</th>
            <th class="border-right">MSA</th>
            <!-- 7월 -->
            <th>Util</th>
            <th>Project (영문)</th>
            <th class="border-right">MSA</th>
            <!-- 8월 -->
            <th>Util</th>
            <th>Project (영문)</th>
            <th class="border-right">MSA</th>
            <!-- 9월 -->
            <th>Util</th>
            <th>Project (영문)</th>
            <th class="border-right">MSA</th>
            <!-- 10월 -->
            <th>Util</th>
            <th>Project (영문)</th>
            <th class="border-right">MSA</th>
            <!-- 11월 -->
            <th>Util</th>
            <th>Project (영문)</th>
            <th class="border-right">MSA</th>
            <!-- 12월 -->
            <th>Util</th>
            <th>Project (영문)</th>
            <th class="border-right">MSA</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>UX/UI</td>
            <td>홍길동</td>
            <td>홍길동</td>
            <td>대리</td>
            <td>디자인</td>
            <td>CL7</td>
            <td class="border-sticky-right">-</td>
            <!-- 1월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 2월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 3월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 4월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 5월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 6월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 7월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 8월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 9월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 10월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 11월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 12월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
          </tr>
          <tr>
            <td>컨텐츠</td>
            <td>홍길동</td>
            <td>홍길동</td>
            <td>대리</td>
            <td>디자인</td>
            <td>CL7</td>
            <td class="border-sticky-right">-</td>
            <!-- 1월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 2월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 3월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 4월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 5월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 6월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 7월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 8월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 9월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 10월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 11월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 12월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
          </tr>
          <tr>
            <td>UX/UI</td>
            <td>홍길동</td>
            <td>홍길동</td>
            <td>대리</td>
            <td>디자인</td>
            <td>CL7</td>
            <td class="border-sticky-right">-</td>
            <!-- 1월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 2월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 3월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 4월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 5월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 6월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 7월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 8월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 9월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 10월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 11월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 12월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
          </tr>
          <tr>
            <td>UX/UI</td>
            <td>홍길동</td>
            <td>홍길동</td>
            <td>대리</td>
            <td>디자인</td>
            <td>CL7</td>
            <td class="border-sticky-right">-</td>
            <!-- 1월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 2월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 3월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 4월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 5월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 6월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 7월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 8월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 9월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 10월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 11월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 12월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
          </tr>
          <tr>
            <td>UX/UI</td>
            <td>홍길동</td>
            <td>홍길동</td>
            <td>대리</td>
            <td>디자인</td>
            <td>CL7</td>
            <td class="border-sticky-right">-</td>
            <!-- 1월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 2월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 3월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 4월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 5월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 6월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 7월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 8월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 9월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 10월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 11월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
            <!-- 12월 -->
            <td class="center">1</td>
            <td>semi-conductor integrated web operation_DOPDGNSE</td>
            <td class="border-right">DOPDGNAMORE</td>
          </tr>
        </tbody>
      </Table>
    </MainContainer>
  </ContentsArea>
</template>

<script setup>
import editSvg from '~/components/assets/dms/icons/edit.svg?raw'
import excelSvg from '~/components/assets/dms/icons/excel.svg?raw'
import TitleArea from '~/components/dms/TitleArea.vue'
import ContentsArea from '~/components/dms/ContentsArea.vue'
import MainContainer from '~/components/dms/MainContainer.vue'
import Select from '~/components/ui/Select.vue'
import Button from '~/components/ui/Button.vue'
import Table from '~/components/ui/Table.vue'
import Tab from '~/components/ui/TabButton.vue'
import { onMounted, ref, computed } from 'vue'
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
  // 탭 변경 처리
  // 탭 변경 로직을 여기에 추가할 수 있습니다
}
</script>

<style lang="scss" scoped>
/* 스타일이 필요한 경우 여기에 추가 */

.main-container {
  /* 테이블 셀 너비 정의 */
  $width-sticky1: 80px + 16px;
  $width-sticky2: 60px + 16px;
  $width-sticky3: 60px + 16px;
  $width-sticky4: 60px + 16px;
  $width-sticky5: 84px + 16px;
  $width-sticky6: 59px + 16px;
  $width-sticky7: 200px + 16px;

  /* 월별 셀 너비 */
  $width-month1: 40px + 16px;
  $width-month2: 220px + 16px;
  $width-month3: 152px + 16px;

  thead {
    tr {
      &:nth-child(1) th {
        padding: 16px 24px;
        &:nth-child(1) {
          position: sticky;
          left: 0;
          min-width: $width-sticky1;
          z-index: 2;
          font-size: 20px;
          line-height: 28px;
          background: #f3f4f8;
        }
      }
      &:nth-child(2) th {
        /* sticky 되는 셀 */
        &:nth-child(1) {
          position: sticky;
          left: 0;
          min-width: $width-sticky1;
          z-index: 2;
          background: #f3f4f8;
        }
        &:nth-child(2) {
          position: sticky;
          left: $width-sticky1;
          min-width: $width-sticky2;
          z-index: 2;
          background: #f3f4f8;
        }
        &:nth-child(3) {
          position: sticky;
          left: $width-sticky1 + $width-sticky2;
          min-width: $width-sticky3;
          z-index: 2;
          background: #f3f4f8;
        }
        &:nth-child(4) {
          position: sticky;
          left: $width-sticky1 + $width-sticky2 + $width-sticky3;
          min-width: $width-sticky4;
          background: #f3f4f8;
          z-index: 2;
        }
        &:nth-child(5) {
          position: sticky;
          left: $width-sticky1 + $width-sticky2 + $width-sticky3 +
            $width-sticky4;
          min-width: $width-sticky5;
          z-index: 2;
          background: #f3f4f8;
        }
        &:nth-child(6) {
          position: sticky;
          left: $width-sticky1 + $width-sticky2 + $width-sticky3 +
            $width-sticky4 + $width-sticky5;
          min-width: $width-sticky6;
          z-index: 2;
          background: #f3f4f8;
        }
        &:nth-child(7) {
          position: sticky;
          left: $width-sticky1 + $width-sticky2 + $width-sticky3 +
            $width-sticky4 + $width-sticky5 + $width-sticky6;
          min-width: $width-sticky7;
          z-index: 2;
          background: #f3f4f8;
        }
        /* 월별 너비 (Util, Project, MSA) */
        &:nth-child(3n + 8) {
          min-width: $width-month1;
        }
        &:nth-child(3n + 9) {
          min-width: $width-month2;
        }
        &:nth-child(3n + 10) {
          min-width: $width-month3;
        }
      }
    }
  }
  tbody {
    tr {
      &:nth-child(odd) {
        td {
          &:nth-child(1),
          &:nth-child(2),
          &:nth-child(3),
          &:nth-child(4),
          &:nth-child(5),
          &:nth-child(6),
          &:nth-child(7) {
            background: #fff;
          }
        }
      }
      &:nth-child(even) {
        td {
          &:nth-child(1),
          &:nth-child(2),
          &:nth-child(3),
          &:nth-child(4),
          &:nth-child(5),
          &:nth-child(6),
          &:nth-child(7) {
            background: #fafafa;
          }
        }
      }
      &:hover {
        &:nth-child(odd) {
          td {
            background: #f3f4f8;
          }
        }
        &:nth-child(even) {
          td {
            background: #f3f4f8;
          }
        }
      }
    }
    td {
      /* sticky 되는 셀 */
      &:nth-child(1) {
        position: sticky;
        left: 0;
        min-width: $width-sticky1;
        z-index: 2;
      }
      &:nth-child(2) {
        position: sticky;
        left: $width-sticky1;
        min-width: $width-sticky2;
        z-index: 2;
      }
      &:nth-child(3) {
        position: sticky;
        left: $width-sticky1 + $width-sticky2;
        min-width: $width-sticky3;
        z-index: 2;
      }
      &:nth-child(4) {
        position: sticky;
        left: $width-sticky1 + $width-sticky2 + $width-sticky3;
        min-width: $width-sticky4;
        z-index: 2;
      }
      &:nth-child(5) {
        position: sticky;
        left: $width-sticky1 + $width-sticky2 + $width-sticky3 + $width-sticky4;
        min-width: $width-sticky5;
        z-index: 2;
      }
      &:nth-child(6) {
        position: sticky;
        left: $width-sticky1 + $width-sticky2 + $width-sticky3 +
          $width-sticky4 + $width-sticky5;
        min-width: $width-sticky6;
        z-index: 2;
      }
      &:nth-child(7) {
        position: sticky;
        left: $width-sticky1 + $width-sticky2 + $width-sticky3 +
          $width-sticky4 + $width-sticky5 + $width-sticky6;
        min-width: $width-sticky7;
        z-index: 2;
      }
    }
  }
}
</style>
