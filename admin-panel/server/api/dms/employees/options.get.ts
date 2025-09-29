import { prisma } from '~/lib/prisma'
import {
  getStatusLabel,
  getJobRoleOptions,
  getCareerLevelOptions,
  type EmployeeStatusCode,
} from '~/utils/dms/employee-utils'

// 타입 정의
interface Group {
  id: number
  name: string
}

interface Team {
  id: number
  name: string
  group_id: number
}

export default defineEventHandler(async event => {
  try {
    // 그룹, 팀 옵션 조회 (직무, 직급은 utils에서 가져옴)
    const [groups, teams] = await Promise.all([
      // 그룹 옵션 (조직관리에서 등록한 실제 그룹 데이터)
      (prisma as any).dms_groups.findMany({
        select: { id: true, name: true },
        orderBy: { sort_order: 'asc' },
      }) as Promise<Group[]>,

      // 팀 옵션 (조직관리에서 등록한 실제 팀 데이터)
      (prisma as any).dms_teams.findMany({
        select: { id: true, name: true, group_id: true },
        orderBy: { sort_order: 'asc' },
      }) as Promise<Team[]>,
    ])

    // 직무, 직급 옵션 (utils에서 가져옴)
    const jobRoles = getJobRoleOptions()
    const careerLevels = getCareerLevelOptions()

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
        groups: groups.map((g: Group) => ({ value: g.id, label: g.name })),
        teams: teams.map((t: Team) => ({
          value: t.id,
          label: t.name,
          group_id: t.group_id,
        })),
        jobRoles: jobRoles,
        careerLevels: careerLevels,
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
