<template>
  <div class="permission-card" :data-id="id">
    <div class="permission-content">
      <div class="permission-info">
        <span class="permission-position">{{ position }}</span>
        <span class="permission-name">{{ name }}</span>
      </div>
      <div class="permission-actions">
        <Button variant="text" :size="20" @click="$emit('edit', id)">
          <div v-html="modifySvg"></div>
          수정
        </Button>
        <div class="permission-count">총 {{ count }}명</div>
      </div>
      <div class="permission-access">
        <div class="permission-list">
          <div v-for="permission in props.leftPermissions" :key="permission">
            {{ permission }}
          </div>
        </div>
        <div class="permission-list">
          <div v-for="permission in props.rightPermissions" :key="permission">
            {{ permission }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import modifySvg from '~/components/assets/dms/icons/modify.svg?raw'
import Button from '~/components/ui/Button.vue'

interface Props {
  id: string | number
  position: string
  name: string
  count: number
  leftPermissions?: string[]
  rightPermissions?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  leftPermissions: () => [],
  rightPermissions: () => [],
})

defineEmits<{
  edit: [id: string | number]
}>()
</script>

<style lang="scss" scoped>
// 조직도 트리 스타일
.permission-card {
  overflow: hidden;
  border: 1px solid #cbcbcb;
  border-radius: 16px;
  width: calc((100% - 20px * 3) / 4);
  @media (max-width: 1600px) {
    width: calc((100% - 20px * 2) / 3);
  }
  @media (max-width: 1280px) {
    width: calc((100% - 20px * 1) / 2);
  }
  @media (max-width: 850px) {
    width: 100%;
  }
  .permission-content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 24px;
    padding: 24px;
    background: #fff;
    .permission-info {
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex: 1;
      align-items: flex-start;
      justify-content: flex-start;
      .permission-position {
        color: #000;
        font-size: 18px;
        font-weight: 700;
        line-height: 24px;
      }
      .permission-name {
        color: #3c3c3c;
        font-size: 16px;
        font-weight: 700;
        line-height: 22px;
      }
    }
    .permission-actions {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 8px;
      button {
        color: #666;
      }
      .permission-count {
        display: flex;
        padding: 2px 4px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        border-radius: 4px;
        background: #375ef9;
        color: #fff;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
      }
    }
    .permission-access {
      display: flex;
      min-width: 100%;
      color: #222;
      font-size: 16px;
      font-weight: 400;
      line-height: 22px;
      gap: 20px;
      flex: 1;
      .permission-list {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 8px;
        background: #fff;
        div {
          display: flex;
          padding: 8px 16px;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          align-self: stretch;
          border-radius: 10px;
          color: #222;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
        }
        &:nth-child(1) {
          div {
            background: #f7f7f7;
          }
        }
        &:nth-child(2) {
          div {
            background: #f3f4f8;
          }
        }
      }
    }
  }
}
</style>
