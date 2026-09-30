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
  experience: ExperienceRole[];
  photos: Photo[];
  videos: Video[];
  videography: VideographyInfo;
}

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

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
