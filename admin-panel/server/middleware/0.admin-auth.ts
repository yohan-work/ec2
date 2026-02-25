import { getMethod, getRequestPath, sendRedirect } from 'h3'
import { getVerifiedIdTokenFromRequest } from '../utils/cognito-jwt'

const ADMIN_PATHS_PREFIX = '/admin'
const DASHBOARD_PATH = '/dashboard'
const ALLOWED_PATHS = new Set(['/login', '/logout', '/callback'])

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
    if (!isProtectedPath(path)) return

    if (getMethod(event) !== 'GET') return

    const payload = await getVerifiedIdTokenFromRequest(event)
    if (!payload) {
      return sendRedirect(event, '/login', 302)
    }
  } catch {
    return sendRedirect(event, '/login', 302)
  }
})
