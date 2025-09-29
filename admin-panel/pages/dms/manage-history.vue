<template>
  <TitleArea title="변경 히스토리"> </TitleArea>

  <ContentsArea>
    <MainContainer :round="true">
      <FilterContainer>
        <!-- 왼쪽: 날짜 관련 필터들 -->
        <div class="filter-group">
          <!-- 빠른 날짜 선택 버튼들 -->
          <div class="quick-date-buttons">
            <Button
              variant="outline"
              :size="38"
              :padding="16"
              @click="setToday"
              :class="{ active: isTodaySelected }"
            >
              오늘
            </Button>
            <Button
              variant="outline"
              :size="38"
              :padding="16"
              @click="setThisWeek"
              :class="{ active: isThisWeekSelected }"
            >
              이번주
            </Button>
            <Button
              variant="outline"
              :size="38"
              :padding="16"
              @click="setThisMonth"
              :class="{ active: isThisMonthSelected }"
            >
              이번달
            </Button>
          </div>
        </div>

        <!-- 오른쪽: 나머지 필터들 -->
        <div class="filter-group">
          <!-- 시작날짜 -->
          <Input
            v-model="startDate"
            type="date"
            placeholder="시작날짜"
            class="date-input"
            @change="handleDateChange"
          />

          <span class="filter-separator">~</span>

          <!-- 끝날짜 -->
          <Input
            v-model="endDate"
            type="date"
            placeholder="끝날짜"
            class="date-input"
            @change="handleDateChange"
          />
        </div>
        <div class="filter-group">
          <!-- 작업내용 선택 -->
          <Select
            v-model="selectedAction"
            :options="actionOptions"
            placeholder="작업내용"
            class="action-select"
          />
        </div>
        <div class="filter-group">
          <!-- 작업자 이름 입력 -->
          <Input
            v-model="adminName"
            placeholder="작업자 이름"
            class="admin-input"
            @input="handleAdminNameChange"
          />
        </div>
        <div class="filter-group">
          <!-- 검색 버튼 -->
          <Button
            variant="primary"
            :size="38"
            :padding="32"
            @click="searchHistories"
            :disabled="isLoading"
          >
            검색
          </Button>
        </div>
        <div class="filter-info" v-if="allHistories > 0">
          <div>
            총 {{ allHistories }}건 중 <strong>{{ histories.length }}</strong
            >건 표시
          </div>
          <Button
            v-if="isSearchExecuted"
            variant="outline"
            :size="24"
            @click="resetFilters"
          >
            필터 해제
            <div v-html="resetSvg"></div>
          </Button>
        </div>
      </FilterContainer>

      <!-- 히스토리 테이블 -->
      <div class="table-section">
        <div v-if="isLoading" class="loading-container">
          <Loading />
        </div>

        <EmptyContainer
          v-else-if="histories.length === 0"
          message="등록된 히스토리가 없습니다."
        />

        <Table v-else>
          <thead>
            <tr>
              <th>작업자</th>
              <th>작업항목</th>
              <th>작업내용</th>
              <th>세부내용</th>
              <th>직원ID</th>
              <th>접속IP</th>
              <th>작업일시</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="history in histories" :key="history.id">
              <td>{{ history.admin_name }}</td>
              <td>{{ history.menu_name }}</td>
              <td>
                <Badge :variant="getActionVariant(history.action_type)">
                  {{ history.action_type }}
                </Badge>
              </td>
              <td class="details-cell" :title="history.details">
                {{ history.details }}
              </td>
              <td>
                {{ history.employee_id || '-' }}
              </td>
              <td class="ip-cell">
                {{ history.ip_address }}
              </td>
              <td class="date-cell">
                {{ formatDateTime(history.created_at) }}
              </td>
            </tr>
          </tbody>
        </Table>

        <!-- 페이지네이션 -->
        <div v-if="pagination.totalPages > 1" class="pagination-container">
          <div class="pagination-buttons">
            <Button
              @click="goToPage(pagination.page - 1)"
              :disabled="pagination.page <= 1"
              variant="outline"
              size="sm"
              class="pagination-btn"
            >
              이전
            </Button>

            <template v-for="page in getPageNumbers()" :key="page">
              <Button
                v-if="page !== '...'"
                @click="goToPage(page)"
                :variant="page === pagination.page ? 'default' : 'outline'"
                size="sm"
                class="pagination-btn"
                :class="{ active: page === pagination.page }"
              >
                {{ page }}
              </Button>
              <span v-else class="pagination-ellipsis">...</span>
            </template>

            <Button
              @click="goToPage(pagination.page + 1)"
              :disabled="pagination.page >= pagination.totalPages"
              variant="outline"
              size="sm"
              class="pagination-btn"
            >
              다음
            </Button>
          </div>
        </div>
      </div>
    </MainContainer>
  </ContentsArea>
