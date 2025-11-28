<template>
  <div class="careers">

    <AppKeyVisual 
      imageAlt="밝은 사무실에서 컴퓨터와 태블릿을 사용하며 협업하거나 개별 업무를 하는 직장인들의 모습." 
      :animationDuration="1500"
    />

    <AppTitle title="Careers" text="콘센트릭스에서 새로운 성장의 기회를 만나보세요." class="careers-custom-title" />

    <AppSwiper :effect="'fade'" :autoplay="5000" class="careers__swiper">

      <div class="careers__swiper-item">
        <picture>
          <source srcset="/assets/cnx/careers/slide_01.png" media="(min-width: 1024px)" />
          <source srcset="/assets/cnx/careers/slide_01_t.png" media="(min-width: 768px)" />
          <img src="/assets/cnx/careers/slide_01_m.png"
            alt="Life at Concentrix: 다양한 인종과 배경의 인물 사진으로 구성된 포용적 조직 문화를 소개하는 배너" loading="lazy" />
        </picture>
        <div class="careers__swiper-content">
          <strong class="careers__swiper-title">Life at Concentrix</strong>
          <p class="careers__swiper-text">
            우리는 옳은 일은 한다고 믿습니다.<br>
            콘센트릭스는 모두가 존중받는 사회를 꿈꾸며 수평적인 조직 문화를 가지고 있습니다.<br>
            구성원의 다양한 의견과 가치관의 공존을 지향하며 지속 가능한 글로벌 비즈니스를 위해<br>
            각 영역의 전문가 집단을 운영합니다.
          </p>
        </div>
      </div>

      <div class="careers__swiper-item">
        <picture>
          <source srcset="/assets/cnx/careers/slide_02.png" media="(min-width: 1024px)" />
          <source srcset="/assets/cnx/careers/slide_02_t.png" media="(min-width: 768px)" />
          <img src="/assets/cnx/careers/slide_02_m.png"
            alt="Our Operating Philosophies: 경영 철학('Visibility', 'Velocity', 'Value')에 대한 설명과 함께 다인종 청년들의 행복한 사진이 조합된 배너"
            loading="lazy" />
        </picture>
        <div class="careers__swiper-content">
          <strong class="careers__swiper-title">Our Operating Philosophies</strong>
          <div class="careers__swiper-group">
            <p>
              <b>Visibility</b><br>
              <span>조직 전체에서 문제를 정확하게 파악하고 기회를 제공합니다.</span>
            </p>
            <p>
              <b>Velocity</b><br>
              <span>변화에 신속하게 대처하고 문제를 해결하여 커다란 전환점을 마련합니다.</span>
            </p>
            <p>
              <b>Value</b><br>
              <span>우리는 직원, 고객, 주주의 이익을 최우선으로 생각합니다.</span>
            </p>
          </div>
        </div>
      </div>

      <div class="careers__swiper-item">
        <picture>
          <source srcset="/assets/cnx/careers/slide_03.png" media="(min-width: 1024px)" />
          <source srcset="/assets/cnx/careers/slide_03_t.png" media="(min-width: 768px)" />
          <img src="/assets/cnx/careers/slide_03_m.png"
            alt="Our Cultures: 'status quo 거부', '탁월함 추구', '정직한 협력', '고객 승리', 'One Concentrix'를 강조하는 기업 문화 텍스트와 함께 왼쪽 상단에 있는 하트 아이콘"
            loading="lazy" />
        </picture>
        <div class="careers__swiper-content a11y-hidden">
          <strong class="sub-headline-01">Our Culture</strong>
          <p class="body-02">
            We are not here for the status quo!<br>
            We are changing the game<br>
            in our pursuit of excellence.<br>
            We are fighting for better brand experiences.<br>
            Championing our people.<br>
            Acting with integrity.<br>
            Collaborating constructively.<br>
            Always with exemplary character!<br>
            We win only when our clients win.<br>
            We are<br>
            Our Team.<br>
            Our Company.<br>
            Our Concentrix.<br>
          </p>
        </div>
      </div>
    </AppSwiper>

    <AppTab v-model="activeTab" :tabs="[
      { label: 'Digital & Technology Business', slot: 'business' },
      { label: 'Customer Service', slot: 'service' }
    ]" @tab-change="handleTabChange" class="careers__tab">
      <template #business>
        <!-- Digital & Technology Business 탭 내용 -->
        <section class="inner">

          <div class="careers__group">

            <div class="careers__title">
              <h2 class="careers__title-headline">Digital & Technology Business</h2>
            </div>

            <!-- banner -->
            <CareersBanner title="상시채용"
              content="콘센트릭스 코리아는 <br class='banner-br'>전문가 분들을 기다리고 있습니다.<br>지원서를 보내주시면 인사팀 담당자가 <br class='banner-br'>업무 역할에 맞는 팀과 연결하여 <br class='banner-br'>빠르게 연락 드립니다."
              buttonText="지원하기" href="mailto:recruiter_catalyst_korea@concentrix.com" />

            <CareersBusiness title="Our Works" :items="businessItems" />

          </div>

          <!-- Benefit -->
          <CareersBenefit title="Attractive Benefits" :items="businessBenefits" />

          <!-- Q&A -->
          <CareersQna title="채용 Q&A" :items="businessQnaItems" refName="business" />

          <!-- FAQ -->
          <CareersFaq mailto="recruiter_catalyst_korea@concentrix.com" />

        </section>
      </template>

      <template #service>
        <!-- Customer Service 탭 내용 -->
        <div class="inner">

          <div class="careers__group">

            <div class="careers__title has-button-tab">
              <h2 class="careers__title-headline">Customer Service</h2>
            </div>

            <AppButtonTab v-model="activeButtonTab" :tabs="[
              { text: '상담직' },
              { text: '비상담직' }
            ]" alignment="center" @tab-change="handleButtonTabChange" class="careers__button-tab">
              <template #tab-0>
                <!-- 상담직 탭 내용 -->
                <h3 class="a11y-hidden">상담직</h3>

                <!-- banner -->
                <CareersBanner headingLevel="h4" title="고객의 여정이 시작되는 <br class='banner-br'>첫 순간, <br class='banner-br-pc'> 최고의 경험을 만들 <br class='banner-br'>컨택센터 전문가를 모십니다."
                  content="탁월한 커뮤니케이션과 혁신적인 서비스로 고객 <br class='banner-br'>경험의 시작을 설계할 당신을 기다립니다." buttonText="채용 바로가기"
                  href="https://www.jobkorea.co.kr/Recruit/GI_Read/47933297" bannerType="customer" />

                <!-- Benefit -->
                <CareersBenefit headingLevel="h4" title="Attractive Benefits" :items="agentBenefits" />

              </template>

              <template #tab-1>
                <!-- 비상담직 탭 내용 -->
                <h3 class="a11y-hidden">비상담직</h3>

                <CareersBanner headingLevel="h4" title="상시채용"
                  content="콘센트릭스 코리아는 <br class='banner-br'>전문가 분들을 기다리고 있습니다.<br>지원서를 보내주시면 인사팀 담당자가 <br class='banner-br'>업무 역할에 맞는 팀과 연결하여 <br class='banner-br'>빠르게 연락 드립니다."
                  buttonText="지원하기" href="mailto:KR.CS.TA-NONAGENT@concentrix.com" />

                <div class="careers__group">
                  <!-- What we do work -->
                  <!-- <CareersVisualTitle headingLevel="h4" title="Customer Service<br><span>비상담직에서 하는 일</span>" /> -->

                  <CareersNonAgent headingLevel="h4" title="Our Works" :items="nonAgentItems" />
                </div>

                <!-- Benefit -->
                <CareersBenefit headingLevel="h4" title="Attractive Benefits" :items="nonAgentBenefits"
                  :isVisible="activeButtonTab === 1" />

              </template>

            </AppButtonTab>
          </div>

          <!-- Q&A -->
          <CareersQna title="채용 Q&A" :items="customerServiceQnaItems" refName="cs" />

          <!-- FAQ -->
          <CareersFaq mailto="ta@concentrix.com" />

        </div>
      </template>
    </AppTab>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import AppKeyVisual from '~/components/cnx/AppKeyVisual'
