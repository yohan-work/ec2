import { ref } from 'vue'

interface DuplicateCheckConfig {
  apiEndpoint: string
  fieldName: string
  errorMessage: string
  formField: string
}

export const useDuplicateCheck = (config: DuplicateCheckConfig) => {
  const checking = ref(false)
  const error = ref('')

  const checkDuplicate = async (
    value: string,
    excludeId: number | string | null = null
  ) => {
    if (!value || value.trim() === '') {
      error.value = ''
      return { isValid: true, error: '' }
    }

    checking.value = true
    error.value = ''

    try {
      const response = await $fetch<{ data: any[] }>(config.apiEndpoint)
      const existingItem = response.data.find(
        (item: any) =>
          item[config.fieldName].toLowerCase() === value.trim().toLowerCase() &&
          item.id !== excludeId
      )

      if (existingItem) {
        error.value = config.errorMessage
        return { isValid: false, error: config.errorMessage }
      }

      return { isValid: true, error: '' }
    } catch (err) {
      console.error('Error checking duplicate:', err)
      error.value = '중복 확인 중 오류가 발생했습니다.'
      return { isValid: false, error: '중복 확인 중 오류가 발생했습니다.' }
    } finally {
      checking.value = false
    }
  }

  const clearError = () => {
    error.value = ''
  }

  return {
    checking,
    error,
    checkDuplicate,
    clearError,
  }
}
