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
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue'
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

// gsap.context 관리를 위한 컨텍스트 핸들 보관
let gsapCtx = null
// ScrollTrigger 인스턴스 저장
let scrollTriggerInstance = null

// 제목이 HTML을 포함하는지 자동 감지 (간단 검출)
const isHtmlTitle = computed(() => {
  const value = props.title || ''
  return /<\s*[a-zA-Z][\s\S]*>/i.test(value)
})

// GSAP 애니메이션 초기화
const initAnimation = () => {
  if (!containerRef.value) return { timeline: null, scrollTrigger: null }

  // 존재하는 요소들만 수집
  const elementsToAnimate = []
  
  if (titleRef.value) {
    elementsToAnimate.push(titleRef.value)
  }
  if (textRef.value) {
    elementsToAnimate.push(textRef.value)
  }

  // 애니메이션할 요소가 없으면 리턴
  if (elementsToAnimate.length === 0) return { timeline: null, scrollTrigger: null }

  // 초기 상태 설정 (애니메이션 전 상태)
  elementsToAnimate.forEach(element => {
    gsap.set(element, { 
      opacity: 0, 
      y: 30 
    })
  })

  // 타임라인을 paused로 시작
  const tl = gsap.timeline({ paused: true })

  // 순차적 애니메이션: 타이틀 → 텍스트 (나타날 때)
  if (titleRef.value) {
    tl.to(titleRef.value, {
      duration: 0.6,
      opacity: 1,
      y: 0,
      ease: 'power2.out',
      immediateRender: false
    })
  }
  
  if (textRef.value) {
    tl.to(textRef.value, {
      duration: 0.6,
      opacity: 1,
      y: 0,
      ease: 'power2.out',
      immediateRender: false
    }, titleRef.value ? '-=0.3' : 0) // 타이틀이 있으면 0.3초 겹침
  }

  // ScrollTrigger를 별도로 생성하고 저장
  scrollTriggerInstance = ScrollTrigger.create({
    trigger: containerRef.value,
    start: 'top 80%',
    end: 'bottom 20%',
    onEnter: () => tl.play(), // 확실히 트리거되었을 때만 재생
    onLeaveBack: () => tl.reverse(),
    immediateRender: false
  })
  
  return { timeline: tl, scrollTrigger: scrollTriggerInstance }
}

// DOM이 완전히 렌더링된 후 애니메이션 초기화
onMounted(async () => {
  await nextTick()
  
  if (!containerRef.value) return
  
  // gsap.context로 이 컴포넌트에서 생성한 애니메이션/트리거를 스코프에 묶음
  gsapCtx = gsap.context(() => {
    requestAnimationFrame(() => {
      try {
        // 애니메이션 초기화 (항상 실행)
        const { timeline: tl, scrollTrigger } = initAnimation()
        
        // ScrollTrigger refresh 호출
        gsap.registerPlugin(ScrollTrigger)
        try {
          ScrollTrigger.refresh()
          
          // refresh 후 상태 확인
          if (tl && scrollTrigger && scrollTrigger.isActive) {
            // 이미 활성화되어 있다면 타임라인을 즉시 재생
            tl.play(0)
          }
        } catch (_) { /* noop */ }
      } catch (error) {
        // 에러 발생 시 기본 애니메이션 초기화
        console.warn('AppTitle animation initialization error:', error)
        initAnimation()
      }
    })
  }, containerRef.value)
})

// 언마운트 시 이 컴포넌트 범위에서 생성된 GSAP 리소스 정리
onUnmounted(() => {
  try {
    if (scrollTriggerInstance) {
      scrollTriggerInstance.kill()
      scrollTriggerInstance = null
    }
    if (gsapCtx) gsapCtx.revert()
  } catch (_) { /* noop */ }
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
    color: $gray-1;
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