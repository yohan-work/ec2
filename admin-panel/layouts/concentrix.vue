<template>
  <div class="flex flex-col min-h-screen bg-background">
    <header class="bg-white shadow">
      <div class="concentrix-layout">
        <div class="flex justify-between items-center h-16">
          <div class="concentrix-logo">
            <NuxtLink to="/" class="text-xl font-bold text-gray-900">
              <img src="~/public/assets/concentrix-logo.svg" alt="Concentrix" />
            </NuxtLink>
          </div>
          <div>Header 테스트</div>
        </div>
      </div>
    </header>
    <!-- 메인 콘텐츠 -->
    <main>
      <slot />
    </main>

    <footer>
      <div class="concentrix-layout">Footer</div>
    </footer>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'concentrix',
})
</script>

<style lang="scss" scoped>
@use './scss/mixins.scss' as *;

.concentrix-layout {
  container-type: inline-size;
  max-width: 1320px;
  margin: 0 auto;
  .concentrix-logo {
    @include desktop(width, 175px);
    @include mobile(width, 210px);
  }
}
header {
  @include desktop(padding, 0 48px);
  @include mobile(padding, 48px);
}
main {
  flex: 1;
}
footer {
  width: 100%;
  background: #001933;
  color: #fff;
  @include desktop(padding, 48px);
  @include mobile(padding, 48px);
}
</style>
