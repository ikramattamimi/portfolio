import { defineCollection, defineContentConfig, z } from '@nuxt/content'

// Artikel blog per bahasa: content/blog/id/*.md dan content/blog/en/*.md.
// Artikel berbahasa Indonesia dulu; versi Inggris hanya untuk artikel yang diterjemahkan
// (pakai nama file yang sama supaya bisa saling ditautkan).
const article = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(), // YYYY-MM-DD
  tags: z.array(z.string()).default([]),
  /** Draf hanya tampil di mode dev, tidak ikut build produksi. */
  draft: z.boolean().default(false),
})

export default defineContentConfig({
  collections: {
    blog_id: defineCollection({ type: 'page', source: 'blog/id/*.md', schema: article }),
    blog_en: defineCollection({ type: 'page', source: 'blog/en/*.md', schema: article }),
  },
})
