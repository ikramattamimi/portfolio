<script setup lang="ts">
// Atribut lang di <html> + link hreflang mengikuti bahasa aktif.
const head = useLocaleHead()
useHead(() => ({
  htmlAttrs: { lang: head.value.htmlAttrs?.lang },
  link: head.value.link,
  meta: head.value.meta,
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
