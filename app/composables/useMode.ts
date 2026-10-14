export type Mode = 'rekruter' | 'klien'

export const MODES: readonly Mode[] = ['rekruter', 'klien']
export const MODE_STORAGE_KEY = 'mode'

export function isMode(value: unknown): value is Mode {
  return MODES.includes(value as Mode)
}

/**
 * Script inline di <head>, jalan sebelum halaman digambar:
 * 1. Tandai <html class="js"> (tanpa JS: gate disembunyikan, kedua mode tampil).
 * 2. Ambil mode dari `?mode=` (boleh juga `recruiter`/`client`), simpan ke localStorage,
 *    lalu hapus parameter dari URL supaya tidak bentrok dengan pilihan berikutnya.
 * 3. Kalau tidak ada, pakai mode tersimpan.
 * 4. Pasang <html data-mode="..."> supaya CSS langsung menampilkan mode yang benar (tanpa kedipan).
 */
export const MODE_INIT_SCRIPT = `(function(){var d=document.documentElement;d.classList.add('js');try{var v=['rekruter','klien'],a={recruiter:'rekruter',client:'klien'},k='${MODE_STORAGE_KEY}',u=new URL(location.href),q=u.searchParams.get('mode'),m=null;q=a[q]||q;if(v.indexOf(q)>-1){m=q;localStorage.setItem(k,q)}if(u.searchParams.has('mode')){u.searchParams.delete('mode');history.replaceState(history.state,'',u.pathname+u.search+u.hash)}if(!m){var s=localStorage.getItem(k);if(v.indexOf(s)>-1)m=s}if(m)d.setAttribute('data-mode',m)}catch(e){}})()`

/**
 * Mode tampilan yang aktif. `null` = pengunjung belum memilih.
 *
 * Sumber kebenaran sebelum hydration adalah atribut <html data-mode> dari MODE_INIT_SCRIPT;
 * state ini disalin dari atribut itu setelah app terpasang (plugin mode.client).
 */
export function useMode() {
  const mode = useState<Mode | null>('mode', () => null)

  function setMode(value: Mode) {
    mode.value = value
    if (import.meta.client) {
      document.documentElement.setAttribute('data-mode', value)
      try {
        localStorage.setItem(MODE_STORAGE_KEY, value)
      } catch {
        // localStorage bisa diblokir (mode privat); pilihan tetap berlaku untuk sesi ini.
      }
    }
  }

  return { mode, setMode }
}

/**
 * Link "Hubungi": sebelum mode dipilih, bagian kontak masih terkunci di bawah gate,
 * jadi arahkan ke gate dulu.
 */
export function useContactLink() {
  const route = useRoute()
  return (e: MouseEvent) => {
    if (route.meta.gate && !document.documentElement.hasAttribute('data-mode')) {
      e.preventDefault()
      document.getElementById('pilih')?.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

/**
 * Ganti mode lewat toggle di topbar, dengan animasi: konten lama keluar ke satu arah,
 * konten baru masuk dari arah berlawanan (bertahap per section).
 * Rekruter → klien bergerak ke kiri, klien → rekruter ke kanan.
 */
export function useModeSwitch() {
  const { setMode } = useMode()
  let busy = false

  return async function switchMode(next: Mode) {
    const from = document.documentElement.getAttribute('data-mode')
    if (busy || from === next) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isMode(from) || reduced) {
      setMode(next)
      return
    }

    busy = true
    try {
      const { gsap } = await loadGsap()
      const dir = next === 'klien' ? 1 : -1
      const oldView = document.querySelector<HTMLElement>(`.view-${from}`)

      if (oldView) await gsap.to(oldView, { autoAlpha: 0, x: -dir * 40, duration: 0.25, ease: 'power2.in' })
      setMode(next)
      await nextTick()
      if (oldView) gsap.set(oldView, { clearProps: 'all' })

      // Kalau sedang berada di tengah konten, kembali ke awal konten mode baru.
      const content = document.getElementById('konten')
      const topbar = document.querySelector('.topbar')?.getBoundingClientRect().height ?? 0
      if (content) {
        const top = content.getBoundingClientRect().top + window.scrollY - topbar
        if (window.scrollY > top) window.scrollTo({ top, behavior: 'instant' })
      }

      const sections = document.querySelectorAll(`.view-${next} > section`)
      await gsap.from(sections, {
        autoAlpha: 0,
        x: dir * 40,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'all',
      })
    } catch {
      setMode(next)
    } finally {
      busy = false
    }
  }
}
