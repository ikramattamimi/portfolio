<script setup lang="ts">
// 01 Tentang: beberapa paragraf, teknologi yang sering dipakai, pendidikan, dan foto (opsional).
import { PHOTO, TECH } from '~/data/portfolio'

defineProps<{ no: number }>()

const { t } = useI18n()
const list = useI18nList()
</script>

<template>
  <section id="tentang" class="sec" aria-labelledby="tentang-title">
    <div class="wrap">
      <UiSectionHead
        :no="no"
        title-id="tentang-title"
        :kicker="t('home.about.kicker')"
        :title="t('home.about.title')"
        data-reveal
      />

      <div class="about" :class="{ 'with-photo': PHOTO }">
        <div class="text" data-reveal>
          <p v-for="k in list('home.about.paragraphs')" :key="k">{{ t(k) }}</p>

          <p class="tech-label">{{ t('home.about.techLabel') }}</p>
          <ul class="tech mono">
            <li v-for="tech in TECH" :key="tech">{{ tech }}</li>
          </ul>

          <p class="edu">
            <span class="mono">{{ t('home.about.educationLabel') }}</span>
            {{ t('home.about.education') }}
          </p>
        </div>

        <div v-if="PHOTO" class="photo" data-reveal style="--d: 120ms">
          <img :src="PHOTO" alt="Ikram Muhammad" width="300" height="300" loading="lazy">
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  max-width: 720px;
}

.about.with-photo {
  max-width: none;
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 48px;
  align-items: start;
}

.text {
  display: grid;
  gap: 16px;
}

.text p {
  color: var(--ink-2);
  font-size: 17px;
}

.text .tech-label {
  margin-top: 6px;
}

.tech {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(140px, 220px));
  gap: 8px 16px;
  font-size: 14px;
}

.tech li {
  position: relative;
  padding-left: 20px;
  color: var(--ink-2);
}

.tech li::before {
  content: '▹';
  position: absolute;
  left: 0;
  color: var(--red);
}

.text .edu {
  margin-top: 10px;
  padding-top: 16px;
  border-top: 1px solid var(--line);
  font-size: 15px;
}

.edu .mono {
  display: block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-3);
  margin-bottom: 4px;
}

.photo img {
  width: 100%;
  max-width: 300px;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: var(--r);
  border: 1px solid var(--line);
}

@media (max-width: 860px) {
  .about.with-photo {
    grid-template-columns: 1fr;
  }
}
</style>
