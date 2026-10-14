<script setup lang="ts">
// Halaman sementara untuk mengecek kerangka layout (topbar, sidebar, footer, kursor).
// Diganti hero, gate, dan konten mode di tahap berikutnya.
const { t } = useI18n()
</script>

<template>
  <div class="wrap">
    <section class="hero">
      <h1>
        {{ t('hero.headlineBefore') }}
        <em>{{ t('hero.headlineAccent') }}</em>.
      </h1>
      <p>{{ t('hero.subtitle') }}</p>
    </section>

    <section class="placeholder">
      <p class="mono">Placeholder: gate + konten mode (Tahap 4–5)</p>
    </section>

    <section id="kontak" class="placeholder">
      <p class="mono">Placeholder: kontak (Tahap 5)</p>
      <input type="text" placeholder="Kolom teks untuk tes kursor bawaan">
    </section>
  </div>
</template>

<style scoped>
.hero {
  padding: 64px 0 90px;
}

h1 {
  font-size: clamp(38px, 5.4vw, 62px);
  line-height: 1.04;
  letter-spacing: -0.04em;
  font-weight: 800;
  max-width: 14em;
  margin-bottom: 20px;
}

h1 em {
  font-style: normal;
  color: var(--red);
}

.hero p {
  color: var(--ink-2);
  font-size: 17px;
  max-width: 36em;
}

.placeholder {
  min-height: 70vh;
  border: 1px dashed var(--line);
  border-radius: var(--r);
  margin-bottom: 40px;
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
