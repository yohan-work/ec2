<template>
  <TitleArea title="메인">
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
        <span>대시보드</span>
      </div>
    </template>
    <template #right>
      <div class="right-content">
        <Button variant="outline" :size="36"> 새로고침 </Button>
        <Button variant="primary" :size="36"> 설정 </Button>
      </div>
    </template>
  </TitleArea>
  <ContentsArea>
    <p>내용</p>
  </ContentsArea>
</template>

<script setup lang="ts">
import TitleArea from '~/components/delivery/TitleArea.vue'
import ContentsArea from '~/components/delivery/ContentsArea.vue'
import Select from '~/components/ui/Select.vue'
import Button from '~/components/ui/Button.vue'
import { onMounted } from 'vue'
import { useYear } from '~/composables/useYear'

definePageMeta({
  layout: 'delivery',
})

// 메타 태그
useHead({
  title: 'CiX Delivery Management System',
  meta: [{ name: 'description', content: 'CiX Delivery Management System' }],
})

// 연도 관련 로직
const { selectedYear, yearOptions, setSelectedYear, resetToCurrentYear } =
  useYear()

// 페이지 로드 시 올해로 리셋
onMounted(() => {
  resetToCurrentYear()
})

// 연도 변경 핸들러
const handleYearChange = (year: string | number) => {
  setSelectedYear(year as number)
}
</script>

<style lang="scss" scoped>
.dashboard-content {
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
  gap: 24px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.stat-card {
  padding: 20px;

  .stat-content {
    text-align: center;

    h4 {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 8px;
      font-weight: 500;
    }

    .stat-number {
      font-size: 28px;
      font-weight: 700;
      color: #1f2937;
    }
  }
}

.charts-section {
  .chart-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 20px;
  }

  .chart-card {
    padding: 20px;

    h4 {
      font-size: 18px;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 16px;
    }

    .chart-placeholder {
      height: 200px;
      background: #f9fafb;
      border: 2px dashed #d1d5db;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;

      p {
        color: #6b7280;
        font-size: 14px;
      }
    }
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
