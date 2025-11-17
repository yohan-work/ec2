<template>
    <main>
        <AppTitle title="Contact Us" />
        <AppTab v-model="activeTab" :tabs="contactTabs" @tab-change="handleTabChange">
            <!-- S : Digital & Technology Business 탭-->
            <template #digital-technology-business>
                <AppButtonTab v-model="activeTab1" :tabs="tabs1" alignment="left" @tab-change="onTabChange">
                    <!-- eslint-disable vue/no-v-for-template-key -->
                    <template v-for="(center, index) in digitalTechCenters" :key="index" #[`tab-${index}`]>
                        <div class="container" :ref="el => setContainerRef(el, 'digital', index)">
                            <div class="container__content">
                                <h2 class="container__content-title">
                                    <span>콘센트릭스</span> <br class="br-tablet-only"> <span>{{ center.name }}</span></h2>
                                <div class="container__content-info">
                                    <div class="container__content-info-item">
                                        <div>
                                            <span class="svg-icon" v-html="locationSvg"></span>
                                            <span class="svg-title">위치</span>
                                        </div>
                                        <span class="detail">{{ center.location }}</span>
                                    </div>
                                    <div class="container__content-info-item">
                                        <div>
                                            <span class="svg-icon svg-icon--phone" v-html="phoneSvg"></span>
                                            <span>전화 문의</span>
                                        </div>
                                        <a :href="`tel:${center.phone}`" class="detail">{{ center.phone }}</a>
                                    </div>
                                </div>
                            </div>
                            <!-- S : 네이버 지도 영역  -->
                            <div class="container__map">
                                <div :id="`map-digital-${index}`" class="contact-map">
                                </div>
                            </div>
                            <!-- E : 네이버 지도 영역  -->
                            <div class="container__content-info-mobile">
                                <div class="container__content-info-mobile-item">
                                    <div>
                                        <span class="svg-icon svg-icon--mobile" v-html="locationSvg"></span>
                                        <span>위치</span>
                                    </div>
                                    <span class="detail">{{ center.location }}</span>
                                </div>
                                <div class="container__content-info-mobile-item">
                                    <div>
                                        <span class="svg-icon svg-icon--mobile" v-html="phoneSvg"></span>
                                        <span>전화 문의</span>
                                    </div>
                                    <a :href="`tel:${center.phone}`" class="detail">{{ center.phone }}</a>
                                </div>
                            </div>
                        </div>
                        <!-- S : 센터 이미지 영역  -->
                        <div class="container__image">
                            <!-- 첫 번째 이미지 -->
                            <div class="container__image-item" :ref="el => setImageItemRef(el)">
                                <div>
                                    <picture>
                                        <source :srcset="center.images.pc[0]" media="(min-width: 1480px)"
                                            loading="lazy" />
                                        <source :srcset="center.images.tablet[0]" media="(min-width: 768px)"
                                            loading="lazy" />
                                        <img :src="center.images.mobile[0]" :alt="'Concentrix ' + center.imageAltTexts[0]"
                                            loading="lazy" />
                                    </picture>
                                </div>
                            </div>
                            <!-- 두 번째 이미지 -->
                            <div class="container__image-item" :ref="el => setImageItemRef(el)">
                                <div>
                                    <picture>
                                        <source :srcset="center.images.pc[1]" media="(min-width: 1480px)"
                                            loading="lazy" />
                                        <source :srcset="center.images.tablet[1]" media="(min-width: 768px)"
                                            loading="lazy" />
                                        <img :src="center.images.mobile[1]" :alt="'Concentrix ' + center.imageAltTexts[1]"
                                            loading="lazy" />
                                    </picture>
                                </div>
                                <!-- 세 번째 이미지 -->
                                <div>
                                    <picture>
                                        <source :srcset="center.images.pc[2]" media="(min-width: 1480px)"
                                            loading="lazy" />
                                        <source :srcset="center.images.tablet[2]" media="(min-width: 768px)"
                                            loading="lazy" />
                                        <img :src="center.images.mobile[2]" :alt="'Concentrix ' + center.imageAltTexts[2]"
                                            loading="lazy" />
                                    </picture>
                                </div>
                            </div>
                        </div>
                        <!-- E : 센터 이미지 영역  -->
                    </template>
                </AppButtonTab>
            </template>
            <!-- E : Digital & Technology Business 탭-->
            <!-- S : Customer Service 탭-->
            <template #customer-service>
                <AppButtonTab v-model="activeTab2" :tabs="tabs2" alignment="left" @tab-change="onTabChange">
                    <template v-for="(center, index) in customerServiceCenters" :key="index" #[`tab-${index}`]>
                        <div class="container customer-service" :ref="el => setContainerRef(el, 'customer', index)">
                            <div class="container__content">
                                <h2 class="container__content-title">
                                    <span>콘센트릭스</span> <br class="br-tablet-only"> <span>{{ center.name }}</span></h2>
                                <div class="container__content-info">
                                    <div class="container__content-info-item">
                                        <div>
                                            <span class="svg-icon" v-html="locationSvg"></span>
                                            <span class="svg-title">위치</span>
                                        </div>
                                        <span class="detail">{{ center.location }}</span>
                                    </div>
                                    <div class="container__content-info-item">
                                        <div>
                                            <span class="svg-icon svg-icon--phone" v-html="phoneSvg"></span>
                                            <span>전화 문의</span>
                                        </div>
                                        <a :href="`tel:${center.phone}`" class="detail">{{ center.phone }}</a>
                                    </div>
                                </div>
                            </div>
                            <!-- S : 네이버 지도 영역  -->
                            <div class="container__map">
                                <div :id="`map-customer-${index}`" class="contact-map">
                                </div>
                            </div>
                            <!-- E : 네이버 지도 영역  -->
                            <div class="container__content-info-mobile">
                                <div class="container__content-info-mobile-item">
                                    <div>
                                        <span class="svg-icon svg-icon--mobile" v-html="locationSvg"></span>
                                        <span>위치</span>
                                    </div>
                                    <span class="detail">{{ center.location }}</span>
                                </div>
                                <div class="container__content-info-mobile-item">
                                    <div>
                                        <span class="svg-icon svg-icon--mobile" v-html="phoneSvg"></span>
                                        <span>전화 문의</span>
                                    </div>
                                    <a :href="`tel:${center.phone}`" class="detail">{{ center.phone }}</a>
                                </div>
                            </div>
                        </div>
                        <!-- S : 센터 이미지 영역  -->
                        <div class="container__image">
                            <!-- 첫 번째 이미지 -->
                            <div class="container__image-item" :ref="el => setImageItemRef(el)">
                                <div>
                                    <picture>
                                        <source :srcset="center.images.pc[0]" media="(min-width: 1480px)"
                                            loading="lazy" />
                                        <source :srcset="center.images.tablet[0]" media="(min-width: 768px)"
                                            loading="lazy" />
                                        <img :src="center.images.mobile[0]" :alt="'Concentrix ' + center.imageAltTexts[0]"
                                            loading="lazy" />
                                    </picture>
                                </div>
                            </div>
                            <!-- 두 번째 이미지 -->
                            <div class="container__image-item" :ref="el => setImageItemRef(el)">
                                <div>
                                    <picture>
                                        <source :srcset="center.images.pc[1]" media="(min-width: 1480px)"
                                            loading="lazy" />
                                        <source :srcset="center.images.tablet[1]" media="(min-width: 768px)"
                                            loading="lazy" />
                                        <img :src="center.images.mobile[1]" :alt="'Concentrix ' + center.imageAltTexts[1]"
                                            loading="lazy" />
                                    </picture>
                                </div>
                                <!-- 세 번째 이미지 -->
                                <div>
                                    <picture>
                                        <source :srcset="center.images.pc[2]" media="(min-width: 1480px)"
                                            loading="lazy" />
                                        <source :srcset="center.images.tablet[2]" media="(min-width: 768px)"
                                            loading="lazy" />
                                        <img :src="center.images.mobile[2]" :alt="'Concentrix ' + center.imageAltTexts[2]"
                                            loading="lazy" />
                                    </picture>
                                </div>
                            </div>
                        </div>
                        <!-- E : 센터 이미지 영역  -->
                    </template>
                </AppButtonTab>
            </template>
            <!-- E : Customer Service 탭-->
        </AppTab>
    </main>
