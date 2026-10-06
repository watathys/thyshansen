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
  /** Primary headline for the card (optional, defaults to preset title). */
  title?: string;
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
  /**
   * Optional path relative to /public for this card's media-stage image
   * (e.g. the Contact card's photo). Falls back to a monogram card when
   * unset or missing from /public.
   */
  image?: string;
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

export interface SideProjectPhoto {
  src: string;
  alt: string;
  caption?: string;
  aspectRatio: string;
}

export interface InlineLink {
  text: string;
  url: string;
}

export interface SideProjectParagraph {
  text: string;
  links?: InlineLink[];
}

export type SideProjectParagraphContent = string | SideProjectParagraph;

export interface SideProjectStep {
  kicker: string;
  title: string;
  body: SideProjectParagraphContent[];
  photo?: SideProjectPhoto;
  subheading?: string;
  subBody?: SideProjectParagraphContent[];
}

export interface SideProjectItem {
  id: string;
  name: string;
  tagline: string;
  aboutTitle: string;
  about: string[];
  meta: Fact[];
  visitLink?: {
    label: string;
    href: string;
  };
  photo?: SideProjectPhoto;
  steps: SideProjectStep[];
}

export interface SideProjectsData {
  slug: string;
  eyebrow: string;
  title: string;
  lede: string;
  projects: SideProjectItem[];
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
  /** Dedicated content for the multi-project "Side Projects" presentation. */
  sideProjects: SideProjectsData;
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
    "I'm a product builder first, business student second. Over the past year I took Junbi from a blank repo to 4,000+ active users across 50+ universities on a $30 budget — writing the go-to-market plan and the code that shipped it. I'm studying Business Strategic Management with a Product Management emphasis at BYU Marriott, but most of what I know came from doing: founding three bootstrapped e-commerce brands, leading regional volunteer training for 80+ peers in Sapporo, Japan, and running video production for events with a U.S. senator. I'm drawn to the seam between strategy and execution — the GTM plan and the ad campaign, the user interview and the pull request — and I'm looking for a product management role where I can keep working both sides at once.",
  headshot: "/headshot.jpg",
  resumeImage: "/work-experience.png",
  resumeUrl: "/resume.pdf",
  email: "watathys@gmail.com",
  linkedin: "https://linkedin.com/in/thysh",
  instagram: "",
  url: "https://thyshansen.com",

  // Kept minimal by design: the header only ever shows the name (links
  // home) plus this one link. Everything else is reached from within the
  // homepage hero slider or in-page CTAs.
  navLinks: [{ label: "About", href: "/about" }],

  preloader: {
    role: "Product-minded strategist",
    caption: "Let's talk :)",
    label: "Loading portfolio",
  },

  heroIntro: {
    eyebrow: "About Me",
    description:
      "Business strategy student at BYU who builds and ships products — focused on product management, full-stack prototyping, and zero-to-one ventures.",
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
    title: "Let's talk product",
    description:
      "Open to product management internships and full-time roles. The fastest way to reach me is email or LinkedIn.",
    ctaLabel: "Email Me",
    href: "mailto:watathys@gmail.com",
    background: "#e6eaf0",
    accent: "#3e4c6b",
    image: "/contact.jpg",
    links: [
      { label: "Email", url: "mailto:watathys@gmail.com" },
      { label: "LinkedIn", url: "https://linkedin.com/in/thysh" },
    ],
  },

