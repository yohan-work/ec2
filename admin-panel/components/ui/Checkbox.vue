<template>
  <div class="checkbox-group" :class="{ 'checkbox-group--vertical': vertical }">
    <label
      v-for="option in options"
      :key="option.value"
      class="checkbox-label"
      :class="{ 'checkbox-label--disabled': disabled }"
    >
      <input
        :id="`${name}-${option.value}`"
        type="checkbox"
        :name="name"
        :value="option.value"
        :checked="isChecked(option.value)"
        :disabled="disabled"
        @change="handleChange"
      />
      <span class="checkmark"></span>
      <span class="checkbox-text">{{ option.label }}</span>
    </label>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [Array, String, Number, Boolean],
    default: () => [],
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
  multiple: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['update:modelValue', 'change'])

const isChecked = value => {
  if (props.multiple) {
    return Array.isArray(props.modelValue) && props.modelValue.includes(value)
  } else {
    return props.modelValue === value
  }
}

const handleChange = event => {
  const value = event.target.value
  const checked = event.target.checked

  if (props.multiple) {
    let newValue = [
      ...(Array.isArray(props.modelValue) ? props.modelValue : []),
    ]
    if (checked) {
      if (!newValue.includes(value)) {
        newValue.push(value)
      }
    } else {
      newValue = newValue.filter(v => v !== value)
    }
    emit('update:modelValue', newValue)
    emit('change', newValue)
  } else {
    emit('update:modelValue', checked ? value : '')
    emit('change', checked ? value : '')
  }
}
</script>

<style lang="scss" scoped>
.checkbox-group {
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

.checkbox-label {
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

  &:hover:not(.checkbox-label--disabled) {
    background-color: #f9fafb;
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  input[type='checkbox'] {
    display: none;
  }

  .checkmark {
    width: 16px;
    height: 16px;
    border: 2px solid #d1d5db;
    border-radius: 4px;
    position: relative;
    transition: all 0.2s;
    flex-shrink: 0;

    &::after {
      content: '';
      position: absolute;
      left: 4px;
      top: 1px;
      width: 4px;
      height: 8px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
      opacity: 0;
      transition: opacity 0.2s;
    }
  }

  input[type='checkbox']:checked + .checkmark {
    background-color: #3b82f6;
    border-color: #3b82f6;

    &::after {
      opacity: 1;
    }
  }

  input[type='checkbox']:disabled + .checkmark {
    border-color: #d1d5db;
    background-color: #f3f4f6;
  }

  .checkbox-text {
    font-weight: 500;
    transition: all 0.2s;
  }

  input[type='checkbox']:checked + .checkmark + .checkbox-text {
    color: #3b82f6;
    font-weight: 600;
  }

  input[type='checkbox']:disabled + .checkmark + .checkbox-text {
    color: #9ca3af;
  }
}

// 반응형 디자인
@media (max-width: 768px) {
  .checkbox-group {
    gap: 6px;
  }

  .checkbox-label {
    padding: 6px 10px;
    font-size: 13px;
  }
}
</style>