import AppTitle from '~/components/cnx/AppTitle'
import AppTab from '~/components/cnx/AppTab'
import AppSwiper from '~/components/cnx/AppSwiper'
import AppButtonTab from '~/components/cnx/AppButtonTab'

import CareersBusiness from './CareersBusiness'
import CareersBenefit from './CareersBenefit'
import CareersNonAgent from './CareersNonAgent'
import CareersQna from './CareersQna'
import CareersBanner from './CareersBanner'
import CareersFaq from './CareersFaq'

definePageMeta({
  layout: 'concentrix',
  ssr: false,
})

const route = useRoute()
const activeTab = ref(0)
const activeButtonTab = ref(0)

// 쿼리 파라미터에서 탭 인덱스 읽기
onMounted(() => {
  const tabParam = route.query.tab
  if (tabParam !== undefined) {
    const tabIndex = parseInt(tabParam)
    if (!isNaN(tabIndex) && tabIndex >= 0 && tabIndex <= 1) {
      activeTab.value = tabIndex
    }
  }
})

const handleTabChange = () => {
  // 탭 변경 핸들러 (필요시 구현)
}

const handleButtonTabChange = () => {
  // 버튼 탭 변경 핸들러 (필요시 구현)
}

// 컨텐츠 데이터

// Digital & Technology Business
const businessItems = ref([
  {
    title: 'Strategy & Consulting',
    detail: [
      {
        title: 'Digital Marketing Consulting',
        content: '올바른 사업 방향성 제시 및 비즈니스 기회를 발굴하기 위해서 시장, 소비자, 경쟁사 등 분석 및 인사이트를 도출해서 디지털 채널 진단 및 전략, eCommerce 전략, 글로벌 Governance 체계 설계, 디지털 KPI & 성과관리 체계 설계 업무를 수행합니다.'
      },
      {
        title: 'UX & Creative Consulting',
        content: '8개국 글로벌 지사에서 170명 이상의 UX Design 전문가가 사용자 분석 기반의 서비스 전략, 사용자 시나리오, 프로토타이핑 등으로 트렌드에 앞서는 UX 전략을 제시하는 업무를 수행합니다.'
      }
    ]
  },
  {
    title: 'Global SI',
    detail: [
      {
        title: 'Technology Platforms',
        content: 'Commerce · Experience Platforms · AI를 아우르는 디지털 플랫폼으로 전략-구현-운영을 일원화하며, 글로벌 표준 아키텍처와 실전 레퍼런스를 기반으로 빠른 가치 실현과 지속 가능한 확장을 이끕니다.​'
      },
      {
        title: 'Technology Services',
        content: '엔터프라이즈 SI와 AI 컨설팅 역량을 기반으로 전략-아키텍처-구현-운영까지 End-to-End를 책임지며, 글로벌 딜리버리 경험으로 고객의 디지털 전환을 안정적이고 지속 가능한 성과로 연결합니다.​'
      }
    ]
  },
  {
    title: 'Corporate',
    detail: [
      {
        title: 'HR',
        content: '디지털 비즈니스 변화에 대응하는 사업/조직/사람을 이해하고 안정적 조직을 구축하기 위한 인사제도를 글로벌과 협의하여 업무를 수행합니다.'
      },
      {
        title: '채용',
        content: '한국지사의 채용 프로세스를 운영하며 인재를 발굴하고 회사에 안정적으로 합류할 수 있도록 모든 과정에서 지원합니다. 채용 과정에서는 상황을 대처하고, 조율하며 안정적인 채용이 이루어 질 수 있도록 지원하는 업무를 수행합니다.'
      },
      {
        title: '재무/회계',
        content: '한국지사의 전사 재무 관련 예산 및 사업 실적 관리, 관리회계, 사업거래 관리 등 재무적 분석과 관리 업무, 의사결정의 바탕이 되는 회계 데이터 제공, 회계 결산/관리, 세무회계 등의 업무를 수행합니다.'
      }
    ]
  },
  {
    title: 'Service & Design',
    detail: [
      {
        title: '디지털 채널 구축, 글로벌 확산 & 운영 관리',
        content: '제품 및 기업의 디지털 채널 구축 및 글로벌 확산을 위해서 체계적이고 안정적인 프로젝트 관리를 위한 PMO, 진단/관리 솔루션, 글로벌 디지털 채널 운영관리 업무를 수행합니다.'
      },
      {
        title: '디지털 마케팅',
        content: '디지털 채널에서 일관된 고객 경험을 기반으로 한 비즈니스 성과 창출을 위해 고객 경험 분석을 기초로 모든 캠페인, eSales, SEO, 디지털 광고, eCommerce 분석/기획 등 통합 실행 전략 업무를 수행합니다.'
      },
      {
        title: 'UX/UI, 콘텐츠',
        content: '트렌드 경험과 사용자 경험 고도화를 위한 전문가 그룹이 디지털 채널을 진단하여 UX/UI 및 콘텐츠 전략을 수립하고, 서비스/브랜드 경험을 혁신합니다. Digital Studio팀에서는 최적의 콘텐츠 제작 및 UI/UX 디자인 업무를 수행합니다.'
      }
    ]
  },
  {
    title: 'Analytics',
    detail: [
      {
        title: 'Digital Intelligence',
        content: '디지털 채널의 성과지표를 정의하고 모니터링/분석하는 업무를 진행합니다.<br>Acquisition, Engagement, Conversion 관점에서 소비자의 행동 패턴을 분석하고, 고객 경험 및 성과지표를 개선하기 위한 인사이트를 도출합니다.'
      },
      {
        title: 'GA 컨설팅',
        content: '고객의 비즈니스 환경과 Needs에 대한 분석을 기반으로 가장 효과적인 Google Analytics 도입을 위한 기획, 설계, 구축, 커스텀 서비스를 제공할 수 있으며, GA 데이터를 활용한 Data-Driven Marketing을 실현하고자 하는 고객에게 마케팅 관점에서의 솔루션에 대한 컨설팅을 제공합니다.'
      },
      {
        title: 'CRM/Big Data/AI',
        content: 'Data Analyst, Data Engineer, Scientist, MLOps 조직을 통해 고객사의 빅데이터/AI 분석 체계를 효율적으로 구축합니다. 데이터 기반의 고객 경험 분석 및 맴버십 설계를 비롯한 CRM 분석/운영 업무를 수행합니다.'
      },
      {
        title: 'SEO 컨설팅',
        content: '새롭게 구축하는 웹사이트 또는 현재 운영중인 웹사이트의 자연유입 트래픽(Organic Traffic) 개선을 목표로 다양한 SEO 전문 솔루션들을 활용하여 기술 영역 및 컨텐츠 영역에 대한 고도화된 SEO 컨설팅을 제공합니다.'
      }
    ]
  },
])

