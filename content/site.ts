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

export interface Project {
  /** URL-safe unique identifier, used for /projects/[slug] */
  slug: string;
  name: string;
  /** Short, punchy value proposition (~1 sentence). */
  oneLiner: string;
  /** 2–4 sentence case-study style description: problem, role, impact. */
  description: string;
  /** Quantified outcomes, e.g. "10k+ downloads", "Cut onboarding time 40%". */
  metrics: string[];
  /** Live URL, App Store link, GitHub repo, etc. Leave empty if none. */
  url?: string;
  /** Path relative to /public, e.g. "/projects/junbi.png". Optional — falls
   * back to a clean monogram card when omitted or the file doesn't exist. */
  image?: string;
  tags: string[];
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
  // TODO: add your Instagram URL here if desired, or leave empty
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
      oneLiner: "TODO: one-sentence value proposition for Junbi.",
      description:
        "TODO: replace with 2–4 sentences covering the problem Junbi solves, your specific role (PM, founder, engineer, etc.), and the impact or outcome.",
      metrics: ["TODO: e.g. 500+ users", "TODO: e.g. 4.8★ average rating"],
      url: "",
      image: "/projects/junbi.png",
      tags: ["Product", "TODO"],
    },
    {
      slug: "journal-app",
      name: "Journal App",
      oneLiner: "TODO: one-sentence value proposition for the Journal App.",
      description:
        "TODO: replace with 2–4 sentences covering the problem this journaling app solves, your role, the stack, and any measurable impact.",
      metrics: ["TODO: e.g. 1k+ downloads", "TODO: e.g. 30% weekly retention"],
      url: "",
      image: "/projects/journal-app.png",
      tags: ["Mobile", "TODO"],
    },
    {
      slug: "games",
      name: "Games",
      oneLiner: "TODO: one-sentence value proposition for this project.",
      description:
        "TODO: replace with 2–4 sentences describing the game(s) you built, your role, tools used, and any notable results (players, ratings, awards).",
      metrics: ["TODO: e.g. 10k+ plays", "TODO: e.g. Built in 48 hours"],
      url: "",
      image: "/projects/games.png",
      tags: ["Game Dev", "TODO"],
    },
    {
      slug: "kazzi-soda",
      name: "Kazzi Soda",
      oneLiner: "TODO: one-sentence value proposition for Kazzi Soda.",
      description:
        "TODO: replace with 2–4 sentences on the business concept, your role (product, ops, marketing, etc.), and quantified traction.",
      metrics: ["TODO: e.g. $10k in pre-orders", "TODO: e.g. 3 retail partners"],
      url: "",
      image: "/projects/kazzi-soda.png",
      tags: ["Consumer", "TODO"],
    },
  ],

  experience: [
    {
      company: "TODO: Company Name",
      role: "TODO: Job Title",
      location: "TODO: City, ST",
      startDate: "TODO: Mon YYYY",
      endDate: "Present",
      bullets: [
        "TODO: paste a bullet from your resume — lead with the action verb and quantify the result.",
        "TODO: paste another bullet from your resume.",
        "TODO: paste another bullet from your resume.",
      ],
    },
  ],

  photos: [],
  videos: [],
};

export default site;
