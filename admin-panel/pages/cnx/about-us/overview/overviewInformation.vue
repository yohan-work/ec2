<template>
  <!-- information-->
  <div class="aboutus-information">

    <div class="aboutus-information__head" ref="informationHeadRef">
      <h2 class="aboutus-information__head-title" ref="informationHeadTitleRef">Concentrix <br class="title-br">
        Information</h2>
      <p class="aboutus-information__head-text" ref="informationHeadTextRef">콘센트릭스서비스 코리아는 글로벌 최고 수준의 고객 경험을 위한 <br
          class="info-br"> 디지털 마케팅 및 e-Commerce 서비스 및 CS 경험을 제공합니다.</p>
    </div>

    <div class="aboutus-information__grid aboutus-information__grid--global">
      <strong class="aboutus-information__grid-title">Global</strong>
      <div class="aboutus-information__grid-item" :ref="el => setInformationCountRef(el)">
        <p>Fortune 500 Clients</p>
        <em data-target="155+">0+</em>
      </div>
      <div class="aboutus-information__grid-item" :ref="el => setInformationCountRef(el)">
        <p>Clients</p>
        <em data-target="2000+">0+</em>
      </div>
      <div class="aboutus-information__grid-item" :ref="el => setInformationCountRef(el)">
        <p>New Economy Clients</p>
        <em data-target="418+">0+</em>
      </div>
      <div class="aboutus-information__grid-item" :ref="el => setInformationCountRef(el)">
        <p>Continents</p>
        <em data-target="6">0</em>
      </div>
      <div class="aboutus-information__grid-item" :ref="el => setInformationCountRef(el)">
        <p>Countries</p>
        <em data-target="70">0</em>
      </div>
      <div class="aboutus-information__grid-item" :ref="el => setInformationCountRef(el)">
        <p>Languages</p>
        <em data-target="150">0</em>
      </div>
    </div>

    <div class="aboutus-information__grid aboutus-information__grid--korea">
      <strong class="aboutus-information__grid-title">Korea</strong>
      <div class="aboutus-information__grid-item" :ref="el => setInformationCountRef(el)">
        <p>디지털 마케팅 및<br class="info-br">고객경험 센터</p>
        <em data-target="8">0</em>
      </div>
      <div class="aboutus-information__grid-item" :ref="el => setInformationCountRef(el)">
        <p>고객사</p>
        <em data-target="60+">0</em>
      </div>
      <div class="aboutus-information__grid-item" :ref="el => setInformationCountRef(el)">
        <p>디지털 마케팅 &amp;<br>고객 경험 서비스 전문인력</p>
        <em data-target="1500+">0</em>
      </div>
    </div>

  </div>
</template>

<script setup>

import { ref, onMounted, onBeforeUnmount, onBeforeUpdate } from 'vue'

const props = defineProps({
  createHeadAnimation: {
    type: Function
  }
})

const informationHeadRef = ref(null)
const informationHeadTitleRef = ref(null)
const informationHeadTextRef = ref(null)
const informationCountRefs = ref([])

// information grid item ref 설정 함수
const setInformationCountRef = (el) => {
  if (el) {
    informationCountRefs.value.push(el)
  }
}

let headObserver = null
const countObservers = ref([])

// Head 애니메이션 초기화
const setupHeadAnimation = () => {
  if (props.createHeadAnimation && informationHeadRef.value) {
    headObserver = props.createHeadAnimation(
      informationHeadRef.value,
      informationHeadTitleRef.value,
      informationHeadTextRef.value
    )
  }
}

// 카운트업 애니메이션 함수 (easeOutQuad)
const animateCountUp = (element, start, end, duration, hasPlus) => {
  const startTime = performance.now()
  
  const easeOutQuad = (t) => t * (2 - t)
  
  const animate = (currentTime) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    const easedProgress = easeOutQuad(progress)
    const currentValue = Math.floor(start + (end - start) * easedProgress)
    
    element.textContent = currentValue.toLocaleString() + (hasPlus ? '+' : '')
    
    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      element.textContent = end.toLocaleString() + (hasPlus ? '+' : '')
    }
  }
  
  requestAnimationFrame(animate)
}

