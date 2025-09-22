<template>
  <Transition name="toast">
    <div v-if="show" class="toast" :class="variant">
      {{ message }}
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch } from 'vue'

// Props
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'default', // default, success, error, warning
    validator: (value) => ['default', 'success', 'error', 'warning'].includes(value)
  },
  duration: {
    type: Number,
    default: 2000 // 2초
  }
})

// Emits
const emit = defineEmits(['close'])

// 내부 상태
const internalShow = ref(props.show)

// Props 변경 감지
watch(() => props.show, (newValue) => {
  internalShow.value = newValue
  
  if (newValue) {
    // 자동으로 사라지게
    setTimeout(() => {
      internalShow.value = false
      emit('close')
    }, props.duration)
  }
})

// 초기값 설정
if (props.show) {
  setTimeout(() => {
    internalShow.value = false
    emit('close')
  }, props.duration)
}
</script>

<style lang="scss" scoped>
@use '~/layouts/scss/cnx.scss' as *;
@use '~/layouts/scss/cnx/_variables' as *;

.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  z-index: 1000;
  max-width: 300px;
  word-wrap: break-word;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  // Variants
  &.default {
    background: $p-blue;
    color: $d-white;
    box-shadow: 0 4px 12px rgba(0, 61, 91, 0.3);
  }

  &.success {
    background: $p-green;
    color: $d-white;
    box-shadow: 0 4px 12px rgba(0, 115, 128, 0.3);
  }

  &.error {
    background: $a-pink;
    color: $d-white;
    box-shadow: 0 4px 12px rgba(204, 50, 98, 0.3);
  }

  &.warning {
    background: $a-orange;
    color: $d-white;
    box-shadow: 0 4px 12px rgba(255, 138, 0, 0.3);
  }
}

// 토스트 애니메이션
.toast-enter-active {
  transition: all 0.3s ease-out;
}

.toast-leave-active {
  transition: all 0.3s ease-in;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

@media (max-width: 768px) {
  .toast {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }
}
</style>
