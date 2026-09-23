<template>
  <section ref="sectionRef" class="adx-modules" :class="{ 'is-in': isIn }">
    <div class="adx-modules-copy">
      <h2 class="adx-modules-title">그로스 시스템은 6개의 실행 모듈로 작동합니다</h2>
      <p class="adx-modules-text">
        브리프 한 줄에서 광고 집행까지, Integrated Growth System은<br />
        6개의 실행 모듈이 하나의 목표로 맞물려 움직입니다.
      </p>

      <div class="adx-modules-tabs" role="tablist" aria-label="ADX 성장 시스템 모듈">
        <button
          v-for="item in modules"
          :key="item.id"
          type="button"
          class="adx-modules-tab"
          :class="{ 'is-active': activeId === item.id }"
          :aria-selected="activeId === item.id"
          @click="activeId = item.id"
        >
          {{ item.tab }}
        </button>
      </div>

      <div class="adx-modules-panel">
        <div
          v-for="item in modules"
          :key="item.id"
          class="adx-modules-view"
          :hidden="activeId !== item.id"
        >
          <h3 class="adx-modules-view-title">{{ item.title }}</h3>
          <p class="adx-modules-view-summary">{{ item.summary }}</p>
          <div class="adx-modules-block">
            <span class="adx-modules-label">WHAT IT DOES</span>
            <p class="adx-modules-block-text" v-html="item.does"></p>
          </div>
          <div class="adx-modules-block">
            <span class="adx-modules-label">WHY IT MATTERS</span>
            <p class="adx-modules-block-text" v-html="item.matters"></p>
          </div>
        </div>
      </div>
    </div>

    <div class="adx-modules-card">
      <div
        v-for="item in modules"
        :key="item.id"
        class="adx-modules-card-view"
        :hidden="activeId !== item.id"
      >
        <div class="adx-modules-media">
          <img :src="item.image" :alt="item.imageAlt" />
        </div>
        <div class="adx-modules-card-body">
          <div class="adx-modules-card-name">{{ item.cardName }}</div>
          <div class="adx-modules-stats">
            <div v-for="stat in item.stats" :key="stat.label" class="adx-modules-stat">
              <strong class="adx-modules-stat-value">{{ stat.value }}</strong>
              <span class="adx-modules-stat-label">{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const assetBase = '/assets/cnx/what-we-do/integrated-marketing/adx-full-funnel-agency'

const modules = [
  {
    id: '1',
    tab: '소재 제작',
    title: '자동화 소재 제작 시스템',
    summary: '카피발산 · 시안 생성 · 사이즈베리에이션 · 광고투입',
    does: '브리프 한 줄로 카피 발산·시안 생성<br>사이즈 베리에이션·광고 투입까지 잇는 소재 생산 라인',
    matters: '크리에이티브 퀄리티 유지와 소재 교체 주기 단축을 통한<br>학습 가속화 및 소재 물량 확보',
    cardName: '소재 제작',
    image: `${assetBase}/growth01.png`,
    imageAlt: '소재 스튜디오 화면과 자동 생성된 광고 소재 갤러리',
    stats: [
      { value: '28장', label: '1회차 카피 산출' },
      { value: '22판형', label: 'DA 소재 템플릿' },
    ],
  },
  {
    id: '2',
    tab: '검색 여정',
    title: '검색 여정 시스템',
    summary: '수요 단계 분석 · 미포착 수요 발굴 · 키워드 확장 · 소구점 설계',
    does: '검색 쿼리와 이동 경로의 수요 단계별 분석을 통한 미포착 수요 발굴 및 검색 인텔리전스를 고도화',
    matters: '검색·문맥 데이터 기반 키워드 확장과 소구점 설계 연계를 통한 전환 증분 확보',
    cardName: '검색 여정',
    image: `${assetBase}/growth02.png`,
    imageAlt: '검색 여정 분석 대시보드와 키워드별 수요 단계 흐름도',
    stats: [
      { value: '643개', label: '수집 키워드' },
      { value: '1,127개', label: '키워드 연결' },
    ],
  },
  {
    id: '3',
    tab: '사이트 개인화',
    title: '사이트 개인화 시스템',
    summary: '유입채널 · 맥락 의도 · 카피 A/B · 레이아웃',
    does: '유입 채널과 검색 의도별로 첫 화면 카피와 페이지 구역 구성을 교체하는 온사이트 개인화',
    matters: '매체비 증액 없이 기존 트래픽의 전환율을 끌어올리는 CPA 직접 개선',
    cardName: '사이트 개인화',
    image: `${assetBase}/growth03.png`,
    imageAlt: '유입 채널별로 첫 화면 카피가 교체되는 온사이트 개인화 화면',
    stats: [{ value: '10 Type', label: 'A/B TEST Site' }],
  },
  {
    id: '4',
    tab: '경쟁사 수집',
    title: '경쟁사 소재 수집 에이전트',
    summary: '집행 소재 · 물량 · 운영 기간 · 소구 축',
    does: '경쟁 광고주의 집행 소재·물량·운영 기간·소구축을 매일 자동 적재하는 경쟁 크리에이티브 인텔리전스',
    matters: '크리에이티브 퀄리티 유지와 소재 교체 주기 단축을 통한 학습 가속화 및 소재 물량 확보',
    cardName: '경쟁사 수집',
    image: `${assetBase}/growth04.png`,
    imageAlt: '경쟁 광고주의 집행 소재와 물량을 정리한 인텔리전스 대시보드',
    stats: [
      { value: '234건', label: '수집 경쟁 소재' },
      { value: '51곳', label: '집행 중 광고주' },
    ],
  },
  {
    id: '5',
    tab: '마케팅 E2E',
    title: '제품 출시부터 마케팅 E2E 시스템',
    summary: '수요 리서치 · 제품 기획 · 채널 믹스 예산 · 크리에이티브',
    does: '수요 리서치·제품 기획·12주 채널 믹스와 예산 배분·컷 단위<br>크리에이티브를 한 흐름으로 묶은 출시 실행 파이프라인',
    matters: '기획·미디어·제작으로 나뉜 공정을 단일 라인으로 합친 출시 리드타임 단축',
    cardName: '마케팅 E2E',
    image: `${assetBase}/growth05.png`,
    imageAlt: '12주 채널 운영 계획표와 컷 단위 크리에이티브 승인 화면',
    stats: [
      { value: '12주', label: '채널 운영 계획' },
      { value: '109개', label: '컨텐츠 제작 갯수' },
    ],
  },
  {
    id: '6',
    tab: 'AI 상담',
    title: 'AI 상담 에이전트',
    summary: '자동 발신 · 응대 · 통화 기록 · 예약 적재',
    does: '아웃바운드 상담 자동화로 광고 리드 자동 발신·응대와 통화 녹취<br>예약 결과 적재까지 처리',
    matters: '인력 증원 없이 응답 속도와 콜 커버리지를 확보하는 리드 대비 예약 전환 방어',
    cardName: 'AI 상담',
    image: `${assetBase}/growth06.png`,
    imageAlt: 'AI 상담 리드 DB와 통화 기록·녹취 관리 화면',
    stats: [
      { value: '3회', label: '리드당 시도 한도' },
      { value: '100%', label: '통화 기록·적재' },
    ],
  },
]

const activeId = ref('1')
const sectionRef = ref(null)
const isIn = ref(false)
let lastScrollY = 0
let isFirstCheck = true

useIntersectionObserver(
  sectionRef,
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
.adx-modules {
  display: flex;
  flex-direction: column;
  gap: rem(38);
  margin-bottom: rem(80);
  @include tablet {
    flex-direction: row;
    align-items: flex-start;
    gap: rem(24 );    
  }

  @include desktop {
    gap: rem(32);
    margin-bottom: rem(120);
    padding-block:rem(80);
  }

  &-copy {
    flex: 1;
    min-width: 0;
  }

  &-title,
  &-text,
  &-tabs,
  &-panel,
  &-card {
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
    margin: rem(22) 0 0;
    color: $gray-1;
    transition-delay: 0.15s;
  }

  &-tabs {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    gap: rem(8) rem(4);
    margin-top: rem(24);
    transition-delay: 0.25s;

    @include desktop {
      gap: rem(12);
    }
  }

  &-tab {
    padding: rem(6.5) rem(16);
    border: 1px solid $gray-1;
    border-radius: rem(32);
    background: transparent;
    color: $gray-1;
    font-size: rem(14);
    font-weight: 500;
    cursor: pointer;

    &:focus-visible {
      outline-offset: 3px;
    }

    &.is-active {
      background-color: $p-dark-blue;
      border-color: $p-dark-blue;
      color: $d-white;
    }
  }

  &-panel {
    margin-top: rem(48);
    transition-delay: 0.35s;

    @include tablet {
      margin-top: rem(24);
    }
  }

  &-view-title {
    @include body-01;
    margin: 0;
    color: $d-black;
  }

  &-view-summary {
    @include body-02;
    margin: rem(24) 0 0;
    color: $gray-1;
  }

  &-block {
    position: relative;
    margin-top: rem(24);
    padding-left: rem(14);

    &::before {
      content: '';
      position: absolute;
      background:#12A98F;
      width: rem(4);
      height: rem(4);
      border-radius: 50%;
      left: 0;
      top: rem(10);
    }
  }

  &-label {
    @include body-03;
    display: block;
    color: #12a98f;
    font-weight: $font-weight-bold;
    letter-spacing: 0.14em;
  }

  &-block-text {
    @include body-03;
    color: $gray-1;
  }

  &-card {
    position: relative;
    overflow: hidden;
    flex: 1;
    min-width: 0;
    border-radius: rem(8);
    background: $p-dark-blue;
    color: $d-white;
    transform: translateY(rem(50));

    &-body {
      padding-top: rem(16);

      @include desktop {
        padding-top: rem(30);
      }
    }
  }

  &-card-view {
    padding: rem(16);

    @include desktop {
      padding: rem(40);
    }
  }

  &-media {
    border-radius: rem(4);
    overflow: hidden;
    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }

  &-card-name {
    @include body-03;
    position: relative;
    margin-bottom: rem(20);
    padding-bottom: rem(16);
    color: $d-white;
    font-weight: $font-weight-bold;

    &::after {
      content: '';
      position: absolute;
      inset: auto 0 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.12);
    }
  }

  &-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(rem(120), 1fr));
  }

  &-stat-value {
    @include body-01;
    display: block;
    color: $s-teal;
    font-variant-numeric: tabular-nums;
  }

  &-stat-label {
    @include body-03;
    display: block;
    margin-top: rem(8);
    color: $d-white;
  }

  &.is-in {
    .adx-modules-title,
    .adx-modules-text,
    .adx-modules-tabs,
    .adx-modules-panel,
    .adx-modules-card {
      opacity: 1;
      transform: none;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .adx-modules-title,
  .adx-modules-text,
  .adx-modules-tabs,
  .adx-modules-panel,
  .adx-modules-card {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
</style>
