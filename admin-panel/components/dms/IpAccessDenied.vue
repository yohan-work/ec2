<template>
  <div class="dms-layout">
    <div class="page-container">
      <div class="ip-access-denied">
        <div class="cix-logo" v-html="cixLogoSvg"></div>
        <h1 class="ip-access-denied-title">Delivery Management System</h1>
        <div class="ip-access-denied-warning">
          <div
            class="ip-access-denied-warning-icon"
            v-html="alertErrorSvg"
          ></div>
          접근이 제한되었습니다.
        </div>
        <div class="ip-access-denied-message">
          보안 정책 준수를 위해, <br />
          현재 접속하신 네트워크에서는 <br />
          사내 시스템 이용이 불가능합니다.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import cixLogoSvg from '~/components/assets/dms/icons/cix-logo.svg?raw'
import alertErrorSvg from '~/components/assets/dms/icons/alert-error.svg?raw'

interface Props {
  clientIp: string
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.dms-layout {
  /* prettier-ignore */
  line-height: 1.5;
  color: #212529;
  background: #f2f2f2;
  min-width: 1024px;
  &:has(.toolbar.show) {
    .page-container {
      // padding: 24px 366px 0 40px;
      padding: 24px 40px 0 40px;
    }
  }
  @media (max-width: 1023px) {
    min-width: 100%;
    &:has(.toolbar.show) {
      .page-container {
        padding: 24px 20px 0 20px;
      }
    }
  }
}
.page-container {
  position: relative;
  width: 100%;
  // height: calc(100dvh - 60px); // 75px is gnb height
  height: 100dvh;
  display: flex;
  flex-direction: column;
  overflow: visible;
  padding: 24px 40px;
  transition: padding 0.3s ease;
  @media (max-width: 1023px) {
    padding: 24px 20px;
  }
}
.ip-access-denied {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 697px;
  margin: 0 auto;
  background-color: #fff;
  padding: 32px 24px;
  border-radius: 16px;
  margin: auto;
  @media (max-width: 1023px) {
    padding: 32px 20px;
  }
  .cix-logo {
    width: 108px;
    padding: 0 0 24px 0;
    @media (max-width: 1023px) {
      width: 80px;
    }
    &:deep(svg) {
      width: 100%;
      height: 100%;
    }
  }
  &-title {
    color: #000;
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    line-height: 44px;
    padding: 0 0 40px 0;
    @media (max-width: 1023px) {
      font-size: 24px;
      line-height: 32px;
    }
  }
  &-warning {
    width: 410px;
    display: flex;
    padding: 16px 24px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 8px;
    border: 1px solid #cd2323;
    background: #fff4f4;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2);
    @media (max-width: 1023px) {
      width: 100%;
    }
  }
  &-message {
    width: 100%;
    padding: 40px 0 0 0;
    color: #000;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  }
}
</style>
