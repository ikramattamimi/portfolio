<script setup lang="ts">
const colorMode = useColorMode()
const { t } = useI18n()

// Tema tersimpan baru diketahui di client. Label ditentukan setelah mount
// supaya HTML hasil generate tidak bentrok saat hydration.
const mounted = ref(false)
onMounted(() => (mounted.value = true))

const isLight = computed(() => mounted.value && colorMode.value === 'light')
const label = computed(() => (isLight.value ? t('theme.toDark') : t('theme.toLight')))

function toggle() {
  colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <button type="button" class="theme" :aria-label="label" :title="label" @click="toggle">
    <!-- Ikon dipilih lewat CSS dari data-theme, jadi benar sejak render pertama. -->
    <svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" /></svg>
    <svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
  </button>
</template>

<style scoped>
.theme {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: none;
  background: var(--soft);
  color: var(--ink-2);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: color 0.2s;
}

.theme:hover {
  color: var(--ink);
}

.theme svg {
  width: 18px;
  height: 18px;
}

.sun {
  display: none;
}

:root[data-theme='light'] .sun {
  display: block;
}

:root[data-theme='light'] .moon {
  display: none;
}
</style>
