// `?mode=` dari link lama sudah dihapus INIT_SCRIPT, tapi router bisa memasangnya kembali ke URL
// saat hydration. Hapus sekali lagi setelah halaman selesai di-hydrate.
export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()
  nuxtApp.hook('app:suspense:resolve', () => {
    const route = router.currentRoute.value
    if ('mode' in route.query) {
      const { mode: _, ...query } = route.query
      router.replace({ ...route, query })
    }
  })
})
