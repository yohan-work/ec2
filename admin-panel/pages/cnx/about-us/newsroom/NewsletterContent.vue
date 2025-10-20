<template>
  <article class="newsletter-article">
    <!-- 헤더 -->
    <div class="newsletter-header">
      <!-- 제목 -->
      <h1 class="newsletter-title">
        {{ newsletter.title }}
      </h1>

      <!-- 작성일 -->
      <p class="newsletter-date">
        {{ formatDate(newsletter.published_at) }}
      </p>
    </div>

    <!-- 본문 -->
    <div class="newsletter-body">
      <!-- 본문 이미지(Optional)-->
      <figure v-if="newsletter.body_image" class="newsletter-hero-image">
        <img
          :src="newsletter.body_image"
          :alt="newsletter.title"
          @error="handleImageError"
        />
      </figure>

      <!-- 소제목(Optional)-->
      <h3 v-if="newsletter.subtitle" class="newsletter-subtitle">
        {{ newsletter.subtitle }}
      </h3>

      <!-- 본문 내용 -->
      <div v-html="newsletter.body_html"></div>
    </div>
  </article>
</template>

<script setup>
/**
 * 뉴스레터 본문 내용을 표시하는 컴포넌트
 */

// Props
const props = defineProps({
  newsletter: {
    type: Object,
    required: true,
  },
})

// 날짜 포맷 (한국 시간대로 표시)
const formatDate = dateString => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}

// 이미지 에러 핸들러
const handleImageError = event => {
  console.warn('이미지 로드 실패:', event.target.src)
  // 필요시 기본 이미지로 대체하거나 이미지를 숨김 처리
  event.target.style.display = 'none'
}
</script>

<style lang="scss" scoped>
.newsletter {
  &-article {
    margin-top: rem(16);
    @include tablet {
      margin-top: rem(80);
    }
    @include desktop {
      margin-top: rem(120);
    }
  }

  &-header {
    border-bottom: rem(1) solid $d-gray;
    padding-bottom: rem(16);
    margin-bottom: rem(16);
    @include tablet {
      padding-bottom: rem(40);
      margin-bottom: rem(40);
    }
    @include desktop {
      padding-bottom: rem(48);
      margin-bottom: rem(48);
    }
  }

  &-title {
    font-weight: $font-weight-bold;
    font-size: $font-size-sh2-mobile;
    margin-bottom: rem(24);
    @include tablet {
      font-size: $font-size-sh1-tablet;
      margin-bottom: rem(16);
    }
    @include desktop {
      font-size: $font-size-sh1-desktop;
      margin-bottom: rem(24);
    }
  }

  &-subtitle {
    font-weight: $font-weight-bold;
    font-size: rem(16);
    margin-bottom: rem(14);
    @include tablet {
      font-size: rem(34);
      margin-bottom: rem(17);
    }
    @include desktop {
      font-size: rem(24);
      margin-bottom: rem(24);
    }
    color: #003366;
  }

  &-date {
    font-size: $font-size-body2-mobile;
    color: $gray-1;
    @include tablet {
      font-weight: $font-weight-bold;
      font-size: $font-size-body1-tablet;
    }
    @include desktop {
      font-weight: $font-weight-regular;
      font-size: $font-size-body2-desktop;
    }
  }

  &-hero-image {
    width: 100%;
    height: 100%;
    margin-bottom: rem(16);
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      margin: 0 auto;
    }
    @include tablet {
      margin-bottom: rem(40);
      border: 0;
    }
    @include desktop {
      margin-bottom: rem(48);
    }
  }

  &-body {
    margin-bottom: rem(48);
    @include tablet {
      margin-bottom: rem(80);
    }
    @include desktop {
      margin-bottom: rem(200);
    }
  }
}
</style>
