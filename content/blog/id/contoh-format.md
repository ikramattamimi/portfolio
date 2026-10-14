---
title: Contoh format artikel
description: Artikel contoh untuk mengecek tampilan blog. Berstatus draf, jadi hanya tampil di mode dev dan tidak ikut build produksi.
date: 2026-10-15
tags: [contoh]
draft: true
---

Ini artikel contoh untuk mengecek tampilan blog. Hapus file ini atau biarkan `draft: true` setelah ada artikel sungguhan.

## Cara menulis artikel baru

1. Buat file Markdown di `content/blog/id/`, mis. `digitalisasi-persetujuan-dokumen.md`. Nama file menjadi alamat artikel: `/blog/digitalisasi-persetujuan-dokumen`.
2. Isi bagian atas (frontmatter): `title`, `description`, `date`, `tags`, dan `draft`.
3. Untuk versi Inggris, buat file dengan **nama yang sama** di `content/blog/en/`.

## Elemen yang didukung

Teks **tebal**, *miring*, `kode pendek`, dan [tautan](https://nuxt.com).

> Kutipan atau catatan penting tampil seperti ini.

- Daftar poin
- Bisa bertingkat
  - seperti ini

```ts
// Blok kode diwarnai otomatis saat build.
function approve(requestId: number) {
  return fetch(`/api/requests/${requestId}/approve`, { method: 'POST' })
}
```

### Subjudul

| Kolom | Keterangan |
|---|---|
| Tabel | juga didukung |
