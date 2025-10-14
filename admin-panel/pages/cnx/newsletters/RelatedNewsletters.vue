<template>
  <div v-if="newsletters.length > 0" class="related-newsletters">
    <div class="related-newsletters-container">

      <!-- 제목 -->
      <h2 class="related-newsletters-title">더 많은 뉴스 보기</h2>

      <!-- 뉴스레터 목록 -->
      <ul class="related-newsletters-list">
        <li
          v-for="item in newsletters"
          :key="item.id"
          class="related-newsletters-item"
        >
          <NuxtLink
            :to="`/newsletters/${item.id}`"
            @click="handleNewsletterClick(item.id)"
            class="related-newsletters-link"
          >
            <h3 class="related-newsletters-item-title">
              {{ item.title }}
            </h3>
            <p class="related-newsletters-date">
              {{ formatDate(item.published_at) }}
            </p>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
/**
 * 관련 뉴스레터 목록을 표시하는 컴포넌트
 */

// Props
const props = defineProps({
  newsletters: {
    type: Array,
    required: true,
    default: () => [],
  },
})

// Emits
const emit = defineEmits(['newsletter-click'])

// 날짜 포맷 (한국 시간대로 표시)
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}

// 뉴스레터 클릭 핸들러
const handleNewsletterClick = (newsletterId) => {
  // 현재 스크롤 위치 저장
  const scrollPosition = window.scrollY

  // 세션 스토리지에 저장 (목록 페이지로 돌아갔을 때 사용)
  sessionStorage.setItem(
    'newsletterScrollPosition',
    scrollPosition.toString()
  )
  sessionStorage.setItem('lastClickedNewsletterId', newsletterId.toString())
  sessionStorage.setItem('fromDetailPage', 'true')

  // 부모 컴포넌트에 이벤트 전달
  emit('newsletter-click', newsletterId)
}
</script>

<style lang="scss" scoped>
.related-newsletters {
  &-title {
    font-weight: $font-weight-bold;
    font-size: $font-size-body1-mobile;
    @include tablet {
      font-size: $font-size-sh2-tablet;
    }
    @include desktop {
      font-size: $font-size-sh2-desktop;
    }
  }
  &-list {
    @include tablet {
      margin-top: rem(40);
    }
  }
  &-item {
    border-bottom: rem(1) solid $d-gray;
    &-title {
      font-size: rem(16);
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      line-height: 1.5;
      margin-bottom: rem(8);
      @include tablet {
        font-size: rem(18);
        -webkit-line-clamp: 1;
        line-clamp: 1;
        margin-bottom: 0;
      }
      @include desktop {
        font-size: rem(24);
      }
    }
  }
  &-link {
    display: block;
    padding: rem(32) 0;
    @include tablet {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: rem(24) 0;
      gap: rem(20);
    }
    @include desktop {
      gap: rem(80);
    }
  }
  &-date {
    flex-shrink: 0;
    font-size: $font-size-body2-mobile;
    color: #A2A2A2;
    @include tablet {
      font-size: $font-size-body2-tablet;
    }
    @include desktop {
      font-size: $font-size-body3-desktop;
    }
  }
}
</style>