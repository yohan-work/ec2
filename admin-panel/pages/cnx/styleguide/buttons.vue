<template>
  <div class="buttons-styleguide">
    <div class="container">
      <!-- 기본 버튼들 -->
      <section class="section">
        <h2 class="section-title">기본 버튼</h2>
        <div class="button-group">
          <AppButton text="기본 버튼" />
          <AppButton text="그린 버튼" color="green" />
          <AppButton text="틸 버튼" color="teal" />
          <AppButton text="화이트 버튼" color="white" />
        </div>
        <div class="code-examples">
          <pre><code>&lt;!-- 기본 버튼 --&gt;
&lt;AppButton text="기본 버튼" /&gt;

&lt;!-- 색상 지정 버튼 --&gt;
&lt;AppButton text="그린 버튼" color="green" /&gt;

&lt;AppButton text="틸 버튼" color="teal" /&gt;

&lt;AppButton text="화이트 버튼" color="white" /&gt;</code></pre>
        </div>
      </section>

      <!-- 내부 링크 버튼들 -->
      <section class="section">
        <h2 class="section-title">내부 링크 버튼</h2>
        <div class="button-group">
          <AppButton text="뉴스레터 보기" to="#" arrow />
          <AppButton text="더보기" to="#" arrow />
          <AppButton text="그린 더보기" to="#" color="green" arrow />
          <AppButton text="틸 더보기" to="#" color="teal" arrow />
          <AppButton text="화이트 더보기" to="#" color="white" arrow />
        </div>
        <div class="code-examples">
          <pre><code>&lt;!-- 내부 링크 (화살표 명시적) --&gt;
&lt;AppButton text="뉴스레터 보기" to="/newsletters" arrow /&gt;

&lt;AppButton text="더보기" to="/newsletters" arrow /&gt;

&lt;!-- 색상과 화살표 조합 --&gt;
&lt;AppButton text="그린 더보기" to="/newsletters" color="green" arrow /&gt;

&lt;AppButton text="틸 더보기" to="/newsletters" color="teal" arrow /&gt;

&lt;AppButton text="화이트 더보기" to="/newsletters" color="white" arrow /&gt;</code></pre>
        </div>
      </section>

      <!-- 원형 버튼들 -->
      <section class="section">
        <h2 class="section-title">원형 버튼</h2>
        <div class="button-group">
          <AppButton text="+" variant="circle" />
          <AppButton text="+" variant="circle" color="green" />
          <AppButton text="+" variant="circle" color="teal" />
          <AppButton text="+" variant="circle" color="white" />
          <AppButton variant="circle" to="#" arrow />
          <AppButton variant="circle" to="#" color="green" arrow />
          <AppButton variant="circle" to="#" color="teal" arrow arrowDirection="left" />
          <AppButton variant="circle" to="#" color="white" arrow arrowDirection="right" />
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

&lt;AppButton variant="circle" to="/path" arrow arrowDirection="right" /&gt;</code></pre>
        </div>
      </section>

      <!-- 호버 효과 버튼들 -->
      <section class="section">
        <h2 class="section-title">호버 효과</h2>
        <div class="button-group">
          <!-- 기본 색상 호버 효과 -->
          <AppButton text="기본 왼쪽" effect="left" />
          <AppButton text="기본 오른쪽" effect="right" />
          
          <!-- 그린 색상 호버 효과 -->
          <AppButton text="그린 왼쪽" color="green" effect="left" />
          <AppButton text="그린 오른쪽" color="green" effect="right" />
          
          <!-- 틸 색상 호버 효과 -->
          <AppButton text="틸 왼쪽" color="teal" effect="left" />
          <AppButton text="틸 오른쪽" color="teal" effect="right" />
          
          <!-- 화이트 색상 호버 효과 -->
          <AppButton text="화이트 왼쪽" color="white" effect="left" />
          <AppButton text="화이트 오른쪽" color="white" effect="right" />
          
          <!-- 내부 링크 호버 효과 -->
          <AppButton text="내부 링크 왼쪽" to="#" effect="left" arrow />
          <AppButton text="내부 링크 오른쪽" to="#" effect="right" arrow />
          <AppButton text="그린 내부 링크 왼쪽" to="#" color="green" effect="left" arrow />
          <AppButton text="틸 내부 링크 왼쪽" to="#" color="teal" effect="left" arrow />
          <AppButton text="틸 내부 링크 오른쪽" to="#" color="teal" effect="right" arrow />
          <AppButton text="화이트 내부 링크 왼쪽" to="#" color="white" effect="left" arrow />
          <AppButton text="화이트 내부 링크 오른쪽" to="#" color="white" effect="right" arrow />
        </div>
        <div class="code-examples">
          <pre><code>&lt;!-- 기본 호버 효과 --&gt;
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

