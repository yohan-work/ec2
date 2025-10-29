<template>
  <!-- Business -->
  <div class="careers-business">
    <div class="careers-business-group" v-for="(group, groupIndex) in groupedBusinessItems" :key="groupIndex">
      <div class="careers-business-item" v-for="(item, itemIndex) in group" :key="itemIndex" :ref="el => setItemRef(el)">
        <strong class="careers-business-title" v-html="item.title"></strong>
        <ul class="careers-business-detail">
          <li v-for="detail in item.detail" :key="detail.strong">
            <strong v-html="detail.title"></strong>
            <p v-html="detail.content"></p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>

  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  const props = defineProps({
    items: {
      type: Array,
      required: true
    }
  })

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

  let ctx = null

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
            toggleActions: 'play none none none',
            invalidateOnRefresh: true,
            // markers: true
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
  })

  onBeforeUnmount(() => {
    ctx?.revert()
    ctx = null
  })
</script>

<style lang="scss" scoped>
  .careers-business {
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
      @include tablet {
        border-radius: rem(16);
      }
      @include desktop {
        padding: rem(48);
        border-radius: rem(20);
      }
    }

    &-title {
      display: block;
      margin-bottom: rem(24);
      @include sub-headline-01;
      @include desktop {
        margin-bottom: rem(56);
      } 
    }

    &-detail {
      display: flex;
      flex-direction: column;
      gap: rem(24);
      strong {
        @include body-01;
      }
      p {
        margin-top: rem(8);
        color: #666;
        word-break: keep-all;
        overflow-wrap: anywhere;
        @include body-03; 
      }
      @include tablet {
        gap: rem(20);
      }
      @include desktop {
        gap: rem(40);
      }
    }
  }
</style>