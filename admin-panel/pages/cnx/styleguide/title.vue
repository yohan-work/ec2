<template>
  <div class="styleguide-section">
    <!-- 토스트 알림 -->
    <AppToast 
      :show="showToast" 
      :message="toastMessage" 
      variant="default"
      @close="showToast = false"
    />

    <div class="title-palette">
      <!-- 제목 + 설명 -->
      <div class="title-category">
        <h3 class="category-title">제목 + 설명</h3>
        <div class="title-item">
          <div class="title-preview">
            <AppTitle 
              title="기본 제목입니다"
              text="이것은 기본 제목의 설명입니다. 사용자에게 추가 정보를 제공합니다."
            />
          </div>
          <div class="title-info">
            <span class="title-name">기본 제목</span>
            <span class="title-code">title + text</span>
            <span class="title-variable" @click="copyVariable('&lt;AppTitle title=&quot;기본 제목입니다&quot; text=&quot;이것은 기본 제목의 설명입니다. 사용자에게 추가 정보를 제공합니다.&quot; /&gt;')" :title="'클릭하여 복사'">&lt;AppTitle title="기본 제목입니다" text="이것은 기본 제목의 설명입니다. 사용자에게 추가 정보를 제공합니다." /&gt;</span>
          </div>
        </div>
        <div class="code-examples">
          <pre><code>&lt;AppTitle 
  title="기본 제목입니다"
  text="이것은 기본 제목의 설명입니다. 사용자에게 추가 정보를 제공합니다."
/&gt;</code></pre>
        </div>
      </div>

      <!-- 제목만 -->
      <div class="title-category">
        <h3 class="category-title">제목만</h3>
        <div class="title-item">
          <div class="title-preview">
            <AppTitle title="설명이 없는 제목입니다" />
          </div>
          <div class="title-info">
            <span class="title-name">제목만</span>
            <span class="title-code">title only</span>
            <span class="title-variable" @click="copyVariable('&lt;AppTitle title=&quot;설명이 없는 제목입니다&quot; /&gt;')" :title="'클릭하여 복사'">&lt;AppTitle title="설명이 없는 제목입니다" /&gt;</span>
          </div>
        </div>
        <div class="code-examples">
          <pre><code>&lt;AppTitle title="설명이 없는 제목입니다" /&gt;</code></pre>
        </div>
      </div>

      <!-- 설명만 -->
      <div class="title-category">
        <h3 class="category-title">설명만</h3>
        <div class="title-item">
          <div class="title-preview">
            <AppTitle text="제목 없이 설명만 있는 경우입니다. 이런 경우는 일반적이지 않지만 가능합니다." />
          </div>
          <div class="title-info">
            <span class="title-name">설명만</span>
            <span class="title-code">text only</span>
            <span class="title-variable" @click="copyVariable('&lt;AppTitle text=&quot;제목 없이 설명만 있는 경우입니다.&quot; /&gt;')" :title="'클릭하여 복사'">&lt;AppTitle text="제목 없이 설명만 있는 경우입니다." /&gt;</span>
          </div>
        </div>
        <div class="code-examples">
          <pre><code>&lt;AppTitle text="제목 없이 설명만 있는 경우입니다." /&gt;</code></pre>
        </div>
      </div>

      <!-- HTML 태그 사용 -->
      <div class="title-category">
        <h3 class="category-title">HTML 태그 사용</h3>
        <div class="title-item">
          <div class="title-preview">
            <AppTitle 
              title="HTML 태그가 포함된 제목입니다<br>줄바꿈이 포함된 제목"
              text="여러 줄로 구성된 설명입니다.<br>줄바꿈이 포함된 설명입니다."
            />
          </div>
          <div class="title-info">
            <span class="title-name">HTML 태그</span>
            <span class="title-code">HTML tags</span>
            <span class="title-variable" @click="copyVariable('&lt;AppTitle title=&quot;HTML 태그가 포함된 제목입니다&lt;br&gt;줄바꿈이 포함된 제목&quot; text=&quot;여러 줄로 구성된 설명입니다.&lt;br&gt;줄바꿈이 포함된 설명입니다.&quot; /&gt;')" :title="'클릭하여 복사'">&lt;AppTitle title="HTML 태그가 포함된 제목입니다&lt;br&gt;줄바꿈이 포함된 제목" text="여러 줄로 구성된 설명입니다.&lt;br&gt;줄바꿈이 포함된 설명입니다." /&gt;</span>
          </div>
        </div>
        <div class="code-examples">
          <pre><code>&lt;AppTitle 
  title="HTML 태그가 포함된 제목입니다&lt;br&gt;줄바꿈이 포함된 제목"
  text="여러 줄로 구성된 설명입니다.&lt;br&gt;줄바꿈이 포함된 설명입니다."
