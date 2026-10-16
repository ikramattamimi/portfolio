# Redesign: Satu Alur — Catatan Keputusan

Tanggal: 2026-10-16
Branch: `redesign/single-flow`
Menggantikan: [`redesign-decisions.md`](redesign-decisions.md) (dual-mode rekruter/klien)

Mode rekruter dan klien digabung jadi **satu alur cerita** yang dibaca dari atas ke bawah, terinspirasi v4.brittanychiang.com: perkenalan → tentang → pengalaman → proyek → kontak. Pengunjung tidak perlu memilih apa pun sebelum melihat isi halaman.

---

## 1. Alasan

- Gate "Apa yang Anda cari?" memaksa pengunjung memutuskan sebelum tahu siapa saya.
- Konten dua mode banyak yang tumpang tindih (RFA/PED muncul di keduanya dengan sudut pandang berbeda), jadi pesannya terpecah.
- Rekruter dan klien sama-sama butuh jawaban yang sama: siapa saya, apa yang sudah saya kerjakan, dan cara menghubungi saya.

## 2. Urutan section

| No | Section | Isi | Sumber lama |
|---|---|---|---|
| — | Hero | Nama, headline, satu paragraf, 2 tombol (Lihat proyek, Unduh CV) | Hero |
| 01 | Tentang | 2–3 paragraf + daftar teknologi + pendidikan singkat | Keahlian, CV |
| 02 | Pengalaman | Tab per perusahaan: peran, tanggal, 3 poin pencapaian, teknologi | Pengalaman |
| 03 | Proyek | 3 proyek unggulan: RFA, PED, Inventory Management | *baru* |
| 04 | Kontak | Ajakan singkat + formulir WhatsApp/email + baris layanan freelance | Kontak, Layanan, Cara mulai |

Yang **dihapus**: gate, toggle mode, section Keahlian interaktif, section CV terpisah, Layanan, Alur kerja sama, Hasil proyek, Testimoni, dan keempat proyek lama (Trashclean, Smart Home, Salary Payment, Aplikasi Akuntansi) beserta demo dan screenshotnya.

Yang **dipertahankan**: kubus di hero, navigasi flow di kanan (langkahnya jadi 4, satu daftar saja), tema gelap/terang, ID/EN, blog, custom cursor.

## 3. Prinsip penulisan

- **Kalimat pendek dan polos.** Tidak ada permainan kata bertema "persetujuan" ("Jejak persetujuan karier", "Ajukan permohonan", label "DRAF"). Judul section cukup menyebut isinya.
- **Satu ide per kalimat**, istilah teknis hanya di daftar teknologi.
- **Pengalaman = peran + pencapaian.** Setiap poin diawali kata kerja ("Memimpin", "Membangun") lalu hasilnya. Angka dipakai kalau ada.
- **Detail teknis** (masalah/solusi, diagram arsitektur) pindah ke halaman proyek atau artikel blog, bukan di bagian pengalaman.

## 4. Draf teks (ID)

Semua teks di bawah adalah draf dan *perlu ditinjau pemilik*. Teks EN ditulis setelah versi ID disetujui.

### Hero

> Halo, saya
> **Ikram Muhammad.**
> Saya mengubah proses manual jadi sistem yang **berjalan sendiri**.
>
> Saya full-stack developer di Bandung. Sehari-hari saya membangun aplikasi internal untuk perusahaan, seperti persetujuan dokumen, pelacakan izin, dan alur kerja kantor lainnya.
>
> [Lihat proyek] [Unduh CV]

Status "Terbuka untuk kerja & freelance" tetap ada di atas nama.

### 01 — Tentang

> Saya mulai serius membuat aplikasi web saat kuliah D3 Teknik Informatika di Politeknik Negeri Bandung. Sekarang saya bekerja sebagai IT Consultant di PT Global Dinamika Informatika, membangun aplikasi internal untuk klien korporat.
>
> Bagian yang paling saya nikmati adalah mengambil pekerjaan yang selama ini dilakukan manual, misalnya dokumen yang diedarkan dari meja ke meja atau izin yang dicatat di Excel, lalu mengubahnya jadi sistem yang rapi dan berjalan otomatis.
>
> Di luar pekerjaan, saya juga menerima proyek freelance.
>
> Teknologi yang sering saya pakai:
> ASP.NET · Vue.js · Laravel · SQL Server · PostgreSQL · AWS S3

### 02 — Pengalaman

