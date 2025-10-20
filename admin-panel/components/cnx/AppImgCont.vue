<template>
  <div class="app-img-cont" :class="{ 'reverse': reverse, 'has-sub-items': subItems && subItems.length > 0 }" ref="containerRef">
    <!-- 텍스트 컨텐츠 -->
    <div class="text-content" ref="textContentRef">
      <h3 v-if="title" class="subtitle" ref="titleRef" v-html="title"></h3>
      <p v-if="text" class="description" ref="textRef" v-html="text"></p>
      
      <!-- 서브 아이템들 -->
      <div v-if="subItems && subItems.length > 0" class="sub-items" ref="subItemsRef">
        <div 
          v-for="(item, index) in subItems" 
          :key="index" 
          class="sub-item"
          :ref="el => subItemRefs[index] = el"
        >
          <h4 v-if="item.title" class="sub-title" v-html="item.title"></h4>
          <p v-if="item.text" class="sub-text" v-html="item.text"></p>
        </div>
      </div>
      
      <!-- 리스트 아이템들 -->
      <div v-if="listItems && listItems.length > 0" class="list-items" ref="listItemsRef">
        <ul class="list-content">
          <li 
            v-for="(item, index) in listItems" 
            :key="index" 
            class="list-item"
            :ref="el => listItemRefs[index] = el"
            v-html="item"
          ></li>
        </ul>
      </div>
    </div>
    
    <!-- 이미지 컨텐츠 -->
    <div class="image-content" ref="imageContentRef">
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
          @load="onImageLoad"
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
import { ref, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { findResponsiveImagePaths } from '~/utils/cnx/image-utils'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// GSAP ScrollTrigger 플러그인 등록
gsap.registerPlugin(ScrollTrigger)

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
  listItems: {
    type: Array,
    default: () => []
  }
})

// 템플릿에서 사용할 변수들
const title = props.title
const text = props.text
const imageAlt = props.imageAlt
const reverse = props.reverse

// refs for GSAP animation
const containerRef = ref(null)
const imageContentRef = ref(null)
const titleRef = ref(null)
const textRef = ref(null)
const subItemsRef = ref(null)
const subItemRefs = ref([])
const listItemsRef = ref(null)
const listItemRefs = ref([])

const route = useRoute()
// imagePath가 제공되면 사용, 아니면 현재 페이지 경로 사용
const baseImagePath = props.imagePath || `/assets/cnx${route.path}`

// 반응형 이미지 경로들
const desktopImage = ref('')
const mobileImage = ref('')
const tabletImage = ref('')

// 이미지 로드 상태
const isImageLoaded = ref(false)

// 이미지 로드 완료 핸들러
const onImageLoad = () => {
  isImageLoaded.value = true
}

