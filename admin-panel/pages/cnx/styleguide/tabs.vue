<template>
  <div class="styleguide-section">
    <div class="tabs-showcase">
      <!-- 기본 탭 예시 -->
      <div class="example-section">
        <h3 class="example-title">기본 탭</h3>
        <p class="example-description">기본적인 탭 컴포넌트 사용 예시입니다.</p>
        
        <AppTab 
          v-model="activeTab1" 
          :tabs="basicTabs"
          @tab-change="handleTabChange"
        >
          <template #business>
            <div class="tab-content-demo">
              #tab1 test content
            </div>
          </template>
          <template #service>
            <div class="tab-content-demo">
              #tab2 test content
            </div>
          </template>
        </AppTab>
      </div>


      <!-- 사용법 가이드 -->
      <div class="usage-section">
        <h3 class="example-title">사용법</h3>
        <div class="code-example">
          <pre><code>&lt;AppTab 
  v-model="activeTab" 
  :tabs="[
    { label: 'Digital & Technology Business', slot: 'business' },
    { label: 'Customer Service', slot: 'service' }
  ]"
  @tab-change="handleTabChange"
&gt;
  &lt;template #business&gt;
    &lt;!-- 비즈니스 탭 내용 --&gt;
  &lt;/template&gt;
  &lt;template #service&gt;
    &lt;!-- 서비스 탭 내용 --&gt;
  &lt;/template&gt;
&lt;/AppTab&gt;</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppTab from '~/components/cnx/AppTab.vue'

// 부모 컴포넌트에서 레이아웃이 설정됨

// 탭 상태
const activeTab1 = ref(0)

// 탭 데이터
const basicTabs = [
  { label: 'Digital & Technology Business', slot: 'business' },
  { label: 'Customer Service', slot: 'service' }
]

// 이벤트 핸들러
const handleTabChange = (event) => {
  console.log('Tab changed:', event)
}
</script>

<style lang="scss" scoped>
@use '~/layouts/scss/cnx.scss' as *;
@use '~/layouts/scss/cnx/_variables' as *;
@use '~/layouts/scss/cnx/_mixins' as *;

.styleguide-section {
  margin-bottom: 80px;
}

.tabs-showcase {
  .example-section {
    margin-bottom: 60px;
    
    .example-title {
      @include body-01;
      color: $p-blue;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid $n-gray;
    }
    
    .example-description {
      @include body-03;
      color: $n-dark-gray;
      margin-bottom: 24px;
    }
  }
  
  
  .usage-section {
    margin-top: 60px;
    padding-top: 40px;
    border-top: 2px solid $n-gray;
    
    .example-title {
      @include body-01;
      color: $p-blue;
      margin-bottom: 20px;
    }
    
    .code-example {
      background: $n-gray;
      border-radius: 8px;
      padding: 20px;
      overflow-x: auto;
      
      pre {
        margin: 0;
        
        code {
          @include body-03;
          font-family: 'Courier New', monospace;
          color: $n-dark-gray;
          line-height: 1.6;
        }
      }
    }
  }
}

// 반응형
@media (max-width: 768px) {
  .tabs-showcase {
    .example-section {
      margin-bottom: 40px;
    }
    
    .tab-content-demo {
      padding: 16px;
    }
    
    .usage-section {
      margin-top: 40px;
      padding-top: 30px;
      
      .code-example {
        padding: 16px;
      }
    }
  }
}
</style>
