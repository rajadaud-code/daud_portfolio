import {
  ArrowUpRight,
  Award,
  Bot,
  Brain,
  CheckCircle2,
  Cpu,
  Download,
  GraduationCap,
  Layers,
  Mail,
  ShieldCheck,
  Terminal,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { MaskRevealText, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { CertificationCard } from "@/components/sections/certifications";
import { ContactCta } from "@/components/sections/contact-cta";
import { TimelineRail } from "@/components/sections/timeline-rail";
import {
  Button,
  ButtonLink,
  Card,
  Container,
  CopyEmailButton,
  GithubIcon,
  PageHeader,
  Section,
  SectionHeader,
  Tag,
  TagList,
} from "@/components/ui";
import {
  formatYearMonth,
  getCertifications,
  getExperience,
  getSkills,
  site,
} from "@/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About — Engineering Story & Philosophy",
  description:
    "Learn about Muhammad Daud Israr — AI Engineer specializing in LLM agents, RAG architectures, FastAPI, Node.js, and production-ready backend engineering.",
  path: "/about",
});

export default function AboutPage() {
  const skills = getSkills();
  const experience = getExperience();
  const certifications = getCertifications();

  return (
    <>
      <PageHeader
        eyebrow="Engineering Story"
        title="Software that doesn't just run — it thinks."
        description="I am an AI Engineer & Backend Developer focused on building production-ready intelligent applications, RAG systems, LLM agents, and high-performance microservices."
      />

      {/* Hero Biography & Portrait Section */}
      <Section spacing="tight">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            {/* Left Narrative Column */}
            <div className="flex flex-col gap-6">
              <Reveal>
                <div className="rounded-card border border-line bg-surface p-8">
                  <span className="font-mono text-label uppercase text-accent">
                    Current Position
                  </span>
                  <h2 className="mt-2 text-h3 text-ink">{site.current}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    Designing and deploying LLM applications, REST APIs, and backend automation pipelines in production.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="space-y-4 text-lead text-ink-muted leading-relaxed">
                  {site.bio.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                  <p>
                    My work bridges the gap between raw machine learning models and bulletproof backend engineering. Whether crafting asynchronous Python services in FastAPI or orchestrating stateful AI agent graphs with LangGraph and n8n, I build for operational reliability, latency optimization, and clean code.
                  </p>
                </div>
              </Reveal>

              {/* Quick Stat Highlights */}
              <Reveal delay={0.2}>
                <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-3">
                  <div className="rounded-control border border-line p-4">
                    <span className="font-mono text-2xl font-bold text-ink">
                      BS CS
                    </span>
                    <p className="mt-1 font-mono text-xs text-ink-subtle">
                      Computer Science
                    </p>
                  </div>
                  <div className="rounded-control border border-line p-4">
                    <span className="font-mono text-2xl font-bold text-ink">
                      4+
                    </span>
                    <p className="mt-1 font-mono text-xs text-ink-subtle">
                      Industry Roles
                    </p>
                  </div>
                  <div className="rounded-control border border-line p-4 col-span-2 sm:col-span-1">
                    <span className="font-mono text-2xl font-bold text-ink">
                      100%
                    </span>
                    <p className="mt-1 font-mono text-xs text-ink-subtle">
                      Production Focus
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Portrait & Quick Card Column */}
            <div className="flex flex-col gap-6">
              {site.photo ? (
                <Reveal delay={0.2}>
                  <div className="relative overflow-hidden rounded-panel border border-line bg-surface shadow-card">
                    <Image
                      src={site.photo.src}
                      alt={site.photo.alt}
                      width={site.photo.width}
                      height={site.photo.height}
                      priority
                      sizes="(min-width: 1024px) 35vw, 100vw"
                      className="h-auto w-full object-cover"
                    />
                  </div>
                </Reveal>
              ) : null}

              <Reveal delay={0.3}>
                <Card className="p-6">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="size-5 text-accent" />
                    <div>
                      <h3 className="text-sm font-semibold text-ink">
                        {site.education.degree}
                      </h3>
                      <p className="text-xs text-ink-muted">
                        {site.education.institution}
                      </p>
                    </div>
                  </div>
                </Card>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Engineering Philosophy Section */}
      <Section spacing="tight">
        <Container>
          <Reveal>
            <SectionHeader
              sectionId="philosophy"
              eyebrow="Principles"
              title="Engineering Philosophy"
            />
          </Reveal>

          <Stagger
            as="ul"
            role="list"
            className="mt-stack grid list-none gap-6 p-0 md:grid-cols-3"
          >
            <StaggerItem as="li">
              <Card className="h-full p-8">
                <Brain className="size-6 text-accent" />
                <h3 className="mt-4 text-h3 text-ink">Intelligent Systems</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  Integrating LLMs not as superficial wrappers, but as deeply integrated, deterministic cognitive components backed by strict validation.
                </p>
              </Card>
            </StaggerItem>

            <StaggerItem as="li">
              <Card className="h-full p-8">
                <Cpu className="size-6 text-accent" />
                <h3 className="mt-4 text-h3 text-ink">Robust Backends</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  Prioritizing async I/O, clean repository patterns, relational integrity, and containerization so systems scale under real traffic.
                </p>
              </Card>
            </StaggerItem>

            <StaggerItem as="li">
              <Card className="h-full p-8">
                <ShieldCheck className="size-6 text-accent" />
                <h3 className="mt-4 text-h3 text-ink">Engineering Craft</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  Writing clean, self-documenting code with comprehensive static typing, unit testing, and zero-compromise security defaults.
                </p>
              </Card>
            </StaggerItem>
          </Stagger>
        </Container>
      </Section>

      {/* Technical Ecosystem & Skills Matrix Section */}
      <Section spacing="tight">
        <Container>
          <Reveal>
            <SectionHeader
              sectionId="skills"
              eyebrow="Capabilities"
              title="Technical Ecosystem"
            />
          </Reveal>

          <div className="mt-stack grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((category, index) => (
              <Reveal key={category.id} delay={index * 0.1}>
                <Card className="h-full p-7">
                  <div className="flex items-center justify-between border-b border-line pb-4">
                    <h3 className="font-mono text-label uppercase text-ink font-semibold">
                      {category.label}
                    </h3>
                    <span className="font-mono text-xs text-ink-subtle">
                      0{index + 1}
                    </span>
                  </div>

                  <TagList className="mt-5">
                    {category.items.map((item) => (
                      <li key={item}>
                        <Tag size="base">{item}</Tag>
                      </li>
                    ))}
                  </TagList>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Experience & Timeline Section */}
      <Section spacing="tight">
        <Container>
          <Reveal>
            <SectionHeader
              sectionId="career"
              eyebrow="History"
              title="Career & Internships"
            />
          </Reveal>

          <div className="relative mt-stack max-w-3xl">
            <TimelineRail className="left-[6.5px] top-1 -bottom-2 w-px" />

            <ol role="list" className="flex list-none flex-col gap-12 p-0">
              {experience.map((entry) => {
                const isCurrent = entry.end === null;

                return (
                  <Reveal as="li" key={entry.slug} className="relative pl-10 md:pl-14">
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 top-0.5 size-3.5 rounded-full border-2 ${isCurrent
                          ? "border-accent bg-accent ring-4 ring-accent-subtle"
                          : "border-line-strong bg-canvas"
                        }`}
                    />

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
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

                    <h3 className="mt-2 text-h3 text-ink">{entry.role}</h3>
                    <p className="mt-1 text-ink-muted">{entry.company}</p>

                    <TagList className="mt-4">
                      {entry.focus.map((item) => (
                        <li key={item}>
                          <Tag size="sm">{item}</Tag>
                        </li>
                      ))}
                    </TagList>
                  </Reveal>
                );
              })}
            </ol>
          </div>
        </Container>
      </Section>

      {/* Certifications Highlight */}
      <Section spacing="tight">
        <Container>
          <Reveal>
            <SectionHeader
              sectionId="credentials"
              eyebrow="Verification"
              title="Certifications & Credentials"
            />
          </Reveal>

          <div className="mt-stack grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((cert) => (
              <Reveal key={cert.slug}>
                <CertificationCard certification={cert} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Collaboration and Contact Call to Action */}
      <ContactCta />
    </>
  );
}
