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
    slug: "chex-ai-vehicle-inspection",
    title: "Chex.AI — AI Vehicle Inspection Software",
    category: "AI / LLM",
    description:
      "AI Vehicle Inspection Software automating damage detection and claims. Detects vehicle damage across 163 parts with 95–99% accuracy using YOLOv8 segmentation and computer vision.",
    tech: [
      "Node.js",
      "Next.js",
      "PostgreSQL",
      "YOLOv8",
      "Segmentation",
      "PyTorch",
      "Python",
      "FastAPI",
      "OpenCV",
      "Tailwind CSS",
    ],
    links: {
      live: "https://www.chex.ai/",
    },
    thumbnail: {
      src: "/projects/chex-ai/chex-ai-1.png",
      alt: "Chex.AI Vehicle Damage Detection Interface & Phone Capture Mockup",
      width: 1024,
      height: 591,
    },
    images: [
      {
        src: "/projects/chex-ai/chex-ai-1.png",
        alt: "Chex.AI Vehicle Damage Detection Interface & Phone Capture Mockup",
        width: 1024,
        height: 591,
      },
      {
        src: "/projects/chex-ai/chex-ai-2.png",
        alt: "Chex.AI Damage Detection Platform with Car Scanning Overlay",
        width: 1024,
        height: 591,
      },
      {
        src: "/projects/chex-ai/chex-ai-3.png",
        alt: "Chex.AI Automated Damage Assessment on Vehicle Exterior & Glass",
        width: 1024,
        height: 592,
      },
      {
        src: "/projects/chex-ai/chex-ai-4.png",
        alt: "Chex.AI Inspection Testimonials & Rideshare Fleet Reviews",
        width: 1024,
        height: 578,
      },
      {
        src: "/projects/chex-ai/chex-ai-5.png",
        alt: "Chex.AI Fast Vehicle Inspection Workflow & Fleet Manager Spot",
        width: 1024,
        height: 583,
      },
    ],
    featured: true,
    order: 3,
    caseStudy: {
      metrics: [
        { label: "Detection Accuracy", value: "95–99%", hint: "Across 163 vehicle parts" },
        { label: "Report Generation", value: "< 2 mins", hint: "Automated inspection report" },
        { label: "Model Architecture", value: "YOLOv8", hint: "Real-time instance segmentation" },
      ],
      aiPipelineType: "architecture",
      problem:
        "Manual vehicle inspections for car rentals, insurance claims, and fleet management are slow, subjective, and expensive. Drivers and claims adjusters wait hours or days for manual damage verification.",
      approach:
        "Engineered an enterprise AI vehicle inspection platform using Next.js, Node.js, PostgreSQL, and a custom YOLOv8-based instance segmentation model. Drivers capture vehicle photos on mobile devices, and our AI pipeline identifies damaged components across 163 vehicle body parts with 95-99% precision, generating instant claims reports ready for approval.",
      architecture:
        "Mobile capture interface (Next.js PWA) uploads high-res vehicle imagery -> Node.js API Gateway -> GPU-accelerated PyTorch/FastAPI worker microservice running YOLOv8 segmentation model -> Damage polygon extraction & part mapping -> PostgreSQL database -> Automated PDF claims report generation.",
      architectureNodes: [
        { id: "client", label: "Next.js Mobile/Web App", sublabel: "Camera Capture UI", type: "client" },
        { id: "api", label: "Node.js API Gateway", sublabel: "Express Microservices", type: "api" },
        { id: "ai", label: "YOLOv8 Segmentation", sublabel: "PyTorch & OpenCV Worker", type: "ai" },
        { id: "db", label: "PostgreSQL & S3", sublabel: "Damage Reports & Assets", type: "db" },
      ],
      tradeoffs: [
        {
          decision: "Computer Vision Model Architecture",
          choice: "YOLOv8 Instance Segmentation over Image Classification",
          why: "Instance segmentation maps exact pixel polygon boundaries for damage locations on specific vehicle parts rather than whole-image labels.",
        },
        {
          decision: "Model Serving Architecture",
          choice: "Dedicated GPU FastAPI Microservice over Monolithic API",
          why: "GPU-accelerated Python worker handles heavy PyTorch tensor math independently, preventing Node.js event-loop blocking.",
        },
      ],
      implementation: [
        "Trained custom YOLOv8 instance segmentation model trained on thousands of vehicle damage datasets recognizing 163 distinct body parts.",
        "Built real-time bounding polygon overlay visualization on captured vehicle photos with damage confidence scoring.",
        "Engineered PostgreSQL schema storing damage coordinates, part IDs, severity confidence scores, and historical inspection logs.",
      ],
      challenges: [
        {
          challenge:
            "Varied lighting conditions, glare, and reflections causing false positive damage detection on clean vehicle surfaces.",
          solution:
            "Implemented image preprocessing routines using OpenCV (CLAHE contrast equalization and reflection filtering) prior to model inference.",
        },
      ],
      outcome:
        "Replaces slow manual inspections with AI damage reports generated in under 2 minutes with 95-99% accuracy across 163 vehicle parts.",
      highlights: [
        "163-part vehicle damage instance segmentation model",
        "Sub-2-minute automated inspection report generation",
        "Real-time bounding polygon canvas visualization",
      ],
      futureImprovements: [
        "Add 3D point-cloud reconstruction from multi-angle video frames",
        "Support automated repair cost estimate generation via parts pricing APIs",
      ],
    },
  },

  {
    slug: "enterprise-graphrag-intelligence-engine",
    title: "Enterprise GraphRAG Intelligence Engine",
    category: "AI / LLM",
    description:
      "Enterprise-grade, high-performance asynchronous GraphRAG platform combining Qdrant dense vector search, Neo4j multi-hop knowledge graph relationships, stateful LangGraph agentic workflows, and sub-5ms Redis semantic caching.",
    tech: [
      "FastAPI",
      "LangGraph",
      "Qdrant",
      "Neo4j",
      "Redis",
      "Celery",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Groq",
      "Llama-3.1",
      "PostgreSQL",
    ],
    links: {
      github:
        "https://github.com/rajadaud-code/graph_rag_enterprise_engine_frontend",
      backendGithub:
        "https://github.com/rajadaud-code/graphrag-enterprise-engine",
      live: "https://graph-rag-enterprise-engine-fronten.vercel.app/",
    },
    thumbnail: {
      src: "/projects/graphrag/graphrag-main.png",
      alt: "Enterprise GraphRAG Query Engine Live Interface showing Document Ingestion, System Status, and Knowledge Graph Query Actions",
      width: 1024,
      height: 450,
    },
    thumbnailFit: "contain",
    images: [
      {
        src: "/projects/graphrag/graphrag-main.png",
        alt: "Enterprise GraphRAG Query Engine Live Interface",
        width: 1024,
        height: 450,
      },
      {
        src: "/projects/graphrag/langgraph-state-machine.png",
        alt: "LangGraph Agent State Machine Execution Architecture Diagram showing RouterNode, VectorNode, GraphNode, GeneratorNode, and Evaluator Critic loop",
        width: 1200,
        height: 800,
      },
    ],
    featured: true,
    order: 4,
    caseStudy: {
      metrics: [
        {
          label: "Factual Grounding",
          value: "100%",
          hint: "Zero hallucinations via Self-RAG evaluator",
        },
        {
          label: "Semantic Cache Latency",
          value: "< 5ms",
          hint: "Redis vector cosine similarity (> 0.95)",
        },
        {
          label: "Agentic Synthesis Latency",
          value: "< 1.0s",
          hint: "Groq Llama-3.1-8B-Instant inference",
        },
      ],
      aiPipelineType: "rag",
      problem:
        "Traditional vector-only RAG systems suffer from semantic disconnects when answering complex multi-hop queries across dense technical and academic documents. Standard vector similarity misses explicit entity relationships (such as cross-paper citations), while standard cloud LLMs suffer from high latency, frequent rate limits, and ungrounded hallucinations without verification guardrails.",
      approach:
        "Architected an enterprise-grade, fully asynchronous GraphRAG Intelligence Engine combining dense vector similarity search (Qdrant) with multi-hop knowledge graph traversal (Neo4j). The query and evaluation pipeline is orchestrated via a 5-node cyclic LangGraph Agentic state machine powered by Groq's high-speed Llama-3.1-8B-Instant inference (500k TPD quota), guarded by a sub-5ms Redis semantic cosine similarity caching layer (<0.95 threshold) and asynchronous background Celery ingestion workers.",
      architecture:
        "Client (Next.js 15 App Router + Tailwind + shadcn/ui) communicates with FastAPI backend via async endpoints. Incoming queries hit Redis Semantic Caching -> on cache miss, LangGraph state machine dispatches RouterNode -> concurrent VectorNode (Qdrant dense search) & GraphNode (Neo4j Cypher multi-hop traversal) -> GeneratorNode synthesizes context -> Self-RAG EvaluatorNode verifies factual grounding against retrieved document chunks and graph entities. Document ingestion uses Celery workers with aiofiles for non-blocking PDF parsing and Cypher graph population.",
      architectureNodes: [
        {
          id: "client",
          label: "Next.js Frontend",
          sublabel: "Tailwind & Real-time State",
          type: "client",
        },
        {
          id: "cache",
          label: "Redis Semantic Cache",
          sublabel: "< 5ms Cosine Similarity",
          type: "cache",
        },
        {
          id: "api",
          label: "FastAPI Engine",
          sublabel: "Async Python 3.12",
          type: "api",
        },
        {
          id: "ai",
          label: "LangGraph State Machine",
          sublabel: "5-Node Cyclic Multi-Agent",
          type: "ai",
        },
        {
          id: "db",
          label: "Qdrant & Neo4j",
          sublabel: "Dense Vectors + Graph Entities",
          type: "db",
        },
        {
          id: "queue",
          label: "Celery Workers",
          sublabel: "Async PDF Ingestion Pipeline",
          type: "queue",
        },
      ],
      tradeoffs: [
        {
          decision: "Retrieval Architecture Strategy",
          choice: "Hybrid GraphRAG (Qdrant + Neo4j) over Vector-Only RAG",
          why: "Combines unstructured dense semantic search with structured graph relational context, resolving multi-hop scientific queries that vector similarity alone fails to capture.",
        },
        {
          decision: "Inference Engine & Model Provider",
          choice: "Groq Llama-3.1-8B-Instant over standard Cloud LLMs",
          why: "Delivered sub-second agentic state machine traversal with a 500,000 Tokens/Day (TPD) quota and 14,400 Requests/Day, eliminating 429 rate limit delays.",
        },
        {
          decision: "Response Caching Mechanism",
          choice: "Redis Vector Semantic Caching over Exact Key-Value Caching",
          why: "Uses vector cosine similarity (> 0.95 threshold) to return verified answers in < 5ms for semantically equivalent queries, with strict guardrails preventing error responses from ever being cached.",
        },
        {
          decision: "Document Ingestion Pipeline",
          choice: "Asynchronous Celery + aiofiles over Synchronous Processing",
          why: "Offloads heavy PDF extraction, chunking, and Cypher graph population to background workers without blocking HTTP server threads.",
        },
      ],
      implementation: [
        "Built 5-node cyclic LangGraph state machine: Fast Router -> Vector Search (Qdrant) + Graph Search (Neo4j) -> Context Synthesis Generator -> Self-RAG Evaluator Critic.",
        "Implemented Redis Cosine Similarity Semantic Caching (< 5ms response time) with strict error-guardrails preventing erroneous outputs from caching.",
        "Designed asynchronous Celery ingestion pipeline parsing complex academic PDFs and constructing Neo4j knowledge graph nodes & relationship edges.",
        "Developed responsive enterprise dark slate interface (#030712) with real-time system pulse monitors for PostgreSQL, Qdrant, Neo4j, and Redis.",
        "Implemented interactive Context Inspector exposing live vector chunk similarity scores and cited Knowledge Graph entity nodes.",
      ],
      challenges: [
        {
          challenge:
            "LLM hallucinations and failure to ground claims in multi-document scientific reports (e.g. Stanford AI Index Report).",
          solution:
            "Built a cyclic Self-RAG Evaluator Critic node inside LangGraph that cross-references generated claims against retrieved Qdrant chunks and Neo4j entity edges, triggering automated prompt refinement and regeneration if grounding score falls below threshold.",
        },
        {
          challenge:
            "Heavy multi-database cluster requirement (PostgreSQL, Qdrant, Neo4j, Redis) making full cloud deployment resource-intensive.",
          solution:
            "Configured serverless cloud infrastructure across Neon PostgreSQL, Qdrant Cloud, Neo4j Aura Cloud, and Upstash Redis over TLS/SSL with RESP2 protocol support, providing clear local Docker setup instructions for full backend evaluation.",
        },
      ],
      outcome:
        "Achieved 100% factually grounded responses on academic benchmark tests (Stanford AI Index Report) with sub-second agentic synthesis, live Neo4j entity citations, and < 5ms semantic cache hits.",
      highlights: [
        "Stateful LangGraph cyclic agent state machine with Self-RAG evaluation",
        "Hybrid Qdrant vector retrieval + Neo4j multi-hop knowledge graph synthesis",
        "Sub-5ms Redis semantic cosine similarity caching layer",
        "Real-time multi-database pulse health monitoring dashboard",
        "Asynchronous non-blocking Celery worker document ingestion pipeline",
      ],
      futureImprovements: [
        "Add interactive streaming Graph visualization canvas directly in the frontend chat inspector",
        "Support multi-modal PDF table extraction and chart reasoning via vision foundation models",
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
    order: 5,
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
    order: 6,
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
