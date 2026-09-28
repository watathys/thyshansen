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
  tags: string[];
  /** If true, rendered as a larger featured card at the top of Selected Work. */
  featured?: boolean;
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

export interface SiteContent {
  name: string;
  tagline: string;
  intro: string;
  bio: string;
  headshot: string;
  resumeUrl: string;
  email: string;
  linkedin: string;
  /** Leave as an empty string to hide the Instagram link entirely. */
  instagram: string;
  /** Deployed site URL, used for SEO metadata + sitemap. */
  url: string;
  navLinks: NavLink[];
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
  instagram: "https://instagram.com",
  url: "https://thyshansen.com",

  navLinks: [
    { label: "Work", href: "/#work" },
    { label: "Creative", href: "/#creative" },
    { label: "About", href: "/#about" },
    { label: "Resume", href: "/#resume" },
    { label: "Contact", href: "/#contact" },
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
      tags: ["AI Audio", "Full Stack", "Product Strategy", "iOS & Web"],
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
      metrics: [
        "AI Voice Processing",
        "Automated Life Audit",
        "Daily Narrative Generation",
      ],
      techStack: ["Next.js", "React Native", "AI Voice LLM", "Tailwind CSS"],
      url: "https://genfm.app",
      image: "/projects/bookends.png",
      tags: ["AI Voice", "Mobile & Web", "Personal Analytics"],
    },
    {
      slug: "games",
      name: "AI Party Games",
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
      metrics: ["2 Original AI Games", "Interactive LLM Judge", "Rapid Prototype"],
      techStack: ["Next.js", "TypeScript", "LLM APIs", "Tailwind CSS"],
      url: "",
      image: "/projects/games.png",
      tags: ["Game Dev", "AI Prompting", "Multiplayer"],
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
      image: "/projects/kazzi-soda.png",
      tags: ["Consumer Product", "Content Strategy", "E-Commerce", "Video Production"],
    },
  ],

  experience: [
    {
      company: "Wheatley Institute",
      role: "Video Producer & Channel Lead",
      location: "Provo, UT",
      startDate: "2023",
      endDate: "Present",
      bullets: [
        "Produced, edited, and distributed high-impact academic and social video content.",
        "Grew the Wheatley Institute YouTube channel by 2,800+ subscribers and 82,000+ views through targeted editing and SEO.",
      ],
    },
  ],

  photos: [
    {
      src: "/photography/kyoto-bamboo.jpg",
      alt: "Kyoto bamboo forest at dawn",
      caption: "Kyoto, Japan — Dawn light filtering through Arashiyama bamboo grove.",
    },
    {
      src: "/photography/tokyo-night.jpg",
      alt: "Tokyo street reflections at night",
      caption: "Shinjuku, Tokyo — Neon rain reflection along alleyway.",
    },
    {
      src: "/photography/wasatch-mountains.jpg",
      alt: "Wasatch mountain range sunset",
      caption: "Wasatch Mountains, Utah — Alpine glow at dusk.",
    },
    {
      src: "/photography/tokyo-architecture.jpg",
      alt: "Minimalist concrete urban architecture",
      caption: "Ginza, Tokyo — Structural symmetry and concrete shadows.",
    },
    {
      src: "/photography/junbi-launch.jpg",
      alt: "Junbi app launch user testing session",
      caption: "Junbi Launch — Early morning user feedback session at BYU.",
    },
    {
      src: "/photography/big-sur-mist.jpg",
      alt: "Coastal fog along California Highway 1",
      caption: "Big Sur, California — Morning Pacific ocean mist.",
    },
    {
      src: "/photography/soda-shoot.jpg",
      alt: "Kazzi Soda recipe card product shoot",
      caption: "Provo, Utah — Studio lighting for Kazzi Soda deck.",
    },
    {
      src: "/photography/tokyo-subway.jpg",
      alt: "Tokyo transit station symmetry",
      caption: "Shibuya, Tokyo — Late night subway platform line.",
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
