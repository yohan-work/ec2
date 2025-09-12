import bcrypt from 'bcrypt'
import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, password } = body

    // 입력값 검증
    if (!email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email과 Password를 입력해주세요.'
      })
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email) || !email.endsWith('@concentrix.com')) {
      throw createError({
        statusCode: 400,
        statusMessage: '올바른 Concentrix 이메일 주소를 입력해주세요.'
      })
    }

    // 사용자 조회
    const user = await prisma.dms_admin_users.findUnique({
      where: {
        email: email.toLowerCase()
      }
    })

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: '이메일 주소나 비밀번호가 올바르지 않습니다.'
      })
    }

    // 계정 활성화 상태 확인
    if (!user.is_active) {
      throw createError({
        statusCode: 401,
        statusMessage: '비활성화된 계정입니다. 관리자에게 문의하세요.'
      })
    }

    // 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(password, user.password_hash)
    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        statusMessage: '이메일 주소나 비밀번호가 올바르지 않습니다.'
      })
    }

    // 마지막 로그인 시간 업데이트
    await prisma.dms_admin_users.update({
      where: { id: user.id },
      data: { last_login_at: new Date() }
    })

    // 세션 생성 (JWT 또는 서버 세션)
    const sessionData = {
      id: user.id,
      email: user.email,
      employee_id: user.employee_id,
      loginTime: new Date().toISOString()
    }

    // 쿠키에 세션 정보 저장 (httpOnly, secure)
    setCookie(event, 'dms_session', JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 7일
    })

    return {
      success: true,
      message: '로그인에 성공했습니다.',
      user: {
        id: user.id,
        email: user.email,
        employee_id: user.employee_id
      }
    }

  } catch (error: any) {
    console.error('DMS 로그인 오류:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
    })
  } finally {
    await prisma.$disconnect()
  }
})
