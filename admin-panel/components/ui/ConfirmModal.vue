<template>
  <Modal :show="show" @close="closeModal" :class="modalClass" :title="title">
    <div class="confirm-content">
      <p class="confirm-message">{{ message }}</p>
      <p v-if="warning" class="confirm-warning">{{ warning }}</p>
    </div>

    <template #footer>
      <div class="modal-actions">
        <Button
          variant="outline-dark"
          :size="36"
          :padding="40"
          @click="closeModal"
          :disabled="loading"
        >
          {{ cancelText }}
        </Button>
        <Button
          :variant="confirmVariant"
          :size="36"
          :padding="40"
          @click="confirmAction"
          :disabled="loading"
        >
          {{ loading ? loadingText : confirmText }}
        </Button>
      </div>
    </template>
  </Modal>
</template>

<script setup>
import Modal from '~/components/ui/Modal.vue'
import Button from '~/components/ui/Button.vue'

// Props
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '확인',
  },
  message: {
    type: String,
    required: true,
  },
  warning: {
    type: String,
    default: '',
  },
  confirmText: {
    type: String,
    default: '확인',
  },
  cancelText: {
    type: String,
    default: '취소',
  },
  confirmVariant: {
    type: String,
    default: 'primary',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  loadingText: {
    type: String,
    default: '처리 중...',
  },
  modalClass: {
    type: String,
    default: '',
  },
})

// Emits
const emit = defineEmits(['close', 'confirm'])

// Methods
const closeModal = () => {
  emit('close')
}

const confirmAction = () => {
  emit('confirm')
}
</script>

<style lang="scss" scoped>
// 확인 모달 기본 스타일
:deep(.confirm-modal) {
  .modal-content {
    border-radius: 8px;
    border: none;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }

  .modal-header {
    border-bottom: 1px solid #e9ecef;
    padding: 20px 24px 16px;
  }

  .modal-title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  .modal-body {
    padding: 24px;
  }

  .modal-footer {
    border-top: 1px solid #e9ecef;
    padding: 16px 24px 20px;
  }

  .confirm-content {
    text-align: center;
  }

  .confirm-message {
    font-size: 16px;
    color: #333;
    margin: 0 0 8px 0;
    font-weight: 500;
  }

  .confirm-warning {
    font-size: 14px;
    color: #666;
    margin: 0;
  }

  .modal-actions {
    display: flex;
    gap: 12px;
    justify-content: center;
  }
}

// 삭제 모달 스타일
:deep(.delete-modal) {
  .confirm-content {
    text-align: center;
  }

  .confirm-message {
    font-size: 16px;
    color: #333;
    margin: 0 0 8px 0;
    font-weight: 500;
  }

  .confirm-warning {
    font-size: 14px;
    color: #666;
    margin: 0;
  }
}

// 로그아웃 모달 스타일
:deep(.logout-modal) {
  .confirm-content {
    text-align: center;
  }

  .confirm-message {
    font-size: 16px;
    color: #333;
    margin: 0 0 8px 0;
    font-weight: 500;
  }

  .confirm-warning {
    font-size: 14px;
    color: #666;
    margin: 0;
  }
}
</style>

