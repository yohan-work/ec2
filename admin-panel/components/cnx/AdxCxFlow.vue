<template>
  <div class="adx-cx">
    <AppImgCont :title="title" :text="text" :reverse="true">
      <div ref="flowRef" class="adx-cx-flow" :class="{ in: isIn }">
        <ol class="adx-cx-steps">
          <li v-for="(step, index) in steps" :key="step.key || index" class="adx-cx-step">
            <span class="adx-cx-step-key">{{ step.key }}</span>
            <div class="adx-cx-step-body">
              <h3 class="adx-cx-step-title">{{ step.title }}</h3>
              <p class="adx-cx-step-desc">{{ step.description }}</p>
            </div>
          </li>
        </ol>
      </div>
    </AppImgCont>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import AppImgCont from '~/components/cnx/AppImgCont.vue'

defineProps({
  title: {
    type: String,
    default: 'ADX는 콘센트릭스의 주력 사업 중 하나입니다',
  },
  text: {
    type: String,
    default:
      'CX 전문성과 AI·Data·AD Experience를 연결해,<br>마케팅의 실행을 고객의 비즈니스 성장으로 전환합니다.<br><br>ADX는 마케팅을 독립된 기능으로 보지 않습니다.<br>고객 경험부터 다음 의사결정까지 하나의 성장 흐름으로 운영합니다.',
  },
  steps: {
    type: Array,
    default: () => [
      {
        key: 'CONNECT',
        title: 'CX와 마케팅을 연결',
        description: '고객 경험의 신호를 성장 전략으로 이어갑니다.',
      },
      {
        key: 'ORCHESTRATE',
        title: 'AI·Data·Creative·Media를 통합',
        description: '각 전문성을 하나의 KPI와 운영 체계로 묶습니다.',
      },
      {
        key: 'ACCELERATE',
        title: '의사결정을 성장으로 전환',
        description: '실행의 결과가 다음 전략을 더 정확하게 만듭니다.',
      },
    ],
  },
})

const flowRef = ref(null)
const isIn = ref(false)

useIntersectionObserver(
  flowRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) isIn.value = true
  },
  {
    threshold: 0.15,
  }
)
</script>

<style lang="scss" scoped>
.adx-cx {
  :deep(.app-img-cont .text-content .description) {
    color: $gray-1;
  }

  &-flow {
    width: 100%;

    &.in {
      .adx-cx-steps::before {
        transform: scaleY(1);
      }

      .adx-cx-step {
        opacity: 1;
        transform: none;

        &:nth-child(1) {
          transition-delay: 0.2s;
        }

        &:nth-child(2) {
          transition-delay: 0.35s;
        }

        &:nth-child(3) {
          transition-delay: 0.5s;
        }
      }
    }
  }

  &-steps {
    position: relative;
    display: grid;
    gap: rem(12);
    margin: 0;
    padding: 0;
    list-style: none;

    @include tablet {
      gap: rem(18);
    }

    &::before {
      content: '';
      display: none;
      position: absolute;
      inset: rem(26) auto rem(26) rem(46);
      width: rem(2);
      border-radius: rem(2);
      background: linear-gradient(#7fd4ee, #35e0c4 50%, #8fb0ff);
      transform: scaleY(0);
      transform-origin: top;
      transition: transform 1s ease-out 0.2s;

      @include tablet {
        display: block;
        left: rem(60);
      }
    }
  }

  &-step {
    --ac: #35e0c4;
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    gap: rem(8);
    align-items: center;
    padding: rem(18) rem(20);
    border: 1px solid $gray-2;
    border-radius: rem(14);
    background: linear-gradient(160deg, $d-white 0%, #f7fafc 100%);
    box-shadow: 0 rem(8) rem(22) rem(-16) rgba(21, 42, 61, 0.3);
    opacity: 0;
    transform: translateY(rem(30));
    transition:
      opacity 0.8s ease-out,
      transform 0.8s ease-out,
      box-shadow 0.3s,
      border-color 0.3s;

    @include tablet {
      grid-template-columns: rem(120) 1fr;
       gap: rem(26);
      padding: rem(24) rem(26);
    }

    @include desktop {
      grid-template-columns: rem(160) 1fr;
    }


    &:nth-child(1) {
      --ac: #2fb6d9;
    }

    &:nth-child(3) {
      --ac: #8fb0ff;
    }

    &::before {
      content: '';
      position: absolute;
      inset: rem(14) auto rem(14) 0;
      width: rem(3);
      border-radius: 0 rem(3) rem(3) 0;
      background: var(--ac);
      transform: scaleY(0);
      transform-origin: center;
      transition: transform 0.32s cubic-bezier(0.2, 0.7, 0.2, 1);
    }

    &:hover {
      border-color: rgba(18, 169, 143, 0.4);
      box-shadow: 0 rem(18) rem(34) rem(-18) rgba(21, 42, 61, 0.4);

      &::before {
        transform: scaleY(1);
      }
    }

    &-key {
      @include body-03;
      position: relative;
      z-index: 1;
      font-weight: $font-weight-bold;
      letter-spacing: 0.14em;
      color: var(--ac);
      white-space: nowrap;
    }

    &-title {
      @include body-01;
      margin: 0;
      letter-spacing: -0.03em;
      color: $d-black;
    }

    &-desc {
      @include body-03;
      margin: rem(7) 0 0;
      color: $gray-1;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .adx-cx-flow.in .adx-cx-step {
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>
