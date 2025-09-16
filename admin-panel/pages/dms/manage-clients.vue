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
    <div class="management-card-container">
      <ManagementCard
        item-name="LG디스플레이"
        :info-items="[{ label: '총', value: 2, unit: '개 프로젝트' }]"
        :item-id="9"
        @edit="editClient"
        @delete="deleteClient"
      />
      <ManagementCard
        item-name="LG디스플레이"
        :info-items="[{ label: '총', value: 2, unit: '개 프로젝트' }]"
        :item-id="9"
        @edit="editClient"
        @delete="deleteClient"
      />
      <ManagementCard
        item-name="LG디스플레이"
        :info-items="[{ label: '총', value: 2, unit: '개 프로젝트' }]"
        :item-id="9"
        @edit="editClient"
        @delete="deleteClient"
      />
      <ManagementCard
        item-name="LG디스플레이"
        :info-items="[{ label: '총', value: 2, unit: '개 프로젝트' }]"
        :item-id="9"
        @edit="editClient"
        @delete="deleteClient"
      />
      <ManagementCard
        item-name="LG디스플레이"
        :info-items="[{ label: '총', value: 2, unit: '개 프로젝트' }]"
        :item-id="9"
        @edit="editClient"
        @delete="deleteClient"
      />
      <ManagementCard
        item-name="LG디스플레이"
        :info-items="[{ label: '총', value: 2, unit: '개 프로젝트' }]"
        :item-id="9"
        @edit="editClient"
        @delete="deleteClient"
      />
      <ManagementCard
        item-name="LG디스플레이"
        :info-items="[{ label: '총', value: 2, unit: '개 프로젝트' }]"
        :item-id="9"
        @edit="editClient"
        @delete="deleteClient"
      />
    </div>
  </ContentsArea>
</template>

<script setup>
import addSvg from '~/components/assets/dms/icons/add.svg?raw'
import TitleArea from '~/components/dms/TitleArea.vue'
import ContentsArea from '~/components/dms/ContentsArea.vue'
import Button from '~/components/ui/Button.vue'
import ManagementCard from '~/components/dms/ManagementCard.vue'

definePageMeta({
  layout: 'dms',
  ssr: false,
})

// 메타 태그
useHead({
  title: 'CiX Delivery Management System',
  meta: [{ name: 'description', content: 'CiX Delivery Management System' }],
})

// 이벤트 핸들러 함수들
const editClient = clientId => {
  console.log('Edit client:', clientId)
  // TODO: 고객사 수정 로직 구현
}

const deleteClient = clientId => {
  console.log('Delete client:', clientId)
  // TODO: 고객사 삭제 로직 구현
}
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
