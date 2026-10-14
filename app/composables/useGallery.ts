/** Lightbox galeri screenshot, satu instance untuk seluruh halaman (UiLightbox di layout). */
export function useGallery() {
  const state = useState('gallery', () => ({ open: false, title: '', images: [] as string[], index: 0 }))

  function open(title: string, images: string[], index = 0) {
    state.value = { open: true, title, images, index }
  }

  function close() {
    state.value.open = false
  }

  function step(delta: number) {
    const n = state.value.images.length
    state.value.index = (state.value.index + delta + n) % n
  }

  return { state, open, close, step }
}
