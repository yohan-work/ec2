<template>
  <div class="main-key-visual-swiper">
    <swiper
      :slidesPerView="1"
      :effect="'fade'"
      :pagination="paginationConfig"
      :navigation="navigationConfig"
      :modules="modules"
      :loop="true"
      :speed="speed"
      :autoplay="autoplayConfig"
      @swiper="onSwiperInit"
      @slideChange="onSlideChange"
      class="swiper-container"
    >
      <swiper-slide 
        v-for="(slide, index) in slides" 
        :key="index"
        class="swiper-slide"
        :class="{ 'swiper-slide-active': currentActiveIndex === index }"
      >
        <div class="slide-wrapper">
          <!-- 비디오 배경 -->
          <template v-if="slide.type === 'video'">
            <video
              v-if="slide.mobileVideo"
              :src="slide.mobileVideo"
              :ref="el => setVideoRef(el, index, 'mobile')"
              muted
              playsinline
              class="slide-video mobile"
              :aria-label="slide.imageAlt || slide.title || 'Key Visual'"
              @loadedmetadata="onVideoLoadedMetadata"
              @ended="onVideoEnded"
            ></video>
            <video
              v-if="slide.desktopVideo"
              :src="slide.desktopVideo"
              :ref="el => setVideoRef(el, index, 'desktop')"
              muted
              playsinline
              class="slide-video desktop"
              :aria-label="slide.imageAlt || slide.title || 'Key Visual'"
              @loadedmetadata="onVideoLoadedMetadata"
              @ended="onVideoEnded"
            ></video>
          </template>

          <!-- 이미지 배경 -->
          <picture v-else class="slide-image" :class="{ 'is-active': currentActiveIndex === index && slide.type !== 'video' }">
            <source 
              v-if="slide.desktopImage"
              :srcset="slide.desktopImage" 
              media="(min-width: 1480px)"
            />
            <source 
              v-if="slide.tabletImage"
              :srcset="slide.tabletImage" 
              media="(min-width: 768px)"
            />
            <img 
              :src="slide.mobileImage || slide.desktopImage" 
              :alt="slide.imageAlt || slide.title || 'Key Visual'"
              loading="lazy"
            />
          </picture>

          <!-- 오버레이 컨텐츠 (중앙 세로 정렬) -->
          <div v-if="slide.title || slide.description || slide.button" class="slide-content">
            <div class="inner">
              <h2 v-if="slide.title" class="slide-title" v-html="slide.title"></h2>
              <p v-if="slide.description" class="slide-description" v-html="slide.description"></p>
              <AppButton
                v-if="slide.button"
                :text="slide.button.text"
                :to="slide.button.to"
                :href="slide.button.href"
                :variant="slide.button.variant || undefined"
                :color="slide.button.color || 'white'"
                :arrow="slide.button.arrow !== undefined ? slide.button.arrow : true"
                class="slide-button"
              />
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>

    <!-- Pagination -->
    <div class="slide-pagination-wrap">
      <div class="swiper-pagination-custom" ref="paginationElRef"></div>
    </div>

    <!-- Progress Bar -->
    <div class="slide-progress-bar">
      <div 
        ref="progressBarFillRef"
        class="slide-progress-bar__fill" 
        :class="{ 'is-animating': isProgressAnimating }"
      ></div>
    </div>

    <!-- Custom Navigation Buttons -->
    <div class="swiper-nav-buttons-wrapper">
      <div class="swiper-button-prev-custom" ref="prevElRef">
        <AppButton 
          variant="circle" 
          arrow="reverse" 
          color="white"
          text=""
          aria-label="이전 슬라이드로 이동"
        />
      </div>
      <div class="swiper-button-next-custom" ref="nextElRef">
        <AppButton 
          variant="circle" 
          arrow 
          color="white"
          text=""
          aria-label="다음 슬라이드로 이동"
        />
      </div>
    </div> 

  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted, watch } from 'vue'
import AppButton from './AppButton.vue'

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation, EffectFade, Autoplay } from 'swiper/modules'

// Swiper 모듈 설정
const modules = [Pagination, Navigation, EffectFade, Autoplay]

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'

