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

    <div class="tabs-showcase">
      <!-- 버튼 탭 예시 -->
      <div class="example-section">
        <h3 class="example-title">버튼 탭</h3>
        <p class="example-description">버튼 탭 컴포넌트 사용 예시입니다.</p>


        <AppButtonTab v-model="activeButtonTab2" :tabs="tabs2" alignment="center" @tab-change="handleButtonTabChange">
          <template #tab-0>중앙 정렬 첫번째 탭 컨텐츠</template>
          <template #tab-1>중앙 정렬 두번째 탭 컨텐츠</template>
          <template #tab-2>중앙 정렬 세번째 탭 컨텐츠</template>
        </AppButtonTab>
      </div>


      <!-- 사용법 가이드 -->
      <div class="usage-section">
        <h3 class="example-title">사용법</h3>
        <div class="code-example">
          <pre><code>&lt;AppButtonTab 
  v-model="activeButtonTab" 
  :tabs="[
    { text: '강남센터' },
    { text: '강남2센터' },
    { text: '용산센터' }
  ]"
  &lt;!-- default=left / center 또는 right 적용 가능 --&gt;
  alignment="center"
  @tab-change="handleButtonTabChange"
&gt;
  &lt;template #tab-0&gt;
    &lt;!-- 첫번째 탭 내용 --&gt;
  &lt;/template&gt;
  &lt;template #tab-1&gt;
    &lt;!-- 두번째 탭 내용 --&gt;
  &lt;/template&gt;
  &lt;template #tab-2&gt;
    &lt;!-- 세번째 탭 내용 --&gt;
  &lt;/template&gt;
&lt;/AppButtonTab&gt;</code></pre>
        </div>
        
        <div class="props-info">
          <h4 class="props-title">Props</h4>
          <ul class="props-list">
            <li><strong>tabs:</strong> 탭 데이터 배열 (각 객체는 text 속성 필요)</li>
            <li><strong>alignment:</strong> 탭 정렬 방식 / 기본값 사용시 alignment 필요X / alignment="center", "right" 적용 가능</li>
            <li><strong>v-model:</strong> 활성 탭 인덱스</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppTab from '~/components/cnx/AppTab.vue'
import AppButtonTab from '~/components/cnx/AppButtonTab.vue'

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

const activeButtonTab1 = ref(0);
const activeButtonTab2 = ref(0);

const tabs1 = [
    { text: '강남센터' },
    { text: '강남2센터' },
    { text: '용산센터' }
];

const tabs2 = [
    { text: '신도림센터' },
    { text: '구로센터' },
    { text: '문래센터' }
];

const handleButtonTabChange = (event) => {
  console.log('Button Tab changed:', event)
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
  &:nth-child(n+2) {
    margin-top: 60px;
  }
  
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
  
  .props-info {
    margin-top: 30px;
    
    .props-title {
      @include body-02;
      color: $p-blue;
      margin-bottom: 16px;
    }
    
    .props-list {
      list-style: none;
      padding: 0;
      margin: 0;
      
      li {
        @include body-03;
        color: $n-dark-gray;
        margin-bottom: 8px;
        padding-left: 16px;
        position: relative;
        
        &::before {
          content: '•';
          color: $p-blue;
          position: absolute;
          left: 0;
        }
        
        strong {
          color: $p-blue;
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
