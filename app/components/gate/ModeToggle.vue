<script setup lang="ts">
// Toggle mode berupa teks di topbar. Di Tahap 4 jadi target animasi Flip dari kartu gate.
const { t } = useI18n()
const { mode, setMode } = useMode()
const modes = MODES
</script>

<template>
  <div class="mode-toggle" role="group" :aria-label="t('mode.label')">
    <button
      v-for="m in modes"
      :key="m"
      type="button"
      :class="{ on: mode === m }"
      :aria-pressed="mode === m"
      @click="setMode(m)"
    >
      {{ m === 'rekruter' ? t('mode.recruiter') : t('mode.client') }}
    </button>
  </div>
</template>

<style scoped>
.mode-toggle {
  display: inline-flex;
  background: var(--soft);
  border-radius: 10px;
  padding: 3px;
}

button {
  border: none;
  background: none;
  padding: 7px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  color: var(--ink-3);
  cursor: pointer;
  transition: color 0.2s, background-color 0.2s;
}

button:hover {
  color: var(--ink);
}

button.on {
  background: var(--paper);
  color: var(--ink);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}
</style>
