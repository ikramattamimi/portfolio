<script setup lang="ts">
// Galeri screenshot layar penuh. Esc menutup, panah kiri/kanan berpindah gambar.
const { t } = useI18n()
const { state, close, step } = useGallery()

const closeBtn = ref<HTMLButtonElement | null>(null)
let returnFocus: HTMLElement | null = null

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowRight') step(1)
  else if (e.key === 'ArrowLeft') step(-1)
}

watch(() => state.value.open, async (open) => {
  document.documentElement.style.overflow = open ? 'hidden' : ''
  if (open) {
    returnFocus = document.activeElement as HTMLElement | null
    document.addEventListener('keydown', onKeydown)
    await nextTick()
    closeBtn.value?.focus()
  } else {
    document.removeEventListener('keydown', onKeydown)
    returnFocus?.focus()
  }
})

onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition name="lb">
      <div
        v-if="state.open"
        class="lb"
        role="dialog"
        aria-modal="true"
        :aria-label="t('gallery.label', { name: state.title })"
        @click.self="close"
      >
        <button ref="closeBtn" type="button" class="x" :aria-label="t('gallery.close')" @click="close">✕</button>
        <button v-if="state.images.length > 1" type="button" class="p" :aria-label="t('gallery.prev')" @click="step(-1)">‹</button>
        <img :src="state.images[state.index]" :alt="`${state.title} ${state.index + 1}`">
        <button v-if="state.images.length > 1" type="button" class="nx" :aria-label="t('gallery.next')" @click="step(1)">›</button>
        <span class="cnt mono">{{ state.index + 1 }} / {{ state.images.length }}</span>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lb {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(20, 19, 25, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

img {
  max-width: min(100%, 1200px);
  max-height: 82vh;
  border-radius: 12px;
}

button {
  position: absolute;
  background: rgba(255, 255, 255, 0.14);
  border: none;
  color: #fff;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
}

button:hover {
  background: rgba(255, 255, 255, 0.24);
}

.x { top: 18px; right: 18px; }
.p { left: 14px; }
.nx { right: 14px; }

.cnt {
  position: absolute;
  bottom: 20px;
  color: #fff;
  font-size: 13px;
  opacity: 0.7;
}

.lb-enter-active,
.lb-leave-active {
  transition: opacity 0.2s;
}

.lb-enter-from,
.lb-leave-to {
  opacity: 0;
}
</style>
