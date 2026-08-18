import type { SkillCategory } from "@/types";

export const skills: SkillCategory[] = [
  {
    id: "ai",
    label: "AI & LLM Frameworks",
    items: [
      "LangChain",
      "LangGraph",
      "RAG",
      "GraphRAG",
      "Agentic RAG",
      "Large Language Models (LLMs)",
      "AI Autonomous Agents",
      "Prompt Engineering",
    ],
  },
  {
    id: "backend",
    label: "Backend Technologies",
    items: [
      "FastAPI",
      "Node.js",
      "Express.js",
      "REST APIs",
      "System Architecture",
      "JWT Authentication",
      "Socket.io",
      "Microservices",
      "Celery",
      "asyncio",
    ],
  },
  {
    id: "frontend",
    label: "Frontend Development",
    items: [
      "React.js",
      "Next.js",
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
    ],
  },
  {
    id: "languages",
    label: "Programming Languages",
    items: [
      "Python",
      "JavaScript",
      "SQL",
      "TypeScript",
      "Cypher",
    ],
  },
  {
    id: "databases",
    label: "Databases & Vector Stores",
    items: [
      "PostgreSQL",
      "MongoDB",
      "Pinecone",
      "ChromaDB",
      "Neo4j",
      "Qdrant",
      "Redis",
    ],
  },
  {
    id: "tools",
    label: "Libraries & Cloud Tools",
    items: [
      "Git",
      "Docker",
      "Postman",
      "Vercel",
      "Render",
      "Huawei ModelArts",
      "OpenCV",
    ],
  },
];

export function getSkills(): SkillCategory[] {
  return skills;
}
