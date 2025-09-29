// 이미지 관련 유틸리티 함수들

// 지원하는 이미지 확장자 목록 (우선순위 순)
export const supportedExtensions = ['png', 'jpg', 'jpeg', 'webp', 'svg']

// 동적으로 이미지 경로를 생성하는 함수 (파일 존재 확인 없이)
export const findImagePath = (baseName: string, basePath: string): string => {
  // 기본값으로 png 반환
  return `${basePath}/${baseName}.png`
}

// 반응형 이미지 경로들을 생성하는 함수
export const findResponsiveImagePaths = (imageName: string, basePath: string) => {
  const desktopImage = findImagePath(imageName, basePath)
  const mobileImage = findImagePath(`${imageName}_m`, basePath)
  const tabletImage = findImagePath(`${imageName}_t`, basePath)
  
  return {
    desktopImage,
    mobileImage,
    tabletImage
  }
}
