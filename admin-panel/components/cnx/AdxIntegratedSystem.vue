<template>
  <section ref="sectionRef" class="adx-integrated" :class="{ 'is-in': isIn }">
    <div class="adx-integrated-copy">
      <h2 class="adx-integrated-title" v-html="title"></h2>
      <p class="adx-integrated-text" v-html="text"></p>
    </div>

    <div class="adx-integrated-visual">
      <svg
        ref="svgRef"
        class="adx-integrated-diagram"
        viewBox="122 4 796 512"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        :aria-label="imageAlt"
      >
        <defs>
          <filter :id="ids.soft" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="3" stdDeviation="6" flood-color="#1B3E5F" flood-opacity=".12"/>
          </filter>
          <filter :id="ids.softLg" x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow dx="0" dy="9" stdDeviation="16" flood-color="#0A1728" flood-opacity=".26"/>
          </filter>
          <linearGradient :id="ids.hub" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#2296CE"/>
            <stop offset="1" stop-color="#0F5F94"/>
          </linearGradient>
          <linearGradient :id="ids.growth" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#1E3654"/>
            <stop offset="1" stop-color="#0A1728"/>
          </linearGradient>
          <linearGradient :id="ids.ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#7FD4EE"/>
            <stop offset=".55" stop-color="#35E0C4"/>
            <stop offset="1" stop-color="#8FB0FF"/>
          </linearGradient>
          <linearGradient :id="ids.node" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#FFFFFF"/>
            <stop offset="1" stop-color="#F7FAFC"/>
          </linearGradient>
        </defs>

        <circle cx="520" cy="260" r="206" fill="none" :stroke="urlRef(ids.ring)" stroke-width="2" stroke-dasharray="2 8" opacity=".6"/>

        <g stroke="#B9C7D6" stroke-width="1.4" opacity=".6">
          <path d="M520 260 520 64"/>
          <path d="M520 260 672 112"/>
          <path d="M520 260 716 260"/>
          <path d="M520 260 672 408"/>
          <path d="M520 260 520 456"/>
          <path d="M520 260 368 408"/>
          <path d="M520 260 324 260"/>
          <path d="M520 260 368 112"/>
        </g>

        <circle cx="192" cy="260" r="64" fill="none" :stroke="urlRef(ids.ring)" stroke-width="1.5" stroke-dasharray="3 6" opacity=".7"/>
        <circle class="adx-integrated-node" cx="192" cy="260" r="54" :fill="urlRef(ids.node)" stroke="#1B3E5F" stroke-width="2" :filter="urlRef(ids.soft)"/>
        <circle cx="848" cy="260" r="64" fill="none" :stroke="urlRef(ids.ring)" stroke-width="1.5" stroke-dasharray="3 6" opacity=".7"/>
        <circle class="adx-integrated-node" cx="848" cy="260" r="54" :fill="urlRef(ids.growth)" :filter="urlRef(ids.softLg)"/>
        <g text-anchor="middle" font-family="Pretendard,sans-serif" font-weight="800">
          <text x="192" y="253" font-size="17" fill="#0A1728">CLIENT</text>
          <text x="192" y="275" font-size="17" fill="#0A1728">GOAL</text>
          <text x="848" y="253" font-size="16" fill="#fff">BUSINESS</text>
          <text x="848" y="275" font-size="16" fill="#fff">GROWTH</text>
        </g>

        <circle class="adx-integrated-node" cx="520" cy="260" r="132" :fill="urlRef(ids.hub)" :filter="urlRef(ids.softLg)"/>
        <ellipse cx="472" cy="204" rx="66" ry="36" fill="#fff" opacity=".1"/>
        <g stroke="rgba(255,255,255,.55)" stroke-width="1.5">
          <path d="M520 130v260"/>
          <path d="M390 260h260"/>
        </g>
        <g text-anchor="middle" font-family="Pretendard,sans-serif" font-size="14.5" font-weight="800" fill="#fff">
          <text x="459" y="222">STRATEGY</text>
          <text x="581" y="222">CREATIVE &amp; AI</text>
          <text x="459" y="308">MEDIA</text>
          <text x="581" y="308">DATA &amp; CX</text>
        </g>

        <g font-family="Pretendard,sans-serif" font-size="14.5" text-anchor="middle">
          <g :fill="urlRef(ids.node)" stroke="#E1E8F0" stroke-width="1.4" :filter="urlRef(ids.soft)">
            <circle class="adx-integrated-node" cx="520" cy="64" r="50"/>
            <circle class="adx-integrated-node" cx="672" cy="112" r="50"/>
            <circle class="adx-integrated-node" cx="716" cy="260" r="50"/>
            <circle class="adx-integrated-node" cx="672" cy="408" r="50"/>
            <circle class="adx-integrated-node" cx="520" cy="456" r="50"/>
            <circle class="adx-integrated-node" cx="368" cy="408" r="50"/>
            <circle class="adx-integrated-node" cx="324" cy="260" r="50"/>
            <circle class="adx-integrated-node" cx="368" cy="112" r="50"/>
          </g>
          <g fill="#4A6076" stroke="none">
            <text x="520" y="60">Brand &amp;</text>
            <text x="520" y="78">Content</text>
            <text x="672" y="117">Performance</text>
            <text x="716" y="256">Creative &amp;</text>
            <text x="716" y="274">AI</text>
            <text x="672" y="404">Customer</text>
            <text x="672" y="422">Experience</text>
            <text x="520" y="452">Data &amp;</text>
            <text x="520" y="470">Dashboard</text>
            <text x="368" y="395">Custom</text>
            <text x="368" y="413">Growth</text>
            <text x="368" y="431">Agent</text>
            <text x="324" y="256">Media</text>
            <text x="324" y="274">Operation</text>
            <text x="368" y="108">Customer</text>
            <text x="368" y="126">Insight</text>
          </g>
        </g>

        <path d="M246 260h68" :stroke="urlRef(ids.ring)" stroke-width="2" stroke-linecap="round"/>
        <path d="M726 260h68" :stroke="urlRef(ids.ring)" stroke-width="2" stroke-linecap="round"/>
        <g :stroke="urlRef(ids.ring)" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M256 251l12 9-12 9"/>
          <path d="M772 251l12 9-12 9"/>
        </g>
      </svg>

      <div class="adx-integrated-mobile" role="img" :aria-label="imageAlt">
        <span class="adx-integrated-pill is-goal">CLIENT GOAL</span>
        <div class="adx-integrated-arrow">↓</div>
        <div class="adx-integrated-hub">
          <span class="adx-integrated-hub-item">STRATEGY</span>
          <span class="adx-integrated-hub-item">CREATIVE &amp; AI</span>
          <span class="adx-integrated-hub-item">MEDIA</span>
          <span class="adx-integrated-hub-item">DATA &amp; CX</span>
        </div>
        <ul class="adx-integrated-nodes">
          <li class="adx-integrated-nodes-item">Brand &amp; Content</li>
          <li class="adx-integrated-nodes-item">Performance</li>
          <li class="adx-integrated-nodes-item">Creative &amp; AI</li>
          <li class="adx-integrated-nodes-item">Customer Experience</li>
          <li class="adx-integrated-nodes-item">Data &amp; Dashboard</li>
          <li class="adx-integrated-nodes-item">Custom Growth Agent</li>
          <li class="adx-integrated-nodes-item">Media Operation</li>
          <li class="adx-integrated-nodes-item">Customer Insight</li>
        </ul>
        <div class="adx-integrated-arrow">↓</div>
        <span class="adx-integrated-pill is-growth">BUSINESS GROWTH</span>
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
    default: '각 분야의 전문성이<br>하나의 성장 목표로 결합됩니다',
  },
  text: {
    type: String,
    default: 'ADX는 기능별 인수인계가 아니라, 동일한 고객 과제와 KPI를 공유하는 통합 운영팀으로 일합니다.',
  },
  imageAlt: {
    type: String,
    default: '고객 목표가 통합 기능을 거쳐 비즈니스 성장으로 연결되는 구조도',
  },
})

