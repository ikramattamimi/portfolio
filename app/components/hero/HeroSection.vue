<script setup lang="ts">
// Hero netral untuk rekruter maupun klien (headline A).
// Kubus dimuat setelah browser idle supaya teks hero tampil lebih dulu.
const { t } = useI18n()

const showCubes = ref(false)
onMounted(() => {
  const load = () => (showCubes.value = true)
  if ('requestIdleCallback' in window) window.requestIdleCallback(load, { timeout: 1500 })
  else setTimeout(load, 300)
})
</script>

<template>
  <section class="hero">
    <LazyHeroCubeField v-if="showCubes" />
    <div class="wrap content">
      <span class="status">{{ t('hero.status') }}</span>
      <h1>
        {{ t('hero.headlineBefore') }} <em>{{ t('hero.headlineAccent') }}</em>.
      </h1>
      <p>{{ t('hero.subtitle') }}</p>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  min-height: calc(100svh - 68px);
  display: flex;
  align-items: center;
  padding: 64px 0;
}

.content {
  position: relative;
  z-index: 1;
  width: 100%;
  /* Teks tetap bisa dipilih; kubus di belakang tidak menangkap klik. */
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font: 700 11px var(--mono);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 999px;
  color: var(--green);
  background: var(--green-soft);
}

.status::before {
  content: '';
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
  animation: blink 1.6s infinite;
}

@keyframes blink {
  50% {
    opacity: 0.3;
  }
}

h1 {
  font-size: clamp(38px, 5.4vw, 62px);
  line-height: 1.04;
  letter-spacing: -0.04em;
  font-weight: 800;
  max-width: 14em;
  margin: 18px 0 20px;
}

h1 em {
  font-style: normal;
  color: var(--red);
}

p {
  color: var(--ink-2);
  font-size: 17px;
  max-width: 36em;
}
</style>
