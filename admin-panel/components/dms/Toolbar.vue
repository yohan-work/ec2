<template>
  <div class="toolbar" :class="{ show: props.isMobileMenuOpen }">
    <div class="toolbar-top">
      <!-- GNB 메뉴들 (모바일에서만 표시) -->
      <div class="toolbar-section mobile-only">
        <div class="toolbar-menu-grid">
          <NuxtLink
            to="/dms/project-revenue/"
            class="btn"
            :class="{ active: isActiveRoute('/dms/project-revenue/') }"
            data-style="toolbar-menu"
            @click="handleMenuClick"
          >
            <span>Project Revenue</span>
          </NuxtLink>
          <NuxtLink
            to="/dms/project-mm/"
            class="btn"
            :class="{ active: isActiveRoute('/dms/project-mm/') }"
            data-style="toolbar-menu"
            @click="handleMenuClick"
          >
            <span>Project MM</span>
          </NuxtLink>
          <NuxtLink
            to="/dms/sso/"
            class="btn"
            :class="{ active: isActiveRoute('/dms/sso/') }"
            data-style="toolbar-menu"
            @click="handleMenuClick"
          >
            <span>SSO</span>
          </NuxtLink>
          <NuxtLink
            to="/dms/staff-utility/"
            class="btn"
            :class="{ active: isActiveRoute('/dms/staff-utility/') }"
            data-style="toolbar-menu"
            @click="handleMenuClick"
          >
            <span>Staff (Utility)</span>
          </NuxtLink>
          <NuxtLink
            to="/dms/project-list/"
            class="btn"
            :class="{ active: isActiveRoute('/dms/project-list/') }"
            data-style="toolbar-menu"
            @click="handleMenuClick"
          >
            <span>Project List</span>
          </NuxtLink>
        </div>
      </div>

      <div class="toolbar-section">
        <div class="toolbar-menu-grid">
          <NuxtLink
            to="/dms/manage-employees"
            class="btn"
            :class="{ active: isActiveRoute('/dms/manage-employees') }"
            data-style="toolbar-menu"
            @click="handleMenuClick"
          >
            <div v-html="employeeSvg"></div>
            <span>직원 관리</span>
          </NuxtLink>
          <NuxtLink
            to="/dms/manage-clients"
            class="btn"
            :class="{ active: isActiveRoute('/dms/manage-clients') }"
            data-style="toolbar-menu"
            @click="handleMenuClick"
          >
            <div v-html="clientSvg"></div>
            <span>고객사 관리</span>
          </NuxtLink>
          <NuxtLink
            to="/dms/manage-organizations"
            class="btn"
            :class="{ active: isActiveRoute('/dms/manage-organizations') }"
            data-style="toolbar-menu"
            @click="handleMenuClick"
          >
            <div v-html="organizationSvg"></div>
            <span>조직 관리</span>
          </NuxtLink>
        </div>
      </div>
      <div class="toolbar-section">
        <div class="toolbar-menu-grid">
          <NuxtLink
            to="/dms/manage-users"
            class="btn"
            :class="{ active: isActiveRoute('/dms/manage-users') }"
            data-style="toolbar-menu"
            @click="handleMenuClick"
          >
            <div v-html="userSvg"></div>
            <span>사용자 관리</span>
          </NuxtLink>
          <NuxtLink
            to="/dms/manage-permissions"
            class="btn"
            :class="{ active: isActiveRoute('/dms/manage-permissions') }"
            data-style="toolbar-menu"
            @click="handleMenuClick"
          >
            <div v-html="permissionSvg"></div>
            <span>권한 관리</span>
          </NuxtLink>
          <!-- <NuxtLink
            to="/dms/manage-positions"
            class="btn"
            data-style="toolbar-menu"
          >
            <div v-html="positionSvg"></div>
            <span>직급 관리</span>
          </NuxtLink> -->
          <NuxtLink
            to="/dms/manage-history"
            class="btn"
            :class="{ active: isActiveRoute('/dms/manage-history') }"
            data-style="toolbar-menu"
            @click="handleMenuClick"
          >
            <div v-html="historySvg"></div>
            <span>변경 히스토리</span>
          </NuxtLink>
          <NuxtLink
            to="/dms/manage-access-control"
            class="btn"
            :class="{ active: isActiveRoute('/dms/manage-access-control') }"
            data-style="toolbar-menu"
            @click="handleMenuClick"
          >
            <div v-html="accessControlSvg"></div>
            <span>접근 제어</span>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="toolbar-bottom">
      <button
        class="btn"
        data-style="toolbar-menu"
        @click="handlePasswordChange"
      >
        <div v-html="changePasswordSvg"></div>
        <span>Change Password</span>
      </button>
      <button class="btn" data-style="toolbar-menu" @click="handleLogout">
        <div v-html="logoutSvg"></div>
        <span>Logout</span>
      </button>
    </div>

    <!-- 로그아웃 확인 모달 -->
    <ConfirmModal
      :show="showLogoutModal"
      @close="closeLogoutModal"
      @confirm="confirmLogout"
      title="로그아웃"
      message="로그아웃 하시겠습니까?"
      confirm-text="로그아웃"
      :loading="logoutLoading"
      loading-text="로그아웃 중..."
      modal-class="logout-modal"
    />
  </div>

  <!-- 비밀번호 변경 모달 -->
  <Modal
    :show="showPasswordModal"
    title="비밀번호 변경"
    width="442px"
    @close="closePasswordModal"
  >
    <div class="change-password-form">
      <div class="password-hint">
        -비밀번호는 8자 이상으로 설정해주세요.<br />
        -영문 대소문자, 숫자, 특수문자를 조합하면 더 안전합니다.<br />
        -현재 비밀번호와 다른 신규 비밀번호를 사용해주세요.<br />
      </div>
      <div class="form-group">
        <label for="currentPassword" class="form-label">현재 비밀번호</label>
        <Input
          id="currentPassword"
          v-model="passwordForm.currentPassword"
          type="password"
          placeholder="현재 비밀번호를 입력하세요"
          :error="passwordErrors.currentPassword"
          @input="clearPasswordError('currentPassword')"
        />
      </div>

      <div class="form-group">
        <label for="newPassword" class="form-label">신규 비밀번호</label>
        <Input
          id="newPassword"
          v-model="passwordForm.newPassword"
          type="password"
          placeholder="신규 비밀번호를 입력하세요"
          :error="passwordErrors.newPassword"
          @input="validateField('newPassword')"
        />
      </div>

      <div class="form-group">
        <label for="confirmPassword" class="form-label"
          >신규 비밀번호 확인</label
        >
        <Input
          id="confirmPassword"
          v-model="passwordForm.confirmPassword"
          type="password"
          placeholder="신규 비밀번호를 한번 더 입력하세요"
          :error="passwordErrors.confirmPassword"
          @input="validateField('confirmPassword')"
        />
      </div>
    </div>

    <template #footer>
      <div class="modal-actions">
        <Button
          variant="outline-dark"
          :size="36"
          :padding="40"
          :disabled="passwordLoading"
          @click="closePasswordModal"
        >
          취소
        </Button>
        <Button
          variant="primary"
          :size="36"
          :padding="40"
          :disabled="!isPasswordFormValid"
          :loading="passwordLoading"
          @click="handlePasswordSubmit"
        >
          {{ passwordLoading ? '변경 중...' : '비밀번호 변경' }}
        </Button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import changePasswordSvg from '~/components/assets/dms/icons/change-password.svg?raw'
