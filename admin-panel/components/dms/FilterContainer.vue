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
  gap: 16px 8px;
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
    gap: 8px;
    flex-wrap: wrap;

    .date-input {
      width: 160px;
    }

    .quick-date-buttons {
      display: flex;
      gap: 8px;

      button {
        font-weight: 400;
        &.active {
          background-color: #f3f4f8;
          border-color: #7e96f8;
          color: #375ef9;
        }
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
