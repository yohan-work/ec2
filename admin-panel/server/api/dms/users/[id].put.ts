import { prisma } from '~/lib/prisma'
import bcrypt from 'bcrypt'

export default defineEventHandler(async event => {
  try {
    const id = parseInt(getRouterParam(event, 'id') || '0')
    const body = await readBody(event)
    const { email, name, password, employee_id, role, is_active, permissions } =
      body

    // 역할 유효성 검증 (role이 제공된 경우)
    if (role) {
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
    }

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: '유효하지 않은 사용자 ID입니다.',
      })
    }

    // 사용자 존재 확인
    const existingUser = await prisma.dms_admin_users.findUnique({
      where: { id },
    })

    if (!existingUser) {
      throw createError({
        statusCode: 404,
        statusMessage: '사용자를 찾을 수 없습니다.',
      })
    }

    // 이메일 중복 검사 (자신 제외)
    if (email && email !== existingUser.email) {
      const emailExists = await prisma.dms_admin_users.findUnique({
        where: { email },
      })

      if (emailExists) {
        throw createError({
          statusCode: 400,
          statusMessage: '이미 등록된 이메일입니다.',
        })
      }
    }

    // 업데이트 데이터 구성
    const updateData: any = {}

    if (email) updateData.email = email
    if (name) updateData.name = name
    if (employee_id !== undefined) updateData.employee_id = employee_id || null
    if (role) updateData.role = role
    if (is_active !== undefined) updateData.is_active = is_active
    if (permissions !== undefined) updateData.permissions = permissions

    // 비밀번호가 제공된 경우에만 해시화
    if (password) {
      const saltRounds = 10
      updateData.password_hash = await bcrypt.hash(password, saltRounds)
    }

    // 사용자 업데이트
    const user = await prisma.dms_admin_users.update({
      where: { id },
      data: updateData,
    })

    return {
      success: true,
      data: user,
      message: '사용자가 성공적으로 수정되었습니다.',
    }
  } catch (error: any) {
    console.error('DMS 사용자 수정 오류:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: '사용자 수정 중 오류가 발생했습니다.',
    })
  }
})
