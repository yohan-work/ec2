<template>
  <section ref="sectionRef" class="adx-channels" :class="{ 'is-in': isIn }">
    <div class="inner">
      <div class="adx-channels-head">
        <h2 class="adx-channels-title">
          ADX는 전략부터 실행까지,<br />하나의 팀이 움직이는 종합광고 서비스를
          제공합니다
        </h2>
        <p class="adx-channels-text">
          ADX는 여러 대행사를 오가는 협업이 아니라, 하나의 팀이 기획부터
          실행까지 같은 목표로 움직입니다.
        </p>
        <h3 class="adx-channels-subtitle">
          Full AI driven <br class="br-mo" />
          종합 광고 서비스
        </h3>
      </div>
    </div>

    <picture class="adx-channels-visual">
      <img
        src="/assets/cnx/what-we-do/integrated-marketing/adx-full-funnel-agency/adx-channels.png"
        :alt="imageAlt"
      />
    </picture>

    <div class="inner">
      <ul class="adx-channels-list">
        <li
          v-for="(item, index) in channels"
          :key="item.title"
          class="adx-channels-list-item"
        >
          <strong class="adx-channels-list-title">{{ item.title }}</strong>
          <span class="adx-channels-list-desc">{{ item.description }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const channels = [
  {
    title: '검색 광고',
    description: '네이버, 구글 등 키워드 검색 시 노출되는 광고입니다.',
  },
  {
    title: 'SEO',
    description: '검색 결과 상위 노출을 위해 웹사이트·콘텐츠를 최적화합니다.',
  },
  {
    title: 'GEO',
    description: 'AI 챗봇·생성형 검색이 브랜드를 추천하도록 최적화합니다.',
  },
  {
    title: '디스플레이 광고',
    description:
      '포털, 커뮤니티 등 다양한 웹사이트에 이미지로 노출되는 광고입니다.',
  },
  {
    title: 'SNS 광고',
    description: '인스타그램, 페이스북 등 소셜 채널에서 진행합니다.',
  },
  {
    title: '영상 광고',
    description: '유튜브 등에서 브랜딩과 퍼포먼스를 함께 잡습니다.',
  },
  {
    title: '바이럴 마케팅',
    description: '블로그, 카페 등 다양한 채널에 콘텐츠를 배포합니다.',
  },
  {
    title: '라이브커머스',
    description:
      '브랜드와 제품에 맞는 라이브 방송을 기획하여 실시간 구매로 연결합니다.',
  },
  {
    title: '앱 광고',
    description: '모바일 앱 안에서 이미지·영상 형태로 노출됩니다.',
  },
  {
    title: 'PR · 언론홍보',
    description: '다양한 매체를 통해 브랜드 소식을 전달합니다.',
  },
]

const imageAlt = computed(() =>
  channels.map(item => `${item.title}: ${item.description}`).join(' ')
)

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
.adx-channels {
  margin-bottom: rem(60);

  @include tablet {
    margin-bottom: rem(120);
  }

  &-head {
    text-align: center;
    padding-top: rem(60);
  }

  &-title,
  &-text,
  &-subtitle,
  &-visual,
  &-list-item {
    opacity: 0;
    transform: translateY(rem(30));
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }

  &-title {
    @include sub-headline-01;
    margin: 0;
    color: $d-black;
  }

  &-text {
    @include body-02;
    margin: rem(24) 0 0;
    color: $d-black;
    transition-delay: 0.15s;
  }

  &-subtitle {
    @include sub-headline-01;
    margin: rem(24) 0 0;
    // color: #0400ad;
    background: linear-gradient(90deg, #0097A7 0%, #0400AD 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
    transition-delay: 0.3s;
    @include tablet {
      margin-top: rem(60);
    }
  }

  &-visual {
    display: none;
    width: 100%;
    max-width: rem(1920);
    margin: rem(40) auto 0;
    transform: translateY(rem(50));

    @include tablet {
      display: block;
      margin-top: rem(60);
    }

    img {
      display: block;
      width: 100%;
      height: auto;
      object-fit: contain;
    }
  }

  &-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: rem(10);
    margin: rem(32) 0 0;
    padding: 0;
    list-style: none;

    @include tablet {
      display: none;
    }
  }

  &-list-item {
    padding: rem(15) rem(16);
    border: 1px solid $gray-2;
    border-radius: rem(12);
    background: $d-white;
    box-shadow: 0 rem(10) rem(22) rem(-18) rgba(21, 42, 61, 0.28);

    @for $i from 1 through 10 {
      &:nth-child(#{$i}) {
        transition-delay: #{0.2 + ($i - 1) * 0.06}s;
      }
    }
  }

  &-list-title {
    @include body-03;
    display: block;
    margin-bottom: rem(4);
    font-weight: $font-weight-bold;
    color: $d-black;
  }

  &-list-desc {
    @include body-03;
    color: $gray-1;
  }

  &.is-in {
    .adx-channels-title,
    .adx-channels-text,
    .adx-channels-subtitle,
    .adx-channels-visual,
    .adx-channels-list-item {
      opacity: 1;
      transform: none;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .adx-channels-title,
  .adx-channels-text,
  .adx-channels-subtitle,
  .adx-channels-visual,
  .adx-channels-list-item {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
</style>
