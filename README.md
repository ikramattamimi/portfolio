# Ikram Muhammad — Portfolio

Personal portfolio built around a **workflow / approval** theme, the kind of systems I build at work. It serves two audiences, with **completely separate content**:

- **Recruiters** — experience as case studies, freelance projects (technical view), skills linked to proof, CV.
- **Clients** — services, project results (business view) with two live mini-demos, how we'd work together, how to start.

Visitors pick a mode on a full-screen gate below the hero; the chosen card flies into the top bar and becomes the mode toggle.

## Features
- **Mode gate** — scrolling stops at the gate until a mode is chosen. The choice is remembered (`localStorage`).
- **Deep links** — `?mode=rekruter` / `?mode=klien` (also `recruiter` / `client`) skip the gate. Use these in job applications.
- **Both modes are in the HTML** for search engines; the inactive one is hidden with CSS before first paint (no flash).
- **Hero** — wireframe cubes (Three.js via TresJS) with lightweight custom physics: they collide and get pushed by the mouse; float slowly on touch devices; static with `prefers-reduced-motion`.
- **Side flow navigation** — approval-style stepper on the right (≥ 1280 px), thin reading-progress line on smaller screens.
- **Bilingual** — Indonesian at `/`, English at `/en`.
- **Dark / light theme** — dark by default, no flash on load. All text meets WCAG AA contrast in both themes.
- Custom square cursor that rotates on interactive elements (mouse only).

## Tech stack
Nuxt 4 (static generation) · Vue 3 · `@nuxtjs/i18n` · `@nuxtjs/color-mode` · `@nuxt/fonts` · TresJS + Three.js · GSAP (Flip) · `@nuxtjs/sitemap` + `@nuxtjs/robots` · `@nuxt/content` (blog).

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
    gate/       ModeGate (mode choice), ModeToggle (top bar)
    mode/       RecruiterView, ClientView + their sections (recruiter/, client/)
    nav/        SideFlow (stepper / progress line)
    layout/     Topbar, Sidebar (mobile), Footer
    shared/     ContactSection
    ui/         ThemeToggle, LangSwitch, Lightbox, CustomCursor, SectionHead
  composables/  useMode (mode state, init script, animated switch), useActiveSection, useGallery, …
  data/         portfolio.ts — structure: jobs, projects, skills, contact, flow steps
  utils/        cubePhysics.ts, gsap.ts
  assets/css/   tokens.css (theme colors), base.css, mode.css (mode visibility)
i18n/locales/{id,en}/
  common.json · recruiter.json · client.json — all text
content/blog/{id,en}/  blog articles (Markdown)
public/
  images/       project screenshots (WebP)
  doc/CV.pdf
scripts/optimize-images.mjs
.ai/plan/       development plan
doc/            design decisions
```

## Editing content
- **Text** lives in `i18n/locales/{id,en}/*.json`, keyed by the same ids as `app/data/portfolio.ts`.
- **Structure** (tech chips, galleries, which skill was used where, contact details) lives in `app/data/portfolio.ts`.
- **Testimonials** are hidden; set `SHOW_TESTIMONIALS = true` in `app/data/portfolio.ts` once there are real quotes.
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
