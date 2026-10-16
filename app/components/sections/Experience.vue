<script setup lang="ts">
// 02 Pengalaman: satu tab per perusahaan (peran, tanggal, pencapaian, teknologi).
// Semua panel ada di HTML (SEO); yang tidak aktif disembunyikan dengan atribut `hidden`.
// Pola tab ARIA: panah kiri/kanan/atas/bawah berpindah tab, Home/End ke tab pertama/terakhir.
import { JOBS } from '~/data/portfolio'

defineProps<{ no: number }>()

const { t } = useI18n()
const list = useI18nList()

const active = ref(0)
const tabs = ref<HTMLButtonElement[]>([])

function select(i: number, focus = false) {
  active.value = (i + JOBS.length) % JOBS.length
  if (focus) tabs.value[active.value]?.focus()
}

function onKeydown(e: KeyboardEvent) {
  const moves: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }
  if (e.key in moves) select(active.value + moves[e.key]!, true)
  else if (e.key === 'Home') select(0, true)
  else if (e.key === 'End') select(JOBS.length - 1, true)
  else return
  e.preventDefault()
}
</script>

<template>
  <section id="pengalaman" class="sec alt" aria-labelledby="pengalaman-title">
    <div class="wrap">
      <UiSectionHead
        :no="no"
        title-id="pengalaman-title"
        :kicker="t('home.experience.kicker')"
        :title="t('home.experience.title')"
        data-reveal
      />

      <div class="jobs" data-reveal style="--d: 100ms">
        <div class="tablist" role="tablist" :aria-label="t('home.experience.tabs')" @keydown="onKeydown">
          <button
            v-for="(job, i) in JOBS"
            :id="`tab-${job.id}`"
            :key="job.id"
            ref="tabs"
            type="button"
            role="tab"
            class="tab"
            :aria-selected="active === i"
            :aria-controls="`panel-${job.id}`"
            :tabindex="active === i ? 0 : -1"
            @click="select(i)"
          >
            {{ t(`home.jobs.${job.id}.tab`) }}
          </button>
        </div>

        <div
          v-for="(job, i) in JOBS"
          :id="`panel-${job.id}`"
          :key="job.id"
          class="panel"
          role="tabpanel"
          :aria-labelledby="`tab-${job.id}`"
          :hidden="active !== i"
          tabindex="0"
        >
          <h3>
            {{ t(`home.jobs.${job.id}.role`) }}
            <span class="company">· {{ t(`home.jobs.${job.id}.company`) }}</span>
          </h3>
          <p class="date mono">{{ t(`home.jobs.${job.id}.date`) }}</p>
          <ul class="points">
            <li v-for="k in list(`home.jobs.${job.id}.points`)" :key="k">{{ t(k) }}</li>
          </ul>
          <div class="chips">
            <span v-for="c in job.chips" :key="c" class="chip">{{ c }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.jobs {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 40px;
  max-width: 900px;
}

.tablist {
  display: flex;
  flex-direction: column;
  align-self: start;
  border-left: 2px solid var(--line);
}

.tab {
  position: relative;
  text-align: left;
  border: none;
  background: none;
  padding: 12px 18px;
  margin-left: -2px;
  border-left: 2px solid transparent;
  font-size: 14px;
  font-weight: 700;
  color: var(--ink-3);
  cursor: pointer;
  transition: color 0.2s, background-color 0.2s, border-color 0.2s;
}

.tab:hover {
  color: var(--ink);
  background: var(--soft);
}

.tab[aria-selected='true'] {
  color: var(--red);
  border-left-color: var(--red);
  background: var(--red-soft);
}

.panel {
  outline: none;
  min-width: 0;
}

.panel:focus-visible {
  outline: 2px solid var(--red);
  outline-offset: 6px;
  border-radius: 6px;
}

h3 {
  font-size: 21px;
  line-height: 1.3;
  letter-spacing: -0.02em;
}

.company {
  color: var(--red);
}

.date {
  font-size: 13px;
  color: var(--ink-3);
  margin: 4px 0 18px;
}

.points {
  list-style: none;
  display: grid;
  gap: 12px;
  margin-bottom: 20px;
}

.points li {
  position: relative;
  padding-left: 22px;
  color: var(--ink-2);
  font-size: 16px;
}

.points li::before {
  content: '▹';
  position: absolute;
  left: 0;
  color: var(--red);
}

@media (max-width: 767.98px) {
  .jobs {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  /* Tab horizontal yang bisa digeser. */
  .tablist {
    flex-direction: row;
    overflow-x: auto;
    border-left: none;
    border-bottom: 2px solid var(--line);
    scrollbar-width: none;
  }

  .tab {
    flex-shrink: 0;
    white-space: nowrap;
    margin: 0 0 -2px;
    border-left: none;
    border-bottom: 2px solid transparent;
    text-align: center;
  }

  .tab[aria-selected='true'] {
    border-bottom-color: var(--red);
  }
}
</style>
