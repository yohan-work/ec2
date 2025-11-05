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

import { ref, computed, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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

let ctx = null
let observer = null

gsap.registerPlugin(ScrollTrigger)

// 배너 타입에 따른 배경 이미지 스타일 계산
const bannerStyle = computed(() => {
  return {
    '--banner-image-mobile': `url(/assets/cnx/careers/${props.bannerType}-banner_m.png)`,
    '--banner-image-tablet': `url(/assets/cnx/careers/${props.bannerType}-banner_t.png)`,
    '--banner-image-desktop': `url(/assets/cnx/careers/${props.bannerType}-banner.png)`
  }
})

const initAnimation = () => {
  ctx = gsap.context(() => {
    if (!titleRef.value && !contentRef.value && !buttonRef.value) return
    gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.value,
        start: 'top 80%',
        end: 'bottom 20%',
        duration: 1,
        ease: 'power2.out',
        toggleActions: 'play none none none'
      }
    })
      .fromTo(titleRef.value, {
        y: 30,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
      })
      .fromTo(contentRef.value, {
        y: 30,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
      }, '-=0.2')
      .fromTo(buttonRef.value, {
        y: 30,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
      }, '-=0.2')
  })
}

onMounted(() => {
  initAnimation()
  // observer = new IntersectionObserver(
  //   (entries) => {
  //     entries.forEach(entry => {
  //       if (entry.isIntersecting && entry.intersectionRatio > 0) {
  //         initAnimation()
  //         if (observer) {
  //           observer.disconnect()
  //           observer = null
  //         }
  //       }
  //     })
  //   },
  //   {
  //     threshold: 0,
  //     rootMargin: '0px 0px 2560px 0px',
  //     root: null
  //   }
  // )
  // if (containerRef.value) {
  //   observer.observe(containerRef.value)
  // }
})

onUnmounted(() => {
  // if (observer) {
  //   observer.disconnect()
  // }
  ctx?.revert()
  ctx = null
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
    @include sub-headline-02;
    color: #fff;


  }

  &__content {
    margin-block: rem(8) rem(24);
    transform: translateY(30px);
    opacity: 0;
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

    @include desktop {
      text-align: right;
    }
  }

}
</style>