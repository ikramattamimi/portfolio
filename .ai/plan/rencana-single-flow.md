# Rencana Pengembangan — Portofolio Satu Alur

Dibuat: 2026-10-16
Branch: `redesign/single-flow` (dari `main`)
Dasar keputusan: [`doc/single-flow-decisions.md`](../../doc/single-flow-decisions.md)
Rencana sebelumnya: [`rencana-pengembangan.md`](rencana-pengembangan.md) (dual-mode, sudah selesai dan live)

Mode rekruter/klien digabung jadi satu alur: Hero → 01 Tentang → 02 Pengalaman → 03 Proyek → 04 Kontak. Pekerjaan dibagi per tahap. Tiap tahap bisa dikerjakan, dicek, dan di-commit sendiri.

---

## Status saat ini

- [x] Branch `redesign/single-flow` dibuat dari `main`
- [x] Catatan keputusan + draf teks ID (`doc/single-flow-decisions.md`)
- [x] Tahap 1–8 dikerjakan (2026-10-16)
- [ ] Draf teks ditinjau pemilik
- [ ] Data Inventory Management dari pemilik

**Konten yang perlu diisi pemilik:**

| Apa | File | Kunci / field |
|---|---|---|
| Deskripsi Inventory Management | `i18n/locales/{id,en}/home.json` | `home.projects.items.inventory.desc` |
| Teknologi Inventory | `app/data/portfolio.ts` | `FEATURED` → `inventory.chips` (sekarang kosong) |
| Screenshot RFA/PED/Inventory | `public/images/<proyek>/` + `app/data/portfolio.ts` | `visual: 'image'`, `images: [...]` |
| Link demo / repo | `app/data/portfolio.ts` | `FEATURED` → `links: { demo, repo }` |
| Status proyek (kalau sudah bisa dicoba) | `app/data/portfolio.ts` | `status: 'live'` |
| Angka pencapaian (mis. waktu muat PED) | `i18n/locales/{id,en}/home.json` | `home.jobs.gdi.points` |
| Foto diri (opsional) | `public/images/` + `app/data/portfolio.ts` | `PHOTO` |
| Teknologi di section Tentang | `app/data/portfolio.ts` | `TECH` |

---

## Rancangan struktur folder

```
app/
  components/
    hero/
      HeroSection.vue     # + nama, tombol Lihat proyek / Unduh CV
    sections/             # baru, menggantikan mode/recruiter + mode/client
      About.vue           # 01 Tentang (+ daftar teknologi, pendidikan)
      Experience.vue      # 02 Pengalaman (tab per perusahaan)
      Projects.vue        # 03 Proyek pilihan (3 unggulan)
    shared/
      ContactSection.vue  # 04 Kontak (teks disederhanakan)
    layout/
      Topbar.vue          # kiri: nama; kanan: Blog, ID/EN, CV, Hubungi, tema
    nav/
      SideFlow.vue        # satu daftar langkah
  composables/
    useReveal.ts          # baru: animasi masuk + scroll reveal (GSAP)
  data/portfolio.ts       # JOBS, FEATURED (RFA, PED, Inventory), TECH
i18n/locales/
  id/ common.json, home.json   # recruiter.json + client.json digabung jadi home.json
  en/ common.json, home.json
```

Dihapus: `components/gate/`, `components/mode/`, `composables/useMode.ts`, `plugins/mode.client.ts`, `assets/css/mode.css`, `MODE_INIT_SCRIPT`, `useModeSwitch`, `public/images/{trashclean,jayandra,salary-payment,accounting}`.

---

## Tahap 1. Bongkar dual-mode

**Tujuan:** halaman tampil satu alur tanpa gate, meskipun isinya masih konten lama.

- [x] Hapus `GateModeGate`, `GateModeToggle`, `useMode`, `plugins/mode.client.ts`, `MODE_INIT_SCRIPT` di `app.vue`, dan `mode.css`.
- [x] Hapus `definePageMeta({ gate: true })` dan semua cabang `route.meta.gate` (Topbar, Sidebar, layout, `useContactLink`). Link "Hubungi" selalu ke `#kontak`.
- [x] `?mode=` lama diabaikan: parameter dihapus dari URL dan kunci `localStorage` `mode` dibersihkan (`INIT_SCRIPT` di `<head>` + `plugins/legacy-mode.client.ts`). Sudah dites: `/?mode=rekruter` → `/`.
- [x] `FLOW` di `data/portfolio.ts` jadi satu daftar: `tentang`, `pengalaman`, `proyek`, `kontak`.
- [x] `NavSideFlow` tampil setelah hero (bukan setelah gate).

