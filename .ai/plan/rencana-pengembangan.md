# Rencana Pengembangan — Portofolio Dual-Mode (Nuxt)

Dibuat: 2026-10-15
Branch: `redesign/nuxt-dual-mode`
Dasar keputusan: [`doc/redesign-decisions.md`](../../doc/redesign-decisions.md)

Rencana ini membagi pekerjaan menjadi **Fase 1 (redesign dual-mode)** dan **Fase 2 (blog)**. Fase 1 dipecah lagi menjadi tahap-tahap kecil. Tiap tahap bisa dikerjakan, dicek, dan di-commit sendiri.

---

## Status saat ini

- [x] Catatan keputusan redesign (`doc/redesign-decisions.md`)
- [x] Scaffold Nuxt 4 di root repo
- [x] Dependency: `@nuxtjs/i18n`, `gsap`, `@tresjs/nuxt`, `@tresjs/core`, `three`, `@nuxtjs/color-mode`, `@nuxt/fonts` (Rapier dihapus, lihat Tahap 3)
- [x] i18n ID (tanpa prefix) / EN (`/en`) berjalan, `nuxt generate` berhasil
- [ ] Situs lama (`index.html`, `images/`) masih di root, belum dimigrasi

---

## Rancangan struktur folder

```
app/
  assets/css/
    tokens.css          # variabel warna terang/gelap dari situs lama
    base.css            # reset, tipografi, utilitas
  components/
    layout/
      Topbar.vue        # desktop: toggle mode, Blog*, ID/EN, Hubungi, tema
      Sidebar.vue       # mobile: ID/EN, Hubungi, Blog*
      Footer.vue
    hero/
      HeroSection.vue
      CubeField.client.vue   # TresJS + physics sendiri, hanya di client
    gate/
      ModeGate.vue      # pilihan Rekruter / Klien satu layar penuh
      ModeToggle.vue    # toggle teks di topbar (target animasi Flip)
    mode/
      RecruiterView.vue
      ClientView.vue
      sections/         # section-section per mode
    nav/
      SideFlow.vue      # stepper kanan (desktop) / garis progres (mobile)
    shared/
      ContactSection.vue
    ui/
      CustomCursor.client.vue
  composables/
    useMode.ts          # state mode: ?mode, localStorage, gate
    useScrollLock.ts
    useActiveSection.ts # section aktif untuk SideFlow
  pages/
    index.vue
i18n/locales/
  id/ common.json, recruiter.json, client.json
  en/ common.json, recruiter.json, client.json
public/
  images/…            # dipindah dari images/
  doc/CV.pdf
```

`*` Link Blog baru muncul di Fase 2.

**Konvensi nama komponen:** tidak memakai prefix `The`. Pengelompokan cukup lewat folder, dan Nuxt otomatis menambahkan nama folder sebagai prefix. Contoh: `layout/Topbar.vue` → `<LayoutTopbar>`, `nav/SideFlow.vue` → `<NavSideFlow>`. Kalau nama file sudah diawali nama foldernya, Nuxt tidak menggandakannya, jadi `hero/HeroSection.vue` → `<HeroSection>`.

---

## Fase 1 — Redesign dual-mode

### Tahap 1. Fondasi desain

**Tujuan:** tampilan dasar (warna, font, tema) sudah sama dengan situs lama.

- [x] Pindahkan design token dari `index.html` lama ke `tokens.css`, yaitu variabel `--bg`, `--ink`, `--red`, dan lainnya, beserta varian `[data-theme="light"]`. Reset dan utilitas ada di `base.css`.
- [x] Font: Plus Jakarta Sans + JetBrains Mono lewat `@nuxt/fonts` (di-host sendiri). Caveat tidak dipakai lagi.
- [x] Toggle tema dark/light (`UiThemeToggle`) memakai `@nuxtjs/color-mode`: tema gelap default, disimpan di `localStorage` (`theme`), dan tidak ada kedipan saat halaman dimuat.
- [x] Salin `images/` ke `public/images/` dan `doc/CV.pdf` ke `public/doc/`. File aslinya dihapus di Tahap 8.
- [x] Pecah file locale per bagian (`common`, `recruiter`, `client`).
- [x] Atribut `lang` dan link `hreflang` mengikuti bahasa aktif (`useLocaleHead`).

**Selesai bila:** halaman kosong sudah memakai warna dan font yang benar di kedua tema, dan pergantian tema tidak berkedip.

