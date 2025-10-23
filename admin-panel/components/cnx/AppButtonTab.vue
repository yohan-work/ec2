<!-- 버튼 탭 컴포넌트 : (1) 버튼 갯수, (2) 좌측 혹은 우측 정렬 옵션, (3) 버튼 텍스트 -->

<template>
    <div class="app-button-tab-container" :data-component-instance="componentId">
        <div class="tab-list" role="tablist" :class="[`align-${alignment}`]">
            <div class="inner">
                <button v-for="(tab, index) in tabs" :key="index"
                    :class="['tab-button', { 'is-active': activeTab === index }]"
                    :aria-selected="activeTab === index" :aria-controls="`tab-panel-${componentId}-${index}`"
                    :id="`tab-${componentId}-${index}`" :tabindex="activeTab === index ? 0 : -1" role="tab" @click="selectTab(index)">
                    {{ tab.text }}
                </button>
            </div>
        </div>
        <div class="tab-content">
            <div class="inner">
                <div v-for="(tab, index) in tabs" :key="index" v-show="activeTab === index" :id="`tab-panel-${componentId}-${index}`"
                    :aria-labelledby="`tab-${componentId}-${index}`" role="tabpanel" class="tab-panel">
                    <slot :name="tab.slot || `tab-${index}`" :tab="tab" :index="index">
                        {{ tab.content }}
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
    tabs: {
        type: Array,
        required: true
    },
    alignment: {
        type: String,
        default: 'left',
        validator: (value) => ['left', 'center', 'right'].includes(value)
    },
    modelValue: {
        type: Number,
        default: 0
    },
    instanceId: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['update:modelValue', 'tab-change'])

// 고유 ID 생성 (SSR 호환 - ref로 한 번만 생성)
const componentId = ref(props.instanceId || `btn-tab-${Math.random().toString(36).substr(2, 9)}`)

const activeTab = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})

// 실제 포커스된 탭 인덱스를 추적
const focusedTabIndex = ref(props.modelValue)

const selectTab = (index) => {
    activeTab.value = index
    focusedTabIndex.value = index
    emit('tab-change', index, props.tabs[index])
}

// 키보드 네비게이션 (컴포넌트별 독립적)
const handleKeydown = (event) => {
    // 현재 컴포넌트의 탭 버튼인지 확인
    const tabId = event.target.id
    const indexMatch = tabId.match(new RegExp(`tab-${componentId.value}-(\\d+)`))
    
    if (!indexMatch) {
        return // 다른 컴포넌트의 탭이면 무시
    }
    
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault()
        event.stopPropagation() // 이벤트 전파 방지
        
        const currentIndex = parseInt(indexMatch[1])
        let newIndex
        
        if (event.key === 'ArrowLeft') {
            newIndex = currentIndex > 0 ? currentIndex - 1 : props.tabs.length - 1
        } else {
            newIndex = currentIndex < props.tabs.length - 1 ? currentIndex + 1 : 0
        }
        
        // 포커스 상태 업데이트
        focusedTabIndex.value = newIndex
        
        // 포커스 이동 (활성화는 하지 않음)
        const tabElement = document.getElementById(`tab-${componentId.value}-${newIndex}`)
        if (tabElement) {
            tabElement.focus()
        }
    }
}

// 포커스 이벤트 핸들러 (실제 포커스 상태 추적)
const handleFocus = (event) => {
    const tabId = event.target.id
    const indexMatch = tabId.match(new RegExp(`tab-${componentId.value}-(\\d+)`))
    if (indexMatch) {
        focusedTabIndex.value = parseInt(indexMatch[1])
    }
}

// 템플릿에서 사용할 변수들을 명시적으로 선언
const { alignment, tabs } = props