</template>

<script setup>
import TitleArea from '~/components/dms/TitleArea.vue'
import ContentsArea from '~/components/dms/ContentsArea.vue'
import MainContainer from '~/components/dms/MainContainer.vue'
import FilterContainer from '~/components/dms/FilterContainer.vue'
import EmptyContainer from '~/components/dms/EmptyContainer.vue'
import Table from '~/components/ui/Table.vue'
import Button from '~/components/ui/Button.vue'
import Select from '~/components/ui/Select.vue'
import Input from '~/components/ui/Input.vue'
import Badge from '~/components/ui/Badge.vue'
import Loading from '~/components/ui/Loading.vue'
import { useYear } from '~/composables/useYear'
import { onMounted, ref, computed } from 'vue'

definePageMeta({
  layout: 'dms',
  ssr: false,
})

// 필터 상태
const startDate = ref('')
const endDate = ref('')
const selectedAction = ref('')
const adminName = ref('')

// 빠른 날짜 선택 상태
const isTodaySelected = ref(false)
const isThisWeekSelected = ref(false)
const isThisMonthSelected = ref(false)

// 페이지 로드 시 초기화
onMounted(async () => {
  await loadHistories()
})

// 데이터 상태
const histories = ref([])
const allHistories = ref(0) // 전체 히스토리 갯수 (필터링 전)
const isLoading = ref(false)
const isSearchExecuted = ref(false) // 검색이 실행되었는지 확인
const totalCount = ref(0)
const todayCount = ref(0)
const weekCount = ref(0)
const pagination = ref({
  page: 1,
  limit: 20,
  total: 0,
  totalPages: 0,
})

// 필터 옵션
const actionOptions = ref([
  { value: '', label: '전체' },
  { value: 'Insert', label: 'Insert' },
  { value: 'Update', label: 'Update' },
  { value: 'Delete', label: 'Delete' },
])

// 이벤트 핸들러
const handleDateChange = () => {
  // 날짜 변경 시 빠른 선택 버튼 상태 초기화
  isTodaySelected.value = false
  isThisWeekSelected.value = false
  isThisMonthSelected.value = false
}

const handleAdminNameChange = () => {
  // 실시간 검색을 원한다면 여기에 debounce 로직 추가 가능
}

