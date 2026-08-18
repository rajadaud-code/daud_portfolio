"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

import { Container, ThemeToggle } from "@/components/ui";
import { navigation, site } from "@/content";
import { useScrollDirection } from "@/hooks";
import { DURATION, EASE, TRANSITION } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Navbar — sticky, glass, hides on scroll down.
 *
 * Client component: it reads scroll position, the current route, and menu
 * state. It sits at the top of the tree, but it is small and leaf-like — it
 * renders no children, so nothing else is pulled into the client bundle.
 *
 * The nav list comes from @/content/navigation, the same array that generates
 * sitemap.xml. The two cannot disagree about what pages exist.
 */
export function Navbar() {
  const pathname = usePathname();
  const { direction, isScrolled } = useScrollDirection();
  const shouldReduceMotion = useReducedMotion();
  const menuId = useId();

  /*
   * The menu is stored as "which route is it open for", not as a boolean.
   *
   * This makes "close on navigation" fall out of a derivation rather than
   * needing an effect to sync it: when `pathname` changes, the stored path no
   * longer matches and the menu is closed — no re-render pass, no window where
   * the panel hangs over the page you just navigated to.
   *
   * The boolean version needs a useEffect that calls setState on every route
   * change, which is the pattern react-hooks/set-state-in-effect exists to
   * catch. Deriving state you can compute is always cheaper than syncing it.
   */
  const [menuOpenForPath, setMenuOpenForPath] = useState<string | null>(null);
  const isMenuOpen = menuOpenForPath === pathname;
  const toggleMenu = () => setMenuOpenForPath(isMenuOpen ? null : pathname);

  // Escape closes. Expected of any dismissible overlay, and the only exit a
  // keyboard user has that does not require finding the toggle again.
  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpenForPath(null);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  // Scroll lock. Without it the page scrolls behind the open panel — and on
  // iOS the panel drifts with it. The previous value is restored rather than
  // assumed to be "", in case something else was managing it.
  useEffect(() => {
    if (!isMenuOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMenuOpen]);

  /*
   * Hide on scroll down, reveal on scroll up — but never while the menu is
   * open, or the panel's own toggle would slide off screen under the user.
   */
  const isHidden = isScrolled && direction === "down" && !isMenuOpen;

  return (
    <motion.header
      // `sticky` rather than `fixed`: the header keeps its place in flow, so
      // the page below does not need a magic top offset to compensate for it.
      className={cn(
        "sticky top-0 z-50 border-b border-line bg-canvas/85 backdrop-blur-md transition-colors duration-[var(--duration-fast)]",
      )}
      animate={{ y: isHidden && !shouldReduceMotion ? "-100%" : "0%" }}
      transition={{ duration: DURATION.base, ease: EASE.editorial }}
    >
      <Container>
        <nav
          aria-label="Main"
          className="flex h-16 items-center justify-between gap-6 md:h-20"
        >
          {/* Wordmark */}
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="text-sm font-medium tracking-tight text-ink transition-colors hover:text-accent"
          >
            {site.name}
          </Link>

          <div className="hidden items-center gap-3 md:flex">
            <ul role="list" className="flex items-center gap-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    label={item.label}
                    isActive={pathname === item.href}
                    animateIndicator={!shouldReduceMotion}
                  />
                </li>
              ))}
            </ul>

            <div className="ml-2 border-l border-line pl-3">
              <ThemeToggle />
            </div>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />

            <button
              type="button"
              // aria-expanded + aria-controls are what make this a disclosure
              // rather than a mystery icon.
              aria-expanded={isMenuOpen}
              aria-controls={menuId}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={toggleMenu}
              className="inline-flex size-11 items-center justify-center rounded-control text-ink transition-colors hover:bg-surface"
            >
              {isMenuOpen ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </Container>

      <MobileMenu
        id={menuId}
        isOpen={isMenuOpen}
        pathname={pathname}
        reduceMotion={Boolean(shouldReduceMotion)}
      />
    </motion.header>
  );
}

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  animateIndicator: boolean;
}

/**
 * A desktop nav link with a shared active indicator.
 */
function NavLink({ href, label, isActive, animateIndicator }: NavLinkProps) {
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative inline-flex h-9 items-center rounded-control px-3 text-sm transition-colors",
        isActive ? "text-ink font-medium" : "text-ink-muted hover:text-ink",
      )}
    >
      {label}
      {isActive ? (
        animateIndicator ? (
          <motion.span
            layoutId="nav-active-indicator"
            className="absolute inset-x-3 -bottom-px h-px bg-ink"
            transition={TRANSITION.base}
          />
        ) : (
          <span className="absolute inset-x-3 -bottom-px h-px bg-ink" />
        )
      ) : null}
    </Link>
  );
}

interface MobileMenuProps {
  id: string;
  isOpen: boolean;
  pathname: string;
  reduceMotion: boolean;
}

/**
 * The mobile disclosure panel.
 *
 * Rendered immediately after the toggle in DOM order, so tabbing out of the
 * button lands in the panel and tabbing past the last link leaves it. That
 * ordering is doing the job a focus trap would, without the machinery.
 *
 * TODO (Phase 7 a11y pass): this is a disclosure, not a modal — it does not
 * trap focus or mark the page behind it inert. Correct for a nav panel;
 * revisit only if it grows into a full-screen overlay.
 */
function MobileMenu({ id, isOpen, pathname, reduceMotion }: MobileMenuProps) {
  return (
    <AnimatePresence initial={false}>
      {isOpen ? (
        <motion.div
          id={id}
          // Height animation is normally banned (it forces layout every frame),
          // but "auto" cannot be interpolated any other way and this is one
          // small element animating once on tap — not a scroll-linked effect.
          initial={reduceMotion ? false : { height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
          transition={{ duration: DURATION.fast, ease: EASE.editorial }}
          className="overflow-hidden border-t border-line bg-canvas md:hidden"
        >
          <Container>
            <ul role="list" className="flex flex-col py-4">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={cn(
                      "flex h-12 items-center text-lg tracking-tight transition-colors",
                      pathname === item.href
                        ? "text-ink font-semibold"
                        : "text-ink-muted hover:text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
