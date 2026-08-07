/**
 * Content layer barrel.
 *
 * This is the seam that makes the site maintainable: components import data
 * from here and never hard-code copy, links, or lists. Filling the PRD's TODOs
 * later means editing one object in this folder — no JSX is touched.
 */
export { site } from "./site";
export { navigation } from "./navigation";

export {
  FEATURED_PROJECT_TARGET,
  getAllCategories,
  getAllProjects,
  getAllTech,
  getCaseStudyHref,
  getFeaturedProjects,
  getFeaturedShortfall,
  getProjectBySlug,
  getProjectHref,
  projects,
} from "./projects";

export {
  experience,
  formatYearMonth,
  getCurrentRole,
  getExperience,
} from "./experience";

export {
  CERTIFICATION_TARGET,
  certifications,
  getCertificationShortfall,
  getCertifications,
} from "./certifications";

export { getSkills, skills } from "./skills";
