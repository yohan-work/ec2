import { prisma } from '../../../../lib/prisma'
import { serializeBigInt } from '../../../utils/bigint'
import {
  calculateDisplayOrder,
  reorderAllNewsletters,
} from '../../../utils/newsletter-order'

export default defineEventHandler(async event => {
  try {
    // TODO: 인증 검증 추가 필요

    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID가 필요합니다.',
      })
    }

    const {
      title,
      body_html,
      thumbnail_image,
      body_image,
      subtitle,
      subtitle_bold,
      status,
      author_id,
      published_date,
    } = body

    // 기존 뉴스레터 확인
    const existingNewsletter = await prisma.newsletters.findUnique({
      where: { id: BigInt(id) },
    })

    if (!existingNewsletter) {
      throw createError({
        statusCode: 404,
        statusMessage: '뉴스레터를 찾을 수 없습니다.',
      })
    }

    // 상태 검증
    const validStatuses = ['draft', 'published', 'archived']
    if (status && !validStatuses.includes(status)) {
      throw createError({
        statusCode: 400,
        statusMessage: '올바른 상태값이 아닙니다.',
      })
    }

    // 업데이트 데이터 구성
    const updateData: any = {}
    const changes: any = {}

    if (title !== undefined) {
      updateData.title = title
      changes.title = { from: existingNewsletter.title, to: title }
    }

    if (body_html !== undefined) {
      updateData.body_html = body_html
      changes.body_html = { changed: true }
    }

    if (thumbnail_image !== undefined) {
      updateData.thumbnail_image = thumbnail_image
      changes.thumbnail_image = { changed: true }
    }

    if (body_image !== undefined) {
      updateData.body_image = body_image
      changes.body_image = { changed: true }
    }

    if (subtitle !== undefined) {
      updateData.subtitle = subtitle
      changes.subtitle = { changed: true }
    }

    if (subtitle_bold !== undefined) {
      updateData.subtitle_bold = subtitle_bold
      changes.subtitle_bold = { changed: true }
    }

    // 발행일 변경 여부 추적 (재정렬 필요 여부 판단용)
    let needsReorder = false
    let newPublishedAt: Date | null = null

    if (status !== undefined) {
      updateData.status = status
      changes.status = { from: existingNewsletter.status, to: status }

      // published 상태로 변경 시 published_at 및 display_order 설정
      if (status === 'published' && existingNewsletter.status !== 'published') {
        // published_date가 제공되면 해당 날짜 사용, 없으면 현재 시간 사용
        newPublishedAt = published_date ? new Date(published_date) : new Date()
        updateData.published_at = newPublishedAt
        changes.published_at = { set: true }

        // 발행일과 등록일을 기준으로 적절한 위치 계산
        const createdAt = existingNewsletter.created_at || new Date()
        const newDisplayOrder = await calculateDisplayOrder(
          newPublishedAt,
          createdAt,
          BigInt(id)
        )
        updateData.display_order = newDisplayOrder
        changes.display_order = {
          from: existingNewsletter.display_order,
          to: newDisplayOrder,
        }
      }

      // published가 아닌 상태로 변경 시 display_order를 0으로 설정하고 재정렬
      if (status !== 'published' && existingNewsletter.status === 'published') {
        updateData.display_order = 0
        changes.display_order = {
          from: existingNewsletter.display_order,
          to: 0,
        }
        needsReorder = true
      }
    }

    // 이미 published 상태에서 발행일만 변경하는 경우
    if (
      published_date !== undefined &&
      existingNewsletter.status === 'published' &&
      (status === undefined || status === 'published')
    ) {
      if (published_date) {
        newPublishedAt = new Date(published_date)
        updateData.published_at = newPublishedAt
        changes.published_at = { updated: true }
        needsReorder = true
      }
    }

    if (author_id !== undefined) {
      // 작성자 존재 여부 확인
      const author = await prisma.admin_users.findUnique({
        where: { id: BigInt(author_id) },
      })

      if (!author) {
        throw createError({
          statusCode: 404,
          statusMessage: '작성자를 찾을 수 없습니다.',
        })
      }

      updateData.author_id = BigInt(author_id)
      changes.author_id = {
        from: existingNewsletter.author_id.toString(),
        to: author_id,
      }
    }

    updateData.updated_at = new Date()

    // 뉴스레터 업데이트
    const updatedNewsletter = await prisma.newsletters.update({
      where: { id: BigInt(id) },
      data: updateData,
      include: {
        admin_users: {
          select: {
            id: true,
            email: true,
            departments: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })

    // audit log 기록
    await prisma.audit_logs.create({
      data: {
        user_id: author_id ? BigInt(author_id) : existingNewsletter.author_id,
        entity: 'newsletters',
        entity_id: BigInt(id),
        action: 'update',
        changes,
      },
    })

    // 발행일 변경으로 인한 재정렬 필요 시
    if (needsReorder) {
      await reorderAllNewsletters()
    }

    return {
      success: true,
      data: serializeBigInt(updatedNewsletter),
      message: '뉴스레터가 성공적으로 업데이트되었습니다.',
    }
  } catch (error: any) {
    console.error('뉴스레터 업데이트 오류:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: '뉴스레터 업데이트 중 오류가 발생했습니다.',
    })
  }
})