// Props 정의
const props = defineProps({
  slides: {
    type: Array,
    required: true,
    validator: (value) => {
      return Array.isArray(value) && value.every(slide => {
        if (!slide || typeof slide !== 'object') return false
        
        const type = slide.type || 'image'
        
        if (type === 'video') {
          return !!(slide.mobileVideo || slide.desktopVideo)
        } else {
          return !!(slide.mobileImage || slide.desktopImage)
        }
      })
    }
  },
  speed: {
    type: Number,
    default: 400
  },
  autoplay: {
    type: [Number, Boolean],
    default: 5000
  }
})

// Custom navigation, pagination ref
const swiperInstance = ref(null)
const prevElRef = ref(null)
const nextElRef = ref(null)
const paginationElRef = ref(null)

// 현재 활성 슬라이드 인덱스
const currentActiveIndex = ref(0)

// 프로그래스 상태
const progressPercentage = ref(0)
const currentDuration = ref(0)
const isProgressAnimating = ref(false)
const videoRefs = ref(new Map())
const progressBarFillRef = ref(null)
const isMobile = ref(false)
const prevIsMobile = ref(false) // 이전 isMobile 값 추적
let rafId = null // requestAnimationFrame ID
let resizeTimeout = null // 리사이징 디바운스 타이머
let isVideoRefChanging = false // 비디오 ref 변경 감지 중복 실행 방지 플래그
let previousVideoState = null // 리사이징 전 비디오 상태 저장 (재생 중인지, 현재 시간)

// 현재 활성 비디오 요소 (SSR 안전)
const currentVideoRef = computed(() => {
  if (!process.client) return null
  
  const currentSlide = props.slides[currentActiveIndex.value]
  if (!currentSlide || currentSlide.type !== 'video') return null
  
  const videoKey = `${currentActiveIndex.value}-${isMobile.value ? 'mobile' : 'desktop'}`
  return videoRefs.value.get(videoKey)
})

// 프로그래스 바 요소 가져오기 (헬퍼 함수)
const getProgressBarFill = () => {
  return progressBarFillRef.value || document.querySelector('.slide-progress-bar__fill')
}

// 반응형 체크
const checkResponsive = () => {
  if (!process.client) return
  
  const wasMobile = isMobile.value
  const newIsMobile = window.innerWidth < 768
  
  // 반응형이 변경되었고, 현재 비디오 슬라이드인 경우 재시작
  if (wasMobile !== newIsMobile) {
    prevIsMobile.value = wasMobile
    isMobile.value = newIsMobile
    
    // 비디오 ref 변경 감지가 이미 처리 중이면 무시
    if (isVideoRefChanging) return
    
    const currentSlide = props.slides[currentActiveIndex.value]
    if (currentSlide && currentSlide.type === 'video') {
      // 이전 비디오의 재생 상태 저장 (watch가 처리하기 전에)
      const oldVideo = currentVideoRef.value
      if (oldVideo && oldVideo.readyState >= 2) {
        previousVideoState = {
          wasPlaying: !oldVideo.paused,
          currentTime: oldVideo.currentTime,
          duration: oldVideo.duration
        }
      }
      // watch가 처리하도록 함 (비디오 ref가 변경되면 자동으로 감지)
    }
  }
}

// 비디오 ref 설정
const setVideoRef = (el, index, type) => {
  if (el) {
    const key = `${index}-${type}`
    videoRefs.value.set(key, el)
  } else {
    const key = `${index}-${type}`
    videoRefs.value.delete(key)
  }
}

// Swiper 인스턴스 저장
const onSwiperInit = (swiper) => {
  swiperInstance.value = swiper
  // 초기 활성 인덱스 설정
  currentActiveIndex.value = swiper.realIndex !== undefined ? swiper.realIndex : swiper.activeIndex
}

