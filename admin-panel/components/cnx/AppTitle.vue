<template>
  <div class="app-title">
    <h2>
      <slot></slot> <!-- 제목을 입력해 주세요 -->
    </h2>
    <p>
      <slot name="description"></slot> <!-- 설명을 입력해 주세요 -->
    </p>
  </div>
</template>

<style lang="scss" scoped>
@use '~/layouts/scss/cnx.scss' as *;
@use '~/layouts/scss/cnx/_variables' as *;
@use '~/layouts/scss/cnx/_mixins' as *;
@use '~/layouts/scss/cnx/_functions' as *;

.app-title {
  max-width: rem(1320);
  margin: 0 auto;
  text-align: center;
  padding: rem(64) 0;
  @include tablet {
    padding: rem(100) 0;
  }
  @include desktop {
    padding: rem(120) 0;
  }
  h2 {
    @include headline-02;
  }
  p {
    @include body-01;
    color: #86868B;
    @include tablet {
      margin-top: rem(14);
    }
    @include desktop {
      margin-top: rem(20);
    }
  }
}
</style>