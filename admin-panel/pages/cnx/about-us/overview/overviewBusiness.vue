<template>
  <!-- business -->
  <div class="aboutus-business">
    
    <div class="aboutus-business__head" ref="businessHeadRef">
      <h2 class="aboutus-business__head-title" ref="businessHeadTitleRef">Business area</h2>
      <p class="aboutus-business__head-text" ref="businessHeadTextRef">
        콘센트릭스는 디지털 마케팅/이커머스 전 영역(전략/UX/디자인/운영/구축/분석)에 대한<br>Total End-to-End 서비스를 제공하고 있습니다
      </p>
    </div>
    <div class="aboutus-business__group">
      <div class="aboutus-business__grid" v-for="(group, groupIndex) in groupedBusinessItems" :key="groupIndex">
        <div class="aboutus-business__grid-item" v-for="(item, itemIndex) in group" :key="itemIndex" :ref="el => setBusinessItemRef(el)">
          <strong class="aboutus-business__grid-title" v-html="item.title"></strong>
          <ul class="aboutus-business__grid-detail">
            <li v-for="detail in item.detail" :key="detail.strong">
              <strong v-html="detail.title"></strong>
              <p v-for="content in detail.content" :key="content">
                <span v-html="content"></span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>

  import { ref, computed, onMounted, onBeforeUnmount, onBeforeUpdate } from 'vue'

  const props = defineProps({
    businessItems: {
      type: Array,
      required: true
    },
    createHeadAnimation: {
      type: Function
    }
  })

  const businessItems = computed(() => props.businessItems)
  const businessItemRefs = ref([])
  const businessHeadRef = ref(null)
  const businessHeadTitleRef = ref(null)
  const businessHeadTextRef = ref(null)


  // business item ref 설정 함수
  const groupedBusinessItems = computed(() => {
    const grouped = []
    const items = businessItems.value
    const groupSize = 3 
    
    for (let i = 0; i < items.length; i += groupSize) {
      grouped.push(items.slice(i, i + groupSize))
    }
    
    return grouped
  })

  const setBusinessItemRef = (el) => {
    if (el) {
      businessItemRefs.value.push(el)
    }
  }

  // Observers 저장
  let headObserver = null
  const itemObservers = ref([])

  // Head 애니메이션 초기화
  const setupHeadAnimation = () => {
    if (props.createHeadAnimation && businessHeadRef.value) {
      headObserver = props.createHeadAnimation(
        businessHeadRef.value,
        businessHeadTitleRef.value,
        businessHeadTextRef.value
      )
    }
  }

  // 아이템 Observers 설정
  const setupItemObservers = () => {
    // 기존 observers 정리
    itemObservers.value.forEach(observer => observer?.disconnect())
    itemObservers.value = []

    // 각 아이템에 대해 개별 observer 생성
    businessItemRefs.value.forEach((item) => {
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

  onBeforeUpdate(() => {
    businessItemRefs.value = []
  })

  onMounted(() => {
    setupHeadAnimation()
    setupItemObservers()
  })

  onBeforeUnmount(() => {
    // Head observer 정리
    if (headObserver) {
      headObserver.disconnect()
      headObserver = null
    }
    
    // 아이템 observers 정리
    itemObservers.value.forEach(observer => observer?.disconnect())
    itemObservers.value = []
  })

</script>

<style lang="scss" scoped>

  .aboutus-business {

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
        .aboutus-business__head-title {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0s;
        }

        .aboutus-business__head-text {
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

    &__group {
      display: grid;
      grid-template-columns: 1fr;
      gap: rem(24);
      margin-top: rem(24);

      @include tablet {
        grid-template-columns: repeat(2, 1fr);
        margin-top: rem(32);
      }
      @include desktop {
        gap: rem(32);
        margin-top: rem(48);
      }
    }

    &__grid {
      display: flex;
      flex-direction: column;
      gap: rem(24);
      @include desktop {
        gap: rem(32);
      }

      &-item {
        padding: rem(24); 
        background-color: #f7f7f7;
        border-radius: rem(12);
        transform: translateY(30px);
        opacity: 0;
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        
        @include tablet {
          border-radius: rem(16);
        }
        @include desktop {
          padding: rem(48);
          border-radius: rem(20);
        }

        // active 상태
        &.active {
          opacity: 1;
          transform: translateY(0);
        }
      }

      &-title {
        display: block;
        margin-bottom: rem(24);
        @include body-01;
        @include desktop {
          margin-bottom: rem(56);
          @include sub-headline-01;
        } 
      }

      &-detail {
        display: flex;
        flex-direction: column;
        gap: rem(24);
        strong {
          display: block;
          margin-bottom: rem(8);
          @include body-02;
          @include desktop {
            @include body-01;
          }
        }
        p {
          color: #666;
          word-break: keep-all;
          overflow-wrap: anywhere;
          @include body-03;
          &::before {
            padding-right: rem(4);
            content: '•';
          }
        }
        @include tablet {
          gap: rem(20);
        }
        @include desktop {
          gap: rem(40);
        }
      }
    }

  }
</style>