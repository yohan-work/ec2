<template>
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
let lastScrollY = 0
let isFirstCheck = true

useIntersectionObserver(
  flowRef,
  ([{ isIntersecting }]) => {
    const currentScrollY = window.scrollY || window.pageYOffset
    const isScrollingDown = currentScrollY > lastScrollY
    const isNearTop = currentScrollY < 100
    lastScrollY = currentScrollY

    if (isIntersecting && (isScrollingDown || isFirstCheck || isNearTop)) {
      isIn.value = true
      isFirstCheck = false
    } else if (!isIntersecting && !isScrollingDown) {
      isIn.value = false
    }
  },
  {
    threshold: 0.2,
    rootMargin: '-50px',
  }
)
</script>

<style lang="scss" scoped>
.adx-cx-flow {
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

      &:nth-child(1) .adx-cx-step-key::after {
        transition-delay: 0.6s;
        transform: translate(50%, -50%) scale(1);
      }

      &:nth-child(2) .adx-cx-step-key::after {
        transition-delay: 0.75s;
        transform: translate(50%, -50%) scale(1);
      }

      &:nth-child(3) .adx-cx-step-key::after {
        transition-delay: 0.9s;
        transform: translate(50%, -50%) scale(1);
      }
    }
  }
}

.adx-cx-steps {
  --ink: #152a3d;
  --grey: #6b7c8c;
  --line: #e1e7ed;
  --paper-2: #ffffff;

  position: relative;
  display: grid;
  gap: clamp(12px, 1.4vw, 18px);
  margin: 0;
  padding: 0;
  list-style: none;

  &::before {
    content: '';
    position: absolute;
    left: clamp(46px, 4.4vw, 60px);
    top: 26px;
    bottom: 26px;
    width: 2px;
    border-radius: 2px;
    background: linear-gradient(#7fd4ee, #35e0c4 50%, #8fb0ff);
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 1s ease-out 0.2s;
  }
}

.adx-cx-step {
  --ac: #35e0c4;
  position: relative;
  display: grid;
  grid-template-columns: 124px 1fr;
  gap: clamp(14px, 1.8vw, 26px);
  align-items: center;
  padding: clamp(18px, 2vw, 24px) clamp(20px, 2.2vw, 26px);
  border-radius: 14px;
  background: linear-gradient(160deg, #ffffff 0%, #f7fafc 100%);
  border: 1px solid var(--line);
  box-shadow: 0 8px 22px -16px rgba(21, 42, 61, 0.3);
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.8s ease-out,
    transform 0.8s ease-out,
    box-shadow 0.3s,
    border-color 0.3s;

  &:nth-child(1) {
    --ac: #2fb6d9;
  }

  &:nth-child(3) {
    --ac: #8fb0ff;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 14px;
    bottom: 14px;
    width: 3px;
    border-radius: 0 3px 3px 0;
    background: var(--ac);
    transform: scaleY(0);
    transform-origin: center;
    transition: transform 0.32s cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  &:hover {
    border-color: rgba(18, 169, 143, 0.4);
    box-shadow: 0 18px 34px -18px rgba(21, 42, 61, 0.4);

    &::before {
      transform: scaleY(1);
    }
  }
}

.adx-cx-step-key {
  position: relative;
  z-index: 1;
  font-size: 12.5px;
  font-weight: 800;
  letter-spacing: 0.14em;
  color: var(--ac);
  white-space: nowrap;
}

.adx-cx-step-title {
  margin: 0;
  font-size: clamp(16.5px, 1.7vw, 21px);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.4;
  color: var(--ink);
}

.adx-cx-step-desc {
  margin: 7px 0 0;
  font-size: 14px;
  line-height: 1.7;
  color: var(--grey);
}

@media (max-width: 767px) {
  .adx-cx-step {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .adx-cx-steps::before {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .adx-cx-flow.in .adx-cx-step {
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>
