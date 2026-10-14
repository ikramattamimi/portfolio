<script setup lang="ts">
// Halaman baca artikel. Kalau versi Inggris belum ada, /en/blog/<slug> menampilkan versi Indonesia
// dengan catatan, canonical ke versi Indonesia, dan noindex (supaya tidak dianggap konten ganda).
import { CONTACT } from '~/data/portfolio'

const route = useRoute()
const { t, locale, locales } = useI18n()
const localePath = useLocalePath()

const slug = computed(() => String(route.params.slug))
const language = computed(() => locales.value.find((l) => l.code === locale.value)?.language ?? 'id-ID')

const { data } = await useAsyncData(
  () => `blog-post-${locale.value}-${slug.value}`,
  async () => {
    const find = (collection: 'blog_id' | 'blog_en', lang: string) =>
      queryCollection(collection).path(`/blog/${lang}/${slug.value}`).first()
    let post = await find(blogCollection(locale.value), locale.value === 'en' ? 'en' : 'id')
    let fallback = false
    if (!post && locale.value === 'en') {
      post = await find('blog_id', 'id')
      fallback = !!post
    }
    if (!post || (post.draft && !SHOW_DRAFTS)) return null
    return { post, fallback }
  },
  { watch: [locale, slug] },
)

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: t('blog.notFound'), fatal: true })
}

const post = computed(() => data.value!.post)
const fallback = computed(() => data.value!.fallback)

const siteUrl = useSiteConfig().url?.replace(/\/$/, '')
const indonesianUrl = computed(() => `${siteUrl ?? ''}/blog/${slug.value}`)

useSeoMeta({
  title: () => `${post.value.title} — Ikram Muhammad`,
  description: () => post.value.description,
  ogTitle: () => post.value.title,
  ogDescription: () => post.value.description,
  ogType: 'article',
  articlePublishedTime: () => post.value.date,
  articleTag: () => post.value.tags,
  robots: () => (fallback.value || post.value.draft ? 'noindex, follow' : undefined),
})

useHead(() => ({
  // Versi pengganti (bahasa Indonesia di URL Inggris): canonical ke versi aslinya.
  link: fallback.value && siteUrl ? [{ key: 'i18n-can', id: 'i18n-can', rel: 'canonical', href: indonesianUrl.value }] : [],
  script: [
    {
      key: 'article-jsonld',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.value.title,
        description: post.value.description,
        datePublished: post.value.date,
        inLanguage: fallback.value ? 'id-ID' : language.value,
        keywords: post.value.tags.join(', '),
        author: { '@type': 'Person', name: 'Ikram Muhammad', sameAs: [CONTACT.linkedin, CONTACT.github] },
      }),
    },
  ],
}))
</script>

<template>
  <article class="sec article" :lang="fallback ? 'id' : undefined">
    <div class="wrap narrow">
      <NuxtLink :to="localePath('/blog')" class="back mono">← {{ t('blog.allPosts') }}</NuxtLink>

      <p v-if="fallback" class="notice" lang="en">{{ t('blog.onlyIndonesian') }}</p>

      <header class="head">
        <div class="meta mono">
          <time :datetime="post.date">{{ formatBlogDate(post.date, fallback ? 'id-ID' : language) }}</time>
          <span v-if="post.draft" class="status amber">{{ t('blog.draft') }}</span>
        </div>
        <h1>{{ post.title }}</h1>
        <p class="lead">{{ post.description }}</p>
        <div v-if="post.tags.length" class="chips">
          <span v-for="tag in post.tags" :key="tag" class="chip">{{ tag }}</span>
        </div>
      </header>

      <ContentRenderer :value="post" class="prose" />
    </div>
  </article>
</template>

<style scoped>
.narrow {
  max-width: 760px;
}

.back {
  display: inline-block;
  font-size: 13px;
  font-weight: 700;
  color: var(--ink-3);
  margin-bottom: 28px;
}

.back:hover {
  color: var(--ink);
}

.notice {
  background: var(--amber-soft);
  color: var(--amber);
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 28px;
}

.head {
  margin-bottom: 40px;
  padding-bottom: 28px;
  border-bottom: 1.5px dashed var(--line);
}

.meta {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: var(--ink-3);
  margin-bottom: 12px;
}

h1 {
  font-size: clamp(32px, 5vw, 48px);
  line-height: 1.1;
  letter-spacing: -0.035em;
  font-weight: 800;
  margin-bottom: 14px;
}

.lead {
  font-size: 18px;
  color: var(--ink-2);
  margin-bottom: 16px;
}
</style>
