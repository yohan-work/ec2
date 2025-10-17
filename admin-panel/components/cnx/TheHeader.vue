<template>
  <header class="the-header">
    <div class="inner">
      <div class="the-header__logo">
        <NuxtLink to="/" class="text-xl font-bold text-gray-900">
          <div class="logo" v-html="concentrixLogo"></div>
        </NuxtLink>
      </div>
      
      <!-- 태블릿 이상에서 보이는 GNB 메뉴 -->
      <nav class="the-header__gnb">
        <template v-for="(menu, key) in menuStructure">
          <!-- 드롭다운 메뉴 (sections가 있는 경우) -->
          <button 
            v-if="menu.sections && menu.sections.length > 0"
            :key="`dropdown-${key}`"
            class="gnb-menu-item gnb-dropdown-trigger" 
            :data-dropdown="key"
          >
            <span>{{ menu.title }}</span>
            <div class="dropdown-arrow" v-html="dropdownIcon"></div>
          </button>
          
          <!-- 일반 링크 메뉴 (sections가 없는 경우) -->
          <button 
            v-else-if="menu.path"
            :key="`link-${key}`"
            class="gnb-menu-item" 
            @click="navigateTo(menu.path)"
          >
            <span>{{ menu.title }}</span>
          </button>
        </template>
      </nav>
      
      <!-- 모바일에서만 보이는 햄버거 메뉴 -->
      <button
        class="the-header__hamburger"
        type="button"
        @click="toggleSideNav"
        v-html="hamburgerIcon"
      ></button>
    </div>

    <!-- 동적 드롭다운 메뉴들 -->
    <div 
      v-for="(menu, key) in dropdownMenus" 
      :key="key"
      class="gnb-dropdown-menu" 
      :data-dropdown="key" 
      :class="{ 'active': activeDropdown === key }"
    >
      <div class="inner">
        <div class="dropdown-title">{{ menu.title }}</div>
        <div class="dropdown-sections">
          <div 
            v-for="section in menu.sections" 
            :key="section.title" 
            class="dropdown-section"
          >
            <!-- 2depth: 빈 title이 아닌 경우만 표시 -->
            <h3 v-if="section.title && !section.path">{{ section.title }}</h3>
            <NuxtLink v-else-if="section.title && section.path" :to="section.path" class="section-title">
              {{ section.title }}
            </NuxtLink>
            <span v-else-if="section.title" class="section-title-disabled">{{ section.title }}</span>
            
            <!-- 3depth: What We Do만 아이템이 있음 -->
            <ul v-if="section.items && section.items.length > 0">
              <li v-for="item in section.items" :key="item.text">
                <NuxtLink v-if="item.path" :to="item.path">{{ item.text }}</NuxtLink>
                <span v-else class="menu-item-disabled">{{ item.text }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 사이드 네비게이션 -->
    <TheSideNav 
      :is-open="isSideNavOpen" 
      @close="closeSideNav" 
    />
  </header>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import concentrixLogo from '~/components/assets/cnx/concentrix-logo.svg?raw'
import hamburgerIcon from '~/components/assets/cnx/hamburger.svg?raw'
import dropdownIcon from '~/components/assets/cnx/dropdown.svg?raw'
import TheSideNav from '~/components/cnx/TheSideNav.vue'

// 네비게이션 composable 사용
const { getMenuData, menuStructure } = useNavigation()

// 드롭다운 상태 관리
const activeDropdown = ref(null)

// 사이드 네비게이션 상태 관리
const isSideNavOpen = ref(false)

// 라우터 기반 메뉴 데이터
const dropdownMenus = computed(() => getMenuData())

// 드롭다운 토글 함수
const toggleDropdown = (dropdownName) => {
  activeDropdown.value = activeDropdown.value === dropdownName ? null : dropdownName
}

// 사이드 네비게이션 토글 함수들
const toggleSideNav = () => {
  isSideNavOpen.value = !isSideNavOpen.value
}

const closeSideNav = () => {
  isSideNavOpen.value = false
}

// 마우스 이벤트 핸들러
const handleMouseEnter = (dropdownName) => {
  activeDropdown.value = dropdownName
  updateActiveClasses()
}

const handleMouseLeave = () => {
  // 모든 드롭다운 트리거와 메뉴에서 마우스가 벗어났는지 확인
  const allTriggers = document.querySelectorAll('.gnb-dropdown-trigger')
  const allDropdowns = document.querySelectorAll('.gnb-dropdown-menu')
  
  let isMouseOverAnyElement = false
  
  allTriggers.forEach(trigger => {
    if (trigger.matches(':hover')) {
      isMouseOverAnyElement = true
    }
  })
  
  allDropdowns.forEach(dropdown => {
    if (dropdown.matches(':hover')) {
      isMouseOverAnyElement = true
    }
  })
  
  if (!isMouseOverAnyElement) {
    activeDropdown.value = null
    updateActiveClasses()
  }
}

// 활성화된 드롭다운에 따라 트리거 버튼의 active 클래스 업데이트
const updateActiveClasses = () => {
  const triggers = document.querySelectorAll('.gnb-dropdown-trigger')
  triggers.forEach(trigger => {
    const dropdownName = trigger.getAttribute('data-dropdown')
    if (activeDropdown.value === dropdownName) {
      trigger.classList.add('active')
    } else {
      trigger.classList.remove('active')
    }
  })
}

onMounted(() => {
  // 각 드롭다운 트리거에 이벤트 리스너 추가
  const triggers = document.querySelectorAll('.gnb-dropdown-trigger')
  triggers.forEach(trigger => {
    const dropdownName = trigger.getAttribute('data-dropdown')
    
    trigger.addEventListener('mouseenter', () => {
      handleMouseEnter(dropdownName)
    })
    
    trigger.addEventListener('mouseleave', () => {
      // 트리거에서 벗어나면 잠시 후 확인
      setTimeout(() => {
        handleMouseLeave()
      }, 100)
    })
  })
  
  // 각 드롭다운 메뉴에 이벤트 리스너 추가
  const dropdowns = document.querySelectorAll('.gnb-dropdown-menu')
  dropdowns.forEach(dropdown => {
    const dropdownName = dropdown.getAttribute('data-dropdown')
    
    dropdown.addEventListener('mouseenter', () => {
      handleMouseEnter(dropdownName)
    })
    
    dropdown.addEventListener('mouseleave', () => {
      // 드롭다운 메뉴에서 벗어나면 잠시 후 확인
      setTimeout(() => {
        handleMouseLeave()
      }, 100)
    })
  })
})

onUnmounted(() => {
  // 이벤트 리스너 정리
  const triggers = document.querySelectorAll('.gnb-dropdown-trigger')
  triggers.forEach(trigger => {
    trigger.removeEventListener('mouseenter', handleMouseEnter)
    trigger.removeEventListener('mouseleave', handleMouseLeave)
  })
  
  const dropdowns = document.querySelectorAll('.gnb-dropdown-menu')
  dropdowns.forEach(dropdown => {
    dropdown.removeEventListener('mouseenter', handleMouseEnter)
    dropdown.removeEventListener('mouseleave', handleMouseLeave)
  })
})
</script>

<style lang="scss" scoped>
.the-header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: #ffffff;
  border-bottom: rem(1) solid $gray-2;
  z-index: 1000;
  
  height: rem(72);
  @include tablet {
    height: rem(72);
  }
  @include desktop {
    height: rem(90);
  }
  
  .inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    
    @include desktop {
      justify-content: flex-start;
    }
  }
  
  &__logo {
    flex-shrink: 0;
    
    width: rem(110);
    @include tablet {
      width: rem(110);
    }
    @include desktop {
      width: rem(176);
    }
    
    a {
      display: block;
    }
    
    .logo {
      max-width: 100%;
      width: 100% !important;
      display: block;
      color: #003d5b;

      /* SVG 스타일링 */
      :deep(svg) {
        width: 100%;
        max-width: 100%;
        height: auto;
      }
    }
  }
  
  &__gnb {
    display: none;
    align-items: center;
    gap: rem(78);
    height: 100%;
    
    @include desktop {
      display: flex;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
    
         .gnb-menu-item {
           display: flex;
           align-items: center;
           justify-content: center;
           padding: 0;
           color: #000;
           text-decoration: none;
           font-size: rem(14);
           font-weight: 400;
           line-height: 1.5;
           transition: color 0.2s ease;
           background: none;
           border: none;
           cursor: pointer;
           height: 100%;
           width: auto;
           flex-shrink: 0;
           position: relative;
           
           // 기본 상태에서 width: 0인 굵은선
           &::after {
             content: '';
             position: absolute;
             bottom: 0;
             left: 50%;
             width: 0;
             height: rem(3);
             background-color: #333;
             border-radius: rem(1.5);
             z-index: 1001;
             transform: translateX(-50%);
             transition: width 0.3s ease-out;
           }
           
           &:hover {
             color: #000;
             text-shadow: 0.5px 0 0 currentColor;
             
             &::after {
               width: 100%;
             }
           }
           
           &.active {
             color: #000;
             text-shadow: 0.5px 0 0 currentColor;
             
             &::after {
               width: 100%;
             }
           }
         }
    
    // 드롭다운 트리거 스타일
    .gnb-dropdown-trigger {
      display: flex;
      align-items: center;
      gap: rem(4);
      position: relative;
      
      .dropdown-arrow {
        transition: transform 0.2s ease;
        
        :deep(svg) {
          width: rem(20);
          height: rem(20);
        }
      }
      
      &:hover .dropdown-arrow {
        transform: rotate(-180deg);
      }
      
      // 드롭다운이 활성화될 때 아래쪽에 굵은 라인 표시
      &.active::after {
        width: 100%;
      }
    }
    
  }
  
  // 헤더 바깥에 위치하는 드롭다운 메뉴
  .gnb-dropdown-menu {
    position: fixed;
    top: rem(72);
    left: 0;
    width: 100%;
    background: white;
    box-shadow: 0 rem(2) rem(8) rgba(0, 0, 0, 0.1);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    padding: rem(40) 0;
    
    // PC 이하에서는 완전히 숨김
    display: none;
    
    @include desktop {
      display: block;
      top: rem(90);
    }
    
    // JavaScript로 제어되므로 CSS에서는 기본 상태만 정의
    
    &.active {
      opacity: 1;
      visibility: visible;
    }
    
    .inner {
      padding: rem(32) rem(100);
      display: flex;
      align-items: flex-start;
      gap: rem(40);
      
      .dropdown-title {
        font-size: $font-size-body2-desktop;
        font-weight: $font-weight-bold;
        color: #333;
        width: rem(180);
        line-height: rem(20);
        flex-shrink: 0;
      }
      
      .dropdown-sections {
        display: grid;
        grid-template-columns: repeat(5, rem(180));
        gap: rem(40);
        flex: 1;
        
        // About Us는 2개 컬럼만 사용
        &:has(.dropdown-section:nth-child(2):last-child) {
          grid-template-columns: repeat(2, rem(180));
        }
        
        .dropdown-section {
          h3 {
            font-size: rem(12);
            font-weight: $font-weight-regular;
            color: $gray-1;
            margin: 0 0 rem(16) 0;
            line-height: rem(20);
          }
          
          .section-title {
            font-size: rem(16);
            font-weight: 700;
            color: #333;
            margin: 0 0 rem(16) 0;
            line-height: rem(20);
            text-decoration: none;
            display: block;
            transition: text-decoration 0.2s ease, text-shadow 0.2s ease;
            
            &:hover {
              text-decoration: underline;
              text-shadow: 0.5px 0 0 currentColor;
            }
          }
          
          
          ul {
            list-style: none;
            margin: 0;
            padding: 0;
            
            li {
              margin-bottom: rem(12);
              
                a, span {
                  color: #000;
                  text-decoration: none;
                  font-size: rem(12);
                  font-weight: $font-weight-regular;
                  line-height: rem(20);
                  transition: text-decoration 0.2s ease, text-shadow 0.2s ease;
                  
                  &:hover {
                    text-decoration: underline;
                    text-shadow: 0.5px 0 0 currentColor;
                  }
                }
            }
          }
        }
      }
    }
  }
    &__hamburger {
      display: block;
      cursor: pointer;
      background: none;
      border: none;
      padding: 0;
      
      width: rem(42);
      height: rem(42);
      
      @include desktop {
        display: none;
      }
      
      color: #000;
      
      :deep(svg) {
        width: 100%;
        height: 100%;
      }
    }
  }
  
</style>
