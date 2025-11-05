<template>
  <div class="careers-non-agent">
    <component :is="headingLevel" class="careers-non-agent-title" ref="titleRef">{{ title }}</component>
    <ul class="careers-non-agent-group" ref="containerRef">
      <li class="careers-non-agent-group__item" v-for="item in items" :key="item.title" :ref="el => setItemRef(el)">
        <!-- <i class="careers-non-agent-group__icon">
          <img :src="`/assets/cnx/careers/${item.icon}`" :alt="`${item.alt}`" loading="lazy" />
        </i> -->
        <div class="careers-non-agent-group__content">
          <strong v-html="item.title"></strong>
          <p v-html="item.content"></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>

import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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

const containerRef = ref(null)
const itemRefs = ref([])

const setItemRef = (el) => {
  if (el) {
    itemRefs.value.push(el)
  }
}

let ctx = null
let observer = null
gsap.registerPlugin(ScrollTrigger)

const initAnimation = () => {
  ctx = gsap.context(() => {
    if (itemRefs.value.length === 0) return
    itemRefs.value.forEach(item => {
      if (!item) return

      gsap.fromTo(item, {
        y: 30,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none none'
        }
      })
    })
  })
}

onBeforeUpdate(() => {
  itemRefs.value = []
})

onMounted(() => {
  initAnimation()
  // observer = new IntersectionObserver(
  //   (entries) => {
  //     entries.forEach(entry => {
  //       if (entry.isIntersecting && entry.intersectionRatio > 0) {
  //         initAnimation()
  //         if (observer) {
  //           observer.disconnect()
  //           observer = null
  //         }
  //       }
  //     })
  //   },
  //   {
  //     threshold: 0,
  //     rootMargin: '0px 0px 2560px 0px',
  //     root: null
  //   }
  // )

  // if (containerRef.value) {
  //   observer.observe(containerRef.value)
  // }
})

onBeforeUnmount(() => {
  // if (observer) {
  //   observer.disconnect()
  // }
  ctx?.revert()
  ctx = null
})  
</script>

<style lang="scss" scoped>
.careers-non-agent {

  &-title {
    @include sub-headline-01;
  }

  &-group {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: rem(30);
    margin-top: rem(30);

    @include tablet {
      grid-template-columns: repeat(2, 1fr);
      gap: rem(20);
    }

    @include desktop { 
      margin-top: rem(50);
      row-gap: rem(77);
      column-gap: rem(32);
    }


    &__item {
      transform: translateY(30px);
      opacity: 0;
      padding: rem(24);
      background-color: #f7f7f7;

      @include tablet {
        padding: rem(30);
      }

      @include desktop {
        padding: rem(48);
      }
      
    }

    &__content {
      strong {
        display: block;
        @include body-01;
      }

      p {
        margin-top: rem(16);
        word-break: keep-all;
        overflow-wrap: anywhere;
        @include body-03;
        color: rgba(0, 0, 0, 0.60);
      }
    }

  }
}
</style>