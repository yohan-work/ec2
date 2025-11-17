<template>
  <div ref="listRef" class="app-card" :aria-label="title || undefined">
    <h2 class="app-card-list-title" v-if="title">{{ title }}</h2>
    <ul 
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
import { ref, computed } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const props = defineProps({
  title: { type: String, default: '' },
  items: { type: Array, default: () => [] },
  noMarginBottom: { type: Boolean, default: false },
  itemHeadTag: { type: String, default: undefined },
  borderColor: { type: String, default: '' },
  tabletItemsPerRow: { type: Number, default: 3 },
})

// emit 정의 (부모 컴포넌트에 가시성 상태 전달 가능)
const emit = defineEmits(['visibility-change'])

// title 존재 여부에 따라 아이템 헤딩 레벨 결정
const itemHeadingLevel = computed(() => {
  if (props.itemHeadTag !== undefined && props.itemHeadTag !== '') {
    return props.itemHeadTag
  }
  // title이 있으면 h3, 없으면 h2로 자동 조정
  return props.title ? 'h3' : 'h2'
})

const listRef = ref(null)
const isVisible = ref(false)
let lastScrollY = 0

// VueUse Intersection Observer 설정
useIntersectionObserver(
  listRef,
  ([{ isIntersecting }]) => {
    isVisible.value = isIntersecting
    
    // 부모 컴포넌트에 가시성 상태 전달
    emit('visibility-change', isIntersecting)
    
    // 현재 스크롤 위치
    const currentScrollY = window.scrollY || window.pageYOffset
    // 스크롤 방향 감지 (true: 아래로, false: 위로)
    const isScrollingDown = currentScrollY > lastScrollY
    lastScrollY = currentScrollY
    
    // 콘솔에 상태 로그 (개발용)
    if (isIntersecting && isScrollingDown) {
      // 아래로 스크롤하면서 화면에 들어올 때만 active 클래스 추가
      listRef.value?.classList.add('active')
    } else if (!isIntersecting && !isScrollingDown) {
      // 위로 스크롤하면서 화면에서 벗어날 때 active 클래스 제거 (리셋)
      listRef.value?.classList.remove('active')
    }
  },
  {
    threshold: 0.2, // 20% 이상 보일 때 감지
    rootMargin: '-50px' // 뷰포트 경계에서 50px 안쪽에서 감지
  }
)
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
      // 초기 상태: 투명하고 아래에 위치
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }

    &-item {
      width: 100%;
      padding: rem(16);
      border: 1px solid $gray-2;
      
      // 초기 상태: 투명하고 아래에 위치
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;

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
  
  // active 상태: fadeup 모션 실행
  &.active {
    .app-card-list-title {
      opacity: 1;
      transform: translateY(0);
    }
    .app-card-list-item {
      opacity: 1;
      transform: translateY(0);
      
      // stagger 효과: 각 아이템마다 순차적으로 나타남
      @for $i from 1 through 10 {
        &:nth-child(#{$i}) {
          transition-delay: #{($i - 1) * 0.1}s;
        }
      }
    }
  }
}
</style>