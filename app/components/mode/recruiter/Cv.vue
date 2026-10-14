<script setup lang="ts">
import { CV_STATS, CV_URL } from '~/data/portfolio'

defineProps<{ no: number }>()

const { t } = useI18n()
</script>

<template>
  <section id="cv" class="sec" aria-labelledby="cv-title">
    <div class="wrap">
      <div class="cv">
        <div>
          <span class="no mono">{{ String(no).padStart(2, '0') }} — {{ t('recruiter.cv.kicker') }}</span>
          <h2 id="cv-title">{{ t('recruiter.cv.title') }}</h2>
          <p class="lead">{{ t('recruiter.cv.lead') }}</p>

          <div class="stats">
            <div v-for="s in CV_STATS" :key="s.key">
              <b>{{ s.value }}</b>
              <span>{{ t(`recruiter.cv.stats.${s.key}`) }}</span>
            </div>
          </div>

          <dl class="facts">
            <div>
              <dt class="mono">{{ t('recruiter.cv.educationLabel') }}</dt>
              <dd>
                <b>{{ t('recruiter.cv.education.degree') }}</b>
                {{ t('recruiter.cv.education.school') }} · {{ t('recruiter.cv.education.date') }}
              </dd>
            </div>
            <div>
              <dt class="mono">{{ t('recruiter.cv.certLabel') }}</dt>
              <dd>
                <b>{{ t('recruiter.cv.cert.name') }}</b>
                {{ t('recruiter.cv.cert.detail') }}
              </dd>
            </div>
          </dl>

          <a class="btn" :href="CV_URL" target="_blank" rel="noopener">{{ t('recruiter.cv.download') }} ↓</a>
        </div>

        <div class="doc" aria-hidden="true">
          <div class="l t" /><div class="l s" />
          <div class="l" /><div class="l" style="width: 85%" /><div class="l" style="width: 70%; margin-bottom: 22px" />
          <div class="l" style="width: 50%; background: #8b8895" />
          <div class="l" /><div class="l" style="width: 90%" /><div class="l" style="width: 60%" />
          <div class="stamp mono">{{ t('recruiter.cv.verified') }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cv {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 48px;
  align-items: center;
  background: var(--inv);
  border: 1px solid var(--inv-line);
  color: #fff;
  border-radius: 28px;
  padding: 48px;
  overflow: hidden;
}

.no {
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: #ff8a80;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 10px;
}

h2 {
  font-size: clamp(28px, 3.4vw, 38px);
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin-bottom: 12px;
}

.lead {
  color: #b9b6c3;
  margin-bottom: 26px;
}

.stats {
  display: flex;
  gap: 32px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.stats b {
  display: block;
  font-size: 28px;
  font-weight: 800;
}

.stats span {
  font-size: 13px;
  color: #9a97a5;
}

.facts {
  display: grid;
  gap: 12px;
  margin-bottom: 28px;
  font-size: 14px;
  color: #b9b6c3;
}

.facts dt {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #9a97a5;
  margin-bottom: 2px;
}

.facts b {
  display: block;
  color: #fff;
  font-size: 15px;
}

.btn {
  border-color: #fff;
  color: #fff;
}

.btn:hover {
  background: #fff;
  color: #1d1c24;
}

.doc {
  background: #fffdf9;
  color: #1d1c24;
  border-radius: 14px;
  padding: 26px;
  transform: rotate(2deg);
  box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.6);
  position: relative;
  max-width: 420px;
  justify-self: center;
  width: 100%;
}

.l {
  height: 8px;
  border-radius: 4px;
  background: #efeae2;
  margin-bottom: 10px;
}

.l.t {
  height: 14px;
  width: 60%;
  background: #1d1c24;
  margin-bottom: 6px;
}

.l.s {
  width: 40%;
  margin-bottom: 20px;
}

.stamp {
  position: absolute;
  right: 20px;
  bottom: 24px;
  border: 3px solid #1e9455;
  color: #1e9455;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 7px;
  transform: rotate(-12deg);
}

@media (max-width: 860px) {
  .cv {
    grid-template-columns: 1fr;
    padding: 30px;
  }
}
</style>
