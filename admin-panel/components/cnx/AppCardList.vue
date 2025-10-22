<template>
  <div class="app-card" :aria-label="title || undefined">
    <h2 class="app-card-list-title" v-if="title">{{ title }}</h2>
    <ul ref="listRef" class="app-card-list" :style="{ marginBottom: props.noMarginBottom ? '0' : undefined }">
      <li class="app-card-list-item" v-for="item in items" :key="item.id" >
        <component :is="itemHeadingLevel" class="app-card-list-item-title">
          <span v-html="item.title"></span>
        </component>
        <p class="app-card-list-item-description" v-html="item.description"></p>
      </li>
    </ul>
  </div>    
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps({
  title: { type: String, default: '' },
  items: { type: Array, default: () => [] },
  noMarginBottom: { type: Boolean, default: false },
  itemHeadTag: { type: String, default: undefined },
})

// title 존재 여부에 따라 아이템 헤딩 레벨 결정
const itemHeadingLevel = computed(() => {
  if (props.itemHeadTag !== undefined && props.itemHeadTag !== '') {
    return props.itemHeadTag
  }
  // title이 있으면 h3, 없으면 h2로 자동 조정
  return props.title ? 'h3' : 'h2'
})

const listRef = ref(null)
let gsapContext = null

const prefersReducedMotion = typeof window !== 'undefined' && typeof window.matchMedia === 'function'
  ? window.matchMedia('(prefers-reduced-motion: reduce)')
  : { matches: false }

onMounted(() => {
  if (!listRef.value) return
  
  // GSAP Context 생성 - 모든 애니메이션과 ScrollTrigger를 관리
  gsapContext = gsap.context(() => {
    const container = listRef.value ? listRef.value.parentElement : null
    const titleEl = container ? container.querySelector('.app-card-list-title') : null
    const items = listRef.value ? listRef.value.querySelectorAll('.app-card-list-item') : []

    // 모션 최소화 환경에서는 애니메이션을 비활성화하고 즉시 표시
    if (prefersReducedMotion && prefersReducedMotion.matches) {
      if (titleEl) {
        gsap.set(titleEl, { opacity: 1, y: 0 })
      }
      if (items && items.length) {
        gsap.set(items, { opacity: 1, y: 0 })
      }
      return
    }

    gsap.registerPlugin(ScrollTrigger)

    // 초기 상태 설정 (fade-up 준비)
    if (titleEl) {
      gsap.set(titleEl, { opacity: 0, y: 30 })
    }
    if (items && items.length) {
      gsap.set(items, { opacity: 0, y: 20 })
    }

    // 스크롤 진입 시 나타나는 타임라인 (AppImgCont와 동일한 토글 동작)
    const enterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: listRef.value,
        start: 'top 90%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        invalidateOnRefresh: true,
        refreshPriority: 10,
      },
    })

    if (titleEl) {
      enterTimeline.to(titleEl, {
        duration: 0.6,
        opacity: 1,
        y: 0,
        ease: 'power2.out',
      })
    }

    if (items && items.length) {
      enterTimeline.to(items, {
        duration: 0.5,
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        stagger: 0.1,
      }, '-=0.2')
    }

    // 스크롤 영역을 벗어날 때 빠르게 위로 사라지는 역타임라인
    const elementsToReverse = []
    if (items && items.length) {
      // 아이템들을 먼저 사라지게
      elementsToReverse.push(...Array.from(items))
    }
    if (titleEl) {
      // 마지막에 타이틀
      elementsToReverse.push(titleEl)
    }

    if (elementsToReverse.length) {
      const reverseTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: listRef.value,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'none none none play',
        },
      })
      reverseTimeline.to(elementsToReverse, {
        duration: 0.3,
        opacity: 0,
        y: -20,
        ease: 'power2.in',
        stagger: 0.05,
      })
    }
  }, listRef.value) // Context의 스코프를 listRef로 제한
})

onUnmounted(() => {
  // GSAP Context를 정리하여 모든 애니메이션과 ScrollTrigger를 자동으로 정리
  if (gsapContext) {
    gsapContext.revert() // 모든 애니메이션을 원래 상태로 되돌리고 정리
    gsapContext = null
  }
})
</script>

<style lang="scss" scoped>

.app-card {
  * {
    word-break: keep-all;
  }
  &-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: rem(15);
    margin-bottom: rem(60);

    @include tablet {
      margin-bottom: rem(120);
    }

    @include desktop {
      gap: rem(32);
      flex-wrap: nowrap;
    }

    &-title {
      @include sub-headline-02;
      text-align: center;
      margin-bottom: rem(30);
    }

    &-item {
      width: 100%;
      padding: rem(16);
      border: 1px solid $gray-2;

      $gap: rem(15);
      
      @include tablet {
        width: calc(100% / 3 - #{$gap});
      }

      @include desktop {
        flex: 1;
        padding: rem(24);
      }

      &-title {
        font-weight: $font-weight-bold;
        @include body-01;
        margin-bottom: rem(16);

        @include tablet {
          min-height: rem(60);
        }
      }

      &-description {
        @include body-02;
        
        @include tablet {
          min-height: rem(70);
        }
        
        @include desktop {
          min-height: rem(110);
        }
      }

    }
  }
}
</style>