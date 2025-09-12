<template>
  <div class="gnb">
    <div class="gnb-container">
      <div class="gnb-title">
        <NuxtLink to="/delivery/">
          <div class="logo" v-html="concentrixLogoSvg"></div>
          <div class="cix-logo" v-html="cixLogoSvg"></div>
        </NuxtLink>
      </div>

      <!-- 로그인 페이지인 경우 메뉴 숨김 -->
      <template v-if="!props.isLoginPage">
        <div class="gnb-menu">
          <NuxtLink to="/delivery/project-revenue/">
            <div class="gnb-menu-item" :class="{ active: isActiveRoute('/delivery/project-revenue/') }">
              <span>Project Revenue</span>
            </div>
          </NuxtLink>
          <NuxtLink to="/delivery/project-mm/">
            <div class="gnb-menu-item" :class="{ active: isActiveRoute('/delivery/project-mm/') }">
              <span>Project MM</span>
            </div>
          </NuxtLink>
          <NuxtLink to="/delivery/sso/">
            <div class="gnb-menu-item" :class="{ active: isActiveRoute('/delivery/sso/') }">
              <span>SSO</span>
            </div>
          </NuxtLink>
          <NuxtLink to="/delivery/staff-utility/">
            <div class="gnb-menu-item" :class="{ active: isActiveRoute('/delivery/staff-utility/') }">
              <span>Staff (Utility)</span>
            </div>
          </NuxtLink>
          <NuxtLink to="/delivery/project-list/">
            <div class="gnb-menu-item" :class="{ active: isActiveRoute('/delivery/project-list/') }">
              <span>Project List</span>
            </div>
          </NuxtLink>
        </div>
      </template>

      <button
        class="gnb-hamburger"
        @click="toggleMobileMenu"
        type="button"
        v-if="!props.isLoginPage"
      >
        <div
          class="gnb-hamburger-icon"
          :class="{ active: props.isMobileMenuOpen }"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import concentrixLogoSvg from '~/components/assets/delivery/icons/concentrix-logo.svg?raw'
import cixLogoSvg from '~/components/assets/delivery/icons/cix-logo.svg?raw'

// Props 정의
interface Props {
  isMobileMenuOpen: boolean
  isLoginPage: boolean
}

const props = defineProps<Props>()

// Emits 정의
const emit = defineEmits<{
  'toggle-mobile-menu': []
}>()

const route = useRoute()

const toggleMobileMenu = () => {
  emit('toggle-mobile-menu')
}

// 현재 라우트와 일치하는지 확인하는 함수
const isActiveRoute = (path: string) => {
  return route.path === path
}
</script>

<style lang="scss" scoped>
.gnb {
  position: relative;
  width: 100%;
  padding: 1.5px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  background: #fff;
  z-index: 1001;
  white-space: nowrap;

  &-container {
    width: 100%;
    height: 56px;
    margin: 0 auto;
    padding: 0 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
  }

  .gnb-title {
    display: flex;
    align-items: center;
    gap: 12px;

    a {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    svg {
      vertical-align: top;
    }

    .logo {
      width: auto;
      height: 14px;
      vertical-align: top;
    }
    .cix-logo {
      width: auto;
      height: 14px;
      vertical-align: top;
      &:deep(svg) {
        width: auto;
        height: 100%;
      }
    }

    &-text {
      display: inline-block;
      color: #000;
      font-size: 24px;
      line-height: 33px;
      font-weight: 600;
      padding: 1px 24px 0 8px;
      margin: 0;

      @media (max-width: 768px) {
        font-size: 18px;
        line-height: 24px;
      }
    }
  }

  .gnb-menu {
    display: flex;
    align-items: center;

    a {
      display: block;
      text-decoration: none;
    }

    &-item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px 20px 8px;
      color: #000;
      font-size: 14px;
      font-weight: 700;
      line-height: 20px;
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
      text-decoration: none;

      &:focus-visible,
      &:hover {
        color: #3778f9;
      }

      &.active,
      &.router-link-active {
        color: #3778f9;
        border-bottom-color: #3778f9;
      }

      &:active {
        transform: none;
        box-shadow: none;
      }

      svg {
        margin-right: 6px;
        width: 16px;
        height: 16px;
      }
    }
  }

  .gnb-hamburger {
    display: block;
    cursor: pointer;
    width: 56px;
    height: 56px;
    padding: 21px 19px;
    background: none;
    border: none;
    appearance: none;

    .gnb-hamburger-icon {
      width: 18px;
      height: 14px;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      span {
        display: block;
        height: 2px;
        width: 18px;
        background-color: #333;
        border-radius: 1px;
        transition: all 0.3s ease-in-out;
        transform-origin: center;
      }

      &.active {
        span {
          width: 24px;
        }
        span:nth-child(1) {
          transform: rotate(45deg) translate(3px, 7px);
        }

        span:nth-child(2) {
          opacity: 0;
          transform: translateX(10px);
        }

        span:nth-child(3) {
          transform: rotate(-45deg) translate(1px, -6px);
        }
      }
    }
  }
}
</style>
