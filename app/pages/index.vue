<script setup lang="ts">
// Halaman sementara untuk mengecek fondasi desain (token, font, tema, i18n).
// Diganti hero, gate, dan konten mode di tahap berikutnya.
const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <main class="wrap">
    <div class="bar">
      <nav class="lang">
        <NuxtLink
          v-for="l in locales"
          :key="l.code"
          :to="switchLocalePath(l.code)"
          :class="{ on: l.code === locale }"
        >
          {{ l.code.toUpperCase() }}
        </NuxtLink>
      </nav>
      <UiThemeToggle />
    </div>

    <h1>
      {{ t('hero.headlineBefore') }}
      <em>{{ t('hero.headlineAccent') }}</em>.
    </h1>
    <p>{{ t('hero.subtitle') }}</p>
    <p class="mono">JetBrains Mono · 500 / 700</p>
  </main>
</template>

<style scoped>
main {
  padding-top: 40px;
  padding-bottom: 40px;
}

.bar {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 48px;
}

.lang {
  display: flex;
  background: var(--soft);
  border-radius: 10px;
  padding: 3px;
}

.lang a {
  font: 700 12px var(--mono);
  padding: 6px 10px;
  border-radius: 8px;
  color: var(--ink-3);
}

.lang a.on {
  background: var(--paper);
  color: var(--ink);
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

p {
  color: var(--ink-2);
  font-size: 17px;
  max-width: 36em;
}

.mono {
  margin-top: 24px;
  font-size: 13px;
  color: var(--ink-3);
}
</style>
