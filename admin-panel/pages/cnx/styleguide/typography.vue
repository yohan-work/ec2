<template>
  <div class="typography-container">
    <div class="styleguide-section">
      <div class="typography-showcase">
        <!-- Typography Examples -->
        <div class="typography-examples">
        <div class="text-example headline-01">
          <h3 class="text-title">
            Headline 01
            <button class="copy-button" @click="copyMixin('headline-01')" title="클릭하여 복사: @include headline-01">
              Copy
            </button>
          </h3>
          <div class="text-content">Title headline three lines and set black</div>
          <div class="text-specs">
            <div class="spec-group">
              <div class="spec-title">Desktop</div>
              <div class="spec-item">Size: 88px</div>
              <div class="spec-item">Weight: Bold</div>
              <div class="spec-item">Line height: 110%</div>
              <div class="spec-item">Bounding box: 102px</div>
            </div>
            <div class="spec-group">
              <div class="spec-title">Tablet</div>
              <div class="spec-item">Size: 70px</div>
              <div class="spec-item">Weight: Bold</div>
              <div class="spec-item">Line height: 110%</div>
              <div class="spec-item">Bounding box: 80px</div>
            </div>
            <div class="spec-group">
              <div class="spec-title">Mobile</div>
              <div class="spec-item">Size: 48px</div>
              <div class="spec-item">Weight: Bold</div>
              <div class="spec-item">Line height: 110%</div>
              <div class="spec-item">Bounding box: 56px</div>
            </div>
          </div>
        </div>
        <div class="text-example headline-02">
          <h3 class="text-title">
            Headline 02
            <button class="copy-button" @click="copyMixin('headline-02')" title="클릭하여 복사: @include headline-02">
              Copy
            </button>
          </h3>
          <div class="text-content">Title headline three lines and set black</div>
          <div class="text-specs">
            <div class="spec-group">
              <div class="spec-title">Desktop</div>
              <div class="spec-item">Size: 64px</div>
              <div class="spec-item">Weight: Bold</div>
              <div class="spec-item">Line height: 110%</div>
              <div class="spec-item">Bounding box: 74px</div>
            </div>
            <div class="spec-group">
              <div class="spec-title">Tablet</div>
              <div class="spec-item">Size: 54px</div>
              <div class="spec-item">Weight: Bold</div>
              <div class="spec-item">Line height: 110%</div>
              <div class="spec-item">Bounding box: 60px</div>
            </div>
            <div class="spec-group">
              <div class="spec-title">Mobile</div>
              <div class="spec-item">Size: 32px</div>
              <div class="spec-item">Weight: Bold</div>
              <div class="spec-item">Line height: 110%</div>
              <div class="spec-item">Bounding box: 38px</div>
            </div>
          </div>
        </div>
        <div class="text-example sub-headline-01">
          <h3 class="text-title">
            Sub Headline 01
            <button class="copy-button" @click="copyMixin('sub-headline-01')" title="클릭하여 복사: @include sub-headline-01">
              Copy
            </button>
          </h3>
          <div class="text-content">Sub headline size point size headline</div>
          <div class="text-specs">
            <div class="spec-group">
              <div class="spec-title">Desktop</div>
              <div class="spec-item">Size: 40px</div>
              <div class="spec-item">Weight: Bold</div>
              <div class="spec-item">Line height: 120%</div>
              <div class="spec-item">Bounding box: 52px</div>
            </div>
            <div class="spec-group">
              <div class="spec-title">Tablet</div>
              <div class="spec-item">Size: 32px</div>
              <div class="spec-item">Weight: Bold</div>
              <div class="spec-item">Line height: 120%</div>
              <div class="spec-item">Bounding box: 38px</div>
            </div>
            <div class="spec-group">
              <div class="spec-title">Mobile</div>
              <div class="spec-item">Size: 24px</div>
              <div class="spec-item">Weight: Bold</div>
              <div class="spec-item">Line height: 120%</div>
              <div class="spec-item">Bounding box: 30px</div>
            </div>
          </div>
        </div>
        <div class="text-example sub-headline-02">
          <h3 class="text-title">
            Sub Headline 02
            <button class="copy-button" @click="copyMixin('sub-headline-02')" title="클릭하여 복사: @include sub-headline-02">
              Copy
            </button>
          </h3>
          <div class="text-content">Default Sub Title basic sub headline</div>
          <div class="text-specs">
            <div class="spec-group">
              <div class="spec-title">Desktop</div>
              <div class="spec-item">Size: 34px</div>
              <div class="spec-item">Weight: Bold</div>
              <div class="spec-item">Line height: 120%</div>
              <div class="spec-item">Bounding box: 44px</div>
            </div>
            <div class="spec-group">
              <div class="spec-title">Tablet</div>
              <div class="spec-item">Size: 28px</div>
              <div class="spec-item">Weight: Bold</div>
              <div class="spec-item">Line height: 120%</div>
              <div class="spec-item">Bounding box: 34px</div>
            </div>
            <div class="spec-group">
              <div class="spec-title">Mobile</div>
              <div class="spec-item">Size: 20px</div>
              <div class="spec-item">Weight: Bold</div>
              <div class="spec-item">Line height: 120%</div>
              <div class="spec-item">Bounding box: 24px</div>
            </div>
          </div>
        </div>
        <div class="text-example body-01">
          <h3 class="text-title">
            Body 01
            <button class="copy-button" @click="copyMixin('body-01')" title="클릭하여 복사: @include body-01">
              Copy
            </button>
          </h3>
          <div class="text-content">Used as a body copy when using title headlines.</div>
          <div class="text-specs">
            <div class="spec-group">
              <div class="spec-title">Desktop</div>
              <div class="spec-item">Size: 24px</div>
              <div class="spec-item">Weight: Bold</div>
              <div class="spec-item">Line height: 140%</div>
              <div class="spec-item">Bounding box: 32px</div>
            </div>
            <div class="spec-group">
              <div class="spec-title">Tablet</div>
              <div class="spec-item">Size: 18px</div>
              <div class="spec-item">Weight: Bold</div>
              <div class="spec-item">Line height: 140%</div>
              <div class="spec-item">Bounding box: 22px</div>
            </div>
            <div class="spec-group">
              <div class="spec-title">Mobile</div>
              <div class="spec-item">Size: 16px</div>
              <div class="spec-item">Weight: Bold</div>
              <div class="spec-item">Line height: 140%</div>
              <div class="spec-item">Bounding box: 20px</div>
            </div>
          </div>
        </div>
        <div class="text-example body-02">
          <h3 class="text-title">
            Body 02
            <button class="copy-button" @click="copyMixin('body-02')" title="클릭하여 복사: @include body-02">
              Copy
            </button>
          </h3>
          <div class="text-content">Used as a body copy when using title headlines.</div>
          <div class="text-specs">
            <div class="spec-group">
              <div class="spec-title">Desktop</div>
              <div class="spec-item">Size: 16px</div>
              <div class="spec-item">Weight: Regular</div>
              <div class="spec-item">Line height: 140%</div>
              <div class="spec-item">Bounding box: 24px</div>
            </div>
            <div class="spec-group">
              <div class="spec-title">Tablet</div>
              <div class="spec-item">Size: 16px</div>
              <div class="spec-item">Weight: Regular</div>
              <div class="spec-item">Line height: 140%</div>
              <div class="spec-item">Bounding box: 20px</div>
            </div>
            <div class="spec-group">
              <div class="spec-title">Mobile</div>
              <div class="spec-item">Size: 14px</div>
              <div class="spec-item">Weight: Regular</div>
              <div class="spec-item">Line height: 140%</div>
              <div class="spec-item">Bounding box: 18px</div>
            </div>
          </div>
        </div>
        <div class="text-example body-03">
          <h3 class="text-title">
            Body 03
            <button class="copy-button" @click="copyMixin('body-03')" title="클릭하여 복사: @include body-03">
              Copy
            </button>
          </h3>
          <div class="text-content">This is the default body size. lineheight is font size + 10px. lineheight and bounding box height are the same.</div>
          <div class="text-specs">
            <div class="spec-group">
              <div class="spec-title">Desktop</div>
              <div class="spec-item">Size: 16px</div>
              <div class="spec-item">Weight: Regular</div>
              <div class="spec-item">Line height: 150%</div>
              <div class="spec-item">Bounding box: 24px</div>
            </div>
            <div class="spec-group">
              <div class="spec-title">Tablet</div>
              <div class="spec-item">Size: 14px</div>
              <div class="spec-item">Weight: Regular</div>
              <div class="spec-item">Line height: 150%</div>
              <div class="spec-item">Bounding box: 20px</div>
            </div>
            <div class="spec-group">
              <div class="spec-title">Mobile</div>
              <div class="spec-item">Size: 12px</div>
              <div class="spec-item">Weight: Regular</div>
              <div class="spec-item">Line height: 150%</div>
              <div class="spec-item">Bounding box: 18px</div>
            </div>
          </div>
        </div>
        <div class="text-example footer-nav">
          <h3 class="text-title">
            Footer Nav
            <button class="copy-button" @click="copyMixin('footer-nav')" title="클릭하여 복사: @include footer-nav">
              Copy
            </button>
          </h3>
          <div class="text-content">Footer navigation title 28</div>
          <div class="text-specs">
            <div class="spec-group">
              <div class="spec-title">Desktop</div>
              <div class="spec-item">Size: 28px</div>
              <div class="spec-item">Weight: Bold</div>
              <div class="spec-item">Line height: 120%</div>
              <div class="spec-item">Bounding box: 38px</div>
            </div>
            <div class="spec-group">
              <div class="spec-title">Tablet</div>
              <div class="spec-item">Size: 24px</div>
              <div class="spec-item">Weight: Bold</div>
              <div class="spec-item">Line height: 120%</div>
              <div class="spec-item">Bounding box: 28px</div>
            </div>
            <div class="spec-group">
              <div class="spec-title">Mobile</div>
              <div class="spec-item">Size: 18px</div>
              <div class="spec-item">Weight: Bold</div>
              <div class="spec-item">Line height: 120%</div>
              <div class="spec-item">Bounding box: 22px</div>
            </div>
          </div>
        </div>
      </div>

      </div>
    </div>

    <!-- Toast 컴포넌트 -->
    <AppToast 
      :show="showToast" 
      :message="toastMessage" 
      variant="success"
      @close="showToast = false"
    />
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

