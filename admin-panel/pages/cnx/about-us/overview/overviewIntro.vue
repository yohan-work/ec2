<template>
  <div class="aboutus-intro">
    <video muted autoplay playsinline loop class="aboutus-intro__video pc" aria-label="Concentrix 용산 지사 사무실 내부">
      <source src="/assets/cnx/about-us/overview/aboutus.mp4" type="video/mp4">
    </video>
    <video muted autoplay playsinline loop class="aboutus-intro__video mo" aria-label="Concentrix 용산 지사 사무실 내부">
      <source src="/assets/cnx/about-us/overview/aboutus_m.mp4" type="video/mp4">
    </video>
    <div class="aboutus-intro__content">
      <h2 class="aboutus-intro__title">We're Concentrix.</h2>
      <p class="aboutus-intro__text">
        솔루션과 테크놀로지 중심으로 넓고 깊게 고민합니다.<br>
        마음을 움직이고 시장을 변화시킬 수 있도록 기업의<br>서비스를 설계하고 구축, 운영합니다
      </p>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
  .aboutus-intro {
    position: relative;
    &__video {
      width: 100%;
      aspect-ratio: 624 / 832;
      &.pc {
        display: none;
      }
      &.mo {
        display: block;
      }
      @include tablet {
        aspect-ratio: 132 / 60;
        &.pc {
          display: block;
        }
        &.mo {
          display: none;
        }
      }
    }
    &__content {
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      gap: rem(24);
      inset: 0;
      padding: rem(24);
      color: $d-white;
      word-break: keep-all;
      overflow-wrap: anywhere;
      @include tablet {
        justify-content: center;
        gap: rem(9);
        padding: rem(32);
      }
      @include desktop {
        gap: rem(24);
        left: 50%;
        padding-left: 0;
      }
    }
    &__title {
      @include sub-headline-01;
    }
    &__text {
      @include body-02;
    }
  }
</style>