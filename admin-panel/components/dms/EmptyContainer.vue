<template>
  <div class="empty-container">
    <div class="empty-content">
      <div class="empty-icon">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
            fill="#9CA3AF"
          />
        </svg>
      </div>
      <p class="empty-message">{{ message }}</p>
      <p v-if="subMessage" class="empty-sub-message">{{ subMessage }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: '데이터가 없습니다.',
  },
  subMessage: {
    type: String,
    default: '',
  },
})
</script>

<style lang="scss" scoped>
.empty-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  padding: 40px 20px;

  .empty-content {
    text-align: center;

    .empty-icon {
      margin-bottom: 16px;
      opacity: 0.6;
      text-align: center;
      svg {
        margin: 0 auto;
      }
    }

    .empty-message {
      font-size: 16px;
      color: #6b7280;
      margin: 0 0 8px 0;
      font-weight: 500;
    }

    .empty-sub-message {
      font-size: 14px;
      color: #9ca3af;
      margin: 0;
    }
  }
}
</style>
