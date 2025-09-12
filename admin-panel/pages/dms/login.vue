<template>
  <div class="login-container">
    <div class="cix-logo" v-html="cixLogoSvg"></div>
    <h1 class="login-form-title">Delivery Management System</h1>
    <div class="login-form">
      <div class="login-form-content">
        <form class="login-form-content-left" @submit.prevent="handleSubmit">
          <Input
            v-model="email"
            label="Concentrix Email Address"
            type="email"
            placeholder="Email Address"
            :error="errors.email"
            @blur="validateEmail"
          />
          <Input
            v-model="password"
            label="System Password"
            type="password"
            placeholder="Password"
            :error="errors.password"
            @blur="validatePassword"
          />
          <Button
            type="submit"
            :size="36"
            variant="primary"
            class="mt-5"
            fullWidth
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Logging in...' : 'Log in' }}
          </Button>
          <div v-if="errors.general" class="error-message general-error">
            {{ errors.general }}
          </div>
        </form>
        <div class="login-form-content-right">
          <img
            src="~/public/assets/dms/ux1team.svg"
            alt="Concentrix CiX UX/UI 1 Team"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import cixLogoSvg from '~/components/assets/dms/icons/cix-logo.svg?raw'
import Input from '~/components/ui/Input.vue'
import Button from '~/components/ui/Button.vue'

definePageMeta({
  layout: 'dms-login',
})

// 메타 태그
useHead({
  title: 'CiX Delivery Management System',
  meta: [{ name: 'description', content: 'CiX Delivery Management System' }],
})

// 폼 데이터
const email = ref('')
const password = ref('')
const isSubmitting = ref(false)

// 에러 상태
const errors = ref({
  email: '',
  password: '',
  general: '',
})

// 이메일 validation
const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value.trim()) {
    errors.value.email = 'Email 주소를 입력해주세요.'
    return false
  }
  if (
    !emailRegex.test(email.value) ||
    !email.value.endsWith('@concentrix.com')
  ) {
    errors.value.email =
      '올바른 Email 주소를 입력해주세요. (예:user@concentrix.com)'
    return false
  }
  errors.value.email = ''
  return true
}

// 비밀번호 validation
const validatePassword = () => {
  if (!password.value.trim()) {
    errors.value.password = 'Password를 입력해주세요.'
    return false
  }
  errors.value.password = ''
  return true
}

// 전체 폼 validation
const validateForm = () => {
  const isEmailValid = validateEmail()
  const isPasswordValid = validatePassword()
  return isEmailValid && isPasswordValid
}

// 폼 제출 처리
const handleSubmit = async () => {
  // 에러 초기화
  errors.value.general = ''

  // validation 체크
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    // DMS 로그인 API 호출
    const response = await $fetch('/api/dms/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value,
      }
    })

    if (response.success) {
      // 로그인 성공 시 DMS 메인 페이지로 리다이렉트
      await navigateTo('/dms')
    } else {
      errors.value.general = response.message || 'Email 주소나 Password가 맞지 않습니다.'
    }
  } catch (error: any) {
    console.error('DMS 로그인 오류:', error)
    
    // API 에러 메시지 표시
    if (error.data?.statusMessage) {
      errors.value.general = error.data.statusMessage
    } else {
      errors.value.general = 'Email 주소나 Password가 맞지 않습니다.'
    }
  } finally {
    isSubmitting.value = false
  }
}
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
  margin: auto;
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
      font-size: 32px;
      font-weight: 700;
      line-height: 44px;
      padding: 0 0 40px 0;
    }
    &-content {
      display: flex;
      &-left {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: 24px 24px 54px;
        .form-group {
          .form-label {
            font-weight: 700 !important;
          }
        }
      }
      &-right {
        width: 159px + 24px + 24px;
        padding: 0 24px;
      }
    }
  }
}

// 에러 메시지 스타일
.error-message {
  color: #cd2323;
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  min-height: 16px;
  margin-top: 6px;

  &.general-error {
    text-align: left;
  }
}
</style>
