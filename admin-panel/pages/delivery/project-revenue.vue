<template>
  <TitleArea title="Project Revenue" />
  <ContentsArea>
    <p>내용</p>
  </ContentsArea>
</template>

<script setup>
import TitleArea from '~/components/delivery/TitleArea.vue'
import ContentsArea from '~/components/delivery/ContentsArea.vue'
definePageMeta({
  layout: 'delivery',
})
</script>

<style scoped>
.page-container {
  padding: 20px;
}

p {
  color: #666;
}
</style>
