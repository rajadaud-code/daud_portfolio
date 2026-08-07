import type { ReactNode } from "react";
import { MaskRevealText, Reveal } from "@/components/motion";
import { Container } from "./container";

export interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}

/**
 * PageHeader — consistent editorial subpage header.
 *
 * Used by /projects, /about, /contact, and case studies.
 * Built with the design system's display scale, Geist Mono eyebrows,
 * and Framer Motion reveal timelines.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    <header className="pt-12 pb-8 md:pt-20 md:pb-12 lg:pt-24 lg:pb-16">
      <Container>
        <div className="flex max-w-4xl flex-col">
          <Reveal trigger="mount" delay={0.1} distance={8}>
            <p className="font-mono text-label uppercase text-ink-subtle">
              {eyebrow}
            </p>
          </Reveal>

          <h1 className="mt-4 text-h1 text-ink md:mt-6">
            <MaskRevealText text={title} delay={0.2} stagger={0.06} />
          </h1>

          {description ? (
            <Reveal trigger="mount" delay={0.4}>
              <p className="mt-6 max-w-prose-editorial text-lead text-ink-muted text-pretty">
                {description}
              </p>
            </Reveal>
          ) : null}

          {actions ? (
            <Reveal trigger="mount" delay={0.5}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {actions}
              </div>
            </Reveal>
          ) : null}
        </div>
      </Container>
    </header>
  );
}
