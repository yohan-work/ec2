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
            :size="36"
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
  max-width: 697px;
  margin: 0 auto;
  background-color: #fff;
  padding: 32px 24px;
  border-radius: 16px;
  .cix-logo {
    width: 108px;
    padding: 0 0 24px 0;
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
      font-size: 32px;
      font-weight: 700;
      line-height: 44px;
      padding: 0 0 40px 0;
    }
    &-content {
      display: flex;
      &-left {
        flex: 1;
        padding: 24px;
        .form-group {
          .form-label {
            font-weight: 700 !important;
          }
        }
      }
      &-right {
        width: (159px + 24px + 24px);
        padding: 0 24px;
      }
    }
  }
}
</style>
