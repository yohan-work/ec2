<template>
  <section ref="sectionRef" class="adx-growth" :class="{ 'is-in': isIn }">
    <div class="adx-growth-copy">
      <h2 v-if="title" class="adx-growth-title" v-html="title"></h2>
      <p v-if="text" class="adx-growth-text" v-html="text"></p>
      <p v-if="highlight" class="adx-growth-highlight">{{ highlight }}</p>
      <ul v-if="items.length" class="adx-growth-approach">
        <li
          v-for="(item, index) in items"
          :key="item.key || index"
          class="adx-growth-approach-item"
        >
          <strong class="adx-growth-approach-heading">{{ item.key }} · {{ item.title }}</strong>
          <span class="adx-growth-approach-desc">{{ item.description }}</span>
        </li>
      </ul>
    </div>

    <div class="adx-growth-visual" :aria-label="imageAlt || undefined">
      <svg
        ref="svgRef"
        class="adx-growth-diagram"
        viewBox="0 0 640 480"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        :aria-label="imageAlt || undefined"
      >
        <defs>
          <filter :id="ids.soft" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#1B3E5F" flood-opacity=".16"/>
          </filter>
          <radialGradient :id="ids.center" cx="35%" cy="30%" r="75%">
            <stop offset="0" stop-color="#FFFFFF"/>
            <stop offset="1" stop-color="#DCF3EC"/>
          </radialGradient>
          <radialGradient :id="ids.ai" cx="35%" cy="30%" r="75%">
            <stop offset="0" stop-color="#FFFFFF"/>
            <stop offset="1" stop-color="#E4EBF3"/>
          </radialGradient>
          <radialGradient :id="ids.data" cx="35%" cy="30%" r="75%">
            <stop offset="0" stop-color="#FFFFFF"/>
            <stop offset="1" stop-color="#DCF0EA"/>
          </radialGradient>
          <radialGradient :id="ids.exp" cx="35%" cy="30%" r="75%">
            <stop offset="0" stop-color="#FFFFFF"/>
            <stop offset="1" stop-color="#DFEEF6"/>
          </radialGradient>
          <linearGradient :id="ids.box" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#FFFFFF"/>
            <stop offset="1" stop-color="#F7FAFC"/>
          </linearGradient>
          <marker :id="ids.ah1" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
            <path d="M0 0l8 4.5L0 9z" fill="#1B3E5F"/>
          </marker>
          <marker :id="ids.ah2" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
            <path d="M0 0l8 4.5L0 9z" fill="#12A98F"/>
          </marker>
          <marker :id="ids.ah3" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
            <path d="M0 0l8 4.5L0 9z" fill="#2FB6D9"/>
          </marker>
        </defs>

        <circle cx="320" cy="248" r="104" fill="none" stroke="#12A98F" stroke-width="2" stroke-dasharray="5 8" opacity=".6"/>
        <circle cx="320" cy="248" r="86" :fill="urlRef(ids.center)" :filter="urlRef(ids.soft)"/>
        <ellipse cx="292" cy="220" rx="40" ry="22" fill="#fff" opacity=".5"/>
        <text x="320" y="242" text-anchor="middle" font-family="Pretendard,sans-serif" font-size="42" font-weight="800" fill="#1B3E5F" letter-spacing="-1">ADX</text>
        <text x="320" y="268" text-anchor="middle" font-family="Pretendard,sans-serif" font-size="11" font-weight="700" fill="#12A98F" letter-spacing="1.6">GROWTH SYSTEM</text>

        <path d="M320 130v50" stroke="#1B3E5F" stroke-width="2.5" :marker-end="urlRef(ids.ah1)" opacity=".85"/>
        <g :filter="urlRef(ids.soft)">
          <circle class="adx-growth-node" cx="320" cy="70" r="56" :fill="urlRef(ids.ai)" stroke="#1B3E5F" stroke-width="1.6"/>
        </g>
        <circle cx="320" cy="70" r="64" fill="none" stroke="#1B3E5F" stroke-width="1.4" stroke-dasharray="3 6" opacity=".35"/>
        <text x="320" y="66" text-anchor="middle" font-family="Pretendard,sans-serif" font-size="26" font-weight="800" fill="#1B3E5F">AI</text>
        <text x="320" y="88" text-anchor="middle" font-family="Pretendard,sans-serif" font-size="11" font-weight="600" fill="#6B7C8C">실행 확장</text>

        <path d="M482 316 L410 300" stroke="#12A98F" stroke-width="2.5" :marker-end="urlRef(ids.ah2)" opacity=".85"/>
        <g :filter="urlRef(ids.soft)">
          <circle class="adx-growth-node" cx="524" cy="356" r="56" :fill="urlRef(ids.data)" stroke="#12A98F" stroke-width="1.6"/>
        </g>
        <circle cx="524" cy="356" r="64" fill="none" stroke="#12A98F" stroke-width="1.4" stroke-dasharray="3 6" opacity=".35"/>
        <text x="524" y="352" text-anchor="middle" font-family="Pretendard,sans-serif" font-size="21" font-weight="800" fill="#12A98F">DATA</text>
        <text x="524" y="374" text-anchor="middle" font-family="Pretendard,sans-serif" font-size="11" font-weight="600" fill="#6B7C8C">판단 고도화</text>

        <path d="M158 316 L230 300" stroke="#2FB6D9" stroke-width="2.5" :marker-end="urlRef(ids.ah3)" opacity=".85"/>
        <g :filter="urlRef(ids.soft)">
          <circle class="adx-growth-node" cx="116" cy="356" r="56" :fill="urlRef(ids.exp)" stroke="#2FB6D9" stroke-width="1.6"/>
        </g>
        <circle cx="116" cy="356" r="64" fill="none" stroke="#2FB6D9" stroke-width="1.4" stroke-dasharray="3 6" opacity=".35"/>
        <text x="116" y="348" text-anchor="middle" font-family="Pretendard,sans-serif" font-size="12.5" font-weight="800" fill="#2FB6D9">EXPERIENCE</text>
        <text x="116" y="370" text-anchor="middle" font-family="Pretendard,sans-serif" font-size="11" font-weight="600" fill="#6B7C8C">방향 설계</text>

        <g font-family="Pretendard,sans-serif" font-size="12" font-weight="700">
          <rect x="22" y="176" width="128" height="46" rx="8" :fill="urlRef(ids.box)" stroke="#1B3E5F" stroke-width="1.6" :filter="urlRef(ids.soft)"/>
          <text x="86" y="196" text-anchor="middle" fill="#1B3E5F">Growth</text>
          <text x="86" y="212" text-anchor="middle" fill="#1B3E5F">Strategy</text>
          <path d="M150 199h60" stroke="#1B3E5F" stroke-width="1.6" stroke-dasharray="4 4" opacity=".7"/>
          <rect x="490" y="176" width="128" height="46" rx="8" :fill="urlRef(ids.box)" stroke="#12A98F" stroke-width="1.6" :filter="urlRef(ids.soft)"/>
          <text x="554" y="196" text-anchor="middle" fill="#12A98F">KPI</text>
          <text x="554" y="212" text-anchor="middle" fill="#12A98F">Decisioning</text>
          <path d="M430 199h60" stroke="#12A98F" stroke-width="1.6" stroke-dasharray="4 4" opacity=".7"/>
        </g>
      </svg>

      <div class="adx-growth-mobile" role="img" :aria-label="imageAlt || undefined">
        <div class="adx-growth-mobile-row">
          <span
            v-for="(item, index) in items"
            :key="item.key || index"
            class="adx-growth-chip"
            :class="`is-${item.tone || 'ai'}`"
          >
            {{ item.key }}
            <em class="adx-growth-chip-label">{{ item.label || item.title }}</em>
          </span>
        </div>
        <div class="adx-growth-mobile-arrow">↓</div>
        <div class="adx-growth-core">ADX<span class="adx-growth-core-label">GROWTH SYSTEM</span></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, useId } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { applySvgPop } from '~/utils/cnx/svg-pop'

