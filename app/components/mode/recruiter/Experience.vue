<script setup lang="ts">
import { CASES, JOBS, type CaseId } from '~/data/portfolio'

defineProps<{ no: number }>()

const { t, te } = useI18n()
const list = useI18nList()

// Tab Masalah/Solusi per kasus.
const tab = reactive<Record<string, 'problems' | 'solutions'>>({})
const tabOf = (id: CaseId) => tab[id] ?? 'problems'
</script>

<template>
  <section id="pengalaman" class="sec alt" aria-labelledby="pengalaman-title">
    <div class="wrap">
      <UiSectionHead
        :no="no"
        title-id="pengalaman-title"
        :kicker="t('recruiter.experience.kicker')"
        :title="t('recruiter.experience.title')"
        :lead="t('recruiter.experience.lead')"
      />

      <div v-for="job in JOBS" :key="job.id" class="job">
        <aside class="job-side">
          <span class="date mono">{{ t(`recruiter.jobs.${job.id}.date`) }}</span>
          <h3>{{ t(`recruiter.jobs.${job.id}.company`) }}</h3>
          <div class="role">{{ t(`recruiter.jobs.${job.id}.role`) }}</div>
          <span class="status" :class="job.active ? 'green live' : 'gray'">
            {{ job.active ? t('recruiter.experience.active') : t('recruiter.experience.done') }}
          </span>
        </aside>

        <div class="job-main">
          <p v-if="te(`recruiter.jobs.${job.id}.summary`)">{{ t(`recruiter.jobs.${job.id}.summary`) }}</p>

          <article v-for="id in job.cases" :id="`kasus-${id}`" :key="id" class="case">
            <div class="case-top">
              <h4>
                {{ t(`recruiter.cases.${id}.title`) }}
                <small>{{ t(`recruiter.cases.${id}.meta`) }}</small>
              </h4>
              <span v-if="CASES[id].diagram" class="status gray">{{ t('recruiter.experience.done') }}</span>
            </div>
            <p>{{ t(`recruiter.cases.${id}.summary`) }}</p>

            <div v-if="CASES[id].promo" class="promo">
              <span>{{ t('recruiter.experience.role') }}</span>
              <s>{{ t(`recruiter.cases.${id}.promoFrom`) }}</s> → <b>{{ t(`recruiter.cases.${id}.promoTo`) }}</b>
            </div>

            <ul class="wins">
              <li v-for="k in list(`recruiter.cases.${id}.wins`)" :key="k">{{ t(k) }}</li>
            </ul>

            <details v-if="CASES[id].diagram" class="tech">
              <summary>{{ t('recruiter.experience.technical') }}</summary>
              <div class="tech-body">
                <div>
                  <div class="tabs" role="tablist">
                    <button
                      v-for="p in (['problems', 'solutions'] as const)"
                      :key="p"
                      type="button"
                      role="tab"
                      :aria-selected="tabOf(id) === p"
                      :class="{ on: tabOf(id) === p }"
                      @click="tab[id] = p"
                    >
                      {{ p === 'problems' ? t('recruiter.experience.problem') : t('recruiter.experience.solution') }}
                    </button>
                  </div>
                  <ul class="pane" role="tabpanel">
                    <li v-for="k in list(`recruiter.cases.${id}.${tabOf(id)}`)" :key="k">{{ t(k) }}</li>
                  </ul>
                </div>

                <div v-if="CASES[id].diagram === 'approval'" class="diagram">
                  <span class="lbl mono">{{ t('recruiter.diagram.approvalLabel') }}</span>
                  <div class="flow">
                    <span class="node">{{ t('recruiter.diagram.requester') }}</span><span class="arr">→</span>
                    <span class="node">Approver 1</span><span class="arr">→</span>
                    <span class="node">Approver 2</span><span class="arr">→</span>
                    <span class="node ok">{{ t('recruiter.diagram.approved') }}</span>
                  </div>
                  <div class="flow">
                    <span class="arr">↳</span>
                    <span class="node red">{{ t('recruiter.diagram.delegate') }}</span>
                    <span class="note">{{ t('recruiter.diagram.whenAway') }}</span>
                  </div>
                  <div class="flow">
                    <span class="node dash">S3</span>
                    <span class="node dash">Office Live</span>
                    <span class="node dash">{{ t('recruiter.diagram.reminder') }}</span>
                  </div>
                </div>

                <div v-else class="diagram">
                  <span class="lbl mono">{{ t('recruiter.diagram.architectureLabel') }}</span>
                  <div class="lrow">
                    <div class="layer a">WebApp <span>Vue 3</span></div>
                    <div class="layer a">WebAPI <span>REST</span></div>
                  </div>
                  <div class="layer b">UseCase <span>{{ t('recruiter.diagram.businessRules') }}</span></div>
                  <div class="layer c">Entity <span>domain</span></div>
                  <div class="layer d">Infrastructure <span>SQL Server · S3</span></div>
                </div>
              </div>
            </details>

            <div class="chips case-chips">
              <span v-for="c in CASES[id].chips" :key="c" class="chip">{{ c }}</span>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.job {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 36px;
  padding: 36px 0;
  border-top: 1px solid var(--line);
}

