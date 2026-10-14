<script setup lang="ts">
import { CASES, SKILLS, recruiterAnchor, type UsedIn } from '~/data/portfolio'

defineProps<{ no: number }>()

const { t } = useI18n()
const current = ref<string | null>(null)

const usedIn = computed<UsedIn[]>(() => {
  if (!current.value) return []
  for (const g of SKILLS) {
    const hit = g.items.find(([name]) => name === current.value)
    if (hit) return hit[1]
  }
  return []
})

function nameOf(id: UsedIn) {
  return id in CASES ? t(`recruiter.skills.shortNames.${id}`) : t(`projects.${id}`)
}

// Lompat ke kartu terkait lalu sorot sebentar.
function jump(id: UsedIn) {
  const el = document.getElementById(recruiterAnchor(id))
  if (!el) return
  el.classList.remove('flash')
  void el.offsetWidth
  el.classList.add('flash')
}
</script>

<template>
  <section id="keahlian" class="sec alt" aria-labelledby="keahlian-title">
    <div class="wrap">
      <UiSectionHead
        :no="no"
        title-id="keahlian-title"
        :kicker="t('recruiter.skills.kicker')"
        :title="t('recruiter.skills.title')"
        :lead="t('recruiter.skills.lead')"
      />

      <div class="skills">
        <div>
          <div v-for="g in SKILLS" :key="g.group" class="sk-group">
            <h3 class="mono">{{ g.group }}</h3>
            <button
              v-for="[name] in g.items"
              :key="name"
              type="button"
              class="sk"
              :class="{ on: current === name }"
              :aria-pressed="current === name"
              @click="current = name"
            >
              {{ name }}
            </button>
          </div>
        </div>

        <aside class="sk-panel" aria-live="polite">
          <template v-if="!current">
            <span class="status gray">{{ t('recruiter.skills.select') }}</span>
            <h3>—</h3>
            <p class="empty">{{ t('recruiter.skills.pick') }}</p>
          </template>
          <template v-else>
            <span class="status green">{{ t('recruiter.skills.usedIn') }} {{ usedIn.length || '' }}</span>
            <h3>{{ current }}</h3>
            <div v-if="usedIn.length" class="used">
              <a v-for="id in usedIn" :key="id" :href="`#${recruiterAnchor(id)}`" @click="jump(id)">
                {{ nameOf(id) }}
                <small class="mono">{{ t(`recruiter.skills.where.${id}`) }}</small>
              </a>
            </div>
            <p v-else class="empty">{{ t('recruiter.skills.none') }}</p>
          </template>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 40px;
  align-items: start;
}

.sk-group {
  margin-bottom: 22px;
}

.sk-group h3 {
  font-size: 12px;
  font-weight: 700;
  color: var(--ink-3);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.sk {
  display: inline-flex;
  align-items: center;
  border: 1.5px solid var(--line);
  background: var(--bg);
  border-radius: 10px;
  padding: 8px 13px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin: 0 6px 8px 0;
  transition: border-color 0.15s, background-color 0.15s, color 0.15s;
}

.sk:hover {
  border-color: var(--ink-3);
}

.sk.on {
  background: var(--ink);
  border-color: var(--ink);
  color: var(--bg);
}

.sk-panel {
  position: sticky;
  top: 96px;
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: var(--r);
  padding: 24px;
  min-height: 220px;
}

.sk-panel h3 {
  font-size: 20px;
  margin: 6px 0 14px;
}

.used {
  display: grid;
  gap: 8px;
}

.used a {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 11px;
  padding: 11px 14px;
  font-weight: 600;
  font-size: 14px;
  transition: border-color 0.15s;
}

.used a:hover {
  border-color: var(--ink);
}

.used small {
  font-size: 11px;
  font-weight: 500;
  color: var(--ink-3);
  white-space: nowrap;
}

.empty {
  color: var(--ink-3);
  font-size: 15px;
}

@media (max-width: 860px) {
  .skills {
    grid-template-columns: 1fr;
  }

  .sk-panel {
    position: static;
  }
}
</style>
