<template>
  <div class="careers-faq" ref="containerRef">
    <div class="inner">
      <div class="careers-faq__header">
        <strong><span ref="titleRef_1">채용 관련</span><span ref="titleRef_2">질문이 있으신가요?</span></strong>
        <div class="careers-faq__button" ref="buttonRef">
          <AppButton text="질문하기" :href="`mailto:${mailto}`" color="green" />
        </div>
      </div>
      <picture class="careers-faq__image" ref="imageRef">
        <source srcset="/assets/cnx/careers/careers_kit.png" media="(min-width: 1024px)">
        <source srcset="/assets/cnx/careers/careers_kit_t.png" media="(min-width: 768px)">
        <img src="/assets/cnx/careers/careers_kit_m.png" alt="입사 시 제공되는 에코백, 노트, 머그컵, 마우스, 충전기 등 브랜드 웰컴 굿즈 세트" loading="lazy" />
      </picture>
    </div>
  </div>
</template>

<script setup>

  import { ref } from 'vue'
  import { useIntersectionObserver } from '@vueuse/core'
  import AppButton from '~/components/cnx/AppButton'

  const props = defineProps({
    mailto: {
      type: String,
      default: 'recruiter_catalyst_korea@concentrix.com'
    }
  })

  const imageRef = ref(null)
  const titleRef_1 = ref(null)
  const titleRef_2 = ref(null)
  const buttonRef = ref(null)
  const containerRef = ref(null)

  // Intersection Observer 상태
  const isVisible = ref(false)
  let lastScrollY = 0
  let isFirstCheck = true

  // VueUse Intersection Observer 설정
  useIntersectionObserver(
    containerRef,
    ([{ isIntersecting }]) => {
      isVisible.value = isIntersecting
      
      // 현재 스크롤 위치
      const currentScrollY = window.scrollY || window.pageYOffset
      // 스크롤 방향 감지 (true: 아래로, false: 위로)
      const isScrollingDown = currentScrollY > lastScrollY
      
      // 페이지 최상단에 있는지 확인 (스크롤 위치가 100px 이하)
      const isNearTop = currentScrollY < 100
      
      if (isIntersecting && (isScrollingDown || isFirstCheck || isNearTop)) {
        // 아래로 스크롤하거나, 첫 로드이거나, 페이지 최상단인 경우 active 클래스 추가
        containerRef.value?.classList.add('active')
        isFirstCheck = false
      } else if (!isIntersecting && !isScrollingDown) {
        // 위로 스크롤하면서 화면에서 벗어날 때 active 클래스 제거 (리셋)
        containerRef.value?.classList.remove('active')
        isFirstCheck = true
      }
      
      lastScrollY = currentScrollY
    },
    {
      threshold: 0.2,
      rootMargin: '-50px'
    }
  )

</script>

<style lang="scss" scoped>
  .careers-faq {
    overflow: hidden;
    margin-block: rem(8) rem(33);
    @include tablet {
      margin-block: rem(100) rem(63);
    }
    @include desktop {
      margin-top: 0;
    }

    // active 상태: 순차적 애니메이션
    &.active {
      .careers-faq__image {
        transform: scale(1);
        opacity: 1;
        transition-delay: 0s;
      }

      .careers-faq__header strong span {
        opacity: 1;
        transform: translateY(0);

        &:nth-child(1) {
          transition-delay: 0s;
        }

        &:nth-child(2) {
          transition-delay: 0.2s;
        }
      }

      .careers-faq__button {
        opacity: 1;
        transform: translateY(0);
        transition-delay: 0.4s;
      }
    }

    .inner {
      display: flex;
      flex-direction: column;
      padding: 0;
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
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
      }
      @include tablet {
        align-items: flex-start;
        justify-content: unset;
        gap: rem(21);
        margin-top: 0;
        text-align: left;
        min-width: rem(246);
      }
      @include desktop {
        gap: rem(50);
      }
    }

    &__image {
      margin-top: rem(60);
      transform: scale(1.2);
      opacity: 0;
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
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
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }

  }
</style>