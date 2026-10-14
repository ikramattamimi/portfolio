<script setup lang="ts">
defineProps<{ no: number }>()

const { t } = useI18n()

const STEPS = [
  { key: 'consult', mark: '1', tone: 'gray' },
  { key: 'design', mark: '2', tone: 'amber' },
  { key: 'build', mark: '3', tone: 'blue' },
  { key: 'launch', mark: '✓', tone: 'green' },
] as const

// Langkah menyala satu per satu saat section terlihat.
const root = ref<HTMLElement | null>(null)
const lit = ref(0)
onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const io = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting) return
    io.disconnect()
    STEPS.forEach((_, i) => setTimeout(() => (lit.value = i + 1), reduced ? 0 : 300 + i * 400))
  }, { threshold: 0.35 })
  if (root.value) io.observe(root.value)
  onBeforeUnmount(() => io.disconnect())
})
</script>

<template>
  <section id="alur" class="sec alt" aria-labelledby="alur-title">
    <div class="wrap">
      <UiSectionHead
        :no="no"
        title-id="alur-title"
        :kicker="t('client.process.kicker')"
        :title="t('client.process.title')"
        :lead="t('client.process.lead')"
      />

      <ol ref="root" class="proc">
        <li v-for="(s, i) in STEPS" :key="s.key" class="step" :class="{ lit: lit > i, last: i === STEPS.length - 1 }">
          <div class="n">
            <i class="mono">{{ s.mark }}</i>
            <span class="status" :class="s.tone">{{ t(`client.process.steps.${s.key}.badge`) }}</span>
          </div>
          <h3>{{ t(`client.process.steps.${s.key}.title`) }}</h3>
          <p>{{ t(`client.process.steps.${s.key}.desc`) }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.proc {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.step {
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: var(--r);
  padding: 24px;
}

.n {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 18px;
}

.n i {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: var(--soft);
  display: grid;
  place-items: center;
  font-size: 15px;
  font-weight: 700;
  font-style: normal;
  transition: background-color 0.4s, color 0.4s;
}

.step.lit .n i {
  background: var(--red-strong);
  color: #fff;
}

.step.last.lit .n i {
  background: var(--green);
  /* Hijau tema gelap terlalu terang untuk teks putih. */
  color: var(--bg);
}

h3 {
  font-size: 18px;
  margin-bottom: 6px;
}

p {
  font-size: 14px;
  color: var(--ink-2);
}

@media (max-width: 860px) {
  .proc {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .proc {
    grid-template-columns: 1fr;
  }
}
</style>
