<template>
  <div class="careers-non-agent">
    <component :is="headingLevel" class="careers-non-agent-title" ref="titleRef">{{ title }}</component>
    <ul class="careers-non-agent-group" ref="containerRef">
      <li class="careers-non-agent-group__item" v-for="item in items" :key="item.title" :ref="el => setItemRef(el)">
        <!-- <i class="careers-non-agent-group__icon">
          <img :src="`/assets/cnx/careers/${item.icon}`" :alt="`${item.alt}`" loading="lazy" />
        </i> -->
        <div class="careers-non-agent-group__content">
          <strong v-html="item.title"></strong>
          <p v-html="item.content"></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>

import { ref, onBeforeUpdate, onMounted, onBeforeUnmount } from 'vue'

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

const titleRef = ref(null)
const containerRef = ref(null)
const itemRefs = ref([])

const setItemRef = (el) => {
  if (el) {
    itemRefs.value.push(el)
  }
}

onBeforeUpdate(() => {
  itemRefs.value = []
})

// 타이틀용 Observer
let titleObserver = null

// 각 아이템에 대한 Observer 배열
const itemObservers = ref([])

// 타이틀 Observer 설정
const setupTitleObserver = () => {
  if (!titleRef.value) return

  let lastScrollY = 0
  let isFirstCheck = true

  titleObserver = new IntersectionObserver(
    ([entry]) => {
      const currentScrollY = window.scrollY || window.pageYOffset
      const isScrollingDown = currentScrollY > lastScrollY
      const isNearTop = currentScrollY < 100

      if (entry.isIntersecting && (isScrollingDown || isFirstCheck || isNearTop)) {
        titleRef.value.classList.add('active')
        isFirstCheck = false
      } else if (!entry.isIntersecting && !isScrollingDown) {
        titleRef.value.classList.remove('active')
        isFirstCheck = true
      }

      lastScrollY = currentScrollY
    },
    {
      threshold: 0.2,
      rootMargin: '-50px'
    }
  )

  titleObserver.observe(titleRef.value)
}

// 아이템 Observers 설정
const setupItemObservers = () => {
  // 기존 observers 정리
  itemObservers.value.forEach(observer => observer?.disconnect())
  itemObservers.value = []

  // 각 아이템에 대해 개별 observer 생성
  itemRefs.value.forEach((item) => {
    if (!item) return

    let lastScrollY = 0
    let isFirstCheck = true

    const observer = new IntersectionObserver(
      ([entry]) => {
        const currentScrollY = window.scrollY || window.pageYOffset
        const isScrollingDown = currentScrollY > lastScrollY
        const isNearTop = currentScrollY < 100

        if (entry.isIntersecting && (isScrollingDown || isFirstCheck || isNearTop)) {
          item.classList.add('active')
          isFirstCheck = false
        } else if (!entry.isIntersecting && !isScrollingDown) {
          item.classList.remove('active')
          isFirstCheck = true
        }

        lastScrollY = currentScrollY
      },
      {
        threshold: 0.2,
        rootMargin: '-50px'
      }
    )

    observer.observe(item)
    itemObservers.value.push(observer)
  })
}

onMounted(() => {
  setupTitleObserver()
  setupItemObservers()
})

onBeforeUnmount(() => {
  // 타이틀 observer 정리
  if (titleObserver) {
    titleObserver.disconnect()
    titleObserver = null
  }
  
  // 아이템 observers 정리
  itemObservers.value.forEach(observer => observer?.disconnect())
  itemObservers.value = []
})  
</script>

<style lang="scss" scoped>
.careers-non-agent {

  &-title {
    @include sub-headline-01;
    transform: translateY(30px);
    opacity: 0;
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;

    // 타이틀 active 상태
    &.active {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &-group {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: rem(30);
    margin-top: rem(30);

    @include tablet {
      grid-template-columns: repeat(2, 1fr);
      gap: rem(20);
    }

    @include desktop { 
      margin-top: rem(50);
      row-gap: rem(77);
      column-gap: rem(32);
    }


    &__item {
      transform: translateY(30px);
      opacity: 0;
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      padding: rem(24);
      background-color: #f7f7f7;

      @include tablet {
        padding: rem(30);
      }

      @include desktop {
        padding: rem(48);
      }

      // 각 아이템 active 상태
      &.active {
        opacity: 1;
        transform: translateY(0);
      }
      @for $i from 1 through 10 {
        &:nth-child(#{$i}) {
          transition-delay: #{0.1 + ($i - 1) * 0.1}s;
        }
      }
    }

    &__content {
      strong {
        display: block;
        @include body-01;
      }

      p {
        margin-top: rem(16);
        word-break: keep-all;
        overflow-wrap: anywhere;
        @include body-03;
        color: rgba(0, 0, 0, 0.60);
      }
    }

  }
}
</style>