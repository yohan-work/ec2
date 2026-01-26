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
          text="당신의 브랜드를 위한 안전한 온라인 미래를 만듭니다<br><span class='weight-normal'>인터넷에서 단 1분 동안 전 세계에서 수많은 일이 벌어집니다. 수백만 건의 메시지가 오가고, 수십만 시간의 사용자 제작 콘텐츠가 업로드되며, 수십만 시간의 스트리밍 미디어가 소비됩니다.이 거대한 흐름 속에서 플랫폼과 사용자를 부적절한 콘텐츠, 허위 정보, 사기, 그리고 각종 악용으로부터 보호하는 일은 선택이 아닌 필수입니다. 우리는 안전하고 신뢰할 수 있는 디지털 환경을 구축해 브랜드와 고객의 가치를 지킵니다.</span>"/>
      </section>

      <!-- Content Moderation 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="Content Moderation"
          imageName="cm"
          imageAlt="데이터 보안을 상징하는 디지털 지문 인식 그래픽"
          :reverse="true"
          :subItems="contentModerationSubItems"
          :alignTop="true"
        />
      </section>

      <div class="introduction-content" ref="contentRef_1">
        <ul class="introduction-list">
          <li class="introduction-list-item">
            <img src="/assets/cnx/what-we-do/digital-operations/trust-and-safety/ic1_01.svg" alt="방패 안에 사람의 형상이 있는 보안 아이콘" loading="lazy">
            <p class="introduction-list-item-text">
              <strong>안전한 경험 제공</strong>
              콘텐츠를 검토하고 승인하여 적절성과 안전성을 보장함으로써, 모든 사용자가 긍정적인 온라인 경험을 누릴 수 있도록 합니다.
            </p>
          </li>
          <li class="introduction-list-item">
            <img src="/assets/cnx/what-we-do/digital-operations/trust-and-safety/ic1_02.svg" alt="하트 형태로 건강과 웰빙을 상징하는 아이콘" loading="lazy">
            <p class="introduction-list-item-text">
              <strong>타협 없는 웰빙</strong>
              업계에서 인정받는 웰빙 프로그램과 운영 가이드라인을 통해, 우리의 팀이 건강하고 지속 가능한 환경에서 일할 수 있도록 지원합니다.
            </p>
          </li>
          <li class="introduction-list-item">
            <img src="/assets/cnx/what-we-do/digital-operations/trust-and-safety/ic1_03.svg" alt="대륙이 표시된 지구본 형태의 글로벌 아이콘" loading="lazy">
            <p class="introduction-list-item-text">
              <strong>글로벌 운영 역량</strong>
              25개국 이상에서 활동하며, 각 지역의 온라인 기준과 규제를 깊이 이해한 글로벌 팀이 안정적이고 신뢰할 수 있는 서비스를 제공합니다.
            </p>
          </li>
          <li class="introduction-list-item">
            <img src="/assets/cnx/what-we-do/digital-operations/trust-and-safety/ic1_04.svg" alt="회로 패턴이 있는 칩 또는 AI를 상징하는 기술 아이콘" loading="lazy">
            <p class="introduction-list-item-text">
              <strong>기술 혁신 선도</strong>
              R&D에 지속적으로 투자하고, 첨단 AI 기술을 접목하며, 변화하는 산업 요구에 민첩하게 대응하는 혁신적인 운영 방식을 구축합니다.
            </p>
          </li>
        </ul>
      </div>
      
    </div>

    <div class="introduction">
      <div class="inner">
        <section class="introduction-content" ref="contentRef_2">
          <h2 class="introduction-title" ref="titleRef">AI Support & Data Services</h2>
          <h3 class="introduction-subtitle" ref="subtitleRef">데이터 리스크를 AI 기반 기회로 전환</h3>
          <p class="introduction-text" ref="textRef">
            당사의 AI 지원 및 데이터 서비스는 정확하게 라벨링된 고품질 학습 데이터를 제공하여 AI 모델의 성능과 신뢰성을 향상시킵니다.<br>
            첨단 데이터 주석(Annotation) 기술을 AI 전략에 통합함으로써, 정확하고 신뢰할 수 있으며 윤리적인 AI 구현을 보장합니다.<br>
            우리의 솔루션은 최신 기술과 전문 인력의 역량을 결합해, 영향력 있고 혁신적인 결과를 제공합니다.
          </p>
          <ul class="introduction-list">
            <li class="introduction-list-item">
              <img src="/assets/cnx/what-we-do/digital-operations/trust-and-safety/ic2_01.svg" alt="AI 지원 서비스의 기술 가속화를 상징하는 로켓 아이콘" loading="lazy">
              <p class="introduction-list-item-text">
                <strong>개발 가속화</strong>
                데이터 준비 과정을 간소화하여 AI 모델 학습과 배포를 더욱 빠르게 진행합니다.
              </p>
            </li>
            <li class="introduction-list-item">
              <img src="/assets/cnx/what-we-do/digital-operations/trust-and-safety/ic2_02.svg" alt="모델 정확도 향상을 나타내는 방패 속 체크 표시" loading="lazy">
              <p class="introduction-list-item-text">
                <strong>모델 정확도 향상</strong>
                데이터 준비 과정을 간소화하여 AI 모델 학습과 배포를 더욱 빠르게 진행합니다.
              </p>
            </li>
            <li class="introduction-list-item">
              <img src="/assets/cnx/what-we-do/digital-operations/trust-and-safety/ic2_03.svg" alt="투명성 및 공정성 검증을 의미하는 AI 큐브" loading="lazy">
              <p class="introduction-list-item-text">
                <strong>투명성과 규제 준수 강화</strong>
                윤리적 기준과 법적 규정을 준수하면서 AI 운영의 투명성을 보장합니다.
              </p>
            </li>
            <li class="introduction-list-item">
              <img src="/assets/cnx/what-we-do/digital-operations/trust-and-safety/ic2_04.svg" alt="델 및 학습 데이터 관리를 나타내는 이진 코드" loading="lazy">
              <p class="introduction-list-item-text">
                <strong>모든 데이터 유형 관리</strong>
                다양한 AI 활용 사례와 데이터 형식에 대응할 수 있는 유연성을 제공해, 품질을 유지하며 확장 가능합니다.
              </p>
            </li>
            <li class="introduction-list-item">
              <img src="/assets/cnx/what-we-do/digital-operations/trust-and-safety/ic2_05.svg" alt="AI 기반 시장 변화 예측을 보여주는 데이터 차트" loading="lazy">
              <p class="introduction-list-item-text">
                <strong>사용자 경험 개선</strong>
                정확하고 직관적인 상호작용을 통해 만족도와 참여도를 높입니다.
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
import { ref, onMounted, onBeforeUnmount } from 'vue'

