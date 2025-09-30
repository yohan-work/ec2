<template>
  <div class="contents-and-design">
    <swiper
      :slidesPerView="auto"
      :freeMode="true"
      :mousewheel="true"
      :pagination="{
        clickable: true,
      }"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 4</swiper-slide>
      <swiper-slide>Slide 5</swiper-slide>
      <swiper-slide>Slide 6</swiper-slide>
    </swiper>
    <AppTitle 
    title="Concentrix <br>interactive <br>eXperience" 
    text="CiX(Concentrix interactive eXperience)는 콘센트릭스 내에서 <br>UX/UI와 Contents 제작을 전담하는 Creative 조직입니다."
    />
  </div>
</template>

<script setup>
import AppTitle from '~/components/cnx/AppTitle.vue';
import AppKeyVisual from '~/components/cnx/AppKeyVisual.vue';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode, Pagination, Mousewheel } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// 레이아웃 설정
definePageMeta({
  layout: 'concentrix'
});

// Swiper 모듈 설정
const modules = [FreeMode, Pagination, Mousewheel];

</script>

<style lang="scss" scoped>
@use '~/layouts/scss/cnx.scss' as *;
@use '~/layouts/scss/cnx/_variables' as *;
@use '~/layouts/scss/cnx/_mixins' as *;
@use '~/layouts/scss/cnx/_functions' as *;
@use '~/layouts/scss/cnx/_base' as *;

.contents-and-design {
  .mySwiper {
    width: 100%;
    margin: 2rem 0;
    
    .swiper-slide {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f5f5f5;
      border-radius: 8px;
      font-size: 1.2rem;
      color: #333;
    }
  }
}
.inner {
  margin: 0 auto;
}
</style>