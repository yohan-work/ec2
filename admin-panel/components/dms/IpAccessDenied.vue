<template>
  <div class="ip-access-denied">
    <div class="denied-container">
      <h1>접근이 제한되었습니다</h1>
      <p>보안 정책 준수를 위해, <br>현재 접속하신 네트워크에서는 사내 시스템 이용이 불가능합니다.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  clientIp: string
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
/* 디자인 변경 필요 */
.ip-access-denied {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f8f9fa;
  font-family: 'Pretendard', sans-serif;

  .denied-container {
    text-align: center;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    width: 100%;

    h1 {
      color: #dc3545;
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    p {
      color: #6c757d;
      font-size: 1.1rem;
      line-height: 1.6;
      margin-bottom: 0.5rem;
    }

    .ip-info {
      margin-top: 2rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #dc3545;

      p {
        color: #495057;
        font-size: 0.9rem;
        margin: 0;
        font-family: 'Courier New', monospace;
      }
    }
  }
}
</style>
