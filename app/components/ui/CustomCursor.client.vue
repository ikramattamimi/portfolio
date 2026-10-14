<script setup lang="ts">
// Kursor kotak kecil merah yang berputar 45° saat berada di atas elemen interaktif.
// Hanya untuk perangkat dengan mouse. Di kolom teks, kursor bawaan yang dipakai.
const INTERACTIVE = 'a, button, [role="button"], label, summary, [data-cursor="hover"]'
const TEXT_FIELD = 'input, textarea, select, [contenteditable="true"]'

const enabled = ref(false)
const visible = ref(false)
const hovering = ref(false)
const pressed = ref(false)
const el = ref<HTMLElement | null>(null)

let x = 0
let y = 0
let curX = 0
let curY = 0
let frame = 0
let smooth = true
let pointerQuery: MediaQueryList | null = null
let motionQuery: MediaQueryList | null = null

function render() {
  // Mengikuti pointer dengan sedikit jeda (lerp), kecuali reduced motion.
  const k = smooth ? 0.35 : 1
  curX += (x - curX) * k
  curY += (y - curY) * k
  if (el.value) el.value.style.transform = `translate3d(${curX}px, ${curY}px, 0)`
  frame = requestAnimationFrame(render)
}

function onMove(e: PointerEvent) {
  if (e.pointerType !== 'mouse') return
  x = e.clientX
  y = e.clientY
  if (!visible.value) {
    curX = x
    curY = y
  }
  // Target bisa berupa window/document (bukan elemen), jadi cek dulu.
  const target = e.target instanceof Element ? e.target : null
  const inText = !!target?.closest(TEXT_FIELD)
  visible.value = !inText
  hovering.value = !inText && !!target?.closest(INTERACTIVE)
}

const onLeave = () => (visible.value = false)
const onDown = () => (pressed.value = true)
const onUp = () => (pressed.value = false)

function start() {
  enabled.value = true
  document.documentElement.classList.add('has-custom-cursor')
  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('pointerdown', onDown)
  window.addEventListener('pointerup', onUp)
  document.documentElement.addEventListener('pointerleave', onLeave)
  frame = requestAnimationFrame(render)
}

function stop() {
  enabled.value = false
  visible.value = false
  document.documentElement.classList.remove('has-custom-cursor')
  window.removeEventListener('pointermove', onMove)
  window.removeEventListener('pointerdown', onDown)
  window.removeEventListener('pointerup', onUp)
  document.documentElement.removeEventListener('pointerleave', onLeave)
  cancelAnimationFrame(frame)
}

function syncPointer() {
  if (pointerQuery?.matches) {
    if (!enabled.value) start()
  } else if (enabled.value) {
    stop()
  }
}

function syncMotion() {
  smooth = !motionQuery?.matches
}

onMounted(() => {
  pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  pointerQuery.addEventListener('change', syncPointer)
  motionQuery.addEventListener('change', syncMotion)
  syncMotion()
  syncPointer()
})

onBeforeUnmount(() => {
  pointerQuery?.removeEventListener('change', syncPointer)
  motionQuery?.removeEventListener('change', syncMotion)
  stop()
})
</script>

<template>
  <div
    v-if="enabled"
    ref="el"
    class="cursor"
    :class="{ visible, hovering, pressed }"
    aria-hidden="true"
  >
    <span class="square" />
  </div>
</template>

<style scoped>
.cursor {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s;
}

.cursor.visible {
  opacity: 1;
}

.square {
  display: block;
  width: 10px;
  height: 10px;
  margin: -5px 0 0 -5px;
  background: var(--red);
  border-radius: 2px;
  /* Garis tepi tipis supaya tetap terlihat di atas elemen merah. */
  box-shadow: 0 0 0 1.5px var(--bg);
  transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.hovering .square {
  transform: rotate(45deg) scale(1.5);
}

.pressed .square {
  transform: scale(0.8);
}

.hovering.pressed .square {
  transform: rotate(45deg) scale(1.2);
}
</style>

<style>
/* Sembunyikan kursor bawaan, kecuali di kolom teks. */
html.has-custom-cursor,
html.has-custom-cursor * {
  cursor: none !important;
}

html.has-custom-cursor :is(input, textarea, [contenteditable='true']) {
  cursor: text !important;
}

html.has-custom-cursor select {
  cursor: default !important;
}
</style>
