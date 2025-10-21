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
      '글로벌 B2B·B2C 비즈니스를 위한 Enterprise Commerce 플랫폼',
      '제품 · 가격 · 주문 · 계정 관리와 ERP · CRM · OMS 연동 지원',
      'Headless·Composable Architecture 기반 멀티브랜드 · 다국가 확장',
      '전문 SI 역량과 글로벌 법인 소속 GDC 인력을 통한 맞춤형 구축 · 글로벌 Roll-out 지원'
    ]
  }
])

// Adobe Commerce Cloud 서브 아이템들
const isSubItems = computed(() => [
  {
    listItems: [
      '콘텐츠 관리와 Commerce를 통합한 디지털 경험 플랫폼',
      '제품 · 프로모션 · 고객 여정 관리 및 마케팅 자동화 지원',
      'Cloud 기반 Architecture로 유연한 확장성과 빠른 배포 가능',
      '본사와 글로벌 법인 GDC 협업을 통한 대규모 프로젝트 수행 지원'
    ]
  }
])

// Shopify 서브 아이템들
const gdmrSubItems = computed(() => [
  {
    listItems: [
      'Cloud SaaS 기반의 글로벌 커머스 플랫폼',
      '빠른 구축, 다양한 앱·마켓플레이스 연동, 다국가 결제 지원',
      'Headless · API 기반 확장으로 스타트업부터 엔터프라이즈까지 대응',
      '글로벌 법인 GDC와 협력한 신속 · 효율적 구축 · 운영 지원'
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
