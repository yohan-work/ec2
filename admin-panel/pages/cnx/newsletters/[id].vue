<template>
  <div>
    <!-- 메인 콘텐츠 -->
    <main>
      <div class="newsletter">
        <div class="inner">

          <!-- 뉴스레터 내용 -->
          <NewsletterContent v-if="newsletter" :newsletter="newsletter" />

          <!-- 관련 뉴스레터 -->
          <RelatedNewsletters
            v-if="relatedNewsletters.length"
            :newsletters="relatedNewsletters"
            @newsletter-click="handleRelatedNewsletterClick"
          />

          <!-- 더보기 버튼 -->
          <div class="newsletter-load-more">
            <AppButton effect="left" to="/newsletters" text="목록 보기">
            </AppButton>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// 레이아웃 설정
definePageMeta({
  layout: 'concentrix',
})

/**
 * 뉴스레터 상세 페이지
 *
 * === dummy data ===
 * for seungjoo Park
 * 실제 DB 연결 로직은 주석처리되어 있으며, 별도로 백업해두었습니다.
 * /public/data/newsletters-dummy.json 파일을 사용합니다.
 *
 */

// 컴포넌트 import (같은 폴더에 있으므로 자동 import되지만 명시적으로 추가)
import NewsletterContent from './NewsletterContent.vue'
import RelatedNewsletters from './RelatedNewsletters.vue'
import AppButton from '~/components/cnx/AppButton.vue'

const route = useRoute()
const newsletterId = route.params.id

// 환경 설정
const config = useRuntimeConfig()
const useDummy = config.public.useDummy

// 상태 관리
const newsletter = ref(null)
const loading = ref(true)
const error = ref(null)
const relatedNewsletters = ref([])

// 스크롤 위치 관리
const lastClickedNewsletterId = ref(null)

// 뉴스레터 조회
const fetchNewsletter = async () => {
  try {
    loading.value = true
    error.value = null

    if (useDummy) {
      // === 더미 데이터 로직 ===
      const response = await $fetch('/data/newsletters-dummy.json')
      const foundNewsletter = response.data.find(
        item => item.id == newsletterId
      )

      if (!foundNewsletter) {
        error.value = '뉴스레터를 찾을 수 없습니다.'
        return
      }

      // 더미 데이터에 추가 필드 보완
      newsletter.value = {
        ...foundNewsletter,
        created_at: foundNewsletter.published_at,
        updated_at:
          foundNewsletter.id === 25
            ? '2025-09-19T19:35:00+09:00'
            : foundNewsletter.published_at,
      }
    } else {
      // === DB 연결 로직 ===
      const response = await $fetch(`/api/public/newsletters/${newsletterId}`)
      newsletter.value = response.data
    }

    // 뉴스레터 조회 성공 시 관련 뉴스레터도 가져오기
    await fetchRelatedNewsletters()
  } catch (err) {
    console.error('뉴스레터 조회 실패:', err)
    if (err.statusCode === 404) {
      error.value = '뉴스레터를 찾을 수 없습니다.'
    } else {
      error.value = '뉴스레터를 불러올 수 없습니다.'
    }
  } finally {
    loading.value = false
  }
}

// 관련 뉴스레터 조회 (과거 기사 우선, 부족 시 최신 기사로 보완)
const fetchRelatedNewsletters = async () => {
  try {
    if (useDummy) {
      // === 더미 데이터 로직 ===
      const response = await $fetch('/data/newsletters-dummy.json')

      // 현재 뉴스레터의 날짜
      const currentDate = new Date(newsletter.value.published_at)

      // 현재 뉴스레터 제외
      const allNewsletters = response.data.filter(
        item => item.id != newsletterId
      )

      // 과거 기사와 최신 기사로 분리
      const olderNewsletters = allNewsletters
        .filter(item => new Date(item.published_at) < currentDate)
        .sort((a, b) => new Date(b.published_at) - new Date(a.published_at)) // 상대적 최신순 (오래된 것 중 가장 최신)

      const newerNewsletters = allNewsletters
        .filter(item => new Date(item.published_at) >= currentDate)
        .sort((a, b) => new Date(b.published_at) - new Date(a.published_at)) // 최신순

      // 과거 기사를 우선으로 채우고, 부족하면 최신 기사로 보완
      const result = []
      const maxCount = 5

      // 과거 기사 먼저 추가
      for (
        let i = 0;
        i < olderNewsletters.length && result.length < maxCount;
        i++
      ) {
        result.push(olderNewsletters[i])
      }

      // 제일 오래된 게시글 접근 시 최신 기사로 보완
      for (
        let i = 0;
        i < newerNewsletters.length && result.length < maxCount;
        i++
      ) {
        result.push(newerNewsletters[i])
      }

      relatedNewsletters.value = result
    } else {
      // === DB 연결 로직 ===
      const response = await $fetch('/api/public/newsletters/related', {
        query: {
          id: newsletterId,
          limit: 5,
        },
      })
      relatedNewsletters.value = response.data
    }
  } catch (err) {
    console.error('관련 뉴스레터 조회 실패:', err)
    // 관련 뉴스레터는 실패해도 메인 콘텐츠에 영향 없도록 빈 배열 유지
    relatedNewsletters.value = []
  }
}

// 날짜 포맷 (한국 시간대로 표시)
const formatDate = dateString => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}

// 관련 뉴스레터 클릭 핸들러
const handleRelatedNewsletterClick = newsletterId => {
  lastClickedNewsletterId.value = newsletterId
}

// HTML에서 텍스트 추출하여 요약 생성
const getTextSummary = htmlContent => {
  if (!htmlContent) return ''

  // HTML 태그 제거
  const textContent = htmlContent.replace(/<[^>]*>/g, ' ')
  // 연속된 공백 정리
  const cleanText = textContent.replace(/\s+/g, ' ').trim()
  // 120자로 제한하고 말줄임표 추가
  return cleanText.length > 120
    ? cleanText.substring(0, 120) + '...'
    : cleanText
}

// 컴포넌트 마운트 시 데이터 로드
onMounted(() => {
  fetchNewsletter()
})

// 메타 태그
useHead({
  title: () => (newsletter.value ? newsletter.value.title : '뉴스레터'),
  meta: [
    {
      name: 'description',
      content: () =>
        newsletter.value
          ? newsletter.value.body_html
              .replace(/<[^>]*>/g, '')
              .substring(0, 160) + '...'
          : '뉴스레터 상세 내용',
    },
  ],
})
</script>

<style lang="scss" scoped>
@use '~/layouts/scss/cnx.scss' as *;
@use '~/layouts/scss/cnx/_variables' as *;
@use '~/layouts/scss/cnx/_mixins' as *;
@use '~/layouts/scss/cnx/_functions' as *;

.newsletter {
  .inner {
    width: min(calc(100% - rem(48)), rem(1320));
    margin: 0 auto rem(200);
  }
  .newsletter-load-more {
    text-align: center;
    margin: rem(60) 0 rem(100);
    @include tablet {
      margin: rem(80) 0 rem(160);
    }
    @include desktop {
      margin: rem(120) 0 rem(200);
    }
  }
}

/* Line clamp utility */
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  line-height: 1.5;
}
</style>
