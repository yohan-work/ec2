<template>
  <div class="styleguide-section">
    <!-- 토스트 알림 -->
    <AppToast 
      :show="showToast" 
      :message="toastMessage" 
      variant="default"
      @close="showToast = false"
    />

    <div class="button-palette">
      <!-- 기본 버튼들 (기본 hover 효과 포함) -->
      <div class="button-category">
        <h3 class="category-title">기본 버튼 (기본 hover 효과)</h3>
        <div class="button-items">
          <div class="button-item">
            <div class="button-preview">
              <AppButton text="기본 버튼" />
            </div>
            <div class="button-info">
              <span class="button-name">기본 버튼</span>
              <span class="button-code">기본 hover 효과</span>
              <span class="button-variable" @click="copyVariable('&lt;AppButton text=&quot;기본 버튼&quot; /&gt;')" :title="'클릭하여 복사'">&lt;AppButton text="기본 버튼" /&gt;</span>
            </div>
          </div>
          <div class="button-item">
            <div class="button-preview">
              <AppButton text="그린 버튼" color="green" />
            </div>
            <div class="button-info">
              <span class="button-name">그린 버튼</span>
              <span class="button-code">color="green"</span>
              <span class="button-variable" @click="copyVariable('&lt;AppButton text=&quot;그린 버튼&quot; color=&quot;green&quot; /&gt;')" :title="'클릭하여 복사'">&lt;AppButton text="그린 버튼" color="green" /&gt;</span>
            </div>
          </div>
          <div class="button-item">
            <div class="button-preview">
              <AppButton text="틸 버튼" color="teal" />
            </div>
            <div class="button-info">
              <span class="button-name">틸 버튼</span>
              <span class="button-code">color="teal"</span>
              <span class="button-variable" @click="copyVariable('&lt;AppButton text=&quot;틸 버튼&quot; color=&quot;teal&quot; /&gt;')" :title="'클릭하여 복사'">&lt;AppButton text="틸 버튼" color="teal" /&gt;</span>
            </div>
          </div>
          <div class="button-item">
            <div class="button-preview">
              <AppButton text="화이트 버튼" color="white" />
            </div>
            <div class="button-info">
              <span class="button-name">화이트 버튼</span>
              <span class="button-code">color="white"</span>
              <span class="button-variable" @click="copyVariable('&lt;AppButton text=&quot;화이트 버튼&quot; color=&quot;white&quot; /&gt;')" :title="'클릭하여 복사'">&lt;AppButton text="화이트 버튼" color="white" /&gt;</span>
            </div>
          </div>
        </div>
        <div class="code-examples">
          <pre><code>&lt;!-- 기본 버튼 (기본적으로 왼쪽에서 오른쪽으로 hover 효과) --&gt;
&lt;AppButton text="기본 버튼" /&gt;

&lt;!-- 색상 지정 버튼 --&gt;
&lt;AppButton text="그린 버튼" color="green" /&gt;

&lt;AppButton text="틸 버튼" color="teal" /&gt;

