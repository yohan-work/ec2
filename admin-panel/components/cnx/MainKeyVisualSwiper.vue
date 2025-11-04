<template>
  <div class="main-key-visual-swiper">
    <swiper
      :slidesPerView="1"
      :effect="'fade'"
      :pagination="paginationConfig"
      :navigation="navigationConfig"
      :modules="modules"
      :loop="true"
      :speed="speed"
      :autoplay="autoplayConfig"
      @swiper="onSwiperInit"
      @slideChange="onSlideChange"
      class="swiper-container"
    >
      <swiper-slide 
        v-for="(slide, index) in slides" 
        :key="index"
        class="swiper-slide"
        :class="{ 'swiper-slide-active': currentActiveIndex === index }"
      >
        <div class="slide-wrapper">
          <!-- 비디오 배경 -->
          <template v-if="slide.type === 'video'">
            <video
              v-if="slide.mobileVideo"
              :src="slide.mobileVideo"
              muted
              autoplay
              playsinline
              loop
              class="slide-video mobile"
              :aria-label="slide.imageAlt || slide.title || 'Key Visual'"
            ></video>
            <video
              v-if="slide.desktopVideo"
              :src="slide.desktopVideo"
              muted
              autoplay
              playsinline
              loop
              class="slide-video desktop"
              :aria-label="slide.imageAlt || slide.title || 'Key Visual'"
            ></video>
          </template>

          <!-- 이미지 배경 -->
          <picture v-else class="slide-image" :class="{ 'is-active': currentActiveIndex === index && slide.type !== 'video' }">
            <source 
              v-if="slide.desktopImage"
              :srcset="slide.desktopImage" 
              media="(min-width: 1480px)"
            />
            <source 
              v-if="slide.tabletImage"
              :srcset="slide.tabletImage" 
              media="(min-width: 768px)"
            />
            <img 
              :src="slide.mobileImage || slide.desktopImage" 
              :alt="slide.imageAlt || slide.title || 'Key Visual'"
              loading="lazy"
            />
          </picture>

          <!-- 오버레이 컨텐츠 (중앙 세로 정렬) -->
          <div v-if="slide.title || slide.description || slide.button" class="slide-content">
            <div class="inner">
              <h2 v-if="slide.title" class="slide-title" v-html="slide.title"></h2>
              <p v-if="slide.description" class="slide-description" v-html="slide.description"></p>
              <AppButton
                v-if="slide.button"
                :text="slide.button.text"
                :to="slide.button.to"
                :href="slide.button.href"
                :variant="slide.button.variant || undefined"
                :color="slide.button.color || 'white'"
                :arrow="slide.button.arrow !== undefined ? slide.button.arrow : true"
                class="slide-button"
              />
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>

    <!-- Pagination -->
    <div class="slide-pagination-wrap">
      <div class="swiper-pagination-custom" ref="paginationElRef"></div>
    </div>

    <!-- Custom Navigation Buttons -->
    <div class="swiper-button-prev-custom" ref="prevElRef">
      <AppButton 
        variant="circle" 
        arrow="reverse" 
        color="white"
        text=""
        aria-label="이전 슬라이드로 이동"
      />
    </div>
    <div class="swiper-button-next-custom" ref="nextElRef">
      <AppButton 
        variant="circle" 
        arrow 
        color="white"
        text=""
        aria-label="다음 슬라이드로 이동"
      />
    </div> 

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppButton from './AppButton.vue'

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation, EffectFade, Autoplay } from 'swiper/modules'

// Swiper 모듈 설정
const modules = [Pagination, Navigation, EffectFade, Autoplay]

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'

// Props 정의
const props = defineProps({
  slides: {
    type: Array,
    required: true,
    validator: (value) => {
      return Array.isArray(value) && value.every(slide => {
        if (!slide || typeof slide !== 'object') return false
        
        const type = slide.type || 'image'
        
        if (type === 'video') {
          return !!(slide.mobileVideo || slide.desktopVideo)
        } else {
          return !!(slide.mobileImage || slide.desktopImage)
        }
      })
    }
  },
  speed: {
    type: Number,
    default: 400
  },
  autoplay: {
    type: [Number, Boolean],
    default: 5000
  }
})

// Custom navigation, pagination ref
const swiperInstance = ref(null)
const prevElRef = ref(null)
const nextElRef = ref(null)
const paginationElRef = ref(null)

// 현재 활성 슬라이드 인덱스
const currentActiveIndex = ref(0)

// Swiper 인스턴스 저장
const onSwiperInit = (swiper) => {
  swiperInstance.value = swiper
  // 초기 활성 인덱스 설정
  currentActiveIndex.value = swiper.realIndex !== undefined ? swiper.realIndex : swiper.activeIndex
}

