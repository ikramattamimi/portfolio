<script setup lang="ts">
// Demo Salary Payment: "kirim" slip gaji ke tiga karyawan contoh.
const { t } = useI18n()

type State = 'idle' | 'sending' | 'sent'
const rows = reactive<{ name: string, state: State }[]>([
  { name: 'Andi P.', state: 'idle' },
  { name: 'Budi S.', state: 'idle' },
  { name: 'Citra W.', state: 'idle' },
])
const busy = ref(false)
const doneOnce = ref(false)
const timers: ReturnType<typeof setTimeout>[] = []

function send() {
  busy.value = true
  rows.forEach((r) => (r.state = 'idle'))
  rows.forEach((r, i) => {
    timers.push(setTimeout(() => (r.state = 'sending'), 250 + i * 600))
    timers.push(setTimeout(() => {
      r.state = 'sent'
      if (i === rows.length - 1) {
        busy.value = false
        doneOnce.value = true
      }
    }, 750 + i * 600))
  })
}

onBeforeUnmount(() => timers.forEach(clearTimeout))
</script>

<template>
  <div class="salary">
    <div class="slips" aria-live="polite">
      <div v-for="r in rows" :key="r.name" class="slip">
        <span>{{ r.name }}</span>
        <em class="mono" :class="r.state">
          {{ r.state === 'idle' ? '—' : r.state === 'sending' ? t('client.results.slips.sending') : `✓ ${t('client.results.slips.sent')}` }}
        </em>
      </div>
    </div>
    <button type="button" class="btn sm" :disabled="busy" @click="send">
      {{ doneOnce ? `↻ ${t('client.results.slips.again')}` : `▶ ${t('client.results.slips.send')}` }}
    </button>
  </div>
</template>

<style scoped>
.salary {
  display: grid;
  gap: 10px;
  justify-items: start;
}

.slips {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 12px;
  overflow: hidden;
  font-size: 13px;
}

.slip {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 9px 12px;
  border-bottom: 1px solid var(--line);
  background: var(--bg);
}

.slip:last-child {
  border: none;
}

em {
  font-size: 12px;
  font-weight: 600;
  font-style: normal;
  color: var(--ink-3);
}

em.sending {
  color: var(--amber);
}

em.sent {
  color: var(--green);
}

.btn:disabled {
  opacity: 0.6;
  cursor: progress;
}
</style>
