<template>
  <div class="digital-advertising-page">
    <!-- 키 비주얼 섹션 -->
    <section class="key-visual-section">
      <AppKeyVisual 
        imageAlt="Digital Advertising Key Visual"
        :animationDuration="1200"
      />
    </section>

    <div class="inner">
      <section class="title-section">
        <AppTitle 
          title="Digital Advertising"
          text="고객 여정 인사이트 기반의 광고 운영 및 최적화,<br>광고 소재 제작까지 End to End 디지털 광고 서비스를 제공합니다."
        />
      </section>

      <section class="content-section">
        <AppImgCont 
          title="The Catalyst for<br>Business Growth"
          text="정성과 정량의 경계가 허물어지고 솔루션보다 물음표가 더 많아진 데이터 범람 시대, 고객의 여정에 남겨진 데이터 인사이트를 끊임없이 파헤치며 고객사의 물음에 해답을 제시합니다."
          imageName="DA01"
        />
      </section>

      <section class="content-section">
        <AppImgCont 
          title="INSIGHT CATALYST"
          text="밀도 높은 데이터 분석을 통해 정확한 유저 인사이트를 파악 한다면, 브랜드의 목표와 성과를 달성하기 위한 Key Strategy를 정의할 수 있습니다. 이러한 인사이트를 촉매[Catalyst]로 차별화된 디지털 마케팅 성과를 만들어 냅니다."
          imageName="DA02"
          :reverse="true"
        />
      </section>

      <section class="content-section">
        <AppImgCont 
          title="Advanced<br>Performance Marketing"
          text="데이터 분석을 통한 유저 인사이트를 바탕으로 Branding, User Acquisition, Data Analytics, Target-Optimized Creative까지 디지털 마케팅 전반을 아우르는 Full Funnel Performance를 지향합니다."
          imageName="DA03"
        />
      </section>
    </div>

    <!-- AppSubCont 컴포넌트 추가 -->
    <AppSubCont 
      title="Empowering Brands<br>with Data-Driven Marketing"
      description="고객사 데이터분석, 디지털 광고 운영, 콘텐츠 제작, SEO 등<br>디지털 마케팅 영역에 필요한 모든 Task들이 하나로 통합된, 진정한 의미의<br>End-to-End 디지털 마케팅 솔루션을 제공합니다."
      imageName="subContImg"
      imageAlt="디지털 광고 솔루션 이미지"
    />

    <!-- 스와이퍼 섹션 -->
    <div class="inner">
      <!-- 스와이퍼 섹션 타이틀 -->
      <div class="swiper-title-section">
        <h2 class="section-title">Success Cases</h2>
        <p class="section-description">Achievements made with our integrated solutions.</p>
      </div>
      
      <div class="swiper-section">
        <swiper
          :modules="swiperModules"
          :slides-per-view="1"
          :space-between="0"
          :pagination="paginationConfig"
          :loop="false"
          :direction="'horizontal'"
          :auto-height="false"
          class="swiper-container"
          @swiper="onSwiperInit"
        >
          <swiper-slide v-for="(slide, index) in processedSwiperSlides" :key="index" class="swiper-slide">
            <div class="slide-content">
              <!-- 이미지 영역 -->
              <div class="image-area">
                <picture>
                  <source 
                    v-if="slide.desktopImage"
                    :srcset="slide.desktopImage" 
                    media="(min-width: 1024px)"
                  />
                  <source 
                    v-if="slide.tabletImage"
                    :srcset="slide.tabletImage" 
                    media="(min-width: 768px)"
                  />
                  <img 
                    :src="slide.mobileImage || slide.desktopImage" 
                    :alt="slide.imageAlt || slide.title || 'Slide Image'"
                    class="slide-image"
                    loading="lazy"
                  />
                </picture>
              </div>
              
              <!-- 텍스트 영역 -->
              <div class="text-area">
                <!-- 타이틀 영역 -->
                <div class="title-area">
                  <h3 v-if="slide.title" class="slide-title" v-html="slide.title"></h3>
                </div>
                
                <!-- 서브타이틀과 디스크립션 영역 -->
                <div class="content-area">
                  <h4 v-if="slide.subtitle" class="slide-subtitle" v-html="slide.subtitle"></h4>
                  <p v-if="slide.keyText" class="slide-key-text" v-html="slide.keyText"></p>
                  <ul v-if="slide.listItems && slide.listItems.length > 0" class="slide-list">
                    <li v-for="(item, index) in slide.listItems" :key="index" class="slide-list-item" v-html="item"></li>
                  </ul>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    
    
  </div>
