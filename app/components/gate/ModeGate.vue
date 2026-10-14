<script setup lang="ts">
// Gate pilihan mode: satu layar penuh, dua kartu. Konten di bawahnya terkunci (lihat mode.css)
// sampai pengunjung memilih. Kartu yang dipilih "terbang" ke toggle mode di topbar (GSAP Flip).
const { t } = useI18n()
const { setMode } = useMode()
const modes = MODES

const gate = ref<HTMLElement | null>(null)
let busy = false

onMounted(() => {
  // Muat GSAP saat gate hampir terlihat, supaya klik pertama tidak menunggu.
  const io = new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting) {
      loadGsap()
      io.disconnect()
    }
  }, { rootMargin: '200px' })
  if (gate.value) io.observe(gate.value)
  onBeforeUnmount(() => io.disconnect())
})

async function choose(m: Mode, e: MouseEvent) {
  if (busy) return
  busy = true

  const card = e.currentTarget as HTMLElement
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const ghost = reduced ? null : makeGhost(card, m)
  const lib = reduced ? null : await loadGsap().catch(() => null)

  // Pilih mode: gate hilang, konten mode + kontak + footer muncul (mode.css).
  setMode(m)
  await nextTick()

  const content = document.getElementById('konten')
  const topbarHeight = document.querySelector('.topbar')?.getBoundingClientRect().height ?? 0
  if (content) {
    window.scrollTo({ top: content.getBoundingClientRect().top + window.scrollY - topbarHeight, behavior: 'instant' })
  }

  const target = document.querySelector<HTMLElement>(`.topbar [data-mode-btn="${m}"]`)
  const toggle = target?.closest<HTMLElement>('.mode-toggle')

  if (ghost && lib && target && toggle) {
    const { gsap, Flip } = lib
    gsap.set(toggle, { autoAlpha: 0 })
    if (content) gsap.from(content, { autoAlpha: 0, y: 32, duration: 0.6, delay: 0.25, ease: 'power2.out', clearProps: 'all' })

    const tl = gsap.timeline()
    tl.to(ghost.querySelectorAll('.card-body'), { autoAlpha: 0, duration: 0.2 }, 0)
      // Salinan sudah position: fixed, jadi cukup disesuaikan posisi & ukurannya ke tombol tujuan.
      .add(Flip.fit(ghost, target, { duration: 0.75, ease: 'power3.inOut' }) as gsap.core.Tween, 0)
      .to(ghost, { borderRadius: 8, duration: 0.75, ease: 'power3.inOut' }, 0)
      .to(ghost.querySelector('.ghost-label'), { autoAlpha: 1, duration: 0.25 }, 0.45)
      .to(toggle, { autoAlpha: 1, duration: 0.2 }, 0.75)
      .to(ghost, { autoAlpha: 0, duration: 0.2 }, 0.8)
    await tl.then()
    ghost.remove()
    gsap.set(toggle, { clearProps: 'opacity,visibility' })
  } else {
    ghost?.remove()
  }

  content?.focus({ preventScroll: true })
  busy = false
}

/** Salinan kartu (position: fixed) yang diterbangkan ke topbar, jadi kartu asli boleh langsung hilang. */
function makeGhost(card: HTMLElement, m: Mode) {
  const rect = card.getBoundingClientRect()
  const ghost = card.cloneNode(true) as HTMLElement
  ghost.removeAttribute('data-mode-card')
  ghost.classList.add('gate-ghost')
  ghost.setAttribute('aria-hidden', 'true')
  Object.assign(ghost.style, {
    position: 'fixed',
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    margin: '0',
    zIndex: '70',
    pointerEvents: 'none',
  })
  const label = document.createElement('span')
  label.className = 'ghost-label'
  label.textContent = m === 'rekruter' ? t('mode.recruiter') : t('mode.client')
  ghost.appendChild(label)
  document.body.appendChild(ghost)
  return ghost
}
</script>

<template>
  <section id="pilih" ref="gate" class="gate" aria-labelledby="gate-title">
    <div class="wrap inner">
      <span class="kicker mono">{{ t('gate.kicker') }}</span>
      <h2 id="gate-title">{{ t('gate.title') }}</h2>
      <p class="lead">{{ t('gate.subtitle') }}</p>

      <div class="cards">
        <button
          v-for="m in modes"
          :key="m"
          type="button"
          class="card"
          :data-mode-card="m"
          @click="choose(m, $event)"
        >
          <span class="card-body">
            <span class="card-kicker mono">{{ t(`gate.${m}.kicker`) }}</span>
            <span class="card-title">{{ t(`gate.${m}.title`) }}</span>
            <span class="card-desc">{{ t(`gate.${m}.desc`) }}</span>
            <span class="arrow" aria-hidden="true">→</span>
          </span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gate {
  min-height: calc(100svh - 68px);
  display: flex;
  align-items: center;
  padding: 64px 0;
  border-top: 1px solid var(--line);
}

.inner {
  width: 100%;
}

.kicker {
  display: block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--red);
  margin-bottom: 10px;
}

h2 {
  font-size: clamp(30px, 4.2vw, 44px);
  line-height: 1.12;
  letter-spacing: -0.03em;
  font-weight: 800;
  margin-bottom: 12px;
}

.lead {
  font-size: 17px;
  color: var(--ink-2);
  max-width: 36em;
  margin-bottom: 40px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

@media (max-width: 767.98px) {
  .cards {
    grid-template-columns: 1fr;
  }
}
</style>

<style>
/* Tidak scoped: dipakai juga oleh salinan kartu (.gate-ghost) yang dipasang di <body>. */
.gate .card,
.gate-ghost {
  position: relative;
  overflow: hidden;
  display: block;
  text-align: left;
  font: inherit;
  color: var(--ink);
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: var(--r);
  padding: 0;
  cursor: pointer;
}

.gate .card {
  transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
}

.gate .card:hover,
.gate .card:focus-visible {
  border-color: var(--red);
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.gate .card-body,
.gate-ghost .card-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 28px 28px 32px;
  min-height: 220px;
}

.gate .card-kicker,
.gate-ghost .card-kicker {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-3);
}

.gate .card-title,
.gate-ghost .card-title {
  font-size: clamp(22px, 2.6vw, 30px);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.15;
}

.gate .card-desc,
.gate-ghost .card-desc {
  color: var(--ink-2);
  font-size: 15px;
  max-width: 28em;
}

.gate .arrow,
.gate-ghost .arrow {
  margin-top: auto;
  font-size: 22px;
  color: var(--red);
  transition: transform 0.2s;
}

.gate .card:hover .arrow {
  transform: translateX(4px);
}

.gate-ghost .ghost-label {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
}

@media (max-width: 767.98px) {
  .gate .card-body {
    min-height: 0;
    padding: 22px 22px 24px;
  }
}
</style>
