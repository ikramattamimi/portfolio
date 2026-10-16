<script setup lang="ts">
// Sidebar mobile: Blog (kalau BLOG_ENABLED), ID/EN, CV, dan Hubungi.
// Tutup lewat tombol, klik di luar panel, atau Esc. Fokus keyboard tetap di dalam panel selama terbuka.
import { BLOG_ENABLED, CV_URL } from '~/data/portfolio'

const { t } = useI18n()
const route = useRoute()
const localePath = useLocalePath()
const { open, hide } = useSidebar()

const panel = ref<HTMLElement | null>(null)
const closeBtn = ref<HTMLButtonElement | null>(null)

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    hide()
    return
  }
  if (e.key !== 'Tab' || !panel.value) return
  const items = [...panel.value.querySelectorAll<HTMLElement>(FOCUSABLE)]
  if (!items.length) return
  const first = items[0]!
  const last = items[items.length - 1]!
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first.focus()
  }
}

let desktopQuery: MediaQueryList | null = null
function onDesktop(e: MediaQueryListEvent) {
  if (e.matches) hide()
}

watch(open, async (isOpen) => {
  if (!import.meta.client) return
  document.documentElement.style.overflow = isOpen ? 'hidden' : ''
  if (isOpen) {
    document.addEventListener('keydown', onKeydown)
    await nextTick()
    closeBtn.value?.focus()
  } else {
    document.removeEventListener('keydown', onKeydown)
    document.getElementById('sidebar-trigger')?.focus()
  }
})

// Tutup saat pindah halaman/bahasa.
watch(() => route.fullPath, hide)

onMounted(() => {
  desktopQuery = window.matchMedia('(min-width: 768px)')
  desktopQuery.addEventListener('change', onDesktop)
})

onBeforeUnmount(() => {
  desktopQuery?.removeEventListener('change', onDesktop)
  document.removeEventListener('keydown', onKeydown)
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="sidebar">
      <div v-if="open" class="sidebar-root">
        <div class="backdrop" aria-hidden="true" @click="hide" />
        <aside
          id="sidebar"
          ref="panel"
          class="panel"
          role="dialog"
          aria-modal="true"
          :aria-label="t('nav.menu')"
        >
          <div class="head">
            <span class="title mono">{{ t('nav.menu') }}</span>
            <button
              ref="closeBtn"
              type="button"
              class="close"
              :aria-label="t('nav.closeMenu')"
              @click="hide"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>

          <NuxtLink v-if="BLOG_ENABLED" :to="localePath('/blog')" class="nav-link">{{ t('blog.nav') }} →</NuxtLink>

          <div class="group">
            <span class="label mono">{{ t('nav.language') }}</span>
            <UiLangSwitch />
          </div>

          <div class="buttons">
            <a :href="CV_URL" target="_blank" rel="noopener" class="btn">{{ t('nav.cv') }}</a>
            <a :href="`${localePath('/')}#kontak`" class="btn red" @click="hide">{{ t('nav.contact') }}</a>
          </div>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.sidebar-root {
  position: fixed;
  inset: 0;
  z-index: 60;
}

.backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}

.panel {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: min(300px, 85vw);
  background: var(--paper);
  border-right: 1px solid var(--line);
  padding: 16px 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  overflow-y: auto;
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title,
.label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-3);
}

.close {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: none;
  background: var(--soft);
  color: var(--ink-2);
  display: grid;
  place-items: center;
  cursor: pointer;
}

.close svg {
  width: 18px;
  height: 18px;
}

.group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.buttons {
  display: grid;
  gap: 10px;
}

.nav-link {
  font-size: 18px;
  font-weight: 700;
  padding: 6px 0;
  border-bottom: 1px solid var(--line);
}

/* Animasi buka/tutup */
.sidebar-enter-active,
.sidebar-leave-active {
  transition: opacity 0.25s ease;
}

.sidebar-enter-active .panel,
.sidebar-leave-active .panel {
  transition: transform 0.25s ease;
}

.sidebar-enter-from,
.sidebar-leave-to {
  opacity: 0;
}

.sidebar-enter-from .panel,
.sidebar-leave-to .panel {
  transform: translateX(-100%);
}
</style>
