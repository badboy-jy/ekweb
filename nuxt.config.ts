// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  // 应用基础路径
  app: {
    baseURL: '/ekweb/',
    buildAssetsDir: 'static/'
  },

  // CSS
  css: ['~/assets/css/main.css'],

  // 模块
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@pinia/nuxt'
  ],

  // Tailwind CSS 配置
  tailwindcss: {
    configPath: 'tailwind.config.cjs',
    cssPath: '~/assets/css/main.css'
  },

  // PostCSS 配置
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // i18n 配置
  i18n: {
    locales: [
      { code: 'zh', iso: 'zh-CN', file: 'zh.json' },
      { code: 'en', iso: 'en-US', file: 'en.json' },
      { code: 'es', iso: 'es-ES', file: 'es.json' },
      { code: 'fr', iso: 'fr-FR', file: 'fr.json' }
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'zh',
    strategy: 'no_prefix',
    vueI18n: './i18n.config.ts'
  },

  // TypeScript
  typescript: {
    strict: true,
    typeCheck: false // 开发时禁用类型检查以提高速度，构建时会自动检查
  },

  // 运行时配置
  runtimeConfig: {
    public: {
      apiBase: 'http://114.55.246.208:8082'
    }
  },

  // 服务器配置
  devServer: {
    host: '0.0.0.0',
    port: 3001
  },

  // 兼容性
  compatibilityDate: '2024-04-03'
})

