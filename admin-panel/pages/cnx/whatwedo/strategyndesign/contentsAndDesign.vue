<template>
  <div class="contents-and-design">
    <section class="banner-slide-section">
      <swiper
        :slidesPerView="1"
        :pagination="{
          clickable: true,
          enabled: true,
        }"
        :breakpoints="{
          768: {
            slidesPerView: 'auto',
            freeMode: true,
            enabled: false, // 스와이퍼 비활성화
          },
        }"
        :modules="modules"
        class="banner-slide"
      >
        <swiper-slide v-for="(slide, index) in slideData" :key="index" class="banner-slide-item" :class="{ 'active': activeSlideIndex === index }">
          <div class="banner-slide-item-content" :class="{ 'black-text': getEffectiveColor(slide, index) === 'black' }">
            <figure class="banner-slide-item-image">
              <picture>
                <source :srcset="getImageSrc(index + 1)" media="(min-width: 768px)">
                <source :srcset="getImageSrc(index + 1)" media="(min-width: 1024px)">
                <img :src="getImageSrc(index + 1)" :alt="slide.title">
              </picture>
            </figure>
            <div class="banner-slide-item-text">
              <div class="banner-slide-item-title-container">
                <h2 class="banner-slide-item-title" v-html="slide.title"></h2>
                <AppButton  
                  :text="activeSlideIndex === index ? 'Close' : 'Learn More'"
                  :color="getEffectiveColor(slide, index) === 'black' ? 'default' : 'white'"
                  :effect="activeSlideIndex === index ? 'right' : 'left'"
                  :arrow="activeSlideIndex === index ? 'reverse' : true"
                  class="banner-slide-item-button"
                  @click="toggleSlide(index)"
                />
              </div>
              <div class="banner-slide-item-details" :class="getBorderClass(slide, index)">
                <p class="banner-slide-item-subtitle" v-if="slide.subtitle" v-html="slide.subtitle">
                </p>
                <p class="banner-slide-item-description" v-if="slide.description" v-html="slide.description">
                </p>
                <div class="banner-slide-item-meta" v-if="slide.launch && slide.client">
                  <p><strong>Launch</strong> {{ slide.launch }}</p>
                  <p><strong>Client</strong> {{ slide.client }}</p>
                </div>
                <a class="banner-slide-item-link" v-if="slide.link" :href="`${slide.link}`" target="_blank" rel="noopener noreferrer">
                  {{ slide.link }}
                </a>
              </div>
            </div>
          </div>
        </swiper-slide>
        <button class="banner-slide-down-button" @click="scrollToNextSection" aria-label="다음 섹션으로 이동"></button>
      </swiper>
    </section>
    <section class="contents-and-design-section" ref="nextSectionRef">
      <AppTitle 
      title="Concentrix <br>interactive <br>eXperience" 
      text="CiX(Concentrix interactive eXperience)는 콘센트릭스 내에서 <br>UX/UI와 Contents 제작을 전담하는 Creative 조직입니다."
      />
    </section>
  </div>
</template>

<script setup>
import AppTitle from '~/components/cnx/AppTitle.vue';
import AppButton from '~/components/cnx/AppButton.vue';
import { nextTick } from 'vue';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode, Pagination, Mousewheel } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// Import GSAP
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// 데스크톱 기준 너비 (PC 전용 적용)
const DESKTOP_MIN_WIDTH = 1024;

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

// 레이아웃 설정
definePageMeta({
  layout: 'concentrix'
});

// 활성 슬라이드 인덱스 관리
const activeSlideIndex = ref(null);
// 폭 변화 안정화 감지를 외부에서 호출하기 위한 함수 (onMounted에서 주입)
let startWidthStabilizeWatch = () => {};

// 슬라이드 토글 함수
const toggleSlide = (index) => {
  if (activeSlideIndex.value === index) {
    // 같은 슬라이드를 클릭하면 비활성화
    activeSlideIndex.value = null;
  } else {
    // 다른 슬라이드를 클릭하면 활성화
    activeSlideIndex.value = index;
  }

  // 폭 변화가 반영된 뒤 스크롤 타임라인 재계산
  nextTick(() => {
    if (window.innerWidth >= 768) {
      // 실제 길이 변경이 안정화될 때까지 감시 후, 한 번만 초기화/refresh
      startWidthStabilizeWatch();
    }
  });
};

