<template>
  <div class="commerce-platform-page">
    <!-- 키 비주얼 섹션 -->
    <section class="key-visual-section">
      <AppKeyVisual 
        imageAlt="Customer eXperience Platform Key Visual"
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
            alt="Sales Cloud, Service Cloud 이미지"
            class="sales-image"
          />
        </picture>
      </section>

      <!-- 특징 섹션 (3개 컬럼) -->
      <section class="features-section">
        <AppCardList 
          :items="[
            { 
              id: 1, 
              title: '전략 플랫폼', 
              description: 'CDP · Real-time Profile / Segmentation, Consent / Privacy Management, Omnichannel Journey Orchestration · Trigger / Rule-based Personalization' ,
            },
            { 
              id: 2, 
              title: '데이터 & 오케스트레이션', 
              description: 'CDP · Real-time Profile / Segmentation, Consent / Privacy Management, Omnichannel Journey Orchestration · Trigger / Rule-based Personalization' ,
            },
            { 
              id: 3, 
              title: '핵심 기능 & 통합', 
              description: 'Sales Cloud(SFA) / Service Cloud( Contact Center, Field service ) / Agent Force /  CREAM( salesforce.com 패키지, CTI / 문자 / 카카오상담톡) / Campaign Automation · Experimentation / Attribution · Dashboard, DXP · Commerce · Contact Center · Ad-Tech 연동' ,
            }
          ]"
        />
      </section>

      <section class="content-section">
        <AppImgCont 
          title="Sales Cloud, Service Cloud"
          imageName="sales"
          text="<b>콘센트릭스는 세일즈포스 공식 컨설팅 파트너</b>로서,<br>다년간의 Sales cloud, Service cloud 프로젝트 경험과 AI 기반 고객 경험 혁신 역량을 보유하고 있으며. 다양한 산업의 특수성을 이해하고, 고객 여정을 중심으로 한 디지털 전환을 성공적으로 이끌어가고 있습니다."
          :reverse="true"
          :subItems="salesServiceSubItems"
        />
      </section>

      <section class="content-section">
        <AppImgCont 
          title="SF CREAM"
          imageName="sf"
          text="SF CREAM(Salesforce Customer Relationship Engagement Application Module)은 세일즈포스닷컴 솔루션을 기반으로 한 컨택센터 운영솔루션입니다. 콘센트릭스의 글로벌 컨택센터 운영 노하우가 집대성 되어 상담 관리자와 상담원의 업무 생산성 증대 및 관리 효율성에 초점이 맞춰진 모듈형 솔루션 입니다."
          :subItems="sfCreamSubItems"
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
    listItems: [
      'Sales Cloud를 통해 영업 파이프라인 관리, 리드 추적, 성과 분석을 자동화하여 영업팀의 생산성을 극대화합니다.',
      'Service Cloud를 통해 옴니채널 고객 지원, 상담원 생산성 향상, 셀프 서비스 포털 구축 등을 지원하여 고객 만족도를 높이고 효율적인 고객 서비스를 가능하게 합니다.'
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
