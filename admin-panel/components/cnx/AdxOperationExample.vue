<template>
  <div ref="sectionRef" class="adx-ops">
    <h2 class="adx-ops-title">운영사례</h2>
    <p class="adx-ops-desc">고객의 대표 파트너사 선정과 실제 운영 성과로 정리했습니다.</p>

    <ul class="adx-ops-grid">
      <li v-for="(item, index) in items" :key="item.id">
        <article
          class="adx-ops-card clickable"
          role="button"
          tabindex="0"
          :aria-label="`${item.title} 상세 보기`"
          @click="openPopup(index)"
          @keydown.enter.prevent="openPopup(index)"
          @keydown.space.prevent="openPopup(index)"
        >
          <div class="adx-ops-card-thumb">
            <img :src="item.image" :alt="item.imageAlt" loading="lazy">
          </div>
          <h3 class="adx-ops-card-title">{{ item.title }}</h3>
          <p class="adx-ops-card-category" v-html="item.category"></p>
          <p class="adx-ops-card-summary">{{ item.summary }}</p>
        </article>
      </li>
    </ul>

    <ClientOnly>
      <Teleport to="body">
        <div
          v-if="isOpen"
          class="adx-ops-popup"
          :class="{ 'is-desktop': isDesktop }"
          role="dialog"
          aria-modal="true"
          :aria-label="activeItem?.title"
          @click.self="closePopup"
        >
          <AppButton
            v-if="isDesktop"
            class="adx-ops-popup-nav prev"
            variant="circle"
            arrow="reverse"
            color="white"
            text=""
            aria-label="이전 운영사례"
            @click="slidePrev"
          />

          <swiper
            v-if="isDesktop"
            class="adx-ops-popup-swiper"
            :modules="swiperModules"
            :loop="true"
            :speed="450"
            :keyboard="{ enabled: true }"
            :initial-slide="activeIndex"
            @swiper="onSwiperInit"
          >
            <swiper-slide v-for="item in items" :key="item.id">
              <AdxOperationDetail :item="item" />
            </swiper-slide>
          </swiper>

          <div v-else class="adx-ops-popup-mobile">
            <button
              type="button"
              class="adx-ops-popup-close"
              aria-label="운영사례 닫기"
              @click="closePopup"
            >
              <span aria-hidden="true"></span>
            </button>
            <AdxOperationDetail :item="activeItem" />
          </div>

          <AppButton
            v-if="isDesktop"
            class="adx-ops-popup-nav next"
            variant="circle"
            arrow
            color="white"
            text=""
            aria-label="다음 운영사례"
            @click="slideNext"
          />
        </div>
      </Teleport>
    </ClientOnly>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Keyboard, A11y } from 'swiper/modules'
import AppButton from '~/components/cnx/AppButton.vue'
import AdxOperationDetail from '~/components/cnx/AdxOperationDetail.vue'
import 'swiper/css'

const IMAGE_BASE = '/assets/cnx/what-we-do/integrated-marketing/adx-full-funnel-agency'
const DESKTOP_QUERY = '(min-width: 1024px)'

const swiperModules = [Keyboard, A11y]
const sectionRef = ref(null)
const isDesktop = ref(false)
const isOpen = ref(false)
const activeIndex = ref(0)
const swiperInstance = ref(null)
let mediaQuery = null

