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
- **i18n ID/EN** lewat `@nuxtjs/i18n`.
- **GSAP + plugin Flip** untuk animasi gate → topbar dan pergantian mode.
- **Three.js (via TresJS)** + **Rapier** untuk physics dan tabrakan kubus.
- **Konten** di JSON/Markdown per mode dan per bahasa.
- **Deploy:** ditunda. Kemungkinan pakai server dan domain di Hostinger.

---

## Pertanyaan terbuka

- Tombol reset pilihan mode (draf ide, ditunda).
