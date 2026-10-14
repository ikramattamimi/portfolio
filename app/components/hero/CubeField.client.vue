<script setup lang="ts">
// Latar hero: kubus wireframe yang melayang, bertabrakan, dan didorong mouse.
// Dimuat lazy (lihat HeroSection) supaya Three.js tidak memperlambat render awal.
import { TresCanvas } from '@tresjs/core'
import { NoToneMapping, OrthographicCamera } from 'three'
import type { PointerState } from '~/utils/cubePhysics'

const SIZE = 38 // ±1 cm

const container = ref<HTMLElement | null>(null)
const width = ref(0)
const height = ref(0)
const ready = ref(false)

// Mouse = interaktif + lebih banyak kubus. Layar sentuh = melayang pelan, sedikit kubus.
const interactive = window.matchMedia('(hover: hover) and (pointer: fine)').matches
const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
const reduced = ref(reducedQuery.matches)
const inView = ref(true)
const pageVisible = ref(!document.hidden)
const running = computed(() => !reduced.value && inView.value && pageVisible.value)

const count = ref(0)
const cruise: [number, number] = interactive ? [28, 55] : [14, 28]

// Satu unit dunia = satu piksel CSS, titik (0, 0) di tengah hero.
const camera = new OrthographicCamera(-1, 1, 1, -1, -1000, 1000)
camera.position.z = 100
function fitCamera() {
  camera.left = -width.value / 2
  camera.right = width.value / 2
  camera.top = height.value / 2
  camera.bottom = -height.value / 2
  camera.updateProjectionMatrix()
}

// Warna garis mengikuti tema (dibaca dari variabel CSS).
const colorMode = useColorMode()
const colors = ref({ line: '#85819a', accent: '#e0463d' })
function readColors() {
  const s = getComputedStyle(document.documentElement)
  colors.value = {
    line: s.getPropertyValue('--ink-3').trim() || colors.value.line,
    accent: s.getPropertyValue('--red').trim() || colors.value.accent,
  }
}
watch(() => colorMode.value, () => nextTick(readColors))

// Pointer dalam koordinat dunia, plus kecepatannya.
const pointer = reactive<PointerState>({ x: 0, y: 0, vx: 0, vy: 0, active: false })
let lastMove = 0
function onPointerMove(e: PointerEvent) {
  if (e.pointerType !== 'mouse' || !container.value) return
  const rect = container.value.getBoundingClientRect()
  const x = e.clientX - rect.left - rect.width / 2
  const y = rect.height / 2 - (e.clientY - rect.top)
  const now = performance.now()
  const dt = Math.max((now - lastMove) / 1000, 1 / 240)
  if (pointer.active && dt < 0.1) {
    // Haluskan kecepatan supaya lemparan tidak terlalu liar.
    pointer.vx = pointer.vx * 0.5 + ((x - pointer.x) / dt) * 0.5
    pointer.vy = pointer.vy * 0.5 + ((y - pointer.y) / dt) * 0.5
  } else {
    pointer.vx = 0
    pointer.vy = 0
  }
  pointer.x = x
  pointer.y = y
  pointer.active = Math.abs(x) <= rect.width / 2 && Math.abs(y) <= rect.height / 2
  lastMove = now
}
function onPointerLeave() {
  pointer.active = false
}

const onVisibility = () => (pageVisible.value = !document.hidden)
const onReducedChange = (e: MediaQueryListEvent) => (reduced.value = e.matches)

let resizeObserver: ResizeObserver | null = null
let intersectionObserver: IntersectionObserver | null = null

onMounted(() => {
  const el = container.value!
  width.value = el.clientWidth
  height.value = el.clientHeight
  count.value = interactive
    ? Math.round(Math.min(28, Math.max(12, (width.value * height.value) / 38000)))
    : 7
  fitCamera()
  readColors()
  ready.value = true

  resizeObserver = new ResizeObserver(([entry]) => {
    if (!entry) return
    width.value = Math.round(entry.contentRect.width)
    height.value = Math.round(entry.contentRect.height)
    fitCamera()
  })
  resizeObserver.observe(el)

  intersectionObserver = new IntersectionObserver(([entry]) => {
    inView.value = !!entry?.isIntersecting
  })
  intersectionObserver.observe(el)

  document.addEventListener('visibilitychange', onVisibility)
  reducedQuery.addEventListener('change', onReducedChange)
  if (interactive) {
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onPointerLeave)
  }
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  intersectionObserver?.disconnect()
  document.removeEventListener('visibilitychange', onVisibility)
  reducedQuery.removeEventListener('change', onReducedChange)
  window.removeEventListener('pointermove', onPointerMove)
  document.documentElement.removeEventListener('pointerleave', onPointerLeave)
})
</script>

<template>
  <div ref="container" class="cube-field" :class="{ ready }" aria-hidden="true">
    <TresCanvas
      v-if="ready"
      :camera="camera"
      alpha
      :clear-alpha="0"
      :dpr="[1, 2]"
      :tone-mapping="NoToneMapping"
      antialias
    >
      <HeroCubeScene
        :width="width"
        :height="height"
        :count="count"
        :size="SIZE"
        :cruise="cruise"
        :running="running"
        :pointer="pointer"
        :colors="colors"
      />
    </TresCanvas>
  </div>
</template>

<style scoped>
.cube-field {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.8s ease;
}

.cube-field.ready {
  opacity: 1;
}
</style>
