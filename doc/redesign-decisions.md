# Redesign: Mode Rekruter & Klien — Catatan Keputusan

Tanggal: 2026-10-14
Branch: `redesign/nuxt-dual-mode`

Konten untuk rekruter dan calon klien dipisah sepenuhnya. Pengunjung memilih mode dulu, lalu hanya konten untuk mode itu yang ditampilkan.

---

## 1. Alur masuk & gate pilihan mode

- **Topbar tanpa menu navigasi.**
  - **Mobile:** kiri tombol **sidebar**, tengah **toggle mode** (berupa teks, bukan ikon), kanan tombol **tema** (dark/light). Tombol ID/EN dan "Hubungi" pindah ke dalam sidebar.
  - **Desktop:** semua elemen tampil di topbar (toggle mode, ID/EN, "Hubungi", tombol tema), tanpa sidebar. Tata letak persisnya akan dicoba langsung saat implementasi.
- **Hero** tampil tanpa pilihan rekruter/klien.
- **Gate** = section berikutnya, setinggi satu layar penuh, berisi dua pilihan: *Rekruter* dan *Klien*.
- **Scroll dikunci** di gate sampai pengunjung memilih.
- **Animasi saat memilih.** Kartu yang diklik berpindah (FLIP / shared-element) ke topbar dan menjadi toggle mode.
- **Deep link `?mode=`.** Contoh: `?mode=rekruter` / `?mode=klien`. Gate dilewati dan mode langsung aktif. Link ini dipakai di lamaran kerja.
- **Pilihan disimpan di `localStorage`.** Kunjungan berikutnya langsung masuk ke mode terakhir.
- **Tombol reset** menghapus pilihan di `localStorage` supaya gate dan animasinya tampil lagi dari awal. *(Masih draf ide: letak dan bentuknya belum dipikirkan.)*

## 2. Konten per mode

