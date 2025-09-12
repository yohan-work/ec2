<template>
  <Loading :show="isIpChecking" />
  <IpAccessDenied v-if="!isIpChecking && !isIpAllowed" :client-ip="clientIp" />
  <slot v-if="!isIpChecking && isIpAllowed" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Loading from '~/components/ui/Loading.vue'
import IpAccessDenied from '~/components/dms/IpAccessDenied.vue'

// IP 접근 제어 상태
const isIpAllowed = ref(false)
const clientIp = ref('')
const isIpChecking = ref(true) // IP 체크 중인지 여부

// IP 접근 제어 체크
onMounted(async () => {
  try {
    const response = await $fetch('/api/dms/check-ip-access')
    isIpAllowed.value = response.allowed
    clientIp.value = response.clientIp
  } catch (error) {
    console.error('IP 접근 제어 확인 중 오류:', error)
    // 오류 발생 시 보안을 위해 차단
    isIpAllowed.value = false
    clientIp.value = '알 수 없음'
  } finally {
    // 체크 완료 후 로딩 상태 해제
    isIpChecking.value = false
  }
})
</script>
