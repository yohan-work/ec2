<template>
  <!-- 1. to가 있을 경우 NuxtLink 태그 -->
  <NuxtLink 
    v-if="to"
    :to="to"
    v-bind="$attrs"
    :class="buttonClasses"
  >
    {{ text }}
  </NuxtLink>

  <!-- 2. href가 있을 경우 a 태그 (외부 링크) -->
  <a 
    v-else-if="href"
    :href="href"
    v-bind="$attrs"
    :class="buttonClasses"
    target="_blank"
    rel="noopener noreferrer"
  >
    {{ text }}
  </a>

  <!-- 3. 그 외에는 button 태그 (이벤트 emit) -->
  <button 
    v-else
    v-bind="$attrs"
    :class="buttonClasses"
    @click="handleButtonClick"
  >
    {{ text }}
  </button>
</template>


<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'
defineOptions({ inheritAttrs: false })

const props = defineProps({
  text: { type: String, required: true },
  variant: { type: String as PropType<'primary' | 'circle'>, default: undefined },
  color: { type: String as PropType<'default' | 'green' | 'teal' | 'white'>, default: 'default' },
  effect: { type: String as PropType<'left' | 'right'>, default: 'left' },
  disabled: { type: Boolean, default: false },
  href: { type: String, default: undefined },
  to: { type: [String, Object] as PropType<string | Record<string, unknown>>, default: undefined },
  arrow: { type: [Boolean, String] as PropType<boolean | 'reverse'>, default: false },
  arrowDirection: { type: String as PropType<'left' | 'right'>, default: undefined },
})

// effect의 기본값을 left로 설정
const effect = computed(() => props.effect || 'left')

const emit = defineEmits<{
  click: []
}>()

const buttonClasses = computed(() => {
  const classes = []
  
  // 기본 variant 클래스
  if (props.variant) {
    classes.push(props.variant)
  }
  
  // 링크 타입 감지 (arrow prop으로 제어)
  if (props.href) {
    // href가 있으면 외부 링크로 outlink 화살표 (자동)
    classes.push('outlink')
  } else if (props.arrow) {
    // arrow가 true 또는 'reverse'일 때 link 화살표
    classes.push('link')
    if (props.arrow === 'reverse') {
      classes.push('reverse')
    }
  }
  
  // 색상 클래스
  if (props.color && props.color !== 'default') {
    classes.push(props.color)
  }
  
  // hover 효과 클래스 (기본값: left)
  classes.push(`hover-${effect.value}`)
  
  // disabled 상태
  if (props.disabled) {
    classes.push('disabled')
  }
  
  // 화살표 방향 (circle 버튼용)
  if (props.arrowDirection) {
    classes.push(`arrow-${props.arrowDirection}`)
  }
  
  return classes.join(' ')
})

const handleButtonClick = () => {
  if (props.disabled) {
    return
  }
  emit('click')
}
</script>

<style lang="scss" scoped>
// 색상 맵 정의
$button-colors: (
  'default': $d-black,
  'green': $p-green,
  'teal': $s-teal,
  'white': $d-white
);

// 공통 버튼 스타일 mixin
@mixin button-base {
  display: inline-block;
  min-width: rem(100);
  padding: rem(5) rem(14);
  border: rem(1) solid $d-black;
  border-radius: 43px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.35s;
  @include tablet {
    min-width: rem(145);
    padding: rem(9.5) rem(24);
    border-width: rem(2);
  }
}

// circle 버튼 전용 스타일 mixin
@mixin button-circle {
  min-width: auto;
  padding: 0;
  width: rem(36);
  height: rem(36);
  @include tablet {
    width: rem(54);
    height: rem(54);
  }
}

// 변수들
$skew-angle: -30deg;
$element-width: 120%; // ::before width
$skew-offset: 10%; // skew에 따른 기하학적 오프셋

// hover 효과 mixin들 (수학적 계산 적용)
@mixin hover-left {
  color: $d-white;
  &::before {
    // 최종 위치: skew 오프셋만큼 왼쪽으로
    transform: skewX($skew-angle) translateX(-$skew-offset);
  }
}

@mixin hover-right {
  color: $d-white;
  &::before {
    // 최종 위치: skew 오프셋만큼 왼쪽으로 (skew 방향이 다르므로)
    transform: skewX(-$skew-angle) translateX(-$skew-offset);
  }
}

