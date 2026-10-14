<!-- Konten mode klien. Selalu dirender (SEO); disembunyikan lewat mode.css saat mode rekruter aktif. -->
<template>
  <div class="view-klien" data-view="klien">
    <ModeClientServices :no="1" />
    <ModeClientResults :no="2" />
    <ModeClientProcess :no="3" />
    <ModeClientStart :no="4" />
  </div>
</template>
