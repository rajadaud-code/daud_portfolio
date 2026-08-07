# Design System

Tokens live in [`src/app/globals.css`](../../app/globals.css). Motion lives in
[`src/lib/motion.ts`](../../lib/motion.ts). This file is the policy that the
code cannot state on its own.

The reference points are Apple, Anthropic, OpenAI, Linear and Vercel. What those
share is **restraint**: hairline borders, near-invisible shadows, tight
tracking, fast quiet motion, and one accent spent carefully. None of them is
"minimal" by accident — each is minimal because every element had to justify
itself. That is the bar these primitives are set to.

---

## Typography

| Token         | Size                          | Use                          |
| ------------- | ----------------------------- | ---------------------------- |
| `text-display`| clamp(3.25rem, 13vw, 11rem)   | Hero. **Once per page, max.** |
| `text-h1`     | clamp(2.5rem, 7vw, 5rem)      | Page titles                  |
| `text-h2`     | clamp(2rem, 4.5vw, 3.5rem)    | Section headings             |
| `text-h3`     | clamp(1.375rem, 2.5vw, 2rem)  | Card titles                  |
| `text-lead`   | clamp(1.125rem, 1.6vw, 1.375rem) | Sub-headlines, intros     |
| `text-label`  | 0.75rem, 0.12em tracking      | Eyebrows, chips, dates — **`font-mono`** |
| Tailwind defaults | `text-sm` / `text-base`   | Body copy                    |

Rules:

- Every scale step is `clamp()`. **Never** write `text-2xl md:text-4xl` — if a
  size needs a breakpoint, the token is wrong.
- Optical sizing is baked in: the bigger the step, the tighter the tracking
  (`-0.045em` at display, `-0.01em` at lead). Large type set at body tracking
  looks slack; this is most of what makes headlines read as *set*.
- `font-mono` is the metadata voice. Labels, tech chips, dates, section numbers.
  Never prose.
- `text-balance` on headings, `text-pretty` on paragraphs.
- **Heading level is structure, not size.** One `<h1>` per page. Never skip a
  level to get a size — use the token.

## Color

Three layers: raw palette → semantic tokens → Tailwind theme. **Components only
ever use the semantic names.** A hex or a `neutral-*` shade in a `.tsx` is a bug.

| Token | Use |
| ----- | --- |
| `bg-canvas` / `bg-surface` / `bg-surface-raised` | Page, tinted block, raised block |
| `text-ink` / `text-ink-muted` / `text-ink-subtle` | Primary / secondary / tertiary |
| `text-ink-inverse` | On dark fills |
| `border-line` / `border-line-strong` | Hairline / hover |
| `*-accent`, `*-accent-hover`, `*-accent-subtle` | The one blue |

**The accent budget.** The PRD allows one blue. It is spent on: links, focus
rings, and at most one emphasis per section. It is **not** the primary button —
that is `bg-ink`. A palette this narrow only reads as premium while the accent
stays rare; the moment every CTA is blue, it is just another blue site.

## Spacing

- `py-section` — clamp(6rem, 12vw, 11rem). Vertical rhythm between sections.
- `gap-block` — clamp(2.5rem, 6vw, 5rem). Between groups within a section.
- `px-gutter` — clamp(1.5rem, 5vw, 4rem). Horizontal page inset. **Only inside
  `<Container>`.**
- Tailwind's numeric scale (`p-4`, `gap-2`) handles component internals.

The split matters: named tokens for page structure, numbers for detail. It keeps
macro rhythm consistent without banning `p-4`.

## Containers

| Width | Value | Use |
| ----- | ----- | --- |
| `page` | 90rem / 1440px | Default. Hero, grids, nav, footer. |
| `prose` | 44rem / 704px | Long-form text only (~70ch measure). |
| `full` | none | Full-bleed rows that still want a gutter. |

Never nest Containers — it double-pads.

## Elevation

| Token | Use |
| ----- | --- |
| `shadow-hairline` | Resting interactive surfaces |
| `shadow-card` | Primary button hover |
| `shadow-lifted` | Card hover (via `hover-lift`) |
| `shadow-overlay` | Modals, command palette |