const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
const ids = {
  soft: `adx-is-soft-${uid}`,
  softLg: `adx-is-soft-lg-${uid}`,
  hub: `adx-is-hub-${uid}`,
  growth: `adx-is-growth-${uid}`,
  ring: `adx-is-ring-${uid}`,
  node: `adx-is-node-${uid}`,
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
.adx-integrated {
  display: flex;
  flex-direction: column;
  gap: rem(38);
  margin-bottom: rem(66);

  @include tablet {
    flex-direction: row-reverse;
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
      padding-left: rem(100);
    }
  }

  &-title,
  &-text,
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

  &-visual {
    position: relative;
    width: 100%;
    flex: 1;
    transform: translateY(rem(50));

    &::before {
      content: '';
      position: absolute;
      inset: 50% auto auto 50%;
      width: 74%;
      aspect-ratio: 1;
      transform: translate(-50%, -50%);
      pointer-events: none;
      border-radius: 50%;
      background: radial-gradient(
        closest-side,
        rgba(23, 138, 197, 0.16),
        rgba(53, 224, 196, 0.09) 52%,
        transparent 72%
      );
    }
  }

  &.is-in {
    .adx-integrated-title,
    .adx-integrated-text,
    .adx-integrated-visual {
      opacity: 1;
      transform: none;
    }

    .adx-integrated-diagram :deep(.pop) {
      opacity: var(--pop-opacity, 1);
      transform: none;
    }

    .adx-integrated-node:hover {
      transform: scale(1.09);
      stroke: #12a98f;
    }
  }

  &-diagram {
    position: relative;
    z-index: 1;
    display: block;
    width: 100%;
    max-width: rem(940);
    height: auto;
    margin: 0 auto;

    :deep(.pop) {
      opacity: 0;
      transform: scale(0.72);
      transform-origin: center;
      transform-box: fill-box;
      transition:
        opacity 0.5s ease,
        transform 0.55s cubic-bezier(0.34, 1.4, 0.5, 1);
    }

    @media (max-width: 640px) {
      display: none;
    }
  }

  &-node {
    transform-origin: center;
    transform-box: fill-box;
    transition: transform 0.3s cubic-bezier(0.34, 1.4, 0.5, 1), stroke 0.3s;
  }

  &-mobile {
    display: none;
    position: relative;
    z-index: 1;
    text-align: center;

    @media (max-width: 640px) {
      display: block;
    }
  }

  &-pill {
    @include body-03;
    display: inline-block;
    padding: rem(10) rem(20);
    border-radius: rem(100);
    font-weight: $font-weight-bold;
    letter-spacing: 0.02em;

    &.is-goal {
      border: rem(2) solid #0a1728;
      color: #0a1728;
      background: $d-white;
    }

    &.is-growth {
      background: #0a1728;
      color: $d-white;
    }
  }

  &-arrow {
    margin: rem(10) 0;
    color: #12a98f;
    font-size: rem(20);
    line-height: 1;
  }

  &-hub {
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: rem(280);
    margin: 0 auto;
    overflow: hidden;
    border-radius: rem(14);
    background: linear-gradient(135deg, #2296ce, #0f5f94);
    box-shadow: 0 rem(14) rem(30) rem(-18) rgba(21, 42, 61, 0.4);

    &-item {
      @include body-03;
      padding: rem(16) rem(8);
      border: 1px solid rgba(255, 255, 255, 0.22);
      color: $d-white;
      font-weight: $font-weight-bold;
    }
  }

  &-nodes {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: rem(9);
    max-width: rem(340);
    margin: rem(16) auto 0;
    padding: 0;
    list-style: none;
    text-align: left;

    &-item {
      @include body-03;
      position: relative;
      padding-left: rem(14);
      font-weight: $font-weight-bold;
      color: $d-black;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.5em;
        width: rem(5);
        height: rem(5);
        border-radius: 50%;
        background: #12a98f;
      }
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .adx-integrated-title,
  .adx-integrated-text,
  .adx-integrated-visual {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
</style>
