/**
 * content/site.ts
 * ----------------------------------------------------------------------------
 * The single source of truth for every piece of copy, link, and media
 * reference on the site. Components should NEVER hardcode content — they
 * only import from here and render whatever shape this file provides.
 *
 * Edit this file to change what the site says. You should not need to open
 * any file in /app or /components to update copy, links, projects,
 * experience, photos, or videos.
 * ----------------------------------------------------------------------------
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface NavLink {
  label: string;
  href: string;
}

export interface Fact {
  label: string;
  value: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Education {
  school: string;
  degree: string;
  emphasis?: string;
  graduationDate: string;
  gpa?: string;
  honors: string[];
}

export interface ProjectLink {
  label: string;
  url: string;
}

/**
 * A non-project "info" card in the homepage hero slider (the intro/about
 * card, the Creatives teaser, and the Work Experience teaser). Each links
 * to an anchor further down the homepage rather than a case study page.
 */
export interface HeroInfoCard {
  /** Small tracked label shown above the title, e.g. "About Me". */
  eyebrow: string;
  /** Short paragraph shown under the title. */
  description: string;
  /** CTA text before the arrow, e.g. "About Me", "View Experience". */
  ctaLabel: string;
  /** Where the card's title/CTA link to — usually a same-page anchor. */
  href: string;
  /**
   * This card's full-page background color in the hero, as a hex string.
   * The intro card is white; other cards use a soft tint so the whole
   * presentation reads as a varied, editorial palette rather than plain
   * white.
   */
  background: string;
  /**
   * This card's accent color, as a hex string. Drives the hero's headline,
   * eyebrow, CTA, and the thin vertical strip on the left edge — legible on
   * `background` (aim for ≥4.5:1).
   */
  accent: string;
  /**
   * Optional extra destination links rendered as a row of pills under the
   * description (e.g. the Contact card's Email / LinkedIn / Instagram). When
   * present, these replace the single `ctaLabel` button.
   */
  links?: ProjectLink[];
}

/**
 * How a project's `image` fills its frame. `"cover"` (the default) fills the
 * frame and crops the overflow, which is right for screenshots. `"contain"`
 * shows the whole asset letterboxed, which is right for logo/brand marks that
 * must never be cropped.
 */
export type ImageFit = "cover" | "contain";

export interface Project {
  /** URL-safe unique identifier, used for /work/[slug] */
  slug: string;
  name: string;
  /** Short, punchy value proposition (~1 sentence). */
  oneLiner: string;
  /** 2–4 sentence case-study style description. */
  description: string;
  /** Problem statement for case study detail page. */
  problem: string;
  /** What was built. */
  whatIBuilt: string;
  /** Role description. */
  role: string;
  /** Who the work was for — "CLIENT" metadata on the case study. */
  client: string;
  /** When it shipped — "DATE" metadata on the case study. */
  date: string;
  /** Quantified outcomes & metrics. */
  metrics: string[];
  /** Tech stack array. */
  techStack: string[];
  /** Primary live URL, App Store link, GitHub repo, etc. Leave empty if none. */
  url?: string;
  /** Secondary links (e.g. TikTok, Landing Page). */
  secondaryLinks?: ProjectLink[];
  /** Path relative to /public, e.g. "/projects/junbi.png". Optional. */
  image?: string;
  /**
   * How `image` fills its frame; defaults to `"cover"`. Set to `"contain"`
   * for logo/brand marks (square or transparent assets that a cover fit
   * would crop).
   */
  imageFit?: ImageFit;
  tags: string[];
  /** If true, rendered as a larger featured card at the top of Selected Work. */
  featured?: boolean;
  /**
   * This project's full-page background color in the hero, as a hex string.
   * A soft tint that gives the presentation color variety while keeping the
   * accent (below) legible.
   */
  background: string;
  /**
   * This project's accent color, as a hex string. Drives the homepage hero's
   * headline, eyebrow, CTA, and the thin vertical strip on the left edge.
   * Pick something distinct from the other projects and legible on
   * `background`.
   */
  accent: string;
  /**
   * Optional looping video snippet shown in the hero's media stage while
   * this project is active. Path relative to /public. Falls back to `image`
   * (or a monogram card) when unset.
   */
  video?: string;
}

export interface ExperienceRole {
  company: string;
  role: string;
  location?: string;
  startDate: string;
  /** Use "Present" for current roles. */
  endDate: string;
  bullets: string[];
}

export interface Photo {
  /** Path relative to /public, e.g. "/photos/junbi-launch.jpg". */
  src: string;
  alt: string;
  caption?: string;
}

export interface Video {
  title: string;
  youtubeId: string;
  description?: string;
  category?: string;
  isShort?: boolean;
}

export interface TikTokVideo {
  title: string;
  url: string;
  isYouTubeShort?: boolean;
  youtubeId?: string;
}

export interface VideographyInfo {
  tools: string[];
  wheatleyImpact: {
    title: string;
    description: string;
    subscribersGained: string;
    viewsGained: string;
  };
  kazziTikTok: {
    handle: string;
    profileUrl: string;
    note: string;
    videos: TikTokVideo[];
  };
}

/** Copy for the dark intro sequence that plays before the homepage hero. */
export interface PreloaderContent {
  /** Small tracked line under the outlined name, e.g. a role descriptor. */
  role: string;
  /** Speech-bubble easter egg pinned to the bottom-left of the intro. */
  caption: string;
  /** Screen-reader label announced while the intro is playing. */
  label: string;
}

