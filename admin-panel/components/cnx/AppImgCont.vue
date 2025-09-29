<template>
  <div class="app-img-cont" :class="{ 'reverse': reverse }">
    <!-- 텍스트 컨텐츠 -->
    <div class="text-content">
      <h3 v-if="title" class="subtitle" v-html="title"></h3>
      <p v-if="text" class="description" v-html="text"></p>
    </div>
    
    <!-- 이미지 컨텐츠 -->
    <div class="image-content">
      <picture>
        <source 
          v-if="desktopImage"
          :srcset="desktopImage" 
          media="(min-width: 1024px)"
        />
        <source 
          v-if="tabletImage"
          :srcset="tabletImage" 
          media="(min-width: 768px)"
        />
        <img 
          :src="mobileImage || desktopImage" 
          :alt="imageAlt || title || 'Image'"
          class="content-image"
        />
      </picture>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { findResponsiveImagePaths } from '~/utils/cnx/image-utils'

// Props 정의
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  },
  imageName: {
    type: String,
    default: ''
  },
  imageAlt: {
    type: String,
    default: ''
  },
  reverse: {
    type: Boolean,
    default: false
  }
})

// 템플릿에서 사용할 변수들
const title = props.title
const text = props.text
const imageAlt = props.imageAlt
const reverse = props.reverse

const route = useRoute()
const baseImagePath = `/assets/cnx${route.path}`

// 반응형 이미지 경로들
const desktopImage = ref('')
const mobileImage = ref('')
const tabletImage = ref('')

// 이미지 경로 초기화
onMounted(() => {
  if (props.imageName) {
    // 유틸 함수를 사용하여 반응형 이미지 경로들 생성
    const imagePaths = findResponsiveImagePaths(props.imageName, baseImagePath)
    desktopImage.value = imagePaths.desktopImage
    mobileImage.value = imagePaths.mobileImage
    tabletImage.value = imagePaths.tabletImage
  }
})
</script>

<style lang="scss" scoped>
@use '~/layouts/scss/cnx.scss' as *;
@use '~/layouts/scss/cnx/_variables' as *;
@use '~/layouts/scss/cnx/_mixins' as *;
@use '~/layouts/scss/cnx/_functions' as *;
@use '~/layouts/scss/cnx/_base' as *;

.app-img-cont {
  display: flex;
  flex-direction: column;
  gap: rem(38);
  margin-bottom: rem(66);

  // 모바일: 상하 배치 (기본)
  @include tablet {
    flex-direction: row;
    align-items: center;
    gap: rem(24);
    margin-bottom: rem(60);
  }

  @include desktop {
    gap: rem(32);
    margin-bottom: rem(120);
  }

  .text-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: rem(24);
    order: 2; // 모바일에서 텍스트를 아래로

    @include tablet {
      order: 1; // 태블릿 이상에서 텍스트를 좌측으로
    }

    @include desktop {
      padding-right: rem(100);
    }

    .subtitle {
      @include sub-headline-02;
      color: $d-black;
      margin: 0;
    }

    .description {
      @include body-02;
      color: $gray-4;
      margin: 0;
      line-height: 1.6;
    }
  }

  // 리버스 옵션일 때 padding 방향 변경
  &.reverse {
    @include tablet {
      flex-direction: row-reverse;
    }

    .text-content {
      @include desktop {
        padding-right: 0;
        padding-left: rem(100);
      }
    }
  }

  .image-content {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    order: 1; // 모바일에서 이미지를 위로

    picture {
      width: 100%;
      height: 100%;
      display: block;
    }

    .content-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    // 모바일: 312/210 비율
    aspect-ratio: 312 / 210;

    @include tablet {
      // 태블릿: 308/231 비율
      aspect-ratio: 308 / 231;
      flex: 1;
      order: 2; // 태블릿 이상에서 이미지를 우측으로
    }

    @include desktop {
      // PC: 644/400 비율
      aspect-ratio: 644 / 400;
      flex: 1;
    }
  }

}
</style>