  sideProjects: {
    slug: "side-projects",
    eyebrow: "Side Projects",
    title: "Side projects",
    lede: "Products I've built, tested, and sold alongside school, and what the numbers taught me.",
    projects: [
      {
        id: "kazzi-soda",
        name: "Kazzi Soda",
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
          {
            label: "Type",
            value: "Consumer Product · E-commerce",
          },
        ],
        visitLink: {
          label: "Visit homesodabar.com ↗",
          href: "https://homesodabar.com/",
        },
        photo: {
          src: "/projects/side-projects/kazziSoda2.jpg",
          alt: "Kazzi Soda dirty soda recipe cards fanned out showing colorful drink recipes",
          caption: "The finished Kazzi Soda dirty soda recipe card deck",
          aspectRatio: "2390 / 1792",
        },
        steps: [
          {
            kicker: "01 · Identify the opportunity",
            title: "Bring cocktail culture to dirty soda",
            body: [
              "I saw an opportunity to make dirty soda recipes more accessible through a physical product. Inspired by cocktail recipe decks, I designed a collection of cards that made discovering and recreating drink combinations simple and fun.",
            ],
          },
          {
            kicker: "02 · Take the product to market",
            title: "Design, sourcing, and unit economics",
            body: [
              "I designed the complete recipe deck and sourced manufacturers for both the cards and their holders. Finding the right supplier meant comparing pricing, production options, and minimum order quantities.",
              "I ultimately found a manufacturer willing to produce an initial run of just 50 units. I calculated unit economics across manufacturing, shipping, packaging, and selling price to understand the costs and viability of the product.",
              "The finished product launched at approximately $25 per deck, available through Etsy and my own website.",
            ],
          },
          {
            kicker: "03 · Experiment with organic marketing",
            title: "52 videos, one distribution strategy",
            body: [
              "I created 52 short-form videos demonstrating recipes from the deck, filming and publishing content across TikTok and YouTube.",
              "Rather than relying on a single format, I experimented with hooks, on-screen text, background music, and video styles. I found that strong opening hooks and seamless loops tended to perform better, while energy-drink-related content often attracted more views on TikTok.",
            ],
            photo: {
              src: "/projects/side-projects/kazziSoda1.png",
              alt: "Kazzi Soda YouTube analytics showing 112K views and watch time across the campaign",
              caption: "Kazzi Soda organic video reach and audience analytics",
              aspectRatio: "1714 / 1122",
            },
            subheading: "From attention to sales",
            subBody: [
              {
                text: "The videos generated more than 170,000 views across TikTok and YouTube. Combined with Etsy and website sales, the initial launch generated five sales from the first 50-unit production run.",
                links: [
                  { text: "TikTok", url: "https://www.tiktok.com/@kazzisoda" },
                  { text: "YouTube", url: "https://www.youtube.com/@KazziSoda" },
                ],
              },
              "Although views haven't translated into consistent sales yet, the experiment gave me firsthand experience testing content, identifying engagement patterns, and evaluating the gap between attention and purchase intent.",
            ],
          },
          {
            kicker: "04 · Learn through iteration",
            title: "Understanding the gap between views and revenue",
            body: [
              "Kazzi Soda is still available for purchase, and the business remains a work in progress.",
              "Building Kazzi Soda taught me how to evaluate a product opportunity, manage manufacturing trade-offs, calculate unit economics, and test marketing strategies with real customers.",
              "The next challenge is improving conversion: turning content engagement into purchases and finding a repeatable way to grow the business.",
            ],
          },
        ],
      },
      {
        id: "tokyo-treasures",
        name: "Tokyo Treasures",
        tagline:
          "Finding underpriced products, testing demand, and expanding into new categories since 2020",
        aboutTitle: "About the project",
        about: [
          "I started Tokyo Treasures in high school during COVID. I had nothing but free time and wanted to make the most of it and earn money, so I looked for products I could buy for less than they were worth and resell. Over the next few years it grew from a single idea into three product lines, with more than $9,600 in total sales.",
        ],
        meta: [
          {
            label: "Role",
            value: "Sourcing · Pricing · Product Selection · Operations",
          },
          {
            label: "Type",
            value: "Reselling · E-commerce (eBay)",
          },
          {
            label: "Results",
            value:
              "$9,600+ in total sales · 119 orders · 113 buyers · 100% positive reviews",
          },
        ],
        photo: {
          src: "/projects/side-projects/tokyoTreasuresPhoto.png",
          alt: "Tokyo Treasures eBay profile banner showing 100% positive feedback and 121 items sold",
          caption: "Tokyo Treasures storefront and track record on eBay",
          aspectRatio: "2612 / 590",
        },
        steps: [
          {
            kicker: "Phase 1 · Find the gap",
            title: "LEGO sets",
            body: [
              "I saw an opportunity in buying and reselling LEGO sets. It was my first test of whether I could consistently find products priced below what buyers would pay. I sold 23 sets, averaging about $92 each.",
            ],
          },
          {
            kicker: "Phase 2 · Add value to the product",
            title: "Pokémon cards and PSA grading",
            body: [
              "I expanded into Pokémon cards by buying underpriced ones, sending the best to PSA for grading, and selling them. I had researched the market and knew that highly graded cards can command much higher prices, and I checked my cards were in excellent condition before paying to grade them.",
              "To price each card, I looked at what the same card had recently sold for and priced mine in line with those sales. The grading bet paid off: my 16 PSA-graded cards averaged about $126 per sale, compared with about $16 for ungraded cards. The top sale was a PSA 9 Charizard for $549.99.",
            ],
          },
          {
            kicker: "Phase 3 · Open a new supply channel",
            title: "Buying in Japan, selling in the United States",
            body: [
              "I then expanded to items I bought secondhand in Japan, looking for things that would sell for more in the United States than they cost in Japan. This phase was my busiest: 2024 was my highest-volume year, with 50 sales across Japanese video games, anime figures, collectibles, and more.",
            ],
          },
          {
            kicker: "Takeaways",
            title: "What I learned",
            body: [
              "Tokyo Treasures taught me to validate demand with real sales data before setting a price, to decide what to buy based on what has already worked, and to keep customers happy while the product mix changes. Each new category started with a small test, and I kept the ones that worked.",
            ],
          },
        ],
      },
    ],
    closing: caseStudyClosing,
  },

  // Side Projects and other info cards intentionally interleave with
  // the Creatives teaser: info cards sit between projects in the hero.
  heroSlideOrder: [
    "intro",
    "junbi",
    "side-projects",
    "bookends",
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
    {
      label: "Languages",
      value: "English + Japanese (2 years living in Sapporo, Japan)",
    },
    {
      label: "Leadership",
      value: "Eagle Scout · Selected from 80+ peers for regional leadership role",
    },
    {
      label: "Beyond the resume",
      value: "1st Team All-State XC · Utah Piano Competition winner",
    },
    { label: "Travel", value: "15+ countries, incl. Japan, Iceland, Egypt, Thailand" },
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
      slug: "side-projects",
      name: "Side Projects",
      featured: false,
      oneLiner:
        "Products I've built, tested, and sold alongside school, and what the numbers taught me.",
      description:
        "Products built, tested, and sold alongside school — from dirty soda recipe decks (Kazzi Soda) to secondhand Japanese imports and collectibles (Tokyo Treasures).",
      problem:
        "Testing real consumer demand, finding pricing inefficiencies, and building customer trust across physical products and e-commerce channels.",
      whatIBuilt:
        "Two physical product businesses: Kazzi Soda (recipe deck manufactured and marketed through 52 short-form videos) and Tokyo Treasures (multi-category reselling operation generating $9,600+ across 119 orders).",
      role: "Founder, Product Designer & Operator",
      client: "Independent Ventures",
      date: "2020 – Present",
      metrics: [
        "$9,600+ Tokyo Treasures Sales",
        "170K+ Kazzi Soda Views",
        "100% Positive Feedback (119 Orders)",
      ],
      techStack: ["E-Commerce", "Shopify", "eBay", "TikTok Creator Suite", "Sourcing"],
      url: "https://homesodabar.com",
      secondaryLinks: [
        { label: "TikTok", url: "https://www.tiktok.com/@kazzisoda" },
      ],
      image: "/projects/side-projects/card.jpg",
      tags: ["Side Projects", "E-Commerce", "Physical Products", "Sourcing"],
      background: "#fbfbf9",
      accent: "#1f5cd6",
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
        "AI Assisted Journaling",
        "Automated Life Audit",
        "Daily Narrative Generation",
      ],
      techStack: ["Next.js", "React Native", "AI Assisted Journaling", "Tailwind CSS"],
      url: "https://genfm.app",
      image: "/projects/bookends.png",
      imageFit: "contain",
      tags: ["AI Assisted Journaling", "Mobile & Web", "Personal Analytics"],
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
      image: "/projects/games.jpg",
      tags: ["Game Dev", "AI Prompting", "Multiplayer"],
      background: "#e2eee6",
      accent: "#3f6b53",
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
            src: "/projects/junbi/junbi-photo-1.png",
            caption: "Junbi turning notes and study material into audio lessons.",
            placeholderLabel: "[IMAGE PLACEHOLDER]",
            placeholderNote:
              "Junbi mobile interface showing audio study podcasts generated from course material.",
            aspectRatio: "1080 / 1350",
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
            src: "/projects/junbi/junbi-video.mp4",
            poster: "/projects/junbi/junbi-video-poster.jpg",
            caption: "A walkthrough of the rebuilt UI, before and after redesigning the discovery experience.",
            size: "compact",
            placeholderLabel: "[VIDEO PLACEHOLDER]",
            placeholderNote:
              "Screen recording: UI walkthrough showing the redesigned Junbi interface.",
            aspectRatio: "848 / 464",
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
      slug: "side-projects",
      eyebrow: "Case Study",
      tagline:
        "Products I've built, tested, and sold alongside school, and what the numbers taught me.",
      aboutTitle: "About the projects",
      about: [
        "Products I've built, tested, and sold alongside school, and what the numbers taught me.",
      ],
      meta: [
        {
          label: "Role",
          value: "Entrepreneurship · Product Design · Sourcing · Operations",
        },
        { label: "Type", value: "Consumer Products · E-commerce · Reselling" },
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
            src: "/projects/side-projects/kazziSoda2.jpg",
            caption: "The Kazzi Soda physical recipe deck fanned out.",
            size: "compact",
            placeholderLabel: "[IMAGE PLACEHOLDER]",
            placeholderNote: "Finished recipe deck photo.",
            aspectRatio: "2390 / 1792",
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
            src: "/projects/side-projects/kazziSoda1.png",
            caption:
              "Analytics across the Kazzi Soda organic marketing campaign.",
            size: "compact",
            placeholderLabel: "[IMAGE PLACEHOLDER]",
            placeholderNote:
              "Analytics across TikTok and YouTube video campaign.",
            aspectRatio: "1714 / 1122",
          },
        },
        {
          number: "03",
          title: "Tokyo Treasures",
          blocks: [
            {
              heading: "Finding underpriced products and expanding categories",
              body: [
                "I started Tokyo Treasures in high school during COVID. I had nothing but free time and wanted to make the most of it and earn money, so I looked for products I could buy for less than they were worth and resell. Over the next few years it grew from a single idea into three product lines, with more than $9,600 in total sales.",
              ],
            },
          ],
          media: {
            src: "/projects/side-projects/tokyoTreasuresPhoto.png",
            caption: "Tokyo Treasures storefront and sales record on eBay.",
            size: "compact",
            placeholderLabel: "[IMAGE PLACEHOLDER]",
            placeholderNote: "Tokyo Treasures eBay storefront.",
            aspectRatio: "2612 / 590",
          },
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
    },
    {
      src: "/photography/provo-utah.jpg",
      alt: "Provo, Utah golden hour cityscape",
    },
    {
      src: "/photography/provo-utah-3.jpg",
      alt: "Provo mountain peaks at sunset",
    },
    {
      src: "/photography/provo-canyon-utah.jpg",
      alt: "Provo Canyon autumn foliage",
    },
    {
      src: "/photography/byu-campus.jpg",
      alt: "BYU Campus grounds in Provo",
    },
    {
      src: "/photography/sundance-utah.jpg",
      alt: "Sundance mountain resort scenery",
    },
    {
      src: "/photography/draper-utah.jpg",
      alt: "Draper vista over Salt Lake Valley",
    },
    {
      src: "/photography/american-fork-utah.jpg",
      alt: "American Fork mountain pass",
    },
    {
      src: "/photography/bergen-norway.jpg",
      alt: "Bergen historic waterfront architecture",
    },
    {
      src: "/photography/fjords-norway.jpg",
      alt: "Norwegian fjord landscape with steep cliffs",
    },
    {
      src: "/photography/fjords-norway-2.jpg",
      alt: "Misty mountain valleys in Norwegian fjords",
    },
    {
      src: "/photography/iceland.jpg",
      alt: "Icelandic volcanic landscape",
    },
    {
      src: "/photography/iceland-2.jpg",
      alt: "Icelandic waterfall and horizon",
    },
    {
      src: "/photography/osaka-japan.jpg",
      alt: "Osaka vibrant street life",
    },
    {
      src: "/photography/osaka-japan-2.jpg",
      alt: "Osaka neon night lights in Dotonbori",
    },
    {
      src: "/photography/egypt.jpg",
      alt: "Egyptian desert and ancient monuments",
    },
    {
      src: "/photography/egypt-2.jpg",
      alt: "Ancient Egyptian temple stone carvings",
    },
    {
      src: "/photography/jordan.jpg",
      alt: "Petra Jordan sandstone canyon vista",
    },
  ],

  videos: [
    {
      title: "Wheatley Institute Feature Production 1",
      youtubeId: "fKAnp7L7uqI",
      category: "Documentary & Academic",
    },
    {
      title: "Wheatley Institute Feature Production 2",
      youtubeId: "FhDnQcuPK7Q",
      category: "Documentary & Academic",
    },
    {
      title: "Wheatley Institute Feature Production 3",
      youtubeId: "8C2mmAkzrWo",
      category: "Documentary & Academic",
    },
    {
      title: "Fun video I made about an apple because I was bored.",
      youtubeId: "VbL6OZFTNAw",
      category: "For Fun",
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
