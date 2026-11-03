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
export const TECH = ['ASP.NET', 'Vue.js', 'Nuxt', 'React', 'TypeScript', 'Laravel', 'SQL Server', 'PostgreSQL', 'Supabase', 'AWS S3']

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

export type FeaturedId = 'finance' | 'opnamix'

export interface Featured {
  id: FeaturedId
  chips: string[]
  /** `dev` = sedang dikembangkan (ditandai di kartu), `live` = sudah bisa dicoba. */
  status: 'live' | 'dev'
  /**
   * Visual besar di samping kartu teks. `image` menampilkan satu gambar sesuai mode
   * terang/gelap, dan klik membukanya besar di lightbox.
   */
  visual: 'approval' | 'architecture' | 'image' | 'placeholder'
  images?: { dark: string, light: string }
  links?: { demo?: string, repo?: string }
}

export const FEATURED: Featured[] = [
  {
    id: 'finance',
    chips: ['Nuxt 4', 'TypeScript', 'Supabase', 'Cloudflare Workers', 'Claude API'],
    status: 'live',
    visual: 'image',
    images: { dark: '/images/finance/composite-dark.webp', light: '/images/finance/composite-light.webp' },
    links: { demo: 'https://money.ikrm.dev', repo: 'https://github.com/ikramattamimi/money-manager' },
  },
  {
    id: 'opnamix',
    chips: ['React 19', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    status: 'live',
    visual: 'image',
    images: { dark: '/images/opnamix/composite-dark.webp', light: '/images/opnamix/composite-light.webp' },
    links: { demo: 'https://opnamix.ikrm.dev', repo: 'https://github.com/ikramattamimi/opnamix' },
  },
]

/* ---------- navigasi flow (sisi kanan) ---------- */

/** Urutan section untuk navigasi flow: id elemen + kunci label (kicker section). */
export const FLOW: { id: string, label: string }[] = [
  { id: 'tentang', label: 'home.about.kicker' },
  { id: 'pengalaman', label: 'home.experience.kicker' },
  { id: 'proyek', label: 'home.projects.kicker' },
  { id: 'kontak', label: 'contact.kicker' },
]

/* ---------- bahasa ---------- */

/**
 * Tampilkan tombol ganti bahasa (topbar + sidebar). Selama `false`, situs tampil dalam bahasa
 * default (Inggris); versi Indonesia tetap ada di /id dan bisa dibuka lewat URL.
 */
export const LANG_SWITCH_ENABLED = false

/* ---------- blog (Fase 2) ---------- */

/**
 * Tampilkan blog ke pengunjung (link di topbar, sidebar, footer + halaman ikut dibuild & masuk sitemap).
 * Biarkan `false` sampai ada 3–5 artikel. Selama `false`, blog tetap bisa dibuka di mode dev (/blog).
 */
export const BLOG_ENABLED = false
