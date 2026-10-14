<script setup lang="ts">
// Hasil proyek dari sudut pandang bisnis: apa yang berubah bagi pemakainya.
import { PROJECTS, galleryImages, type Project } from '~/data/portfolio'

defineProps<{ no: number }>()

const { t } = useI18n()
const list = useI18nList()
const gallery = useGallery()

const WORK = ['rfa', 'ped'] as const

function openGallery(p: Project) {
  gallery.open(t(`projects.${p.id}`), galleryImages(p))
}
</script>

<template>
  <section id="hasil" class="sec" aria-labelledby="hasil-title">
    <div class="wrap">
      <UiSectionHead
        :no="no"
        title-id="hasil-title"
        :kicker="t('client.results.kicker')"
        :title="t('client.results.title')"
        :lead="t('client.results.lead')"
      />

      <h3 class="group mono">{{ t('client.results.workLabel') }}</h3>
      <div class="work">
        <article v-for="id in WORK" :key="id" class="work-card">
          <h4>{{ t(`recruiter.cases.${id}.title`) }}</h4>
          <p>{{ t(`recruiter.cases.${id}.summary`) }}</p>
          <ul>
            <li v-for="k in list(`recruiter.cases.${id}.wins`)" :key="k">{{ t(k) }}</li>
          </ul>
        </article>
      </div>

      <h3 class="group mono">{{ t('client.results.freelanceLabel') }}</h3>
      <div class="bento">
        <article v-for="p in PROJECTS" :id="`k-${p.id}`" :key="p.id" class="tile" :class="`span${p.span}`">
          <button
            v-if="p.cover !== undefined"
            type="button"
            class="tile-shot"
            :aria-label="`${t('gallery.label', { name: t(`projects.${p.id}`) })}, ${t('client.results.screens', { n: p.gallery.files.length })}`"
            @click="openGallery(p)"
          >
            <img
              :src="`/images/${p.gallery.dir}/${p.cover}.webp`"
              :alt="t(`projects.${p.id}`)"
              loading="lazy"
              decoding="async"
            >
            <span class="more">{{ t('client.results.screens', { n: p.gallery.files.length }) }}</span>
          </button>

          <div class="tile-body">
            <div class="tile-top">
              <small class="mono">{{ t(`client.results.kinds.${p.id}`) }}</small>
              <span class="status" :class="p.demo ? 'blue' : 'green'">
                {{ p.demo ? t('client.results.tryIt') : t('client.results.delivered') }}
              </span>
            </div>
            <h4>{{ t(`projects.${p.id}`) }}</h4>
            <p>{{ t(`client.results.items.${p.id}`) }}</p>

            <ModeClientIotDemo v-if="p.demo === 'iot'" />
            <ModeClientSalaryDemo v-else-if="p.demo === 'salary'" />

            <button v-if="p.cover === undefined" type="button" class="more-link" @click="openGallery(p)">
              {{ t('client.results.seeScreens') }} →
            </button>
            <div class="chips">
              <span v-for="c in p.chips" :key="c" class="chip">{{ c }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.group {
  font-size: 12px;
  font-weight: 700;
  color: var(--ink-3);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 14px;
}

.work {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  margin-bottom: 44px;
}

.work-card {
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: var(--r);
  padding: 24px;
}

.work-card h4 {
  font-size: 19px;
  letter-spacing: -0.01em;
  margin-bottom: 6px;
}

.work-card p {
  color: var(--ink-2);
  font-size: 15px;
  margin-bottom: 14px;
}

.work-card ul {
  list-style: none;
  display: grid;
  gap: 8px;
}

.work-card li {
  display: flex;
  gap: 10px;
  font-size: 14px;
  font-weight: 500;
}

.work-card li::before {
  content: '✓';
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--green-soft);
  color: var(--green);
  display: grid;
  place-items: center;
  font-size: 11px;
  font-weight: 800;
}

.bento {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 18px;
}

.span4 { grid-column: span 4; }
.span3 { grid-column: span 3; }
.span2 { grid-column: span 2; }

.tile {
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: var(--r);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.25s;
  scroll-margin-top: 96px;
}

.tile:hover {
  box-shadow: var(--shadow);
}

.tile-shot {
  display: block;
  width: 100%;
  border: none;
  padding: 0;
  background: var(--soft);
  aspect-ratio: 16 / 9;
  overflow: hidden;
  cursor: zoom-in;
  position: relative;
}

.tile-shot img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  transition: transform 0.5s;
}

.tile-shot:hover img {
  transform: scale(1.04);
}

.tile-shot .more {
  position: absolute;
  right: 12px;
  bottom: 12px;
  background: rgba(29, 28, 36, 0.85);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 11px;
  border-radius: 999px;
}

.tile-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.tile-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.tile-top small {
  font-size: 11px;
  font-weight: 700;
  color: var(--ink-3);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.tile h4 {
  font-size: 20px;
  letter-spacing: -0.02em;
}

.tile p {
  font-size: 15px;
  color: var(--ink-2);
}

.more-link {
  align-self: flex-start;
  border: none;
  background: none;
  padding: 0;
  font-size: 13px;
  font-weight: 700;
  color: var(--red);
  cursor: pointer;
}

.more-link:hover {
  text-decoration: underline;
}

.tile .chips {
  margin-top: auto;
  padding-top: 6px;
}

@media (max-width: 940px) {
  .span4,
  .span3,
  .span2 {
    grid-column: span 6;
  }
}

@media (max-width: 767.98px) {
  .work {
    grid-template-columns: 1fr;
  }
}
</style>
