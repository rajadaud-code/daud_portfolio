import { ArrowUpRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  ButtonLink,
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardMedia,
  CardTitle,
  GithubIcon,
  Tag,
  TagList,
} from "@/components/ui";
import { getProjectHref } from "@/content";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

/**
 * "01", "02" — the mono index shown on every card and slot.
 *
 * Zero-padded so the numerals stay the same width and the column of indices
 * down the grid reads as a set rather than as drifting text.
 */
function formatIndex(index: number): string {
  return String(index).padStart(2, "0");
}

/** Anything not starting with "/" leaves the site and must open in a new tab. */
function isExternalHref(href: string): boolean {
  return !href.startsWith("/");
}

export interface ProjectCardProps {
  project: Project;
  /** 1-based position in the grid. Shown as the card's index. */
  index: number;
  /**
   * `lead` is the wide, media-beside-content card that opens the grid;
   * `standard` is the stacked card that fills the rows beneath it.
   */
  layout?: "lead" | "standard";
  /**
   * Marks the thumbnail as LCP-eligible. True for the lead card only — every
   * `priority` image after the first competes with it for bandwidth, which is
   * the opposite of what the flag is for.
   */
  priority?: boolean;
}

/**
 * ProjectCard — one project.
 *
 * A Server Component. Every hover effect here is CSS driven by `group/card`, so
 * the whole card costs zero client JS; the section's scroll reveal is the only
 * thing that ships a wrapper. Framer Motion on a card grid would mean five
 * `motion.div`s and their event handlers on the page for effects that the
 * compositor already does for free.
 *
 * ## The whole card is clickable, and it is still one link
 *
 * The title's `<a>` carries an `::after` stretched to the card's bounds (Card
 * is `relative`), so the click target is the entire surface while the
 * accessibility tree sees exactly one link, named with the project's title.
 * `onClick` on the card would break cmd-click, middle-click, keyboard
 * activation, and "copy link address" all at once — see the note in ui/card.tsx.
 *
 * The GitHub and demo links sit in `relative z-10` above that pseudo-element,
 * so they win the click on their own footprint. They are siblings in the DOM,
 * never nested inside the stretched anchor — nested links are invalid HTML and
 * browsers silently un-nest them.
 */
export function ProjectCard({
  project,
  index,
  layout = "standard",
  priority = false,
}: ProjectCardProps) {
  const href = getProjectHref(project);
  const isLead = layout === "lead";

  return (
    <Card
      // `interactive` only when there is somewhere to go: a card that lifts
      // under the cursor and does nothing when clicked is a lie the design
      // system should not be able to tell.
      interactive={Boolean(href)}
      className={cn(
        // Named group. `group/card` rather than bare `group` so a future nested
        // group (a carousel, a filter row) cannot capture these hovers.
        "group/card h-full overflow-hidden",
        // overflow-hidden is what clips the thumbnail's hover scale to the
        // card's radius — which is also why CardMedia is given `rounded-none`
        // below rather than fighting the card's corners with its own.
        isLead
          ? "grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"
          : "flex flex-col",
      )}
    >
      <ProjectThumbnail
        project={project}
        index={index}
        priority={priority}
        // The lead card's media holds 16/10 while stacked, then fills its
        // column beside the body at lg. Both states are classes (the thumbnail
        // opts out of CardMedia's inline ratio) because they *must* trade off
        // by breakpoint — and because an aspect-ratio left active alongside
        // `h-full` does not "stop applying": the definite height transfers
        // through the ratio into a width of height x 1.6, which overflowed the
        // media column and painted over the card body. That was the merged
        // lead card this comment now exists to prevent.
        className={cn(isLead && "lg:aspect-auto lg:h-full")}
        sizes={
          isLead
            ? "(min-width: 1024px) 55vw, 100vw"
            : "(min-width: 768px) 45vw, 100vw"
        }
      />

      <CardBody className={cn("gap-4", isLead && "justify-center gap-5 p-7 md:p-9")}>
        <span className="font-mono text-label uppercase text-ink-subtle">
          {formatIndex(index)}
        </span>

        <CardTitle className={cn(isLead && "text-h2")}>
          {href ? (
            <Link
              href={href}
              target={isExternalHref(href) ? "_blank" : undefined}
              // Set explicitly rather than relying on ButtonLink's default —
              // this is a bare next/link, so nothing else adds it, and
              // target="_blank" without noopener hands the opened page a live
              // handle back into this one.
              rel={isExternalHref(href) ? "noopener noreferrer" : undefined}
              className="inline-flex items-start gap-2 after:absolute after:inset-0 after:content-['']"
            >
              {project.title}
              <ArrowUpRight
                aria-hidden="true"
                className={cn(
                  "mt-1 size-[0.7em] shrink-0 text-ink-subtle",
                  "transition-[transform,color] duration-[var(--duration-base)] ease-editorial",
                  "group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 group-hover/card:text-accent",
                )}
              />
            </Link>
          ) : (
            project.title
          )}
        </CardTitle>

        <CardDescription className={cn(isLead && "text-base")}>
          {project.description}
        </CardDescription>

        <TagList className="pt-1">
          {project.tech.map((tech) => (
            <li key={tech}>
              <Tag size="sm">{tech}</Tag>
            </li>
          ))}
        </TagList>

        {/* Rendered only when the project actually has links — an empty footer
            would still contribute its padding and leave a ragged card. */}
        {project.links.github || project.links.live ? (
          <CardFooter>
            {project.links.github ? (
              <ButtonLink
                href={project.links.github}
                target="_blank"
                variant="ghost"
                size="sm"
                leadingIcon={<GithubIcon />}
                // Above the title's stretched ::after, so this link — not the
                // card — receives clicks on its own box.
                className="relative z-10"
                // Five cards mean five "GitHub" links; a screen-reader user
                // listing links needs to know which project each belongs to.
                // The visible text is kept inside the accessible name (WCAG
                // 2.5.3) rather than replaced by it.
                aria-label={`GitHub repository for ${project.title}`}
              >
                GitHub
              </ButtonLink>
            ) : null}

            {project.links.live ? (
              <ButtonLink
                href={project.links.live}
                target="_blank"
                variant="ghost"
                size="sm"
                leadingIcon={<ExternalLink aria-hidden="true" />}
                className="relative z-10"
                aria-label={`Live Demo of ${project.title}`}
              >
                Live Demo
              </ButtonLink>
            ) : null}
          </CardFooter>
        ) : null}
      </CardBody>
    </Card>
  );
}

