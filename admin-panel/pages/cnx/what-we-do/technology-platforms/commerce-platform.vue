<template>
  <div class="commerce-platform-page">
    <!-- 키 비주얼 섹션 -->
    <section class="key-visual-section">
      <AppKeyVisual 
        imageAlt="사무실에서 편안하게 대화하는 비즈니스 팀원들"
        :animationDuration="1200"
      />
    </section>

    <div class="inner">
      <!-- 타이틀 섹션 -->
      <section class="title-section">
        <AppTitle 
          title="Commerce Platform"
          text="SAP Commerce, Adobe Commerce, Shopify, COZE 기반 올인원  Commerce 플랫폼은 클라우드 SaaS Architeture로<br>글로벌 B2B · B2C 비즈니스를 통합 지원하며,멀티브랜드 · 다국가 운영에 최적화된 Headless · Composable 확장성을 제공합니다.<br>또한 자사 SI 전문성과 글로벌 법인 GDC 인력을 통해 맞춤형 구축과 안정적 Roll-out을 지원합니다."/>
      </section>

      <!-- SAP Commerce Cloud 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="SAP Commerce Cloud"
          text="콘센트릭스는 SAP Commerce Cloud(SAP CC, Hybris)를 기반으로 한 Enterprise Commerce Platform을 제공합니다. Headless·Composable Architecture 기반의 유연한 구조로, 멀티브랜드·멀티리전 비즈니스 확장에 최적화된 커머스 시스템을 구현합니다."
          imageName="sap"
          :reverse="true"
          :subItems="sapSubItems"
          imageAlt="SAP Commerce Cloud의 클라우드 컴퓨팅 로고"
          :alignTop="true"
        />
      </section>

      <!-- Adobe Commerce Cloud 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="Adobe Commerce Cloud"
          text="콘텐츠와 커머스를 통합한 디지털 경험 플랫폼으로, 제품·프로모션·고객 여정 관리와 마케팅 자동화·옴니채널 운영을 지원합니다. Cloud 기반 아키텍처를 통해 유연한 확장성과 빠른 배포가 가능하며, 글로벌 GDC 협업체계로 대규모 프로젝트를 수행합니다."
          imageName="adobe"
          :subItems="adobeSubItems"
          imageAlt="Adobe Commerce Cloud 서비스 흐름 "
          :alignTop="true"
        />
      </section>

      <!-- Shopify 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="Shopify"
          text="SaaS 기반 글로벌 커머스 플랫폼으로, 빠른 구축과 다양한 옴니채널 연동·결제 기능을 지원합니다. Headless API 구조를 기반으로 유연한 확장성과 빠른 배포가 가능하며, 글로벌 GDC 협업체계를 통해 신속하고 효율적인 구축·운영을 지원합니다."
          imageName="shopify"
          :reverse="true"
          :subItems="shopifySubItems"
          imageAlt="Shopify 로고와 쇼핑 관련 다양한 아이콘"
          :alignTop="true"
        />
      </section>

      <!-- 특징 섹션 (3개 컬럼) -->
      <section class="features-section">
        <AppCardList 
          :items="[
            { 
              id: 1, 
              title: '전략 플랫폼', 
              description: 'SAP Commerce · Adobe Commerce · Shopify · COZE (자체 플랫폼)' ,
            },
            { 
              id: 2, 
              title: '적용 범위 & 아키텍처', 
              description: 'B2B / B2C / 하이브리드, 멀티브랜드·다국가(언어/통화), Headless API · Composable · Cloud Scale' ,
            },
            { 
              id: 3, 
              title: '핵심 기능 & 통합', 
              description: '카탈로그 / 가격 / 재고 / 프로모션 · B2B 계정/권한, ERP · PIM · OMS · CRM · 결제 / 세금 · 물류 · 마켓플레이스 연동' ,
            }
          ]"
        />
      </section>
    </div>
  </div>
</template>

