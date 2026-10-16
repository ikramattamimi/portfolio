<script setup lang="ts">
// Hero: perkenalan singkat (nama, headline, satu paragraf, dua tombol).
// Baris-barisnya muncul bergantian saat halaman dibuka (`intro-up`, lihat base.css).
// Kubus (Three.js, ±225 KB gzip) baru dimuat setelah halaman selesai dimuat dan browser idle,
// supaya tidak berebut bandwidth dengan font dan teks hero (elemen LCP).
import { CV_URL } from '~/data/portfolio'

const { t } = useI18n()

const showCubes = ref(false)
onMounted(() => {
  const load = () => (showCubes.value = true)
  const whenIdle = () => {
    if ('requestIdleCallback' in window) window.requestIdleCallback(load, { timeout: 4000 })
    else setTimeout(load, 1000)
  }
  if (document.readyState === 'complete') whenIdle()
  else window.addEventListener('load', whenIdle, { once: true })
})
</script>

<template>
  <section class="hero">
    <LazyHeroCubeField v-if="showCubes" />
    <div class="wrap content">
      <span class="status intro-up">{{ t('hero.status') }}</span>
      <p class="hello mono intro-up" style="--i: 1">{{ t('hero.hello') }}</p>
      <h1 class="intro-up" style="--i: 2">Ikram Muhammad.</h1>
      <p class="headline intro-up" style="--i: 3">
        {{ t('hero.headlineBefore') }} <em>{{ t('hero.headlineAccent') }}</em>.
      </p>
      <p class="sub intro-up" style="--i: 4">{{ t('hero.subtitle') }}</p>
      <div class="cta intro-up" style="--i: 5">
        <a href="#proyek" class="btn red">{{ t('hero.ctaProjects') }}</a>
        <a :href="CV_URL" target="_blank" rel="noopener" class="btn">{{ t('hero.ctaCv') }}</a>
      </div>
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

.hello {
  margin: 22px 0 6px;
  font-size: 15px;
  font-weight: 700;
  color: var(--red);
}

h1 {
  font-size: clamp(42px, 7vw, 80px);
  line-height: 1.02;
  letter-spacing: -0.045em;
  font-weight: 800;
}

.headline {
  font-size: clamp(28px, 4.6vw, 54px);
  line-height: 1.08;
  letter-spacing: -0.04em;
  font-weight: 800;
  color: var(--ink-2);
  max-width: 15em;
  margin: 8px 0 22px;
}

.headline em {
  font-style: normal;
  color: var(--red);
}

.sub {
  color: var(--ink-2);
  font-size: 17px;
  max-width: 34em;
}

.cta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
}
</style>