// 슬라이드 변경 이벤트 핸들러
const onSlideChange = (swiper) => {
  currentActiveIndex.value = swiper.realIndex !== undefined ? swiper.realIndex : swiper.activeIndex
}

// Pagination 설정
const paginationConfig = computed(() => ({
  clickable: true,
  el: paginationElRef.value,
  type: 'bullets',
  renderBullet: (index, className) => {
    return `<button class="${className} custom-bullet"><span class="a11y-hidden">${index + 1}번째 슬라이드</span></button>`
  }
}))

// Navigation 설정
const navigationConfig = computed(() => ({
  prevEl: prevElRef.value,
  nextEl: nextElRef.value,
}))

// Autoplay 설정
const autoplayConfig = computed(() => {
  if (!props.autoplay) {
    return false
  }
  return {
    delay: typeof props.autoplay === 'number' ? props.autoplay : 5000,
    disableOnInteraction: false
  }
})
</script>

<style lang="scss" scoped>
@use '~/layouts/scss/cnx/_functions' as *;
@use '~/layouts/scss/cnx/_mixins' as *;
@use '~/layouts/scss/cnx/_variables' as *;
@use '~/layouts/scss/cnx/_base' as *;

.main-key-visual-swiper {
  position: relative;
  width: 100%;
  height: rem(250);
  overflow: hidden;

  @include tablet {
    height: rem(250);
  }

  @include desktop {
    height: rem(600);
  }

  .swiper-container {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    width: 100%;
    height: 100%;
  }

  .slide-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .slide-image {
    width: 100%;
    height: 100%;
    display: block;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: scale(1);
      transition: transform 8s ease-out;
    }

    &.is-active img {
      transform: scale(1.1);
    }
  }

  .slide-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: none;

    &.mobile {
      display: block;
    }

    @include tablet {
      &.mobile {
        display: none;
      }
      &.desktop {
        display: block;
      }
    }
  }

  .slide-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    width: 100%;

    .inner {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: rem(11);

      @include desktop {
        gap: rem(18);
      }
    }
  }

  .slide-title {
    @include headline-01;
    font-weight: $font-weight-regular;
    color: $d-white;
    margin: 0;
  }

  .slide-description {
    @include body-01;
    font-weight: $font-weight-regular;
    color: $d-white;
    margin: 0;
    line-height: $line-height-relaxed;
  }

  .slide-button {
    margin-top: rem(8);

    @include tablet {
      margin-top: rem(12);
    }

    @include desktop {
      margin-top: rem(16);
    }
  }

  // Navigation Buttons
  .swiper-button-prev-custom,
  .swiper-button-next-custom {
    display: none;
    position: absolute;
    z-index: 2;
    top: 50%;
    transform: translateY(-50%);
    width: rem(30);
    
    @include tablet {
      display: block;
      width: rem(40);
    }

    @include desktop {
      width: rem(56);
    }

    :deep(.circle) {
      width: rem(30);
      height: rem(30);

      @include tablet {
        width: rem(40);
        height: rem(40);
      }

      @include desktop {
        width: rem(56);
        height: rem(56);
      }
    }

    &.swiper-button-lock {
      display: none;
    }
  }

  .swiper-button-prev-custom {
    left: rem(24);

    @include tablet {
      left: rem(40);
    }

    @include desktop {
      left: rem(80);
    }
  }

  .swiper-button-next-custom {
    right: rem(24);

    @include tablet {
      right: rem(40);
    }

    @include desktop {
      right: rem(80);
    }
  }

  // Pagination
  .slide-pagination-wrap {
    position: absolute;
    bottom: rem(12);
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    width: 100%;
    max-width: rem(1480);
    padding: 0 rem(24);
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;

    @include tablet {
      bottom: rem(12);
      padding: 0 rem(80);
    }

    @include desktop {
      bottom: rem(60);
      padding: 0 rem(80);
    }

    &:has([class*="-lock"]) {
      display: none;
    }
  }

  .swiper-pagination-custom {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: rem(8);
    width: auto;
    padding: 0;

    :deep(.custom-bullet) {
      width: rem(20);
      height: rem(2);
      min-height: rem(2);
      margin: 0;
      padding: 0;
      background-color: rgba(255, 255, 255, 0.5);
      border: none;
      border-radius: rem(1);
      opacity: 1;
      cursor: pointer;
      transition: all 0.35s;
      display: block;
      box-sizing: border-box;
      line-height: 0;
      font-size: 0;
      vertical-align: baseline;

      @include tablet {
        width: rem(60);
      }

      & > span {
        display: none;
      }

      &.swiper-pagination-bullet-active {
        background-color: $d-white;
      }
    }
  }
}
</style>

