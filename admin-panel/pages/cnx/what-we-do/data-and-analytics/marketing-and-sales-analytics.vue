<template>
  <div class="marketing-sales-analytics-page">

    <!-- 키 비주얼 섹션 -->
    <section class="key-visual-section">
      <AppKeyVisual 
        imageAlt="다채로운 색상의 빛줄기와 유동적인 선들이 흐르듯 이어지는 추상 패턴으로, 데이터 흐름과 마케팅·세일즈 분석의 역동성을 시각적으로 표현한 키비주얼"
        :animationDuration="1200"
      />
    </section>

    <div class="inner">
      <!-- 타이틀 섹션 -->
      <section class="title-section">
        <AppTitle 
          title="Marketing & Sales Analytics"
        />
      </section>

      <!-- 콘텐츠 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="Campaign Planning & Operation"
          text="AI 기술을 기반으로 비즈니스 목적에 최적화된 캠페인 설계와 운영을 위해, 예측적 데이터 분석과 자동화된 실행을 결합한 혁신적 접근 솔루션을 제공합니다. 머신러닝이 고객 행동 데이터, 구매 이력 등 다양한 소스의 데이터를 분석해 타겟 세그먼트를 정밀하게 도출하고, 개인별 최적화된 메시지와 광고를 실시간으로 집행함으로써 캠페인 성과를 극대화합니다."
          imageName="msa01"
          imageAlt="인간의 손과 로봇 손이 빛나는 지점을 향해 손끝을 맞대며 인공지능과 인간의 협업, 기술 융합을 상징하는 미래지향적 비주얼"
        />
      </section>

      <!-- 콘텐츠 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="Social Listening Analysis​"
          text="고객의 소리에 귀 기울이면 비즈니스 방향성에 대한 답을 찾을 수 있습니다. 디지털 채널에서 언급되는 연관 버즈를 측정하여 디지털 마케팅 활동의 성과를 평가하고 이를 바탕으로 고객 인게이지먼트 개선 및 디지털 전략을 수립합니다. 고객 리뷰 분석으로 업계별 제품 및 브랜드 진단, 신제품 반응 평가 및 위기 감지, 주요 셀링 포인트 등 다양한 인사이트를 도출하여 제품 경쟁력을 확보합니다."
          imageName="msa02"
          :reverse="true"
          imageAlt="SNS 플랫폼에서 다양한 사용자들이 좋아요, 해시태그, 메시지, 이모티콘으로 상호작용하는 원형 구조로 디지털 커뮤니케이션"
        />
      </section>

      <!-- 콘텐츠 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="AD Performance Analysis with Technology"
          text="데이터·AI·머신러닝을 활용하여 디지털 광고의 실제 성과를 정밀하게 측정하고, 광고 효율 극대화를 위한 최적의 전략을 제시합니다. <br>광고 캠페인에 대한 방대한 성과 데이터를 실시간으로 집계·분석함으로써, 각 채널별 투자 대비 매출(ROAS), 클릭률(CTR), 전환율(CVR) 등 핵심 지표를 한눈에 파악할 수 있습니다."
          imageName="msa03"
          imageAlt="도시 건물 위로 데이터와 빛이 흐르며 연결성을 상징하는 미래형 스마트 시티 야경 비주얼"
        />
      </section>

      <!-- 콘텐츠 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="AI Based Personalized Marketing"
          text="AI Based Personalized Marketing은 최신 인공지능 기술과 데이터 분석을 결합해, 고객 한 명 한 명에게 꼭 맞는 맞춤형 마케팅 경험을 제공하는 혁신적 솔루션입니다. 단순 고객을 ‘동질그룹’으로 나누는 것이 아니라, 실제 행동과 관심사의 변화까지 실시간으로 파악해, 각자에게 기대 이상의 서비스를 전달합니다."
          imageName="msa04"
          :reverse="true"
          imageAlt="고객 데이터, 캠페인 성과, 예측 리포트 등을 시각화해 보여주는 MARS CRM 솔루션 대시보드"
        />
      </section>

      <!-- 콘텐츠 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="Sales Channel Monitoring & Discovery​"
          text="다양한 Retailer 채널을 실시간으로 관찰하고 분석하여, 최적의 채널 전략 수립과 새로운 기회의 발굴을 가능하게 하는 혁신적인 비즈니스 인텔리전스입니다. 판매 데이터(가격, 재고, 프로모션 등)와 고객 행동(트래픽)을 통합적으로 모니터링함으로써, 각 채널별 성과와 시장의 트렌드를 명확히 파악하고, 새로운 성장 가능 채널을 발견하여 전략적 자원 배분과 매출 극대화를 지원합니다."
          imageName="msa05"
          imageAlt="두 명의 마케팅 전문가가 노트북 화면을 보며 전략 데이터를 분석하고 논의하는 협업"
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