**Selesai bila:** halaman bisa di-scroll dari hero sampai footer tanpa memilih apa pun, tidak ada error di console, dan `nuxt generate` berhasil.

## Tahap 2. Topbar + hero

**Tujuan:** pengunjung langsung tahu siapa saya dalam satu layar pertama.

- [x] Topbar kiri: nama "Ikram Muhammad" (desktop) / "IM" (mobile), klik untuk scroll ke atas.
- [x] Topbar kanan desktop: Blog, ID/EN, tombol CV (garis, buka `CV.pdf`), Hubungi (merah), tema. Sidebar mobile: tambah link CV.
- [x] Hero: status → "Halo, saya" → **nama** (`h1`) → headline → paragraf → tombol "Lihat proyek" (ke `#proyek`) dan "Unduh CV".
- [x] Headline pindah dari `h1` ke elemen biasa; `h1` jadi nama (lebih baik untuk SEO nama).
- [x] Teks hero baru sesuai draf.

**Selesai bila:** layout rapi di 375 / 768 / 1440 px dan kubus tetap jalan.

## Tahap 3. 01 Tentang

- [x] `SectionsAbout`: 2–3 paragraf, daftar teknologi dua kolom (gaya ▹ seperti Brittany), baris pendidikan singkat (D3 Teknik Informatika, Polban 2020–2023).
- [x] Slot foto di kanan (kalau pemilik memutuskan pakai foto; kalau tidak, kolom teks melebar).
- [x] Hapus `ModeRecruiterSkills` dan `ModeRecruiterCv`. Statistik CV ("2+ tahun", "7 sistem") tidak dipakai lagi.

**Selesai bila:** section terbaca dalam < 30 detik dan tidak ada elemen interaktif yang wajib diklik.

## Tahap 4. 02 Pengalaman

- [x] `SectionsExperience`: tab per perusahaan (GDI, Lapi Divusi). Desktop: daftar tab vertikal di kiri, isi di kanan. Mobile: tab horizontal yang bisa digeser.
- [x] Isi tiap tab: peran · perusahaan, tanggal, 2–3 poin pencapaian, daftar teknologi satu baris.
- [x] Aksesibilitas tab: `role="tablist"`, panah kiri/kanan/atas/bawah, `aria-selected`, panel `role="tabpanel"`. Semua panel tetap ada di HTML (SEO), yang tidak aktif `hidden`.
- [x] Hapus kartu kasus, baris promosi, kotak "wins", dan "Detail teknis" (masalah/solusi/diagram). Komponen diagram disimpan untuk Tahap 5.

**Selesai bila:** tab bisa dioperasikan dengan keyboard dan teks semua perusahaan ada di HTML hasil generate.

## Tahap 5. 03 Proyek pilihan

- [x] Data `FEATURED` di `data/portfolio.ts`: `rfa`, `ped`, `inventory` dengan `chips`, `links` (demo, repo — opsional), `visual` (`diagram-approval` | `diagram-architecture` | `image` | `placeholder`), `status` (`live` | `dev`).
- [x] `SectionsProjects`: layout ala Brittany. Visual besar di satu sisi, kartu teks yang menumpuk sedikit di atasnya, posisi selang-seling kiri/kanan. Mobile: visual jadi latar redup di belakang teks.
- [x] Isi kartu: label kecil ("Proyek unggulan" / "Sedang dikembangkan"), nama, deskripsi, teknologi, ikon link.
- [x] Visual sementara: diagram alur persetujuan (RFA), diagram arsitektur (PED), placeholder (Inventory). Siap diganti screenshot lewat `UiLightbox` yang sudah ada.
- [x] Hapus `ModeRecruiterProjects`, `ModeClientResults`, `IotDemo`, `SalaryDemo`, dan folder gambar proyek lama (termasuk screenshot akuntansi yang memuat data rekening).

**Selesai bila:** tiga proyek tampil rapi di 375 / 768 / 1440 px dan tidak ada sisa referensi ke proyek lama (`grep trashclean|smarthome|salary|accounting` kosong).

## Tahap 6. 04 Kontak + footer

