import {
  getMethod,
  getRequestPath,
  getRequestURL,
  sendRedirect,
} from 'h3'
import { getVerifiedIdTokenFromRequest } from '../utils/cognito-jwt'

const ADMIN_PATHS_PREFIX = '/admin'
const DASHBOARD_PATH = '/dashboard'
const ALLOWED_PATHS = new Set(['/login', '/logout', '/callback'])

function normalizePath(path: string): string {
  const trimmed = path.replace(/\/+$/, '')
  return trimmed || '/'
}

function isProtectedPath(path: string): boolean {
  if (ALLOWED_PATHS.has(path)) return false
  if (path === DASHBOARD_PATH) return true
  if (path === ADMIN_PATHS_PREFIX || path.startsWith(ADMIN_PATHS_PREFIX + '/'))
    return true
  return false
}

export default defineEventHandler(async event => {
  try {
    const path = getRequestPath(event)
    const normalizedPath = normalizePath(path)

    // trailing slash 정규화: 허용 경로(/login/, /callback/ 등)만 정규 URL로 302 리다이렉트 (DAST 대응).
    // 보호 경로(/dashboard/, /admin/*)는 여기서 리다이렉트하지 않고 인증 검사로 넘겨, 미인증 시 한 번에 /login으로 보냄.
    if (
      getMethod(event) === 'GET' &&
      path !== normalizedPath &&
      !isProtectedPath(normalizedPath)
    ) {
      const url = getRequestURL(event)
      const redirectTo = normalizedPath + (url.search || '')
      return sendRedirect(event, redirectTo, 302)
    }

    if (!isProtectedPath(normalizedPath)) return

    if (getMethod(event) !== 'GET') return

    const payload = await getVerifiedIdTokenFromRequest(event)
    if (!payload) {
      return sendRedirect(event, '/login', 302)
    }

    // 인증된 사용자가 /dashboard/ 등 trailing slash로 접근한 경우 정규 URL로 리다이렉트
    if (path !== normalizedPath) {
      const url = getRequestURL(event)
      const redirectTo = normalizedPath + (url.search || '')
      return sendRedirect(event, redirectTo, 302)
    }
  } catch {
    return sendRedirect(event, '/login', 302)
  }
})