&lt;AppButton text="화이트 버튼" color="white" /&gt;</code></pre>
        </div>
      </div>

      <!-- 화살표 버튼들 -->
      <div class="button-category">
        <h3 class="category-title">화살표 버튼</h3>
        <div class="button-items">
          <div class="button-item">
            <div class="button-preview">
              <AppButton text="뉴스레터 보기" to="#" arrow />
            </div>
            <div class="button-info">
              <span class="button-name">뉴스레터 보기</span>
              <span class="button-code">to + arrow</span>
              <span class="button-variable" @click="copyVariable('&lt;AppButton text=&quot;뉴스레터 보기&quot; to=&quot;/newsletters&quot; arrow /&gt;')" :title="'클릭하여 복사'">&lt;AppButton text="뉴스레터 보기" to="/newsletters" arrow /&gt;</span>
            </div>
          </div>
          <div class="button-item">
            <div class="button-preview">
              <AppButton text="그린 더보기" to="#" color="green" arrow />
            </div>
            <div class="button-info">
              <span class="button-name">그린 더보기</span>
              <span class="button-code">color + arrow</span>
              <span class="button-variable" @click="copyVariable('&lt;AppButton text=&quot;그린 더보기&quot; to=&quot;/newsletters&quot; color=&quot;green&quot; arrow /&gt;')" :title="'클릭하여 복사'">&lt;AppButton text="그린 더보기" to="/newsletters" color="green" arrow /&gt;</span>
            </div>
          </div>
          <div class="button-item">
            <div class="button-preview">
              <AppButton text="틸 더보기" to="#" color="teal" arrow />
            </div>
            <div class="button-info">
              <span class="button-name">틸 더보기</span>
              <span class="button-code">color + arrow</span>
              <span class="button-variable" @click="copyVariable('&lt;AppButton text=&quot;틸 더보기&quot; to=&quot;/newsletters&quot; color=&quot;teal&quot; arrow /&gt;')" :title="'클릭하여 복사'">&lt;AppButton text="틸 더보기" to="/newsletters" color="teal" arrow /&gt;</span>
            </div>
          </div>
          <div class="button-item">
            <div class="button-preview">
              <AppButton text="화이트 더보기" to="#" color="white" arrow />
            </div>
            <div class="button-info">
              <span class="button-name">화이트 더보기</span>
              <span class="button-code">color + arrow</span>
              <span class="button-variable" @click="copyVariable('&lt;AppButton text=&quot;화이트 더보기&quot; to=&quot;/newsletters&quot; color=&quot;white&quot; arrow /&gt;')" :title="'클릭하여 복사'">&lt;AppButton text="화이트 더보기" to="/newsletters" color="white" arrow /&gt;</span>
            </div>
          </div>
          <div class="button-item">
            <div class="button-preview">
              <AppButton text="반전 화살표" to="#" arrow="reverse" />
            </div>
            <div class="button-info">
              <span class="button-name">반전 화살표</span>
              <span class="button-code">arrow="reverse"</span>
              <span class="button-variable" @click="copyVariable('&lt;AppButton text=&quot;반전 화살표&quot; to=&quot;/newsletters&quot; arrow=&quot;reverse&quot; /&gt;')" :title="'클릭하여 복사'">&lt;AppButton text="반전 화살표" to="/newsletters" arrow="reverse" /&gt;</span>
            </div>
          </div>
          <div class="button-item">
            <div class="button-preview">
              <AppButton text="그린 반전" to="#" color="green" arrow="reverse" />
            </div>
            <div class="button-info">
              <span class="button-name">그린 반전</span>
              <span class="button-code">color + reverse</span>
              <span class="button-variable" @click="copyVariable('&lt;AppButton text=&quot;그린 반전&quot; to=&quot;/newsletters&quot; color=&quot;green&quot; arrow=&quot;reverse&quot; /&gt;')" :title="'클릭하여 복사'">&lt;AppButton text="그린 반전" to="/newsletters" color="green" arrow="reverse" /&gt;</span>
            </div>
          </div>
        </div>
        <div class="code-examples">
          <pre><code>&lt;!-- 내부 링크 (화살표 명시적) --&gt;
&lt;AppButton text="뉴스레터 보기" to="/newsletters" arrow /&gt;

&lt;AppButton text="더보기" to="/newsletters" arrow /&gt;

&lt;!-- 색상과 화살표 조합 --&gt;
&lt;AppButton text="그린 더보기" to="/newsletters" color="green" arrow /&gt;

&lt;AppButton text="틸 더보기" to="/newsletters" color="teal" arrow /&gt;

&lt;AppButton text="화이트 더보기" to="/newsletters" color="white" arrow /&gt;

&lt;!-- 반전 화살표 --&gt;
&lt;AppButton text="반전 화살표" to="/newsletters" arrow="reverse" /&gt;

