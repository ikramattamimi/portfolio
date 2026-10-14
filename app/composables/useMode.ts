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
