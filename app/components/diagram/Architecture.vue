<!-- Diagram arsitektur PED (Clean Architecture), visual sementara sampai ada screenshot. -->
<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="diagram" role="img" :aria-label="t('home.diagram.architectureLabel')">
    <span class="lbl mono">{{ t('home.diagram.architectureLabel') }}</span>
    <div class="lrow">
      <div class="layer a">WebApp <span>Vue 3</span></div>
      <div class="layer a">WebAPI <span>REST</span></div>
    </div>
    <div class="layer b">UseCase <span>{{ t('home.diagram.businessRules') }}</span></div>
    <div class="layer c">Entity <span>domain</span></div>
    <div class="layer d">Infrastructure <span>SQL Server · S3</span></div>
  </div>
</template>

<style scoped>
.diagram {
  display: grid;
  gap: 8px;
  align-content: center;
  width: 100%;
  max-width: 420px;
}

.lbl {
  font-size: 11px;
  font-weight: 700;
  color: var(--ink-3);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.layer {
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.layer span {
  font-weight: 500;
  opacity: 0.75;
}

.layer.a { background: var(--blue-soft); color: var(--blue); }
.layer.b { background: var(--amber-soft); color: var(--amber); margin: 0 14px; }
.layer.c { background: var(--green-soft); color: var(--green); margin: 0 28px; }
.layer.d { border: 1.5px dashed var(--line); color: var(--ink-2); }

.lrow {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
</style>
