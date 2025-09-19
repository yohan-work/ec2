<template>
  <TitleArea title="변경 히스토리"> </TitleArea>

  <ContentsArea>
    <MainContainer>
      <div class="filter-container">
        <!-- 왼쪽: 날짜 관련 필터들 -->
        <div class="filter-left">
          <!-- 시작날짜 -->
          <Input
            v-model="startDate"
            type="date"
            placeholder="시작날짜"
            class="date-input"
            @change="handleDateChange"
          />

          <!-- 끝날짜 -->
          <Input
            v-model="endDate"
            type="date"
            placeholder="끝날짜"
            class="date-input"
            @change="handleDateChange"
          />

          <!-- 빠른 날짜 선택 버튼들 -->
          <div class="quick-date-buttons">
            <Button
              @click="setToday"
              variant="outline"
              size="sm"
              :class="{ active: isTodaySelected }"
            >
              오늘
            </Button>
            <Button
              @click="setThisWeek"
              variant="outline"
              size="sm"
              :class="{ active: isThisWeekSelected }"
            >
              이번주
            </Button>
            <Button
              @click="setThisMonth"
              variant="outline"
              size="sm"
              :class="{ active: isThisMonthSelected }"
            >
              이번달
            </Button>
          </div>
        </div>

        <!-- 오른쪽: 나머지 필터들 -->
        <div class="filter-right">
          <!-- 작업내용 선택 -->
          <Select
            v-model="selectedAction"
            :options="actionOptions"
            placeholder="작업내용"
            class="action-select"
          />

          <!-- 작업자 이름 입력 -->
          <Input
            v-model="adminName"
            placeholder="작업자 이름"
            class="admin-input"
            @input="handleAdminNameChange"
          />

          <!-- 검색 버튼 -->
          <Button
            @click="searchHistories"
            :disabled="isLoading"
            variant="default"
            size="sm"
            class="search-btn"
          >
            검색
          </Button>

          <!-- 초기화 버튼 -->
          <Button
            @click="resetFilters"
            variant="outline"
            size="sm"
            class="reset-btn"
          >
            초기화
          </Button>
        </div>
      </div>

      <!-- 히스토리 테이블 -->
      <div class="table-section">
        <div class="table-header">
          <div class="pagination-info">
            총 {{ pagination.total }}건 ({{ pagination.page }}/{{
              pagination.totalPages
            }}
            페이지)
          </div>
        </div>

        <Table>
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
            <tr v-if="isLoading">
              <td colspan="7" class="loading-cell">
                <Loading />
              </td>
            </tr>
            <tr v-else-if="histories.length === 0">
              <td colspan="7" class="empty-cell">히스토리가 없습니다.</td>
            </tr>
            <tr v-else v-for="history in histories" :key="history.id">
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
import Table from '~/components/ui/Table.vue'
import Button from '~/components/ui/Button.vue'
import Select from '~/components/ui/Select.vue'
import Input from '~/components/ui/Input.vue'
import Badge from '~/components/ui/Badge.vue'
import Loading from '~/components/ui/Loading.vue'
import { useYear } from '~/composables/useYear'
import { onMounted, ref } from 'vue'

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
  await Promise.all([loadHistories(), loadStatistics()])
})

// 데이터 상태
const histories = ref([])
const isLoading = ref(false)
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
      console.log('히스토리 데이터:', histories.value)
    }
  } catch (error) {
    console.error('히스토리 로드 오류:', error)
  } finally {
    isLoading.value = false
  }
}

// 통계 데이터 로드
const loadStatistics = async () => {
  try {
    // 전체 카운트
    const totalResponse = await $fetch('/api/dms/history?limit=1')
    totalCount.value = totalResponse.data.pagination.total

    // 오늘 카운트
    const today = new Date()
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    )
    const todayEnd = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    )

    const todayResponse = await $fetch(
      `/api/dms/history?limit=1&start_date=${todayStart.toISOString()}&end_date=${todayEnd.toISOString()}`
    )
    todayCount.value = todayResponse.data.pagination.total

    // 이번 주 카운트
    const weekStart = new Date(today)
    weekStart.setDate(today.getDate() - today.getDay())
    weekStart.setHours(0, 0, 0, 0)

    const weekResponse = await $fetch(
      `/api/dms/history?limit=1&start_date=${weekStart.toISOString()}&end_date=${todayEnd.toISOString()}`
    )
    weekCount.value = weekResponse.data.pagination.total
  } catch (error) {
    console.error('통계 로드 오류:', error)
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
.filter-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  width: calc(100% + 15px);
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 24px;

  .filter-left {
    display: flex;
    align-items: center;
    gap: 12px;

    .date-input {
      width: 160px;
    }

    .quick-date-buttons {
      display: flex;
      gap: 8px;
      margin-left: 8px;

      .active {
        background-color: #e3f2fd;
        border-color: #2196f3;
        color: #1976d2;
      }
    }
  }

  .filter-right {
    display: flex;
    align-items: center;
    gap: 12px;

    .action-select {
      width: 120px;
    }

    .admin-input {
      width: 140px;
    }

    .search-btn {
      background-color: #1976d2;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: #1565c0;
      }

      &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }
    }

    .reset-btn {
      background-color: white;
      color: #666;
      border: 1px solid #ddd;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: #f5f5f5;
      }
    }
  }
}

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
