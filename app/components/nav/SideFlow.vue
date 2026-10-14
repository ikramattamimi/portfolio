<script setup lang="ts">
// Navigasi flow: stepper vertikal di kanan (desktop lebar) atau garis progres tipis di bawah topbar
// (layar lebih kecil). Gayanya meniru langkah persetujuan: lewat = ✓ hijau, aktif = cincin amber.
import { FLOW } from '~/data/portfolio'

const { t } = useI18n()
const { mode } = useMode()

const steps = computed(() => (mode.value ? FLOW[mode.value] : []))
const ids = computed(() => steps.value.map((s) => s.id))
const { active, progress, inContent } = useActiveSection(ids)

const activeIndex = computed(() => steps.value.findIndex((s) => s.id === active.value))

function go(id: string) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
}
</script>

<template>
  <div v-if="steps.length" class="side-flow" :class="{ shown: inContent }">
    <!-- Desktop lebar: stepper. -->
    <nav class="stepper" :aria-label="t('nav.sections')">
      <ol>
        <li
          v-for="(s, i) in steps"
          :key="s.id"
          :class="{ done: i < activeIndex, now: i === activeIndex }"
        >
          <a
            :href="`#${s.id}`"
            :aria-current="i === activeIndex ? 'location' : undefined"
            :tabindex="inContent ? undefined : -1"
            @click.prevent="go(s.id)"
          >
            <span class="label">{{ t(s.label) }}</span>
            <span class="node mono" aria-hidden="true">{{ i < activeIndex ? '✓' : i + 1 }}</span>
          </a>
        </li>
      </ol>
    </nav>

    <!-- Layar kecil: garis progres tipis. -->
    <div
      class="progress"
      role="progressbar"
      :aria-label="t('nav.progress')"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-valuenow="Math.round(progress * 100)"
    >
      <span class="fill" :style="{ transform: `scaleX(${progress})` }" />
    </div>
  </div>
</template>

<style scoped>
.side-flow {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
}

.side-flow.shown {
  opacity: 1;
  visibility: visible;
}

/* ---------- stepper (≥ 1280px) ---------- */
.stepper {
  position: fixed;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 30;
}

ol {
  list-style: none;
  display: grid;
  gap: 18px;
}

li {
  position: relative;
}

/* Garis penghubung antar langkah. */
li:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 12px;
  top: 28px;
  width: 2px;
  height: 16px;
  background: var(--line);
  transition: background-color 0.3s;
}

li.done:not(:last-child)::after {
  background: var(--green);
}

/* Area klik hanya sebesar bulatan; label diposisikan absolut di kirinya
   supaya tidak menutupi (dan tidak bisa terklik di atas) konten saat tersembunyi. */
a {
  position: relative;
  display: block;
}

.node {
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  border-radius: 50%;
  border: 2px solid var(--line);
  background: var(--paper);
  color: var(--ink-3);
  display: grid;
  place-items: center;
  font-size: 11px;
  font-weight: 700;
  transition: background-color 0.3s, border-color 0.3s, color 0.3s, box-shadow 0.3s;
}

li.done .node {
  background: var(--green);
  border-color: var(--green);
  color: var(--bg);
}

li.now .node {
  border-color: var(--amber);
  color: var(--ink);
  box-shadow: 0 0 0 4px var(--amber-soft);
}

/* Label hanya muncul saat stepper disentuh/difokus, supaya tidak menutupi konten. */
.label {
  position: absolute;
  right: calc(100% + 10px);
  top: 50%;
  margin-top: -13px;
  height: 26px;
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
  color: var(--ink-2);
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 0 9px;
  box-shadow: var(--shadow);
  opacity: 0;
  transform: translateX(6px);
  transition: opacity 0.2s, transform 0.2s;
  pointer-events: none;
}

li.now .label {
  color: var(--ink);
}

.stepper:hover .label,
.stepper:focus-within .label {
  opacity: 1;
  transform: none;
}

a:hover .node {
  border-color: var(--ink-3);
}

li.done a:hover .node {
  border-color: var(--green);
}

/* ---------- garis progres (< 1280px) ---------- */
.progress {
  display: none;
  position: fixed;
  left: 0;
  right: 0;
  top: 68px;
  height: 3px;
  z-index: 39;
  background: transparent;
}

.fill {
  display: block;
  height: 100%;
  background: var(--red);
  transform-origin: left;
}

@media (max-width: 1279.98px) {
  .stepper {
    display: none;
  }

  .progress {
    display: block;
  }
}

@media (prefers-reduced-motion: reduce) {
  .side-flow,
  .node,
  .label {
    transition: none;
  }
}
</style>
