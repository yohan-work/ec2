<template>
  <!-- 사이드 네비게이션 패널만 표시 -->
  <div 
    class="side-nav-panel" 
    :class="{ 'is-open': isOpen }"
  >
      <!-- 헤더 영역 -->
      <div class="side-nav-header">
        <div class="side-nav-logo">
          <div class="logo" v-html="footerLogo"></div>
        </div>
        <button 
          class="side-nav-close"
          @click="closeSideNav"
          v-html="closeIcon"
        ></button>
      </div>
      
      <!-- 네비게이션 메뉴 (푸터 스타일 적용) -->
      <nav class="side-nav-content">
        <div 
          v-for="(menu, key) in menuStructure" 
          :key="key"
          class="side-nav-menu-group"
        >
          <!-- 하위 섹션이 있는 경우 (아코디언) -->
          <template v-if="menu.sections && menu.sections.length > 0">
            <!-- 1뎁스 메뉴 타이틀 -->
            <h3 
              class="side-nav-menu-title"
              :class="{ 'is-active': accordionState.openMenu === key }"
              @click="toggleMenu(key)"
            >
              <span>{{ menu.title }}</span>
              <span 
                class="side-nav-icon"
                :class="{ 'side-nav-icon--rotated': accordionState.openMenu === key }"
                v-html="arrowIcon"
              ></span>
            </h3>
            
            <!-- 2뎁스 섹션들 -->
            <div 
              class="side-nav-content-section"
              v-show="accordionState.openMenu === key"
            >
              <div 
                v-for="(section, sectionIndex) in menu.sections" 
                :key="section.title"
                class="side-nav-section"
              >
                <!-- 2뎁스 섹션 타이틀 -->
                <h4 
                  v-if="section.title" 
                  class="side-nav-subtitle"
                  @click="toggleSection(`${key}-${sectionIndex}`)"
                >
                  <span>{{ section.title }}</span>
                  <span 
                    v-if="section.items && section.items.length > 0"
                    class="side-nav-icon"
                    :class="{ 'side-nav-icon--rotated': accordionState.openSection === `${key}-${sectionIndex}` }"
                    v-html="arrowIcon"
                  ></span>
                </h4>
                
                <!-- 3뎁스 메뉴들 -->
                <ul 
                  v-show="accordionState.openAllSections || accordionState.openSection === `${key}-${sectionIndex}`"
                  v-if="section.items && section.items.length > 0" 
                  class="side-nav-list"
                >
                  <li v-for="item in section.items" :key="item.text">
                    <NuxtLink 
                      v-if="item.path" 
                      :to="item.path" 
                      @click="closeSideNav"
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
            <h3 class="side-nav-menu-title">
              <NuxtLink 
                v-if="menu.path" 
                :to="menu.path" 
                @click="closeSideNav"
              >
                {{ menu.title }}
              </NuxtLink>
              <span v-else class="menu-item-disabled">{{ menu.title }}</span>
            </h3>
          </template>
        </div>
      </nav>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
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
  // X 아이콘 SVG (간단한 형태)
  return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
      // 2뎁스 타이틀이 있는 섹션이 있는지 확인
      const hasSectionsWithTitle = menu.sections.some(section => section.title)
      
      if (hasSectionsWithTitle) {
        // 2뎁스가 있는 경우: 모든 2뎁스를 닫힌 채로 열기
        accordionState.value.openSection = null
        accordionState.value.openAllSections = false
      } else {
        // 2뎁스가 없는 경우: 모든 섹션을 열려진 채로 보여주기
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

// 사이드 네비게이션 닫기
const closeSideNav = () => {
  emit('close')
}

// ESC 키로 닫기
const handleKeydown = (event) => {
  if (event.key === 'Escape' && props.isOpen) {
    closeSideNav()
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
  
  .logo {
    width: rem(110);
    color: $d-white;
    
    :deep(svg) {
      width: rem(110);
      height: auto;
    }
  }
}

.side-nav-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: rem(24);
  height: rem(24);
  background: none;
  border: none;
  cursor: pointer;
  color: $d-white;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.7;
  }
  
  :deep(svg) {
    width: rem(24);
    height: rem(24);
  }
}

.side-nav-content {
  flex: 1;
  overflow-y: auto;
  padding: 0;
}

// 푸터와 동일한 메뉴 스타일
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
  padding: rem(24);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  // 액티브 상태 (열림)에서 teal 색상
  &.is-active {
    color: $s-teal;
  }
  
  
  a {
    color: inherit;
    text-decoration: none;
    transition: opacity 0.2s ease;
    
    &:hover {
      opacity: 0.8;
      text-decoration: underline;
    }
  }
}

.side-nav-icon {
  width: rem(16);
  height: rem(16);
  transition: transform 0.3s ease;
  opacity: 0.8;
  
  &--rotated {
    transform: rotate(-180deg);
  }
  
  // 태블릿에서도 아이콘 표시 유지
  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
}

.side-nav-content-section {
  display: flex;
  flex-wrap: wrap;
  gap: rem(40);
  width: 100%;
  background-color: #021326;
  padding: 0 rem(24);
  
  display: block;
  width: 100%;
  gap: 0;
}

.side-nav-section {
  width: 100%;
  margin: 0;
}

// 첫 번째 메뉴 그룹의 섹션들 사이에만 border-top 적용
.side-nav-menu-group:first-child .side-nav-section:not(:first-child) {
  border-top: rem(1) solid $gray-4;
}

.side-nav-subtitle {
  font-size: rem(12);
  font-weight: 400;
  line-height: 140%;
  color: $gray-4;
  margin: 0 0 rem(16) 0;
  
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
  
  padding-left: rem(16);
  margin-bottom: 0;
  
  li {
    margin-bottom: rem(4);
  }
  
  li {
    margin: 0;
    padding: rem(24) 0;
    color: $d-white;
    font-size: rem(14);
    font-weight: 600;
    line-height: 140%;
    
    a {
      color: inherit;
      text-decoration: none;
      transition: text-decoration 0.2s ease;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