defineProps({
  title: {
    type: String,
    default: 'ADX는 AI·Data·AD Experience로 마케팅 전 과정을 비즈니스 목표에 연결합니다',
  },
  text: {
    type: String,
    default: '전략부터 고객 경험, 다음 의사결정까지. 각각의 기능은 하나의 KPI를 향해 운영됩니다.',
  },
  highlight: {
    type: String,
    default: 'ADX는 마케팅 활동을 늘리는 것이 아니라, 성과가 만들어지는 운영 구조를 설계합니다.',
  },
  items: {
    type: Array,
    default: () => [
      {
        key: 'AI',
        title: '실행을 확장합니다',
        label: '실행 확장',
        description: '반복 업무를 자동화하고 실험할 수 있는 범위를 넓혀, 같은 리소스로 더 많은 가설을 검증합니다.',
        tone: 'ai',
      },
      {
        key: 'Data',
        title: '판단을 고도화합니다',
        label: '판단 고도화',
        description: '고객·캠페인·성과 신호를 하나의 기준으로 정리해 다음 결정의 근거로 만듭니다.',
        tone: 'data',
      },
      {
        key: 'Experience',
        title: '방향을 정합니다',
        label: '방향 설계',
        description: '브랜드 맥락과 고객 경험을 비즈니스 목표에 맞게 설계해, 실행이 향할 지점을 정의합니다.',
        tone: 'exp',
      },
    ],
  },
  imageAlt: {
    type: String,
    default: 'AI, Data, Experience 세 축이 ADX로 결합되는 구조도',
  },
})

