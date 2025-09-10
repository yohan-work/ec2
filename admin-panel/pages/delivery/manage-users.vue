<template>
  <TitleArea title="사용자 관리">
    <template #right>
      <div class="right-content">
        <Button variant="blue" :size="38">
          <div v-html="addSvg"></div>
          신규 사용자 추가
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
  ssr: false,
})
</script>

<style lang="scss" scoped>
.center-content {
  display: flex;
  align-items: center;
  font-weight: 500;
  color: #374151;
}
.right-content {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
