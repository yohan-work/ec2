<template>
  <header class="bg-white shadow">
    <div class="layout">
      <div class="gnb-container">
        <div class="concentrix-logo">
          <NuxtLink to="/" class="text-xl font-bold text-gray-900">
            <div class="logo" v-html="concentrixLogo"></div>
          </NuxtLink>
        </div>
        <div class="gnb-menu">
          <NuxtLink to="/newsletters" class="gnb-menu-item">
            <span>뉴스레터</span>
          </NuxtLink>
          <NuxtLink to="/recruits" class="gnb-menu-item">
            <span>채용공고</span>
          </NuxtLink>
        </div>
        <button
          class="gnb-hamburger"
          type="button"
          v-html="hamburgerIcon"
        ></button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import concentrixLogo from '~/components/assets/concentrix/concentrix-logo.svg?raw'
import hamburgerIcon from '~/components/assets/concentrix/hamburger.svg?raw'
</script>

<style lang="scss" scoped>
@use '~/layouts/scss/mixins.scss' as *;

header {
  width: 100%;
  background: #ffffff;
  padding: 0;
  .layout {
    display: block;
    max-width: 1320px;
    margin: 0 auto;
    padding: 0;
  }
  .gnb-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    @include desktop(padding, 21px 0 26px);
    @include mobile(padding, 17px 0 16px);
    .concentrix-logo {
      @include desktop(width, 199px);
      @include mobile(width, 110px);
      a {
        display: block;
      }
      .logo {
        max-width: 100%;
        width: 100% !important;
        display: block;
        color: #003d5b;

        /* SVG 스타일링 */
        :deep(svg) {
          width: 100%;
          max-width: 100%;
          height: auto;
        }
      }
    }
    .gnb-menu {
      display: flex;
      @include desktop(gap, 8px);
      @include mobile(display, none);
      .gnb-menu-item {
        display: flex;
      }
    }
    .gnb-hamburger {
      display: block;
      cursor: pointer;
      @include desktop(width, 56px);
      @include desktop(height, 56px);
      @include mobile(width, 42px);
      color: #000;
    }
  }
}
</style>
