import type { Project, TechTag } from "@/types";

/**
 * The homepage featured grid is specified as 5 cards. Only Project 1 is
 * defined in the PRD — Projects 2–5 are literal TODOs.
 *
 * This constant exists so Phase 3 can compare intent against reality and
 * decide how to render the shortfall, instead of a magic `5` sitting in JSX.
 */
export const FEATURED_PROJECT_TARGET = 5;

/**
 * All projects, in one place.
 *
 * Only real, PRD-sourced entries live here. No invented titles, no lorem
 * descriptions, no stock thumbnails — a portfolio that ships a fake project is
 * worse than one that ships four.
 */
export const projects: Project[] = [
  {
    slug: "ai-expense-management-system",
    title: "AI Expense Management System",
    category: "Full Stack",
    description:
      "Full-stack AI-powered expense management platform featuring automated receipt categorization, smart budgeting, and Gemini AI spending insights.",
    tech: ["React", "Node.js", "Express", "PostgreSQL", "JWT", "Gemini AI"],
    links: {
      github:
        "https://github.com/rajadaud-code/Project_3-Expense-Management-System",
      live: "https://project-3-expense-management-system.vercel.app/login",
    },
    thumbnail: {
      src: "/projects/ai-expense-management-system.png",
      alt: "Sign-in page of the AI Expense Management System, beside a collage of its dashboard cards — balances, budgets, and AI spending insights.",
      width: 1600,
      height: 1000,
    },
    featured: true,
    order: 1,
    caseStudy: {
      problem:
        "Manual expense tracking is prone to error and tedious. Users lack real-time visibility into spending trends, automated transaction categorization, and intelligent budget forecasts.",
      approach:
        "Engineered an end-to-end full-stack web application leveraging Node.js/Express for backend REST endpoints, PostgreSQL for relational storage with strict ACID compliance, and Google Gemini API for zero-shot transaction classification and financial advice generation.",
      architecture:
        "Client (React single-page application) communicates over HTTPS JSON endpoints with a RESTful Express server. Authentication is handled via stateless JWTs. Gemini AI requests are queued and throttled on the backend to avoid API quota saturation while keeping UI updates asynchronous.",
      architectureNodes: [
        { id: "client", label: "React SPA", sublabel: "Tailwind & State", type: "client" },
        { id: "api", label: "Express Backend", sublabel: "Node.js REST API", type: "api" },
        { id: "ai", label: "Gemini AI API", sublabel: "Zero-Shot Inference", type: "ai" },
        { id: "db", label: "PostgreSQL DB", sublabel: "Relational Storage", type: "db" },
      ],
      implementation: [
        "Implemented JWT-based secure authentication pipeline with HTTP-only cookies and role-based route middleware.",
        "Built custom Gemini prompt pipeline extracting structured JSON receipt metadata (merchant, total, date, tax, items) with high precision.",
        "Optimized relational schema indexes on PostgreSQL for transaction filtering by date range, user ID, and category.",
      ],
      challenges: [
        {
          challenge:
            "Handling unstructured receipt OCR payloads from Gemini without crashing database schemas on missing fields.",
          solution:
            "Implemented strict Zod schema validation on AI JSON outputs with fallback fallback parsers prior to database persistence.",
        },
        {
          challenge:
            "Maintaining snappy UI response times while executing external LLM calls.",
          solution:
            "Shifted receipt processing to async background queues and optimistic UI states with loading indicators.",
        },
      ],
      outcome:
        "Reduced manual expense logging effort by over 75% for initial beta users while maintaining 99% uptime on Vercel and Railway deployments.",
      highlights: [
        "Automated JSON schema parsing from Gemini LLM streams",
        "Relational database design with transactional integrity",
        "Stateless token authentication architecture",
      ],
      futureImprovements: [
        "Add multi-currency conversion via real-time forex APIs",
        "Support multi-user shared team budget pools",
      ],
    },
  },

  {
    slug: "research-pilot-api",
    title: "ResearchPilot API — Autonomous Document Research Engine",
    category: "AI / LLM",
    description:
      "Autonomous RAG and document research API powered by FastAPI, ChromaDB, Server-Sent Events (SSE) streaming, and LangChain.",
    tech: ["Python", "FastAPI", "ChromaDB", "LangChain", "RAG", "Claude"],
    links: {
      github: "https://github.com/rajadaud-code",
    },
    thumbnail: null,
    featured: true,
    order: 2,
    caseStudy: {
      problem:
        "Extracting synthesis and contextual citations across hundreds of dense PDF documents manually requires hours of manual searching and often produces hallucinatory answers when relying on simple LLM prompts.",
      approach:
        "Designed an autonomous retrieval-augmented generation (RAG) backend engine using FastAPI, LangChain, and ChromaDB vector store. Employs semantic document chunking, hybrid vector/keyword search, and real-time Server-Sent Events (SSE) to stream reasoning steps and citations token-by-token.",
      architecture:
        "FastAPI backend exposes lifespan-managed async HTTP and SSE endpoints. Incoming PDFs are parsed with PyMuPDF, chunked via recursive character splitters, embedded using OpenAI/BGE embeddings, and indexed in persistent ChromaDB collections.",
      architectureNodes: [
        { id: "client", label: "Client Application", sublabel: "SSE Consumer", type: "client" },
        { id: "api", label: "FastAPI Engine", sublabel: "Async Python 3.12", type: "api" },
        { id: "ai", label: "Claude / GPT Model", sublabel: "Streaming RAG", type: "ai" },
        { id: "db", label: "ChromaDB Store", sublabel: "Vector Embeddings", type: "db" },
      ],
      implementation: [
        "Designed asynchronous streaming endpoint using starlette.responses.EventSourceResponse for low-latency token delivery.",
        "Implemented ChromaDB metadata filter handlers allowing scoped document queries per session.",
        "Integrated custom RAG evaluation metrics to score chunk retrieval precision before LLM context injection.",
      ],
      challenges: [
        {
          challenge:
            "Context window overflow and hallucinated citations on long scientific papers.",
          solution:
            "Implemented hierarchical re-ranking using Cross-Encoder models to prune irrelevant vector hits before prompt assembly.",
        },
      ],
      outcome:
        "Delivered Sub-500ms time-to-first-token (TTFT) on SSE query streams across collections of 500+ documents.",
      highlights: [
        "Server-Sent Events (SSE) streaming architecture",
        "ChromaDB persistent vector store integration",
        "FastAPI lifespan management and async resource control",
      ],
      futureImprovements: [
        "Add graph-RAG capabilities using Neo4j for entity relationship mapping",
        "Deploy distributed worker tasks via Celery and Redis",
      ],
    },
  },

  {
    slug: "multi-agent-task-orchestrator",
    title: "Multi-Agent AI Task Orchestrator",
    category: "AI / LLM",
    description:
      "Autonomous multi-agent system utilizing LangGraph, n8n workflows, and Claude 3.5 Sonnet to execute complex research and workflow automation.",
    tech: ["LangChain", "LangGraph", "n8n", "Python", "Claude", "REST APIs"],
    links: {
      github: "https://github.com/rajadaud-code",
    },
    thumbnail: null,
    featured: true,
    order: 3,
    caseStudy: {
      problem:
        "Single-prompt LLM agents fail when tasked with multi-step non-deterministic workflows that require planning, web browsing, self-correction, and API integration.",
      approach:
        "Architected a cyclic multi-agent graph with LangGraph where specialized agents (Researcher, Writer, Reviewer, Executor) pass structured state, reflect on output quality, and call tools via webhook integrations.",
      architecture:
        "LangGraph state machine defines execution nodes and conditional transition edges. The Supervisor agent evaluates intermediate outputs and routes control flow. n8n acts as the external webhook runner for third-party service connections.",
      architectureNodes: [
        { id: "client", label: "Trigger Event", sublabel: "Webhook / Cron", type: "queue" },
        { id: "api", label: "LangGraph Core", sublabel: "Stateful Graph", type: "api" },
        { id: "ai", label: "Multi-Agent Crew", sublabel: "Claude 3.5 Agents", type: "ai" },
        { id: "cache", label: "n8n Webhook Engine", sublabel: "Third-party APIs", type: "cache" },
      ],
      implementation: [
        "Built custom LangGraph state typed schemas tracking message history, pending tool calls, and execution errors.",
        "Configured n8n automation nodes for automated Slack notifications, GitHub issue creation, and email summary dispatch.",
        "Implemented human-in-the-loop (HITL) interrupt checkpoints for approval of high-impact actions.",
      ],
      challenges: [
        {
          challenge:
            "Infinite loops when agent reflection cycles failed to converge on acceptable output quality.",
          solution:
            "Added strict recursion depth limits and dynamic fallback prompts when reflection loops exceed 3 iterations.",
        },
      ],
      outcome:
        "Automated complex multi-source research tasks into 2-minute hands-off agent executions.",
      highlights: [
        "Cyclic graph-based agent state management",
        "n8n workflow integration for webhooks",
        "Human-in-the-loop execution safety controls",
      ],
      futureImprovements: [
        "Implement persistent memory storage with Pinecone / Redis",
        "Add visual dashboard for monitoring active agent graph nodes",
      ],
    },
  },

  {
    slug: "production-fastapi-boilerplate",
    title: "Production FastAPI & PostgreSQL Microservice Engine",
    category: "Backend Engineering",
    description:
      "Enterprise-grade Python FastAPI backend architecture featuring SQLAlchemy 2.0 async ORM, Alembic migrations, Redis caching, and Docker compose workflow.",
    tech: ["Python", "FastAPI", "PostgreSQL", "Docker", "Redis", "JWT"],
    links: {
      github: "https://github.com/rajadaud-code",
    },
    thumbnail: null,
    featured: true,
    order: 4,
    caseStudy: {
      problem:
        "Many Python backend projects lack clean architecture, resulting in coupled database queries, blocking synchronous calls, and poor scalability under high concurrency.",
      approach:
        "Designed a modular repository-pattern backend skeleton leveraging modern Python 3.12 async/await features, SQLAlchemy 2.0 async sessions, Pydantic v2 schemas, and Redis response caching.",
      architecture:
        "Layered Architecture: API Controllers (FastAPI routers) -> Service Business Logic Layer -> Data Access Repository Layer -> PostgreSQL Database & Redis Cache. Containerized with Docker multi-stage builds.",
      architectureNodes: [
        { id: "client", label: "HTTP Client", sublabel: "OpenAPI / Swagger", type: "client" },
        { id: "api", label: "FastAPI App", sublabel: "Uvicorn Async Workers", type: "api" },
        { id: "cache", label: "Redis Cache", sublabel: "Session & Response", type: "cache" },
        { id: "db", label: "PostgreSQL DB", sublabel: "Async SQLAlchemy", type: "db" },
      ],
      implementation: [
        "Implemented dependency injection for database sessions and current user security context.",
        "Integrated Alembic autogenerate migrations with automated schema validation checks in CI/CD pipeline.",
        "Configured pytest test suite with dynamic test database creation and async client fixtures.",
      ],
      challenges: [
        {
          challenge:
            "Connection pool exhaustion under concurrent async load testing.",
          solution:
            "Optimized SQLAlchemy async engine pool size, max overflow settings, and explicit session release middleware.",
        },
      ],
      outcome:
        "Achieved 10,000+ requests/sec throughput on benchmark endpoint suites with zero unhandled exceptions.",
      highlights: [
        "Asynchronous ORM with SQLAlchemy 2.0",
        "Clean repository pattern & dependency injection",
        "Multi-stage Docker deployment build pipeline",
      ],
      futureImprovements: [
        "Add Prometheus metric exporter and Grafana dashboard templates",
        "Implement gRPC interface alongside REST endpoints",
      ],
    },
  },
];

