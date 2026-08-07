/**
 * A point in time on the experience timeline.
 *
 * Stored as an ISO year-month string ("2025-12") rather than a Date, for three
 * reasons: the PRD only ever expresses month precision; Date would imply a day
 * that does not exist in the source data; and an ISO string sorts
 * lexicographically, so ordering the timeline needs no date parsing.
 */
export type YearMonth = `${number}-${number}` | string;

export interface ExperienceEntry {
  /** URL-safe id. React key, and anchor target for the interactive timeline. */
  slug: string;
  role: string;
  company: string;
  start: YearMonth;
  /**
   * `null` means "present" — an ongoing role. Modelled explicitly rather than
   * as an omitted field so that current roles are a state, not an absence.
   */
  end: YearMonth | null;
  /**
   * Skills/areas listed under the role in the PRD. Rendered as chips.
   */
  focus: string[];
}
