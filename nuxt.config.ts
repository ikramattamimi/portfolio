// https://nuxt.com/docs/api/configuration/nuxt-config

// URL publik situs (tanpa garis miring di akhir), mis. https://ikram.dev.
// Dipakai untuk canonical, hreflang, sitemap, dan Open Graph. Domain belum dipilih:
// isi lewat variabel lingkungan NUXT_PUBLIC_SITE_URL saat build produksi.
const siteUrl = process.env.NUXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || undefined

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@nuxt/fonts',
    '@tresjs/nuxt',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],

  css: ['~/assets/css/tokens.css', '~/assets/css/base.css', '~/assets/css/mode.css'],
  app: {
    head: {
      link: [{ rel: 'icon', href: '/favicon.ico' }],
      meta: [{ name: 'theme-color', content: '#0f0f0f' }],
    },
  },

  // Dibaca sitemap, robots, dan i18n.
  site: {
    url: siteUrl,
    name: 'Ikram Muhammad',
  },

  hooks: {
    // Jangan prefetch chunk lazy (Three.js ±225 KB gzip, GSAP): di koneksi lambat prefetch itu
    // berebut bandwidth dengan font & CSS sebelum teks hero tampil. Chunk tetap dimuat saat dibutuhkan.
    'build:manifest': (manifest) => {
      for (const chunk of Object.values(manifest)) chunk.prefetch = false
    },
  },

  // Buat salinan .gz/.br untuk setiap file statis, supaya server bisa langsung mengirim versi terkompresi.
  nitro: {
    compressPublicAssets: true,
  },

  // Sitemap butuh URL absolut, jadi baru dibuat setelah domain diisi (NUXT_PUBLIC_SITE_URL).
  // Isinya statis (tanpa sumber dinamis), jadi tidak perlu runtime di server.
  sitemap: {
    enabled: !!siteUrl,
    zeroRuntime: true,
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
      // Di-preload: dipakai teks hero (elemen LCP), jadi harus datang secepat mungkin.
      { name: 'Plus Jakarta Sans', provider: 'google', global: true, preload: true },
      { name: 'JetBrains Mono', provider: 'google', weights: [500, 700], global: true },
    ],
  },

  // Bahasa default Indonesia tanpa prefix (/), Inggris di /en.
  // Teks dipecah per bagian: common (hero, layout, kontak), recruiter, client.
  i18n: {
    baseUrl: siteUrl,
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
