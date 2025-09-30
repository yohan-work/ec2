<template>
    <div class="min-h-screen bg-gray-50">
        <!-- 헤더-->
        <!-- 메인 콘텐츠 -->
        <main>
            <!-- 제목 -->
            <AppTitle title="Contact Us" />
            <AppTab v-model="activeTab" :tabs="contactTabs" @tab-change="handleTabChange">
                <!-- S : Digital & Technology Business 탭-->
                <template #digital-technology-business>
                    <AppButtonTab v-model="activeTab1" :tabs="tabs1" alignment="left" @tab-change="onTabChange">
                        <!-- eslint-disable vue/no-v-for-template-key -->
                        <template v-for="(center, index) in digitalTechCenters" :key="index" #[`tab-${index}`]>
                            <div class="container">
                                <div class="container__content">
                                    <h2 class="container__content-title">
                                        콘센트릭스 <br class="br-tablet-only"> <span>{{ center.name }}</span></h2>
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
                                            <span class="detail">{{ center.phone }}</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- S : 네이버 지도 영역  -->
                                <div class="container__map">
                                    <!-- 네이버 지도 영역 (추후 구현) -->
                                    <!-- <NaverMap :lat="center.mapLat" :lng="center.mapLng" /> -->
                                    <div class="contact-map">
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
                                        <span class="detail">{{ center.phone }}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- S : 센터 이미지 영역  -->
                            <div class="container__image">
                                <!-- 이미지 영역 (추후 구현) -->
                                <!-- <img v-for="(image, imgIndex) in center.images" :key="imgIndex" :src="image" :alt="`${center.name} 이미지 ${imgIndex + 1}`" /> -->
                                <div class="container__image-item">
                                    <div>
                                        <!-- <picture>
                                            <source srcset="image.png" media="(min-width: )" />
                                            <img src="image.png" alt="센터 이미지">
                                        </picture> -->
                                    </div>
                                </div>
                                <div class="container__image-item">
                                    <div>
                                        <!-- <picture>
                                            <source srcset="image.png" media="(min-width: )" />
                                            <img src="image.png" alt="센터 이미지">
                                        </picture> -->
                                    </div>
                                    <div>
                                        <!-- <picture>
                                            <source srcset="image.png" media="(min-width: )" />
                                            <img src="image.png" alt="센터 이미지">
                                        </picture> -->
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
                            <div class="container customer-service">
                                <div class="container__content">
                                    <h2 class="container__content-title">
                                        콘센트릭스 <br class="br-tablet-only"> <span>{{ center.name }}</span></h2>
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
                                            <span class="detail">{{ center.phone }}</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- S : 네이버 지도 영역  -->
                                <div class="container__map">
                                    <!-- <NaverMap :lat="center.mapLat" :lng="center.mapLng" /> -->
                                    <div class="contact-map">
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
                                        <span class="detail">{{ center.phone }}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- S : 센터 이미지 영역  -->
                            <div class="container__image">
                                <!-- 이미지 영역 (추후 구현) -->
                                <!-- <img v-for="(image, imgIndex) in center.images" :key="imgIndex" :src="image" :alt="`${center.name} 이미지 ${imgIndex + 1}`" /> -->
                                <div class="container__image-item">
                                    <div>
                                        <!-- <picture>
                                            <source srcset="image.png" media="(min-width: )" />
                                            <img src="image.png" alt="센터 이미지">
                                        </picture> -->
                                    </div>
                                </div>
                                <div class="container__image-item">
                                    <div>
                                        <!-- <picture>
                                            <source srcset="image.png" media="(min-width: )" />
                                            <img src="image.png" alt="센터 이미지">
                                        </picture> -->
                                    </div>
                                    <div>
                                        <!-- <picture>
                                            <source srcset="image.png" media="(min-width: )" />
                                            <img src="image.png" alt="센터 이미지">
                                        </picture> -->
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
    </div>