### Tahap 2. Kerangka layout

**Tujuan:** topbar, sidebar, dan footer jadi, meskipun kontennya masih kosong.

- [x] `LayoutTopbar` desktop: toggle mode di kiri; ID/EN, Hubungi, tema di kanan. Tanpa logo/nama, sesuai keputusan topbar.
- [x] `LayoutTopbar` mobile (< 768 px): kiri tombol sidebar, tengah toggle mode (teks), kanan tema.
- [x] `LayoutSidebar` mobile: ID/EN, Hubungi. Tutup dengan tombol, klik di luar, atau Esc. Fokus keyboard tetap di dalam sidebar, lalu kembali ke tombol menu saat ditutup. Scroll halaman dikunci selama terbuka, dan sidebar otomatis tertutup saat layar melebar ke desktop.
- [x] `LayoutFooter`: © tahun, lokasi, Email/LinkedIn/GitHub.
- [x] `UiCustomCursor`: kotak kecil merah yang berputar 45° saat hover di elemen interaktif. Nonaktif di perangkat sentuh dan di kolom teks. Tanpa jeda gerak bila `prefers-reduced-motion`.
- [x] Pendukung: layout `default.vue`, skip link "Lewati ke konten", `UiLangSwitch`, `GateModeToggle` + `useMode` (versi state saja; `?mode`, `localStorage`, dan gate ditambahkan di Tahap 4), `useSidebar`.

**Selesai bila:** layout responsif di 375 px, 768 px, dan 1440 px, dan sidebar bisa dioperasikan dengan keyboard.

### Tahap 3. Hero + kubus wireframe

**Tujuan:** hero netral dengan animasi kubus fisik.

- [x] `HeroSection` dengan status "Terbuka untuk kerja & freelance", headline A, dan subjudul (ID/EN). Tinggi hero satu layar dikurangi topbar.
- [x] `HeroCubeField` (`CubeField.client.vue`) + `HeroCubeScene`:
  - [x] Scene TresJS dengan kamera ortografis (1 unit = 1 px CSS) dan kubus wireframe yang berputar 3D. Garisnya tebal (`LineSegments2`) supaya tidak terlalu tipis di layar retina. Sekitar 1 dari 8 kubus berwarna aksen merah.
  - [x] ~~Rapier~~ → **physics sendiri** (`utils/cubePhysics.ts`): tabrakan antar-kubus, pantulan di batas hero, dan pointer yang mendorong/melempar kubus. Kubus selalu kembali ke kecepatan melayang. Sudah dites dengan skrip Node.
  - [x] Ukuran ±1 × 1 cm (38 px). Jumlah: 7 di mobile, 12–28 di desktop (tergantung luas hero).
  - [x] Mobile/layar sentuh: kubus melayang lebih pelan tanpa interaksi pointer.
  - [x] `prefers-reduced-motion`: kubus dirender diam (satu frame, lalu loop berhenti).
  - [x] Simulasi dan render berhenti saat hero tidak terlihat (IntersectionObserver) dan saat tab disembunyikan.
  - [x] Three.js dimuat lazy setelah browser idle (chunk terpisah ±225 KB gzip, hanya di-*prefetch*), dan kanvas muncul dengan fade-in.
- [x] Warna garis kubus mengikuti tema (`--ink-3` dan `--red`).

**Selesai bila:** animasi stabil di 60 fps di laptop biasa, tidak ada error di console, dan teks hero sudah tampil di HTML hasil generate.

### Tahap 4. Gate pilihan mode

**Tujuan:** alur memilih mode berjalan lengkap.

- [x] Penentuan mode:
  - Urutan prioritas: `?mode=rekruter|klien` (alias EN `recruiter|client` juga diterima) → `localStorage` → belum memilih.
  - Mode dari `?mode` juga disimpan ke `localStorage`, lalu parameternya dihapus dari URL.
  - Ditentukan oleh **script inline di `<head>`** (`MODE_INIT_SCRIPT`) yang memasang `<html data-mode>` sebelum halaman digambar, jadi tidak ada kedipan. State `useMode` disalin dari atribut itu setelah hydration (`plugins/mode.client.ts`).