// 레이아웃 설정
definePageMeta({
  layout: 'concentrix'
})

const contentModerationSubItems = computed(() => [
  {
    title: '확장 가능하고 탄력적인 지원 체계 구축',
    listItems: [
      '안전하고 규정을 준수하는 환경을 마련하는 것은 브랜드의 신뢰를 지키는 핵심입니다.당사의 Trust & Safety 서비스는 AI, 자동화, 그리고 전문 인력의 균형 잡힌 조합을 통해 24시간 디지털 비즈니스를 모니터링합니다.플랫폼과 온라인 커뮤니티를 보호함으로써 사용자와의 신뢰를 구축하고, 각 사용자의 언어·지역·규모에 맞춘 서비스를 제공합니다.또한 온라인 플랫폼 이용자 보호를 최우선으로 하며, 팀의 웰빙을 위한 다양한 프로그램을 운영해 지속 가능하고 고품질의 솔루션을 제공합니다.지금, 더 안전한 디지털 세상을 함께 만들어갈 준비가 되셨나요?'
    ]
  }
])

// refs for animation
const contentRef_1 = ref(null)
const contentRef_2 = ref(null)
const titleRef = ref(null)
const subtitleRef = ref(null)
const textRef = ref(null)

let contentObservers = []

// Content Observer 설정 (contentRef_1, contentRef_2 모두 적용)
const setupContentObserver = () => {
  const contentRefs = [contentRef_1, contentRef_2]

  contentRefs.forEach((refItem, idx) => {
    if (!refItem.value) return

    let lastScrollY = 0
    let isFirstCheck = true

    const observer = new IntersectionObserver(
      ([entry]) => {
        const currentScrollY = window.scrollY || window.pageYOffset
        const isScrollingDown = currentScrollY > lastScrollY
        const isNearTop = currentScrollY < 100

        if (entry.isIntersecting && (isScrollingDown || isFirstCheck || isNearTop)) {
          refItem.value.classList.add('active')
          isFirstCheck = false
        } else if (!entry.isIntersecting && !isScrollingDown) {
          refItem.value.classList.remove('active')
          isFirstCheck = true
        }

        lastScrollY = currentScrollY
      },
      {
        threshold: 0.2,
        rootMargin: '-50px'
      }
    )

    observer.observe(refItem.value)
    contentObservers.push(observer)
  })
}

// 마운트 시 애니메이션 초기화
onMounted(() => {
  setupContentObserver()
})

// 언마운트 시 Observer 정리
onBeforeUnmount(() => {
  contentObservers.forEach(observer => {
    observer.disconnect()
  })
  contentObservers = []
})

</script>

<style lang="scss" scoped>
.commerce-platform-page {
  * {
    word-break: keep-all;
  }


  .content-section,
  .content-section + .introduction-content {
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

    &--bg-white {
      background-color: $d-white;
    }
    @include desktop {
      padding: rem(120) 0;
    }
    &-content {
      text-align: center;

      .introduction-title {
        transform: translateY(30px);
        opacity: 0;
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      }

      .introduction-subtitle {
        transform: translateY(30px);
        opacity: 0;
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      }

      .introduction-text {
        transform: translateY(30px);
        opacity: 0;
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      }

      .introduction-list-item {
        transform: translateY(30px);
        opacity: 0;
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      }

      // active 상태
      &.active {
        .introduction-title {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0s;
        }

        .introduction-subtitle {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.2s;
        }

        .introduction-text {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.4s;
        }

        .introduction-list-item {
          opacity: 1;
          transform: translateY(0);
          &:nth-child(1) {
            transition-delay: 0.6s;
          }
          &:nth-child(2) {
            transition-delay: 0.7s;
          }
          &:nth-child(3) {
            transition-delay: 0.8s;
          }
          &:nth-child(4) {
            transition-delay: 0.9s;
          }
          &:nth-child(5) {
            transition-delay: 1s;
          }
        }
      }
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
        justify-content: center;
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
