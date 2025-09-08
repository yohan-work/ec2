<template>
  <div>
    <!-- /admin/newsletters/[id]/edit.vue에서 id가 'new'일 때를 처리 -->
    <!-- 이 파일은 리다이렉트용 -->
  </div>
</template>

<script setup>
// 인증 확인을 위한 미들웨어 적용
definePageMeta({
  middleware: 'auth',
  layout: 'admin',
})

onMounted(() => {
  navigateTo('/admin/newsletters/new/edit')
})
</script>
