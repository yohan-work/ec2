<template>
  <div class="filter-container">
    <slot />
  </div>
</template>

<script setup>
// FilterContainer 컴포넌트 - 검색 필터들을 감싸는 컨테이너
</script>

<style lang="scss" scoped>
.filter-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px 12px;
  padding: 24px 32px 0;
  width: calc(100% + 15px);
  flex-wrap: wrap;

  @media (max-width: 768px) {
    align-items: stretch;
    padding: 24px 20px 0;
  }

  :deep(.filter-group) {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;

    .date-input {
      width: 160px;
    }

    .quick-date-buttons {
      display: flex;
      gap: 8px;

      .active {
        background-color: #e3f2fd;
        border-color: #2196f3;
        color: #1976d2;
      }
    }

    .action-select {
      width: 120px;
    }

    .admin-input {
      width: 140px;
    }
  }

  :deep(.filter-info) {
    display: flex;
    gap: 16px;
    align-items: center;
    width: 100%;
    font-size: 14px;
    color: #6b7280;
  }
}
</style>