button,
a {

  // 기본 텍스트 스타일
  font-weight: 700;
  font-size: rem(11);
  color: $d-black;
  text-align: center;
  position: relative;
  z-index: 1;
  transition: all 0.35s;

  @include tablet {
    font-size: rem(14);
  }

  @include button-base;
  
  // circle 버튼 전용 스타일
  &.circle {
    @include button-circle;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }
  
  // hover 효과가 있는 버튼에만 ::before 요소 생성
  &.hover-left,
  &.hover-right {
    &::before {
      content: '';
      position: absolute;
      top: -10%;
      left: 0;
      width: 120%;
      height: 120%;
      background: $d-black;
      transition: all 0.35s;
      z-index: -1;
    }
  }

  // 방향별 초기 위치 설정 (수학적 계산)
  &.hover-left::before {
    // 초기 위치: 완전히 왼쪽 밖에 숨김
    transform: skewX($skew-angle) translateX(-$element-width);
  }

  &.hover-right::before {
    // 초기 위치: 완전히 오른쪽 밖에 숨김
    transform: skewX(-$skew-angle) translateX($element-width);
  }

  // 색상별 배경 설정
  @each $name, $color in $button-colors {
    &.#{$name}::before {
      background: $color;
    }
  }

  // white 색상 hover 배경 설정
  &.white::before {
    background: $d-white;
  }

  // 화살표가 있는 버튼 (내부 링크)
  &.link {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: rem(14);
    text-align: left;
    &::after {
      content: '';
      display: inline-block;
      width: rem(8);
      height: rem(8);
      background-color: currentColor;
      -webkit-mask: url('~/components/assets/cnx/link-arrow.svg') no-repeat center;
      -webkit-mask-size: contain;
      mask: url('~/components/assets/cnx/link-arrow.svg') no-repeat center;
      mask-size: contain;
      transition: all 0.4s;
      @include tablet {
        width: rem(14);
        height: rem(14);
      }
    }
    @include tablet {
      min-width: rem(168);
    }
  }

  // circle 버튼에 link가 있을 때
  &.circle.link {
    min-width: auto;
    @include tablet {
      min-width: auto;
    }
    
    &::after {
      content: '';
      display: inline-block;
      width: rem(12);
      height: rem(12);
      background-color: currentColor;
      -webkit-mask: url('~/components/assets/cnx/link-arrow.svg') no-repeat center;
      -webkit-mask-size: contain;
      mask: url('~/components/assets/cnx/link-arrow.svg') no-repeat center;
      mask-size: contain;
      transition: all 0.4s;
      transform: translate(-50%, -50%);
      position: absolute;
      top: 50%;
      left: 50%;
      
      @include tablet {
        width: rem(16);
        height: rem(16);
      }
    }
  }

  // 화살표 방향별 회전
  &.circle.link.arrow-left {
    &::after {
      transform: translate(-50%, -50%) rotate(180deg);
    }
  }

  &.circle.link.arrow-right {
    &::after {
      transform: translate(-50%, -50%) rotate(0deg);
    }
  }

  // reverse 클래스 - 화살표 방향 반전
  &.link.reverse {
    &::after {
      transform: rotate(180deg);
    }
  }

  &.circle.link.reverse {
    &::after {
      transform: translate(-50%, -50%) rotate(180deg);
    }
  }

  // 외부 링크 버튼
  &.outlink {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    min-width: rem(168);
    gap: rem(14);
    text-align: left;
    &::after {
      content: '';
      display: inline-block;
      width: rem(7);
      height: rem(7);
      background-color: currentColor;
      -webkit-mask: url('~/components/assets/cnx/outlink-arrow.svg') no-repeat center;
      -webkit-mask-size: contain;
      mask: url('~/components/assets/cnx/outlink-arrow.svg') no-repeat center;
      mask-size: contain;
      transition: all 0.4s;
      @include tablet {
        width: rem(12);
        height: rem(12);
      }
    }
  }

  // 색상별 스타일 적용
  @each $name, $color in $button-colors {
    &.#{$name} {
      border-color: $color;
      color: $color;
    }
  }

  // white 색상 특별 처리 (테두리와 텍스트가 흰색)
  &.white {
    border-color: $d-white;
    color: $d-white;
    background-color: transparent;
    
    // hover 시 배경이 흰색이 되므로 텍스트는 검은색으로
    &.hover-left:hover,
    &.hover-right:hover {
      color: $d-black;
    }
  }

  // Hover 애니메이션(0.35s) 종료 후 배경 채우기 지연 적용
  &.hover-left:hover,
  &.hover-right:hover {
    background-color: $d-black;
    transition: color 0.35s, background-color 0.15s 0.2s;
  }

  // 색상별 Hover 종료 후 배경 채우기 (지연 동일 적용)
  @each $name, $color in $button-colors {
    &.#{$name}.hover-left:hover,
    &.#{$name}.hover-right:hover {
      background-color: $color;
      transition: color 0.35s, background-color 0.15s 0.2s;
    }
  }

  // Hover 효과 - 방향별로 다른 효과 적용
  &.hover-left:hover {
    @include hover-left;
  }

  &.hover-right:hover {
    @include hover-right;
  }

  // hover 시 모든 색상에서 흰색 텍스트
  &.hover-left:hover,
  &.hover-right:hover {
    color: $d-white;
  }

}
</style>