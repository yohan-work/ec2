<template>
  <button
    :class="buttonClasses"
    :data-style="dataStyle"
    :disabled="disabled"
    :type="type"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'text'
    | 'white'
    | 'blue'
    | 'toolbar-menu'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  fullWidth?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  fullWidth: false,
  type: 'button',
})

defineEmits<{
  click: [event: MouseEvent]
}>()

// data-style 속성값 매핑
const dataStyleMap = {
  primary: 'black',
  secondary: 'gray',
  outline: 'outlined',
  ghost: 'text',
  danger: 'black', // danger는 black과 동일하게 처리
  text: 'text',
  white: 'white',
  blue: 'blue',
  'toolbar-menu': 'toolbar-menu',
}

const dataStyle = computed(() => dataStyleMap[props.variant])

const buttonClasses = computed(() => {
  const baseClasses = 'common-btn'

  // 크기 클래스 매핑
  const sizeClasses = {
    xs: 'height-20',
    sm: 'height-24',
    md: 'height-36',
    lg: 'height-38',
    xl: 'height-48',
  }

  // 패딩 클래스 (필요한 경우)
  const paddingClasses = {
    xs: '',
    sm: '',
    md: 'padding-40',
    lg: 'padding-40',
    xl: 'padding-40',
  }

  const widthClasses = props.fullWidth ? 'w-full' : ''

  return [
    baseClasses,
    sizeClasses[props.size],
    paddingClasses[props.size],
    widthClasses,
    props.disabled ? 'opacity-50 cursor-not-allowed' : '',
  ]
    .filter(Boolean)
    .join(' ')
})
</script>

<style lang="scss" scoped>
.common-btn {
  position: relative;
  justify-content: center;
  align-items: center;
  gap: 4px;
  color: #fff;
  font-family: Inter;
  font-size: 14px;
  font-weight: 600;
  border: 0;
  transition: transform 0.2s ease;
  user-select: none;
  &.height-20 {
    // text button
    height: 20px;
    line-height: 20px;
    padding: 0;
    border-radius: 0;
    font-size: 14px;
    line-height: 20px;
  }
  &.height-24 {
    height: 24px;
    line-height: 24px;
    padding: 0 8px;
    border-radius: 6px;
    font-size: 12px;
    line-height: 16px;
  }
  &.height-28 {
    height: 28px;
    line-height: 28px;
    padding: 0 10px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
  }
  &.height-36 {
    height: 36px;
    line-height: 36px;
    padding: 0 12px;
    border-radius: 8px;
  }
  &.height-38 {
    height: 38px;
    line-height: 38px;
    padding: 0 12px;
    border-radius: 8px;
  }
  &.height-48 {
    height: 48px;
    line-height: 48px;
    padding: 0 12px;
    border-radius: 8px;
  }
  &.padding-32 {
    padding: 0 32px !important;
  }
  &.padding-40 {
    padding: 0 40px !important;
  }
  &[data-style='text'] {
    background: transparent;
    color: #000;
    border: 0;
  }
  &[data-style='white'] {
    background: #fff;
    color: #000;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  &[data-style='black'] {
    background: #000;
    color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.2);
    &:disabled {
      background: #e5e7eb;
      color: #9ca3af;
      border-color: #e5e7eb;
      &:after {
        // #ffffff 를 #9CA3AF 로 변경
        filter: invert(50%) sepia(10%) saturate(1000%) hue-rotate(180deg)
          brightness(90%) contrast(90%);
        opacity: 0.6;
      }
    }
  }
  &[data-style='gray'] {
    background: #edeff2;
    color: #000;
    border: 0;
  }
  &[data-style='blue'] {
    background: #3778f9;
    color: #fff;
    border: 0;
  }
  &[data-style='outlined'] {
    background: transparent;
    color: #3c3c3c;
    border: 1px solid #000;
  }
  &[data-style='toolbar-menu'] {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    color: #000;
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
    background: #fff;
    border: 1px solid transparent;
    font-family: Pretendard;
    &.active,
    &:hover,
    &:focus-visible {
      border-radius: 8px;
      background: rgba(55, 120, 249, 0.1);
      color: #3778f9;
      svg {
        path {
          stroke: #3778f9;
        }
      }
    }
    span {
      display: block;
    }
    svg {
      width: 24px;
      height: 24px;
      path {
        stroke: #000;
      }
    }
  }
  &:focus-visible {
    outline-offset: 3px;
  }
}
.icon-btn {
  position: relative;
  display: inline-block;
  width: 24px;
  height: 24px;
  line-height: 24px;
  appearance: none;
  border: 0;
  border-radius: 4px;
  vertical-align: middle;
  background: transparent;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover:not(.disabled) {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &.disabled {
    cursor: not-allowed;
    opacity: 0.5;

    &:hover {
      background-color: transparent;
    }
  }

  &.size-16 {
    width: 16px;
    height: 16px;
  }

  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