&lt;AppButton text="화이트 내부 링크 오른쪽" to="/newsletters" color="white" effect="right" arrow /&gt;</code></pre>
        </div>
      </section>

      <!-- 외부 링크 버튼들 -->
      <section class="section">
        <h2 class="section-title">외부 링크 버튼</h2>
        <div class="button-group">
          <AppButton text="외부 사이트" href="https://example.com" />
          <AppButton text="GitHub" href="https://github.com" />
          <AppButton text="Nuxt 공식 사이트" href="https://nuxt.com" color="green" />
          <AppButton text="Vue.js 공식 사이트" href="https://vuejs.org" color="teal" />
          <AppButton text="Tailwind CSS 공식 사이트" href="https://tailwindcss.com" color="white" />
        </div>
        <div class="code-examples">
          <pre><code>&lt;!-- 기본 외부 링크 --&gt;
&lt;AppButton text="외부 사이트" href="https://example.com" /&gt;

&lt;!-- 색상 지정 외부 링크 --&gt;
&lt;AppButton text="Nuxt 공식 사이트" href="https://nuxt.com" color="green" /&gt;

&lt;AppButton text="Vue.js 공식 사이트" href="https://vuejs.org" color="teal" /&gt;

&lt;AppButton text="Tailwind CSS 공식 사이트" href="https://tailwindcss.com" color="white" /&gt;</code></pre>
        </div>
      </section>

    </div>

  </div>
</template>

<script setup>
import AppButton from '~/components/cnx/AppButton.vue'
</script>

<style lang="scss" scoped>
@use '~/layouts/scss/cnx.scss' as *;
@use '~/layouts/scss/cnx/_variables' as *;
@use '~/layouts/scss/cnx/_mixins' as *;
@use '~/layouts/scss/cnx/_functions' as *;

.buttons-styleguide {
  padding: rem(40) 0;
  min-height: 100vh;
  background-color: $d-white;

  .container {
    max-width: rem(1200);
    margin: 0 auto;
    padding: 0 rem(20);
  }

  .page-title {
    font-size: rem(32);
    font-weight: 700;
    color: $d-black;
    margin-bottom: rem(40);
    text-align: center;
  }

  .section {
    margin-bottom: rem(60);
    padding: relative;

    .section-title {
      font-size: rem(24);
      font-weight: 600;
      color: $d-black;
      background-color: $d-white;
      border-bottom: rem(2) solid $d-black;
      padding: rem(8) 0;
      position: sticky;
      top: 0;
      left: 0;
      z-index: 2;
    }

    .button-group {
      display: flex;
      flex-wrap: wrap;
      gap: rem(20);
      align-items: center;
      padding: rem(20);
      background-color: #ddd;
      border-radius: rem(8);
      border: rem(1) solid #e9ecef;
      margin-top: rem(24);

      .usage-example {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: rem(12);
        padding: rem(16);
        background-color: $d-white;
        border-radius: rem(6);
        border: rem(1) solid #dee2e6;
        min-width: rem(200);

        h3 {
          font-size: rem(14);
          font-weight: 600;
          color: $d-black;
          margin: 0;
          text-align: center;
        }
      }
    }

    .code-examples {
      margin-top: rem(20);
      background-color: #f8f9fa;
      border-radius: rem(8);
      border: rem(1) solid #e9ecef;
      overflow: hidden;

      pre {
        margin: 0;
        padding: rem(20);
        background-color: #f2f2f2;
        color: #000;
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        font-size: rem(14);
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
  }
}
</style>