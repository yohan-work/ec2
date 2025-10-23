<template>
  <!-- 사이드 네비게이션 패널만 표시 -->
  <div 
    class="side-nav-panel" 
    :class="{ 'is-open': isOpen }"
    id="side-nav-panel"
    role="dialog"
    aria-modal="true"
    aria-labelledby="side-nav-title"
  >
      <!-- 헤더 영역 -->
      <div class="side-nav-header">
        <h2 id="side-nav-title" class="a11y-hidden">사이드 네비게이션 메뉴</h2>
        <div class="side-nav-logo">
          <div class="side-nav-logo__image" v-html="footerLogo"></div>
        </div>
        <button 
          class="side-nav-close"
          tabindex="0"
          aria-label="사이드 네비게이션 닫기"
          @click="closeSideNav"
          @keydown="handleCloseKeydown"
          v-html="closeIcon"
        ></button>
      </div>
      
      <!-- 네비게이션 메뉴 (푸터 스타일 적용) -->
      <nav class="side-nav-content">
        <div 
          v-for="(menu, key) in menuStructure" 
          :key="key"
          class="side-nav-menu-group"
          :data-menu="key"
        >
          <!-- 하위 섹션이 있는 경우 (아코디언) -->
          <template v-if="menu.sections && menu.sections.length > 0">
            <!-- 1뎁스 메뉴 타이틀 -->
            <div 
              class="side-nav-menu-title"
              :class="{ 'is-active': accordionState.openMenu === key }"
              tabindex="0"
              role="button"
              :aria-expanded="accordionState.openMenu === key ? 'true' : 'false'"
              :aria-controls="`side-nav-menu-${key}`"
              @click="toggleMenu(key)"
              @keydown="handleMenuKeydown($event, key)"
            >
              <span>{{ menu.title }}</span>
              <span 
                class="side-nav-icon"
                :class="{ 'side-nav-icon--rotated': accordionState.openMenu === key }"
                v-html="arrowIcon"
              ></span>
            </div>
            
            <!-- 2뎁스 섹션들 -->
            <div 
              class="side-nav-content-section"
              v-show="accordionState.openMenu === key"
              :id="`side-nav-menu-${key}`"
            >
              <div 
                v-for="(section, sectionIndex) in menu.sections" 
                :key="section.title"
                class="side-nav-section"
              >
                <!-- 2뎁스 섹션 타이틀 -->
                <div 
                  v-if="section.title" 
                  class="side-nav-subtitle"
                  tabindex="0"
                  role="button"
                  :aria-expanded="accordionState.openSection === `${key}-${sectionIndex}` ? 'true' : 'false'"
                  :aria-controls="`side-nav-section-${key}-${sectionIndex}`"
                  @click="toggleSection(`${key}-${sectionIndex}`)"
                  @keydown="handleSectionKeydown($event, `${key}-${sectionIndex}`)"
                >
                  <span>{{ section.title }}</span>
                  <span 
                    v-if="section.items && section.items.length > 0"
                    class="side-nav-icon"
                    :class="{ 'side-nav-icon--rotated': accordionState.openSection === `${key}-${sectionIndex}` }"
                    v-html="arrowIcon"
                  ></span>
                </div>
                
                <!-- 3뎁스 메뉴들 -->
                <ul 
                  v-show="accordionState.openAllSections || accordionState.openSection === `${key}-${sectionIndex}`"
                  v-if="section.items && section.items.length > 0" 
                  class="side-nav-list"
                  :id="`side-nav-section-${key}-${sectionIndex}`"
                >
                  <li v-for="item in section.items" :key="item.text" class="side-nav-list__item">
                    <NuxtLink 
                      v-if="item.path" 
                      :to="item.path" 
                      @click="closeSideNav"
                      @keydown="handleLinkKeydown"
                      class="side-nav-list__link"
                      tabindex="0"
                    >
                      {{ item.text }}
                    </NuxtLink>
                    <span v-else class="menu-item-disabled">{{ item.text }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </template>
          
          <!-- 하위 섹션이 없는 경우 (일반 링크) -->
          <template v-else>
            <div class="side-nav-menu-title">
              <NuxtLink 
                v-if="menu.path" 
                :to="menu.path" 
                @click="closeSideNav"
                @keydown="handleLinkKeydown"
                class="side-nav-menu-title__link"
                tabindex="0"
              >
                {{ menu.title }}
              </NuxtLink>
              <span v-else class="menu-item-disabled">{{ menu.title }}</span>
            </div>
          </template>
        </div>
      </nav>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import footerLogo from '~/components/assets/cnx/footer-logo.svg?raw'
import arrowHamburgerDown from '~/components/assets/cnx/arrow-hamburger-down.svg?raw'

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['close'])

