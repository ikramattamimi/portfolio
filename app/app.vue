<script setup lang="ts">
import { CONTACT } from '~/data/portfolio'

const { t, locale } = useI18n()

// Gambar preview saat link dibagikan (LinkedIn, WhatsApp, X). Dibuat sekali, satu per bahasa.
const siteUrl = useSiteConfig().url?.replace(/\/$/, '') ?? ''
const ogImage = computed(() => `${siteUrl}/og-${locale.value === 'en' ? 'en' : 'id'}.png`)

// Atribut lang di <html> + link hreflang/canonical mengikuti bahasa aktif
// (canonical & hreflang absolut baru lengkap setelah NUXT_PUBLIC_SITE_URL diisi).
const head = useLocaleHead()
useHead(() => ({
  htmlAttrs: { lang: head.value.htmlAttrs?.lang },
  link: head.value.link,
  meta: head.value.meta,
}))

useSeoMeta({
  title: () => t('meta.title'),
  description: () => t('meta.description'),
  ogTitle: () => t('meta.title'),
  ogDescription: () => t('meta.description'),
  ogType: 'website',
  ogSiteName: 'Ikram Muhammad',
  ogLocale: () => t('meta.ogLocale'),
  ogImage: () => ogImage.value,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: 'image/png',
  ogImageAlt: () => t('meta.title'),
  twitterCard: 'summary_large_image',
  twitterImage: () => ogImage.value,
})

// Data terstruktur schema.org untuk mesin pencari.
useHead(() => ({
  script: [
    {
      key: 'person-jsonld',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Ikram Muhammad',
        alternateName: 'Ikram Muhammad Bukhori Attamimi',
        jobTitle: t('meta.jobTitle'),
        description: t('meta.description'),
        email: `mailto:${CONTACT.email}`,
        address: { '@type': 'PostalAddress', addressLocality: 'Bandung', addressCountry: 'ID' },
        alumniOf: { '@type': 'CollegeOrUniversity', name: 'Politeknik Negeri Bandung' },
        knowsAbout: ['ASP.NET', 'Vue.js', 'Laravel', 'SQL Server', 'PostgreSQL', 'MySQL', 'Flutter'],
        sameAs: [CONTACT.linkedin, CONTACT.github],
      }),
    },
  ],
}))

// Tandai <html class="js"> sebelum halaman digambar. Lihat INIT_SCRIPT.
useHead({
  script: [{ key: 'init', innerHTML: INIT_SCRIPT, tagPosition: 'head' }],
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
