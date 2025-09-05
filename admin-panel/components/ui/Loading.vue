<template>
  <div v-if="show" id="globalLoadingOverlay" class="global-loading-overlay">
    <div class="global-loading-spinner"></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  show?: boolean
}

withDefaults(defineProps<Props>(), {
  show: false,
})
</script>

<style lang="scss" scoped>
.global-loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.7);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.global-loading-spinner {
  width: 56px;
  height: 56px;
  border: 7px solid #eee;
  border-top: 7px solid #3778f9;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
