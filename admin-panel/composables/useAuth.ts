import {
  signInWithRedirect,
  signOut,
  getCurrentUser,
  fetchAuthSession,
} from 'aws-amplify/auth'
import type { AuthUser } from 'aws-amplify/auth'
import { ref, computed } from 'vue'

interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
}

// 전역 상태 관리
const authState = ref<AuthState>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
})

export const useAuth = () => {
  // OAuth callback 처리 (토큰 교환)
  const handleOAuthCallback = async () => {
    if (process.server) return false

    try {
      console.log('OAuth callback 처리 시작')

      // fetchAuthSession을 먼저 호출하여 토큰 교환 시도
      console.log('fetchAuthSession으로 토큰 교환 시도...')
      const session = await fetchAuthSession({ forceRefresh: true })

      // JSON.stringify로 상세 내용 출력
      console.log('토큰 교환 결과 (JSON):', JSON.stringify(session, null, 2))

      console.log('토큰 정보 상세:', {
        hasTokens: !!session?.tokens,
        hasAccessToken: !!session?.tokens?.accessToken,
        hasIdToken: !!session?.tokens?.idToken,
        tokensKeys: session?.tokens ? Object.keys(session.tokens) : [],
        accessTokenString: session?.tokens?.accessToken
          ? session.tokens.accessToken.toString().substring(0, 50) + '...'
          : 'none',
        credentials: !!session?.credentials,
        identityId: session?.identityId,
      })

      if (session?.tokens?.accessToken) {
        console.log('토큰 교환 성공!')
        return true
      } else {
        console.log('토큰 교환 실패 - 토큰이 없습니다')
        return false
      }
    } catch (error: any) {
      console.error('OAuth callback 처리 중 에러:', {
        errorName: error?.name,
        errorMessage: error?.message,
        errorCode: error?.code,
        errorStack: error?.stack,
        fullError: error,
      })

      // 특정 에러 타입에 따른 추가 정보
      if (error?.message?.includes('400')) {
        console.error('400 에러 상세: OAuth 설정 문제 가능성이 높습니다.')
        console.error(
          '확인사항: 1) Client Secret 비활성화, 2) Grant Types 설정, 3) Callback URL 일치'
        )
      }

      return false
    }
  }

  // 현재 인증 상태 확인
  const checkAuth = async () => {
    if (process.server) return

    try {
      console.log('인증 상태 확인 시작')
      authState.value.isLoading = true

      console.log('getCurrentUser 호출 시작')
      const user = await getCurrentUser()
      console.log('사용자 정보 가져오기 성공:', user)

      console.log('fetchAuthSession 호출 시작')
      const session = await fetchAuthSession()
      console.log('세션 정보 가져오기 성공:', {
        hasTokens: !!session?.tokens,
        hasAccessToken: !!session?.tokens?.accessToken,
        hasIdToken: !!session?.tokens?.idToken,
        credentials: !!session?.credentials,
      })

      authState.value.user = user
      authState.value.isAuthenticated = !!user && !!session?.tokens?.accessToken
      console.log('최종 인증 상태:', authState.value.isAuthenticated)
    } catch (error: any) {
      authState.value.user = null
      authState.value.isAuthenticated = false
      console.error('인증 확인 중 에러 발생:', {
        errorName: error?.name,
        errorMessage: error?.message,
        errorStack: error?.stack,
      })
    } finally {
      authState.value.isLoading = false
      console.log('인증 상태 확인 완료 - 로딩 상태:', authState.value.isLoading)
    }
  }

  // Cognito Hosted UI로 로그인
  const login = async () => {
    if (process.server) return

    try {
      console.log('signInWithRedirect 호출 시작')
      console.log('현재 Amplify 설정 확인 중...')

      // signInWithRedirect 호출
      await signInWithRedirect()
      console.log('signInWithRedirect 호출 완료')
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  // 로그아웃
  const logout = async () => {
    if (process.server) return

    try {
      await signOut()
      authState.value.user = null
      authState.value.isAuthenticated = false

      // 홈페이지로 리다이렉트
      if (process.client) {
        ;(globalThis as any).location.href = '/'
      }
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  // 사용자 정보 가져오기
  const getUserInfo = () => {
    return {
      username: authState.value.user?.username,
      userId: authState.value.user?.userId,
      signInDetails: authState.value.user?.signInDetails,
    }
  }

  // 액세스 토큰 가져오기
  const getAccessToken = async () => {
    if (process.server) return null

    try {
      const session = await fetchAuthSession()
      return session.tokens?.accessToken?.toString()
    } catch (error) {
      console.error('Failed to get access token:', error)
      return null
    }
  }

  return {
    // State
    user: computed(() => authState.value.user),
    isAuthenticated: computed(() => authState.value.isAuthenticated),
    isLoading: computed(() => authState.value.isLoading),

    // Methods
    handleOAuthCallback,
    checkAuth,
    login,
    logout,
    getUserInfo,
    getAccessToken,
  }
}
