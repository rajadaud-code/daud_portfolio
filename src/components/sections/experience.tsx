import { Reveal } from "@/components/motion";
import { Container, Section, SectionHeader, Tag, TagList } from "@/components/ui";
import { formatYearMonth, getExperience } from "@/content";
import { cn } from "@/lib/utils";
import type { ExperienceEntry } from "@/types";
import { TimelineRail } from "./timeline-rail";

/** Anchor id. Also derives the heading id that Section's aria-labelledby wants. */
const SECTION_ID = "experience";

/*
 * Timeline geometry, shared by the rail and the dots so they cannot drift.
 *
 * The gutter is a 14px column: each entry's dot (size-3.5) sits at its left
 * edge, and the rail is a 1px line dropped through the dot centres —
 * left 6.5px + 1px width straddles x=7. Content clears the column with pl-10.
 */
const DOT_COLUMN = {
  dot: "absolute left-0 top-0.5 size-3.5 rounded-full border-2",
  rail: "left-[6.5px] top-1 -bottom-2 w-px",
  entry: "relative pl-10 md:pl-14",
} as const;

/**
 * Experience — the PRD's four-role timeline.
 *
 * A Server Component: every entry renders on the server, and the client JS is
 * exactly two things — the Reveal wrappers, and the self-measuring TimelineRail
 * stretched behind the list (see timeline-rail.tsx for that boundary).
 *
 * ## The animation, as choreography
 *
 * The rail draws downward with scroll while each entry rises into place as the
 * reader reaches it — per-entry `whileInView` Reveals rather than one staggered
 * group, because the entries are a viewport apart: a group fires every delay
 * the moment the container edge enters, and the lower entries would have
 * finished animating long before anyone scrolled to them.
 *
 * ## Layout
 *
 * An <ol>, because this is the one list on the site whose order *is* the
 * content — reverse chronology, newest first (getExperience sorts; document
 * order is not trusted). Constrained to max-w-3xl: a timeline is read down a
 * single line, and stretching entries across the full 90rem page would put the
 * chips a head-turn away from the rail that anchors them.
 */
export function Experience() {
  const entries = getExperience();

  if (entries.length === 0) return null;

  return (
    <Section id={SECTION_ID} spacing="tight">
      <Container>
        <Reveal>
          <SectionHeader
            sectionId={SECTION_ID}
            eyebrow="Career"
            title="Experience"
          />
        </Reveal>

        <div className="relative mt-stack max-w-3xl">
          <TimelineRail className={DOT_COLUMN.rail} />

          {/* `role="list"` restores what `list-none` strips in Safari/VoiceOver. */}
          <ol role="list" className="flex list-none flex-col gap-14 p-0 md:gap-16">
            {entries.map((entry) => (
              <TimelineEntry key={entry.slug} entry={entry} />
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}

/**
 * One role. The dot rides inside the Reveal deliberately: it rises the same
 * 16px as its entry and settles onto the rail with it — dot and content arrive
 * as one thing, not a marker that waits for its text.
 */
function TimelineEntry({ entry }: { entry: ExperienceEntry }) {
  const isCurrent = entry.end === null;

  return (
    <Reveal as="li" className={DOT_COLUMN.entry}>
      {/* Decorative — the dates below carry the information. The current
          role's dot is the accent's one appearance per entry: filled, with a
          soft halo, the "you are here" marker. */}
      <span
        aria-hidden="true"
        className={cn(
          DOT_COLUMN.dot,
          isCurrent
            ? "border-accent bg-accent ring-4 ring-accent-subtle"
            : "border-line-strong bg-canvas",
        )}
      />

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        {/* Real <time> elements: the machine-readable year-month survives the
            editorial formatting. */}
        <p className="font-mono text-label uppercase text-ink-subtle">
          <time dateTime={entry.start}>{formatYearMonth(entry.start)}</time>
          {" – "}
          {entry.end ? (
            <time dateTime={entry.end}>{formatYearMonth(entry.end)}</time>
          ) : (
            "Present"
          )}
        </p>

        {isCurrent ? (
          <Tag variant="accent" size="sm">
            Current
          </Tag>
        ) : null}
      </div>

      <h3 className="mt-3 text-h3 text-ink text-balance">{entry.role}</h3>

      <p className="mt-1.5 text-ink-muted">{entry.company}</p>

      <TagList className="mt-5">
        {entry.focus.map((item) => (
          <li key={item}>
            <Tag size="sm">{item}</Tag>
          </li>
        ))}
      </TagList>
    </Reveal>
  );
}
