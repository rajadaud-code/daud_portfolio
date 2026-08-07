import { ArrowUpRight, Download, Mail, MapPin } from "lucide-react";

import { Reveal } from "@/components/motion";
import {
  Button,
  ButtonLink,
  Card,
  Container,
  CopyEmailButton,
  GithubIcon,
  LinkedinIcon,
  PageHeader,
  Section,
} from "@/components/ui";
import { site } from "@/content";
import { buildMetadata } from "@/lib/seo";
import { ContactForm } from "./contact-form";

export const metadata = buildMetadata({
  title: "Contact — Get in Touch",
  description:
    "Connect with Muhammad Daud Israr for AI engineering opportunities, LLM agent consulting, backend REST API projects, or technical collaboration.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Initiate Contact"
        title="Let's build something intelligent."
        description="Whether you have an upcoming AI project, require scalable backend architecture, or want to discuss LLM agents and RAG implementations, I'd love to connect."
      />

      <Section spacing="tight" className="pb-24">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
            {/* Contact Information & Channels */}
            <div className="flex flex-col gap-6">
              <Reveal trigger="mount" delay={0.2}>
                <Card className="p-8">
                  <span className="font-mono text-label uppercase text-ink-subtle">
                    Primary Email
                  </span>
                  <div className="mt-3 flex items-center justify-between gap-4">
                    <a
                      href={`mailto:${site.links.email}`}
                      className="text-h3 text-ink hover:text-accent transition-colors break-all"
                    >
                      {site.links.email}
                    </a>
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-4">
                    <CopyEmailButton size="base" />
                    <ButtonLink
                      href={`mailto:${site.links.email}`}
                      variant="ghost"
                      size="base"
                      leadingIcon={<Mail className="size-4" />}
                    >
                      Open Email
                    </ButtonLink>
                  </div>
                </Card>
              </Reveal>

              {/* Social Channels & Location Grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                <Reveal trigger="mount" delay={0.3}>
                  <Card interactive className="group/channel h-full p-6">
                    <LinkedinIcon className="size-5 text-accent" />
                    <h3 className="mt-3 text-sm font-semibold text-ink">LinkedIn</h3>
                    <p className="mt-1 text-xs text-ink-subtle">
                      Professional Network
                    </p>
                    <a
                      href={site.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono text-accent after:absolute after:inset-0"
                    >
                      Connect on LinkedIn
                      <ArrowUpRight className="size-3.5 group-hover/channel:translate-x-0.5 group-hover/channel:-translate-y-0.5 transition-transform" />
                    </a>
                  </Card>
                </Reveal>

                <Reveal trigger="mount" delay={0.4}>
                  <Card interactive className="group/channel h-full p-6">
                    <GithubIcon className="size-5 text-ink" />
                    <h3 className="mt-3 text-sm font-semibold text-ink">GitHub</h3>
                    <p className="mt-1 text-xs text-ink-subtle">
                      Code Repositories
                    </p>
                    <a
                      href={site.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono text-accent after:absolute after:inset-0"
                    >
                      Follow @rajadaud-code
                      <ArrowUpRight className="size-3.5 group-hover/channel:translate-x-0.5 group-hover/channel:-translate-y-0.5 transition-transform" />
                    </a>
                  </Card>
                </Reveal>
              </div>

              {/* Location & Resume Information Card */}
              <Reveal trigger="mount" delay={0.5}>
                <Card variant="plain" className="border border-line bg-surface p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MapPin className="size-5 text-accent" />
                      <div>
                        <h4 className="text-sm font-semibold text-ink">Location</h4>
                        <p className="text-xs text-ink-muted">{site.location}</p>
                      </div>
                    </div>
                    <span className="font-mono text-xs uppercase text-emerald-600 font-medium">
                      Available Worldwide (Remote)
                    </span>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                    <span className="text-xs text-ink-subtle">
                      Download Full Technical Resume
                    </span>
                    {site.resume.href ? (
                      <ButtonLink
                        href={site.resume.href}
                        variant="ghost"
                        size="sm"
                        download={site.resume.filename}
                        leadingIcon={<Download className="size-3.5" />}
                      >
                        Resume PDF
                      </ButtonLink>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-disabled="true"
                        className="cursor-not-allowed opacity-50"
                      >
                        Resume PDF (Soon)
                      </Button>
                    )}
                  </div>
                </Card>
              </Reveal>
            </div>

            {/* Direct Interactive Contact Form */}
            <Reveal trigger="mount" delay={0.3}>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
