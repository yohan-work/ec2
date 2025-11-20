<template>
  <div class="commerce-platform-page">
    <!-- 키 비주얼 섹션 -->
    <section class="key-visual-section">
      <AppKeyVisual 
        imageAlt="디지털 기술을 상징하는 푸른빛의 추상적인 배경"
        :animationDuration="1200"
      />
    </section>

    <div class="inner">
      <!-- 타이틀 섹션 -->
      <section class="title-section">
        <AppTitle 
          title="Digital eXperience Platform"
          text="AEM, ION, OutSystems 기반의 Low-code · Headless Architecture로, 글로벌 브랜드의 웹사이트 · 포털 · 앱을 통합 관리하고,<br>멀티사이트 · 현지화 · 번역 · Workflow를 통해 운영 효율성과 일관된 고객 경험을 제공합니다.<br>또한 Commerce · 검색 · DAM · SSO와의 유기적 연동을 통해 디지털 자산과 서비스 전반을 하나의 경험으로 연결합니다."/>
      </section>

      <!-- SAP Commerce Cloud 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="Adobe Experience Manager"
          text="콘센트릭스는 Adobe Experience Manager(AEM)를 기반으로 한 디지털 경험 플랫폼(DXP) 서비스를 제공합니다. 브랜드 일관성과 운영 효율성을 강화하며, 멀티사이트·멀티리전 환경에서의 콘텐츠 통합 관리와 자동화된 워크플로우 운영을 지원합니다."
          imageName="aem"
          :reverse="true"
          :subItems="aemSubItems"
          imageAlt="Adobe Experience Manager 솔루션의 인터페이스"
          :alignTop="true"
        />
      </section>

      <!-- Adobe Commerce Cloud 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="IONACT (국내 CMS 솔루션)"
          text="국내 기업과 공공기관에 최적화된 고성능 CMS 플랫폼 서비스로, 검증된 안정성과 보안성을 기반으로 금융, 공공, 대기업 포털 구축에 강점을 보유하고 있습니다. 표준 컴포넌트와 Design System 기반으로 신속한 구축과 효율적인 유지보수를 지원하며, 고객 맞춤형 CMS 통합 및 현지화 프로젝트 수행을 통해 최적의 디지털 환경을 제공합니다."
          imageName="ionact"
          imageAlt="IONACT 국내 CMS 솔루션의 로고"
        />
      </section>

      <!-- Shopify 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="OutSystems (Low-Code Development Platform)"
          text="콘센트릭스는 OutSystems 기반 Low-Code 개발 플랫폼을 활용하여 복잡한 비즈니스 애플리케이션을 빠르고 효율적으로 개발·배포할 수 있는 환경을 제공합니다. Microservice 및 API 연동 구조를 통해 기존 시스템과의 확장과 통합을 지원하며, 글로벌 GDC 협업체계를 바탕으로 대규모 Agile DX 프로젝트를 수행합니다."
          imageName="outsystems"
          :reverse="true"
          :subItems="outsystemsSubItems"
          imageAlt="OutSystems의 Low-Code 개발 플랫폼 그래픽"
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
              description: 'AEM (Adobe Experience Manager) · ION (국내 CMS 솔루션) · OutSystems (Low-Code Development Platform)' ,
            },
            { 
              id: 2, 
              title: '아키텍처 & 운영', 
              description: 'Headless CMS, Design System / 표준 컴포넌트, Microservice, Low-Code 개발 / 배포' ,
            },
            { 
              id: 3, 
              title: '핵심 기능 & 통합', 
              description: '멀티사이트 / 현지화 / 번역 · 프리뷰 / Workflow, 커머스 · 검색 · DAM · SSO / IAM 연동' ,
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

// Adobe Experience Manager 서브 아이템들
const aemSubItems = computed(() => [
  {
    title: '시스템 아키텍처 설계',
    listItems: [
      'AEM의 Headless·Microservice 구조를 기반으로, 콘텐츠 관리·퍼블리싱·커머스 연동을 통합한 End-to-End DXP 아키텍처를 설계합니다.'
    ]
  },
  {
    title: '콘텐츠 통합 및 자동화',
    listItems: [
      '콘텐츠·마케팅·고객 데이터를 통합 관리하고, 워크플로우 자동화를 통해 운영 효율성과 생산성을 극대화합니다.'
    ]
  },
  {
    title: '글로벌 구축 및 운영',
    listItems: [
      '자사의 SI 전문성과 글로벌 법인 GDC 의 협업 체계를 통해, 대규모 글로벌 사이트의 안정적 구축과 운영을 지원합니다.'
    ]
  },
  {
    title: '확장성과 유연성 확보',
    listItems: [
      'Microservice 기반 구조를 통해 서비스 확장, 신규 채널 연동, 사용자 경험 개선을 빠르고 유연하게 수행할 수 있습니다.'
    ]
  }
])

// OutSystems 서브 아이템들
const outsystemsSubItems = computed(() => [
  {
    title: '시스템 아키텍처 설계',
    listItems: [
      'OutSystems 플랫폼 구조를 기반으로 웹·모바일·엔터프라이즈 시스템을 통합한 엔드투엔드 Low-Code 아키텍처를 설계합니다.'
    ]
  },
  {
    title: '애플리케이션 개발 및 배포',
    listItems: [
      '시각적 개발 환경과 컴포넌트 기반 모델을 활용하여 개발 속도와 품질을 동시에 향상시키고, 자동화된 CI/CD 프로세스로 빠른 배포를 지원합니다.'
    ]
  },
  {
    title: '시스템 연동 및 확장성',
    listItems: [
      'Microservice 및 REST API 를 통해 기존 ERP, CRM 등 백엔드 시스템과의 유연한 연동 및 확장성을 확보합니다.'
    ]
  },
  {
    title: 'Agile 프로젝트 수행 체계',
    listItems: [
      '자사 SI전문인력 및 글로벌 GDC 인력을 기반으로 Agile 방식의 신속한 개발 및 운영을 지원합니다.'
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
