export const useNavigation = () => {
  const router = useRouter()
  
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
            { text: 'Global dotcom & e-Commerce', path: '' },
            { text: 'Customer Service', path: '' }
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
  
  return {
    getMenuData,
    getCurrentActiveMenu,
    menuStructure
  }
}
