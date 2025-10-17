<template>
  <div class="contents-and-design">

    <!-- S : banner-slide-section -->
    <section class="banner-slide-section">
      <swiper
        :slidesPerView="1"
        :pagination="paginationOptions"
        :autoplay="{
          delay: 3000,
          disableOnInteraction: false,  
          pauseOnMouseEnter: true
        }"
        :breakpoints="{
          768: {
            slidesPerView: 'auto',
            freeMode: 'true',
            enabled: false, // 스와이퍼 비활성화
          },
        }"
        :modules="modules"
        :keyboard="keyboardOptions"
        :a11y="a11yOptions"
        @swiper="onSwiperInit"
        @slideChange="onSlideChange"
        class="banner-slide"
        role="region"
        aria-roledescription="carousel"
        aria-label="프로젝트 배너 캐러셀"
        aria-live="off"
      >
        <swiper-slide v-for="(slide, index) in slideData" :key="index" class="banner-slide-item" :class="{ 'active': activeSlideIndex === index }" role="group" :aria-label="`슬라이드 ${index + 1} / ${slideData.length}`">
          <div class="banner-slide-item-content" :class="{ 'black-text': getEffectiveColor(slide, index) === 'black' }" :role="isMobile ? 'img' : null" :aria-label="isMobile ? getSlideAltText(slide) : null">
            <ClientOnly>
              <figure class="banner-slide-item-image" v-if="!isMobile">
                <picture>
                  <source :srcset="getImageSrc(index + 1)" media="(min-width: 768px)">
                  <source :srcset="getImageSrc(index + 1)" media="(min-width: 1024px)">
                  <img :src="getImageSrc(index + 1)" :alt="getSlideAltText(slide)" loading="lazy" fetchpriority="low" width="880" height="360">
                </picture>
              </figure>
            </ClientOnly>
            <div class="banner-slide-item-text">
            <div
              class="banner-slide-item-title-container"
            >
                <p class="banner-slide-item-title" v-html="slide.title"></p>
              <AppButton  
                v-if="!isMobile"
                  :text="activeSlideIndex === index ? 'Close' : 'Learn More'"
                  :color="getEffectiveColor(slide, index) === 'black' ? 'default' : 'white'"
                  :effect="activeSlideIndex === index ? 'right' : 'left'"
                  :arrow="activeSlideIndex === index ? 'reverse' : true"
                  class="banner-slide-item-button"
                  :aria-controls="'slide-details-' + index"
                  :aria-expanded="activeSlideIndex === index ? 'true' : 'false'"
                  @click="toggleSlide(index)"
                  @focus="onBannerButtonFocus(index)"
                />
              </div>
            <div
              class="banner-slide-item-details"
              :id="'slide-details-' + index"
              :class="getBorderClass(slide, index)"
              :aria-hidden="activeSlideIndex === index ? 'false' : 'true'"
            >
                <p class="banner-slide-item-subtitle" v-if="!isMobile && slide.subtitle" v-html="slide.subtitle">
                </p>
                <p class="banner-slide-item-description" v-if="slide.description" v-html="slide.description">
                </p>
                <div class="banner-slide-item-meta" v-if="!isMobile && slide.launch && slide.client">
                  <p><strong>Launch</strong> {{ slide.launch }}</p>
                  <p><strong>Client</strong> {{ slide.client }}</p>
                </div>
                <a class="banner-slide-item-link" v-if="!isMobile && slide.link" :href="`${slide.link}`" target="_blank" rel="noopener noreferrer" :aria-label="`${slide.link} (새 창에서 열림)`">
                  {{ slide.link }}
                </a>
              </div>
            </div>
          </div>
        </swiper-slide>
        <div class="banner-slide-controller" :class="{ black: isPaginationBlack }">
          <div class="banner-slide-controller-pagination"></div>
          <button 
            class="banner-slide-controller-button"
            aria-label="자동재생 시작/중지"
            :aria-pressed="isAutoplayRunning ? 'true' : 'false'"
            @click="toggleAutoplay"
          >
          </button>
        </div>
        <button class="banner-slide-down-button" @click="scrollToNextSection" aria-label="다음 섹션으로 이동"></button>
      </swiper>
    </section>
    <!-- E : banner-slide-section -->

    <!-- S : intro-section -->
    <section class="intro-section" ref="nextSectionRef">
      <div class="inner">
        <AppTitle 
          class="intro-app-title"
          title="Concentrix <br>interactive <br>eXperience" 
          text="CiX(Concentrix interactive eXperience)는 콘센트릭스 내에서 <br>UX/UI와 Contents 제작을 전담하는 Creative 조직입니다."
        />
        <div class="intro-section-content">
          <span class="intro-section-content-line"></span>
          <div class="intro-section-content-item" role="img" aria-label="CiX">
            <div aria-hidden="true" class="intro-section-content-item-wrap">
              <img src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/c.svg" alt="C" aria-hidden="true">
            </div>
            <div aria-hidden="true" class="intro-section-content-item-wrap">
              <img src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/i.svg" alt="I" aria-hidden="true">
            </div>
            <div aria-hidden="true" class="intro-section-content-item-wrap">
              <img src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/x.svg" alt="X" aria-hidden="true">
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- E : intro-section -->
    
    <!-- S : overview-section -->
    <section class="overview-section">
      <div class="inner">
        <div class="overview-section-content">
          <!-- PC -->
          <ul class="overview-section-content-list" v-if="!isMobile">
            <li class="overview-section-content-list-item">
              <img src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/wedelivercreative.png" alt="wedelivercreative">
            </li>
          </ul>
          <!-- Mobile -->
          <ul class="overview-section-content-list" v-else>
            <li class="overview-section-content-list-item">
              <img src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/wedeliver.png" alt="wedeliver">
            </li>
            <li class="overview-section-content-list-item">
              <img src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/creative.png" alt="creative">
            </li>
          </ul>
          <ul class="overview-section-content-list">
            <li class="overview-section-content-list-item">
              <div class="img-swap">
                <img class="img-base" src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/report.gif" alt="report">
                <img class="img-hover" src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/report_hover.gif" alt="report" aria-hidden="true" loading="lazy" fetchpriority="low">
              </div>
              <span class="overview-section-content-list-item-comma" aria-hidden="true">,&nbsp;</span>
            </li>
            <li class="overview-section-content-list-item">
              <div class="img-swap">
                <img class="img-base" src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/planning.gif" alt="planning">
                <img class="img-hover" src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/planning_hover.gif" alt="planning" aria-hidden="true" loading="lazy" fetchpriority="low">
              </div>
              <span class="overview-section-content-list-item-comma" aria-hidden="true">,&nbsp;</span>
            </li>
            <li class="overview-section-content-list-item">
              <div class="img-swap">
                <img class="img-base" src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/service.gif" alt="service">
                <img class="img-hover" src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/service_hover.gif" alt="service" aria-hidden="true" loading="lazy" fetchpriority="low">
              </div>
            </li>
          </ul>
          <ul class="overview-section-content-list">
            <li class="overview-section-content-list-item">
              <div class="img-swap">
                <img class="img-base" src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/graphics.gif" alt="graphics">
                <img class="img-hover" src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/graphics_hover.gif" alt="graphics" aria-hidden="true" loading="lazy" fetchpriority="low">
              </div>
              <span class="overview-section-content-list-item-comma" aria-hidden="true">,&nbsp;</span>
            </li>
            <li class="overview-section-content-list-item">
              <div class="img-swap">
                <img class="img-base" src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/color.gif" alt="color">
                <img class="img-hover" src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/color_hover.gif" alt="color" aria-hidden="true" loading="lazy" fetchpriority="low">
              </div>
              <span class="overview-section-content-list-item-comma" aria-hidden="true">,&nbsp;</span>
            </li>
            <li class="overview-section-content-list-item">
              <div class="img-swap">
                <img class="img-base" src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/typography.gif" alt="typography">
                <img class="img-hover" src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/typography_hover.gif" alt="typography" aria-hidden="true" loading="lazy" fetchpriority="low">
              </div>
              <span class="overview-section-content-list-item-comma" aria-hidden="true">,&nbsp;</span>
            </li>
            <li class="overview-section-content-list-item">
              <div class="img-swap">
                <img class="img-base" src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/logo.gif" alt="logo">
                <img class="img-hover" src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/logo_hover.gif" alt="logo" aria-hidden="true" loading="lazy" fetchpriority="low">
              </div>
            </li>
          </ul>
          <ul class="overview-section-content-list">
            <li class="overview-section-content-list-item">
              <div class="img-swap">
                <img class="img-base" src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/icon.gif" alt="icon">
                <img class="img-hover" src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/icon_hover.gif" alt="icon" aria-hidden="true" loading="lazy" fetchpriority="low">
              </div>
              <span class="overview-section-content-list-item-comma" aria-hidden="true">,&nbsp;</span>
            </li>
            <li class="overview-section-content-list-item">
              <div class="img-swap">
                <img class="img-base" src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/guide.gif" alt="guide">
                <img class="img-hover" src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/guide_hover.gif" alt="guide" aria-hidden="true" loading="lazy" fetchpriority="low">
              </div>
              <span class="overview-section-content-list-item-comma" aria-hidden="true">,&nbsp;</span>
            </li>
            <li class="overview-section-content-list-item">
              <div class="img-swap">
                <img class="img-base" src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/image.gif" alt="image">
                <img class="img-hover" src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/image_hover.gif" alt="image" aria-hidden="true" loading="lazy" fetchpriority="low">
              </div>
              <span class="overview-section-content-list-item-comma" aria-hidden="true">,&nbsp;</span>
            </li>
            <li class="overview-section-content-list-item">
              <div class="img-swap">
                <img class="img-base" src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/interaction.gif" alt="interaction">
                <img class="img-hover" src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/interaction_hover.gif" alt="interaction" aria-hidden="true" loading="lazy" fetchpriority="low">
              </div>
            </li>
          </ul>
          <ul class="overview-section-content-list">
            <li class="overview-section-content-list-item">
              <div class="img-swap">
                <img class="img-base" src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/motion.gif" alt="motion">
                <img class="img-hover" src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/motion_hover.gif" alt="motion" aria-hidden="true" loading="lazy" fetchpriority="low">
              </div>
              <span class="overview-section-content-list-item-comma" aria-hidden="true">,&nbsp;</span>
            </li>
            <li class="overview-section-content-list-item">
              <div class="img-swap">
                <img class="img-base" src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/sound.gif" alt="sound">
                <img class="img-hover" src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/sound_hover.gif" alt="sound" aria-hidden="true" loading="lazy" fetchpriority="low">
              </div>
              <span class="overview-section-content-list-item-comma" aria-hidden="true">,&nbsp;</span>
            </li>
            <li class="overview-section-content-list-item">
              <div class="img-swap">
                <img class="img-base" src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/illustration.gif" alt="illustration">
                <img class="img-hover" src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/illustration_hover.gif" alt="illustration" aria-hidden="true" loading="lazy" fetchpriority="low">
              </div>
            </li>
          </ul>
        </div>
      </div> 
    </section>
    <!-- E : overview-section -->

    <section class="office-section">
      <div class="inner">
        <AppTitle 
          title="CiX Office"
          text="우리는 팀원들의 몰입과 탄탄한 팀워크를 위해서 일하는 환경도 생각합니다."
          headingTag="h2"
        >
        </AppTitle>
        <AppSwiper 
          :effect="'fade'" 
          :autoplay="5000"
          :darkMode="true"  
        >
          <picture>
            <source srcset="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/office_01.jpg" media="(min-width: 768px)" />
            <img src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/office_01_t.jpg" alt="A modern conference room with a long wooden table, hanging light bulbs, and glass walls covered with whiteboard notes and sticky memos." />
          </picture>
          <picture>
            <source srcset="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/office_02.jpg" media="(min-width: 768px)" />
            <img src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/office_02_t.jpg" alt="An open lounge area with grey sofas, wooden cubicle desks, bookshelves, and hanging plants creating a relaxing workspace atmosphere." />
          </picture>
          <picture>
            <source srcset="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/office_03.jpg" media="(min-width: 768px)" />
            <img src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/office_03_t.jpg" alt="A professional photo studio with lighting equipment, tripods, monitors, and a white cyclorama backdrop." />
          </picture>
          <picture>
            <source srcset="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/office_04.jpg" media="(min-width: 768px)" />
            <img src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/office_04_t.jpg" alt="A cozy office lounge with grey couches, wooden floors, circular ceiling lights, and the Concentrix Catalyst logo on the wall." />
          </picture>
          <picture>
            <source srcset="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/office_05.jpg" media="(min-width: 768px)" />
            <img src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/office_05_t.jpg" alt="A bright office kitchen and lounge area with hanging lights, bookshelves, and greenery providing a natural atmosphere." />
          </picture>
        </AppSwiper> 
      </div>
    </section>

    <!-- S : works-section -->
    <section class="works-section">
      <div class="inner">
        <AppTitle 
          class="works-app-title"
          title="CiX Works"
          text="CiX의 사업영역은 UX/BX 컨설팅, 디지털 채널의 구축/운영, <br>디지털마케팅 콘텐츠 제작으로 나누어집니다."
          headingTag="h2"
        >
        </AppTitle>
        <div class="works-section-diagram">
          <picture>
            <source srcset="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/works_diagram.jpg" media="(min-width: 1024px)" />
            <source srcset="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/works_diagram_t.jpg" media="(min-width: 768px)" />
            <img src="/assets/cnx/what-we-do/strategy-and-design/contents-and-design/works_diagram_m.jpg" alt="Business model diagram illustrating various types of business models and their interconnections." />
          </picture>
        </div>
        <div class="works-section-content">
          <div class="works-section-content-item">
            <AppImgCont 
              title="Operation"
              text="다양한 디지털 채널에서의 KPI 달성을 위한 채널운영, 프로모션 기획, 이벤트 제작, 그외 브랜드 활동 등을 적극적이고 선제적으로 지원합니다. <br>또한 채널 내 UX/UI 개선 활동이나 추가 서비스개발을 수행하여 장기적인 관점에서의 채널 고도화를 지원합니다."
              imageName="works01"
              imageAlt="A man and woman sit at a table, focused on a laptop in front of them."
              imagePath="/assets/cnx/what-we-do/strategy-and-design/contents-and-design"
              :reverse="true"
              :subItems="[
                { title: 'Operation', text: 'Brand Website <br>eCommerce Platform <br>App Service <br>Advanced Operational Services <br>Producing Production Content <br>Create/Operate Events, Promotions <br>Digital Contents Monitoring' },
              ]"
            />  
          </div>
          <div class="works-section-content-item">
            <AppImgCont 
              title="UX/UI Design"
              text="데이터 분석 기반의 플랫폼, 서비스, 시스템 개발을 지원합니다. Concentrix 만의 UX/UI Framework과 Process를 통해 안정적으로 프로젝트를 수행합니다. 또한 전략컨설팅, UX컨설팅 프로젝트의 기획, 디자인, 퍼블리싱 업무를 지원합니다."
              imageName="works02"
              imageAlt="A collection of four iPhones, each featuring distinct apps, highlighting diverse mobile applications and user interfaces."
              imagePath="/assets/cnx/what-we-do/strategy-and-design/contents-and-design"
              :subItems="[
                { title: 'UX/UI Design', text: 'Brand Website <br>eCommerce Platform <br>App Service <br>Strategy/UX Consulting' },
              ]"
            />  
          </div>
          <div class="works-section-content-item">
            <AppImgCont 
              title="Digital Contents Creation"
              text="글로벌 플랫폼 내 콘텐츠 제작 및 확산을 수행하며, 대형 온라인 전시 및 포럼 등의 행사기획부터 영상 콘텐츠 제작, 마이크로사이트 구축까지 지원합니다. 또한 소셜미디어 콘텐츠 전략, 기획, 촬영, 제작, 운영 등을 서비스하고 있으며 라이브 커머스, 메타버스와 같은 최신 트렌드를 반영한 서비스의 전략, 기획, 콘텐츠 제작, 촬영 지원 등의 업무를 지원합니다."
              imageName="works03"
              imageAlt="A woman working at a desk, looking at her computer screen, with office supplies arranged around her."
              imagePath="/assets/cnx/what-we-do/strategy-and-design/contents-and-design"
              :reverse="true"
              :subItems="[
                { title: 'Digital Contents Creation', text: 'Global Platform Product Details Page <br>Contents Migration <br>Social Channel Contents <br>Online Exhibition Planning and Production <br>Microsite Development <br>Live Commerce , Metaverse <br>Brand Content Creation' },
              ]"
            />  
          </div>
        </div>
      </div>
    </section>
    <!-- E : works-section -->
  </div>