const items = [
  {
    id: 1,
    title: '롯데손해보험 Wonderer',
    category: 'FINANCE Growth · Data Pipeline',
    popupCategory: 'FINANCE Growth · Data Pipeline',
    summary: '퍼널 기반 Growth 및 데이터 파이프라인 구축',
    image: `${IMAGE_BASE}/case-01.jpg`,
    imageAlt: 'wonderer 앱이 켜진 스마트폰을 들고 미소 짓는 여성',
    projectTitle: '퍼널 기반 Growth 및 데이터 파이프라인 구축',
    projectItems: [
      '퍼널 기반 Growth와 데이터 파이프라인 구축을 목표로 CRM 전략, MMP + BigQuery 기반 광고, AI 크리에이티브를 수행했습니다.',
    ],
    performances: [
      { value: '18%', label: 'CPA 개선' },
      { value: '200%', label: '광고 CTR 상승' },
    ],
    note: {
      title: '구축 완료',
      text: '데이터 리포팅 자동화 · MMP + BigQuery 기반 파이프라인',
    },
    client: '롯데손해보험',
    media: [{ src: `${IMAGE_BASE}/popup-01.jpg`, alt: 'wonderer 앱이 켜진 스마트폰을 들고 미소 짓는 여성' }],
  },
  {
    id: 2,
    title: '삼성카드 다이렉트 오토',
    category: 'FINANCE Performance Campaign',
    popupCategory: 'FINANCE Performance Campaign',
    summary: '브랜드 인지도 및 한도조회 전환 캠페인',
    image: `${IMAGE_BASE}/case-02.jpg`,
    imageAlt: '야경 속 흰색 카니발과 삼성카드 다이렉트 오토 캠페인 카피',
    projectTitle: '브랜드 인지도 및 한도조회 전환 캠페인',
    projectItems: [
      '자동차 구매 계획 중인 잠재고객을 대상으로 한도조회 이용을 유도했습니다.',
      '삼성카드로 자동차를 구매할 때 캐시백과 할부 이자 혜택을 강조해 카드 사용과 사이트 유입, 한도조회를 높였습니다.',
      '한도조회 완료 단가(CPA)를 개선하고 월평균 한도조회를 상승시켰습니다.',
    ],
    performances: [
      { value: '25.6%', label: '한도조회 CPA 감소' },
      { value: '12.3%', label: '한도조회 CVR 상승' },
      { value: '26.2%', label: '월평균 한도조회 상승' },
      { value: '12.4%', label: '월평균 사이트 유입 상승' },
    ],
    client: '삼성카드',
    media: [{ src: `${IMAGE_BASE}/popup-02.jpg`, alt: '삼성카드 다이렉트 오토 캠페인 비주얼' }],
  },
  {
    id: 3,
    title: 'LG Vehicle Solution',
    category: 'IT & ELECTRONICS<br>Global B2B Campaign',
    popupCategory: 'IT & ELECTRONICS Global B2B Campaign',
    summary: '글로벌 OEM 타깃 B2B 디지털 마케팅 운영',
    image: `${IMAGE_BASE}/case-03.jpg`,
    imageAlt: 'LG 로고가 있는 전기차와 두 사람이 마주 보는 장면',
    projectTitle: '글로벌 OEM 타깃 B2B 디지털 마케팅 운영',
    projectItems: [
      '글로벌 국가와 ABM 기반 OEM 계정을 병행해 주요 타깃 인지도를 확대했습니다.',
      '권역별 팔로워 단가를 비교해 효율을 조정하고 LinkedIn 팔로워를 확대했습니다.',
      '소재별 성과를 주기적으로 분석해 뉴스레터 리드 전환을 확대했습니다.',
      '매체·섹션별 효율 분석과 운영 최적화로 CPC, CTR을 개선하고 사이트 트래픽을 확대했습니다.',
    ],
    performances: [
      { value: '16.3배', label: 'CTR 상승' },
      { value: '76.2%', label: 'CPC 절감' },
      { value: '+96%', label: 'LinkedIn 팔로워 증가 · 2024.12 7.7만 명 대비 +7.3만 명 (2026.08)' },
    ],
    client: 'LG전자',
    media: [{ src: `${IMAGE_BASE}/popup-03.jpg`, alt: 'LG Vehicle Solution 캠페인 비주얼' }],
  },
  {
    id: 4,
    title: 'LG 키친',
    category: 'IT & ELECTRONICS<br>Global Social Campaign',
    popupCategory: 'IT & ELECTRONICS Global Social Campaign',
    summary: 'LG 키친 글로벌 소셜 채널 통합 운영',
    image: `${IMAGE_BASE}/case-04.jpg`,
    imageAlt: 'LG 냉장고 앞에서 조리 준비를 하는 여성과 키친 캠페인 카피',
    projectTitle: 'LG 키친 글로벌 소셜 채널 통합 운영',
    projectItems: [
      '소셜 콘텐츠 시딩을 통해 제품 인지도 제고와 사용 경험 확산에 기여했습니다.',
      'Instagram UGC 콘텐츠 운영으로 확산성과 유입 단가를 개선했습니다.',
      'Facebook, TikTok에서 크리에이터 콘텐츠 기반으로 국가별 타깃팅을 세분화하고, 아시아 12개국 대상 팔로워를 증대했습니다.',
    ],
    performances: [
      { value: '26%', label: '신규 팔로워 단가 개선' },
      { value: '+124%', label: '팔로워 증가' },
    ],
    client: 'LG전자',
    media: [{ src: `${IMAGE_BASE}/popup-04.jpg`, alt: 'LG 키친 글로벌 소셜 캠페인 비주얼' }],
  },
  {
    id: 5,
    title: 'LG 사이언스파크',
    category: 'IT & ELECTRONICS LinkedIn Campaign',
    popupCategory: 'IT & ELECTRONICS LinkedIn Campaign',
    summary: 'LinkedIn 채널 성장 캠페인',
    image: `${IMAGE_BASE}/case-05.jpg`,
    imageAlt: 'LG 사이언스파크 Highlights를 소개하는 로봇과 디바이스 비주얼',
    projectTitle: 'LinkedIn 채널 성장 캠페인',
    projectItems: [
      'LinkedIn 광고를 통해 채널 노출과 팔로워 성장을 확대했습니다.',
      'LinkedIn 셀프 광고 운영을 통해 팔로워·노출 중심의 채널 성장 전략을 수립했습니다.',
      '콘텐츠 특성과 캠페인 목적에 맞춰 포맷과 타깃팅 전략을 설계했습니다.',
      '캠페인별 성과 분석을 기반으로 예산과 운영 전략을 최적화했습니다.',
    ],
    performances: [
      { value: '+20%', label: 'LinkedIn 팔로워 상승 · 2025년 대비 4,000명 상승 (20,000명 → 24,000명)' },
    ],
    client: 'LG전자',
    media: [{ src: `${IMAGE_BASE}/popup-05.jpg`, alt: 'LG 사이언스파크 LinkedIn 캠페인 비주얼' }],
  },
  {
    id: 6,
    title: '한국타이어',
    category: 'MOBILITY Global Social Campaign',
    popupCategory: 'MOBILITY Global Social Campaign',
    summary: '글로벌·국내 SNS 채널 부스팅 캠페인',
    image: `${IMAGE_BASE}/case-06.jpg`,
    imageAlt: '한국타이어 ventus evo가 장착된 스포츠카 휠 클로즈업',
    projectTitle: '글로벌·국내 SNS 채널 부스팅 캠페인',
    projectItems: [
      'SNS 채널별 광고 전략을 기반으로 채널 성장과 브랜드 인지도를 확대했습니다.',
      'Meta, LinkedIn, TikTok 등 채널 특성에 맞는 광고와 타깃팅을 설계했습니다.',
      '팔로워, 도달, ER 등 핵심 KPI 기반으로 캠페인을 운영하고 성과를 관리했습니다.',
      '타깃과 캠페인 목적별 성과 분석으로 광고 효율을 최적화하고 채널 성장을 견인했습니다.',
    ],
    performances: [
      { value: '+58%', label: '운영 채널 성장 (Instagram · Facebook · LinkedIn · TikTok) 2024.01 대비 2026.07 · 약 97만 명 성장' },
    ],
    client: '한국앤컴퍼니',
    media: [{ src: `${IMAGE_BASE}/popup-06.jpg`, alt: '한국타이어 ventus evo 캠페인 비주얼' }],
  },
  {
    id: 7,
    title: '한국배터리',
    category: 'MOBILITY Brand Awareness Campaign',
    popupCategory: 'MOBILITY Brand Awareness Campaign',
    summary: '브랜드 SNS 채널 확대 및 인지도 제고',
    image: `${IMAGE_BASE}/case-07.jpg`,
    imageAlt: '야구장 마운드 위 한국배터리와 야구공, STRIKE ZONE 팝업 이벤트 안내',
    projectTitle: '브랜드 SNS 채널 확대 및 인지도 제고',
    projectItems: [
      '한국배터리 브랜드 인지도를 강화하고 트래픽과 SNS 채널 팔로워를 증대했습니다.',
      '네이버 브랜드 광고와 SEO 최적화로 브랜드 신뢰와 유입을 확대했습니다.',
      '인스타그램 콘텐츠 발행과 Meta 광고를 병행해 채널 노출, 팔로워, 인게이지먼트를 높였습니다.',
    ],
    performances: [
      { value: '790.8%', label: '브랜드 검색량 KPI 달성률' },
      { value: '406.3%', label: '브랜드 검색 노출 KPI 달성률' },
      { value: '+1,937명', label: '인스타그램 팔로워 증가' },
      { value: '+8,204명', label: '인스타그램 참여 증가' },
    ],
    client: '한국앤컴퍼니',
    media: [{ src: `${IMAGE_BASE}/popup-07.jpg`, alt: '한국배터리 브랜드 캠페인 비주얼' }],
  },
  {
    id: 8,
    title: '아모레퍼시픽 WPCC',
    category: 'BEAUTY Global Website Operation',
    popupCategory: 'BEAUTY Global Website Operation',
    summary: '12개 브랜드 50개 글로벌 웹사이트 통합 운영',
    image: `${IMAGE_BASE}/case-08.jpg`,
    imageAlt: 'HERA SIGNIA 제품과 글로벌 뷰티 웹사이트 화면',
    projectTitle: '12개 브랜드 50개 글로벌 웹사이트 통합 운영',
    projectItems: [
      '운영 정책과 거버넌스를 구축하고 KPI 관리로 개선 과제를 도출했습니다.',
      '사업부 요구부터 실행 플랜, 운영 보고까지 단일 창구로 수행했습니다.',
      '원천 소스 기반 콘텐츠 기획, 디자인, 퍼블리싱과 프론트엔드 UX/UI 고도화를 수행했습니다.',
      'UX/UI 기능, GA4 태깅, SEO/GEO 3개 파트 분업으로 사이트 품질과 완성도를 높였습니다.',
    ],
    performances: [
      { value: '52개', label: '사이트 · 플랫폼 확대' },
      { value: '16%', label: '투입 인력 절감' },
      { value: '+37%', label: 'PMO 당월 평균 처리 티켓' },
    ],
    client: '아모레퍼시픽',
    media: [{ src: `${IMAGE_BASE}/popup-08.jpg`, alt: '아모레퍼시픽 글로벌 웹사이트 운영 비주얼' }],
  },
  {
    id: 9,
    title: '한국타이어 벤투스',
    category: 'AI MODEL R&D<br>AI Model Contents R&D',
    popupCategory: 'MOBILITY AI Model Contents R&D',
    summary: '제품·주행 이미지를 촬영 없이 자동 생성 파이프라인으로 연결한 실험',
    image: `${IMAGE_BASE}/case-09.jpg`,
    imageAlt: '트랙을 주행하는 한국타이어 모터스포츠 차량',
    projectTitle: '제품·주행 이미지를 촬영 없이 자동 생성 파이프라인으로 연결한 실험',
    projectText: '속도감 있는 주행 장면과 타이어 제품 컷을 촬영 없이 자동 생성 방식으로 구성해, 제작 리드타임 단축 가능성을 검증했습니다.',
    brand: '한국타이어',
    status: 'R&D',
    media: [
      {
        src: `${IMAGE_BASE}/popup-09.jpg`,
        alt: '생성형 비디오로 만든 한국타이어 주행 장면',
        caption: 'GENERATIVE VIDEO 자동생성',
        meta: '28s',
      },
    ],
  },
  {
    id: 10,
    title: '롯데손해보험 Wonderer · AI 크리에이티브',
    category: 'AI CREATIVE AI 광고 Creative',
    popupCategory: 'AI CREATIVE AI 광고 Creative',
    summary: '여성·남성·통합 버전으로 타깃별 공감 포인트와 서비스 경험을 변주',
    image: `${IMAGE_BASE}/case-10.jpg`,
    imageAlt: 'wonderer 앱을 소개하는 남성과 놀란 표정으로 바라보는 동료들',
    projectTitle: '여성·남성·통합 버전으로 타깃별 공감 포인트와 서비스 경험을 변주',
    projectText: '보험을 어렵게 느끼지 않도록 디지털 플랫폼 경험을 인물 일상 시나리오로 전달하고, AI 가상 모델 생성 후 모델 일관성을 유지했습니다.',
    brand: '롯데손해보험',
    status: '제작 진행 중',
    media: [
      {
        src: `${IMAGE_BASE}/popup-10-a.jpg`,
        alt: '스마트폰을 바라보는 여성 타깃 버전 장면',
        caption: 'TARGET A 여성버전',
        meta: '39s',
      },
      {
        src: `${IMAGE_BASE}/popup-10-b.jpg`,
        alt: '마이크 앞에서 안경을 고쳐 쓰는 남성 타깃 버전 장면',
        caption: 'TARGET B 남성버전',
        meta: '40s',
      },
    ],
  },
]

