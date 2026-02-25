import { Amplify } from 'aws-amplify'
import { CookieStorage } from 'aws-amplify/utils'
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito'

// @ts-ignore
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  // Amplify 설정
  const amplifyConfig = {
    Auth: {
      Cognito: {
        userPoolId: config.public.cognitoUserPoolId,
        userPoolClientId: config.public.cognitoAppClientId,
        region: config.public.cognitoRegion,
        signUpVerificationMethod: 'code' as const,
        loginWith: {
          oauth: {
            domain: config.public.cognitoDomain
              .replace('https://', '')
              .replace('http://', ''),
            scopes: ['openid'],
            redirectSignIn: [config.public.redirectSignIn],
            redirectSignOut: [config.public.redirectSignOut],
            responseType: 'code' as const,
          },
        },
      },
    },
  }

  console.log('Amplify 설정 시작:', amplifyConfig)
  Amplify.configure(amplifyConfig)
  try {
    cognitoUserPoolsTokenProvider.setKeyValueStorage(new CookieStorage())
  } catch (e) {
    console.warn(
      'Amplify cookieStorage 설정 실패 (토큰은 localStorage에 저장됨):',
      e
    )
  }

  console.log('Amplify configured with:', {
    userPoolId: config.public.cognitoUserPoolId,
    userPoolClientId: config.public.cognitoAppClientId,
    region: config.public.cognitoRegion,
    domain: config.public.cognitoDomain,
    redirectSignIn: config.public.redirectSignIn,
    redirectSignOut: config.public.redirectSignOut,
  })

  // OAuth URL 디버깅 정보
  const oauthUrl = `${config.public.cognitoDomain}/oauth2/authorize?client_id=${config.public.cognitoAppClientId}&response_type=code&scope=openid+email+profile&redirect_uri=${encodeURIComponent(config.public.redirectSignIn)}`
  console.log('예상되는 OAuth URL:', oauthUrl)
})
