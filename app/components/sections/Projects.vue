<script setup lang="ts">
// 03 Proyek pilihan: tiga proyek unggulan. Visual besar di satu sisi, kartu teks menumpuk
// sedikit di atasnya, posisinya selang-seling kiri/kanan. Di layar kecil visual jadi latar redup.
import { FEATURED, type Featured } from '~/data/portfolio'

defineProps<{ no: number }>()

const { t } = useI18n()
const gallery = useGallery()

const title = (p: Featured) => t(`home.projects.items.${p.id}.title`)
</script>

<template>
  <section id="proyek" class="sec" aria-labelledby="proyek-title">
    <div class="wrap">
      <UiSectionHead
        :no="no"
        title-id="proyek-title"
        :kicker="t('home.projects.kicker')"
        :title="t('home.projects.title')"
        :lead="t('home.projects.lead')"
        data-reveal
      />

      <ul class="featured">
        <li
          v-for="(p, i) in FEATURED"
          :key="p.id"
          class="project"
          :class="{ flip: i % 2 === 1 }"
          data-reveal
        >
          <button
            v-if="p.visual === 'image' && p.images?.length"
            type="button"
            class="visual"
            :aria-label="t('home.projects.screens', { name: title(p) })"
            @click="gallery.open(title(p), p.images)"
          >
            <img :src="p.images[0]" alt="" loading="lazy">
          </button>
          <div v-else class="visual" :class="p.visual">
            <DiagramApproval v-if="p.visual === 'approval'" />
            <DiagramArchitecture v-else-if="p.visual === 'architecture'" />
            <span v-else class="soon mono">{{ t('home.projects.soon') }}</span>
          </div>

          <div class="content">
            <div class="top">
              <span class="overline mono">{{ t('home.projects.featured') }}</span>
              <span v-if="p.status === 'dev'" class="status amber">{{ t('home.projects.dev') }}</span>
            </div>
            <h3>{{ title(p) }}</h3>
            <div class="desc">
              <p>{{ t(`home.projects.items.${p.id}.desc`) }}</p>
            </div>
            <ul v-if="p.chips.length" class="tech mono">
              <li v-for="c in p.chips" :key="c">{{ c }}</li>
            </ul>
            <div v-if="p.links?.repo || p.links?.demo" class="links">
              <a
                v-if="p.links.repo"
                :href="p.links.repo"
                target="_blank"
                rel="noopener"
                :aria-label="t('home.projects.repo', { name: title(p) })"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
              </a>
              <a
                v-if="p.links.demo"
                :href="p.links.demo"
                target="_blank"
                rel="noopener"
                :aria-label="t('home.projects.demo', { name: title(p) })"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" /></svg>
              </a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.featured {
  list-style: none;
  display: grid;
  gap: 96px;
}

.project {
  position: relative;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;
}

/* ---------- visual ---------- */
.visual {
  grid-column: 1 / 8;
  grid-row: 1;
  aspect-ratio: 16 / 10;
  border-radius: var(--r);
  border: 1px solid var(--line);
  background:
    radial-gradient(circle at 20% 15%, var(--red-soft), transparent 55%),
    var(--soft);
  display: grid;
  place-items: center;
  padding: 32px;
  overflow: hidden;
}

button.visual {
  padding: 0;
  cursor: pointer;
}

.visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  transition: transform 0.4s;
}

button.visual:hover img {
  transform: scale(1.03);
}

.soon {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-3);
  padding: 10px 16px;
  border: 1.5px dashed var(--line);
  border-radius: 10px;
}

/* ---------- teks ---------- */
.content {
  grid-column: 7 / 13;
  grid-row: 1;
  position: relative;
  z-index: 1;
  text-align: right;
}

.top {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;
}

.overline {
  font-size: 12px;
  font-weight: 700;
  color: var(--red);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

h3 {
  font-size: clamp(22px, 2.6vw, 28px);
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin: 8px 0 18px;
}

.desc {
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 14px;
  box-shadow: var(--shadow);
  padding: 22px 24px;
  color: var(--ink-2);
  font-size: 15px;
  text-align: left;
}

.tech {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 6px 18px;
  margin-top: 18px;
  font-size: 13px;
  color: var(--ink-3);
}

.links {
  display: flex;
  justify-content: flex-end;
  gap: 14px;
  margin-top: 14px;
}

.links a {
  color: var(--ink-2);
  transition: color 0.2s;
}

.links a:hover {
  color: var(--red);
}

.links svg {
  width: 20px;
  height: 20px;
}

/* ---------- selang-seling ---------- */
.flip .visual {
  grid-column: 6 / 13;
}

.flip .content {
  grid-column: 1 / 7;
  text-align: left;
}

.flip .top,
.flip .tech,
.flip .links {
  justify-content: flex-start;
}

/* ---------- layar kecil: visual jadi latar redup ---------- */
@media (max-width: 860px) {
  .featured {
    gap: 32px;
  }

  .project {
    border-radius: var(--r);
    overflow: hidden;
    border: 1px solid var(--line);
  }

  .visual,
  .flip .visual {
    position: absolute;
    inset: 0;
    grid-column: 1 / -1;
    aspect-ratio: auto;
    border: none;
    border-radius: 0;
    opacity: 0.18;
    pointer-events: none;
  }

  .content,
  .flip .content {
    grid-column: 1 / -1;
    text-align: left;
    padding: 32px 24px;
  }

  .top,
  .tech,
  .links,
  .flip .top,
  .flip .tech,
  .flip .links {
    justify-content: flex-start;
  }

  .desc {
    background: none;
    border: none;
    box-shadow: none;
    padding: 0;
    color: var(--ink);
  }
}
</style>