/**
 * One full-width looping demo inside a cinematic case study. When `src` is
 * unset (or the file isn't in /public yet), the frame renders a clearly-marked
 * placeholder instead of a broken video, so real screen recordings can be
 * dropped in later without touching a component.
 */
export interface CaseStudyMedia {
  /** Path relative to /public of a looping video, GIF, or screenshot. */
  src?: string;
  /** Optional poster frame shown while the video loads. */
  poster?: string;
  /**
   * Describes the demo — used as the image's alt text, so it still needs to
   * be written even though it isn't displayed as a visible caption.
   */
  caption: string;
  /**
   * How wide the demo runs. The default full-width frame suits screen
   * recordings and wide screenshots; `"compact"` caps a smaller shot so it
   * doesn't stretch across the page.
   */
  size?: "full" | "compact";
  /** Short label shown on the empty frame, e.g. "[VIDEO PLACEHOLDER]". */
  placeholderLabel: string;
  /** What real footage belongs in this frame. */
  placeholderNote: string;
  /** CSS aspect ratio for the frame, e.g. "16 / 9". */
  aspectRatio: string;
}

/**
 * A block of prose inside a case-study section. A section that tells its story
 * straight through uses a single block with no `heading`; a section broken into
 * named beats uses several blocks, each introduced by a smaller sub-heading.
 */
export interface CaseStudyBlock {
  /** Optional smaller sub-heading, e.g. "Make progress visible". */
  heading?: string;
  /** One or more first-person paragraphs. */
  body: string[];
}

/** A numbered beat in a cinematic case study. */
export interface CaseStudySection {
  /** Two-digit label shown above the header, e.g. "01". */
  number: string;
  /** Short, punchy header — an emoji is welcome. */
  title: string;
  /** The section's prose, in order. */
  blocks: CaseStudyBlock[];
  /** Full-width looping demo shown under the copy. */
  media?: CaseStudyMedia;
  /** Clean number callouts, used instead of media (e.g. a growth section). */
  stats?: Stat[];
  /** Short takeaways rendered as a list (e.g. a "what I learned" section). */
  lessons?: string[];
}

/** The closing CTA that ends a cinematic case study. */
export interface CaseStudyClosing {
  eyebrow: string;
  title: string;
  body: string;
  /** Contact links rendered as buttons (email, LinkedIn, …). */
  links: ProjectLink[];
  /** Link that leaves the case study — the portfolio home. */
  archiveLabel: string;
  archiveHref: string;
}

/** A long-form, cinematic case study rendered at /projects/[slug]. */
export interface CaseStudy {
  /** Must match a `Project.slug`. */
  slug: string;
  /** Small tracked label above the hero title, e.g. "Case Study". */
  eyebrow: string;
  /** One-line tagline shown under the project name. */
  tagline: string;
  /** Heading above the first-person intro. */
  aboutTitle: string;
  /** First-person paragraphs on why the product exists. */
  about: string[];
  /** Hero metadata row (Role / Built at / Dates). */
  meta: Fact[];
  /** Label for the hero's link to the live product, if any. */
  liveLabel?: string;
  /** The numbered beats, in order. */
  sections: CaseStudySection[];
  closing: CaseStudyClosing;
}

export interface SiteContent {
  name: string;
  tagline: string;
  intro: string;
  bio: string;
  headshot: string;
  resumeUrl: string;
  /**
   * Optional screenshot/preview image of the resume, used as the visual
   * for the homepage hero's "Work Experience" card. Path relative to
   * /public. Falls back to a generic document placeholder if missing.
   */
  resumeImage?: string;
  email: string;
  linkedin: string;
  /** Leave as an empty string to hide the Instagram link entirely. */
  instagram: string;
  /** Deployed site URL, used for SEO metadata + sitemap. */
  url: string;
  navLinks: NavLink[];
  /** Dark intro/preloader sequence shown on every full page load. */
  preloader: PreloaderContent;
  /** The homepage hero slider's intro card — "meet Thys" — links to About. */
  heroIntro: HeroInfoCard;
  /** The homepage hero slider's Creatives teaser card — links to Creative. */
  heroCreatives: HeroInfoCard;
  /** The homepage hero slider's Work Experience teaser card — links to Experience. */
  heroExperience: HeroInfoCard;
  /** The homepage hero slider's Contact card — links to email. */
  heroContact: HeroInfoCard;
  /**
   * Explicit order of the homepage hero's slides, by slug. `"intro"`,
   * `"creatives"`, `"work-experience"`, and `"contact"` are the info cards;
   * every other entry matches a `Project.slug`. Lets project and info cards
   * interleave in the presentation independently of `projects` order.
   */
  heroSlideOrder: string[];
  facts: Fact[];
  stats: Stat[];
  education: Education;
  projects: Project[];
  /** Long-form cinematic case studies, matched to a `Project` by `slug`. */
  caseStudies: CaseStudy[];
  experience: ExperienceRole[];
  photos: Photo[];
  videos: Video[];
  videography: VideographyInfo;
}

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

/**
 * The closing CTA every case study ends on — the same pitch and contact links
 * each time, so they only live in one place. A study that needs its own can
 * inline a `closing` object instead of referencing this.
 */