</template>

<script setup>
import AppTitle from '~/components/cnx/AppTitle.vue';
import AppButton from '~/components/cnx/AppButton.vue';
import AppSwiper from '~/components/cnx/AppSwiper.vue';
import AppImgCont from '~/components/cnx/AppImgCont.vue';
import { nextTick } from 'vue';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode, Pagination, Mousewheel, Autoplay, A11y, Keyboard } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/a11y';

// Import GSAP
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';

// 레이아웃 설정
definePageMeta({
  layout: 'concentrix'
});

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger, Observer);

// intro 섹션 정리용 클린업 콜백 모음
let introCleanupCallbacks = [];

// PC에서 가장 긴 제목 높이를 계산해 모든 제목의 min-height로 적용
const applyBannerSlideTitleMinHeight = () => {
  const titleNodeList = document.querySelectorAll('.banner-slide .banner-slide-item-title');
  if (!titleNodeList || titleNodeList.length === 0) return;

  // 먼저 초기화 (자연 높이 측정용)
  titleNodeList.forEach((el) => {
    (el).style.minHeight = '';
  });

  // 768px 미만(모바일)에서는 고정 높이 제거, 768px 이상부터만 균일 높이 적용
  if (window.innerWidth < 768) return;

  // 현재 레이아웃 기준 최대 높이 측정
  let maxHeight = 0;
  titleNodeList.forEach((el) => {
    const height = (el).offsetHeight || 0;
    if (height > maxHeight) maxHeight = height;
  });

  // 모두 같은 min-height 적용
  titleNodeList.forEach((el) => {
    (el).style.minHeight = `${maxHeight}px`;
  });
};

