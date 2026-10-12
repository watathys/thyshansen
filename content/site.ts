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

/**
 * The "Thys Hansen" intro/about content — the subheading under the name in the
 * hero overlay plus the first-person intro, academic background, and quick
 * facts shown when the intro card is opened (and on `/about`). Metrics and
 * facts themselves live in `site.stats` / `site.facts` / `site.education`.
 */
export interface AboutContent {
  /** One-line subheading under the name in the hero overlay. */
  subheading: string;
  /** Heading above the first-person intro, e.g. "About me". */
  title: string;
  /** First-person intro paragraphs, in order. */
  paragraphs: string[];
  /** Small tracked label above the academic background card. */
  educationLabel: string;
  /** Label preceding the inline honors list, e.g. "Honors & organizations". */
  honorsLabel: string;
  /** Label for the link to the resume, e.g. "View resume PDF". */
  resumeLinkLabel: string;
  /** Small tracked label above the quick-facts list. */
  factsLabel: string;
  /** Primary CTA at the foot of the content. */
  resumeCtaLabel: string;
  /** Secondary CTA at the foot of the content. */
  contactCtaLabel: string;
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
  /**
   * One or more first-person statements, rendered as a bulleted list so the
   * whole case study stays skimmable.
   */
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
  /**
   * Renders the `about` paragraphs at case-study section-heading size (a
   * statement-style intro) instead of body copy. Defaults to body copy.
   */
  aboutEmphasis?: boolean;
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
  /** Small tracked label above the title. Optional — omitted steps show the title alone. */
  kicker?: string;
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
  /** Heading above the intro paragraphs. Optional — omitted projects lead with the paragraphs. */
  aboutTitle?: string;
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
  /** Copy for the "Thys Hansen" intro card's overlay and the `/about` page. */
  about: AboutContent;
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
  title: "Let’s work together",
  body: "I’m looking for product management internships and full-time roles where I can work close to users, make thoughtful product decisions, and ship quickly. If that sounds useful to your team, I’d love to talk.",
  links: [
    { label: "Email me", url: "mailto:watathys@gmail.com" },
    { label: "LinkedIn", url: "https://linkedin.com/in/thysh" },
  ],
  archiveLabel: "All projects",
  archiveHref: "/",
};

/** The Side Projects closing — same shape as the shared one, tuned copy. */
const sideProjectsClosing: CaseStudyClosing = {
  ...caseStudyClosing,
  body: "I’m looking for product management internships and full-time roles where I can work close to users, make thoughtful product decisions, and ship quickly. If that’s what your team needs, I’d love to talk.",
  links: [{ label: "Email me", url: "mailto:watathys@gmail.com" }],
};