&lt;AppButton text="그린 반전" to="/newsletters" color="green" arrow="reverse" /&gt;</code></pre>
        </div>
      </div>

      <!-- 원형 버튼들 -->
      <div class="button-category">
        <h3 class="category-title">원형 버튼</h3>
        <div class="button-items">
          <div class="button-item">
            <div class="button-preview">
              <AppButton text="+" variant="circle" />
            </div>
            <div class="button-info">
              <span class="button-name">기본 원형</span>
              <span class="button-code">variant="circle"</span>
              <span class="button-variable" @click="copyVariable('&lt;AppButton text=&quot;+&quot; variant=&quot;circle&quot; /&gt;')" :title="'클릭하여 복사'">&lt;AppButton text="+" variant="circle" /&gt;</span>
            </div>
          </div>
          <div class="button-item">
            <div class="button-preview">
              <AppButton text="+" variant="circle" color="green" />
            </div>
            <div class="button-info">
              <span class="button-name">그린 원형</span>
              <span class="button-code">color="green"</span>
              <span class="button-variable" @click="copyVariable('&lt;AppButton text=&quot;+&quot; variant=&quot;circle&quot; color=&quot;green&quot; /&gt;')" :title="'클릭하여 복사'">&lt;AppButton text="+" variant="circle" color="green" /&gt;</span>
            </div>
          </div>
          <div class="button-item">
            <div class="button-preview">
              <AppButton text="+" variant="circle" color="teal" />
            </div>
            <div class="button-info">
              <span class="button-name">틸 원형</span>
              <span class="button-code">color="teal"</span>
              <span class="button-variable" @click="copyVariable('&lt;AppButton text=&quot;+&quot; variant=&quot;circle&quot; color=&quot;teal&quot; /&gt;')" :title="'클릭하여 복사'">&lt;AppButton text="+" variant="circle" color="teal" /&gt;</span>
            </div>
          </div>
          <div class="button-item">
            <div class="button-preview">
              <AppButton text="+" variant="circle" color="white" />
            </div>
            <div class="button-info">
              <span class="button-name">화이트 원형</span>
              <span class="button-code">color="white"</span>
              <span class="button-variable" @click="copyVariable('&lt;AppButton text=&quot;+&quot; variant=&quot;circle&quot; color=&quot;white&quot; /&gt;')" :title="'클릭하여 복사'">&lt;AppButton text="+" variant="circle" color="white" /&gt;</span>
            </div>
          </div>
          <div class="button-item">
            <div class="button-preview">
              <AppButton variant="circle" to="#" arrow />
            </div>
            <div class="button-info">
              <span class="button-name">원형 화살표</span>
              <span class="button-code">arrow</span>
              <span class="button-variable" @click="copyVariable('&lt;AppButton variant=&quot;circle&quot; to=&quot;/path&quot; arrow /&gt;')" :title="'클릭하여 복사'">&lt;AppButton variant="circle" to="/path" arrow /&gt;</span>
            </div>
          </div>
          <div class="button-item">
            <div class="button-preview">
              <AppButton variant="circle" to="#" arrow="reverse" />
            </div>
            <div class="button-info">
              <span class="button-name">원형 반전</span>
              <span class="button-code">arrow="reverse"</span>
              <span class="button-variable" @click="copyVariable('&lt;AppButton variant=&quot;circle&quot; to=&quot;/path&quot; arrow=&quot;reverse&quot; /&gt;')" :title="'클릭하여 복사'">&lt;AppButton variant="circle" to="/path" arrow="reverse" /&gt;</span>
            </div>
          </div>
        </div>
        <div class="code-examples">
          <pre><code>&lt;!-- 기본 원형 버튼 --&gt;
&lt;AppButton text="+" variant="circle" /&gt;

&lt;!-- 색상 지정 원형 버튼 --&gt;
&lt;AppButton text="+" variant="circle" color="green" /&gt;

&lt;AppButton text="+" variant="circle" color="teal" /&gt;

&lt;AppButton text="+" variant="circle" color="white" /&gt;

&lt;!-- 원형 버튼에 화살표 (명시적) --&gt;
&lt;AppButton variant="circle" to="/path" arrow /&gt;

