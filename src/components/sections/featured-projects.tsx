import { ArrowRight } from "lucide-react";

import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { ButtonLink, Container, Section, SectionHeader } from "@/components/ui";
import { getFeaturedProjects, getFeaturedShortfall } from "@/content";
import { ProjectCard, ProjectCardPlaceholder } from "./project-card";

/** Anchor id. Also derives the heading id that Section's aria-labelledby wants. */
const SECTION_ID = "projects";

/**
 * FeaturedProjects — the homepage grid, and the reason the site exists.
 *
 * A Server Component: the cards, the copy, and Lucide's icons all render on the
 * server, and the only client JS is the motion wrappers (see reveal.tsx for why
 * that boundary sits where it does).
 *
 * ## Layout
 *
 * Fabrica's move, not its markup: one project given the full width and treated
 * as the argument for the whole portfolio, the rest arranged beneath it. That
 * shape is doing real work here — the first project is the only one with
 * content, so the layout that flatters it most is also the honest one.
 *
 * It is derived rather than hard-coded. The first featured project leads, every
 * other one is a standard card, and unfilled slots become placeholders. Adding
 * Projects 2–5 to content/projects.ts fills the grid with no change to this
 * file; a sixth would simply extend the rows.
 *
 * ## Scroll budget
 *
 * `spacing="tight"` drops the top padding because the hero already spaced
 * itself — the PRD asks twice for projects after minimal scroll, and stacking
 * `pb-stack` under `py-section` would spend a full screen on whitespace between
 * the two most important blocks on the page.
 */
export function FeaturedProjects() {
  const featured = getFeaturedProjects();
  const shortfall = getFeaturedShortfall();

  // The lead card is simply the first featured project — `order` decides which,
  // so promoting a different project to the top of the page is a data edit.
  const [lead, ...rest] = featured;

  // Nothing to show and nothing promised. Rendering a heading over an empty
  // grid would be worse than rendering nothing at all.
  if (!lead && shortfall === 0) return null;

  return (
    <Section id={SECTION_ID} spacing="tight">
      <Container>
        <Reveal>
          <SectionHeader
            sectionId={SECTION_ID}
            eyebrow="Selected Work"
            title="Featured Projects"
            action={
              <ButtonLink
                href="/projects"
                variant="secondary"
                trailingIcon={<ArrowRight aria-hidden="true" />}
              >
                All projects
              </ButtonLink>
            }
          />
        </Reveal>

        {/*
          A <ul>, so the grid is announced as "list, 5 items" and can be skipped
          in one keystroke. The visual arrangement is the grid's job; the
          semantics stay a list either way.

          `role="list"` alongside `list-none` for the same reason TagList carries
          it: removing the marker also removes the list semantics in Safari/
          VoiceOver, and the role puts them back.
        */}
        <Stagger
          as="ul"
          role="list"
          className="mt-stack grid list-none gap-5 p-0 md:grid-cols-2"
        >
          {lead ? (
            <StaggerItem as="li" className="md:col-span-2">
              <ProjectCard project={lead} index={1} layout="lead" priority />
            </StaggerItem>
          ) : null}

          {rest.map((project, i) => (
            <StaggerItem as="li" key={project.slug}>
              {/* +2: the lead is 1, and this list starts after it. */}
              <ProjectCard project={project} index={i + 2} />
            </StaggerItem>
          ))}

          {/*
            The unfilled slots. Keyed and numbered off the count of real
            projects, so they always continue the sequence rather than restart
            it — and they vanish on their own once content fills the target
            (see getFeaturedShortfall).
          */}
          {Array.from({ length: shortfall }, (_, i) => {
            const index = featured.length + i + 1;
            return (
              <StaggerItem as="li" key={`placeholder-${index}`}>
                <ProjectCardPlaceholder index={index} />
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}
