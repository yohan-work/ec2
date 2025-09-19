<template>
  <div
    v-if="show"
    class="modal fade show"
    :class="{ 'd-block': show }"
    tabindex="-1"
    :data-bs-backdrop="static ? 'static' : 'true'"
    :data-bs-keyboard="static ? 'false' : 'true'"
    @click.self="handleBackdropClick"
  >
    <div class="modal-dialog modal-dialog-centered" :class="sizeClass">
      <div class="modal-content">
        <div v-if="title" class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button
            v-if="closable"
            type="button"
            class="btn-close"
            @click="close"
          ></button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div v-if="$slots.footer" class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
  <div v-if="show" class="modal-backdrop fade show"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  show: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closable?: boolean
  static?: boolean
  closeOnBackdrop?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  title: '',
  size: 'md',
  closable: true,
  static: false,
  closeOnBackdrop: true,
})

const emit = defineEmits<{
  close: []
  'update:show': [show: boolean]
}>()

const sizeClass = computed(() => {
  const sizeMap = {
    sm: 'modal-sm',
    md: '',
    lg: 'modal-lg',
    xl: 'modal-xl',
  }
  return sizeMap[props.size]
})

const close = () => {
  emit('close')
  emit('update:show', false)
}

const handleBackdropClick = () => {
  if (props.closeOnBackdrop && !props.static) {
    close()
  }
}
</script>

<style lang="scss" scoped>
// 모달 오버레이
.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1055;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
  display: none;

  &.show {
    display: block !important;
  }
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-dialog {
  position: relative;
  width: auto;
  margin: 1.75rem auto;
  max-width: 442px;
  pointer-events: none;

  @media (max-width: 768px) {
    max-width: 100%;
    margin: 0.5rem;
  }

  &.modal-fullscreen {
    max-width: 100%;
    margin: 0;
    height: 100%;
  }

  #employeeModal & {
    max-width: 876px;
  }

  // 중앙 정렬 (기본값으로 설정)
  display: flex;
  align-items: center;
  min-height: calc(100% - 3.5rem);

  @media (max-width: 768px) {
    min-height: calc(100% - 1rem);
  }
}
.modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  // box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.5);
  outline: 0;
  padding: 24px 24px 32px 24px;

  .modal-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 0;
    border: 0;
    margin-bottom: 16px;

    .modal-title {
      padding: 0;
      border: 0;
      color: #000;
      font-size: 20px;
      font-weight: 700;
      line-height: 28px;
      margin: 0;
    }

    .btn-close {
      padding: 0.25rem 0.25rem;
      margin: -0.25rem -0.25rem -0.25rem auto;
      background: transparent;
      border: 0;
      border-radius: 0.25rem;
      opacity: 0.5;
      cursor: pointer;

      &:hover {
        opacity: 0.75;
      }

      &:focus {
        outline: 0;
        box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.25);
      }
    }
  }
  .modal-body {
    position: relative;
    flex: 1 1 auto;
    padding: 0;

    .modal-body-content {
      color: #666;
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
      margin-top: -8px;
      padding: 0 0 28px 0;
    }

    &:has(.form-control) {
      padding: 12px 0 0 0;
    }

    .d-flex.justify-content-center {
      margin-top: 40px;
    }

    // login form
    .username-input {
      margin-bottom: 24px;
    }

    .password-input {
      margin-bottom: 36px;
    }
  }

  .modal-footer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 32px 0 0 0;

    :deep(.modal-actions) {
      width: 100%;
      display: flex;
      gap: 8px;
      justify-content: center;
    }
  }
}

