<template>
  <div ref="containerRef" class="app-title" :class="`text-${align}`">
    <component :is="headingTag" v-if="title" ref="titleRef" class="app-title-heading">
      <template v-if="isHtmlTitle">
        <span class="app-title-html" v-html="title"></span>
      </template>
      <template v-else>
        {{ title }}
      </template>
    </component>
    <p v-if="text" v-html="text" ref="textRef" class="app-title-text"></p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  },
  align: {
    type: String,
    default: 'center',
    validator: (value) => ['left', 'center', 'right'].includes(value)
  },
  headingTag: {
    type: String,
    default: 'h1',
    validator: (value) => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div', 'span'].includes(value)
  }
})

// emit 정의 (부모 컴포넌트에 가시성 상태 전달 가능)
const emit = defineEmits(['visibility-change'])

// refs
const containerRef = ref(null)
const titleRef = ref(null)
const textRef = ref(null)
const isVisible = ref(false)
let lastScrollY = 0
let isFirstCheck = true // 첫 번째 체크인지 확인

// 제목이 HTML을 포함하는지 자동 감지 (간단 검출)
const isHtmlTitle = computed(() => {
  const value = props.title || ''
  return /<\s*[a-zA-Z][\s\S]*>/i.test(value)
})

// VueUse Intersection Observer 설정
useIntersectionObserver(
  containerRef,
  ([{ isIntersecting }]) => {
    isVisible.value = isIntersecting
    
    // 부모 컴포넌트에 가시성 상태 전달
    emit('visibility-change', isIntersecting)
    
    // 현재 스크롤 위치
    const currentScrollY = window.scrollY || window.pageYOffset
    // 스크롤 방향 감지 (true: 아래로, false: 위로)
    const isScrollingDown = currentScrollY > lastScrollY
    
    // 페이지 최상단에 있는지 확인 (스크롤 위치가 100px 이하)
    const isNearTop = currentScrollY < 100
    
    // 콘솔에 상태 로그 (개발용)
    if (isIntersecting && (isScrollingDown || isFirstCheck || isNearTop)) {
      // 아래로 스크롤하거나, 첫 로드이거나, 페이지 최상단인 경우 active 클래스 추가
      containerRef.value?.classList.add('active')
      isFirstCheck = false // 첫 체크 완료
    } else if (!isIntersecting && !isScrollingDown) {
      // 위로 스크롤하면서 화면에서 벗어날 때 active 클래스 제거 (리셋)
      containerRef.value?.classList.remove('active')
      isFirstCheck = true // 다시 첫 체크 상태로 (재진입 대비)
    }
    
    lastScrollY = currentScrollY
  },
  {
    threshold: 0.2, // 20% 이상 보일 때 감지
    rootMargin: '-50px' // 뷰포트 경계에서 50px 안쪽에서 감지
  }
)
</script>

<style lang="scss" scoped>
.app-title {
  padding: rem(64) 0;
  text-align: center; // 기본값을 center로 설정

  @include tablet {
    padding: rem(100) 0;
  }

  @include desktop {
    padding: rem(120) 0;
  }

  &-heading {
    @include headline-01;
    
    // 초기 상태: 투명하고 아래에 위치
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    
    & + .app-title-text {
      margin-top: rem(8);

      @include tablet {
        margin-top: rem(14);
      }

      @include desktop {
        margin-top: rem(20);
      }
    }
  }

  &-text {
    @include body-01;
    color: $gray-1;
    
    // 초기 상태: 투명하고 아래에 위치
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }

  // HTML 제목을 감싸는 스팬은 레이아웃에 영향 없도록 처리
  .app-title-html {
    display: contents;
  }

  // active 상태: fadeup 모션 실행
  &.active {
    .app-title-heading {
      opacity: 1;
      transform: translateY(0);
      transition-delay: 0s; // 타이틀이 먼저 나타남
    }
    
    .app-title-text {
      opacity: 1;
      transform: translateY(0);
      transition-delay: 0.3s; // 타이틀보다 0.3초 늦게 나타남 (순차적 효과)
    }
  }

  // 정렬 옵션
  &.text-left {
    text-align: left;
  }

  &.text-right {
    text-align: right;
  }
}
</style>