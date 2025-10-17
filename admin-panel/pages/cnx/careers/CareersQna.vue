<template>
  <!-- Q&A -->
  <div class="careers-qna" ref="containerRef">
    <h4 class="careers-qna__title" ref="titleRef">{{ title }}</h4>
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

  import { ref, onMounted, onUnmounted } from 'vue'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  const props = defineProps({
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
  // const toggleQaItem = (refName) => {
  //   const newSet = new Set(qaOpenRef.value)
  //   if (newSet.has(refName)) {
  //     newSet.delete(refName)
  //   } else {
  //     newSet.add(refName)
  //   }
  //   qaOpenRef.value = newSet
  // }

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

  let ctx = null
  let observer = null
  gsap.registerPlugin(ScrollTrigger)

  const initAnimation = () => {
    ctx = gsap.context(() => {
      if (!containerRef.value) return
      gsap.fromTo(titleRef.value, {
        y: 30,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: titleRef.value,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none none'
        }
      })
      gsap.fromTo(listRef.value, {
        y: 30,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: listRef.value,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none none'
        }
      })
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
.careers-qna {

    &__title {
      transform: translateY(30px);
      opacity: 0;
      @include sub-headline-01;
    }

    &__list {
      margin-top: rem(24);
      border-top: 1px solid #ddd;
      transform: translateY(30px);
      opacity: 0;
      @include tablet {
        margin-top: rem(48);
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
      @include sub-headline-02;
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
        color: $d-gray;
        @include sub-headline-02;
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