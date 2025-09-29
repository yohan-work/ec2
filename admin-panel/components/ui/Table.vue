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
  variant?: 'default' | 'simple'
}

const props = withDefaults(defineProps<Props>(), {
  autoWidth: false,
  variant: 'default',
})

const tableClasses = computed(() => {
  return `table table--${props.variant}`
})
</script>

<style lang="scss" scoped>
.table-wrapper {
  width: calc(100% + 16px);
  height: calc(100%);
  overflow-y: auto;
  overflow-x: auto;
  background: #fafafa;

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

  // .main-container & {
  //   overflow-y: scroll;
  //   width: calc(100% + 31px);
  //   &:focus-visible {
  //     width: calc(100% + 16px);
  //   }
  // }

  &.auto-width {
    width: auto;
    table {
      width: auto;
    }
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

    tr {
      /* 월별 스타일 */
      th:has(.month-cell) {
        background: #e1e7fe;
      }
      .month-cell {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        &-title {
          width: 132px - 8px;
          font-size: 32px;
          line-height: 44px;
        }
        &-box {
          display: flex;
          width: 88px;
          flex-direction: column;
          border-radius: 8px;
          border: 1px solid #fafafa;
          background: #c1cdfd;
          padding: 7px;
          strong {
            display: block;
            width: 100%;
            color: #000;
            font-size: 20px;
            font-weight: 700;
            line-height: 28px;
          }
          span {
            display: block;
            width: 100%;
            color: #3c3c3c;
            font-size: 12px;
            font-weight: 400;
            line-height: 16px;
          }
        }
      }
    }

    th,
    td {
      position: relative;
      color: #000;
      // background: #f3f4f8;
      background: #ffffff;
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
      background: #fafafa;
      &:hover {
        background: #f3f4f8;
      }
      &:nth-child(odd) {
        background: #fafafa;
      }
      &:nth-child(even) {
        background: #fafafa;
      }
      &:hover {
        &:nth-child(odd) {
          background: #f3f4f8;
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

// Simple 스타일

.table-wrapper:has(.table--simple) {
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  margin: 20px 32px;
  width: calc(100% + 16px - 32px - 32px);
  .table--simple {
    :deep(thead) {
      background: #ffffff;

      th {
        background: #ffffff;
        font-weight: 600;
        color: #374151;

        &:after {
          border-bottom: 1px solid rgba(0, 0, 0, 0.3);
        }
      }
    }

    :deep(tbody) {
      tr {
        background: #ffffff;
        transition: background-color 0.15s ease;

        &:hover {
          background: #f9fafb;
        }
      }

      td {
        background: inherit;
        color: #374151;
        padding: 10px 16px;

        &:after {
          border-bottom: 1px solid #ddd;
        }
      }
    }
  }
}
</style>
