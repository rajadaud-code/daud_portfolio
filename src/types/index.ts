/**
 * Barrel for the type layer: `import type { Project, SiteConfig } from "@/types"`.
 *
 * Types only — no runtime values pass through here, so importing from this
 * barrel adds nothing to the bundle.
 */
export type { ImageAsset, OptionalImageAsset } from "./media";
export type {
  ArchitectureNode,
  EngineeringChallenge,
  Project,
  ProjectCaseStudy,
  ProjectCategory,
  ProjectLinks,
  TechTag,
} from "./project";
export type { ExperienceEntry, YearMonth } from "./experience";
export type { Certification } from "./certification";
export type { SkillCategory, SkillCategoryId } from "./skill";
export type {
  Education,
  ResumeAsset,
  SiteConfig,
  SocialLinks,
} from "./site";
export type { NavItem, Route } from "./navigation";
