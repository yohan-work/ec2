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
    color: $d-black;
  }

  &__description {
    @include body-01;
    color: $gray-1;
    line-height: 140%;
    margin-top: rem(24);
    
    @include tablet {
      margin-top: rem(28);
    }
    
    @include desktop {
      margin-top: rem(17);
    }
  }
}
</style>