// 필터 해제 아이콘
const resetSvg = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12.6874 6.125C12.6863 7.05295 12.3173 7.9426 11.6611 8.59876C11.005 9.25491 10.1153 9.62399 9.18736 9.625H2.80587L4.68439 11.503C4.76648 11.5851 4.8126 11.6964 4.8126 11.8125C4.8126 11.9286 4.76648 12.0399 4.68439 12.122C4.60229 12.2041 4.49095 12.2502 4.37486 12.2502C4.25876 12.2502 4.14742 12.2041 4.06532 12.122L1.44032 9.49703C1.39965 9.4564 1.36738 9.40815 1.34536 9.35504C1.32334 9.30193 1.31201 9.24499 1.31201 9.1875C1.31201 9.13001 1.32334 9.07308 1.34536 9.01996C1.36738 8.96685 1.39965 8.9186 1.44032 8.87797L4.06532 6.25297C4.14742 6.17088 4.25876 6.12476 4.37486 6.12476C4.49095 6.12476 4.60229 6.17088 4.68439 6.25297C4.76648 6.33506 4.8126 6.4464 4.8126 6.5625C4.8126 6.6786 4.76648 6.78994 4.68439 6.87203L2.80587 8.75H9.18736C9.88355 8.75 10.5512 8.47344 11.0435 7.98116C11.5358 7.48887 11.8124 6.82119 11.8124 6.125C11.8124 5.42881 11.5358 4.76113 11.0435 4.26884C10.5512 3.77656 9.88355 3.5 9.18736 3.5H4.37486C4.25882 3.5 4.14754 3.45391 4.0655 3.37186C3.98345 3.28981 3.93736 3.17853 3.93736 3.0625C3.93736 2.94647 3.98345 2.83519 4.0655 2.75314C4.14754 2.67109 4.25882 2.625 4.37486 2.625H9.18736C10.1153 2.62601 11.005 2.99509 11.6611 3.65125C12.3173 4.3074 12.6863 5.19705 12.6874 6.125Z" fill="#3C3C3C"></path>
</svg>`

// 필터가 적용되었는지 확인
const isFilterApplied = computed(() => {
  return (
    startDate.value || endDate.value || selectedAction.value || adminName.value
  )
})

// 빠른 날짜 선택 함수들
const setToday = () => {
  const today = new Date()
  const todayStr = today.toISOString().split('T')[0]
  startDate.value = todayStr
  endDate.value = todayStr

  // 다른 선택 상태 초기화
  isThisWeekSelected.value = false
  isThisMonthSelected.value = false
  isTodaySelected.value = true
}

const setThisWeek = () => {
  const today = new Date()
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - today.getDay())
  const endOfWeek = new Date(today)
  endOfWeek.setDate(today.getDate() + (6 - today.getDay()))

  startDate.value = startOfWeek.toISOString().split('T')[0]
  endDate.value = endOfWeek.toISOString().split('T')[0]

  // 다른 선택 상태 초기화
  isTodaySelected.value = false
  isThisMonthSelected.value = false
  isThisWeekSelected.value = true
}

const setThisMonth = () => {
  const today = new Date()
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

  startDate.value = startOfMonth.toISOString().split('T')[0]
  endDate.value = endOfMonth.toISOString().split('T')[0]

  // 다른 선택 상태 초기화
  isTodaySelected.value = false
  isThisWeekSelected.value = false
  isThisMonthSelected.value = true
}

// 검색 함수
const searchHistories = () => {
  isSearchExecuted.value = true
  pagination.value.page = 1
  loadHistories()
}

// 필터 초기화
const resetFilters = () => {
  startDate.value = ''
  endDate.value = ''
  selectedAction.value = ''
  adminName.value = ''
  isTodaySelected.value = false
  isThisWeekSelected.value = false
  isThisMonthSelected.value = false
  isSearchExecuted.value = false
  pagination.value.page = 1
  loadHistories()
}

// 히스토리 데이터 로드
const loadHistories = async () => {
  try {
    isLoading.value = true

    const params = new URLSearchParams({
      page: pagination.value.page.toString(),
      limit: pagination.value.limit.toString(),
    })

    // 날짜 범위 필터
    if (startDate.value && endDate.value) {
      params.append('start_date', new Date(startDate.value).toISOString())
      params.append(
        'end_date',
        new Date(endDate.value + 'T23:59:59').toISOString()
      )
    }

    // 작업 타입 필터
    if (selectedAction.value) {
      params.append('action', selectedAction.value)
    }

    // 작업자 이름 필터
    if (adminName.value.trim()) {
      params.append('admin_name', adminName.value.trim())
    }

    const response = await $fetch(`/api/dms/history?${params}`)
    console.log('API 응답:', response)

    if (response.success) {
      histories.value = response.data.histories
      pagination.value = response.data.pagination

      // 통계 데이터가 있으면 업데이트 (첫 페이지일 때만)
      if (response.data.statistics) {
        allHistories.value = response.data.statistics.totalCount
        totalCount.value = response.data.statistics.totalCount
        todayCount.value = response.data.statistics.todayCount
        weekCount.value = response.data.statistics.weekCount
      }

      console.log('히스토리 데이터:', histories.value)
    }
  } catch (error) {
    console.error('히스토리 로드 오류:', error)
  } finally {
    isLoading.value = false
  }
}

// 페이지네이션
const goToPage = page => {
  if (page >= 1 && page <= pagination.value.totalPages) {
    pagination.value.page = page
    loadHistories()
  }
}

const getPageNumbers = () => {
  const current = pagination.value.page
  const total = pagination.value.totalPages
  const pages = []

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    }
  }

  return pages
}

// 유틸리티 함수
const getActionVariant = action => {
  switch (action) {
    case 'Insert':
      return 'success'
    case 'Update':
      return 'warning'
    case 'Delete':
      return 'danger'
    default:
      return 'default'
  }
}

const formatDateTime = dateString => {
  const date = new Date(dateString)
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}
</script>

<style lang="scss" scoped>
.table-section {
  .table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding: 20px;

    .pagination-info {
      font-size: 14px;
      color: #6b7280;
    }
  }

  .loading-cell,
  .empty-cell {
    text-align: center;
    padding: 32px;
  }

  .empty-cell {
    color: #6b7280;
  }

  .center-content {
    text-align: center;
    vertical-align: middle;
  }

  .details-cell {
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .ip-cell {
    font-family: monospace;
    font-size: 12px;
  }

  .date-cell {
    font-size: 12px;
  }

  .pagination-container {
    display: flex;
    justify-content: center;
    margin-top: 24px;

    .pagination-buttons {
      display: flex;
      gap: 8px;
      align-items: center;

      .pagination-btn {
        &.active {
          background-color: #1976d2;
          color: white;
          border-color: #1976d2;
        }
      }

      .pagination-ellipsis {
        padding: 8px 12px;
        color: #6b7280;
      }
    }
  }
}
</style>
