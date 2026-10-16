/*
 * Data struktur portofolio (bukan teks). Semua teks ada di i18n/locales/{id,en}/
 * dengan kunci yang sama dengan `id` di sini.
 */

export const CONTACT = {
  whatsapp: '6287778328502',
  whatsappLabel: '+62 8777 832 8502',
  email: 'halo@ikrm.dev',
  linkedin: 'https://www.linkedin.com/in/ikram-attamimi',
  linkedinLabel: 'ikram-attamimi',
  github: 'https://github.com/ikramattamimi',
  githubLabel: '@ikramattamimi',
}

export const CV_URL = '/doc/CV.pdf'

/* ---------- tentang ---------- */

/** Teknologi yang paling sering dipakai (daftar di section Tentang). */
export const TECH = ['ASP.NET', 'Vue.js', 'Laravel', 'SQL Server', 'PostgreSQL', 'AWS S3']

/** Foto diri di section Tentang, mis. '/images/ikram.webp'. Kosong: kolom teks melebar. */
export const PHOTO = ''

/* ---------- pengalaman kerja ---------- */

export interface Job {
  id: 'gdi' | 'lapi'
  chips: string[]
}

export const JOBS: Job[] = [
  { id: 'gdi', chips: ['ASP.NET', 'Vue 3', 'Kendo UI', 'SQL Server', 'AWS S3'] },
  { id: 'lapi', chips: ['Laravel', 'Bootstrap', 'PostgreSQL'] },
]

/* ---------- proyek pilihan ---------- */

export type FeaturedId = 'rfa' | 'ped' | 'inventory'

export interface Featured {
  id: FeaturedId
  chips: string[]
  /** `dev` = sedang dikembangkan (ditandai di kartu), `live` = sudah bisa dicoba. */
  status: 'live' | 'dev'
  /**
   * Visual besar di samping kartu teks. `image` memakai `images[0]` sebagai sampul,
   * dan klik membuka galeri semua `images`.
   */
  visual: 'approval' | 'architecture' | 'image' | 'placeholder'
  images?: string[]
  links?: { demo?: string, repo?: string }
}

export const FEATURED: Featured[] = [
  { id: 'rfa', chips: ['ASP.NET', 'Vue 3', 'SQL Server', 'AWS S3'], status: 'dev', visual: 'approval' },
  { id: 'ped', chips: ['ASP.NET', 'Vue 3', 'SQL Server', 'Clean Architecture'], status: 'dev', visual: 'architecture' },
  { id: 'inventory', chips: [], status: 'dev', visual: 'placeholder' },
]

/* ---------- navigasi flow (sisi kanan) ---------- */

/** Urutan section untuk navigasi flow: id elemen + kunci label (kicker section). */
export const FLOW: { id: string, label: string }[] = [
  { id: 'tentang', label: 'home.about.kicker' },
  { id: 'pengalaman', label: 'home.experience.kicker' },
  { id: 'proyek', label: 'home.projects.kicker' },
  { id: 'kontak', label: 'contact.kicker' },
]

/* ---------- blog (Fase 2) ---------- */

/**
 * Tampilkan blog ke pengunjung (link di topbar, sidebar, footer + halaman ikut dibuild & masuk sitemap).
 * Biarkan `false` sampai ada 3–5 artikel. Selama `false`, blog tetap bisa dibuka di mode dev (/blog).
 */
export const BLOG_ENABLED = true