// 비디오 메타데이터 로드 핸들러
const onVideoLoadedMetadata = (event) => {
  if (!process.client) return
  
  const video = event.target
  if (video === currentVideoRef.value) {
    // duration이 유효한 값인지 확인
    const duration = video.duration
    if (isNaN(duration) || duration <= 0) return
    
    // 리사이징으로 인한 상태 복원이 필요한 경우
    if (previousVideoState && isVideoRefChanging) {
      restoreVideoState(video)
      return
    }
    
    currentDuration.value = duration * 1000 // 초를 밀리초로 변환
    progressPercentage.value = 0
    
    // 비디오 재생 시작 (에러 처리 포함)
    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // 재생 성공 - 프로그래스 바 애니메이션 시작
          nextTick(() => {
            startVideoProgressAnimation(video.duration)
          })
        })
        .catch((error) => {
          // autoplay 정책으로 재생 실패 시 무시
          console.warn('Video autoplay failed:', error)
        })
    } else {
      // play()가 Promise를 반환하지 않는 경우 (구형 브라우저)
      nextTick(() => {
        startVideoProgressAnimation(video.duration)
      })
    }
  }
}


// 비디오 종료 핸들러
const onVideoEnded = (event) => {
  if (!process.client) return
  if (!swiperInstance.value) return
  
  const video = event?.target
  if (video === currentVideoRef.value) {
    swiperInstance.value.slideNext()
  }
}

// 이미지 슬라이드 타이머 시작 (Date.now() 기반으로 탭 전환 시에도 정확히 계산)
const startImageTimer = (retryCount = 0) => {
  if (!process.client) return
  
  // 최대 3번까지 재시도
  if (retryCount > 3) {
    console.warn('Failed to start image timer after retries')
    return
  }
  
  // 이전 타이머 완전히 정리
  clearImageTimer()
  
  // 상태 초기화
  isProgressAnimating.value = false
  progressPercentage.value = 0
  const duration = 3000 
  currentDuration.value = duration
  
  // 현재 활성 슬라이드 인덱스 저장 (슬라이드 변경 감지용)
  const slideIndex = currentActiveIndex.value
  
  // 짧은 지연 후 실행 (DOM 준비 보장)
  setTimeout(() => {
    // 슬라이드가 변경되었는지 확인
    if (currentActiveIndex.value !== slideIndex) {
      return
    }
    
    const progressBarFill = getProgressBarFill()
    
    // 프로그래스바 요소가 없으면 재시도
    if (!progressBarFill) {
      startImageTimer(retryCount + 1)
      return
    }
    
    // 이전 애니메이션 정리 (CSS 애니메이션 제거)
    const existingAnimation = progressBarFill.getAnimations?.()?.[0]
    if (existingAnimation) {
      existingAnimation.cancel()
    }
    progressBarFill.classList.remove('is-animating')
    
    // 프로그래스 바 강제 초기화
    progressBarFill.style.width = '0%'
    progressBarFill.style.setProperty('--progress-start', '0%')
    progressBarFill.style.setProperty('--progress-percentage', '0%')
    
    // 강제 리플로우 (DOM 업데이트 보장)
    void progressBarFill.offsetWidth
    
    // 상태 설정
    isProgressAnimating.value = true
    const startTime = Date.now()
    
    // Date.now() 기반으로 경과 시간을 추적하여 탭 전환 후에도 정확히 계산
    const updateProgress = () => {
      // 프로그래스 바가 중단되었는지 확인
      if (!isProgressAnimating.value) {
        rafId = null
        return
      }
      
      // 슬라이드가 변경되었는지 확인 (다른 슬라이드로 넘어갔으면 중단)
      if (currentActiveIndex.value !== slideIndex) {
        isProgressAnimating.value = false
        rafId = null
        return
      }
      
      const elapsed = Date.now() - startTime
      const progress = Math.min((elapsed / duration) * 100, 100)
      
      if (progressBarFill.parentElement) {
        progressBarFill.style.width = `${progress}%`
      }
      
      if (progress < 100) {
        rafId = requestAnimationFrame(updateProgress)
      } else {
        // 완료 - 다음 슬라이드
        isProgressAnimating.value = false
        if (swiperInstance.value) {
          swiperInstance.value.slideNext()
        }
        rafId = null
      }
    }
    
    rafId = requestAnimationFrame(updateProgress)
  }, retryCount > 0 ? 50 : 10) // 재시도 시 약간 더 긴 지연
}

