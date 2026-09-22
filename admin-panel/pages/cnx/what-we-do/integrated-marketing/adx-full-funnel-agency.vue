<template>
  <div class="digital-advertising-page">
    <!-- 키 비주얼 섹션 -->
    <section class="key-visual-section">
      <AppKeyVisual 
        imageAlt="전구 모형을 들고 아이디어를 공유하며 토론하는 팀의 협업을 표현한 Digital Advertising"
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

      <section class="content-section">
        <AppImgCont 
          title="The Catalyst for<br>Business Growth"
          text="정성과 정량의 경계가 허물어지고 솔루션보다 물음표가 더 많아진 데이터 범람 시대, 고객의 여정에 남겨진 데이터 인사이트를 끊임없이 파헤치며 고객사의 물음에 해답을 제시합니다."
          imageName="DA01"
          imageAlt="노트북 화면 위로 데이터 분석 차트와 그래프가 겹쳐진 이미지 — 디지털 마케팅 성과와 통계 분석을 상징"
        />
      </section>

      <section class="content-section">
        <AppImgCont 
          title="INSIGHT CATALYST"
          text="밀도 높은 데이터 분석을 통해 정확한 유저 인사이트를 파악 한다면, 브랜드의 목표와 성과를 달성하기 위한 Key Strategy를 정의할 수 있습니다. 이러한 인사이트를 촉매[Catalyst]로 차별화된 디지털 마케팅 성과를 만들어 냅니다."
          imageName="DA02"
          imageAlt="Client와 Customers를 중심으로 데이터 분석, 퍼포먼스 마케팅, UX 개선, CRM 마케팅 등 핵심 서비스 흐름을 시각화한 INSIGHT CATALYST 구조"
          :reverse="true"
        />
      </section>

      <section class="content-section">
        <AppImgCont 
          title="Advanced<br>Performance Marketing"
          text="데이터 분석을 통한 유저 인사이트를 바탕으로 Branding, User Acquisition, Data Analytics, Target-Optimized Creative까지 디지털 마케팅 전반을 아우르는 Full Funnel Performance를 지향합니다."
          imageName="DA03"
          imageAlt="Strategy, Media Planning, Analytics, Optimization의 4단계로 구성된 퍼포먼스 마케팅 전략 프로세스를 시각화한 Full Funnel Performance 구조"
        />
      </section>

      <section class="card-list-section">
        <AdxCardList
          title="ADX는 성장 목표를 중심으로<br class='br-tab-pc'>전략·크리에이티브·미디어·CX·데이터를 하나의 운영 범위로 설계합니다."
          :items="capabilityItems"
        />
      </section>

      <section class="org-chart-section">
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

    <section class="operation-example-section inner">
      <AdxOperationExample />
    </section>
    </div>
  </div>
</template>

<script setup>
import AppKeyVisual from '~/components/cnx/AppKeyVisual.vue'
import AppTitle from '~/components/cnx/AppTitle.vue'
import AppImgCont from '~/components/cnx/AppImgCont.vue'
import AdxCardList from '~/components/cnx/AdxCardList.vue'
import AdxOrgChart from '~/components/cnx/AdxOrgChart.vue'
import AdxEcosystem from '~/components/cnx/AdxEcosystem.vue'
import AdxOperationExample from '~/components/cnx/AdxOperationExample.vue'

definePageMeta({
  layout: 'concentrix'
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
    footer: '무엇을 성장시킬지 정하고, 대시보드로 고객과 데이터의 신호를 의사결정 기준으로 바꿉니다.',
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
    footer: '고객이 이해하고 반응하는 메시지와 경험을 설계해, 고객의 반응을 성장의 동력으로 만듭니다.',
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
    footer: '고객 목표에 맞춘 커스텀 에이전트로 운영을 고도화해, 성과를 다음 성장의 실행으로 연결합니다.',
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

<style lang="scss" scoped>
</style>
