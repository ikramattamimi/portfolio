# Ikram Muhammad — Portfolio

Personal portfolio told as **one story, top to bottom**, for recruiters and clients alike:

Hero → 01 About → 02 Experience → 03 Projects → 04 Contact.

## Features
- **Intro animation** — top bar items drop in and hero lines rise one after another (pure CSS, no loader screen, so the hero text is never delayed by JavaScript).
- **Scroll reveal** — sections fade in once as they enter the screen (`useReveal`). Only applied when JavaScript runs; without it everything is visible.
- **Experience tabs** — one tab per company (ARIA tab pattern, arrow keys). All panels are in the HTML for search engines.
- **Featured projects** — large visual with an overlapping text card, alternating sides; the visual becomes a dimmed background on small screens.
- **Old links** — `?mode=rekruter` / `?mode=klien` links from the earlier dual-mode version still open the page normally (the parameter is removed).
- **Hero** — wireframe cubes (Three.js via TresJS) with lightweight custom physics: they collide and get pushed by the mouse; float slowly on touch devices; static with `prefers-reduced-motion`.
- **Side flow navigation** — approval-style stepper on the right (≥ 1280 px), thin reading-progress line on smaller screens.
- **Bilingual** — Indonesian at `/`, English at `/en`.
- **Dark / light theme** — dark by default, no flash on load. All text meets WCAG AA contrast in both themes.
- Custom square cursor that rotates on interactive elements (mouse only).

## Tech stack
Nuxt 4 (static generation) · Vue 3 · `@nuxtjs/i18n` · `@nuxtjs/color-mode` · `@nuxt/fonts` · TresJS + Three.js · `@nuxtjs/sitemap` + `@nuxtjs/robots` · `@nuxt/content` (blog).

## Development
```bash
npm install
```
```bash
npm run dev
```

## Build (static)
```bash
NUXT_PUBLIC_SITE_URL=https://your-domain.com npm run generate
```
The site is written to `.output/public/`; upload its contents to any static host.

`NUXT_PUBLIC_SITE_URL` (no trailing slash) is used for canonical/hreflang links, Open Graph URLs, and the sitemap. Without it the build still works, but URLs stay relative and no sitemap is generated.

Every file is also written as `.gz` and `.br`; serve those if the host supports precompressed files, otherwise enable gzip/brotli on the server.

## Structure
```
app/
  components/
    hero/       HeroSection, CubeField (Three.js scene), CubeScene
    sections/   About, Experience, Projects
    diagram/    Approval, Architecture (project visuals until screenshots exist)
    nav/        SideFlow (stepper / progress line)
    layout/     Topbar, Sidebar (mobile), Footer
    shared/     ContactSection
    ui/         ThemeToggle, LangSwitch, Lightbox, CustomCursor, SectionHead
  composables/  useReveal, useActiveSection, useGallery, …
  data/         portfolio.ts — structure: tech list, jobs, featured projects, contact, flow steps
  utils/        cubePhysics.ts, initScript.ts
  assets/css/   tokens.css (theme colors), base.css (incl. intro & reveal animation)
i18n/locales/{id,en}/
  common.json (hero, layout, contact, blog) · home.json (sections) — all text
content/blog/{id,en}/  blog articles (Markdown)
public/
  images/       project screenshots (WebP), create when needed
  doc/CV.pdf
scripts/optimize-images.mjs
.ai/plan/       development plan
doc/            design decisions
```

## Editing content
- **Text** lives in `i18n/locales/{id,en}/*.json`, keyed by the same ids as `app/data/portfolio.ts`.
- **Structure** lives in `app/data/portfolio.ts`: `TECH` (about), `JOBS` (experience tabs + tech chips), `FEATURED` (projects: chips, status, visual, links), `PHOTO`, contact details.
- **Project visuals**: set `visual: 'image'` and `images: ['/images/<project>/1.webp', …]` on a `FEATURED` item; the first image is the cover and a click opens the gallery. Add `links: { demo, repo }` to show link icons.
- **Photo**: put it in `public/images/` and set `PHOTO` to its path.
- **Screenshots**: add PNGs to `public/images/<project>/`, then run `npm run images` to convert them to WebP.

## Blog
Articles are Markdown files in `content/blog/id/` (Indonesian, the default) and `content/blog/en/` (translations, same file name). The file name is the URL: `content/blog/id/my-post.md` → `/blog/my-post`.

```md
---
title: Article title
description: One or two sentences for the list and search results.
date: 2026-10-15
tags: [approval, laravel]
draft: false
---
```

Drafts (`draft: true`) only show in `npm run dev`. The blog stays hidden from visitors (no links, not built, not in the sitemap) until `BLOG_ENABLED` in `app/data/portfolio.ts` is set to `true`. `content/blog/id/contoh-format.md` is a draft showing the supported formatting.

## Previous versions
- The single-file static version is in this repository's history before the Nuxt redesign.
- The earlier Bootstrap 5 version is kept on the `legacy-bootstrap` branch.
