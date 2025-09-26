<template>
  <div class="radio-group" :class="{ 'radio-group--vertical': vertical }">
    <label
      v-for="option in options"
      :key="option.value"
      class="radio-label"
      :class="{ 'radio-label--disabled': disabled }"
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
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
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
  display: flex;
  gap: 8px;
  margin-top: 8px;

  &--vertical {
    flex-direction: column;
  }

  &--horizontal {
    flex-direction: row;
    flex-wrap: wrap;
  }
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
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

    &:disabled {
      cursor: not-allowed;
    }
  }

  .radio-text {
    font-weight: 500;
    transition: all 0.2s;
  }

  input[type='radio']:checked + .radio-text {
    color: #3b82f6;
    font-weight: 600;
  }

  input[type='radio']:disabled + .radio-text {
    color: #9ca3af;
  }
}

// 반응형 디자인
@media (max-width: 768px) {
  .radio-group {
    gap: 6px;
  }

  .radio-label {
    padding: 6px 10px;
    font-size: 13px;
  }
}
</style>
