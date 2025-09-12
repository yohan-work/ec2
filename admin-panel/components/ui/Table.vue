<template>
  <div
    class="table-wrapper"
    :class="{
      'auto-width': props.autoWidth,
    }"
  >
    <table :class="tableClasses">
      <slot />
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  autoWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  autoWidth: false,
})

const tableClasses = computed(() => {
  return 'table'
})
</script>

<style lang="scss" scoped>
.table-wrapper {
  width: calc(100% + 15px);
  height: calc(100%);
  overflow-y: auto;
  overflow-x: auto;

  &.auto-width {
    width: auto;
    table {
      width: auto;
    }
  }

  /* 스크롤바 디자인 */
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #7a7a7a;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  table {
    position: relative;
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border: 0;
  }

  :deep(thead) {
    position: sticky;
    top: 0;
    width: 100%;
    background: #f3f4f8;
    z-index: 3;

    th,
    td {
      position: relative;
      color: #000;
      background: #f3f4f8;
      font-size: 16px;
      font-style: normal;
      line-height: 22px;
      padding: 8px 16px;
      font-weight: 700;
      text-align: left;
      white-space: nowrap;
      /* sticky 되었을때에도 라인을 유지하기 위해 border를 사용하지 않음 */
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: transparent;
        border-bottom: 1px solid #ddd;
        z-index: 0;
      }
      &.border-right {
        &:after {
          border-right: 1px solid #ddd;
        }
      }
      &.border-sticky-right {
        &:after {
          border-right: 1px solid #cbcbcb;
        }
      }
      &.center {
        text-align: center;
      }
    }
  }

  :deep(tbody) {
    z-index: 1;
    tr {
      transition: background 0.3s ease;
      &:nth-child(odd) {
        background: #fff;
      }
      &:nth-child(even) {
        background: #f3f4f8;
      }
      &:hover {
        background: rgba(0, 0, 0, 0.05);
        &:nth-child(odd) {
          background: #fff;
        }
        &:nth-child(even) {
          background: #f3f4f8;
        }
      }
    }
    td {
      position: relative;
      padding: 8px 16px;
      color: #000;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px;
      text-align: left;
      background: inherit;
      /* sticky 되었을때에도 라인을 유지하기 위해 border를 사용하지 않음 */
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: transparent;
        border-bottom: 1px solid #ddd;
        z-index: 0;
      }
      &.border-right {
        &:after {
          border-right: 1px solid #ddd;
        }
      }
      &.border-sticky-right {
        &:after {
          border-right: 1px solid #cbcbcb;
        }
      }
      &.center {
        text-align: center;
      }
    }
  }
}
</style>