// attractive benefits
const businessBenefits = ref([
  {
    title: 'For your<br> personal life',
    icon: 'icon_benefits_01.svg',
    alt: '손바닥 위에 하트를 올린 아이콘',
    content: [
      '단체보험 : 질병/재해 사망, 실손보험 제공',
      '건강검진 및 독감접종비 지원',
      '명절 상품권 지급',
      '고등 자녀 교육비 지원',
      '주택대출이자 지원',
      '호텔 연계할인 프로그램',
      'EAP(Employee Assistance Program)<br>전문 심리 상담 자문 서비스'
    ],
  },
  {
    title: 'For your<br> work life',
    icon: 'icon_benefits_02.svg',
    alt: '악수하는 손을 형상화한 아이콘',
    content: [
      '야근 식대 및 택시비 지원',
      '출퇴근용 주차비 지원',
      '직원추천제도: 추천직원 채용 시 보너스 지급',
      '장애를 가진 직원을 위한 수당 지급'
    ]
  },
  {
    title: 'For your<br> development',
    icon: 'icon_benefits_03.svg',
    alt: '별 모양 리본 배지를 나타내는 아이콘',
    content: [
      '신규 입사자 OT 및 NEO<br>(New Employee Orientation)',
      '신규 입사자 100일 온보딩 프로그램',
      '영어 교육비 지원',
      '연간 무제한 온라인 학습 사이트 제공',
      'Hobby club 지원'
    ]
  },
  {
    title: 'For your<br> special moment',
    icon: 'icon_benefits_04.svg',
    alt: '각종 경조사 경조금, 근조화환, 휴가 제공',
    content: [
      '신규 입사자 웰컴키트 제공',
      '입사 1주년 축하선물 제공',
      '승진 축하선물 제공',
      '각종 경조사 경조금, 근조화환, 휴가 제공',
      '장기근속자 포상금 및 특별휴가 제공',
      'Family Day : 설(구정)과 추석 명절 연휴 전, 연말 마지막 근무일 조기퇴근',
      'Refresh Day : 매월 마지막주 금요일 조기퇴근',
      'Special Day : 생일자 당월 특별 휴가 제공'
    ]
  }
])

