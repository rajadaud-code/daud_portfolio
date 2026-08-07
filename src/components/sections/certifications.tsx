import { ArrowUpRight, Award } from "lucide-react";
import Image from "next/image";

import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Card, CardTitle, Container, Section, SectionHeader } from "@/components/ui";
import { getCertificationShortfall, getCertifications } from "@/content";
import { cn } from "@/lib/utils";
import type { Certification } from "@/types";

/** Anchor id. Also derives the heading id that Section's aria-labelledby wants. */
const SECTION_ID = "certifications";

/**
 * Certifications — the PRD's grid of four cards.
 *
 * A Server Component; the only client JS is the motion wrappers. One credential
 * is real and three are literal "Placeholder" in the PRD, so this renders one
 * verifiable card and three honest reserved slots — same policy as the featured
 * projects grid, and the placeholders vanish on their own as
 * content/certifications.ts fills in (see getCertificationShortfall).
 */
export function Certifications() {
  const certifications = getCertifications();
  const shortfall = getCertificationShortfall();

  if (certifications.length === 0 && shortfall === 0) return null;

  return (
    <Section id={SECTION_ID}>
      <Container>
        <Reveal>
          <SectionHeader
            sectionId={SECTION_ID}
            eyebrow="Credentials"
            title="Certifications"
          />
        </Reveal>

        {/*
          A <ul> for the same reason the projects grid is one: announced as
          "list, 4 items", skippable in a keystroke. `role="list"` restores the
          semantics that `list-none` strips in Safari/VoiceOver.

          2-up at sm rather than jumping straight to 4-up: four abreast needs
          the full page width to give each card a readable measure.
        */}
        <Stagger
          as="ul"
          role="list"
          className="mt-stack grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4"
        >
          {certifications.map((certification) => (
            <StaggerItem as="li" key={certification.slug}>
              <CertificationCard certification={certification} />
            </StaggerItem>
          ))}

          {Array.from({ length: shortfall }, (_, i) => (
            <StaggerItem as="li" key={`placeholder-${certifications.length + i + 1}`}>
              <CertificationPlaceholder />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}

/**
 * CertificationCard — one verifiable credential.
 *
 * The whole card is the verify link, via the same stretched-anchor pattern as
 * ProjectCard: the title's <a> carries an ::after over the card's bounds, so
 * the accessibility tree sees exactly one link named by the credential.
 *
 * Hover is all CSS on `group/cert` — zero client JS per card.
 */
export function CertificationCard({ certification }: { certification: Certification }) {
  return (
    <Card interactive className="group/cert flex h-full flex-col overflow-hidden p-0">
      {certification.image ? (
        <div className="relative aspect-4/3 w-full overflow-hidden border-b border-line bg-[#f0ebd9] dark:bg-[#1a1916]">
          <Image
            src={certification.image.src}
            alt={certification.image.alt}
            width={certification.image.width}
            height={certification.image.height}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-contain p-2.5 transition-transform duration-[var(--duration-slow)] ease-editorial group-hover/cert:scale-[1.04]"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="flex items-start justify-between">
          {!certification.image ? (
            <span
              aria-hidden="true"
              className="flex size-11 items-center justify-center rounded-control border border-line bg-surface"
            >
              <Award className="size-5 text-ink" />
            </span>
          ) : (
            <span className="font-mono text-label uppercase text-accent font-medium">
              Verified Badge
            </span>
          )}

          <ArrowUpRight
            aria-hidden="true"
            className={cn(
              "size-4 text-ink-subtle ml-auto",
              "transition-[transform,color] duration-[var(--duration-base)] ease-editorial",
              "group-hover/cert:-translate-y-0.5 group-hover/cert:translate-x-0.5 group-hover/cert:text-accent",
            )}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <CardTitle>
            <a
              href={certification.verifyUrl}
              target="_blank"
              // A bare <a>, so noopener is set by hand — target="_blank" without
              // it hands the opened page a live handle back into this one.
              rel="noopener noreferrer"
              className="after:absolute after:inset-0 after:content-['']"
            >
              {certification.title}
            </a>
          </CardTitle>
          <p className="text-sm text-ink-muted">{certification.issuer}</p>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-line pt-4">
          <span
            className={cn(
              "font-mono text-label uppercase text-ink-subtle",
              "transition-colors duration-[var(--duration-fast)] ease-editorial",
              "group-hover/cert:text-accent",
            )}
          >
            Verify credential
          </span>
          {certification.issued ? (
            <span className="font-mono text-label uppercase text-ink-subtle">
              {certification.issued}
            </span>
          ) : null}
        </div>
      </div>
    </Card>
  );
}

/**
 * A reserved slot, not a credential. Same reasoning as ProjectCardPlaceholder:
 * not a skeleton (nothing is loading), a dashed frame that states the
 * situation. No hover, no link — it is not interactive, so it does not pretend
 * to be. min-h keeps the row's rhythm when a real card sits beside it.
 */
function CertificationPlaceholder() {
  return (
    <Card
      variant="plain"
      className="flex h-full min-h-56 flex-col justify-between border border-dashed border-line p-6"
    >
      <span
        aria-hidden="true"
        className="flex size-11 items-center justify-center rounded-control border border-dashed border-line"
      >
        <Award className="size-5 text-line-strong" />
      </span>

      <div className="flex flex-col gap-2">
        <p className="text-h3 text-ink-subtle">Coming soon</p>
        <p className="text-sm leading-relaxed text-ink-subtle">
          A slot held for a credential in progress.
        </p>
      </div>
    </Card>
  );
}
