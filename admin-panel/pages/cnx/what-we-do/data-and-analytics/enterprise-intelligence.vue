<template>
  <div class="enterprise-intelligence-page">
    <!-- 키 비주얼 섹션 -->
    <section class="key-visual-section">
      <AppKeyVisual
        imageAlt="Enterprise Intelligence Key Visual"
        :animationDuration="1200"
      />
    </section>

    <!-- 타이틀 섹션 -->
    <section class="title-section">
      <div class="inner">
        <AppTitle title="Enterprise Intelligence" />
      </div>
    </section>

    <!-- 콘텐츠 섹션 -->
    <section class="content-section">
      <div class="inner">
        <AppImgCont
          title="Business Intelligence & <br>Visualization​"
          text="콘센트릭스는Web과 App의 사용자 행동 추적/분석 영역에서 글로벌 시장을 양분하고 있는 GA4 360과 Adobe Analytics 두 제품 모두의 공식 Reseller로서, 해당 솔루션들의 라이선스 제공부터 풍부한 경험을 지닌 전문가 집단의 구축 컨설팅, 국내 최고 수준의 데이터 분석을 통한 인사이트 도출까지 End-to-End 통합 컨설팅 서비스를 제공합니다. <br>또한 고객의 현재 데이터 체계 분석을 통한 맞춤 태깅 전략을 수립하고, 맞춤형 대시보드 설계 등을 통해 데이터 기반 의사결정이 가능한 환경을 구축할 뿐만 아니라, 데이터 품질 관리부터 캠페인 성과 분석까지 전 과정에서 기업의 Data-Driven Decision-Making 체계가 완성되도록 지원합니다."
          imageName="ei01"
        />
      </div>
    </section>

    <!-- AppSubCont 컴포넌트 추가 -->
    <AppSubCont
      title="Data Visualization​"
      description="Data Visualization은 방대한 데이터의 패턴과 인사이트를 기술적으로 시각적 정보로 변환하는 혁신적 프로세스입니다. <br>차트, 그래프, 맵 등 시각적 객체를 활용해 수집·가공된 데이터를 직관적으로 전달함으로써, <br>암호처럼 복잡하게 얽힌 데이터를 한눈에 이해할 수 있는 직관적 정보로 바꿔줍니다. <br><br>※ 솔루션 : Tableau, Power BI, Looker Studio"
      imageName="subContImg"
      imageAlt="디지털 광고 솔루션 이미지"
    />

    <!-- 콘텐츠 섹션 -->
    <section class="content-section">
      <div class="inner">
        <AppImgCont
          title="SEO 모니터링 대시보드"
          text="SEO 구축 이후 운영 단계에서 지속적인 성과를 모니터링하고 분석하기 위한 클라우드 기반의 SEO 자동화 솔루션입니다. <br>SEO의 Healthiness 모니터링(On-Page, Off-Page, Technical SEO)과 주요 KPI 및 Keyword 트렌드를 분석하여 장기적인 SEO 성과 유지를 지원합니다."
          imageName="ei02"
          :reverse="true"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import AppKeyVisual from '~/components/cnx/AppKeyVisual.vue'
import AppTitle from '~/components/cnx/AppTitle.vue'
import AppSubCont from '~/components/cnx/AppSubCont.vue'
import AppImgCont from '~/components/cnx/AppImgCont.vue'

// 레이아웃 설정
definePageMeta({
  layout: 'concentrix',
})
</script>

<style lang="scss">
.enterprise-intelligence-page {
  .image-section {
    margin-bottom: rem(60);
    @include tablet {
      margin-bottom: rem(62);
    }
    @include desktop {
      margin-bottom: rem(120);
    }
  }
  .title-content {
    max-width: unset;
  }
}
</style>