<template>
  <div class="login-container">
    <div class="cix-logo" v-html="cixLogoSvg"></div>
    <h1 class="login-form-title">Delivery Management System</h1>
    <div class="login-form">
      <div class="login-form-content">
        <form class="login-form-content-left">
          <Input
            v-model="email"
            label="Concentrix Email Address"
            type="text"
            placeholder="Email Address"
            error="Please enter your email address"
          />
          <Input
            v-model="password"
            label="System Password"
            type="password"
            placeholder="Password"
          />
          <Button
            type="submit"
            size="md"
            variant="primary"
            class="mt-5"
            fullWidth
          >
            Log in
          </Button>
        </form>
        <div class="login-form-content-right">
          <img
            src="~/public/assets/delivery/ux1team.svg"
            alt="Concentrix CiX UX/UI 1 Team"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import cixLogoSvg from '~/components/assets/delivery/icons/cix-logo.svg?raw'
import Input from '~/components/ui/Input.vue'
import Button from '~/components/ui/Button.vue'

definePageMeta({
  layout: 'delivery-login',
})

// 메타 태그
useHead({
  title: 'CiX Delivery Management System',
  meta: [{ name: 'description', content: 'CiX Delivery Management System' }],
})

// 폼 데이터
const email = ref('')
const password = ref('')
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 846px;
  margin: 0 auto;
  background-color: #fff;
  gap: 40px;
  .cix-logo {
    width: 198px;
    &:deep(svg) {
      width: 100%;
      height: 100%;
    }
  }
  .login-form {
    width: 100%;
    &-title {
      color: #000;
      text-align: center;
      font-family: Pretendard;
      font-size: 48px;
      font-weight: 700;
      line-height: 60px; /* 125% */
    }
    &-content {
      width: 639px;
      margin: 0 auto;
      display: flex;
      gap: 38px;
      &-left {
        flex: 1;
        .form-group {
          .form-label {
            font-weight: 700 !important;
          }
        }
      }
      &-right {
        width: 160px;
      }
    }
  }
}
</style>
