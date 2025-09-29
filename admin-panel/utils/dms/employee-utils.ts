/**
 * 직원 상태 관리 유틸리티
 * DB에는 영어 코드로 저장하고, 화면에서는 한글로 표시
 */

// DB에 저장되는 상태 코드
export type EmployeeStatusCode =
  | 'active'
  | 'resigned'
  | 'on_leave'
  | 'transferred'
  | 'pre_hire'

// 화면에 표시되는 한글 상태
export type EmployeeStatusLabel =
  | '재직'
  | '퇴사'
  | '휴직'
  | '조직이동'
  | '입사이전'

// 직무 (Job Role) - DB에 저장되는 코드
export type JobRoleCode = 'PM' | 'PMO' | 'PLANNER' | 'DESIGNER' | 'DEVELOPER'

// 직무 (Job Role) - 화면에 표시되는 한글
export type JobRoleLabel = 'PM' | 'PMO' | '기획자' | '디자이너' | '퍼블리셔'

// 직급 (Career Level) - DB에 저장되는 코드
export type CareerLevelCode =
  | 'CL6' // 이사
  | 'CL7' // 부장
  | 'CL8B' // 차장
  | 'CL8A' // 과장
  | 'CL9B' // 대리
  | 'CL9A' // 사원

// 직급 (Career Level) - 화면에 표시되는 한글
export type CareerLevelLabel =
  | '이사'
  | '부장'
  | '차장'
  | '과장'
  | '대리'
  | '사원'

export interface EmployeeWithLeaves {
  id: number
  status: EmployeeStatusCode
  start_date: Date | null
  end_date: Date | null
  leaves: Array<{
    start_date: Date
    end_date: Date | null
  }>
}

/**
 * 상태 코드를 한글 라벨로 변환
 */
export function getStatusLabel(code: EmployeeStatusCode): EmployeeStatusLabel {
  const statusMap: Record<EmployeeStatusCode, EmployeeStatusLabel> = {
    active: '재직',
    resigned: '퇴사',
    on_leave: '휴직',
    transferred: '조직이동',
    pre_hire: '입사이전',
  }
  return statusMap[code]
}

/**
 * 직무 코드를 한글 라벨로 변환
 */
export function getJobRoleLabel(code: JobRoleCode): JobRoleLabel {
  const jobRoleMap: Record<JobRoleCode, JobRoleLabel> = {
    PM: 'PM',
    PMO: 'PMO',
    PLANNER: '기획자',
    DESIGNER: '디자이너',
    DEVELOPER: '퍼블리셔',
  }
  return jobRoleMap[code]
}

/**
 * 직급 코드를 한글 라벨로 변환
 */
export function getCareerLevelLabel(code: CareerLevelCode | null): string {
  if (code === null) {
    return '인턴'
  }

  const careerLevelMap: Record<CareerLevelCode, CareerLevelLabel> = {
    CL6: '이사',
    CL7: '부장',
    CL8B: '차장',
    CL8A: '과장',
    CL9B: '대리',
    CL9A: '사원',
  }
  return careerLevelMap[code]
}

/**
 * 직급 옵션 배열을 반환합니다 (Select 컴포넌트용)
 */
export function getCareerLevelOptions() {
  const levels: CareerLevelCode[] = [
    'CL6',
    'CL7',
    'CL8B',
    'CL8A',
    'CL9B',
    'CL9A',
  ]
  return levels.map(level => ({
    value: level,
    label: getCareerLevelLabel(level),
  }))
}

/**
 * 직무 옵션 배열을 반환합니다 (Select 컴포넌트용)
 */
export function getJobRoleOptions() {
  const roles: JobRoleCode[] = ['PM', 'PMO', 'PLANNER', 'DESIGNER', 'DEVELOPER']
  return roles.map(role => ({
    value: role,
    label: getJobRoleLabel(role),
  }))
}

/**
 * 한글 라벨을 상태 코드로 변환
 */
export function getStatusCode(label: EmployeeStatusLabel): EmployeeStatusCode {
  const codeMap: Record<EmployeeStatusLabel, EmployeeStatusCode> = {
    재직: 'active',
    퇴사: 'resigned',
    휴직: 'on_leave',
    조직이동: 'transferred',
    입사이전: 'pre_hire',
  }
  return codeMap[label]
}

/**
 * 한글 라벨을 직무 코드로 변환
 */
export function getJobRoleCode(label: JobRoleLabel): JobRoleCode {
  const codeMap: Record<JobRoleLabel, JobRoleCode> = {
    PM: 'PM',
    PMO: 'PMO',
    기획자: 'PLANNER',
    디자이너: 'DESIGNER',
    퍼블리셔: 'DEVELOPER',
  }
  return codeMap[label]
}

/**
 * 한글 라벨을 직급 코드로 변환
 */
export function getCareerLevelCode(label: string): CareerLevelCode | null {
  if (label === '인턴') {
    return null
  }

  const codeMap: Record<CareerLevelLabel, CareerLevelCode> = {
    이사: 'CL6',
    부장: 'CL7',
    차장: 'CL8B',
    과장: 'CL8A',
    대리: 'CL9B',
    사원: 'CL9A',
  }
  return codeMap[label as CareerLevelLabel]
}

