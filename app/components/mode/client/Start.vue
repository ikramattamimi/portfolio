<script setup lang="ts">
import { CONTACT, SHOW_TESTIMONIALS } from '~/data/portfolio'

defineProps<{ no: number }>()

const { t } = useI18n()
const waHref = computed(() => `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(t('contact.waGreeting'))}`)
</script>

<template>
  <section id="mulai" class="sec" aria-labelledby="mulai-title">
    <div class="wrap">
      <!-- Testimoni: aktifkan lewat SHOW_TESTIMONIALS di data/portfolio.ts setelah ada kutipan sungguhan. -->
      <div v-if="SHOW_TESTIMONIALS" class="testi">
        <figure v-for="i in 3" :key="i" class="q ph">
          <blockquote>{{ t('client.testimonials.placeholder') }}</blockquote>
          <figcaption>
            <b>{{ t('client.testimonials.clientName') }}</b>
            <span>{{ t('client.testimonials.clientRole') }}</span>
          </figcaption>
        </figure>
      </div>

      <div class="start">
        <div>
          <span class="no mono">{{ String(no).padStart(2, '0') }} — {{ t('client.start.kicker') }}</span>
          <h2 id="mulai-title">{{ t('client.start.title') }}</h2>
          <p>{{ t('client.start.lead') }}</p>
        </div>
        <div class="actions">
          <a class="btn red" :href="waHref" target="_blank" rel="noopener">{{ t('client.start.whatsapp') }}</a>
          <a class="btn" href="#kontak">{{ t('client.start.form') }}</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.start {
  display: grid;
  grid-template-columns: 1.4fr auto;
  gap: 32px;
  align-items: center;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 28px;
  padding: 44px;
}

.no {
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: var(--red);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 10px;
}

h2 {
  font-size: clamp(26px, 3.2vw, 36px);
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin-bottom: 10px;
}

p {
  color: var(--ink-2);
  max-width: 34em;
}

.actions {
  display: grid;
  gap: 10px;
}

.testi {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin-bottom: 40px;
}

.q {
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: var(--r);
  padding: 26px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.q.ph {
  background: transparent;
  border: 2px dashed var(--soft-2);
}

.q.ph blockquote {
  color: var(--ink-3);
  font-style: italic;
}

.q b {
  display: block;
}

.q span {
  font-size: 13px;
  color: var(--ink-3);
}

@media (max-width: 860px) {
  .start {
    grid-template-columns: 1fr;
    padding: 30px;
  }

  .testi {
    grid-template-columns: 1fr;
  }
}
</style>
