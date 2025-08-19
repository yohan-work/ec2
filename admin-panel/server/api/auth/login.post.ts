import { readBody, setCookie, createError, getHeaders } from 'h3'
import bcrypt from 'bcrypt'
import { randomUUID } from 'crypto'
import { prisma } from '../../../lib/prisma'

/**
 * 로그인 요청 바디 타입 정의
 */
interface LoginRequest {
  email: string
  password: string
}

/**
 * 로그인 응답 타입 정의
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
 * 관리자 로그인 API
 */
export default defineEventHandler(async event => {
  try {
    // 요청 바디 파싱
    const body: LoginRequest = await readBody(event)

    // 필수 필드 검증
    if (!body.email || !body.password) {
      throw createError({
        statusCode: 400,
        statusMessage: '이메일과 비밀번호를 입력해주세요.',
      })
    }

    // 이메일로 사용자 조회
    const user = await prisma.admin_users.findUnique({
      where: {
        email: body.email,
      },
      include: {
        departments: true,
        roles: true,
      },
    })

    // 사용자가 없는 경우
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: '이메일 또는 비밀번호가 올바르지 않습니다.',
      })
    }

    // 계정이 비활성화된 경우
    if (!user.is_active) {
      throw createError({
        statusCode: 401,
        statusMessage: '비활성화된 계정입니다. 관리자에게 문의하세요.',
      })
    }

    // bcrypt로 비밀번호 검증
    const passwordMatch = await bcrypt.compare(
      body.password,
      user.password_hash
    )

    if (!passwordMatch) {
      throw createError({
        statusCode: 401,
        statusMessage: '이메일 또는 비밀번호가 올바르지 않습니다.',
      })
    }

    // 세션 ID 생성 (UUID v4)
    const sessionId = randomUUID()

    // 클라이언트 정보 수집
    const headers = getHeaders(event)
    const clientIP = (
      headers['x-forwarded-for'] ||
      headers['x-real-ip'] ||
      ''
    ).toString()
    const userAgent = headers['user-agent'] || ''

    // 세션 만료 시간 설정 (24시간)
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 24)

    // 새 세션 생성
    await prisma.sessions.create({
      data: {
        id: sessionId,
        user_id: user.id,
        expires_at: expiresAt,
        user_agent: userAgent.substring(0, 255), // DB 컬럼 제한에 맞춤
        ip_addr: clientIP.substring(0, 45), // IPv6 주소 길이 고려
      },
    })

    // 쿠키 설정 (httpOnly, secure, sameSite)
    setCookie(event, 'session-id', sessionId, {
      httpOnly: true, // XSS 공격 방지
      secure: process.env.NODE_ENV === 'production', // HTTPS에서만 전송
      sameSite: 'strict', // CSRF 공격 방지
      maxAge: 60 * 60 * 24, // 24시간 (초 단위)
      path: '/', // 모든 경로에서 쿠키 사용 가능
    })

    // 로그인 성공 응답
    const response: LoginResponse = {
      success: true,
      user: {
        id: user.id.toString(),
        email: user.email,
        dept_id: user.dept_id.toString(),
        role_id: user.role_id.toString(),
      },
    }

    return response
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    console.error('로그인 처리 중 오류:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '서버 내부 오류가 발생했습니다.',
    })
  }
})