</template>

<script setup>
definePageMeta({
    layout: 'concentrix',
})

import { ref, onMounted, onUnmounted, onBeforeUnmount, onBeforeUpdate, nextTick } from 'vue'

// Components
import AppTitle from '~/components/cnx/AppTitle.vue'
import AppTab from '~/components/cnx/AppTab.vue'
import AppButtonTab from '~/components/cnx/AppButtonTab.vue'

// SVG Icons
import locationSvg from '~/public/assets/cnx/contact-us/location.svg?raw'
import phoneSvg from '~/public/assets/cnx/contact-us/phone.svg?raw'
import markerIcon from '~/public/assets/cnx/contact-us/marker.svg'
import markerIconMo from '~/public/assets/cnx/contact-us/marker-mo.svg'

const activeTab = ref(0)
const activeTab1 = ref(0)
const activeTab2 = ref(0)
const maps = ref({})
const isMobile = ref(false)

// Fade-up 애니메이션을 위한 refs
const containerRefs = ref([])
const containerObservers = ref([])
const imageItemRefs = ref([])
const imageItemObservers = ref([])

const contactTabs = [
    { label: 'Digital & Technology Business', slot: 'digital-technology-business' },
    { label: 'Customer Service', slot: 'customer-service' }
]

// Digital & Technology Business 탭 데이터(센터명, 주소, 전화번호, 지도옵션, 이미지)
const digitalTechCenters = [
    {
        name: '강남센터',
        location: '서울시 강남구 테헤란로 509, NC타워1, 5층',
        phone: '02-6328-1900',
        mapOptions: {
            lat: 37.5077819,
            lng: 127.0582386,
            zoom: 17,
        },
        images: {
            pc: ['/assets/cnx/contact-us/gangnam-1/center_gangnam-1-pc-1.png', '/assets/cnx/contact-us/gangnam-1/center_gangnam-1-pc-2.png', '/assets/cnx/contact-us/gangnam-1/center_gangnam-1-pc-3.png'],
            tablet: ['/assets/cnx/contact-us/gangnam-1/center_gangnam-1-tb-1.png', '/assets/cnx/contact-us/gangnam-1/center_gangnam-1-tb-2.png', '/assets/cnx/contact-us/gangnam-1/center_gangnam-1-tb-3.png'],
            mobile: ['/assets/cnx/contact-us/gangnam-1/center_gangnam-1-mo-1.png', '/assets/cnx/contact-us/gangnam-1/center_gangnam-1-mo-2.png', '/assets/cnx/contact-us/gangnam-1/center_gangnam-1-mo-3.png']
        },
        imageAltTexts: ['강남센터 라운지', '강남센터 회의실', '강남센터 건물 복도']
    },
    {
        name: '강남2센터',
        location: '서울시 강남구 테헤란로 505, SAC타워 10층, 11층',
        phone: '02-6328-1900',
        mapOptions: {
            lat: 37.5075889,
            lng: 127.0574705,
            zoom: 17,
        },
        images: {
            pc: ['/assets/cnx/contact-us/gangnam-2/center_gangnam-2-pc-1.png', '/assets/cnx/contact-us/gangnam-2/center_gangnam-2-pc-2.png', '/assets/cnx/contact-us/gangnam-2/center_gangnam-2-pc-3.png'],
            tablet: ['/assets/cnx/contact-us/gangnam-2/center_gangnam-2-tb-1.png', '/assets/cnx/contact-us/gangnam-2/center_gangnam-2-tb-2.png', '/assets/cnx/contact-us/gangnam-2/center_gangnam-2-tb-3.png'],
            mobile: ['/assets/cnx/contact-us/gangnam-2/center_gangnam-2-mo-1.png', '/assets/cnx/contact-us/gangnam-2/center_gangnam-2-mo-2.png', '/assets/cnx/contact-us/gangnam-2/center_gangnam-2-mo-3.png']
        },
        imageAltTexts: ['강남2센터 사무실 입구', '강남2센터 라운지', '강남2센터 사무실 내부']
    },
    {
        name: '용산센터',
        location: '서울시 한강대로 95, 래미안용산 더 센트럴 3층',
        phone: '02-6328-1900',
        mapOptions: {
            lat: 37.5290927,
            lng: 126.9668857,
            zoom: 17,
        },
        images: {
            pc: ['/assets/cnx/contact-us/yongsan/center_yongsan-pc-1.png', '/assets/cnx/contact-us/yongsan/center_yongsan-pc-2.png', '/assets/cnx/contact-us/yongsan/center_yongsan-pc-3.png'],
            tablet: ['/assets/cnx/contact-us/yongsan/center_yongsan-tb-1.png', '/assets/cnx/contact-us/yongsan/center_yongsan-tb-2.png', '/assets/cnx/contact-us/yongsan/center_yongsan-tb-3.png'],
            mobile: ['/assets/cnx/contact-us/yongsan/center_yongsan-mo-1.png', '/assets/cnx/contact-us/yongsan/center_yongsan-mo-2.png', '/assets/cnx/contact-us/yongsan/center_yongsan-mo-3.png']
        },
        imageAltTexts: ['용산센터 본관 라운지', '용산센터 신관 라운지', '용산센터 별관 휴계공간']
    }
]

