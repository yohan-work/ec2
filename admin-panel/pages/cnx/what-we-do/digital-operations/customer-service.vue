<template>
  <div class="commerce-platform-page">
    <!-- 키 비주얼 섹션 -->
    <section class="key-visual-section">
      <AppKeyVisual 
        imageAlt="
밤의 도시를 배경으로 태블릿을 사용하는 비즈니스 여성"
        :animationDuration="1200"
      />
    </section>

    <div class="inner">
      <!-- 타이틀 섹션 -->
      <section class="title-section">
        <AppTitle 
          title="Customer Service"
          text="혁신적인 고객 서비스 아웃소싱<br><span class='weight-normal'>모든 성공적인 비즈니스의 중심에는 만족한 고객이 있습니다. 우리의 목표는 고객 경험을 혁신하여, 당신의 브랜드가 돋보이도록 만드는 것입니다. 기술과 전문 인력이 결합된 하이브리드 방식으로, 모든 접점에서 진정성 있는 지원과 탁월한 서비스를 제공합니다.</span>"/>
      </section>

      <!-- Sales & Marketing​ 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="Customer Care"
          imageName="sm"
          imageAlt="위에서 내려다본 원형 테이블 회의에 참여한 팀원들"
          :reverse="true"
          :subItems="customerCareSubItems"
          :alignTop="true"
        />
      </section>

      <!-- Digital Sales 운영 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="Technical Support"
          imageName="ds"
          imageAlt="디지털 세일즈 운영을 상징하는 추상적인 데이터 노드"
          :subItems="technicalSupportSubItems"
          :alignTop="true"
        />
      </section>
      
    </div>

  </div>
</template>

<script setup>
import AppKeyVisual from '~/components/cnx/AppKeyVisual.vue'
import AppTitle from '~/components/cnx/AppTitle.vue'
import AppImgCont from '~/components/cnx/AppImgCont.vue'
import AppSubCont from '~/components/cnx/AppSubCont.vue'

// 레이아웃 설정
definePageMeta({
  layout: 'concentrix'
})

// Customer Care 서브 아이템들
const customerCareSubItems = computed(() => [
  {
    title: 'AI 기반 고객 케어로 브랜드 통합을 완성하다',
    listItems: [
      'AI 기반 데이터 분석을 통해 지속적으로 학습하고 혁신하며, 고객 경험을 함께 발전시킵니다. 숙련된 전문 인력과 함께 브랜드의 자연스러운 확장을 지원합니다. 복잡함을 단순하게, 운영을 더 효율적이고 통합적으로 만드는 방법 — 저희가 도와드리겠습니다.'
    ]
  },
  {
    title: 'B2C 고객 서비스',
    listItems: [
      '글로벌 팀과 확장 가능한 기술 인프라를 통해 모든 채널과 시간대에 걸쳐 원활한 다국어 지원을 제공합니다.'
    ]
  },
  {
    title: 'B2B 고객 서비스',
    listItems: [
      '구매 전후로 비즈니스 고객에게 맞춤형 지원을 제공하여, 처음부터 정확하고 개인화된 상호작용을 보장합니다.'
    ]
  },
  {
    title: '불만 처리',
    listItems: [
      '경험이 풍부한 전담 불만 처리팀을 통해 고객 불만을 신속하고 효과적으로 해결하여 불만족했던 고객을 열성 팬으로 바꿉니다.'
    ]
  },
  {
    title: 'AI 기반 솔루션',
    listItems: [
      '최고 수준의 생성형 AI와 전문 인력이 결합해 디지털 상호작용에 인간적인 감성을 더합니다.'
    ]
  }
])

// Customer Care 서브 아이템들
const technicalSupportSubItems = computed(() => [
  {
    title: '디지털 시대를 위한 기술 기반 지원',
    listItems: [
      '빠른 통합 역량으로 손쉬운 기술 지원을 제공합니다. 기존 시스템과 긴밀히 연동해 매끄러운 전환과 최대 효율을 보장합니다. 또한 셀프서비스 자동화 도구를 도입해 고객과 직원이 스스로 문제를 해결할 수 있도록 지원합니다. 더 많은 셀프 서비스, 더 적은 번거로움으로 더 많은 성과를 만들어냅니다.'
    ]
  },
  {
    title: 'B2C 기술 지원',
    listItems: [
      '제품 지식과 전문 지원을 기반으로 고객의 기술적 문의를 선호하는 언어와 채널에서 해결해 고객 생애가치를 높입니다.'
    ]
  },
  {
    title: 'B2B 기술 지원 및 IT 헬프데스크',
    listItems: [
      '시스템 및 하드웨어 문제를 겪는 최종 사용자와 직원에게 전문 지원을 제공해 다운타임을 줄이고 생산성을 높입니다.'
    ]
  }
])

</script>

<style lang="scss" scoped>
.commerce-platform-page {
  * {
    word-break: keep-all;
  }

  :deep(.title-content) {
    max-width: unset;
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
