<template>
  <div class="enterprise-intelligence-page">
    <!-- 키 비주얼 섹션 -->
    <section class="key-visual-section">
      <AppKeyVisual
        imageAlt="지구를 중심으로 연결된 데이터 네트워크를 통해 전 세계적인 연결성과 인텔리전스를 상징한 비주얼"
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
          text="비즈니스 인텔리전스는 기업의 목표에 적합한 액션 플랜을 제시합니다. 기업의 통합 데이터 체계를 설계하고, Tableau/Power BI 또는 자체 BI 솔루션을 활용 하여 대시보드의 설계 및 구축 서비스를 제공합니다. 다양한 조직 간 데이터에 대한 단일 고객 관점을 확보하고 디지털 투자에 대한 빠른 의사결정을 돕습니다."
          imageName="ei01"
          imageAlt="노트북 화면에서 그래프와 통계 아이콘으로 데이터를 분석하며 인사이트를 도출하는 장면"
        />
      </div>
    </section>

    <!-- AppSubCont 컴포넌트 추가 -->
    <AppSubCont
      title="Data Visualization​"
      description="Data Visualization은 방대한 데이터의 패턴과 인사이트를 기술적으로 시각적 정보로 변환하는 혁신적 프로세스입니다. <br>차트, 그래프, 맵 등 시각적 객체를 활용해 수집·가공된 데이터를 직관적으로 전달함으로써, <br>암호처럼 복잡하게 얽힌 데이터를 한눈에 이해할 수 있는 직관적 정보로 바꿔줍니다. <br><br>※ 솔루션 : Tableau, Power BI, Looker Studio"
      imageName="subContImg"
      imageAlt="차트와 그래프를 활용해 다양한 데이터를 시각적으로 구성한 데이터 시각화 화면"
    />

    <!-- 콘텐츠 섹션 -->
    <section class="content-section">
      <div class="inner">
        <AppImgCont
          title="SEO 모니터링 대시보드"
          text="SEO 구축 이후 운영 단계에서 지속적인 성과를 모니터링하고 분석하기 위한 클라우드 기반의 SEO 자동화 솔루션입니다. <br>SEO의 Healthiness 모니터링(On-Page, Off-Page, Technical SEO)과 주요 KPI 및 Keyword 트렌드를 분석하여 장기적인 SEO 성과 유지를 지원합니다."
          imageName="ei02"
          imageAlt="노트북 화면에 원형 차트, 막대그래프, 데이터 표가 함께 표시된 데이터 분석 대시보드"
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