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

        <li class="aboutus-history__item" v-for="item in historyList" :key="item.year" :ref="el => setHistoryItemRef(el)"> 
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
            <i aria-hidden="true" class="point"></i>
          </div>
        </li>

      </ul>
    </div>

  </div>
</template>

<script setup>

  import { ref, computed, onMounted, onBeforeUnmount, onBeforeUpdate } from 'vue'

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
  const historyItemRefs = ref([])

  // history item ref 설정 함수
  const setHistoryItemRef = (el) => {
    if (el) {
      historyItemRefs.value.push(el)
    }
  }

  let headObserver = null
  const itemObservers = ref([])
  let iconScrollCleanup = null

  // Head 애니메이션 초기화
  const setupHeadAnimation = () => {
    if (props.createHeadAnimation && historyHeadRef.value) {
      headObserver = props.createHeadAnimation(
        historyHeadRef.value,
        historyHeadTitleRef.value,
        historyHeadTextRef.value
      )
    }
  }

  // Item Observers 설정 (Intersection Observer 사용)
  const setupItemObservers = () => {
    // 기존 observers 정리
    itemObservers.value.forEach(observer => observer?.disconnect())
    itemObservers.value = []

    // 각 아이템에 대해 개별 observer 생성
    historyItemRefs.value.forEach((item) => {
      if (!item) return

      let lastScrollY = 0
      let isFirstCheck = true

      const observer = new IntersectionObserver(
        ([entry]) => {
          const currentScrollY = window.scrollY || window.pageYOffset
          const isScrollingDown = currentScrollY > lastScrollY
          const isNearTop = currentScrollY < 100

          if (entry.isIntersecting && (isScrollingDown || isFirstCheck || isNearTop)) {
            item.classList.add('active')
            isFirstCheck = false
          } else if (!entry.isIntersecting && !isScrollingDown) {
            item.classList.remove('active')
            isFirstCheck = true
          }

          lastScrollY = currentScrollY
        },
        {
          threshold: 0.2,
          rootMargin: '-50px'
        }
      )

      observer.observe(item)
      itemObservers.value.push(observer)
    })
  }

  // Icon 스크롤 애니메이션 설정 (순수 JavaScript)
  const setupIconScrollAnimation = () => {
    if (!historyIconRef.value || !historyContainerRef.value) return
    
    let ticking = false
    
    const updateIconPosition = () => {
      const container = historyContainerRef.value
      const icon = historyIconRef.value
      
      if (!container || !icon) return
      
      // 컨테이너의 위치와 높이 계산
      const rect = container.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const triggerPoint = viewportHeight * 0.65
      
      // 시작/끝 지점 계산 (모바일/데스크톱 구분)
      const isDesktop = window.innerWidth >= 768
      const startOffset = isDesktop ? 38 : 0
      const endOffset = isDesktop ? 38 : 0
      
      // 시작점: 컨테이너 상단이 뷰포트 65% 지점에 도달
      // 끝점: 컨테이너 하단이 뷰포트 65% 지점에 도달
      const startY = rect.top - triggerPoint + startOffset
      const endY = rect.bottom - triggerPoint - endOffset
      const totalDistance = endY - startY
      
      // 진행도 계산 (0 ~ 1)
      let progress = (-startY) / totalDistance
      progress = Math.max(0, Math.min(1, progress))
      
      // 아이콘 Y 위치 업데이트
      const moveDistance = totalDistance
      icon.style.transform = `translateY(${moveDistance * progress}px)`
      
      ticking = false
    }
    
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateIconPosition)
        ticking = true
      }
    }
    
    const onResize = () => {
      if (!ticking) {
        requestAnimationFrame(updateIconPosition)
        ticking = true
      }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    
    // 초기 위치 설정
    updateIconPosition()
    
    // cleanup 함수 반환
    iconScrollCleanup = () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }

  onBeforeUpdate(() => {
    historyItemRefs.value = []
  })

  onMounted(() => {
    setupHeadAnimation()
    setupIconScrollAnimation()
    setupItemObservers()
  })

  onBeforeUnmount(() => {
    // Head observer 정리
    if (headObserver) {
      headObserver.disconnect()
      headObserver = null
    }

    // Icon scroll 리스너 정리
    if (iconScrollCleanup) {
      iconScrollCleanup()
      iconScrollCleanup = null
    }
    
    // Item observers 정리
    itemObservers.value.forEach(observer => observer?.disconnect())
    itemObservers.value = []
  })

</script>

<style lang="scss" scoped>

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
        @include headline-02;
        text-align: center;
        transform: translateY(30px);
        opacity: 0;
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      }
      
      &-text {
        margin-top: rem(8);
        word-break: keep-all;
        overflow-wrap: anywhere;
        @include body-02 ;
        text-align: center;
        transform: translateY(30px);
        opacity: 0;
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      }

      // active 상태
      &.active {
        .aboutus-history__head-title {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0s;
        }

        .aboutus-history__head-text {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.2s;
        }
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

      // active 상태
      &.active {
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
        .point {
          visibility: visible;
          &::before {
            transition: all 0.6s ease;
            transform: scale(2.5);
            opacity: 0;
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

        @include tablet {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(1);
        }
      }

      &-thumb {
        aspect-ratio: 289 / 145;
        transform: translate(rem(30), 0);
        opacity: 0;
        transition: all 0.6s ease;
        
        @include tablet {
          transform: translate(0, rem(30));
        }
        
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
        transform: translate(rem(30), 0);
        opacity: 0;
        transition: all 0.6s ease;

        @include tablet {
          position: static !important;
          font-size: rem(20);
          line-height: 1.25;
          transform: translate(0, rem(30));
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
          transform: translate(rem(30), 0);
          opacity: 0;
          transition: all 0.6s ease;
        }
        p {
          font-size: rem(14);
          font-weight: 300;
          line-height: 1.6;
          transform: translate(rem(30), 0);
          opacity: 0;
          transition: all 0.6s ease;
        }

        @include tablet {
          margin-top: rem(12);
          gap: rem(12);
          strong {
            font-size: rem(9);
            line-height: 1.55;
            transform: translate(0, rem(30));
          }
          p {
            font-size: rem(8);
            line-height: 1.55;
            transform: translate(0, rem(30));
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