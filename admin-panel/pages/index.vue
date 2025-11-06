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
          description="콘센트릭스는 디지털 세상에서 기업과 함께 더 나은 고객 경험을 만들어 갑니다.<br/>디지털마케팅/이커머스에 있어, 전략, UX/UI, 광고, 분석, 구축, 운영, 고객 경험 관리와 서비스 혁신까지 아우르는<br/>통합 서비스로 기업의 성과를 높입니다."
        />
        <!-- 첫 번째 섹션 콘텐츠 -->
        <div class="content-grid">
          <div 
            v-for="(item, index) in contentGridItems" 
            :key="index"
            class="content-grid__item"
          >
            <div class="content-grid__item-inner">
              <!-- 컨텐츠 영역 -->
              <div class="content-grid__item-content">
                <!-- 나중에 컨텐츠 추가 -->
              </div>
              <!-- Hover 오버레이 -->
              <div class="content-grid__item-overlay">
                <AppButton 
                  v-if="item.link"
                  :href="item.link.href"
                  :text="item.link.text"
                  color="white"
                  effect="left"
                />
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
                <div class="stats-grid__number" v-html="stat.number"></div>
              <div class="stats-grid__label">{{ stat.label }}</div>
              <div class="stats-grid__icon">
                <img :src="stat.icon" :alt="stat.label" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 세 번째 섹션 -->
    <section class="content-section">
      <div class="inner">
        <MainTitle title="Careers" />
        <!-- 세 번째 섹션 콘텐츠 -->
      </div>
    </section>

    <!-- 네 번째 섹션 -->
    <section class="content-section">
      <div class="inner">
        <MainTitle title="Contact Us" />
        <!-- 네 번째 섹션 콘텐츠 -->
      </div>
    </section>
  </div>
</template>

<script setup>
import MainKeyVisualSwiper from '~/components/cnx/MainKeyVisualSwiper.vue'
import MainTitle from '~/components/cnx/MainTitle.vue'
import AppButton from '~/components/cnx/AppButton.vue'
import { ref } from 'vue'

// 레이아웃 설정
definePageMeta({
  layout: 'concentrix',
})

// 첫 번째 섹션 그리드 아이템 데이터
// link 속성은 hover 시 표시될 링크 버튼 정보
const contentGridItems = ref([
  { id: 1, link: { href: '#', text: '링크 버튼' } },
  { id: 2, link: { href: '#', text: '링크 버튼' } },
  { id: 3, link: { href: '#', text: '링크 버튼' } },
  { id: 4, link: { href: '#', text: '링크 버튼' } },
  { id: 5, link: { href: '#', text: '링크 버튼' } }
])

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
    mobileVideo: '/assets/cnx/main/MAIN_KV1_m.mp4',
    desktopVideo: '/assets/cnx/main/MAIN_KV1.mp4',
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
    title: 'The Futur<br>of CX',
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
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: rem(20);
  margin-top: rem(40);
  
  @include tablet {
    grid-template-columns: repeat(2, 1fr);
    gap: rem(20);
    margin-top: rem(50);
    
    // 태블릿: 상단 2개, 중간 1개(전체 너비), 하단 2개
    .content-grid__item:nth-child(3) {
      grid-column: 1 / -1;
    }
  }
  
  @include desktop {
    grid-template-columns: repeat(6, 1fr);
    gap: rem(20);
    margin-top: rem(60);
    
    .content-grid__item:nth-child(1) {
      grid-column: span 2;
    }
    .content-grid__item:nth-child(2) {
      grid-column: span 2;
    }
    .content-grid__item:nth-child(3) {
      grid-column: span 2;
    }
    
    // 하단 2개 아이템: 각각 3칸씩 차지 (1.5칸 = 3칸/6열)
    .content-grid__item:nth-child(4),
    .content-grid__item:nth-child(5) {
      grid-column: span 3;
    }
  }
}

.stats-section {
  &__text {
    margin-bottom: rem(30);
    width: 100%;
    
    @include tablet {
      margin-bottom: rem(40);
    }
    
    @include desktop {
      margin-bottom: rem(40);
      width: rem(725);
    }
  }
  
  &__text-line {
    color: $d-black;
    font-size: rem(24);
    font-weight: 300;
    line-height: 140%;
    letter-spacing: rem(-0.72);
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
  grid-template-columns: repeat(2, 1fr);
  gap: rem(20);
  padding-top: rem(24);
  padding-bottom: rem(24);
  
  @include tablet {
    grid-template-columns: repeat(3, 1fr);
    gap: rem(50);
  }
  
  @include desktop {
    grid-template-columns: repeat(5, rem(199));
    justify-content: space-between;
    gap: 0;
  }
}

.stats-grid__item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.stats-grid__number {
  color: $p-blue;
  font-size: rem(40);
  font-weight: 700;
  line-height: 100%;
  letter-spacing: rem(-2.5);
  margin-bottom: 0;
  
  @include tablet {
    font-size: rem(70);
    letter-spacing: rem(-4.9);
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
  font-size: rem(12);
  font-weight: 600;
  line-height: 140%;
  margin-bottom: rem(12);
  
  @include tablet {
    font-size: rem(19);
    margin-bottom: rem(14);
  }
  
  @include desktop {
    font-size: rem(19);
    margin-bottom: rem(16);
  }
}

.stats-grid__icon {
  width: rem(40);
  height: rem(40);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  
  @include tablet {
    width: rem(48);
    height: rem(48);
  }
  
  @include desktop {
    width: rem(56);
    height: rem(56);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
}

.content-grid__item {
  position: relative;
  aspect-ratio: 1;
  background-color: $n-gray;
  border-radius: rem(8);
  overflow: hidden;
}

.content-grid__item-inner {
  position: relative;
  width: 100%;
  height: 100%;
}

.content-grid__item-content {
  width: 100%;
  height: 100%;
  padding: rem(20);
  
  @include tablet {
    padding: rem(24);
  }
  
  @include desktop {
    padding: rem(30);
  }
}

.content-grid__item-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  
  .content-grid__item:hover & {
    opacity: 1;
    pointer-events: auto;
  }
}


</style>
