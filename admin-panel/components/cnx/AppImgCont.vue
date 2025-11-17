<template>
  <div class="app-img-cont" :class="{ 'reverse': reverse, 'align-top': alignTop }" ref="containerRef">
    <!-- 텍스트 컨텐츠 -->
    <div class="text-content" ref="textContentRef">
      <div 
        v-if="title" 
        class="subtitle" 
        ref="titleRef"
        v-html="`<${headingLevel}>${title}</${headingLevel}>`"
      ></div>
      <p v-if="text" class="description" ref="textRef" v-html="text"></p>
      
      <!-- 통합 아이템들 -->
      <div v-if="subItems && subItems.length > 0" class="unified-items" ref="unifiedItemsRef">
        <!-- 서브 아이템들 -->
        <div v-if="subItems && subItems.length > 0" class="sub-items" ref="subItemsRef">
          <div 
            v-for="(item, index) in subItems" 
            :key="`sub-${index}`" 
            class="sub-item"
            :ref="el => subItemRefs[index] = el"
          >
            <!-- 타이틀 영역 (타이틀이 있을 때만 표시) -->
            <div 
              v-if="item.title" 
              class="sub-title"
              v-html="`<${subHeadingLevel}>${item.title}</${subHeadingLevel}>`"
            ></div>
            <!-- 통합 리스트 -->
            <ul v-if="item.listItems && item.listItems.length > 0" class="unified-list">
              <li 
                v-for="(listItem, listIndex) in item.listItems" 
                :key="`sub-list-${index}-${listIndex}`" 
                class="unified-list-item"
                v-html="listItem"
              ></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 이미지/비디오 컨텐츠 -->
    <div class="image-content" :class="{ 'video-content': vimeoId }" ref="imageContentRef">
      <!-- 비메오 비디오 -->
      <iframe 
        v-if="vimeoId"
        :src="`https://player.vimeo.com/video/${vimeoId}`"
        :title="imageAlt || title || 'Video'"
        :aria-label="imageAlt || title || 'Video'"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
        class="content-video"
      ></iframe>
      
      <!-- 이미지 -->
      <template v-else>
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
            :alt="imageAlt || title || 'Image'"
            class="content-image"
            loading="lazy"
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
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { findResponsiveImagePaths } from '~/utils/cnx/image-utils'
import { useIntersectionObserver } from '@vueuse/core'

// Props 정의
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  },
  imageName: {
    type: String,
    default: ''
  },
  imageAlt: {
    type: String,
    default: ''
  },
  reverse: {
    type: Boolean,
    default: false
  },
  imagePath: {
    type: String,
    default: ''
  },
  subItems: {
    type: Array,
    default: () => []
  },
  headingLevel: {
    type: String,
    default: 'h2',
    validator: (value) => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(value)
  },
  alignTop: {
    type: Boolean,
    default: false
  },
  vimeoId: {
    type: String,
    default: ''
  }
})

// 템플릿에서 사용할 변수들
const title = props.title
const text = props.text
const imageAlt = props.imageAlt
const reverse = props.reverse
const headingLevel = props.headingLevel

// 서브 헤딩 레벨 계산 (메인 헤딩의 다음 레벨)
const subHeadingLevel = computed(() => {
  const level = parseInt(headingLevel.charAt(1))
  const nextLevel = Math.min(level + 1, 6) // 최대 h6까지
  return `h${nextLevel}`
})

// refs
const containerRef = ref(null)
const imageContentRef = ref(null)
const titleRef = ref(null)
const textRef = ref(null)
const subItemsRef = ref(null)
const subItemRefs = ref([])
const unifiedItemsRef = ref(null)

const route = useRoute()
// imagePath가 제공되면 사용, 아니면 현재 페이지 경로 사용
const baseImagePath = props.imagePath || `/assets/cnx${route.path}`

// 반응형 이미지 경로들
const desktopImage = ref('')
const mobileImage = ref('')
const tabletImage = ref('')

// 이미지 로드 상태
const isImageLoaded = ref(false)
const imageRef = ref(null)

// Intersection Observer 상태
const isVisible = ref(false)
let lastScrollY = 0
let isFirstCheck = true // 첫 번째 체크인지 확인

// 이미지 로드 완료 핸들러
const onImageLoad = () => {
  isImageLoaded.value = true
}