<script setup>
import AppKeyVisual from '~/components/cnx/AppKeyVisual.vue'
import AppTitle from '~/components/cnx/AppTitle.vue'
import AppImgCont from '~/components/cnx/AppImgCont.vue'
import AppCardList from '~/components/cnx/AppCardList.vue'
import { computed } from 'vue'

// 레이아웃 설정
definePageMeta({
  layout: 'concentrix'
})

// SAP Commerce Cloud 서브 아이템들
const sapSubItems = computed(() => [
  {
    title: '시스템 아키텍처 설계',
    listItems: [
      'SAP Commerce Cloud의 Headless 구조를 기반으로, 채널별 UI·UX와 백엔드 시스템 간의 연계 방안을 포함한 엔드투엔드 커머스 아키텍처를 설계합니다.'
    ]
  },
  {
    title: '데이터 통합 및 연동',
    listItems: [
      'ERP, CRM, OMS 등 다양한 기업 시스템과의 API·데이터 연동을 통해 주문, 재고, 결제, 정산 등 주요 비즈니스 데이터를 통합 관리합니다.'
    ]
  },
  {
    title: '글로벌 구축 및 롤아웃',
    listItems: [
      '콘센트릭스의 국내 글로벌 전문 인력 및 글로벌 법인(GDC) 을 통해, 국가별 로컬 규제와 환경에 맞춘 맞춤형 구축 및 운영을 지원합니다.'
    ]
  },
  {
    title: '성능 및 확장성 최적화',
    listItems: [
      'Headless·Composable 구조를 기반으로 서비스 성능, 유지보수성, 글로벌 확장성을 지속 개선하며, <b>SLA 기반 안정적 운영 환경</b>을 제공합니다.'
    ]
  }
])

// Adobe Commerce Cloud 서브 아이템들
const adobeSubItems = computed(() => [
  {
    title: '시스템 아키텍처 설계',
    listItems: [
      'Adobe Commerce Cloud(구. 마젠토)와 Adobe Experience Manager(AEM)의 통합 구조를 기반으로, 콘텐츠·커머스·고객 데이터를 연결하는 End-to-End 디지털 경험 아키텍처를 설계합니다.'
    ]
  },
  {
    title: '데이터 통합 및 연동',
    listItems: [
      '제품, 고객, 프로모션 데이터를 ERP·CRM 등과 연동하고, 마케팅 자동화 도구를 통해 실시간 개인화 및 캠페인 운영을 지원합니다.'
    ]
  },
  {
    title: '글로벌 구축 및 롤아웃',
    listItems: [
      '콘센트릭스의 국내 글로벌 전문 기술 인력과 GDC 협업 모델을 통해 북미·유럽·아시아 등 글로벌 지역별 맞춤형 구축 및 운영 지원이 가능합니다.'
    ]
  },
  {
    title: '성능 및 확장성 최적화',
    listItems: [
      'Cloud Native 아키텍처를 통해 트래픽 급증에도 안정적인 성능을 유지하며, 멀티사이트·멀티리전 환경에서의 운영 효율성을 확보합니다.'
    ]
  }
])

// Shopify 서브 아이템들
const shopifySubItems = computed(() => [
  {
    title: '국내 최대 쇼피파이 파트너',
    listItems: [
      '다수의 국내·글로벌 프로젝트 수행 경험을 바탕으로 규모별·산업별 맞춤형 구축 및 운영 신뢰성을 보장합니다.'
    ]
  },
  {
    title: 'UX, 구축, 운영까지 원스탑 서비스',
    listItems: [
      '기획·디자인·개발은 물론, 전환율·CS 대응까지 고려한 통합 운영 서비스를 제공합니다.'
    ]
  }
])

</script>

<style lang="scss" scoped>
.commerce-platform-page {
  * {
    word-break: keep-all;
  }


  .content-section {
    margin-bottom: rem(60);
    
    @include tablet {
      margin-bottom: rem(80);
    }
    
    @include desktop {
      margin-bottom: rem(120);
    }
  }
}
</style>
