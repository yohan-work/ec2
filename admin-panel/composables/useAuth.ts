import type { CurrentUser } from '../server/utils/auth'

/**
 * 로그인 요청 타입
 */
interface LoginRequest {
  email: string
  password: string
}

/**
 * 로그인 응답 타입
 */
interface LoginResponse {
  success: boolean
  user: {
    id: string
    email: string
    dept_id: string
    role_id: string
  }
}

/**
 * 로그아웃 응답 타입
 */
interface LogoutResponse {
  success: boolean
  message: string
}

/**
 * 인증 상태 관리 Composable
 */
export const useAuth = () => {
  // 현재 사용자 정보 상태
  const currentUser = ref<CurrentUser | null>(null)

  // 로딩 상태
  const isLoading = ref(false)

  // 로그인 상태 계산 속성
  const isLoggedIn = computed(() => !!currentUser.value)

  /**
   * 현재 사용자 정보 조회
   */
  const fetchCurrentUser = async (): Promise<CurrentUser | null> => {
    try {
      const { data, error } = await useFetch<CurrentUser>('/api/me', {
        key: 'current-user',
      })

      if (error.value) {
        if (error.value.statusCode === 401) {
          currentUser.value = null
          return null
        }
        throw error.value
      }

      if (data.value) {
        currentUser.value = data.value
        return data.value
      }

      currentUser.value = null
      return null
    } catch (error) {
      currentUser.value = null
      return null
    }
  }

  /**
   * 로그인
   */
  const login = async (
    credentials: LoginRequest
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      isLoading.value = true

      const response = await $fetch<LoginResponse>('/api/auth/login', {
        method: 'POST',
        body: credentials,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.success) {
        await new Promise(resolve => setTimeout(resolve, 100))
        await fetchCurrentUser()
        return { success: true }
      }

      return { success: false, error: '로그인에 실패했습니다.' }
    } catch (error: unknown) {
      let errorMessage = '로그인 중 오류가 발생했습니다.'
      if (error && typeof error === 'object' && 'data' in error) {
        const errorData = error.data as any
        if (errorData?.statusMessage) {
          errorMessage = errorData.statusMessage
        }
      }

      return { success: false, error: errorMessage }
    } finally {
      isLoading.value = false
    }
  }

  /**
   * 로그아웃
   */
  const logout = async (): Promise<void> => {
    try {
      await $fetch<LogoutResponse>('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
    } catch (error) {
      // 로그아웃 에러 무시
    } finally {
      currentUser.value = null
    }
  }

  /**
   * 인증 상태 초기화 (앱 시작 시 호출)
   */
  const initialize = async (): Promise<void> => {
    await fetchCurrentUser()
  }

  /**
   * 사용자 권한 확인
   */
  const hasRole = (minLevel: number): boolean => {
    return currentUser.value ? currentUser.value.role_level >= minLevel : false
  }

  /**
   * 부서 확인
   */
  const hasDepartment = (deptCode: string): boolean => {
    return currentUser.value ? currentUser.value.dept_code === deptCode : false
  }

  return {
    // 상태
    currentUser: readonly(currentUser),
    isLoading: readonly(isLoading),
    isLoggedIn,

    // 메서드
    login,
    logout,
    initialize,
    fetchCurrentUser,
    hasRole,
    hasDepartment,
  }
}
