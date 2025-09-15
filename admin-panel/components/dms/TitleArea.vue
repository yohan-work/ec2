<template>
  <div class="title-area" v-if="props.title">
    <div class="title-area-left">
      <h1>{{ props.title || '' }}</h1>
      <slot name="left"></slot>
    </div>
    <template v-if="$slots.center">
      <div class="title-area-center">
        <slot name="center"></slot>
      </div>
    </template>
    <template v-if="$slots.right">
      <div class="title-area-right">
        <slot name="right"></slot>
      </div>
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
    default: '',
  },
})
</script>

<style lang="scss" scoped>
.title-area {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  min-height: 40px;

  .title-area-left {
    display: flex;
    align-items: center;
    gap: 16px;

    h1 {
      color: #333;
      font-size: 24px;
      font-weight: 600;
      margin: 0;
    }
  }

  .title-area-right {
    display: flex;
    align-items: center;
  }

  &:deep(.center-content) {
    display: flex;
    align-items: center;
    font-weight: 500;
    color: #374151;
  }

  &:deep(.right-content) {
    display: flex;
    align-items: center;
    gap: 12px;
  }
}
</style>
