/**
 * Skill group headings, exactly as the PRD defines them.
 *
 * A closed union here (unlike TechTag) because these are five fixed editorial
 * sections of the About page, not open-ended data. Adding a sixth group is a
 * design decision that should require a deliberate type change.
 */
export type SkillCategoryId =
  | "ai"
  | "backend"
  | "frontend"
  | "languages"
  | "databases"
  | "tools"
  | "ml";

export interface SkillCategory {
  id: SkillCategoryId;
  /** Display heading, e.g. "AI & LLM Frameworks". */
  label: string;
  items: string[];
}
