<template>
  <div class="radio-group" :class="{ 'radio-group--vertical': vertical }">
    <div v-if="title" class="radio-label">
      {{ title }}
    </div>
    <div class="radio-options">
      <label
        v-for="option in options"
        :key="option.value"
        :class="{ 'radio-label--disabled': disabled }"
        :for="`${name}-${option.value}`"
      >
        <input
          :id="`${name}-${option.value}`"
          type="radio"
          :name="name"
          :value="option.value"
          :checked="modelValue === option.value"
          :disabled="disabled"
          @change="handleChange"
        />
        <span class="radio-text">{{ option.label }}</span>
      </label>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    required: true,
    validator: options => {
      return options.every(
        option =>
          typeof option === 'object' && 'value' in option && 'label' in option
      )
    },
  },
  name: {
    type: String,
    required: true,
  },
  vertical: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'change'])

const handleChange = event => {
  const value = event.target.value
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<style lang="scss" scoped>
.radio-group {
  margin-top: 8px;

  &:has(.radio-label) {
    margin-top: 0;
  }

  &--vertical {
    flex-direction: column;
  }

  &--horizontal {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .radio-options {
    display: flex;
    align-items: center;
    gap: 8px 24px;
    flex-wrap: wrap;
  }
  .radio-label + .radio-options {
    min-height: 40px;
  }

  .radio-label {
    width: 100%;
    color: #000;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 8px;
    font-weight: 700;
    span {
      font-weight: 400;
    }
    ~ label {
      padding: 0;
    }
  }

  .form-group + & label {
    padding: 0;
  }

  label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: 12px;
    color: #374151;
    padding: 8px 12px;
    border-radius: 6px;
    transition: all 0.2s;
    user-select: none;

    &:hover:not(.radio-label--disabled) {
      background-color: #f9fafb;
    }

    &--disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    input[type='radio'] {
      width: 16px;
      height: 16px;
      margin: 0;
      cursor: pointer;
      accent-color: #3b82f6;
      outline: none;

      &:disabled {
        cursor: not-allowed;
      }
    }

    &:focus-within {
      outline: none;
      border-color: #86b7fe;
      box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
    }

    .radio-text {
      font-weight: 500;
      transition: all 0.2s;
    }

    input[type='radio']:disabled + .radio-text {
      color: #9ca3af;
    }
  }
}
// 반응형 디자인
@media (max-width: 768px) {
  .radio-group {
    gap: 6px;

    label {
      padding: 6px 10px;
      font-size: 13px;
    }
  }
}
</style>
