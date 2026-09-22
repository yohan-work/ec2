<template>
  <AppImgCont :title="title" :text="text" :reverse="true">
    <div ref="visualRef" class="adx-integrated-visual" :class="{ 'is-in': isIn }">
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
  </AppImgCont>
</template>

<script setup>
import { onMounted, ref, useId } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import AppImgCont from '~/components/cnx/AppImgCont.vue'
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

const visualRef = ref(null)
const svgRef = ref(null)
const isIn = ref(false)

useIntersectionObserver(
  visualRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) isIn.value = true
  },
  {
    threshold: 0.2,
  }
)

onMounted(() => {
  applySvgPop(svgRef.value)
})
</script>

<style lang="scss" scoped>
.adx-integrated-visual {
  position: relative;
  width: 100%;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
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

.adx-integrated-diagram {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  max-width: 940px;
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
}

.adx-integrated-visual.is-in .adx-integrated-diagram :deep(.pop) {
  opacity: var(--pop-opacity, 1);
  transform: none;
}

.adx-integrated-node {
  transform-origin: center;
  transform-box: fill-box;
  transition:
    transform 0.3s cubic-bezier(0.34, 1.4, 0.5, 1),
    stroke 0.3s;
}

.adx-integrated-visual.is-in .adx-integrated-node:hover {
  transform: scale(1.09);
  stroke: #12a98f;
}

.adx-integrated-mobile {
  display: none;
  position: relative;
  z-index: 1;
  text-align: center;
}

.adx-integrated-pill {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 100px;
  font-weight: 800;
  font-size: 13px;
  letter-spacing: 0.02em;

  &.is-goal {
    border: 2px solid #0a1728;
    color: #0a1728;
    background: #fff;
  }

  &.is-growth {
    background: #0a1728;
    color: #fff;
  }
}

.adx-integrated-arrow {
  margin: 10px 0;
  color: #12a98f;
  font-size: 20px;
  line-height: 1;
}

.adx-integrated-hub {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 280px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 14px;
  background: linear-gradient(135deg, #2296ce, #0f5f94);
  box-shadow: 0 14px 30px -18px rgba(21, 42, 61, 0.4);
}

.adx-integrated-hub-item {
  padding: 16px 8px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  color: #fff;
  font-weight: 800;
  font-size: 12.5px;
  letter-spacing: -0.01em;
}

.adx-integrated-nodes {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 9px;
  max-width: 340px;
  margin: 16px auto 0;
  padding: 0;
  list-style: none;
  text-align: left;
}

.adx-integrated-nodes-item {
  position: relative;
  padding-left: 14px;
  font-size: 12.5px;
  font-weight: 700;
  color: #152a3d;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.5em;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #12a98f;
  }
}

@media (max-width: 640px) {
  .adx-integrated-diagram {
    display: none;
  }

  .adx-integrated-mobile {
    display: block;
  }
}
</style>
