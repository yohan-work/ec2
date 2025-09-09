<template>
  <select
    :id="selectId"
    :value="modelValue"
    :disabled="disabled"
    :class="selectClasses"
    @change="handleChange"
  >
    <option v-if="placeholder" value="" disabled>
      {{ placeholder }}
    </option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Option {
  value: string | number
  label: string
}

interface Props {
  modelValue?: string | number
  options: Option[]
  placeholder?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  options: () => [],
  placeholder: '',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const selectId = computed(
  () => `select-${Math.random().toString(36).substr(2, 9)}`
)

const selectClasses = computed(() => {
  return 'form-select'
})

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const value = target.value
  // 숫자로 변환 가능한 경우 숫자로, 그렇지 않으면 문자열로 전달
  const numericValue = Number(value)
  const finalValue = !isNaN(numericValue) && value !== '' ? numericValue : value
  emit('update:modelValue', finalValue)
}
</script>

<style lang="scss" scoped>
.form-select {
  width: 100%;
  appearance: none;
  display: flex;
  padding: 10px 36px 10px 12px;
  align-items: center;
  flex: 1 0 0;
  border-radius: 4px;
  border: 1px solid #cbcbcb;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYuNDYxNjcgOC42MTg2NUM2LjU0MTk1IDguNjE4NjUgNi42MjE4NyA4LjYzNDgxIDYuNjk2MDQgOC42NjU1M0M2Ljc3MDMxIDguNjk2MzUgNi44Mzg0NyA4Ljc0MTQyIDYuODk1MjYgOC43OTgzNEwxMS45OTk4IDEzLjkwMzhMMTcuMTA1MiA4Ljc5ODM0QzE3LjE2MiA4Ljc0MTYgMTcuMjI5MyA4LjY5NjI2IDE3LjMwMzUgOC42NjU1M0MxNy4zNzc3IDguNjM0NzkgMTcuNDU3NSA4LjYxOTY1IDE3LjUzNzggOC42MTk2M0MxNy42MTgyIDguNjE5NjMgMTcuNjk4IDguNjM0OCAxNy43NzIyIDguNjY1NTNDMTcuODQ2NCA4LjY5NjI0IDE3LjkxMzcgOC43NDE2NCAxNy45NzA1IDguNzk4MzRDMTguMDI3MyA4Ljg1NTE4IDE4LjA3MjUgOC45MjMzIDE4LjEwMzMgOC45OTc1NkMxOC4xMzM5IDkuMDcxNjEgMTguMTUwMSA5LjE1MDgyIDE4LjE1MDEgOS4yMzA5NkMxOC4xNTAxIDkuMzExMjggMTguMTM0IDkuMzkxMTEgMTguMTAzMyA5LjQ2NTMzQzE4LjA3MjUgOS41Mzk1OSAxOC4wMjczIDkuNjA3NzEgMTcuOTcwNSA5LjY2NDU1TDEyLjQzMjQgMTUuMjAwN0wxMi40MzMzIDE1LjIwMTdDMTIuMzc2NSAxNS4yNTg2IDEyLjMwODQgMTUuMzAzNiAxMi4yMzQxIDE1LjMzNDVDMTIuMTU5OSAxNS4zNjUzIDEyLjA4MDIgMTUuMzgxMyAxMS45OTk4IDE1LjM4MTNDMTEuOTE5NCAxNS4zODEzIDExLjgzOTYgMTUuMzY1MyAxMS43NjU0IDE1LjMzNDVDMTEuNzI4MyAxNS4zMTkxIDExLjY5MzEgMTUuMzAwMSAxMS42NTk5IDE1LjI3NzhMMTEuNTY3MSAxNS4yMDE3TDYuMDI5MDUgOS42NjQ1NUM1Ljk3MjEzIDkuNjA3NzYgNS45MjcwNiA5LjUzOTYgNS44OTYyNCA5LjQ2NTMzQzUuODY1NTMgOS4zOTExNiA1Ljg0OTM3IDkuMzExMjQgNS44NDkzNyA5LjIzMDk2QzUuODQ5NDIgOS4xNTA2NiA1Ljg2NTQ3IDkuMDcwNzUgNS44OTYyNCA4Ljk5NjU4QzUuOTI3MDQgOC45MjI0NiA1Ljk3MjI0IDguODU1MDQgNi4wMjkwNSA4Ljc5ODM0QzYuMDg1NzYgOC43NDE1MyA2LjE1MzE3IDguNjk2MzMgNi4yMjcyOSA4LjY2NTUzQzYuMzAxNDYgOC42MzQ3NSA2LjM4MTM4IDguNjE4NzEgNi40NjE2NyA4LjYxODY1WiIgZmlsbD0iIzRBNEE0QSIgc3Ryb2tlPSIjNEE0QTRBIiBzdHJva2Utd2lkdGg9IjAuMyIvPgo8L3N2Zz4K');
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 24px;
  background-color: #fafafa;
  height: 40px;
  font-size: 14px;
  line-height: 20px;
  color: #000;
  font-weight: 400;
  &:placeholder {
    color: #7a7a7a;
  }
  color: #7a7a7a;
  &:has(option[value]:not([value='']):checked) {
    color: #000;
  }
  + .form-check {
    margin: 6px 0 0 0;
    min-height: 16px;
  }
}
</style>