// 비디오 프로그래스 바 애니메이션 시작 (비디오 duration에 맞춰 부드럽게 0~100%)
const startVideoProgressAnimation = (duration) => {
  if (!process.client) return
  
  // duration이 유효한 값인지 확인
  if (isNaN(duration) || duration <= 0) {
    console.warn('Invalid video duration:', duration)
    return
  }
  
  clearImageTimer()
  isProgressAnimating.value = true
  progressPercentage.value = 0
  const durationMs = duration * 1000 // 초를 밀리초로 변환
  currentDuration.value = durationMs
  
  // 현재 활성 슬라이드 인덱스 저장 (비디오 ref 변경 감지용)
  const slideIndex = currentActiveIndex.value
  
  nextTick(() => {
    // 현재 활성 비디오 ref 확인 (슬라이드 변경 후 정확한 비디오를 참조)
    const video = currentVideoRef.value
    if (!video) {
      isProgressAnimating.value = false
      return
    }
    
    // 슬라이드가 변경되었는지 확인 (다른 슬라이드로 넘어갔으면 중단)
    if (currentActiveIndex.value !== slideIndex) {
      isProgressAnimating.value = false
      return
    }
    
    const progressBarFill = getProgressBarFill()
    if (!progressBarFill) {
      isProgressAnimating.value = false
      return
    }
    
    // 이전 애니메이션 정리
    const existingAnimation = progressBarFill.getAnimations?.()?.[0]
    if (existingAnimation) {
      existingAnimation.cancel()
    }
    progressBarFill.classList.remove('is-animating')
    
    // 프로그래스 바 강제 초기화 (슬라이드 변경 시 확실히 리셋)
    progressBarFill.style.width = '0%'
    progressBarFill.style.setProperty('--progress-start', '0%')
    progressBarFill.style.setProperty('--progress-percentage', '0%')
    
    // 비디오도 초기화 확인 (새 슬라이드의 비디오가 정확히 시작되도록)
    if (video.currentTime > 0) {
      video.currentTime = 0
    }
    
    // 비디오의 실제 재생 시간(currentTime)을 기준으로 부드럽게 0~100%까지 업데이트
    const updateProgress = () => {
      // 프로그래스 바가 중단되었는지 확인
      if (!isProgressAnimating.value) {
        rafId = null
        return
      }
      
      // 슬라이드가 변경되었는지 확인 (다른 슬라이드로 넘어갔으면 중단)
      if (currentActiveIndex.value !== slideIndex) {
        isProgressAnimating.value = false
        rafId = null
        return
      }
      
      // 현재 활성 비디오 ref 확인 (슬라이드 변경 시 비디오 ref도 변경될 수 있음)
      const currentVideo = currentVideoRef.value
      if (!currentVideo) {
        // 비디오 ref가 없으면 중단
        isProgressAnimating.value = false
        rafId = null
        return
      }
      
      // 비디오의 실제 재생 시간을 기준으로 계산 (비디오와 완전 동기화)
      const videoCurrentTime = currentVideo.currentTime || 0
      const videoDuration = currentVideo.duration || duration
      
      if (videoDuration > 0) {
        const progress = Math.min((videoCurrentTime / videoDuration) * 100, 100)
        
        if (progressBarFill.parentElement) {
          progressBarFill.style.width = `${progress}%`
        }
        
        // 비디오가 끝나지 않았으면 계속 업데이트
        if (progress < 100 && !currentVideo.ended) {
          rafId = requestAnimationFrame(updateProgress)
        } else {
          // 완료
          isProgressAnimating.value = false
          rafId = null
        }
      } else {
        // duration이 아직 준비되지 않았으면 조금 더 기다림
        rafId = requestAnimationFrame(updateProgress)
      }
    }
    
    rafId = requestAnimationFrame(updateProgress)
  })
}