/&gt;</code></pre>
        </div>
      </div>

      <!-- 가운데 정렬 -->
      <div class="title-category">
        <h3 class="category-title">가운데 정렬 (기본값)</h3>
        <div class="title-item">
          <div class="title-preview">
            <AppTitle 
              title="가운데 정렬 제목"
              text="기본 값은 가운데 정렬된 설명입니다."
            />
          </div>
          <div class="title-info">
            <span class="title-name">가운데 정렬</span>
            <span class="title-code">default align</span>
            <span class="title-variable" @click="copyVariable('&lt;AppTitle title=&quot;가운데 정렬 제목&quot; text=&quot;기본 값은 가운데 정렬된 설명입니다.&quot; /&gt;')" :title="'클릭하여 복사'">&lt;AppTitle title="가운데 정렬 제목" text="기본 값은 가운데 정렬된 설명입니다." /&gt;</span>
          </div>
        </div>
        <div class="code-examples">
          <pre><code>&lt;AppTitle title="가운데 정렬 제목" text="기본 값은 가운데 정렬된 설명입니다." /&gt;</code></pre>
        </div>
      </div>

      <!-- 왼쪽 정렬 -->
      <div class="title-category">
        <h3 class="category-title">왼쪽 정렬</h3>
        <div class="title-item">
          <div class="title-preview">
            <AppTitle 
              title="왼쪽 정렬 제목"
              text="왼쪽 정렬된 설명입니다."
              align="left"
            />
          </div>
          <div class="title-info">
            <span class="title-name">왼쪽 정렬</span>
            <span class="title-code">align="left"</span>
            <span class="title-variable" @click="copyVariable('&lt;AppTitle title=&quot;왼쪽 정렬 제목&quot; text=&quot;왼쪽 정렬된 설명입니다.&quot; align=&quot;left&quot; /&gt;')" :title="'클릭하여 복사'">&lt;AppTitle title="왼쪽 정렬 제목" text="왼쪽 정렬된 설명입니다." align="left" /&gt;</span>
          </div>
        </div>
        <div class="code-examples">
          <pre><code>&lt;AppTitle title="왼쪽 정렬 제목" text="왼쪽 정렬된 설명입니다." align="left" /&gt;</code></pre>
        </div>
      </div>
      
      <!-- 오른쪽 정렬 -->
      <div class="title-category">
        <h3 class="category-title">오른쪽 정렬</h3>
        <div class="title-item">
          <div class="title-preview">
            <AppTitle 
              title="오른쪽 정렬 제목"
              text="오른쪽 정렬된 설명입니다."
              align="right"
            />
          </div>
          <div class="title-info">
            <span class="title-name">오른쪽 정렬</span>
            <span class="title-code">align="right"</span>
            <span class="title-variable" @click="copyVariable('&lt;AppTitle title=&quot;오른쪽 정렬 제목&quot; text=&quot;오른쪽 정렬된 설명입니다.&quot; align=&quot;right&quot; /&gt;')" :title="'클릭하여 복사'">&lt;AppTitle title="오른쪽 정렬 제목" text="오른쪽 정렬된 설명입니다." align="right" /&gt;</span>
          </div>
        </div>
        <div class="code-examples">
          <pre><code>&lt;AppTitle title="오른쪽 정렬 제목" text="오른쪽 정렬된 설명입니다." align="right" /&gt;</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppTitle from '~/components/cnx/AppTitle.vue'
import AppToast from '~/components/cnx/AppToast.vue'

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

.title-palette {
  display: flex;
  flex-direction: column;
  gap: 40px;
  
  .title-category {
    margin-bottom: 40px;
    
    .category-title {
      @include body-01;
      color: $p-blue;
      margin-bottom: 20px;
      padding-bottom: 8px;
      border-bottom: 1px solid $n-gray;
    }
  }
}

.title-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  
  .title-preview {
    width: 100%;
    min-height: 80px;
    margin-bottom: 16px;
    padding: 20px;
    background-color: $gray-3;
    border-radius: 8px;
    border: 1px solid #e9ecef;
    
    // AppTitle 컴포넌트의 배경을 투명하게 하기 위한 스타일
    :deep(.app-title) {
      background: transparent;
      padding: 0;
      max-width: none;
      margin: 0;
    }
  }
  
  .title-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    align-items: center;
    text-align: center;
    
    .title-name {
      @include body-02;
      font-weight: 600;
      color: $n-dark-gray;
    }
    
    .title-code {
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
    
    .title-variable {
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
      font-size: 10px;
      word-break: break-all;
      
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

.code-examples {
  margin-top: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  overflow: hidden;

  pre {
    margin: 0;
    padding: 20px;
    background-color: #f2f2f2;
    color: #000;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 14px;
    line-height: 1.6;
    overflow-x: auto;

    code {
      background: none;
      padding: 0;
      font-size: inherit;
      color: inherit;
    }
  }
}

@media (max-width: 1023px) {
  .title-palette {
    gap: 20px;
  }
  
  .title-item {
    padding: 16px;
    
    .title-preview {
      min-height: 60px;
    }
  }
}

@media (max-width: 768px) {
  .title-item {
    padding: 12px;
    
    .title-preview {
      min-height: 50px;
      margin-bottom: 12px;
    }
    
    .title-info {
      gap: 6px;
      
      .title-name {
        font-size: 12px;
      }
      
      .title-code,
      .title-variable {
        font-size: 10px;
        padding: 4px 6px;
      }
    }
  }
}
</style>