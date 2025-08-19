// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // CSS 및 UI 관련 모듈
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@vueuse/nuxt'],

  // TailwindCSS 설정
  tailwindcss: {
    exposeConfig: true,
    viewer: false,
  },

  // 다크 모드 설정
  colorMode: {
    classSuffix: '',
  },

  // TypeScript 설정
  typescript: {
    typeCheck: true,
  },
})
