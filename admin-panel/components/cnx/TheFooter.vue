<template>
  <footer class="the-footer">
    <div class="inner">
      <!-- 상단 네비게이션 섹션 -->
      <div class="footer-nav">
        <div 
          v-for="(menu, key) in menuStructure" 
          :key="key"
          :class="['footer-nav__column', { 'footer-nav__column--first': key === 'whatwedo' }]"
        >
            <!-- 하위 섹션이 있는 경우 (What We Do, About Us) -->
            <template v-if="menu.sections && menu.sections.length > 0">
              <!-- 1뎁스 메뉴 타이틀 -->
              <h3 
                class="footer-nav__title"
                :class="{ 'footer-nav__title--mobile-clickable': true }"
                @click="toggleMenu(key)"
              >
                <span>{{ menu.title }}</span>
                    <span 
                      v-if="isMobile"
                      class="footer-nav__icon footer-nav__icon--mobile"
                      :class="{ 'footer-nav__icon--rotated': accordionState.openMenu === key }"
                      v-html="arrowIcon"
                    ></span>
              </h3>
              
              <!-- 2뎁스 섹션들 -->
              <div 
                class="footer-nav__content"
                :class="{ 'footer-nav__content--mobile-accordion': true }"
                v-show="isMobile ? accordionState.openMenu === key : true"
              >
                <div 
                  v-for="(section, sectionIndex) in menu.sections" 
                  :key="section.title"
                  class="footer-nav__section"
                >
                  <!-- 2뎁스 섹션 타이틀 -->
                  <h4 
                    v-if="section.title" 
                    class="footer-nav__subtitle"
                    :class="{ 'footer-nav__subtitle--mobile-clickable': true }"
                    @click="toggleSection(`${key}-${sectionIndex}`)"
                  >
                    <span>{{ section.title }}</span>
                    <span 
                      v-if="isMobile"
                      class="footer-nav__icon footer-nav__icon--mobile"
                      :class="{ 'footer-nav__icon--rotated': accordionState.openSection === `${key}-${sectionIndex}` }"
                      v-html="arrowIcon"
                    ></span>
                  </h4>
                  
                  <!-- 3뎁스 메뉴들 -->
                  <ul 
                    v-show="isMobile ? (accordionState.openAllSections || accordionState.openSection === `${key}-${sectionIndex}`) : true"
                    v-if="section.items && section.items.length > 0" 
                    class="footer-nav__list"
                    :class="{ 'footer-nav__list--mobile-accordion': true }"
                  >
                    <li v-for="item in section.items" :key="item.text">
                      <NuxtLink v-if="item.path" :to="item.path">{{ item.text }}</NuxtLink>
                      <span v-else class="menu-item-disabled">{{ item.text }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </template>
            
            <!-- 하위 섹션이 없는 경우 (Careers, Contact Us) -->
            <template v-else>
              <h3 class="footer-nav__title">
                <NuxtLink v-if="menu.path" :to="menu.path">{{ menu.title }}</NuxtLink>
                <span v-else class="menu-item-disabled">{{ menu.title }}</span>
              </h3>
            </template>
        </div>
      </div>

      <!-- 하단 브랜딩 섹션 -->
      <div class="footer-branding">
        <!-- 첫 번째 줄: 로고/상호명/주소 | SNS -->
        <div class="footer-branding__row">
          <div class="footer-branding__left">
            <div class="footer-logo">
              <div class="logo" v-html="footerLogo"></div>
            </div>
            <div class="footer-company-info">
              <p class="footer-company-name">
                콘센트릭스서비스코리아
              </p>
              <p class="footer-address">
                서울특별시 강남구 테헤란로 509, 5층 (삼성동, 엔씨타워1)
              </p>
            </div>
          </div>
          
          <div class="footer-branding__right">
            <!-- 소셜 미디어 아이콘들 -->
            <div class="footer-social">
              <a href="https://www.youtube.com/user/CNXCorporation" class="social-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                <div class="social-icon" v-html="youtubeIcon"></div>
              </a>
              <a href="https://www.linkedin.com/company/concentrix" class="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <div class="social-icon" v-html="linkedinIcon"></div>
              </a>
              <a href="https://x.com/concentrix" class="social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <div class="social-icon" v-html="twitterIcon"></div>
              </a>
              <a href="https://www.instagram.com/concentrix/" class="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <div class="social-icon" v-html="instagramIcon"></div>
              </a>
              <a href="https://www.facebook.com/concentrixkr" class="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <div class="social-icon" v-html="facebookIcon"></div>
              </a>
            </div>
          </div>
        </div>
        
        <!-- 두 번째 줄: Copyright | 법적링크 -->
        <div class="footer-branding__row footer-branding__row--bottom">
          <div class="footer-branding__left">
            <p class="footer-copyright">
              ⓒ All Rights Reserved By Concentrix Service Korea
            </p>
          </div>
          
          <div class="footer-branding__right">
            <!-- 법적 정책 링크들 -->
            <div class="footer-legal">
              <div v-for="(link, index) in legalLinks" :key="link.text" class="footer-legal__item">
                <NuxtLink v-if="!link.external" :to="link.path">{{ link.text }}</NuxtLink>
                <a v-else :href="link.path" target="_blank" rel="noopener noreferrer">{{ link.text }}</a>
                <!-- 태블릿 이상에서 링크들 사이 구분선 -->
                <span 
                  v-if="index < legalLinks.length - 1"
                  class="footer-legal__divider"
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import footerLogo from '~/components/assets/cnx/footer-logo.svg?raw'
import arrowHamburgerDown from '~/components/assets/cnx/arrow-hamburger-down.svg?raw'
import facebookIcon from '~/public/assets/cnx/layouts/ico-sns-facebook.svg?raw'
import instagramIcon from '~/public/assets/cnx/layouts/ico-sns-instargram.svg?raw'
import linkedinIcon from '~/public/assets/cnx/layouts/ico-sns-linkedin.svg?raw'
import twitterIcon from '~/public/assets/cnx/layouts/ico-sns-twitter.svg?raw'
import youtubeIcon from '~/public/assets/cnx/layouts/ico-sns-youtube.svg?raw'

// 네비게이션 composable 사용
const { menuStructure } = useNavigation()

// 모바일 감지
const isMobile = ref(false)

// 윈도우 리사이즈 감지
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 767
}

