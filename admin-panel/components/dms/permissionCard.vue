<template>
  <div
    class="permission-item"
    :class="`permission-${props.variant}`"
    :data-id="id"
  >
    <div class="permission-content">
      <div class="permission-info">
        <span class="permission-name">{{ name }}</span>
        <span class="permission-count">
          <span>총</span><strong>{{ count }}</strong
          >명
        </span>
      </div>
      <div class="permission-actions">
        <Button variant="text" :size="20" @click="$emit('edit', id)">
          <div v-html="modifySvg"></div>
          수정
        </Button>
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
  name: string
  count: number
  variant?: 'default' | 'white'
  leftPermissions?: string[]
  rightPermissions?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  leftPermissions: () => [],
  rightPermissions: () => [],
})

defineEmits<{
  edit: [id: string | number]
}>()
</script>

<style lang="scss" scoped>
// 조직도 트리 스타일
.permission-item {
  overflow: hidden;
  border: 0;
  border-radius: 16px;
  width: calc((100% - 20px * 3) / 4);
  @media (max-width: 1800px) {
    width: calc((100% - 20px * 2) / 3);
  }
  @media (max-width: 1500px) {
    width: calc((100% - 20px * 1) / 2);
  }
  @media (max-width: 1200px) {
    width: 100%;
  }

  // Default variant (기존 스타일)
  &.permission-default {
    .permission-content {
      background: #f7f7f7;
    }
    .permission-access {
      background: #f7f7f7;
      .permission-list {
        background: #fff;
      }
    }
  }

  // White variant
  &.permission-white {
    margin-bottom: -24px;
    .permission-content {
      background: #fff;
    }
    .permission-access {
      background: #fff;
      .permission-list {
        background: #f7f7f7;
      }
    }
  }
  .permission-content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding: 16px 20px;
    border-radius: 12px;
    .permission-name {
      color: #3c3c3c;
      font-size: 14px;
      font-weight: 700;
      line-height: 20px;
    }
    .permission-count {
      display: inline-block;
      padding-left: 16px;
      color: #222;
      font-size: 16px;
      font-weight: 400;
      line-height: 22px;
      span {
        display: inline-block;
        font-size: 14px;
        line-height: 20px;
        padding: 0 4px 0 0;
        color: #666;
      }
    }
    .permission-access {
      display: flex;
      min-width: 100%;
      height: calc(100% - 40px);
      justify-content: center;
      align-items: stretch;
      color: #222;
      font-size: 16px;
      font-weight: 400;
      line-height: 22px;
      gap: 16px;
      flex: 1;

      .permission-list {
        flex: 1;
        border-radius: 10px;
        padding: 20px;
        min-height: 120px;
      }
    }
    .permission-actions {
      opacity: 0.95;
      gap: 16px;
      button {
        color: #666;
      }
    }
  }
}
</style>
