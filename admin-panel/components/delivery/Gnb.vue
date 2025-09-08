<template>
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
</template>

<script setup lang="ts">
import concentrixLogoSvg from '~/components/assets/delivery/icons/concentrix-logo.svg?raw'

// Props 정의
interface Props {
  isMobileMenuOpen: boolean
}

const props = defineProps<Props>()

// Emits 정의
const emit = defineEmits<{
  'toggle-mobile-menu': []
}>()

const toggleMobileMenu = () => {
  emit('toggle-mobile-menu')
}
</script>

<style lang="scss" scoped>
.gnb {
  position: relative;
  display: flex;
  width: 100%;
  padding: 16px 40px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  background: #fff;
  z-index: 1001;
  white-space: nowrap;
  @media (max-width: 768px) {
    padding: 10px 20px;
  }
  .gnb-title {
    display: flex;
    gap: 12px;
    svg {
      vertical-align: top;
    }
    .logo {
      height: 14px;
      width: auto;
      vertical-align: top;
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
    gap: 8px;

    a {
      display: block;
      text-decoration: none;
    }

    &-item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px 16px 8px;
      color: #666;
      font-size: 16px;
      font-weight: 700;
      line-height: 22px;
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;
      font-family: Pretendard;
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

      // 아이콘과 텍스트 간격
      svg {
        margin-right: 6px;
        width: 16px;
        height: 16px;
      }
    }
  }

  // 햄버거 메뉴
  .gnb-hamburger {
    display: block;
    cursor: pointer;
    padding: 8px;
    background: none;
    border: none;
    appearance: none;
    outline: none;

    .gnb-hamburger-icon {
      width: 24px;
      height: 18px;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      span {
        display: block;
        height: 2px;
        width: 100%;
        background-color: #333;
        border-radius: 1px;
        transition: all 0.3s ease-in-out;
        transform-origin: center;
      }

      &.active {
        span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        span:nth-child(2) {
          opacity: 0;
          transform: translateX(20px);
        }

        span:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -6px);
        }
      }
    }
  }
}
</style>