import logoutSvg from '~/components/assets/dms/icons/logout.svg?raw'
import employeeSvg from '~/components/assets/dms/icons/employee.svg?raw'
import clientSvg from '~/components/assets/dms/icons/client.svg?raw'
import organizationSvg from '~/components/assets/dms/icons/organization.svg?raw'
import userSvg from '~/components/assets/dms/icons/user.svg?raw'
import permissionSvg from '~/components/assets/dms/icons/permission.svg?raw'
import positionSvg from '~/components/assets/dms/icons/position.svg?raw'
import historySvg from '~/components/assets/dms/icons/history.svg?raw'
import accessControlSvg from '~/components/assets/dms/icons/access-control.svg?raw'
import ConfirmModal from '~/components/ui/ConfirmModal.vue'
import Modal from '~/components/ui/Modal.vue'
import Input from '~/components/ui/Input.vue'
import Button from '~/components/ui/Button.vue'

// Props 정의
interface Props {
  isMobileMenuOpen: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  closeMenu: []
}>()

const route = useRoute()

// 모달 상태 관리
const showLogoutModal = ref(false)
const logoutLoading = ref(false)
const showPasswordModal = ref(false)
const passwordLoading = ref(false)

// 비밀번호 변경 폼 데이터
const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

// 비밀번호 변경 에러 메시지
const passwordErrors = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

