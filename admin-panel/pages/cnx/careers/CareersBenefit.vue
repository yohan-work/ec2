<template>
  <!-- Benefit -->
  <div class="careers-benefit" ref="containerRef">

    <component :is="headingLevel" class="careers-benefit__title" ref="titleRef">{{ title }}</component> 

    <ul class="careers-benefit__content">
      <li class="careers-benefit__item" v-for="(item, index) in items" :key="item.title" :ref="el => setItemRef(el, index)">
        <strong>
          <span v-html="item.title"></span>
          <img :src="`/assets/cnx/careers/${item.icon}`" :alt="`${item.alt}`" loading="lazy">
        </strong>
        <ul class="careers-benefit__list">
          <li v-for="content in item.content" :key="content" v-html="content"></li>
        </ul>
      </li>
    </ul>

  </div>
</template>

<script setup>

  import { ref } from 'vue'
  import { useIntersectionObserver } from '@vueuse/core'

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
    items: {
      type: Array,
      required: true
    }
  })

  
  const containerRef = ref(null)
  const titleRef = ref(null)
  const itemRefs = ref([])
  
  // 템플릿 ref 설정 함수
  const setItemRef = (el, index) => {
    if (el) {
      itemRefs.value[index] = el
    }
  }
  
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
  .careers-benefit {

    &__title {
      padding-bottom: rem(24);
      transform: translateY(30px);
      opacity: 0;
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      @include sub-headline-01;

      @include tablet {
        padding-bottom: rem(48);
      }

    }

    // active 상태: 순차적 애니메이션
    &.active {
      .careers-benefit__title {
        opacity: 1;
        transform: translateY(0);
        transition-delay: 0s;
      }

      .careers-benefit__item {
        opacity: 1;
        transform: translateY(0);

        // 각 아이템에 순차적으로 delay 적용
        @for $i from 1 through 20 {
          &:nth-child(#{$i}) {
            transition-delay: #{0.1 + ($i - 1) * 0.1}s;
          }
        }
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: rem(30);
      margin-top: rem(30);
      @include tablet {
        display: grid;
        grid-template-columns: repeat(2, 1fr); 
        gap: rem(24) rem(50);
        margin-top: rem(48);
      }
      @include desktop {
        grid-template-columns: repeat(4, 1fr);
        gap: rem(32);
        margin-top: 0;
        padding: rem(50) 0; 
      } 
    }

    &__item {
      transform: translateY(30px);
      opacity: 0;
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      strong {
        display: flex;
        padding-block: rem(16);
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid $d-black;
        span {
          color: $p-blue;
          @include body-01;
        }
        img {
          width: rem(50);
          aspect-ratio: 1/1;
        }
        @include tablet {
          flex-direction: column;
          align-items: flex-start;
          justify-content: unset;
          gap: 14px;
          padding-block: 0 rem(14);
          :deep(br) {
            display: none;
          }
          img {
            order: -1;
            width: rem(80);
          }
        }
        @include desktop {
          gap: 20px;
          padding-block: 0 rem(20);
          img {
            width: rem(120);
          }
        }
      }
    }

    &__list {
      display: flex;
      flex-direction: column;
      gap: rem(4);
      padding-block: rem(16); 
      li {
        word-break: keep-all;
        overflow-wrap: anywhere;
        @include body-03;
      }
      @include tablet {
        padding-block: rem(14) 0;
      }
      @include desktop {
        gap: rem(8);
        padding-block: rem(20) 0;
      } 
    }

  }
</style>