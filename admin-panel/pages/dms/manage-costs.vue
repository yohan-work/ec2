<template>
  <TitleArea title="비용 관리"> </TitleArea>
  <ContentsArea>
    <MainContainer :round="true">
      <div class="empty-page">
        <h2>비용 관리</h2>
        <p>비용 관리 기능이 준비 중입니다.</p>
      </div>
    </MainContainer>
  </ContentsArea>
</template>

<script setup>
import TitleArea from '~/components/dms/TitleArea.vue'
import ContentsArea from '~/components/dms/ContentsArea.vue'
import MainContainer from '~/components/dms/MainContainer.vue'

definePageMeta({
  layout: 'dms',
  ssr: false,
})
</script>

<style lang="scss" scoped>
.empty-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  text-align: center;

  h2 {
    font-size: 24px;
    font-weight: 600;
    color: #333;
    margin-bottom: 12px;
  }

  p {
    font-size: 16px;
    color: #666;
  }
}
</style>
