<template>
  <!-- Q&A -->
  <div class="careers-qna" ref="containerRef">
    <component :is="headingLevel" class="careers-qna__title" ref="titleRef">{{ title }}</component>
    <ul class="careers-qna__list" ref="listRef">
      <li class="careers-qna__item" v-for="(item, index) in items" :key="`qa-${refName}-${index}`">
        <button class="careers-qna__question" :aria-expanded="qaOpenRef.has(`qa-${refName}-${index}-ref`)" :aria-controls="`qa-${refName}-${index}-region`" :id="`qa-${refName}-${index}-label`" @click="toggleQaItem(`qa-${refName}-${index}-ref`)">
          <span>Q</span>
          <p v-html="item.question"></p>
        </button>
        <div :class="['careers-qna__answer', { 'careers-qna__answer--active': qaOpenRef.has(`qa-${refName}-${index}-ref`) }]" role="region" :aria-labelledby="`qa-${refName}-${index}-label`" :id="`qa-${refName}-${index}-region`">
          <span>A</span>
          <p v-html="item.answer"></p>
        </div>
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
    },
    refName: {
      type: String,
      required: true
    }
  })

  const containerRef = ref(null)
  const titleRef = ref(null)
  const listRef = ref(null)
  const qaOpenRef = ref(new Set())

  // Q&A 토글
  const toggleQaItem = (refName) => {
    const newSet = new Set()
    if (qaOpenRef.value.has(refName)) {
      newSet.clear()
    } else {
      newSet.add(refName)
    }
    qaOpenRef.value = newSet
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
  .careers-qna {

    &__title {
      transform: translateY(30px);
      opacity: 0;
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      @include sub-headline-01;

      @include tablet {
        font-size: $font-size-sh1-desktop;
      }
    }

    &__list {
      margin-top: rem(24);
      border-top: 1px solid #ddd;
      transform: translateY(30px);
      opacity: 0;
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      @include tablet {
        margin-top: rem(48);
      }
    }

    // active 상태: 순차적 애니메이션
    &.active {
      .careers-qna__title {
        opacity: 1;
        transform: translateY(0);
        transition-delay: 0s;
      }

      .careers-qna__list {
        opacity: 1;
        transform: translateY(0);
        transition-delay: 0.3s;
      }
    }

    &__item {
      padding-block: rem(24);
      border-bottom: 1px solid #ddd;
      @include tablet {
        gap: rem(32);
      }
    }

    &__question {
      display: flex;
      align-items: flex-start;
      width: 100%;
      gap: 24px;
      color: $p-green;
      text-align: left;
      word-break: keep-all;
      overflow-wrap: anywhere;
      @include body-01;
      &::after {
        width: rem(16);
        height: rem(16);
        margin-left: auto;
        background-color: $p-green;
        transform: rotate(0deg);
        transition: all 0.3s;
        mask: center / cover no-repeat url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='25' viewBox='0 0 24 25' fill='none'%3E%3Cpath d='M21 8.5L12 17.5L3 8.5' stroke='%23007380' stroke-width='4' stroke-linecap='square'/%3E%3C/svg%3E");
        content: '';
      }
      &[aria-expanded='true'] {
        &::after {
          transform: rotate(-180deg);
        }
      }

      @include tablet {
      } 
      @include desktop {
        gap: rem(32);
        span {
          text-align: left;
          flex: 0 0 rem(136);
        }
        &::after {
          width: rem(24);
          height: rem(24);
        }
      }
    }

    &__answer {
      display: none;
      align-items: flex-start;
      gap: 24px;
      margin-top: rem(16);
      span {
        color: $gray-2;
        @include body-01;
      }
      p {
        color: #666;
        word-break: keep-all;
        overflow-wrap: anywhere;
        @include body-03;
      }
      &--active {
        display: flex;
      }
      @include tablet { 
        margin-top: rem(32);
      }
      @include desktop {
        gap: rem(32);
        span {
          flex: 0 0 rem(136);
        }
      }
    }

  }
</style>