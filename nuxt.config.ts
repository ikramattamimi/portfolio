// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/i18n', '@tresjs/nuxt'],

  app: {
    head: {
      htmlAttrs: { lang: 'id' },
      title: 'Ikram Muhammad',
    },
  },

  // Bahasa default Indonesia tanpa prefix (/), Inggris di /en.
  i18n: {
    defaultLocale: 'id',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'id', language: 'id-ID', name: 'Bahasa Indonesia', file: 'id.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      redirectOn: 'root',
    },
  },
})
