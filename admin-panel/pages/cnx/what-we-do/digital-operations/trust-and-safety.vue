<template>
  <div class="commerce-platform-page">
    <!-- 키 비주얼 섹션 -->
    <section class="key-visual-section">
      <AppKeyVisual 
        imageAlt="컴퓨터 화면을 보며 보안 작업을 하는 엔지니어"
        :animationDuration="1200"
      />
    </section>

    <div class="inner">
      <!-- 타이틀 섹션 -->
      <section class="title-section">
        <AppTitle 
          title="Trust & Safety"
          text="전문 지식, 첨단 기술, 구조화된 운영 모델을 통해 차별화된 고객 경험을 제공합니다."/>
      </section>

      <!-- Content Moderation 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="Content Moderation"
          text="AI, 자동화, 인간의 통찰력을 바탕으로 귀사의 디지털 컨텐츠를 24시간 연중 무휴로 모니터링하여 모두에게 더 안전한 경험을 제공합니다."
          imageName="cm"
          imageAlt="데이터 보안을 상징하는 디지털 지문 인식 그래픽"
          :reverse="true"
        />
      </section>
      
    </div>

    <div class="introduction">
      <div class="inner">
        <section class="introduction-content">
          <h2 class="introduction-title" ref="titleRef">AI Support & Data Services</h2>
          <h3 class="introduction-subtitle" ref="subtitleRef">데이터 위험을 AI 중심 기회로 전환</h3>
          <p class="introduction-text" ref="textRef">
            당사의 AI 지원 및 데이터 서비스는 AI 모델 성능과 신뢰성을 향상시키기 위해 <br>
            고품질의 정확하게 라벨링된 훈련 데이터를 제공합니다. <br><br>
            귀사의 AI 전략에 고급 주석 기법을 통합함으로써 정확하고 신뢰할 수 있으며 윤리적인 AI 배포를 보장합니다. <br>
            당사의 솔루션은 첨단 기술과 인간의 전문성을 결합하여 영향력 있고 혁신적인 결과를 제공합니다.
          </p>
          <ul class="introduction-list">
            <li class="introduction-list-item" :ref="el => listItems[0] = el">
              <img src="/assets/cnx/what-we-do/digital-operations/trust-and-safety/ic01.svg" alt="AI 지원 서비스의 기술 가속화를 상징하는 로켓 아이콘" loading="lazy">
              <p class="introduction-list-item-text">
                <strong>개발 가속화</strong>
                데이터 준비 과정을 간소화하여 AI 모델 훈련 및 배포를 가속화합니다.
              </p>
            </li>
            <li class="introduction-list-item" :ref="el => listItems[1] = el">
              <img src="/assets/cnx/what-we-do/digital-operations/trust-and-safety/ic02.svg" alt="모델 정확도 향상을 나타내는 방패 속 체크 표시" loading="lazy">
              <p class="introduction-list-item-text">
                <strong>모델 정확도 향상</strong>
                오류를 줄이고 AI 모델 신뢰성을 개선하며 편향을 최소화하여 일관된 결과를 보장합니다.
              </p>
            </li>
            <li class="introduction-list-item" :ref="el => listItems[2] = el">
              <img src="/assets/cnx/what-we-do/digital-operations/trust-and-safety/ic03.svg" alt="투명성 및 공정성 검증을 의미하는 AI 큐브" loading="lazy">
              <p class="introduction-list-item-text">
                <strong>투명성 및 규정 준수 강화</strong>
                윤리적 기준과 법적 규정을 준수하면서 투명성을 보장합니다.
              </p>
            </li>
            <li class="introduction-list-item" :ref="el => listItems[3] = el">
              <img src="/assets/cnx/what-we-do/digital-operations/trust-and-safety/ic04.svg" alt="델 및 학습 데이터 관리를 나타내는 이진 코드" loading="lazy">
              <p class="introduction-list-item-text">
                <strong>모든 데이터 유형 관리</strong>
                다양한 AI 사용 사례와 데이터 형식에 대응하는 유연성을 제공하여 품질 저하 없이 확장성을 확보합니다.
              </p>
            </li>
            <li class="introduction-list-item" :ref="el => listItems[4] = el">
              <img src="/assets/cnx/what-we-do/digital-operations/trust-and-safety/ic05.svg" alt="AI 기반 시장 변화 예측을 보여주는 데이터 차트" loading="lazy">
              <p class="introduction-list-item-text">
                <strong>사용자 경험 개선</strong>
                관련성 높고 정확하며 직관적인 상호작용을 제공하여 만족도와 참여도를 높입니다.
              </p>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppKeyVisual from '~/components/cnx/AppKeyVisual.vue'
