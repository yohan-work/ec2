<template>
  <TitleArea title="고객사 관리">
    <template #right>
      <div class="right-content">
        <Button variant="blue" :size="38">
          <div v-html="addSvg"></div>
          신규 고객사 추가
        </Button>
      </div>
    </template>
  </TitleArea>
  <ContentsArea>
    <p>내용</p>
  </ContentsArea>
</template>

<script setup>
import addSvg from '~/components/assets/delivery/icons/add.svg?raw'
import TitleArea from '~/components/delivery/TitleArea.vue'
import ContentsArea from '~/components/delivery/ContentsArea.vue'
import Button from '~/components/ui/Button.vue'
import { onMounted } from 'vue'

definePageMeta({
  layout: 'delivery',
})

// 메타 태그
useHead({
  title: 'CiX Delivery Management System',
  meta: [{ name: 'description', content: 'CiX Delivery Management System' }],
})
</script>

<style lang="scss" scoped>
.clients-content {
  padding: 24px;
}
</style>
