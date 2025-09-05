<template>
  <div class="contents-area scroll-area">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.contents-area {
  position: relative;
  width: 100%;
  flex: 1;
}
.scroll-area {
  overflow-x: hidden;
  overflow-y: auto;
  width: calc(100% + 20px);
  margin-right: -20px;
  padding-right: 20px;
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 999px;
    background: #c0c0c0;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
}
</style>