&lt;!-- 색상과 화살표 조합 --&gt;
&lt;AppButton variant="circle" to="/path" color="green" arrow /&gt;

&lt;!-- 화살표 방향 지정 --&gt;
&lt;AppButton variant="circle" to="/path" arrow arrowDirection="left" /&gt;

&lt;AppButton variant="circle" to="/path" arrow arrowDirection="right" /&gt;

&lt;!-- 반전 화살표 --&gt;
&lt;AppButton variant="circle" to="/path" arrow="reverse" /&gt;

&lt;AppButton variant="circle" to="/path" color="green" arrow="reverse" /&gt;</code></pre>
        </div>
      </div>

      <!-- 호버 효과 버튼들 -->
      <div class="button-category">
        <h3 class="category-title">호버 효과 (명시적 설정)</h3>
        <div class="button-items">
          <div class="button-item">
            <div class="button-preview">
              <AppButton text="기본 왼쪽" effect="left" />
            </div>
            <div class="button-info">
              <span class="button-name">기본 왼쪽</span>
              <span class="button-code">effect="left"</span>
              <span class="button-variable" @click="copyVariable('&lt;AppButton text=&quot;기본 왼쪽&quot; effect=&quot;left&quot; /&gt;')" :title="'클릭하여 복사'">&lt;AppButton text="기본 왼쪽" effect="left" /&gt;</span>
            </div>
          </div>
          <div class="button-item">
            <div class="button-preview">
              <AppButton text="기본 오른쪽" effect="right" />
            </div>
            <div class="button-info">
              <span class="button-name">기본 오른쪽</span>
              <span class="button-code">effect="right"</span>
              <span class="button-variable" @click="copyVariable('&lt;AppButton text=&quot;기본 오른쪽&quot; effect=&quot;right&quot; /&gt;')" :title="'클릭하여 복사'">&lt;AppButton text="기본 오른쪽" effect="right" /&gt;</span>
            </div>
          </div>
          <div class="button-item">
            <div class="button-preview">
              <AppButton text="그린 왼쪽" color="green" effect="left" />
            </div>
            <div class="button-info">
              <span class="button-name">그린 왼쪽</span>
              <span class="button-code">color + effect</span>
              <span class="button-variable" @click="copyVariable('&lt;AppButton text=&quot;그린 왼쪽&quot; color=&quot;green&quot; effect=&quot;left&quot; /&gt;')" :title="'클릭하여 복사'">&lt;AppButton text="그린 왼쪽" color="green" effect="left" /&gt;</span>
            </div>
          </div>
          <div class="button-item">
            <div class="button-preview">
              <AppButton text="틸 오른쪽" color="teal" effect="right" />
            </div>
            <div class="button-info">
              <span class="button-name">틸 오른쪽</span>
              <span class="button-code">color + effect</span>
              <span class="button-variable" @click="copyVariable('&lt;AppButton text=&quot;틸 오른쪽&quot; color=&quot;teal&quot; effect=&quot;right&quot; /&gt;')" :title="'클릭하여 복사'">&lt;AppButton text="틸 오른쪽" color="teal" effect="right" /&gt;</span>
            </div>
          </div>
          <div class="button-item">
            <div class="button-preview">
              <AppButton text="화이트 왼쪽" color="white" effect="left" />
            </div>
            <div class="button-info">
              <span class="button-name">화이트 왼쪽</span>
              <span class="button-code">color + effect</span>
              <span class="button-variable" @click="copyVariable('&lt;AppButton text=&quot;화이트 왼쪽&quot; color=&quot;white&quot; effect=&quot;left&quot; /&gt;')" :title="'클릭하여 복사'">&lt;AppButton text="화이트 왼쪽" color="white" effect="left" /&gt;</span>
            </div>
          </div>
          <div class="button-item">
            <div class="button-preview">
              <AppButton text="반전 화살표 왼쪽" to="#" effect="left" arrow="reverse" />
            </div>
            <div class="button-info">
              <span class="button-name">반전 화살표 왼쪽</span>
              <span class="button-code">effect + reverse</span>
              <span class="button-variable" @click="copyVariable('&lt;AppButton text=&quot;반전 화살표 왼쪽&quot; to=&quot;/newsletters&quot; effect=&quot;left&quot; arrow=&quot;reverse&quot; /&gt;')" :title="'클릭하여 복사'">&lt;AppButton text="반전 화살표 왼쪽" to="/newsletters" effect="left" arrow="reverse" /&gt;</span>
            </div>
          </div>
        </div>
        <div class="code-examples">
          <pre><code>&lt;!-- 기본 호버 효과 (명시적 설정) --&gt;
