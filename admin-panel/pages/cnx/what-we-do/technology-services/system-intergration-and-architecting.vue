<template>
  <div class="commerce-platform-page">
    <!-- 키 비주얼 섹션 -->
    <section class="key-visual-section">
      <AppKeyVisual 
        imageAlt="Commerce Platform Key Visual"
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

      <!-- 특징 섹션 (3개 컬럼) -->
      <section class="features-section">
        <AppCardList 
          :items="[
            { 
              id: 1, 
              title: '범위', 
              description: 'Large-scale B2B / B2C system development & operations, enterprise architecture design' ,
            },
            { 
              id: 2, 
              title: 'Delivery Model', 
              description: 'Onshore & GDC (Global Delivery Center) hybrid' ,
            },
            { 
              id: 3, 
              title: '핵심 역량 & 레퍼런스', 
              description: 'Commerce · DXP · CRM · Data platform Integration, Migration, Global Roll-out <br><br>삼성전자, LG전자, 아모레퍼시픽, LG생활건강, 한국타이어 등 Global Enterprise SI 프로젝트 수행 경험' ,
            }
          ]"
        />
      </section>

      <!-- Architecture Design 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="Architecture Design"
          imageName="ad"
          :reverse="true"
          :subItems="adSubItems"
        />
      </section>

      <!-- Integration Services 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="Integration Services"
          imageName="is"
          :subItems="isSubItems"
        />
      </section>

      <!-- Global Delivery Model & References 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="Global Delivery Model & References"
          imageName="gdmr"
          :reverse="true"
          :subItems="gdmrSubItems"
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
    listItems: [
      '전략 솔루션 Custom Build 시 최적화 Architecture 설계',
      'Best-in-Class 아키텍처링 기술로 생산성·품질 동시 확보',
      'Cloud / On-Prem / Hybrid 아키텍처 설계 경험',
      'Microservice·Headless·Composable 기반 확장성 제공',
      '보안·거버넌스·표준화까지 고려한 Enterprise Architecture'
    ]
  }
])

// Adobe Commerce Cloud 서브 아이템들
const isSubItems = computed(() => [
  {
    listItems: [
      '대규모 SI 프로젝트 경험을 기반으로 Legacy → Cloud Migration 및 Modernization 수행',
      'ERP·CRM·DXP·Commerce 등 이기종 시스템을 API/Middleware로 통합 구축',
      '글로벌 인증(SSO/IAM) 체계와 데이터 파이프라인 Architecture 설계·실행',
      '외부 서비스 및 Enterprise 플랫폼과의 End-to-End 연동 프로젝트 수행'
    ]
  }
])

// Shopify 서브 아이템들
const gdmrSubItems = computed(() => [
  {
    listItems: [
      'Onshore + 글로벌 법인 GDC 하이브리드 모델',
      '영어 소통이 가능한 글로벌 Tech PMO 인력 보유 (HQ와 GDC 간 커뮤니케이션 지원)',
      '24/7 글로벌 대응 가능한 운영 체계',
      '멀티브랜드·다국가Roll-out 지원',
      '삼성전자, LG전자, 아모레퍼시픽, LG생활건강, 한국타이어 등 글로벌 Enterprise SI 프로젝트 경험'
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