// Customer Service 탭 데이터(센터명, 주소, 전화번호, 지도옵션, 이미지)
const customerServiceCenters = [
    {
        name: '신도림1센터',
        location: '서울 구로구 새말로 97, 센터포인트웨스트 24층',
        phone: '02-6741-5110',
        mapOptions: {
            lat: 37.5069878,
            lng: 126.8903511,
            zoom: 17,
        },
        images: {
            pc: ['/assets/cnx/contact-us/shindorim-1/center_shindorim-1-pc-1.png', '/assets/cnx/contact-us/shindorim-1/center_shindorim-1-pc-2.png', '/assets/cnx/contact-us/shindorim-1/center_shindorim-1-pc-3.png'],
            tablet: ['/assets/cnx/contact-us/shindorim-1/center_shindorim-1-tb-1.png', '/assets/cnx/contact-us/shindorim-1/center_shindorim-1-tb-2.png', '/assets/cnx/contact-us/shindorim-1/center_shindorim-1-tb-3.png'],
            mobile: ['/assets/cnx/contact-us/shindorim-1/center_shindorim-1-mo-1.png', '/assets/cnx/contact-us/shindorim-1/center_shindorim-1-mo-2.png', '/assets/cnx/contact-us/shindorim-1/center_shindorim-1-mo-3.png']
        },
        imageAltTexts: ['신도림1센터 대회의실', '신도림1센터 회의공간 (그룹회의실)', '신도림1센터 휴계공간']
    },
    {
        name: '신도림2센터',
        location: '서울 구로구 신도림동 692 Space K 18층',
        phone: '02-6741-5104',
        mapOptions: {
            lat: 37.5086046,
            lng: 126.8889310,
            zoom: 17,
        },
        images: {
            pc: ['/assets/cnx/contact-us/shindorim-2/center_shindorim-2-pc-1.png', '/assets/cnx/contact-us/shindorim-2/center_shindorim-2-pc-2.png', '/assets/cnx/contact-us/shindorim-2/center_shindorim-2-pc-3.png'],
            tablet: ['/assets/cnx/contact-us/shindorim-2/center_shindorim-2-tb-1.png', '/assets/cnx/contact-us/shindorim-2/center_shindorim-2-tb-2.png', '/assets/cnx/contact-us/shindorim-2/center_shindorim-2-tb-3.png'],
            mobile: ['/assets/cnx/contact-us/shindorim-2/center_shindorim-2-mo-1.png', '/assets/cnx/contact-us/shindorim-2/center_shindorim-2-mo-2.png', '/assets/cnx/contact-us/shindorim-2/center_shindorim-2-mo-3.png']
        },
        imageAltTexts: ['신도림2센터 입구 데스크 및 라운지', '신도림2센터 대회의실', '신도림2센터 사무실 책상 및 의자']
    },
    {
        name: '구로센터',
        location: '서울 디지털로 300, 지밸리 비즈플라자 16층',
        phone: '02-6342-2300',
        mapOptions: {
            lat: 37.4849099,
            lng: 126.8965595,
            zoom: 17,
        },
        images: {
            pc: ['/assets/cnx/contact-us/guro/center_guro-pc-1.png', '/assets/cnx/contact-us/guro/center_guro-pc-2.png', '/assets/cnx/contact-us/guro/center_guro-pc-3.png'],
            tablet: ['/assets/cnx/contact-us/guro/center_guro-tb-1.png', '/assets/cnx/contact-us/guro/center_guro-tb-2.png', '/assets/cnx/contact-us/guro/center_guro-tb-3.png'],
            mobile: ['/assets/cnx/contact-us/guro/center_guro-mo-1.png', '/assets/cnx/contact-us/guro/center_guro-mo-2.png', '/assets/cnx/contact-us/guro/center_guro-mo-3.png']
        },
        imageAltTexts: ['구로센터 라운지 및 휴계공간', '구로센터 회의공간 (그룹회의실)', '구로센터 대회의실']
    },
    {
        name: '문래센터',
        location: '서울 영등포구 문래로28길 25, 세미콜론 문래S타워 11층',
        phone: '02-6677-1160',
        mapOptions: {
            lat: 37.5161111,
            lng: 126.8998023,
            zoom: 17,
        },
        images: {
            pc: ['/assets/cnx/contact-us/mullae/center_mullae-pc-1.png', '/assets/cnx/contact-us/mullae/center_mullae-pc-2.png', '/assets/cnx/contact-us/mullae/center_mullae-pc-3.png'],
            tablet: ['/assets/cnx/contact-us/mullae/center_mullae-tb-1.png', '/assets/cnx/contact-us/mullae/center_mullae-tb-2.png', '/assets/cnx/contact-us/mullae/center_mullae-tb-3.png'],
            mobile: ['/assets/cnx/contact-us/mullae/center_mullae-mo-1.png', '/assets/cnx/contact-us/mullae/center_mullae-mo-2.png', '/assets/cnx/contact-us/mullae/center_mullae-mo-3.png']
        },
        imageAltTexts: ['문래센터 입구 데스크 및 라운지', '문래센터 사무실 내부', '문래센터 사무실 내부: 창가쪽에 붙어있는 책상과 의자']
    },
    {
        name: '명동센터',
        location: '서울 중구 남대문로 90 명동N빌딩 8층',
        phone: '02-6261-2100',
        mapOptions: {
            lat: 37.5651103,
            lng: 126.9828407,
            zoom: 17,
        },
        images: {
            pc: ['/assets/cnx/contact-us/myeongdong/center_myeongdong-pc-1.png', '/assets/cnx/contact-us/myeongdong/center_myeongdong-pc-2.png', '/assets/cnx/contact-us/myeongdong/center_myeongdong-pc-3.png'],
            tablet: ['/assets/cnx/contact-us/myeongdong/center_myeongdong-tb-1.png', '/assets/cnx/contact-us/myeongdong/center_myeongdong-tb-2.png', '/assets/cnx/contact-us/myeongdong/center_myeongdong-tb-3.png'],
            mobile: ['/assets/cnx/contact-us/myeongdong/center_myeongdong-mo-1.png', '/assets/cnx/contact-us/myeongdong/center_myeongdong-mo-2.png', '/assets/cnx/contact-us/myeongdong/center_myeongdong-mo-3.png']
        },
        imageAltTexts: ['명동센터 라운지 및 휴계공간', '명동센터 통창으로 구성된 라운지 입구문', '명동센터 사무실 내부']
    }
]

