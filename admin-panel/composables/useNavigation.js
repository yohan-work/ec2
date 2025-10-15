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
            { text: 'Contents and Design', path: '/whatwedo/strategyndesign/contentsAndDesign' },
            { text: 'Digital Advertising', path: '/whatwedo/strategyndesign/digitaladvertising' }
          ]
        },
        {
          title: 'Data & Analytics',
          path: null,
          items: [
            { text: 'Marketing & Sales Analytics', path: '' },
            { text: 'Digital Channel Analytics', path: '/whatwedo/datananalytics/digitalchannelanalytics' },
            { text: 'Data Engineering', path: '' },
            { text: 'Analytics Solution', path: '' },
            { text: 'Enterprise Intelligence', path: '' }
          ]
        },
        {
          title: 'Technology Platforms',
          path: null,
          items: [
            { text: 'Commerce Platform', path: '' },
            { text: 'Customer eXperience Platform', path: '' },
            { text: 'Digital eXperience Platform', path: '' },
            { text: 'AI Platform', path: '' }
          ]
        },
        {
          title: 'Technology Services',
          path: null,
          items: [
            { text: 'System Integration & Architecting', path: '' },
            { text: 'AX Consulting & Implementation', path: '' }
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
            { text: 'About Us', path: '' }
          ]
        },
        {
          title: '',
          path: null,
          items: [
            { text: 'Newsroom', path: '/newsletters' }
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
      path: '/contactus',
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
