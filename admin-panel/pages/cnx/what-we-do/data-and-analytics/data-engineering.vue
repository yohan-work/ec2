<template>
  <div class="data-engineering-page">

    <!-- 키 비주얼 섹션 -->
    <section class="key-visual-section">
      <AppKeyVisual 
        imageAlt="어두운 배경에서 노트북 키보드를 조작하는 손가락의 근접 장면으로, 데이터 엔지니어링의 정밀한 기술 작업을 상징한 비주얼"
        :animationDuration="1200"
      />
    </section>

    <div class="inner">
      <!-- 타이틀 섹션 -->
      <section class="title-section">
        <AppTitle 
          title="Data Engineering"
        />
      </section>

      <!-- 콘텐츠 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="Digital Content Crawling"
          text="Digital Content Crawling은 인터넷에 존재하는 다양한 웹사이트, 뉴스, 소셜미디어, 블로그 등에서 데이터를 자동으로 수집·저장·갱신하는 기술입니다. 이를 통해 인터넷상의 다양한 온라인 채널에서 실시간으로 콘텐츠를 자동 수집하여, 기업이 시장 동향을 빠르게 파악하고, 경쟁사 분석, 트렌드 예측 등에 활용할 수 있도록 도와줍니다."
          imageName="de01"
          imageAlt="홀로그램 형태의 빛과 패턴을 바라보며 손을 들어 올린 여성으로, 디지털 인공지능과 인간의 상호작용을 상징한 미래적 비주얼"
        />
      </section>

      <!-- 콘텐츠 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="Data Pipeline & Engineering"
          text="Data Pipeline & Engineering은 다양한 원천의 데이터를 체계적으로 수집·가공·변환하여 필요한 곳에 신속하고 정확하게 전달하는 기술과 프로세스입니다. 즉, 데이터가 생성되는 순간부터 최종 분석·활용까지의 여정을 원활하게 설계·관리하는 데이터 이동 통로이자, 데이터 품질과 신뢰성을 책임지는 중추 시스템이라고 할 수 있습니다."
          imageName="de02"
          imageAlt="다채로운 색상의 선들이 한 지점에서 시작해 여러 단계의 컬러 노드를 거쳐 확장되는 구조로, 데이터 수집에서 통합·분석·확산으로 이어지는 흐름을 시각화한 비주얼"
          :reverse="true"
          :subItems="[
            {
              listItems: [
                '솔루션 : Airflow, BigQuery, Snowflake 등'
              ]
            }
          ]"
        />
      </section>

      <!-- 콘텐츠 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="Cloud Platform Operation​"
          text="Cloud Platform Operation은 클라우드 기반 IT 인프라와 서비스를 안정적이고 효율적으로 운영하는 전문적인 관리 프로세스입니다. 기업은 다양한 클라우드 환경에서 애플리케이션과 데이터, 네트워크 자원을 자동화와 모니터링, 보안 관리의 결합으로 최적화하여 비즈니스 연속성을 확보합니다. <br>콘센트릭스는 AWS와 GCP의 Qualified Official Partner for Platform Operation로서 전문적 서비스를 제공합니다."
          imageName="de03"
          imageAlt="3D 형태의 푸른색 클라우드 아이콘이 디지털 플랫폼 위에 떠 있는 모습으로, 클라우드 컴퓨팅과 데이터 인프라의 통합을 상징하는 비주얼"
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