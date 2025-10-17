<template>
  <div class="aboutus">

    <AppKeyVisual 
      imageAlt="Style Guide Key Visual"
      :animationDuration="1500"
    />

    <div class="inner">

      <AppTitle 
        title="About Us"
      />
      
      <!-- intro video -->
      <div class="aboutus-intro">
        <video muted autoplay playsinline loop class="aboutus-intro__video pc">
          <source src="/assets/cnx/about-us/overview/aboutus.mp4" type="video/mp4">
        </video>
        <video muted autoplay playsinline loop class="aboutus-intro__video mo">
          <source src="/assets/cnx/about-us/overview/aboutus_m.mp4" type="video/mp4">
        </video>
        <div class="aboutus-intro__content">
          <h2 class="aboutus-intro__title">We're Concentrix.</h2>
          <p class="aboutus-intro__text">
            솔루션과 테크놀로지 중심으로 넓고 깊게 고민합니다.<br>
            마음을 움직이고 시장을 변화시킬 수 있도록 기업의<br>서비스를 설계하고 구축, 운영합니다
          </p>
        </div>
      </div>

      <!-- information-->
      <div class="aboutus-information">

        <div class="aboutus-information__head" ref="informationHeadRef">
          <h2 class="aboutus-information__head-title" ref="informationHeadTitleRef">Concentrix Information</h2>
          <p class="aboutus-information__head-text" ref="informationHeadTextRef">콘센트릭스서비스 코리아는 글로벌 최고 수준의 고객 경험을 위한 디지털 마케팅 및 e-Commerce 서비스 및 CS 경험을 제공합니다.</p>
        </div>

        <div class="aboutus-information__grid aboutus-information__grid--global">
          <strong class="aboutus-information__grid-title">Global</strong>
          <div class="aboutus-information__grid-item">
            <p>Fortune 500 Clients</p>
            <em>155+</em>
          </div>
          <div class="aboutus-information__grid-item">
            <p>Clients</p>
            <em>2000+</em>
          </div>
          <div class="aboutus-information__grid-item">
            <p>New Economy Clients</p>
            <em>148+</em>
          </div>
          <div class="aboutus-information__grid-item">
            <p>Continents</p>
            <em>6</em>
          </div>
          <div class="aboutus-information__grid-item">
            <p>Countries</p>
            <em>70</em>
          </div>
          <div class="aboutus-information__grid-item">
            <p>Languages</p>
            <em>150</em>
          </div>
        </div>

        <div class="aboutus-information__grid aboutus-information__grid--korea">
          <strong class="aboutus-information__grid-title">Korea</strong>
          <div class="aboutus-information__grid-item">
            <p>디지털 마케팅 및 고객경험 센터</p>
            <em>155+</em>
          </div>
          <div class="aboutus-information__grid-item">
            <p>고객사</p>
            <em>2000+</em>
          </div>
          <div class="aboutus-information__grid-item">
            <p>디지털 마케팅 &amp;<br>고객 경험 서비스 전문인력</p>
            <em>148+</em>
          </div>
        </div>

      </div>

      <!-- history -->
      <div class="aboutus-history">

        <div class="aboutus-history__head" ref="historyHeadRef">
          <h2 class="aboutus-history__head-title" ref="historyHeadTitleRef">History</h2>
          <p class="aboutus-history__head-text" ref="historyHeadTextRef">콘센트릭스서비스 코리아는 2014년 출범이후 지속적인 성장을 하고 있습니다.</p>
        </div>

        <div class="aboutus-history__container" ref="historyContainerRef">
          <i v-if="historyList.length > 0" class="aboutus-history__icon" ref="historyIconRef"></i>
          <ul class="aboutus-history__list" ref="historyListRef">

            <li class="aboutus-history__item" v-for="item in historyList" :key="item.year"> 
              <div class="aboutus-history__item-thumb">
                <img :src="item.thumb" alt="history thumb" loading="lazy">
              </div>
              <div class="aboutus-history__item-content">
                <em class="aboutus-history__item-year">{{ item.year }}</em>
                <ul class="aboutus-history__item-detail">
                  <li v-for="detail in item.detail" :key="detail.title">
                    <strong v-html="detail.title"></strong>
                    <p v-html="detail.content" v-if="detail.content !== ''"></p>
                  </li>
                </ul>
                <i aria-hidden="true" class="point" :ref="el => setHistoryPointRef(el)"></i>
              </div>
            </li>

          </ul>
        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import gsap from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  import AppKeyVisual from '~/components/cnx/AppKeyVisual' 
  import AppTitle from '~/components/cnx/AppTitle'

  definePageMeta({ 
    layout: 'concentrix',
    ssr: false,
  })

  useHead({
    title: '회사 소개 | 콘센트릭스 Catalyst 코리아',
    meta: [{ name: 'description', content: 'content="콘센트릭스는 글로벌 최고 수준의 디지털 마케팅 및 e-Commerce 전문 서비스 기업입니다. 전략 및 운영, 분석, UX, 디자인, 구축 영역에서 서비스를 제공합니다.' }],
  })

  // history list
  const historyList = ref([
    {
      thumb: '/assets/cnx/about-us/overview/2014.png',
      year: '2014',
      detail: [
        { title: 'IBM CRM BPO 인수', content: 'CRM & Digital Marketing ($1.2B)' },
      ]
    },
    {
      thumb: '/assets/cnx/about-us/overview/2016.png',
      year: '2016',
      detail: [
        { title: 'Minacs 인수', content: 'Global CRM & Marketing Optimization Company ($420M)' }
      ]
    },
    {
      thumb: '/assets/cnx/about-us/overview/2017.png',
      year: '2017',
      detail: [
        { title: 'Tigerspike 인수', content: 'Digital Product & Strategy Company ($120M)' }
      ]
    },
    {
      thumb: '/assets/cnx/about-us/overview/2018.png',
      year: '2018',
      detail: [
        { title: 'Convergys 인수', content: 'Global Customer Care Company ($2.2B)' },
        { title: 'ACT 센터 출범', content: '' }
      ]
    },
    {
      thumb: '/assets/cnx/about-us/overview/2020.png',
      year: '2020',
      detail: [
        { title: 'Nasdaq 상장', content: '글로벌 CX & Tech 기업으로 상장 (Nasdaq : CNXC)' },
        { title: 'CiX 센터 출범', content: '' }
      ]
    },
    {
      thumb: '/assets/cnx/about-us/overview/2021.png',
      year: '2021',
      detail: [
        { title: 'Value Factory 인수', content: 'eCommerce Solution Company' },
        { title: 'PK 인수', content: 'CX Design Engineering Company ($1.6B)' }
      ]
    },
    {
      thumb: '/assets/cnx/about-us/overview/2022.png',
      year: '2022',
      detail: [
        { title: 'ServiceSource 인수', content: 'B2B Digital Sales Company ($131M)' }
      ]
    },
    {
      thumb: '/assets/cnx/about-us/overview/2023.png',
      year: '2023.09',
      detail: [
        { title: 'Webhelp 합병', content: 'Global \'tech-powered\' company ($4B)' }
      ]
    },
    {
      thumb: '/assets/cnx/about-us/overview/2024.png',
      year: '2024.04',
      detail: [
        { title: 'ReBranding', content: 'CI & Culture Statement Renewal' }
      ]
    },
    {
      thumb: '/assets/cnx/about-us/overview/2025.png',
      year: '2025.09',
      detail: [
        { title: '‘SAI Digital’ 인수합병', content: 'E2E 이커머스 솔루션 서비스 및 자체 AI 솔루션 보유,<br>한국형 베트남 오프쇼어 개발 운영 모델 완성' }
      ]
    }
  ])

  const informationHeadRef = ref(null)
  const informationHeadTitleRef = ref(null)
  const informationHeadTextRef = ref(null)

  const historyHeadRef = ref(null)
  const historyHeadTitleRef = ref(null)
  const historyHeadTextRef = ref(null)

  const historyIconRef = ref(null)
  const historyContainerRef = ref(null)
  const historyListRef = ref(null)
  const historyPointRefs = ref([])

  const setHistoryPointRef = (el) => {
    if (el) {
      historyPointRefs.value.push(el)
    }
  }

  let ctx = null

  gsap.registerPlugin(ScrollTrigger)

  const createHeadAnimation = (triggerElement, titleElement, textElement) => {
    if (!triggerElement || !titleElement || !textElement) return

    gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    })
    .fromTo(titleElement, {
      y: 30,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      ease: 'power2.out',
    })
    .fromTo(textElement, {
      y: 30,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      ease: 'power2.out',
    }, '-=0.2') // 0.2초 전에 시작하여 부드러운 연속 애니메이션
  }

  const createHistoryIconAnimation = (start, end) => {
    if (!historyIconRef.value) return
    gsap.to(historyIconRef.value, {
      ease: 'none',
      scrollTrigger: {
        trigger: historyContainerRef.value,
        start,
        end,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const scrollDistance = self.end - self.start
          const currentY = scrollDistance * self.progress
          gsap.set(historyIconRef.value, { y: currentY })
        }
      }
    })
  }

  const initAnimation = () => {
    ctx = gsap.context(() => {

      // Information Head 애니메이션
      createHeadAnimation(
        informationHeadRef.value,
        informationHeadTitleRef.value,
        informationHeadTextRef.value
      )

      // History Head 애니메이션
      createHeadAnimation(
        historyHeadRef.value,
        historyHeadTitleRef.value,
        historyHeadTextRef.value
      )

      if (historyIconRef.value && historyContainerRef.value) {

        ScrollTrigger.matchMedia({
          // 모바일 환경 (767px 이하)
          "(max-width: 767px)": () => {
            createHistoryIconAnimation('top 80%', 'bottom 80%')
          },
          // 데스크톱 환경 (768px 이상)
          "(min-width: 768px)": () => {
            createHistoryIconAnimation('top+=38 80%', 'bottom-=38 80%')
          }
        })
      }

      if (historyPointRefs.value.length > 0) {
        historyPointRefs.value.forEach((item, index) => {
          if (!item) return
          ScrollTrigger.create({
            trigger: item,
            start: `top 80%`,
            end: `bottom-=100%`,
            toggleActions: 'play none none reverse',
            // markers: true,
            invalidateOnRefresh: true,
            onEnter: (self) => {
              item.classList.add('active');
              if (index === historyPointRefs.value.length - 1) {
                historyIconRef.value.classList.add('hide');
              }
            },
            onLeaveBack: () => {
              item.classList.remove('active');
              if (index === historyPointRefs.value.length - 1) {
                historyIconRef.value.classList.remove('hide');
              }
            }
          })
        })
      }

    })
  }

  onBeforeUpdate(() => {
    historyPointRefs.value = []
  })

  onMounted(() => {
    initAnimation()
  })

  onBeforeUnmount(() => {
    ctx?.revert()
    ctx = null
  })

