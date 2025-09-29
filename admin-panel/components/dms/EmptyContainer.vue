<template>
  <div class="empty-container">
    <div class="empty-content">
      <p class="empty-message">
        <div v-html="emptySvg"></div>
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script setup>
import emptySvg from '~/components/assets/dms/icons/alert-warning.svg?raw'

defineProps({
  message: {
    type: String,
    default: '데이터가 없습니다.',
  },
})
</script>

<style lang="scss" scoped>
.empty-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  padding: 40px 0;
  height: 100%;

  .empty-content {
    display: flex;
    padding: 16px 24px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    border-radius: 8px;
    border: 1px solid #bf7e11;
    background: #fff7ea;

    .empty-message {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      min-width: 360px;
      color: #000;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px;
      @media (max-width: 450px) {
        min-width: 100%;
        width: 100%;
      }
      > div {
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
}
</style>
