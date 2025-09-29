<template>
  <div class="styleguide">
    <!-- 헤더 섹션 -->
    <div class="styleguide-header">
      <h1 class="styleguide-title">Concentrix Style Guide</h1>
      <p class="styleguide-description">
        Concentrix 프로젝트에서 사용할 수 있는 <br>
        UI 컴포넌트들을 확인하고 테스트할 수 있습니다.
      </p>
    </div>

    <!-- 탭 메뉴 -->
    <div class="tab-container">
      <div class="tab-header">
        <button 
          v-for="section in sections" 
          :key="section.id"
          class="tab-button"
          :class="{ 'is-active': activeTab === section.id }"
          @click="setActiveTab(section.id)"
        >
          {{ section.title }}
        </button>
      </div>
      
      <div class="tab-content">
        <component :is="getComponent(activeTab)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'concentrix',
})

// 컴포넌트 import
import Colors from './colors.vue'
import Typography from './typography.vue'
import Buttons from './buttons.vue'
import Tabs from './tabs.vue'
import Title from './title.vue'

// 탭 섹션 정의
const sections = [
  { id: 'colors', title: 'Colors' },
  { id: 'typography', title: 'Typography' },
  { id: 'buttons', title: 'Buttons' },
  { id: 'tabs', title: 'Tabs' },
  { id: 'title', title: 'Title' }
]

// 활성 탭을 추적
const activeTab = ref('colors') // 기본적으로 첫 번째 탭 활성화

// 탭 변경 함수
const setActiveTab = (tabId) => {
  activeTab.value = tabId
}

// 컴포넌트 매핑 함수
const getComponent = (sectionId) => {
  const componentMap = {
    colors: Colors,
    typography: Typography,
    buttons: Buttons,
    tabs: Tabs,
    title: Title
  }
  return componentMap[sectionId] || null
}
</script>

<style lang="scss" scoped>
@use '~/layouts/scss/cnx.scss' as *;
@use '~/layouts/scss/cnx/_variables' as *;

.styleguide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.styleguide-header {
  text-align: center;
  margin-bottom: 60px;
  
  .styleguide-title {
    font-size: 48px;
    font-weight: 700;
    color: $p-blue;
    margin-bottom: 16px;
  }
  
  .styleguide-description {
    font-size: 18px;
    color: $n-dark-gray;
    max-width: 600px;
    margin: 0 auto;
  }
}

// 탭 스타일
.tab-container {
  .tab-header {
    display: flex;
    border-bottom: 2px solid $n-gray;
    margin-bottom: 32px;
    overflow-x: auto;
    
    .tab-button {
      padding: 16px 24px;
      border: none;
      background: transparent;
      color: $n-dark-gray;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      border-bottom: 3px solid transparent;
      transition: all 0.2s ease;
      white-space: nowrap;
      
      &:hover {
        color: $p-blue;
        background: $n-gray;
      }
      
      &.is-active {
        color: $p-blue;
        border-bottom-color: $p-blue;
        background: $n-gray;
        font-weight: 600;
      }
    }
  }
  
  .tab-content {
    min-height: 400px;
  }
}

// 반응형
@media (max-width: 1023px) {
  .styleguide {
    padding: 20px 16px;
  }
  
  .styleguide-header .styleguide-title {
    font-size: 32px;
  }
  
  .tab-container .tab-header {
    .tab-button {
      padding: 12px 16px;
      font-size: 14px;
    }
  }
  
  .tab-container .tab-content {
    min-height: 300px;
  }
}
</style>