// 이미지 타이머 정리
const clearImageTimer = () => {
  isProgressAnimating.value = false
  
  // CSS 애니메이션 정리
  const progressBarFill = getProgressBarFill()
  if (progressBarFill) {
    const animation = progressBarFill.getAnimations?.()?.[0]
    if (animation) {
      animation.cancel()
    }
    progressBarFill.classList.remove('is-animating')
  }
  
  // requestAnimationFrame 정리
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

// 모든 비디오 일시정지
const pauseAllVideos = () => {
  if (!process.client) return
  
  videoRefs.value.forEach((video) => {
    if (video && !video.paused) {
      video.pause()
      video.currentTime = 0 // 처음으로 되돌림
    }
  })
}

// 비디오 상태 복원 (리사이징 시)
const restoreVideoState = (video) => {
  if (!process.client || !video || !previousVideoState) {
    // 상태가 없으면 일반 시작
    if (isVideoRefChanging) {
      isVideoRefChanging = false
    }
    startSlideLogic()
    return
  }
  
  // 비디오가 준비될 때까지 기다림
  if (video.readyState >= 2) {
    const { wasPlaying, currentTime, duration } = previousVideoState
    
    // duration이 유효한지 확인
    if (isNaN(duration) || duration <= 0) {
      previousVideoState = null
      isVideoRefChanging = false
      startSlideLogic()
      return
    }
    
    // 이전 시간으로 설정
    video.currentTime = currentTime
    
    if (wasPlaying) {
      // 재생 중이었으면 재생 시작
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // 재생 성공 - timeupdate 이벤트가 자동으로 프로그래스 바를 업데이트
            previousVideoState = null // 상태 사용 후 즉시 초기화
            isVideoRefChanging = false
          })
          .catch((error) => {
            // 재생 실패 시 새로 시작
            console.warn('Video resume failed:', error)
            previousVideoState = null
            isVideoRefChanging = false
            startSlideLogic()
          })
      } else {
        // 구형 브라우저 - timeupdate 이벤트가 자동으로 프로그래스 바를 업데이트
        previousVideoState = null
        isVideoRefChanging = false
      }
    } else {
      // 일시정지 상태였으면 일시정지 상태로 유지
      previousVideoState = null
      isVideoRefChanging = false
      startSlideLogic()
    }
  } else {
    // readyState < 2인 경우 loadedmetadata 이벤트에서 처리
    // 상태는 유지하고 loadedmetadata 이벤트에서 처리되도록 함
    // onVideoLoadedMetadata에서 previousVideoState를 확인하여 복원함
    // isVideoRefChanging은 유지 (loadedmetadata에서 처리할 때까지)
  }
}

// 현재 슬라이드에 맞는 로직 시작 (성공 여부 반환)
const startSlideLogic = () => {
  if (!process.client) return false
  if (!swiperInstance.value) return false
  
  const currentSlide = props.slides[currentActiveIndex.value]
  if (!currentSlide) return false
  
  if (currentSlide.type === 'video') {
    // 비디오 슬라이드
    clearImageTimer()
    isProgressAnimating.value = false
    progressPercentage.value = 0
    
    // requestAnimationFrame 정리
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
    
    const video = currentVideoRef.value
    if (video) {
      if (video.readyState >= 2) {
        // 이미 메타데이터가 로드된 경우
        const duration = video.duration
        if (isNaN(duration) || duration <= 0) {
          return false
        }
        
        currentDuration.value = duration * 1000 // 초를 밀리초로 변환
        progressPercentage.value = 0
        
        const playPromise = video.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // 재생 성공 - 프로그래스 바 애니메이션 시작
              nextTick(() => {
                startVideoProgressAnimation(video.duration)
              })
            })
            .catch((error) => {
              console.warn('Video autoplay failed:', error)
            })
        } else {
          // play()가 Promise를 반환하지 않는 경우 (구형 브라우저)
          nextTick(() => {
            startVideoProgressAnimation(video.duration)
          })
        }
        return true
      } else {
        // readyState < 2인 경우 loadedmetadata 이벤트에서 처리됨
        // 비디오가 로드되기를 기다림
        return false
      }
    } else {
      // 비디오 ref가 아직 설정되지 않음
      return false
    }
  } else {
    // 이미지 슬라이드: 3초 타이머 시작
    // 프로그래스바 완전히 정리된 후 시작
    nextTick(() => {
      // 슬라이드가 변경되지 않았는지 확인
      const currentSlide = props.slides[currentActiveIndex.value]
      if (currentSlide && currentSlide.type !== 'video') {
        startImageTimer()
      }
    })
    return true
  }
}

