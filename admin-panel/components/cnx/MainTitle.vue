<template>
  <div class="main-title">
    <h2 class="main-title__heading" v-html="title"></h2>
    <p v-if="description" class="main-title__description" v-html="description"></p>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.main-title {
  text-align: left;

  &__heading {
    @include headline-02;
    font-weight: $font-weight-thin;
    color: $d-white;
  }

  &__description {
    @include body-01;
    font-weight: $font-weight-thin;
    color: $d-white;
    line-height: 140%;
    margin-top: rem(24);
    font-size: rem(16);
    word-break: keep-all;
    
    @include tablet {
      font-size: $font-size-body1-tablet;
      margin-top: rem(28);
    }
    
    @include desktop {
      font-size: rem(32);
      margin-top: rem(17);
    }
  }
}
</style>