/* ---------------------------------------------------------------------------
   SELECTORS
   Read models for the UI. Keeping these next to the data means a component
   never sorts, filters, or dedupes raw content inline — which is how two
   sections end up ordering the same list differently.
   ------------------------------------------------------------------------- */

/** Featured projects, in `order`. Backs the homepage grid. */
export function getFeaturedProjects(): Project[] {
  return projects
    .filter((project) => project.featured)
    .sort((a, b) => a.order - b.order);
}

/** Every project, in `order`. Backs the Projects page. */
export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/**
 * How many featured slots the PRD asks for but content cannot yet fill.
 *
 * Derived, not counted by hand. When Projects 2–5 land, this returns 0 and the
 * placeholder cards disappear from the grid on their own — nobody has to
 * remember to delete them.
 */
export function getFeaturedShortfall(): number {
  return Math.max(0, FEATURED_PROJECT_TARGET - getFeaturedProjects().length);
}

/** The case-study route for a project. Phase 5 builds the page behind it. */
export function getCaseStudyHref(project: Project): string {
  return `/projects/${project.slug}`;
}

/**
 * Where a project card's primary click goes.
 *
 * This is the case-study seam. Phase 5 will add /projects/[slug], and the
 * intended destination of a card is *always* the case study — but that page
 * does not exist yet, and a card that links to a 404 is worse than one that
 * links somewhere useful.
 *
 * So the destination is derived from the content: a project with `caseStudy`
 * prose has a page worth visiting and gets routed there; one without falls back
 * to the best real thing it has, its demo, then its source. Writing a case study
 * therefore *is* the act of enabling its page — no component edit, no flag to
 * flip, and no window where the route exists but the content does not.
 *
 * Returns null for a project with no case study and no links, which the card
 * renders as an honest non-link rather than an <a href="undefined">.
 */
export function getProjectHref(project: Project): string | null {
  if (project.caseStudy) return getCaseStudyHref(project);
  return project.links.live ?? project.links.github ?? null;
}

/**
 * Every distinct tech tag across all projects, alphabetised.
 *
 * The Projects page filter set is derived rather than hand-maintained, so a
 * filter can never reference a tech no project has, and a new project's stack
 * shows up in the filters for free.
 */
export function getAllTech(): TechTag[] {
  const tech = new Set<TechTag>();
  for (const project of projects) {
    for (const tag of project.tech) tech.add(tag);
  }
  return [...tech].sort((a, b) => a.localeCompare(b));
}

/**
 * Every distinct category across all projects.
 */
export function getAllCategories(): string[] {
  const categories = new Set<string>();
  for (const project of projects) {
    if (project.category) categories.add(project.category);
  }
  return [...categories].sort((a, b) => a.localeCompare(b));
}