// agent benefits
const agentBenefits = ref([
  {
    title: 'For your<br> personal life',
    icon: 'icon_benefits_01.svg',
    alt: '손바닥 위에 하트를 올린 아이콘',
    content: [
      '단체보험 : 질병/재해 사망, 실손보험 제공',
      '건강검진 및 독감접종비 지원',
      '명절 상품권 지급',
      '호텔 연계할인 프로그램',
      'EAP(Employee Assistance Program)<br>전문 심리 상담 자문 서비스'
    ],
  },
  {
    title: 'For your<br> work life',
    icon: 'icon_benefits_02.svg',
    alt: '악수하는 손을 형상화한 아이콘',
    content: [
      '야근 식대 및 택시비 지원',
      '직원추천제도: 추천직원 채용 시 보너스 지급',
      '장애를 가진 직원을 위한 수당 지급'
    ]
  },
  {
    title: 'For your<br> development',
    icon: 'icon_benefits_03.svg',
    alt: '별 모양 리본 배지를 나타내는 아이콘',
    content: [
      '연간 무제한 온라인 학습 사이트 제공',
      'Hobby club 지원',
      '영어 교육비 지원',
    ]
  },
  {
    title: 'For your<br> special moment',
    icon: 'icon_benefits_04.svg',
    alt: '각종 경조사 경조금, 근조화환, 휴가 제공',
    content: [
      '각종 경조사 경조금, 근조화환, 휴가 제공',
      '장기근속자 포상금 및 특별휴가 제공',
    ]
  }
])

