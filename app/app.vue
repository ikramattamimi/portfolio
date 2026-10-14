<script setup lang="ts">
import { CONTACT } from '~/data/portfolio'

const { t } = useI18n()

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
  twitterCard: 'summary',
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

// Tentukan mode (rekruter/klien) sebelum halaman digambar. Lihat MODE_INIT_SCRIPT.
useHead({
  script: [{ key: 'mode-init', innerHTML: MODE_INIT_SCRIPT, tagPosition: 'head' }],
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
