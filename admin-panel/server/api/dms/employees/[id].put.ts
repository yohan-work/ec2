import { prisma } from '~/lib/prisma'
import { logDmsHistory } from '~/server/api/dms/history/utils'
import { type EmployeeStatusCode } from '~/utils/dms/employee-utils'

// 유효성 검사 함수
const validateEmployeeData = (data: any) => {
  const errors: string[] = []

  // 이메일 검사 (선택사항이므로 형식 검사만)
  if (
    data.email &&
    typeof data.email === 'string' &&
    data.email.trim().length > 0
  ) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      errors.push('올바른 이메일 형식이 아닙니다.')
    }
  }

  if (
    !data.name ||
    typeof data.name !== 'string' ||
    data.name.trim().length === 0
  ) {
    errors.push('이름을 입력해주세요.')
  }

  const validStatuses: EmployeeStatusCode[] = [
    'active',
    'resigned',
    'on_leave',
    'transferred',
    'pre_hire',
  ]
  if (!validStatuses.includes(data.status as EmployeeStatusCode)) {
    errors.push('올바른 상태값이 아닙니다.')
  }

  if (errors.length > 0) {
    throw createError({
      statusCode: 400,
      statusMessage: errors.join(' '),
    })
  }

  return {
    email: data.email.trim(),
    name: data.name.trim(),
    headquarter_id: data.headquarter_id ? parseInt(data.headquarter_id) : null,
    group_id: data.group_id ? parseInt(data.group_id) : null,
    team_id: data.team_id ? parseInt(data.team_id) : null,
    manager_id: data.manager_id ? parseInt(data.manager_id) : null,
    job_role: data.job_role?.trim() || null,
    career_level: data.career_level?.trim() || null,
    status: data.status,
    is_people_manager: Boolean(data.is_people_manager),
    start_date: data.start_date ? new Date(data.start_date) : null,
    end_date: data.end_date ? new Date(data.end_date) : null,
    leave_periods: data.leave_periods || [], // 휴직기간 데이터
  }
}

export default defineEventHandler(async event => {
  try {
    const id = parseInt(getRouterParam(event, 'id') || '0')

    if (!id || isNaN(id)) {
      throw createError({
        statusCode: 400,
        statusMessage: '올바른 직원 ID가 아닙니다.',
      })
    }

    const body = await readBody(event)
    const data = validateEmployeeData(body)

    // 직원 존재 확인
    const existingEmployee = await prisma.dms_employees.findUnique({
      where: { id },
    })

    if (!existingEmployee) {
      throw createError({
        statusCode: 404,
        statusMessage: '해당 직원을 찾을 수 없습니다.',
      })
    }

    // 이메일 중복 확인 (이메일이 있는 경우에만, 자신 제외)
    if (data.email && data.email.trim().length > 0) {
      const emailConflict = await prisma.dms_employees.findFirst({
        where: {
          email: data.email,
          id: { not: id },
        },
      })

      if (emailConflict) {
        throw createError({
          statusCode: 400,
          statusMessage: '이미 등록된 이메일 주소입니다.',
        })
      }
    } else {
      // 이메일이 없으면 null로 설정
      data.email = null
    }

    // 변경사항 추적을 위한 이전 데이터 저장
    const oldData = { ...existingEmployee }

    // 기존 휴직기간 삭제
    await prisma.dms_employees_leave.deleteMany({
      where: { employee_id: id },
    })

    // 직원 정보 업데이트
    const updatedEmployee = await prisma.dms_employees.update({
      where: { id },
      data: {
        email: data.email,
        name: data.name,
        headquarter_id: data.headquarter_id,
        group_id: data.group_id,
        team_id: data.team_id,
        manager_id: data.manager_id,
        job_role: data.job_role,
        career_level: data.career_level,
        status: data.status,
        is_people_manager: data.is_people_manager,
        start_date: data.start_date,
        end_date: data.end_date,
        leaves: {
          create: data.leave_periods
            .filter((period: any) => period.start_date) // 시작일만 있으면 됨
            .map((period: any) => ({
              start_date: new Date(period.start_date),
              end_date: period.end_date ? new Date(period.end_date) : null,
            })),
        },
      },
    })

    // 변경사항 추적
    const changes: string[] = []
    Object.keys(data).forEach(key => {
      const oldValue = oldData[key as keyof typeof oldData]
      const newValue = data[key as keyof typeof data]

      if (oldValue !== newValue) {
        changes.push(`${key}: ${oldValue} → ${newValue}`)
      }
    })

    if (changes.length > 0) {
      await logDmsHistory(
        {
          menu_name: '직원 관리',
          action_type: 'Update',
          details: `직원 정보 수정: ${changes.join(', ')}`,
        },
        event
      )
    }

    // 휴직기간 데이터를 포함한 직원 정보 조회
    const employeeWithLeaves = await prisma.dms_employees.findUnique({
      where: { id },
      include: {
        manager: {
          select: { name: true },
        },
        group: {
          select: { name: true },
        },
        team: {
          select: { name: true },
        },
        leaves: {
          select: {
            id: true,
            start_date: true,
            end_date: true,
          },
          orderBy: {
            start_date: 'asc',
          },
        },
      },
    })

    return {
      success: true,
      data: employeeWithLeaves,
      message: '직원 정보가 성공적으로 수정되었습니다.',
    }
  } catch (error: any) {
    console.error('직원 수정 오류:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: '직원 정보를 수정하는 중 오류가 발생했습니다.',
    })
  }
})
