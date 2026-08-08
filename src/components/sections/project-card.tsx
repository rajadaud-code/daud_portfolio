"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import {
  ButtonLink,
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardMedia,
  CardTitle,
  GithubIcon,
  Tag,
  TagList,
} from "@/components/ui";
import { getProjectHref } from "@/content";
import { cn } from "@/lib/utils";
import type { OptionalImageAsset, Project, ProjectMediaVideo } from "@/types";

/**
 * "01", "02" — the mono index shown on every card and slot.
 */
function formatIndex(index: number): string {
  return String(index).padStart(2, "0");
}

function isExternalHref(href: string): boolean {
  return !href.startsWith("/");
}

export interface ProjectCardProps {
  project: Project;
  index: number;
  layout?: "lead" | "standard";
  priority?: boolean;
}

export function ProjectCard({
  project,
  index,
  layout = "standard",
  priority = false,
}: ProjectCardProps) {
  const href = getProjectHref(project);
  const isLead = layout === "lead";

  return (
    <Card
      interactive={Boolean(href)}
      className={cn(
        "group/card h-full overflow-hidden",
        isLead
          ? "grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"
          : "flex flex-col",
      )}
    >
      <ProjectThumbnail
        project={project}
        index={index}
        priority={priority}
        className={cn(isLead && "lg:aspect-auto lg:h-full")}
        sizes={
          isLead
            ? "(min-width: 1024px) 55vw, 100vw"
            : "(min-width: 768px) 45vw, 100vw"
        }
      />

      <CardBody className={cn("gap-4", isLead && "justify-center gap-5 p-7 md:p-9")}>
        <div className="flex items-center justify-between">
          <span className="font-mono text-label uppercase text-ink-subtle">
            {formatIndex(index)}
          </span>
          {!project.links.github && !project.links.live ? (
            <span className="font-mono text-[10px] uppercase text-accent font-semibold bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
              Private Enterprise Project
            </span>
          ) : null}
        </div>

        <CardTitle className={cn(isLead && "text-h2")}>
          {href ? (
            <Link
              href={href}
              target={isExternalHref(href) ? "_blank" : undefined}
              rel={isExternalHref(href) ? "noopener noreferrer" : undefined}
              className="inline-flex items-start gap-2 after:absolute after:inset-0 after:content-['']"
            >
              {project.title}
              <ArrowUpRight
                aria-hidden="true"
                className="size-5 text-ink-subtle transition-transform duration-[var(--duration-fast)] ease-editorial group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 group-hover/card:text-accent"
              />
            </Link>
          ) : (
            project.title
          )}
        </CardTitle>

        <CardDescription className={cn(isLead && "text-base")}>
          {project.description}
        </CardDescription>

        <TagList className="mt-auto pt-2">
          {project.tech.map((t) => (
            <li key={t}>
              <Tag size={isLead ? "base" : "sm"}>{t}</Tag>
            </li>
          ))}
        </TagList>
      </CardBody>

      <CardFooter
        className={cn(
          "relative z-10 border-t border-line px-5 py-4",
          isLead && "px-7 py-5 md:px-9",
        )}
      >
        {project.links.github ? (
          <ButtonLink
            href={project.links.github}
            target="_blank"
            variant="ghost"
            size="sm"
            leadingIcon={<GithubIcon aria-hidden="true" />}
          >
            GitHub
          </ButtonLink>
        ) : null}

        {project.links.live ? (
          <ButtonLink
            href={project.links.live}
            target="_blank"
            variant="secondary"
            size="sm"
            trailingIcon={<ExternalLink aria-hidden="true" />}
          >
            Live Platform
          </ButtonLink>
        ) : null}

        {!project.links.github && !project.links.live ? (
          <span className="font-mono text-xs text-ink-subtle italic">
            In Active Private Development
          </span>
        ) : null}
      </CardFooter>
    </Card>
  );
}