// 탭 데이터 생성(센터명)
const tabs1 = digitalTechCenters.map(center => ({ text: center.name }));
const tabs2 = customerServiceCenters.map(center => ({ text: center.name }));

// Container ref 설정 함수
const setContainerRef = (el, type, index) => {
    if (el) {
        containerRefs.value.push(el)
    }
}

// Image Item ref 설정 함수
const setImageItemRef = (el) => {
    if (el) {
        imageItemRefs.value.push(el)
    }
}

// Container Observers 설정
const setupContainerObservers = () => {
    // 기존 observers 정리
    containerObservers.value.forEach(observer => observer?.disconnect())
    containerObservers.value = []

    // 각 container에 대해 개별 observer 생성
    containerRefs.value.forEach((container) => {
        if (!container) return

        let lastScrollY = 0
        let isFirstCheck = true

        const observer = new IntersectionObserver(
            ([entry]) => {
                const currentScrollY = window.scrollY || window.pageYOffset
                const isScrollingDown = currentScrollY > lastScrollY
                const isNearTop = currentScrollY < 100

                if (entry.isIntersecting && (isScrollingDown || isFirstCheck || isNearTop)) {
                    container.classList.add('active')
                    isFirstCheck = false
                } else if (!entry.isIntersecting && !isScrollingDown) {
                    container.classList.remove('active')
                    isFirstCheck = true
                }

                lastScrollY = currentScrollY
            },
            {
                threshold: 0.1,
                rootMargin: '-50px'
            }
        )

        observer.observe(container)
        containerObservers.value.push(observer)
    })
}