// 배너 내 이미지들이 모두 로드되기를 대기 (레이아웃 안정화 목적)
const waitForBannerImages = async () => {
  const container = document.querySelector('.banner-slide');
  if (!container) return;
  const images = container.querySelectorAll('img');
  if (!images || images.length === 0) return;

  const waitPromises = Array.from(images).map((img) => {
    if (img.complete) return Promise.resolve();
    return new Promise((resolve) => {
      img.addEventListener('load', resolve, { once: true });
      img.addEventListener('error', resolve, { once: true });
    });
  });
  await Promise.all(waitPromises);
};

// 활성 슬라이드 인덱스 관리
const activeSlideIndex = ref(null);
// 뷰포트 상태(모바일 여부)
const isMobile = ref(false);
// 폭 변화 안정화 감지를 외부에서 호출하기 위한 함수 (onMounted에서 주입)
let startWidthStabilizeWatch = () => {};

// ScrollTrigger refresh 후에 포커스를 복구하기 위한 인덱스 기억 및 포커스 헬퍼
let pendingFocusSlideIndex = null;
const focusButtonByIndex = (index) => {
  try {
    if (window.innerWidth < 768) return; // 데스크톱/태블릿에서만 버튼 표시
    const slides = document.querySelectorAll('.banner-slide .swiper-slide');
    const slideEl = slides && slides[index] ? slides[index] : null;
    if (!slideEl) return;
    const btn = slideEl.querySelector('.banner-slide-item-button');
    if (btn instanceof HTMLElement) {
      try { btn.focus({ preventScroll: true }); } catch (_) { btn.focus(); }
    }
  } catch (_) { /* ignore */ }
};

// 부드러운 중앙 정렬 제어용 상태
let isCentering = false;
let centeringTween = null;
let pendingCenterIndex = null;
let isRebuildCenteringActive = false; // 클릭→폭변화→재빌드 동안 포커스 정렬 억제

// 요청된 슬라이드를 컨테이너 중앙에 부드럽게 정렬
const requestCenterSlide = (index) => {
  if (typeof index !== 'number') return;
  pendingCenterIndex = index;
  if (isCentering) return; // 진행 중이면 완료 후 처리

  const run = (idx) => {
    try {
      if (window.innerWidth < 768) return;
      const container = document.querySelector('.banner-slide');
      const wrapper = document.querySelector('.banner-slide .swiper-wrapper');
      if (!container || !wrapper) return;
      const slides = wrapper.querySelectorAll(':scope > .swiper-slide');
      const target = slides && slides[idx] ? slides[idx] : null;
      if (!target) return;

      const containerWidth = (container).offsetWidth;
      const wrapperWidth = (wrapper).scrollWidth;
      if (!containerWidth || !wrapperWidth || wrapperWidth <= containerWidth) return;

      const slideLeft = (target).offsetLeft;
      const slideWidth = (target).offsetWidth;
      const targetCenter = slideLeft + slideWidth / 2;
      const containerCenter = containerWidth / 2;
      let desiredX = -(targetCenter - containerCenter);
      const minX = -(wrapperWidth - containerWidth);
      const maxX = 0;
      if (desiredX < minX) desiredX = minX;
      if (desiredX > maxX) desiredX = maxX;

      const totalShift = wrapperWidth - containerWidth;
      const progress = Math.min(1, Math.max(0, -desiredX / totalShift));

      // 현재 배너의 ScrollTrigger 찾기
      const st = ScrollTrigger.getAll().find((t) => {
        try { return t && t.vars && t.vars.trigger === container; } catch (_) { return false; }
      });

      // 진행 중 트윈이 있으면 취소
      try { if (centeringTween) centeringTween.kill(); } catch (_) { /* ignore */ }

      if (st && Number.isFinite(st.start) && Number.isFinite(st.end)) {
        const current = st.scroll();
        const targetScroll = st.start + progress * (st.end - st.start);
        const proxy = { s: current };
        isCentering = true;
        centeringTween = gsap.to(proxy, {
          s: targetScroll,
          duration: 0.55,
          ease: 'power3.inOut',
          onUpdate: () => { try { st.scroll(proxy.s); } catch (_) { /* ignore */ } },
          onComplete: () => {
            isCentering = false;
            centeringTween = null;
            const next = pendingCenterIndex;
            pendingCenterIndex = null;
            if (typeof next === 'number' && next !== idx) {
              // 연속 요청이 있었다면 한 번 더 최신 대상으로 정렬
              requestCenterSlide(next);
            }
          }
        });
      } else {
        // fallback: 직접 transform 보간
        isCentering = true;
        centeringTween = gsap.to(wrapper, {
          x: desiredX,
          duration: 0.5,
          ease: 'power3.inOut',
          onComplete: () => {
            isCentering = false;
            centeringTween = null;
            const next = pendingCenterIndex;
            pendingCenterIndex = null;
            if (typeof next === 'number' && next !== idx) {
              requestCenterSlide(next);
            }
          }
        });
      }
    } catch (_) { /* ignore */ }
  };

  // DOM 안정화 후 한 프레임 뒤 실행 (중간 반동 방지)
  requestAnimationFrame(() => run(index));
};

// 슬라이드용 대체 텍스트 생성 (title의 HTML 태그 제거)
const getSlideAltText = (slide) => {
  try {
    const tmp = document.createElement('div');
    tmp.innerHTML = String(slide?.title ?? '');
    const text = tmp.textContent || tmp.innerText || '';
    return text.replace(/\s+/g, ' ').trim();
  } catch (_) {
    return typeof slide?.title === 'string' ? slide.title.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() : '';
  }
};

// 슬라이드 토글 함수
const toggleSlide = (index) => {
  const wasActive = activeSlideIndex.value === index;
  if (wasActive) {
    // 같은 슬라이드를 클릭하면 비활성화
    activeSlideIndex.value = null;
  } else {
    // 다른 슬라이드를 클릭하면 활성화
    activeSlideIndex.value = index;
  }
  const activatedNow = !wasActive;

  // 폭 변화가 반영된 뒤 스크롤 타임라인 재계산
  nextTick(() => {
    if (window.innerWidth >= 768) {
      // 실제 길이 변경이 안정화될 때까지 감시 후, 한 번만 초기화/refresh
      // refresh 완료 후 클릭했던 버튼으로 포커스 복구
      pendingFocusSlideIndex = index;
      // 중앙 정렬은 폭 안정화 이후에 1회만 수행 (중복 이동 방지)
      startWidthStabilizeWatch();
      if (activatedNow) {
        // 활성화된 슬라이드가 가운데로 오도록 중앙정렬 요청을 미리 큐잉
        pendingCenterIndex = index;
        // 잠재적인 폭 변화가 시작되도록 약간의 여유를 둔 뒤, 재빌드 중이 아니면 바로 정렬
        setTimeout(() => {
          if (!isRebuildCenteringActive) {
            requestCenterSlide(index);
          }
        }, 200);
      }
    }
  });
};

// 모바일에서 제목 컨테이너를 버튼처럼 활성화
const onTitleActivate = (index) => {
  if (!isMobile.value) return;
  toggleSlide(index);
};