</template>

<script setup>
import AppKeyVisual from '~/components/cnx/AppKeyVisual.vue'
import AppTitle from '~/components/cnx/AppTitle.vue'
import AppImgCont from '~/components/cnx/AppImgCont.vue'
import AppSubCont from '~/components/cnx/AppSubCont.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import { findResponsiveImagePaths } from '~/utils/cnx/image-utils'
import { nextTick } from 'vue'

// 레이아웃 설정
definePageMeta({
  layout: 'concentrix'
})

// Swiper 모듈
const swiperModules = [Pagination]

// 페이지네이션 설정
const paginationConfig = computed(() => ({
  clickable: true,
  bulletClass: 'swiper-pagination-bullet',
  bulletActiveClass: 'swiper-pagination-bullet-active'
}))

// Swiper 인스턴스 ref
const swiperInstance = ref(null)

// 페이지네이션 접근성 설정 함수
const setupPaginationAccessibility = () => {
  nextTick(() => {
    const paginationBullets = document.querySelectorAll('.swiper-pagination-bullet')
    paginationBullets.forEach((bullet, index) => {
      bullet.setAttribute('tabindex', '0')
      bullet.setAttribute('role', 'button')
      bullet.setAttribute('aria-label', `슬라이드 ${index + 1}로 이동`)
      bullet.setAttribute('aria-pressed', bullet.classList.contains('swiper-pagination-bullet-active') ? 'true' : 'false')
      
      // 키보드 이벤트 리스너 추가 (중복 방지)
      bullet.removeEventListener('keydown', handlePaginationKeydown)
      bullet.addEventListener('keydown', handlePaginationKeydown)
    })
  })
}

// 페이지네이션 키보드 이벤트 핸들러
const handlePaginationKeydown = (event) => {
  const bullets = document.querySelectorAll('.swiper-pagination-bullet')
  const currentIndex = Array.from(bullets).indexOf(event.target)
  
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault()
      event.target.click()
      break
    case 'ArrowLeft':
      event.preventDefault()
      const prevIndex = currentIndex === 0 ? bullets.length - 1 : currentIndex - 1
      bullets[prevIndex]?.focus()
      break
    case 'ArrowRight':
      event.preventDefault()
      const nextIndex = (currentIndex + 1) % bullets.length
      bullets[nextIndex]?.focus()
      break
  }
}

// Swiper 초기화 완료 시 인스턴스 저장 및 접근성 설정
const onSwiperInit = (swiper) => {
  swiperInstance.value = swiper
  setupPaginationAccessibility()
}

// 화면 크기 변경 감지 및 Swiper 업데이트
const handleResize = () => {
  if (swiperInstance.value) {
    swiperInstance.value.update()
    setupPaginationAccessibility()
  }
}

// 컴포넌트 마운트 시 리사이즈 이벤트 리스너 추가
onMounted(() => {
  window.addEventListener('resize', handleResize)
})

// 컴포넌트 언마운트 시 이벤트 리스너 제거
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  
  // 페이지네이션 키보드 이벤트 리스너 제거
  const paginationBullets = document.querySelectorAll('.swiper-pagination-bullet')
  paginationBullets.forEach(bullet => {
    bullet.removeEventListener('keydown', handlePaginationKeydown)
  })
})


