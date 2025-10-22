<template>
  <ul class="careers-non-agent" ref="containerRef">
    <li class="careers-non-agent__item" v-for="item in items" :key="item.title" :ref="el => setItemRef(el)">
      <i class="careers-non-agent__icon">
        <img :src="`/assets/cnx/careers/${item.icon}`" :alt="`${item.title} icon`" loading="lazy" />
      </i>
      <div class="careers-non-agent__content">
        <strong v-html="item.title"></strong>
        <p v-html="item.content"></p>
      </div>
    </li>
  </ul>
</template>

<script setup>

  import { ref, onMounted, onUnmounted } from 'vue'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  const props = defineProps({
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
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            initAnimation()
            if (observer) {
              observer.disconnect()
              observer = null
            }
          }
        })
      },
      {
        threshold: 0,
        rootMargin: '0px 0px 2560px 0px',
        root: null
      }
    )
    
    if (containerRef.value) {
      observer.observe(containerRef.value)
    }
  })

  onBeforeUnmount(() => {
    if (observer) {
      observer.disconnect()
    }
    ctx?.revert()
    ctx = null
  })  
</script>

<style lang="scss" scoped>
  .careers-non-agent { 
    display: grid;
    grid-template-columns: 1fr; 
    column-gap: rem(32);
    row-gap: rem(24);
    margin-top: rem(50);

    @include tablet {
      grid-template-columns: repeat(2, 1fr);
      column-gap: rem(32);
      row-gap: rem(50);
    }
    @include desktop {
      grid-template-columns: repeat(4, 1fr);
    }

    &__item {
      transform: translateY(30px);
      opacity: 0;
    }

    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: rem(20);
      aspect-ratio: 3 / 2;
      background-color: #EBEDF0;
      img {
        max-width: rem(120);
      }
    }
    &__content {
      margin-top: rem(24);
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
</style>