// GSAP 애니메이션 초기화
const initAnimation = () => {
  if (!containerRef.value) return

  // DOM 요소들이 실제로 존재하는지 확인
  const actualListItems = listItemsRef.value?.querySelectorAll('.list-item')
  
  // 리스트 아이템들이 DOM에 존재하지 않으면 재시도
  if (props.listItems && props.listItems.length > 0 && (!actualListItems || actualListItems.length === 0)) {
    setTimeout(initAnimation, 100)
    return
  }

  // 초기 상태 설정
  if (imageContentRef.value) {
    gsap.set(imageContentRef.value, { opacity: 0, y: 50 })
  }
  if (titleRef.value) {
    gsap.set(titleRef.value, { opacity: 0, y: 30 })
  }
  if (textRef.value) {
    gsap.set(textRef.value, { opacity: 0, y: 30 })
  }
  
  if (subItemRefs.value && subItemRefs.value.length > 0) {
    subItemRefs.value.forEach(subItemRef => {
      if (subItemRef) {
        gsap.set(subItemRef, { opacity: 0, y: 20 })
      }
    })
  }
  
  if (listItemRefs.value && listItemRefs.value.length > 0) {
    listItemRefs.value.forEach(listItemRef => {
      if (listItemRef) {
        gsap.set(listItemRef, { opacity: 0, y: 15 })
      }
    })
  }

  // ScrollTrigger 애니메이션 설정
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: containerRef.value,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    }
  })

  // 순차적 애니메이션
  if (imageContentRef.value) {
    tl.to(imageContentRef.value, {
      duration: 0.8,
      opacity: 1,
      y: 0,
      ease: 'power2.out'
    })
  }
  if (titleRef.value) {
    tl.to(titleRef.value, {
      duration: 0.6,
      opacity: 1,
      y: 0,
      ease: 'power2.out'
    }, '-=0.4')
  }
  if (textRef.value) {
    tl.to(textRef.value, {
      duration: 0.6,
      opacity: 1,
      y: 0,
      ease: 'power2.out'
    }, '-=0.3')
  }
  
  if (subItemRefs.value && subItemRefs.value.length > 0) {
    tl.to(subItemRefs.value, {
      duration: 0.5,
      opacity: 1,
      y: 0,
      ease: 'power2.out',
      stagger: 0.1
    }, '-=0.2')
  }
  
  if (listItemRefs.value && listItemRefs.value.length > 0) {
    tl.to(listItemRefs.value, {
      duration: 0.5,
      opacity: 1,
      y: 0,
      ease: 'power2.out',
      stagger: 0.2
    }, '-=0.2')
  }
}

// 이미지 경로 초기화 및 애니메이션 설정
onMounted(async () => {
  if (props.imageName) {
    // 유틸 함수를 사용하여 반응형 이미지 경로들 생성
    const imagePaths = findResponsiveImagePaths(props.imageName, baseImagePath)
    desktopImage.value = imagePaths.desktopImage
    mobileImage.value = imagePaths.mobileImage
    tabletImage.value = imagePaths.tabletImage
  }

  // DOM이 완전히 렌더링된 후 애니메이션 초기화
  await nextTick()
  requestAnimationFrame(() => {
    initAnimation()
  })
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

  // 서브 아이템이 있을 때 정렬을 top으로 변경
  &.has-sub-items {
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
    }

    .description {
      @include body-02;
      color: $d-black;
      margin: 0;
      line-height: 1.6;
    }

    .sub-items {
      margin-top: rem(18);
      display: flex;
      flex-direction: column;
      gap: rem(24);

      // 서브아이템이 1개일 때는 간격 제거
      &:has(.sub-item:only-child) {
        gap: 0;
      }

      @include tablet {
        margin-top: rem(30);
      }

      @include desktop {
        margin-top: rem(65);
      }

      .sub-item {
        display: flex;
        flex-direction: column;
        gap: rem(8);

        .sub-title {
          @include body-03;
          color: $d-black;
          margin: 0;
          font-weight: 700;
        }

        .sub-text {
          @include body-03;
          color: $gray-1;
          margin: 0;
          line-height: 1.6;
        }
      }
    }

    .list-items {
      .list-content {
        margin: 0;
        padding: 0;
        list-style: none;

        .list-item {
          @include body-02;
          color: $gray-4;
          margin: 0;
          line-height: 1.6;
          position: relative;
          padding-left: rem(16);

          &::before {
            content: '•';
            position: absolute;
            left: 0;
            color: $gray-4;
            font-weight: bold;
          }
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

    picture {
      width: 100%;
      height: 100%;
      display: block;
    }

    .content-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
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

    // 모바일: 312/210 비율
    aspect-ratio: 312 / 210;

    @include tablet {
      // 태블릿: 308/231 비율
      aspect-ratio: 308 / 231;
      flex: 1;
      order: 2; // 태블릿 이상에서 이미지를 우측으로
    }

    @include desktop {
      // PC: 644/400 비율
      aspect-ratio: 644 / 400;
      flex: 1;
    }
  }

}
</style>