// 이벤트 리스너 등록 함수 (DOM 완전 렌더링 대기)
const setupEventListeners = () => {
    return new Promise((resolve) => {
        const trySetup = () => {
             // 현재 컴포넌트의 ID 가져오기
             const currentId = componentId.value
             
             // 모든 AppButtonTab 컨테이너를 찾아서 현재 컴포넌트의 것만 선택
             const allContainers = document.querySelectorAll('.app-button-tab-container')
            
            let targetTabList = null
            
            // 각 컨테이너를 확인하여 현재 컴포넌트의 탭 버튼이 있는지 확인
            for (let i = 0; i < allContainers.length; i++) {
                const container = allContainers[i]
                const instanceId = container.getAttribute('data-component-instance')
                
                 // data-component-instance 속성으로 먼저 확인
                 if (instanceId === currentId) {
                     targetTabList = container.querySelector('.tab-list[role="tablist"]')
                     break
                 }
                 
                 // ID로도 확인
                 const tabButtons = container.querySelectorAll(`[id^="tab-${currentId}-"]`)
                 
                 if (tabButtons.length > 0) {
                     targetTabList = container.querySelector('.tab-list[role="tablist"]')
                     break
                 }
            }
            
            // 만약 ID로 찾지 못했다면, 다른 방법으로 시도
            if (!targetTabList && allContainers.length > 0) {
                // 모든 컨테이너의 탭 버튼들을 확인하여 실제 DOM ID 찾기
                for (let i = 0; i < allContainers.length; i++) {
                    const container = allContainers[i]
                    const existingButtons = container.querySelectorAll('[role="tab"]')
                    
                    if (existingButtons.length > 0) {
                        const firstButtonId = existingButtons[0].id
                        const idMatch = firstButtonId.match(/^tab-(.+)-(\d+)$/)
                        
                        if (idMatch) {
                            const existingId = idMatch[1]
                            
                            // 이 컨테이너가 현재 컴포넌트인지 확인 (data-component-id 속성으로)
                            const containerComponentId = container.getAttribute('data-component-id')
                            const isCurrentComponent = !containerComponentId || containerComponentId === currentId
                            
                            if (isCurrentComponent) {
                                componentId.value = existingId
                                targetTabList = container.querySelector('.tab-list[role="tablist"]')
                                break
                            }
                        }
                    }
                }
                
                // 여전히 찾지 못했다면, 모든 컨테이너를 순차적으로 시도
                if (!targetTabList) {
                    for (let i = 0; i < allContainers.length; i++) {
                        const container = allContainers[i]
                        const existingButtons = container.querySelectorAll('[role="tab"]')
                        
                        if (existingButtons.length > 0) {
                            const firstButtonId = existingButtons[0].id
                            const idMatch = firstButtonId.match(/^tab-(.+)-(\d+)$/)
                            
                            if (idMatch) {
                                const existingId = idMatch[1]
                                
                                // 이 ID가 다른 컨테이너에서 사용 중인지 확인
                                const isUsedElsewhere = Array.from(allContainers).some((otherContainer, otherIndex) => {
                                    if (otherIndex === i) return false
                                    const otherButtons = otherContainer.querySelectorAll(`[id^="tab-${existingId}-"]`)
                                    return otherButtons.length > 0
                                })
                                
                                if (!isUsedElsewhere) {
                                    componentId.value = existingId
                                    targetTabList = container.querySelector('.tab-list[role="tablist"]')
                                    break
                                }
                            }
                        }
                    }
                }
            }
            
            if (targetTabList) {
                // 고유한 이벤트 핸들러 등록
                targetTabList.setAttribute('data-component-id', componentId.value)
                
                // 해당 컴포넌트의 탭 버튼들만 선택하여 개별 이벤트 등록
                const tabButtons = targetTabList.querySelectorAll(`[id^="tab-${componentId.value}-"]`)
                
                tabButtons.forEach((button, index) => {
                    button.addEventListener('keydown', handleKeydown)
                    button.addEventListener('focus', handleFocus)
                })
                resolve(true)
                return true
            }
            
            return false
        }
        
        // 즉시 시도
        if (!trySetup()) {
            // 실패 시 재시도 (최대 15번, 100ms 간격으로 늘림)
            let attempts = 0
            const maxAttempts = 15
            const interval = setInterval(() => {
                attempts++
                if (trySetup() || attempts >= maxAttempts) {
                    clearInterval(interval)
                    if (attempts >= maxAttempts) {
                        resolve(false)
                    }
                }
            }, 100)
        } else {
            resolve(true)
        }
    })
}

