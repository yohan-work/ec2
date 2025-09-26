<template>
  <div class="main-container" :class="{ 'main-container--round': round }">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  round: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss" scoped>
.main-container {
  position: relative;
  width: 100%;
  height: 100%;
  bottom: 0;
  overflow: hidden;
  // border-radius: 20px 20px 0px 0px;
  border: 1px solid #ddd;
  background: #fff;
  padding: 0 15px 0 0;
  display: flex;
  flex-direction: column;
  gap: 0;

  &--round {
    border-radius: 20px 20px 0px 0px;
    border-color: rgba(0, 0, 0, 0.1);
  }
}
</style>
