import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  ExternalLink,
  Layers,
  Sparkles,
  Target,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { ArchitectureDiagram } from "@/components/sections/architecture-diagram";
import {
  ButtonLink,
  Card,
  Container,
  GithubIcon,
  Section,
  Tag,
  TagList,
} from "@/components/ui";
import { getAllProjects, getProjectBySlug } from "@/content";
import { buildMetadata } from "@/lib/seo";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return buildMetadata({
      title: "Project Not Found",
      path: "/projects",
    });
  }

  return buildMetadata({
    title: `${project.title} — Case Study`,
    description: project.description,
    path: `/projects/${project.slug}`,
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { caseStudy } = project;
  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <article className="pt-12 pb-24 md:pt-16 lg:pt-20">
      {/* Back Link & Hero Header */}
      <Container>
        <Reveal trigger="mount" delay={0.1}>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-mono text-ink-subtle hover:text-accent transition-colors"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to Projects
          </Link>
        </Reveal>

        <header className="mt-8 max-w-4xl">
          <Reveal trigger="mount" delay={0.2}>
            <div className="flex items-center gap-3">
              <span className="font-mono text-label uppercase text-accent">
                {project.category}
              </span>
              <span className="text-line-strong">•</span>
              <span className="font-mono text-label uppercase text-ink-subtle">
                Engineering Case Study
              </span>
            </div>
          </Reveal>

          <Reveal trigger="mount" delay={0.3}>
            <h1 className="mt-4 text-h1 text-ink">{project.title}</h1>
          </Reveal>

          <Reveal trigger="mount" delay={0.4}>
            <p className="mt-6 text-lead text-ink-muted text-pretty">
              {project.description}
            </p>
          </Reveal>

          {/* Action Links & Tech Chips */}
          <Reveal trigger="mount" delay={0.5}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {project.links.github ? (
                <ButtonLink
                  href={project.links.github}
                  target="_blank"
                  variant="secondary"
                  leadingIcon={<GithubIcon />}
                >
                  {project.links.backendGithub ? "Frontend Repository" : "View Repository"}
                </ButtonLink>
              ) : null}

              {project.links.backendGithub ? (
                <ButtonLink
                  href={project.links.backendGithub}
                  target="_blank"
                  variant="secondary"
                  leadingIcon={<GithubIcon />}
                >
                  Backend Repository
                </ButtonLink>
              ) : null}

              {project.links.live ? (
                <ButtonLink
                  href={project.links.live}
                  target="_blank"
                  variant="primary"
                  leadingIcon={<ExternalLink className="size-4" />}
                >
                  Live Application
                </ButtonLink>
              ) : null}
            </div>
          </Reveal>

          <Reveal trigger="mount" delay={0.6}>
            <div className="mt-8 border-t border-line pt-6">
              <span className="font-mono text-xs uppercase text-ink-subtle block mb-3">
                Technologies Used
              </span>
              <TagList>
                {project.tech.map((t) => (
                  <li key={t}>
                    <Tag size="base">{t}</Tag>
                  </li>
                ))}
              </TagList>
            </div>
          </Reveal>

          {/* Benchmark Metrics Bar */}
          {caseStudy?.metrics ? (
            <Reveal trigger="mount" delay={0.7}>
              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-line pt-6 sm:grid-cols-3">
                {caseStudy.metrics.map((m, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="font-mono text-xs uppercase text-accent font-medium">
                      {m.label}
                    </span>
                    <span className="mt-1 text-2xl font-bold tracking-tight text-ink md:text-3xl">
                      {m.value}
                    </span>
                    {m.hint ? (
                      <span className="mt-0.5 text-xs text-ink-subtle">
                        {m.hint}
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            </Reveal>
          ) : null}
        </header>

        {/* Video / Thumbnail Preview */}
        {project.video ? (
          <Reveal trigger="mount" delay={0.8} className="mt-12">
            <div className="overflow-hidden rounded-panel border border-line bg-black shadow-lifted">
              <video
                src={project.video.src}
                poster={project.video.poster}
                controls
                autoPlay
                loop
                muted
                playsInline
                className="w-full max-h-[600px] object-contain mx-auto"
              />
            </div>
          </Reveal>
        ) : project.thumbnail ? (
          <Reveal trigger="mount" delay={0.8} className="mt-12">
            <div className="overflow-hidden rounded-panel border border-line bg-surface shadow-lifted">
              <Image
                src={project.thumbnail.src}
                alt={project.thumbnail.alt}
                width={project.thumbnail.width}
                height={project.thumbnail.height}
                priority
                className="w-full object-cover"
              />
            </div>
          </Reveal>
        ) : null}
      </Container>

      {/* Case Study Content Sections */}
      {caseStudy ? (
        <div className="mt-8">
          {/* Section 1: Problem & Approach */}
          <Section spacing="tight">
            <Container>
              <div className="grid gap-10 md:grid-cols-2">
                <Reveal>
                  <Card variant="plain" className="h-full border border-line p-8">
                    <div className="flex items-center gap-3">
                      <Target className="size-5 text-accent" />
                      <h2 className="text-h3 text-ink">The Problem</h2>
                    </div>
                    <p className="mt-4 text-base leading-relaxed text-ink-muted">
                      {caseStudy.problem}
                    </p>
                  </Card>
                </Reveal>

                <Reveal delay={0.1}>
                  <Card variant="plain" className="h-full border border-line p-8">
                    <div className="flex items-center gap-3">
                      <Wrench className="size-5 text-accent" />
                      <h2 className="text-h3 text-ink">Engineering Approach</h2>
                    </div>
                    <p className="mt-4 text-base leading-relaxed text-ink-muted">
                      {caseStudy.approach}
                    </p>
                  </Card>
                </Reveal>
              </div>
            </Container>
          </Section>

          {/* Section 2: Architecture Diagram & Flow */}
          <Section spacing="tight">
            <Container>
              <Reveal>
                <div className="mb-6 flex items-center gap-3">
                  <Layers className="size-5 text-accent" />
                  <h2 className="text-h2 text-ink">System Architecture</h2>
                </div>
                <p className="max-w-prose-editorial text-ink-muted mb-8">
                  {caseStudy.architecture}
                </p>

                {caseStudy.architectureNodes ? (
                  <ArchitectureDiagram nodes={caseStudy.architectureNodes} />
                ) : null}

                {/* Secondary Architecture State Machine Image */}
                {project.images && project.images[1] ? (
                  <div className="mt-10 overflow-hidden rounded-panel border border-line bg-surface p-4 shadow-lifted">
                    <span className="font-mono text-xs uppercase text-ink-subtle block mb-3 px-2">
                      State Machine Execution Flow
                    </span>
                    <Image
                      src={project.images[1].src}
                      alt={project.images[1].alt}
                      width={project.images[1].width}
                      height={project.images[1].height}
                      className="w-full rounded-lg object-contain bg-black/90"
                    />
                  </div>
                ) : null}

                {/* Local Backend Run Callout */}
                {project.links.backendGithub ? (
                  <div className="mt-8 rounded-card border border-accent/20 bg-accent/5 p-6">
                    <span className="font-mono text-xs font-semibold uppercase text-accent">
                      ⚡ Backend Architecture & Local Evaluation Note
                    </span>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      The frontend interface is live and deployed on Vercel. Due to multi-database cloud clusters (Qdrant vector store, Neo4j knowledge graph, Redis semantic cache, and background Celery workers), you can clone the backend repository to run and evaluate the complete pipeline locally following the{" "}
                      <a
                        href={project.links.backendGithub}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-accent underline underline-offset-4"
                      >
                        Backend Repository Guidelines
                      </a>.
                    </p>
                  </div>
                ) : null}
              </Reveal>
            </Container>
          </Section>

          {/* Section 3: Implementation Highlights */}
          {caseStudy.implementation && caseStudy.implementation.length > 0 ? (
            <Section spacing="tight">
              <Container>
                <Reveal>
                  <div className="mb-6 flex items-center gap-3">
                    <Code2 className="size-5 text-accent" />
                    <h2 className="text-h2 text-ink">Implementation Details</h2>
                  </div>
                </Reveal>

                <Stagger
                  as="ul"
                  role="list"
                  className="grid list-none gap-4 p-0 md:grid-cols-3"
                >
                  {caseStudy.implementation.map((item, index) => (
                    <StaggerItem as="li" key={index}>
                      <Card className="h-full p-6">
                        <span className="font-mono text-label text-accent">
                          0{index + 1}
                        </span>
                        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                          {item}
                        </p>
                      </Card>
                    </StaggerItem>
                  ))}
                </Stagger>
              </Container>
            </Section>
          ) : null}

          {/* Section 4: Engineering Challenges & Solutions */}
          {caseStudy.challenges && caseStudy.challenges.length > 0 ? (
            <Section spacing="tight">
              <Container>
                <Reveal>
                  <div className="mb-8">
                    <span className="font-mono text-label uppercase text-ink-subtle">
                      Deep Dive
                    </span>
                    <h2 className="mt-2 text-h2 text-ink">
                      Key Engineering Challenges & Solutions
                    </h2>
                  </div>
                </Reveal>

                <div className="space-y-6">
                  {caseStudy.challenges.map((c, i) => (
                    <Reveal key={i} delay={i * 0.1}>
                      <Card className="p-8">
                        <div className="grid gap-6 md:grid-cols-2">
                          <div>
                            <span className="font-mono text-xs uppercase text-amber-600 font-medium">
                              Challenge #{i + 1}
                            </span>
                            <p className="mt-2 text-base font-medium text-ink">
                              {c.challenge}
                            </p>
                          </div>
                          <div className="border-t border-line pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                            <span className="font-mono text-xs uppercase text-emerald-600 font-medium">
                              Solution & Engineering Action
                            </span>
                            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                              {c.solution}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </Reveal>
                  ))}
                </div>
              </Container>
            </Section>
          ) : null}

          {/* Section 5: Outcomes & Future Roadmap */}
          <Section spacing="tight">
            <Container>
              <div className="grid gap-8 md:grid-cols-2">
                <Reveal>
                  <Card variant="plain" className="h-full border border-line p-8 bg-surface">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="size-5 text-emerald-600" />
                      <h3 className="text-h3 text-ink">Outcome & Metrics</h3>
                    </div>
                    <p className="mt-4 text-base leading-relaxed text-ink-muted">
                      {caseStudy.outcome}
                    </p>

                    {caseStudy.highlights ? (
                      <ul className="mt-6 space-y-2 border-t border-line pt-4 text-xs font-mono text-ink-subtle">
                        {caseStudy.highlights.map((h, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="size-1.5 rounded-full bg-accent" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </Card>
                </Reveal>

                {caseStudy.futureImprovements ? (
                  <Reveal delay={0.1}>
                    <Card variant="plain" className="h-full border border-line p-8">
                      <div className="flex items-center gap-3">
                        <Sparkles className="size-5 text-accent" />
                        <h3 className="text-h3 text-ink">Future Roadmap</h3>
                      </div>
                      <ul className="mt-4 space-y-3">
                        {caseStudy.futureImprovements.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-ink-muted">
                            <span className="font-mono text-xs text-accent mt-0.5">
                              +{idx + 1}
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </Reveal>
                ) : null}
              </div>
            </Container>
          </Section>
        </div>
      ) : null}

      {/* Next Project Footer */}
      {nextProject ? (
        <Container className="mt-24 border-t border-line pt-12">
          <Reveal>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div>
                <span className="font-mono text-label uppercase text-ink-subtle">
                  Next Case Study
                </span>
                <p className="mt-1 text-h3 text-ink">{nextProject.title}</p>
              </div>
              <ButtonLink
                href={`/projects/${nextProject.slug}`}
                variant="secondary"
                trailingIcon={<ArrowUpRight className="size-4" />}
              >
                Read Next Case Study
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      ) : null}
    </article>
  );
}
