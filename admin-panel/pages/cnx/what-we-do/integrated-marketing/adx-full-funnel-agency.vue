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
          title="ADX는 성장 목표를 중심으로<br>전략·크리에이티브·미디어·CX·데이터를 하나의 운영 범위로 설계합니다."
          :items="capabilityItems"
        />
      </section>
    </div>
    
  </div>
</template>

<script setup>
import AppKeyVisual from '~/components/cnx/AppKeyVisual.vue'
import AppTitle from '~/components/cnx/AppTitle.vue'
import AppImgCont from '~/components/cnx/AppImgCont.vue'
import AdxCardList from '~/components/cnx/AdxCardList.vue'

definePageMeta({
  layout: 'concentrix'
})

const capabilityItems = [
  {
    id: 1,
    title: 'STRATEGISTS',
    description: '브랜드 성장 전략 설계',
    list: [
      'Market & Consumer Insight',
      'Brand Strategy',
      'Data Interpretation',
      'Action Design',
    ],
    footer: '시장과 고객을 읽고, 성장 목표를 실행 가능한 전략으로 바꿉니다.',
  },
  {
    id: 2,
    title: 'CREATIVE & EXPERIENCE',
    description: '크리에이티브와 경험 설계',
    list: [
      'Visual Identity',
      'Campaign Creative',
      'UX Direction',
      'Contents',
      'Branding',
      'Performance Creative System',
    ],
    footer: '브랜드 경험과 성과를 동시에 만드는 크리에이티브를 설계합니다.',
  },
  {
    id: 3,
    title: 'MEDIA & GROWTH',
    description: '미디어 운영과 성장 최적화',
    list: [
      'Media Planning',
      'Performance Operation',
      'Conversion Optimization',
      'Custom Search Agent',
      'CRM Marketing',
    ],
    footer: '미디어와 CRM을 하나의 성장 운영으로 연결합니다.',
  },
]
</script>

<style lang="scss" scoped>
</style>
