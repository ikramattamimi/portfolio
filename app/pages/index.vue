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

      <!-- Sementara: diganti ContactSection di Tahap 5. -->
      <section id="kontak" class="wrap placeholder">
        <p class="mono">Placeholder: kontak (Tahap 5)</p>
        <input type="text" placeholder="Kolom teks untuk tes kursor bawaan">
      </section>
    </div>
  </div>
</template>

<style scoped>
#konten {
  outline: none;
}

.placeholder {
  min-height: 50vh;
  border: 1px dashed var(--line);
  border-radius: var(--r);
  margin: 40px auto;
  display: grid;
  place-content: center;
  gap: 16px;
  text-align: center;
  color: var(--ink-3);
  font-size: 13px;
}

input {
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid var(--line);
  background: var(--paper);
  color: var(--ink);
  font: inherit;
}
</style>
