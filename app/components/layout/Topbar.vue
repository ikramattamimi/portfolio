<script setup lang="ts">
// Desktop: toggle mode di kiri; ID/EN, Hubungi, tema di kanan.
// Mobile: tombol sidebar (kiri), toggle mode (tengah), tema (kanan).
const { t } = useI18n()
const { open: sidebarOpen, show: showSidebar } = useSidebar()

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

      <GateModeToggle class="mode" />

      <div class="actions">
        <UiLangSwitch class="desktop-only" />
        <a href="#kontak" class="btn red sm desktop-only">{{ t('nav.contact') }}</a>
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