</script>

<style lang="scss" scoped>

  @use '~/layouts/scss/cnx' as *;
  @use '~/layouts/scss/cnx/_variables' as *;
  @use '~/layouts/scss/cnx/_mixins' as *;
  @use '~/layouts/scss/cnx/_functions' as *;

  @mixin history-icon {
    width: rem(4);
    height: rem(24);
    border-radius: rem(6);
    background-color: #FF6633;
    @include tablet {
      height: rem(15);
    }
    @include desktop {
      height: rem(30);
    }
  }

  @mixin translate {
    transform: translate(rem(30), 0);
    opacity: 0;
    transition: all 0.6s ease;
    @include tablet {
      transform: translate(0, rem(30));
    }
  }

  .aboutus {

    overflow: hidden;

    &-intro {
      position: relative;
      &__video {
        width: 100%;
        aspect-ratio: 624 / 832;
        &.pc {
          display: none;
        }
        &.mo {
          display: block;
        }
        @include tablet {
          aspect-ratio: 132 / 60;
          &.pc {
            display: block;
          }
          &.mo {
            display: none;
          }
        }
      }
      &__content {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        gap: rem(24);
        inset: 0;
        padding: rem(24);
        color: $d-white;
        word-break: keep-all;
        overflow-wrap: anywhere;
        @include tablet {
          justify-content: center;
          gap: rem(9);
          padding: rem(32);
        }
        @include desktop {
          gap: rem(24);
          left: 50%;
          padding-left: 0;
        }
      }
      &__title {
        @include sub-headline-01;
      }
      &__text {
        @include body-02;
      }
    }

    &-information {

      margin-top: rem(40);
      @include tablet {
        margin-top: rem(80);
      }
      @include desktop {
        margin-top: rem(100);
      }

      &__head {
        margin-bottom: rem(40);
        text-align: center;
        &-title {
          @include sub-headline-01;
        }
        &-text {
          margin-top: rem(8);
          word-break: keep-all;
          overflow-wrap: anywhere;
          @include body-02;
        }

        @include tablet {
          margin-bottom: rem(80);
          &-text {
            margin-top: rem(20);
          }
        }

        @include desktop {
          margin-bottom: rem(100);
          &-text {
            margin-top: rem(24);
          }
        }
      }

      &__grid {
        
        $this: &;

        container: aboutus-information / inline-size;
        display: grid;
        gap: rem(4);
        border-radius: rem(8);
        overflow: hidden;
        grid-template-columns: repeat(2, 1fr);

        &--global {
          #{$this}-title {
            --title-color: #001933;
          }
          @include tablet {
            grid-template-columns: #{min(30cqi, 426px)} repeat(3, 1fr);
            #{$this}-title {
              grid-column: unset;
              grid-row: span 2;
            }
          }
        }
        &--korea {
          margin-top: rem(24);
          #{$this}-title {
            --title-color: #036;
          }
          #{$this}-item {
            &:is(:nth-child(even):last-child) {
              grid-column: span 2;
            }
          }
          @include tablet {
            margin-top: rem(8);
            grid-template-columns: repeat(4, 1fr);
            #{$this}-title {
              grid-column: unset;
              order: 1;
            }
            #{$this}-item {
              &:is(:nth-child(even):last-child) {
                grid-column: unset;
              }
            }
          }
          @include desktop {
            margin-top: rem(16);
          }
        }

        &-title {
          position: relative;
          grid-column: span 2;
          padding: rem(14) rem(16);
          color: $d-white;
          text-align: center;
          background-color: var(--title-color, $d-white);
          @include sub-headline-01;

          &::after {
            position: absolute;
            left: 50%;
            bottom: -9px;
            transform: translateX(-50%);
            width: rem(28);
            height: rem(25);
            background-color: var(--title-color, $d-white);
            mask: center / 28px auto no-repeat url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='19' viewBox='0 0 24 19' fill='none'%3E%3Cpath d='M12.8397 17.7016C12.4457 18.311 11.5543 18.311 11.1603 17.7016L0.873397 1.79324C0.443143 1.12787 0.920763 0.250244 1.71313 0.250244L22.2869 0.250246C23.0792 0.250246 23.5569 1.12787 23.1266 1.79325L12.8397 17.7016Z' fill='%23001933'/%3E%3C/svg%3E");
            content: '';
          }

          @include tablet {
            padding: rem(12);
            text-align: left;
            &::after {
              display: none;
            }
          }
          @include desktop {
            padding: rem(24);
          }
        }

        &-item {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background-color: $gray-3;
          height: rem(136);
          padding: rem(12);

          p {
            position: absolute;
            top: rem(12);
            left: rem(12);
            font-weight: 500;
            font-size: rem(14);
            word-break: keep-all;
            overflow-wrap: anywhere;
          }

          em {
            margin-top: rem(10);
            font-weight: 700;
            font-style: normal;
            text-align: center;
            font-size: rem(36);
          }

          @include tablet {
            padding: rem(12);
            p {
              top: rem(12);
              left: rem(12);
            }
            em { 
              font-size: rem(32);
            }
          }

          @include desktop {
            height: rem(244);
            padding: rem(24);
            p {
              left: rem(24);
              top: rem(24);
              @include body-03;
            }
            em {
              @include headline-02;
            }
          }

        }
      }

    }

    &-history {
      margin-top: rem(40);
      @include tablet {
        margin-top: rem(80);
      }
      @include desktop {
        margin-top: rem(100);
      }

      &__head {
        margin-bottom: rem(40);
        &-title {
          font-weight: 900;
          @include sub-headline-02;
        }
        &-text {
          margin-top: rem(8);
          word-break: keep-all;
          overflow-wrap: anywhere;
          @include body-03 ;
        }

        @include tablet {
          margin-bottom: rem(80);
          &-text {
            margin-top: rem(20);
          }
        }

        @include desktop {
          margin-bottom: rem(100);
          &-text {
            margin-top: rem(24);
          }
        }
      }

      &__container {
        position: relative;
      }

      &__icon {
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        @include history-icon;
        &.hide {
          display: none;
        }

        @include tablet {
          top: rem(38);
          left: calc(50% - rem(2));
        }
      }

      &__list {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: rem(32);
        padding-bottom: rem(56);

        &::before {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: rem(4);
          background-color: #e3e4e6;
          content: '';
        }

        &::after {
          position: absolute;
          left: rem(-7);
          bottom: rem(1);
          width: rem(18);
          height: rem(18);
          background-color: #FF6633;
          border: 4px solid $d-white;
          border-radius: 50%;
          box-shadow: 0px 0px 0px 1px #FF6633;
          content: '';
        }

        @include tablet {
          gap: rem(60);
          padding-bottom: rem(112);
          &::before {
            left: 50%;
            transform: translateX(-50%);
            top: rem(38); 
          }
          &::after {
            left: 50%;
            transform: translateX(-50%);
          }
        }

        @include desktop {
          gap: rem(120);
          padding-bottom: rem(226); 
          &::after {
            bottom: rem(2);
            width: rem(34);
            height: rem(34);
            border: 8px solid $d-white;
            box-shadow: 0px 0px 0px 2px #FF6633;
          }
        }
      }

      &__item {
        $parent: &;
        position: relative;
        padding-left: rem(29);

        &:has(.point.active) {
          #{$parent}-thumb {
            transform: translate(0, 0);
            opacity: 1;
          }
          #{$parent}-year {
            transform: translate(0, 0);
            opacity: 1;
            transition-delay: 0.2s;
          }
          #{$parent}-detail {
            strong {
              transform: translate(0, 0);
              opacity: 1;
              transition-delay: 0.4s;
            }
            p {
              transform: translate(0, 0);
              opacity: 1;
              transition-delay: 0.4s;
            }
          }

        }

        .point {
          position: absolute;
          left: rem(-29);
          top: rem(6);
          visibility: hidden;
          &::before {
            position: absolute;
            inset: 0;
            background-color: #FF6633;
            content: '';
          }

          @include history-icon;

          &.active {
            visibility: visible;
            &::before {
              transition: all 0.6s ease;
              transform: scale(2.5);
              opacity: 0;
            }
          }

          @include tablet {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        &-thumb {
          aspect-ratio: 289 / 145;
          @include translate;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        &-content { 
          position: relative;
          margin-top: rem(16);

          @include tablet {
            position: static;
            margin-top: 0;
          }
        }

        &-year {
          position: relative;
          display: block;
          font-style: normal;
          font-size: rem(24);
          font-weight: 900;
          line-height: 1.4;

          @include translate;

          @include tablet {
            position: static !important;
            font-size: rem(20);
            line-height: 1.25;
          }
          @include desktop {
            font-size: rem(40);
          }
        }

        &-detail {
          display: flex;
          flex-direction: column;
          gap: rem(8);
          margin-top: rem(8);
          strong {
            display: block;
            font-weight: 500;
            font-size: rem(16);
            line-height: 1.6;
            @include translate;
          }
          p {
            font-size: rem(14);
            font-weight: 300;
            line-height: 1.6;
            @include translate;
          }

          @include tablet {
            margin-top: rem(12);
            gap: rem(12);
            strong {
              font-size: rem(9);
              line-height: 1.55;
            }
            p {
              font-size: rem(8);
              line-height: 1.55;
            }
          }
          @include desktop {
            margin-top: rem(24);
            gap: rem(24);
            strong {
              font-size: rem(18);
            }
            p {
              font-size: rem(16);
            }
          }
        }

        @include tablet {
          display: flex;
          gap: rem(88);
          align-items: center;
          padding-left: 0;

          &:nth-child(even) {
            flex-direction: row-reverse;
            text-align: right;
          }

          &-thumb {
            flex: 1;
          }
          &-content {
            flex: 1;
          }
        }

        @include desktop {
          gap: rem(164);
        }

      }

    }

  }

</style>