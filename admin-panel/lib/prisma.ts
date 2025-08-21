import { PrismaClient } from '@prisma/client'

/**
 * Prisma Client 인스턴스를 전역으로 관리
 * 개발 환경에서는 Hot Reload로 인한 다중 인스턴스 생성을 방지
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// BigInt 직렬화 처리
if (typeof BigInt !== 'undefined') {
  ;(BigInt.prototype as any).toJSON = function () {
    return this.toString()
  }
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'], // 쿼리 로그 활성화 (개발 환경에서 유용)
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
