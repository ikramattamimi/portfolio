<script setup lang="ts">
// Tampil di kedua mode dan di blog. Link Blog muncul kalau BLOG_ENABLED.
import { BLOG_ENABLED, CONTACT } from '~/data/portfolio'

const { t } = useI18n()
const localePath = useLocalePath()
const year = new Date().getFullYear()

const links = [
  { label: 'Email', href: `mailto:${CONTACT.email}` },
  { label: 'LinkedIn', href: CONTACT.linkedin },
  { label: 'GitHub', href: CONTACT.github },
]
</script>

<template>
  <footer class="footer">
    <div class="wrap row">
      <p>© {{ year }} Ikram Muhammad · {{ t('footer.location') }}</p>
      <ul>
        <li v-if="BLOG_ENABLED">
          <NuxtLink :to="localePath('/blog')">{{ t('blog.nav') }}</NuxtLink>
        </li>
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