export const site: SiteContent = {
  name: "Thys Hansen",
  tagline: "Business strategy student who builds and ships products.",
  intro:
    "I bridge strategic business thinking with technical execution to design, build, and scale products people love.",
  bio:
    "I'm a product builder first, business student second. Over the past year I took Junbi from a blank repo to 4,000+ active users across 50+ universities on a $30 budget — writing the go-to-market plan and the code that shipped it. I'm studying Business Strategic Management with a Product Management emphasis at BYU Marriott, but most of what I know came from doing: founding three bootstrapped e-commerce brands, leading regional volunteer training for 80+ peers in Sapporo, Japan, and running video production for events with a U.S. senator. I'm drawn to the seam between strategy and execution — the GTM plan and the ad campaign, the user interview and the pull request — and I'm looking for a product management role where I can keep working both sides at once.",
  about: {
    subheading: "Product builder at the intersection of strategy and execution.",
    title: "About me",
    paragraphs: [
      "I build products from the first user problem through launch and iteration. At BYU, I took Junbi from a blank repo to 4,400+ active users across 100+ universities, while building the product and testing a go-to-market strategy on a $30 marketing budget.",
      "I’m studying Business Strategic Management with a Product Management emphasis at BYU Marriott. Outside the classroom, I’ve built bootstrapped businesses, led regional volunteer training for 80+ peers in Japan, and run photography and videography production for events with U.S. senators. I’m looking for a product management role where I can connect customer needs, business strategy, and hands-on execution.",
    ],
    educationLabel: "Academic background",
    honorsLabel: "Honors & organizations",
    resumeLinkLabel: "View resume PDF",
    factsLabel: "Quick facts",
    resumeCtaLabel: "View Resume & Experience",
    contactCtaLabel: "Get in Touch",
  },
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
    lede: "Turning ideas into products, and products into real experience.",
    projects: [
      {
        id: "kazzi-soda",
        name: "Kazzi Soda",
        tagline: "A dirty soda recipe deck, from idea to first sales.",
        about: [
          "I saw an opportunity to bring cocktail recipe cards to dirty soda because the popularity of dirty soda was exploding.",
          "I designed the deck, sourced manufacturers, worked through production costs, and launched it on Etsy and my website.",
        ],
        meta: [
          {
            label: "Role",
            value:
              "Entrepreneurship · Product design · Sourcing · Marketing",
          },
          {
            label: "Type",
            value: "Consumer product · E-commerce",
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
            title: "Building and pricing",
            body: [
              "I compared manufacturers, production, and minimum order quantities.",
              "I found a supplier to make an initial run of 50 decks.",
              "I calculated costs across manufacturing, shipping, and packaging, and launched the deck for $25.",
            ],
          },
          {
            title: "Marketing on $0",
            body: [
              "I made 52 short videos for TikTok and YouTube, testing hooks, text, music, and formats.",
              "The videos reached 170,000+ views, and generated sales with 0 ad spend.",
            ],
            photo: {
              src: "/projects/side-projects/kazziSoda1.png",
              alt: "Kazzi Soda YouTube analytics showing 112K views and watch time across the campaign",
              caption: "Kazzi Soda organic video reach and audience analytics",
              aspectRatio: "1714 / 1122",
            },
          },
          {
            title: "What I learned",
            body: [
              "Kazzi Soda gave me hands-on experience evaluating an idea, dealing with production trade offs, and testing marketing with real customers.",
              "The next challenge is improving conversion and finding a repeatable way to grow sales.",
            ],
          },
        ],
      },
      {
        id: "tokyo-treasures",
        name: "Tokyo Treasures",
        tagline:
          "Finding underpriced products, testing demand, and expanding into new categories",
        about: [
          "I started reselling during COVID by looking for products I could buy below market value.",
          "Over time, I tested three product categories and generated $9,600+ in sales across 119 orders, with 100% positive reviews.",
        ],
        meta: [
          {
            label: "Role",
            value: "Sourcing · Pricing · Product selection · Operations",
          },
          {
            label: "Type",
            value: "Reselling · E-commerce",
          },
          {
            label: "Platform",
            value: "eBay",
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
            title: "Start with LEGO",
            body: [
              "I began by buying and reselling LEGO sets to test whether I could consistently find products buyers wanted.",
              "I sold 23 sets for an average of about $92 each.",
            ],
          },
          {
            title: "Add value with Pokémon grading",
            body: [
              "With Pokémon cards trending I tried to capitalize on the trend.",
              "I would buy undervalued Pokémon cards, then send them to PSA for grading.",
              "My 16 graded cards averaged about $126 per sale, compared with about $16 for ungraded cards.",
              "My top sale was a PSA 9 Charizard for $549.99.",
            ],
          },
          {
            title: "Expand sourcing to Japan",
            body: [
              "I began buying secondhand items in Japan to resell in the United States.",
              "I sold video games, figures, and collectibles.",
              "In 2024, this became my busiest category, with 50 sales.",
            ],
          },
          {
            title: "What I learned",
            body: [
              "I learned to check completed sales before setting prices, use past results to guide what I buy, and keep customer experience consistent as the product mix changes.",
              "I tested each new category on a small scale, then expanded when it brought in revenue.",
            ],
          },
        ],
      },
    ],
    closing: sideProjectsClosing,
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
    {
      label: "Languages",
      value: "English · Japanese (two years living in Japan)",
    },
    {
      label: "Leadership",
      value: "Eagle Scout · Selected from 80+ peers for a regional leadership role",
    },
    {
      label: "Beyond the resume",
      value: "First Team All-State cross-country · Utah Piano Competition winner",
    },
    {
      label: "Travel",
      value: "15+ countries, including Japan, Iceland, Egypt, and Thailand",
    },
  ],

  stats: [
    { value: "4,400+", label: "Junbi active users" },
    { value: "100+", label: "Universities reached" },
    { value: "170K+", label: "Organic video views" },
    { value: "$0.05", label: "Customer acquisition cost" },
  ],

  education: {
    school: "BYU Marriott School of Business",
    degree: "B.S. Business Strategic Management",
    emphasis: "Product Management emphasis",
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
        "I solo-built Junbi, a platform that turns notes and flashcards into podcasts students can use while walking, commuting, or working out. Reached 4,400+ active users, 800+ registered accounts, and students at 100+ universities on a $30 budget.",
      problem:
        "Most study tools assume students are sitting at a desk with their eyes on a screen. I saw an opportunity to make review useful during commutes.",
      whatIBuilt:
        "The entire website, app, and AI pipeline using SQL, Cursor, Supabase, Xcode, and Vercel to turn notes and flashcards into podcasts.",
      role: "Solo Founder & Builder",
      client: "BYU Sandbox startup incubator",
      date: "January 2026–Present",
      metrics: [
        "4,000+ Active Users",
        "700+ Registered Accounts",
        "50+ Universities Reached",
        "$0.05 CAC",
        "$30 Marketing Budget",
        "$500 Local Grant",
      ],
      techStack: ["SQL", "Cursor", "Supabase", "Xcode", "Vercel"],
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
      url: "https://www.genfm.app/",
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
      tagline: "Making studying fit into students’ pain points",
      aboutTitle: "",
      about: [
        "I solo-built Junbi, a platform that turns notes and flashcards into podcasts students can use while walking, commuting, or working out.",
        "I built it because I realized that podcasts are becoming more and more popular, and students like me wanted to be able to study while they couldn't look at a screen.",
      ],
      meta: [
        { label: "Role", value: "Solo Founder & Builder" },
        { label: "Built at", value: "BYU Sandbox startup incubator" },
        { label: "Dates", value: "January 2026–Present" },
      ],
      liveLabel: "Visit: junbi.study ↗",
      sections: [
        {
          number: "01",
          title: "Finding the problem",
          blocks: [
            {
              body: [
                "Most study tools assume students are sitting at a desk with their eyes on a screen.",
                "I saw an opportunity to make review useful during commutes.",
                "I built the entire website, app, and AI pipeline using SQL, Cursor, Supabase, Xcode, and Vercel.",
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
          title: "Learning from failure",
          blocks: [
            {
              body: [
                "My first launch brought in almost no sign ups.",
                "I tested whether the issue was the product or how I introduced it.",
                "I simplified the UX, made it free, and created class-specific podcasts from students’ own material.",
                "Running a hyper specific targeted market campaign with relevant flyers made all the difference.",
              ],
            },
          ],
        },
        {
          number: "03",
          title: "Redesigning around users",
          blocks: [
            {
              body: [
                "People signed up but often didn’t find Junbi’s main feature.",
                "I used their feedback to rebuild the interface, move the core action into focus, and remove steps that got in the way.",
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
          title: "Growing with a $30 budget",
          blocks: [
            {
              body: [
                "Junbi reached 4,400+ active users, 800+ registered accounts, and students at 100+ universities off of only $30 of marketing.",
                "I brought on a collaborator to lead campus distribution, and helped secure a $500 local grant.",
              ],
            },
          ],
          stats: [
            { value: "4,000+", label: "Active users" },
            { value: "700+", label: "Registered accounts" },
            { value: "50+", label: "Universities reached" },
            { value: "$0.05", label: "Cost per acquisition" },
            { value: "$30", label: "Marketing budget" },
            { value: "$500", label: "Local grant" },
          ],
        },
        {
          number: "05",
          title: "Pitching Quizlet",
          blocks: [
            {
              body: [
                "I pitched Junbi to Quizlet’s CFO with product metrics and a proposal for how Junbi could complement Quizlet’s study tools.",
                "Quizlet passed, and a few months later, it launched its own podcast feature.",
              ],
            },
          ],
        },
        {
          number: "06",
          title: "What I learned",
          blocks: [],
          lessons: [
            "Ship, then observe. User behavior showed me where my assumptions were wrong and what to improve.",
            "Distribution is part of the product. A focused $30 campaign taught me how much reach shapes whether a product gets used.",
            "Treat low signups as feedback. A failed launch gave me a clear reason to test a different approach.",
            "Bring in the right collaborator. Sharing ownership of distribution gave me more room to build.",
          ],
        },
      ],
      closing: caseStudyClosing,
    },
    {
      slug: "side-projects",
      eyebrow: "Case Study",
      tagline: "Turning ideas into products, and products into real experience.",
      aboutTitle: "About the projects",
      about: [
        "Turning ideas into products, and products into real experience.",
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
                "I saw an opportunity to make dirty soda recipes more accessible through a physical product.",
                "Inspired by cocktail recipe decks, I designed a collection of cards that made discovering and recreating drink combinations simple and fun.",
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
                "I designed the complete recipe deck and sourced manufacturers for both the cards and their holders.",
                "Finding the right supplier meant comparing pricing, production options, and minimum order quantities.",
                "I ultimately found a manufacturer willing to produce an initial run of just 50 units.",
                "I calculated unit economics across manufacturing, shipping, packaging, and selling price to understand the costs and viability of the product.",
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
                "I started Tokyo Treasures in high school during COVID, when I had nothing but free time and wanted to make the most of it and earn money.",
                "I looked for products I could buy for less than they were worth and resell.",
                "Over the next few years it grew from a single idea into three product lines, with more than $9,600 in total sales.",
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
      tagline: "Turning personal reflection into a product for growth.",
      aboutTitle: "About",
      about: [
        "I built Bookends to connect daily planning, journaling, and AI in one place.",
        "It helps me organize priorities, reflect on my habits, and turn those insights into action.",
      ],
      meta: [
        { label: "Role", value: "Product management · Product design · Development" },
        { label: "Tools", value: "Cursor · AI / LLMs · Vector search" },
        { label: "Type", value: "Personal project" },
      ],
      liveLabel: "Visit: genfm.app ↗",
      sections: [
        {
          number: "01",
          title: "Designed to boost my productivity",
          blocks: [
            {
              body: [
                "I designed and built Bookends so that I could be more productive with my time.",
                "Task groups and goal tracking help me focus on what matters today and not lose sight of bigger ambitions.",
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
          title: "Turn journaling into auditing",
          blocks: [
            {
              body: [
                "I implemented an AI that reviews your journal entries and finds time wasting habits so that it can suggest changes.",
                "This turns journaling into an audit: reflect, notice patterns, and decide what to do differently.",
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
          title: "Help AI connect experiences",
          blocks: [
            {
              body: [
                "I wanted to be able to ask questions about my life and have Bookends answer depending on my journal entries, even when they were written months earlier.",
                "Keyword search can miss entries that describe experiences in different words.",
                "So I built a retrieval system using vector embeddings and similarity search.",
                "When I ask a question, Bookends retrieves relevant memories and gives them to the AI as context.",
                "An entry about burnout, for example, might help explain why I’m struggling to focus today.",
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
          title: "Build around my problems",
          blocks: [
            {
              body: [
                "Bookends combines planning, journaling, goal tracking, and reflection to help me understand my habits and follow through on goals.",
                "Building it gave me a way to practice product management end to end: identify a need, design around behavior, and build features.",
                "It’s still a personal project, and it’s now live at genfm.app.",
                "I still value it greatly because it helps me make better decisions in my day to day life.",
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
      closing: {
        eyebrow: "Next",
        title: "Let’s work together",
        body: "I’m looking for product management internships and full-time roles where I can work close to users, make thoughtful product decisions, and ship quickly. If that’s what your team needs, I’d love to talk.",
        links: [
          { label: "Email me", url: "mailto:watathys@gmail.com" },
          { label: "LinkedIn", url: "https://linkedin.com/in/thysh" },
        ],
        archiveLabel: "All projects",
        archiveHref: "/",
      },
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
