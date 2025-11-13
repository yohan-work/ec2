import { prisma } from '../../lib/prisma'

/**
 * 새 뉴스레터의 발행일과 등록일을 기준
 * 같은 발행일이면 나중에 등록된 게시글이 위에 표시됩니다.
 *
 * @param publishedAt - 새 뉴스레터의 발행일
 * @param createdAt - 새 뉴스레터의 등록일
 * @param excludeId - 업데이트 시 제외할 뉴스레터 ID (선택사항)
 * @returns 계산된 display_order 값
 */
export async function calculateDisplayOrder(
  publishedAt: Date,
  createdAt: Date,
  excludeId?: bigint
): Promise<number> {
  // 발행된 모든 뉴스레터를 published_at, created_at 기준 내림차순으로 조회
  const publishedNewsletters = await prisma.newsletters.findMany({
    where: {
      status: 'published',
      display_order: {
        gt: 0,
      },
      ...(excludeId && { id: { not: excludeId } }),
    },
    orderBy: [{ published_at: 'desc' }, { created_at: 'desc' }],
    select: {
      id: true,
      published_at: true,
      created_at: true,
      display_order: true,
    },
  })

  // 새 게시글보다 우선순위가 높은 게시글 개수를 계산
  // 우선순위: published_at이 최신이거나, 같으면 created_at이 최신
  const newerCount = publishedNewsletters.filter(newsletter => {
    if (!newsletter.published_at) return false

    // published_at이 다른 경우
    if (newsletter.published_at.getTime() !== publishedAt.getTime()) {
      return newsletter.published_at > publishedAt
    }

    // published_at이 같은 경우, created_at 비교
    if (newsletter.created_at) {
      return newsletter.created_at > createdAt
    }

    return false
  }).length

  // 새 display_order는 (우선순위가 높은 게시글 개수 + 1)
  const newDisplayOrder = newerCount + 1

  // 새 위치 이후의 게시글들의 display_order를 1씩 증가
  // 즉, newDisplayOrder 이상인 게시글들을 모두 +1
  await prisma.newsletters.updateMany({
    where: {
      status: 'published',
      display_order: {
        gte: newDisplayOrder,
      },
      ...(excludeId && { id: { not: excludeId } }),
    },
    data: {
      display_order: {
        increment: 1,
      },
    },
  })

  return newDisplayOrder
}

/**
 * 모든 발행된 뉴스레터를 published_at, created_at 기준으로 재정렬합니다.
 * 최신 발행일부터 1, 2, 3... 순으로 display_order를 재할당합니다.
 * 같은 발행일인 경우 나중에 등록된 게시글이 위에 표시됩니다.
 */
export async function reorderAllNewsletters(): Promise<void> {
  // 발행된 모든 뉴스레터를 published_at, created_at 기준 내림차순으로 조회
  const publishedNewsletters = await prisma.newsletters.findMany({
    where: {
      status: 'published',
    },
    orderBy: [{ published_at: 'desc' }, { created_at: 'desc' }],
    select: {
      id: true,
      published_at: true,
      created_at: true,
    },
  })

  // 각 뉴스레터에 1, 2, 3... 순으로 display_order 재할당
  const updatePromises = publishedNewsletters.map((newsletter, index) => {
    return prisma.newsletters.update({
      where: { id: newsletter.id },
      data: { display_order: index + 1 },
    })
  })

  await Promise.all(updatePromises)
}
