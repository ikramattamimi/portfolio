<script setup lang="ts">
defineProps<{
  /** Nomor urut section di mode ini (01, 02, …). */
  no: number
  kicker: string
  title: string
  lead?: string
  titleId?: string
}>()
</script>

<template>
  <div class="head">
    <span class="no mono">{{ String(no).padStart(2, '0') }} — {{ kicker }}</span>
    <h2 :id="titleId">{{ title }}</h2>
    <p v-if="lead">{{ lead }}</p>
  </div>
</template>

<style scoped>
.head {
  margin-bottom: 44px;
  max-width: 640px;
}

.no {
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: var(--red);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 10px;
}

h2 {
  font-size: clamp(30px, 4.2vw, 44px);
  line-height: 1.12;
  letter-spacing: -0.03em;
  font-weight: 800;
  margin-bottom: 12px;
}

p {
  font-size: 17px;
  color: var(--ink-2);
}
</style>
