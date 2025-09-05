<template>
  <button
    :class="iconButtonClasses"
    :disabled="disabled"
    :type="type"
    :aria-label="ariaLabel"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  disabled: false,
  type: 'button',
  ariaLabel: '',
})

defineEmits<{
  click: [event: MouseEvent]
}>()

const iconButtonClasses = computed(() => {
  const baseClasses = 'icon-btn'

  // 크기 클래스 매핑
  const sizeClasses = {
    sm: 'size-16',
    md: '', // 기본 크기 (24px)
    lg: '', // 기본 크기 (24px)
  }

  const disabledClasses = props.disabled ? 'disabled' : ''

  return [baseClasses, sizeClasses[props.size], disabledClasses]
    .filter(Boolean)
    .join(' ')
})
</script>
