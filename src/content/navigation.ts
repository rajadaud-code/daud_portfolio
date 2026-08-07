import type { NavItem } from "@/types";

/**
 * The PRD sitemap. Drives the sticky nav, the footer, and the sitemap.xml —
 * one list, so those three can never disagree about what pages exist.
 */
export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
