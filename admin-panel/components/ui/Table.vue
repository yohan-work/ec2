<template>
  <div
    class="table-wrapper"
    :class="{
      line: props.line,
      'auto-width': props.autoWidth,
      simple: props.simple,
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
  line?: boolean
  autoWidth?: boolean
  simple?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  line: false,
  autoWidth: false,
  simple: false,
})

const tableClasses = computed(() => {
  return 'table'
})
</script>

<style lang="scss" scoped>
.table-wrapper {
  width: calc(100% + 10px);
  height: calc(100%);
  overflow-y: auto;
  overflow-x: auto;
  margin-right: -10px;
  padding-right: 10px;

  &.auto-width {
    width: auto;
    table {
      width: auto;
    }
  }

  &.simple {
    overflow: visible;
    margin-right: 0;
    padding-right: 0;
    border-radius: 8px;
    border: 1px solid #b3b3b3;
    overflow: hidden;
    table {
      border: 0;
      border-collapse: collapse;
    }
    :deep(thead) {
      border-bottom: 0;
      th {
        border-bottom: 1px solid #b3b3b3;
        border-right: 1px solid #b3b3b3;
        &:last-child {
          border-right: 0;
        }
      }
      th:after {
        display: none;
      }
    }
    :deep(tbody) {
      border-bottom: 0;
      td {
        position: relative;
        text-align: center;
        white-space: nowrap;
        padding: 16px;
      }
      th,
      td {
        border-right: 1px solid #b3b3b3;
        &:last-child {
          border-right: 0;
        }
      }
    }
  }
  // 스크롤바 디자인
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #c0c0c0;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: #fff;
  }

  table {
    position: relative;
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border: 0;
  }

  // line prop이 true일 때 적용되는 스타일
  &.line :deep(thead) {
    th,
    td {
      position: relative;
      vertical-align: middle;
      text-align: center;
      &:after {
        display: none;
      }
      &:before {
        display: block;
        content: '';
        position: absolute;
        bottom: -1px;
        right: -1px;
        width: calc(100% + 1px);
        height: calc(100% + 1px);
        border: 1px solid #b3b3b3;
        z-index: 0;
      }
    }
  }

  :deep(thead) {
    position: sticky;
    top: 0;
    width: 100%;
    background: #fff;
    z-index: 3;
    // tbody 상단 여백 추가
    border-bottom: 20px solid #fff;

    th,
    td {
      position: relative;
      color: #000;
      background: #fff;
      font-size: 16px;
      font-style: normal;
      line-height: 22px; /* 137.5% */
      padding: 16px;
      text-align: center;
      white-space: nowrap;
      vertical-align: bottom;
      // sticky 되었을때에도 라인을 유지하기 위해 border를 사용하지 않음
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background: #b3b3b3;
        z-index: 0;
      }
      &:first-child:after {
        right: 0;
        left: auto;
        width: 100%;
      }
      &:last-child:after {
        width: 100%;
      }
    }
    th {
      font-weight: 700;
    }
  }

  :deep(tbody) {
    z-index: 1;
    // tbody 하단 여백 추가
    border-bottom: 20px solid #fff;
    tr {
      transition: background 0.3s ease;
      &:hover {
        background: rgba(0, 0, 0, 0.05);
      }
    }
    td {
      padding: 18px 16px;
      color: #000;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px;
    }
  }
}
</style>
