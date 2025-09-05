<template>
  <div class="table-container">
    <table :class="tableClasses">
      <slot />
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'striped' | 'bordered'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
})

const tableClasses = computed(() => {
  const baseClasses = 'table'
  const variantClasses = {
    default: 'table-default',
    striped: 'table-striped',
    bordered: 'table-bordered',
  }
  const sizeClasses = {
    sm: 'table-sm',
    md: 'table-md',
    lg: 'table-lg',
  }

  return [baseClasses, variantClasses[props.variant], sizeClasses[props.size]]
    .filter(Boolean)
    .join(' ')
})
</script>

<style lang="scss" scoped>
.table-container {
  overflow-x: auto;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;

  &.table-sm {
    font-size: 0.875rem;

    th,
    td {
      padding: 0.5rem 0.75rem;
    }
  }

  &.table-md {
    font-size: 0.875rem;

    th,
    td {
      padding: 0.75rem 1rem;
    }
  }

  &.table-lg {
    font-size: 1rem;

    th,
    td {
      padding: 1rem 1.25rem;
    }
  }

  &.table-default {
    th {
      background-color: #f9fafb;
      color: #374151;
      font-weight: 600;
      text-align: left;
      border-bottom: 1px solid #e5e7eb;
    }

    td {
      color: #374151;
      border-bottom: 1px solid #f3f4f6;
    }

    tr:hover {
      background-color: #f9fafb;
    }
  }

  &.table-striped {
    th {
      background-color: #f9fafb;
      color: #374151;
      font-weight: 600;
      text-align: left;
      border-bottom: 1px solid #e5e7eb;
    }

    td {
      color: #374151;
      border-bottom: 1px solid #f3f4f6;
    }

    tbody tr:nth-child(even) {
      background-color: #f9fafb;
    }

    tbody tr:hover {
      background-color: #f3f4f6;
    }
  }

  &.table-bordered {
    th,
    td {
      border: 1px solid #e5e7eb;
    }

    th {
      background-color: #f9fafb;
      color: #374151;
      font-weight: 600;
      text-align: left;
    }

    td {
      color: #374151;
    }

    tr:hover {
      background-color: #f9fafb;
    }
  }
}
</style>
