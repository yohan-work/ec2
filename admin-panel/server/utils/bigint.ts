/**
 * BigInt를 안전하게 문자열로 변환하는 유틸리티
 */
export function serializeBigInt(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj
  }

  if (typeof obj === 'bigint') {
    return obj.toString()
  }

  // Date 객체는 그대로 반환 (JSON.stringify에서 자동으로 ISO string으로 변환됨)
  if (obj instanceof Date) {
    return obj
  }

  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      return obj.map(item => serializeBigInt(item))
    }

    const result: any = {}
    for (const [key, value] of Object.entries(obj)) {
      result[key] = serializeBigInt(value)
    }
    return result
  }

  return obj
}