// ScrollTrigger 애니메이션 설정
onMounted(() => {
  const swiperWrapper = document.querySelector('.banner-slide .swiper-wrapper');
  const container = document.querySelector('.banner-slide');

  let bannerScroll = null;
  let resizeTimeout = null;
  let onLoadHandler = null;
  let onPageShowHandler = null;
  let widthWatchRaf = null;
  let widthStableTimer = null;
  let lastWrapperWidth = (swiperWrapper) ? swiperWrapper.scrollWidth : 0;

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
        invalidateOnRefresh: true
      }
    });

    bannerScroll.to(swiperWrapper, {
      x: `-${wrapperWidth - containerWidth}px`,
      ease: 'none'
    });

    // 새 세팅 반영 후 동일 진행도로 스크롤 위치 복원
    ScrollTrigger.refresh();
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
        const targetScroll = st.start + prevProgress * (st.end - st.start);
        // 애니메이션/스크롤을 동일 진행도로 맞춤
        bannerScroll.progress(prevProgress, false); // 이 시점에 wrapper transform → targetX
        st.scroll(targetScroll);
        st.update();
        // transition 종료 후 정리
        const clearTransition = () => {
          try { (swiperWrapper).style.transition = ''; } catch (_) { /* ignore */ }
        };
        (swiperWrapper).addEventListener('transitionend', clearTransition, { once: true });
        setTimeout(clearTransition, 600);
      });
    }
  };

  // 폭 변화 안정화 감시(transition 동안 scrollWidth 변동을 추적, 일정 시간 변동이 없을 때 초기화/refresh 실행)
  const stopWidthStabilizeWatch = () => {
    if (widthWatchRaf) cancelAnimationFrame(widthWatchRaf);
    widthWatchRaf = null;
    if (widthStableTimer) clearTimeout(widthStableTimer);
    widthStableTimer = null;
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
        // 안정화 시점에 한 번만 초기화/refresh
        initScrollAnimation();
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

  // 초기 1회 적용 (레이아웃 안정화 후 적용)
  requestAnimationFrame(() => applyBannerSlideTitleMinHeight());

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize);
    if (onLoadHandler) window.removeEventListener('load', onLoadHandler);
    if (onPageShowHandler) window.removeEventListener('pageshow', onPageShowHandler);
    stopWidthStabilizeWatch();
    killScrollAnimation();
    ScrollTrigger.refresh();
  });
});

// Swiper 모듈 설정
const modules = [FreeMode, Pagination, Mousewheel];

// 이미지 경로 생성 함수
const getImageSrc = (index) => {
  const paddedIndex = index < 10 ? `0${index}` : `${index}`;
  return `/assets/cnx/whatwedo/strategyndesign/contentsndesign/banner_inner${paddedIndex}.jpg`;
};