// Lifecycle
onMounted(async () => {
    await nextTick()
    
    // 현재 컴포넌트의 컨테이너 찾기
    const allContainers = document.querySelectorAll('.app-button-tab-container')
    let currentContainer = null
    
    // data-component-instance로 현재 컴포넌트 찾기
    for (const container of allContainers) {
        const instanceId = container.getAttribute('data-component-instance')
        
        if (instanceId === componentId.value) {
            currentContainer = container
            break
        }
    }
    
    if (currentContainer) {
        // 즉시 보이는지 확인
        const computedStyle = window.getComputedStyle(currentContainer)
        const isVisible = computedStyle.display !== 'none' && computedStyle.visibility !== 'hidden'
        
        if (isVisible) {
            // 이미 보이는 상태면 즉시 이벤트 등록
            // 실제 DOM ID로 componentId 업데이트
            const existingButtons = currentContainer.querySelectorAll('[role="tab"]')
            
            if (existingButtons.length > 0) {
                const firstButtonId = existingButtons[0].id
                const idMatch = firstButtonId.match(/^tab-(.+)-(\d+)$/)
                
                if (idMatch) {
                    const actualId = idMatch[1]
                    componentId.value = actualId
                }
            }
            
            await setupEventListeners()
        } else {
            // 보이지 않는 상태면 MutationObserver로 감지
            const observer = new MutationObserver((mutations) => {
                mutations.forEach(mutation => {
                    if (mutation.type === 'attributes') {
                        const target = mutation.target
                        const computedStyle = window.getComputedStyle(target)
                        
                        if (computedStyle.display !== 'none' && computedStyle.visibility !== 'hidden') {
                            // 실제 DOM ID로 componentId 업데이트
                            const existingButtons = currentContainer.querySelectorAll('[role="tab"]')
                            
                            if (existingButtons.length > 0) {
                                const firstButtonId = existingButtons[0].id
                                const idMatch = firstButtonId.match(/^tab-(.+)-(\d+)$/)
                                
                                if (idMatch) {
                                    const actualId = idMatch[1]
                                    componentId.value = actualId
                                }
                            }
                            
                            // 이벤트 리스너 등록
                            setupEventListeners().then(() => {
                                // 이벤트 리스너 등록 완료
                            })
                            
                            // 한 번만 실행되도록 observer 해제
                            observer.disconnect()
                        }
                    }
                })
            })
            
            // 현재 컨테이너와 그 부모 요소들을 관찰
            observer.observe(currentContainer, { 
                attributes: true, 
                attributeFilter: ['style'] 
            })
            
            // 부모 요소들도 관찰 (display: none이 부모에서 올 수 있음)
            let parent = currentContainer.parentElement
            let parentLevel = 0
            while (parent && parent !== document.body && parentLevel < 10) { // 최대 10단계까지만
                observer.observe(parent, { 
                    attributes: true, 
                    attributeFilter: ['style'] 
                })
                parent = parent.parentElement
                parentLevel++
            }
        }
    } else {
        // 폴백: 즉시 이벤트 리스너 등록 시도
        await setupEventListeners()
    }
})

onUnmounted(() => {
    // 해당 컴포넌트의 탭 리스트만 선택 (완전 독립)
    const allContainers = document.querySelectorAll('.app-button-tab-container')
    let targetTabList = null
    
    // 현재 컴포넌트의 ID 가져오기
    const currentId = componentId.value
    
    // 각 컨테이너를 확인하여 현재 컴포넌트의 탭 버튼이 있는지 확인
    for (const container of allContainers) {
        const tabButtons = container.querySelectorAll(`[id^="tab-${currentId}-"]`)
        if (tabButtons.length > 0) {
            targetTabList = container.querySelector('.tab-list[role="tablist"]')
            break
        }
    }
    
    if (targetTabList) {
        // 해당 컴포넌트의 탭 버튼들만 선택하여 개별 이벤트 제거
        const tabButtons = targetTabList.querySelectorAll(`[id^="tab-${currentId}-"]`)
        tabButtons.forEach(button => {
            button.removeEventListener('keydown', handleKeydown)
            button.removeEventListener('focus', handleFocus)
        })
    }
})
</script>
<style lang="scss" scoped>
.app-button-tab-container {
    width: 100%;
    height: auto;
    margin: rem(108) 0 0;

    @include tablet {
        margin: rem(49) 0 0;
    }

    @include desktop {
        margin: rem(63) 0 0;
    }
}

.tab-list {
    margin: 0 0 rem(36);

    @include tablet {
        margin: 0 0 rem(24);
    }

    @include desktop {
        margin: 0 0 rem(48);
    }

    .inner {
        display: flex;
        align-items: stretch;
        justify-content: center;
        gap: rem(4);
        padding: 0 rem(24);
        margin: 0 auto;

        @include tablet {
            padding: 0 rem(80);
        }

        @include desktop {
            gap: rem(12);
        }
    }


    &.align-left .inner {
        justify-content: flex-start;
    }

    &.align-center .inner {
        justify-content: center;
    }

    &.align-right .inner {
        justify-content: flex-end;
    }
}

.tab-button {
    padding: rem(12) rem(16);
    border: 1px solid $gray-1;
    border-radius: 24px;
    background: transparent;
    color: $gray-1;
    font-size: rem(10);
    font-weight: 500;
    cursor: pointer;

    @include tablet {
        font-size: rem(11);
    }

    @include desktop {
        font-size: rem(16);
    }

    &.is-active {
        background-color: $p-dark-blue;
        color: $d-white;
    }
}

.tab-content {
    .inner {
        padding: 0 rem(24);
        margin: 0 auto;

        @include tablet {
            padding: 0 rem(80);
        }
    }
}

.tab-panel {
    width: 100%;
    height: 100%;
}
</style>
