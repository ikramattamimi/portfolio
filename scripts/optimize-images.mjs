// Konversi screenshot proyek (PNG) di public/images ke WebP.
// Jalankan setelah menambah atau mengganti gambar: `npm run images`.
// - Lebar maksimum 1600 px (cukup untuk galeri layar penuh dan kartu di layar retina).
// - PNG aslinya dihapus dari public/ setelah berhasil dikonversi.
import { readdir, rm, stat } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

const ROOT = new URL('../public/images/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
const MAX_WIDTH = 1600

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(path)
    else yield path
  }
}

let before = 0
let after = 0
for await (const file of walk(ROOT)) {
  if (!/\.png$/i.test(file)) continue
  const out = file.replace(/\.png$/i, '.webp')
  await sharp(file)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(out)
  before += (await stat(file)).size
  after += (await stat(out)).size
  await rm(file)
  console.log(`✓ ${out}`)
}

const kb = (n) => `${Math.round(n / 1024)} KB`
console.log(`\nPNG ${kb(before)} → WebP ${kb(after)}`)
