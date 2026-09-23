<template>
  <div class="digital-advertising-page">
    <!-- 키 비주얼 섹션 -->
    <!--    <section class="key-visual-section">
      <AppKeyVisual
        imageAlt="ADX가 적힌 민트색 퍼즐 조각과 금색 열쇠로, AI와 디지털 플랫폼을 연결하는 마케팅을 표현한 키비주얼"
        :animationDuration="1200"
      />
      <section class="title-section">
        <AppTitle
          title="ADX"
          text="콘센트릭스 ADX조직은 AI(AI), 데이터(Data), 광고 경험(AD Experience)을 결합한 풀퍼널 마케팅 전문 조직입니다.<br>전략 수립부터 크리에이티브 제작, 미디어 운영, 성과 분석까지 광고의 전 과정을 하나의 팀이 수행하며, 각 단계에서 축적된 데이터를 다음 실행의 기준으로 되돌립니다.<br>이를 통해 단발성 캠페인이 아닌, 반복 가능한 성장 구조를 고객사와 함께 만들어 갑니다."
        />
      </section>
    </section>

    <div class="inner">
      <!~~ CX 흐름 ~~>
      <AdxCxFlow />
      <!~~ AI · Data · Experience 성장 시스템 ~~>
      <AdxGrowthSystem />
    </div>-->

    <!-- 종합광고 채널 -->
    <!-- <AdxChannels /> -->

    <div class="inner">
      <!-- 통합 시스템 -->
      <AdxIntegratedSystem />
      <!-- 그로스 시스템 -->
      <AdxGrowthModules />
      <section class="card-list-section">
        <!-- STRATEGY / CREATIVE / MEDIA 역량 카드 -->
        <AdxCardList
          title="ADX는 성장 목표를 중심으로<br class='br-tab-pc'>전략·크리에이티브·미디어·CX·데이터를 하나의 운영 범위로 설계합니다."
          :items="capabilityItems"
        />
      </section>

      <section class="org-chart-section">
        <!-- ADX 전담 조직도 -->
        <AdxOrgChart
          title="전략·크리에이티브·미디어 운영이<br class='br-tab-pc'> 하나의 목표 아래 연결된 ADX 전담 조직입니다."
          :hub="orgHub"
          :groups="orgGroups"
        />
      </section>

      <section class="ecosystem-section">
        <AdxEcosystem
          title="미디어·솔루션·AI, SaaS가<br>ADX의 성장 운영을 확장합니다"
          text="ADX는 미디어, 기술 파트너십, AI SaaS를 하나의 운영 체계로 결합합니다. 모든 신호와 실행은 고객의 비즈니스 목표를 향합니다."
          caption="CONNECT FOR BUSINESS GROWTH"
          imageName="ecosystem"
          imageAlt="미디어·솔루션·AI SaaS 파트너와 연결된 ADX 성장 운영 구조"
        />
      </section>

      <section class="operation-example-section">
        <AdxOperationExample />
      </section>
    </div>
  </div>
</template>

<script setup>
import AppKeyVisual from '~/components/cnx/AppKeyVisual.vue'
import AppTitle from '~/components/cnx/AppTitle.vue'
import AppImgCont from '~/components/cnx/AppImgCont.vue'
import AdxCxFlow from '~/components/cnx/AdxCxFlow.vue'
import AdxGrowthSystem from '~/components/cnx/AdxGrowthSystem.vue'
import AdxChannels from '~/components/cnx/AdxChannels.vue'
import AdxIntegratedSystem from '~/components/cnx/AdxIntegratedSystem.vue'
import AdxGrowthModules from '~/components/cnx/AdxGrowthModules.vue'
import AdxCardList from '~/components/cnx/AdxCardList.vue'
import AdxOrgChart from '~/components/cnx/AdxOrgChart.vue'
import AdxEcosystem from '~/components/cnx/AdxEcosystem.vue'
import AdxOperationExample from '~/components/cnx/AdxOperationExample.vue'

definePageMeta({
  layout: 'concentrix',
})

const capabilityItems = [
  {
    id: 1,
    title: 'STRATEGY&DATA',
    description: '무엇을 성장시킬 것인가',
    list: [
      'Market & Customer Insight',
      'Growth Strategy',
      'Data & Measurement',
      'Analysis Dashboard',
    ],
    footer:
      '무엇을 성장시킬지 정하고, 대시보드로 고객과 데이터의 신호를 의사결정 기준으로 바꿉니다.',
  },
  {
    id: 2,
    title: 'CREATIVE & EXPERIENCE',
    description: '어떻게 반응을 만들 것인가',
    list: [
      'Brand & Content',
      'Campaign Creative',
      'AI Production',
      'AI Models',
      'AI Design',
      'Full-Funnel Marketing Creative',
    ],
    footer:
      '고객이 이해하고 반응하는 메시지와 경험을 설계해, 고객의 반응을 성장의 동력으로 만듭니다.',
  },
  {
    id: 3,
    title: 'MEDIA & GROWTH',
    description: '어떻게 성과로 연결할 것인가',
    list: [
      'Media Strategy',
      'Paid Media Operation',
      'Conversion Optimization',
      'Custom Growth Agent',
      'KPI Decisioning',
    ],
    footer:
      '고객 목표에 맞춘 커스텀 에이전트로 운영을 고도화해, 성과를 다음 성장의 실행으로 연결합니다.',
  },
]

const orgHub = {
  title: 'ADX',
  subtitle: 'AI & Data AD Experience',
}

const orgGroups = [
  {
    id: 1,
    title: 'ADX INTELLIGENCE GROUP',
    items: [
      'Data & Customer Insight',
      'Marketing Data & Automation',
      'AI Agent Development',
      'Custom Dashboard Development',
    ],
  },
  {
    id: 2,
    title: 'ADX CREATIVE GROUP',
    items: [
      'AI Automation Production',
      'AI Models & Influencers',
      'Branding Content Production',
      'TVCF Production',
    ],
  },
  {
    id: 3,
    title: 'ADX MEDIA & OPERATIONS GROUP',
    items: [
      'Media Strategy & Campaign Operations',
      'Performance Media Optimization',
      'Data-Driven Campaign Operations',
      'Media Performance & Reporting',
    ],
  },
]
</script>

<style lang="scss" scoped></style>
