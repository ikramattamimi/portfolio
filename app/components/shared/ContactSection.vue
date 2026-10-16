<script setup lang="ts">
// 04 Kontak. Formulir tidak dikirim ke server: membuka WhatsApp atau aplikasi email.
import { CONTACT } from '~/data/portfolio'

defineProps<{ no: number }>()

const { t } = useI18n()

type MessageType = 'job' | 'project' | 'question'
const type = ref<MessageType>('question')
const name = ref('')
const details = ref('')
let via: 'wa' | 'mail' = 'wa'

const links = computed(() => [
  { label: 'WhatsApp', value: CONTACT.whatsappLabel, href: `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(t('contact.waGreeting'))}` },
  { label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { label: 'LinkedIn', value: CONTACT.linkedinLabel, href: CONTACT.linkedin },
  { label: 'GitHub', value: CONTACT.githubLabel, href: CONTACT.github },
])

function submit() {
  const subject = `[${t(`contact.types.${type.value}`)}] ${name.value}`
  if (via === 'wa') {
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(`${subject}\n\n${details.value}`)}`, '_blank', 'noopener')
  } else {
    location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(details.value)}`
  }
}
</script>

<template>
  <section id="kontak" class="sec" aria-labelledby="kontak-title">
    <div class="wrap">
      <UiSectionHead
        :no="no"
        title-id="kontak-title"
        :kicker="t('contact.kicker')"
        :title="t('contact.title')"
        :lead="t('contact.lead')"
        data-reveal
      />

      <div class="contact" data-reveal style="--d: 100ms">
        <div class="links">
          <p class="freelance">{{ t('contact.freelance') }}</p>
          <a
            v-for="l in links"
            :key="l.label"
            class="link"
            :href="l.href"
            :target="l.href.startsWith('http') ? '_blank' : undefined"
            :rel="l.href.startsWith('http') ? 'noopener' : undefined"
          >
            <div><b>{{ l.label }}</b><span>{{ l.value }}</span></div>
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <form class="form" @submit.prevent="submit">
          <div class="form-body">
            <div class="fld">
              <label for="req-type" class="mono">{{ t('contact.type') }}</label>
              <select id="req-type" v-model="type">
                <option v-for="k in (['job', 'project', 'question'] as const)" :key="k" :value="k">
                  {{ t(`contact.types.${k}`) }}
                </option>
              </select>
            </div>
            <div class="fld">
              <label for="req-name" class="mono">{{ t('contact.name') }}</label>
              <input id="req-name" v-model="name" required autocomplete="name" :placeholder="t('contact.namePh')">
            </div>
            <div class="fld">
              <label for="req-details" class="mono">{{ t('contact.details') }}</label>
              <textarea id="req-details" v-model="details" required :placeholder="t('contact.detailsPh')" />
            </div>
            <div class="send">
              <button class="btn red" type="submit" @click="via = 'wa'">{{ t('contact.viaWa') }}</button>
              <button class="btn" type="submit" @click="via = 'mail'">{{ t('contact.viaMail') }}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: 36px;
}

.links {
  display: grid;
  gap: 10px;
  align-content: start;
}

.link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 16px 18px;
  transition: border-color 0.2s, transform 0.2s;
}

.link:hover {
  border-color: var(--ink);
  transform: translateX(3px);
}

.link b {
  display: block;
}

.link div span {
  font-size: 13px;
  color: var(--ink-3);
}

.form {
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 22px;
  overflow: hidden;
  box-shadow: var(--shadow);
}

.freelance {
  color: var(--ink-2);
  font-size: 15px;
  margin-bottom: 8px;
  padding-left: 14px;
  border-left: 2px solid var(--red);
}

.form-body {
  padding: 22px;
  display: grid;
  gap: 14px;
}

.fld label {
  display: block;
  font-size: 11px;
  font-weight: 700;
  color: var(--ink-3);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 6px;
}

.fld input,
.fld select,
.fld textarea {
  width: 100%;
  background: var(--bg);
  border: 1.5px solid var(--line);
  border-radius: 10px;
  padding: 12px;
  font: 15px var(--sans);
  color: var(--ink);
}

.fld input:focus,
.fld select:focus,
.fld textarea:focus {
  outline: none;
  border-color: var(--ink);
}

.fld textarea {
  min-height: 110px;
  resize: vertical;
}

.send {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

@media (max-width: 860px) {
  .contact {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 420px) {
  .send {
    grid-template-columns: 1fr;
  }
}
</style>
