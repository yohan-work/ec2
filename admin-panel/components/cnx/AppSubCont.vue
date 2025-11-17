<template>
  <div class="app-sub-cont" ref="containerRef">
    <!-- 상단 타이틀 영역 -->
    <div class="title-section">
      <div class="inner">
        <div class="title-content">
          <h2 v-if="title" ref="titleRef" class="title" v-html="title"></h2>
          <p v-if="description" ref="descriptionRef" class="description" v-html="description"></p>
        </div>
      </div>
    </div>

    <!-- 가운데 슬롯 영역 -->
    <div v-if="hasSlot" class="content-section">
      <slot />
    </div>

    <!-- 하단 이미지 영역 -->
    <div v-if="imageName" class="image-section">
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
          :alt="imageAlt || '이미지'"
          loading="lazy"
        />
      </picture>
    </div>
  </div>
</template>

<script setup>
import { computed, useSlots, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { findResponsiveImagePaths } from '~/utils/cnx/image-utils';
import { useIntersectionObserver } from '@vueuse/core';

const { title, description, imageName, imageAlt, imagePath } = defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
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
  imagePath: {
    type: String,
    default: ''
  }
});

const slots = useSlots();
const route = useRoute();

// refs
const containerRef = ref(null);
const titleRef = ref(null);
const descriptionRef = ref(null);

// Intersection Observer 상태
const isVisible = ref(false);
let lastScrollY = 0;
let isFirstCheck = true; // 첫 번째 체크인지 확인

// 슬롯이 있는지 확인하는 computed
const hasSlot = computed(() => !!slots.default);

// imagePath가 제공되면 사용, 아니면 현재 페이지 경로 사용
const baseImagePath = imagePath || `/assets/cnx${route.path}`;

// 반응형 이미지 경로들 생성
const imagePaths = computed(() => {
  if (!imageName) return { desktopImage: '', mobileImage: '', tabletImage: '' };
  return findResponsiveImagePaths(imageName, baseImagePath);
});

const { desktopImage, mobileImage, tabletImage } = imagePaths.value;

// VueUse Intersection Observer 설정
useIntersectionObserver(
  containerRef,
  ([{ isIntersecting }]) => {
    isVisible.value = isIntersecting;
    
    // 현재 스크롤 위치
    const currentScrollY = window.scrollY || window.pageYOffset;
    // 스크롤 방향 감지 (true: 아래로, false: 위로)
    const isScrollingDown = currentScrollY > lastScrollY;
    
    // 페이지 최상단에 있는지 확인 (스크롤 위치가 100px 이하)
    const isNearTop = currentScrollY < 100;
    
    if (isIntersecting && (isScrollingDown || isFirstCheck || isNearTop)) {
      // 아래로 스크롤하거나, 첫 로드이거나, 페이지 최상단인 경우 active 클래스 추가
      containerRef.value?.classList.add('active');
      isFirstCheck = false; // 첫 체크 완료
    } else if (!isIntersecting && !isScrollingDown) {
      // 위로 스크롤하면서 화면에서 벗어날 때 active 클래스 제거 (리셋)
      containerRef.value?.classList.remove('active');
      isFirstCheck = true; // 다시 첫 체크 상태로 (재진입 대비)
    }
    
    lastScrollY = currentScrollY;
  },
  {
    threshold: 0.2, // 20% 이상 보일 때 감지
    rootMargin: '-50px' // 뷰포트 경계에서 50px 안쪽에서 감지
  }
);
</script>

<style lang="scss" scoped>
.app-sub-cont {
  width: 100%;
  display: flex;
  flex-direction: column;

  // active 상태: 순차적 애니메이션
  &.active {
    .title {
      opacity: 1;
      transform: translateY(0);
      transition-delay: 0s;
    }

    .description {
      opacity: 1;
      transform: translateY(0);
      transition-delay: 0.3s; // 타이틀보다 0.3초 늦게
    }
  }
}

/* 상단 타이틀 영역 */
.title-section {
  background-color: $n-gray;
  padding: rem(50) 0;

  @include desktop {
    padding: rem(100) 0;
  }
}

.inner {
  max-width: rem(1200);
  margin: 0 auto;
  padding: 0 rem(20);
}

.title-content {
  text-align: center;
  max-width: rem(800);
  margin: 0 auto;
}

.title {
  @include sub-headline-01;
  color: $d-black;
  margin: 0 0 rem(24) 0;
  // 초기 상태: 투명하고 아래에 위치
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.description {
  @include body-02;
  color: $d-black;
  margin: 0;
  // 초기 상태: 투명하고 아래에 위치
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

/* 가운데 슬롯 영역 */
.content-section {
  padding: rem(40) rem(20);
  flex: 1;
}

/* 하단 이미지 영역 */
.image-section {
  height: rem(250);
  background-color: $d-white;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  @include tablet {
    height: rem(300);
  }

  @include desktop {
    height: rem(360);
  }

  picture {
    width: 100%;
    height: 100%;
    display: block;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}
</style>