const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
const ids = {
  soft: `adx-gs-soft-${uid}`,
  center: `adx-gs-center-${uid}`,
  ai: `adx-gs-ai-${uid}`,
  data: `adx-gs-data-${uid}`,
  exp: `adx-gs-exp-${uid}`,
  box: `adx-gs-box-${uid}`,
  ah1: `adx-gs-ah1-${uid}`,
  ah2: `adx-gs-ah2-${uid}`,
  ah3: `adx-gs-ah3-${uid}`,
}

const urlRef = (id) => `url(#${id})`

const sectionRef = ref(null)
const svgRef = ref(null)
const isIn = ref(false)

useIntersectionObserver(
  sectionRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) isIn.value = true
  },
  {
    threshold: 0.15,
  }
)

onMounted(() => {
  applySvgPop(svgRef.value)
})
</script>

<style lang="scss" scoped>
.adx-growth {
  display: flex;
  flex-direction: column;
  gap: rem(38);
  margin-bottom: rem(66);

  @include tablet {
    flex-direction: row;
    align-items: flex-start;
    gap: rem(24);
    margin-bottom: rem(60);
  }

  @include desktop {
    gap: rem(32);
    margin-bottom: rem(120);
  }

  &-copy {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: rem(22);

    @include desktop {
      padding-right: rem(100);
    }
  }

  &-title,
  &-text,
  &-highlight,
  &-approach-item,
  &-visual {
    opacity: 0;
    transform: translateY(rem(30));
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }

  &-title {
    @include sub-headline-02;
    margin: 0;
    color: $d-black;
  }

  &-text {
    @include body-02;
    margin: 0;
    color: $gray-1;
    transition-delay: 0.15s;
  }

  &-highlight {
    @include body-02;
    margin: 0;
    font-weight: $font-weight-bold;
    color: $d-black;
    transition-delay: 0.25s;
  }

  &-approach {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &-approach-item {
    @include body-02;
    position: relative;
    margin: 0 0 rem(16);
    padding-left: rem(16);
    color: $gray-1;
    transform: translateY(rem(20));

    &:last-child {
      margin-bottom: 0;
    }

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: rem(11);
      width: rem(5);
      height: rem(5);
      border-radius: 50%;
      background: $d-black;
    }

    @for $i from 1 through 3 {
      &:nth-child(#{$i}) {
        transition-delay: #{0.35 + ($i - 1) * 0.12}s;
      }
    }
  }

  &-approach-heading {
    @include body-02;
    display: block;
    margin-bottom: rem(3);
    font-weight: $font-weight-bold;
    color: $d-black;
  }

  &-visual {
    position: relative;
    width: 100%;
    flex: 1;
    transform: translateY(rem(50));

    &::before {
      content: '';
      position: absolute;
      inset: 50% auto auto 50%;
      width: 78%;
      aspect-ratio: 1;
      transform: translate(-50%, -50%);
      pointer-events: none;
      border-radius: 50%;
      background: radial-gradient(
        closest-side,
        rgba(53, 224, 196, 0.14),
        rgba(47, 182, 217, 0.08) 52%,
        transparent 72%
      );
    }
  }

  &-diagram {
    position: relative;
    z-index: 1;
    display: block;
    width: 100%;
    height: auto;

    :deep(.pop) {
      opacity: 0;
      transform: scale(0.72);
      transform-origin: center;
      transform-box: fill-box;
      transition:
        opacity 0.5s ease,
        transform 0.55s cubic-bezier(0.34, 1.4, 0.5, 1);
    }
  }

  &-node {
    transform-origin: center;
    transform-box: fill-box;
    transition: transform 0.3s cubic-bezier(0.34, 1.4, 0.5, 1);
  }

  &-mobile {
    display: none;
    position: relative;
    z-index: 1;

    @media (max-width: 640px) {
      display: block;
    }
  }

  &-mobile-row {
    display: flex;
    flex-wrap: wrap;
    gap: rem(10);
    justify-content: center;
  }

  &-chip {
    @include body-03;
    flex: 1 1 rem(140);
    max-width: rem(180);
    padding: rem(14) rem(10);
    border-radius: rem(14);
    background: $d-white;
    font-weight: $font-weight-bold;
    text-align: center;
    box-shadow: 0 rem(10) rem(22) rem(-16) rgba(21, 42, 61, 0.3);

    &.is-ai {
      border: rem(1.5) solid #1b3e5f;
      color: #1b3e5f;
    }

    &.is-data {
      border: rem(1.5) solid #12a98f;
      color: #12a98f;
    }

    &.is-exp {
      border: rem(1.5) solid #2fb6d9;
      color: #2fb6d9;
    }
  }

  &-chip-label {
    @include body-03;
    display: block;
    margin-top: rem(4);
    font-style: normal;
    color: $gray-1;
  }

  &-mobile-arrow {
    margin: rem(10) 0;
    color: #12a98f;
    font-size: rem(20);
    line-height: 1;
    text-align: center;
  }

  &-core {
    @include sub-headline-02;
    max-width: rem(200);
    margin: 0 auto;
    padding: rem(20);
    border: rem(2) dashed #12a98f;
    border-radius: rem(16);
    background: radial-gradient(circle at 35% 30%, $d-white, #dcf3ec);
    color: #1b3e5f;
    text-align: center;
  }

  &-core-label {
    @include body-03;
    display: block;
    margin-top: rem(4);
    font-weight: $font-weight-bold;
    letter-spacing: 0.08em;
    color: #12a98f;
  }

  &.is-in {
    .adx-growth-title,
    .adx-growth-text,
    .adx-growth-highlight,
    .adx-growth-approach-item,
    .adx-growth-visual {
      opacity: 1;
      transform: none;
    }

    .adx-growth-diagram :deep(.pop) {
      opacity: var(--pop-opacity, 1);
      transform: none;
    }

    .adx-growth-node:hover {
      transform: scale(1.06);
    }
  }

  @media (max-width: 640px) {
    .adx-growth-diagram {
      display: none;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .adx-growth-title,
  .adx-growth-text,
  .adx-growth-highlight,
  .adx-growth-approach-item,
  .adx-growth-visual {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
</style>
