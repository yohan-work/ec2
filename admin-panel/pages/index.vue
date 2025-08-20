<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">
        🎉 Nuxt 3 + AWS Cognito
      </h1>
      <p class="text-gray-600 mb-6">
        관리자 페이지가 정상적으로 작동하고 있습니다!
      </p>

      <div class="space-y-3">
        <NuxtLink
          to="/test"
          class="block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-center"
        >
          테스트 페이지로 이동
        </NuxtLink>

        <NuxtLink
          to="/login"
          class="block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-center"
        >
          로그인 페이지로 이동
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
// 매우 간단한 페이지로 시작
console.log('Index page loaded!')

useHead({
  title: 'Nuxt 3 + AWS Cognito 관리자 페이지',
})
</script>
