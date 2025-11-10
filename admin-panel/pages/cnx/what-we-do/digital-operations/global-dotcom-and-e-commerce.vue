<template>
  <div class="commerce-platform-page">
    <!-- 키 비주얼 섹션 -->
    <section class="key-visual-section">
      <AppKeyVisual 
        imageAlt="노트북으로 글로벌 개발 작업을 하는 엔지니어"
        :animationDuration="1200"
      />
    </section>

    <div class="inner">
      <!-- 타이틀 섹션 -->
      <section class="title-section">
        <AppTitle 
          title="Global dotcom & e-Commerce"
          text="닷컴에서 이커머스까지 글로벌 비지니스를 위해 필요한 플랫폼에 있어 <br>각 기업에 최적화된 솔루션을 제공하고, 고객사의 고민과 이슈들을 함께 해결합니다. <br>지난 약 20년간 글로벌 Top tier 전자, 자동차, 코스메틱 인더스트리 경험을 통해 <br>누적된 풍부한 경험과 노하우를 기반으로 혁신적인 서비스를 속도감있게 수행합니다."/>
      </section>

      <!-- Global e-Commerce Development & Operation 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="Global e-Commerce Development & Operation"
          text="이커머스 플랫폼에서 주문·재고·로열티·프로모션 전 과정에 걸친 UX 및 기능 고도화, 이커머스 정책 개발 및 플랫폼 개선을 위한 통합 설계부터 실행까지 믿고 맡길 수 있습니다. 컨설팅 통한 정확한 지표를 기준으로 경쟁력있는이커머스 플랫폼 구축 및 운영 서비스를 제공합니다. <br><br>지역별 특성에 맞는 맞춤형 운영 대응 가이드라인과 Best Practice를 제공합니다. 또한, 변화하는 고객 니즈를 신속하게 파악하여  시장의 경쟁력을 높이는 차별화된 기능들을 지속적으로 개발하고 고도화 함으로써 고객사의 글로벌 비즈니스 성장을 뒷받침하고 있습니다."
          imageName="gedo"
          imageAlt="e-Commerce 운영 성과를 보여주는 그래프 화면"
          :reverse="true"
        />
      </section>

      <!-- Global dotcom Development 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="Global dotcom Development"
          text="글로벌 기업에 필수적인 대표적인 글로벌 플랫폼인 닷컴을 위한 프로세스, R&R, 가이드관리를 포함한 글로벌 거버넌스 컨설팅부터 Web-CMS 구축에 이르는 구축단계 전반을 리드합니다. <br><br>웹/모바일/앱 채널에 있어 옴니채널적 관점에서 고객사 비즈니스 환경과 변화하는 상황에 맞는 성공적인 비즈니스 모델을 제시하고 구축 서비스를 제공합니다."
          imageName="gdd"
          imageAlt="전 세계 연결망을 상징하는 디지털 지구본"
        />
      </section>

      <!-- Rollout of Global Platform 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="Rollout of Global Platform"
          text="약 20년간 다수의 글로벌확산 프로젝트를 통해 검증된 확산 방법론 적용하여 글로벌 플랫폼 롤아웃(Roll-out) 업무를 수행합니다. 이를 위해 각 로컬과 체계적이고 직접적인 커뮤니케이션을 통해 로컬별 요구사항 관리, 이슈핸들링 업무를 수행함으로써, 글로벌플랫폼을 수십 개 로컬에 단기간내 확산하여 론칭하고있습니다. <br><br>확산 업무의 기본인 생산성 향상 및 웹 접근성 검수, 자동화 QA 등 품질 향상을 목표로 각 조직이 긴밀하게 협력합니다."
          imageName="rogp"
          imageAlt="글로벌 플랫폼 롤아웃 과정을 나타내는 코드 화면"
          :reverse="true"
        />
      </section>

      <!-- Operation of Global Platform 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="Operation of Global Platform"
          text="이커머스 또는 닷컴이라는 동일한 글로벌 플랫폼상에서 수십개의 로컬사이트들이 일관된 브랜딩 및 마케팅 활동을 할 수 있도록 관리하며, 글로벌 컨텐츠는 현지화하고 로컬 자체 컨텐츠 제작을 지원합니다. 이러한 서비스들은 Concentrix의 글로벌 딜리버리 네트워크의 협업으로 수행되어 효율성과 비용 경쟁력에 있어 완벽한 솔루션을 제공해드리고 있습니다. <br><br>또한 in-house 분석, SEO, 시스템 조직 연계한 통합 운영 서비스로 고객 경험 향상과 비용 효율을 극대화합니다."
          imageName="oogp"
          imageAlt="글로벌 플랫폼 데이터를 조작하는 전문가의 손"
        />
      </section>
      
    </div>

    <div class="global-introduction">
      <div class="inner">
        <section class="global-introduction-content">
          <h2 class="global-introduction-title" ref="title1Ref">Global Delivery Network</h2>
          <p class="global-introduction-text" ref="text1Ref">
            약 20년간 협업해 온 Concentrix의 글로벌 딜리버리 네트워크는 Global One Team으로 프로젝트를 수행하고 있습니다. <br>
            대규모 글로벌 디지털 채널에 최적화된 운영 서비스를 제공하기 위해 10+글로벌 센터와 +1000 전문가들이 테크놀로지 솔루션기반으로 <br>
            고품질, 고효율 서비스를 달성하고 있습니다. <br><br>
            특히 글로벌 비즈니스 시간대를 고려하여 24*365 중단 없는 서비스 지원 체계를 통해 <br>
            국가별 업무시간에 맞춰 신속하게 대응하는 안정적인 운영 환경을 구축하고 있습니다.
          </p>
          <div class="global-introduction-count">
            <div class="global-introduction-count-item" :ref="el => count1Items[0] = el">
              <p class="global-introduction-count-item-title">글로벌 센터</p>
              <p class="global-introduction-count-item-number">10</p>
            </div>
            <div class="global-introduction-count-item" :ref="el => count1Items[1] = el">
              <p class="global-introduction-count-item-title">전문가</p>
              <p class="global-introduction-count-item-number">1K</p>
            </div>
          </div>
        </section>
      </div>

      <div class="global-introduction-banner" ref="bannerRef">
        <picture>
          <source media="(min-width: 1480px)" srcset="/assets/cnx/what-we-do/digital-operations/global-dotcom-and-e-commerce/banner.png" type="image/png">
          <source media="(min-width: 768px)" srcset="/assets/cnx/what-we-do/digital-operations/global-dotcom-and-e-commerce/banner_t.png" type="image/png">
          <img src="/assets/cnx/what-we-do/digital-operations/global-dotcom-and-e-commerce/banner_m.png" alt="배송 네트워크가 표시된 세계 지도" loading="lazy">
        </picture>
        <div class="inner">
          <AppCardList 
            :items="cardListItems"
            :tablet-items-per-row="4"
            :no-margin-bottom="true"
          />
        </div>
      </div>

      <div class="inner">
        <section class="global-introduction-content">
          <h2 class="global-introduction-title" ref="title2Ref">Translation</h2>
          <p class="global-introduction-text" ref="text2Ref">
            기업 웹사이트와 마케팅 콘텐츠 번역에 특화된 번역 서비스로 전 세계 100+개 이상 국가에서 사용되는 90+개 이상의 다양한 언어를 지원합니다. <br><br>
            단순 번역을 넘어 각 지역의 문화적 환경과 시장 특성을 반영한 현지화 카피라이팅까지 제공하여, 글로벌 브랜딩과 현지화를 동시에 구현합니다. <br>
            또한, AI 기반 번역과 경험이 풍부한 전문 번역가의 검수 과정을 결합한 하이브리드 번역 프로세스를 통해 <br>
            완성도 높은 품질의 번역 서비스를 빠르게 제공하며, 고객사의 글로벌 마케팅 성공을 위한 핵심 파트너 역할을 수행하고 있습니다.
          </p>
          <div class="global-introduction-count">
            <div class="global-introduction-count-item" :ref="el => count2Items[0] = el">
              <p class="global-introduction-count-item-title">국가</p>
              <p class="global-introduction-count-item-number">100</p>
            </div>
            <div class="global-introduction-count-item" :ref="el => count2Items[1] = el">
              <p class="global-introduction-count-item-title">언어</p>
              <p class="global-introduction-count-item-number">90</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  </div>
