<script setup lang="ts">
// Demo Smart Home: nyalakan colokan dan lihat total daya berubah.
const { t } = useI18n()

const plugs = reactive([
  { key: 'lamp', watt: 12, on: true },
  { key: 'ac', watt: 650, on: false },
  { key: 'heater', watt: 350, on: true },
])

const points = ref<number[]>(Array(40).fill(0))
const current = ref(0)

function tick() {
  const base = plugs.reduce((sum, p) => sum + (p.on ? p.watt : 0), 0)
  const v = base ? base + (Math.random() - 0.5) * base * 0.06 : 0
  current.value = Math.round(v)
  points.value = [...points.value.slice(1), v]
}

const polyline = computed(() =>
  points.value.map((p, i) => `${(i * 200) / 39},${51 - (p / 1100) * 46}`).join(' '),
)

let timer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  tick()
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  timer = setInterval(tick, reduced ? 2000 : 500)
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <div class="iot">
    <div v-for="p in plugs" :key="p.key" class="plug">
      <div>
        {{ t(`client.results.iot.${p.key}`) }}
        <small class="mono">{{ p.watt }} W</small>
      </div>
      <button
        type="button"
        role="switch"
        class="sw"
        :class="{ on: p.on }"
        :aria-checked="p.on"
        :aria-label="t(`client.results.iot.${p.key}`)"
        @click="p.on = !p.on"
      />
    </div>
    <div class="meter">
      <div>
        <span>{{ t('client.results.iot.total') }}</span>
        <b class="mono">{{ current }} W</b>
      </div>
      <svg viewBox="0 0 200 54" preserveAspectRatio="none" aria-hidden="true">
        <polyline :points="polyline" fill="none" stroke="#4ade80" stroke-width="1.8" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.iot {
  display: grid;
  gap: 8px;
}

.plug {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: 11px;
  padding: 10px 12px;
  font-size: 14px;
  font-weight: 600;
}

.plug small {
  display: block;
  font-size: 11px;
  font-weight: 500;
  color: var(--ink-3);
}

.sw {
  width: 42px;
  height: 24px;
  border-radius: 999px;
  border: none;
  background: var(--soft-2);
  position: relative;
  cursor: pointer;
  transition: background-color 0.25s;
  flex-shrink: 0;
}

.sw::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: left 0.25s;
}

.sw.on {
  background: var(--green);
}

.sw.on::after {
  left: 21px;
}

.meter {
  background: var(--inv);
  border: 1px solid var(--inv-line);
  color: #fff;
  border-radius: 12px;
  padding: 12px 14px;
}

.meter div {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 12px;
  color: #aaa8b4;
}

.meter b {
  font-size: 22px;
  color: #fff;
}

.meter svg {
  width: 100%;
  height: 54px;
  display: block;
  margin-top: 4px;
}
</style>
