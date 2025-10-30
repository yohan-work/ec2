<template>
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
            <img :src="item.thumb" :alt="item.alt" loading="lazy">
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
</template>

<script setup>

  import { ref, computed, onMounted, onBeforeUnmount, onBeforeUpdate } from 'vue'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  const props = defineProps({
    historyList: {
      type: Array,
      required: true
    },
    createHeadAnimation: {
      type: Function
    }
  })

  const historyHeadRef = ref(null)
  const historyHeadTitleRef = ref(null)
  const historyHeadTextRef = ref(null)

  const historyList = computed(() => props.historyList)
  const historyIconRef = ref(null)
  const historyContainerRef = ref(null)
  const historyListRef = ref(null)
  const historyPointRefs = ref([])

  // history point ref 설정 함수
  const setHistoryPointRef = (el) => {
    if (el) {
      historyPointRefs.value.push(el)
    }
  }

  let ctx = null

  gsap.registerPlugin(ScrollTrigger)

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

      const triggerPoint = '65%'

      // History Head 애니메이션
      props.createHeadAnimation(
        historyHeadRef.value,
        historyHeadTitleRef.value,
        historyHeadTextRef.value
      )

      if (historyIconRef.value && historyContainerRef.value) {

        ScrollTrigger.matchMedia({
          // 모바일 환경 (767px 이하)
          "(max-width: 767px)": () => {
            createHistoryIconAnimation(`top ${triggerPoint}`, `bottom ${triggerPoint}`)
          },
          // 데스크톱 환경 (768px 이상)
          "(min-width: 768px)": () => {
            createHistoryIconAnimation(`top+=38 ${triggerPoint}`, `bottom-=38 ${triggerPoint}`)
          }
        })
      }

      if (historyPointRefs.value.length > 0) {
        historyPointRefs.value.forEach((item, index) => {
          if (!item) return
          ScrollTrigger.create({
            trigger: item,
            start: `top ${triggerPoint}`,
            end: `bottom-=100%`,
            toggleActions: 'play none none reverse',
            // markers: true,
            invalidateOnRefresh: true,
            onEnter: () => {
              item.classList.add('active');
              // if (index === historyPointRefs.value.length - 1) {
              //   historyIconRef.value.classList.add('hide');
              // }
            },
            onLeaveBack: () => {
              item.classList.remove('active');
              // if (index === historyPointRefs.value.length - 1) {
              //   historyIconRef.value.classList.remove('hide');
              // }
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

  @mixin translate {
    transform: translate(rem(30), 0);
    opacity: 0;
    transition: all 0.6s ease;
    @include tablet {
      transform: translate(0, rem(30));
    }
  }

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

  .aboutus-history {
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
      left: rem(-7);
      // left: rem(-7);
      // bottom: rem(1);
      width: rem(18);
      height: rem(18);
      background-color: #FF6633;
      border: 4px solid $d-white;
      border-radius: 50%;
      box-shadow: 0px 0px 0px 1px #FF6633;

      @include tablet {
        top: rem(38);
        left: calc(50% - rem(9));
      }
      // position: absolute;
      // z-index: 1;
      // top: 0;
      // left: 0;
      // @include history-icon;
      // &.hide {
      //   display: none;
      // }

      // @include tablet {
      //   top: rem(38);
      //   left: calc(50% - rem(2));
      // }
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

      // &::after {
      //   position: absolute;
      //   left: rem(-7);
      //   bottom: rem(1);
      //   width: rem(18);
      //   height: rem(18);
      //   background-color: #FF6633;
      //   border: 4px solid $d-white;
      //   border-radius: 50%;
      //   box-shadow: 0px 0px 0px 1px #FF6633;
      //   content: '';
      // }

      @include tablet {
        gap: rem(60);
        padding-bottom: rem(112);
        &::before {
          left: 50%;
          transform: translateX(-50%);
          top: rem(38);
          bottom: rem(38);
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

</style>