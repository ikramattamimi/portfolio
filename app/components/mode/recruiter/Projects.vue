<script setup lang="ts">
// Proyek freelance dari sudut pandang teknis: apa yang dibangun + stack.
import { PROJECTS, galleryImages } from '~/data/portfolio'

defineProps<{ no: number }>()

const { t } = useI18n()
const gallery = useGallery()
</script>

<template>
  <section id="proyek" class="sec" aria-labelledby="proyek-title">
    <div class="wrap">
      <UiSectionHead
        :no="no"
        title-id="proyek-title"
        :kicker="t('recruiter.projects.kicker')"
        :title="t('recruiter.projects.title')"
        :lead="t('recruiter.projects.lead')"
      />

      <div class="grid">
        <article v-for="p in PROJECTS" :id="`r-${p.id}`" :key="p.id" class="card">
          <div class="top">
            <h3>{{ t(`projects.${p.id}`) }}</h3>
            <small class="mono">{{ t(`recruiter.skills.where.${p.id}`) }}</small>
          </div>
          <p>{{ t(`recruiter.projects.items.${p.id}`) }}</p>
          <div class="chips">
            <span v-for="c in p.chips" :key="c" class="chip">{{ c }}</span>
          </div>
          <button
            type="button"
            class="more"
            @click="gallery.open(t(`projects.${p.id}`), galleryImages(p))"
          >
            {{ t('client.results.seeScreens') }} ({{ p.gallery.files.length }}) →
          </button>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}

.card {
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: var(--r);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  scroll-margin-top: 96px;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
}

h3 {
  font-size: 20px;
  letter-spacing: -0.02em;
}

small {
  font-size: 11px;
  font-weight: 700;
  color: var(--ink-3);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

p {
  color: var(--ink-2);
  font-size: 15px;
  flex: 1;
}

.more {
  align-self: flex-start;
  border: none;
  background: none;
  padding: 0;
  font-size: 13px;
  font-weight: 700;
  color: var(--red);
  cursor: pointer;
}

.more:hover {
  text-decoration: underline;
}

@media (max-width: 767.98px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
