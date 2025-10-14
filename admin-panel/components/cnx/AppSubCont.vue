<template>
  <div class="app-sub-cont">
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
          media="(min-width: 1320px)"
        />
        <source 
          v-if="tabletImage"
          :srcset="tabletImage" 
          media="(min-width: 768px)"
        />
        <img 
          :src="mobileImage || desktopImage" 
          :alt="imageAlt || '이미지'"
        />
      </picture>
    </div>
  </div>
</template>

<script setup>
import { computed, useSlots, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { findResponsiveImagePaths } from '~/utils/cnx/image-utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP ScrollTrigger 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

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

// refs for GSAP animation
const titleRef = ref(null);
const descriptionRef = ref(null);

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

// GSAP 애니메이션 초기화
const initAnimation = () => {
  if (!titleRef.value && !descriptionRef.value) return;

  // 초기 상태 설정 (애니메이션 전 상태)
  if (titleRef.value) {
    gsap.set(titleRef.value, { 
      opacity: 0, 
      y: 30 
    });
  }
  if (descriptionRef.value) {
    gsap.set(descriptionRef.value, { 
      opacity: 0, 
      y: 30 
    });
  }

  // ScrollTrigger 애니메이션 설정
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.app-sub-cont',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    }
  });

  // 순차적 애니메이션: 타이틀 → 디스크립션
  if (titleRef.value) {
    tl.to(titleRef.value, {
      duration: 0.6,
      opacity: 1,
      y: 0,
      ease: 'power2.out'
    });
  }
  
  if (descriptionRef.value) {
    tl.to(descriptionRef.value, {
      duration: 0.6,
      opacity: 1,
      y: 0,
      ease: 'power2.out'
    }, '-=0.3'); // 타이틀 애니메이션과 0.3초 겹침
  }
};

// 컴포넌트 마운트 시 애니메이션 초기화
onMounted(() => {
  initAnimation();
});
</script>

<style lang="scss" scoped>
@use '~/layouts/scss/cnx.scss' as *;
@use '~/layouts/scss/cnx/_variables' as *;
@use '~/layouts/scss/cnx/_mixins' as *;
@use '~/layouts/scss/cnx/_functions' as *;
@use '~/layouts/scss/cnx/_base' as *;

.app-sub-cont {
  width: 100%;
  display: flex;
  flex-direction: column;
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
}

.description {
  @include body-02;
  color: $d-black;
  margin: 0;
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