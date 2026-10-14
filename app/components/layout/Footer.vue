<script setup lang="ts">
// Tampil di kedua mode. Link Blog menyusul di Fase 2.
const { t } = useI18n()
const year = new Date().getFullYear()

const links = [
  { label: 'Email', href: 'mailto:attamimiikram@gmail.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ikram-attamimi' },
  { label: 'GitHub', href: 'https://github.com/ikramattamimi' },
]
</script>

<template>
  <footer class="footer">
    <div class="wrap row">
      <p>© {{ year }} Ikram Muhammad · {{ t('footer.location') }}</p>
      <ul>
        <li v-for="l in links" :key="l.label">
          <a
            :href="l.href"
            :target="l.href.startsWith('http') ? '_blank' : undefined"
            :rel="l.href.startsWith('http') ? 'noopener' : undefined"
          >
            {{ l.label }}
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--line);
  padding: 32px 0;
  font-size: 13px;
  color: var(--ink-3);
}

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px 24px;
}

ul {
  display: flex;
  gap: 20px;
  list-style: none;
}

a {
  font-family: var(--mono);
  font-weight: 500;
  transition: color 0.2s;
}

a:hover {
  color: var(--ink);
}

@media (max-width: 767.98px) {
  .row {
    flex-direction: column;
    text-align: center;
  }
}
</style>
