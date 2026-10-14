export type Mode = 'rekruter' | 'klien'

export const MODES: readonly Mode[] = ['rekruter', 'klien']

/**
 * Mode tampilan yang aktif. `null` = pengunjung belum memilih.
 *
 * Versi awal (Tahap 2): state saja. Membaca `?mode`, menyimpan ke
 * `localStorage`, dan mengatur gate ditambahkan di Tahap 4.
 */
export function useMode() {
  const mode = useState<Mode | null>('mode', () => null)

  function setMode(value: Mode) {
    mode.value = value
  }

  return { mode, setMode }
}