// 슬라이드 변경 이벤트 핸들러
const onSlideChange = (swiper) => {
  // 즉시 정리 (버튼 클릭 시에도 안전)
  clearImageTimer()
  pauseAllVideos()
  
  // 프로그래스 리셋
  progressPercentage.value = 0
  currentDuration.value = 0
  isProgressAnimating.value = false
  
  // 새 인덱스 설정
  const newIndex = swiper.realIndex !== undefined ? swiper.realIndex : swiper.activeIndex
  currentActiveIndex.value = newIndex
  
  // 프로그래스 바 즉시 초기화 (슬라이드 변경 시 시각적으로 바로 리셋)
  const progressBarFill = getProgressBarFill()
  if (progressBarFill) {
    progressBarFill.style.width = '0%'
    progressBarFill.style.setProperty('--progress-start', '0%')
    progressBarFill.style.setProperty('--progress-percentage', '0%')
    
    // 이전 애니메이션 정리
    const existingAnimation = progressBarFill.getAnimations?.()?.[0]
    if (existingAnimation) {
      existingAnimation.cancel()
    }
    progressBarFill.classList.remove('is-animating')
    
    // 강제 리플로우 (DOM 업데이트 보장)
    void progressBarFill.offsetWidth
  }
  
  // 새 슬라이드 로직 시작 (이미지 슬라이드의 경우 더 확실한 초기화)
  nextTick(() => {
    const currentSlide = props.slides[currentActiveIndex.value]
    
    // 이미지 슬라이드인 경우 약간의 추가 지연으로 DOM 준비 보장
    if (currentSlide && currentSlide.type !== 'video') {
      setTimeout(() => {
        // 슬라이드가 변경되지 않았는지 다시 확인
        if (currentActiveIndex.value === newIndex) {
          startSlideLogic()
        }
      }, 20)
    } else {
      startSlideLogic()
    }
  })
}

// Pagination 설정
const paginationConfig = computed(() => ({
  clickable: true,
  el: paginationElRef.value,
  type: 'bullets',
  renderBullet: (index, className) => {
    return `<button class="${className} custom-bullet"><span class="a11y-hidden">${index + 1}번째 슬라이드</span></button>`
  }
}))

// Navigation 설정
const navigationConfig = computed(() => ({
  prevEl: prevElRef.value,
  nextEl: nextElRef.value,
}))

// Autoplay 설정 (비활성화 - 커스텀 로직으로 대체)
const autoplayConfig = computed(() => false)

// 반응형 변화 감지
watch(() => currentActiveIndex.value, () => {
  // 슬라이드 변경 시 반응형 체크
  checkResponsive()
})

// currentVideoRef 변경 감지 (리사이징 시 비디오 ref 변경)
watch(() => currentVideoRef.value, (newVideo, oldVideo) => {
  if (!process.client) return
  
  // 비디오 ref가 변경되지 않았으면 무시
  if (newVideo === oldVideo) return
  
  // 이미 변경 중이면 무시 (중복 실행 방지)
  if (isVideoRefChanging) return
  
  // 비디오 ref가 변경되었고 (mobile/desktop 전환), 현재 비디오 슬라이드인 경우
  if (newVideo) {
    const currentSlide = props.slides[currentActiveIndex.value]
    if (currentSlide && currentSlide.type === 'video') {
      isVideoRefChanging = true
      
      // 이전 비디오 상태가 저장되어 있으면 복원 우선
      if (previousVideoState) {
        restoreVideoState(newVideo)
        return
      }
      
      // 비디오가 완전히 로드되었는지 확인
      if (newVideo.readyState >= 2) {
        const duration = newVideo.duration
        if (isNaN(duration) || duration <= 0) {
          // duration이 아직 준비되지 않았으면 loadedmetadata 이벤트를 기다림
          isVideoRefChanging = false
          return
        }
        
        // 비디오 ref 변경 시 timeupdate 이벤트가 자동으로 프로그래스 바를 업데이트
        clearImageTimer()
        nextTick(() => {
          startSlideLogic()
          isVideoRefChanging = false
        })
      } else {
        // readyState < 2인 경우 loadedmetadata 이벤트에서 처리됨
        // 비디오가 로드되기를 기다림
        isVideoRefChanging = false
      }
    } else {
      isVideoRefChanging = false
    }
  } else {
    // 비디오 ref가 null이 된 경우 (이미지 슬라이드로 전환 등)
    isVideoRefChanging = false
  }
})