// 네비게이션 composable 사용
const { menuStructure } = useNavigation()


// 아코디언 상태 관리 (푸터와 동일한 구조)
const accordionState = ref({
  openMenu: null, // 현재 열린 1뎁스 메뉴
  openSection: null, // 현재 열린 2뎁스 섹션
  openAllSections: false // 모든 섹션을 열어야 하는지 여부
})

// 아이콘들
const arrowIcon = arrowHamburgerDown
const closeIcon = computed(() => {
  // X 아이콘 SVG (박스를 가득 채우는 형태)
  return `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 2L16 16M2 16L16 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`
})


// 아코디언 토글 함수들 (푸터와 동일한 로직)
const toggleMenu = (menuKey) => {
  if (accordionState.value.openMenu === menuKey) {
    accordionState.value.openMenu = null
    accordionState.value.openSection = null
    accordionState.value.openAllSections = false
  } else {
    accordionState.value.openMenu = menuKey
    
    // 해당 메뉴의 섹션들을 확인
    const menu = menuStructure[menuKey]
    if (menu && menu.sections) {
      // 2뎁스 타이틀이 있는 섹션이 있는지 확인 (빈 문자열 제외)
      const hasSectionsWithTitle = menu.sections.some(section => section.title && section.title.trim() !== '')
      
      if (hasSectionsWithTitle) {
        // 2뎁스가 있는 경우: 모든 2뎁스를 닫힌 채로 열기
        accordionState.value.openSection = null
        accordionState.value.openAllSections = false
      } else {
        // 2뎁스가 없는 경우 (빈 타이틀 섹션들): 모든 섹션을 열려진 채로 보여주기
        accordionState.value.openSection = null
        accordionState.value.openAllSections = true
      }
    } else {
      accordionState.value.openSection = null
      accordionState.value.openAllSections = false
    }
  }
}

const toggleSection = (sectionKey) => {
  if (accordionState.value.openSection === sectionKey) {
    accordionState.value.openSection = null
  } else {
    accordionState.value.openSection = sectionKey
  }
}

// 포커스 관리 유틸리티 함수들
const getAllFocusableElements = () => {
  // 논리적인 순서로 요소들을 가져오기 (아코디언 상태 실시간 반영)
  const elements = []
  
  // X 버튼
  const closeButton = document.querySelector('.side-nav-close')
  if (closeButton) elements.push(closeButton)
  
  // What We Do 메뉴 타이틀
  const whatWeDoTitle = document.querySelector('[data-menu="whatwedo"] .side-nav-menu-title')
  if (whatWeDoTitle) elements.push(whatWeDoTitle)
  
  // What We Do가 열려있다면 하위 요소들 추가
  if (accordionState.value.openMenu === 'whatwedo') {
    const whatWeDoSections = document.querySelectorAll('[data-menu="whatwedo"] .side-nav-subtitle')
    whatWeDoSections.forEach(section => {
      elements.push(section)
      
      // 해당 섹션이 열려있다면 그 섹션의 링크들도 추가
      const sectionKey = `whatwedo-${Array.from(whatWeDoSections).indexOf(section)}`
      if (accordionState.value.openSection === sectionKey || accordionState.value.openAllSections) {
        const sectionLinks = document.querySelectorAll(`[data-menu="whatwedo"] .side-nav-section:nth-child(${Array.from(whatWeDoSections).indexOf(section) + 1}) .side-nav-list__link`)
        sectionLinks.forEach(link => elements.push(link))
      }
    })
  }
  
  // About Us 메뉴 타이틀
  const aboutUsTitle = document.querySelector('[data-menu="aboutus"] .side-nav-menu-title')
  if (aboutUsTitle) elements.push(aboutUsTitle)
  
  // About Us가 열려있다면 하위 요소들 추가
  if (accordionState.value.openMenu === 'aboutus') {
    // About Us는 빈 타이틀 섹션들이므로 직접 링크들을 추가
    const aboutUsLinks = document.querySelectorAll('[data-menu="aboutus"] .side-nav-list__link')
    aboutUsLinks.forEach(link => elements.push(link))
  }
  
  // Careers 링크
  const careersLink = document.querySelector('[data-menu="careers"] .side-nav-menu-title__link')
  if (careersLink) elements.push(careersLink)
  
  // Contact Us 링크
  const contactUsLink = document.querySelector('[data-menu="contactus"] .side-nav-menu-title__link')
  if (contactUsLink) elements.push(contactUsLink)
  
  return elements
}

const getCurrentFocusIndex = () => {
  const focusableElements = getAllFocusableElements()
  return Array.from(focusableElements).indexOf(document.activeElement)
}

const focusElementByIndex = (index) => {
  const focusableElements = getAllFocusableElements()
  if (focusableElements[index]) {
    focusableElements[index].focus()
  }
}