/**
 * The card's image frame — or an honest stand-in for it.
 *
 * `thumbnail` is `null` until a screenshot is supplied (see types/media.ts:
 * missing assets are modelled as null precisely so this branch has to exist).
 * The fallback holds the exact same box, so dropping the real file in later
 * changes the picture and moves nothing.
 */
function ProjectThumbnail({
  project,
  index,
  priority,
  className,
  sizes,
}: {
  project: Project;
  index: number;
  priority: boolean;
  className?: string;
  sizes: string;
}) {
  // `rounded-none`: the card clips these corners with overflow-hidden. Left at
  // CardMedia's default the media would round its own bottom corners in the
  // middle of the card, where there is no corner to round.
  //
  // `ratio={null}` + `aspect-16/10` class: same crop as CardMedia's default,
  // but as a utility the lead card's `lg:aspect-auto` can actually override —
  // see the note at the call site.
  const frame = cn("rounded-none aspect-16/10", className);

  if (!project.thumbnail) {
    return (
      <CardMedia
        ratio={null}
        className={cn(
          frame,
          // Stacked, not layered. Centring both on top of each other reads as
          // a collision rather than as type over a watermark — the numeral is
          // too light to sit behind text and too large to sit under it.
          "flex flex-col items-center justify-center gap-4 bg-surface",
        )}
      >
        {/* Purely graphic — the accessible index is the mono "01" in the card
            body, and repeating it here would have a screen reader say the
            number twice. */}
        <span
          aria-hidden="true"
          className="font-mono text-[3.5rem] leading-none font-medium text-line-strong select-none"
        >
          {formatIndex(index)}
        </span>
        <span className="font-mono text-label uppercase text-ink-subtle">
          Screenshot coming soon
        </span>
      </CardMedia>
    );
  }

  return (
    <CardMedia ratio={null} className={frame}>
      <Image
        src={project.thumbnail.src}
        alt={project.thumbnail.alt}
        width={project.thumbnail.width}
        height={project.thumbnail.height}
        priority={priority}
        sizes={sizes}
        className={cn(
          "h-full w-full object-cover",
          // The premium half of the hover: the card lifts 2px (hover-lift) while
          // the image pushes in. Slow and small — 1.04 over 700ms reads as the
          // image breathing; 1.1 over 200ms reads as a banner ad.
          //
          // No touch-device guard needed: Tailwind compiles `group-hover:` (and
          // `hover:`) inside @media (hover: hover) on its own, so this cannot
          // latch after a tap the way a hand-written :hover rule would — which
          // is why the .hover-lift utility in globals.css has to gate itself
          // explicitly and this does not. Verified against the compiled CSS.
          "transition-transform duration-[var(--duration-slow)] ease-editorial",
          "group-hover/card:scale-[1.04]",
        )}
      />
    </CardMedia>
  );
}

/**
 * ProjectCardPlaceholder — a reserved slot, not a project.
 *
 * The PRD asks for five featured cards and supplies one. The options were to
 * invent four projects, ship a lopsided grid, or say plainly that four slots
 * are spoken for. This says so.
 *
 * Deliberately *not* a <Skeleton>: a skeleton means "content is loading and will
 * arrive in a moment", and shimmering forever is a promise the page cannot keep.
 * Nothing is loading — the work simply is not written up yet. Hence a dashed
 * frame, which reads as a placeholder to anyone who has used a design tool, and
 * a label that states the situation in words for anyone who has not.
 *
 * These carry no hover state and no link. They are not interactive, so they do
 * not pretend to be.
 */
export function ProjectCardPlaceholder({ index }: { index: number }) {
  return (
    <Card
      variant="plain"
      className="flex h-full min-h-64 flex-col justify-between border border-dashed border-line p-7"
    >
      <span className="font-mono text-label uppercase text-ink-subtle">
        {formatIndex(index)}
      </span>

      <div className="flex flex-col gap-2">
        <p className="text-h3 text-ink-subtle">Coming soon</p>
        <p className="text-sm leading-relaxed text-ink-subtle">
          A slot held for a project that is still being written up.
        </p>
      </div>
    </Card>
  );
}
