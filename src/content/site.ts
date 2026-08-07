import type { SiteConfig } from "@/types";

/**
 * Identity, contact, and SEO source of truth.
 * Every value is transcribed from PORTFOLIO_PRD.md. Nothing here is inferred.
 */
export const site: SiteConfig = {
  name: "Muhammad Daud Israr",
  role: "AI Software Engineer",

  headline: "AI Software Engineer",
  subheading:
    "AI/LLM Engineer | Backend Developer — Python, FastAPI, Node.js, Express.js, JavaScript | LangChain, RAG, Claude",

  bio: [
    "I build full stack projects that don't just run—they think.",
    "I specialize in AI agents, LLM applications, backend engineering and production-ready APIs. My focus is building intelligent software using LangChain, RAG, vector databases and modern backend architectures.",
  ],

  education: {
    degree: "Bachelor's in Computer Science",
    institution: "University of Science and Technology",
  },

  current: "Software Engineer at Techling.",

  links: {
    email: "muhammaddaudisrar@gmail.com",
    linkedin: "https://www.linkedin.com/in/rajadaud/",
    github: "https://github.com/rajadaud-code",
  },

  /**
   * TODO (asset): the PRD marks the resume as a placeholder. Drop the PDF at
   * public/resume/muhammad-daud-israr-resume.pdf and set `href` to that path.
   * Until then the download control renders disabled — never as a dead link.
   */
  resume: {
    href: "/resume/muhammad-daud-israr-resume.pdf",
    filename: "muhammad-daud-israr-resume.pdf",
  },

  location: "Islamabad, Pakistan",

  photo: {
    src: "/daud-israr.jpeg",
    alt: "Muhammad Daud Israr - AI Software Engineer",
    width: 1200,
    height: 1500,
  },

  /**
   * TODO (deploy): no domain is specified in the PRD, and guessing one would
   * silently poison every canonical tag, OG URL, and sitemap entry — the kind
   * of bug that only surfaces once the link preview is already in someone's
   * inbox. Set NEXT_PUBLIC_SITE_URL in the deploy environment (Vercel:
   * Project → Settings → Environment Variables).
   *
   * The localhost fallback keeps `next build` working locally; src/lib/seo.ts
   * warns at build time if it is still in force outside development.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  description:
    "AI Software Engineer specialising in AI agents, LLM applications, backend engineering and production-ready APIs — built with LangChain, RAG, vector databases and modern backend architectures.",

  keywords: [
    "Muhammad Daud Israr",
    "AI Software Engineer",
    "AI Engineer",
    "LLM Engineer",
    "Backend Developer",
    "LangChain",
    "RAG",
    "Python",
    "FastAPI",
    "Node.js",
    "Next.js",
  ],
};