- [x] `GateModeGate`: section satu layar penuh dengan judul "Apa yang Anda cari?" dan dua kartu (Pengalaman & CV / Proyek & layanan).
- [x] Scroll terkunci di gate: selama belum memilih, semua yang ada di bawah gate (konten mode, kontak, footer) disembunyikan lewat CSS (`mode.css`), jadi halaman berakhir di gate. Cara ini tidak membajak scroll, jadi `useScrollLock` tidak diperlukan.
- [x] Animasi: salinan kartu (`position: fixed`) diterbangkan dengan `Flip.fit` ke tombol mode di topbar, isi kartu memudar, dan label tombol muncul. Setelah itu toggle tampil, halaman lompat ke awal konten, konten masuk dengan fade, dan fokus pindah ke konten. Tanpa animasi kalau `prefers-reduced-motion`.
- [x] Kalau mode sudah ada (dari deep link atau `localStorage`), gate tidak ditampilkan dan toggle langsung tampil, dengan tombol aktif yang benar sejak render pertama.
- [x] Kartu gate berupa `<button>` (bisa dipakai dengan keyboard), dan toggle memakai `aria-pressed`.
- [x] Link "Hubungi" sebelum mode dipilih mengarah ke gate, karena bagian kontak masih terkunci.
- [x] GSAP + Flip dimuat lazy saat gate hampir terlihat.
- [ ] *(Draf ide, belum dikerjakan)* tombol reset pilihan mode.

**Selesai bila:** ketiga jalur sudah dites (kunjungan pertama, `?mode=rekruter`, kunjungan ulang), dan animasinya mulus di desktop maupun mobile.

### Tahap 5. Konten tiap mode + pergantian mode

**Tujuan:** isi lengkap untuk mode rekruter dan klien.

Migrasi dari situs lama:

| Mode rekruter | Sumber lama | Mode klien | Sumber lama |
|---|---|---|---|
| Timeline pengalaman | `#experience` | Layanan | *baru* |
| Keahlian / tech stack | `#skills` | Alur kerja sama | `#process` |
| Studi kasus teknis | `#projects` (sudut pandang teknis) | Proyek sebagai hasil bisnis | `#projects` (sudut pandang bisnis) |
| Unduh CV, pendidikan | `#cv` | Testimoni, cara mulai | `#testimonials` (masih disembunyikan) |

Bagian bersama: **kontak** (`#contact`, formulir yang membuka WhatsApp/email) dan **footer**.

- [x] Komponen section untuk tiap mode, dengan teks dari file locale (`recruiter.json`, `client.json`). Data struktur (chip, galeri, pemetaan keahlian, kontak) ada di `app/data/portfolio.ts`.
  - **Rekruter** (`ModeRecruiter*`): 01 Pengalaman (kasus RFA/PED/Lapi + detail teknis Masalah/Solusi + diagram) → 02 Proyek (sudut teknis + galeri) → 03 Keahlian (klik teknologi → lompat ke kasus/proyek) → 04 CV (statistik, pendidikan & sertifikat dari CV.pdf, unduh PDF).
  - **Klien** (`ModeClient*`): 01 Layanan (4 layanan, *teks baru*) → 02 Hasil proyek (RFA/PED dari sisi bisnis + bento freelance dengan demo IoT & slip gaji) → 03 Alur kerja sama → 04 Cara mulai (WhatsApp / formulir). Testimoni sudah ada di kode, tapi disembunyikan lewat `SHOW_TESTIMONIALS` sampai ada kutipan sungguhan.
