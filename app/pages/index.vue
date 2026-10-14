<template>
  <div>
    <HeroSection />

    <!-- Sementara: diganti gate + konten mode (Tahap 4–5). -->
    <div class="wrap">
      <section class="placeholder">
        <p class="mono">Placeholder: gate + konten mode (Tahap 4–5)</p>
      </section>

      <section id="kontak" class="placeholder">
        <p class="mono">Placeholder: kontak (Tahap 5)</p>
        <input type="text" placeholder="Kolom teks untuk tes kursor bawaan">
      </section>
    </div>
  </div>
</template>

<style scoped>
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
