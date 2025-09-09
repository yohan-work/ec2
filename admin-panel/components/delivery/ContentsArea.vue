<template>
  <div class="contents-area scroll-container">
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
.scroll-container {
  overflow-x: hidden;
  overflow-y: auto;
  width: calc(100% + 10px);
  margin-right: -10px;
  padding-right: 10px;
  padding-bottom: 36px;

  /* Firefox 전용 */
  scrollbar-width: thin;
  scrollbar-color: rgb(#c0c0c0, 0.5) transparent;
  transition: scrollbar-color 0.3s;

  /* Chrome, Edge, Safari 전용 */
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent; /* 평소엔 투명 */
    border-radius: 4px;
    transition: background-color 0.3s; /* hover 시 부드럽게 */
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: #c0c0c0; /* hover 시 표시 */
  }

  &:hover {
    scrollbar-color: #c0c0c0 transparent;
  }
}
</style>
