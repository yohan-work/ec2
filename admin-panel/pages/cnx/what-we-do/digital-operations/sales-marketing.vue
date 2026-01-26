<template>
  <div class="commerce-platform-page">
    <!-- 키 비주얼 섹션 -->
    <section class="key-visual-section">
      <AppKeyVisual 
        imageAlt="회의를 하고있는 3명의 인물"
        :animationDuration="1200"
      />
    </section>

    <div class="inner">
      <!-- 타이틀 섹션 -->
      <section class="title-section">
        <AppTitle 
          title="Sales & Marketing"
          text="혁신적인 영업&middot;마케팅으로 지속 가능한 성장을 이끕니다<br><span class='weight-normal'>영업 및 마케팅은 빠르게 변하는 환경 속에서 유연한 대응과 전략적 판단이 필수입니다. 디지털 전환의 흐름을 선도해야 한다는 압박이 커지는 가운데, 혁신을 추구하면서도 고객과의 신뢰와 관계라는 본질을 지키는 균형이 중요합니다.</span>"/>
      </section>

      <!-- Sales & Marketing​ 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="B2B Sales"
          imageName="b2b"
          imageAlt="업무적인 대화를 나누는 두명의 인물"
          :reverse="true"
          :subItems="b2bSalesSubItems"
          :alignTop="true"
        />
      </section>

      <!-- Digital Sales 운영 섹션 -->
      <section class="content-section">
        <AppImgCont 
          title="B2C Sales"
          imageName="b2c"
          imageAlt="마케팅 업무를 진행중인 여성의 모습습"
          :subItems="b2cSalesSubItems"
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
import AppSubCont from '~/components/cnx/AppSubCont.vue'

// 레이아웃 설정
definePageMeta({
  layout: 'concentrix'
})

// Customer Care 서브 아이템들
const b2bSalesSubItems = computed(() => [
  {
    title: '통합된 영업 엔진으로 성장 가속화',
    listItems: [
      '우리는 설계부터 실행까지 혁신적인 방식으로 B2B 영업 아웃소싱을 제공합니다. 모든 단계에서 고객사와 긴밀히 협력하며 매출을 한 단계 더 높이는 데 집중합니다. 인사이트, 최신 기술, 전문 인력, 효율적인 프로세스를 결합해 최첨단 영업 솔루션을 구현하고, 거래 성사율과 수익 성장을 극대화합니다.'
    ]
  },
  {
    title: '수요 창출',
    listItems: [
      `의미 있는 대화를 유도하고, 자격을 갖춘 리드를 생성하고, 손쉽게 약속을 잡으세요. 우리의 접근 방식은 고객사를 이상적인 고객과 연결하여 매출을 확실하게 향상시킵니다.
      <ul class="sub-none-list">
        <li>리드 검증</li>
        <li>리드 생성</li>
        <li>약속 예약</li>
      </ul>`
    ]
  },
  {
    title: '내부 영업',
    listItems: [
      `전문 영업 기술로 중소기업에서 엔터프라이즈급 매출로 도약하세요. 리드를 발굴하고 육성해 정확하게 전환하며, 원활한 거래 성사를 지원합니다.
      <ul class="sub-none-list">
        <li>리드 전환</li>
        <li>신규 고객 확보</li>
        <li>리드 재활성화</li>
        <li>아웃바운드 캠페인</li>
      </ul>`
    ]
  },
  {
    title: '고객 성공 & 계약 갱신',
    listItems: [
      `온보딩부터 갱신까지, 고객과의 장기적인 관계를 구축해 매출과 유지율을 높입니다. 사전 예방적 어카운트 관리로 고객 가치를 극대화합니다.
      <ul class="sub-none-list">
        <li>어카운트 관리</li>
        <li>온보딩 및 활용</li>
        <li>업셀링 & 크로스셀링</li>
        <li>계약 갱신</li>
        <li>충성도 프로그램</li>
      </ul>`
    ]
  }
])

// Customer Care 서브 아이템들
const b2cSalesSubItems = computed(() => [
  {
    title: '맞춤형 턴키 솔루션',
    listItems: [
      '당신에게 필요한 것은 단순한 B2C 영업 솔루션이 아니라, 편리함을 넘어선 탁월함입니다. 고객의 니즈를 이해하고 세심하게 케어하는 경험 많은 팀이 함께합니다. 고객이 부담이 아닌 지원받는 느낌을 받을 수 있도록 돕습니다.AI와 최신 마케팅 기술로 강화된 전문 영업팀이 신규 고객 확보, 충성도 향상, 고객 생애가치 극대화를 지원합니다.'
    ]
  },
  {
    title: '엔터프라이즈 영업',
    listItems: [
      '옴니채널 기반의 리드 생성 및 전환 엔진을 구축하고, 어떤 시장에서도 기회를 성사시킬 수 있는 전문 팀을 제공합니다.'
    ]
  },
  {
    title: '고객 확보 및 온보딩',
    listItems: [
      '데이터 기반 캠페인을 통해 신규 고객을 발굴·유치·전환하고, 마찰 없는 경험을 제공해 이탈을 최소화합니다.'
    ]
  },
  {
    title: '매출 성장',
    listItems: [
      '실시간으로 고객과 연결해 제품 데모와 영업 지원을 제공하며, 크로스셀·업셀 기회를 적극 발굴합니다.'
    ]
  },
  {
    title: '유지 및 계약 갱신',
    listItems: [
      '고급 고객 분석을 활용해 이탈 가능성이 높은 고객을 사전에 파악하고, 브랜드에 대한 애정을 다시 불러일으키는 전략을 실행합니다.'
    ]
  }
])

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