// Image Item Observers 설정
const setupImageItemObservers = () => {
    // 기존 observers 정리
    imageItemObservers.value.forEach(observer => observer?.disconnect())
    imageItemObservers.value = []

    // 각 image-item에 대해 개별 observer 생성
    imageItemRefs.value.forEach((imageItem) => {
        if (!imageItem) return

        let lastScrollY = 0
        let isFirstCheck = true

        const observer = new IntersectionObserver(
            ([entry]) => {
                const currentScrollY = window.scrollY || window.pageYOffset
                const isScrollingDown = currentScrollY > lastScrollY
                const isNearTop = currentScrollY < 100

                if (entry.isIntersecting && (isScrollingDown || isFirstCheck || isNearTop)) {
                    imageItem.classList.add('active')
                    isFirstCheck = false
                } else if (!entry.isIntersecting && !isScrollingDown) {
                    imageItem.classList.remove('active')
                    isFirstCheck = true
                }

                lastScrollY = currentScrollY
            },
            {
                threshold: 0.1,
                rootMargin: '-50px'
            }
        )

        observer.observe(imageItem)
        imageItemObservers.value.push(observer)
    })
}

// 네이버 지도 스크립트 로드 함수
const loadNaverMapScript = () => {
    return new Promise((resolve, reject) => {
        if (window.naver && window.naver.maps) {
            resolve(window.naver.maps)
            return
        }

        const script = document.createElement('script')
        const keyId = useRuntimeConfig().public.naverClientId

        if (!keyId) {
            reject(new Error('네이버 지도 API가 필요합니다. NUXT_PUBLIC_NAVER_CLIENT_ID 환경 변수를 확인하세요.'))
            return
        }

        script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${keyId}`
        script.onload = () => {
            if (window.naver && window.naver.maps) {
                resolve(window.naver.maps)
            } else {
                reject(new Error('네이버 지도 API 로드 실패'))
            }
        }
        script.onerror = () => reject(new Error('네이버 지도 스크립트 로드 실패'))
        document.head.appendChild(script)
    })
}

// 화면 크기 체크 함수
const checkScreenSize = () => {
    if (process.client) {
        isMobile.value = window.innerWidth < 768
    }
}

// 네이버맵 초기화 함수
const initializeMap = (mapId, center, title) => {
    const mapElement = document.getElementById(mapId)
    if (!mapElement) return null

    // 화면 크기에 따른 마커 아이콘 선택
    const selectedMarkerIcon = isMobile.value ? markerIconMo : markerIcon

    // 네이버맵 초기화
    const map = new window.naver.maps.Map(mapElement, {
        center: new window.naver.maps.LatLng(center.lat, center.lng), // 센터 좌표
        zoom: center.zoom || 15, // 줌 레벨
        mapTypeControl: false,  // 일반/위성 선택 탭 
        zoomControl: false      // 확대/축소 선택 탭
    })

    // 네이버맵 마커 초기화
    const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(center.lat, center.lng),
        map,
        // 마커 아이콘 
        icon: {
            url: selectedMarkerIcon,
        },
        title: title
    })

    // 마커 참조를 맵 객체에 저장 (리사이즈 시 업데이트용)
    map._marker = marker
    map._center = center
    map._title = title

    return map
}

// 모든 활성 지도의 마커 아이콘 업데이트
const updateMapMarkers = () => {
    Object.values(maps.value).forEach(map => {
        if (map && map._marker) {
            const selectedMarkerIcon = isMobile.value ? markerIconMo : markerIcon
            map._marker.setIcon({
                url: selectedMarkerIcon,
            })
        }
    })
}

// 현재 활성 탭의 지도 초기화
const initializeCurrentMap = async () => {
    try {
        await loadNaverMapScript()
        await nextTick()

        if (activeTab.value === 0) {
            // Digital & Technology Business 
            const currentCenter = digitalTechCenters[activeTab1.value]
            const mapId = `map-digital-${activeTab1.value}`
            maps.value[mapId] = initializeMap(mapId, currentCenter.mapOptions, currentCenter.name)
        } else {
            // Customer Service 
            const currentCenter = customerServiceCenters[activeTab2.value]
            const mapId = `map-customer-${activeTab2.value}`
            maps.value[mapId] = initializeMap(mapId, currentCenter.mapOptions, currentCenter.name)
        }
    } catch (error) {
        console.error('지도 초기화 실패:', error)
    }
}

const handleTabChange = async () => {
    await nextTick()
    initializeCurrentMap()
    // 탭 변경 시 observer 재설정
    setupContainerObservers()
    setupImageItemObservers()
}

const onTabChange = async () => {
    await nextTick()
    initializeCurrentMap()
    // 탭 변경 시 observer 재설정
    setupContainerObservers()
    setupImageItemObservers()
}

// 리사이즈 이벤트 핸들러
const handleResize = () => {
    const previousIsMobile = isMobile.value
    checkScreenSize()

    if (previousIsMobile !== isMobile.value) {
        updateMapMarkers()
    }
}

onBeforeUpdate(() => {
    containerRefs.value = []
    imageItemRefs.value = []
})

onMounted(() => {
    checkScreenSize()
    initializeCurrentMap()
    
    // Fade-up 애니메이션 Observer 설정
    nextTick(() => {
        setupContainerObservers()
        setupImageItemObservers()
    })

    // 리사이즈 이벤트 리스너 등록
    if (process.client) {
        window.addEventListener('resize', handleResize)
    }
})

onUnmounted(() => {
    // 리사이즈 이벤트 리스너 제거
    if (process.client) {
        window.removeEventListener('resize', handleResize)
    }
})

onBeforeUnmount(() => {
    // Container observers 정리
    containerObservers.value.forEach(observer => observer?.disconnect())
    containerObservers.value = []
    
    // Image Item observers 정리
    imageItemObservers.value.forEach(observer => observer?.disconnect())
    imageItemObservers.value = []
})

</script>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    padding: 0 0 rem(40);

    @include tablet {
        flex-direction: row;
        justify-content: space-between;
        padding: 0 0 rem(49);
        border-bottom: 1px solid $gray-2;
    }

    @include desktop {
        padding: 0 0 rem(78);
    }

    // 초기 상태: 자식 요소들 숨김
    .container__content-title,
    .container__content-info-item,
    .container__map,
    .container__content-info-mobile-item {
        transform: translateY(30px);
        opacity: 0;
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }

    // active 상태: 순차적으로 나타남
    &.active {
        .container__content-title {
            opacity: 1;
            transform: translateY(0);
            transition-delay: 0s;
        }

        .container__content-info-item {
            opacity: 1;
            transform: translateY(0);
            &:nth-child(1) {
                transition-delay: 0.2s;
            }
            &:nth-child(2) {
                transition-delay: 0.3s;
            }
        }

        .container__map {
            opacity: 1;
            transform: translateY(0);
            transition-delay: 0.4s;
        }

        .container__content-info-mobile-item {
            opacity: 1;
            transform: translateY(0);
            &:nth-child(1) {
                transition-delay: 0.5s;
            }
            &:nth-child(2) {
                transition-delay: 0.6s;
            }
        }
    }

    &__content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        @include tablet {
            gap: rem(62);
        }

        @include desktop {
            gap: rem(278);
        }

        &-title {
            @include sub-headline-01;

            @include desktop {
                @include headline-02;
            }

            span:first-child {
                font-weight: 300;
            }

            .br-tablet-only {
                display: none;

                @include tablet {
                    display: block;
                }
            }
        }

        &-info {
            display: none;

            @include tablet {
                display: block;
            }

            &-item {
                @include tablet {
                    display: flex;
                    flex-direction: column;
                    margin: 0 0 rem(5);
                }

                @include desktop {
                    flex-direction: row;
                    max-height: rem(64);
                    margin: 0 0 rem(13.66);
                }

                div {
                    display: flex;
                    align-items: center;
                    position: relative;

                    .svg-title {
                        width: rem(41);

                        @include desktop {
                            width: rem(59);
                        }
                    }

                    .svg-icon {
                        margin: 0 rem(7) 0 0;
                        width: rem(9);
                        height: rem(12);

                        @include desktop {
                            width: rem(20);
                            height: rem(24);
                            margin: 0 rem(19) 0 0;
                        }
                    }

                    span:last-child {
                        @include tablet {
                            @include body-03;
                            font-weight: 700;
                        }

                        @include desktop {
                            @include body-03;
                            font-weight: 700;
                        }
                    }
                }

                .detail {
                    @include tablet {
                        @include body-03;
                        padding: 0 0 0 rem(17);
                    }

                    @include desktop {
                        @include body-03;
                        padding: 0 0 0 rem(40);
                    }
                }
            }

            &-item:last-child {
                margin-bottom: 0;
            }
        }
    }

    &__map {
        width: 100%;
        height: auto;

        @include tablet {
            width: 50%;
        }

        .contact-map {
            width: 100%;
            max-height: rem(590);
            aspect-ratio: 312/284;
            background-color: $gray-3;
            margin: rem(24) 0 0;

            @include tablet {
                aspect-ratio: 308/283;
                margin: rem(-65) 0 0;
            }

            @include desktop {
                height: rem(590);
                margin: rem(-103) 0 0;
            }
        }
    }

    &__content-info-mobile {
        display: block;
        padding: rem(25) 0 0;

        @include tablet {
            display: none;
        }

        &-item {
            display: flex;
            flex-direction: column;
            margin: 0 0 rem(17);

            div {
                display: flex;
                align-items: center;
                gap: rem(8);
                position: relative;

                .svg-icon {
                    width: rem(19);
                    height: rem(19);
                }

                span:last-child {
                    @include body-03;
                    font-weight: 700;
                }
            }

            .detail {
                @include body-03;
                padding: 0 0 0 rem(28);
            }
        }
    }

    &__image {
        display: flex;
        flex-direction: column;
        height: auto;
        gap: rem(8);
        padding: 0 0 rem(123);

        @include tablet {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: rem(24);
            padding: rem(48) 0 rem(54);
        }

        @include desktop {
            gap: rem(32);
            padding: rem(75) 0 rem(80);
        }

        &-item {
            width: 100%;
            height: 100%;
            transform: translateY(30px);
            opacity: 0;
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;

            &.active {
                opacity: 1;
                transform: translateY(0);
            }

            div {
                width: 100%;
                height: 100%;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            @include tablet {
                flex: 1;
            }
        }

        &-item:first-child {
            div {
                aspect-ratio: 312/175;

                @include tablet {
                    aspect-ratio: 308/161;
                }

                @include desktop {
                    aspect-ratio: 644/336;
                }
            }
        }

        &-item:last-child {
            display: flex;
            align-items: flex-start;
            gap: rem(8);
            flex: 1;
            overflow: hidden;

            @include tablet {
                gap: rem(24);
            }

            @include desktop {
                max-height: rem(336);
                gap: rem(32);
            }

            div {
                aspect-ratio: 152/115;

                @include tablet {
                    max-height: rem(338.46);
                    aspect-ratio: 142/161;
                }

                @include desktop {
                    aspect-ratio: 306/334;
                }
            }
        }
    }
}

.customer-service {
    .container__content {
        @include tablet {
            gap: rem(24);
        }

        @include desktop {
            gap: rem(222);
        }
    }

    .contact-map {
        @include tablet {
            aspect-ratio: 308/283;
            margin: rem(-94) 0 0;
        }

        @include desktop {
            height: rem(590);
            margin: rem(-170) 0 0;
        }
    }
}

.svg-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
    position: relative;

    :deep(svg) {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        max-width: none;
        max-height: none;
        object-fit: contain;
        display: block;
    }
}

:deep(.app-button-tab-container) {

    .tab-list {
        max-width: rem(1440);
        margin: 0 auto;

        @include desktop {
            max-width: rem(1320);
        }
    }

    .tab-list .inner {
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        padding: 0 rem(24) rem(36);
        max-width: rem(300);

        @include tablet {
            max-width: rem(450);
            padding: 0 rem(80) rem(24);
        }

        @include desktop {
            padding: 0 0 rem(48);
            max-width: rem(400);
        }
    }

    .tab-button {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>