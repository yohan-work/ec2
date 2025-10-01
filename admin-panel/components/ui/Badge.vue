<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
})

const badgeClasses = computed(() => {
  const baseClasses = 'badge badge-md'
  const variantClasses = {
    default: 'badge-default',
    secondary: 'badge-secondary',
    destructive: 'badge-destructive',
    outline: 'badge-outline',
  }

  return [baseClasses, variantClasses[props.variant]].filter(Boolean).join(' ')
})
</script>

<style lang="scss" scoped>
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 24px;
  font-size: 14px;
  line-height: 20px;
  border-radius: 4px;
  padding: 0 10px;
  color: #000;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #f3f3f5;
  white-space: nowrap;
  // badge-active - 활성 상태
  // badge-resigned - 퇴사 상태
  // badge-on-leave - 휴직 상태
  // badge-transferred - 전출 상태
  // badge-pre-hire - 입사예정 상태
  // badge-default - 기본 상태 (fallback)
  &-default {
    color: #000;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: #f3f3f5;
  }
  &-pre-hire {
    color: #000;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: #f3f3f5;
  }
  &-active {
    border: 1px solid rgba(45, 88, 190, 0.1);
    background: #eef1f7;
    color: #2d58be;
  }
  &-resigned {
    border: 1px solid rgba(217, 43, 43, 0.1);
    background: #f4e9e9;
    color: #cd2323;
  }
  &-on-leave {
    color: #000;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: #f3f3f5;
  }
  &-transferred {
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: #ffffff;
    color: #000;
  }

  // 직무별 badge 스타일

  // PMO: 'badge-pmo',
  // PLANNER: 'badge-planner',
  // DESIGNER: 'badge-designer',
  // PUBLISHER: 'badge-publisher',
  &-pmo {
    border: none;
    background-color: #d3f4eb;
    color: #1f665d;
    font-weight: 700;
  }
  &-planner {
    border: none;
    background-color: #cfe0e8;
    color: #34566a;
    font-weight: 700;
  }
  &-designer {
    border: none;
    background-color: #ffcdd2;
    color: #a20f35;
    font-weight: 700;
  }
  &-publisher {
    border: none;
    background-color: #ffd688;
    color: #942b0c;
    font-weight: 700;
  }
}
</style>