// 기본 alert, confirm 모달
#globalModal {
  .modal-body {
    color: #000;
    font-size: 14px;
    line-height: 20px;
    text-align: left;
    .d-flex {
      padding: 0;
      border: 0 !important;
      margin-top: 32px;
    }
  }
}
// 로그인 모달
#loginModal {
  // 편집 불가 메시지
  .login-edit-blocked {
    background: #fff3cd;
    border: 1px solid #ffc107;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 20px;
    .blocked-icon {
      color: #856404;
      font-size: 1.2em;
      margin-right: 10px;
    }
    .blocked-text {
      color: #856404;
      font-weight: 500;
    }
    .blocked-admin {
      font-weight: bold;
      color: #495057;
    }
    .blocked-time {
      font-size: 0.9em;
      color: #6c757d;
      margin-top: 5px;
    }
  }
}
// 시간 만료 경고 모달
#timeoutWarningModal {
  .modal-content {
    padding-top: 32px;
    .modal-header .modal-title {
      color: #000;
      text-align: center;
      font-size: 24px;
      font-weight: 700;
      line-height: 36px;
    }
    .modal-body {
      color: #000;
      font-size: 14px;
      line-height: 20px;
      text-align: left;
      .d-flex {
        padding: 0;
        border: 0 !important;
        margin-top: 32px;
      }
      .timer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 6px;
        .time {
          color: #cd2323;
          font-size: 20px;
          font-weight: 700;
          line-height: 28px;
        }
      }
    }
  }
}
#employeeModal {
  .photo-input {
    position: relative;
    padding: 2rem;
    background: #f8f9fa;
    border: 1.5px dashed #dee2e6;
    border-radius: 12px;
    text-align: center;
    transition: all 0.3s ease;
    cursor: pointer;
    &:hover {
      border-color: #007bff;
      background: #f0f8ff;
    }
    &.dragover {
      border-color: #007bff;
      background: #e3f2fd;
      transform: scale(1.02);
    }
    input[type='file'] {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
    &-content {
      pointer-events: none;
    }
    &-text {
      font-size: 16px;
      line-height: 22px;
      font-weight: 700;
      color: #3c3c3c;
      margin-bottom: 4px;
    }
    &-hint {
      font-size: 12px;
      line-height: 16px;
      color: #666;
      margin-bottom: 16px;
    }
  }

  .photo-preview {
    position: relative;
    display: flex;
    gap: 16px;
    text-align: center;
    padding: 16px 10px 16px 12px;
    border-radius: 4px;
    border: 1px solid #cbcbcb;
    background: #fafafa;
    transition: all 0.3s ease;
    &:hover {
      border-color: #007bff;
      background: #f0f8ff;
    }
    &-img {
      display: flex;
      width: 100px;
      height: 120px;
      padding: 0;
      align-items: center;
      border-radius: 8.333px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &-txt {
      flex: 1;
      text-align: left;
      position: relative;
      &-eyebrow {
        color: #3c3c3c;
        font-size: 14px;
        line-height: 20px;
        font-weight: 400;
        text-align: left;
      }
      &-desc {
        color: #666;
        font-size: 12px;
        line-height: 16px;
        font-weight: 400;
        padding-top: 4px;
        text-align: left;
      }
      &-button {
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }
    .remove-photo-btn {
      position: absolute;
      top: 16px;
      right: 10px;
      border: 0;
      background: transparent;
      padding: 0;
      cursor: pointer;
      width: 17px;
      height: 17px;
      line-height: 0;
      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
}
#jobRoleModal {
  .color-options {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 12px;
    .color-option {
      width: 36px;
      height: 36px;
      position: relative;
      border: 2px solid transparent;
      border-radius: 6px;
      input[type='radio'] {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0.5;
        z-index: -1;
      }
      &:has(input[type='radio']:checked) {
        border: 2px solid #000;
      }
      &:has(input[type='radio']:disabled) {
        &::after {
          content: '';
          position: absolute;
          top: calc(50% - 1px);
          right: calc(50% - 1px);
          width: 141.421356%;
          height: 2px;
          background: #fff;
          transform: rotate(-45deg) translate(15px, 15px);
        }
      }
      .color-chip {
        width: 32px;
        height: 32px;
        border-radius: 4px;
        border: 2px solid #000;
        background: #999;
        color: #000;
        &.disabled {
        }
      }
    }
  }
}
#changePasswordModal {
  // 오류 메시지 스타일
  .error-message {
    color: #cd2323;
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
    margin-top: 6px;
    min-height: 16px;
    display: none;

    &.show {
      display: block;
    }
  }
  // 비밀번호 입력 필드 스타일
}
#seatAssignmentInfo {
  .assignment-info {
    .employee-card {
      border-radius: 12px;
      border: 1.5px solid #cbcbcb;
      background: #ebebeb;
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .employee-left-area {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 36px;
        .employee-name {
          color: #000;
          font-size: 16px;
          line-height: 22px;
          font-weight: 700;
          padding-right: 12px;
        }
        .employee-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
          justify-content: flex-start;
          align-items: flex-start;
          padding-left: 12px;
          border-left: 1px solid #ccc;
          color: #000;
          font-size: 12px;
          line-height: 16px;
          font-weight: 400;
        }
      }
      .employee-right-area {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 36px;
        button {
          display: flex;
          gap: 4px;
          background: transparent !important;
          color: #000;
          font-size: 12px;
          line-height: 16px;
          font-weight: 400;
          padding: 0;
          margin: 0;
          span {
            display: block;
            font: inherit;
            color: inherit;
            line-height: inherit;
          }
          svg {
            width: 16px;
            height: 16px;
            display: block;
            path {
              stroke: #000;
            }
          }
        }
      }
    }
  }
}
.common-alert {
  position: fixed;
  bottom: 30px;
  left: calc(50% - 150px);
  z-index: 9999;
  max-width: 408px;
  min-width: 408px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease-out;
  border: 1px solid transparent;
  padding: 16px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  font-size: 16px;
  line-height: 22px;
  gap: 8px;
  @media (max-width: 768px) {
    left: 20px;
    right: 20px;
    bottom: 20px;
    max-width: calc(100% - 40px);
    min-width: calc(100% - 40px);
  }
  &.alert-info {
    border-color: #0f8309;
    background-color: #f5fff4;
  }
  &.alert-success {
    border-color: #0f8309;
    background-color: #f5fff4;
  }
  &.alert-danger {
    border-color: #cd2323;
    background-color: #fff4f4;
  }
  &.alert-warning {
    border-color: #bf7e11;
    background-color: #fff7ea;
  }
}

// 모달 애니메이션
@keyframes modalFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes modalSlideIn {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal.fade .modal-dialog {
  transition: transform 0.3s ease-out;
  transform: translateY(-50px);
}

.modal.show .modal-dialog {
  transform: none;
}

// 모달 크기 변형
.modal-sm {
  .modal-dialog {
    max-width: 300px;
  }
}

.modal-lg {
  .modal-dialog {
    max-width: 800px;
  }
}

.modal-xl {
  .modal-dialog {
    max-width: 1140px;
  }
}

// 모달 스크롤 처리
.modal-dialog-scrollable {
  height: calc(100% - 3.5rem);

  .modal-content {
    max-height: 100%;
    overflow: hidden;
  }

  .modal-body {
    overflow-y: auto;
  }
}

// 모달 백드롭 클릭 비활성화
.modal-static .modal-dialog {
  transform: scale(1.02);
}

// 접근성을 위한 포커스 관리
.modal {
  &:focus {
    outline: 0;
  }
}

// 모바일 최적화
@media (max-width: 576px) {
  .modal-dialog {
    margin: 0.5rem;
    max-width: calc(100% - 1rem);
  }

  .modal-content {
    padding: 16px;
  }

  .modal-header {
    .modal-title {
      font-size: 18px;
      line-height: 24px;
    }
  }
}
</style>
