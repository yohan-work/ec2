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
import { computed, useSlots, ref, onMounted, onUnmounted, nextTick } from 'vue';
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
const containerRef = ref(null);
const titleRef = ref(null);
const descriptionRef = ref(null);
// ScrollTrigger 인스턴스 저장
let scrollTriggerInstance = null;

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
  if (!containerRef.value) return { timeline: null, scrollTrigger: null };
  if (!titleRef.value && !descriptionRef.value) return { timeline: null, scrollTrigger: null };

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

  // 타임라인을 paused로 시작
  const tl = gsap.timeline({ paused: true });

  // 순차적 애니메이션: 타이틀 → 디스크립션
  if (titleRef.value) {
    tl.to(titleRef.value, {
      duration: 0.6,
      opacity: 1,
      y: 0,
      ease: 'power2.out',
      immediateRender: false
    });
  }
  
  if (descriptionRef.value) {
    tl.to(descriptionRef.value, {
      duration: 0.6,
      opacity: 1,
      y: 0,
      ease: 'power2.out',
      immediateRender: false
    }, '-=0.3'); // 타이틀 애니메이션과 0.3초 겹침
  }

  // ScrollTrigger를 별도로 생성하고 저장
  scrollTriggerInstance = ScrollTrigger.create({
    trigger: containerRef.value,
    start: 'top 80%',
    end: 'bottom 20%',
    onEnter: () => tl.play(), // 확실히 트리거되었을 때만 재생
    onLeaveBack: () => tl.reverse(),
    immediateRender: false
  });
  
  return { timeline: tl, scrollTrigger: scrollTriggerInstance };
};

// 컴포넌트 마운트 시 애니메이션 초기화
onMounted(async () => {
  await nextTick();
  
  if (!containerRef.value) return;
  
  requestAnimationFrame(() => {
    try {
      // 애니메이션 초기화 (항상 실행)
      const { timeline: tl, scrollTrigger } = initAnimation();
      
      // ScrollTrigger refresh 호출
      gsap.registerPlugin(ScrollTrigger);
      try {
        ScrollTrigger.refresh();
        
        // refresh 후 상태 확인
        if (tl && scrollTrigger && scrollTrigger.isActive) {
          // 이미 활성화되어 있다면 타임라인을 즉시 재생
          tl.play(0);
        }
      } catch (_) { /* noop */ }
    } catch (error) {
      // 에러 발생 시 기본 애니메이션 초기화
      console.warn('AppSubCont animation initialization error:', error);
      initAnimation();
    }
  });
});

// 컴포넌트 언마운트 시 ScrollTrigger 정리
onUnmounted(() => {
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill();
    scrollTriggerInstance = null;
  }
});
</script>

<style lang="scss" scoped>
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