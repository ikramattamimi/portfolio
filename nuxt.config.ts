// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/i18n', '@nuxtjs/color-mode', '@nuxt/fonts', '@tresjs/nuxt'],

  css: ['~/assets/css/tokens.css', '~/assets/css/base.css', '~/assets/css/mode.css'],  app: {
    head: {
      title: 'Ikram Muhammad',
    },
  },

  // Tema gelap default. Memasang <html data-theme="dark|light"> sebelum halaman digambar (tanpa kedipan).
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    dataValue: 'theme',
    classSuffix: '',
    storageKey: 'theme',
  },

  // Di-host sendiri saat build (tanpa request ke Google Fonts dari browser pengunjung).
  // `global: true` karena font dipakai lewat variabel CSS (--sans/--mono), yang tidak terdeteksi otomatis.
  fonts: {
    defaults: {
      weights: [400, 500, 600, 700, 800],
      styles: ['normal'],
      subsets: ['latin'],
    },
    families: [
      { name: 'Plus Jakarta Sans', provider: 'google', global: true },
      { name: 'JetBrains Mono', provider: 'google', weights: [500, 700], global: true },
    ],
  },

  // Bahasa default Indonesia tanpa prefix (/), Inggris di /en.
  // Teks dipecah per bagian: common (hero, layout, kontak), recruiter, client.
  i18n: {
    defaultLocale: 'id',
    strategy: 'prefix_except_default',
    locales: [
      {
        code: 'id',
        language: 'id-ID',
        name: 'Bahasa Indonesia',
        files: ['id/common.json', 'id/recruiter.json', 'id/client.json'],
      },
      {
        code: 'en',
        language: 'en-US',
        name: 'English',
        files: ['en/common.json', 'en/recruiter.json', 'en/client.json'],
      },
    ],
    // Tanpa pengalihan otomatis berdasarkan bahasa browser: di situs statis pengalihan itu baru
    // terjadi di client, sehingga teks Indonesia sempat tampil lalu berganti (hydration mismatch).
    // Bahasa dipilih lewat URL (/ atau /en) dan tombol ID/EN.
    detectBrowserLanguage: false,
  },
})
