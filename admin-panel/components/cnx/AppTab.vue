<template>
  <div class="app-tab-container">
    <div class="tab-list" role="tablist">
      <div class="inner">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          :class="['tab-button', { 'is-active': activeTab === index }]"
          :aria-selected="activeTab === index"
          :aria-controls="`tab-panel-${componentId}-${index}`"
          :id="`tab-${componentId}-${index}`"
          :tabindex="activeTab === index ? 0 : -1"
          role="tab"
          @click="selectTab(index)"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>
    
    <div class="tab-content">
      <div
        v-for="(tab, index) in visibleTabs"
        :key="index"
        :id="`tab-panel-${componentId}-${tab.originalIndex}`"
        :aria-labelledby="`tab-${componentId}-${tab.originalIndex}`"
        role="tabpanel"
        class="tab-panel"
      >
        <slot :name="tab.slot || `tab-${tab.originalIndex}`" :tab="tab" :index="tab.originalIndex">
          {{ tab.content }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, onUnmounted, nextTick } from 'vue'

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
  },
  instanceId: {
    type: String,
    default: ''
  }
})

// Emits
const emit = defineEmits(['update:modelValue', 'tab-change'])

// 고유 ID 생성 (SSR 호환 - ref로 한 번만 생성)
const componentId = ref(props.instanceId || `normal-tab-${Math.random().toString(36).substr(2, 9)}`)

// State
const activeTab = ref(props.modelValue)
const focusedTabIndex = ref(props.modelValue) // 실제 포커스된 탭 인덱스

// Computed
const visibleTabs = computed(() => {
  return props.tabs.map((tab, index) => ({
    ...tab,
    originalIndex: index
  })).filter((tab, index) => index === activeTab.value)
})

// Methods
const selectTab = (index) => {
  activeTab.value = index
  focusedTabIndex.value = index
  emit('update:modelValue', index)
  emit('tab-change', { index, tab: props.tabs[index] })
}

// 키보드 네비게이션 (컴포넌트별 독립적)
const handleKeydown = (event) => {
  // 현재 컴포넌트의 탭 버튼인지 확인
  const tabId = event.target.id
  const indexMatch = tabId.match(new RegExp(`tab-${componentId.value}-(\\d+)`))
  
  if (!indexMatch) {
    return // 다른 컴포넌트의 탭이면 무시
  }
  
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault()
    event.stopPropagation() // 이벤트 전파 방지
    
    const currentIndex = parseInt(indexMatch[1])
    let newIndex
    
    if (event.key === 'ArrowLeft') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : props.tabs.length - 1
    } else {
      newIndex = currentIndex < props.tabs.length - 1 ? currentIndex + 1 : 0
    }
    
    // 포커스 상태 업데이트
    focusedTabIndex.value = newIndex
    
    // 포커스 이동 (활성화는 하지 않음)
    const tabElement = document.getElementById(`tab-${componentId.value}-${newIndex}`)
    if (tabElement) {
      tabElement.focus()
    }
  }
}

// 포커스 이벤트 핸들러 (실제 포커스 상태 추적)
const handleFocus = (event) => {
  const tabId = event.target.id
  const indexMatch = tabId.match(new RegExp(`tab-${componentId.value}-(\\d+)`))
  if (indexMatch) {
    focusedTabIndex.value = parseInt(indexMatch[1])
  }
}

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  activeTab.value = newValue
  focusedTabIndex.value = newValue
})

// 이벤트 리스너 등록 함수 (DOM 완전 렌더링 대기)
const setupEventListeners = () => {
  return new Promise((resolve) => {
    const trySetup = () => {
       // 현재 컴포넌트의 ID 가져오기
       const currentId = componentId.value
       
       // 모든 AppTab 컨테이너를 찾아서 현재 컴포넌트의 것만 선택
      const allContainers = document.querySelectorAll('.app-tab-container')
      let targetTabList = null
      
      // 각 컨테이너를 확인하여 현재 컴포넌트의 탭 버튼이 있는지 확인
      for (const container of allContainers) {
        const tabButtons = container.querySelectorAll(`[id^="tab-${currentId}-"]`)
        if (tabButtons.length > 0) {
          targetTabList = container.querySelector('.tab-list[role="tablist"]')
          break
        }
      }
      
      // 만약 ID로 찾지 못했다면, 다른 방법으로 시도
      if (!targetTabList && allContainers.length > 0) {
        // 가장 최근에 렌더링된 컨테이너를 사용 (마지막 컨테이너)
        const lastContainer = allContainers[allContainers.length - 1]
        targetTabList = lastContainer.querySelector('.tab-list[role="tablist"]')
        
        // ID를 업데이트하여 일치시키기
        if (targetTabList) {
          const existingButtons = targetTabList.querySelectorAll('[role="tab"]')
          if (existingButtons.length > 0) {
            const firstButtonId = existingButtons[0].id
            const idMatch = firstButtonId.match(/^tab-(.+)-(\d+)$/)
             if (idMatch) {
               const existingId = idMatch[1]
               componentId.value = existingId
             }
          }
        }
      }
      
      if (targetTabList) {
        // 고유한 이벤트 핸들러 등록
        targetTabList.setAttribute('data-component-id', componentId.value)
        
        // 해당 컴포넌트의 탭 버튼들만 선택하여 개별 이벤트 등록
        const tabButtons = targetTabList.querySelectorAll(`[id^="tab-${componentId.value}-"]`)
        tabButtons.forEach(button => {
          button.addEventListener('keydown', handleKeydown)
          button.addEventListener('focus', handleFocus)
        })
        resolve(true)
        return true
      }
      return false
    }
    
    // 즉시 시도
    if (!trySetup()) {
      // 실패 시 재시도 (최대 10번, 50ms 간격)
      let attempts = 0
      const maxAttempts = 10
      const interval = setInterval(() => {
        attempts++
        if (trySetup() || attempts >= maxAttempts) {
          clearInterval(interval)
          if (attempts >= maxAttempts) {
            resolve(false)
          }
        }
      }, 50)
    } else {
      resolve(true)
    }
  })
}

// Lifecycle
onMounted(async () => {
  // DOM 완전 렌더링 대기 후 이벤트 리스너 등록
  await setupEventListeners()
})

onUnmounted(() => {
  // 해당 컴포넌트의 탭 리스트만 선택 (완전 독립)
  const allContainers = document.querySelectorAll('.app-tab-container')
  let targetTabList = null
  
  // 현재 컴포넌트의 ID 가져오기
  const currentId = componentId.value
  
  // 각 컨테이너를 확인하여 현재 컴포넌트의 탭 버튼이 있는지 확인
  for (const container of allContainers) {
    const tabButtons = container.querySelectorAll(`[id^="tab-${currentId}-"]`)
    if (tabButtons.length > 0) {
      targetTabList = container.querySelector('.tab-list[role="tablist"]')
      break
    }
  }
  
  if (targetTabList) {
    // 해당 컴포넌트의 탭 버튼들만 선택하여 개별 이벤트 제거
    const tabButtons = targetTabList.querySelectorAll(`[id^="tab-${currentId}-"]`)
    tabButtons.forEach(button => {
      button.removeEventListener('keydown', handleKeydown)
      button.removeEventListener('focus', handleFocus)
    })
  }
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
      position: relative;
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
        color: $gray-1;
        opacity: 0.5;
        border: none;
      }
      &.is-active {
        &::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: $d-white;
        }
      }
    }
  }
}

</style>