// mixin 복사 기능
const copyMixin = async (mixinName) => {
  const mixinCode = `@include ${mixinName}`
  try {
    await navigator.clipboard.writeText(mixinCode)
    showToastMessage(`${mixinCode} 복사됨!`)
  } catch (err) {
    console.error('복사 실패:', err)
    // 폴백: 텍스트 선택
    const textArea = document.createElement('textarea')
    textArea.value = mixinCode
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    showToastMessage(`${mixinCode} 복사됨!`)
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

  .typography-showcase {
    .typography-examples {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .text-example {
      padding: 16px;
      border-radius: 8px;
      overflow: hidden; // 박스 벗어남 방지
      min-height: 60px; // 최소 높이 보장

      .text-title {
        @include body-01;
        color: $p-blue;
        margin-bottom: 16px;
        padding-bottom: 8px;
        border-bottom: 1px solid $n-gray;
        display: flex;
        align-items: center;
        gap: 12px;

        .copy-button {
          background: transparent;
          color: $p-blue;
          border: 1px solid $p-blue;
          border-radius: 4px;
          padding: 2px 20px;
          font-size: 11px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;

          &:hover {
            background: $p-blue;
            color: $d-white;
            transform: translateY(-1px);
            box-shadow: 0 2px 4px rgba(0, 61, 91, 0.2);
          }

          &:active {
            transform: translateY(0);
            box-shadow: 0 1px 2px rgba(0, 61, 91, 0.2);
          }
        }
      }

      .text-content {
        background: $n-gray;
        padding: 16px;
        border-radius: 8px;
        border: 1px solid rgba(0, 61, 91, 0.1);
        color: $d-black;
        margin-bottom: 16px;
        word-wrap: break-word;
        overflow-wrap: break-word;
        hyphens: auto;
        line-height: 1.2; // 라인 높이 조정
        display: block;
        width: 100%;
        box-sizing: border-box;
      }

      .text-specs {
        margin-top: 12px;
        padding-top: 8px;
        border-top: 1px solid rgba(0, 61, 91, 0.1);
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;

        .spec-group {
          .spec-title {
            @include body-02;
            font-weight: $font-weight-bold;
            color: $p-blue;
            margin-bottom: 8px;
            padding: 4px 8px;
            background: $n-gray;
            border-radius: 4px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 100%;
          }

          .spec-item {
            @include body-03;
            color: $n-dark-gray;
            opacity: 0.8;
            margin-bottom: 2px;

            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }

      // Typography mixins 적용
      &.headline-01 .text-content { 
        @include headline-01;
        height: auto; // 고정 높이 해제
        min-height: 40px;
      }
      &.headline-02 .text-content { 
        @include headline-02;
        height: auto;
        min-height: 35px;
      }
      &.sub-headline-01 .text-content { 
        @include sub-headline-01;
        height: auto;
        min-height: 30px;
      }
      &.sub-headline-02 .text-content { 
        @include sub-headline-02;
        height: auto;
        min-height: 25px;
      }
      &.body-01 .text-content { 
        @include body-01;
        height: auto;
        min-height: 20px;
      }
      &.body-02 .text-content { 
        @include body-02;
        height: auto;
        min-height: 18px;
      }
      &.body-03 .text-content { 
        @include body-03;
        height: auto;
        min-height: 16px;
      }
      &.footer-nav .text-content { 
        @include footer-nav;
        height: auto;
        min-height: 20px;
      }
    }
  }

// 반응형
@media (max-width: 1024px) {
  .typography-showcase .text-specs {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}

@media (max-width: 768px) {
  .typography-showcase {
    .text-example {
      padding: 12px;
    }

    .text-specs {
      grid-template-columns: 1fr;
      gap: 8px;
    }
  }
}
</style>