<template>
  <div class="concentrix-layout">
    <Header />
    <!-- 메인 콘텐츠 -->
    <main>
      <slot />
    </main>

    <footer>
      <div class="layout">Footer</div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import Header from '~/components/concentrix/Header.vue'

defineOptions({
  name: 'concentrix',
})
</script>

<style lang="scss" scoped>
@use './scss/mixins.scss' as *;

.concentrix-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #ffffff;
}

main {
  flex: 1;
}
footer {
  width: 100%;
  background: #001933;
  color: #fff;
  padding: 32px;
  @include mobile(padding, 24px);
}
</style>