// 배너 수평 스크롤 애니메이션 초기화
const initBannerScrollAnimation = () => {
  const swiperWrapper = document.querySelector('.banner-slide .swiper-wrapper');
  const container = document.querySelector('.banner-slide');

  let bannerScroll = null;
  let resizeTimeout = null;
  let onLoadHandler = null;
  let onPageShowHandler = null;
  let onStRefreshHandler = null;
  let widthWatchRaf = null;
  let widthStableTimer = null;
  let lastWrapperWidth = (swiperWrapper) ? swiperWrapper.scrollWidth : 0;
  let deferNextRefresh = false; // 다음 init 시점의 refresh를 지연 실행하기 위한 플래그
  let horizontalObserver = null;
  let isRebuilding = false; // 재초기화 중복 가드

  const getWrapperWidth = () => {
    // scrollWidth는 자식들의 width 변화(토글 등)를 포함해 최신 전체 길이를 반환
    return swiperWrapper ? swiperWrapper.scrollWidth : 0;
  };

  // sticky header 높이를 고려해 ScrollTrigger 시작 지점을 보정
  const getHeaderOffset = () => {
    const header = document.querySelector('.the-header');
    if (!header) return 0;
    try {
      return Math.round(header.getBoundingClientRect().height) || 0;
    } catch (_) {
      // fallback
      return (header).offsetHeight || 0;
    }
  };

  const killScrollAnimation = () => {
    // 좌우 제스처 옵저버 해제
    if (horizontalObserver) {
      try { horizontalObserver.kill(); } catch (e) { /* ignore */ }
      horizontalObserver = null;
    }
    // 현재 진행도 저장 (재초기화 후 복원용)
    const savedProgress = bannerScroll && bannerScroll.scrollTrigger
      ? bannerScroll.scrollTrigger.progress
      : null;

    // 1) timeline 및 연결된 ScrollTrigger 안전하게 제거
    if (bannerScroll) {
      if (bannerScroll.scrollTrigger) {
        try { bannerScroll.scrollTrigger.kill(); } catch (e) { /* ignore */ }
      }
      try { bannerScroll.kill(); } catch (e) { /* ignore */ }
      bannerScroll = null;
    }

    // 2) 남아있는 pin-spacer(해당 .banner-slide 를 감싼 것들) 정리 (안전하게 언랩)
    document.querySelectorAll('.pin-spacer').forEach(sp => {
      // pin-spacer가 우리 컨테이너를 포함하면 언랩(원래 DOM으로 복원)
      if (sp.contains(container)) {
        const parent = sp.parentNode;
        // spacer 내부의 자식(보통 원래 트리거 엘리먼트)을 spacer 위치로 옮김
        while (sp.firstChild) parent.insertBefore(sp.firstChild, sp);
        parent.removeChild(sp);
      }
    });

    return savedProgress;
  };

  const initScrollAnimation = () => {
    if (!swiperWrapper || !container) return;
    if (isRebuilding) return;
    isRebuilding = true;

    // kill 이전의 현재 translateX 값을 보관하여 delta 만큼만 부드럽게 이동
    const getCurrentTranslateX = (el) => {
      try {
        const style = window.getComputedStyle(el);
        const transform = style.transform || style.webkitTransform;
        if (!transform || transform === 'none') return 0;
        if (transform.startsWith('matrix3d(')) {
          const values = transform.slice(9, -1).split(',').map(parseFloat);
          return values[12] || 0;
        }
        if (transform.startsWith('matrix(')) {
          const values = transform.slice(7, -1).split(',').map(parseFloat);
          return values[4] || 0;
        }
      } catch (_) { /* ignore */ }
      return 0;
    };

    const prevTranslateX = getCurrentTranslateX(swiperWrapper);
    // 기존 것이 있으면 제거하고 진행도 저장
    const prevProgress = killScrollAnimation();

    const containerWidth = (container).offsetWidth;
    const wrapperWidth = getWrapperWidth();

    // wrapper가 컨테이너보다 같거나 작으면 애니메이션 불필요
    if (wrapperWidth <= containerWidth) {
      ScrollTrigger.refresh();
      isRebuilding = false;
      return;
    }

    // 새 타임라인 생성
    bannerScroll = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        // sticky header 높이만큼 시작 지점을 아래로 내림
        start: () => `top-=${getHeaderOffset()} top`,
        end: '+=200%',   // 기존과 동일하게 유지(원하시면 계산식으로 변경 가능)
        scrub: 1,
        pin: true,
        anticipatePin: 1, // pin 관련 layout jump 줄여줌
        invalidateOnRefresh: true,
        refreshPriority: 100
      }
    });

    bannerScroll.to(swiperWrapper, {
      x: `-${wrapperWidth - containerWidth}px`,
      ease: 'none'
    });

    // 좌우 제스처로 수평 이동도 지원 (데스크톱/태블릿 전용)
    // horizontalObserver가 존재하면 먼저 정리
    if (horizontalObserver) {
      try { horizontalObserver.kill(); } catch (_) { /* ignore */ }
      horizontalObserver = null;
    }

    const st = bannerScroll.scrollTrigger;

    if (st) {
      horizontalObserver = Observer.create({
        target: container,
        type: 'touch,wheel,pointer',
        lockAxis: true,
        dragMinimum: 5,
        tolerance: 8,
        preventDefault: false,
        onChangeX(self) {
          // 터치/드래그 좌우 이동을 스크롤로 변환
          try {
            const factor = 0.5; // 터치 스크럽 강도 (자연 스크롤과 동일하게)
            // 진행 방향 반전: deltaX 부호 반전 적용
            st.scroll(st.scroll() - self.deltaX * factor);
          } catch (_) { /* ignore */ }
        },
        onWheel(self) {
          // 수평 휠(또는 트랙패드 수평 제스처) 우선 처리
          if (!st) return;
          if (Math.abs(self.deltaX) > Math.abs(self.deltaY)) {
            try {
              const wheelFactor = 1; // 휠 스크럽 강도 (자연 스크롤과 동일하게)
              // 진행 방향 반전: deltaX 부호 반전 적용
              st.scroll(st.scroll() - self.deltaX * wheelFactor);
            } catch (_) { /* ignore */ }
          }
        }
      });
    }

    // 새 세팅 반영 후 동일 진행도로 스크롤 위치 복원
    if (!deferNextRefresh) {
      ScrollTrigger.refresh();
    } else {
      // 요청된 경우 한 번만 건너뛰고 이후 자동 복귀
      deferNextRefresh = false;
    }
    if (typeof prevProgress === 'number') {
      // 목표 위치 계산 (progress 비례)
      const targetX = -((wrapperWidth - containerWidth) * prevProgress);
      try {
        // 이전 위치에서 시작하도록 강제 설정 후 리플로우 → transition 적용
        if (Number.isFinite(prevTranslateX)) {
          (swiperWrapper).style.transform = `translate3d(${prevTranslateX}px, 0px, 0px)`;
          // 리플로우 강제
          (swiperWrapper).getBoundingClientRect();
          (swiperWrapper).style.transition = 'transform 0.45s ease';
        }
      } catch (_) { /* ignore */ }

      requestAnimationFrame(() => {
        const st = bannerScroll.scrollTrigger;
        // 애니메이션/포지션을 동일 진행도로 맞춤 (스크롤 강제 이동은 생략하여 튐 현상 방지)
        bannerScroll.progress(prevProgress, false); // 이 시점에 wrapper transform → targetX
        st && st.update();
        // transition 종료 후 정리
        const clearTransition = () => {
          try { (swiperWrapper).style.transition = ''; } catch (_) { /* ignore */ }
          isRebuilding = false;
        };
        (swiperWrapper).addEventListener('transitionend', clearTransition, { once: true });
        setTimeout(clearTransition, 600);
      });
    } else {
      // 복원할 진행도가 없으면 즉시 플래그 해제
      isRebuilding = false;
    }
  };

  // 폭 변화 안정화 감시(transition 동안 scrollWidth 변동을 추적, 일정 시간 변동이 없을 때 초기화/refresh 실행)
  const stopWidthStabilizeWatch = () => {
    if (widthWatchRaf) cancelAnimationFrame(widthWatchRaf);
    widthWatchRaf = null;
    if (widthStableTimer) clearTimeout(widthStableTimer);
    widthStableTimer = null;
  };

  // 폭 안정화 후 재빌드하고, 대상 슬라이드를 중앙으로 부드럽게 이동한 다음 마지막에 refresh
  const rebuildAndSmoothCenter = () => {
    try {
      deferNextRefresh = true; // init에서 즉시 refresh 하지 않도록
      isRebuildCenteringActive = true;
      initScrollAnimation();
      const st = (bannerScroll && bannerScroll.scrollTrigger) ? bannerScroll.scrollTrigger : null;
      if (!st) { ScrollTrigger.refresh(); return; }

      // pendingFocusSlideIndex가 우선, 없으면 현재 인덱스 사용 시도
      const idx = (typeof pendingFocusSlideIndex === 'number')
        ? pendingFocusSlideIndex
        : (typeof currentSlideIndex?.value === 'number' ? currentSlideIndex.value : null);
      if (idx == null) { ScrollTrigger.refresh(); return; }

      const wrapper = document.querySelector('.banner-slide .swiper-wrapper');
      const container = document.querySelector('.banner-slide');
      if (!wrapper || !container) { ScrollTrigger.refresh(); return; }
      const slides = wrapper.querySelectorAll(':scope > .swiper-slide');
      const target = slides && slides[idx] ? slides[idx] : null;
      if (!target) { ScrollTrigger.refresh(); return; }

      const containerWidth = (container).offsetWidth;
      const wrapperWidth = (wrapper).scrollWidth;
      if (!(containerWidth && wrapperWidth) || wrapperWidth <= containerWidth) { ScrollTrigger.refresh(); return; }

      const slideLeft = (target).offsetLeft;
      const slideWidth = (target).offsetWidth;
      const targetCenter = slideLeft + slideWidth / 2;
      const containerCenter = containerWidth / 2;
      let desiredX = -(targetCenter - containerCenter);
      const minX = -(wrapperWidth - containerWidth);
      const maxX = 0;
      if (desiredX < minX) desiredX = minX;
      if (desiredX > maxX) desiredX = maxX;
      const totalShift = wrapperWidth - containerWidth;
      const progress = Math.min(1, Math.max(0, -desiredX / totalShift));
      const newScroll = (typeof st.start === 'number' && typeof st.end === 'number')
        ? st.start + progress * (st.end - st.start)
        : null;
      if (!Number.isFinite(newScroll)) { ScrollTrigger.refresh(); return; }

      const proxy = { s: st.scroll() };
      gsap.to(proxy, {
        s: newScroll,
        duration: 0.65,
        ease: 'power3.out',
        onUpdate: () => { try { st.scroll(proxy.s); } catch (_) { /* ignore */ } },
        onComplete: () => {
          try { ScrollTrigger.refresh(); } catch (_) { /* ignore */ }
          // 포커스 복구도 마지막에 보장
          if (typeof pendingFocusSlideIndex === 'number') {
            try { focusButtonByIndex(pendingFocusSlideIndex); } catch (_) { /* ignore */ }
            pendingFocusSlideIndex = null;
          }
          // 재빌드 중 보류된 중앙정렬 요청이 있으면 마지막에 한 번만 실행
          if (typeof pendingCenterIndex === 'number') {
            const idx2 = pendingCenterIndex; pendingCenterIndex = null;
            requestCenterSlide(idx2);
          }
          isRebuildCenteringActive = false;
        }
      });
    } catch (_) {
      try { ScrollTrigger.refresh(); } catch (_) { /* ignore */ }
      isRebuildCenteringActive = false;
    }
  };

  startWidthStabilizeWatch = () => {
    if (!swiperWrapper) return;
    stopWidthStabilizeWatch();
    const startWidth = lastWrapperWidth;

    const scheduleStableCheck = () => {
      if (widthStableTimer) clearTimeout(widthStableTimer);
      // 폭 변동이 280ms 동안 없으면 안정화로 간주
      widthStableTimer = setTimeout(() => {
        stopWidthStabilizeWatch();
        // 안정화 시점에 재빌드 후 부드럽게 중앙 이동 → 마지막에 refresh
        rebuildAndSmoothCenter();
      }, 280);
    };

    const tick = () => {
      const current = getWrapperWidth();
      if (current !== lastWrapperWidth) {
        lastWrapperWidth = current;
        scheduleStableCheck();
      }
      widthWatchRaf = requestAnimationFrame(tick);
    };
    // 시작 시점에서도 안정화 타이머를 한 번 걸어둠 (사소한 변동에도 반응)
    scheduleStableCheck();
    tick();
  };

  // 디바운스된 리사이즈 핸들러
  const onResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (isRebuilding) return; // 재초기화 중에는 리사이즈 처리 생략
      // 모바일 플래그 업데이트
      isMobile.value = window.innerWidth < 768;
      if (window.innerWidth >= 768) {
        // init 내부에서 refresh를 수행하므로 여기서 중복 호출하지 않음
        initScrollAnimation();
      } else {
        // 모바일로 내려가면 반드시 제거 후 한 번만 refresh
        killScrollAnimation();
        ScrollTrigger.refresh();
      }
      // 제목 높이 동기화 (PC 전용, 모바일/태블릿에서는 초기화됨)
      applyBannerSlideTitleMinHeight();
    }, 150); // 150ms 디바운스 — 필요시 조절
  };

  // 초기 실행 (desktop 조건)
  const initialSetup = async () => {
    // DOM, 이미지 등 렌더 안정화 후 초기화
    await nextTick();
    await waitForBannerImages();
    // 초기 모바일 플래그 설정
    isMobile.value = window.innerWidth < 768;
    if (window.innerWidth >= 768) {
      initScrollAnimation();
    }
    applyBannerSlideTitleMinHeight();
    ScrollTrigger.refresh();
  };

  initialSetup();

  // 이벤트 등록
  window.addEventListener('resize', onResize);

  // load/pageshow 시점에도 재초기화 (새로고침/뒤로가기 BFCache 대응)
  onLoadHandler = () => initialSetup();
  window.addEventListener('load', onLoadHandler);
  onPageShowHandler = () => {
    // BFCache 복원 포함하여 레이아웃/스크롤 상태 재계산
    initialSetup();
  };
  window.addEventListener('pageshow', onPageShowHandler);

  // ScrollTrigger 전역 refresh 이벤트에서, 대기 중인 포커스를 복구
  onStRefreshHandler = () => {
    if (typeof pendingFocusSlideIndex === 'number') {
      const idx = pendingFocusSlideIndex;
      // DOM/레이아웃 안정화를 위해 두 번의 rAF 후 포커스 적용
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          focusButtonByIndex(idx);
        });
      });
      pendingFocusSlideIndex = null;
    }
    if (typeof pendingCenterIndex === 'number') {
      const cidx = pendingCenterIndex;
      pendingCenterIndex = null;
      // refresh 직후 레이아웃 안정화를 위해 지연을 더 준 뒤에 중앙 정렬
      // 2×rAF + 120ms setTimeout으로 완충
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTimeout(() => requestCenterSlide(cidx), 120);
        });
      });
    }
  };
  try { ScrollTrigger.addEventListener('refresh', onStRefreshHandler); } catch (_) { /* ignore */ }

  // 초기 1회 적용 (레이아웃 안정화 후 적용)
  requestAnimationFrame(() => applyBannerSlideTitleMinHeight());

  // cleanup 등록
  introCleanupCallbacks.push(() => {
    window.removeEventListener('resize', onResize);
    if (onLoadHandler) window.removeEventListener('load', onLoadHandler);
    if (onPageShowHandler) window.removeEventListener('pageshow', onPageShowHandler);
    if (onStRefreshHandler) {
      try { ScrollTrigger.removeEventListener('refresh', onStRefreshHandler); } catch (_) { /* ignore */ }
    }
    stopWidthStabilizeWatch();
    killScrollAnimation();
    ScrollTrigger.refresh();
  });
};