// non-agent items
const nonAgentItems = ref([
  {
    title: 'Operations',
    icon: 'icon_cs_01.svg',
    alt: '개인 맞춤형 지원을 상징',
    content: [
      '상담사들이 주어진 성과 목표를 달성할 수 있도록 지원하고 센터 운영 지표의 목표를 달성할 책임을 갖습니다',
    ],
  },
  {
    title: 'Training',
    icon: 'icon_cs_02.svg',
    alt: '고객 지원 및 커뮤니케이션을 상징',
    content: [
      '신규 또는 기존 상담사 교육을 담당하며, 제품 지식, 시스템 활용, CS 스킬 교육을 통해 상담사 역량을 강화합니다.',
    ],
  },
  {
    title: 'Quality',
    icon: 'icon_cs_03.svg',
    alt: '성장과 성과 향상을 상징',
    content: [
      '상담 품질 점검을 위한 모니터링을 수행하고 모니터링 결과 및 고객 VOC를 분석하여 상담 품질 개선 방향을 제시합니다',
    ],
  },
  {
    title: 'WFM',
    icon: 'icon_cs_04.svg',
    alt: '일정 관리와 유연한 근무를 상징',
    content: [
      '볼륨 예측, 인력 배치, 근무 스케줄 관리를 통해 효율적인 리소스 운영과 SLA 준수를 지원합니다',
    ],
  }
])

