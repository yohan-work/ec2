<template>
  <!-- Banner -->
  <div class="careers-banner" ref="containerRef" :style="bannerStyle">
    <h1 v-if="headingLevel === 'h1'" class="careers-banner__title" ref="titleRef" v-html="title"></h1>
    <h2 v-else-if="headingLevel === 'h2'" class="careers-banner__title" ref="titleRef" v-html="title"></h2>
    <h3 v-else-if="headingLevel === 'h3'" class="careers-banner__title" ref="titleRef" v-html="title"></h3>
    <h4 v-else-if="headingLevel === 'h4'" class="careers-banner__title" ref="titleRef" v-html="title"></h4>
    <h5 v-else-if="headingLevel === 'h5'" class="careers-banner__title" ref="titleRef" v-html="title"></h5>
    <h6 v-else class="careers-banner__title" ref="titleRef" v-html="title"></h6>
    <p class="careers-banner__content" v-html="content" ref="contentRef"></p>
    <div class="careers-banner__button" ref="buttonRef">
      <AppButton :text="buttonText" color="teal" :href="href" />
    </div>
  </div>
</template>

<script setup>

import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import AppButton from '~/components/cnx/AppButton'

const props = defineProps({
  headingLevel: {
    type: String,
    default: 'h3',
    validator: (value) => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(value)
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  buttonText: {
    type: String,
    required: true
  },
  href: {
    type: String,
    required: true
  },
  bannerType: {
    type: String,
    default: 'business',
    validator: (value) => ['business', 'customer'].includes(value)
  }
})

const containerRef = ref(null)
const titleRef = ref(null)
const contentRef = ref(null)
const buttonRef = ref(null)

// 배너 타입에 따른 배경 이미지 스타일 계산
const bannerStyle = computed(() => {
  return {
    '--banner-image-mobile': `url(/assets/cnx/careers/${props.bannerType}-banner_m.png)`,
    '--banner-image-tablet': `url(/assets/cnx/careers/${props.bannerType}-banner_t.png)`,
    '--banner-image-desktop': `url(/assets/cnx/careers/${props.bannerType}-banner.png)`
  }
})

// Container Observer
let containerObserver = null

// Container Observer 설정
const setupContainerObserver = () => {
  if (!containerRef.value) return

  let lastScrollY = 0
  let isFirstCheck = true

  containerObserver = new IntersectionObserver(
    ([entry]) => {
      const currentScrollY = window.scrollY || window.pageYOffset
      const isScrollingDown = currentScrollY > lastScrollY
      const isNearTop = currentScrollY < 100

      if (entry.isIntersecting && (isScrollingDown || isFirstCheck || isNearTop)) {
        containerRef.value.classList.add('active')
        isFirstCheck = false
      } else if (!entry.isIntersecting && !isScrollingDown) {
        containerRef.value.classList.remove('active')
        isFirstCheck = true
      }

      lastScrollY = currentScrollY
    },
    {
      threshold: 0.2,
      rootMargin: '-50px'
    }
  )

  containerObserver.observe(containerRef.value)
}

onMounted(() => {
  setupContainerObserver()
})

onBeforeUnmount(() => {
  if (containerObserver) {
    containerObserver.disconnect()
    containerObserver = null
  }
})
</script>

<style lang="scss" scoped>
.careers-banner {
  padding: rem(24);
  border-radius: rem(8);
  background-image: var(--banner-image-mobile);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @include tablet {
    background-image: var(--banner-image-tablet);
  }

  @include desktop {
    padding: rem(60);
    border-radius: rem(20);
    background-image: var(--banner-image-desktop);
  }

  &__title {
    transform: translateY(30px);
    opacity: 0;
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    @include sub-headline-02;
    color: #fff;
  }

  &__content {
    margin-block: rem(8) rem(24);
    transform: translateY(30px);
    opacity: 0;
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    @include body-03;
    color: #fff;

    @include tablet {
      margin-block: rem(16);
      @include body-02;
    }

    @include desktop {
      margin-block: rem(24);
    }
  }

  :deep(.banner-br) {
    @include tablet {
      display: none;
    }
  }

  :deep(.banner-br-pc) {
    display: none;

    @include tablet {
      display: block;
    }
  }

  &__button {
    transform: translateY(30px);
    opacity: 0;
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;

    @include desktop {
      text-align: right;
    }
  }

  // active 상태: 순차적 애니메이션
  &.active {
    .careers-banner__title {
      opacity: 1;
      transform: translateY(0);
      transition-delay: 0s;
    }

    .careers-banner__content {
      opacity: 1;
      transform: translateY(0);
      transition-delay: 0.2s;
    }

    .careers-banner__button {
      opacity: 1;
      transform: translateY(0);
      transition-delay: 0.4s;
    }
  }

}
</style>