<template>
  <div>
    <!-- 새 뉴스레터 생성 페이지는 편집 페이지와 동일한 로직을 사용 -->
    <!-- /admin/newsletters/[id]/edit.vue에서 id가 'new'일 때를 처리 -->
    <!-- 이 파일은 리다이렉트용 -->
  </div>
</template>

<script setup>
// 인증 확인을 위한 미들웨어 적용
definePageMeta({
  middleware: 'auth',
})

// /admin/newsletters/new/edit로 리다이렉트
onMounted(() => {
  navigateTo('/admin/newsletters/new/edit')
})
</script>