import AppTitle from '~/components/cnx/AppTitle.vue'
import AppImgCont from '~/components/cnx/AppImgCont.vue'
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
const titleRef = ref(null)
const subtitleRef = ref(null)
const textRef = ref(null)
const listItems = ref([])

// GSAP 애니메이션 초기화
const initAnimation = () => {
  // Title, Subtitle, Text 애니메이션
  if (titleRef.value || subtitleRef.value || textRef.value) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.value,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })

    // 초기 상태 설정
    if (titleRef.value) {
      gsap.set(titleRef.value, { opacity: 0, y: 30 })
    }
    if (subtitleRef.value) {
      gsap.set(subtitleRef.value, { opacity: 0, y: 30 })
    }
    if (textRef.value) {
      gsap.set(textRef.value, { opacity: 0, y: 30 })
    }

    // Timeline 애니메이션
    if (titleRef.value) {
      tl.to(titleRef.value, {
        duration: 0.6,
        opacity: 1,
        y: 0,
        ease: 'power2.out'
      })
    }

    if (subtitleRef.value) {
      tl.to(subtitleRef.value, {
        duration: 0.6,
        opacity: 1,
        y: 0,
        ease: 'power2.out'
      }, '-=0.4')
    }

    if (textRef.value) {
      tl.to(textRef.value, {
        duration: 0.6,
        opacity: 1,
        y: 0,
        ease: 'power2.out'
      }, '-=0.4')
    }
  }

  // List items stagger 애니메이션
  if (listItems.value && listItems.value.length > 0) {
    const listTl = gsap.timeline({
      scrollTrigger: {
        trigger: listItems.value[0],
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })

    // 초기 상태 설정
    listItems.value.forEach(item => {
      if (item) {
        gsap.set(item, { opacity: 0, y: 30 })
      }
    })

    // Stagger 애니메이션
    listTl.to(listItems.value, {
      duration: 0.6,
      opacity: 1,
      y: 0,
      ease: 'power2.out',
      stagger: 0.1
    })
  }
}

// 마운트 시 애니메이션 초기화
onMounted(() => {
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

  .introduction {
    background-color: $gray-3;
    padding: rem(60) 0;
    @include desktop {
      padding: rem(120) 0;
    }
    &-content {
      text-align: center;
    }
    &-title {
      @include sub-headline-01;
      margin-bottom: rem(24);
    }
    &-subtitle {
      @include body-01;
      margin-bottom: rem(24);
    }
    &-text {
      @include body-02;
      font-weight: 400;
      color: $d-black;
    }
    &-list {
      display: flex;
      flex-wrap: wrap;
      gap: rem(30) rem(10);
      margin-top: rem(40);
      @include tablet {
        gap: rem(30) rem(10);
      }
      @include desktop {
        flex-wrap: nowrap;
        gap: rem(21);
      }
      &-item {
        width: calc(100% / 2 - rem(5));
        text-align: center;
        @include tablet {
          width: calc(100% / 3 - rem(10));
        }
        @include desktop {
          width: calc(100% / 5);
        }
        img {
          width: rem(110);
          margin: 0 auto;
          @include tablet {
            width: rem(140);
          }
          @include desktop {
            width: auto;
          }
        }
        &-text {
          @include body-03;
          margin-top: rem(20);
          strong {
            display: block;
            margin-bottom: rem(6);
          }
        }
      }
    }
  }
}
</style>