</template>

<script setup>
import { ref } from 'vue'

// Components
import AppTitle from '~/components/cnx/AppTitle.vue'
import AppTab from '~/components/cnx/AppTab.vue'
import AppButtonTab from '~/components/cnx/AppButtonTab.vue'

// SVG Icons
import locationSvg from '~/components/assets/cnx/location.svg?raw'
import phoneSvg from '~/components/assets/cnx/phone.svg?raw'

const activeTab = ref(0)

const contactTabs = [
    { label: 'Digital & Technology Business', slot: 'digital-technology-business' },
    { label: 'Customer Service', slot: 'customer-service' }
]

// const handleTabChange = (event: Event) => {
//     console.log('Main tab changed:', event)
// }

const handleTabChange = (event) => {
    console.log('Main tab changed:', event)
}

const activeTab1 = ref(0);
const activeTab2 = ref(0);

// 센터 데이터 타입 정의
// interface CenterData {
//     name: string;
//     location: string;
//     phone: string;
//     mapLat: number; // 네이버 지도 위도 (추후 적용)
//     mapLng: number; // 네이버 지도 경도 (추후 적용)
//     images: string[]; // 이미지 경로들 (추후 적용)
// }

// Digital & Technology Business 데이터
const digitalTechCenters = [
    {
        name: '강남센터',
        location: '서울시 강남구 테헤란로 505, SAC타워 10층, 11층',
        phone: '010-6328-1900',
        // mapLat: 37.501234,
        // mapLng: 127.041234,
        // images: ['/images/gangnam-1.jpg', '/images/gangnam-2.jpg', '/images/gangnam-3.jpg']
    },
    {
        name: '강남2센터',
        location: '서울시 강남구 테헤란로 505, SAC타워 10층, 11층',
        phone: '010-6328-1900',
        // mapLat: 37.501234,
        // mapLng: 127.041234,
        // images: ['/images/gangnam2-1.jpg', '/images/gangnam2-2.jpg', '/images/gangnam2-3.jpg']
    },
    {
        name: '용산센터',
        location: '서울시 용산구',
        phone: '010-6328-1900',
        // mapLat: 37.501234,
        // mapLng: 127.041234,
        // images: ['/images/yongsan-1.jpg', '/images/yongsan-2.jpg', '/images/yongsan-3.jpg']
    }
];

// Customer Service 데이터
const customerServiceCenters = [
    {
        name: '신도림1센터',
        location: '서울시 강남구 테헤란로 505, SAC타워 10층, 11층',
        phone: '010-6328-1900',
        // mapLat: 37.501234,
        // mapLng: 127.041234,
        // images: ['/images/sindorim1-1.jpg', '/images/sindorim1-2.jpg', '/images/sindorim1-3.jpg']
    },
    {
        name: '신도림2센터',
        location: '서울시 강남구 테헤란로 505, SAC타워 10층, 11층',
        phone: '010-6328-1900',
        // mapLat: 37.501234,
        // mapLng: 127.041234,
        // images: ['/images/sindorim2-1.jpg', '/images/sindorim2-2.jpg', '/images/sindorim2-3.jpg']
    },
    {
        name: '구로센터',
        location: '서울시 강남구 테헤란로 505, SAC타워 10층, 11층',
        phone: '010-6328-1900',
        // mapLat: 37.501234,
        // mapLng: 127.041234,
        // images: ['/images/guro-1.jpg', '/images/guro-2.jpg', '/images/guro-3.jpg']
    },
    {
        name: '문래센터',
        location: '서울시 강남구 테헤란로 505, SAC타워 10층, 11층',
        phone: '010-6328-1900',
        // mapLat: 37.501234,
        // mapLng: 127.041234,
        // images: ['/images/mullae-1.jpg', '/images/mullae-2.jpg', '/images/mullae-3.jpg']
    },
    {
        name: '명동센터',
        location: '서울시 강남구 테헤란로 505, SAC타워 10층, 11층',
        phone: '010-6328-1900',
        // mapLat: 37.501234,
        // mapLng: 127.041234,
        // images: ['/images/myeongdong-1.jpg', '/images/myeongdong-2.jpg', '/images/myeongdong-3.jpg']
    }
];