// 현재 라우트와 일치하는지 확인하는 함수
const isActiveRoute = (path: string) => {
  return route.path === path
}

// 메뉴 클릭 시 툴바 닫기 (모바일에서만)
const handleMenuClick = () => {
  // 브라우저 너비가 1023px 이하일 때만 툴바 닫기
  if (window.innerWidth <= 1023) {
    emit('closeMenu')
  }
}

// 비밀번호 변경 폼 유효성 검사
const isPasswordFormValid = computed(() => {
  return (
    passwordForm.currentPassword.trim() !== '' &&
    passwordForm.newPassword.trim() !== '' &&
    passwordForm.confirmPassword.trim() !== '' &&
    Object.values(passwordErrors).every(error => error === '')
  )
})

// 비밀번호 에러 메시지 초기화
const clearPasswordError = (field: keyof typeof passwordErrors) => {
  passwordErrors[field] = ''
}

// 실시간 유효성 검사
const validateField = (field: keyof typeof passwordErrors) => {
  clearPasswordError(field)

  if (field === 'newPassword' && passwordForm.newPassword.trim() !== '') {
    const passwordError = validatePassword(passwordForm.newPassword)
    if (passwordError) {
      passwordErrors.newPassword = passwordError
    }
  }

  if (
    field === 'confirmPassword' &&
    passwordForm.confirmPassword.trim() !== ''
  ) {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      passwordErrors.confirmPassword = '비밀번호가 일치하지 않습니다.'
    }
  }
}

// 비밀번호 변경 폼 초기화
const resetPasswordForm = () => {
  passwordForm.currentPassword = ''
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''
  clearPasswordError('currentPassword')
  clearPasswordError('newPassword')
  clearPasswordError('confirmPassword')
}

// 비밀번호 변경 버튼 클릭
const handlePasswordChange = () => {
  showPasswordModal.value = true
  resetPasswordForm()
}

// 비밀번호 변경 모달 닫기
const closePasswordModal = () => {
  showPasswordModal.value = false
  resetPasswordForm()
}

// 비밀번호 유효성 검사
const validatePassword = (password: string) => {
  if (password.length < 8) {
    return '비밀번호는 8자 이상이어야 합니다.'
  }

  return ''
}

// 비밀번호 변경 폼 유효성 검사
const validatePasswordForm = () => {
  let isValid = true

  // 모든 에러 초기화
  clearPasswordError('currentPassword')
  clearPasswordError('newPassword')
  clearPasswordError('confirmPassword')

  // 현재 비밀번호 검사
  if (passwordForm.currentPassword.trim() === '') {
    passwordErrors.currentPassword = '현재 비밀번호를 입력하세요.'
    isValid = false
  }

  // 새 비밀번호 검사
  if (passwordForm.newPassword.trim() === '') {
    passwordErrors.newPassword = '새 비밀번호를 입력하세요.'
    isValid = false
  } else {
    const passwordError = validatePassword(passwordForm.newPassword)
    if (passwordError) {
      passwordErrors.newPassword = passwordError
      isValid = false
    }
  }

  // 비밀번호 확인 검사
  if (passwordForm.confirmPassword.trim() === '') {
    passwordErrors.confirmPassword = '비밀번호 확인을 입력하세요.'
    isValid = false
  } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    passwordErrors.confirmPassword = '비밀번호가 일치하지 않습니다.'
    isValid = false
  }

  // 현재 비밀번호와 새 비밀번호가 같은지 검사
  if (
    passwordForm.currentPassword === passwordForm.newPassword &&
    passwordForm.currentPassword.trim() !== ''
  ) {
    passwordErrors.newPassword = '현재 비밀번호와 다른 비밀번호를 입력하세요.'
    isValid = false
  }

  return isValid
}