/**
 * 직원의 현재 상태를 계산합니다 (DB에 저장할 코드 반환)
 * @param employee 직원 정보 (휴직 기록 포함)
 * @returns 직원 상태 코드
 */
export function calculateEmployeeStatusCode(
  employee: EmployeeWithLeaves
): EmployeeStatusCode {
  const now = new Date()

  // 입사이전: 아직 입사하지 않은 상태
  if (employee.start_date && employee.start_date > now) {
    return 'pre_hire'
  }

  // 조직이동/퇴사: end_date가 있으면 조직이동 또는 퇴사
  if (employee.end_date) {
    return 'transferred' // 퇴사도 조직이동으로 처리
  }

  // 휴직: 현재 휴직 중인지 확인 (end_date가 null인 휴직 기록이 있으면 현재 휴직 중)
  const isOnLeave = employee.leaves.some(leave => leave.end_date === null)
  if (isOnLeave) {
    return 'on_leave'
  }

  // 재직: 위 조건들에 해당하지 않으면 재직
  return 'active'
}

/**
 * 직원의 현재 상태를 한글로 반환합니다
 * @param employee 직원 정보 (휴직 기록 포함)
 * @returns 직원 상태 한글 라벨
 */
export function calculateEmployeeStatus(
  employee: EmployeeWithLeaves
): EmployeeStatusLabel {
  const code = calculateEmployeeStatusCode(employee)
  return getStatusLabel(code)
}

/**
 * 직원 상태별 필터링을 위한 조건을 반환합니다 (한글 라벨 기준)
 * @param status 필터링할 상태 (한글 라벨)
 * @returns Prisma where 조건
 */
export function getStatusFilter(status: EmployeeStatusLabel) {
  const now = new Date()

  switch (status) {
    case '입사이전':
      return {
        start_date: { gt: now },
      }

    case '조직이동':
    case '퇴사':
      return {
        end_date: { not: null },
      }

    case '휴직':
      return {
        end_date: null,
        leaves: {
          some: {
            end_date: null,
          },
        },
      }

    case '재직':
      return {
        end_date: null,
        leaves: {
          none: {
            end_date: null,
          },
        },
      }

    default:
      return {}
  }
}

/**
 * 직원 상태 코드별 필터링을 위한 조건을 반환합니다
 * @param statusCode 필터링할 상태 코드
 * @returns Prisma where 조건
 */
export function getStatusCodeFilter(statusCode: EmployeeStatusCode) {
  const now = new Date()

  switch (statusCode) {
    case 'pre_hire':
      return {
        start_date: { gt: now },
      }

    case 'transferred':
    case 'resigned':
      return {
        end_date: { not: null },
      }

    case 'on_leave':
      return {
        end_date: null,
        leaves: {
          some: {
            end_date: null,
          },
        },
      }

    case 'active':
      return {
        end_date: null,
        leaves: {
          none: {
            end_date: null,
          },
        },
      }

    default:
      return {}
  }
}

/**
 * 직원 상태별 표시 색상을 반환합니다 (한글 라벨 기준)
 * @param status 직원 상태 (한글 라벨)
 * @returns Tailwind CSS 색상 클래스
 */
export function getStatusColor(status: EmployeeStatusLabel): string {
  switch (status) {
    case '재직':
      return 'text-green-600 bg-green-100'
    case '휴직':
      return 'text-yellow-600 bg-yellow-100'
    case '조직이동':
      return 'text-blue-600 bg-blue-100'
    case '퇴사':
      return 'text-red-600 bg-red-100'
    case '입사이전':
      return 'text-gray-600 bg-gray-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

/**
 * 직원 상태 코드별 표시 색상을 반환합니다
 * @param statusCode 직원 상태 코드
 * @returns Tailwind CSS 색상 클래스
 */
export function getStatusCodeColor(statusCode: EmployeeStatusCode): string {
  const label = getStatusLabel(statusCode)
  return getStatusColor(label)
}

/**
 * 직원 상태별 한글 설명을 반환합니다 (한글 라벨 기준)
 * @param status 직원 상태 (한글 라벨)
 * @returns 상태 설명
 */
export function getStatusDescription(status: EmployeeStatusLabel): string {
  switch (status) {
    case '재직':
      return '현재 재직 중'
    case '휴직':
      return '현재 휴직 중'
    case '조직이동':
      return '다른 조직으로 이동'
    case '퇴사':
      return '퇴사 처리됨'
    case '입사이전':
      return '아직 입사하지 않음'
    default:
      return '알 수 없음'
  }
}

/**
 * 직원 상태 코드별 한글 설명을 반환합니다
 * @param statusCode 직원 상태 코드
 * @returns 상태 설명
 */
export function getStatusCodeDescription(
  statusCode: EmployeeStatusCode
): string {
  const label = getStatusLabel(statusCode)
  return getStatusDescription(label)
}