</template>

<script setup>
import AppKeyVisual from '~/components/cnx/AppKeyVisual.vue'
import AppTitle from '~/components/cnx/AppTitle.vue'
import AppImgCont from '~/components/cnx/AppImgCont.vue'
import AppCardList from '~/components/cnx/AppCardList.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// GSAP ScrollTrigger 플러그인 등록
gsap.registerPlugin(ScrollTrigger)

// 레이아웃 설정
definePageMeta({
  layout: 'concentrix'
})

// refs for GSAP animation
const bannerRef = ref(null)
const title1Ref = ref(null)
const text1Ref = ref(null)
const count1Items = ref([])
const title2Ref = ref(null)
const text2Ref = ref(null)
const count2Items = ref([])

// AppCardList 샘플 데이터
const cardListItems = ref([
  {
    id: 1,
    title: 'YDMC (in Seoul)',
    borderColor: '#25e2cc',
    list: [
      '브랜드 웹 통합 운영',
      'CiX Center, 디지털 스튜디오',
      'AV머신러닝, 분석 업무 수행',
      '170 Web Experts',
      '영어, 중국어, 한국어 지원'
    ]
  },
  {
    id: 2,
    title: 'Dalian Center',
    borderColor: '#003d5b',
    list: [
      '브랜드 웹 통합 운영',
      '개발 업무 지원',
      '중국어, 광동어, 대만어 번역 지원',
      '200 Web Experts',
      '(아모레퍼시픽 전담 인력 5명)',
      'GMT +8:00 (09:00~22:00)'
    ]
  },
  {
    id: 3,
    title: 'Vietnam Center',
    borderColor: '#003d5b',
    list: [
      '개발 업무 지원 (마젠토 지원 가능)',
      '영어, 베트남어, 아랍어 번역 지원',
      '150 Web Experts',
      '호치민 50, 하노이 100',
      'GMT +7:00 (09:00~22:00)'
    ]
  },
  {
    id: 4,
    title: 'Bratislava Center',
    borderColor: '#003d5b',
    list: [
      'Translation',
      '40명 번역 전문가',
      'GMT +1:00 (09:00~18:00)'
    ]
  }
])

