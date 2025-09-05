<template>
  <Loading :show="false" />
  <div class="delivery-layout">
    <!-- GNB (Global Navigation Bar) -->
    <div class="gnb">
      <div class="gnb-title">
        <NuxtLink to="/delivery/">
          <div class="logo" v-html="concentrixLogoSvg"></div>
        </NuxtLink>
      </div>

      <div class="gnb-menu">
        <NuxtLink to="/delivery/project-revenue/">
          <div class="gnb-menu-item">
            <span>Project Revenue</span>
          </div>
        </NuxtLink>
        <NuxtLink to="/delivery/project-mm/">
          <div class="gnb-menu-item">
            <span>Project MM</span>
          </div>
        </NuxtLink>
        <NuxtLink to="/delivery/sso/">
          <div class="gnb-menu-item">
            <span>SSO</span>
          </div>
        </NuxtLink>
        <NuxtLink to="/delivery/staff-utility/">
          <div class="gnb-menu-item">
            <span>Staff (Utility)</span>
          </div>
        </NuxtLink>
        <NuxtLink to="/delivery/project-list/">
          <div class="gnb-menu-item">
            <span>Project List</span>
          </div>
        </NuxtLink>
      </div>

      <button class="gnb-hamburger" @click="toggleMobileMenu" type="button">
        <div class="gnb-hamburger-icon" :class="{ active: isMobileMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
    </div>

    <!-- 툴바 레이어 -->
    <div class="toolbar" :class="{ show: isMobileMenuOpen }">
      <div class="toolbar-top">
        <div class="toolbar-section">
          <div class="toolbar-menu-grid">
            <NuxtLink
              to="/delivery/employees"
              class="btn"
              data-style="toolbar-menu"
            >
              <div v-html="employeeSvg"></div>
              <span>직원 관리</span>
            </NuxtLink>
            <NuxtLink
              to="/delivery/clients"
              class="btn"
              data-style="toolbar-menu"
            >
              <div v-html="clientSvg"></div>
              <span>고객사 관리</span>
            </NuxtLink>
            <NuxtLink
              to="/delivery/projects"
              class="btn"
              data-style="toolbar-menu"
            >
              <div v-html="projectSvg"></div>
              <span>프로젝트 관리</span>
            </NuxtLink>
            <NuxtLink
              to="/delivery/organizations"
              class="btn"
              data-style="toolbar-menu"
            >
              <div v-html="organizationSvg"></div>
              <span>조직 관리</span>
            </NuxtLink>
          </div>
        </div>
        <div class="toolbar-section">
          <div class="toolbar-menu-grid">
            <NuxtLink
              to="/delivery/users"
              class="btn"
              data-style="toolbar-menu"
            >
              <div v-html="userSvg"></div>
              <span>사용자 관리</span>
            </NuxtLink>
            <NuxtLink
              to="/delivery/permissions"
              class="btn"
              data-style="toolbar-menu"
            >
              <div v-html="permissionSvg"></div>
              <span>권한 관리</span>
            </NuxtLink>
            <NuxtLink
              to="/delivery/positions"
              class="btn"
              data-style="toolbar-menu"
            >
              <div v-html="positionSvg"></div>
              <span>직급 관리</span>
            </NuxtLink>
            <NuxtLink
              to="/delivery/history"
              class="btn"
              data-style="toolbar-menu"
            >
              <div v-html="historySvg"></div>
              <span>변경 히스토리</span>
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
    </div>

    <!-- 메인 콘텐츠 -->
    <div class="page-container">
      <slot />
    </div>

    <!-- 비밀번호 변경 모달 -->
    <!-- <Modal
      :show="showPasswordModal"
      title="비밀번호 변경"
      @close="showPasswordModal = false"
    >
      <form @submit.prevent="handlePasswordSubmit">
        <div class="mb-3">
          <label for="currentPassword" class="form-label">현재 비밀번호</label>
          <div class="password-input-wrapper">
            <Input
              v-model="passwordForm.currentPassword"
              type="password"
              placeholder="현재 비밀번호를 입력하세요"
            />
          </div>
        </div>
        <div class="mb-3">
          <label for="newPassword" class="form-label">신규 비밀번호</label>
          <div class="password-input-wrapper">
            <Input
              v-model="passwordForm.newPassword"
              type="password"
              placeholder="신규 비밀번호를 입력하세요"
            />
          </div>
        </div>
        <div class="mb-3">
          <label for="confirmPassword" class="form-label"
            >신규 비밀번호 확인</label
          >
          <div class="password-input-wrapper">
            <Input
              v-model="passwordForm.confirmPassword"
              type="password"
              placeholder="신규 비밀번호를 다시 입력하세요"
            />
          </div>
        </div>
        <div class="d-flex justify-content-center gap-2">
          <Button
            type="button"
            variant="outline"
            @click="showPasswordModal = false"
          >
            취소
          </Button>
          <Button type="submit" variant="primary"> 비밀번호 변경 </Button>
        </div>
      </form>
    </Modal> -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Loading from '~/components/ui/Loading.vue'

// SVG 아이콘들을 raw로 import
import concentrixLogoSvg from '~/components/assets/delivery/icons/concentrix-logo.svg?raw'
import changePasswordSvg from '~/components/assets/delivery/icons/change-password.svg?raw'
import logoutSvg from '~/components/assets/delivery/icons/logout.svg?raw'
import employeeSvg from '~/components/assets/delivery/icons/employee.svg?raw'
import clientSvg from '~/components/assets/delivery/icons/client.svg?raw'
import projectSvg from '~/components/assets/delivery/icons/project.svg?raw'
import organizationSvg from '~/components/assets/delivery/icons/organization.svg?raw'
import userSvg from '~/components/assets/delivery/icons/user.svg?raw'
import permissionSvg from '~/components/assets/delivery/icons/permission.svg?raw'
import positionSvg from '~/components/assets/delivery/icons/position.svg?raw'
import historySvg from '~/components/assets/delivery/icons/history.svg?raw'

defineOptions({
  name: 'delivery',
})

const { selectedYear, setSelectedYear } = useYear()

const showPasswordModal = ref(false)
const isMobileMenuOpen = ref(false)
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const availableYears = computed(() => {
  const currentYear = new Date().getFullYear()
  return Array.from({ length: 5 }, (_, i) => currentYear - 2 + i)
})

const handleYearChange = () => {
  setSelectedYear(selectedYear.value)
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const handlePasswordChange = () => {
  showPasswordModal.value = true
}

const handlePasswordSubmit = () => {
  // 비밀번호 변경 로직
  console.log('비밀번호 변경:', passwordForm.value)
  showPasswordModal.value = false
  passwordForm.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  }
}

const handleLogout = () => {
  if (confirm('로그아웃 하시겠습니까?')) {
    // 로그아웃 로직
    console.log('로그아웃')
  }
}
</script>

<style lang="scss" scoped>
@use './delivery.scss';
</style>
