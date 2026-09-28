# Project Context

Read this file first, before making any changes to this repo.

## Goal

A personal portfolio site for **Thys Hansen** (business strategy student,
BYU Marriott School of Business). The site's single purpose is to help him
land **product management jobs and internships at top companies**. Every
design and content decision should serve that goal: recruiters and hiring
managers should be able to quickly understand who he is, see evidence of
shipped products, and see a clear path to contact him.

Primary audience: PM recruiters, hiring managers, and referrers doing a
30–60 second skim on desktop or mobile.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **React 19**, server components by default
- **Tailwind CSS v4** (CSS-based theme config in `app/globals.css` via `@theme`)
- **Geist** font (`next/font/google`, already wired in `app/layout.tsx`)
- No external UI library, animation library, or CMS — the site is simple
  enough not to need one. Keep it that way unless there's a strong reason.

## Content model — read this before touching copy

**All site copy, links, projects, experience, photos, and videos live in
`/content/site.ts`.** This is the single source of truth. It exports:

- `site: SiteContent` — the actual data
- `Project`, `ExperienceRole`, `Education`, `Photo`, `Video`, `SiteContent` —
  the types that shape it

Components import from `@/content/site` and render whatever is there. They
**never** contain hardcoded name/copy/links/project data. If you need a new
field, add it to the `SiteContent` type (and the `site` object) in
`content/site.ts` first, then consume it from components — don't hardcode
a one-off value in a component as a shortcut.

Several fields are currently `TODO` placeholders (project descriptions,
work experience, photos, videos, Instagram, the deployed `url`). Filling
those in is a content edit only — it should never require touching a
component or page file.

## Design rules

- **Clean, minimal, professional.** Generous whitespace. Nothing flashy.
- **One neutral palette + one accent color.** Neutrals come from Tailwind's
  built-in `zinc`/`border`/`muted` tokens; the single accent is
  `--color-accent` in `app/globals.css`. Don't introduce a second accent
  color or a second neutral scale — if something needs emphasis, use the
  existing accent, not a new hue.
- **Modern sans font** — Geist, already configured. Don't add another
  typeface.
- **Subtle hover states only** (color/border transitions). No heavy
  animation, parallax, scroll-jacking, or motion libraries. Respect
  `prefers-reduced-motion` (already handled globally in `globals.css`).
- **Accessible & fast by default**: semantic HTML, real `<Image>` for
  photos, no client-side JS where a native element (e.g. `<details>` for
  the mobile nav) does the job just as well.

## Structure

```
content/site.ts          # ALL copy + typed content model — edit here
lib/                      # small framework-free helpers (cn, media checks)
components/layout/        # header, footer, container
components/ui/            # generic primitives (button, tag, section heading)
components/sections/      # page-level sections (hero, about, projects, ...)
components/projects/      # project-specific pieces
components/experience/    # experience-specific pieces
components/gallery/       # photo grid
components/videos/        # video embed
app/                      # routes: / , /projects , /projects/[slug] , /gallery
```

- Sections (`components/sections/*`) compose smaller pieces and read from
  `content/site.ts`. Pages (`app/**/page.tsx`) compose sections.
- Sections whose backing content is empty (e.g. `photos: []`) render
  `null` rather than showing an empty/broken section — the Gallery nav
  link and page both hide automatically until there's real content.
- Project cards/detail pages fall back to a clean monogram card when an
  `image` path in `content/site.ts` doesn't exist yet in `/public` (see
  `lib/media.ts`), so missing assets never show a broken-image icon.

## Working conventions

- **Server components by default.** Only add `"use client"` when a
  component truly needs interactivity/state that can't be done with plain
  HTML (we've avoided it entirely so far via `<details>` for the mobile
  menu). If you add a client component, keep it small and leaf-level.
- **Keep components small and single-purpose.** Prefer several small files
  over one large one. A "section" component composes smaller
  presentational components; it doesn't contain a wall of markup with
  inline business logic.
- **Never hardcode content in components.** No names, bios, links,
  project details, dates, or metrics inline in JSX — always thread it
  through from `content/site.ts`.
- **No new dependencies** for things plain Tailwind/HTML can already do
  (e.g. no animation library, no icon library for the two icons we use, no
  className-merging library — see `lib/utils.ts`).

## Deployment notes

- Update `site.url` in `content/site.ts` to the real deployed domain — it
  drives `metadataBase`, Open Graph tags, and `app/sitemap.ts`.
- Recommended host: Vercel (zero-config for Next.js App Router).
