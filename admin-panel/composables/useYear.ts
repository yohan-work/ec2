import { ref, computed } from 'vue'

// 전역 상태 관리
const selectedYear = ref(new Date().getFullYear())

export const useYear = () => {
  const setSelectedYear = (year: number) => {
    selectedYear.value = year
  }

  return {
    // State
    selectedYear: computed(() => selectedYear.value),

    // Methods
    setSelectedYear,
  }
}
