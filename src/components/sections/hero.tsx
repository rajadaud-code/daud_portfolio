import { ArrowRight, Download, Mail } from "lucide-react";
import Image from "next/image";

import { MaskRevealText, Reveal } from "@/components/motion";
import { Button, ButtonLink, Container } from "@/components/ui";
import { site } from "@/content";
import { cn } from "@/lib/utils";

/**
 * Entrance choreography.
 *
 * One timeline, declared once, rather than delays scattered across the JSX.
 * Reading down this object tells you the order of the whole hero — which is
 * impossible when the numbers live at seven call sites.
 *
 * The headline leads. Everything else is timed off the end of it: the eyebrow
 * arrives just before the first word rises, and the supporting copy follows
 * once the headline has landed. The reveal is the hero's one gesture, and it
 * should finish before anything competes with it.
 */
const TIMELINE = {
  eyebrow: 0.1,
  headline: 0.25,
  /** Between headline words. Small — three words, and it should read as one move. */
  headlineStagger: 0.09,
  subheading: 0.75,
  actions: 0.9,
  photo: 0.4,
} as const;

/**
 * Hero — the first screen.
 *
 * A Server Component. Only the motion wrappers it renders are client
 * components, so none of this content or Lucide's icon set ships as client JS.
 *
 * ## Height
 *
 * Deliberately **not** `min-h-screen`. The PRD asks twice for projects to be
 * visible after minimal scroll ("Immediately after hero show Projects",
 * "Projects visible after minimal scroll"), and a locked full-viewport hero is
 * exactly what makes that impossible. Height here is content-driven with
 * generous padding, so the top of the projects grid peeks above the fold on a
 * laptop and invites the scroll rather than hiding behind it. This is the
 * Fabrica half of the brief (project-first) constraining the Trifecta half
 * (massive type) — and the PRD is explicit about which wins.
 */
export function Hero() {
  const hasPhoto = site.photo !== null;

  return (
    <section
      aria-labelledby="hero-heading"
      className="pt-2 pb-stack md:pt-24 lg:pt-4"
    >
      <Container>
        <div
          className={cn(
            "grid items-center gap-stack",
            // Two columns only when there is a second thing to put in one.
            hasPhoto && "lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]",
          )}
        >
          <div className="flex flex-col">
            {/* The name. Mono label — the metadata voice from the design
                system. The PRD's headline is the role, not the name, so the
                name sits above it as a byline rather than competing for the
                display size. */}
            <Reveal trigger="mount" delay={TIMELINE.eyebrow} distance={8}>
              <p className="font-mono text-label uppercase text-ink-subtle">
                {site.name}
              </p>
            </Reveal>

            <h1
              id="hero-heading"
              className="mt-6 text-display text-ink md:mt-8"
            >
              {/*
                MaskRevealText splits on whitespace and masks each word. The
                accessible name is still the full string — see mask-reveal.tsx.
              */}
              <MaskRevealText
                text={site.headline}
                delay={TIMELINE.headline}
                stagger={TIMELINE.headlineStagger}
              />
            </h1>

            {/* The PRD's subheading, verbatim. It is where "AI/LLM Engineer"
                and "Backend Developer" are stated, so it is load-bearing copy,
                not decoration — hence lead size rather than body. */}
            <Reveal trigger="mount" delay={TIMELINE.subheading}>
              <p className="mt-8 max-w-prose-editorial text-lead text-ink-muted text-pretty">
                {site.subheading}
              </p>
            </Reveal>

            <Reveal trigger="mount" delay={TIMELINE.actions}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center md:mt-12">
                <ButtonLink
                  href="/contact"
                  size="lg"
                  leadingIcon={<Mail aria-hidden="true" />}
                >
                  Contact Me
                </ButtonLink>

                <ButtonLink
                  href="/projects"
                  variant="secondary"
                  size="lg"
                  trailingIcon={<ArrowRight aria-hidden="true" />}
                >
                  View Projects
                </ButtonLink>

                <ResumeAction />
              </div>
            </Reveal>
          </div>

          {hasPhoto ? <HeroPhoto /> : null}
        </div>
      </Container>
    </section>
  );
}

/**
 * Resume — a placeholder, honestly.
 *
 * The PRD marks the resume as a placeholder and no file exists. The options
 * were: link to a 404, invent a resume, or say so. This says so.
 *
 * `aria-disabled` rather than `disabled`: a `disabled` button is removed from
 * the tab order entirely, so a keyboard user never learns the resume exists or
 * that it is coming. This keeps it focusable and announced as unavailable. It
 * carries no handler, so activating it does nothing by construction — there is
 * no click to suppress.
 *
 * Deleting this branch is the whole job once site.resume.href is set.
 */
function ResumeAction() {
  if (site.resume.href) {
    return (
      <ButtonLink
        href={site.resume.href}
        variant="ghost"
        size="lg"
        download={site.resume.filename}
        leadingIcon={<Download aria-hidden="true" />}
      >
        Resume
      </ButtonLink>
    );
  }

  return (
    <Button
      variant="ghost"
      size="lg"
      aria-disabled="true"
      leadingIcon={<Download aria-hidden="true" />}
      className="cursor-not-allowed opacity-45"
    >
      Resume
      <span className="sr-only"> — coming soon</span>
      <span aria-hidden="true" className="font-mono text-label uppercase">
        Soon
      </span>
    </Button>
  );
}

/**
 * The portrait.
 *
 * Unreachable until site.photo is set — see the TODO in content/site.ts.
 * Written now so that supplying the asset is a one-line data change rather than
 * a layout exercise.
 *
 * `priority` because this is the LCP candidate on any viewport that shows it;
 * without it Next lazy-loads and the largest paint waits on the observer.
 * `sizes` tells the browser the image is ~40vw at lg and full-width below, so
 * it can pick a source before layout — omitting it makes Next assume 100vw and
 * ship a needlessly large file to desktop.
 */
function HeroPhoto() {
  if (!site.photo) return null;

  return (
    <Reveal trigger="mount" delay={TIMELINE.photo} distance={24}>
      <div className="relative overflow-hidden rounded-panel bg-surface">
        <Image
          src={site.photo.src}
          alt={site.photo.alt}
          width={site.photo.width}
          height={site.photo.height}
          priority
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="h-full w-full object-cover"
        />
      </div>
    </Reveal>
  );
}
