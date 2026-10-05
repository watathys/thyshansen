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
- **Framer Motion** (`framer-motion`) is the one animation library, used
  only by the homepage hero presentation and its page-load preloader. Everything else stays plain
  Tailwind/HTML with no UI library or CMS.

## Content model — read this before touching copy

**All site copy, links, projects, experience, photos, and videos live in
`/content/site.ts`.** This is the single source of truth. It exports:

- `site: SiteContent` — the actual data
- `Project`, `ExperienceRole`, `Education`, `Photo`, `Video`, `SiteContent` —
  the types that shape it
- `CaseStudy` (plus `CaseStudySection`, `CaseStudyBlock`, `CaseStudyMedia`,
  `CaseStudyClosing`) — long-form cinematic case studies, held in
  `site.caseStudies` and matched to a `Project` by `slug`. `CaseStudySection`
  carries its prose as `blocks`, so a beat can either run straight through or
  break into named sub-headings (`CaseStudyBlock.heading`, optional). A project
  with a dedicated case study links there from its cards (see `lib/projects.ts`);
  everything else falls back to the generic `/work/[slug]` detail page.

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

- **Editorial, high-end, cinematic.** One-page-per-story feel inspired by
  designer portfolios like robin-noguier.com. Still fast and skimmable —
  recruiters should be able to grasp who Thys is and see the work within
  30–60 seconds, so every flourish has to earn its place.
- **Palette**: a single muted, desaturated slate-teal backdrop
  (`--color-background`) with off-white text (`--color-foreground`)
  everywhere by default — there is no separate light/dark mode, this *is*
  the theme. On top of that base, each `Project` in `content/site.ts` may
  carry its own `accent` hex color; the homepage hero slider uses that
  per-project accent as its background so the color shifts as you move
  between projects. Don't add more ad-hoc colors outside of
  `app/globals.css` tokens and `Project.accent` — if something needs a
  new hue, add it as a project accent or extend the shared tokens, not an
  inline one-off.
  - **Exception — cinematic case studies.** A `Project` that has an entry in
    `site.caseStudies` renders its long-form page on the *project's own*
    palette instead of the dark theme: `Project.background` as a paper-white
    surface with dark `zinc` text, and `Project.accent` as the secondary
    color. `caseStudyTheme()` in `lib/projects.ts` resolves it into three
    roles — `background`, `accent` (big figures, decorative marks) and
    `accentText` (an auto-darkened, WCAG-AA variant for small tracked labels,
    via `readableAccent()` in `lib/color.ts`). Components take only the role
    they need, or just the `accentText` for eyebrows and numbers. Both entry
    points share the surface via `CaseStudyBody` — the standalone
    `/projects/[slug]` page and the homepage's card-to-case-study overlay —
    and `SiteHeader`/`SiteFooter` adopt the palette there via
    `lightCaseStudyRoute()`.
- **Typography**: an editorial serif (Playfair Display, `font-serif`) for
  headings/titles, and a geometric sans (Inter, `font-sans`) for body copy
  and UI. Both are wired via `next/font/google` in `app/layout.tsx`. Don't
  add a third typeface. Micro-copy / nav / eyebrows are uppercase,
  tracked, and small — follow the existing pattern rather than inventing
  a new text style per component.
- **Motion: Framer Motion for the hero only.** The homepage hero
  presentation is a hijacked, one-slide-per-gesture experience built with
  Framer Motion (`AnimatePresence` + custom variants). Wheel/touch intent
  is throttled so a fast flick can't skip slides, and `MotionConfig
  reducedMotion="user"` keeps it accessible. Everywhere else motion stays
  native-CSS (scroll-snap, CSS transitions, `IntersectionObserver`) — no
  WebGL/Three.js. The hero's right-hand media column is a single continuous
  3D track: cards live in one `flex-col` (fixed `3rem` gap) inside a
  `perspective: 1200px` viewport, and the whole track is skewed with a
  `rotateX/rotateY/rotateZ` tilt + translated vertically in one rigid
  `preserve-3d` transform (see `HeroMediaStage`) — flat on touch /
  reduced-motion / < lg.
- **Page-load preloader** (`components/preloader/`): a single Framer Motion
  timeline — dark intro (outlined name that fills, media cards
  resolving from skeletons) → slate-teal curtain wipe (`clip-path`) → unfurl
  that reveals the hero, whose own entrance is gated on the `onReveal`
  callback. Plays on full loads/reloads only (module flag, not on client
  navigation), is skipped for reduced motion, fast-forwards on click /
  Escape / Enter, and ends inert (`pointer-events: none`, `visibility:
  hidden`) before unmounting. Copy lives in `site.preloader`; colors are
  the `--preloader` / `--curtain` tokens.
- **Accessible & fast by default**: semantic HTML, real `<Image>` for
  photos, keyboard-operable custom controls (e.g. the pagination rail),
  and contrast-checked color pairings (see the palette above) — no
  client-side JS where a native element (e.g. `<details>` for the mobile
  nav, native scroll-snap for the slider) does the job just as well.

## Structure

```
content/site.ts          # ALL copy + typed content model — edit here
lib/                      # small framework-free helpers (cn, media checks)
components/layout/        # header, footer, container
components/ui/            # generic primitives (button, tag, section heading)
components/sections/      # page-level sections (hero, about, projects, ...)
components/projects/      # project-specific pieces
components/case-study/    # cinematic case-study pieces (numbered sections, media frames, stats, closing)
components/experience/    # experience-specific pieces
components/gallery/       # photo grid
components/videos/        # video embed
app/                      # routes: / , /about , /projects , /projects/[slug] (cinematic case study when one exists, else the generic detail page) , /photography , /videography , /gallery , /resume
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
  (no icon library for the two icons we use, no className-merging library —
  see `lib/utils.ts`). `framer-motion` is the single, deliberate exception
  for the hero presentation.

## Deployment notes

- Update `site.url` in `content/site.ts` to the real deployed domain — it
  drives `metadataBase`, Open Graph tags, and `app/sitemap.ts`.
- Recommended host: Vercel (zero-config for Next.js App Router).