- Konten rekruter dan klien **berbeda sepenuhnya**. Saat satu mode tampil, mode lainnya disembunyikan.
- **Ada animasi saat ganti mode**, misalnya konten lama keluar dan konten baru masuk dengan arah berlawanan, ditambah stagger.
- **Hero bersifat netral**, satu versi yang relevan untuk rekruter maupun klien. Lihat [draf headline](#draf-headline-hero) di bawah.
- **Bagian bersama** (tampil di kedua mode): hanya **kontak** dan **footer**.

Pembagian konten tiap mode (disetujui):

| Rekruter | Klien |
|---|---|
| Timeline pengalaman | Layanan |
| Keahlian / tech stack | Alur kerja sama |
| Proyek sebagai studi kasus teknis | Proyek sebagai hasil bisnis |
| Unduh CV, pendidikan | Testimoni, cara mulai |

### Navigasi "flow" di pinggir

- Di mode rekruter maupun klien ada **flow vertikal di pinggir layar**, seperti stepper alur kerja, yang menunjukkan urutan section dari atas ke bawah.
- Flow ini sekaligus jadi **navigasi**: klik satu langkah untuk lompat ke section tersebut, dan langkah yang aktif mengikuti posisi scroll.
- Langkah-langkahnya berbeda per mode, mengikuti section tiap mode.
- **Posisi:** di sisi **kanan** layar.
- **Mobile:** diciutkan menjadi **garis progres tipis** (versi awal, bisa dievaluasi lagi).
- Gaya visual belum ditentukan.

### Draf headline hero

Kata bertanda `[...]` diberi warna aksen merah, sama seperti "persetujuan" di desain sekarang.

**Keputusan: A dipakai.** Opsi B dan C disimpan sebagai arsip.

**A — Dipilih**
> ID: Saya mengubah proses manual jadi sistem yang `[berjalan sendiri]`.
> EN: I turn manual processes into systems that `[run themselves]`.

Subjudul: *Full-stack developer (ASP.NET · Vue · Laravel) di Bandung. Saya membangun aplikasi persetujuan dokumen, pelacakan izin, dan alur kerja internal, mulai dari kebutuhan bisnis sampai sistem jalan di produksi.*

Alasan: rekruter melihat kemampuan teknis (membangun sistem *end-to-end*), klien melihat manfaatnya (pekerjaan manual hilang).

**B**
> ID: Dari formulir kertas ke alur kerja `[digital]` yang rapi.
> EN: From paper forms to clean `[digital]` workflows.

Lebih konkret dan dekat dengan pengalaman nyata, tapi terasa sedikit lebih ke klien.

**C**
> ID: Saya membangun sistem yang membuat pekerjaan berjalan lebih `[cepat]`.
> EN: I build systems that make work move `[faster]`.

Paling dekat dengan headline sekarang (kata "persetujuan" dibuat lebih umum), tapi juga paling generik.

## 3. Animasi hero & pointer

- **Kartu "Formulir Permohonan" di hero dihapus** dan diganti animasi kubus.
- **Kubus wireframe 3D**: semua rusuk terlihat, kubus berputar.
- **Interaksi.** Mouse **mendorong** kubus, dan kubus **saling bertabrakan**.
- Catatan teknis yang disepakati sebagai arah:
  - **Mobile / perangkat sentuh:** kubus melayang pelan, jumlahnya sedikit, ukurannya sekitar 1 × 1 cm (±38 px CSS).
  - **Desktop:** ukuran kubus sama (±1 × 1 cm), jumlahnya lebih banyak daripada di mobile. Angka pastinya ditentukan saat implementasi.
  - Menghormati `prefers-reduced-motion`.
  - Animasi berhenti saat hero tidak terlihat di layar.
- **Pointer: kotak kecil yang berputar (45°) saat hover** di elemen interaktif. Di input teks dan perangkat sentuh, kursor bawaan tetap dipakai.

## 4. Tech stack

- **Nuxt** (static generate), dipilih demi SEO dan i18n.
- **i18n ID/EN** lewat `@nuxtjs/i18n`. `/` = Indonesia, `/en` = Inggris.
  - *Revisi 2026-10-15:* pengalihan otomatis berdasarkan bahasa browser dimatikan. Di situs statis, pengalihan itu baru terjadi di client, sehingga teks Indonesia sempat tampil lalu berganti (hydration mismatch). Bahasa dipilih lewat URL dan tombol ID/EN.
- **GSAP + plugin Flip** untuk animasi gate → topbar dan pergantian mode.
- **Three.js (via TresJS)** untuk kubus. **Physics ditulis sendiri** (`app/utils/cubePhysics.ts`).
  - *Revisi 2026-10-15:* Rapier awalnya dipilih, lalu dibatalkan karena ukurannya ±1,65 MB (gzip) hanya untuk efek dekoratif. Physics buatan sendiri cuma beberapa KB, dan untuk kubus ±1 cm hasilnya secara visual praktis sama.
- **Konten** di JSON/Markdown per mode dan per bahasa.
- **Deploy:** ditunda. Kemungkinan pakai server dan domain di Hostinger.

## 5. Blog (fase 2)

Tujuannya mendongkrak SEO. Blog **dikerjakan di fase 2**, setelah redesign dual-mode selesai.

- **URL:** `/blog` di domain yang sama, bukan subdomain.
- **Bahasa:** artikel ditulis dalam **bahasa Indonesia dulu**. Terjemahan EN menyusul untuk artikel tertentu saja.
- **Topik:** campuran tulisan untuk klien (masalah bisnis, digitalisasi proses) dan untuk rekruter (teknis: ASP.NET, Vue, Laravel).
- **Fitur awal:** hanya **daftar artikel** dan **halaman baca**. Kategori/tag, komentar, dan newsletter tidak dulu.
- **Link ke blog:**
  - **Mobile:** di **sidebar**.
  - **Desktop:** link teks "Blog" di **topbar**, di sebelah kiri tombol ID/EN. Topbar desktop memang sudah menampilkan semua elemen, jadi satu link teks tidak membuatnya ramai, dan posisinya sama "mudah dilihat"-nya dengan sidebar di mobile.
  - **Footer:** link "Blog" juga ada di footer, di desktop maupun mobile.
  - Link baru muncul setelah blog dirilis (fase 2).
- **Gate mode tidak berlaku di blog.** Gate dan scroll lock hanya ada di beranda, supaya pengunjung dari mesin pencari langsung bisa membaca artikel.
- **Tidak dirilis kosong:** blog baru ditampilkan setelah ada 3–5 artikel.
- **Tambahan stack (rencana):** `@nuxt/content` untuk artikel Markdown, `@nuxtjs/seo` untuk sitemap, robots, schema.org, dan gambar OG.

---

## Pertanyaan terbuka

- Tombol reset pilihan mode (draf ide, ditunda).
- Gaya visual navigasi flow di pinggir.