**Junior IT Consultant · PT Global Dinamika Informatika** — Des 2023 – sekarang
- Memimpin pengembangan RFA, aplikasi persetujuan dokumen online, sebagai lead developer dan penanggung jawab tunggal. Awalnya saya bergabung sebagai developer di tim 2 orang.
- Membangun alur persetujuan bertingkat dengan delegasi dan pengingat otomatis, menggantikan dokumen yang sebelumnya diedarkan manual.
- Mengembangkan PED, aplikasi pelacakan izin perusahaan, bersama tim 3 orang selama 12 bulan, termasuk pengingat perpanjangan otomatis dan halaman data yang dimuat lebih cepat.

ASP.NET · Vue 3 · Kendo UI · SQL Server · AWS S3

**Full-Stack Developer (Magang) · PT Lapi Divusi** — Jul – Sep 2022
- Membangun aplikasi pengelolaan data pegawai untuk institusi pendidikan di Bandung.
- Mengubah rancangan tampilan jadi dashboard untuk tiap peran pengguna, lengkap dengan laporan dan grafik.

Laravel · Bootstrap · PostgreSQL

> **Perlu dari pemilik:** angka untuk poin PED ("lebih cepat" → dari berapa detik ke berapa detik), dan kalau ada, jumlah pengguna atau dokumen per bulan di RFA.

### 03 — Proyek

Judul: **Proyek pilihan**. Tiap proyek: label kecil, nama, 2–3 kalimat, daftar teknologi, link (demo / GitHub) kalau sudah ada.

**RFA — Request for Approval**
> Aplikasi persetujuan dokumen online. Pemohon mengajukan dokumen, atasan menyetujuinya bertahap langsung dari browser, dan bisa menunjuk pengganti saat berhalangan. Pengingat otomatis memastikan tidak ada dokumen yang tertahan.

**PED — Permit Digitalization**
> Satu tempat untuk memantau semua izin perusahaan beserta tanggal kedaluwarsanya. Sistem mengingatkan penanggung jawab sebelum izin habis, jadi perpanjangan tidak lagi terlewat.

**Inventory Management**
> *Menunggu deskripsi dari pemilik* (lihat Pertanyaan terbuka).

Selama screenshot belum ada, visual tiap proyek memakai diagram yang sudah ada (alur persetujuan untuk RFA, arsitektur untuk PED) atau kotak placeholder bertanda "Sedang dikembangkan".

### 04 — Kontak

> **Ada yang ingin dibicarakan?**
> Tawaran kerja, proyek freelance, atau sekadar pertanyaan, silakan kirim pesan. Biasanya saya balas dalam sehari.
>
> Untuk freelance, saya membantu membuat aplikasi internal kantor, dashboard, dan otomasi pekerjaan berulang.

Formulir: label "Permohonan baru" dan "DRAF" dihapus. "Jenis permohonan" → "Jenis pesan".

## 5. Topbar & navigasi

- **Kiri:** nama "Ikram Muhammad" (atau monogram "IM" di mobile), klik untuk kembali ke atas. Menggantikan toggle mode.
- **Kanan (desktop):** Blog, ID/EN, tombol CV (garis), Hubungi (merah), tema.
- **Mobile:** sidebar tetap; isinya ditambah link CV.
- **Navigasi flow kanan:** tetap, 4 langkah: Tentang, Pengalaman, Proyek, Kontak.

## 6. Animasi masuk

Mengikuti pola Brittany, tanpa layar loader (loader menunda LCP):

- Saat halaman pertama dibuka: item topbar turun satu per satu, lalu baris hero (status → nama → headline → paragraf → tombol) naik bergantian dengan jeda ±100 ms.
- Saat di-scroll: tiap section muncul sekali dengan fade + geser kecil ke atas. Item di dalam section (poin pengalaman, kartu proyek) mengikuti dengan stagger.
- `prefers-reduced-motion`: tanpa animasi.
- Tanpa JavaScript: semua konten langsung terlihat (status awal tersembunyi hanya berlaku di `html.js`).

## 7. Deep link lama

`?mode=rekruter` / `?mode=klien` mungkin sudah dipakai di lamaran kerja. Parameternya diabaikan dan dihapus dari URL, halaman tetap tampil normal. Kunci `localStorage` lama (`mode`) dibersihkan.

---

## Pertanyaan terbuka

- **Inventory Management:** untuk siapa, masalah apa yang diselesaikan, fitur utamanya, teknologi, dan statusnya (ide / sedang dibuat).
- **RFA & PED:** dibuat ulang sebagai proyek pribadi dengan data contoh, atau tetap aplikasi klien GDI? Kalau aplikasi klien, perlu dicek apakah boleh menampilkan screenshot dan nama klien.
- **Foto diri** di section Tentang: dipakai atau tidak.
- Angka pencapaian untuk poin pengalaman.
