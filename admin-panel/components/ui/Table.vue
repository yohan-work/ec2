<template>
  <div class="table-wrapper">
    <table :class="tableClasses">
      <slot />
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  headers?: Array<{
    label: string
    rowspan?: number
    colspan?: number
    subHeaders?: Array<{
      label: string
      colspan?: number
    }>
  }>
  data?: Array<Record<string, any>>
}

const tableClasses = computed(() => {
  const baseClasses = 'table'
  return [baseClasses].filter(Boolean).join(' ')
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

  :deep(thead) {
    position: sticky;
    top: 0;
    width: 100%;
    background: #fff;
    z-index: 1;
    // tbody 상단 여백 추가
    border-bottom: 20px solid #fff;
    th {
      position: relative;
      color: #000;
      background: #fff;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
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
        background: rgba(0, 0, 0, 0.3);
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
  }

  :deep(tbody) {
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