These are far softer than Tailwind's defaults, on purpose. On white, the
**border** separates and the shadow only implies height. If a shadow is
noticeable as a shadow, it is too strong.

## Radius

`rounded-control` (0.625rem) · `rounded-card` (1rem) · `rounded-panel` (1.5rem)
· `rounded-pill`

Named for what they wrap. Nested radii must be inset by the border width —
`rounded-[calc(var(--radius-card)-1px)]`, as `CardMedia` does — or the corner
shows a visible sliver of parent between the two arcs.

## Motion

Timings: `src/lib/motion.ts` (Framer) and `--duration-*` / `--ease-*` (CSS).
**Mirrored by hand — change one, change the other.**

- `--duration-fast` (200ms) — hover, color, press
- `--duration-base` (400ms) — hover-lift, layout
- `--duration-slow` (700ms) — scroll reveals
- `ease-editorial` — the default curve

Rules:

- Animate **transform and opacity only.** Both are compositor properties. Animating
  `width`, `top`, or `box-shadow`'s geometry forces layout on every frame.
- Reveals fire **once** (`VIEWPORT.once`). Re-animating on every scroll-past is a
  novelty that becomes an irritant by the third pass.
- Reduced motion is handled in `globals.css` and in the `motion/` primitives.
  **Never re-check it in a section.** Content must still appear — reduced motion
  removes the animation, never the content.

## Hover rules

1. **Hover is enhancement, never information.** Anything only discoverable by
   hovering does not exist on touch.
2. Always `@media (hover: hover)` for transforms. Otherwise `:hover` sticks
   after a tap and the card stays lifted until you tap elsewhere. `hover-lift`
   does this for you — use it rather than rolling a new lift.
3. Hover moves *surfaces*, press moves *controls*. Cards lift on hover; buttons
   scale down on `:active`. A button that moves on hover shifts the target out
   from under the cursor.
4. Never animate an element's own size on hover — it reflows its neighbours.
   Translate instead.
5. Every hover state needs a focus equivalent. Keyboard users get the same
   information or the state is decorative.

## Breakpoints

**Tailwind v4 defaults, unchanged**: `sm` 40rem · `md` 48rem · `lg` 64rem ·
`xl` 80rem · `2xl` 96rem.

This is a deliberate non-decision. Custom breakpoints are worth their cost only
when content demands a break the defaults miss — and because the type scale and
spacing are `clamp()`-based, they respond continuously and simply do not need
breakpoints. The remaining uses are layout shape (a grid going 1 → 2 → 3
columns), which the defaults cover exactly. Inventing `tablet` and `desktop`
aliases here would add a dialect for every future maintainer to learn, in
exchange for nothing.

Mobile-first: unprefixed = smallest. `2xl` (1536px) exceeds the 1440px page
container, so it should almost never appear.

## Focus

One global `:focus-visible` ring (`globals.css`). Do not restyle it per
component and **never** set `outline: none` without an equally visible
replacement.

`:focus-visible`, not `:focus` — the ring shows for keyboard users and stays off
mouse clicks, which is what lets it be prominent without designers objecting.

## Loading

`<Skeleton>` traces the shape of what it replaces; a grey box of the wrong size
promises a layout and then shifts it. Wrap sets in `<SkeletonGroup label="…">`
so AT gets **one** announcement for the region, not one per placeholder.

Buttons use `isLoading` (spinner + `aria-busy`), not a separate component.

## Glass

`.glass` exists for **the sticky nav and nothing else.**

Glass earns its keep only where content passes beneath it. On white over white,
a blurred panel is visually identical to an opaque one — it costs a compositor
layer and buys nothing. `backdrop-filter` also re-filters on every scroll frame.
One per page is the budget.

If a future surface genuinely has content scrolling under it, reuse `.glass`.
Otherwise: hairline border.

---

## Adding a component

1. Does a primitive already do it? Extend via `className` first.
2. Does it know about Daud? → `sections/`, not `ui/`.
3. Does it need state or an event handler? → keep `"use client"` at the leaf.
4. Variants → `cva`, never conditional string concatenation.
5. Accept and merge `className` with `cn()`. Always last, so callers can win.
