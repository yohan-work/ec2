<template>
  <div class="app-title">
    <h2 v-if="title" v-html="title"></h2>
    <p v-if="text" v-html="text"></p>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
@use '~/layouts/scss/cnx.scss' as *;
@use '~/layouts/scss/cnx/_variables' as *;
@use '~/layouts/scss/cnx/_mixins' as *;
@use '~/layouts/scss/cnx/_functions' as *;

.app-title {
  padding: rem(64) 0;

  @include tablet {
    padding: rem(100) 0;
  }

  @include desktop {
    padding: rem(120) 0;
  }

  h2 {
    @include headline-02;
    & + p {
      margin-top: rem(8);

      @include tablet {
        margin-top: rem(14);
      }

      @include desktop {
        margin-top: rem(20);
      }
    }
  }

  p {
    @include body-01;
    color: #86868B;
  }

}
</style>