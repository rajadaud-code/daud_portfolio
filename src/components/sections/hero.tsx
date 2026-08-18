import { ArrowRight, Download, Mail } from "lucide-react";
import Image from "next/image";

import { MaskRevealText, Reveal } from "@/components/motion";
import { Button, ButtonLink, Container, GithubIcon, LinkedinIcon } from "@/components/ui";
import { site } from "@/content";
import { cn } from "@/lib/utils";

const TIMELINE = {
  eyebrow: 0.1,
  headline: 0.22,
  headlineStagger: 0.18,
  subheading: 0.8,
  actions: 0.95,
  photo: 0.4,
} as const;

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
            hasPhoto && "lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]",
          )}
        >
          <div className="flex flex-col">
            <Reveal trigger="mount" delay={TIMELINE.eyebrow} distance={8}>
              <p className="font-mono text-label uppercase text-ink-subtle">
                {site.name}
              </p>
            </Reveal>

            <h1
              id="hero-heading"
              className="mt-6 text-display text-ink md:mt-8"
            >
              <MaskRevealText
                text={site.headline}
                delay={TIMELINE.headline}
                stagger={TIMELINE.headlineStagger}
              />
            </h1>

            <Reveal trigger="mount" delay={TIMELINE.subheading}>
              <p className="mt-8 max-w-prose-editorial text-lead text-ink-muted text-pretty">
                {site.subheading}
              </p>
            </Reveal>

            <Reveal trigger="mount" delay={TIMELINE.actions}>
              <div className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4 md:mt-12">
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

                <ButtonLink
                  href={site.links.linkedin}
                  target="_blank"
                  variant="secondary"
                  size="lg"
                  leadingIcon={<LinkedinIcon aria-hidden="true" />}
                >
                  Connect
                </ButtonLink>

                <ButtonLink
                  href={site.links.github}
                  target="_blank"
                  variant="secondary"
                  size="lg"
                  leadingIcon={<GithubIcon aria-hidden="true" />}
                >
                  Follow
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {hasPhoto ? <HeroPhoto /> : null}
        </div>
      </Container>
    </section>
  );
}

function ResumeAction() {
  if (site.resume.href) {
    return (
      <ButtonLink
        href={site.resume.href}
        variant="primary"
        size="lg"
        download={site.resume.filename}
        leadingIcon={<Download aria-hidden="true" />}
      >
        Download Resume
      </ButtonLink>
    );
  }

  return (
    <Button
      variant="primary"
      size="lg"
      aria-disabled="true"
      leadingIcon={<Download aria-hidden="true" />}
      className="cursor-not-allowed opacity-45"
    >
      Download Resume
      <span className="sr-only"> — coming soon</span>
      <span aria-hidden="true" className="font-mono text-label uppercase">
        Soon
      </span>
    </Button>
  );
}

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
