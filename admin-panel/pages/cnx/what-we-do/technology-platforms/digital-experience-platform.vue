<template>
  <div class="commerce-platform-page">
    <!-- 키 비주얼 섹션 -->
    <section class="key-visual-section">
      <AppKeyVisual 
        imageAlt="digital experience Platform Key Visual"
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

      <!-- SAP Commerce Cloud 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="Adobe Experience Manager"
          imageName="aem"
          :reverse="true"
          :subItems="aemSubItems"
        />
      </section>

      <!-- Adobe Commerce Cloud 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="IONACT (국내 CMS 솔루션)"
          imageName="ionact"
          :subItems="ionactSubItems"
        />
      </section>

      <!-- Shopify 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="OutSystems (Low-Code Development Platform)"
          imageName="outsystems"
          :reverse="true"
          :subItems="outsystemsSubItems"
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
    listItems: [
      '글로벌 선도 기업들이 선택하는 프리미엄 디지털 경험 플랫폼',
      '멀티사이트·현지화·자동화 Workflow로 브랜드 일관성과 운영 효율성 강화',
      'Headless·Microservice Architecture로 빠른 서비스 확장과 옴니채널 경험 제공',
      '자사 SI 전문성과 글로벌 법인 GDC 협업으로 복잡한 글로벌 사이트 구축·운영을 안정적으로 지원'
    ]
  }
])

// IONACT 서브 아이템들
const ionactSubItems = computed(() => [
  {
    listItems: [
      '국내 기업과 공공기관에 최적화된 고성능 CMS 플랫폼',
      '안정성과 보안성이 검증되어 금융·공공·대기업 포털 구축에 강점',
      '표준 컴포넌트·Design System 기반으로 신속한 구축 및 유지보수 지원',
      '고객 맞춤형 CMS 통합과 현지화 프로젝트 수행 지원'
    ]
  }
])

// OutSystems 서브 아이템들
const outsystemsSubItems = computed(() => [
  {
    listItems: [
      'Low-code 기반으로 복잡한 비즈니스 애플리케이션을 빠르고 효율적으로 개발',
      '웹·모바일·Enterprise 시스템까지 아우르는 광범위한 디지털 경험 구현 가능',
      'Microservice·API 연동으로 기존 시스템 확장 및 신기술 접목에 강점',
      '본사 SI 역량과 글로벌 법인 GDC 인력을 통한 Agile 기반 대규모 DX 프로젝트 수행'
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
