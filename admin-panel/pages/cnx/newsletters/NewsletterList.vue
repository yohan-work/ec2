<template>
  <div>
    <!-- 로딩 상태 -->
    <!-- <div v-if="loading" class="text-center py-12">
      <p>뉴스레터를 불러오는 중...</p>
    </div> -->

    <!-- 뉴스레터 목록 -->
    <ul v-if="newsletters.length > 0">
      <NewsLetterItem
        v-for="newsletter in newsletters"
        :key="newsletter.id"
        :newsletter="newsletter"
        @newsletter-click="handleNewsletterClick"
      />
    </ul>

    <!-- 빈 상태 -->
    <div v-else class="text-center py-12">
      <h3 class="mt-2 text-sm font-medium text-gray-900">
        뉴스레터가 없습니다
      </h3>
      <p class="mt-1 text-sm text-gray-500">
        아직 발행된 뉴스레터가 없습니다.
      </p>
    </div>
  </div>
</template>

<script setup>

import NewsLetterItem from './NewsLetterItem.vue'

// Props 정의
const props = defineProps({
  newsletters: {
    type: Array,
    required: true,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

// Emits 정의
const emit = defineEmits(['newsletter-click'])

// 뉴스레터 클릭 핸들러
const handleNewsletterClick = (newsletterId) => {
  emit('newsletter-click', newsletterId)
}
</script>