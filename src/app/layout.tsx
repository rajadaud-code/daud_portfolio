import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Navbar } from "@/components/layout";
import { rootMetadata } from "@/lib/seo";

import "./globals.css";

/**
 * Typeface roles
 * --------------
 * Geist Sans  — everything the reader reads: the display hero, headings, body.
 *               A tight grotesque that holds up at clamp(3.25rem, 13vw, 11rem)
 *               without the awkward apertures most UI faces develop at scale.
 * Geist Mono  — eyebrows, section numbers, tech chips, dates. Mono for metadata
 *               is the idiom that reads "engineer" rather than "agency", and it
 *               gives the minimal palette a second texture to work with while
 *               spending nothing: both faces ship with the scaffold already.
 *
 * A third display face is a real design decision with a real byte cost. If the
 * hero wants more character than Geist gives it, that is a conversation for
 * Phase 3 against a rendered hero — not a guess made now.
 *
 * next/font self-hosts both at build time: no render-blocking request to
 * Google, no layout shift from a late swap, no third-party origin in the
 * critical path.
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/** Inherited by every route; per-page values come from buildMetadata(). */
export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /*
     * The font variables land on <html> so both faces are reachable from
     * anywhere, including portals that render outside <body>'s tree.
     *
     * suppressHydrationWarning is set in advance of the future theme toggle:
     * a no-flash theme script must stamp <html> before React hydrates, which
     * is by definition a server/client attribute mismatch. Scoped to this one
     * element, it suppresses exactly that and nothing else.
     */
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var theme = saved || 'light';
                  document.documentElement.setAttribute('data-theme', theme);
                  if (theme === 'dark') document.documentElement.classList.add('dark');
                } catch (e) {}
              })();
            `,
          }}
        />
        {/*
          Framer Motion renders an element's `initial` state into the SSR HTML.
          For the masked hero headline that means transform:translateY(110%) —
          i.e. hidden — until hydration flips it. With JavaScript unavailable it
          never flips, and the site's main heading is invisible forever.

          This resets the words to their resting position when JS is off. It
          costs nothing when JS is on (the tag is inert) and it is the
          difference between "no animation" and "no headline".

          [data-motion] covers the same failure for every <Reveal> and
          <StaggerItem>, which SSR an inline opacity:0 for the same reason. The
          headline was reset here from the start while the hero's subheading,
          its CTAs and the whole projects grid were not — so without JS the page
          rendered its title over an empty screen. Anything Framer can hide
          before hydration belongs in this selector.
        */}
        <noscript>
          <style>
            {`[data-mask-word],[data-motion]{transform:none!important;opacity:1!important}`}
          </style>
        </noscript>
      </head>
      <body className="min-h-dvh bg-canvas font-sans text-ink antialiased">
        {/*
          Skip link. First focusable element on the page, visually hidden until
          focused. Without it, every keyboard user tabs through the whole nav on
          every route before reaching content.

          Not a "section" — it is part of the navigation contract, and building
          the nav without it would mean shipping a known a11y gap and calling
          the phase done.
        */}
        <a
          href="#main"
          className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-4 focus-visible:top-4 focus-visible:z-100 focus-visible:rounded-control focus-visible:bg-ink focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:text-ink-inverse"
        >
          Skip to content
        </a>

        <Navbar />

        {/* tabIndex={-1} makes the skip link's target focusable, so focus
            actually moves here rather than the page merely scrolling. */}
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
      </body>
    </html>
  );
}
