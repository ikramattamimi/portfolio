/*
 * Data struktur portofolio (bukan teks). Semua teks ada di i18n/locales/{id,en}/
 * dengan kunci yang sama dengan `id` di sini.
 */

export const CONTACT = {
  whatsapp: '6287778328502',
  whatsappLabel: '+62 8777 832 8502',
  email: 'attamimiikram@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ikram-attamimi',
  linkedinLabel: 'ikram-attamimi',
  github: 'https://github.com/ikramattamimi',
  githubLabel: '@ikramattamimi',
}

export const CV_URL = '/doc/CV.pdf'

/* ---------- pengalaman kerja ---------- */

export type CaseId = 'rfa' | 'ped' | 'lapiApp'

export interface Job {
  id: 'gdi' | 'lapi'
  active: boolean
  cases: CaseId[]
}

export const JOBS: Job[] = [
  { id: 'gdi', active: true, cases: ['rfa', 'ped'] },
  { id: 'lapi', active: false, cases: ['lapiApp'] },
]

export interface WorkCase {
  chips: string[]
  /** Punya bagian "Detail teknis" (masalah/solusi + diagram). */
  diagram?: 'approval' | 'architecture'
  /** Punya baris perubahan peran (promosi). */
  promo?: boolean
}

export const CASES: Record<CaseId, WorkCase> = {
  rfa: { chips: ['ASP.NET 4.8', 'Vue 3', 'Kendo Vue', 'SQL Server', 'AWS S3', 'OWIN'], diagram: 'approval', promo: true },
  ped: { chips: ['ASP.NET 4.8', 'Vue 3', 'Kendo Vue', 'SQL Server', 'Clean Architecture', 'Kanban'], diagram: 'architecture' },
  lapiApp: { chips: ['Laravel', 'Bootstrap', 'PostgreSQL'] },
}

/* ---------- proyek freelance ---------- */

export type ProjectId = 'trashclean' | 'smarthome' | 'salary' | 'accounting'

export interface Project {
  id: ProjectId
  chips: string[]
  gallery: { dir: string, files: (number | string)[] }
  /** Gambar sampul (nama file di folder galeri). Tanpa sampul: kartu tanpa gambar. */
  cover?: number | string
  /** Demo interaktif di mode klien. */
  demo?: 'iot' | 'salary'
  /** Lebar kolom di grid 6 kolom (mode klien). */
  span: 2 | 3 | 4
}

export const PROJECTS: Project[] = [
  { id: 'trashclean', chips: ['Laravel', 'Bootstrap', 'MySQL'], gallery: { dir: 'trashclean', files: [1, 9, 2, 3, 4, 5, 6, 7, 8] }, cover: 1, span: 4 },
  { id: 'smarthome', chips: ['Flutter', 'MQTT', 'Firebase'], gallery: { dir: 'jayandra', files: [1, 2, 3, 4, 5, 6, 7, 8, 9] }, demo: 'iot', span: 2 },
  { id: 'salary', chips: ['Laravel', 'Excel', 'SMTP'], gallery: { dir: 'salary-payment', files: [1, 2, 3, 4, 5] }, demo: 'salary', span: 3 },
  { id: 'accounting', chips: ['Laravel', 'Chart.js', 'MySQL'], gallery: { dir: 'accounting', files: [0, 1, 2, 3, 4, 5, 6, 7, 8] }, cover: 0, span: 3 },
]

export function galleryImages(p: Project) {
  return p.gallery.files.map((f) => `/images/${p.gallery.dir}/${f}.png`)
}

/* ---------- keahlian ---------- */

/** Tempat sebuah teknologi dipakai: kasus kerja atau proyek freelance. */
export type UsedIn = CaseId | ProjectId

export const SKILLS: { group: string, items: [string, UsedIn[]][] }[] = [
  { group: 'Frontend', items: [['Vue.js', ['rfa', 'ped']], ['Kendo Vue', ['rfa', 'ped']], ['Bootstrap', ['trashclean', 'lapiApp']], ['Chart.js', ['accounting']], ['HTML/CSS/JS', ['rfa', 'ped', 'trashclean', 'salary', 'accounting', 'lapiApp']]] },
  { group: 'Backend', items: [['ASP.NET', ['rfa', 'ped']], ['Laravel', ['trashclean', 'salary', 'accounting', 'lapiApp']], ['PHP', ['trashclean', 'salary', 'accounting', 'lapiApp']], ['Node.js', []]] },
  { group: 'Mobile', items: [['Flutter', ['smarthome']], ['Dart', ['smarthome']]] },
  { group: 'Database', items: [['SQL Server', ['rfa', 'ped']], ['PostgreSQL', ['lapiApp']], ['MySQL', ['trashclean', 'accounting']]] },
  { group: 'Cloud & Tools', items: [['AWS S3', ['rfa', 'ped']], ['Firebase', ['smarthome']], ['MQTT', ['smarthome']], ['Jira', ['rfa', 'ped']], ['Git', ['rfa', 'ped', 'trashclean', 'salary', 'accounting', 'smarthome']]] },
]

/** Id elemen tujuan di mode rekruter untuk sebuah kasus/proyek. */
export function recruiterAnchor(id: UsedIn) {
  return id in CASES ? `kasus-${id}` : `r-${id}`
}

/* ---------- CV ---------- */

export const CV_STATS = [
  { value: '2+', key: 'years' },
  { value: '7', key: 'systems' },
  { value: '15+', key: 'tech' },
] as const

/* ---------- testimoni ---------- */

/** Ubah ke true kalau sudah ada testimoni sungguhan (teks di client.json → testimonials.items). */
export const SHOW_TESTIMONIALS = false

/* ---------- navigasi flow (sisi kanan) ---------- */

/** Urutan section per mode untuk navigasi flow: id elemen + kunci label (kicker section). */
export const FLOW: Record<'rekruter' | 'klien', { id: string, label: string }[]> = {
  rekruter: [
    { id: 'pengalaman', label: 'recruiter.experience.kicker' },
    { id: 'proyek', label: 'recruiter.projects.kicker' },
    { id: 'keahlian', label: 'recruiter.skills.kicker' },
    { id: 'cv', label: 'recruiter.cv.kicker' },
    { id: 'kontak', label: 'contact.kicker' },
  ],
  klien: [
    { id: 'layanan', label: 'client.services.kicker' },
    { id: 'hasil', label: 'client.results.kicker' },
    { id: 'alur', label: 'client.process.kicker' },
    { id: 'mulai', label: 'client.start.kicker' },
    { id: 'kontak', label: 'contact.kicker' },
  ],
}
