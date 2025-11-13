<template>
  <div class="commerce-platform-page">
    <!-- 키 비주얼 섹션 -->
    <section class="key-visual-section">
      <AppKeyVisual 
        imageAlt="헤드셋을 착용하고 고객 응대 서비스를 하는 직원들"
        :animationDuration="1200"
      />
    </section>

    <div class="inner">
      <!-- 타이틀 섹션 -->
      <section class="title-section">
        <AppTitle 
          title="Customer eXperience Platform"
          text="디지털 시대의 성공은 고객을 얼마나 깊이 이해하고 만족시키는지에 달려있습니다.<br>콘센트릭스 TPE본부는 Salesforce.com과 Adobe Experience Cloud라는 세계 최고 수준의 솔루션 공식 컨설팅 파트너로서, 고객 경험(Customer Experience)을 혁신하고 비즈니스 성장을 이끌어 나가는 전문가 그룹입니다."
        />
        </section>

      <!-- Sales 이미지 섹션 -->
      <section class="sales-image-section">
        <picture>
          <source media="(min-width: 1480px)" srcset="/assets/cnx/what-we-do/technology-platforms/customer-experience-platform/salesforce.png">
          <source media="(min-width: 768px)" srcset="/assets/cnx/what-we-do/technology-platforms/customer-experience-platform/salesforce_t.png">
          <img 
            src="/assets/cnx/what-we-do/technology-platforms/customer-experience-platform/salesforce_m.png" 
            alt="Salesforce와 Adobe Experience Cloud의 공식 파트너 로고"
            class="sales-image"
            loading="lazy"
          />
        </picture>
      </section>

      <section class="content-section">
        <AppImgCont 
          title="Sales Cloud, Service Cloud"
          imageName="sales"
          text="<b>콘센트릭스는 세일즈포스 공식 컨설팅 파트너</b>로서,<br>다년간의 Sales cloud, Service cloud 프로젝트 경험과 AI 기반 고객 경험 혁신 역량을 보유하고 있으며. 다양한 산업의 특수성을 이해하고, <b>고객 여정을 중심으로 한 디지털 전환</b>을 성공적으로 이끌어가고 있습니다."
          :reverse="true"
          :subItems="salesServiceSubItems"
          imageAlt="Sales Cloud와 Service Cloud를 설명하는 비즈니스 여성 모델"
          :alignTop="true"
        />
      </section>

      <section class="content-section">
        <AppImgCont 
          title="SF CREAM"
          vimeoId="922735558"
          text="SF CREAM(Salesforce Customer Relationship Engagement Application Module)은 세일즈포스닷컴 솔루션을 기반으로 한 컨택센터 운영솔루션입니다. 콘센트릭스의 글로벌 컨택센터 운영 노하우가 집대성 되어 상담 관리자와 상담원의 업무 생산성 증대 및 관리 효율성에 초점이 맞춰진 모듈형 솔루션 입니다."
          :subItems="sfCreamSubItems"
          imageAlt="SF CREAM 솔루션 소개 영상의 썸네일 화면"
          :alignTop="true"
        />
      </section>

      <section class="content-section">
        <AppImgCont 
          title="Agentforce"
          imageName="agentforce"
          text="콘센트릭스는 세일즈포스 Agentforce 솔루션을 기반으로 고객사의 AX 전환을 성공적으로 지원하고 있습니다."
          :reverse="true"
          :subItems="agentforceSubItems"
          imageAlt="Agentforce 솔루션의 인터페이스"
          :alignTop="true"
        />
      </section>

      <section class="content-section">
        <AppImgCont 
          title="Adobe Experience Cloud"
          imageName="aec"
          text="콘센트릭스는 Adobe Experience Cloud 기반의 디지털 고객 경험 전문 기업으로 아래 서비스를 제공합니다"
          :subItems="aecSubItems"
          imageAlt="Adobe Experience Cloud 솔루션의 인터페이스"
          :alignTop="true"
        />
      </section>

      <!-- 특징 섹션 (3개 컬럼) -->
      <section class="features-section">
        <AppCardList 
          :items="[
            { 
              id: 1, 
              title: '전략 플랫폼', 
              description: 'Salesforce · Adobe Experience Cloud'
            },
            { 
              id: 2, 
              title: '데이터 & 오케스트레이션', 
              description: 'CDP · Real-time Profile / Segmentation, Consent / Privacy Management, Omnichannel Journey Orchestration · Trigger/Rule-based Personalization'
            },
            { 
              id: 3, 
              title: '핵심 기능 & 통합', 
              description: 'Sales Cloud(SFA) / Service Cloud( Contact Center, Field service ) / Agent Force /  CREAM( salesforce.com 패키지, CTI/문자/카카오상담톡 ) / Campaign Automation · Experimentation / Attribution · Dashboard, DXP · Commerce ·  Contact Center · Ad-Tech 연동' ,
            }
          ]"
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

// Sales Cloud, Service Cloud 서브 아이템들
const salesServiceSubItems = computed(() => [
  {
    title: '영업 생산성을 극대화하는 Sales Cloud',  
    listItems: [
      'Sales Cloud를 통해 영업 파이프라인 관리, 리드 추적, 성과 분석을 자동화하여 영업팀의 생산성을 극대화합니다. '
    ]
},
  {
    title: '효율적인 고객 응대를 지원하는 Service Cloud',
    listItems: [
      'Service Cloud를 통해 옴니채널 고객 지원, 상담원 생산성 향상, 셀프 서비스 포털 구축 등을 지원하여 고객 만족도를 높이고 효율적인 고객 서비스를 가능하게 합니다. '
    ]
  }
])

// SF CREAM 서브 아이템들
const sfCreamSubItems = computed(() => [
  {
    listItems: [
      '상담업무에 필요한 CTI (Computer Telephony Integration)',
      '문자와 카카오톡 등 메세징',
      '이메일',
      'Chat Bot 고객 셀프서비스'
    ]
  }
])

// Agentforce 서브 아이템들
const agentforceSubItems = computed(() => [
  {
    title: 'Agentforce AI 역량',
    listItems: [
      '검증된 인력으로 구성된 Agentforce팀을 바탕으로 창의적이고 안정적인 AI환경을 만들 수 있습니다.'
    ]
  },
  {
    title: '맞춤형 AI컨설팅 제공 ',
    listItems: [
      '콘센트릭스는 다양한 산업분야를 대상으로 AI기반 DT혁신을 위한 맞춤형 컨설팅을 제공해 드립니다.'
    ]
  }
])

// Adobe Experience Cloud 서브 아이템들
const aecSubItems = computed(() => [
  {
    listItems: [
      'Adobe Analytics를 활용한 데이터 분석',
      'Adobe Target을 활용한 개인화 및 A/B 테스트',
      'Adobe Campaign을 활용한 캠페인 자동화',
      'Adobe Real-Time CDP를 활용한 실시간 고객 통합/분석'
    ]
  }
])
</script>

<style lang="scss" scoped>
.commerce-platform-page {
  * {
    word-break: keep-all;
  }


  .sales-image-section {
    margin-bottom: rem(21);
    
    @include tablet {
      margin-bottom: rem(31);
    }
    
    @include desktop {
      margin-bottom: rem(120);
    }
    
    picture {
      display: block;
      text-align: center;
    }
    
    .sales-image {
      width: rem(278);
      height: auto;
      display: block;
      margin: 0 auto;
      
      @include tablet {
        width: rem(514);
      }
      
      @include desktop {
        width: rem(714);
      }
    }
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
