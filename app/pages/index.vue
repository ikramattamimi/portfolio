<script setup lang="ts">
// Beranda: satu alur cerita dari atas ke bawah (Hero → Tentang → Pengalaman → Proyek → Kontak).
useReveal()
</script>

<template>
  <div>
    <HeroSection />

    <div id="konten">
      <SectionsAbout :no="1" />
      <SectionsExperience :no="2" />
      <SectionsProjects :no="3" />
      <SharedContactSection :no="4" />
    </div>

    <!-- Di luar #konten supaya elemen fixed ini tidak ikut bergeser. ClientOnly: murni UI client. -->
    <ClientOnly>
      <NavSideFlow />
    </ClientOnly>
  </div>
</template>

<style scoped>
#konten {
  /* Scroll reveal menggeser elemen sedikit; jangan sampai muncul scroll horizontal. */
  overflow-x: clip;
}
</style>
