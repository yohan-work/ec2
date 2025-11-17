<template>
  <div class="app-card" :aria-label="title || undefined">
    <h2 class="app-card-list-title" v-if="title">{{ title }}</h2>
    <ul 
      ref="listRef" 
      class="app-card-list" 
      :style="{ 
        marginBottom: props.noMarginBottom ? '0' : undefined,
        '--tablet-items-per-row': props.tabletItemsPerRow
      }"
    >
      <li 
        class="app-card-list-item" 
        v-for="item in items" 
        :key="item.id"
        :style="{ borderColor: item.borderColor || props.borderColor || undefined }"
      >
        <component :is="itemHeadingLevel" class="app-card-list-item-title">
          <span v-html="item.title"></span>
        </component>
        <p v-if="item.description" class="app-card-list-item-description" v-html="item.description"></p>
        <ul v-if="item.list && item.list.length > 0" class="app-card-list-item-list">
          <li v-for="(listItem, index) in item.list" :key="index" class="app-card-list-item-list-item" v-html="listItem"></li>
        </ul>
      </li>
    </ul>
  </div>    
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps({
  title: { type: String, default: '' },
  items: { type: Array, default: () => [] },
  noMarginBottom: { type: Boolean, default: false },
  itemHeadTag: { type: String, default: undefined },
  borderColor: { type: String, default: '' },
  tabletItemsPerRow: { type: Number, default: 3 },
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

// GSAP 애니메이션 초기화
const initAnimation = () => {
  if (!listRef.value) return

  const container = listRef.value.parentElement
  const titleEl = container?.querySelector('.app-card-list-title')
  const items = Array.from(listRef.value.querySelectorAll('.app-card-list-item'))

  // 모션 최소화 환경에서는 애니메이션을 비활성화하고 즉시 표시
  if (prefersReducedMotion?.matches) {
    gsap.set([titleEl, ...items].filter(Boolean), { opacity: 1, y: 0 })
    return
  }

  // GSAP Context 생성
  gsapContext = gsap.context(() => {
    gsap.registerPlugin(ScrollTrigger)

    // 타이틀 애니메이션
    if (titleEl) {
      gsap.fromTo(titleEl,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: listRef.value,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }

    // 아이템 애니메이션
    if (items.length) {
      gsap.fromTo(items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: listRef.value,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }
  }, listRef.value)
}

onMounted(async () => {
  await nextTick() // DOM 렌더 완료 대기
  if (!listRef.value) return
  initAnimation() // 그 이후에 애니메이션 초기화
})

onUnmounted(() => {
  // GSAP Context를 정리하여 모든 애니메이션과 ScrollTrigger를 자동으로 정리
  gsapContext?.revert()
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
        width: calc(100% / var(--tablet-items-per-row, 3) - #{$gap});
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

      &-list {
        margin: 0;
        padding: 0;
        list-style: none;
        
        @include tablet {
          min-height: rem(70);
        }
        
        @include desktop {
          min-height: rem(110);
        }
        
        &-item {
          @include body-02;
          color: $gray-1;
          margin: 0;
          line-height: 1.6;
          position: relative;
          padding-left: rem(16);
          
          &::before {
            content: '-';
            position: absolute;
            left: 0;
            color: $gray-1;
            font-weight: bold;
          }
        }
      }

    }
  }
}
</style>