// non-agent benefits
const nonAgentBenefits = ref([
  {
    title: 'For your<br> personal life',
    icon: 'icon_benefits_01.svg',
    alt: '손바닥 위에 하트를 올린 아이콘',
    content: [
      '단체보험 : 질병/재해 사망, 실손보험 제공',
      '건강검진 및 독감접종비 지원',
      '명절 상품권 지급',
      '고등 자녀 교육비 지원',
      '주택대출이자 지원',
      '호텔 연계할인 프로그램',
      'EAP(Employee Assistance Program)<br>전문 심리 상담 자문 서비스'
    ],
  },
  {
    title: 'For your<br> work life',
    icon: 'icon_benefits_02.svg',
    alt: '악수하는 손을 형상화한 아이콘',
    content: [
      '야근 식대 및 택시비 지원',
      '출퇴근용 주차비 지원',
      '직원추천제도: 추천직원 채용 시 보너스 지급',
      '장애를 가진 직원을 위한 수당 지급'
    ]
  },
  {
    title: 'For your<br> development',
    icon: 'icon_benefits_03.svg',
    alt: '별 모양 리본 배지를 나타내는 아이콘',
    content: [
      '신규 입사자 OT 및 NEO<br>(New Employee Orientation)',
      '신규 입사자 100일 온보딩 프로그램',
      '영어 교육비 지원',
      '연간 무제한 온라인 학습 사이트 제공',
      'Hobby club 지원',
    ]
  },
  {
    title: 'For your<br> special moment',
    icon: 'icon_benefits_04.svg',
    alt: '각종 경조사 경조금, 근조화환, 휴가 제공',
    content: [
      '입사 1주년 축하선물 제공',
      '승진 축하선물 제공',
      '각종 경조사 경조금, 근조화환, 휴가 제공',
      '장기근속자 포상금 및 특별휴가 제공',
      'Family Day : 설(구정)과 추석 명절 연휴 전, 연말 마지막 근무일 조기퇴근',
      'Refresh Day : 매월 마지막주 금요일 조기퇴근',
    ]
  }
])

// business qna
const businessQnaItems = ref([
  {
    question: '신입사원의 지원자격은 어떻게 되나요?',
    answer: `
        신입사원의 공통 자격 요건은 각 직무별 공고 내용의 기준으로 별도로 확인해 주시면 됩니다.<br>
        * 학력 : 졸업예정자 대상(학사/석사)<br>
        * 성별/학점/연령/영어공인성적으로 인한 지원자격 제한을 두지 않습니다.<br>
        * 모든 지원자는 군필자 또는 면제자로 해외여행에 결격 사유가 없어야 합니다.<br>
      `
  },
  {
    question: '경력사원의 지원자격이 어떻게 되나요?',
    answer: `
        경력사원의 지원자격은 학력은 무관하며, 채용 공고에 기재된 실무경력 이상이어야 지원이 가능합니다. 
        직무에 따라 요구되는 경력 차이가 있으니 지원하고자 하는 공고를 반드시 확인하시기 바랍니다.<br>
        * 경력 인정은 선발 직무와 관련성이 있을 경우 인정됩니다.<br>
        * 프리랜서 경력은 업무 연관성이 있을 경우 증빙 확인 및 검토 후 인정 기준으로 적용됩니다.`
  },
  {
    question: '입사 지원 후 인터뷰와 합격 통지는 어떤 형태로 진행되나요?',
    answer: `
        일반적으로 서류전형 > 1차 면접 > 2차 면접 > 최종합격으로 진행되며, 직군별로 세부적인 과정에 차이가 있을 수 있습니다.<br>
        * 일반적으로 서류접수부터 최종 합격까지 2주 정도 소요됩니다.<br>
        * 화상면접, 대면면접 모두 가능하며, 지원자의 상황에 맞춰 면접이 진행됩니다.`
  },
  {
    question: '직무별로 게시된 우대전공이 아닐 경우에도 지원, 합격할 수 있나요?',
    answer: `
        콘센트릭스는 전공에 대해 차이를 두지 않고 업무에 대한 능력과 열정을 검토합니다.<br>
        다만, 전공이 필요한 특수 직무에 대해서는 관련 전공이 우대될 수 있습니다.`
  },
  {
    question: '원하는 분야의 공고가 여러 개 있어요. 중복지원도 가능한가요?',
    answer: `중복 지원 가능합니다. 지원하신 분야 모두 최종 합격될 경우, 지원자와 협의 후에 최종 1개 분야에 대해 입사가 진행 됩니다.`
  },
  {
    question: '입사지원 시 장애인/국가 보훈 대상자는 어떤 우대를 받나요?',
    answer: `장애인 및 국가 보훈 등 취업보호 대상자는 지원 시 관계 법령에 따라서 가산점이 있습니다. 입사 후에도 다른 지원자들과 동일한 대우를 하고 있으며 타 지원자들과 동일한 조건으로 모든 직무에 지원이 가능합니다.`
  }
])

