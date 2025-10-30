<template>
  <div class="analytics-solution-page">

    <!-- 키 비주얼 섹션 -->
    <section class="key-visual-section">
      <AppKeyVisual 
        imageAlt="데이터 분석과 연결성을 상징하는 그래픽 패턴 배경"
        :animationDuration="1200"
      />
    </section>

    <div class="inner">
      <!-- 타이틀 섹션 -->
      <section class="title-section">
        <AppTitle 
          title="Analytics Solution"
        />
      </section>

      <!-- 콘텐츠 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="Google Analytics / Adobe Analytics"
          text="콘센트릭스는 Web과 App의 사용자 행동 추적/분석 영역에서 글로벌 시장을 양분하고 있는 GA4 360과 Adobe Analytics 두 제품 모두의 공식 Reseller로서, 해당 솔루션들의 라이선스 제공부터 풍부한 경험을 지닌 전문가 집단의 구축 컨설팅, 국내 최고 수준의 데이터 분석을 통한 인사이트 도출까지 End-to-End 통합 컨설팅 서비스를 제공합니다. <br>또한 고객의 현재 데이터 체계 분석을 통한 맞춤 태깅 전략을 수립하고, 맞춤형 대시보드 설계 등을 통해 데이터 기반 의사결정이 가능한 환경을 구축할 뿐만 아니라, 데이터 품질 관리부터 캠페인 성과 분석까지 전 과정에서 기업의 Data-Driven Decision-Making 체계가 완성되도록 지원합니다."
          imageName="as01"
          imageAlt="모니터와 태블릿을 보며 데이터 분석 작업을 하는 사람"
        />
      </section>

      <!-- 콘텐츠 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="UI/UX Analytics Solutions: Beusable/Contentsquare"
          text="Heatmap, Journey Map 등 사용자 행동 데이터 기반의 UI/UX 분석 솔루션을 제공합니다. 단순 트래픽 분석이 아닌, 고객 여정과 행동 패턴을 시각화하여 이탈 지점·전환 저해 요소를 식별하여 숨겨진 사용성 문제를 발굴하고, 사용자 중심의 UX 개선 전략을 제시하여 Conversion 최적화와 고객 경험 향상을 지원합니다."
          imageName="as02"
          imageAlt="사용자 여정 다이어그램과 스크롤 히트맵 분석 화면"
          :reverse="true"
        />
      </section>

      <!-- 콘텐츠 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="AB Testing & Personalization Solutions"
          text="Conversion 최적화를 지원하는 Optimizely, AB Tasty & Adobe Target 등의 A/B Testing 및 개인화 솔루션을 제공합니다. <br>가설수립–실험설계–성과검증까지의 전체 프로세스를 지원하여, 데이터 기반의 의사결정을 가능하게 합니다. 빠른 테스트 사이클을 통해 성과 개선의 선순환 구조를 구축하며, 마케팅 ROI 극대화와 지속적인 최적 경험 제공을 보장합니다."
          imageName="as03"
          imageAlt="사무실에서 회의하는 비즈니스 팀원의 역동적인 모습"
        />
      </section>

      <!-- 콘텐츠 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="SimilarWeb"
          text="SimilarWeb은 글로벌 웹 사이트에 대한 고객 행동 정보를 제공하는 마켓 인텔리전스 플랫폼입니다. <br>콘센트릭스는 SimilarWeb 솔루션의 파트너사로서 솔루션 컨설팅 및 분석 서비스를 제공하여 동종 산업군 관련 데이터 및 트렌드에 대한 다양한 인사이트를 활용하여 체계적인 전략 수립을 지원합니다."
          imageName="as04"
          imageAlt="SimilarWeb 홈페이지 화면이 보이는 노트북"
          :reverse="true"
        />
      </section>

    </div>
    
  </div>
</template>

<script setup>
import AppKeyVisual from '~/components/cnx/AppKeyVisual.vue'
import AppTitle from '~/components/cnx/AppTitle.vue'
import AppImgCont from '~/components/cnx/AppImgCont.vue' 

// 레이아웃 설정
definePageMeta({
  layout: 'concentrix'
})

</script>