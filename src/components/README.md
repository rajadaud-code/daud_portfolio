# Components

Four folders, split by **who owns the component**, not by what it looks like.
The test for where something belongs is: *what would break if this moved?*

## `ui/` — shared primitives

Button, Tag, Card shell, Link, Container, Section heading.

Rules:

- **Knows nothing about Daud.** No imports from `@/content`. If a component
  mentions a project, a job, or an email address, it does not live here.
- Takes `className` and merges it with `cn()` from `@/lib/utils`.
- Server Components unless interaction forces otherwise.

Reusability is a consequence of this ignorance, not of good intentions.

## `layout/` — page chrome

Nav, Footer, page-transition wrapper, skip link. Rendered once by a layout,
not per section. These *may* read `@/content` (the nav needs the route list).

## `motion/` — animation primitives

Thin client wrappers over Framer Motion — `FadeIn`, `Reveal`, `Stagger` — built
on the variants in `@/lib/motion`.

Their job is to be the only files in the codebase that carry `"use client"` for
animation's sake. A section imports `<Reveal>` and stays a Server Component;
without this layer, one `motion.div` turns an entire page subtree into client
JS. They also centralise the `prefers-reduced-motion` check, so no section
re-implements it and forgets.

## `sections/` — composed page blocks

Hero, FeaturedProjects, Certifications, ExperienceTimeline, SkillsGrid.

These are the components allowed to know both the content layer and the UI
layer, and their job is to wire one to the other. Not reusable, and not meant
to be — a section is used exactly once.

---

## Import direction

```
sections ──▶ ui, motion, content, hooks, lib
layout   ──▶ ui, motion, content, hooks, lib
ui       ──▶ lib                          (never content, never sections)
motion   ──▶ lib
content  ──▶ types                        (never components)
```

Arrows point one way. A `ui/` component importing from `sections/` is the first
symptom of the architecture collapsing back into a template.
