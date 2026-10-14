<script setup lang="ts">
// `gate: true`: halaman ini punya gate pilihan mode (footer & link Hubungi ikut terkunci).
definePageMeta({ gate: true })
</script>

<template>
  <div>
    <HeroSection />
    <GateModeGate />

    <!-- Kedua mode selalu dirender; yang tidak aktif disembunyikan lewat CSS (mode.css). -->
    <div id="konten" class="after-gate" tabindex="-1">
      <ModeRecruiterView />
      <ModeClientView />
      <SharedContactSection :no="5" />
    </div>

    <!-- Di luar #konten: animasi di #konten tidak boleh ikut menggeser elemen fixed ini. -->
    <NavSideFlow class="after-gate" />
  </div>
</template>

<style scoped>
#konten {
  outline: none;
  /* Animasi ganti mode menggeser section ke samping; jangan sampai muncul scroll horizontal. */
  overflow-x: clip;
}
</style>