// GSAP 애니메이션 초기화
const initAnimation = () => {
  // 배너 애니메이션
  if (bannerRef.value) {
    gsap.set(bannerRef.value, { opacity: 0, y: 50 })
    gsap.to(bannerRef.value, {
      scrollTrigger: {
        trigger: bannerRef.value,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      duration: 0.8,
      opacity: 1,
      y: 0,
      ease: 'power2.out'
    })
  }

  // 첫 번째 섹션 애니메이션 (Timeline 기반)
  if (title1Ref.value || text1Ref.value || (count1Items.value && count1Items.value.length > 0)) {
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: title1Ref.value,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })

    // 초기 상태 설정
    if (title1Ref.value) {
      gsap.set(title1Ref.value, { opacity: 0, y: 30 })
    }
    if (text1Ref.value) {
      gsap.set(text1Ref.value, { opacity: 0, y: 30 })
    }
    if (count1Items.value && count1Items.value.length > 0) {
      count1Items.value.forEach(item => {
        if (item) {
          gsap.set(item, { opacity: 0, y: 30 })
        }
      })
    }

    // Timeline 애니메이션
    if (title1Ref.value) {
      tl1.to(title1Ref.value, {
        duration: 0.6,
        opacity: 1,
        y: 0,
        ease: 'power2.out'
      })
    }

    if (text1Ref.value) {
      tl1.to(text1Ref.value, {
        duration: 0.6,
        opacity: 1,
        y: 0,
        ease: 'power2.out'
      }, '-=0.4')
    }

    // Count items stagger
    if (count1Items.value && count1Items.value.length > 0) {
      tl1.to(count1Items.value, {
        duration: 0.6,
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        stagger: 0.15
      }, '-=0.3')
    }
  }

  // 두 번째 섹션 애니메이션 (Timeline 기반)
  if (title2Ref.value || text2Ref.value || (count2Items.value && count2Items.value.length > 0)) {
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: title2Ref.value,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
        refreshPriority: -4,
      }
    })

    // 초기 상태 설정
    if (title2Ref.value) {
      gsap.set(title2Ref.value, { opacity: 0, y: 30 })
    }
    if (text2Ref.value) {
      gsap.set(text2Ref.value, { opacity: 0, y: 30 })
    }
    if (count2Items.value && count2Items.value.length > 0) {
      count2Items.value.forEach(item => {
        if (item) {
          gsap.set(item, { opacity: 0, y: 30 })
        }
      })
    }

    // Timeline 애니메이션
    if (title2Ref.value) {
      tl2.to(title2Ref.value, {
        duration: 0.6,
        opacity: 1,
        y: 0,
        ease: 'power2.out'
      })
    }

    if (text2Ref.value) {
      tl2.to(text2Ref.value, {
        duration: 0.6,
        opacity: 1,
        y: 0,
        ease: 'power2.out'
      }, '-=0.4')
    }

    // Count items stagger
    if (count2Items.value && count2Items.value.length > 0) {
      tl2.to(count2Items.value, {
        duration: 0.6,
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        stagger: 0.15
      }, '-=0.3')
    }
  }
}

