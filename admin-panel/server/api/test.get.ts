import { prisma } from '../../lib/prisma'

/**
 * 테스트 API 엔드포인트
 * GET /api/test
 *
 * 기능: admin_users 테이블에서 모든 사용자를 조회하여 JSON으로 반환
 * 관련 테이블(departments, roles)의 정보도 함께 포함
 */
export default defineEventHandler(async event => {
  try {
    // admin_users 테이블에서 모든 사용자 조회
    // departments와 roles 테이블도 함께 조인하여 가져오기 (비밀번호 해시는 보안상 제외)
    const users = await prisma.admin_users.findMany({
      select: {
        id: true,
        email: true,
        dept_id: true,
        role_id: true,
        is_active: true,
        created_at: true,
        updated_at: true,
        departments: {
          select: {
            id: true,
            code: true,
            name: true,
          },
        },
        roles: {
          select: {
            id: true,
            name: true,
            level: true,
          },
        },
      },
    })

    // BigInt를 String으로 변환하여 직렬화 문제 해결
    const serializedUsers = users.map(user => ({
      ...user,
      id: user.id.toString(),
      dept_id: user.dept_id.toString(),
      role_id: user.role_id.toString(),
      departments: {
        ...user.departments,
        id: user.departments.id.toString()
      },
      roles: {
        ...user.roles,
        id: user.roles.id.toString()
      }
    }))

    // 성공 응답
    return {
      success: true,
      message: 'admin_users 데이터 조회 성공',
      data: serializedUsers,
      total: users.length,
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    // 에러 로깅
    console.error('Database query error:', error)

    // 에러 응답
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: '데이터베이스 조회 중 오류가 발생했습니다.',
      data: {
        error: error instanceof Error ? error.message : '알 수 없는 오류',
        timestamp: new Date().toISOString(),
      },
    })
  }
})