// 비밀번호 변경 제출
const handlePasswordSubmit = async () => {
  if (!validatePasswordForm()) {
    return
  }

  passwordLoading.value = true

  try {
    await $fetch('/api/dms/change-password', {
      method: 'POST',
      body: {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      },
    })

    // 성공 처리
    showPasswordModal.value = false
    resetPasswordForm()

    // 성공 메시지 표시 (간단한 알림)
    alert('비밀번호가 성공적으로 변경되었습니다.')
  } catch (error: any) {
    console.error('비밀번호 변경 오류:', error)

    // 서버에서 받은 에러 메시지 처리
    if (error.data?.message) {
      if (error.data.message.includes('현재 비밀번호')) {
        passwordErrors.currentPassword = error.data.message
      } else if (error.data.message.includes('새 비밀번호')) {
        passwordErrors.newPassword = error.data.message
      } else {
        passwordErrors.currentPassword = error.data.message
      }
    } else {
      passwordErrors.currentPassword = '비밀번호 변경 중 오류가 발생했습니다.'
    }
  } finally {
    passwordLoading.value = false
  }
}

// 로그아웃 버튼 클릭 시 모달 표시
const handleLogout = () => {
  showLogoutModal.value = true
}

// 로그아웃 모달 닫기
const closeLogoutModal = () => {
  showLogoutModal.value = false
  logoutLoading.value = false
}

// 로그아웃 확인
const confirmLogout = async () => {
  logoutLoading.value = true

  try {
    await $fetch('/api/dms/logout', {
      method: 'POST',
    })

    // 로그인 페이지로 리다이렉트
    await navigateTo('/dms/login')
  } catch (error) {
    console.error('로그아웃 오류:', error)

    // 로그인 페이지로 리다이렉트
    await navigateTo('/dms/login')
  } finally {
    logoutLoading.value = false
    showLogoutModal.value = false
  }
}

// ESC 키로 툴바 닫기
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.isMobileMenuOpen) {
    emit('closeMenu')
  }
}

onMounted(() => {
  if (process.client) {
    document.addEventListener('keydown', handleKeyDown)
  }
})

onUnmounted(() => {
  if (process.client) {
    document.removeEventListener('keydown', handleKeyDown)
  }
})
</script>

<style lang="scss" scoped>
/* Toolbar */
.toolbar {
  position: fixed;
  top: 60px;
  right: -326px;
  width: 326px;
  height: calc(100dvh - 60px);
  background: #fff;
  box-shadow: -2px 0px 8px 0px rgba(0, 0, 0, 0.1);
  padding: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  transition: right 0.3s ease;

  @media (max-width: 1023px) {
    height: 100%;
    max-height: calc(100dvh - 60px);
    overflow-y: auto;
    justify-content: flex-start;
    overscroll-behavior: contain;
  }

  &.show {
    right: 0;
    transition: right 0.3s ease;
  }

  &-top {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 24px 40px 24px 24px;
    .toolbar-section {
      display: flex;
      flex-direction: column;
      gap: 8px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      padding-bottom: 24px;
      + .toolbar-section {
        padding-top: 24px;
      }
      &.mobile-only {
        + .toolbar-section {
          @media (min-width: 1024px) {
            padding-top: 0;
          }
        }
      }
    }
    .toolbar-menu-grid {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  }
  &-bottom {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 24px 40px 24px 24px;
  }
  button,
  a {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 12px;
    border-radius: 8px;
    background: #fff;
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
    gap: 8px;
    color: #000;
    &:focus-visible,
    &:hover,
    &.active {
      background: rgba(55, 120, 249, 0.1);
      color: #3778f9;
      font-weight: 700;
    }
    svg {
      width: 24px;
      height: 24px;
    }
  }
}

/* 반응형 클래스 */
.desktop-only {
  @media (max-width: 1023px) {
    display: none !important;
  }
}

.mobile-only {
  @media (min-width: 1024px) {
    display: none !important;
  }
}

/* 비밀번호 변경 모달 스타일 */
.change-password-form {
  .form-group {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .form-label {
    display: block;
    color: #000;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    margin-bottom: 8px;
  }

  .password-hint {
    color: #000;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    margin: -12px 0 28px;
  }
}

.modal-actions {
  width: 100%;
  display: flex;
  gap: 8px;
  justify-content: center;
}
</style>
