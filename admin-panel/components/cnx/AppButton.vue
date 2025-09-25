<template>
  <component 
    :is="tag" 
    :class="buttonClasses" 
    :disabled="disabled"
    :href="href"
    :target="target"
    :rel="rel"
    @click="handleClick"
  >
    <span v-if="variant !== 'circle'" class="button-text">
      <slot />
    </span>
    <span v-else class="button-icon">
      <slot />
    </span>
  </component>
</template>

<!--
사용법:
- Button: <AppButton @click="handler">텍스트</AppButton>
- Link: <AppButton href="/path">텍스트</AppButton>
- Circle: <AppButton variant="circle">+</AppButton>
- Arrow: <AppButton variant="arrow">더보기</AppButton>
- Colors: color="green" | "teal"
- Hover Effects: 
  * effect="left" | "right"
  * hoverDuration={300} (ms)
- 예시: <AppButton effect="right">오른쪽으로 이동</AppButton>
-->

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  variant?: 'primary' | 'arrow' | 'circle'
  color?: 'default' | 'green' | 'teal'
  effect?: 'left' | 'right'
  disabled?: boolean
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  rel?: string
}>()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// href가 있으면 a 태그, 없으면 button 태그
const tag = computed(() => {
  return props.href ? 'a' : 'button'
})

const buttonClasses = computed(() => {
  const classes = []
  
  // 기본 variant 클래스
  if (props.variant) {
    classes.push(props.variant)
  }
  
  // 색상 클래스
  if (props.color && props.color !== 'default') {
    classes.push(props.color)
  }
  
  // hover 효과 클래스
  if (props.effect) {
    classes.push(`hover-${props.effect}`)
  }
  
  // disabled 상태
  if (props.disabled) {
    classes.push('disabled')
  }
  
  return classes.join(' ')
})

const handleClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>

<style lang="scss" scoped>
@use '~/layouts/scss/cnx.scss' as *;
@use '~/layouts/scss/cnx/_variables' as *;
@use '~/layouts/scss/cnx/_mixins' as *;
@use '~/layouts/scss/cnx/_functions' as *;

// 색상 맵 정의
$button-colors: (
  'default': $d-black,
  'green': $p-green,
  'teal': $s-teal
);

// 공통 버튼 스타일 mixin
@mixin button-base {
  display: inline-block;
  min-width: rem(145);
  padding: rem(9.5) rem(24);
  border: rem(2) solid $d-black;
  border-radius: 43px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.35s;
}

// 공통 내부 요소 스타일 mixin
@mixin button-content {
  position: relative;
  z-index: 1;
  transition: all 0.35s;
}

// 변수들
$skew-angle: -30deg;
$element-width: 120%; // ::before width
$skew-offset: 10%; // skew에 따른 기하학적 오프셋

// hover 효과 mixin들 (수학적 계산 적용)
@mixin hover-left {
  .button-text,
  .button-icon {
    color: $d-white;
  }
  &::before {
    // 최종 위치: skew 오프셋만큼 왼쪽으로
    transform: skewX($skew-angle) translateX(-$skew-offset);
  }
}

@mixin hover-right {
  .button-text,
  .button-icon {
    color: $d-white;
  }
  &::before {
    // 최종 위치: skew 오프셋만큼 왼쪽으로 (skew 방향이 다르므로)
    transform: skewX(-$skew-angle) translateX(-$skew-offset);
  }
}

button,
a {
  @include button-base;
  
  &::before {
    content: '';
    position: absolute;
    top: -10%;
    left: 0;
    width: 120%;
    height: 120%;
    background: $d-black;
    transition: all 0.35s;
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

  // 버튼 내부 텍스트 (일반 버튼용)
  .button-text {
    @include button-content;
    display: block;
    font-weight: 700;
    font-size: 14px;
    color: $d-black;
    text-align: center;
  }

  // 버튼 내부 아이콘 (원형 버튼용)
  .button-icon {
    @include button-content;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: rem(40);
    height: rem(40);
    border-radius: 50%;
    font-size: 16px;
    color: $d-black;
  }

  // 화살표가 있는 버튼
  &.arrow {
    .button-text,
    .button-icon {
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      min-width: rem(168);
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
    }
  }

  // 색상별 스타일 적용
  @each $name, $color in $button-colors {
    &.#{$name} {
      border-color: $color;
      .button-text,
      .button-icon {
        color: $color;
      }
    }
  }

  // Hover 효과 - 방향별로 다른 효과 적용
  &.hover-left:hover {
    @include hover-left;
  }

  &.hover-right:hover {
    @include hover-right;
  }

}
</style>