<template>
  <Loading :show="isChecking" />
  <IpAccessDenied v-if="!isChecking && !isIpAllowed" :client-ip="clientIp" />
  <slot v-if="!isChecking && isIpAllowed && isSessionValid" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Loading from '~/components/ui/Loading.vue'
import IpAccessDenied from '~/components/dms/IpAccessDenied.vue'

// 접근 제어 상태
const isIpAllowed = ref(false)
const clientIp = ref('')
const isSessionValid = ref(false)
const isChecking = ref(true) // 전체 체크 중인지 여부

// IP 접근 제어 및 세션 체크
onMounted(async () => {
  const route = useRoute()
  
  try {
    // 1. IP 접근 제어 체크
    const ipResponse = await $fetch('/api/dms/check-ip-access')
    isIpAllowed.value = ipResponse.allowed
    clientIp.value = ipResponse.clientIp
    
    // IP가 허용되지 않으면 세션 체크 생략
    if (!ipResponse.allowed) {
      return
    }
    
    // 2. 로그인 페이지가 아닌 경우에만 세션 체크
    if (route.path !== '/dms/login') {
      try {
        const sessionResponse = await $fetch('/api/dms/session')
        isSessionValid.value = sessionResponse.success
        
        // 세션이 유효하지 않으면 로그인 페이지로 리다이렉트
        if (!sessionResponse.success) {
          await navigateTo('/dms/login')
          return
        }
      } catch (sessionError) {
        console.error('세션 확인 중 오류:', sessionError)
        // 세션 확인 실패 시 로그인 페이지로 리다이렉트
        await navigateTo('/dms/login')
        return
      }
    } else {
      // 로그인 페이지인 경우 세션 체크 생략
      isSessionValid.value = true
    }
    
  } catch (error) {
    console.error('IP 접근 제어 확인 중 오류:', error)
    // 오류 발생 시 보안을 위해 차단
    isIpAllowed.value = false
    clientIp.value = '알 수 없음'
  } finally {
    // 체크 완료 후 로딩 상태 해제
    isChecking.value = false
  }
})
</script>
