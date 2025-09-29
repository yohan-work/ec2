<template>
  <div class="title-styleguide">
    <div class="container">
      <!-- 제목 + 설명 -->
      <section class="section">
        <h2 class="section-title">제목 + 설명</h2>
        <div class="title-group">
          <div class="usage-example">
            <AppTitle 
              title="기본 제목입니다"
              text="이것은 기본 제목의 설명입니다. 사용자에게 추가 정보를 제공합니다."
            />
          </div>
        </div>
        <div class="code-examples">
          <pre><code>&lt;AppTitle 
  title="기본 제목입니다"
  text="이것은 기본 제목의 설명입니다. 사용자에게 추가 정보를 제공합니다."
/&gt;</code></pre>
        </div>
      </section>

      <!-- 제목만 -->
      <section class="section">
        <h2 class="section-title">제목만</h2>
        <div class="title-group">
          <div class="usage-example">
            <AppTitle title="설명이 없는 제목입니다" />
          </div>
        </div>
        <div class="code-examples">
          <pre><code>&lt;AppTitle title="설명이 없는 제목입니다" /&gt;</code></pre>
        </div>
      </section>

      <!-- 설명만 -->
      <section class="section">
        <h2 class="section-title">설명만</h2>
        <div class="title-group">
          <div class="usage-example">
            <AppTitle text="제목 없이 설명만 있는 경우입니다. 이런 경우는 일반적이지 않지만 가능합니다." />
          </div>
        </div>
        <div class="code-examples">
          <pre><code>&lt;AppTitle text="제목 없이 설명만 있는 경우입니다." /&gt;</code></pre>
        </div>
      </section>

      <!-- HTML 태그 사용 -->
      <section class="section">
        <h2 class="section-title">HTML 태그 사용</h2>
        <div class="title-group">
          <div class="usage-example">
            <AppTitle 
              title="HTML 태그가 포함된 제목입니다<br>줄바꿈이 포함된 제목"
              text="여러 줄로 구성된 설명입니다.<br>줄바꿈이 포함된 설명입니다."
            />
          </div>
        </div>
        <div class="code-examples">
          <pre><code>&lt;AppTitle 
  title="HTML 태그가 포함된 제목입니다&lt;br&gt;줄바꿈이 포함된 제목"
  text="여러 줄로 구성된 설명입니다.&lt;br&gt;줄바꿈이 포함된 설명입니다."
/&gt;</code></pre>
        </div>
      </section>

      <!-- 왼쪽 정렬 -->
      <section class="section">
        <h2 class="section-title">왼쪽 정렬</h2>
        <div class="title-group">
          <div class="usage-example">
            <AppTitle 
              title="왼쪽 정렬 제목"
              text="왼쪽 정렬된 설명입니다."
              align="left"
            />
          </div>
        </div>
        <div class="code-examples">
          <pre><code>&lt;AppTitle title="왼쪽 정렬 제목" text="왼쪽 정렬된 설명입니다." align="left" /&gt;</code></pre>
        </div>
      </section>

      <!-- 가운데 정렬 -->
      <section class="section">
        <h2 class="section-title">가운데 정렬</h2>
        <div class="title-group">
          <div class="usage-example">
            <AppTitle 
              title="가운데 정렬 제목"
              text="가운데 정렬된 설명입니다."
              align="center"
            />
          </div>
        </div>
        <div class="code-examples">
          <pre><code>&lt;AppTitle title="가운데 정렬 제목" text="가운데 정렬된 설명입니다." align="center" /&gt;</code></pre>
        </div>
      </section>

      <!-- 오른쪽 정렬 -->
      <section class="section">
        <h2 class="section-title">오른쪽 정렬</h2>
        <div class="title-group">
          <div class="usage-example">
            <AppTitle 
              title="오른쪽 정렬 제목"
              text="오른쪽 정렬된 설명입니다."
              align="right"
            />
          </div>
        </div>
        <div class="code-examples">
          <pre><code>&lt;AppTitle title="오른쪽 정렬 제목" text="오른쪽 정렬된 설명입니다." align="right" /&gt;</code></pre>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import AppTitle from '~/components/cnx/AppTitle.vue'
</script>

<style lang="scss" scoped>
@use '~/layouts/scss/cnx.scss' as *;
@use '~/layouts/scss/cnx/_variables' as *;
@use '~/layouts/scss/cnx/_mixins' as *;
@use '~/layouts/scss/cnx/_functions' as *;

.title-styleguide {
  padding: rem(40) 0;
  min-height: 100vh;
  background-color: $d-white;

  .container {
    max-width: rem(1200);
    margin: 0 auto;
    padding: 0 rem(20);
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

    .title-group {
      display: flex;
      flex-wrap: wrap;
      gap: rem(20);
      align-items: flex-start;
      padding: rem(20);
      background-color: #ddd;
      border-radius: rem(8);
      border: rem(1) solid #e9ecef;
      margin-top: rem(24);

      .usage-example {
        // display: flex;
        // flex-direction: column;
        // align-items: center;
        gap: rem(12);
        padding: rem(16);
        background-color: $d-white;
        border-radius: rem(6);
        border: rem(1) solid #dee2e6;
        min-width: rem(300);
        flex: 1;

        h3 {
          font-size: rem(14);
          font-weight: 600;
          color: $d-black;
          margin: 0;
          text-align: center;
        }

        // AppTitle 컴포넌트의 배경을 투명하게 하기 위한 스타일
        :deep(.app-title) {
          background: transparent;
          padding: 0;
          max-width: none;
          margin: 0;
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