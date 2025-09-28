import { prisma } from '~/lib/prisma'
import {
  getStatusLabel,
  getStatusCodeColor,
  getStatusCodeDescription,
  type EmployeeStatusCode,
} from '~/utils/dms/employee-utils'

export default defineEventHandler(async event => {
  try {
    const query = await getQuery(event)
    const {
      page = '1',
      limit = '20',
      search,
      group_id,
      team_id,
      job_role,
      career_level,
      status,
    } = query

    const pageNum = parseInt(String(page))
    const limitNum = parseInt(String(limit))
    const skip = (pageNum - 1) * limitNum

    // 검색 조건 구성
    const where: any = {}

    if (search && typeof search === 'string') {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
      ]
    }

    if (group_id && typeof group_id === 'string') {
      where.group_id = parseInt(group_id)
    }

    if (team_id && typeof team_id === 'string') {
      where.team_id = parseInt(team_id)
    }

    if (job_role && typeof job_role === 'string') {
      where.job_role = job_role
    }

    if (career_level && typeof career_level === 'string') {
      where.career_level = career_level
    }

    if (status && typeof status === 'string') {
      where.status = status
    }

    // 직원 목록 조회 (관계 데이터 포함)
    const [employees, total] = await Promise.all([
      prisma.dms_employees.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { created_at: 'desc' },
        include: {
          leaves: {
            where: {
              end_date: null, // 현재 휴직 중인 기록만
            },
            orderBy: { start_date: 'desc' },
            take: 1,
          },
        },
      }),
      prisma.dms_employees.count({ where }),
    ])

    // 매니저 정보 조회
    const managerIds = employees
      .map(emp => emp.manager_id)
      .filter((id): id is number => id !== null)
      .filter((id, index, arr) => arr.indexOf(id) === index) // 중복 제거

    const managers =
      managerIds.length > 0
        ? await prisma.dms_employees.findMany({
            where: { id: { in: managerIds } },
            select: { id: true, name: true, email: true },
          })
        : []

    const managerMap = new Map(managers.map(m => [m.id, m]))

    // 응답 데이터 구성
    const employeesWithManagers = employees.map(emp => ({
      id: emp.id,
      email: emp.email,
      name: emp.name,
      headquarter_id: emp.headquarter_id,
      group_id: emp.group_id,
      team_id: emp.team_id,
      manager_id: emp.manager_id,
      manager_name: emp.manager_id
        ? managerMap.get(emp.manager_id)?.name
        : null,
      job_role: emp.job_role,
      career_level: emp.career_level,
      status: emp.status,
      status_label: getStatusLabel(emp.status as EmployeeStatusCode),
      status_color: getStatusCodeColor(emp.status as EmployeeStatusCode),
      status_description: getStatusCodeDescription(
        emp.status as EmployeeStatusCode
      ),
      is_people_manager: emp.is_people_manager,
      start_date: emp.start_date,
      end_date: emp.end_date,
      created_at: emp.created_at,
      updated_at: emp.updated_at,
      is_on_leave: emp.leaves.length > 0,
      leave_start_date: emp.leaves[0]?.start_date || null,
    }))

    return {
      success: true,
      data: {
        employees: employeesWithManagers,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum),
        },
      },
    }
  } catch (error) {
    console.error('직원 목록 조회 오류:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '직원 목록을 조회하는 중 오류가 발생했습니다.',
    })
  }
})
