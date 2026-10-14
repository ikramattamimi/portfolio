// Salin mode dari <html data-mode> (dipasang MODE_INIT_SCRIPT) ke state setelah hydration,
// supaya render pertama di client sama dengan HTML hasil generate.
export default defineNuxtPlugin((nuxtApp) => {
  const { mode } = useMode()
  const router = useRouter()

  nuxtApp.hook('app:mounted', () => {
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