&lt;AppButton text="기본 왼쪽" effect="left" /&gt;

&lt;AppButton text="기본 오른쪽" effect="right" /&gt;

&lt;!-- 색상과 호버 효과 조합 --&gt;
&lt;AppButton text="그린 왼쪽" color="green" effect="left" /&gt;

&lt;AppButton text="틸 오른쪽" color="teal" effect="right" /&gt;

&lt;!-- 내부 링크와 호버 효과 조합 --&gt;
&lt;AppButton text="내부 링크 왼쪽" to="/newsletters" effect="left" arrow /&gt;

&lt;AppButton text="그린 내부 링크 오른쪽" to="/newsletters" color="green" effect="right" arrow /&gt;

&lt;!-- 틸 내부 링크와 호버 효과 조합 --&gt;
&lt;AppButton text="틸 내부 링크 왼쪽" to="/newsletters" color="teal" effect="left" arrow /&gt;

&lt;AppButton text="틸 내부 링크 오른쪽" to="/newsletters" color="teal" effect="right" arrow /&gt;

&lt;!-- 화이트 색상 호버 효과 --&gt;
&lt;AppButton text="화이트 왼쪽" color="white" effect="left" /&gt;

&lt;AppButton text="화이트 오른쪽" color="white" effect="right" /&gt;

&lt;!-- 화이트 내부 링크와 호버 효과 조합 --&gt;
&lt;AppButton text="화이트 내부 링크 왼쪽" to="/newsletters" color="white" effect="left" arrow /&gt;

&lt;AppButton text="화이트 내부 링크 오른쪽" to="/newsletters" color="white" effect="right" arrow /&gt;

&lt;!-- 반전 화살표와 호버 효과 조합 --&gt;
&lt;AppButton text="반전 화살표 왼쪽" to="/newsletters" effect="left" arrow="reverse" /&gt;

