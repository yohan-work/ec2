<template>
  <!-- Visual Title -->
  <div class="careers-visual-title" ref="containerRef">
    <picture>
      <source srcset="/assets/cnx/careers/visual-work.png" media="(min-width: 1024px)" />
      <source srcset="/assets/cnx/careers/visual-work_t.png" media="(min-width: 768px)" />
      <img src="/assets/cnx/careers/visual-work_m.png" alt="회의 중 밝게 웃으며 대화하는 두 명의 비즈니스 팀원" ref="imageRef" loading="lazy" />
    </picture>
    <HeadingComponent />
  </div>
</template>

<script setup>

  import { ref, onMounted, onBeforeUnmount, h } from 'vue'

  const props = defineProps({
    headingLevel: {
      type: String,
      default: 'h3',
      validator: (value) => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(value)
    },
    title: {
      type: String,
      required: true
    }
  })

  const HeadingComponent = () => h(
    props.headingLevel,
    {
      class: 'careers-visual-title__title',
      ref: titleRef,
      innerHTML: props.title
    }
  )

  const imageRef = ref(null)
  const titleRef = ref(null)
  const containerRef = ref(null)

  // Container Observer (이미지와 타이틀 동시 애니메이션)
  let containerObserver = null

  // Container Observer 설정
  const setupContainerObserver = () => {
    if (!containerRef.value) return

    let lastScrollY = 0
    let isFirstCheck = true

    containerObserver = new IntersectionObserver(
      ([entry]) => {
        const currentScrollY = window.scrollY || window.pageYOffset
        const isScrollingDown = currentScrollY > lastScrollY
        const isNearTop = currentScrollY < 100

        if (entry.isIntersecting && (isScrollingDown || isFirstCheck || isNearTop)) {
          containerRef.value.classList.add('active')
          isFirstCheck = false
        } else if (!entry.isIntersecting && !isScrollingDown) {
          containerRef.value.classList.remove('active')
          isFirstCheck = true
        }

        lastScrollY = currentScrollY
      },
      {
        threshold: 0.2,
        rootMargin: '-50px'
      }
    )

    containerObserver.observe(containerRef.value)
  }

  onMounted(() => {
    setupContainerObserver()
  })

  onBeforeUnmount(() => {
    if (containerObserver) {
      containerObserver.disconnect()
      containerObserver = null
    }
  })

</script>

<style lang="scss" scoped>
  .careers-visual-title { 
    position: relative;
    overflow: hidden;
    picture {
      display: block;
      aspect-ratio: 312 / 152;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: scale(1.2);
      transition: transform 0.6s ease-out;
    }
    @include tablet {
      picture {
        aspect-ratio: 640 / 310;
      }
    }
    @include desktop {
      picture {
        aspect-ratio: 1320 / 640;
      }
    }

    // active 상태: 이미지와 타이틀 동시 애니메이션
    &.active {
      img {
        transform: scale(1);
      }

      .careers-visual-title__title {
        opacity: 1;
        transform: translateY(0);
      }
    }

    &__title {
      position: absolute;
      top: rem(16);
      left: rem(12);
      color: #fff;
      transform: translateY(30px);
      opacity: 0;
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      @include sub-headline-02;
      @include tablet {
        top: rem(32);
        left: rem(24);
      }
      @include desktop {
        top: rem(60);
        left: rem(44);
      }

      :deep(span) {
        @include body-01;
      }
    }
  }
</style>