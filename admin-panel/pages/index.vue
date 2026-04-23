<template>
  <div class="main-page">
    <!-- 키비주얼 스와이퍼 -->
    <MainKeyVisualSwiper :slides="slides" />
    
    <!-- 콘텐츠 섹션 -->
    <!-- 첫 번째 섹션 -->
    <section class="content-section">
      <div class="inner">
        <MainTitle 
          title="What we do"
          description="콘센트릭스는 디지털 세상에서 기업과 함께 더 나은 고객 경험을 만들어 갑니다.<br/><br class='br-mo'/>디지털마케팅/이커머스에 있어, 전략, UX/UI, 광고, 분석, 구축, 운영, 고객 경험 관리와 서비스 혁신까지 아우르는 <br class='br-pc'/>통합 서비스로 기업의 성과를 높입니다."
        />
        
        <!-- 5개의 박스 컨테이너 -->
        <div class="what-we-do-boxes">
          <div 
            v-for="(box, index) in whatWeDoBoxes" 
            :key="index"
            @click="toggleBox(index)"
            :class="['what-we-do-box', `what-we-do-box--${index}`, { 'active': activeBoxIndexes.includes(index) }]"
          >
            <!-- 타이틀과 디스크립션 영역 -->
            <div class="what-we-do-box__header">
              <h3 class="what-we-do-box__title" v-html="box.title"></h3>
              <p class="what-we-do-box__description" v-html="box.description"></p>
            </div>
            
            <!-- 링크 영역 -->
            <div class="what-we-do-box__content">
              <div class="what-we-do-box__links">
                <a 
                  v-for="(link, linkIndex) in box.links" 
                  :key="linkIndex"
                  :href="link.href"
                  class="what-we-do-box__link"
                >
                  {{ link.text }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 두 번째 섹션 -->
    <section class="content-section">
      <div class="inner">
          <!-- 텍스트 섹션 -->
          <div class="stats-section">
            <div class="stats-section__text">
              <p class="stats-section__text-line">새롭게 주목받는 첨단산업부터 글로벌 대표 브랜드까지 주요 기업들의 신뢰를 받고 있습니다</p>
            </div>
          
          <!-- 통계 박스 섹션 -->
          <div class="stats-grid">
            <div 
              v-for="(stat, index) in statsData" 
              :key="index"
              class="stats-grid__item"
            >
              <div class="stats-grid__icon">
                <img :src="stat.icon" :alt="stat.label" />
              </div>
              <div class="stats-grid__number" v-html="stat.number"></div>
              <div class="stats-grid__label">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 세 번째 섹션 -->
    <section class="content-section content-section--careers">
      <div class="inner">
        <MainTitle title="Careers" />
        <!-- 세 번째 섹션 콘텐츠 -->
        <div class="careers-box-container">
          <div class="careers-box careers-box--1">
            <h3 class="careers-box__title" v-html="careersBox1Title"></h3>
            <p class="careers-box__description" v-html="careersBox1Description"></p>
            <AppButton 
              v-if="careersBox1Button"
              :to="careersBox1Button.href"
              :text="careersBox1Button.text"
              color="green"
              arrow
              effect="left"
            />
          </div>
          <div class="careers-box careers-box--2">
            <h3 class="careers-box__title" v-html="careersBox2Title"></h3>
            <p class="careers-box__description" v-html="careersBox2Description"></p>
            <AppButton 
              v-if="careersBox2Button"
              :to="careersBox2Button.href"
              :text="careersBox2Button.text"
              color="green"
              arrow
              effect="left"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 네 번째 섹션 -->
    <section class="content-section content-section--with-bg" :style="{ backgroundImage: `url(${customSectionBgImage})` }">
      <div class="inner">
        <div class="custom-title-section">
          <h2 class="custom-title-section__heading" v-html="customSectionTitle"></h2>
          <p class="custom-title-section__description" v-html="customSectionDescription"></p>
          <AppButton 
            v-if="customSectionButton"
            :href="customSectionButton.href"
            :text="customSectionButton.text"
            color="white"
            effect="left"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import MainKeyVisualSwiper from '~/components/cnx/MainKeyVisualSwiper.vue'
import MainTitle from '~/components/cnx/MainTitle.vue'
import AppButton from '~/components/cnx/AppButton.vue'
import { ref, computed } from 'vue'
import { useNavigation } from '~/composables/useNavigation'

// 레이아웃 설정
definePageMeta({
  layout: 'concentrix',
})

// useNavigation에서 menuStructure 가져오기
const { menuStructure } = useNavigation()

// 두 번째 섹션 통계 데이터
const statsData = ref([
  { number: '2000<sup>+</sup>', label: 'Clients', icon: '/assets/cnx/main/icon-stats-clients.svg' },
  { number: '418<sup>+</sup>', label: 'New economy clients', icon: '/assets/cnx/main/icon-stats-rocket.svg' },
  { number: '6<span>/</span>70<sup>+</sup>', label: 'Continents / Countries', icon: '/assets/cnx/main/icon-stats-globe.svg' },
  { number: '150<sup>+</sup>', label: 'Languages', icon: '/assets/cnx/main/icon-stats-languages.svg' },
  { number: '176', label: 'Industry awards', icon: '/assets/cnx/main/icon-stats-award.svg' }
])

// 슬라이드 데이터
const slides = ref([
  {
    type: 'video',
    mobileVideo: '/assets/cnx/main/MAIN_KV1_m_260423.mp4',
    desktopVideo: '/assets/cnx/main/MAIN_KV1_260423.mp4',
    imageAlt: 'Main Key Visual Video 1'
  },
  {
    type: 'video',
    mobileVideo: '/assets/cnx/main/MAIN_KV2_m.mp4',
    desktopVideo: '/assets/cnx/main/MAIN_KV2.mp4',
    imageAlt: 'Main Key Visual Video 2',
    title: 'Life at Concentrix',
    description: '우리는 옳은 일을 한다고 믿습니다. 콘센트릭스는 모두가 존중받는 사회를 꿈꾸며 수평적인 조직 문화를 가지고 있습니다.<br>구성원의 다양한 의견과 가치관의 공존을 지향하며 지속 가능한 글로벌 비즈니스를 위해 각 영역의 전문가 집단을 운영합니다.'
  },
  {
    type: 'video',
    mobileVideo: '/assets/cnx/main/MAIN_KV3_m.mp4',
    desktopVideo: '/assets/cnx/main/MAIN_KV3.mp4',
    imageAlt: 'Main Key Visual Video 3',
    title: 'The Future<br>of CX',
    description: "See how Concentrix is disrupting <br>the moment and rewriting the rules for<br>what's next in CX.",
    button: {
      text: 'Unlock the Future',
      href: 'https://www.concentrix.com/future-of-cx/',
      arrow: true
    }
  },
  {
    type: 'image',
    mobileImage: '/assets/cnx/main/main_slider01_m.png',
    desktopImage: '/assets/cnx/main/main_slider01.png',
    imageAlt: 'Main Key Visual Image',
    title: 'Accelerate<br>CX transformation',
    description: 'with Concentrix Catalyst, the experience<br>design and engineering team of Concentrix.',
    button: {
      text: 'Craft Better CX',
      href: 'https://catalyst.concentrix.com/',
      arrow: true
    }
  }
])

// 네 번째 섹션 데이터
const customSectionTitle = ref('Contact Us')
const customSectionDescription = ref('Marketing.korea@concentrix.com')
const customSectionButton = ref({
  text: '문의하기',
  href: 'mailto:Marketing.korea@concentrix.com'
})
const customSectionBgImage = computed(() => {
  const basePath = '/assets/cnx/main/main_contactus_bg'
  // 반응형 이미지 경로 (필요시 확장 가능)
  return `${basePath}.png`
})

// 첫 번째 섹션 What we do 박스 데이터
// descriptions 객체: 각 섹션의 description을 별도로 관리
const descriptions = {
  'Strategy & Design': '우리는 브랜드와 사용자의 접점을 전략적으로 설계하여 지속 가능한 성장을 만들어냅니다.',
  'Data & Analytics': '디지털마케팅·이커머스 성과 극대화를 위해 데이터 환경 구축, 거버넌스, 인사이트 분석, AI 기반 분석 솔루션을 제공합니다.',
  'Technology Platforms': 'Commerce·Experience·AI 플랫폼 기반 및 글로벌 표준 아키텍처와 레퍼런스로 빠른 가치 실현과 확장을 지원합니다.',
  'Technology Services': 'Enterprise SI와 AX Consulting 기반으로 전략부터 운영까지 End-to-End을 지원해 안정적 디지털 전환을 가속화합니다.',
  'Digital Operations': '상상이상의 결과를 만들어 내기위해 그냥 하던 대로 하지 않습니다.<br class="br-pc"> 고객사를 위한 혁신적인 솔루션을 적용하여 운영합니다.'
}

// menuStructure를 활용하여 whatWeDoBoxes를 동적으로 생성
const whatWeDoBoxes = computed(() => {
  const sections = menuStructure.whatwedo.sections
  return sections.map(section => ({
    title: section.title,
    description: descriptions[section.title] || '',
    links: (section.items || []).map(item => ({
      text: item.text,
      href: item.path
    }))
  }))
})

// 세 번째 섹션 careers 박스 데이터
const careersBox1Title = ref('Digital & Technology Business')
const careersBox1Description = ref('이커머스, UX/UI, 개발/운영 등<br class="br-mo-pc" /> 디지털마케팅 전 영역의<br class="br-mo" /> 전문가를 기다립니다.')
const careersBox1Button = ref({
  text: '자세히 보기',
  href: '/cnx/careers?tab=0'
})

const careersBox2Title = ref('Customer Service')
const careersBox2Description = ref('고객과 소통하는<br class="br-mo-pc"> Customer Service<br class="br-mo" /> 전문가를 찾습니다.')
const careersBox2Button = ref({
  text: '자세히 보기',
  href: '/cnx/careers?tab=1'
})

// 박스 확장/축소를 위한 클릭 인터랙션
const activeBoxIndexes = ref([0]) // 첫 번째 박스는 초기값으로 열림

// 박스 클릭 핸들러
const toggleBox = (index) => {
  // 클릭한 박스가 이미 열려있으면 유지 (아무 동작 안 함)
  if (activeBoxIndexes.value.includes(index)) {
    return
  }
  
  // 다른 박스를 클릭하면 이전 박스는 닫고 새 박스만 열기 (아코디언 방식)
  activeBoxIndexes.value = [index]
}

</script>

<style lang="scss" scoped>
@use '~/layouts/scss/cnx/_functions' as *;
@use '~/layouts/scss/cnx/_mixins' as *;
@use '~/layouts/scss/cnx/_variables' as *;

.main-page {
  width: 100%;
}

.content-section {
  padding-top: rem(50);
  padding-bottom: 0;
  
  @include tablet {
    padding-top: rem(80);
  }
  
  @include desktop {
    padding-top: rem(120);
  }

  &--careers {
    padding-bottom: rem(50);
    
    @include tablet {
      padding-bottom: rem(120);
    }
    
    @include desktop {
      padding-bottom: rem(100);
    }
  }

  &--with-bg {
    position: relative;
    width: 100%;
    height: rem(200);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding-top: rem(50);
    padding-bottom: rem(50);
    
    @include tablet {
      height: rem(250);
      padding-top: rem(80);
      padding-bottom: rem(80);
    }
    
    @include desktop {
      height: rem(250);
      padding-top: rem(120);
      padding-bottom: rem(120);
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 0;
    }

    .inner {
      position: relative;
      z-index: 1;
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
}

.what-we-do-boxes {
  display: flex;
  flex-direction: column;
  gap: rem(12);
  margin-top: rem(30);
  
  @include tablet {
    gap: rem(24);
    margin-top: rem(40);
  }
  
  @include desktop {
    gap: rem(24);
    margin-top: rem(50);
  }
}

.what-we-do-box {
  width: 100%;
  height: rem(61);
  display: flex;
  flex-direction: column;
  padding: rem(20);
  background-color: $gray-3;
  border-radius: rem(8);
  transition: background 0.6s ease-out, height 0.6s ease-out;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  
  @include tablet {
    height: rem(107);
    padding: rem(36) rem(44);
    border-radius: rem(8);
  }
  
  @include desktop {
    height: rem(132);
    padding: rem(40) rem(48);
    border-radius: rem(20);
  }
  
  // 배경 이미지를 ::before로 분리하여 항상 고정 위치에 표시
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-repeat: no-repeat;
    background-position: right bottom;
    background-size: auto;
    opacity: 0;
    pointer-events: none;
    z-index: 0;
    transition: none; // 닫힐 때는 transition 없이 바로 사라짐
  }
  
  &.what-we-do-box--0::before {
    background-image: url('/assets/cnx/main/main_snd_m.png');
    
    @include tablet {
      background-image: url('/assets/cnx/main/main_snd_t.png');
    }
    
    @include desktop {
      background-image: url('/assets/cnx/main/main_snd.png');
    }
  }
  
  &.what-we-do-box--1::before {
    background-image: url('/assets/cnx/main/main_dna_m.png');
    
    @include tablet {
      background-image: url('/assets/cnx/main/main_dna_t.png');
    }
    
    @include desktop {
      background-image: url('/assets/cnx/main/main_dna.png');
    }
  }
  
  &.what-we-do-box--2::before {
    background-image: url('/assets/cnx/main/main_tp_m.png');
    
    @include tablet {
      background-image: url('/assets/cnx/main/main_tp_t.png');
    }
    
    @include desktop {
      background-image: url('/assets/cnx/main/main_tp.png');
    }
  }
  
  &.what-we-do-box--3::before {
    background-image: url('/assets/cnx/main/main_ts_m.png');
    
    @include tablet {
      background-image: url('/assets/cnx/main/main_ts_t.png');
    }
    
    @include desktop {
      background-image: url('/assets/cnx/main/main_ts.png');
    }
  }
  
  &.what-we-do-box--4::before {
    background-image: url('/assets/cnx/main/main_do_m.png');
    
    @include tablet {
      background-image: url('/assets/cnx/main/main_do_t.png');
    }
    
    @include desktop {
      background-image: url('/assets/cnx/main/main_do.png');
    }
  }
  
  &:hover:not(.active) {
    background: linear-gradient(95deg, #003D5B 0%, #005979 100%);
    
    .what-we-do-box__title {
      color: $d-white;
    }
    
    .what-we-do-box__description {
      color: $d-white;
    }
  }
  
  &.active {
    background: linear-gradient(95deg, #003D5B 0%, #005979 100%);
    height: rem(435);
    
    @include tablet {
      height: rem(430);
    }
    
    @include desktop {
      height: rem(432);
    }
    
    &::before {
      opacity: 1;
      transition: opacity 0.4s ease-out 0.2s; // 박스 확장 시 조금 늦게 시작
    }
    
    .what-we-do-box__title {
      color: $d-white;
    }
    
    .what-we-do-box__description {
      color: $d-white;
      display: block;
    }
    
    .what-we-do-box__content {
      display: flex;
    }
  }
  
  &__header {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    z-index: 1;
    
    @include desktop {
      flex-direction: row;
      align-items: center;
    }
  }
  
  &__title {
    color: $p-blue;
    font-size: rem(22);
    font-weight: 700;
    line-height: 110%;
    width: 100%;
    flex-shrink: 0;
    
    @include tablet {
      font-size: rem(32);
    }
    
    @include desktop {
      width: 50%;
      font-size: rem(35);
    }
  }
  
  &__description {
    color: #555;
    font-size: rem(14);
    font-weight: 600;
    line-height: 130%;
    word-break: keep-all;
    text-wrap: balance;
    width: 100%;
    text-align: left;
    margin-top: rem(12);
    
    @media all and (max-width: #{$pc - 1px}) {
      display: none;
    }
    
    @include tablet {
      font-size: rem(19);
    }
    
    @include desktop {
      width: 50%;
      text-align: right;
      font-size: rem(20);
      font-weight: 500;
      margin-top: 0;
    }
  }
  
  &__content {
    position: relative;
    z-index: 1;
    width: 100%;
    display: none;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: rem(36);
    
    @include tablet {
      margin-top: rem(70);
    }
    
    @include desktop {
      margin-top: rem(70);
    }
  }
  
  &__links {
    display: flex;
    flex-direction: column;
    gap: rem(8);
    flex-shrink: 0;
    
    @include tablet {
      gap: rem(10);
    }
    
    @include desktop {
      gap: rem(10);
    }
  }
  
  &__link {
    display: inline-flex;
    align-items: center;
    gap: rem(8);
    color: $d-white;
    font-size: rem(14);
    font-weight: 400;
    text-decoration: none;
    transition: text-decoration 0.3s ease;
    
    @include tablet {
      font-size: rem(22);
    }
    
    @include desktop {
      font-size: rem(24);
    }
    
    &:hover {
      text-decoration: underline;
    }
    
    &::after {
      content: '';
      display: inline-block;
      width: rem(12);
      height: rem(12);
      background-color: $d-white;
      -webkit-mask: url('~/components/assets/cnx/link-arrow.svg') no-repeat center;
      -webkit-mask-size: contain;
      mask: url('~/components/assets/cnx/link-arrow.svg') no-repeat center;
      mask-size: contain;
      flex-shrink: 0;
      
      @include tablet {
        width: rem(16);
        height: rem(16);
      }
    }
  }
}

.stats-section {
  width: 100%;
  
  &__text {
    width: 100%;
    margin-bottom: rem(30);
    
    @include tablet {
      margin-bottom: rem(40);
    }
    
    @include desktop {
      margin-bottom: rem(40);
      width: rem(745);
    }
  }
  
  &__text-line {
    color: $d-black;
    font-size: rem(16);
    font-weight: 300;
    line-height: 140%;
    letter-spacing: rem(-0.48);
    margin: 0;
    
    @include tablet {
      font-size: rem(32);
      letter-spacing: rem(-0.96);
    }
    
    @include desktop {
      font-size: rem(36);
      letter-spacing: rem(-1.08);
    }
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: rem(20);
  padding-top: rem(24);
  padding-bottom: rem(24);
  width: 100%;
  
  @include desktop {
    grid-template-columns: repeat(5, 1fr);
  }
}

.stats-grid__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stats-grid__number {
  color: $p-blue;
  font-size: rem(32);
  font-weight: 700;
  line-height: 100%;
  letter-spacing: rem(-2.24);
  margin-bottom: 0;
  
  @include tablet {
    font-size: rem(60);
    letter-spacing: rem(-4.2);
    margin-bottom: rem(6);
  }
  
  @include desktop {
    font-size: rem(70);
    letter-spacing: rem(-4.9);
    margin-bottom: rem(6);
  }
  
  :deep(span) {
    letter-spacing: rem(0.4);
    
    @include tablet {
      letter-spacing: rem(2.1);
    }
  }
}

.stats-grid__label {
  color: $p-blue;
  font-size: rem(9);
  font-weight: 600;
  line-height: 140%;
  margin-bottom: rem(12);
  
  @include tablet {
    font-size: rem(18);
    margin-bottom: rem(14);
  }
  
  @include desktop {
    font-size: rem(19);
    margin-bottom: rem(16);
  }
}

.stats-grid__icon {
  width: rem(80);
  height: rem(80);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: rem(12);
  
  @include tablet {
    width: rem(160);
    height: rem(160);
    margin-bottom: rem(16);
  }
  
  @include desktop {
    width: rem(230);
    height: rem(230);
    margin-bottom: rem(20);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
}

.careers-box-container {
  display: flex;
  flex-direction: column;
  gap: rem(10);
  margin-top: rem(12);
  
  @include tablet {
    flex-direction: row;
    flex-wrap: wrap;
    gap: rem(32);
    margin-top: rem(24);
  }
  
  @include desktop {
    flex-wrap: nowrap;
    gap: rem(32);
    margin-top: rem(24);
  }
}

.careers-box {
  width: 100%;
  height: rem(300);
  background-color: #f7f7f7;
  border-radius: rem(8);
  padding: rem(20);
  background-repeat: no-repeat;
  background-size: auto;
  background-position: right rem(20) bottom 0;
  display: flex;
  flex-direction: column;
  
  @include tablet {
    width: calc((100% - rem(32)) / 2);
    height: rem(530);
    border-radius: rem(20);
    padding: rem(30);
    background-position: right rem(30) bottom 0;
  }
  
  @include desktop {
    width: calc((100% - rem(32)) / 2);
    height: rem(616);
  }

  &__title {
    @include sub-headline-02;
    margin: 0 0 rem(8) 0;
    color: $d-black;
    
    @include tablet {
      margin-bottom: rem(12);
    }
    
    @include desktop {
      margin-bottom: rem(12);
    }
  }

  &__description {
    @include body-01;
    margin: 0;
    color: $gray-1;
    word-break: keep-all;
    font-size: rem(16);
    font-weight: 700;
    line-height: 140%;
    
    @include tablet {
      font-size: inherit;
      font-weight: inherit;
      line-height: inherit;
    }
  }

  button,
  a {
    align-self: flex-start;
    margin-top: rem(20);
    
    @include tablet {
      background-color: #f7f7f7;
    }
    
    @include desktop {
      margin-top: rem(30);
    }
  }

  &--1 {
    background-image: url('/assets/cnx/main/main_careers_bg1_m.png');
    
    @include tablet {
      background-image: url('/assets/cnx/main/main_careers_bg1_t.png');
    }
    
    @include desktop {
      background-image: url('/assets/cnx/main/main_careers_bg1.png');
    }
  }

  &--2 {
    background-image: url('/assets/cnx/main/main_careers_bg2_m.png');
    
    @include tablet {
      background-image: url('/assets/cnx/main/main_careers_bg2_t.png');
    }
    
    @include desktop {
      background-image: url('/assets/cnx/main/main_careers_bg2.png');
    }
  }
}

.custom-title-section {
  text-align: left;

  &__heading {
    @include sub-headline-02;
    color: $d-white;
  }

  &__description {
    @include body-03;
    color: $d-white;
    line-height: 140%;
    margin-top: 0;
    margin-bottom: rem(18);
    
    @include tablet {
      margin-top: rem(4);
      margin-bottom: rem(54);
    }
    
    @include desktop {
      margin-top: rem(2);
      margin-bottom: rem(47);
    }
  }

}

</style>