const focusNextElement = () => {
  const currentIndex = getCurrentFocusIndex()
  const focusableElements = getAllFocusableElements()
  const nextIndex = (currentIndex + 1) % focusableElements.length
  focusElementByIndex(nextIndex)
}

const focusPreviousElement = () => {
  const currentIndex = getCurrentFocusIndex()
  const focusableElements = getAllFocusableElements()
  const prevIndex = currentIndex === 0 ? focusableElements.length - 1 : currentIndex - 1
  focusElementByIndex(prevIndex)
}

// 키보드 이벤트 핸들러들
const handleMenuKeydown = (event, menuKey) => {
  const { key } = event
  
  switch (key) {
    case 'Enter':
    case ' ':
      event.preventDefault()
      toggleMenu(menuKey)
      
      // 아코디언이 열렸을 때 첫 번째 하위 요소로 포커스 이동
      if (accordionState.value.openMenu === menuKey) {
        nextTick(() => {
          const menuContent = document.getElementById(`side-nav-menu-${menuKey}`)
          const firstFocusable = menuContent?.querySelector('[tabindex="0"]')
          if (firstFocusable) {
            firstFocusable.focus()
          }
        })
      }
      break
    case 'ArrowDown':
      event.preventDefault()
      focusNextElement()
      break
    case 'ArrowUp':
      event.preventDefault()
      focusPreviousElement()
      break
    case 'ArrowRight':
      event.preventDefault()
      // 아코디언이 열려있으면 첫 번째 하위 요소로 이동
      if (accordionState.value.openMenu === menuKey) {
        const menuContent = document.getElementById(`side-nav-menu-${menuKey}`)
        const firstFocusable = menuContent?.querySelector('[tabindex="0"]')
        if (firstFocusable) {
          firstFocusable.focus()
        }
      }
      break
  }
}

const handleSectionKeydown = (event, sectionKey) => {
  const { key } = event
  
  switch (key) {
    case 'Enter':
    case ' ':
      event.preventDefault()
      toggleSection(sectionKey)
      
      // 섹션이 열렸을 때 첫 번째 하위 요소로 포커스 이동
      if (accordionState.value.openSection === sectionKey) {
        nextTick(() => {
          const sectionContent = document.getElementById(`side-nav-section-${sectionKey}`)
          const firstFocusable = sectionContent?.querySelector('a')
          if (firstFocusable) {
            firstFocusable.focus()
          }
        })
      }
      break
    case 'ArrowDown':
      event.preventDefault()
      focusNextElement()
      break
    case 'ArrowUp':
      event.preventDefault()
      focusPreviousElement()
      break
    case 'ArrowRight':
      event.preventDefault()
      // 섹션이 열려있으면 첫 번째 링크로 이동
      if (accordionState.value.openSection === sectionKey) {
        const sectionContent = document.getElementById(`side-nav-section-${sectionKey}`)
        const firstLink = sectionContent?.querySelector('a')
        if (firstLink) {
          firstLink.focus()
        }
      }
      break
    case 'ArrowLeft':
      event.preventDefault()
      // 부모 메뉴로 포커스 이동
      const parentMenu = event.target.closest('.side-nav-menu-group')
      const parentTitle = parentMenu?.querySelector('.side-nav-menu-title')
      if (parentTitle) {
        parentTitle.focus()
      }
      break
  }
}

// 링크 키보드 핸들러
const handleLinkKeydown = (event) => {
  const { key } = event
  
  switch (key) {
    case 'Enter':
    case ' ':
      // 링크 클릭은 기본 동작 허용
      break
    case 'ArrowDown':
      event.preventDefault()
      focusNextElement()
      break
    case 'ArrowUp':
      event.preventDefault()
      focusPreviousElement()
      break
    case 'ArrowLeft':
      event.preventDefault()
      // 정확한 부모 섹션으로 포커스 이동
      const linkElement = event.target
      const listItem = linkElement.closest('.side-nav-list__item')
      const list = listItem?.closest('.side-nav-list')
      const sectionId = list?.getAttribute('id')
      
      if (sectionId) {
        // sectionId에서 메뉴 키와 섹션 인덱스 추출 (예: "side-nav-section-whatwedo-0")
        const parts = sectionId.split('-')
        const menuKey = parts[3] // "whatwedo"
        const sectionIndex = parts[4] // "0"
        
        // 해당 섹션 타이틀 찾기
        const sectionTitle = document.querySelector(`[data-menu="${menuKey}"] .side-nav-subtitle:nth-child(${parseInt(sectionIndex) + 1})`)
        if (sectionTitle) {
          sectionTitle.focus()
        }
      }
      break
  }
}

