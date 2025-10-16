<template>
  <div class="digital-channel-analytics-page">

    <!-- 키 비주얼 섹션 -->
    <section class="key-visual-section">
      <AppKeyVisual 
        imageAlt="Digital Channel Analytics Key Visual"
        :animationDuration="1200"
        imagePath="/assets/cnx/whatwedo/datananalytics/digitalchannelanalytics"
      />
    </section>

    <div class="inner">
      <!-- 타이틀 섹션 -->
      <section class="title-section">
        <AppTitle 
          title="Digital Channel Analytics"
        />
      </section>

      <!-- 콘텐츠 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="Digital Analytics & Tagging Operations"
          text="웹/앱 채널에서의 고객 행동을 정밀하게 분석하고, 이를 바탕으로 성과 개선을 위한 실행 가능한 인사이트를 도출합니다. 단순 리포트 제공을 넘어, 고객이 실제로 어떤 경로를 따라 브랜드와 상호작용하고 이탈 또는 전환하는지 전체 여정을 데이터로 그려냅니다. 또한, 분석 기반의 데이터 전략 수립부터 마케팅 태깅 설계, 구현, 운영 및 QA까지, 디지털 분석에 필요한 전 과정을 통합적으로 제공합니다. 복잡한 글로벌 태깅 운영, 플랫폼 간 데이터 정합성 문제까지 저희가 함께 해결합니다."
          imageName="dca01"
        />
      </section>

      <!-- 콘텐츠 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="Google Analytics & GMP Consulting"
          text="디지털 마케팅은 데이터의 양이 아닌 데이터의 품질과 이를 활용한 분석이 성패를 결정합니다. 콘센트릭스는GA4 360의 공식 리셀러로서, 수많은 고객들과 함께하며 얻은 풍부한 경험을 토대로 GA4 360 라이선스 도입부터 최적화된 구축·운영 컨설팅, 그리고 깊이 있는 GA4 데이터 분석까지, 고객의 Data-Driven Marketing을 가능하게 하는 국내 최고수준의 서비스를 제공합니다."
          imageName="dca02"
          :reverse="true"
        />
      </section>

      <!-- 카드 리스트 섹션 -->
      <section class="card-list-section">
        <AppCardList 
          title="콘센트릭스 GA4 360 핵심 서비스"
          :items="[
            { id: 1, title: '공식 라이선스 도입', description: 'Google과 협업해 <br>기업 규모·니즈에 맞춘 최적 플랜 제공' },
            { id: 2, title: 'End-to-End <br>환경 구축', description: '데이터 구조 설계, 태깅 전략, BigQuery 연동 등 통합 구현' },
            { id: 3, title: '운영 최적화 및 분석', description: 'KPI 기반 대시보드, Automated 모니터링, 캠페인 성과 분석' },
            { id: 4, title: '프라이버시 중심 전략', description: '쿠키리스 대응, Consent Mode, 개인정보 보호 정책 적용' },
            { id: 5, title: 'GA4 중심의 이기종 데이터 통합', description: 'CRM·ERP·CDP와 GA4 간의 데이터 통합' }
          ]"
        />
      </section>

      <!-- 콘텐츠 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="SEO & GEO Consulting"
          text="국내외 SEO(Search Engine Optimization) 전문가들이 웹사이트 최적화 현황을 진단하고 자연 유입 트래픽을 높이기 위한 컨설팅을 제공합니다. 기존 SEO 역량을 기반으로 GEO(Generative Engine Optimization)와 AEO(Answer Engine Optimization)까지 확장해 변화하는 검색 트렌드에 선제적으로 대응합니다. <br>다양한 SEO 운영 및 구축 경험을 통해 키워드 리서치, 콘텐츠 전략, 검색 트렌드 분석, Tech 지원과 성과 분석까지 종합 컨설팅을 제공하며, 단기적 이슈 해결은 물론 장기적 성장까지 이끌어갑니다."
          imageName="dca03"
        />
      </section>

      <!-- 콘텐츠 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="UI/UX Analytics​"
          text="고객 경험의 성패는 방문 수치가 많고 적음이 아니라, 사용자가 실제로 어떻게 서비스와 상호작용하는지에 달려 있습니다. <br>Heatmap, Journey Map, Session Replay 등 행동 기반 분석 기법을 활용하여, 고객 여정과 사용성 문제를 정밀하게 진단하고, 전환 최적화와 고객 경험 개선을 가능하게 합니다. 고객 여정 속 숨겨진 문제를 발견하고, 이를 성과로 전환하는 경험을 지금 시작해보세요."
          imageName="dca04"
          :reverse="true"
        />
      </section>

      <!-- 카드 리스트 섹션 -->
      <section class="card-list-section">
        <AppCardList 
          :items="[
            { id: 1, title: '사용자 행동 데이터 시각화', description: 'Heatmap으로 클릭·스크롤 집중 영역을 분석하고, Journey Map으로 고객 여정의 주요 경로와 이탈 구간을 식별하며, Session Replay를 통해 실제 사용자 경험을 재현합니다.' },
            { id: 2, title: 'UX 문제 진단 및 개선 전략 수립', description: '분석 결과를 토대로 전환 저해 요소와 사용성 문제를 도출하고, 사용자 중심의 최적화 방안을 제시합니다. 개선 전·후 효과를 검증하여 전략의 실효성을 확보합니다.' },
            { id: 3, title: '성과 중심의 UX 최적화 컨설팅', description: '웹/앱 환경에 맞는 분석을 설계하고 시범 적용한 뒤, 단계별 개선 전략을 실행합니다. 이후 성과 검증과 지속적 최적화를 통해 Conversion Rate, 고객 만족도, 장기적 충성도 등 핵심 KPI 개선을 실현합니다.' }
          ]"
        />
      </section>

      <!-- 콘텐츠 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="Digital Content Monitoring & Governance​"
          text="디지털 채널 전반에서 유통되는 콘텐츠를 상시적으로 감시하고 분석하여, 콘텐츠의 오류 방지는 물론 브랜드 이미지, 제품 메시지의 일관성 유지를 보장합니다. <br>이를 통해 급변하는 온라인 환경에서 콘텐츠의 품질과 신뢰성을 체계적으로 관리하여 비즈니스 가치를 극대화합니다."
          imageName="dca05"
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
  .digital-channel-analytics-page {

  }
</style>
