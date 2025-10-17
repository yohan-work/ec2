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
          title="Digital Content Crawling"
          text="Digital Content Crawling은 인터넷에 존재하는 다양한 웹사이트, 뉴스, 소셜미디어, 블로그 등에서 데이터를 자동으로 수집·저장·갱신하는 기술입니다. 이를 통해 인터넷상의 다양한 온라인 채널에서 실시간으로 콘텐츠를 자동 수집하여, 기업이 시장 동향을 빠르게 파악하고, 경쟁사 분석, 트렌드 예측 등에 활용할 수 있도록 도와줍니다."
          imageName="ei01"
        />
      </div>
    </section>

    <!-- AppSubCont 컴포넌트 추가 -->
    <AppSubCont
      title="Empowering Brands<br>with Data-Driven Marketing"
      description="고객사 데이터분석, 디지털 광고 운영, 콘텐츠 제작, SEO 등<br>디지털 마케팅 영역에 필요한 모든 Task들이 하나로 통합된, 진정한 의미의<br>End-to-End 디지털 마케팅 솔루션을 제공합니다."
      imageName="subContImg"
      imageAlt="디지털 광고 솔루션 이미지"
    />

    <!-- 콘텐츠 섹션 -->
    <section class="content-section">
      <div class="inner">
        <AppImgCont
          title="Data Pipeline & Engineering"
          text="SEO 구축 이후 운영 단계에서 지속적인 성과를 모니터링하고 분석하기 위한 클라우드 기반의 SEO 자동화 솔루션입니다. <br>SEO의 Healthiness 모니터링(On-Page, Off-Page, Technical SEO)과 주요 KPI 및 Keyword 트렌드를 분석하여 장기적인 SEO 성과 유지를 지원합니다.<br><br>※솔루션 : Airflow, BigQuery, Snowflake 등"
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
}
</style>