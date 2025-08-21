<template>
  <div>
    <!-- 새 채용공고 생성 페이지는 편집 페이지와 동일한 로직을 사용 -->
    <!-- /admin/recruits/[id]/edit.vue에서 id가 'new'일 때를 처리 -->
    <!-- 이 파일은 리다이렉트용 -->
  </div>
</template>

<script setup>
// 인증 확인을 위한 미들웨어 적용
definePageMeta({
  middleware: 'auth',
})

// /admin/recruits/new/edit로 리다이렉트
onMounted(() => {
  navigateTo('/admin/recruits/new/edit')
})
</script>