// X 버튼 키보드 핸들러
const handleCloseKeydown = (event) => {
  const { key } = event
  
  switch (key) {
    case 'Enter':
    case ' ':
      event.preventDefault()
      closeSideNav()
      
      // 사이드 네비게이션 닫은 후 햄버거 메뉴로 포커스 이동
      nextTick(() => {
        const hamburgerButton = document.querySelector('.the-header__hamburger')
        if (hamburgerButton) {
          hamburgerButton.focus()
        }
      })
      break
    case 'ArrowDown':
      event.preventDefault()
      focusNextElement()
      break
    case 'ArrowUp':
      event.preventDefault()
      focusPreviousElement()
      break
  }
}

// 사이드 네비게이션 닫기
const closeSideNav = () => {
  emit('close')
}

// ESC 키로 닫기 및 Tab 키 트랩
const handleKeydown = (event) => {
  if (event.key === 'Escape' && props.isOpen) {
    closeSideNav()
  }
  
  // Tab 키 트랩: 사이드 네비게이션 내부에서만 포커스 순환
  if (event.key === 'Tab' && props.isOpen) {
    const focusableElements = getAllFocusableElements()
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]
    
    if (event.shiftKey) {
      // Shift + Tab: 첫 번째 요소에서 마지막 요소로 이동
      if (document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      }
    } else {
      // Tab: 마지막 요소에서 첫 번째 요소로 이동
      if (document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }
  }
}

// 컴포넌트 마운트 시 이벤트 리스너 등록
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

// 컴포넌트 언마운트 시 이벤트 리스너 제거
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

defineOptions({
  name: 'TheSideNav',
})
</script>

<style lang="scss" scoped>
.side-nav-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background: #001933;
  color: $d-white;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  z-index: 2000;
  box-shadow: -10px 0 20px 0 rgba(0, 0, 0, 0.20);
  
  // 태블릿 이상에서는 숨김
  @include desktop {
    display: none;
  }
  
  &.is-open {
    transform: translateX(0);
  }
  
  @include tablet {
    width: 45%; // 태블릿에서 800px 기준 약 360px (45%)
    max-width: rem(400);
  }
}

.side-nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: rem(16) rem(24);
  flex-shrink: 0;
}

.side-nav-logo {
  width: rem(110);
  
  .side-nav-logo__image {
    width: rem(110);
    color: $d-white;
    
    :deep(.side-nav-logo__svg) {
      width: rem(110);
      height: auto;
    }
  }
}

.side-nav-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: rem(40);
  height: rem(40);
  background: none;
  border: none;
  cursor: pointer;
  color: $d-white;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.7;
  }
  
  :deep(.side-nav-close__svg) {
    width: rem(24);
    height: rem(24);
  }
}

.side-nav-content {
  flex: 1;
  overflow-y: auto;
  padding: 0;
}

.side-nav-menu-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: rem(8);
}

.side-nav-menu-title {
  font-size: rem(16);
  font-weight: 700;
  line-height: 140%;
  color: $d-white;
  margin: 0;
  width: 100%;
  flex-shrink: 0;
  padding: rem(15) rem(24);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: rem(1) solid #021326;
  
  &.is-active {
    color: $s-teal;
  }
}

.side-nav-menu-title__link {
  color: inherit;
  text-decoration: none;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
}

.side-nav-icon {
  width: rem(20);
  height: rem(20);
  transition: transform 0.3s ease;
  opacity: 0.8;
  
  &--rotated {
    transform: rotate(-180deg);
  }
  
  :deep(.side-nav-icon__svg) {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
}

.side-nav-content-section {
  display: block;
  width: 100%;
  background-color: #021326;
  padding: 0 rem(24);
}

.side-nav-section {
  width: 100%;
  margin: 0;
}

// 첫 번째 메뉴 그룹의 섹션들 사이에만 border-top 적용
.side-nav-menu-group:first-child .side-nav-section:not(:first-child) {
  border-top: rem(1) solid #333;
}

.side-nav-subtitle {
  font-size: rem(12);
  font-weight: 400;
  line-height: 140%;
  color: $gray-4;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: rem(16) 0;
  margin-bottom: 0;
}

.side-nav-list {
  list-style: none;
  margin: 0;
  padding-left: rem(16);
  margin-bottom: 0;
}

.side-nav-list__item {
  margin: 0;
  padding: rem(24) 0;
  color: $d-white;
  font-size: rem(14);
  font-weight: 600;
  line-height: 140%;
}

.side-nav-list__link {
  color: inherit;
  text-decoration: none;
  transition: text-decoration 0.2s ease;
  
  &:hover {
    text-decoration: underline;
  }
}

.menu-item-disabled {
  color: inherit;
  opacity: 0.6;
}
</style>
