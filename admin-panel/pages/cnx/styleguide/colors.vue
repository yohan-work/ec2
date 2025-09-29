<template>
  <div class="styleguide-section">
    <!-- 토스트 알림 -->
    <AppToast 
      :show="showToast" 
      :message="toastMessage" 
      variant="default"
      @close="showToast = false"
    />

    <div class="color-palette">
      <!-- Default Colors -->
      <div class="color-category">
        <h3 class="category-title">Default Colors</h3>
        <div class="color-items">
          <div class="color-item">
            <div class="color-swatch color-white"></div>
            <div class="color-info">
              <span class="color-name">White</span>
              <span class="color-code">#fff</span>
              <span class="color-variable" @click="copyVariable('$d-white')" :title="'클릭하여 복사: $d-white'">$d-white</span>
            </div>
          </div>
          <div class="color-item">
            <div class="color-swatch color-black"></div>
            <div class="color-info">
              <span class="color-name">Black</span>
              <span class="color-code">#000</span>
              <span class="color-variable" @click="copyVariable('$d-black')" :title="'클릭하여 복사: $d-black'">$d-black</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Primary Colors -->
      <div class="color-category">
        <h3 class="category-title">Primary Colors</h3>
        <div class="color-items">
          <div class="color-item">
            <div class="color-swatch color-primary-blue"></div>
            <div class="color-info">
              <span class="color-name">Unifying Blue</span>
              <span class="color-code">#003d5b</span>
              <span class="color-variable" @click="copyVariable('$p-blue')" :title="'클릭하여 복사: $p-blue'">$p-blue</span>
            </div>
          </div>
          <div class="color-item">
            <div class="color-swatch color-primary-green"></div>
            <div class="color-info">
              <span class="color-name">Jade Green</span>
              <span class="color-code">#007380</span>
              <span class="color-variable" @click="copyVariable('$p-green')" :title="'클릭하여 복사: $p-green'">$p-green</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Secondary Colors -->
      <div class="color-category">
        <h3 class="category-title">Secondary Colors</h3>
        <div class="color-items">
          <div class="color-item">
            <div class="color-swatch color-secondary-teal"></div>
            <div class="color-info">
              <span class="color-name">Seafoam Teal</span>
              <span class="color-code">#25e2cc</span>
              <span class="color-variable" @click="copyVariable('$s-teal')" :title="'클릭하여 복사: $s-teal'">$s-teal</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Accent Colors -->
      <div class="color-category">
        <h3 class="category-title">Accent Colors</h3>
        <div class="color-items">
          <div class="color-item">
            <div class="color-swatch color-accent-pink"></div>
            <div class="color-info">
              <span class="color-name">Raspberry Pink</span>
              <span class="color-code">#cc3262</span>
              <span class="color-variable" @click="copyVariable('$a-pink')" :title="'클릭하여 복사: $a-pink'">$a-pink</span>
            </div>
          </div>
          <div class="color-item">
            <div class="color-swatch color-accent-orange"></div>
            <div class="color-info">
              <span class="color-name">Tangerine Orange</span>
              <span class="color-code">#ff8a00</span>
              <span class="color-variable" @click="copyVariable('$a-orange')" :title="'클릭하여 복사: $a-orange'">$a-orange</span>
            </div>
          </div>
          <div class="color-item">
            <div class="color-swatch color-accent-yellow"></div>
            <div class="color-info">
              <span class="color-name">Sunshine Yellow</span>
              <span class="color-code">#fbca18</span>
              <span class="color-variable" @click="copyVariable('$a-yellow')" :title="'클릭하여 복사: $a-yellow'">$a-yellow</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Neutral Colors -->
      <div class="color-category">
        <h3 class="category-title">Neutral Colors</h3>
        <div class="color-items">
          <div class="color-item">
            <div class="color-swatch color-gray-1"></div>
            <div class="color-info">
              <span class="color-name">Gray 1</span>
              <span class="color-code">#86868B</span>
              <span class="color-variable" @click="copyVariable('$gray-1')" :title="'클릭하여 복사: $gray-1'">$gray-1</span>
            </div>
          </div>
          <div class="color-item">
            <div class="color-swatch color-gray-2"></div>
            <div class="color-info">
              <span class="color-name">Gray 2</span>
              <span class="color-code">#CCCCCC</span>
              <span class="color-variable" @click="copyVariable('$gray-2')" :title="'클릭하여 복사: $gray-2'">$gray-2</span>
            </div>
          </div>
          <div class="color-item">
            <div class="color-swatch color-gray-3"></div>
            <div class="color-info">
              <span class="color-name">Gray 3</span>
              <span class="color-code">#EEEEEE</span>
              <span class="color-variable" @click="copyVariable('$gray-3')" :title="'클릭하여 복사: $gray-3'">$gray-3</span>
            </div>
          </div>
          <div class="color-item">
            <div class="color-swatch color-gray-4"></div>
            <div class="color-info">
              <span class="color-name">Gray 4</span>
              <span class="color-code">#A2A2A2</span>
              <span class="color-variable" @click="copyVariable('$gray-4')" :title="'클릭하여 복사: $gray-4'">$gray-4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppToast from '~/components/cnx/AppToast.vue'

