<template>
  <div class="app-title" :class="`text-${align}`" ref="containerRef">
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
import { ref, onMounted, nextTick, computed } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// GSAP ScrollTrigger 플러그인 등록
gsap.registerPlugin(ScrollTrigger)

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

// refs for GSAP animation
const containerRef = ref(null)
const titleRef = ref(null)
const textRef = ref(null)

// 제목이 HTML을 포함하는지 자동 감지 (간단 검출)
const isHtmlTitle = computed(() => {
  const value = props.title || ''
  return /<\s*[a-zA-Z][\s\S]*>/i.test(value)
})

// GSAP 애니메이션 초기화
const initAnimation = () => {
  if (!containerRef.value) return

  // 존재하는 요소들만 수집
  const elementsToAnimate = []
  
  if (titleRef.value) {
    elementsToAnimate.push(titleRef.value)
  }
  if (textRef.value) {
    elementsToAnimate.push(textRef.value)
  }

  // 애니메이션할 요소가 없으면 리턴
  if (elementsToAnimate.length === 0) return

  // 초기 상태 설정 (애니메이션 전 상태)
  elementsToAnimate.forEach(element => {
    gsap.set(element, { 
      opacity: 0, 
      y: 30 
    })
  })

  // AppImgCont 패턴: 타임라인 내부에 ScrollTrigger 사용
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: containerRef.value,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    }
  })

  // 순차적 애니메이션: 타이틀 → 텍스트 (나타날 때)
  if (titleRef.value) {
    tl.to(titleRef.value, {
      duration: 0.6,
      opacity: 1,
      y: 0,
      ease: 'power2.out'
    })
  }
  
  if (textRef.value) {
    tl.to(textRef.value, {
      duration: 0.6,
      opacity: 1,
      y: 0,
      ease: 'power2.out'
    }, titleRef.value ? '-=0.3' : 0) // 타이틀이 있으면 0.3초 겹침
  }

  // AppTitle은 역재생만 사용, 추가 로직 불필요
  // 새로고침 시 이미 가시 상태면 즉시 재생
  try {
    if (ScrollTrigger.isInViewport(containerRef.value, 0.2)) {
      tl.play(0)
    }
  } catch (_) { /* noop */ }
}

// DOM이 완전히 렌더링된 후 애니메이션 초기화
onMounted(async () => {
  await nextTick()
  initAnimation()
  // 새로고침/레이아웃 확정 후 트리거 재계산
  try { ScrollTrigger.refresh() } catch (_) { /* noop */ }
})
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
    color: #86868B;
  }

  // HTML 제목을 감싸는 스팬은 레이아웃에 영향 없도록 처리
  .app-title-html {
    display: contents;
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