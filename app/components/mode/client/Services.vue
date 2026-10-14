<script setup lang="ts">
defineProps<{ no: number }>()

const { t } = useI18n()
const SERVICES = ['approval', 'internal', 'website', 'automation'] as const
</script>

<template>
  <section id="layanan" class="sec alt" aria-labelledby="layanan-title">
    <div class="wrap">
      <UiSectionHead
        :no="no"
        title-id="layanan-title"
        :kicker="t('client.services.kicker')"
        :title="t('client.services.title')"
        :lead="t('client.services.lead')"
      />

      <div class="grid">
        <article v-for="(s, i) in SERVICES" :key="s" class="card">
          <span class="num mono">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3>{{ t(`client.services.items.${s}.title`) }}</h3>
          <p>{{ t(`client.services.items.${s}.desc`) }}</p>
          <small class="mono">{{ t(`client.services.items.${s}.example`) }}</small>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.card {
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: var(--r);
  padding: 26px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.num {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: var(--red-soft);
  color: var(--red);
  display: grid;
  place-items: center;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 6px;
}

h3 {
  font-size: 20px;
  letter-spacing: -0.02em;
}

p {
  color: var(--ink-2);
  font-size: 15px;
  flex: 1;
}

small {
  font-size: 12px;
  color: var(--ink-3);
}

@media (max-width: 767.98px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
