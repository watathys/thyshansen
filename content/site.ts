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
 *
 * Sections marked "TODO" below are placeholders so the site builds and looks
 * complete today. Replace them with your real details whenever you have
 * them — nothing else in the codebase needs to change.
 * ----------------------------------------------------------------------------
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

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
  email: string;
  linkedin: string;
  /** Leave as an empty string to hide the Instagram link entirely. */
  instagram: string;
  /** Deployed site URL, used for SEO metadata + sitemap. */
  url: string;
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
  email: "watathys@gmail.com",
  linkedin: "https://linkedin.com/in/thysh",
  // TODO: add your Instagram URL here (e.g. "https://instagram.com/yourhandle"),
  // or leave this as an empty string to keep it off the site.
  instagram: "",
  // TODO: replace with your live domain once deployed (used for SEO + sitemap).
  url: "https://thyshansen.com",

  education: {
    school: "BYU Marriott School of Business",
    degree: "B.S. Business Strategic Management",
    emphasis: "Emphasis in Product Management",
    graduationDate: "April 2028",
    gpa: "3.79",
    honors: ["Dean's List", "Product Management Association"],
  },

  // TODO: Replace the placeholder fields below (oneLiner, description,
  // metrics, url, image, tags) for each project with real details. The
  // slugs already power /projects/[slug] routes — keep them stable if you
  // link to them elsewhere.
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

  // TODO: Replace this placeholder role with your real work experience.
  // Paste each role from your resume as its own object in this array —
  // most recent first. Add or remove roles freely; the Experience section
  // renders however many entries are here.
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

  // TODO: Add photos here, e.g.
  // { src: "/photos/junbi-launch.jpg", alt: "Junbi launch day", caption: "Launch day with the Junbi team" }
  // Files should live in /public/photos. Leave this array empty to hide the
  // gallery until you have real photos.
  photos: [],

  // TODO: Add videos here, e.g.
  // { title: "Junbi demo", youtubeId: "dQw4w9WgXcQ", description: "60-second product walkthrough" }
  // youtubeId is just the ID from the YouTube URL (the part after "v=").
  // Leave this array empty to hide the videos section until you have real ones.
  videos: [],
};

export default site;
