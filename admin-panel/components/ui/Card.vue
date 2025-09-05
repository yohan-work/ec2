<template>
  <div :class="cardClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'outlined' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  padding: 'md',
})

const cardClasses = computed(() => {
  const baseClasses = 'card'
  const variantClasses = {
    default: 'card-default',
    outlined: 'card-outlined',
    elevated: 'card-elevated',
  }
  const paddingClasses = {
    none: 'card-padding-none',
    sm: 'card-padding-sm',
    md: 'card-padding-md',
    lg: 'card-padding-lg',
  }

  return [
    baseClasses,
    variantClasses[props.variant],
    paddingClasses[props.padding],
  ]
    .filter(Boolean)
    .join(' ')
})
</script>

<style lang="scss" scoped>
.card {
  border-radius: 0.5rem;
  background-color: white;
  overflow: hidden;

  &.card-default {
    border: 1px solid #e5e7eb;
  }

  &.card-outlined {
    border: 1px solid #d1d5db;
  }

  &.card-elevated {
    box-shadow:
      0 1px 3px 0 rgba(0, 0, 0, 0.1),
      0 1px 2px 0 rgba(0, 0, 0, 0.06);
    border: none;
  }

  &.card-padding-none {
    padding: 0;
  }

  &.card-padding-sm {
    padding: 0.75rem;
  }

  &.card-padding-md {
    padding: 1rem;
  }

  &.card-padding-lg {
    padding: 1.5rem;
  }
}
</style>
