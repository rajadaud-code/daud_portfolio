import type { OptionalImageAsset } from "./media";

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

export interface ProjectMetric {
  label: string;
  value: string;
  hint?: string;
}

export interface EngineeringTradeoff {
  decision: string;
  choice: string;
  why: string;
}

export interface ProjectCaseStudy {
  metrics?: ProjectMetric[];
  aiPipelineType?: "rag" | "agent" | "architecture";
  problem: string;
  approach: string;
  architecture: string;
  architectureNodes?: ArchitectureNode[];
  tradeoffs?: EngineeringTradeoff[];
  implementation: string[];
  challenges: EngineeringChallenge[];
  outcome: string;
  highlights?: string[];
  futureImprovements?: string[];
}

export interface ProjectMediaVideo {
  src: string;
  poster?: string;
  alt?: string;
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  description: string;
  tech: TechTag[];
  links: ProjectLinks;
  thumbnail: OptionalImageAsset;
  images?: OptionalImageAsset[];
  video?: ProjectMediaVideo;
  featured: boolean;
  order: number;
  caseStudy?: ProjectCaseStudy;
}
