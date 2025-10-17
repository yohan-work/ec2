<template>
  <li
    :id="`newsletter-${newsletter.id}`"
    class="newsletter-item"
  >
    <NuxtLink
      :to="`/newsletters/${newsletter.id}`"
      @click="handleNewsletterClick(newsletter.id)"
      class="newsletter-link"
    >
      
      <!-- 뉴스레터 정보 -->
      <div class="newsletter-content">
        <h2 class="newsletter-title">
          {{ newsletter.title }}
        </h2>
        <p class="newsletter-date">
          {{ formatDate(newsletter.published_at) }}
        </p>
      </div>

      <!-- 썸네일 이미지 -->
      <figure class="newsletter-thumbnail">
        <img
          :src="newsletter.thumbnail_image || '/images/default-newsletter-thumbnail.jpg'"
          :alt="newsletter.title"
          @error="handleImageError"
        />
      </figure>

    </NuxtLink>
  </li>
</template>

<script setup>
// Props 정의
const props = defineProps({
  newsletter: {
    type: Object,
    required: true
  }
})

// Emits 정의
const emit = defineEmits(['newsletter-click'])

// 이미지 로딩 실패 시 기본 이미지 표시됩니다.
const handleImageError = (event) => {
  event.target.src = '/images/default-newsletter-thumbnail.jpg'
}

// 날짜 포맷 (YYYY.MM.DD 형태로 출력합니다.)
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

// 게시글 클릭 핸들러
const handleNewsletterClick = (newsletterId) => {
  emit('newsletter-click', newsletterId)
}
</script>

<style lang="scss" scoped>
.newsletter-item {
  &:first-child {
    border-top: rem(1) solid $d-gray;
  }
  .newsletter-link {
    display: flex;
    align-items: center;
    gap: rem(8);
    padding: rem(32) 0;
    border-bottom: rem(1) solid $d-gray;
    transition: all 0.2s ease;
    text-decoration: none;
    color: inherit;
    @include tablet {
      padding: rem(40) 0;
      gap: rem(20);
    }
    @include desktop {
      padding: rem(48) 0;
      gap: rem(100);
    }
  }

  .newsletter-thumbnail {
    flex-shrink: 0;
    border: rem(1) solid $d-gray;
    max-width: rem(128);
    @include tablet {
      max-width: rem(224);
    }
    @include desktop {
      max-width: rem(328);
    }
    img {
      width: 100%;
      height: 100%;
      aspect-ratio: 8 / 5;
      object-fit: cover;
    }
  }

  .newsletter-content {
    flex: 1;
    min-width: 0;

    .newsletter-title {
      font-weight: 500;
      font-size: $font-size-body1-mobile;
      color: #111827;
      margin: 0 0 rem(8) 0;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      @include tablet {
        font-weight: $font-weight-bold;
        font-size: $font-size-sh2-tablet;
      }
      @include desktop {
        font-size: $font-size-sh2-desktop;
      }
    }

    .newsletter-date {
      font-size: $font-size-body2-mobile;
      color: #A2A2A2;
      margin-top: rem(8);
      
      @include tablet {
        font-size: $font-size-body2-tablet;
        margin-top: rem(16);
      }
      
      @include desktop {
        font-size: $font-size-body3-desktop;
        margin-top: rem(24);
      }
    }
  }
}
</style>