<template>
  <div class="checkbox-group" :class="{ 'checkbox-group--vertical': vertical }">
    <div v-if="title" class="checkbox-label">
      {{ title }}
    </div>
    <div class="checkbox-options">
      <label
        v-for="option in options"
        :key="option.value"
        :class="{ 'checkbox-label--disabled': disabled }"
        :for="`${name}-${option.value}`"
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
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [Array, String, Number, Boolean],
    default: () => [],
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
  gap: 8px 24px;
  margin-top: 6px;
  flex-wrap: wrap;

  &:has(.checkbox-label) {
    margin-top: 0;
  }

  &--vertical {
    flex-direction: column;
  }

  &--horizontal {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .checkbox-options {
    display: flex;
    align-items: center;
    gap: 8px 24px;
    flex-wrap: wrap;
  }
  .checkbox-label + .checkbox-options {
    min-height: 40px;
  }

  .checkbox-label {
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

    &:hover:not(.checkbox-label--disabled) {
      background-color: #f9fafb;
    }

    &--disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    input[type='checkbox'] {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    &:focus-within {
      outline: none;
      border-color: #86b7fe;
      box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
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

    input[type='checkbox']:disabled + .checkbox-text {
      color: #9ca3af;
    }
  }
}

// 반응형 디자인
@media (max-width: 768px) {
  .checkbox-group {
    gap: 6px;
    label {
      padding: 6px 10px;
      font-size: 12px;
    }
  }
}
</style>
