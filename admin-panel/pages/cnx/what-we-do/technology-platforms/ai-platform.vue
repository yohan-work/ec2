<template>
  <div class="commerce-platform-page">
    <!-- 키 비주얼 섹션 -->
    <section class="key-visual-section">
      <AppKeyVisual 
        imageAlt="AI Platform Key Visual"
        :animationDuration="1200"
      />
    </section>

    <div class="inner">
      <!-- 타이틀 섹션 -->
      <section class="title-section">
        <AppTitle 
          title="AI Platform"
          text="고객의 비즈니스 문제를 해결하기 위해 AI를 활용한 맞춤형 솔루션을 제공합니다.<br>반복적인 업무를 자동화하고 효율을 높이는 AI 에이전트 개발부터, 데이터 분석 및 예측 모델 개발에 이르기까지<br>혁신적인 AI 기술을 통해 기업의 경쟁력을 강화하고 새로운 가치를 창출합니다."/>
      </section>

      <!-- 특징 섹션 (3개 컬럼) -->
      <section class="features-section">
        <AppCardList 
          :items="[
            { 
              id: 1, 
              title: '전략 플랫폼', 
              description: 'iX Hello ( AI Agent platform ) · Enhans (Agentic AI)를 중심으로, 상용/오픈 LLM · RAG · 벡터 검색 · 음성 / 시각 API 등 외부 AI 기술을 선정 · 설계 · 연동' ,
            },
            { 
              id: 2, 
              title: '아키텍처 & 운영', 
              description: '멀티스텝 Workflow · 가드레일, 권한 / 감사로그, Human-in-the-Loop - 엔터프라이즈 운영 기준 준수' ,
            },
            { 
              id: 3, 
              title: '핵심 기능 & 통합', 
              description: '멀티사이트 / 현지화 / 번역 · 프리뷰 / Workflow, 커머스 · 검색 · DAM · SSO / IAM 연동' ,
            }
          ]"
        />
      </section>

      <section class="content-section">
        <AppImgCont 
          title="iX Hello : AI Agent Platform"
          text="iX Hello는 코딩 없이도 생성형 AI 봇을 쉽게 만들 수 있도록 돕는 AI 플랫폼입니다. iX Hello는 기업의 다양한 비즈니스 영역에 적용되어 효율성을 극대화하고, 데이터 기반의 콘텐츠 생성 및 업무 자동화를 가능하게 합니다."
          imageName="ixhello"
          :reverse="true"
          :alignTop="true"
          :subItems="ixHelloSubItems"
        />
      </section>

      <section class="content-section">
        <AppImgCont 
          title="AI Aura (AI Autonomous Reasoning Agent)"
          text="콘센트릭스의 AI Aura는 AI 기반의 실행형 에이전트를 활용해 Commerce를 포함한 닷컴 비즈니스 운영을 자동화하고 최적화하는 서비스입니다.<br>기존의 AI 솔루션이 단순 분석이나 정보 제공에 그쳤다면, AI Aura는 데이터를 기반으로 직접적인 행동을 수행하여 비즈니스 성과를 높이는 것이 특징입니다."  
          imageName="aiaura"
          :alignTop="true"
          :subItems="aiAuraSubItems"
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

// iX Hello 서브 아이템들
const ixHelloSubItems = computed(() => [
  { 
    title: '손쉬운 챗봇 구축', 
    listItems: ['코딩 지식이 없어도 누구나 맞춤형 AI 챗봇을 만들 수 있습니다.'] 
  },
  { 
    title: '다양한 콘텐츠 생성', 
    listItems: ['텍스트, 이미지, 코드, 음성, 영상 등 다양한 형태의 콘텐츠를 생성할 수 있습니다.'] 
  },
  { 
    title: '업무 생산성 향상', 
    listItems: ['직원들의 업무를 돕는 AI 비서 역할을 수행하며, 문서 요약, 보고서 작성, 회의록 정리 등을 자동화해 생산성을 높입니다.'] 
  },
  { 
    title: '파일 분석 및 활용', 
    listItems: ['파일을 업로드하여 분석, 리서치, 요약 등 다양한 용도로 활용할 수 있습니다.'] 
  }
])

// AI Aura 서브 아이템들
const aiAuraSubItems = computed(() => [
  { 
    title: '향상된 웹 데이터 수집', 
    listItems: ['AI가 사람처럼 직접 데이터를 수집하여, 기존 크롤링 기술의 단점인 수집 실패율, 늦은 대응 시간의 한계를 극복합니다.'] 
  },
  { 
    title: '실시간 시장 트렌드 분석', 
    listItems: ['AI가 실시간으로 상품 판매량, 프로모션, 가격 등을 분석해 인사이트를 제공합니다.'] 
  },
  { 
    title: '다이내믹 가격 책정 전략', 
    listItems: ['급변하는 시장 상황에 맞춰 최적의 가격을 자동으로 조정합니다.'] 
  },
  { 
    title: '프로모션 및 재고 최적화', 
    listItems: ['효율적인 프로모션 전략을 수립하고 재고 관리를 강화해 비즈니스 효율을 극대화합니다.'] 
  },
  { 
    title: '마켓플레이스 내 상품 노출 전략', 
    listItems: ['다양한 온라인 마켓플레이스에서 상품 노출 효과를 극대화하는 전략을 제시하고 실행합니다.'] 
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
