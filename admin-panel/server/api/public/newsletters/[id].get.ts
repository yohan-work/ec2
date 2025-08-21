import { prisma } from '../../../../lib/prisma'
import { serializeBigInt } from '../../../utils/bigint'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID가 필요합니다.'
      })
    }

    const newsletter = await prisma.newsletters.findUnique({
      where: {
        id: BigInt(id),
        status: 'published' // 발행된 뉴스레터만
      },
      include: {
        admin_users: {
          select: {
            email: true,
            departments: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })

    if (!newsletter) {
      throw createError({
        statusCode: 404,
        statusMessage: '뉴스레터를 찾을 수 없습니다.'
      })
    }

    return {
      success: true,
      data: serializeBigInt(newsletter)
    }
  } catch (error: any) {
    console.error('공개 뉴스레터 조회 오류:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: '뉴스레터 조회 중 오류가 발생했습니다.'
    })
  }
})
