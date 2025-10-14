<template>
  <div class="app-swiper-container">

    <!--
      effect: null | 'fade' // default: 'slide'
      speed: null |number // default: 400
      autoplay: null | number // default: null
      darkMode: boolean // default: false
    -->
    <swiper
      :slidesPerView="'auto'"
      :effect="effect"
      :pagination="paginationConfig"
      :navigation="navigationConfig"
      :modules="modules"
      :loop="true"
      :speed="speed"
      :autoplay="autoplayConfig"
      @swiper="onSwiperInit"
    >
      <swiper-slide v-for="(slide, index) in defaultSlotContent" :key="index">
        <component :is="slide" />
      </swiper-slide>
    </swiper>

    <!-- Custom Navigation Buttons -->
    <div class="swiper-button-prev-custom" ref="prevElRef">
      <AppButton variant="circle" arrow="reverse" :class="{ 'white': darkMode }" text=""/>
    </div>
    <div class="swiper-button-next-custom" ref="nextElRef">
      <AppButton variant="circle" arrow :class="{ 'white': darkMode }" text=""/>
    </div> 

    <div class="swiper-navigation-wrap" :class="{ 'dark-mode': darkMode }">
      <!-- Custom Pagination -->
      <div class="swiper-pagination-custom" ref="paginationElRef"></div>
      <!-- play / pause button -->
      <button type="button" class="swiper-button-play-custom" ref="playElRef" :class="{ 'pause': !isPlaying }" @click="toggleAutoplay" v-if="props.autoplay">
        <span class="sr-only">pause</span>
      </button>
    </div>
  </div>
</template>

<script setup>
  import { ref, useSlots, computed } from 'vue'
  import AppButton from './AppButton.vue'

  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Pagination, Navigation, EffectFade, Autoplay } from 'swiper/modules';

  // Swiper 모듈 설정
  const modules = [ Pagination, Navigation, EffectFade, Autoplay ];

  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/effect-fade';

  // 슬롯에서 전달된 컨텐츠
  const slots = useSlots()
  const defaultSlotContent = computed(() => {
    if (slots.default) {
      const slotContent = slots.default()
      if (Array.isArray(slotContent)) {
        return slotContent
      }
      return [slotContent]
    }
    return []
  })

  // Custom navigation, pagination ref
  const swiperInstance = ref(null)
  const prevElRef = ref(null)
  const nextElRef = ref(null)
  const paginationElRef = ref(null)
  const isPlaying = ref(true)

  // Swiper 인스턴스 저장
  const onSwiperInit = (swiper) => {
    swiperInstance.value = swiper
    // autoplay가 활성화되어 있으면 재생 상태로 시작
    if (props.autoplay) {
      isPlaying.value = true
    }
  }

  // Pagination 설정
  const paginationConfig = computed(() => ({
    clickable: true,
    el: paginationElRef.value,
    type: 'bullets',
    renderBullet: (index, className) => {
      return `<button class="${className} custom-bullet"><span class="sr-only">${index + 1}</span></button>`
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
      delay: props.autoplay,
      disableOnInteraction: false
    }
  })

  // 자동재생 일시정지
  const toggleAutoplay = () => {
    if (!swiperInstance.value || !props.autoplay) return

    if (isPlaying.value) {
      swiperInstance.value.autoplay.stop()
      isPlaying.value = false
    } else {
      swiperInstance.value.autoplay.start()
      isPlaying.value = true
    }
  }

  // Dark Mode 설정
  const darkMode = computed(() => props.darkMode)

  // Props 정의
  const props = defineProps({
    speed: {
      type: Number,
      default: 400
    },
    darkMode: {
      type: Boolean,
      default: false
    },
    effect: {
      type: String,
      default: 'slide'
    },
    autoplay: {
      type: Number,
      default: null
    }
  })

</script>

<style lang="scss" scoped>
  @use '~/layouts/scss/cnx/_functions' as *;
  @use '~/layouts/scss/cnx/_mixins' as *;
  @use '~/layouts/scss/cnx/_variables' as *;

  .app-swiper-container {
    position: relative;
    max-width: rem(1320);
    margin: 0 auto;
    padding-inline: rem(24);
    box-sizing: content-box;

    @include tablet {
      padding-inline: rem(80);
    }
    @include desktop {
      padding-inline: rem(180); 
    }

    .swiper-button-prev-custom,
    .swiper-button-next-custom {
      display: none;
      position: absolute;
      z-index: 1;
      top: calc(50% - 25px);
      width: rem(30);
      transform: translateY(-50%);
      --pos: 30px;
      &.swiper-button-lock {
        display: none;
      }
      :deep(.circle) {
        width: rem(30);
        height: rem(30);
      }
      @include tablet {
        display: block;
      }
      @include desktop {
        width: rem(56);
        :deep(.circle) {
          width: rem(56);
          height: rem(56);
        }
      }
    }
    .swiper-button-prev-custom {
      left: var(--pos);
    }
    .swiper-button-next-custom {
      right: var(--pos);
    }

    .swiper-navigation-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: rem(12);
      padding: rem(20) 0;
      --swiper-base-color: #{$d-black};
      --swiper-sub-color : #{$d-gray};
      &.dark-mode {
        --swiper-base-color: #{$d-white};
        --swiper-sub-color : #{$gray-1};
      }
      &:has([class*="-lock"]) {
        display: none;
      }
    }

    .swiper-button-play-custom {
      width: rem(12);
      height: rem(12);
      background-color: var(--swiper-sub-color);
      mask: center / 9px auto no-repeat url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='24' viewBox='0 0 18 24' fill='none'%3E%3Cg opacity='1'%3E%3Cpath d='M6 1H0V23H6V1Z' fill='white'/%3E%3Cpath d='M18 1H12V23H18V1Z' fill='white'/%3E%3C/g%3E%3C/svg%3E");
      &.pause {
        mask: center / 9px auto no-repeat url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='22' viewBox='0 0 18 22' fill='none'%3E%3Cpath d='M18 11L0 22V0L18 11Z' fill='white'/%3E%3C/svg%3E");
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
        width: rem(12);
        height: rem(12);
        margin: 0;
        background-color: var(--swiper-sub-color);
        border-radius: 50%;
        opacity: 1;
        cursor: pointer;
        transition: all 0.35s;
        &.swiper-pagination-bullet-active {
          background-color: var(--swiper-base-color);
        }
      }
    }
  }

</style>