<template>
  <div class="digital-advertising-page">
    <!-- 키 비주얼 섹션 -->
    <section class="key-visual-section">
      <AppKeyVisual 
        imageAlt="Digital Advertising Key Visual"
        :animationDuration="1200"
      />
    </section>

    <div class="inner">
      <section class="title-section">
        <AppTitle 
          title="Digital Advertising"
          text="데이터 기반의 디지털 광고 전략으로 브랜드의 성장을 이끌어갑니다."
        />
      </section>

      <section class="content-section">
        <AppImgCont 
          title="The Catalyst for<br>Business Growth"
          text="정성과 정량의 경계가 허물어지고 솔루션보다 물음표가 더 많아진 데이터 범람 시대, 고객의 여정에 남겨진 데이터 인사이트를 끊임없이 파헤치며 고객사의 물음에 해답을 제시합니다."
          imageName="DA01"
        />
      </section>

      <section class="content-section">
        <AppImgCont 
          title="INSIGHT CATALYST"
          text="밀도 높은 데이터 분석을 통해 정확한 유저 인사이트를 파악 한다면, 브랜드의 목표와 성과를 달성하기 위한 Key Strategy를 정의할 수 있습니다. 이러한 인사이트를 촉매[Catalyst]로 차별화된 디지털 마케팅 성과를 만들어 냅니다."
          imageName="DA02"
          :reverse="true"
        />
      </section>

      <section class="content-section">
        <AppImgCont 
          title="Advanced<br>Performance Marketing"
          text="데이터 분석을 통한 유저 인사이트를 바탕으로 Branding, User Acquisition, Data Analytics, Target-Optimized Creative까지 디지털 마케팅 전반을 아우르는 Full Funnel Performance를 지향합니다."
          imageName="DA03"
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

<style lang="scss" scoped>
@use '~/layouts/scss/cnx.scss' as *;
@use '~/layouts/scss/cnx/_variables' as *;
@use '~/layouts/scss/cnx/_mixins' as *;
@use '~/layouts/scss/cnx/_functions' as *;
@use '~/layouts/scss/cnx/_base' as *;
</style>