&lt;AppButton text="반전 화살표 오른쪽" to="/newsletters" effect="right" arrow="reverse" /&gt;</code></pre>
        </div>
      </div>

      <!-- 외부 링크 버튼들 -->
      <div class="button-category">
        <h3 class="category-title">외부 링크 버튼</h3>
        <div class="button-items">
          <div class="button-item">
            <div class="button-preview">
              <AppButton text="외부 사이트" href="https://example.com" />
            </div>
            <div class="button-info">
              <span class="button-name">외부 사이트</span>
              <span class="button-code">href</span>
              <span class="button-variable" @click="copyVariable('&lt;AppButton text=&quot;외부 사이트&quot; href=&quot;https://example.com&quot; /&gt;')" :title="'클릭하여 복사'">&lt;AppButton text="외부 사이트" href="https://example.com" /&gt;</span>
            </div>
          </div>
          <div class="button-item">
            <div class="button-preview">
              <AppButton text="GitHub" href="https://github.com" />
            </div>
            <div class="button-info">
              <span class="button-name">GitHub</span>
              <span class="button-code">href</span>
              <span class="button-variable" @click="copyVariable('&lt;AppButton text=&quot;GitHub&quot; href=&quot;https://github.com&quot; /&gt;')" :title="'클릭하여 복사'">&lt;AppButton text="GitHub" href="https://github.com" /&gt;</span>
            </div>
          </div>
          <div class="button-item">
            <div class="button-preview">
              <AppButton text="Nuxt 공식 사이트" href="https://nuxt.com" color="green" />
            </div>
            <div class="button-info">
              <span class="button-name">Nuxt 공식 사이트</span>
              <span class="button-code">href + color</span>
              <span class="button-variable" @click="copyVariable('&lt;AppButton text=&quot;Nuxt 공식 사이트&quot; href=&quot;https://nuxt.com&quot; color=&quot;green&quot; /&gt;')" :title="'클릭하여 복사'">&lt;AppButton text="Nuxt 공식 사이트" href="https://nuxt.com" color="green" /&gt;</span>
            </div>
          </div>
          <div class="button-item">
            <div class="button-preview">
              <AppButton text="Vue.js 공식 사이트" href="https://vuejs.org" color="teal" />
            </div>
            <div class="button-info">
              <span class="button-name">Vue.js 공식 사이트</span>
              <span class="button-code">href + color</span>
              <span class="button-variable" @click="copyVariable('&lt;AppButton text=&quot;Vue.js 공식 사이트&quot; href=&quot;https://vuejs.org&quot; color=&quot;teal&quot; /&gt;')" :title="'클릭하여 복사'">&lt;AppButton text="Vue.js 공식 사이트" href="https://vuejs.org" color="teal" /&gt;</span>
            </div>
          </div>
          <div class="button-item">
            <div class="button-preview">
              <AppButton text="Tailwind CSS 공식 사이트" href="https://tailwindcss.com" color="white" />
            </div>
            <div class="button-info">
              <span class="button-name">Tailwind CSS 공식 사이트</span>
              <span class="button-code">href + color</span>
              <span class="button-variable" @click="copyVariable('&lt;AppButton text=&quot;Tailwind CSS 공식 사이트&quot; href=&quot;https://tailwindcss.com&quot; color=&quot;white&quot; /&gt;')" :title="'클릭하여 복사'">&lt;AppButton text="Tailwind CSS 공식 사이트" href="https://tailwindcss.com" color="white" /&gt;</span>
            </div>
          </div>
        </div>
        <div class="code-examples">
          <pre><code>&lt;!-- 기본 외부 링크 --&gt;
&lt;AppButton text="외부 사이트" href="https://example.com" /&gt;

&lt;!-- 색상 지정 외부 링크 --&gt;
&lt;AppButton text="Nuxt 공식 사이트" href="https://nuxt.com" color="green" /&gt;

&lt;AppButton text="Vue.js 공식 사이트" href="https://vuejs.org" color="teal" /&gt;

&lt;AppButton text="Tailwind CSS 공식 사이트" href="https://tailwindcss.com" color="white" /&gt;</code></pre>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppButton from '~/components/cnx/AppButton.vue'
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

.button-palette {
  display: flex;
  flex-direction: column;
  gap: 40px;
  
  .button-category {
    margin-bottom: 40px;
    
    .category-title {
      @include body-01;
      color: $p-blue;
      margin-bottom: 20px;
      padding-bottom: 8px;
      border-bottom: 1px solid $n-gray;
    }
    
    .button-items {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
  }
}

.button-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  
  .button-preview {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60px;
    margin-bottom: 16px;
    padding: 10px;
    background-color: $gray-3;
    border-radius: 8px;
    border: 1px solid #e9ecef;
  }
  
  .button-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    align-items: center;
    text-align: center;
    
    .button-name {
      @include body-02;
      font-weight: 600;
      color: $n-dark-gray;
    }
    
    .button-code {
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
    
    .button-variable {
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
  .button-palette {
    gap: 20px;
  }
  
  .button-palette .button-category .button-items {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .button-item {
    padding: 16px;
    
    .button-preview {
      min-height: 50px;
    }
  }
}

@media (max-width: 768px) {
  .button-palette .button-category .button-items {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
  
  .button-item {
    padding: 12px;
    
    .button-preview {
      min-height: 40px;
      margin-bottom: 12px;
    }
    
    .button-info {
      gap: 6px;
      
      .button-name {
        font-size: 12px;
      }
      
      .button-code,
      .button-variable {
        font-size: 10px;
        padding: 4px 6px;
      }
    }
  }
}
</style>