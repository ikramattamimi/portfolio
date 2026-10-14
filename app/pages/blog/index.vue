<script setup lang="ts">
// Daftar artikel. Tanpa gate mode: pengunjung dari mesin pencari langsung bisa membaca.
const { t, locale, locales } = useI18n()
const localePath = useLocalePath()

const language = computed(() => locales.value.find((l) => l.code === locale.value)?.language ?? 'id-ID')

const { data: posts } = await useAsyncData(
  () => `blog-list-${locale.value}`,
  async () => {
    const query = (collection: 'blog_id' | 'blog_en') => {
      const q = queryCollection(collection).select('path', 'title', 'description', 'date', 'tags', 'draft').order('date', 'DESC')
      return SHOW_DRAFTS ? q.all() : q.where('draft', '=', false).all()
    }
    const own = await query(blogCollection(locale.value))
    // Halaman Inggris: artikel yang belum diterjemahkan tetap ditampilkan (versi Indonesia, ditandai).
    if (locale.value !== 'en') return own.map((p) => ({ ...p, idOnly: false }))
    const translated = new Set(own.map((p) => blogSlug(p.path)))
    const indonesian = (await query('blog_id')).filter((p) => !translated.has(blogSlug(p.path)))
    return [...own.map((p) => ({ ...p, idOnly: false })), ...indonesian.map((p) => ({ ...p, idOnly: true }))]
      .sort((a, b) => b.date.localeCompare(a.date))
  },
  { watch: [locale] },
)

useSeoMeta({
  title: () => `${t('blog.title')} — Ikram Muhammad`,
  description: () => t('blog.lead'),
  ogTitle: () => `${t('blog.title')} — Ikram Muhammad`,
  ogDescription: () => t('blog.lead'),
})
</script>

<template>
  <section class="sec blog" aria-labelledby="blog-title">
    <div class="wrap">
      <div class="head">
        <span class="no mono">{{ t('blog.kicker') }}</span>
        <h1 id="blog-title">{{ t('blog.title') }}</h1>
        <p>{{ t('blog.lead') }}</p>
      </div>

      <p v-if="!posts?.length" class="empty">{{ t('blog.empty') }}</p>

      <ol v-else class="posts">
        <li v-for="p in posts" :key="p.path">
          <NuxtLink :to="localePath(`/blog/${blogSlug(p.path)}`, p.idOnly ? 'id' : undefined)" class="post">
            <div class="meta mono">
              <time :datetime="p.date">{{ formatBlogDate(p.date, language) }}</time>
              <span v-if="p.draft" class="status amber">{{ t('blog.draft') }}</span>
              <span v-if="p.idOnly" class="status gray" lang="id">{{ t('blog.idOnlyBadge') }}</span>
            </div>
            <h2 :lang="p.idOnly ? 'id' : undefined">{{ p.title }}</h2>
            <p :lang="p.idOnly ? 'id' : undefined">{{ p.description }}</p>
            <div v-if="p.tags.length" class="chips">
              <span v-for="tag in p.tags" :key="tag" class="chip">{{ tag }}</span>
            </div>
            <span class="more">{{ t('blog.readMore') }} →</span>
          </NuxtLink>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.blog {
  min-height: calc(100svh - 68px);
}

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

h1 {
  font-size: clamp(34px, 5vw, 52px);
  line-height: 1.08;
  letter-spacing: -0.035em;
  font-weight: 800;
  margin-bottom: 12px;
}

.head p {
  font-size: 17px;
  color: var(--ink-2);
}

.empty {
  color: var(--ink-3);
}

.posts {
  list-style: none;
  display: grid;
  gap: 16px;
  max-width: 820px;
}

.post {
  display: grid;
  gap: 10px;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: var(--r);
  padding: 26px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.post:hover {
  border-color: var(--ink-3);
  box-shadow: var(--shadow);
}

.meta {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--ink-3);
}

h2 {
  font-size: 22px;
  letter-spacing: -0.02em;
  line-height: 1.25;
}

.post p {
  color: var(--ink-2);
  font-size: 15px;
}

.more {
  font-size: 13px;
  font-weight: 700;
  color: var(--red);
}
</style>
