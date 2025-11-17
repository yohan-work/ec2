<template>
  <!-- Business -->
  <div class="careers-business">

    <component :is="headingLevel" class="careers-business-title" ref="titleRef">{{ title }}</component>

    <div class="careers-business-container">
      <div class="careers-business-group" v-for="(group, groupIndex) in groupedBusinessItems" :key="groupIndex">
        <div class="careers-business-item" v-for="(item, itemIndex) in group" :key="itemIndex"
          :ref="el => setItemRef(el)">
          <strong class="careers-business-item-title" v-html="item.title"></strong>
          <ul class="careers-business-detail">
            <li v-for="detail in item.detail" :key="detail.strong">
              <strong v-html="detail.title"></strong>
              <p v-html="detail.content"></p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref, computed, onBeforeUpdate, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  headingLevel: {
    type: String,
    default: 'h3',
    validator: (value) => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(value)
  },
  title: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
})

const titleRef = ref(null)

const groupedBusinessItems = computed(() => {
  const grouped = []
  const items = props.items
  const groupSize = 3

  for (let i = 0; i < items.length; i += groupSize) {
    grouped.push(items.slice(i, i + groupSize))
  }

  return grouped
})

const itemRefs = ref([])
// 템플릿 ref 설정 함수
const setItemRef = (el) => {
  if (el) {
    itemRefs.value.push(el)
  }
}

onBeforeUpdate(() => {
  itemRefs.value = []
})

// 타이틀용 Observer
let titleObserver = null

// 각 아이템에 대한 Observer 배열
const itemObservers = ref([])

// 타이틀 Observer 설정
const setupTitleObserver = () => {
  if (!titleRef.value) return

  let lastScrollY = 0
  let isFirstCheck = true

  titleObserver = new IntersectionObserver(
    ([entry]) => {
      const currentScrollY = window.scrollY || window.pageYOffset
      const isScrollingDown = currentScrollY > lastScrollY
      const isNearTop = currentScrollY < 100

      if (entry.isIntersecting && (isScrollingDown || isFirstCheck || isNearTop)) {
        titleRef.value.classList.add('active')
        isFirstCheck = false
      } else if (!entry.isIntersecting && !isScrollingDown) {
        titleRef.value.classList.remove('active')
        isFirstCheck = true
      }

      lastScrollY = currentScrollY
    },
    {
      threshold: 0.2,
      rootMargin: '-50px'
    }
  )

  titleObserver.observe(titleRef.value)
}

// 아이템 Observers 설정
const setupItemObservers = () => {
  // 기존 observers 정리
  itemObservers.value.forEach(observer => observer?.disconnect())
  itemObservers.value = []

  // 각 아이템에 대해 개별 observer 생성
  itemRefs.value.forEach((item) => {
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

onMounted(() => {
  setupTitleObserver()
  setupItemObservers()
})

onBeforeUnmount(() => {
  // 타이틀 observer 정리
  if (titleObserver) {
    titleObserver.disconnect()
    titleObserver = null
  }
  
  // 아이템 observers 정리
  itemObservers.value.forEach(observer => observer?.disconnect())
  itemObservers.value = []
})
</script>

<style lang="scss" scoped>
.careers-business {
  padding: rem(50) 0 0;

  @include tablet {
    padding: rem(80) 0 0;
  }

  @include desktop {
    padding: rem(100) 0 0;
  }

  &-title {
    @include sub-headline-01;
    transform: translateY(30px);
    opacity: 0;
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;

    // 타이틀 active 상태
    &.active {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: rem(24);
    margin-top: rem(30);

    @include tablet {
      grid-template-columns: repeat(2, 1fr);
    }

    @include desktop {
      gap: rem(32);
      margin-top: rem(50);
    }
  }

  &-group {
    display: flex;
    flex-direction: column;
    gap: rem(24);

    @include desktop {
      gap: rem(32);
    }
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

    // 각 아이템 active 상태
    &.active {
      opacity: 1;
      transform: translateY(0);
    }

    &-title {
      display: block;
      margin-bottom: rem(24);
      @include body-01;

      @include tablet {
        margin-bottom: rem(40);
      }

      @include desktop {
        margin-bottom: rem(56);
      }
    }
  }



  &-detail {
    display: flex;
    flex-direction: column;
    gap: rem(24);

    strong {
      @include body-02;
      font-weight: 700;
      line-height: 1.4;
    }

    p {
      margin-top: rem(8);
      color: #666;
      word-break: keep-all;
      overflow-wrap: anywhere;
      @include body-03;

      @include tablet {
        margin-top: rem(16);
      }
    }

    @include tablet {
      gap: rem(30);
    }

    @include desktop {
      gap: rem(40);
    }
  }
}
</style>