// 스와이퍼 슬라이드 데이터
const swiperSlides = ref([
  {
    title: "글로벌 웹사이트<br>토탈 디지털 마케팅",
    subtitle: "글로벌 타이어 브랜드 클라이언트의 브랜드 인지도 및 웹사이트 유입 증대를 위한 토탈 마케팅 솔루션 수행",
    keyText: "Key feature",
    listItems: [
      "각 마케팅 채널에서 유입된 유저의 랜딩 이후 Journey 인사이트 분석 및 이를 기반한 디지털 광고 집행",
      "고객사 소셜미디어 브랜딩 커뮤니케이션 전략 수립, 소셜미디어 브랜딩 마케팅 수행",
      "SEO 환경 구축, 기술 지원 및 키워드 최적화 제언으로 고객사  SEM 성과 개선에 기여"
    ],
    imageName: "swiper01",
    imageAlt: "데이터 기반 전략 이미지"
  },
  {
    title: "Data-Driven Marketing<br>분석 솔루션",
    subtitle: "글로벌 자동차 브랜드에서 집행하는 디지털 광고의 효율성 제고를 위한 분석 및 AI기반 타겟 매칭 서비스 제공",
    keyText: "Key feature",
    listItems: [
      "고객사의 1PD 타겟 Affinity 및 마케팅 데이터 인사이트 기반 광고 타겟 세그먼트 전략 수립",
      "미디어 성과, 유저 Journey 교차 분석을 통한 광고 성과 검증",
      "마케팅 태그 점검 / 대시보드 / 축적 데이터 기반의 *마케팅 성과 예측 모델링 등 Solution Development<br><span class='description'>*최대 7일까지 예측 가능, 오차 범위 최대 8% 이내</span>"
    ],
    imageName: "swiper02",
    imageAlt: "창의적 콘텐츠 최적화 이미지"
  },
  {
    title: "글로벌 웹사이트<br>토탈 디지털 마케팅",
    subtitle: "하우징 클라이언트의 크리에이티브 제작 / 디지털 광고 집행 데이터 분석 디지털 마케팅 통합 컨설팅 및 관리",
    keyText: "Key feature",
    listItems: [
      "실시간 마케팅 데이터 분석 기반의 디지털 광고 전략 수립 & 최적화 운영",
      "광고 유입 이후 유저 Journey 분석을 통한 광고 전략 인사이트 및 고객사 웹사이트 PMO 최적화 제언",
      "웹사이트 유저 데이터, 광고 분석 데이터 및 이전 크리에이티브 인사이트 분석을 통한 광고 크리에이티브 고도화"
    ],
    imageName: "swiper03",
    imageAlt: "성과 중심 마케팅 이미지"
  },
  {
    title: "웹사이트 마케팅 데이터<br>분석 & 웹 콘텐츠 퍼블리싱",
    subtitle: "국내 대기업 IT 전자 클라이언트의 마케팅 데이터 분석 기반 광고 인사이트 제언, 페이지 내 콘텐츠, SEO 최적화 진행",
    keyText: "Key feature",
    listItems: [
      "유저 Journey 기반, 웹사이트 내 모든 전환 인사이트 분석하여 고객사 광고 운영에 제언",
      "SEO Tech 지원 / 웹사이트 콘텐츠 중심으로 SEO 진행하며 가이드, 리포팅, 대시보드 제공",
      "기존 콘텐츠 & SEO, 고객사 상품 분석과 시장 트렌드를 반영한 웹사이트 콘텐츠 제작 및 퍼블리싱"
    ],
    imageName: "swiper04",
    imageAlt: "성과 중심 마케팅 이미지"
  },
  {
    title: "CRM 분석& 자동화 솔루션",
    subtitle: "뷰티 브랜드 클라이언트 디지털 마케팅에 자체 개발 CRM 솔루션 SAM 도입, 고객사 CRM 마케팅 효율 증대",
    keyText: "Key feature",
    listItems: [
      "고객사 CDP 실시간 연동으로 마케팅 목적에 맞는 CRM 타겟 추출이 가능한 SAM 대시보드 개발 및 운영",
      "자체 개발 AI 솔루션(MARS) 도입하여 상품과 프로모션에 최적화된 타겟 매핑 모델링 제공 <span class='description'>(매핑 정확도 90% 이상)</span>",
      "메타 등 외부 매체와의 API 연동으로 SAM, MARS를 통해 발굴된 고도화된 타겟 세그먼트 활용 가능"
    ],
    imageName: "swiper05",
    imageAlt: "성과 중심 마케팅 이미지"
  }
])

// 이미지 경로 처리
const processedSwiperSlides = computed(() => {
  const imagePath = "/assets/cnx/what-we-do/strategy-and-design/digital-advertising"
  return swiperSlides.value.map(slide => {
    if (slide.imageName) {
      const imagePaths = findResponsiveImagePaths(slide.imageName, imagePath)
      return {
        ...slide,
        desktopImage: imagePaths.desktopImage,
        mobileImage: imagePaths.mobileImage,
        tabletImage: imagePaths.tabletImage
      }
    }
    return slide
  })
})

</script>

<style lang="scss" scoped>
.swiper-title-section {
  text-align: center;
  padding: rem(50) 0;

  @include tablet {
    padding: rem(50) 0;
  }

  @include desktop {
    padding: rem(100) 0;
  }

  .section-title {
    @include sub-headline-02;
    color: $d-black;
    margin: 0 0 rem(4) 0;
    line-height: 1.3;
  }

  .section-description {
    @include body-02;
    color: $d-black;
    margin: 0;
    line-height: 1.6;
    max-width: rem(600);
    margin-left: auto;
    margin-right: auto;

    @include tablet {
      max-width: rem(700);
    }

    @include desktop {
      max-width: rem(800);
    }
  }
}