// 이미지 로드 실패 핸들러
const onImageError = () => {
  // 에러 시 스켈레톤 유지 (개발 시 이미지 경로 문제 확인 가능)
  console.error('Image failed to load:', mobileImage.value || desktopImage.value)
}

// 이미지 경로 확인 및 캐시된 이미지 체크
const checkImageStatus = () => {
  // 비메오 비디오인 경우 스켈레톤 숨김
  if (props.vimeoId) {
    isImageLoaded.value = true
    return
  }
  
  // 이미지 경로가 없으면 스켈레톤 숨김
  if (!mobileImage.value && !desktopImage.value) {
    isImageLoaded.value = true
    return
  }
  
  // 이미지가 이미 로드되었는지 확인 (캐시된 경우)
  if (imageRef.value?.complete) {
    isImageLoaded.value = true
  }
}

// VueUse Intersection Observer 설정
useIntersectionObserver(
  containerRef,
  ([{ isIntersecting }]) => {
    isVisible.value = isIntersecting
    
    // 현재 스크롤 위치
    const currentScrollY = window.scrollY || window.pageYOffset
    // 스크롤 방향 감지 (true: 아래로, false: 위로)
    const isScrollingDown = currentScrollY > lastScrollY
    
    // 페이지 최상단에 있는지 확인 (스크롤 위치가 100px 이하)
    const isNearTop = currentScrollY < 100
    
    if (isIntersecting && (isScrollingDown || isFirstCheck || isNearTop)) {
      // 아래로 스크롤하거나, 첫 로드이거나, 페이지 최상단인 경우 active 클래스 추가
      containerRef.value?.classList.add('active')
      // unified-items와 sub-items에도 active 클래스 추가
      if (unifiedItemsRef.value) {
        unifiedItemsRef.value.classList.add('active')
      }
      if (subItemsRef.value) {
        subItemsRef.value.classList.add('active')
      }
      // 모든 unified-list에도 active 클래스 추가
      if (containerRef.value) {
        const unifiedLists = containerRef.value.querySelectorAll('.unified-list')
        unifiedLists.forEach(list => list.classList.add('active'))
      }
      isFirstCheck = false // 첫 체크 완료
    } else if (!isIntersecting && !isScrollingDown) {
      // 위로 스크롤하면서 화면에서 벗어날 때 active 클래스 제거 (리셋)
      containerRef.value?.classList.remove('active')
      // unified-items와 sub-items에서도 active 클래스 제거
      if (unifiedItemsRef.value) {
        unifiedItemsRef.value.classList.remove('active')
      }
      if (subItemsRef.value) {
        subItemsRef.value.classList.remove('active')
      }
      // 모든 unified-list에서도 active 클래스 제거
      if (containerRef.value) {
        const unifiedLists = containerRef.value.querySelectorAll('.unified-list')
        unifiedLists.forEach(list => list.classList.remove('active'))
      }
      isFirstCheck = true // 다시 첫 체크 상태로 (재진입 대비)
    }
    
    lastScrollY = currentScrollY
  },
  {
    threshold: 0.2, // 20% 이상 보일 때 감지
    rootMargin: '-50px' // 뷰포트 경계에서 50px 안쪽에서 감지
  }
)

// 이미지 경로 초기화 (SSR 지원) - 비메오 ID가 없을 때만
if (props.imageName && !props.vimeoId) {
  // 유틸 함수를 사용하여 반응형 이미지 경로들 생성
  const imagePaths = findResponsiveImagePaths(props.imageName, baseImagePath)
  desktopImage.value = imagePaths.desktopImage
  mobileImage.value = imagePaths.mobileImage
  tabletImage.value = imagePaths.tabletImage
}

// 이미지 상태 체크는 마운트 시 실행
onMounted(() => {
  checkImageStatus()
})
</script>

