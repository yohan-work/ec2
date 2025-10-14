<template>
  <div class="cnx-layout">
    <TheHeader />
    <!-- 메인 콘텐츠 -->
    <main class="cnx-main">
      <slot />
    </main>

    <TheFooter />
  </div>
</template>

<script setup>
import TheHeader from '~/components/cnx/TheHeader.vue'
import TheFooter from '~/components/cnx/TheFooter.vue'

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
</style>
