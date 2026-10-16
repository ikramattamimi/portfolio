/**
 * Script inline di <head>, jalan sebelum halaman digambar:
 * 1. Tandai <html class="js">. Animasi scroll reveal hanya menyembunyikan konten di `html.js`,
 *    jadi tanpa JavaScript semua konten langsung terlihat.
 * 2. Sisa versi dual-mode: link lama `?mode=rekruter|klien` (mungkin ada di lamaran kerja) tetap
 *    dibuka normal. Parameternya dihapus dari URL dan pilihan mode lama di localStorage dibersihkan.
 */
export const INIT_SCRIPT = `(function(){document.documentElement.classList.add('js');try{localStorage.removeItem('mode');var u=new URL(location.href);if(u.searchParams.has('mode')){u.searchParams.delete('mode');history.replaceState(history.state,'',u.pathname+u.search+u.hash)}}catch(e){}})()`
