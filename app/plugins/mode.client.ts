// Salin mode dari <html data-mode> (dipasang MODE_INIT_SCRIPT) ke state setelah hydration,
// supaya render pertama di client sama dengan HTML hasil generate.
// Pakai `app:suspense:resolve` (bukan `app:mounted`): halaman di dalam <Suspense> baru selesai
// di-hydrate saat hook ini terpicu; kalau lebih awal, komponen yang bergantung pada mode
// (mis. NavSideFlow) di-hydrate dengan state berbeda dari HTML server.
export default defineNuxtPlugin((nuxtApp) => {
  const { mode } = useMode()
  const router = useRouter()
  let synced = false

  nuxtApp.hook('app:suspense:resolve', () => {
    if (synced) return
    synced = true

    const value = document.documentElement.getAttribute('data-mode')
    if (isMode(value)) mode.value = value

    // `?mode=` sudah dibaca dan disimpan oleh script awal. Router memasangnya kembali ke URL,
    // jadi hapus di sini supaya tidak menimpa pilihan pengunjung saat halaman dimuat ulang.
    const route = router.currentRoute.value
    if ('mode' in route.query) {
      const { mode: _, ...query } = route.query
      router.replace({ ...route, query })
    }
  })
})
