<template>
  <div class="management-card">
    <div class="card-header">
      <div class="card-title">
        {{ itemName }}
        <span class="card-title-info" v-if="itemInfo">{{ itemInfo }}</span>
      </div>
      <div class="card-actions">
        <button class="common-btn height-20" @click="handleEdit">
          <div v-html="modifySvg"></div>
          수정
        </button>
        <button class="common-btn height-20" @click="handleDelete">
          <div v-html="deleteSvg"></div>
          삭제
        </button>
      </div>
    </div>
    <div class="card-body">
      <div class="card-info">
        <slot name="info-items">
          <div
            class="info-item"
            v-for="(info, index) in infoItems"
            :key="index"
          >
            <span class="info-value">
              <span>{{ info.label }}</span> <strong>{{ info.value }}</strong
              >{{ info.unit }}
            </span>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import modifySvg from '~/components/assets/dms/icons/modify.svg?raw'
import deleteSvg from '~/components/assets/dms/icons/delete.svg?raw'
import { computed } from 'vue'

// Props 정의
const props = defineProps({
  itemName: {
    type: String,
    required: true,
  },
  itemInfo: {
    type: String,
    default: '',
  },
  'item-info': {
    type: String,
    default: '',
  },
  infoItems: {
    type: Array,
    default: () => [],
    validator: items => {
      return items.every(
        item =>
          typeof item === 'object' &&
          'label' in item &&
          'value' in item &&
          'unit' in item
      )
    },
  },
  itemId: {
    type: [Number, String],
    default: null,
  },
})

// Emits 정의
const emit = defineEmits(['edit', 'delete'])

// Computed property for itemInfo
const itemInfoValue = computed(() => {
  return props.itemInfo || props['item-info'] || ''
})

// 이벤트 핸들러
const handleEdit = () => {
  emit('edit', props.itemId || null)
}

const handleDelete = () => {
  emit('delete', props.itemId || null)
}
</script>

<style lang="scss" scoped>
.management-card {
  display: flex;
  padding: 24px;
  flex-direction: column;
  gap: 24px;
  border-radius: 16px;
  border: 1px solid #cbcbcb;
  background: #fff;
  @media (max-width: 1355px) {
    width: calc(50% - 10px);
  }
  @media (max-width: 1030px) {
    width: 100%;
  }

  .card-header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    margin: 0;
    border: none;
    background: transparent;
    white-space: nowrap;

    .card-title {
      color: #000;
      font-size: 18px;
      font-weight: 700;
      line-height: 24px;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      gap: 8px;

      &-info {
        color: #4a4a4a;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        padding: 2px 0;
      }
    }

    .card-actions {
      display: flex;
      align-items: flex-start;
      gap: 20px;

      button {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 0;
        margin: 0;
        border: 0;
        background: transparent;
        color: #666;
        font-size: 14px;
        font-weight: 700;
        line-height: 20px;
        cursor: pointer;

        &:hover {
          color: #333;
        }
      }
    }
  }

  .card-body {
    padding: 24px 20px;
    flex: 1 0 0;
    border-radius: 10px;
    background: #f7f7f7;
    text-align: center;
    color: #222;
    font-size: 18px;
    line-height: 24px;
    font-weight: 400;

    span {
      font-size: 16px;
      line-height: 22px;
      color: #666;
    }

    strong {
      color: #222;
      font-weight: 700;
      font-size: 18px;
      line-height: 24px;
    }
  }
}
</style>