// Intro CiX 이미지: 클래스 토글 방식으로 fade-in-up 처리 초기화
const initIntroCixClassToggle = () => {
  const wraps = document.querySelectorAll('.intro-section .intro-section-content-item-wrap');
  if (!wraps || wraps.length === 0) return;

  try {
    wraps.forEach((wrap) => {
      const img = wrap.querySelector('img');
      if (!(img instanceof HTMLElement)) return;
      const st = ScrollTrigger.create({
        trigger: wrap,
        start: 'top 90%',
        end: 'bottom 10%',
        toggleClass: { targets: wrap, className: 'active' },
        invalidateOnRefresh: true,
        refreshPriority: 10
      });
      // cleanup 등록
      introCleanupCallbacks.push(() => { try { st.kill(); } catch (_) { /* ignore */ } });
    });
  } catch (_) {
    // noop
  }
};

// Intro section line height scroll linkage 초기화 (delta-based)
const initIntroLineHeightLinkage = () => {
  const contentEl = document.querySelector('.intro-section .intro-section-content');
  const lineEl = contentEl ? contentEl.querySelector('.intro-section-content-line') : null;
  if (!contentEl || !lineEl) return;

  const MIN_HEIGHT = 20;
  let heightPx = MIN_HEIGHT;
  let lastScrollY = window.pageYOffset || window.scrollY || 0;

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  // intro content의 기준 좌표계에서 overview .inner 상단까지의 최대 하한 지점 계산
  const getMaxBottomWithin = () => {
    try {
      const overviewInner = document.querySelector('.overview-section .inner');
      if (!overviewInner) return (contentEl).clientHeight;
      const contentRect = (contentEl).getBoundingClientRect();
      const overviewRect = (overviewInner).getBoundingClientRect();
      // 두 요소 모두 viewport 기준 좌표이므로 차이를 내면 contentEl 기준 상대 좌표가 됨
      const distance = overviewRect.top - contentRect.top;
      // 음수 방지 및 최소값 보장
      return Math.max(MIN_HEIGHT, distance);
    } catch (_) {
      return (contentEl).clientHeight;
    }
  };

  const computeBottomWithin = () => {
    const rect = (contentEl).getBoundingClientRect();
    const anchorVp = window.innerHeight - 80; // 80px above viewport bottom
    return anchorVp - rect.top; // bottom position within container coords
  };

  const apply = () => {
    const maxBottom = getMaxBottomWithin();
    const bottomWithin = computeBottomWithin();
    const clampedBottom = clamp(bottomWithin, MIN_HEIGHT, maxBottom);
    // ensure height does not exceed available
    heightPx = clamp(heightPx, MIN_HEIGHT, clampedBottom);
    const topPx = clampedBottom - heightPx;
    try { gsap.set(lineEl, { top: topPx, height: heightPx }); } catch (_) { /* noop */ }
    // 뷰포트 하단(y = window.innerHeight)이 overview-section 상단에 도달하면 클래스 부착
    try {
      const overviewSection = document.querySelector('.overview-section');
      if (overviewSection) {
        const r = (overviewSection).getBoundingClientRect();
        const bottomY = window.innerHeight;
        const visibleFromBottom = r.top <= bottomY; // viewport 하단이 섹션 상단을 지나면 true
        (lineEl).classList.toggle('on-overview', visibleFromBottom);
      } else {
        (lineEl).classList.remove('on-overview');
      }
    } catch (_) { /* noop */ }
  };

  const onScroll = () => {
    const y = window.pageYOffset || window.scrollY || 0;
    const delta = y - lastScrollY;
    const maxBottom = getMaxBottomWithin();
    const bottomWithin = computeBottomWithin();

    if (bottomWithin <= MIN_HEIGHT) {
      heightPx = MIN_HEIGHT;
    } else if (bottomWithin >= maxBottom) {
      heightPx = maxBottom; // fully grown until overview .inner top
    } else if (delta !== 0) {
      heightPx += delta; // grow/shrink by scroll delta
    }

    apply();
    lastScrollY = y;
  };

  const onResize = () => {
    apply();
    onScroll();
  };

  // init
  try { gsap.set(lineEl, { height: heightPx, top: 0 }); } catch (_) { /* noop */ }
  apply();
  onScroll();

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);

  // cleanup 등록
  introCleanupCallbacks.push(() => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
  });
};

