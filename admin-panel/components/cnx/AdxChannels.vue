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
  margin-bottom: rem(66);

  @include tablet {
    margin-bottom: rem(60);
  }

  @include desktop {
    margin-bottom: rem(120);
  }
}

.adx-channels-head {
  text-align: center;
}

.adx-channels-title {
  @include sub-headline-01;
  margin: 0;
  color: $d-black;
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.8s ease-out,
    transform 0.8s ease-out;
}

.adx-channels-text {
  @include body-02;
  margin: rem(22) 0 0;
  color: $d-black;
  line-height: 1.6;
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.8s ease-out 0.15s,
    transform 0.8s ease-out 0.15s;
}

.adx-channels-subtitle {
  margin: rem(24) 0 0;
  color: #0400ad;
  font-weight: $font-weight-bold;
  font-size: rem(26);
  line-height: 1.2;
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.8s ease-out 0.3s,
    transform 0.8s ease-out 0.3s;

  @include tablet {
    font-size: rem(36);
  }

  @include desktop {
    font-size: rem(48);
  }
}

.adx-channels-visual {
  display: none;
  width: 100%;
  max-width: 1920px;
  margin: rem(40) auto 0;
  opacity: 0;
  transform: translateY(50px);
  transition:
    opacity 0.8s ease-out,
    transform 0.8s ease-out;

  @include tablet {
    display: block;
    margin-top: rem(48);
  }

  img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: contain;
  }
}

.adx-channels-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  margin: rem(32) 0 0;
  padding: 0;
  list-style: none;

  @include tablet {
    display: none;
  }
}

.adx-channels-list-item {
  padding: 15px 16px;
  border: 1px solid #e1e7ed;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 10px 22px -18px rgba(21, 42, 61, 0.28);
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.8s ease-out,
    transform 0.8s ease-out;

  @for $i from 1 through 10 {
    &:nth-child(#{$i}) {
      transition-delay: #{0.2 + ($i - 1) * 0.06}s;
    }
  }
}

.adx-channels-list-title {
  display: block;
  margin-bottom: 4px;
  font-size: rem(14);
  font-weight: 800;
  letter-spacing: -0.015em;
  color: $d-black;
}

.adx-channels-list-desc {
  font-size: rem(12.5);
  line-height: 1.55;
  color: $gray-1;
}

.adx-channels.is-in {
  .adx-channels-title,
  .adx-channels-text,
  .adx-channels-subtitle,
  .adx-channels-visual,
  .adx-channels-list-item {
    opacity: 1;
    transform: none;
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
