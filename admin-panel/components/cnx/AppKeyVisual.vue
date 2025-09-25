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
            media="(min-width: 1024px)"
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

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// Props 정의
interface Props {
  imageAlt?: string
  animationDuration?: number
}

const props = withDefaults(defineProps<Props>(), {
  imageAlt: '',
  animationDuration: 1000 // 1초
})

const route = useRoute()
const baseImagePath = `/assets/cnx${route.path}`

// 지원하는 이미지 확장자 목록 (우선순위 순)
const supportedExtensions = ['png', 'jpg', 'jpeg', 'webp', 'svg']

// 이미지 존재 여부를 확인하는 함수
const checkImageExists = async (imagePath: string): Promise<boolean> => {
  try {
    const response = await fetch(imagePath, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}

// 동적으로 이미지 경로를 찾는 함수
const findImagePath = async (baseName: string): Promise<string> => {
  for (const ext of supportedExtensions) {
    const imagePath = `${baseImagePath}/${baseName}.${ext}`
    if (await checkImageExists(imagePath)) {
      return imagePath
    }
  }
  // 모든 확장자를 시도했지만 찾지 못한 경우, 기본값으로 png 반환
  return `${baseImagePath}/${baseName}.png`
}

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
onMounted(async () => {
  // 이미지 경로들을 동적으로 찾아서 설정
  desktopImage.value = await findImagePath('kv')
  mobileImage.value = await findImagePath('kv_m')
  tabletImage.value = await findImagePath('kv_t')
  
  // 이미지가 로드된 후 애니메이션 시작
  setTimeout(() => {
    startAnimation()
  }, 100)
})
</script>

<style lang="scss" scoped>
@use '~/layouts/scss/cnx/_functions' as *;
@use '~/layouts/scss/cnx/_mixins' as *;
@use '~/layouts/scss/cnx/_variables' as *;

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