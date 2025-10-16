// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  nitro: {
    publicAssets: [
      {
        dir: 'public',
        baseURL: '/',
        maxAge: 60 * 60 * 24 * 365, // 1년 캐시
      },
    ],
    compressPublicAssets: true, // 정적 파일 압축
  },

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
    typeCheck: false,
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
      useDummy: process.env.NUXT_PUBLIC_USE_DUMMY === 'true',
    },
  },

  // 전역 CSS (FOUC 방지를 위해 CNX 스타일 우선 로드)
  css: ['~/layouts/scss/cnx.scss'],

  // Features 설정 (FOUC 방지)
  features: {
    inlineStyles: true, // SSR 시 CSS를 HTML에 인라인으로 포함
  },

  // SSR 설정
  ssr: true,

  // hook path
  hooks: {
    'pages:extend'(pages) {
      const fs = require('fs')
      const path = require('path')

      const cnxPagesDir = path.join(__dirname, 'pages/cnx')

      function scanDirectory(dir: string, basePath: string = '') {
        if (!fs.existsSync(dir)) return

        const items = fs.readdirSync(dir, { withFileTypes: true })

        items.forEach((item: any) => {
          if (item.isDirectory()) {
            scanDirectory(path.join(dir, item.name), `${basePath}/${item.name}`)
          } else if (item.name.endsWith('.vue')) {
            const fileName = item.name.replace('.vue', '')

            let routePath = basePath
            if (fileName !== 'index') {
              routePath += `/${fileName}`
            }
            if (!routePath) routePath = '/'

            routePath = routePath.replace(/\[([^\]]+)\]/g, ':$1')

            const routeName = `cnx${basePath.replace(/\//g, '-')}-${fileName}`
              .replace(/^cnx-/, 'cnx-')
              .replace(/^cnx$/, 'cnx-index')

            pages.push({
              name: routeName,
              path: routePath,
              file: `~/pages/cnx${basePath}/${item.name}`,
            })
          }
        })
      }

      scanDirectory(cnxPagesDir)
    },
  },

  // Vite 설정
  vite: {
    assetsInclude: ['**/*.svg'],
    build: {
      cssCodeSplit: false, // CSS 코드 분할 비활성화 (FOUC 방지)
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: (content: string, filename: string) => {
            // CNX 컴포넌트만 SCSS 변수 주입
            if (filename.includes('/cnx/')) {
              return `
                @use "~/layouts/scss/cnx/_variables" as *;
                @use "~/layouts/scss/cnx/_mixins" as *;
                @use "~/layouts/scss/cnx/_functions" as *;
                @use "~/layouts/scss/cnx/_base" as *;
                ${content}
              `
            }
            return content
          },
        },
      },
    },
  },
})
