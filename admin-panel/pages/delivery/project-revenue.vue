<template>
  <DeliveryLayout>
    <TitleArea title="Project Revenue" />
    <ContentsArea>
      <p>내용</p>
    </ContentsArea>
  </DeliveryLayout>
</template>

<script setup>
import DeliveryLayout from '~/components/layouts/delivery.vue'
import TitleArea from '~/components/delivery/TitleArea.vue'
import ContentsArea from '~/components/delivery/ContentsArea.vue'
definePageMeta({
  layout: false,
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
