<script setup lang="ts">
// Halaman sementara untuk memastikan setup (i18n) berjalan.
const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <main>
    <h1>
      {{ t('hero.headlineBefore') }}
      <span class="accent">{{ t('hero.headlineAccent') }}</span>.
    </h1>
    <p>{{ t('hero.subtitle') }}</p>
    <nav>
      <NuxtLink
        v-for="l in locales"
        :key="l.code"
        :to="switchLocalePath(l.code)"
        :aria-current="l.code === locale ? 'true' : undefined"
      >
        {{ l.code.toUpperCase() }}
      </NuxtLink>
    </nav>
  </main>
</template>

<style scoped>
.accent { color: #d93a2b; }
nav { display: flex; gap: 0.75rem; }
</style>
