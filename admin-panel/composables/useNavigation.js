export const useNavigation = () => {
  const router = useRouter()
  
  // 페이지별 메타데이터 매핑 (기존 menuStructure와 별도로 관리)
  const pageMetaData = {
    '/': {
      title: 'Concentrix - A Global Technology and Service Leader',
      description: 'Concentrix는 글로벌 기술 및 서비스 리더로서 고객 경험을 혁신하고 비즈니스 성과를 향상시킵니다.',
      ogImage: '/assets/cnx/share/concentrix-share.png'
    },
    '/what-we-do/strategy-and-design/contents-and-design': {
      title: 'Contents and Design - Concentrix',
      description: 'CiX(CiX interactive eXperience)는 Concentrix의 UX/UI와 Contents 제작을 전담하는 Creative 조직입니다. UX/BX 컨설팅, 디지털 채널 구축/운영, 디지털마케팅 콘텐츠 제작을 통해 브랜드 웹사이트, 이커머스 플랫폼, 앱 서비스, 소셜 콘텐츠, 온라인 전시 등 다양한 디지털 경험을 제공합니다.',
      ogImage: '/assets/cnx/share/concentrix-share.png'
    },
    '/what-we-do/strategy-and-design/digital-advertising': {
      title: 'Digital Advertising - Concentrix',
      description: '데이터 기반의 디지털 광고 전략으로 브랜드의 성장을 이끌어갑니다. 고객 여정 데이터 인사이트 분석을 통한 디지털 마케팅 전략 수립, 브랜딩, 유저 획득, 데이터 분석, 타겟 최적화 크리에이티브까지 Full Funnel Performance를 제공합니다.',
      ogImage: '/assets/cnx/share/digital-advertising-share.png'
    },
    '/what-we-do/data-and-analytics/marketing-and-sales-analytics': {
      title: 'Marketing & Sales Analytics - Concentrix',
      description: 'AI 기반 마케팅 & 세일즈 애널리틱스로 비즈니스 성과를 극대화합니다. 캠페인 기획/운영, 소셜 리스닝 분석, 광고 성과 분석, 개인화 마케팅, 세일즈 채널 모니터링을 통해 데이터 기반의 마케팅 전략을 제공합니다.',
      ogImage: '/assets/cnx/share/marketing-sales-analytics-share.png'
    },
    '/what-we-do/data-and-analytics/digital-channel-analytics': {
      title: 'Digital Channel Analytics - Concentrix',
      description: '디지털 채널 애널리틱스로 고객 여정을 정밀 분석하고 성과를 극대화합니다. GA4 360 공식 리셀러로서 디지털 분석, SEO/GEO 컨설팅, UI/UX 애널리틱스, 콘텐츠 모니터링을 통해 데이터 기반의 비즈니스 인사이트를 제공합니다.',
      ogImage: '/assets/cnx/share/digital-channel-analytics-share.png'
    },
    '/what-we-do/data-and-analytics/data-engineering': {
      title: 'Data Engineering - Concentrix',
      description: '데이터 엔지니어링으로 비즈니스 인사이트를 실현합니다. 디지털 콘텐츠 크롤링, 데이터 파이프라인 구축, 클라우드 플랫폼 운영을 통해 AWS/GCP 공식 파트너로서 안정적이고 효율적인 데이터 인프라를 제공합니다.',
      ogImage: '/assets/cnx/share/data-engineering-share.png'
    },
    '/what-we-do/data-and-analytics/analytics-solution': {
      title: 'Analytics Solution - Concentrix',
      description: '애널리틱스 솔루션으로 데이터 기반 의사결정을 실현합니다. GA4 360, Adobe Analytics 공식 리셀러로서 웹/앱 분석, UI/UX 애널리틱스, A/B 테스팅 및 개인화 솔루션을 통해 End-to-End 통합 컨설팅을 제공합니다.',
      ogImage: '/assets/cnx/share/analytics-solution-share.png'
    },
    '/what-we-do/data-and-analytics/enterprise-intelligence': {
      title: 'Enterprise Intelligence - Concentrix',
      description: '엔터프라이즈 인텔리전스로 데이터 기반의 비즈니스 의사결정을 지원합니다. 디지털 콘텐츠 크롤링, 데이터 파이프라인 구축을 통해 시장 동향 분석, 경쟁사 분석, 트렌드 예측 등 End-to-End 디지털 마케팅 솔루션을 제공합니다.',
      ogImage: '/assets/cnx/share/enterprise-intelligence-share.png'
    },
    '/what-we-do/technology-platforms/commerce-platform': {
      title: 'Commerce Platform - Concentrix',
      description: '커머스 플랫폼으로 글로벌 B2B·B2C 비즈니스를 통합 지원합니다. SAP Commerce, Adobe Commerce, Shopify, COZE 기반 올인원 플랫폼으로 멀티브랜드·다국가 운영에 최적화된 Headless·Composable 확장성을 제공합니다.',
      ogImage: '/assets/cnx/share/commerce-platform-share.png'
    },
    '/what-we-do/technology-platforms/customer-experience-platform': {
      title: 'Customer eXperience Platform - Concentrix',
      description: '고객 경험 플랫폼으로 디지털 전환을 성공적으로 이끕니다. Salesforce와 Adobe Experience Cloud 공식 컨설팅 파트너로서 Sales Cloud, Service Cloud, SF CREAM을 통해 고객 경험 혁신과 비즈니스 성장을 지원합니다.',
      ogImage: '/assets/cnx/share/customer-experience-platform-share.png'
    },
    '/what-we-do/technology-platforms/digital-experience-platform': {
      title: 'Digital eXperience Platform - Concentrix',
      description: '디지털 경험 플랫폼으로 통합된 고객 경험을 제공합니다. AEM, ION, OutSystems 기반 Low-code·Headless Architecture로 멀티사이트·현지화·번역을 통해 운영 효율성과 일관된 고객 경험을 실현합니다.',
      ogImage: '/assets/cnx/share/digital-experience-platform-share.png'
    },
    '/what-we-do/technology-platforms/ai-platform': {
      title: 'AI Platform - Concentrix',
      description: 'AI 플랫폼으로 비즈니스 혁신을 실현합니다. iX Hello AI Agent Platform과 AI Aura를 통해 코딩 없이 챗봇 구축, 업무 자동화, 데이터 분석 및 예측 모델 개발로 기업의 경쟁력을 강화합니다.',
      ogImage: '/assets/cnx/share/ai-platform-share.png'
    },
    '/what-we-do/technology-services/system-intergration-and-architecting': {
      title: 'System Integration & Architecting - Concentrix',
      description: '시스템 통합 및 아키텍처 설계로 기업의 IT 인프라를 최적화합니다.',
      ogImage: '/assets/cnx/share/system-integration-share.png'
    },
    '/what-we-do/technology-services/ax-consulting-and-implementation': {
      title: 'AX Consulting & Implementation - Concentrix',
      description: 'AX 컨설팅 및 구현 서비스로 기업의 디지털 전환을 지원합니다.',
      ogImage: '/assets/cnx/share/ax-consulting-share.png'
    },
    '/what-we-do/digital-operations/global-dotcom-and-e-commerce': {
      title: 'Global dotcom & e-Commerce - Concentrix',
      description: '글로벌 닷컴 및 이커머스 서비스로 전 세계 고객에게 최적화된 디지털 경험을 제공합니다.',
      ogImage: '/assets/cnx/share/global-dotcom-share.png'
    },
    '/what-we-do/digital-operations/customer-service': {
      title: 'Customer Service - Concentrix',
      description: '고객 서비스 솔루션으로 브랜드와 고객 간의 강력한 연결을 구축합니다.',
      ogImage: '/assets/cnx/share/customer-service-share.png'
    },
    '/what-we-do/digital-operations/trust-and-safety': {
      title: 'Trust & Safety - Concentrix',
      description: '신뢰와 안전을 기반으로 한 디지털 운영 서비스로 안전한 온라인 환경을 제공합니다.',
      ogImage: '/assets/cnx/share/trust-safety-share.png'
    },
    '/about-us/overview': {
      title: 'About Us - Concentrix',
      description: 'Concentrix에 대해 알아보세요. 글로벌 기술 및 서비스 리더로서의 비전과 미션을 확인하세요.',
      ogImage: '/assets/cnx/share/overview-share.png'
    },
    '/about-us/newsroom': {
      title: 'Newsroom - Concentrix',
      description: '디지털 마케팅 및 e-Commerce 전문 서비스 기업 콘센트릭스의 최신 소식입니다. 새로운 역량으로 차별화된 컨센트릭스의 서비스를 확인해 보세요.',
      ogImage: '/assets/cnx/share/concentrix-share.png'
    },
    '/careers': {
      title: 'Careers - Concentrix',
      description: '콘센트릭스에서 새로운 성장의 기회를 만나보세요. 수평적인 조직 문화와 전문가 집단을 운영하며, Digital & Technology Business와 Customer Service 분야에서 당신의 역량을 발휘할 수 있는 기회를 제공합니다.',
      ogImage: '/assets/cnx/share/careers-share.png'
    },
    '/contact-us': {
      title: 'Contact Us - Concentrix',
      description: '콘센트릭스와 함께 성장의 여정을 시작하세요. Digital & Technology Business와 Customer Service 분야의 전문 센터에서 만나보실 수 있으며, 강남, 용산, 신도림, 구로, 문래, 명동 등 전국 주요 지역의 센터 정보와 연락처를 확인해보세요.',
      ogImage: '/assets/cnx/share/concentrix-share.png'
    }
  }
  
  const menuStructure = {
    whatwedo: {
      title: 'What We Do',
      path: null,
      sections: [
        {
          title: 'Strategy & Design',
          path: null,
          items: [
            { text: 'Contents and Design', path: '/what-we-do/strategy-and-design/contents-and-design' },
            { text: 'Digital Advertising', path: '/what-we-do/strategy-and-design/digital-advertising' }
          ]
        },
        {
          title: 'Data & Analytics',
          path: null,
          items: [
            { text: 'Marketing & Sales Analytics', path: '/what-we-do/data-and-analytics/marketing-and-sales-analytics' },
            { text: 'Digital Channel Analytics', path: '/what-we-do/data-and-analytics/digital-channel-analytics' },
            { text: 'Data Engineering', path: '/what-we-do/data-and-analytics/data-engineering' },
            { text: 'Analytics Solution', path: '/what-we-do/data-and-analytics/analytics-solution' },
            { text: 'Enterprise Intelligence', path: '/what-we-do/data-and-analytics/enterprise-intelligence' }
          ]
        },
        {
          title: 'Technology Platforms',
          path: null,
          items: [
            { text: 'Commerce Platform', path: '/what-we-do/technology-platforms/commerce-platform' },
            { text: 'Customer eXperience Platform', path: '/what-we-do/technology-platforms/customer-experience-platform' },
            { text: 'Digital eXperience Platform', path: '/what-we-do/technology-platforms/digital-experience-platform' },
            { text: 'AI Platform', path: '/what-we-do/technology-platforms/ai-platform' }
          ]
        },
        {
          title: 'Technology Services',
          path: null,
          items: [
            { text: 'System Integration & Architecting', path: '/what-we-do/technology-services/system-intergration-and-architecting' },
            { text: 'AX Consulting & Implementation', path: '/what-we-do/technology-services/ax-consulting-and-implementation' }
          ]
        },
        {
          title: 'Digital Operations',
          path: null,
          items: [
            { text: 'Global dotcom & e-Commerce', path: '/what-we-do/digital-operations/global-dotcom-and-e-commerce' },
            { text: 'Customer Service', path: '/what-we-do/digital-operations/customer-service' },
            { text: 'Trust & Safety', path: '/what-we-do/digital-operations/trust-and-safety' }
          ]
        }
      ]
    },
    aboutus: {
      title: 'About Us',
      path: null,
      sections: [
        {
          title: '',
          path: null,
          items: [
            { text: 'About Us', path: '/about-us/overview' }
          ]
        },
        {
          title: '',
          path: null,
          items: [
            { text: 'Newsroom', path: '/about-us/newsroom' }
          ]
        }
      ]
    },
    careers: {
      title: 'Careers',
      path: '/careers',
      sections: []
    },
    contactus: {
      title: 'Contact Us',
      path: '/contact-us',
      sections: []
    }
  }
  
  const getAvailableRoutes = () => {
    const routes = router.getRoutes()
    return routes.filter(route => 
      route.path.startsWith('/cnx/') && 
      !route.path.includes('[')
    )
  }
  
  const getMenuData = () => {
    const filteredMenu = {}
    
    for (const [key, menu] of Object.entries(menuStructure)) {
      if (menu.sections && menu.sections.length > 0) {
        filteredMenu[key] = menu
      }
    }
    
    return filteredMenu
  }
  
  const getCurrentActiveMenu = () => {
    const route = useRoute()
    const currentPath = route.path
    
    const menuData = getMenuData()
    
    for (const [key, menu] of Object.entries(menuData)) {
      if (currentPath.startsWith(menu.path)) {
        return key
      }
      
      for (const section of menu.sections) {
        if (currentPath.startsWith(section.path)) {
          return key
        }
        
        for (const item of section.items) {
          if (currentPath === item.path) {
            return key
          }
        }
      }
    }
    
    return null
  }
  
  // 페이지별 메타데이터를 가져오는 함수 (새로 추가)
  const getPageMeta = (path) => {
    // 정확한 경로 매칭 시도
    if (pageMetaData[path]) {
      return pageMetaData[path]
    }
    
    // 동적 라우트 처리 (예: /about-us/newsroom/[id])
    const dynamicPath = path.replace(/\/[^\/]+$/, '/[id]')
    if (pageMetaData[dynamicPath]) {
      return pageMetaData[dynamicPath]
    }
    
    // 기본 메타데이터 반환
    return {
      title: 'Concentrix',
      description: 'Concentrix 공식 웹사이트',
      ogImage: '/assets/cnx/share/concentrix-share.png'
    }
  }
  
  // 동적 콘텐츠 메타데이터를 정규화하는 함수 (새로 추가)
  const normalizeDynamicMeta = (meta) => {
    // 페이지별 동적 메타데이터를 정규화하여 기본값 보장
    return {
      title: meta.title || 'Concentrix',
      description: meta.description || 'Concentrix 공식 웹사이트',
      ogImage: meta.ogImage || '/assets/cnx/share/concentrix-share.png'
    }
  }
  
  return {
    getMenuData,
    getCurrentActiveMenu,
    getPageMeta, // 새로 추가된 메타데이터 함수
    normalizeDynamicMeta, // 동적 메타데이터 정규화 함수
    menuStructure
  }
}
