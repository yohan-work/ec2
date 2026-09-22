<template>
  <section ref="containerRef" class="adx-eco" :aria-label="plainTitle || undefined">
    <div class="adx-eco-text">
      <h2
        v-if="title"
        class="adx-eco-title"
        v-html="title"
      ></h2>
      <p v-if="text" class="adx-eco-desc" v-html="text"></p>
      <p v-if="caption" class="adx-eco-caption">{{ caption }}</p>
    </div>

    <div class="adx-eco-visual">
      <picture>
        <source
          v-if="desktopImage"
          :srcset="desktopImage"
          media="(min-width: 1480px)"
        />
        <source
          v-if="tabletImage"
          :srcset="tabletImage"
          media="(min-width: 768px)"
        />
        <img
          :src="mobileImage || desktopImage"
          :alt="imageAlt || plainTitle"
          class="adx-eco-image"
          loading="lazy"
          @load="onImageLoad"
          @error="onImageError"
          ref="imageRef"
        />
      </picture>
      <div
        class="adx-eco-skeleton"
        :class="{ hidden: isImageLoaded }"
      ></div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useIntersectionObserver } from '@vueuse/core'
import { findResponsiveImagePaths } from '~/utils/cnx/image-utils'

const props = defineProps({
  title: { type: String, default: '' },
  text: { type: String, default: '' },
  caption: { type: String, default: '' },
  imageName: { type: String, default: '' },
  imageAlt: { type: String, default: '' },
  imagePath: { type: String, default: '' },
})

const plainTitle = computed(() =>
  props.title ? props.title.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : ''
)

const route = useRoute()
const baseImagePath = props.imagePath || `/assets/cnx${route.path}`

const desktopImage = ref('')
const mobileImage = ref('')
const tabletImage = ref('')

const containerRef = ref(null)
const imageRef = ref(null)
const isImageLoaded = ref(false)
let lastScrollY = 0
let isFirstCheck = true

const onImageLoad = () => {
  isImageLoaded.value = true
}

const onImageError = () => {
  console.error('Image failed to load:', mobileImage.value || desktopImage.value)
}

const checkImageStatus = () => {
  if (!mobileImage.value && !desktopImage.value) {
    isImageLoaded.value = true
    return
  }
  if (imageRef.value?.complete) {
    isImageLoaded.value = true
  }
}

if (props.imageName) {
  const imagePaths = findResponsiveImagePaths(props.imageName, baseImagePath)
  desktopImage.value = imagePaths.desktopImage
  mobileImage.value = imagePaths.mobileImage
  tabletImage.value = imagePaths.tabletImage
}

onMounted(() => {
  checkImageStatus()
})

useIntersectionObserver(
  containerRef,
  ([{ isIntersecting }]) => {
    const currentScrollY = window.scrollY || window.pageYOffset
    const isScrollingDown = currentScrollY > lastScrollY
    const isNearTop = currentScrollY < 100

    if (isIntersecting && (isScrollingDown || isFirstCheck || isNearTop)) {
      containerRef.value?.classList.add('active')
      isFirstCheck = false
    } else if (!isIntersecting && !isScrollingDown) {
      containerRef.value?.classList.remove('active')
      isFirstCheck = true
    }

    lastScrollY = currentScrollY
  },
  {
    threshold: 0.2,
    rootMargin: '-50px',
  }
)
</script>

<style lang="scss" scoped>
.adx-eco {
  display: flex;
  flex-direction: column;
  gap: rem(24);
  margin-bottom: rem(48);
  word-break: keep-all;

  @include tablet {
    flex-direction: row;
    align-items: center;
    gap: rem(24);
    margin-bottom: rem(120);
  }

  @include desktop {
    gap: rem(32);
    margin-bottom: rem(180);
  }

  &-text {
    display: flex;
    flex-direction: column;
    gap: rem(24);
    width: 100%;
    order: 1;

    @include tablet {
      flex: 1 1 0;
      min-width: 0;
      width: 50%;
    }
  }

  &-title {
    @include sub-headline-02;
    margin: 0;
    color: $d-black;
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }

  &-desc {
    @include body-02;
    margin: 0;
    color: $d-black;
    line-height: 1.6;
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }

  &-caption {
    @include body-02;
    margin: 0;
    color: $s-teal;
    line-height: 1.6;
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }

  &-visual {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    overflow: hidden;
    order: 2;
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;

    picture {
      width: 100%;
      height: 100%;
      display: block;
    }

    @include tablet {
      flex: 1 1 0;
      min-width: 0;
      width: 50%;
      order: 2;
    }
  }

  &-image {
    width: 100%;
    object-fit: contain;
  }

  &-skeleton {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $gray-3;
    z-index: 1;
    transition: opacity 0.3s ease-out;

    &.hidden {
      opacity: 0;
      pointer-events: none;
    }
  }

  &.active {
    .adx-eco-visual {
      opacity: 1;
      transform: translateY(0);
    }

    .adx-eco-title {
      opacity: 1;
      transform: translateY(0);
      transition-delay: 0.2s;
    }

    .adx-eco-desc {
      opacity: 1;
      transform: translateY(0);
      transition-delay: 0.3s;
    }

    .adx-eco-caption {
      opacity: 1;
      transform: translateY(0);
      transition-delay: 0.4s;
    }
  }
}
</style>
