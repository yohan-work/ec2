import { prisma } from '~/lib/prisma'
import bcrypt from 'bcrypt'

export default defineEventHandler(async event => {
  try {
    const body = await readBody(event)
    const {
      email,
      name,
      password,
      employee_id,
      role,
      is_active = true,
      permissions,
    } = body

    // 필수 필드 검증
    if (!email || !name || !password || !role) {
      throw createError({
        statusCode: 400,
        statusMessage: '이메일, 이름, 비밀번호, 역할은 필수입니다.',
      })
    }

    // 역할 유효성 검증
    const validRoles = [
      '대표이사',
      '부사장',
      '본부장',
      '그룹장',
      '팀장',
      '기타',
    ]
    if (!validRoles.includes(role)) {
      throw createError({
        statusCode: 400,
        statusMessage: '유효하지 않은 역할입니다.',
      })
    }

    // 이메일 중복 검사
    const existingUser = await prisma.dms_admin_users.findUnique({
      where: { email },
    })

    if (existingUser) {
      throw createError({
        statusCode: 400,
        statusMessage: '이미 등록된 이메일입니다.',
      })
    }

    // 비밀번호 해시화
    const saltRounds = 10
    const password_hash = await bcrypt.hash(password, saltRounds)

    // 사용자 생성
    const user = await prisma.dms_admin_users.create({
      data: {
        email,
        name,
        password_hash,
        employee_id: employee_id || null,
        role,
        is_active,
        permissions: permissions || null,
      } as any,
    })

    return {
      success: true,
      data: user,
      message: '사용자가 성공적으로 생성되었습니다.',
    }
  } catch (error: any) {
    console.error('DMS 사용자 생성 오류:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: '사용자 생성 중 오류가 발생했습니다.',
    })
  }
})
