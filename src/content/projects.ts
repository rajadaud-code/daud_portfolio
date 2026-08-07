import type { Project, TechTag } from "@/types";

export const FEATURED_PROJECT_TARGET = 5;

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
      metrics: [
        { label: "Manual Effort Saved", value: "75%", hint: "Automated OCR & category tags" },
        { label: "Categorization Accuracy", value: "98.4%", hint: "Zero-shot Gemini prompt validation" },
        { label: "API Response Time", value: "< 140ms", hint: "Optimized PostgreSQL indexes" },
      ],
      aiPipelineType: "architecture",
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
      tradeoffs: [
        {
          decision: "Database Engine",
          choice: "PostgreSQL over MongoDB",
          why: "Strict ACID compliance and transactional integrity are mandatory for financial audit logs and multi-budget allocations.",
        },
        {
          decision: "AI Model Provider",
          choice: "Gemini API over Local Vision Models",
          why: "Provided fast multimodal receipt OCR parsing without requiring dedicated GPU server infrastructure or high hosting overhead.",
        },
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
            "Implemented strict Zod schema validation on AI JSON outputs with fallback parsers prior to database persistence.",
        },
        {
          challenge:
            "Maintaining snappy UI response times while executing external LLM calls.",
          solution:
            "Shifted receipt processing to async background queues and optimistic UI states with loading indicators.",
        },
      ],
      outcome:
        "Reduced manual expense logging effort by over 75% for initial beta users while maintaining 99.9% uptime on Vercel and Railway deployments.",
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
    slug: "goldpulse-trading-platform",
    title: "GOLDPULSE — World's Leading Gold Trading Platform",
    category: "Full Stack",
    description:
      "Institutional-grade gold trading platform featuring real-time TradingView-grade interactive charts, 15-second server-side polling, order execution, and technical indicators.",
    tech: [
      "Next.js",
      "Node.js",
      "Express",
      "MongoDB Atlas",
      "TradingView API",
      "Tailwind CSS",
      "REST APIs",
    ],
    links: {
      // Private repository and development under active team collaboration
    },
    thumbnail: {
      src: "/projects/goldpulse/goldpulse-1.png",
      alt: "GOLDPULSE Gold Trading Platform Landing Page with Gold Bullion Graphic and Live XAU/USD Quote",
      width: 1024,
      height: 599,
    },
    images: [
      {
        src: "/projects/goldpulse/goldpulse-1.png",
        alt: "GOLDPULSE Gold Trading Platform Landing Page with Gold Bullion Graphic and Live XAU/USD Quote",
        width: 1024,
        height: 599,
      },
      {
        src: "/projects/goldpulse/goldpulse-2.png",
        alt: "Real-time TradingView XAU/USD Dark Technical Chart & Watchlist",
        width: 1024,
        height: 455,
      },
      {
        src: "/projects/goldpulse/goldpulse-3.png",
        alt: "Light Mode XAU/USD Technical Analysis Chart with Moving Averages",
        width: 1024,
        height: 459,
      },
      {
        src: "/projects/goldpulse/goldpulse-4.png",
        alt: "XAU/USD 1-Minute Candle Chart, Volume & Performance Metrics",
        width: 1024,
        height: 451,
      },
    ],
    featured: true,
    order: 2,
    caseStudy: {
      metrics: [
        { label: "Price Polling Interval", value: "15s", hint: "Server-side price stream updates" },
        { label: "Chart Resolution", value: "Realtime", hint: "TradingView technical indicators" },
        { label: "Database Infrastructure", value: "MongoDB Atlas", hint: "High-concurrency document clusters" },
      ],
      aiPipelineType: "architecture",
      problem:
        "Gold traders demand real-time price accuracy, TradingView-grade technical charting, low-latency market depth analytics, and continuous 15-second price updates without UI re-render lags.",
      approach:
        "Architected an enterprise gold trading platform leveraging Next.js App Router for frontend rendering, Node.js/Express REST microservices for order handling, MongoDB Atlas for multi-document transaction storage, and TradingView library integration for live charting.",
      architecture:
        "Next.js frontend connects to Node.js backend services via REST endpoints. Gold price feeds are periodically polled server-side every 15 seconds, stored in MongoDB Atlas, and broadcasted to client chart layers with zero UI freeze.",
      architectureNodes: [
        { id: "client", label: "Next.js Trading UI", sublabel: "TradingView Integration", type: "client" },
        { id: "api", label: "Node.js REST Engine", sublabel: "Express Microservices", type: "api" },
        { id: "db", label: "MongoDB Atlas Cluster", sublabel: "Order & Price History", type: "db" },
        { id: "cache", label: "Price Feed Poller", sublabel: "15-Sec Server Polling", type: "queue" },
      ],
      tradeoffs: [
        {
          decision: "Database Engine",
          choice: "MongoDB Atlas over Relational SQL",
          why: "Flexible document schema for multi-currency trade orders, user watchlists, and tick chart histories.",
        },
        {
          decision: "Charting Engine",
          choice: "TradingView Lightweight Charts API",
          why: "Industry-standard technical analysis tools, customizable indicators, and sub-frame rendering performance.",
        },
      ],
      implementation: [
        "Integrated TradingView-grade interactive canvas charts with technical indicator toggles (SMA, EMA, RSI, Volume).",
        "Built 15-second server-side background poller to stream live XAU/USD price updates.",
        "Implemented MongoDB Atlas aggregation pipelines for 24-hour price change and performance metric calculations.",
      ],
      challenges: [
        {
          challenge:
            "Maintaining 60fps chart rendering while streaming frequent price tick updates.",
          solution:
            "Separated chart state mutations from React main render loop using refs and direct TradingView series updates.",
        },
      ],
      outcome:
        "Currently in active private team development as an enterprise-grade gold trading platform.",
      highlights: [
        "TradingView-grade live charting engine",
        "15-second server-side gold price polling pipeline",
        "MongoDB Atlas transaction & order data architecture",
      ],
      futureImprovements: [
        "Add automated algorithmic trade strategy execution",
        "Support multi-asset forex and crypto trading pairs",
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
    order: 3,
    caseStudy: {
      metrics: [
        { label: "Time-To-First-Token", value: "320ms", hint: "SSE streaming via FastAPI" },
        { label: "Retrieval Precision", value: "+18%", hint: "Cross-Encoder Cohere Reranking" },
        { label: "Document Collection Scale", value: "500+ PDFs", hint: "Indexed in ChromaDB Vector Store" },
      ],
      aiPipelineType: "rag",
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
      tradeoffs: [
        {
          decision: "Vector Database Indexing",
          choice: "ChromaDB with HNSW Cosine Similarity",
          why: "Delivered ultra-fast similarity search with zero cluster setup overhead compared to multi-node vector setups.",
        },
        {
          decision: "Real-time Streaming Protocol",
          choice: "Server-Sent Events (SSE) over WebSockets",
          why: "Simpler uni-directional HTTP response streaming with native browser EventSource support without WebSocket state handshakes.",
        },
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
        "Delivered Sub-350ms time-to-first-token (TTFT) on SSE query streams across collections of 500+ documents.",
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
    order: 4,
    caseStudy: {
      metrics: [
        { label: "Task Execution Speed", value: "2.4 mins", hint: "Autonomous multi-step research" },
        { label: "Agent Output Accuracy", value: "96.2%", hint: "Self-reflection guardrail validation" },
        { label: "API Integrations", value: "10+ Tools", hint: "Connected via n8n & Python webhooks" },
      ],
      aiPipelineType: "agent",
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
      tradeoffs: [
        {
          decision: "State Management Architecture",
          choice: "LangGraph Cyclic Graph over Linear Chains",
          why: "LangGraph enables cycles and self-reflection loops, allowing agents to critique and retry failed tool outputs dynamically.",
        },
        {
          decision: "Safety & Governance",
          choice: "Human-In-The-Loop (HITL) Checkpoints",
          why: "Prevents agents from executing external webhooks or database writes without explicit approval.",
        },
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
    order: 5,
    caseStudy: {
      metrics: [
        { label: "Benchmark Throughput", value: "10,000+ RPS", hint: "Async Uvicorn workers on Locust" },
        { label: "Average Endpoint Latency", value: "< 12ms", hint: "Redis response caching layer" },
        { label: "Test Coverage", value: "94%", hint: "Pytest async integration suite" },
      ],
      aiPipelineType: "architecture",
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
      tradeoffs: [
        {
          decision: "ORM Layer Strategy",
          choice: "SQLAlchemy 2.0 Async Session over Sync ORM",
          why: "Non-blocking database I/O allows Python event loops to process thousands of concurrent REST requests.",
        },
        {
          decision: "Architecture Pattern",
          choice: "Repository Pattern with Dependency Injection",
          why: "Decouples business logic from data access queries, enabling easy unit testing with dynamic mock sessions.",
        },
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

export function getProjects(): Project[] {
  return projects;
}

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllTech(): TechTag[] {
  const set = new Set<TechTag>();
  projects.forEach((p) => p.tech.forEach((t) => set.add(t)));
  return Array.from(set).sort();
}

export function getAllCategories(): string[] {
  const set = new Set<string>();
  projects.forEach((p) => set.add(p.category));
  return Array.from(set);
}

export function getCaseStudyHref(slug: string): string {
  return `/projects/${slug}`;
}

export function getProjectHref(projectOrSlug: Project | string): string {
  const slug = typeof projectOrSlug === "string" ? projectOrSlug : projectOrSlug.slug;
  return `/projects/${slug}`;
}

export function getFeaturedShortfall(): number {
  const count = getFeaturedProjects().length;
  return Math.max(0, FEATURED_PROJECT_TARGET - count);
}
