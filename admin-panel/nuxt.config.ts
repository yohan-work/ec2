// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  // Pages 디렉토리 활성화 (Nuxt 3 안정버전)
  pages: true,

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

  // 런타임 환경 설정
  runtimeConfig: {
    // Private keys (only server-side 사용 가능)
    databaseUrl: process.env.DATABASE_URL,
    secretKey: process.env.NUXT_SECRET_KEY,

    // Public keys (클라이언트에도 노출됨)
    public: {
      cognitoUserPoolId: process.env.NUXT_PUBLIC_COGNITO_USER_POOL_ID,
      cognitoAppClientId: process.env.NUXT_PUBLIC_COGNITO_APP_CLIENT_ID,
      cognitoRegion: process.env.NUXT_PUBLIC_COGNITO_REGION,
      cognitoDomain: process.env.NUXT_PUBLIC_COGNITO_DOMAIN,
      redirectSignIn: process.env.NUXT_PUBLIC_REDIRECT_SIGN_IN,
      redirectSignOut: process.env.NUXT_PUBLIC_REDIRECT_SIGN_OUT,
    },
  },

  // SSR 설정
  ssr: true,

  // hook path
  hooks: {
    'pages:extend'(pages) {
      pages.push({
        name: 'newsletters',
        path: '/newsletters',
        file: '~/pages/cnx/newsletters/index.vue',
      })

      pages.push({
        name: 'newsletters-detail',
        path: '/newsletters/:id',
        file: '~/pages/cnx/newsletters/[id].vue',
      })
    },
  },

  // Vite 설정
  vite: {
    assetsInclude: ['**/*.svg'],
  },
})
