/**
 * Kunci untuk tiap item array di file locale, mis. `home.jobs.gdi.points` →
 * ['home.jobs.gdi.points.0', …]. Dipakai dengan `t(key)` supaya teks dalam array
 * tetap diterjemahkan lewat jalur biasa.
 */
export function useI18nList() {
  const { tm } = useI18n()
  return (path: string): string[] => {
    const value = tm(path)
    return Array.isArray(value) ? value.map((_, i) => `${path}.${i}`) : []
  }
}