// 컴포넌트 마운트 시 초기 체크
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

// 컴포넌트 언마운트 시 이벤트 리스너 제거
onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

// 모바일 아코디언 상태 관리 (모바일에서만 사용)
const accordionState = ref({
  openMenu: null, // 현재 열린 1뎁스 메뉴
  openSection: null, // 현재 열린 2뎁스 섹션
  openAllSections: false // 모든 섹션을 열어야 하는지 여부
})

// 아코디언 토글 함수들 (모바일에서만 사용)
const toggleMenu = (menuKey) => {
  if (!isMobile.value) return // 모바일이 아니면 동작하지 않음
  
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
  if (!isMobile.value) return // 모바일이 아니면 동작하지 않음
  
  if (accordionState.value.openSection === sectionKey) {
    accordionState.value.openSection = null
  } else {
    accordionState.value.openSection = sectionKey
  }
}

// 아코디언 아이콘 (모바일에서만 표시)
const arrowIcon = arrowHamburgerDown

// 법적 정책 링크들 (컴포넌트 내부에서 정의)
const legalLinks = [
  { text: 'Legal Information', path: 'https://www.concentrix.com/legal/', external: true },
  { text: 'Privacy Policy', path: 'https://catalyst.concentrix.com/privacy-policy/', external: true },
  { text: 'Contact Us', path: '/cnx/contactus', external: false },
]

defineOptions({
  name: 'TheFooter',
})
</script>

