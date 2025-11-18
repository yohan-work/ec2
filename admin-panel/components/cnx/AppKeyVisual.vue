<template>
  <div class="app-key-visual">
    <div 
      class="key-visual-image"
      :class="{ 'animate': isAnimating }"
    >
        <picture>
          <source 
            v-if="desktopImage"
            :srcset="desktopImage" 
            media="(min-width: 1480px)"
          />
          <source 
            v-if="tabletImage"
            :srcset="tabletImage" 
            media="(min-width: 768px)"
          />
          <img 
            :src="mobileImage || desktopImage" 
            :alt="imageAlt || 'Key Visual'"
            @load="onImageLoad"
            @error="onImageError"
            ref="imageRef"
          />
        </picture>
        <!-- 스켈레톤 오버레이 -->
        <div 
          class="skeleton-overlay"
          :class="{ 'hidden': isImageLoaded }"
        ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { findResponsiveImagePaths } from '~/utils/cnx/image-utils'

// Props 정의
const props = defineProps({
  imageAlt: {
    type: String,
    default: ''
  },
  animationDuration: {
    type: Number,
    default: 1000
  },
  imagePath: {
    type: String,
    default: ''
  }
})

const route = useRoute()
// imagePath가 제공되면 사용, 아니면 현재 페이지 경로 사용
// 쿼리 파라미터와 해시를 제거한 순수한 경로만 사용
let cleanPath = route.path.split('?')[0].split('#')[0]
// cleanPath에서 /cnx 접두사 제거 (이미 /assets/cnx에 포함되므로)
if (cleanPath.startsWith('/cnx')) {
  cleanPath = cleanPath.replace(/^\/cnx/, '')
}
// baseImagePath 설정
const baseImagePath = props.imagePath || `/assets/cnx${cleanPath}`

// 반응형 이미지 경로들
const desktopImage = ref('')
const mobileImage = ref('')
const tabletImage = ref('')

// 애니메이션 상태
const isAnimating = ref(false)
// 이미지 로드 상태
const isImageLoaded = ref(false)
// 이미지 ref
const imageRef = ref(null)

// 이미지 로드 완료 핸들러
const onImageLoad = () => {
  isImageLoaded.value = true
  startAnimation()
}

// 이미지 로드 실패 핸들러
const onImageError = () => {
  // 에러 시 스켈레톤 유지 (개발 시 이미지 경로 문제 확인 가능)
  console.error('Image failed to load:', mobileImage.value || desktopImage.value)
}

// 애니메이션 시작 함수
const startAnimation = () => {
  isAnimating.value = true
  
  // 애니메이션 완료 후 상태 리셋
  setTimeout(() => {
    isAnimating.value = false
  }, props.animationDuration)
}

// 이미지 경로 확인 및 캐시된 이미지 체크
const checkImageStatus = () => {
  // 이미지 경로가 없으면 스켈레톤 숨김
  if (!mobileImage.value && !desktopImage.value) {
    isImageLoaded.value = true
    return
  }
  
  // 이미지가 이미 로드되었는지 확인 (캐시된 경우)
  if (imageRef.value?.complete) {
    isImageLoaded.value = true
    startAnimation()
  }
}

// 이미지 경로 초기화 (SSR 지원)
const imagePaths = findResponsiveImagePaths('kv', baseImagePath)
desktopImage.value = imagePaths.desktopImage
mobileImage.value = imagePaths.mobileImage
tabletImage.value = imagePaths.tabletImage

// 클라이언트에서 이미지 상태 체크
onMounted(() => {
  checkImageStatus()
})
</script>

<style lang="scss" scoped>
.app-key-visual {
  width: 100%;
  height: rem(150); // 모바일 기본 150px
  overflow: hidden;
  position: relative;
  
  // 태블릿 (1024px 이상)
  @include tablet {
    height: rem(230); // 230px
  }
  
  // 데스크톱 (1920px 이상)
  @include desktop {
    height: rem(360); // 360px
  }
}

.key-visual-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  picture {
    width: 100%;
    height: 100%;
    display: block;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease-out;
  }
  
  // 스켈레톤 오버레이
  .skeleton-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $gray-3;
    z-index: 1;
    transition: opacity 0.3s ease-out;
    
    &.hidden {
      opacity: 0;
      pointer-events: none;
    }
  }
  
  // 애니메이션 상태
  &.animate img {
    transform: scale(1.2);
    animation: zoomInOut v-bind('animationDuration + "ms"') ease-out;
  }
}

// 키프레임 애니메이션
@keyframes zoomInOut {
  0% {
    transform: scale(1.2);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.9;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

</style>