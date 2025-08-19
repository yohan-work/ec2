import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * shadcn/ui 스타일을 위한 클래스명 결합 유틸리티
 * Tailwind CSS 클래스들을 효율적으로 병합하고 충돌을 해결합니다.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
