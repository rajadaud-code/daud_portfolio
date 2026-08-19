import { Download, Mail } from "lucide-react";

import { Reveal } from "@/components/motion";
import {
  ButtonLink,
  Container,
  CopyEmailButton,
  Section,
} from "@/components/ui";
import { site } from "@/content";

export interface ContactCtaProps {
  title?: string;
  description?: string;
  className?: string;
}

export function ContactCta({
  title = "Let's work together.",
  description = "Interested in AI agents, backend engineering, or technical consultation? Reach out or grab a copy of my resume.",
  className,
}: ContactCtaProps) {
  return (
    <Section spacing="tight" className={className}>
      <Container>
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-8 rounded-card border border-line bg-surface p-8 text-center md:flex-row md:text-left md:p-12">
            <div>
              <h2 className="text-h2 text-ink">{title}</h2>
              <p className="mt-2 text-ink-muted max-w-prose text-pretty">
                {description}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-start">
              <ButtonLink
                href="/contact"
                size="lg"
                leadingIcon={<Mail className="size-4" />}
              >
                Contact Me
              </ButtonLink>

              <CopyEmailButton size="lg" />

              {site.resume.href ? (
                <ButtonLink
                  href={site.resume.href}
                  variant="ghost"
                  size="lg"
                  download={site.resume.filename}
                  leadingIcon={<Download className="size-4" />}
                >
                  Resume
                </ButtonLink>
              ) : null}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