// 슬라이드 데이터
const slideData = ref([
  {
    title: "Hankook Tire <br>Motorsports <br>Website",
    subtitle: "한국 타이어 모터스포츠 공식 웹사이트 신규 구축",
    description: "글로벌 Top Tier 타이어 기술력과 Formula E 및다수의 글로벌 모터스포츠 대회에 타이어 공급, 참가팀 후원에 대한 정보를 제공하고자 글로벌 웹사이트 신규 구축 및 확산 업무 수행",
    launch: "Septtember 28, 2022",
    client: "Hankook Tire & Technology",
    borderColor: 'white'
  },
  {
    title: "Amorepacific <br>HK Sulwhasoo <br>D2C mall <br>Development",
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
    borderColor: 'white'
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
    borderColor: 'black'
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
@use '~/layouts/scss/cnx.scss' as *;
@use '~/layouts/scss/cnx/_variables' as *;
@use '~/layouts/scss/cnx/_mixins' as *;
@use '~/layouts/scss/cnx/_functions' as *;
@use '~/layouts/scss/cnx/_base' as *;

.contents-and-design {
  .banner-slide {
    width: 100%;    
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
              background-image: url('/assets/cnx/whatwedo/strategyndesign/contentsndesign/banner_bg0#{$i}_m.jpg');
              @include tablet {
                background-image: url('/assets/cnx/whatwedo/strategyndesign/contentsndesign/banner_bg0#{$i}_t.jpg');
              }
              @include desktop {
                background-image: url('/assets/cnx/whatwedo/strategyndesign/contentsndesign/banner_bg0#{$i}.jpg');
              }
            } @else {
              background-image: url('/assets/cnx/whatwedo/strategyndesign/contentsndesign/banner_bg#{$i}_m.jpg');
              @include tablet {
                background-image: url('/assets/cnx/whatwedo/strategyndesign/contentsndesign/banner_bg#{$i}_t.jpg');
              }
              @include desktop {
                background-image: url('/assets/cnx/whatwedo/strategyndesign/contentsndesign/banner_bg#{$i}.jpg');
              }
            }
          }
        }
      }
      
      &-content {
        width: 100%;
        height: calc(100vh - rem(90));
        padding: rem(40);
        display: flex;
        flex-direction: column;
        background-size: cover;
        background-position: left center;
        background-repeat: no-repeat;
        transition: all 0.3s;
        overflow: hidden;color: $d-white;
        @include tablet {
          padding: rem(24);
        }
        @include desktop {
          padding: rem(40);
        }
        &.black-text {
          color: $d-black;
          .banner-slide-item-button {
            // 버튼 color는 :color 바인딩으로 처리되지만,
            // 텍스트 영역 전체 색 변경을 위해 명시적으로 유지
            border-color: $d-black;
          }
        }
      }

      &-image {
        width: 100%;
        flex: 0 0 rem(360);
        overflow: hidden;
        opacity: 0;
        transition: opacity 0.3s ease;
        @include tablet {
          flex: 0 0 rem(210);
        }
        @include desktop {
          flex: 0 0 rem(360);
        }
        // 뷰포트 높이가 1000px 이하일 때는 360 고정 높이를 적용하지 않음
        @media (max-height: 1000px) and (min-width: 768px) {
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
        display: flex;
        gap: rem(16);
        flex: 1 1 auto;
        min-height: 0; // flex 자식의 overflow 계산을 위해 필요
        margin-top: rem(36);
      }

      &-title-container {
        width: 100%;
        transition: all 0.6s ease;
      }

      &-title {
        font-weight: 700;
        font-size: rem(24);
        
        @include tablet {
          margin-bottom: rem(34);
        }
        @include desktop {
          font-size: rem(42);
          margin-bottom: rem(45);
        }
      }

      &-subtitle {
        @include sub-headline-02;
        margin-bottom: rem(30);
      }

      &-description {
        @include body-02;
        margin-bottom: rem(30);
      }

      &-meta {
        @include body-02;
      }
      
      // 상세 정보 영역 스타일
      &-details {
        width: 0%;
        visibility: hidden;
        opacity: 0;
        transition: opacity 0.3s ease;
        border-left: 1px solid;
        padding-left: rem(40);
        margin-left: rem(40);
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
                background-image: url('/assets/cnx/whatwedo/strategyndesign/contentsndesign/banner_active_bg0#{$i}.jpg');
              } @else {
                background-image: url('/assets/cnx/whatwedo/strategyndesign/contentsndesign/banner_active_bg#{$i}.jpg');
              }
            }
          }
        }
        .banner-slide-item-title-container {
          width: 50%;
        }
        .banner-slide-item-image {
          opacity: 1;
        }
        .banner-slide-item-details {
          width: 50%;
          visibility: visible;
          opacity: 1;
          transition-delay: 0.4s;
        }
      }
    }

    &-down-button {
      display: none;
      width: rem(68);
      height: rem(68);
      background-image: url('/assets/cnx/whatwedo/strategyndesign/contentsndesign/btn_down.svg');
      position: absolute;
      bottom: rem(70);
      left: 50%;
      transform: translateX(-50%);
      z-index: 2;
      @include desktop {
        display: block;
      }
    }
  }
}
.inner {
  margin: 0 auto;
}
</style>