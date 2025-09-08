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
          <div>👈 로고 이미지에 cqi(데스크탑), vw(모바일) 적용</div>
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
  padding: 0;
  .concentrix-logo {
    @include desktop(width, 199px);
    @include mobile(width, 210px);
    img {
      min-width: 100%;
    }
  }
}
header {
  padding: 0;
}
main {
  flex: 1;
}
footer {
  width: 100%;
  background: #001933;
  color: #fff;
  padding: 32px;
  @include mobile(padding, 48px);
}
</style>
