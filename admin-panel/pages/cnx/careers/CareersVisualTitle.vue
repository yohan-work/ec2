<template>
  <!-- Visual Title -->
  <div class="careers-visual-title" ref="containerRef">
    <picture>
      <source srcset="/assets/cnx/careers/visual-work.png" media="(min-width: 1024px)" />
      <source srcset="/assets/cnx/careers/visual-work_t.png" media="(min-width: 768px)" />
      <img src="/assets/cnx/careers/visual-work_m.png" alt="회의 중 밝게 웃으며 대화하는 두 명의 비즈니스 팀원" ref="imageRef" loading="lazy" />
    </picture>
    <HeadingComponent />
  </div>
</template>

<script setup>

  import { ref, onMounted, onBeforeUnmount, h } from 'vue'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  const props = defineProps({
    headingLevel: {
      type: String,
      default: 'h3',
      validator: (value) => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(value)
    },
    title: {
      type: String,
      required: true
    }
  })

  const HeadingComponent = () => h(
    props.headingLevel,
    {
      class: 'careers-visual-title__title',
      ref: titleRef,
      innerHTML: props.title
    }
  )

  const imageRef = ref(null)
  const titleRef = ref(null)
  const containerRef = ref(null)

  let ctx = null
  let observer = null
  gsap.registerPlugin(ScrollTrigger)

  const initAnimation = () => {
    ctx = gsap.context(() => {
      if (!imageRef.value && !titleRef.value) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.value,
          start: 'top 90%',
          toggleActions: 'play none none none',
        }
      })

      tl.fromTo(imageRef.value, {
        scale: 1.2,
      }, {
        scale: 1,
        ease: 'power2.out',
        duration: 1
      })
      .fromTo(titleRef.value, {
        y: 30,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        ease: 'power2.out',
        duration: 1
      }, 0)
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

  onBeforeUnmount(() => {
    // if (observer) {
    //   observer.disconnect()
    // }
    ctx?.revert()
    ctx = null
  })

</script>

<style lang="scss" scoped>
  .careers-visual-title { 
    position: relative;
    overflow: hidden;
    border-radius: rem(12);
    picture {
      display: block;
      aspect-ratio: 312 / 152;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: scale(1.2);
    }
    @include tablet {
      border-radius: rem(24);
      picture {
        aspect-ratio: 640 / 310;
      }
    }
    @include desktop {
      border-radius: rem(40);
      picture {
        aspect-ratio: 1320 / 640;
      }
    }

    &__title {
      position: absolute;
      top: rem(16);
      left: rem(12);
      color: #fff;
      transform: translateY(30px);
      opacity: 0;
      @include body-01;
      @include tablet {
        top: rem(32);
        left: rem(24);
        @include sub-headline-02;
      }
      @include desktop {
        top: rem(60);
        left: rem(44);
      }
    }
  }
</style>