const activeItem = computed(() => items[activeIndex.value] || items[0])

const syncDesktop = () => {
  isDesktop.value = mediaQuery?.matches ?? window.matchMedia(DESKTOP_QUERY).matches
}

const onSwiperInit = (swiper) => {
  swiperInstance.value = swiper
}

const openPopup = (index) => {
  activeIndex.value = index
  isOpen.value = true
  document.body.style.overflow = 'hidden'
  document.addEventListener('keydown', onEscape)
}

const closePopup = () => {
  isOpen.value = false
  document.body.style.overflow = ''
  document.removeEventListener('keydown', onEscape)
}

const onEscape = (event) => {
  if (event.key === 'Escape') closePopup()
}

const slidePrev = () => {
  swiperInstance.value?.slidePrev()
}

const slideNext = () => {
  swiperInstance.value?.slideNext()
}

let lastScrollY = 0
useIntersectionObserver(
  sectionRef,
  ([{ isIntersecting }]) => {
    const currentScrollY = window.scrollY || window.pageYOffset
    const isScrollingDown = currentScrollY > lastScrollY
    lastScrollY = currentScrollY

    if (isIntersecting && isScrollingDown) {
      sectionRef.value?.classList.add('active')
    } else if (!isIntersecting && !isScrollingDown) {
      sectionRef.value?.classList.remove('active')
    }
  },
  {
    threshold: 0.15,
    rootMargin: '-50px',
  }
)

