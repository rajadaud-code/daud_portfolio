import type { OptionalImageAsset } from "./media";

/**
 * A single technology label, e.g. "FastAPI".
 *
 * Kept as a plain string rather than a closed union: the Projects page filters
 * are derived from the tech actually present across projects (see
 * `getAllTech()` in content/projects.ts), so adding a project with a new stack
 * extends the filter set automatically. A union would force a type edit for
 * every new tool Daud picks up — friction with no payoff.
 */
export type TechTag = string;

export interface ProjectLinks {
  /** Public repository. Omit if the source is private. */
  github?: string;
  /** Deployed demo. Omit if nothing is hosted. */
  live?: string;
}

export type ProjectCategory =
  | "AI / LLM"
  | "Backend Engineering"
  | "Full Stack"
  | "Machine Learning";

export interface ArchitectureNode {
  id: string;
  label: string;
  sublabel?: string;
  type: "client" | "api" | "ai" | "db" | "queue" | "cache";
}

export interface EngineeringChallenge {
  challenge: string;
  solution: string;
}

/**
 * Long-form content for the Projects page case-study layout.
 */
export interface ProjectCaseStudy {
  /** The problem in detail. */
  problem: string;
  /** Overall engineering approach. */
  approach: string;
  /** System architecture overview. */
  architecture: string;
  /** Key architecture nodes for the diagram visualizer. */
  architectureNodes?: ArchitectureNode[];
  /** Detailed implementation notes and key code highlights. */
  implementation: string[];
  /** Technical challenges and engineering solutions applied. */
  challenges: EngineeringChallenge[];
  /** Outcome and quantifiable metrics. */
  outcome: string;
  /** Key highlights worth defending in an engineering interview. */
  highlights?: string[];
  /** Future improvements and architectural roadmap. */
  futureImprovements?: string[];
}

export interface Project {
  /** URL-safe id. Also the React key and the case-study route segment. */
  slug: string;
  title: string;
  category: ProjectCategory;
  /** One or two lines. Shown on the card. */
  description: string;
  tech: TechTag[];
  links: ProjectLinks;
  /**
   * Card image. `null` until the asset is supplied — see OptionalImageAsset.
   */
  thumbnail: OptionalImageAsset;
  /** Surfaces this project in the homepage featured grid. */
  featured: boolean;
  /** Ordering hint within the featured grid. Lower renders first. */
  order: number;
  caseStudy?: ProjectCaseStudy;
}