- [x] Judul dan pengantar baru, baris layanan freelance.
- [x] Formulir: hapus label "Permohonan baru" / "DRAF", "Jenis permohonan" → "Jenis pesan". Jenis default: "Sekadar bertanya" (tidak lagi mengikuti mode).
- [x] Hapus `ModeClientServices`, `ModeClientProcess`, `ModeClientStart`, dan testimoni (`SHOW_TESTIMONIALS`).

## Tahap 7. Animasi masuk + scroll reveal

- [x] ~~`useReveal` (GSAP)~~ → **tanpa GSAP**. Animasi pembuka topbar + hero memakai CSS keyframes (`intro-down` / `intro-up` di `base.css`, stagger 70/90 ms, total ±1,2 detik), jadi teks hero tidak menunggu chunk JavaScript. `useReveal` hanya IntersectionObserver + transisi CSS. GSAP tidak dipakai lagi dan dihapus dari dependency.
- [x] Scroll reveal per section dan per item (IntersectionObserver, sekali jalan).
- [x] Status awal tersembunyi hanya lewat `html.js` supaya tanpa JS konten tetap tampil, dan teks hero (LCP) tidak tertunda lebih dari animasinya.
- [x] `prefers-reduced-motion`: semua langsung tampil.

**Selesai bila:** tidak ada kedipan konten saat dimuat, CLS tetap 0, LCP tidak naik lebih dari 0,2 detik dibanding sekarang.

## Tahap 8. Teks EN, SEO, pembersihan

- [x] Gabung `recruiter.json` + `client.json` → `home.json` (ID & EN). Hapus kunci yang tidak dipakai.
- [x] Terjemahan EN untuk semua teks baru. *Dibuat sebelum versi ID ditinjau; ikut disesuaikan kalau teks ID berubah.*
- [x] Meta description baru di `common.json`. Data terstruktur `Person` tetap.
- [x] Hapus kode mode di `useActiveSection`, `SideFlow`, `utils/gsap.ts` yang tidak terpakai.
- [x] Perbarui `README.md` (bagian fitur & cara mengubah konten) dan tandai `doc/redesign-decisions.md` sebagai digantikan.
- [ ] Lighthouse mobile: target sama seperti sebelumnya (Performance ≥ 92, A11y/BP/SEO 100). *Belum dijalankan.*
- [ ] Tes manual di 375 / 768 / 1440 px, tema gelap & terang, ID & EN, tanpa JS. **Sudah:** build statis di panel browser (Chromium) lebar ±1024 px dan 375 px, tema gelap & terang, keyboard tab pengalaman, tanpa scroll horizontal, tanpa error console; teks ID & EN dicek di HTML hasil generate. **Belum:** 768 px, 1440 px, tampilan EN di browser, tanpa JS, Firefox/Safari.

## Tahap 9. Rilis

- [ ] Review akhir oleh pemilik.
- [ ] Merge ke `main`, lalu build & deploy ke Cloudflare (`wrangler.jsonc`).
- [ ] **Catatan:** screenshot akuntansi yang berisi data rekening masih ada di riwayat git dan di situs live sampai deploy ini. Kalau datanya asli, pertimbangkan menurunkan gambarnya lebih dulu lewat hotfix kecil di `main`, tanpa menunggu tahap ini.

---

## Risiko & mitigasi

| Risiko | Mitigasi |
|---|---|
| Deskripsi Inventory Management belum ada | Tahap 5 tetap jalan dengan placeholder, teks diisi belakangan |
| RFA/PED milik klien GDI (kerahasiaan) | Pakai diagram dan data contoh, tanpa nama klien atau screenshot asli sampai ada izin / versi buatan ulang |
| Bagian Proyek terasa kosong karena belum ada screenshot | Diagram yang sudah ada dipakai sebagai visual, dan status "Sedang dikembangkan" ditulis jujur |
| Link `?mode=` lama di lamaran kerja | Parameter diabaikan, halaman tetap terbuka normal |
| Animasi pembuka memperlambat LCP | Tanpa loader, teks hero sudah ada di HTML, animasi hanya opacity/transform |

---

## Pertanyaan terbuka

- Detail Inventory Management (untuk siapa, masalah, fitur, teknologi, status).
- RFA & PED: dibuat ulang sebagai proyek pribadi, atau tetap aplikasi klien?
- Pakai foto diri di section Tentang atau tidak.
- Angka pencapaian untuk poin pengalaman.
