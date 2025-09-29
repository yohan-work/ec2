import bcrypt from 'bcrypt'
import { prisma } from '~/lib/prisma'
import { logDmsHistory } from './history/utils'

export default defineEventHandler(async event => {
  try {
    // 세션 확인
    const sessionCookie = getCookie(event, 'dms_session')
    if (!sessionCookie) {
      throw createError({
        statusCode: 401,
        statusMessage: '로그인이 필요합니다.',
      })
    }

    let sessionData
    try {
      sessionData = JSON.parse(sessionCookie)
    } catch (parseError) {
      throw createError({
        statusCode: 401,
        statusMessage: '유효하지 않은 세션입니다.',
      })
    }

    // 세션 만료 시간 체크 (8시간)
    const sessionExpiry = 8 * 60 * 60 * 1000
    const loginTime = new Date(sessionData.loginTime)
    const now = new Date()

    if (now.getTime() - loginTime.getTime() > sessionExpiry) {
      deleteCookie(event, 'dms_session', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })
      throw createError({
        statusCode: 401,
        statusMessage: '세션이 만료되었습니다. 다시 로그인해주세요.',
      })
    }

    const body = await readBody(event)
    const { currentPassword, newPassword } = body

    // 입력값 검증
    if (!currentPassword || !newPassword) {
      throw createError({
        statusCode: 400,
        statusMessage: '현재 비밀번호와 새 비밀번호를 모두 입력해주세요.',
      })
    }

    // 새 비밀번호 유효성 검사
    if (newPassword.length < 8) {
      throw createError({
        statusCode: 400,
        statusMessage: '새 비밀번호는 8자 이상이어야 합니다.',
      })
    }

    // 현재 비밀번호와 새 비밀번호가 같은지 확인
    if (currentPassword === newPassword) {
      throw createError({
        statusCode: 400,
        statusMessage: '현재 비밀번호와 다른 비밀번호를 입력해주세요.',
      })
    }

    // 사용자 조회
    const user = await prisma.dms_admin_users.findUnique({
      where: {
        id: sessionData.id,
      },
    })

    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: '사용자를 찾을 수 없습니다.',
      })
    }

    // 계정 활성화 상태 확인
    if (!user.is_active) {
      throw createError({
        statusCode: 401,
        statusMessage: '비활성화된 계정입니다. 관리자에게 문의하세요.',
      })
    }

    // 현재 비밀번호 검증
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password_hash
    )
    if (!isCurrentPasswordValid) {
      throw createError({
        statusCode: 400,
        statusMessage: '현재 비밀번호가 올바르지 않습니다.',
      })
    }

    // 새 비밀번호 해싱
    const saltRounds = 12
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds)

    // 비밀번호 업데이트
    await prisma.dms_admin_users.update({
      where: { id: user.id },
      data: {
        password_hash: newPasswordHash,
        updated_at: new Date(),
      },
    })

    // 변경 히스토리 기록
    await logDmsHistory(
      {
        menu_name: '비밀번호 변경',
        action_type: 'Update',
        details: '사용자 비밀번호 변경',
        admin_name: user.name,
        employee_id: user.employee_id || undefined,
      },
      event
    )

    return {
      success: true,
      message: '비밀번호가 성공적으로 변경되었습니다.',
    }
  } catch (error: any) {
    console.error('DMS 비밀번호 변경 오류:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    })
  } finally {
    await prisma.$disconnect()
  }
})
