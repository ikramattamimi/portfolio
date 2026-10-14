<script setup lang="ts">
// Desktop: toggle mode di kiri; Blog, ID/EN, Hubungi, tema di kanan.
// Mobile: tombol sidebar (kiri), toggle mode (tengah), tema (kanan).
// Di halaman tanpa gate (mis. blog), posisi toggle mode diganti link kembali ke beranda.
import { BLOG_ENABLED } from '~/data/portfolio'

const { t } = useI18n()
const route = useRoute()
const localePath = useLocalePath()
const { open: sidebarOpen, show: showSidebar } = useSidebar()
const onContact = useContactLink()

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
        class="icon-btn menu-btn"
        :aria-label="t('nav.openMenu')"
        :aria-expanded="sidebarOpen"
        aria-controls="sidebar"
        @click="showSidebar"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
      </button>

      <GateModeToggle v-if="route.meta.gate" class="mode" />
      <NuxtLink v-else :to="localePath('/')" class="mode home mono">← {{ t('blog.home') }}</NuxtLink>

      <div class="actions">
        <NuxtLink v-if="BLOG_ENABLED" :to="localePath('/blog')" class="text-link desktop-only">{{ t('blog.nav') }}</NuxtLink>
        <UiLangSwitch class="desktop-only" />
        <a :href="route.meta.gate ? '#kontak' : `${localePath('/')}#kontak`" class="btn red sm desktop-only" @click="onContact">{{ t('nav.contact') }}</a>
        <UiThemeToggle />
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

.home {
  font-size: 13px;
  font-weight: 700;
  color: var(--ink-2);
}

.home:hover,
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

  .mode {
    justify-self: center;
  }

  .desktop-only {
    display: none;
  }
}
</style>
