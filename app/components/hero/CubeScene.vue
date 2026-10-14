<script setup lang="ts">
// Isi scene TresJS: kubus wireframe + loop physics. Hanya dipakai di dalam <TresCanvas> (HeroCubeField).
import { useLoop } from '@tresjs/core'
import { BoxGeometry, EdgesGeometry, Group, Vector2 } from 'three'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js'
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js'
import { createCubeWorld, type PointerState } from '~/utils/cubePhysics'

const props = defineProps<{
  width: number
  height: number
  count: number
  size: number
  cruise: [number, number]
  /** Loop berjalan (hero terlihat, tab aktif, tanpa reduced motion). */
  running: boolean
  pointer: PointerState
  colors: { line: string, accent: string }
}>()

const world = createCubeWorld({
  count: props.count,
  size: props.size,
  width: props.width,
  height: props.height,
  cruise: props.cruise,
})

// Garis tebal (LineSegments2) karena garis WebGL biasa selalu 1 px perangkat dan jadi terlalu tipis di layar retina.
const edges = new LineSegmentsGeometry().fromEdgesGeometry(
  new EdgesGeometry(new BoxGeometry(props.size, props.size, props.size)),
)
const resolution = new Vector2(props.width, props.height)
// Cukup samar supaya teks hero di atasnya tetap mudah dibaca.
const lineMat = new LineMaterial({ color: props.colors.line, linewidth: 1.25, transparent: true, opacity: 0.5, resolution })
const accentMat = new LineMaterial({ color: props.colors.accent, linewidth: 1.5, transparent: true, opacity: 0.75, resolution })

// Sekitar 1 dari 8 kubus berwarna aksen merah.
const group = new Group()
const meshes = world.cubes.map((_, i) => {
  const mesh = new LineSegments2(edges, i % 8 === 0 ? accentMat : lineMat)
  group.add(mesh)
  return mesh
})

function sync() {
  world.cubes.forEach((c, i) => {
    const m = meshes[i]!
    m.position.set(c.x, c.y, 0)
    m.quaternion.copy(c.q)
  })
}
sync()

let renderedStill = false
const { onBeforeRender, start, stop, isActive } = useLoop()

// Jalankan ulang loop hanya kalau sedang berhenti. TresJS memasang listener `visibilitychange`
// baru setiap kali start() dipanggil tanpa melepas yang lama; listener yang bocor lalu error
// ("Cannot read properties of null (reading 'hidden')") setelah loop dihentikan.
function wake() {
  renderedStill = false
  if (!isActive.value) start()
}

onBeforeRender(({ delta }) => {
  if (props.running) {
    world.step(delta, props.pointer)
    sync()
  } else if (renderedStill) {
    // Diam: cukup satu frame, lalu loop dihentikan.
    if (isActive.value) stop()
  } else {
    renderedStill = true
  }
})

watch(
  () => props.running,
  wake,
)

watch(
  () => [props.width, props.height] as const,
  ([w, h]) => {
    world.resize(w, h)
    resolution.set(w, h)
    sync()
    wake()
  },
)

watch(
  () => props.colors,
  (c) => {
    lineMat.color.set(c.line)
    accentMat.color.set(c.accent)
    wake()
  },
)

onBeforeUnmount(() => {
  edges.dispose()
  lineMat.dispose()
  accentMat.dispose()
})
</script>

<template>
  <primitive :object="group" />
</template>
