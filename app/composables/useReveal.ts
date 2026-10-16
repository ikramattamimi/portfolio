/**
 * Scroll reveal: elemen bertanda `data-reveal` muncul sekali (fade + geser ke atas) saat masuk layar.
 * Status awal tersembunyi diatur di base.css dan hanya berlaku di `html.js`, jadi tanpa JavaScript
 * semua konten tetap terlihat. Jeda bertahap per item lewat variabel CSS `--d` di elemennya.
 *
 * Tanpa GSAP: cukup transisi CSS, supaya tidak ada chunk tambahan yang harus dimuat.
 */
export function useReveal() {
  let io: IntersectionObserver | null = null

  onMounted(() => {
    const items = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('revealed'))
      return
    }

    io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        e.target.classList.add('revealed')
        io?.unobserve(e.target)
      }
    }, { rootMargin: '0px 0px -10% 0px' })
    items.forEach((el) => io!.observe(el))
  })

  onBeforeUnmount(() => io?.disconnect())
}
