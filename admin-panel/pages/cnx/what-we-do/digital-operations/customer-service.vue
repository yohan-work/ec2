<template>
  <div class="commerce-platform-page">
    <!-- 키 비주얼 섹션 -->
    <section class="key-visual-section">
      <AppKeyVisual 
        imageAlt="
밤의 도시를 배경으로 태블릿을 사용하는 비즈니스 여성"
        :animationDuration="1200"
      />
    </section>

    <div class="inner">
      <!-- 타이틀 섹션 -->
      <section class="title-section">
        <AppTitle 
          title="Customer Service"
          text="전문 지식, 첨단 기술, 구조화된 운영 모델을 통해 차별화된 고객 경험을 제공합니다."/>
      </section>

      <!-- Sales & Marketing​ 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="Sales & Marketing"
          text="B2B 및 B2C 고객 모두의 니즈를 충족하도록 설계된 업계를 선도하는 세일즈 솔루션을 활용하십시오. 고객 확보부터 유지 관리까지, 잠재 고객을 충성도 높은 고객으로 전환하고 성장을 촉진할 수 있도록 도와드립니다."
          imageName="sm"
          imageAlt="위에서 내려다본 원형 테이블 회의에 참여한 팀원들"
          :reverse="true"
        />
      </section>

      <!-- Digital Sales 운영 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="Digital Sales 운영"
          text="온라인 세일즈 컨설팅을 통해 매출 극대화를 위한 실질적인 솔루션을 만나보세요. 디지털 채널에서의 세일즈 전략, 성공적인 온라인 세일즈 운영 체계 셋업을 위한 상담인력 구성부터 핵심성과지표 정의 및 운영 프로세스 설계까지 운영 모델 컨설팅 수행을 수행합니다. <br>디지털 채널 기반의 온라인 판매 상담을 직접 수행하는 운영 서비스를 제공하여 디지털 채널에서의 매출 증대를 지원합니다."
          imageName="ds"
          imageAlt="디지털 세일즈 운영을 상징하는 추상적인 데이터 노드"
        />
      </section>
      
    </div>

      <!-- Customer Service​ 섹션 -->
      <section class="content-section">
        <AppSubCont 
          title="Customer Service"
          description="고객이 필요로 하는 때와 장소에서 항상 함께하며, 고객의 문의 사항을 간편하게 해결하여 원활한 경험을 제공합니다. <br>당사의 종합적인 접근 방식은 고객의 구체적인 요구에 부응하는 혁신적인 지원 역량을 뒷받침합니다."
          imageName="cs"
          imageAlt="고객 서비스 전략을 논의하는 사무실 회의 장면"
          imagePath="/assets/cnx/what-we-do/digital-operations/customer-service"
        />
      </section>

      <div class="inner">

        <!-- Technical Support​​ 섹션 -->
        <section class="content-section">
          <AppImgCont 
            title="Technical Support"
            text="뛰어난 기술 지원과 헬프데스크 서비스를 통해 고객의 공감을 불러일으키는 쉽고 원활한 경험을 제공하여 고객을 브랜드 지지자로 만들어 드립니다."
            imageName="ts"
            imageAlt="컴퓨터 앞에서 기술 지원 업무를 하는 전문가"
          />
        </section>
        
      </div>
  </div>
</template>

<script setup>
import AppKeyVisual from '~/components/cnx/AppKeyVisual.vue'
import AppTitle from '~/components/cnx/AppTitle.vue'
import AppImgCont from '~/components/cnx/AppImgCont.vue'
import AppSubCont from '~/components/cnx/AppSubCont.vue'

// 레이아웃 설정
definePageMeta({
  layout: 'concentrix'
})

</script>

<style lang="scss" scoped>
.commerce-platform-page {
  * {
    word-break: keep-all;
  }

  :deep(.title-content) {
    max-width: unset;
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
