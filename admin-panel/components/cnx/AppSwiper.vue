<template>
  <div class="app-swiper-container">

    <!--
      effect: null | 'fade' // default: 'slide'
      speed: null |number // default: 400
      autoplay: null | number // default: null
      lightMode: boolean // default: false
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
    >
      <swiper-slide v-for="(slide, index) in defaultSlotContent" :key="index">
        <component :is="slide" />
      </swiper-slide>
    </swiper>

    <!-- Custom Navigation Buttons -->
    <div class="swiper-button-prev-custom" ref="prevElRef">
      <AppButton variant="circle" arrow="reverse" :class="{ 'white': lightMode }" text=""/>
    </div>
    <div class="swiper-button-next-custom" ref="nextElRef">
      <AppButton variant="circle" arrow :class="{ 'white': lightMode }" text=""/>
    </div>


    <!-- Custom Pagination -->
    <div class="swiper-pagination-custom" ref="paginationElRef" :class="{ 'light-mode': lightMode }"></div>
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
  const prevElRef = ref(null)
  const nextElRef = ref(null)
  const paginationElRef = ref(null)

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

    // Light Mode 설정
    const lightMode = computed(() => props.lightMode)

  // Props 정의
  const props = defineProps({
    speed: {
      type: Number,
      default: 400
    },
    lightMode: {
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

    .swiper-pagination-custom {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: rem(8);
      padding: rem(20) 0;
      --swiper-base-color: #{$d-black};
      --swiper-sub-color : #{$d-gray};
      &.light-mode {
        --swiper-base-color: #{$d-white};
        --swiper-sub-color : #{$gray-1};
      }

      :deep(.custom-bullet) {
        width: rem(10);
        height: rem(10);
        background-color: var(--swiper-sub-color);
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.35s;
        &.swiper-pagination-bullet-active {
          background-color: var(--swiper-base-color);
        }
      }
    }
  }

</style>