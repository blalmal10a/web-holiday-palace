// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  // ssr: false,
  // router: {
  //   options: {
  //     hashMode: true
  //   }
  // },
  routeRules: {
    '/hotels/**': {
      ssr: false,
    }
  },
  devServer: {
    host: 'http://web.holiday-palace.test',
    port: 3000
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    'nuxt-auth-sanctum',
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],
  sanctum: {
    baseUrl: 'http://holiday-palace.test',
    mode: 'cookie',
    // logLevel: 5,
    endpoints: {
      login: '/api/login',
      logout: '/api/logout',
    },
    redirect: {
      onAuthOnly: '/auth/login',
      onLogout: '/auth/login',
      onGuestOnly: '/profile',
    },
    globalMiddleware: {
      enabled: true,
      allow404WithoutAuth: true,
      prepend: true
    },
  },
  css: ['./app/assets/main.css',
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ]
  }
})