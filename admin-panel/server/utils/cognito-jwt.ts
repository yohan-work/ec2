import type { H3Event } from 'h3'
import { parseCookies } from 'h3'
import { CognitoJwtVerifier } from 'aws-jwt-verify'

let verifier: ReturnType<typeof CognitoJwtVerifier.create> | null = null

function getVerifier() {
  if (!verifier) {
    const userPoolId = process.env.NUXT_PUBLIC_COGNITO_USER_POOL_ID || ''
    const clientId = process.env.NUXT_PUBLIC_COGNITO_APP_CLIENT_ID || ''
    if (!userPoolId || !clientId) return null
    verifier = CognitoJwtVerifier.create({
      userPoolId,
      tokenUse: 'id' as const,
      clientId,
    })
  }
  return verifier
}

/**
 * 요청 쿠키에서 Cognito idToken을 찾아 검증하고 payload(sub 등)를 반환합니다.
 * Amplify cookieStorage 사용 시 JWT 형식(eyJ...) 값인 쿠키를 찾아 검증합니다.
 */
export async function getVerifiedIdTokenFromRequest(
  event: H3Event
): Promise<{ sub: string } | null> {
  const v = getVerifier()
  if (!v) return null

  const cookies = parseCookies(event)
  const idTokenCandidates = Object.entries(cookies).filter(
    ([, value]) => typeof value === 'string' && value.startsWith('eyJ')
  )

  for (const [, token] of idTokenCandidates) {
    try {
      const payload = await v.verify(token)
      if (payload && payload.sub) {
        return { sub: payload.sub }
      }
    } catch {
      continue
    }
  }
  return null
}