// 초기 슬라이드 로직 시작 (setup에서 직접 실행)
if (process.client) {
  checkResponsive()
  
  // 초기 슬라이드 로직 시작 (여러 번 시도)
  let retryCount = 0
  const maxRetries = 10 // 최대 10번 재시도 (약 1초)
  
  const tryStartInitialLogic = () => {
    if (startSlideLogic()) {
      // 성공적으로 시작됨
    } else {
      retryCount++
      if (retryCount < maxRetries) {
        // 비디오가 아직 준비되지 않았으면 조금 더 기다림
        setTimeout(() => {
          tryStartInitialLogic()
        }, 100)
      }
    }
  }
  
  nextTick(() => {
    tryStartInitialLogic()
  })
}

// 리사이징 핸들러 (디바운싱)
const handleResize = () => {
  if (!process.client) return
  
  // 디바운싱: 리사이징이 끝난 후에만 실행
  if (resizeTimeout) {
    clearTimeout(resizeTimeout)
  }
  
  resizeTimeout = setTimeout(() => {
    // 반응형 체크
    checkResponsive()
    
    // 리사이즈 시 무조건 현재 슬라이드 로직 재시작
    const currentSlide = props.slides[currentActiveIndex.value]
    if (!currentSlide) {
      resizeTimeout = null
      return
    }
    
    // 현재 진행 중인 모든 작업 정리
    clearImageTimer()
    pauseAllVideos()
    
    // 프로그래스 리셋
    progressPercentage.value = 0
    currentDuration.value = 0
    
    // 상태 초기화 (리사이즈 시에는 항상 새로 시작)
    previousVideoState = null
    
    // 플래그 초기화
    if (isVideoRefChanging) {
      isVideoRefChanging = false
    }
    
    // 약간의 지연 후 재시작 (DOM 업데이트 보장)
    setTimeout(() => {
      startSlideLogic()
    }, 100)
    
    resizeTimeout = null
  }, 150) // 150ms 디바운스
}

// 컴포넌트 마운트
onMounted(() => {
  checkResponsive()
  prevIsMobile.value = isMobile.value
  
  if (process.client) {
    window.addEventListener('resize', handleResize)
  }
})

// 컴포넌트 언마운트 시 정리
onUnmounted(() => {
  clearImageTimer()
  pauseAllVideos()
  if (process.client) {
    window.removeEventListener('resize', handleResize)
    if (resizeTimeout) {
      clearTimeout(resizeTimeout)
      resizeTimeout = null
    }
  }
  
  // requestAnimationFrame 정리
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
  
  videoRefs.value.clear()
})
</script>

<style lang="scss" scoped>

