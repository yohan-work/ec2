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
          title="Commerce Platform"
          text="SAP Commerce, Adobe Commerce, Shopify, COZE 기반 올인원  Commerce 플랫폼은 클라우드 SaaS Architeture로<br>글로벌 B2B · B2C 비즈니스를 통합 지원하며,멀티브랜드 · 다국가 운영에 최적화된 Headless · Composable 확장성을 제공합니다.<br>또한 자사 SI 전문성과 글로벌 법인 GDC 인력을 통해 맞춤형 구축과 안정적 Roll-out을 지원합니다."/>
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

      <!-- SAP Commerce Cloud 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="SAP Commerce Cloud"
          imageName="sap"
          :reverse="true"
          :listItems="[
            '글로벌 B2B·B2C 비즈니스를 위한 Enterprise Commerce 플랫폼',
            '제품 · 가격 · 주문 · 계정 관리와 ERP · CRM · OMS 연동 지원',
            'Headless·Composable Architecture 기반 멀티브랜드 · 다국가 확장',
            '전문 SI 역량과 글로벌 법인 소속 GDC 인력을 통한 맞춤형 구축 · 글로벌 Roll-out 지원'
          ]"
        />
      </section>

      <!-- Adobe Commerce Cloud 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="Adobe Commerce Cloud"
          imageName="adobe"
          :listItems="[
            '콘텐츠 관리와 Commerce를 통합한 디지털 경험 플랫폼',
            '제품 · 프로모션 · 고객 여정 관리 및 마케팅 자동화 지원',
            'Cloud 기반 Architecture로 유연한 확장성과 빠른 배포 가능',
            '본사와 글로벌 법인 GDC 협업을 통한 대규모 프로젝트 수행 지원'
          ]"
        />
      </section>

      <!-- Shopify 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="Shopify"
          imageName="shopify"
          :reverse="true"
          :listItems="[
            'Cloud SaaS 기반의 글로벌 커머스 플랫폼',
            '빠른 구축, 다양한 앱·마켓플레이스 연동, 다국가 결제 지원',
            'Headless · API 기반 확장으로 스타트업부터 엔터프라이즈까지 대응',
            '글로벌 법인 GDC와 협력한 신속 · 효율적 구축 · 운영 지원'
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

// 레이아웃 설정
definePageMeta({
  layout: 'concentrix'
})

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
