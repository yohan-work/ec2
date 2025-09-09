<template>
  <div class="form-group">
    <label v-if="label" :for="inputId" class="form-label">
      {{ label }}
    </label>
    <div :class="inputWrapperClasses">
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
const inputId = ref(`input-${Math.random().toString(36).substr(2, 9)}`)

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

const inputWrapperClasses = computed(() => {
  const baseClasses = ''
  const passwordClasses =
    props.type === 'password' ? 'password-input-wrapper' : 'input-wrapper'

  return [baseClasses, passwordClasses].filter(Boolean).join(' ')
})

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>

<style lang="scss" scoped>
.form-group {
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 700;
    color: #333;
  }
  input,
  select {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    &[type='checkbox'],
    &[type='radio'] {
      width: 16px;
      margin-right: 8px;
      padding: 0;
    }
    &:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
  }
}

.form-label {
  color: #000;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 8px;
  font-weight: 700;
  span {
    font-weight: 400;
  }
}
.form-select,
.form-control {
  display: flex;
  padding: 10px 12px;
  align-items: center;
  flex: 1 0 0;
  border-radius: 4px;
  border: 1px solid #cbcbcb;
  background-color: #fafafa;
  height: 40px;
  font-size: 14px;
  line-height: 20px;
  color: #000;
  &:placeholder {
    color: #7a7a7a;
  }
  &[type='date'] {
    display: block;
    appearance: none;
    &::-webkit-calendar-picker-indicator {
      background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik04Ljg4ODY3IDQuMjIyMTdWNy4zMzMyOCIgc3Ryb2tlPSIjNEE0QTRBIiBzdHJva2Utd2lkdGg9IjEuNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CiAgICA8cGF0aCBkPSJNMTUuMTExMyA0LjIyMjE3VjcuMzMzMjgiIHN0cm9rZT0iIzRBNEE0QSIgc3Ryb2tlLXdpZHRoPSIxLjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgogICAgPHBhdGggZD0iTTE3LjQ0NDQgNS43Nzc4M0g2LjU1NTU2QzUuNjk2NDUgNS43Nzc4MyA1IDYuNDc0MjggNSA3LjMzMzM5VjE4LjIyMjNDNSAxOS4wODE0IDUuNjk2NDUgMTkuNzc3OCA2LjU1NTU2IDE5Ljc3NzhIMTcuNDQ0NEMxOC4zMDM2IDE5Ljc3NzggMTkgMTkuMDgxNCAxOSAxOC4yMjIzVjcuMzMzMzlDMTkgNi40NzQyOCAxOC4zMDM2IDUuNzc3ODMgMTcuNDQ0NCA1Ljc3NzgzWiIgc3Ryb2tlPSIjNEE0QTRBIiBzdHJva2Utd2lkdGg9IjEuNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CiAgICA8cGF0aCBkPSJNNSAxMC40NDQzSDE5IiBzdHJva2U9IiM0QTRBNEEiIHN0cm9rZS13aWR0aD0iMS40IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KICAgIDwvc3ZnPg==)
        center/24px 24px no-repeat;
      color: transparent;
      opacity: 1;
    }
  }
}

.form-check {
  font-size: 12px;
  line-height: 16px;
  color: #212529;
  &-label {
    padding: 3px 0 0 4px;
  }
  &-input {
    width: 16px;
    height: 16px;
    border-radius: 4px;
    border: 1px solid #cbcbcb;
    background-color: #fafafa;
    &:checked {
      background-color: #3778f9;
    }
  }
}

.password-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;

  .form-control {
    padding-right: 40px;
  }
  .icon-btn {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: background-color 0.2s;
    width: 24px;
    height: 24px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }

    svg {
      width: 16px;
      height: 16px;
      display: block;
      &:last-child {
        display: none;
      }
    }
  }
  .form-control[type='text'] + .icon-btn svg {
    &:first-child {
      display: none;
    }
    &:last-child {
      display: block;
    }
  }
}
.error-message {
  color: #cd2323;
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  margin-top: 6px;
  min-height: 16px;
}
</style>
