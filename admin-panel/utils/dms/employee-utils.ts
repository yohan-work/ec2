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

// 직무 (Job Role) - DB에 저장되는 한글 직무명
export type JobRoleCode =
  | '기획'
  | '디자인'
  | '퍼블리싱'
  | '광고'
  | '영상'
  | 'PM'
  | '매니저'

// 직무 (Job Role) - 화면에 표시되는 한글 (동일)
export type JobRoleLabel = JobRoleCode

// 직급 (Career Level) - DB에 저장되는 한글 직급명
export type CareerLevelCode =
  | '상무'
  | '이사'
  | '부장'
  | '차장'
  | '과장'
  | '대리'
  | '선생'
  | '인턴'

// 직급 (Career Level) - 화면에 표시되는 한글 (동일)
export type CareerLevelLabel = CareerLevelCode

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
 * 직무 코드를 한글 라벨로 변환 (이제 동일)
 */
export function getJobRoleLabel(code: JobRoleCode): JobRoleLabel {
  return code
}

/**
 * 직급 코드를 한글 라벨로 변환 (이제 동일)
 */
export function getCareerLevelLabel(code: CareerLevelCode | null): string {
  if (code === null) {
    return '인턴'
  }
  return code
}

/**
 * 직급 옵션 배열을 반환합니다 (Select 컴포넌트용)
 */
export function getCareerLevelOptions() {
  const levels: CareerLevelCode[] = [
    '상무',
    '이사',
    '부장',
    '차장',
    '과장',
    '대리',
    '선생',
    '인턴',
  ]

  return levels.map(level => ({
    value: level,
    label: level,
  }))
}

/**
 * 직무 옵션 배열을 반환합니다 (Select 컴포넌트용)
 */
export function getJobRoleOptions() {
  const roles: JobRoleCode[] = [
    '기획',
    '디자인',
    '퍼블리싱',
    '광고',
    '영상',
    'PM',
    '매니저',
  ]
  return roles.map(role => ({
    value: role,
    label: role,
  }))
}

/**
 * 직급명을 CL 코드로 변환
 */
export function getCareerLevelCodeFromLabel(
  label: CareerLevelCode | null
): string {
  if (!label) return 'CL9'

  const codeMap: Record<CareerLevelCode, string> = {
    상무: 'CL6',
    이사: 'CL6',
    부장: 'CL7',
    차장: 'CL8B',
    과장: 'CL8A',
    대리: 'CL9',
    선생: 'CL9',
    인턴: 'CL9',
  }

  return codeMap[label] || 'CL9'
}

/**
 * 직급 레벨을 반환합니다 (낮을수록 높은 직급)
 */
export function getCareerLevelRank(
  careerLevel: CareerLevelCode | null
): number {
  if (!careerLevel) return 999 // null인 경우 가장 낮은 직급으로 처리

  const levelRanks: Record<CareerLevelCode, number> = {
    상무: 1, // 최고
    이사: 2,
    부장: 3,
    차장: 4,
    과장: 5,
    대리: 6,
    선생: 7,
    인턴: 8, // 최저
  }

  return levelRanks[careerLevel] || 999
}

/**
 * 매니저 후보를 필터링합니다
 * @param candidates 매니저 후보 목록
 * @param currentEmployee 현재 직원 정보
 * @returns 필터링된 매니저 후보 목록
 */
export function filterManagerCandidates(
  candidates: Array<{
    id: number
    name: string
    email: string
    career_level: CareerLevelCode | null
    manager_id: number | null
  }>,
  currentEmployee: {
    id: number
    career_level: CareerLevelCode | null
  }
) {
  const currentEmployeeId = currentEmployee.id
  const currentEmployeeLevel = getCareerLevelRank(currentEmployee.career_level)

  return candidates.filter(candidate => {
    // 1. 본인 제외
    if (candidate.id === currentEmployeeId) {
      return false
    }

    // 2. 본인보다 직급이 낮은 사람 제외 (숫자가 클수록 낮은 직급)
    const candidateLevel = getCareerLevelRank(candidate.career_level)
    if (candidateLevel > currentEmployeeLevel) {
      return false
    }

    // 3. 본인을 매니저로 지정한 사람 제외 (상호 참조 방지)
    if (candidate.manager_id === currentEmployeeId) {
      return false
    }

    return true
  })
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
 * 한글 라벨을 직무 코드로 변환 (이제 동일)
 */
export function getJobRoleCode(label: JobRoleLabel): JobRoleCode {
  const validRoles: JobRoleCode[] = [
    '기획',
    '디자인',
    '퍼블리싱',
    '광고',
    '영상',
    'PM',
    '매니저',
  ]

  if (validRoles.includes(label as JobRoleCode)) {
    return label as JobRoleCode
  }

  return '기획' // 기본값
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