onMounted(() => {
  mediaQuery = window.matchMedia(DESKTOP_QUERY)
  syncDesktop()
  mediaQuery.addEventListener('change', syncDesktop)
})

onBeforeUnmount(() => {
  mediaQuery?.removeEventListener('change', syncDesktop)
  closePopup()
})
</script>

<style lang="scss" scoped>
.adx-ops {
  * {
    word-break: keep-all;
  }

  &-title,
  &-desc,
  &-card {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }

  &-title {
    margin: 0 auto rem(8);
    font-size: rem(22);
    font-weight: $font-weight-bold;
    line-height: $line-height-normal;
    text-align: center;

    @include tablet {
      font-size: rem(32);
    }

    @include desktop {
      font-size: rem(42);
      margin-bottom: 0;
    }
  }

  &-desc {
    margin: 0 auto rem(32);
    color: $n-dark-gray;
    font-size: $font-size-body3-mobile;
    line-height: $line-height-loose;
    text-align: center;

    @include tablet {
      font-size: $font-size-body3-tablet;
      margin-bottom: rem(40);
    }

    @include desktop {
      font-size: rem(18);
      margin: rem(16) auto rem(48);
    }
  }

  &-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: rem(20) rem(12);
    margin: 0 0 rem(60);
    padding: 0;
    list-style: none;

    @include tablet {
      gap: rem(32) rem(20);
      margin-bottom: rem(120);
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: rem(40) rem(24);
    }
  }

  &-card {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0;
    border: 0;
    background: transparent;
    text-align: left;
    color: inherit;

    &.clickable {
      cursor: pointer;

      &:hover .adx-ops-card-thumb img,
      &:focus-visible .adx-ops-card-thumb img {
        transform: scale(1.03);
      }
    }

    &-thumb {
      order: 1;
      overflow: hidden;
      margin-top: rem(24);
      border-radius: rem(16);
      aspect-ratio: 300 / 378;
      background: $n-gray;

      @include tablet {
        order: 0;
        margin-top: 0;
        border-radius: rem(24);
      }

      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s ease;
      }
    }

    &-title {
      margin: 0;
      color: $d-black;
      font-size: rem(13);
      font-weight: $font-weight-bold;
      line-height: $line-height-relaxed;

      @include tablet {
        margin-top: rem(24);
        font-size: rem(16);
      }

      @include desktop {
        margin-top: rem(32);
        font-size: rem(18);
      }
    }

    &-category {
      margin: rem(4) 0 0;
      color: $p-green;
      font-size: rem(12);
      font-weight: $font-weight-bold;
      line-height: $line-height-relaxed;

      @include tablet {
        font-size: rem(14);
      }
    }

    &-summary {
      margin: rem(4) 0 0;
      color: $n-dark-gray;
      font-size: rem(12);
      font-weight: $font-weight-regular;
      line-height: $line-height-loose;

      @include tablet {
        font-size: rem(14);
      }
    }
  }

  &.active {
    .adx-ops-title,
    .adx-ops-desc,
    .adx-ops-card {
      opacity: 1;
      transform: translateY(0);
    }

    .adx-ops-grid > li {
      @for $i from 1 through 10 {
        &:nth-child(#{$i}) .adx-ops-card {
          transition-delay: #{($i - 1) * 0.06}s;
        }
      }
    }
  }
}

.adx-ops-popup {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: rem(16);
  overflow: auto;
  background: rgba(0, 0, 0, 0.55);

  @media (min-width: 1024px) {
    align-items: center;
    gap: rem(16);
    padding: rem(32);
  }
  @media (min-width: 768px) {
    padding: 0;
  }

  &-swiper {
    width: min(1080px, calc(100vw - 180px));

    :deep(.swiper-slide) {
      height: auto;
    }
  }

  &-nav {
    flex-shrink: 0;
  }

  &-mobile {
    position: relative;
    width: 100%;
    margin: 0;
  }

  &-close {
    position: absolute;
    top: rem(16);
    right: rem(16);
    z-index: 2;
    width: 32px;
    height: 32px;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;

    span,
    span::before,
    span::after {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 16px;
      height: 1.5px;
      background: $d-white;
    }

    span {
      background: transparent;

      &::before {
        content: '';
        transform: translate(-50%, -50%) rotate(45deg);
      }

      &::after {
        content: '';
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    }
  }
}
</style>
