import { prisma } from '../../../../lib/prisma'
import { getAdminUserByCognitoId } from '../../../utils/auth'

/**
 * 새로운 관리자 생성 API
 * POST /api/admin/mngr
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

    // 요청 본문 읽기
    const body = await readBody(event)

    // 필수 필드 검증
    if (!body.email) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: '이메일은 필수 입력 항목입니다.',
      })
    }

    if (!body.dept_id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: '부서는 필수 선택 항목입니다.',
      })
    }

    if (!body.role_id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: '역할은 필수 선택 항목입니다.',
      })
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: '올바른 이메일 형식이 아닙니다.',
      })
    }

    // 이메일 중복 검사
    const existingAdmin = await prisma.admin_users.findUnique({
      where: {
        email: body.email,
      },
    })

    if (existingAdmin) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Conflict',
        message: '이미 존재하는 이메일입니다.',
      })
    }

    // 부서와 역할 ID는 숫자 형태만 검증 (실제 테이블 확인 생략)
    if (!Number.isInteger(Number(body.dept_id)) || Number(body.dept_id) <= 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: '올바른 부서 ID를 입력해주세요.',
      })
    }

    if (!Number.isInteger(Number(body.role_id)) || Number(body.role_id) <= 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: '올바른 역할 ID를 입력해주세요.',
      })
    }

    // 새로운 관리자 생성 (departments, roles 테이블 없이)
    const newAdmin = await prisma.admin_users.create({
      data: {
        email: body.email.toLowerCase().trim(),
        dept_id: BigInt(body.dept_id),
        role_id: BigInt(body.role_id),
        is_active:
          body.is_active !== undefined ? Boolean(body.is_active) : true,
        cognito_id: body.cognito_id || null, // Cognito ID가 있으면 설정
      },
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
    })

    // BigInt를 String으로 변환하여 직렬화 문제 해결
    const serializedAdmin = {
      ...newAdmin,
      id: newAdmin.id.toString(),
      dept_id: newAdmin.dept_id.toString(),
      role_id: newAdmin.role_id.toString(),
    }

    return {
      success: true,
      data: serializedAdmin,
      message: '새로운 관리자가 성공적으로 생성되었습니다.',
    }
  } catch (error: any) {
    console.error('관리자 생성 오류:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: '관리자를 생성하는 중 오류가 발생했습니다.',
    })
  }
})