const caseStudyClosing: CaseStudyClosing = {
  eyebrow: "Next",
  title: "Let's work together.",
  body: "I'm looking for product management internships and full-time roles where I can build close to users and ship fast. If that's the kind of work you're hiring for, I'd love to talk.",
  links: [
    { label: "Email me", url: "mailto:watathys@gmail.com" },
    { label: "LinkedIn", url: "https://linkedin.com/in/thysh" },
  ],
  archiveLabel: "All projects",
  archiveHref: "/",
};

export const site: SiteContent = {
  name: "Thys Hansen",
  tagline: "Business strategy student who builds and ships products.",
  intro:
    "I bridge strategic business thinking with technical execution to design, build, and scale products people love.",
  bio:
    "I'm a Business Strategic Management student with a Product Management emphasis at BYU Marriott. I combine quantitative strategy, market research, and hands-on software development to take products from zero to one and drive measurable impact.",
  headshot: "/headshot.jpg",
  resumeUrl: "/resume.pdf",
  email: "watathys@gmail.com",
  linkedin: "https://linkedin.com/in/thysh",
  instagram: "https://www.instagram.com/th.y.s/",
  url: "https://thyshansen.com",

  // Kept minimal by design: the header only ever shows the name (links
  // home) plus this one link. Everything else is reached from within the
  // homepage hero slider or in-page CTAs.
  navLinks: [{ label: "About", href: "/about" }],

  preloader: {
    role: "Product-minded strategist",
    caption: "Psst… the case studies are worth a click.",
    label: "Loading portfolio",
  },

  heroIntro: {
    eyebrow: "About Me",
    description:
      "I'm Thys — I study Business Strategic Management at BYU. See my projects and work experience below.",
    ctaLabel: "About Me",
    href: "/about",
    background: "#f1e9da",
    accent: "#a78f6a",
  },

  heroCreatives: {
    eyebrow: "Creative",
    description:
      "Photography and videography from travel, product launches, and campus productions.",
    ctaLabel: "View Photos & Videos",
    href: "/gallery",
    background: "#f0e5cf",
    accent: "#7d6038",
  },

  heroExperience: {
    eyebrow: "Career",
    description:
      "Product leadership, full-stack engineering, and media production across ventures and institutions.",
    ctaLabel: "View Experience",
    href: "/resume",
    background: "#e3e9ed",
    accent: "#46535c",
  },

  heroContact: {
    eyebrow: "Contact",
    description:
      "Open to product management internships and full-time roles. The fastest way to reach me is email, LinkedIn, or Instagram.",
    ctaLabel: "Email Me",
    href: "mailto:watathys@gmail.com",
    background: "#e6eaf0",
    accent: "#3e4c6b",
    links: [
      { label: "Email", url: "mailto:watathys@gmail.com" },
      { label: "LinkedIn", url: "https://linkedin.com/in/thysh" },
      { label: "Instagram", url: "https://www.instagram.com/th.y.s/" },
    ],
  },

  // Kazzi Soda and "What I'm working on now" intentionally interleave with
  // the Creatives teaser: info cards sit between projects in the hero.
  heroSlideOrder: [
    "intro",
    "junbi",
    "bookends",
    "kazzi-soda",
    "creatives",
    "games",
    "work-experience",
    "contact",
  ],

  facts: [
    { label: "University", value: "BYU Marriott School of Business" },
    {
      label: "Program",
      value: "B.S. Business Strategic Management (Product Management emphasis)",
    },
    { label: "Academics", value: "GPA 3.79 · Dean's List" },
    { label: "Graduation", value: "Class of 2028" },
    { label: "Languages", value: "English + Japanese" },
  ],

  stats: [
    { value: "4,000+", label: "Junbi active users" },
    { value: "50+", label: "Universities reached" },
    { value: "170K+", label: "Organic views" },
    { value: "$0.05", label: "CAC" },
  ],

  education: {
    school: "BYU Marriott School of Business",
    degree: "B.S. Business Strategic Management",
    emphasis: "Emphasis in Product Management",
    graduationDate: "April 2028",
    gpa: "3.79",
    honors: ["Dean's List", "Product Management Association"],
  },

  projects: [
    {
      slug: "junbi",
      name: "Junbi",
      featured: true,
      oneLiner:
        "AI-powered study-podcast platform converting notes and materials into custom audio lessons.",
      description:
        "AI-powered study-podcast platform conceived, designed, and built solo. Grew to 4,000+ active users and 700+ registered accounts on a $30 budget, spread to 50+ universities, secured $2,500 in funding, and pitched Quizlet's CFO.",
      problem:
        "Students spend hours reading dense textbooks and notes without engaging audio alternatives that fit busy, on-the-go schedules.",
      whatIBuilt:
        "An AI study-podcast platform that transforms user study notes, slides, and documents into interactive audio lessons and review podcasts.",
      role: "Founder & Solo Developer (Conceived, designed, engineered, launched, and marketed independently).",
      client: "Junbi",
      date: "2026",
      metrics: [
        "4,000+ Active Users",
        "700+ Registered Accounts",
        "50+ Universities Reached",
        "$2,500 Funding Secured",
        "$0.05 CAC",
      ],
      techStack: ["Next.js", "Supabase", "Vercel", "Xcode / Swift", "AI Audio APIs"],
      url: "https://junbi.study",
      image: "/projects/junbi.png",
      imageFit: "contain",
      tags: ["AI Audio", "Full Stack", "Product Strategy", "iOS & Web"],
      background: "#f9fafb",
      accent: "#1bd3a9",
    },
    {
      slug: "bookends",
      name: "Bookends",
      featured: false,
      oneLiner:
        "A private, AI-guided journal that turns your unfiltered daily brain dump into a clear narrative, auditing your life to surface priorities.",
      description:
        "A private, AI-guided voice journal that turns your unfiltered daily brain dump into a clear narrative, auditing your life to surface hidden patterns, shifts, and priorities.",
      problem:
        "Traditional text journaling requires friction-heavy effort and rarely synthesizes long-term personal growth or actionable trends.",
      whatIBuilt:
        "An AI-powered voice journaling application that transcribes spoken thoughts into structured narratives and automatically audits key recurring life themes.",
      role: "Product Manager & Full Stack Engineer",
      client: "Bookends",
      date: "2025",
      metrics: [
        "AI Voice Processing",
        "Automated Life Audit",
        "Daily Narrative Generation",
      ],
      techStack: ["Next.js", "React Native", "AI Voice LLM", "Tailwind CSS"],
      url: "https://genfm.app",
      image: "/projects/bookends.png",
      imageFit: "contain",
      tags: ["AI Voice", "Mobile & Web", "Personal Analytics"],
      background: "#f8f7f2",
      accent: "#2e5a47",
    },
    {
      slug: "games",
      name: "What I'm working on now",
      featured: false,
      oneLiner:
        "Two AI-powered interactive social party games: Arena Games and Pitch-a-Biz.",
      description:
        "Designed and engineered two AI-powered party games — Arena Games and Pitch-a-Biz — blending dynamic LLM prompting with multiplayer social mechanics.",
      problem:
        "Standard board and party games can become repetitive and lack real-time adaptability to player choices and humorous edge cases.",
      whatIBuilt:
        "Two distinct AI party games: 'Arena Games' (a prompt battle arena) and 'Pitch-a-Biz' (an AI-judged rapid business pitch game).",
      role: "Game Designer & Lead Developer",
      client: "Independent",
      date: "2025",
      metrics: ["2 Original AI Games", "Interactive LLM Judge", "Rapid Prototype"],
      techStack: ["Next.js", "TypeScript", "LLM APIs", "Tailwind CSS"],
      url: "",
      image: "/projects/games.png",
      tags: ["Game Dev", "AI Prompting", "Multiplayer"],
      background: "#e2eee6",
      accent: "#3f6b53",
    },
    {
      slug: "kazzi-soda",
      name: "Kazzi Soda",
      featured: false,
      oneLiner:
        "Dirty soda recipe card decks paired with an organic social video marketing strategy.",
      description:
        "Dirty soda recipe card decks. Built the landing page at homesodabar.com and led the social video strategy, shooting and editing every video for TikTok.",
      problem:
        "Beverage enthusiasts want popular dirty soda recipes at home, but lack curated physical recipe guides and engaging video tutorials.",
      whatIBuilt:
        "A physical dirty soda recipe card deck, e-commerce landing page, and an organic TikTok content campaign.",
      role: "Product Creator & Content Director (Shot and edited every promotional video, managed physical production, and built the storefront).",
      client: "Kazzi Soda",
      date: "2024",
      metrics: [
        "100% Shot & Edited Videos",
        "170K+ Organic TikTok Views",
        "D2C Storefront Launched",
      ],
      techStack: ["Shopify", "Final Cut Pro / Premiere", "TikTok Creator Suite"],
      url: "https://homesodabar.com",
      secondaryLinks: [
        { label: "TikTok", url: "https://www.tiktok.com/@kazzisoda" },
      ],
      image: "/projects/kazzi-soda.jpg",
      tags: ["Consumer Product", "Content Strategy", "E-Commerce", "Video Production"],
      background: "#feeef0",
      accent: "#e31837",
    },
  ],

  // Cinematic, first-person case studies. Each entry's `slug` must match a
  // project above; when it does, that project's cards link to its dedicated
  // /projects/[slug] page instead of the generic /work/[slug] detail page
  // (see `lib/projects.ts`). Drop real screen recordings into /public and set
  // each `media.src` to replace the [VIDEO PLACEHOLDER] frames.
  caseStudies: [
    {
      slug: "junbi",
      eyebrow: "Case Study",
      tagline: "Turn your Quizlets and notes into AI-generated podcasts.",
      aboutTitle: "About the project",
      about: [
        "I built Junbi because studying only worked when I was sitting at a desk. Flashcards, Quizlet sets, lecture slides — all of it assumed my hands were free and my eyes were on a screen. My real review happened on walks, at the gym, on drives, and in the ten minutes between classes. None of it counted.",
        "Junbi turns the material you already have into an AI-generated podcast you can listen to anywhere. Drop in a Quizlet set, your notes, or a PDF, and it writes and narrates a review episode around exactly what you're trying to learn — no screen required.",
      ],
      meta: [
        { label: "Role", value: "Solo Founder & Builder" },
        { label: "Built at", value: "BYU Sandbox startup incubator" },
        { label: "Dates", value: "[INSERT DATE RANGE]" },
      ],
      liveLabel: "Visit junbi.study ↗",
      sections: [
        {
          number: "01",
          title: "The problem 🎧",
          blocks: [
            {
              body: [
                "Every study tool I tried assumed I was at a desk. Quizlet, flashcard apps, PDF annotators — they all need your eyes and your hands. But studying isn't only a desk activity. It's a commute, a walk, a workout, a wait in line.",
                "That gap is the whole product: audio-first review built from material you already made, for the moments you can't look at a screen.",
              ],
            },
          ],
          media: {
            caption: "Turning a Quizlet set into a listenable review podcast.",
            placeholderLabel: "[VIDEO PLACEHOLDER]",
            placeholderNote:
              "Screen recording: paste a Quizlet set and get a generated podcast episode back.",
            aspectRatio: "16 / 9",
          },
        },
        {
          number: "02",
          title: "Launching into silence",
          blocks: [
            {
              body: [
                "I launched, told everyone I knew, and watched signups trickle in and back out again. It was quiet — quieter than I expected after months of building.",
                "The lesson wasn't that people didn't want it. I had built for my own friction point and assumed everyone else shared it. Generic study content wasn't the ask.",
                "So I cut steps out of the flow and changed what Junbi generated: class-specific podcasts built from the student's own material, in their words, for their exam. That reframing is what finally started working.",
              ],
            },
          ],
          media: {
            caption:
              "Before and after: the signup flow, with the generic path replaced by class-specific podcasts.",
            placeholderLabel: "[VIDEO PLACEHOLDER]",
            placeholderNote:
              "Screen recording or side-by-side: the old flow next to the new class-specific flow.",
            aspectRatio: "16 / 9",
          },
        },
        {
          number: "03",
          title: "Redesigning the whole thing",
          blocks: [
            {
              body: [
                "The first interface made sense to me and to almost no one else. People signed up, poked around, and never found the thing that actually mattered.",
                "So I rebuilt the entire UI around real user feedback — moving the core action to where people already were, cutting the steps that hadn't earned their place, and making the first useful moment impossible to miss.",
              ],
            },
          ],
          media: {
            caption: "A walkthrough of the rebuilt UI, next to the version it replaced.",
            placeholderLabel: "[VIDEO PLACEHOLDER]",
            placeholderNote:
              "Screen recording: UI walkthrough, ideally a before/after comparison.",
            aspectRatio: "16 / 9",
          },
        },
        {
          number: "04",
          title: "4,000 users on $30 📈",
          blocks: [
            {
              body: [
                "Junbi grew to 4,000+ active users and 700+ registered accounts across 50+ universities — on a $30 marketing budget and about 20 hours of work.",
                "Most of that came from treating distribution as part of the product. I brought on a marketing collaborator to run campus distribution, which widened the reach and helped secure a $500 local grant.",
              ],
            },
          ],
          stats: [
            { value: "4,000+", label: "Active users" },
            { value: "700+", label: "Registered accounts" },
            { value: "50+", label: "Universities reached" },
            { value: "$0.05", label: "Cost per acquisition" },
            { value: "$30", label: "Total marketing budget" },
            { value: "$500", label: "Local grant secured" },
          ],
        },
        {
          number: "05",
          title: "Pitching Quizlet",
          blocks: [
            {
              body: [
                "Later in the build I got the chance to pitch Junbi directly to Quizlet's CFO — the company whose sets were already the front door to most of my users' study material.",
                "I brought the product, the numbers, and a specific idea for where Junbi fit alongside what Quizlet already did. Whatever comes of it, that conversation changed how I think about building next to a giant instead of against one.",
              ],
            },
          ],
        },
        {
          number: "06",
          title: "What I learned",
          blocks: [
            {
              body: [
                "A few things I'd tell myself before starting this.",
              ],
            },
          ],
          lessons: [
            "Ship, then watch. My first version was built on assumptions. Every real improvement came after I stopped guessing and watched what people actually did.",
            "Distribution is half the product. I could build fast, but Junbi only mattered once people could find it — and the $30 campaign taught me more than any feature did.",
            "Low signups are data, not failure. The quiet launch was the most honest feedback I got, because it arrived before I knew how to ask for it.",
            "Solo doesn't mean alone. Bringing in someone who owned distribution changed what I could build, because I stopped trying to do everything myself.",
          ],
        },
      ],
      closing: caseStudyClosing,
    },
    {
      slug: "bookends",
      eyebrow: "Case Study",
      tagline: "Turning personal reflection into a product for growth",
      aboutTitle: "About the project",
      about: [
        "I built Bookends to understand how I spend my time, identify unproductive habits, and become more intentional about my life. I saw an opportunity to combine journaling, task management, and AI into a single product that helps me turn reflection into action.",
        "I designed Bookends around my own workflows, iterating on features that make daily planning easier and personal insights more actionable.",
      ],
      meta: [
        { label: "Role", value: "Product Management · Product Design · Development" },
        { label: "Tools", value: "Cursor · AI / LLMs · Vector Search" },
        { label: "Type", value: "Personal Project" },
      ],
      sections: [
        {
          number: "01",
          title: "Design around real behavior",
          blocks: [
            {
              heading: "Make productivity actionable",
              body: [
                "I designed Bookends around a simple insight: I'm more productive when my priorities are visible and my day has structure.",
                "I built task groups, daily task selection, scheduling, and goal tracking to help me break larger ambitions into manageable daily actions. Rather than overwhelming myself with everything I need to do, I can focus on what matters today while keeping long-term goals in view.",
              ],
            },
          ],
          media: {
            src: "/projects/bookends/screenshot-1.png",
            caption: "Planning a day: pulling tasks into a focused list.",
            placeholderLabel: "[IMAGE PLACEHOLDER]",
            placeholderNote:
              "Screenshot: the daily planning view with tasks grouped and scheduled.",
            aspectRatio: "1374 / 1574",
          },
        },
        {
          number: "02",
          title: "Turn journaling into insights",
          blocks: [
            {
              heading: "From reflection to action",
              body: [
                "I wanted journaling to do more than document my experiences. I integrated AI features that summarize entries, identify potential time-wasting habits, and suggest practical improvements.",
                "This transformed journaling into a feedback loop: reflect on my day, recognize patterns, and adjust my behavior. The goal wasn't simply to track productivity, but to understand how I could improve it.",
              ],
            },
          ],
          media: {
            src: "/projects/bookends/screenshot-2.png",
            caption: "An entry, summarized back with the habits it surfaced.",
            size: "compact",
            placeholderLabel: "[IMAGE PLACEHOLDER]",
            placeholderNote:
              "Screenshot: a journal entry next to its AI summary and habit feedback.",
            aspectRatio: "1370 / 822",
          },
        },
        {
          number: "03",
          title: "Give AI a memory of my life",
          blocks: [
            {
              heading: "The challenge: connecting experiences over time",
              body: [
                "I wanted to ask Bookends questions about my life and have it reference relevant experiences from months ago. Feeding my entire journal history into every conversation would be inefficient, while keyword search would miss entries that expressed similar ideas using different language.",
              ],
            },
            {
              heading: "Building a semantic memory system",
              body: [
                "I implemented a retrieval-augmented generation (RAG) pipeline using vector embeddings and similarity search.",
                "Each journal entry is converted into a numerical representation of its meaning. When I ask a question, Bookends searches past entries for semantically similar experiences, retrieves the most relevant memories, and supplies them to the AI as context.",
                "For example, describing a lack of focus today can surface an entry from a month ago about burnout, even if the wording is completely different.",
                "The result is an AI that can connect past experiences to present challenges, helping me identify recurring patterns and better understand my behavior.",
              ],
            },
          ],
          media: {
            src: "/projects/bookends/screenshot-3.png",
            caption:
              "Asking a question and having the AI pull up related entries from months back.",
            size: "compact",
            placeholderLabel: "[IMAGE PLACEHOLDER]",
            placeholderNote:
              "Screenshot: an AI chat referencing retrieved journal entries as context.",
            aspectRatio: "1372 / 806",
          },
        },
        {
          number: "04",
          title: "Build for measurable personal growth",
          blocks: [
            {
              heading: "A product shaped by its user",
              body: [
                "Bookends brings planning, journaling, goal tracking, and AI-powered reflection into one system. Building it has helped me become more productive, develop better habits, and approach my goals with greater consistency.",
                "More importantly, this project gave me the opportunity to approach a personal problem as a product manager: identify a need, design a workflow around user behavior, prioritize useful features, and use technology to solve a problem that matters.",
                "Bookends remains a personal project, but its success is measured by something tangible: how effectively it helps me understand myself and improve the way I live.",
              ],
            },
          ],
          media: {
            src: "/projects/bookends/screenshot-4.png",
            caption: "The system in one place: plans, entries, and goals.",
            size: "compact",
            placeholderLabel: "[IMAGE PLACEHOLDER]",
            placeholderNote:
              "Screenshot: the combined planning, journaling, and goal-tracking view.",
            aspectRatio: "2940 / 1598",
          },
        },
      ],
      closing: caseStudyClosing,
    },
    {
      slug: "kazzi-soda",
      eyebrow: "Case Study",
      tagline: "Turning a growing drink trend into a physical product",
      aboutTitle: "About the project",
      about: [
        "I noticed that cocktail enthusiasts had recipe cards, but dirty soda lovers didn't. Seeing an opportunity to bring the same concept to a growing drink category, I designed Kazzi Soda: a physical deck of dirty soda recipes made for experimenting with flavors at home.",
        "I took the idea from concept to production, sourced manufacturers, calculated unit economics, and built an organic content strategy to introduce the product to customers.",
      ],
      meta: [
        {
          label: "Role",
          value: "Entrepreneurship · Product Design · Sourcing · Marketing",
        },
        { label: "Type", value: "Consumer Product · E-commerce" },
      ],
      liveLabel: "Visit homesodabar.com ↗",
      sections: [
        {
          number: "01",
          title: "Identify the opportunity",
          blocks: [
            {
              heading: "Bring cocktail culture to dirty soda",
              body: [
                "I saw an opportunity to make dirty soda recipes more accessible through a physical product. Inspired by cocktail recipe decks, I designed a collection of cards that made discovering and recreating drink combinations simple and fun.",
              ],
            },
          ],
          media: {
            src: "/projects/kazzi/logo.png",
            caption: "The Kazzi Soda brand mark designed for the recipe deck.",
            size: "compact",
            placeholderLabel: "[IMAGE PLACEHOLDER]",
            placeholderNote: "Screenshot: the Kazzi Soda logo and brand identity.",
            aspectRatio: "1200 / 640",
          },
        },
        {
          number: "02",
          title: "Take the product to market",
          blocks: [
            {
              heading: "Design, sourcing, and unit economics",
              body: [
                "I designed the complete recipe deck and sourced manufacturers for both the cards and their holders. Finding the right supplier meant comparing pricing, production options, and minimum order quantities.",
                "I ultimately found a manufacturer willing to produce an initial run of just 50 units. I calculated unit economics across manufacturing, shipping, packaging, and selling price to understand the costs and viability of the product.",
                "The finished product launched at approximately $25 per deck, available through Etsy and my own website.",
              ],
            },
          ],
          media: {
            src: "/projects/kazzi/product-photo.jpg",
            caption: "A product photo of the Kazzi Soda recipe deck.",
            size: "compact",
            placeholderLabel: "[IMAGE PLACEHOLDER]",
            placeholderNote:
              "Photo: the finished recipe deck and its holders.",
            aspectRatio: "1600 / 1199",
          },
        },
        {
          number: "03",
          title: "Experiment with organic marketing",
          blocks: [
            {
              heading: "52 videos, one distribution strategy",
              body: [
                "I created 52 short-form videos demonstrating recipes from the deck, filming and publishing content across TikTok and YouTube.",
                "Rather than relying on a single format, I experimented with hooks, on-screen text, background music, and video styles. I found that strong opening hooks and seamless loops tended to perform better, while energy-drink-related content often attracted more views on TikTok.",
              ],
            },
            {
              heading: "From attention to sales",
              body: [
                "The videos generated more than 170,000 views across TikTok and YouTube. Combined with Etsy and website sales, the initial launch generated five sales from the first 50-unit production run.",
                "Although views haven't translated into consistent sales yet, the experiment gave me firsthand experience testing content, identifying engagement patterns, and evaluating the gap between attention and purchase intent.",
              ],
            },
          ],
          media: {
            src: "/projects/kazzi/analytics-1.png",
            caption: "Audience analytics for the Kazzi Soda video campaign.",
            size: "compact",
            placeholderLabel: "[IMAGE PLACEHOLDER]",
            placeholderNote:
              "Screenshot: TikTok analytics across the 52-video campaign.",
            aspectRatio: "1600 / 1047",
          },
        },
        {
          number: "04",
          title: "Learn through iteration",
          blocks: [
            {
              heading: "Understanding the gap between views and revenue",
              body: [
                "Kazzi Soda is still available for purchase, and the business remains a work in progress.",
                "Building Kazzi Soda taught me how to evaluate a product opportunity, manage manufacturing trade-offs, calculate unit economics, and test marketing strategies with real customers.",
                "The next challenge is improving conversion: turning content engagement into purchases and finding a repeatable way to grow the business.",
              ],
            },
          ],
          media: {
            src: "/projects/kazzi/analytics-2.png",
            caption: "Reach and views analytics across the Kazzi Soda content.",
            size: "compact",
            placeholderLabel: "[IMAGE PLACEHOLDER]",
            placeholderNote:
              "Screenshot: reach and views across TikTok and YouTube.",
            aspectRatio: "1600 / 1053",
          },
        },
      ],
      closing: caseStudyClosing,
    },
  ],

  experience: [
    {
      company: "Junbi — BYU Sandbox Incubator",
      role: "Co-Founder & CEO",
      location: "Provo, UT",
      startDate: "Jan 2026",
      endDate: "Present",
      bullets: [
        "Conceived, designed, and built an AI study-podcast platform from the ground up, owning product strategy, full-stack engineering, AI pipeline, database, authentication, and deployment using Vercel, Cursor, Xcode, SQL, and Supabase.",
        "Ran a targeted campus marketing campaign, turning 20 hours and a $30 budget into 4,000+ active users and 700+ registered accounts across 50+ universities with a $0.05 CAC.",
        "Secured $2,500 in institutional funding and pitched a product partnership and acquisition directly to Quizlet’s CFO.",
      ],
    },
    {
      company: "Independent E-Commerce Ventures",
      role: "Founder",
      location: "Provo, UT",
      startDate: "Mar 2020",
      endDate: "Present",
      bullets: [
        "Launched and operated 3 direct-to-consumer brands (Chalant Clothes, Kazzi Soda, and Tokyo Treasures), generating $4,400+ revenue with 100% positive reviews.",
        "Amplified brand reach by designing and executing Meta ads across 5 universities, achieving $0.21–$0.29 CPC on 500+ clicks.",
        "Scaled to 170,000+ organic views on YouTube and TikTok and developed B2B wholesale partnerships with retail stores.",
      ],
    },
    {
      company: "Wheatley Institute, BYU",
      role: "Videography & Photography Lead",
      location: "Provo, UT",
      startDate: "Dec 2024",
      endDate: "Jan 2026",
      bullets: [
        "Directed photography and social media content strategy, growing channel subscribers by 2,800+ and driving 82,000+ views.",
        "Photographed high-profile events featuring Senator Mitt Romney, with work published in BYU Marriott School News and The Deseret News.",
        "Managed end-to-end video production and media workflows in Adobe Premiere Pro, DaVinci Resolve, Photoshop, After Effects, and Lightroom.",
      ],
    },
  ],

  photos: [
    {
      src: "/photography/salt-lake-city-utah.jpg",
      alt: "Salt Lake City downtown skyline against the Wasatch Mountains",
      caption: "Salt Lake City, Utah — Skyline view framing the Wasatch mountain backdrop.",
    },
    {
      src: "/photography/provo-utah.jpg",
      alt: "Provo, Utah golden hour cityscape",
      caption: "Provo, Utah — Golden hour reflections over Utah Valley.",
    },
    {
      src: "/photography/provo-utah-2.jpg",
      alt: "Provo valley at twilight",
      caption: "Provo, Utah — Twilight mood across the city.",
    },
    {
      src: "/photography/provo-utah-3.jpg",
      alt: "Provo mountain peaks at sunset",
      caption: "Provo, Utah — Sunset light over mountain peaks.",
    },
    {
      src: "/photography/provo-canyon-utah.jpg",
      alt: "Provo Canyon autumn foliage",
      caption: "Provo Canyon, Utah — Autumn foliage along the canyon floor.",
    },
    {
      src: "/photography/byu-campus.jpg",
      alt: "BYU Campus grounds in Provo",
      caption: "BYU Campus, Provo — Campus grounds during late afternoon light.",
    },
    {
      src: "/photography/sundance-utah.jpg",
      alt: "Sundance mountain resort scenery",
      caption: "Sundance, Utah — Mountain scenery in alpine forest.",
    },
    {
      src: "/photography/draper-utah.jpg",
      alt: "Draper vista over Salt Lake Valley",
      caption: "Draper, Utah — Panoramic vista overlooking Salt Lake Valley.",
    },
    {
      src: "/photography/american-fork-utah.jpg",
      alt: "American Fork mountain pass",
      caption: "American Fork, Utah — Mountain pass and natural landscapes.",
    },
    {
      src: "/photography/bergen-norway.jpg",
      alt: "Bergen historic waterfront architecture",
      caption: "Bergen, Norway — Coastal waterfront and colorful historic architecture.",
    },
    {
      src: "/photography/fjords-norway.jpg",
      alt: "Norwegian fjord landscape with steep cliffs",
      caption: "Fjords, Norway — Dramatic glacier fjord waters and mountain cliffs.",
    },
    {
      src: "/photography/fjords-norway-2.jpg",
      alt: "Misty mountain valleys in Norwegian fjords",
      caption: "Fjords, Norway — Fog and deep green valleys along Norwegian fjords.",
    },
    {
      src: "/photography/iceland.jpg",
      alt: "Icelandic volcanic landscape",
      caption: "Iceland — Volcanic landscapes and natural black sand terrain.",
    },
    {
      src: "/photography/iceland-2.jpg",
      alt: "Icelandic waterfall and horizon",
      caption: "Iceland — Glacial waterfalls and open horizon.",
    },
    {
      src: "/photography/osaka-japan.jpg",
      alt: "Osaka vibrant street life",
      caption: "Osaka, Japan — Urban street scenes and vibrant culture.",
    },
    {
      src: "/photography/osaka-japan-2.jpg",
      alt: "Osaka neon night lights in Dotonbori",
      caption: "Osaka, Japan — Night lights and architectural angles in Dotonbori.",
    },
    {
      src: "/photography/egypt.jpg",
      alt: "Egyptian desert and ancient monuments",
      caption: "Egypt — Historic monuments and desert horizons.",
    },
    {
      src: "/photography/egypt-2.jpg",
      alt: "Ancient Egyptian temple stone carvings",
      caption: "Egypt — Ancient temple architecture and timeless stone carvings.",
    },
    {
      src: "/photography/jordan.jpg",
      alt: "Petra Jordan sandstone canyon vista",
      caption: "Jordan — Sandstone canyons and ancient desert vistas of Petra.",
    },
  ],

  videos: [
    {
      title: "Wheatley Institute Feature Production 1",
      youtubeId: "fKAnp7L7uqI",
      description: "Edited and produced for the Wheatley Institute research channel.",
      category: "Documentary & Academic",
    },
    {
      title: "Wheatley Institute Feature Production 2",
      youtubeId: "FhDnQcuPK7Q",
      description: "Higher education research highlight and commentary feature.",
      category: "Documentary & Academic",
    },
    {
      title: "Wheatley Institute Feature Production 3",
      youtubeId: "8C2mmAkzrWo",
      description: "Produced and edited narrative short for academic outreach.",
      category: "Documentary & Academic",
    },
    {
      title: "Wheatley Institute Feature Production 4",
      youtubeId: "VbL6OZFTNAw",
      description: "Event highlights and scholar interview production.",
      category: "Documentary & Academic",
    },
  ],

  videography: {
    tools: [
      "Premiere Pro",
      "DaVinci Resolve",
      "After Effects",
      "Photoshop",
      "Lightroom",
    ],
    wheatleyImpact: {
      title: "Wheatley Institute Production Impact",
      description:
        "Led video editing, pacing, and channel optimization strategy for academic, policy, and research content.",
      subscribersGained: "2,800+",
      viewsGained: "82,000+",
    },
    kazziTikTok: {
      handle: "@kazzisoda",
      profileUrl: "https://www.tiktok.com/@kazzisoda",
      note: "I shot and edited every video for Kazzi Soda — generating over 170,000 organic views on TikTok.",
      videos: [
        {
          title: "Kazzi Soda TikTok Highlight 1",
          url: "https://www.tiktok.com/@kazzisoda/video/7639798403756576014",
        },
        {
          title: "Kazzi Soda TikTok Highlight 2",
          url: "https://www.tiktok.com/@kazzisoda/video/7623116180273876255",
        },
        {
          title: "Kazzi Soda Short Recipe Feature",
          url: "https://www.youtube.com/shorts/_9e2NMAVckU",
          isYouTubeShort: true,
          youtubeId: "_9e2NMAVckU",
        },
      ],
    },
  },
};

export default site;
