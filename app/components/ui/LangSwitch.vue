<script setup lang="ts">
const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <nav class="lang" :aria-label="t('nav.language')">
    <NuxtLink
      v-for="l in locales"
      :key="l.code"
      :to="switchLocalePath(l.code)"
      :class="{ on: l.code === locale }"
      :aria-current="l.code === locale ? 'true' : undefined"
      :lang="l.language"
      :title="l.name"
    >
      {{ l.code.toUpperCase() }}
    </NuxtLink>
  </nav>
</template>

<style scoped>
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
  transition: color 0.2s;
}

.lang a:hover {
  color: var(--ink);
}

.lang a.on {
  background: var(--paper);
  color: var(--ink);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}
</style>
