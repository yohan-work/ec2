<template>
  <div ref="tabContainer" class="tab-container">
    <div class="tab-slider" :style="sliderStyle"></div>
    <button
      v-for="(tab, index) in tabs"
      :key="tab.value"
      :ref="
        el => {
          if (el) tabRefs[index] = el as HTMLElement
        }
      "
      :class="tabClasses(tab.value)"
      @click="selectTab(tab.value)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick, watch } from 'vue'

interface TabItem {
  label: string
  value: string | number
}

interface Props {
  tabs: TabItem[]
  modelValue?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  tabs: () => [],
  modelValue: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number, tab: TabItem]
}>()

const tabContainer = ref<HTMLElement>()
const tabRefs = ref<HTMLElement[]>([])

const selectTab = (value: string | number) => {
  const selectedTab = props.tabs.find(tab => tab.value === value)
  emit('update:modelValue', value)
  emit('change', value, selectedTab!)
}

const tabClasses = (value: string | number) => {
  const isActive = props.modelValue === value
  return `tab-button ${isActive ? 'active' : ''}`
}

// 슬라이더 위치 계산 (실제 탭 너비 기준)
const sliderStyle = computed(() => {
  const activeIndex = props.tabs.findIndex(
    tab => tab.value === props.modelValue
  )
  if (
    activeIndex === -1 ||
    !tabContainer.value ||
    !tabRefs.value[activeIndex]
  ) {
    return { width: '0px', left: '0px' }
  }

  const containerRect = tabContainer.value.getBoundingClientRect()
  const activeTabRect = tabRefs.value[activeIndex].getBoundingClientRect()

  const left = activeTabRect.left - containerRect.left
  const width = activeTabRect.width

  return {
    width: `${width + 1}px`,
    left: `${left}px`,
  }
})

// 탭이 변경될 때마다 슬라이더 위치 업데이트
watch(
  () => props.modelValue,
  () => {
    nextTick(() => {
      // 강제로 computed 재계산을 위한 트리거
    })
  }
)
</script>

<style lang="scss" scoped>
.tab-container {
  position: relative;
  display: flex;
  gap: 0;
  border-radius: 4px;
  overflow: hidden;
  background: #f2f2f2;
}

.tab-slider {
  position: absolute;
  top: 0;
  height: 100%;
  background: #fff;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
}

.tab-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 7px 32px;
  border: none;
  background: transparent;
  color: rgba(153, 153, 153, 0.96);
  font-size: 18px;
  font-weight: 400;
  cursor: pointer;
  white-space: nowrap;
  flex: 1;
  line-height: 26px;
  transition: color 0.2s ease;
  z-index: 2;

  &.active {
    color: #000;
    font-weight: 700;
  }
}
</style>