- [x] Teks baru dalam ID dan EN: layanan, cara mulai, deskripsi teknis tiap proyek. *Perlu ditinjau pemilik.*
- [x] Galeri screenshot proyek (`UiLightbox` + `useGallery`): Esc menutup, panah kiri/kanan berpindah gambar, dan fokus kembali ke tombol pembuka.
- [x] **Konten kedua mode dirender di HTML** (SSR/generate). Yang tidak aktif disembunyikan di client (lihat [Keputusan SEO](#keputusan-seo-konten-mode)). Sudah dicek: teks kedua mode ada di `index.html` dan `en/index.html`.
- [x] Animasi pergantian mode lewat toggle (`useModeSwitch`, GSAP): konten lama keluar dan konten baru masuk dari arah berlawanan, ditambah stagger per section. Setelah berganti, scroll kembali ke awal konten. Tanpa animasi kalau `prefers-reduced-motion`.
- [x] `SharedContactSection` + `LayoutFooter` dipakai di kedua mode. Jenis permohonan awal mengikuti mode (rekruter → tawaran kerja, klien → proyek freelance).
- [x] Perbaikan: pengalihan bahasa otomatis (`detectBrowserLanguage`) dimatikan karena menyebabkan hydration mismatch di situs statis.

**Selesai bila:** semua konten situs lama sudah punya tempat di mode yang tepat, dan pergantian mode berjalan mulus tanpa layout melompat.

### Tahap 6. Navigasi flow di sisi kanan

- [x] `useActiveSection`: section aktif adalah yang sudah melewati tengah layar, ditambah progres baca (0–100%) dan status "sedang di dalam konten". Diukur langsung di handler scroll, tanpa `requestAnimationFrame`.
- [x] `NavSideFlow` (≥ 1280 px): stepper vertikal di kanan dengan langkah per mode (`FLOW` di `data/portfolio.ts`): 5 langkah termasuk Kontak. Gaya langkah persetujuan: lewat = ✓ hijau, aktif = cincin amber, berikutnya = abu-abu. Label muncul saat stepper disentuh atau difokus. Area klik hanya sebesar bulatan, jadi tidak menutupi konten. Klik untuk lompat ke section, dan `aria-current="location"` menandai langkah aktif.
- [x] `NavSideFlow` (< 1280 px): garis progres merah 3 px tepat di bawah topbar (`role="progressbar"`).
- [x] Hanya tampil saat sedang membaca konten mode (tersembunyi di hero dan gate), dan ikut berganti saat mode diganti.
- [ ] Gaya visual final masih perlu ditinjau pemilik.
- [ ] Gaya visual (keputusan masih terbuka). Usulan awal: dibuat mirip langkah persetujuan (lingkaran bernomor + garis), agar senada dengan tema situs.

**Selesai bila:** navigasi bisa diklik dan dioperasikan dengan keyboard, langkah aktif selalu akurat, dan elemen ini tidak menutupi konten.

### Tahap 7. SEO, aksesibilitas, performa

- [x] Meta per bahasa (`app.vue`, teks di `common.json` → `meta`): title, description, Open Graph, Twitter card. `hreflang`, canonical, dan `og:url` dari `useLocaleHead`.
  - **Butuh domain:** URL absolut diambil dari `NUXT_PUBLIC_SITE_URL` saat build (mis. `NUXT_PUBLIC_SITE_URL=https://domainmu.com npm run generate`). Tanpa variabel ini, build tetap jalan, tapi canonical/hreflang tidak absolut dan sitemap tidak dibuat.
- [x] HTML hasil generate memuat konten **kedua mode** (dicek di `index.html` dan `en/index.html`).
- [x] Data terstruktur schema.org `Person` (JSON-LD).
- [x] Sitemap + robots lewat `@nuxtjs/sitemap` dan `@nuxtjs/robots` (lebih ringan daripada `@nuxtjs/seo`). Sitemap per bahasa, aktif hanya kalau `NUXT_PUBLIC_SITE_URL` diisi.
- [x] Audit kontras: semua pasangan teks/latar di kedua tema ≥ 4,5:1. Token disesuaikan: `--ink-3`, `--red`, `--green`, `--amber`, `--blue`, ditambah `--red-strong` untuk latar merah dengan teks putih. Teks di atas hijau terang memakai `--bg`.
- [x] Fokus keyboard, label ARIA, dan `prefers-reduced-motion` sudah dicek. Lighthouse Accessibility 100.
- [x] Lighthouse mobile (build statis, server dengan kompresi): Performance 94–95, Accessibility 100, Best Practices 100, SEO 100. LCP 2,4–2,6 dtk, CLS 0. Halaman dengan `?mode=` 92–94.
  - Perbaikan performa: `nitro.compressPublicAssets` (salinan .gz/.br), preload font Plus Jakarta Sans, prefetch chunk lazy dimatikan, kubus baru dimuat setelah `load` + idle.
- [x] Gambar dikonversi ke WebP (`npm run images`, `scripts/optimize-images.mjs` dengan sharp): 3,2 MB → 846 KB.
- [x] Perbaikan hydration: sinkronisasi mode dipindah ke `app:suspense:resolve`, dan `NavSideFlow` dibungkus `<ClientOnly>`.
- [ ] Gambar Open Graph (pratinjau saat link dibagikan) belum ada.

### Tahap 8. Pembersihan & persiapan rilis

- [x] Hapus situs lama (`index.html`, `images/` di root, `doc/CV.pdf` yang sudah ada di `public/doc/`). Versi lama tetap ada di riwayat git.
- [x] Perbarui `README.md`: fitur, tech stack, cara menjalankan & build (`NUXT_PUBLIC_SITE_URL`), struktur, cara mengubah konten.
- [ ] Tes manual menyeluruh. Sudah: Chromium (panel browser + Edge headless), viewport 375/768/1440. **Belum:** Firefox, Safari/iOS, perangkat Android sungguhan, dan kelancaran animasi (gate → topbar, ganti mode) di browser biasa.
- [ ] Merge ke `main`. **Ditunda sampai domain Hostinger siap** (keputusan 2026-10-15). Alasannya: situs lama live di GitHub Pages (`ikramattamimi.github.io/portfolio`) dari `index.html` di `main`, dan merge akan membuatnya rusak. Urutan saat domain siap: build dengan `NUXT_PUBLIC_SITE_URL`, upload `.output/public` ke Hostinger, cek, baru merge ke `main` dan matikan GitHub Pages.
- [ ] Deploy (ditunda): Hostinger, hosting statis dari `.output/public`.

---

## Fase 2 — Blog

Dimulai setelah Fase 1 dirilis. Blog baru ditampilkan setelah ada **3–5 artikel**.

- [ ] Pasang `@nuxt/content` (artikel Markdown di `content/blog/`).
- [ ] Halaman `/blog` (daftar artikel) dan `/blog/[slug]` (halaman baca).
- [ ] Artikel berbahasa Indonesia. Halaman EN hanya untuk artikel yang sudah diterjemahkan.
- [ ] Gate dan scroll lock **tidak** berlaku di halaman blog.
- [ ] Link Blog: topbar desktop (di kiri ID/EN), sidebar mobile, dan footer.
- [ ] SEO artikel: schema.org `Article`, gambar OG, masuk sitemap.
- [ ] Opsional: RSS feed.

---

## Risiko & mitigasi

| Risiko | Mitigasi |
|---|---|
| Three.js memperberat halaman | Lazy load, hanya dimuat di client, dan render awal tetap berupa teks |
| Scroll lock di gate membuat pengunjung frustrasi | Gate jelas dan cepat, deep link untuk rekruter, dan pilihan diingat |
| Konten mode tersembunyi tidak terbaca mesin pencari | Kedua mode dirender di HTML (lihat [Keputusan SEO](#keputusan-seo-konten-mode)) |
| Konten mode yang salah sempat berkedip saat halaman dimuat | Script inline kecil di `<head>` menentukan mode sebelum halaman digambar |
| Animasi Flip ke topbar rusak di ukuran layar tertentu | Tes di beberapa breakpoint, dan siapkan fallback crossfade sederhana |
| Teks baru (layanan, hasil bisnis) belum ada | Tulis draf lebih awal, paralel dengan Tahap 2–4 |

---

## Keputusan SEO konten mode

Diputuskan 2026-10-15: **konten kedua mode dirender di HTML hasil generate, lalu yang tidak aktif disembunyikan di client.** Dengan begitu mesin pencari membaca seluruh konten rekruter dan klien.

Cara penerapannya:

- `RecruiterView` dan `ClientView` selalu ada di HTML. Hanya visibilitasnya yang diatur, bukan dengan `v-if`.
- **Script inline kecil di `<head>`** membaca `?mode` / `localStorage` sebelum halaman digambar, lalu memasang atribut seperti `<html data-mode="rekruter">`. CSS menyembunyikan mode yang tidak aktif berdasarkan atribut ini, jadi tidak ada kedipan konten.
- Saat pengunjung belum memilih, konten kedua mode berada di bawah gate yang terkunci.
- Mode yang tidak aktif diberi `inert` (atau `aria-hidden` + tidak bisa difokus), supaya pembaca layar dan tombol Tab tidak masuk ke konten tersembunyi.
- **Tanpa JavaScript:** konten kedua mode ditampilkan berurutan dan gate disembunyikan. Ini sekaligus jadi fallback yang aman.
- Heading tiap mode tetap berstruktur rapi (satu `h1` di hero, `h2` per section), supaya HTML yang berisi dua mode tetap masuk akal bagi mesin pencari.

---

## Pertanyaan terbuka

- Gambar Open Graph untuk pratinjau link.

- Gaya visual navigasi flow di sisi kanan.
- Tombol reset pilihan mode (draf ide, ditunda).