// Intro CiX 이미지: 데스크톱에서 마우스 방향으로 기울기(tilt) 모션
const initIntroHoverTilt = () => {
  const wraps = document.querySelectorAll('.intro-section .intro-section-content-item-wrap');
  if (!wraps || wraps.length === 0) return;

  const isDesktop = () => window.innerWidth >= 1024;
  const listeners = [];
  const spinningSet = new WeakSet(); // 클릭 회전 중인 이미지 가드

  const addForWrap = (wrap) => {
    const img = wrap.querySelector('img');
    if (!(img instanceof HTMLElement)) return;

    const maxTilt = 30; // degrees

    const onMove = (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const nx = x / rect.width * 2 - 1; // -1 .. 1 (left .. right)
      const ny = y / rect.height * 2 - 1; // -1 .. 1 (top .. bottom)
      const rotateY = nx * maxTilt;
      const rotateX = -ny * maxTilt;
      try {
        gsap.to(img, { rotateX, rotateY, z: 28, scale: 1.08, duration: 0.12, ease: 'power2.out' });
      } catch (_) { /* noop */ }
    };

    const onLeave = () => {
      try {
        gsap.to(img, { rotateX: 0, rotateY: 0, z: 0, scale: 1, duration: 0.35, ease: 'power3.out' });
      } catch (_) { /* noop */ }
    };

    const onClick = () => {
      if (spinningSet.has(img)) return; // 이미 회전 중이면 무시
      spinningSet.add(img);
      try {
        gsap.to(img, {
          rotation: '+=360',
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => {
            try { spinningSet.delete(img); } catch (_) { /* ignore */ }
          }
        });
      } catch (_) { /* noop */ }
    };

    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('mouseleave', onLeave);
    wrap.addEventListener('click', onClick);
    listeners.push({ wrap, onMove, onLeave, onClick });
  };

  const enable = () => {
    if (!isDesktop()) return;
    if (listeners.length) return; // already enabled
    wraps.forEach((w) => addForWrap(w));
  };

  const disable = () => {
    // remove all and reset
    listeners.splice(0).forEach(({ wrap, onMove, onLeave, onClick }) => {
      wrap.removeEventListener('mousemove', onMove);
      wrap.removeEventListener('mouseleave', onLeave);
      wrap.removeEventListener('click', onClick);
    });
    // reset transforms of all images
    wraps.forEach((w) => {
      const img = w.querySelector('img');
      if (img instanceof HTMLElement) {
        try { gsap.set(img, { rotateX: 0, rotateY: 0, rotation: 0, z: 0, scale: 1 }); } catch (_) { /* noop */ }
        try { spinningSet.delete(img); } catch (_) { /* ignore */ }
      }
    });
  };

  // 초기 상태 적용
  enable();

  const onResize = () => {
    if (isDesktop()) {
      enable();
    } else {
      disable();
    }
  };
  window.addEventListener('resize', onResize);

  // cleanup 등록
  introCleanupCallbacks.push(() => {
    window.removeEventListener('resize', onResize);
    disable();
  });
};

// onMounted에서 intro 관련 초기화 함수 호출 및 일괄 cleanup 처리
onMounted(() => {
  initBannerScrollAnimation();
  initIntroCixClassToggle();
  initIntroLineHeightLinkage();
  initIntroHoverTilt();

  onBeforeUnmount(() => {
    introCleanupCallbacks.forEach((fn) => {
      try { fn(); } catch (_) { /* ignore */ }
    });
    introCleanupCallbacks = [];
  });
});

// Swiper 모듈 설정
const modules = [FreeMode, Pagination, Mousewheel, Autoplay, A11y, Keyboard];

// Swiper 접근성/키보드 옵션
const a11yOptions = {
  enabled: true,
  containerMessage: '프로젝트 배너 캐러셀',
  // Swiper는 문자열 템플릿을 사용합니다. {{index}}, {{slidesLength}} 사용
  slideLabelMessage: '슬라이드 {{index}} / {{slidesLength}}',
};

const keyboardOptions = {
  enabled: true,
  onlyInViewport: true,
};

const paginationOptions = {
  el: '.banner-slide-controller-pagination',
  clickable: true,
  renderBullet: (index, className) => {
    // 버튼으로 렌더링하여 포커스 가능 + 레이블 제공
    const label = `슬라이드 ${index + 1}로 이동`;
    return `<button type="button" class="${className}" aria-label="${label}" title="${label}"></button>`;
  }
};

// Swiper 인스턴스 제어 및 자동재생 상태
const swiperInstance = ref(null);
const isAutoplayRunning = ref(true);
const currentSlideIndex = ref(0);

const onSwiperInit = (swiper) => {
  swiperInstance.value = swiper;
  try {
    isAutoplayRunning.value = !!(swiper && swiper.autoplay && swiper.autoplay.running);
  } catch (_) {
    isAutoplayRunning.value = false;
  }
  try {
    currentSlideIndex.value = typeof swiper?.realIndex === 'number' ? swiper.realIndex : (swiper?.activeIndex ?? 0);
    swiper?.on?.('slideChange', () => {
      try {
        currentSlideIndex.value = typeof swiper?.realIndex === 'number' ? swiper.realIndex : (swiper?.activeIndex ?? 0);
      } catch (_) { /* ignore */ }
    });
  } catch (_) { /* ignore */ }
};

const toggleAutoplay = () => {
  const s = swiperInstance.value;
  if (!s || !s.autoplay) return;
  try {
    if (isAutoplayRunning.value) {
      s.autoplay.stop();
      isAutoplayRunning.value = false;
    } else {
      s.autoplay.start();
      isAutoplayRunning.value = true;
    }
  } catch (_) {
    // ignore
  }
};

// 슬라이드 변경 이벤트 핸들러 (템플릿 바인딩용)
const onSlideChange = (swiper) => {
  try {
    currentSlideIndex.value = typeof swiper?.realIndex === 'number' ? swiper.realIndex : (swiper?.activeIndex ?? 0);
  } catch (_) { /* ignore */ }
};

// 탭 포커스로 버튼에 초점이 이동했을 때 해당 슬라이드가 보이도록 스크롤 X 조정
const onBannerButtonFocus = (index) => {
  // 재빌드-중앙정렬 플로우 중에는 포커스 정렬을 억제하여 왕복 이동 방지
  if (isRebuildCenteringActive) {
    // 재빌드 완료 후 수행될 수 있도록 보류
    pendingCenterIndex = index;
    return;
  }
  // 포커스 시 중앙 정렬 요청 (중복 호출은 내부에서 흡수)
  requestCenterSlide(index);
};

// 현재 슬라이드의 paginationColor가 black인지 여부
const isPaginationBlack = computed(() => {
  try {
    const idx = typeof currentSlideIndex.value === 'number' ? currentSlideIndex.value : 0;
    return slideData.value?.[idx]?.paginationColor === 'black';
  } catch (_) {
    return false;
  }
});

// 이미지 경로 생성 함수
const getImageSrc = (index) => {
  const paddedIndex = index < 10 ? `0${index}` : `${index}`;
  return `/assets/cnx/what-we-do/strategy-and-design/contents-and-design/banner_inner${paddedIndex}.jpg`;
};

