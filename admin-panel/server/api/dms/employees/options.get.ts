import { prisma } from '~/lib/prisma'
import {
  getStatusLabel,
  type EmployeeStatusCode,
} from '~/utils/dms/employee-utils'

export default defineEventHandler(async event => {
  try {
    // 그룹, 팀, 직무, 직급 옵션 조회
    const [groups, teams, jobRoles, careerLevels] = await Promise.all([
      // 그룹 옵션 (group_id가 있는 직원들의 그룹 정보)
      prisma.dms_employees.findMany({
        where: { group_id: { not: null } },
        select: { group_id: true },
        distinct: ['group_id'],
      }),

      // 팀 옵션 (team_id가 있는 직원들의 팀 정보)
      prisma.dms_employees.findMany({
        where: { team_id: { not: null } },
        select: { team_id: true },
        distinct: ['team_id'],
      }),

      // 직무 옵션
      prisma.dms_employees.findMany({
        where: { job_role: { not: null } },
        select: { job_role: true },
        distinct: ['job_role'],
      }),

      // 직급 옵션
      prisma.dms_employees.findMany({
        where: { career_level: { not: null } },
        select: { career_level: true },
        distinct: ['career_level'],
      }),
    ])

    // 상태 옵션 (utils 함수 사용)
    const statusCodes: EmployeeStatusCode[] = [
      'active',
      'resigned',
      'on_leave',
      'transferred',
      'pre_hire',
    ]
    const statusOptions = statusCodes.map(code => ({
      value: code,
      label: getStatusLabel(code),
    }))

    return {
      success: true,
      data: {
        groups: groups
          .filter(g => g.group_id !== null)
          .map(g => ({ value: g.group_id, label: `그룹 ${g.group_id}` })),
        teams: teams
          .filter(t => t.team_id !== null)
          .map(t => ({ value: t.team_id, label: `팀 ${t.team_id}` })),
        jobRoles: jobRoles
          .filter(j => j.job_role !== null)
          .map(j => ({ value: j.job_role, label: j.job_role })),
        careerLevels: careerLevels
          .filter(c => c.career_level !== null)
          .map(c => ({ value: c.career_level, label: c.career_level })),
        statusOptions,
      },
    }
  } catch (error) {
    console.error('직원 옵션 조회 오류:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '직원 옵션을 조회하는 중 오류가 발생했습니다.',
    })
  }
})
