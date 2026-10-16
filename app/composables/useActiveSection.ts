/**
 * Melacak posisi baca di dalam konten setelah hero (#konten):
 * - `active`: id section yang sedang melewati tengah layar
 * - `progress`: 0–1, seberapa jauh konten sudah dibaca
 * - `inContent`: konten sudah mencapai tengah layar (navigasi flow ditampilkan)
 */
export function useActiveSection(ids: MaybeRefOrGetter<string[]>) {
  const active = ref<string | null>(null)
  const progress = ref(0)
  const inContent = ref(false)

  // Diukur langsung di handler scroll (cukup ringan: beberapa getBoundingClientRect),
  // tanpa requestAnimationFrame yang bisa tertahan saat tab tidak aktif.
  function measure() {
    const content = document.getElementById('konten')
    if (!content || !content.offsetHeight) {
      inContent.value = false
      return
    }
    const mid = window.innerHeight / 2
    const rect = content.getBoundingClientRect()
    inContent.value = rect.top < mid && rect.bottom > mid
    progress.value = Math.min(1, Math.max(0, (mid - rect.top) / rect.height))

    let current: string | null = null
    for (const id of toValue(ids)) {
      const el = document.getElementById(id)
      if (!el || !el.offsetHeight) continue
      if (el.getBoundingClientRect().top <= mid) current = id
    }
    active.value = current ?? toValue(ids)[0] ?? null
  }

  onMounted(() => {
    measure()
    window.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', measure)
    window.removeEventListener('resize', measure)
  })

  return { active, progress, inContent, refresh: measure }
}
