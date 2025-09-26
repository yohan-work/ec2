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

const handlePasswordChange = () => {
  // 비밀번호 변경 로직
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
</style>