.main-key-visual-swiper {
  position: relative;
  width: 100%;
  height: rem(250);
  overflow: hidden;

  @include tablet {
    height: rem(350);
  }

  @include desktop {
    height: rem(600);
  }

  .swiper-container {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    width: 100%;
    height: 100%;
  }

  .slide-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .slide-image {
    width: 100%;
    height: 100%;
    display: block;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: scale(1);
      transition: transform 8s ease-out;
    }

    &.is-active img {
      transform: scale(1.1);
    }
  }

  .slide-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: none;

    &.mobile {
      display: block;
    }

    @include tablet {
      &.mobile {
        display: none;
      }
      &.desktop {
        display: block;
      }
    }
  }

  .slide-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    width: 100%;

    .inner {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: rem(11);

      @include desktop {
        gap: rem(18);
      }
    }
  }

  .slide-title {
    font-size: rem(40);
    font-weight: $font-weight-regular;
    line-height: 110%;
    color: $d-white;
    margin: 0;

    @include tablet {
      font-size: rem(46);
    }

    @include desktop {
      font-size: rem(90);
    }
  }

  .slide-description {
    font-size: rem(11);
    font-weight: $font-weight-regular;
    line-height: $line-height-relaxed;
    color: $d-white;
    margin: 0;

    @include tablet {
      font-size: rem(10);
    }

    @include desktop {
      font-size: rem(22);
    }
  }

  .slide-button {
    margin-top: rem(8);

    @include tablet {
      margin-top: rem(12);
    }

    @include desktop {
      margin-top: rem(16);
    }

    :deep(button),
    :deep(a),
    :deep(.nuxt-link) {
      font-size: rem(10);

      @include tablet {
        font-size: rem(12);
      }

      @include desktop {
        font-size: rem(14);
      }
    }
  }

  .swiper-nav-buttons-wrapper {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    max-width: rem(1320); 
    height: 100%;
    z-index: 2;
    pointer-events: none;

    @include tablet {
      width: calc(100% - rem(160));
    }

    @include desktop {
      width: calc(100% - rem(160));
    }
  }

  .swiper-button-prev-custom,
  .swiper-button-next-custom {
    display: none;
    position: absolute;
    z-index: 2;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: auto;
    width: rem(30);
    
    @include tablet {
      display: block;
      width: rem(40);
    }

    @include desktop {
      width: rem(56);
    }

    :deep(.circle) {
      width: rem(30);
      height: rem(30);

      @include tablet {
        width: rem(40);
        height: rem(40);
      }

      @include desktop {
        width: rem(56);
        height: rem(56);
      }
    }

    &.swiper-button-lock {
      display: none;
    }
  }

  .swiper-button-prev-custom {
    @include tablet {
      left: rem(-40);
    }

    // 1480px ~ 1679px 구간
    @media all and (min-width: #{$pc}) and (max-width: 1679px) {
      left: rem(-56);
    }

    // 1680px 이상
    @media all and (min-width: 1680px) {
      left: calc(rem(-124) + rem(-56));
    }
  }

  .swiper-button-next-custom {
    @include tablet {
      right: rem(-40);
    }

    // 1480px ~ 1679px 구간
    @media all and (min-width: #{$pc}) and (max-width: 1679px) {
      right: rem(-56);
    }

    // 1680px 이상
    @media all and (min-width: 1680px) {
      right: calc(rem(-124) + rem(-56));
    }
  }

  .slide-pagination-wrap {
    position: absolute;
    bottom: rem(12);
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    width: 100%;
    max-width: rem(1480);
    padding: 0 rem(24);
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;

    @include tablet {
      bottom: rem(12);
      padding: 0 rem(80);
    }

    @include desktop {
      bottom: rem(60);
      padding: 0 rem(80);
    }

    &:has([class*="-lock"]) {
      display: none;
    }
  }

  .swiper-pagination-custom {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: rem(8);
    width: auto;
    padding: 0;

    :deep(.custom-bullet) {
      width: rem(20);
      height: rem(2);
      min-height: rem(2);
      margin: 0;
      padding: 0;
      background-color: rgba(255, 255, 255, 0.5);
      border: none;
      border-radius: rem(1);
      opacity: 1;
      cursor: pointer;
      transition: all 0.35s;
      display: block;
      box-sizing: border-box;
      line-height: 0;
      font-size: 0;

      @include tablet {
        width: rem(60);
      }

      & > span {
        display: none;
      }

      &.swiper-pagination-bullet-active {
        background-color: $d-white;
      }
    }
  }

  // Progress Bar
  .slide-progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: rem(5);
    background-color: rgba(255, 255, 255, 0.3);
    z-index: 3;
    overflow: hidden;

    &__fill {
      height: 100%;
      background-color: $s-teal;
      width: 0%;
      transform-origin: left;
      will-change: width;
      
      // 이미지 슬라이드: CSS 애니메이션
      &.is-animating {
        animation: progressFill linear forwards;
        animation-duration: var(--progress-duration, 3000ms);
      }
      
      // 비디오 슬라이드: CSS 애니메이션 사용 (이미지와 동일)
      // 비디오 duration에 맞춰 애니메이션 duration 설정
    }
  }
}

@keyframes progressFill {
  from {
    width: var(--progress-start, 0%);
  }
  to {
    width: 100%;
  }
}
</style>