// 부모 컴포넌트에서 레이아웃이 설정됨

// 토스트 상태
const showToast = ref(false)
const toastMessage = ref('')

// 토스트 표시 함수
const showToastMessage = (message) => {
  toastMessage.value = message
  showToast.value = true
}

// 복사 기능
const copyVariable = async (variable) => {
  try {
    await navigator.clipboard.writeText(variable)
    showToastMessage(`${variable} 복사됨!`)
  } catch (err) {
    console.error('복사 실패:', err)
    // 폴백: 텍스트 선택
    const textArea = document.createElement('textarea')
    textArea.value = variable
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    showToastMessage(`${variable} 복사됨!`)
  }
}
</script>

<style lang="scss" scoped>
@use '~/layouts/scss/cnx.scss' as *;
@use '~/layouts/scss/cnx/_variables' as *;
@use '~/layouts/scss/cnx/_mixins' as *;

.styleguide-section {
  margin-bottom: 80px;
}

.color-palette {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  
  .color-category {
    margin-bottom: 40px;
    
    .category-title {
      @include body-01;
      color: $p-blue;
      margin-bottom: 20px;
      padding-bottom: 8px;
      border-bottom: 1px solid $n-gray;
    }
    
    .color-items {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
  }
}

.color-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  
  .color-swatch {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    border: 1px solid $gray-1;
    margin-bottom: 16px;
    
    // Color classes using SCSS variables
    &.color-white {
      background-color: $d-white;
    }
    
    &.color-black {
      background-color: $d-black;
    }
    
    &.color-primary-blue {
      background-color: $p-blue;
    }
    
    &.color-primary-green {
      background-color: $p-green;
    }
    
    &.color-secondary-teal {
      background-color: $s-teal;
    }
    
    &.color-accent-pink {
      background-color: $a-pink;
    }
    
    &.color-accent-orange {
      background-color: $a-orange;
    }
    
    &.color-accent-yellow {
      background-color: $a-yellow;
    }
    
    &.color-neutral-gray {
      background-color: $n-gray;
    }
    
    &.color-neutral-dark-gray {
      background-color: $n-dark-gray;
    }
    // 반복문 대신 SCSS @each를 사용한 예시
    &.color-gray-1 {
      background-color: $gray-1;
    }
    &.color-gray-2 {
      background-color: $gray-2;
    }
    &.color-gray-3 {
      background-color: $gray-3;
    }
    &.color-gray-4 {
      background-color: $gray-4;
    }
  }
  
  .color-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    align-items: center;
    text-align: center;
    
    .color-name {
      @include body-02;
      font-weight: 600;
      color: $n-dark-gray;
    }
    
    .color-code {
      @include body-03;
      color: $n-dark-gray;
      background: $n-gray;
      padding: 6px 10px;
      border-radius: 4px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: fit-content;
      height: auto;
    }
    
    .color-variable {
      @include body-03;
      color: $n-dark-gray;
      background: $n-gray;
      padding: 6px 10px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s ease;
      user-select: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: fit-content;
      height: auto;
      
      &:hover {
        background: $p-blue;
        color: $d-white;
        transform: scale(1.05);
      }
      
      &:active {
        transform: scale(0.95);
      }
    }
  }
}

@media (max-width: 1023px) {
  .color-palette {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .color-palette .color-category .color-items {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .color-item {
    padding: 16px;
    
    .color-swatch {
      width: 60px;
      height: 60px;
    }
  }
}

@media (max-width: 768px) {
  .color-palette .color-category .color-items {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
  
  .color-item {
    padding: 12px;
    
    .color-swatch {
      width: 50px;
      height: 50px;
      margin-bottom: 12px;
    }
    
    .color-info {
      gap: 6px;
      
      .color-name {
        font-size: 12px;
      }
      
      .color-code,
      .color-variable {
        font-size: 10px;
        padding: 4px 6px;
      }
    }
  }
}

</style>
