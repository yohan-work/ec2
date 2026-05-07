<template>
  <div class="commerce-platform-page">
    <!-- 키 비주얼 섹션 -->
    <section class="key-visual-section">
      <AppKeyVisual 
        imageAlt="디지털 기술을 조작하는 손의 클로즈업"
        :animationDuration="1200"
      />
    </section>

    <div class="inner">
      <!-- 타이틀 섹션 -->
      <section class="title-section">
        <AppTitle 
          title="System Integration & <br>Architecting"
          text="대규모 B2B/B2C 시스템 구축과 Enterprise Architecture 설계를 기반으로, <br>On/Off-shore 하이브리드 모델을 통해 Commerce·DXP·CRM·데이터 플랫폼을 통합하고 <br>글로벌 Roll-out까지 안정적으로 수행합니다."/>
      </section>

      <!-- Architecture Design 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="Architecture Design"
          text="고객 맞춤형 Custom Build 솔루션을 위한 최적화된 시스템 아키텍처를 설계합니다. Best-in-Class 설계 원칙과 최신 기술을 기반으로 생산성과 품질을 확보하며, Cloud·On-Prem·Hybrid 환경에서도 확장 가능한 구조를 제공합니다. 또한 Microservice·Headless·Composable Architecture 기반으로 유연한 서비스 확장과 통합을 실현합니다."
          imageName="ad"
          imageAlt="데이터 센터의 빛나는 서버 랙 시스템"
          :reverse="true"
          :subItems="adSubItems"
          :alignTop="true"
        />
      </section>

      <!-- Integration Services 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="Integration Services"
          text="대규모 SI 프로젝트 경험을 기반으로, Legacy 시스템의 Cloud Migration 및 Modernization을 수행합니다. ERP·CRM·DXP·Commerce 등 다양한 이기종 시스템을 API 및 Middleware를 통해 통합하며, 내외부 서비스와 엔터프라이즈 간 End-to-End 연동 프로젝트를 안정적으로 수행합니다."
          imageName="is"
          imageAlt="통합 서비스를 상징하는 추상적인 디지털 연결망"
          :subItems="isSubItems"
          :alignTop="true"
        />
      </section>

      <!-- Global Delivery Model & References 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="Global Delivery Model & References"
          text="콘센트릭스는 본사 아키텍트 그룹과 GDC 글로벌 인력의 협업체계를 통해 온·오프쇼어가 결합된 하이브리드 수행 모델을 제공합니다. 24/7 대응이 가능한 글로벌 운영 체계를 기반으로, 다국가 Roll-out 및 대규모 DX 프로젝트를 안정적으로 수행합니다."
          imageName="gdmr"
          imageAlt="글로벌 배포 모델을 나타내는 디지털 지구본"
          :reverse="true"
          :subItems="gdmrSubItems"
          :alignTop="true"
        />
      </section>

      <!-- 특징 섹션 (3개 컬럼) -->
      <section class="features-section">
        <AppCardList 
          :items="[
            { 
              id: 1, 
              title: '범위', 
              description: 'Large-scale B2B / B2C system development & operations · enterprise architecture design' ,
            },
            { 
              id: 2, 
              title: 'Delivery Model', 
              description: 'Onshore & GDC (Global Delivery Center) hybrid' ,
            },
            { 
              id: 3, 
              title: '핵심 역량 & 레퍼런스', 
              list: [
                'Commerce · DXP · CRM · Data platform Integration, Migration, Global Roll-out',
                '삼성전자, LG전자, 아모레퍼시픽, LG생활건강, 한국타이어 등 Global Enterprise SI 프로젝트 수행 경험'
              ]
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
const adSubItems = computed(() => [
  {
    title: '시스템 설계 및 구조화',
    listItems: [
      '비즈니스 요구사항을 반영하여 엔드투엔드 구조 및 인터페이스 연동 방식을 설계하고, 자사 아키텍트 그룹의 검증된 프레임워크로 품질과 표준을 확보합니다.'
    ]
  },
  {
    title: '기술 표준화 및 최적화',
    listItems: [
      '모듈화된 설계 표준과 코드 품질 기준을 수립하여 성능·보안·유지보수성을 강화합니다.'
    ]
  },
  {
    title: '클라우드 및 하이브리드 지원',
    listItems: [
      'AWS, Azure, GCP 등 다양한 환경에서 Cloud-Native 및 Hybrid 아키텍처를 지원합니다.'
    ]
  },
  {
    title: '엔터프라이즈 아키텍처 구현',
    listItems: [
      '거버넌스·표준화·확장성을 고려한 Enterprise Architecture Framework를 수립하여 글로벌 시스템의 일관성과 안정성을 확보합니다.'
    ]
  }
])

// Adobe Commerce Cloud 서브 아이템들
const isSubItems = computed(() => [
  {
    title: 'API·Middleware Integration',
    listItems: [
      'ERP, CRM, DXP 간 실시간 데이터 동기화를 통해 운영 효율과 데이터 정합성을 확보합니다.'
    ]
  },
  {
    title: 'Cloud Migration',
    listItems: [
      '온프레미스 시스템의 점진적 전환과 성능 최적화를 위한 이관 전략과 로드맵을 제공합니다.'
    ]
  },
  {
    title: '데이터 파이프라인 설계',
    listItems: [
      '데이터 흐름·보안·처리 규칙을 정의하여 신뢰성 있는 데이터 통합 환경을 구현합니다.'
    ]
  },
  {
    title: '통합보안 아키텍처',
    listItems: [
      'SSO·IAM 기반 인증체계 및 접근제어 정책을 적용해 보안성과 확장성을 강화합니다.'
    ]
  }
])

// Shopify 서브 아이템들
const gdmrSubItems = computed(() => [
  {
    title: 'Hybrid 수행체계',
    listItems: [
      'Onshore-GDC 협업 구조로 효율적인 리소스 배분과 지속적 품질관리를 실현합니다.'
    ]
  },
  {
    title: 'Global Tech PMO 운영',
    listItems: [
      '글로벌 Tech PMO와 현지 수행팀 간 긴밀한 협업을 통해 통합 일정·리스크·품질을 관리합니다.'
    ]
  },
  {
    title: '멀티브랜드·다국가 지원',
    listItems: [
      '멀티사이트·멀티리전 운영이 가능한 글로벌 플랫폼 구축 및 운영 체계를 제공합니다.'
    ]
  },
  {
    title: '주요 레퍼런스',
    listItems: [
      '삼성전자, LG전자, LG생활건강, 아모레퍼시픽, 한국타이어 등 글로벌 엔터프라이즈 고객의 대규모 프로젝트 경험을 보유하고 있습니다.'
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
