<template>
  <div class="aboutus">

    <AppKeyVisual 
      imageAlt="위에서 내려다본 시점의 직장인들. 회색 바닥 위를 걷거나 서 있는 비즈니스 복장의 사람들"
      :animationDuration="1500"
    />

    <div class="inner">

      <AppTitle 
        title="About Us"
      />
      
      <!-- intro video -->
      <overviewIntro />

      <!-- introduce -->
      <overviewInformation :createHeadAnimation="createHeadAnimation"/>

      <!-- history -->
      <overviewHistory :historyList="historyList" :createHeadAnimation="createHeadAnimation"/>

      <!-- business -->
      <!-- <overviewBusiness :businessItems="businessItems" :createHeadAnimation="createHeadAnimation"/> -->

    </div>

  </div>
</template>

<script setup>
  import { ref } from 'vue'

  import AppKeyVisual from '~/components/cnx/AppKeyVisual' 
  import AppTitle from '~/components/cnx/AppTitle'

  import overviewIntro from '~/pages/cnx/about-us/overview/overviewIntro'
  import overviewInformation from '~/pages/cnx/about-us/overview/overviewInformation'
  import overviewHistory from '~/pages/cnx/about-us/overview/overviewHistory'
  import overviewBusiness from '~/pages/cnx/about-us/overview/overviewBusiness'

  definePageMeta({ 
    layout: 'concentrix',
    ssr: false,
  })

  // history list
  const historyList = ref([
    {
      thumb: '/assets/cnx/about-us/overview/2014.png',
      alt: '2014년 인수 대상인 IBM 로고',
      year: '2014',
      detail: [
        { title: 'IBM CRM BPO 인수', content: 'CRM & Digital Marketing ($1.2B)' },
      ]
    },
    {
      thumb: '/assets/cnx/about-us/overview/2016.png',
      alt: '2016년 인수한 Minacs 로고와 회사 건물',
      year: '2016',
      detail: [
        { title: 'Minacs 인수', content: 'Global CRM & Marketing Optimization Company ($420M)' }
      ]
    },
    {
      thumb: '/assets/cnx/about-us/overview/2017.png',
      alt: '협업과 디지털 작업을 상징하는 사무실 장면들',
      year: '2017',
      detail: [
        { title: 'Tigerspike 인수', content: 'Digital Product & Strategy Company ($120M)' }
      ]
    },
    {
      thumb: '/assets/cnx/about-us/overview/2018.png',
      alt: '2018년 인수 대상인 Convergys 로고와 ACT 로고',
      year: '2018',
      detail: [
        { title: 'Convergys 인수', content: 'Global Customer Care Company ($2.2B)' },
        { title: 'ACT 센터 출범', content: '' }
      ]
    },
    {
      thumb: '/assets/cnx/about-us/overview/2020.png',
      alt: 'Nasdaq 상장 기념 전광판 스크린과 CiX 로고',
      year: '2020',
      detail: [
        { title: 'Nasdaq 상장', content: '글로벌 CX & Tech 기업으로 상장 (Nasdaq : CNXC)' },
        { title: 'CiX 센터 출범', content: '' }
      ]
    },
    {
      thumb: '/assets/cnx/about-us/overview/2021.png',
      alt: 'Value Factory 로고 및 CX Design Engineering PK 로고',
      year: '2021',
      detail: [
        { title: 'Value Factory 인수', content: 'eCommerce Solution Company' },
        { title: 'PK 인수', content: 'CX Design Engineering Company ($1.6B)' }
      ]
    },
    {
      thumb: '/assets/cnx/about-us/overview/2022.png',
      alt: 'ServiceSource 로고',
      year: '2022',
      detail: [
        { title: 'ServiceSource 인수', content: 'B2B Digital Sales Company ($131M)' }
      ]
    },
    {
      thumb: '/assets/cnx/about-us/overview/2023.png',
      alt: 'Concentrix와 Webhelp 합병을 나타내는 로고',
      year: '2023.09',
      detail: [
        { title: 'Webhelp 합병', content: 'Global \'tech-powered\' company ($4B)' }
      ]
    },
    {
      thumb: '/assets/cnx/about-us/overview/2024.png',
      alt: '리브랜딩 후의 Concentrix 로고',
      year: '2024.04',
      detail: [
        { title: 'ReBranding', content: 'CI & Culture Statement Renewal' }
      ]
    },
    {
      thumb: '/assets/cnx/about-us/overview/2025.png',
      alt: 'SAI Digital 로고',
      year: '2025.09',
      detail: [
        { title: '‘SAI Digital’ 인수합병', content: 'E2E 이커머스 솔루션 서비스 및 자체 AI 솔루션 보유,<br>한국형 베트남 오프쇼어 개발 운영 모델 완성' }
      ]
    }
  ])

  // Digital & Technology Business
  const businessItems = ref([
    {
      title: 'Strategy & UX',
      detail: [
        { 
          title: 'Digital Marketing Consulting', 
          content: [
            '디지털 채널 진단 및 전략 수립',
            '글로벌 Governance 설계',
            'eCommerce 전략 수립',
            '디지털 KPI & 성과관리 체계 설계',
            '선진사 Benchmark'
          ]
        },
        { 
          title: 'UX/UI/Contents', 
          content: [
            'UX / UI 디자인',
            'GUI 디자인',
            '마케팅 콘텐츠',
            '제품 콘텐츠',
            'Digital Studio',
          ]
        }
      ]
    },
    {
      title: 'Analytics',
      detail: [
        { 
          title: 'Digital Analytics', 
          content: [
            '디지털 분석 & 태깅 기획 및 운영',
            'Google Analytics & GMP 컨설팅',
            'UI/UX 분석',
            'SEO & GEO 컨설팅',
            '소셜 리스닝 분석',
            '광고 성과 분석 (Tech 기반)',
            'AI 기반 개인화 마케팅',
            '비즈니스 인텔리전스 & 시각화',
            '캠페인 기획 및 운영',
            '세일즈 채널 모니터링 & 인사이트',
            '데이터 엔지니어링',
            'Analytics 솔루션 (GA, Adobe, AB Testing & Personalization Solutions 등)'
          ]
        }
      ]
    },
    {
      title: 'Customer Service',
      detail: [
        { 
          title: 'Customer Service', 
          content: [
            '내용 수급 필요'
          ]
        }
      ]
    },
    {
      title: 'Web building <br>&  Management',
      detail: [
        { 
          title: 'Global dotcom & e-Commerce', 
          content: [
            '글로벌 채널 기획, 구축',
            '글로벌 채널 운영 PMO',
            '글로벌 이커머스 PO, BA',
            '글로벌 딜리버리센터 운영',
            '글로벌 번역센터',
          ]
        },
        { 
          title: 'Digital Marketing', 
          content: [
            'E2E 캠페인',
            '디지털 광고',
            'E-Sales',
            'E-Commerce',
            'Search Engine Optimization',
          ]
        },
        { 
          title: 'Technology Platforms', 
          content: [
            'Commerce Platform',
            'Customer eXperience Platform',
            'Digital eXperience Platform',
            'AI Platform',
          ]
        },
        { 
          title: 'Technology Services', 
          content: [
            'System Integration & Architecting',
            'AX Consulting & Implementation',
          ]
        }
      ]
    },
  ])

  // Intersection Observer 기반 애니메이션 함수
  const createHeadAnimation = (triggerElement, titleElement, textElement) => {
    if (!triggerElement) return

    let lastScrollY = 0
    let isFirstCheck = true

    const observer = new IntersectionObserver(
      ([entry]) => {
        const currentScrollY = window.scrollY || window.pageYOffset
        const isScrollingDown = currentScrollY > lastScrollY
        const isNearTop = currentScrollY < 100

        if (entry.isIntersecting && (isScrollingDown || isFirstCheck || isNearTop)) {
          triggerElement.classList.add('active')
          isFirstCheck = false
        } else if (!entry.isIntersecting && !isScrollingDown) {
          triggerElement.classList.remove('active')
          isFirstCheck = true
        }

        lastScrollY = currentScrollY
      },
      {
        threshold: 0.2,
        rootMargin: '-50px'
      }
    )

    observer.observe(triggerElement)

    // observer 반환하여 필요시 cleanup 가능하도록
    return observer
  }

</script>

<style lang="scss" scoped>

  .aboutus {

    padding-bottom: rem(40);
    @include tablet {
      padding-bottom: rem(80);
    }
    @include desktop {
      padding-bottom: rem(100);
    }

    overflow: hidden;

  }

</style>