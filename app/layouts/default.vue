<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="app">
    <a href="#main" class="skip-link">{{ t('nav.skip') }}</a>
    <LayoutTopbar />
    <LayoutSidebar />
    <main id="main" tabindex="-1">
      <slot />
    </main>
    <LayoutFooter />
    <UiCustomCursor />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  outline: none;
}
</style>
