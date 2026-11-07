<script setup lang="ts">
// Desktop: nama di kiri; Blog, ID/EN, CV, Hubungi, tema di kanan.
// Mobile: tombol sidebar (kiri), monogram "IA" (tengah), tema (kanan).
// Item muncul bergantian saat halaman pertama dibuka (`intro-down`, lihat base.css).
import { BLOG_ENABLED, CV_URL, LANG_SWITCH_ENABLED } from '~/data/portfolio'

const { t } = useI18n()
const route = useRoute()
const localePath = useLocalePath()
const { open: sidebarOpen, show: showSidebar } = useSidebar()

// Nama di kiri: di beranda kembali ke atas, di halaman lain pindah ke beranda.
function onBrand(e: MouseEvent) {
  if (route.path !== localePath('/')) return
  e.preventDefault()
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
}

const scrolled = ref(false)
function onScroll() {
  scrolled.value = window.scrollY > 8
}
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="topbar" :class="{ scrolled }">
    <div class="wrap bar">
      <button
        id="sidebar-trigger"
        type="button"
        class="icon-btn menu-btn intro-down"
        :aria-label="t('nav.openMenu')"
        :aria-expanded="sidebarOpen"
        aria-controls="sidebar"
        @click="showSidebar"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
      </button>

      <NuxtLink :to="localePath('/')" class="brand intro-down" :aria-label="t('nav.brand')" @click="onBrand">
        <img class="mark" src="/favicon.svg" width="28" height="28" alt="" aria-hidden="true">
        <span class="full">Ikram Attamimi</span>
      </NuxtLink>

      <div class="actions">
        <NuxtLink v-if="BLOG_ENABLED" :to="localePath('/blog')" class="text-link desktop-only intro-down" style="--i: 1">{{ t('blog.nav') }}</NuxtLink>
        <UiLangSwitch v-if="LANG_SWITCH_ENABLED" class="desktop-only intro-down" style="--i: 2" />
        <a :href="CV_URL" target="_blank" rel="noopener" class="btn sm desktop-only intro-down" style="--i: 3">{{ t('nav.cv') }}</a>
        <a :href="`${localePath('/')}#kontak`" class="btn red sm desktop-only intro-down" style="--i: 4">{{ t('nav.contact') }}</a>
        <UiThemeToggle class="intro-down" style="--i: 5" />
      </div>
    </div>
  </header>
</template>

<style scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 40;
  background: var(--nav-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}

.topbar.scrolled {
  border-color: var(--line);
}

.bar {
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: none;
  background: var(--soft);
  color: var(--ink-2);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: color 0.2s;
}

.icon-btn:hover {
  color: var(--ink);
}

.icon-btn svg {
  width: 18px;
  height: 18px;
}

.menu-btn {
  display: none;
}

.brand {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.brand .mark {
  flex: none;
  display: block;
  transition: transform 200ms cubic-bezier(0.23, 1, 0.32, 1);
}

.brand:active .mark {
  transform: scale(0.97);
}

@media (hover: hover) and (pointer: fine) {
  .brand:hover {
    color: var(--red);
  }

  .brand:hover .mark {
    transform: scale(1.06);
  }
}

.text-link:hover {
  color: var(--ink);
}

.text-link {
  font-size: 14px;
  font-weight: 700;
  color: var(--ink-2);
  padding: 0 4px;
}

.text-link.router-link-active {
  color: var(--ink);
}

@media (max-width: 767.98px) {
  .bar {
    display: grid;
    grid-template-columns: 36px 1fr 36px;
  }

  .menu-btn {
    display: grid;
  }

  .brand {
    justify-self: center;
  }

  .brand .full {
    display: none;
  }

  .desktop-only {
    display: none;
  }
}
</style>
