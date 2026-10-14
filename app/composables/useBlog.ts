/** Nama koleksi @nuxt/content untuk sebuah bahasa (lihat content.config.ts). */
export function blogCollection(locale: string) {
  return locale === 'en' ? 'blog_en' : 'blog_id'
}

/** Slug artikel dari path koleksi, mis. '/blog/id/judul-artikel' → 'judul-artikel'. */
export function blogSlug(path: string) {
  return path.split('/').pop() ?? ''
}

/** Draf hanya ditampilkan saat dev. */
export const SHOW_DRAFTS = import.meta.dev

/** Tanggal artikel (YYYY-MM-DD) dalam format panjang sesuai bahasa. Pakai UTC supaya server & client sama. */
export function formatBlogDate(date: string, language: string) {
  return new Intl.DateTimeFormat(language, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`))
}
