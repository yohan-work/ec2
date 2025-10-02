<template>
  <div class="cnx-layout">
    <TheHeader />
    <!-- 메인 콘텐츠 -->
    <main class="cnx-main">
      <slot />
    </main>

    <footer class="cnx-footer">
      <div class="cnx-footer__inner">
        <p>&copy; 2024 Concentrix. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import TheHeader from '~/components/cnx/TheHeader.vue'

defineOptions({
  name: 'concentrix',
})
</script>

<style lang="scss" scoped>
@use './scss/cnx/_variables' as *;
@use './scss/cnx/_mixins' as *;
@use './scss/cnx/_functions' as *;

.cnx-layout {
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.cnx-main {
  flex: 1;
  /* 헤더가 sticky이므로 여백 불필요 */
}

.cnx-footer {
  width: 100%;
  background: #001933;
  color: #fff;
  padding: rem(24) 0;
  border-top: rem(2) solid #003d5b;
  
  &__inner {
    max-width: rem(1320);
    margin: 0 auto;
    padding: 0 rem(20);
    
    @include tablet {
      padding: 0 rem(24);
    }
    @include desktop {
      padding: 0 rem(32);
    }
    
    text-align: center;
    
    p {
      margin: 0;
      font-size: rem(16);
      font-weight: bold;
      opacity: 1;
    }
  }
}
</style>
