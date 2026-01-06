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
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    'nuxt-auth-sanctum',
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],
  sanctum: {
    baseUrl: 'http://localhost:25102',
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
    }
  },
  css: ['./app/assets/main.css',
    './node_modules/ol/ol.css'
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ]
  }
})