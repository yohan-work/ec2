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
            <AppButton effect="left" to="/about-us/newsroom" text="목록 보기">
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

// 컴포넌트 import
import NewsletterContent from './NewsletterContent.vue'
import RelatedNewsletters from './RelatedNewsletters.vue'
import AppButton from '~/components/cnx/AppButton.vue'
import { ref, computed, watch } from 'vue'
import {
  useRoute,
  useRuntimeConfig,
  useAsyncData,
  useHead,
  showError,
  createError,
} from '#app'

const route = useRoute()
const config = useRuntimeConfig()
const useDummy = config.public.useDummy

// 스크롤 위치 관리
const lastClickedNewsletterId = ref(null)

// 상수 정의
const NEWSLETTER_META_CONSTANTS = {
  OG_IMAGE: '/assets/cnx/share/concentrix-share.png',
  TITLE_SUFFIX: ' - Concentrix',
  DESCRIPTION_MAX_LENGTH: 160,
}

// HTML에서 첫 번째 문단 추출
const getFirstParagraph = htmlContent => {
  if (!htmlContent) return ''
  const pMatch = htmlContent.match(/<p[^>]*>(.*?)<\/p>/i)
  if (pMatch) {
    const textContent = pMatch[1].replace(/<[^>]*>/g, ' ')
    const cleanText = textContent.replace(/\s+/g, ' ').trim()
    return cleanText.length > NEWSLETTER_META_CONSTANTS.DESCRIPTION_MAX_LENGTH
      ? cleanText.substring(
          0,
          NEWSLETTER_META_CONSTANTS.DESCRIPTION_MAX_LENGTH
        ) + '...'
      : cleanText
  }
  const textContent = htmlContent.replace(/<[^>]*>/g, ' ')
  const cleanText = textContent.replace(/\s+/g, ' ').trim()
  const firstSentence = cleanText.split(/[.!?]/)[0]
  return firstSentence.length > NEWSLETTER_META_CONSTANTS.DESCRIPTION_MAX_LENGTH
    ? firstSentence.substring(
        0,
        NEWSLETTER_META_CONSTANTS.DESCRIPTION_MAX_LENGTH
      ) + '...'
    : firstSentence
}

const { data, error, loading } = await useAsyncData(
  `newsletter-page-${route.params.id}`,
  async () => {
    const newsletterId = route.params.id
    let fetchedNewsletter = null
    let fetchedRelated = []

    // 1. 메인 뉴스레터 조회
    try {
      if (useDummy) {
        // === 더미 데이터 로직 ===
        const response = await $fetch('/data/newsletters-dummy.json')
        const found = response.data.find(item => item.id == newsletterId)

        if (!found) {
          throw createError({
            statusCode: 404,
            message: '뉴스레터를 찾을 수 없습니다.',
            fatal: true,
          })
        }

        fetchedNewsletter = {
          ...found,
          created_at: found.published_at,
          updated_at:
            found.id === 25 ? '2025-09-19T19:35:00+09:00' : found.published_at,
        }
      } else {
        // === DB 연결 로직 ===
        const response = await $fetch(`/api/public/newsletters/${newsletterId}`)
        fetchedNewsletter = response.data
      }
    } catch (err) {
      console.error('뉴스레터 조회 실패:', err)
      if (err.statusCode === 404) {
        throw createError({
          statusCode: 404,
          message: '뉴스레터를 찾을 수 없습니다.',
          fatal: true,
        })
      } else {
        throw createError({
          statusCode: 500,
          message: '뉴스레터를 불러올 수 없습니다.',
          fatal: true,
        })
      }
    }

    // 2. 관련 뉴스레터 조회 (메인 뉴스레터 조회가 성공한 경우에만)
    if (fetchedNewsletter) {
      try {
        if (useDummy) {
          // === 더미 데이터 로직 ===
          const response = await $fetch('/data/newsletters-dummy.json')
          const currentDate = new Date(fetchedNewsletter.published_at)
          const allNewsletters = response.data.filter(
            item => item.id != newsletterId
          )

          const olderNewsletters = allNewsletters
            .filter(item => new Date(item.published_at) < currentDate)
            .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
          const newerNewsletters = allNewsletters
            .filter(item => new Date(item.published_at) >= currentDate)
            .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))

          const result = []
          const maxCount = 5
          for (
            let i = 0;
            i < olderNewsletters.length && result.length < maxCount;
            i++
          ) {
            result.push(olderNewsletters[i])
          }
          for (
            let i = 0;
            i < newerNewsletters.length && result.length < maxCount;
            i++
          ) {
            result.push(newerNewsletters[i])
          }
          fetchedRelated = result
        } else {
          // === DB 연결 로직 ===
          const response = await $fetch('/api/public/newsletters/related', {
            query: { id: newsletterId, limit: 5 },
          })
          fetchedRelated = response.data
        }
      } catch (err) {
        console.error('관련 뉴스레터 조회 실패:', err)
        fetchedRelated = [] // 관련 뉴스레터는 실패해도 페이지 오류는 아님
      }
    }

    // useAsyncData는 반환된 객체를 data ref에 담아줍니다.
    return {
      newsletter: fetchedNewsletter,
      relatedNewsletters: fetchedRelated,
    }
  }
)

if (error.value) {
  showError(error.value)
}

// data ref에서 실제 데이터를 추출합니다. computed를 사용하면 data.value가 null일 때를 안전하게 처리할 수 있습니다.
const newsletter = computed(() => data.value?.newsletter)
const relatedNewsletters = computed(() => data.value?.relatedNewsletters || [])

// ---
// ---
useHead(() => {
  // 데이터가 아직 없거나 오류가 발생한 경우를 대비
  if (!newsletter.value) {
    return {
      title: '뉴스레터' + NEWSLETTER_META_CONSTANTS.TITLE_SUFFIX,
    }
  }

  const pageTitle = `${newsletter.value.title}${NEWSLETTER_META_CONSTANTS.TITLE_SUFFIX}`
  const pageDescription = getFirstParagraph(newsletter.value.body_html)

  return {
    title: pageTitle,
    meta: [
      { name: 'description', content: pageDescription },
      { name: 'twitter:description', content: pageDescription },
      { name: 'twitter:image', content: NEWSLETTER_META_CONSTANTS.OG_IMAGE },
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: pageDescription },
      { property: 'og:image', content: NEWSLETTER_META_CONSTANTS.OG_IMAGE },
    ],
  }
})

// 관련 뉴스레터 클릭 핸들러
const handleRelatedNewsletterClick = newsletterId => {
  lastClickedNewsletterId.value = newsletterId
}

// 날짜 포맷
const formatDate = dateString => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}
</script>

<style lang="scss" scoped>
.newsletter {
  margin-bottom: rem(100);
  @include tablet {
    margin-bottom: rem(160);
  }
  @include desktop {
    margin-bottom: rem(200);
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