// 마운트 시 애니메이션 초기화
onMounted(() => {
  // nextTick으로 DOM이 완벽하게 업데이트된 후 애니메이션 실행
  setTimeout(() => {
    initAnimation()
  }, 100)
})

// 언마운트 시 ScrollTrigger 정리
onUnmounted(() => {
  ScrollTrigger.getAll().forEach(trigger => {
    trigger.kill()
  })
})

</script>

<style lang="scss" scoped>
.commerce-platform-page {
  word-wrap: break-word;
  
  * {
    word-break: keep-all;
  }


  .content-section {
    margin-bottom: rem(60);
    
    @include tablet {
      margin-bottom: rem(80);
    }
    
    @include desktop {
      margin-bottom: rem(120);
    }
  }

  .global-introduction {
    background-color: $gray-3;
    padding-bottom: rem(120);
    &-banner {
      padding: rem(60) rem(24);
      
      @include tablet {
        padding: rem(60) 0;
      }
      
      @include desktop {
        padding: rem(60) 0;
      }
      
      picture {
        @include desktop {
          max-width: rem(1316);
          margin: 0 auto;
          display: block;
        }
      }
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &-content {
      padding: rem(60) 0;
      text-align: center;
    }
    &-title {
      @include sub-headline-01;
      margin-bottom: rem(24);
    }
    &-text {
      @include body-02;
      color: $d-black;
    }
    &-count {
      display: flex;
      justify-content: center;
      gap: rem(10);
      margin-top: rem(40);
      @include tablet {
        gap: rem(14);
      }
      @include desktop {
        gap: rem(20);
      }
      &-item {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: rem(145);
        height: rem(145);
        background-color: $p-blue;
        color: $d-white;
        border-radius: 50%;
        
        @include tablet {
          width: rem(185);
          height: rem(185);
        }
        @include desktop {
          width: rem(245);
          height: rem(245);
        }
        &-title {
          @include body-01;

        }
        &-number {
          font-weight: 700;
          font-size: rem(45);
          line-height: $line-height-normal;
          letter-spacing: -0.04em;
          &::after {
            content: ' +';
            @include sub-headline-01;
            vertical-align: super;
            line-height: 1;
          }
          @include tablet { 
            font-size: rem(55);
          }
          @include desktop {
            font-size: rem(78);
          }
        }
      }
    }
  }
}
</style>