.job:first-of-type {
  border-top: none;
  padding-top: 0;
}

.job-side {
  position: sticky;
  top: 96px;
  align-self: start;
}

.date {
  font-size: 12px;
  font-weight: 700;
  color: var(--ink-3);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.job-side h3 {
  font-size: 21px;
  letter-spacing: -0.02em;
  line-height: 1.25;
  margin: 6px 0 4px;
}

.role {
  color: var(--ink-2);
  font-size: 15px;
  margin-bottom: 12px;
}

.job-main {
  display: grid;
  gap: 16px;
  min-width: 0;
}

.job-main > p {
  color: var(--ink-2);
  font-size: 16px;
}

.case {
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: var(--r);
  padding: 24px;
  scroll-margin-top: 96px;
}

.case-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 6px;
  flex-wrap: wrap;
}

.case h4 {
  font-size: 19px;
  letter-spacing: -0.01em;
}

.case h4 small {
  display: block;
  font: 500 12px var(--mono);
  color: var(--ink-3);
  margin-top: 2px;
}

.case > p {
  color: var(--ink-2);
  font-size: 15px;
  margin-bottom: 16px;
}

.promo {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 13px;
  font-weight: 600;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 8px 12px;
  margin-bottom: 16px;
}

.promo s {
  color: var(--ink-3);
  font-weight: 500;
}

.promo b {
  color: var(--green);
}

.wins {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.wins li {
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 14px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  gap: 10px;
}

.wins li::before {
  content: '✓';
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--green-soft);
  color: var(--green);
  display: grid;
  place-items: center;
  font-size: 12px;
  font-weight: 800;
}

.tech {
  margin-top: 16px;
  border-top: 1.5px dashed var(--line);
  padding-top: 14px;
}

.tech summary {
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  color: var(--ink-2);
  list-style: none;
  display: flex;
  align-items: center;
  gap: 8px;
}

.tech summary::-webkit-details-marker {
  display: none;
}

.tech summary::before {
  content: '+';
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background: var(--soft);
  display: grid;
  place-items: center;
  font-family: var(--mono);
}

.tech[open] summary::before {
  content: '–';
}

.tech summary:hover {
  color: var(--ink);
}

.tech-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
  margin-top: 18px;
}

.tabs {
  display: inline-flex;
  background: var(--soft);
  padding: 3px;
  border-radius: 9px;
  margin-bottom: 12px;
}

.tabs button {
  border: none;
  background: none;
  font-size: 13px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 7px;
  cursor: pointer;
  color: var(--ink-3);
}

.tabs button.on {
  background: var(--paper);
  color: var(--ink);
}

.pane {
  list-style: none;
  display: grid;
  gap: 8px;
}

.pane li {
  font-size: 14px;
  color: var(--ink-2);
  padding-left: 18px;
  position: relative;
}

.pane li::before {
  content: '→';
  position: absolute;
  left: 0;
  top: 2px;
  color: var(--red);
  font-family: var(--mono);
  font-size: 12px;
}

.diagram {
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 16px;
  display: grid;
  gap: 10px;
  align-content: center;
}

.lbl {
  font-size: 11px;
  font-weight: 700;
  color: var(--ink-3);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.flow {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.node {
  font-size: 12px;
  font-weight: 600;
  padding: 7px 10px;
  border-radius: 8px;
  border: 1.5px solid var(--line);
  background: var(--bg);
}

.node.ok {
  border-color: var(--green);
  color: var(--green);
  background: var(--green-soft);
}

.node.red {
  border-color: var(--red);
  color: var(--red);
  background: var(--red-soft);
}

.node.dash {
  border-style: dashed;
  color: var(--ink-2);
}

.arr,
.note {
  color: var(--ink-3);
  font-size: 12px;
}

.layer {
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
}

.layer span {
  font-weight: 500;
  opacity: 0.75;
}

.layer.a { background: var(--blue-soft); color: var(--blue); }
.layer.b { background: var(--amber-soft); color: var(--amber); margin: 0 12px; }
.layer.c { background: var(--green-soft); color: var(--green); margin: 0 24px; }
.layer.d { border: 1.5px dashed var(--line); color: var(--ink-2); }

.lrow {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}

.case-chips {
  margin-top: 16px;
}

@media (max-width: 860px) {
  .job {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .job-side {
    position: static;
  }

  .tech-body {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 700px) {
  .wins {
    grid-template-columns: 1fr;
  }
}
</style>
