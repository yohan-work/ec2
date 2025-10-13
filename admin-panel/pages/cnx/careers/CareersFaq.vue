<template>
  <div class="careers-faq" ref="containerRef">
    <div class="inner">
      <div class="careers-faq__header">
        <strong><span ref="titleRef_1">채용 관련</span><span ref="titleRef_2">질문이 있으신가요?</span></strong>
        <div class="careers-faq__button" ref="buttonRef">
          <AppButton text="질문하기" href="mailto:Catalyst_TA_Korea@concentrix.com" color="green" />
        </div>
      </div>
      <picture class="careers-faq__image" ref="imageRef">
        <source srcset="/assets/cnx/careers/careers_kit.png" media="(min-width: 1024px)">
        <source srcset="/assets/cnx/careers/careers_kit_t.png" media="(min-width: 768px)">
        <img src="/assets/cnx/careers/careers_kit_m.png" alt="welcome kit"></img>
      </picture>
    </div>
  </div>
</template>

<script setup>

  import { ref, onMounted, onUnmounted } from 'vue'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  import AppButton from '~/components/cnx/AppButton'

  const imageRef = ref(null)
  const titleRef_1 = ref(null)
  const titleRef_2 = ref(null)
  const buttonRef = ref(null)
  const containerRef = ref(null)

  gsap.registerPlugin(ScrollTrigger)

  const initAnimation = () => {
    if (!imageRef.value && !titleRef_1.value && !titleRef_2.value && !buttonRef.value) return

    gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.value,
        start: 'top 80%',
        end: 'bottom 20%',
        ease: 'power2.out',
        toggleActions: 'play none none none'
      }
    }).fromTo(imageRef.value, {
      scale: 1.2,
      opacity: 0,
    }, {
      scale: 1,
      opacity: 1,
      ease: 'power2.out',
    })
    .fromTo(titleRef_1.value, {
      y: 30,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      ease: 'power2.out',
    }, 0)
    .fromTo(titleRef_2.value, {
      y: 30,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      ease: 'power2.out',
    }, '-=0.2')
    .fromTo(buttonRef.value, {
      y: 30,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      ease: 'power2.out',
    }, '-=0.2')
  }

  onMounted(() => {
    initAnimation()
  })

</script>

<style lang="scss" scoped>

  @use '~/layouts/scss/cnx' as *;
  @use '~/layouts/scss/cnx/_variables' as *;
  @use '~/layouts/scss/cnx/_mixins' as *;
  @use '~/layouts/scss/cnx/_functions' as *;

  .careers-faq {
    margin-top: rem(64);
    @include tablet {
      margin-top: rem(100);
    }
    @include desktop {
      margin-top: rem(120); 
    }

    .inner {
      display: flex;
      flex-direction: column;
      @include tablet {
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
      }
      @include desktop {
        align-items: center;
        padding-top: 0;
      }
    }

    &__header {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: rem(18);
      text-align: center;
      strong {
        @include sub-headline-01;
        span {
          display: block;
          transform: translateY(30px);
          opacity: 0;
        }
      }
      @include tablet {
        align-items: flex-start;
        justify-content: unset;
        gap: rem(21);
        margin-top: 0;
        text-align: left;
      }
      @include desktop {
        gap: rem(50);
      }
    }

    &__image {
      margin-top: rem(60);
      transform: scale(1.2);
      opacity: 0;
      @include tablet {
        margin-top: rem(0);
      }
      @include desktop {
        margin: rem(64) 0;
      }
    }

    &__button {
      transform: translateY(30px);
      opacity: 0;
    }

  }
</style>