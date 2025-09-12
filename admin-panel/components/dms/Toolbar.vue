<template>
  <div class="toolbar" :class="{ show: props.isMobileMenuOpen }">
    <div class="toolbar-top">
      <div class="toolbar-section">
        <div class="toolbar-menu-grid">
          <NuxtLink
            to="/dms/manage-employees"
            class="btn"
            :class="{ active: isActiveRoute('/dms/manage-employees') }"
            data-style="toolbar-menu"
          >
            <div v-html="employeeSvg"></div>
            <span>직원 관리</span>
          </NuxtLink>
          <NuxtLink
            to="/dms/manage-clients"
            class="btn"
            :class="{ active: isActiveRoute('/dms/manage-clients') }"
            data-style="toolbar-menu"
          >
            <div v-html="clientSvg"></div>
            <span>고객사 관리</span>
          </NuxtLink>
          <NuxtLink
            to="/dms/manage-organizations"
            class="btn"
            :class="{ active: isActiveRoute('/dms/manage-organizations') }"
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
            to="/dms/manage-users"
            class="btn"
            :class="{ active: isActiveRoute('/dms/manage-users') }"
            data-style="toolbar-menu"
          >
            <div v-html="userSvg"></div>
            <span>사용자 관리</span>
          </NuxtLink>
          <NuxtLink
            to="/dms/manage-permissions"
            class="btn"
            :class="{ active: isActiveRoute('/dms/manage-permissions') }"
            data-style="toolbar-menu"
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
          >
            <div v-html="historySvg"></div>
            <span>변경 히스토리</span>
          </NuxtLink>
          <NuxtLink
            to="/dms/manage-access-control"
            class="btn"
            :class="{ active: isActiveRoute('/dms/manage-access-control') }"
            data-style="toolbar-menu"
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

// Props 정의
interface Props {
  isMobileMenuOpen: boolean
}

const props = defineProps<Props>()

const route = useRoute()

// 현재 라우트와 일치하는지 확인하는 함수
const isActiveRoute = (path: string) => {
  return route.path === path
}

const handlePasswordChange = () => {
  // 비밀번호 변경 로직
  console.log('비밀번호 변경')
}

const handleLogout = async () => {
  if (confirm('로그아웃 하시겠습니까?')) {
    try {
      await $fetch('/api/dms/logout', {
        method: 'POST'
      })
      
      // 로그인 페이지로 리다이렉트
      await navigateTo('/dms/login')
    } catch (error) {
      console.error('로그아웃 오류:', error)
      // 에러가 발생해도 로그인 페이지로 리다이렉트
      await navigateTo('/dms/login')
    }
  }
}
</script>

<style lang="scss" scoped>
/* Toolbar */
.toolbar {
  position: fixed;
  top: 60px;
  right: -326px;
  width: 326px;
  height: calc(100vh - 60px);
  background: #fff;
  box-shadow: -2px 0px 8px 0px rgba(0, 0, 0, 0.1);
  padding: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  transition: right 0.3s ease;

  &.show {
    right: 0;
    transition: right 0.3s ease;
  }

  &-top {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
</style>
