<template>
  <!-- Banner -->
  <div class="careers-banner" ref="containerRef">
    <component :is="headingLevel" class="careers-banner__title" ref="titleRef">{{ title }}</component>
    <p class="careers-banner__content" v-html="content" ref="contentRef"></p>
    <div class="careers-banner__button" ref="buttonRef">
      <AppButton :text="buttonText" color="green" :href="href" />
    </div>
  </div>
</template>

<script setup>

  import { ref, onMounted, onUnmounted } from 'vue'
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
    }
  })

  const containerRef = ref(null)
  const titleRef = ref(null)
  const contentRef = ref(null)
  const buttonRef = ref(null)

  let ctx = null
  let observer = null

  gsap.registerPlugin(ScrollTrigger)

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
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            initAnimation()
            if (observer) {
              observer.disconnect()
              observer = null
            }
          }
        })
      },
      {
        threshold: 0,
        rootMargin: '0px 0px 2560px 0px',
        root: null
      }
    )
    if (containerRef.value) {
      observer.observe(containerRef.value)
    }
  })

  onBeforeUnmount(() => {
    if (observer) {
      observer.disconnect()
    }
    ctx?.revert()
    ctx = null
  })
</script>

<style lang="scss" scoped>
.careers-banner {
    padding: rem(24);
    border-radius: rem(20);
    background-color: #f7f7f7;
    @include desktop { 
      padding: rem(40);
    }
    &__title {
      transform: translateY(30px);
      opacity: 0;
      @include sub-headline-02;
    }
    &__content {
      margin-block: rem(8) rem(24);
      transform: translateY(30px);
      opacity: 0;
      @include body-02;

      @include tablet {
        margin-block: rem(16);
      }

      @include desktop {
        margin-block: rem(24);
      } 
    }
    &__button {
      transform: translateY(30px);
      opacity: 0;
    }
  }
</style>