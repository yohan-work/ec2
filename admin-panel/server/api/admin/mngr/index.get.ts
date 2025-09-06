import { prisma } from '../../../../lib/prisma'
import { getAdminUserByCognitoId } from '../../../utils/auth'

/**
 * 관리자 목록 조회 API
 * GET /api/admin/mngr
 */
export default defineEventHandler(async event => {
  try {
    // 최소한의 보안 검증: 헤더에서 cognito_id나 이메일을 확인
    const cognitoUserId = getHeader(event, 'x-cognito-user-id')
    const userEmail = getHeader(event, 'x-user-email')

    // 개발 모드가 아닌 경우 인증 필수
    if (process.env.NODE_ENV !== 'development') {
      if (!cognitoUserId && !userEmail) {
        throw createError({
          statusCode: 401,
          statusMessage: 'Unauthorized',
          message: '인증이 필요합니다.',
        })
      }

      // 관리자 존재 여부 확인
      if (cognitoUserId) {
        await getAdminUserByCognitoId(cognitoUserId)
      } else if (userEmail) {
        const admin = await prisma.admin_users.findUnique({
          where: { email: userEmail, is_active: true },
        })
        if (!admin) {
          throw createError({
            statusCode: 404,
            statusMessage: 'Not Found',
            message: '등록되지 않은 사용자입니다.',
          })
        }
      }
    }

    // 개발 모드에서는 경고 메시지만 출력
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        '개발 모드: 인증 검증을 완화합니다. 프로덕션에서는 proper 인증 구현 필요!'
      )
    }

    // 쿼리 파라미터 추출
    const query = getQuery(event)
    const page = Math.max(1, parseInt(query.page as string) || 1)
    const limit = Math.min(
      50,
      Math.max(1, parseInt(query.limit as string) || 10)
    )
    const search = query.search as string
    const isActive = query.is_active

    // 필터 조건 구성
    const where: any = {}

    if (search) {
      where.email = {
        contains: search,
      }
    }

    if (isActive !== undefined) {
      where.is_active = isActive === 'true'
    }

    // 페이징을 위한 전체 개수 조회
    const total = await prisma.admin_users.count({
      where,
    })

    // 관리자 목록 조회 (departments, roles 테이블 없이)
    const admins = await prisma.admin_users.findMany({
      where,
      select: {
        id: true,
        email: true,
        cognito_id: true,
        dept_id: true,
        role_id: true,
        is_active: true,
        created_at: true,
        updated_at: true,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        created_at: 'desc',
      },
    })

    // BigInt를 String으로 변환하여 직렬화 문제 해결
    const serializedAdmins = admins.map(admin => ({
      ...admin,
      id: admin.id.toString(),
      dept_id: admin.dept_id.toString(),
      role_id: admin.role_id.toString(),
    }))

    // 페이징 정보 계산
    const totalPages = Math.ceil(total / limit)

    return {
      success: true,
      data: serializedAdmins,
      pagination: {
        page,
        limit,
        total,
        pages: totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
      message: '관리자 목록을 성공적으로 조회했습니다.',
    }
  } catch (error: any) {
    console.error('관리자 목록 조회 오류:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: '관리자 목록을 조회하는 중 오류가 발생했습니다.',
    })
  }
})