// 슬라이드 데이터
const slideData = ref([
  {
    title: "Hankook Tire <br>Motorsports <br>Website",
    subtitle: "한국 타이어 모터스포츠 공식 웹사이트 신규 구축",
    description: "글로벌 Top Tier 타이어 기술력과 Formula E 및다수의 글로벌 모터스포츠 대회에 타이어 공급, 참가팀 후원에 대한 정보를 제공하고자 글로벌 웹사이트 신규 구축 및 확산 업무 수행",
    launch: "Septtember 28, 2022",
    client: "Hankook Tire & Technology",
    borderColor: 'white',
  },
  {
    title: "Amorepacific HK <br>Sulwhasoo <br>D2C mall <br>Development",
    subtitle: "아모레퍼시픽 <br>설화수 홍콩 D2C mall 구축",
    description: "사용자 친화적인 모바일 UX/UI 구현,<br>쇼핑 패턴을 반영한 BX & CX 최적화,<br>고객 경험 기반의 SEO 프로세스 수행,<br>본사 주도의 직영몰 표준 테마 제작",
    launch: "July 27, 2022",
    client: "Amorepacific",
    borderColor: 'white'
  },
  {
    title: "LG U+ <br>Integrated <br>Corporate Website <br>Development",
    subtitle: "LG 유플러스 전사 통합 <br>홈페이지 구축",
    description: "고객의 방문 목적을 쉽고 빠르게 달성(Simple)하고, 고객 여정을 막힘 없이 지속(Seamless)시키며, 고객 데이터 기반의 최적화된 정보 제공(개인화 마케팅)을 목표로 통합 홈페이지 기획, 디자인 수행",
    launch: "May, 2022",
    client: "LG UPLUS",
    borderColor: 'white'
  },
  {
    title: "Amorepacific <br>Brands Websites <br>Operation",
    subtitle: "아모레퍼시픽 브랜드 <br>웹사이트 통합운영",
    description: "- 글로벌 브랜드 표준을 준수한 콘텐츠 운영 <br> - 브랜드사이트 기본 퍼포먼스 지표 분석 <br> - 디지털 채널 성과 진단 및 분석 <br> - SEO 컨설팅과 진단 및 분석",
    launch: "March, 2022",
    client: "Amorepacific",
    borderColor: 'white'
  },
  {
    title: "LG Display <br>CES 2022 <br>Online Exhibition",
    subtitle: "당신의 Multi Universe를 위한 <br>디스플레이 솔루션",
    description: "'Display Your Universe'를 테마로<br>CES 2022 온라인 전시<br>영상제작 및 마이크로사이트 구축, 운영",
    launch: "January, 2022",
    client: "LG Display",
    textColor: 'black',
    borderColor: 'black'
  },
  {
    title: "Hankook Tire <br>Brand Website <br>Operation",
    subtitle: "한국타이어앤테크놀로지 <br>브랜드 글로벌닷컴 통합 운영",
    description: "한국타이어 글로벌닷컴 통합 운영 <br>라우펜 글로벌닷컴 통합 운영<br>서비스범위 : PMO, 기획, UX/UI, GA, SEO, 로컬커뮤니케이션",
    launch: "January, 2019",
    client: "Hankook Tire & Technology",
    borderColor: 'white'
  },
  {
    title: "LG Electronics <br>H&A Social <br>Contents Creation",
    subtitle: "LG전자 H&A <br>소셜 콘텐츠 제작",
    description: "LG전자 H&A 소셜 서브 계정 Life is Good <br>Kitchen 채널전략수립, 채널 오픈, 정기 콘텐츠 제작<br>및 운영 수행",
    launch: "June, 2021 ~",
    client: "LG Electronics",
    link: "https://www.instagram.com/lifeisgood_kitchen/",
    borderColor: 'black'
  },
  {
    title: "LG Electronics <br>H&A Contents <br>Creation",
    subtitle: "LG전자 H&A <br>제품 상세페이지 연간 제작",
    description: "LG전자 H&A 제품상세페이지 제작, 글로벌 확산 수행 <br>- 키친 : 냉장고, 식세기, 오븐, 전자레인지, 정수기 <br>- 리빙 : 세탁기, 건조기, 스타일러, 청소기 <br>- 에어솔루션 : 에어컨, 공청기, 공청기 마스크",
    launch: "2019~2021",
    client: "LG Electronics",
    textColor: 'black',
    activeColor: 'white',
    borderColor: 'white',
    paginationColor: 'black'
  },
  {
    title: "Counselor <br>App Service <br>Development",
    subtitle: "카운셀러 앱서비스 구축",
    description: "쉽고 다양한 미용&건강, 뷰티포인트 정보와 <br>아모레퍼시픽 공식 카운셀러의 서비스를 이용 가능한 <br>무료 뷰티앱 구축 수행",
    launch: "June, 2020",
    client: "Amorepacific",
    borderColor: 'white'
  },
  {
    title: "Amorepacific <br>Innisfree Web/App<br>Renewal",
    subtitle: "이니스프리 이커머스웹사이트/앱 <br>리뉴얼 구축 프로젝트",
    description: "이니스프리 이커머스 웹사이트 및 앱 리뉴얼 구축 <br>프로젝트 수행",
    launch: "June, 2020",
    client: "Amorepacific Innisfree",
    borderColor: 'white'
  },
  {
    title: "Beauty Point <br>Survey System <br>Development",
    subtitle: "뷰티포인트앱 서베이시스템 구축",
    description: "뷰티포인트앱 내 회원 로그인/뷰티프로필 정보를 <br>기반으로 제공되는 무한 뷰티 설문서비스 개발",
    launch: "June, 2019",
    client: "Amorepacific",
    textColor: 'black',
    borderColor: 'black',
    paginationColor: 'black'
  }
]);

// 다음 섹션 스크롤 이동
const nextSectionRef = ref(null);
const scrollToNextSection = () => {
  // ref 우선, 없으면 DOM 탐색으로 대체
  const target = (nextSectionRef && nextSectionRef.value)
    ? nextSectionRef.value
    : document.querySelector('.contents-and-design > section:nth-of-type(2)');
  if (!target) return;
  const rect = target.getBoundingClientRect();
  const top = rect.top + window.pageYOffset;
  window.scrollTo({ top, behavior: 'smooth' });
};

// 활성 여부에 따라 표시 색상을 계산 (black | white)
const getEffectiveColor = (slide, index) => {
  const normalize = (c) => (c === 'black' ? 'black' : 'white');
  const baseColor = normalize(slide?.textColor);
  const activeColor = slide?.activeColor ? normalize(slide.activeColor) : baseColor;
  return activeSlideIndex.value === index ? activeColor : baseColor;
};

// borderColor 값을 기준으로 컨테이너 보더 클래스 반환
const getBorderClass = (slide, index) => {
  // 활성화 상태일 때 별도 activeBorderColor 가 있다면 사용, 없으면 borderColor 사용
  const raw = activeSlideIndex.value === index
    ? (slide?.activeBorderColor || slide?.borderColor)
    : slide?.borderColor;
  const color = raw === 'black' ? 'black' : 'white';
  return color === 'black' ? 'border-black' : 'border-white';
};

</script>

<style lang="scss" scoped>
@use 'sass:list';

