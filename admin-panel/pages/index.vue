<template>
  <div class="main-page">
    <!-- 키비주얼 스와이퍼 -->
    <MainKeyVisualSwiper :slides="slides" />
  </div>
</template>

<script setup>
import MainKeyVisualSwiper from '~/components/cnx/MainKeyVisualSwiper.vue'
import { ref } from 'vue'

// 레이아웃 설정
definePageMeta({
  layout: 'concentrix',
})

// 슬라이드 데이터
const slides = ref([
  {
    type: 'video',
    mobileVideo: '/assets/cnx/main/MAIN_KV1_m.mp4',
    desktopVideo: '/assets/cnx/main/MAIN_KV1.mp4',
    imageAlt: 'Main Key Visual Video 1'
  },
  {
    type: 'video',
    mobileVideo: '/assets/cnx/main/MAIN_KV2_m.mp4',
    desktopVideo: '/assets/cnx/main/MAIN_KV2.mp4',
    imageAlt: 'Main Key Visual Video 2',
    title: 'Life at Concentrix',
    description: '우리는 옳은 일을 한다고 믿습니다. 콘센트릭스는 모두가 존중받는 사회를 꿈꾸며 수평적인 조직 문화를 가지고 있습니다.<br>구성원의 다양한 의견과 가치관의 공존을 지향하며 지속 가능한 글로벌 비즈니스를 위해 각 영역의 전문가 집단을 운영합니다.'
  },
  {
    type: 'video',
    mobileVideo: '/assets/cnx/main/MAIN_KV3_m.mp4',
    desktopVideo: '/assets/cnx/main/MAIN_KV3.mp4',
    imageAlt: 'Main Key Visual Video 3',
    title: 'The Futur<br>of CX',
    description: "See how Concentrix is disrupting <br>the moment and rewriting the rules for<br>what's next in CX.",
    button: {
      text: 'Unlock the Future',
      href: 'https://www.concentrix.com/future-of-cx/',
      arrow: true
    }
  },
  {
    type: 'image',
    mobileImage: '/assets/cnx/main/main_slider01_m.png',
    desktopImage: '/assets/cnx/main/main_slider01.png',
    imageAlt: 'Main Key Visual Image',
    title: 'Accelerate<br>CX transformation',
    description: 'with Concentrix Catalyst, the experience<br>design and engineering team of Concentrix.',
    button: {
      text: 'Craft Better CX',
      href: 'https://catalyst.concentrix.com/',
      arrow: true
    }
  }
])
</script>

<style lang="scss" scoped>
.main-page {
  width: 100%;
}
</style>
