import type { SkillCategory } from "@/types";

/**
 * Skills, grouped exactly as the PRD groups them. Order is the PRD's order —
 * AI first, which matches how Daud positions himself in the hero.
 *
 * Spellings are transcribed verbatim ("Langraph", "Javascript"). If those are
 * meant to be "LangGraph" and "JavaScript", fix them here — one edit, and every
 * surface that renders skills follows.
 */
export const skills: SkillCategory[] = [
  {
    id: "ai",
    label: "AI",
    items: ["LangChain", "Langraph", "RAG", "n8n", "Claude", "GPT", "Gemini"],
  },
  {
    id: "backend",
    label: "Backend",
    items: ["Python", "FastAPI", "Node.js", "Express"],
  },
  {
    id: "databases",
    label: "Databases",
    items: ["PostgreSQL", "MongoDB", "Vector DB", "Pinecone"],
  },
  {
    id: "frontend",
    label: "Frontend",
    items: ["React", "Next.js", "Javascript"],
  },
  {
    id: "ml",
    label: "ML",
    items: ["PyTorch", "NumPy", "Pandas", "Matplotlib", "Seaborn"],
  },
];

export function getSkills(): SkillCategory[] {
  return skills;
}
