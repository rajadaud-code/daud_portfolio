/**
 * Routes in the PRD sitemap.
 *
 * A closed union, so a typo in a nav href or a link to a page that does not
 * exist is a compile error rather than a runtime 404 someone finds in
 * production.
 */
export type Route = "/" | "/projects" | "/about" | "/contact" | `/projects/${string}`;

export interface NavItem {
  label: string;
  href: Route;
}