<style lang="scss" scoped>
.the-footer {
  background: $p-dark-blue;
  color: $d-white;
  width: 100%;

  .inner {
    max-width: rem(1480);
    margin: 0 auto;
    padding: rem(0);

    @include tablet {
      padding: rem(80) rem(80) rem(0);
    }

    @include desktop {
      padding: rem(49) rem(80) rem(0);
    }
  }

  .footer-nav {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: rem(64);
    
    @include tablet {
      gap: rem(64) rem(40);
      margin-bottom: rem(70);
    }
    
    @include desktop {
      gap: rem(77) rem(40);
      margin-bottom: rem(70);
    }
    
    &__column {
      width:100%;
      display: flex;
      flex-direction: column;
      
      @include tablet {
        gap: rem(40);
      }
      
      @include desktop {
        width: auto;
        flex-direction: row;
        align-items: flex-start;
        gap: rem(80);
      }
      
      &:nth-child(3),
      &:nth-child(4) {
        @include tablet {
          width: calc((100% - rem(80)) / 3);

          h3 {
            width:100%;
          }
        }

        @include desktop {
          width: rem(180);
        }
      }
      
      &:not(&--first) {
        @include tablet {
          flex-direction: row;
          
          .footer-nav__section {
            width: calc((100% - rem(80)) / 2);
          }
        }
        
        @include desktop {
          .footer-nav__section {
            width: rem(180);
          }
        }
      }
      
      h3 {
        @include body-02;
        font-weight: $font-weight-bold;
        color: $d-white;
        margin: 0;
        width: 100%;
        flex-shrink: 0;
        padding: rem(18) rem(24);
        
        &.footer-nav__title--mobile-clickable {
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          
          @include tablet {
            cursor: default;
            padding: 0;
            border-bottom: none;
            justify-content: flex-start;
            display: block;
          }
        }
        
        @include tablet {
          width: calc((100% - rem(80)) / 3);
          padding: 0;
        }
        
        @include desktop {
          width: rem(180);
          padding: 0;
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
    }
    
    &__icon {
      width: rem(20);
      height: rem(20);
      transition: transform 0.2s ease;
      
      &--rotated {
        transform: rotate(-180deg);
      }
      
      @include tablet {
        display: none;
      }
      
      svg {
        width: 100%;
        height: 100%;
        fill: currentColor;
      }
    }
    
    &__content {
      display: flex;
      flex-wrap: wrap;
      gap: rem(40);
      width: 100%;
      background-color: #021326;
      padding: 0 rem(24);
      
      &--mobile-accordion {
        display: block;
        width: 100%;
        gap: 0;
        
        @include tablet {
          display: flex;
          flex-wrap: wrap;
          gap: rem(40);
          width: 100%;
          padding: 0;
          background-color: transparent;
        }
      }
      
      @include desktop {
        flex: 1;
      }
    }
    
    &__section {
      width: 100%;
      margin: 0;
      
      @include tablet {
        width: calc((100% - rem(80)) / 3);
        margin: 0;
      }
      
      @include desktop {
        width: rem(180);
      }
    }
    
    &__subtitle {
      font-size: rem(12);
      font-weight: $font-weight-regular;
      color: $gray-1;
      margin: 0 0 rem(12) 0;
      line-height: rem(20);
      
      &--mobile-clickable {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: rem(8) 0;
        margin-bottom: 0;
        
        @include tablet {
          cursor: default;
          padding: 0;
          margin-bottom: rem(13);
          justify-content: flex-start;
          display: block;
        }
      }
      
      @include desktop {
        margin-bottom: rem(8);
      }
    }
    
    &__list {
      list-style: none;
      margin: 0;
      padding: 0;
      
      &--mobile-accordion {
        padding-left: rem(8);
        margin-bottom: 0;
        
        li {
          margin-bottom: rem(4);
        }
        
        @include tablet {
          padding-left: 0;
          margin-bottom: 0;
          
          li {
            margin-bottom: 0;
          }
        }
      }
      
      li {
        margin: 0;
        padding: rem(8) 0;
        display:flex;
        align-items:center;
        
        // 태블릿 이상에서는 패딩 제거
        @include tablet {
          padding: 0;
        }
        
        a {
          color: $d-white;
          text-decoration: none;
          font-size: rem(12);
          font-weight: $font-weight-regular;
          line-height: rem(24);
          transition: opacity 0.2s ease;
          
          &:hover {
            opacity: 0.8;
            text-decoration: underline;
          }
        }
        
        .menu-item-disabled {
          color: $d-white;
          font-size: rem(12);
          font-weight: $font-weight-regular;
          line-height: rem(24);
          cursor: not-allowed;
        }
      }
    }
  }

  .footer-branding {
    display: flex;
    flex-direction: column;
    gap: rem(30);
    padding: rem(32) rem(0) rem(40);
    border-top: rem(1) solid $gray-1;

    @include tablet {
      gap: rem(40);
      padding: rem(40) rem(0) rem(0);
    }
    
    @include desktop {
      gap: rem(50);
      padding: rem(50) rem(0) rem(0);
    }
    
    &__row {
      display: flex;
      flex-direction: column;
      gap: rem(40);
      
      @include tablet {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
        gap: 0;
      }
      
      @include desktop {
        align-items: center;
      }
      
      &--bottom {
        border-top: rem(1) solid $gray-1;
        padding: rem(56) 0 0 0;
        flex-direction: column-reverse; // 모바일에서 순서 바꾸기
        
        @include tablet {
          align-items: center;
          padding: rem(24) 0;
          flex-direction: row; // 태블릿 이상에서는 가로 배치
        }
        
        @include desktop {
          padding: rem(24) 0;
        }
      }
    }

    &__left {
      display: flex;
      flex-direction: column;
      padding: rem(0) rem(24);
      
      @include tablet {
        padding: rem(0);
      }
      
      @include desktop {
        flex-direction: row;
        align-items: flex-start;
        gap: rem(70);
      }
    }

    &__right {
      display: flex;
      flex-direction: column;
      padding: rem(0) rem(24);
      
      @include tablet {
        align-items: flex-end;
        padding: rem(0);
      }
    }

    .footer-logo {
      .logo {        
        :deep(svg) {
          width: rem(182);
          height: auto;
        }
      }
    }
    
    .footer-company-info {
      display: flex;
      flex-direction: column;
    }

    .footer-company-name {
      font-size: rem(12);
      font-weight: $font-weight-regular;
      color: $d-white;
      margin: rem(32) 0 0 0;
      
      @include tablet {
        font-size: rem(11);
        font-weight: $font-weight-bold;
        margin: rem(24) 0 0 0;
      }
      
      @include desktop {
        font-size: rem(11);
        font-weight: $font-weight-bold;
        margin: 0;
      }
    }

    .footer-address {
      font-size: rem(12);
      font-weight: $font-weight-regular;
      color: $d-white;
      margin: rem(12) 0 0 0;
      opacity: 0.8;
      
      @include tablet {
        font-size: rem(11);
        font-weight: $font-weight-regular;
        margin: rem(5) 0 0 0;
      }
      
      @include desktop {
        font-size: rem(11);
        font-weight: $font-weight-regular;
        margin: rem(5) 0 0 0;
      }
    }

    .footer-copyright {
      font-size: rem(10);
      font-weight: $font-weight-regular;
      color: $gray-4;
      margin: 0;
      
      @include tablet {
        font-size: rem(10);
        color: $d-white;
      }
      
      @include desktop {
        font-size: rem(10);
        color: $d-white;
      }
    }

    .footer-social {
      display: flex;
      gap: rem(10);
      
      .social-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: rem(38);
        height: rem(40);
        color: $d-white;
        transition: opacity 0.2s ease;
        
        &:hover {
          opacity: 0.7;
        }
        
        .social-icon {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }

    .footer-legal{
      display: flex;
      flex-direction: column; // 모바일에서 세로 정렬
      gap: rem(8);
      align-items: flex-start;

      @include tablet {
        flex-direction: row; // 태블릿 이상에서는 가로 정렬
        flex-wrap: wrap;
        gap: 0;
        align-items: center;
      }
      
      @include desktop {
        gap: 0;
      }

      &__item {
        display: flex;
        align-items: center;
      }

      a {
        color: $gray-4;
        text-decoration: none;
        font-size: rem(12);
        font-weight: $font-weight-regular;
        line-height: 140%;
        transition: opacity 0.2s ease;
        
        @include tablet {
          font-size: rem(8);
          font-weight: $font-weight-regular;
          line-height: normal;
          text-transform: uppercase;
        }
        
        &:hover {
          text-decoration: underline;
        }
      }
      
      &__divider {
        display: none;
        
        @include tablet {
          display: inline-block;
          width: rem(1);
          height: rem(6);
          background-color: $gray-4;
          margin: 0 rem(8);
          vertical-align: middle;
        }
        
        @include desktop {
          margin: 0 rem(12);
        }
      }
    }
  } 
}
</style>