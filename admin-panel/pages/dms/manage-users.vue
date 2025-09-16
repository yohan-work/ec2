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
    <div class="management-card-container">
      <ManagementCard
        item-name="정석안 상무"
        :item-info="'본부장'"
        :item-id="9"
        @edit="editClient"
        @delete="deleteClient"
      >
        <template #info-items>
          <div class="info-item">
            <span class="info-value">
              <span>suckan.jeong</span>
            </span>
          </div>
        </template>
      </ManagementCard>
      <ManagementCard
        item-name="정은재 이사"
        :item-info="'그룹장'"
        :item-id="9"
        @edit="editClient"
        @delete="deleteClient"
      >
        <template #info-items>
          <div class="info-item">
            <span class="info-value">
              <span>jay.jung</span>
            </span>
          </div>
        </template>
      </ManagementCard>
      <ManagementCard
        item-name="이상헌 이사"
        :item-info="'팀장'"
        :item-id="9"
        @edit="editClient"
        @delete="deleteClient"
      >
        <template #info-items>
          <div class="info-item">
            <span class="info-value">
              <span>sanghun.lee</span>
            </span>
          </div>
        </template>
      </ManagementCard>
      <ManagementCard
        item-name="정지원 부장"
        :item-info="'팀장'"
        :item-id="9"
        @edit="editClient"
        @delete="deleteClient"
      >
        <template #info-items>
          <div class="info-item">
            <span class="info-value">
              <span>jiwon.jung</span>
            </span>
          </div>
        </template>
      </ManagementCard>
      <ManagementCard
        item-name="박선희 부장"
        :item-info="'팀장'"
        :item-id="9"
        @edit="editClient"
        @delete="deleteClient"
      >
        <template #info-items>
          <div class="info-item">
            <span class="info-value"> <span>sunhee.park</span> </span>
          </div>
        </template>
      </ManagementCard>
    </div>
  </ContentsArea>
</template>

<script setup>
import addSvg from '~/components/assets/dms/icons/add.svg?raw'
import TitleArea from '~/components/dms/TitleArea.vue'
import ContentsArea from '~/components/dms/ContentsArea.vue'
import Button from '~/components/ui/Button.vue'
import ManagementCard from '~/components/dms/ManagementCard.vue'
import { onMounted } from 'vue'

definePageMeta({
  layout: 'dms',
  ssr: false,
})
</script>

<style lang="scss" scoped>
.management-card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: calc(100% + 15px);
  height: 100%;
  padding: 0 15px 23px 0;
  margin-right: 15px;
  overflow: auto;
  justify-content: flex-start;
  align-content: flex-start;
  > div {
    width: calc(25% - 60px / 4);
    @media (max-width: 1920px) {
      width: calc(33.3333% - 40px / 3);
    }
    @media (max-width: 1355px) {
      width: calc(50% - 10px);
    }
  }
}
</style>