.contents-and-design {
  * {
    word-break: keep-all;
  }
  .banner-slide {
    width: 100%;    
    position: relative;  
    // GPU 가속 힌트로 스크롤/변환 중 끊김 완화
    &-item {
      transition: all 0.3s ease;
      @include tablet {
        width: calc(100% / 3);
        min-width: rem(480);
      }

      @include desktop {
        width: calc(100% / 4);
      }

      @for $i from 1 through 11 {
        &:nth-child(#{$i}) {
          .banner-slide-item-content {
            @if $i < 10 {
              background-image: url('/assets/cnx/what-we-do/strategy-and-design/contents-and-design/banner_bg0#{$i}_m.jpg');
              @include tablet {
                background-image: url('/assets/cnx/what-we-do/strategy-and-design/contents-and-design/banner_bg0#{$i}_t.jpg');
              }
              @include desktop {
                background-image: url('/assets/cnx/what-we-do/strategy-and-design/contents-and-design/banner_bg0#{$i}.jpg');
              }
            } @else {
              background-image: url('/assets/cnx/what-we-do/strategy-and-design/contents-and-design/banner_bg#{$i}_m.jpg');
              @include tablet {
                background-image: url('/assets/cnx/what-we-do/strategy-and-design/contents-and-design/banner_bg#{$i}_t.jpg');
              }
              @include desktop {
                background-image: url('/assets/cnx/what-we-do/strategy-and-design/contents-and-design/banner_bg#{$i}.jpg');
              }
            }
          }
        }
      }
      
      &-content {
        width: 100%;
        height: max(rem(620), calc(100vh - rem(71)));
        padding: rem(24);
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center top;
        transition: all 0.3s;
        overflow: hidden;
        color: $d-white;
        @include tablet {
          justify-content: flex-start;
          height: calc(100vh - rem(71));
          padding: rem(24);
          background-position: left center;
        }
        @include desktop {
          height: calc(100vh - rem(90));
          padding: rem(40);
        }
        &.black-text {
          color: $d-black;
          .banner-slide-item-button {
            border-color: $d-black;
          }
        }
      }

      &-image {
        width: 100%;
        flex: 0 0 rem(360);
        overflow: hidden;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.45s ease;
        @include tablet {
          flex: 0 0 rem(210);
        }
        @include desktop {
          flex: 0 0 rem(360);
        }
        // 뷰포트 높이가 1000px 이하일 때는 360 고정 높이를 적용하지 않음
        @media (max-height: 910px) and (min-width: 768px) {
          flex: 0 0 rem(210);
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      // 텍스트 영역 스타일
      &-text {
        text-align: center;
        margin-top: 50vw;
        @include tablet {
          display: flex;
          gap: rem(16);
          flex: 1 1 auto;
          min-height: 0;
          text-align: left;
          margin-top: rem(36);
        }
      }

      &-title-container {
        width: 100%;
        transition: all 0.6s ease;
      }

      &-title {
        font-weight: 700;
        font-size: rem(24);
        margin-bottom: rem(30);
        :deep(br) {
          display: none;
          @include tablet {
            display: block;
          }
        }
        @include tablet {
          margin-bottom: rem(34);
        }

        @include desktop {
          font-size: rem(40);
          margin-bottom: rem(45);
          white-space: nowrap;
        }
      }

      // 모바일에서는 버튼 숨김, 태블릿 이상에서 표시
      // AppButton은 자식 SFC이므로 deep selector 필요
      :deep(.banner-slide-item-button) {
        display: none;
        @include tablet {
          display: inline-flex;
        }
      }

      &-subtitle {
        @include sub-headline-02;
        margin-bottom: rem(30);
      }

      &-description {
        @include body-02;
        line-height: 1.6; 
        overflow-wrap: anywhere;
        word-break: keep-all;
        margin-bottom: rem(30);
      }

      &-meta {
        @include body-02;
      }
      
      // 상세 정보 영역 스타일
      &-details {
        will-change: opacity, transform, width;
        transition: opacity 0.45s ease, transform 0.45s ease, width 0s ease;
        @include tablet {
          width: 0%;
          visibility: hidden;
          opacity: 0;
          border-left: 1px solid;
          padding-left: rem(40);
          margin-left: rem(40);
          position: relative;
          transform: translateX(rem(20));
        }
        &.border-black {
          border-color: rgba($d-black, 0.2);
        }
        &.border-white {
          border-color: rgba($d-white, 0.2);
        }
      }
      
      // 활성 상태일 때 상세 정보 표시
      &.active {
        width: 100%;
        @include tablet {
          width: calc(100% / 3 * 2);
          min-width: rem(560);
        }
        @include desktop {
          width: 50%;
          min-width: rem(960);
        }
        @for $i from 1 through 11 {
          &:nth-child(#{$i}) {
            .banner-slide-item-content {
              @if $i < 10 {
                background-image: url('/assets/cnx/what-we-do/strategy-and-design/contents-and-design/banner_active_bg0#{$i}.jpg');
              } @else {
                background-image: url('/assets/cnx/what-we-do/strategy-and-design/contents-and-design/banner_active_bg#{$i}.jpg');
              }
            }
          }
        }
        .banner-slide-item-title-container {
          width: 50%;
        }
        .banner-slide-item-image {
          opacity: 1;
          visibility: visible;
          transition-delay: 0.2s;
        }
        .banner-slide-item-details {
          width: 50%;
          visibility: visible;
          opacity: 1;
          transform: translateX(0);
          transition-property: opacity, transform, width;
          transition-delay: 0.45s, 0.45s, 0s; // 이미지 페이드(0.45s) 이후 상세영역 등장
        }
      }

    }

    &-down-button {
      display: none;
      width: rem(68);
      height: rem(68);
      background-image: url('/assets/cnx/what-we-do/strategy-and-design/contents-and-design/btn_down.svg');
      position: absolute;
      bottom: rem(70);
      left: 50%;
      transform: translateX(-50%);
      z-index: 2;
      @include desktop {
        display: block;
      }
    }

    &-controller {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      position: absolute;
      bottom: rem(28);
      left: 50%;
      transform: translateX(-50%);
      z-index: 2;
      &-pagination {
        width: auto;
        :deep(.swiper-pagination-bullet) {
          width: rem(12);
          height: rem(12);
          background: $d-white;
          margin: 0 rem(4);
          transition: all 0.3s;
          // 버튼으로 렌더되므로 기본 버튼 스타일 중화
          border: none;
          padding: 0;
          border-radius: 50%;
          cursor: pointer;
          // 시각적 크기를 기존 12px 점과 유사하게 보이도록 내부 원 도형 사용 가능
          // 하지만 접근성을 위해 실제 타겟은 24px 유지
        }
      }

      &-button {
        width: rem(12);
        height: rem(12);
        background-image: url('/assets/cnx/what-we-do/strategy-and-design/contents-and-design/ic_play.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
        margin-left: rem(8);

        //재생중일때
        &[aria-pressed="true"] {
          background-image: url('/assets/cnx/what-we-do/strategy-and-design/contents-and-design/ic_pause.svg');
        }
        // 모바일 전용으로 표시, 태블릿 이상에서는 숨김
        @include tablet {
          display: none;
        }
      }
      
      // pagination color variant: black (controller-level)
      &.black {
        :deep(.swiper-pagination-bullet) {
          background: $d-black;
        }
        .banner-slide-controller-button {
          background-image: url('/assets/cnx/what-we-do/strategy-and-design/contents-and-design/ic_play_black.svg');
          &[aria-pressed="true"] {
            background-image: url('/assets/cnx/what-we-do/strategy-and-design/contents-and-design/ic_pause_black.svg');
          }
        }
      }
    }
  }

  .intro-section {
    @media (max-width: 767px) {
      margin-bottom: rem(-18);
      :deep(.intro-app-title) {
        padding-bottom: rem(18.5);
      }
    }
    &-content {
      position: relative;
      padding: rem(40) 0 0;
      @include tablet {
        padding: rem(72.5) 0;
      }
      @include desktop {
        padding: rem(130) 0;
      }
      &-line {
        width: rem(1);
        height: 100px;
        background-color: $d-black;
        position: absolute;
        transform: translateX(-50%);
        left: 50%;
        top: 0;
        transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        &::after,
        &::before {
          content: '';
          display: block;
          width: rem(1);
          height: rem(13);
          background-color: $d-black;
          position: absolute;
        }
        &::after {
          transform: translateX(calc(-50% + rem(4.8))) rotate(45deg);
          left: 50%;
          bottom: rem(-1.3);
        }

        &::before {
          transform: translateX(calc(-50% - rem(4.8))) rotate(-45deg);
          left: 50%;
          bottom: rem(-1.3);
        }
        &.on-overview {
          background-color: $gray-1;
          &::after,
          &::before {
            background-color: $gray-1;
          }
        }
      }
      &-item {
        &-wrap {
          perspective: rem(800);
          opacity: 0; // 초기 상태
          will-change: opacity, transform;
          transition: opacity 0.6s ease, transform 0.6s ease;
          margin: 0 auto;
          img {
            margin: 0 auto;
            transform-style: preserve-3d;
            will-change: transform;
            transition: transform 0.12s ease;
          }
          &.active {
            opacity: 1;
          }
          $rotations: 90deg, -90deg, 90deg;

          @for $i from 1 through 3 {
            &:nth-child(#{$i}) {
              transform: translateY(rem(120)) rotate(list.nth($rotations, $i));
            }
          }

          &.active {
            transform: translateY(0) rotate(0deg);
          }
          &:nth-child(1) {
            max-width: rem(161);
          }
          &:nth-child(2) {
            max-width: rem(104);
            margin-top: rem(28);
          }
          &:nth-child(3) {
            max-width: rem(143);
            margin-top: rem(28);
          }
          @include tablet {
            &:nth-child(1) {
              max-width: rem(314);
            }
            &:nth-child(2) {
              max-width: rem(227);
              margin-top: rem(114.39);
            }
            &:nth-child(3) {
              max-width: rem(314);
              margin-top: rem(117.89);
            }
          }
          @include desktop {
            &:nth-child(1),
            &:nth-child(2),
            &:nth-child(3) {
              max-width: 100%;
            }
          }
        }
      }
    }
    
  }

  .overview-section {
    background-color: $d-black;
    padding: rem(102) rem(24) rem(75);
    @include tablet {
      padding: rem(156) rem(24) rem(130);
    }
    @include desktop {
      padding: rem(324) rem(24) rem(250);
    }
    .inner {
      max-width: rem(1412);
    }
    &-content {
      padding-top: rem(30);
      &-list {
        display: flex;
        flex-direction: column;
        align-items: center;

        @include tablet {
          flex-direction: row;
          flex-wrap: wrap;
          gap: 0;
        }
        &-item {
          margin-top: rem(8);
          @include tablet {
            display: inline-flex;
            margin-top: 0;
          }
          &-comma {
            display: none;
            font-weight: 600;
            font-size: rem(84);
            color: $d-white;
            flex-shrink: 0;
            @include tablet {
              display: inline-block;
            }
          }

          // CSS-only hover swap (JS 없이 이미지 오버레이 전환)
          .img-swap {
            position: relative;
            display: inline-block;
            .img-hover {
              position: absolute;
              inset: 0;
              opacity: 0;
              visibility: hidden;
            }
          }

          @media (hover: hover) {
            &:hover {
              .img-swap {
                .img-hover { 
                  opacity: 1; 
                  visibility: visible;
                }
                .img-base { 
                  opacity: 0; 
                  visibility: hidden;
                }
              }
            }
          }

          img {
              height: rem(42);
              object-fit: contain;
              @include tablet {
                height: auto;
              }
            }
        }
      }
    }
  }

  .office-section {
    background-color: $d-black;
    padding: 0 0 rem(100);
    @include desktop {
      padding: rem(100) 0 rem(200);
    }
    .inner {
      max-width: rem(1568);
    }

    :deep(.app-title) {
      .app-title-heading {
        color: $d-white;
      }
    }

    :deep(.app-swiper-container) {
      .swiper-pagination-bullet {
        margin: 0;
      }
    }
  }

  .works-section {
    @include tablet {
      padding: rem(100) 0;
    }
    
    .app-title {
      @include tablet {
        padding: rem(97) 0;
      }
    }
    :deep(.app-img-cont) {
      .text-content {
        .description {
          color: $d-black;
        }
      }
    }
    &-diagram {
      margin-bottom: rem(100);
      img {
        margin: 0 auto;
      }
    }
  }
}
</style>