// customer service qna
const customerServiceQnaItems = ref([
  {
    question: '사전 테스트는 어떻게 진행되나요?',
    answer: `
        사전 테스트가 있으며, 각 직무에 맞는 테스트가 부여됩니다.<br>
        SVAR Test : 영어 회화 테스트(말하기 및 단어, 문법)
      `
  },
  {
    question: '화상 면접은 어떻게 준비하면 되나요?',
    answer: `
        화상 면접은 장비와 환경 점검이 가장 중요합니다. 카메라·마이크·인터넷 상태를 미리 확인해 주시고, 조용하고 외부 소음이나 방해가 없는 공간에서 진행해 주세요.<br>
간단한 자기소개와 지원 직무와 관련된 경험만 준비하셔도 충분하며, 이후 질문은 직무 이해도와 기본적인 상황 대응 방식 위주로 진행되니 편안하게 답변해 주시면 됩니다.`
  },
  {
    question: '면접 결과는 언제 알 수 있나요?',
    answer: `
        면접일 기준 일주일 내로 전달드리고 있지만, 내부 사정이나 포지션별로 상이할 수 있기 때문에 정확한 시기는 지원 당시 채용 담당자에게 물어보시면 자세하게 안내드리겠습니다.`
  },
  {
    question: '외국인도 지원 가능하나요?',
    answer: `
        네, 가능합니다.<br>
        만약 비자 지원이 필요하실 경우 지원 시 이력서 또는 채용 담당자에게 보유 중인 비자를 말씀 주시면 지원 가능 여부를 확인하여 말씀드리고 있습니다.`
  },
  {
    question: '나이 또는 경력에 조건이 있나요?',
    answer: `
        만 60세의 정년이라는 공통 자격요건 외 지원에 대한 제한사항은 없습니다.<br>
        다만, 포지션 특성 상 요구 드리는 각각의 자격요건이 상이하기 때문에 정확한 지원 자격은 해당 채용 공고를 참고 부탁드리며, 추가 궁금하신 사항은 이메일 또는 기재된 채용 담당자의 연락처로 문의하시면 자세하게 안내드리겠습니다.`
  },
  {
    question: '중복 지원 가능하나요?',
    answer: `
        다중 포지션에 중복 지원은 불가능합니다.<br>
        적합한 포지션이 고민되실 경우 채용 공고에 기재된 채용 담당자의 연락처로 전화 또는 문자 주시면 이력서와 희망하시는 근무 조건을 바탕으로 최적의 포지션을 추천드리고 있으니 많은 문의 부탁드립니다.`
  },
  {
    question: '면접에 대한 피드백을 받을 수 있나요?',
    answer: `면접에 대한 피드백은 기본적으로 말씀드리지 않고 있으나, 요청해 주시는 분에 한해서 피드백을 드리고 있습니다.`
  },
  {
    question: '4대 보험 되나요?',
    answer: `교육 이후 입사 시 4대 보험 적용 가능합니다.`
  },
  {
    question: '야근이 많은가요?',
    answer: `근무 시간 외 추가 근무는 지양하고 있습니다. 부득이하게 추가 근무가 필요한 경우가 있더라도 강제하지 않으며, 사전에 본인의 의사를 확인하고 조율하고 있습니다.`
  },
  {
    question: '재택 근무도 가능한가요?',
    answer: `근무 성과에 따라 재택근무가 가능한 포지션이 일부 있습니다. 보다 자세한 사항은 채용 공고 및 채용 담당자에게 문의해 주시면 정확한 안내 도와드리겠습니다.`
  }
])

