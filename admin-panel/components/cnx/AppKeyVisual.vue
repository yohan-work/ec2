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
            @load="startAnimation"
          />
        </picture>
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

// 템플릿에서 사용할 변수들
const imageAlt = props.imageAlt
const animationDuration = props.animationDuration

const route = useRoute()
// imagePath가 제공되면 사용, 아니면 현재 페이지 경로 사용
const baseImagePath = props.imagePath || `/assets/cnx${route.path}`

// 반응형 이미지 경로들
const desktopImage = ref('')
const mobileImage = ref('')
const tabletImage = ref('')

// 애니메이션 상태
const isAnimating = ref(false)

// 애니메이션 시작 함수
const startAnimation = () => {
  isAnimating.value = true
  
  // 애니메이션 완료 후 상태 리셋
  setTimeout(() => {
    isAnimating.value = false
  }, props.animationDuration)
}

// 이미지 경로 초기화 및 애니메이션 시작
onMounted(() => {
  // 유틸 함수를 사용하여 반응형 이미지 경로들 생성
  const imagePaths = findResponsiveImagePaths('kv', baseImagePath)
  desktopImage.value = imagePaths.desktopImage
  mobileImage.value = imagePaths.mobileImage
  tabletImage.value = imagePaths.tabletImage
  
  // 이미지가 로드된 후 애니메이션 시작
  setTimeout(() => {
    startAnimation()
  }, 100)
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