function ProjectThumbnail({
  project,
  index,
  priority,
  className,
  sizes,
}: {
  project: Project;
  index: number;
  priority: boolean;
  className?: string;
  sizes: string;
}) {
  const frame = cn("rounded-none aspect-16/10", className);

  if (project.video) {
    return <ProjectCardVideo video={project.video} frameClass={frame} />;
  }

  const hasSlideshow = Boolean(project.images && project.images.length > 1);

  if (hasSlideshow) {
    return (
      <ProjectCardSlideshow
        images={project.images!}
        frameClass={frame}
        sizes={sizes}
        priority={priority}
      />
    );
  }

  if (!project.thumbnail) {
    return (
      <CardMedia
        ratio={null}
        className={cn(
          frame,
          "flex flex-col items-center justify-center gap-4 bg-surface",
        )}
      >
        <span
          aria-hidden="true"
          className="font-mono text-[3.5rem] leading-none font-medium text-line-strong select-none"
        >
          {formatIndex(index)}
        </span>
        <span className="font-mono text-label uppercase text-ink-subtle">
          Screenshot coming soon
        </span>
      </CardMedia>
    );
  }

  return (
    <CardMedia ratio={null} className={frame}>
      <Image
        src={project.thumbnail.src}
        alt={project.thumbnail.alt}
        width={project.thumbnail.width}
        height={project.thumbnail.height}
        priority={priority}
        sizes={sizes}
        className={cn(
          "h-full w-full object-cover",
          "transition-transform duration-[var(--duration-slow)] ease-editorial",
          "group-hover/card:scale-[1.04]",
        )}
      />
    </CardMedia>
  );
}

function ProjectCardVideo({
  video,
  frameClass,
}: {
  video: ProjectMediaVideo;
  frameClass: string;
}) {
  return (
    <CardMedia ratio={null} className={cn(frameClass, "relative overflow-hidden bg-black")}>
      <video
        src={video.src}
        poster={video.poster}
        autoPlay
        loop
        muted
        playsInline
        aria-label={video.alt || "Project Video Demo"}
        className="h-full w-full object-cover transition-transform duration-[var(--duration-slow)] ease-editorial group-hover/card:scale-[1.04]"
      />
      <span className="absolute top-3 right-3 z-20 flex items-center gap-1.5 rounded-md bg-black/75 px-2.5 py-1 font-mono text-[10px] uppercase text-white backdrop-blur-md border border-white/10">
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
        </span>
        AI Inspection Demo
      </span>
    </CardMedia>
  );
}

function ProjectCardSlideshow({
  images,
  frameClass,
  sizes,
  priority,
}: {
  images: OptionalImageAsset[];
  frameClass: string;
  sizes: string;
  priority: boolean;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [images.length, isHovered]);

  const currentImage = images[currentIndex] || images[0];
  if (!currentImage) return null;

  return (
    <CardMedia
      ratio={null}
      className={cn(frameClass, "group/slideshow relative overflow-hidden bg-surface")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full"
        >
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            width={currentImage.width}
            height={currentImage.height}
            priority={priority && currentIndex === 0}
            sizes={sizes}
            className="h-full w-full object-cover transition-transform duration-[var(--duration-slow)] ease-editorial group-hover/card:scale-[1.04]"
          />
        </motion.div>
      </AnimatePresence>

      {/* Pagination Bar Overlay */}
      <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 backdrop-blur-md">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
            aria-label={`Go to slide ${idx + 1}`}
            className={cn(
              "size-1.5 rounded-full transition-all duration-300",
              idx === currentIndex
                ? "w-4 bg-amber-400"
                : "bg-white/40 hover:bg-white/80",
            )}
          />
        ))}
      </div>

      {/* Slide Badge */}
      <span className="absolute top-3 right-3 z-20 rounded bg-black/60 px-2 py-0.5 font-mono text-[10px] uppercase text-white backdrop-blur-md">
        {currentIndex + 1} / {images.length}
      </span>
    </CardMedia>
  );
}

export function ProjectCardPlaceholder({
  index,
  layout = "standard",
}: {
  index: number;
  layout?: "lead" | "standard";
}) {
  const isLead = layout === "lead";

  return (
    <Card
      className={cn(
        "h-full overflow-hidden border-dashed opacity-60",
        isLead
          ? "grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"
          : "flex flex-col",
      )}
    >
      <CardMedia
        ratio={null}
        className={cn(
          "rounded-none aspect-16/10 flex flex-col items-center justify-center gap-4 bg-surface",
          isLead && "lg:aspect-auto lg:h-full",
        )}
      >
        <span
          aria-hidden="true"
          className="font-mono text-[3.5rem] leading-none font-medium text-line-strong select-none"
        >
          {formatIndex(index)}
        </span>
        <span className="font-mono text-label uppercase text-ink-subtle">
          Reserved Slot #{index}
        </span>
      </CardMedia>

      <CardBody className={cn("gap-4", isLead && "justify-center gap-5 p-7 md:p-9")}>
        <span className="font-mono text-label uppercase text-ink-subtle">
          {formatIndex(index)}
        </span>
        <CardTitle className={cn("text-ink-muted", isLead && "text-h2")}>
          Project Slot Reserved
        </CardTitle>
        <CardDescription>
          Reserved for future production deployment and architecture case study.
        </CardDescription>
      </CardBody>
    </Card>
  );
}
