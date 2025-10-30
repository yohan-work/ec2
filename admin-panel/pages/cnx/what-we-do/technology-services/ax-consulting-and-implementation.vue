<template>
  <div class="commerce-platform-page">
    <!-- 키 비주얼 섹션 -->
    <section class="key-visual-section">
      <AppKeyVisual 
        imageAlt="Generative AI 기술을 적용한 거리 환경"
        :animationDuration="1200"
      />
    </section>

    <div class="inner">
      <!-- 타이틀 섹션 -->
      <section class="title-section">
        <AppTitle 
          title="AX Consulting & <br>Implementation"
          text="Generative AX 컨설팅부터 Agentic AI 설계·구현, QA·운영까지, PoC에서 글로벌 확장까지 지원하며, <br>전략·데이터 거버넌스·보안·HITL (Human In the Loop) 기반의 안전한 AI 운영을 제공합니다."/>
      </section>

      <!-- 특징 섹션 (3개 컬럼) -->
      <section class="features-section">
        <AppCardList 
          :items="[
            { 
              id: 1, 
              title: '범위', 
              description: 'Generative AI 컨설팅, Agentic AI 설계 · 구현, QA · 운영 서비스' ,
            },
            { 
              id: 2, 
              title: 'Delivery Model', 
              description: 'Onshore & GDC (Global Delivery Center) 협업 기반 PoC → 확장 적용 (Scaling)' ,
            },
            { 
              id: 3, 
              title: '핵심 역량 & 레퍼런스', 
              description: 'AX 전략 수립, 비즈니스 과제 발굴, 데이터 거버넌스 · 보안 · HITL 기반 안전한 AI 운영' ,
            }
          ]"
        />
      </section>

      <!-- AX(AI Transformation) 컨설팅 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="AX(AI Transformation) 컨설팅"
          text="AX(AI Transformation) 전략 수립 서비스는 기업이 AI 기술을 비즈니스에 성공적으로 도입하여 근본적인 혁신을 이루도록 돕는 전문 컨설팅 서비스입니다. 단순한 AI 기술 도입을 넘어, 기업의 현재 상황을 진단하고, AI 기술을 통해 어떤 가치를 창출할 수 있을지 구체적인 계획을 수립하는 데 중점을 둡니다."
          imageName="ax"
          imageAlt="디지털 인터페이스를 조작하는 컨설팅 담당자의 손"
          :reverse="true"
          :subItems="axSubItems"
        />
      </section>

      <!-- Integration Services 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="AI 시스템구축"
          text="콘센트릭스는 자체 AI 솔루션인 iX Hello와 AI Aura 뿐 아니라, 그외 AI 솔루션을 기반으로 고객사의 업무를 효율화/자동화하기 위한 AI 시스템을 설계, 개발합니다."
          imageName="ai"
          imageAlt="AI 시스템을 상징하는 클라우드 네트워크와 하늘"
          :subItems="aiSubItems"
          :alignTop="true"
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
import { computed } from 'vue'

// 레이아웃 설정
definePageMeta({
  layout: 'concentrix'
})

// SAP Commerce Cloud 서브 아이템들
const axSubItems = computed(() => [
  {
    listItems: [
      'AI 도입 대상 비즈니스 케이스 발굴',
      '구체적인 AI 목표 지표 및 로드맵 수립',
      '솔루션 설계 및 실행 계획 수립',
      '구축한 AI Agent에 대한 QA 서비스',
      '운영 체계 구축 및 조직 변화 관리'
    ]
  }
])

// Adobe Commerce Cloud 서브 아이템들
const aiSubItems = computed(() => [
  { 
    title: '시스템 아키텍처 설계', 
    listItems: ['AI 모델, 데이터 파이프라인, 사용자 인터페이스, 기존 시스템과의 연동 방안 등을 포함하는 전체 시스템의 구조를 설계합니다.'] 
  },
  { 
    title: '데이터 전처리 및 가공', 
    listItems: ['확보한 데이터를 AI 모델이 학습할 수 있도록 정제하고, 필요한 형태로 변환하는 작업을 수행합니다.'] 
  },
  { 
    title: 'AI 모델 개발 및 학습', 
    listItems: ['선정한 알고리즘을 기반으로 AI 모델을 개발하고, 전처리된 데이터를 이용해 모델을 학습시킵니다.'] 
  },
  { 
    title: '성능 평가 및 개선', 
    listItems: ['학습된 AI 모델의 성능을 다양한 지표(정확도, 정밀도 등)로 평가하고, 목표 성능에 도달할 때까지 모델을 개선합니다.'] 
  }
])

</script>

<style lang="scss" scoped>
.commerce-platform-page {
  * {
    word-break: keep-all;
  }


  .content-section {
    margin-bottom: rem(60);
    
    @include tablet {
      margin-bottom: rem(80);
    }
    
    @include desktop {
      margin-bottom: rem(120);
    }
  }
}
</style>
