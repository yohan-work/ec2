import { ref, computed } from 'vue'

// 전역 상태 관리 (항상 올해로 초기화)
const selectedYear = ref(new Date().getFullYear())

export const useYear = () => {
  const setSelectedYear = (year: number) => {
    selectedYear.value = year
  }

  // 연도 옵션 생성 (2025년부터 올해까지)
  const getYearOptions = () => {
    const currentYear = new Date().getFullYear()
    const nextYear = currentYear + 1
    const startYear = 2025

    // 2025년부터 올해까지의 연도 배열 생성
    const years = []
    for (let year = startYear; year < nextYear; year++) {
      years.push(year)
    }

    return years.map(year => ({
      value: year,
      label: `${year}년`,
      // 올해인 경우 기본 선택되도록 표시
      isCurrentYear: year === currentYear,
    }))
  }

  // 올해로 리셋하는 함수
  const resetToCurrentYear = () => {
    selectedYear.value = new Date().getFullYear()
  }

  return {
    // State
    selectedYear: computed(() => selectedYear.value),
    yearOptions: computed(() => getYearOptions()),

    // Methods
    setSelectedYear,
    resetToCurrentYear,
  }
}
