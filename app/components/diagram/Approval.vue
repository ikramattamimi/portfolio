<!-- Diagram alur persetujuan RFA (visual sementara sampai ada screenshot). -->
<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="diagram" role="img" :aria-label="t('home.diagram.approvalLabel')">
    <span class="lbl mono">{{ t('home.diagram.approvalLabel') }}</span>
    <div class="flow">
      <span class="node">{{ t('home.diagram.requester') }}</span><span class="arr">→</span>
      <span class="node">Approver 1</span><span class="arr">→</span>
      <span class="node">Approver 2</span><span class="arr">→</span>
      <span class="node ok">{{ t('home.diagram.approved') }}</span>
    </div>
    <div class="flow">
      <span class="arr">↳</span>
      <span class="node red">{{ t('home.diagram.delegate') }}</span>
      <span class="note">{{ t('home.diagram.whenAway') }}</span>
    </div>
    <div class="flow">
      <span class="node dash">S3</span>
      <span class="node dash">Office Live</span>
      <span class="node dash">{{ t('home.diagram.reminder') }}</span>
    </div>
  </div>
</template>

<style scoped>
.diagram {
  display: grid;
  gap: 12px;
  align-content: center;
}

.lbl {
  font-size: 11px;
  font-weight: 700;
  color: var(--ink-3);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.flow {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.node {
  font-size: 13px;
  font-weight: 600;
  padding: 8px 11px;
  border-radius: 8px;
  border: 1.5px solid var(--line);
  background: var(--bg);
}

.node.ok {
  border-color: var(--green);
  color: var(--green);
  background: var(--green-soft);
}

.node.red {
  border-color: var(--red);
  color: var(--red);
  background: var(--red-soft);
}

.node.dash {
  border-style: dashed;
  color: var(--ink-2);
}

.arr,
.note {
  color: var(--ink-3);
  font-size: 13px;
}
</style>