<style lang="scss" scoped>
.app-img-cont {
  display: flex;
  flex-direction: column;
  gap: rem(38);
  margin-bottom: rem(66);

  // 모바일: 상하 배치 (기본)
  @include tablet {
    flex-direction: row;
    align-items: center;
    gap: rem(24);
    margin-bottom: rem(60);
  }

  // 정렬 옵션 (기본값: center)
  @include tablet {
    align-items: center;
  }

  &.align-top {
    @include tablet {
      align-items: flex-start;
    }
  }

  @include desktop {
    gap: rem(32);
    margin-bottom: rem(120);
  }

  .text-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: rem(24);
    order: 2; // 모바일에서 텍스트를 아래로

    @include tablet {
      order: 1; // 태블릿 이상에서 텍스트를 좌측으로
    }

    @include desktop {
      padding-right: rem(100);
    }

    .subtitle {
      @include sub-headline-02;
      color: $d-black;
      margin: 0;
      // 초기 상태: 투명하고 아래에 위치
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }

    .description {
      @include body-02;
      color: $d-black;
      margin: 0;
      line-height: 1.6;
      // 초기 상태: 투명하고 아래에 위치
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }

    .unified-items {
      margin-top: rem(24);
    }

    .sub-items {
      display: flex;
      flex-direction: column;
      gap: rem(24);

      // 서브아이템이 1개일 때는 간격 제거
      &:has(.sub-item:only-child) {
        gap: 0;
      }

      .sub-item {
        display: flex;
        flex-direction: column;
        // 초기 상태: 투명하고 아래에 위치
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease-out, transform 0.5s ease-out;

        .sub-title {
          @include body-03;
          color: $d-black;
          margin: 0;
          font-weight: 700;
          margin-bottom: rem(4);

          @include tablet {
            margin-bottom: rem(6);
          }

          @include desktop {
            margin-bottom: rem(8);
          }
        }

        .unified-list {
          margin: 0;
          padding: 0;
          list-style: none;

          // 제목이 있는 subItem 안의 리스트만 margin-top 적용
          .sub-item:has(.sub-title) & {
            margin-top: rem(12);
          }

          .unified-list-item {
            @include body-03;
            color: $gray-1;
            margin: 0;
            line-height: 1.6;
            position: relative;
            padding-left: rem(16);

            &::before {
              content: '•';
              position: absolute;
              left: 0;
              color: $gray-1;
              font-weight: bold;
            }

            :deep(b) {
              font-weight: 700;
            }
          }
        }
      }
    }

    // 제목이 있는 subItems - bullet 제거
    .sub-items .sub-item:has(.sub-title) {
      .unified-list-item {
        padding-left: 0;

        &::before {
          display: none;
        }
      }
    }

  }

  // 리버스 옵션일 때 padding 방향 변경
  &.reverse {
    @include tablet {
      flex-direction: row-reverse;
    }

    .text-content {
      @include desktop {
        padding-right: 0;
        padding-left: rem(100);
      }
    }
  }

  .image-content {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    order: 1; // 모바일에서 이미지를 위로
    // 초기 상태: 투명하고 아래에 위치
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;

    picture {
      width: 100%;
      height: 100%;
      display: block;
    }

    .content-image {
      width: 100%;
      /* height: 100%; */
      object-fit: contain;
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

    // 비메오 비디오 스타일
    &.video-content {
      aspect-ratio: unset; // 비메오 기본 비율 사용
      
      .content-video {
        width: 100%;
        height: auto;
        aspect-ratio: 16 / 9; // 비메오 기본 비율
        border: none;
        border-radius: rem(8);
      }
    }

    @include tablet {
      flex: 1;
      order: 2; // 태블릿 이상에서 이미지를 우측으로
      
      &.video-content {
        aspect-ratio: unset; // 비메오 기본 비율 사용
      }
    }

    @include desktop {
      flex: 1;
      
      &.video-content {
        aspect-ratio: unset; // 비메오 기본 비율 사용
      }
    }
  }

  // active 상태: fadeup 모션 실행
  &.active {
    .image-content {
      opacity: 1;
      transform: translateY(0);
    }
    
    .subtitle {
      opacity: 1;
      transform: translateY(0);
      transition-delay: 0.2s; // 이미지 다음에 나타남
    }
    
    .description {
      opacity: 1;
      transform: translateY(0);
      transition-delay: 0.3s; // subtitle 다음에 나타남
    }
    
    // sub-items가 active일 때
    .sub-items.active {
      .sub-item {
        opacity: 1;
        transform: translateY(0);
        
        // stagger 효과: 각 sub-item마다 순차적으로 나타남
        @for $i from 1 through 10 {
          &:nth-child(#{$i}) {
            transition-delay: #{0.4 + ($i - 1) * 0.1}s;
          }
        }
      }
    }
    
    // unified-list가 active일 때 - 리스트 아이템들
    .unified-list.active {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
