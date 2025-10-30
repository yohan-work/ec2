<template>
  <!-- Benefit -->
  <div class="careers-benefit" ref="containerRef">

    <component :is="headingLevel" class="careers-benefit__title" ref="titleRef">{{ title }}</component> 

    <ul class="careers-benefit__content">
      <li class="careers-benefit__item" v-for="(item, index) in items" :key="item.title" :ref="el => setItemRef(el, index)">
        <strong>
          <span v-html="item.title"></span>
          <img :src="`/assets/cnx/careers/${item.icon}`" :alt="`${item.alt}`" loading="lazy">
        </strong>
        <ul class="careers-benefit__list">
          <li v-for="content in item.content" :key="content" v-html="content"></li>
        </ul>
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
  const titleRef = ref(null)
  const itemRefs = ref([])
  
  // 템플릿 ref 설정 함수
  const setItemRef = (el, index) => {
    if (el) {
      itemRefs.value[index] = el
    }
  }
  
  let ctx = null
  let observer = null
  gsap.registerPlugin(ScrollTrigger)

  const initAnimation = () => {
    ctx = gsap.context(() => {
      if (!titleRef.value) return
      gsap.fromTo(titleRef.value, {
        y: 30,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: titleRef.value,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none none'
        }
      })

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
  .careers-benefit {

    &__title {
      padding-bottom: rem(24);
      border-bottom: 1px solid $d-black;
      transform: translateY(30px);
      opacity: 0;
      @include sub-headline-01;

      @include tablet {
        padding-bottom: rem(48);
      }

    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: rem(30);
      margin-top: rem(30);
      @include tablet {
        display: grid;
        grid-template-columns: repeat(2, 1fr); 
        gap: rem(24) rem(50);
        margin-top: rem(48);
      }
      @include desktop {
        grid-template-columns: repeat(4, 1fr);
        gap: rem(32);
        margin-top: 0;
        padding: rem(50) 0; 
      } 
    }

    &__item {
      transform: translateY(30px);
      opacity: 0;
      strong {
        display: flex;
        padding-block: rem(16);
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid $d-black;
        span {
          color: $p-blue;
          @include body-01;
        }
        img {
          width: rem(50);
          aspect-ratio: 1/1;
        }
        @include tablet {
          flex-direction: column;
          align-items: flex-start;
          justify-content: unset;
          gap: 14px;
          padding-block: 0 rem(14);
          :deep(br) {
            display: none;
          }
          img {
            order: -1;
            width: rem(80);
          }
        }
        @include desktop {
          gap: 20px;
          padding-block: 0 rem(20);
          img {
            width: rem(120);
          }
        }
      }
    }

    &__list {
      display: flex;
      flex-direction: column;
      gap: rem(4);
      padding-block: rem(16); 
      li {
        word-break: keep-all;
        overflow-wrap: anywhere;
        @include body-03;
      }
      @include tablet {
        padding-block: rem(14) 0;
      }
      @include desktop {
        gap: rem(8);
        padding-block: rem(20) 0;
      } 
    }

  }
</style>