</script>

<style lang="scss" scoped>
.careers {

  &__title {
    padding: rem(56) 0;

    &.has-button-tab {
      padding-bottom: 0;
    }

    &-headline {
      text-align: center;
      @include headline-02;
    }

    @include tablet {
      padding: rem(80) 0;
    }
  }

  &__swiper {

    &-content {
      position: absolute;
      z-index: 1;
      inset: 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      gap: rem(20);
      padding: rem(20);

      @include tablet {
        justify-content: flex-start;
        gap: rem(16);
        padding: rem(32);
      }

      @include desktop {
        padding: rem(64);
      }
    }

    &-title {
      @include sub-headline-02;

      @include desktop {
        @include sub-headline-01;
      }
    }

    &-text {
      @include body-02;

      @include tablet {
        @include body-03;
      }

      @include desktop {
        @include body-02;
      }
    }

    &-group {
      display: flex;
      flex-direction: column;
      gap: rem(12);

      b {
        @include body-01;
      }

      span {
        @include body-02;
      }

      @include tablet {
        gap: rem(24);
        margin-top: auto;

        span {
          @include body-03;
        }
      }

      @include desktop {
        gap: rem(32);

        b {
          @include sub-headline-02;
        }

        span {
          @include body-02;
        }
      }
    }

    &-item {
      picture {
        display: block;
        aspect-ratio: 13 / 25;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      @include tablet {
        picture {
          aspect-ratio: 220 / 93;
        }
      }
    }

  }

  &__tab {
    margin-top: rem(56);

    :deep(.tab-panel > .inner) {
      display: flex;
      flex-direction: column;
      gap: rem(56);
    }

    @include tablet {
      margin-top: rem(80);

      :deep(.tab-panel > .inner) {
        gap: rem(80);
      }
    }

    @include desktop {
      :deep(.tab-panel > .inner) {
        gap: rem(120);
      }
    }
  }

  &__button-tab {
    margin-top: rem(16);

    :deep(.inner) {
      padding: 0;
    }

    :deep(.tab-panel) {
      display: flex;
      flex-direction: column;
      gap: rem(56);
      margin-top: rem(56);
    }

    @include tablet {
      margin-top: rem(24);

      :deep(.tab-panel) {
        margin-top: rem(80);
        gap: rem(80);
      }
    }

    @include desktop {
      :deep(.tab-panel) {
        gap: rem(120);
      }
    }
  }

  .inner.has-button-tab {
    padding-bottom: rem(42);

    @include tablet {
      padding-bottom: rem(80);
    }

    @include desktop {
      padding-bottom: rem(120);
    }
  }

  :deep(.careers-custom-title) {
    .app-title-heading {
      @include headline-01;
    }

    .app-title-text {
      @include body-01;
      margin: rem(24) 0 0;
    }
  }

  // AppButtonTab 커스텀 스타일
  :deep(.careers__button-tab) {
    .tab-button {
      padding: rem(11.5) rem(18.5);
      @include body-01;

      @include tablet {
        padding: rem(10) rem(65);
      }

      @include desktop {
        padding: rem(8.5) rem(61.5);
      }
    }
  }

}
</style>