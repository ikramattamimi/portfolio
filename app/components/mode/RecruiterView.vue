<!-- Konten mode rekruter. Selalu dirender (SEO); disembunyikan lewat mode.css saat mode klien aktif. -->
<template>
  <div class="view-rekruter" data-view="rekruter">
    <ModeRecruiterExperience :no="1" />
    <ModeRecruiterProjects :no="2" />
    <ModeRecruiterSkills :no="3" />
    <ModeRecruiterCv :no="4" />
  </div>
</template>