// 탭 데이터 생성
const tabs1 = digitalTechCenters.map(center => ({ text: center.name }));
const tabs2 = customerServiceCenters.map(center => ({ text: center.name }));

const onTabChange = (index, tab) => {
    console.log(`탭 변경: ${index}번째 탭 (${tab.text})`);
};

</script>

<style scoped lang="scss">
@use '~/layouts/scss/cnx.scss' as *;
@use '~/layouts/scss/cnx/_variables' as *;
@use '~/layouts/scss/cnx/_mixins' as *;
@use '~/layouts/scss/cnx/_functions' as *;

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

    &__content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        @include tablet {
            gap: rem(120);
        }

        @include desktop {
            gap: rem(285);
        }

        &-title {
            font-size: rem(24);
            font-weight: 300;
            line-height: 1.2;

            @include tablet {
                font-size: rem(32);
            }

            @include desktop {
                font-size: rem(64);
            }

            span {
                font-weight: 700;
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
                    align-items: center;
                    margin: 0 0 rem(5);
                }

                @include desktop {
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
                            font-size: rem(11);
                            font-weight: 400;
                            line-height: 1.4;
                        }

                        @include desktop {
                            font-size: rem(16);
                            font-weight: 700;
                        }
                    }
                }

                .detail {
                    @include tablet {
                        font-size: rem(11);
                        font-weight: 400;
                        line-height: 1.4;
                        padding: 0 0 0 rem(22);
                    }

                    @include desktop {
                        font-size: rem(16);
                        font-weight: 400;
                        padding: 0 0 0 rem(68);
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
            min-height: rem(284);
            background-color: $gray-3;
            margin: rem(24) 0 0;

            @include tablet {
                aspect-ratio: 308/283;
                margin: rem(-65) 0 0;
            }

            @include desktop {
                height: rem(590);
                margin: rem(-95) 0 0;
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
                    font-size: rem(12);
                    font-weight: 700;
                }
            }

            .detail {
                font-size: rem(12);
                font-weight: 400;
                padding: 0 0 0 rem(26);
            }
        }
    }

    &__image {
        display: flex;
        flex-direction: column;
        gap: rem(8);
        padding: 0 0 rem(159);

        @include tablet {
            flex-direction: row;
            gap: rem(24);
            padding: rem(48) 0 rem(73);
        }

        @include desktop {
            padding: rem(75) 0 rem(86);
        }

        &-item {
            width: 100%;

            @include tablet {
                width: 50%;
            }

            div {
                width: 100%;
                
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
        }

        &-item:first-child {
            width: 100%;

            @include tablet {
                width: 50%;
            }

            div {
                width: 100%;
                height: rem(175);
                background-color: $gray-3;


                @include tablet {
                    height: rem(142);
                }

                @include desktop {
                    height: rem(335);
                }
            }
        }

        &-item:last-child {
            display: flex;
            gap: rem(8);
            width: 100%;

            @include tablet {
                width: 50%;
                gap: rem(24);
            }

            div {
                width: 100%;
                height: rem(115);
                background-color: $gray-3;


                @include tablet {
                    height: rem(142);
                }

                @include desktop {
                    height: rem(335);
                }
            }
        }
    }
}

.customer-service {
    .container__content {
        @include tablet {
            gap: rem(80);
        }
        @include desktop {
            gap: rem(222);
        }
    }
    .contact-map {

        @include tablet {
            aspect-ratio: 308/283;
            margin: rem(-111) 0 0;
        }

        @include desktop {
            height: rem(590);
            margin: rem(-157) 0 0;
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
</style>