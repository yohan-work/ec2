<template>
  <div class="form-group">
    <label v-if="label" :for="inputId" class="form-label">
      {{ label }}
    </label>
    <div class="input-wrapper">
      <input
        :id="inputId"
        :type="inputType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="inputClasses"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      />
      <button
        v-if="type === 'password'"
        type="button"
        class="icon-btn size-16"
        :aria-label="showPassword ? '비밀번호 숨기기' : '비밀번호 보기'"
        @click="togglePasswordVisibility"
      >
        <svg
          v-if="!showPassword"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.37468 8.23228C1.31912 8.0826 1.31912 7.91795 1.37468 7.76828C1.91582 6.45617 2.83437 5.33428 4.01388 4.54485C5.19339 3.75542 6.58075 3.33398 8.00007 3.33398C9.41938 3.33398 10.8067 3.75542 11.9863 4.54485C13.1658 5.33428 14.0843 6.45617 14.6255 7.76828C14.681 7.91795 14.681 8.0826 14.6255 8.23228C14.0843 9.54439 13.1658 10.6663 11.9863 11.4557C10.8067 12.2451 9.41938 12.6666 8.00007 12.6666C6.58075 12.6666 5.19339 12.2451 4.01388 11.4557C2.83437 10.6663 1.91582 9.54439 1.37468 8.23228Z"
            stroke="#4A4A4A"
            stroke-width="1.33334"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8.00002 10.0005C9.1046 10.0005 10 9.10508 10 8.0005C10 6.89593 9.1046 6.00049 8.00002 6.00049C6.89544 6.00049 6 6.89593 6 8.0005C6 9.10508 6.89544 10.0005 8.00002 10.0005Z"
            stroke="#4A4A4A"
            stroke-width="1.33334"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <svg
          v-else
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.15527 3.38383C8.7082 3.19877 10.279 3.52704 11.6279 4.31853C12.9767 5.11002 14.0294 6.32122 14.6253 7.76717C14.6808 7.91684 14.6808 8.08149 14.6253 8.23117C14.3803 8.82516 14.0565 9.3835 13.6626 9.89116"
            stroke="#4A4A4A"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9.38918 9.43884C9.01197 9.80316 8.50677 10.0047 7.98238 10.0002C7.45798 9.99563 6.95636 9.78529 6.58554 9.41448C6.21473 9.04366 6.00439 8.54204 5.99983 8.01764C5.99527 7.49325 6.19686 6.98804 6.56118 6.61084"
            stroke="#4A4A4A"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11.6527 11.666C10.7683 12.1899 9.78165 12.5174 8.75959 12.6263C7.73752 12.7352 6.70398 12.623 5.7291 12.2973C4.75422 11.9716 3.86081 11.4399 3.10949 10.7385C2.35816 10.0371 1.76651 9.18226 1.37468 8.23202C1.31912 8.08235 1.31912 7.9177 1.37468 7.76802C1.96577 6.33459 3.00579 5.13152 4.33868 4.33936"
            stroke="#4A4A4A"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M1.33325 1.3335L14.6666 14.6668"
            stroke="#4A4A4A"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  modelValue?: string
  type?: 'text' | 'password' | 'email' | 'number'
  label?: string
  placeholder?: string
  disabled?: boolean
  error?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  label: '',
  placeholder: '',
  disabled: false,
  error: '',
})

defineEmits<{
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const showPassword = ref(false)
const inputId = computed(
  () => `input-${Math.random().toString(36).substr(2, 9)}`
)

const inputType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password'
  }
  return props.type
})

const inputClasses = computed(() => {
  const baseClasses = 'form-control'
  const errorClasses = props.error ? 'is-invalid' : ''
  const disabledClasses = props.disabled ? 'disabled' : ''

  return [baseClasses, errorClasses, disabledClasses].filter(Boolean).join(' ')
})

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>
