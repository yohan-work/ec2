<template>
  <div class="app-tab-container">
    <div class="tab-list" role="tablist">
      <div class="inner">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          :class="['tab-button', { 'is-active': activeTab === index }]"
          :aria-selected="activeTab === index"
          :aria-controls="`tab-panel-${index}`"
          :id="`tab-${index}`"
          role="tab"
          @click="selectTab(index)"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>
    
    <div class="tab-content">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        v-show="activeTab === index"
        :id="`tab-panel-${index}`"
        :aria-labelledby="`tab-${index}`"
        role="tabpanel"
        class="tab-panel"
      >
        <slot :name="tab.slot || `tab-${index}`" :tab="tab" :index="index">
          {{ tab.content }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

// Props
const props = defineProps({
  tabs: {
    type: Array,
    required: true,
    default: () => []
  },
  modelValue: {
    type: Number,
    default: 0
  }
})

// Emits
const emit = defineEmits(['update:modelValue', 'tab-change'])

// State
const activeTab = ref(props.modelValue)

// Methods
const selectTab = (index) => {
  activeTab.value = index
  emit('update:modelValue', index)
  emit('tab-change', { index, tab: props.tabs[index] })
}

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  activeTab.value = newValue
})
</script>

<style lang="scss" scoped>
.app-tab-container {
  width: 100%;
  .tab-list {
    border-bottom: 1px solid $d-gray;
    display:flex;
    align-items:center;
    justify-content:center;
    .inner {
      display: flex;
      align-items: stretch;
      justify-content: center;
      padding: 0 rem(24);
      @include tablet {
        padding: 0 rem(80);
      }
    }
    .tab-button {
      width:100%;
      padding: rem(10);
      border: 1px solid $d-gray;
      border-bottom: none;
      background: transparent;
      font-size: rem(14);
      font-weight: $font-weight-bold;
      @include tablet {
        @include body-01;
        padding:0;
        height:rem(40);
      }
      @include desktop {
        height:rem(60);
      }
      &:not(.is-active) {
        background:rgba(0, 0, 0, 0.10);
        color: #86868B;
        opacity: 0.5;
        border: none;
      }
    }
  }
}

</style>