// 카운트 Observers 설정
const setupCountObservers = () => {
  // 기존 observers 정리
  countObservers.value.forEach(observer => observer?.disconnect())
  countObservers.value = []

  // 각 카운트 아이템에 대해 개별 observer 생성
  informationCountRefs.value.forEach((item) => {
    if (!item) return

    const emElement = item.querySelector('em')
    if (!emElement) return

    const originalText = emElement.getAttribute('data-target')
    const hasPlus = originalText.includes('+')
    const numberValue = parseInt(originalText.replace(/[^0-9]/g, ''))

    if (isNaN(numberValue)) return

    let lastScrollY = 0
    let isFirstCheck = true
    let isAnimating = false

    const observer = new IntersectionObserver(
      ([entry]) => {
        const currentScrollY = window.scrollY || window.pageYOffset
        const isScrollingDown = currentScrollY > lastScrollY
        const isNearTop = currentScrollY < 100

        if (entry.isIntersecting && (isScrollingDown || isFirstCheck || isNearTop) && !isAnimating) {
          // 카운트업 애니메이션 실행 (1500ms = 1.5초)
          isAnimating = true
          animateCountUp(emElement, 0, numberValue, 1500, hasPlus)
          // 애니메이션 완료 후 플래그 리셋 (1.5초 후)
          setTimeout(() => {
            isAnimating = false
          }, 1500)
          isFirstCheck = false
        } else if (!entry.isIntersecting && !isScrollingDown) {
          // 스크롤 업으로 화면 밖으로 나가면 카운터 리셋
          emElement.textContent = '0' + (hasPlus ? '+' : '')
          isFirstCheck = true
        }

        lastScrollY = currentScrollY
      },
      {
        threshold: 0.1,
        rootMargin: '-10%'
      }
    )

    observer.observe(item)
    countObservers.value.push(observer)
  })
}

onBeforeUpdate(() => {
  informationCountRefs.value = []
})

onMounted(() => {
  setupHeadAnimation()
  setupCountObservers()
})

onBeforeUnmount(() => {
  // Head observer 정리
  if (headObserver) {
    headObserver.disconnect()
    headObserver = null
  }
  
  // 카운트 observers 정리
  countObservers.value.forEach(observer => observer?.disconnect())
  countObservers.value = []
})
</script>

<style lang="scss" scoped>
.aboutus-information {

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
      @include headline-02;
      transform: translateY(30px);
      opacity: 0;
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;

      .title-br {
        display: block;

        @include tablet {
          display: none;
        }
      }
    }

    &-text {
      margin-top: rem(8);
      word-break: keep-all;
      overflow-wrap: anywhere;
      @include body-02;
      transform: translateY(30px);
      opacity: 0;
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }

    // active 상태
    &.active {
      .aboutus-information__head-title {
        opacity: 1;
        transform: translateY(0);
        transition-delay: 0s;
      }

      .aboutus-information__head-text {
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

      .info-br {
        display: block;
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
      font-size: rem(24);
      font-weight: 700;
      line-height: 1.4;

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

        font-size: rem(21);
        line-height: 1.2;

        &::after {
          display: none;
        }
      }

      @include desktop {
        padding: rem(24);

        @include sub-headline-01;
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
        line-height: 1.4;

        @include tablet {
          font-size: rem(8);

          .info-br {
            display: none;
          }
        }

        @include desktop {
          @include body-03;
        }
      }

      em {
        margin-top: rem(20);
        font-weight: 700;
        font-style: normal;
        text-align: center;
        font-size: rem(36);

        @include tablet {
          margin-top: 0;
        }


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
</style>