.swiper-section {
  width: 100%;

  .swiper-container {
    width: 100%;
    overflow: hidden;
    height: auto;
  }

  .swiper-slide {
    width: 100%;
    height: auto;
    flex-shrink: 0;
    display: flex;
    align-items: stretch;
  }

  .slide-content {
    display: flex;
    flex-direction: column;
    border: 1px solid $gray-2;
    width: 100%;
    height: 100%;
  }

  .image-area {
    width: 100%;
    height: rem(70);
    overflow: hidden;

    @include tablet {
      height: rem(155);
    }

    @include desktop {
      height: rem(316);
    }

    picture {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }

    .slide-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .text-area {
    display: flex;
    flex-direction: column;
    gap: rem(16);
    padding: rem(20);
    width: 100%;
    box-sizing: border-box;
    flex: 1;

    @include tablet {
      flex-direction: row;
      align-items: flex-start;
      gap: rem(40);
      padding: rem(24);
    }

    @include desktop {
      gap: rem(60);
      padding: rem(50) rem(35);
    }
  }

  .title-area {
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid $gray-2;
    padding-bottom: rem(16);

    @include tablet {
      width: 50%;
      border-bottom: none;
      border-right: 1px solid $gray-2;
      padding-bottom: 0;
      padding-right: rem(20);
      align-self: stretch;
    }

    @include desktop {
      width: 50%;
      border-bottom: none;
      border-right: 1px solid $gray-2;
      padding-bottom: 0;
      padding-right: rem(30);
      align-self: stretch;
    }

    .slide-title {
      @include sub-headline-02;
      color: $d-black;
      margin: 0;
      line-height: 1.3;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
  }

  .content-area {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;

    @include tablet {
      width: 50%;
    }

    .slide-subtitle {
      @include body-01;
      color: $d-black;
      margin: 0 0 rem(24) 0;
      line-height: 1.4;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .slide-key-text {
      @include body-02;
      color: $d-black;
      margin: 0;
      font-weight: 700;
      line-height: 1.6;
      word-wrap: break-word;
      overflow-wrap: break-word;

      @include tablet {
        margin: 0 0 rem(24) 0;
      }
    }

    .slide-list {
      margin: 0;
      padding: 0;
      list-style: none;

      .slide-list-item {
        @include body-03;
        color: $d-black;
        margin: 0;
        line-height: 1.6;
        word-wrap: break-word;
        overflow-wrap: break-word;
        position: relative;
        padding-left: rem(16);
        :deep(.description) {
          @include body-03;
          color: $gray-1;
          margin: 0;
          line-height: 1.6;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
        &::before {
          content: '•';
          position: absolute;
          left: 0;
          color: $d-black;
          font-weight: bold;
        }
      }
    }
  }
}

// Swiper 기본 스타일 오버라이드
:deep(.swiper) {
  width: 100%;
  height: auto;
  margin-left: auto;
  margin-right: auto;
}

:deep(.swiper-wrapper) {
  position: relative;
  width: 100%;
  height: auto;
  z-index: 1;
  display: flex;
  transition-property: transform;
  box-sizing: content-box;
}

:deep(.swiper-slide) {
  flex-shrink: 0;
  width: 100%;
  height: auto;
  position: relative;
  transition-property: transform;
}

// Swiper 페이지네이션 스타일
:deep(.swiper-pagination) {
  position: relative;
  margin: rem(20) 0;
  text-align: center;

  @include tablet {
    margin: rem(30) 0;
  }

  @include desktop {
    margin: rem(50) 0;
  }

  .swiper-pagination-bullet {
    width: rem(8);
    height: rem(8);
    background-color: #fff;
    border: 1px solid $d-black;
    opacity: 1;
    margin: 0 rem(6);
    transition: all 0.3s ease;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    vertical-align: middle;
    cursor: pointer;
    outline: none;

    @include tablet {
      width: rem(12);
      height: rem(12);
      margin: 0 rem(8);
    }

    @include desktop {
      width: rem(12);
      height: rem(12);
      margin: 0 rem(8);
    }

    &:focus {
      outline: 2px solid $d-black;
      outline-offset: 2px;
    }

    &.swiper-pagination-bullet-active {
      background-color: $d-black;
      border: 1px solid $d-black;
      transform: none;
    }
  }
}
</style>
