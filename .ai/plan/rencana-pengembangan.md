# Rencana Pengembangan — Portofolio Dual-Mode (Nuxt)

Dibuat: 2026-10-15
Branch: `redesign/nuxt-dual-mode`
Dasar keputusan: [`doc/redesign-decisions.md`](../../doc/redesign-decisions.md)

Rencana ini membagi pekerjaan menjadi **Fase 1 (redesign dual-mode)** dan **Fase 2 (blog)**. Fase 1 dipecah lagi menjadi tahap-tahap kecil. Tiap tahap bisa dikerjakan, dicek, dan di-commit sendiri.

---

## Status saat ini

- [x] Catatan keputusan redesign (`doc/redesign-decisions.md`)
- [x] Scaffold Nuxt 4 di root repo
- [x] Dependency: `@nuxtjs/i18n`, `gsap`, `@tresjs/nuxt`, `@tresjs/core`, `three`, `@dimforge/rapier3d-compat`
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
      CubeField.client.vue   # TresJS + Rapier, hanya di client
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

- [ ] `HeroSection` dengan headline A dan subjudul (ID/EN).
- [ ] `CubeField.client.vue`:
  - [ ] Scene TresJS dengan kamera ortografis/perspektif, kubus wireframe (`EdgesGeometry`) yang berputar.
  - [ ] Rapier: kubus sebagai rigid body, dinding batas viewport, dan pointer sebagai body *kinematic* yang mendorong kubus. Kubus saling bertabrakan.
  - [ ] Ukuran ±1 × 1 cm (±38 px). Jumlah: sedikit di mobile, lebih banyak di desktop.
  - [ ] Mobile: kubus melayang pelan tanpa interaksi pointer.
  - [ ] `prefers-reduced-motion`: kubus diam (atau tidak dirender).
  - [ ] Simulasi berhenti saat hero tidak terlihat (IntersectionObserver) dan saat tab disembunyikan.
  - [ ] Bundle Three.js dan Rapier di-*lazy load* supaya tidak memperlambat render awal.
- [ ] Warna garis kubus mengikuti tema.

**Selesai bila:** animasi stabil di 60 fps di laptop biasa, tidak ada error di console, dan teks hero sudah tampil di HTML hasil generate.

### Tahap 4. Gate pilihan mode

**Tujuan:** alur memilih mode berjalan lengkap.

- [ ] `useMode`:
  - Urutan prioritas: `?mode=rekruter|klien` → `localStorage` → belum memilih.
  - Mode dari `?mode` juga disimpan ke `localStorage`.
- [ ] `ModeGate`: section satu layar penuh dengan dua kartu.
- [ ] Scroll dikunci di gate sampai pengunjung memilih (`useScrollLock`). Hero tetap bisa dilihat.
- [ ] Animasi GSAP Flip: kartu yang dipilih berpindah ke posisi `ModeToggle` di topbar, lalu kartu lainnya menghilang.
- [ ] Kalau mode sudah ada (dari deep link atau `localStorage`), gate tidak ditampilkan dan toggle langsung tampil di topbar.
- [ ] Gate bisa dipakai dengan keyboard, dan kedua kartu punya label yang jelas.
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

- [ ] Komponen section untuk tiap mode, dengan teks dari file locale.
- [ ] Teks baru: layanan, cara mulai, dan versi "hasil bisnis" dari tiap proyek, dalam ID dan EN.
- [ ] Galeri screenshot proyek (Trashclean, Smart Home/Jayandra, Salary Payment, Akuntansi).
- [ ] **Konten kedua mode dirender di HTML** (SSR/generate). Yang tidak aktif disembunyikan di client (lihat [Keputusan SEO](#keputusan-seo-konten-mode)).
- [ ] Animasi pergantian mode: konten lama keluar dan konten baru masuk dari arah berlawanan, ditambah stagger (GSAP). Setelah berganti, scroll kembali ke awal konten.
- [ ] `ContactSection` + `LayoutFooter` dipakai di kedua mode.

**Selesai bila:** semua konten situs lama sudah punya tempat di mode yang tepat, dan pergantian mode berjalan mulus tanpa layout melompat.

### Tahap 6. Navigasi flow di sisi kanan

- [ ] `useActiveSection`: menentukan section yang sedang terlihat.
- [ ] `SideFlow` desktop: stepper vertikal di kanan. Klik satu langkah untuk lompat ke section, dan langkah aktif mengikuti scroll. Isi langkahnya berbeda per mode.
- [ ] `SideFlow` mobile: garis progres tipis.
- [ ] Gaya visual (keputusan masih terbuka). Usulan awal: dibuat mirip langkah persetujuan (lingkaran bernomor + garis), agar senada dengan tema situs.

**Selesai bila:** navigasi bisa diklik dan dioperasikan dengan keyboard, langkah aktif selalu akurat, dan elemen ini tidak menutupi konten.

### Tahap 7. SEO, aksesibilitas, performa

- [ ] Meta per bahasa: title, description, Open Graph, `hreflang`, canonical.
- [ ] Pastikan HTML hasil generate memuat konten **kedua mode** (cek `.output/public/index.html` dan `/en/index.html`).
- [ ] Data terstruktur schema.org untuk `Person`.
- [ ] Sitemap + robots (bisa lewat `@nuxtjs/seo`, yang toh dipakai lagi di Fase 2).
- [ ] Audit aksesibilitas: kontras warna di kedua tema, fokus keyboard, label ARIA, `prefers-reduced-motion`.
- [ ] Lighthouse di mobile: target Performance ≥ 90, SEO dan Accessibility ≥ 95.
- [ ] Gambar dioptimasi (`@nuxt/image` atau konversi manual ke WebP).

### Tahap 8. Pembersihan & persiapan rilis

- [ ] Hapus situs lama (`index.html`, `images/` di root) setelah semua konten dimigrasi.
- [ ] Perbarui `README.md`: cara menjalankan, build, dan struktur.
- [ ] Tes manual menyeluruh: Chrome, Firefox, Safari/iOS, Android.
- [ ] Merge ke `main`.
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
| Three.js + Rapier memperberat halaman | Lazy load, hanya dimuat di client, dan render awal tetap berupa teks |
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

- Gaya visual navigasi flow di sisi kanan.
- Tombol reset pilihan mode (draf ide, ditunda).
