<template>
  <div class="main-container">
    <slot />
  </div>
</template>

<script setup></script>

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
}
</style>
