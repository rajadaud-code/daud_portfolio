"use client";

import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { ProjectCard } from "@/components/sections/project-card";
import { Container, Section, Tag } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { Project, TechTag } from "@/types";

export interface ProjectsExplorerProps {
  projects: Project[];
  allTech: TechTag[];
  allCategories: string[];
}

export function ProjectsExplorer({
  projects,
  allTech,
  allCategories,
}: ProjectsExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTech, setSelectedTech] = useState<TechTag | null>(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Category filter
      if (selectedCategory && project.category !== selectedCategory) {
        return false;
      }

      // Tech stack filter
      if (selectedTech && !project.tech.includes(selectedTech)) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = project.title.toLowerCase().includes(query);
        const matchesDescription = project.description
          .toLowerCase()
          .includes(query);
        const matchesTech = project.tech.some((t) =>
          t.toLowerCase().includes(query),
        );
        const matchesCategory = project.category
          ? project.category.toLowerCase().includes(query)
          : false;

        return (
          matchesTitle || matchesDescription || matchesTech || matchesCategory
        );
      }

      return true;
    });
  }, [projects, selectedCategory, selectedTech, searchQuery]);

  const hasActiveFilters =
    Boolean(searchQuery) || Boolean(selectedCategory) || Boolean(selectedTech);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedTech(null);
  };

  return (
    <Section spacing="tight">
      <Container>
        {/* Filter Controls Bar */}
        <Reveal trigger="mount" delay={0.2}>
          <div className="flex flex-col gap-6 rounded-card border border-line bg-surface p-6">
            {/* Search Input */}
            <div className="relative">
              <Search
                aria-hidden="true"
                className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink-subtle"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by keyword, technology, or title..."
                className="h-11 w-full rounded-control border border-line bg-canvas pl-11 pr-10 text-sm text-ink placeholder:text-ink-subtle focus:border-accent focus:outline-none"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-subtle hover:text-ink"
                >
                  <X className="size-4" />
                </button>
              ) : null}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-label uppercase text-ink-subtle mr-2">
                Category:
              </span>
              <button
                type="button"
                onClick={() => setSelectedCategory(null)}
                className={cn(
                  "rounded-pill px-3 py-1 text-xs font-medium transition-colors",
                  selectedCategory === null
                    ? "bg-ink text-ink-inverse"
                    : "bg-canvas border border-line text-ink-muted hover:text-ink",
                )}
              >
                All Categories
              </button>

              {allCategories.map((category) => (
                <button
                  type="button"
                  key={category}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === category ? null : category,
                    )
                  }
                  className={cn(
                    "rounded-pill px-3 py-1 text-xs font-medium transition-colors",
                    selectedCategory === category
                      ? "bg-ink text-ink-inverse"
                      : "bg-canvas border border-line text-ink-muted hover:text-ink",
                  )}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Tech Stack Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-line">
              <span className="font-mono text-label uppercase text-ink-subtle mr-2">
                Stack:
              </span>
              <button
                type="button"
                onClick={() => setSelectedTech(null)}
                className={cn(
                  "rounded-pill px-2.5 py-0.5 text-xs font-mono transition-colors",
                  selectedTech === null
                    ? "bg-accent text-accent-contrast"
                    : "bg-canvas border border-line text-ink-muted hover:text-ink",
                )}
              >
                All Tech
              </button>

              {allTech.map((tech) => (
                <button
                  type="button"
                  key={tech}
                  onClick={() =>
                    setSelectedTech(selectedTech === tech ? null : tech)
                  }
                  className={cn(
                    "rounded-pill px-2.5 py-0.5 text-xs font-mono transition-colors",
                    selectedTech === tech
                      ? "bg-accent text-accent-contrast"
                      : "bg-canvas border border-line text-ink-subtle hover:text-ink",
                  )}
                >
                  {tech}
                </button>
              ))}
            </div>

            {/* Filter Summary & Reset Bar */}
            {hasActiveFilters ? (
              <div className="flex items-center justify-between border-t border-line pt-3 text-xs text-ink-muted">
                <span>
                  Showing {filteredProjects.length} of {projects.length} projects
                </span>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="font-mono text-accent hover:underline"
                >
                  Reset all filters
                </button>
              </div>
            ) : null}
          </div>
        </Reveal>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <Stagger
            as="ul"
            role="list"
            className="mt-stack grid list-none gap-6 p-0 md:grid-cols-2"
          >
            {filteredProjects.map((project, index) => (
              <StaggerItem as="li" key={project.slug}>
                <ProjectCard project={project} index={index + 1} />
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <Reveal trigger="mount" delay={0.1}>
            <div className="mt-stack flex min-h-64 flex-col items-center justify-center rounded-card border border-dashed border-line p-12 text-center">
              <p className="text-h3 text-ink-muted">No projects found</p>
              <p className="mt-2 max-w-sm text-sm text-ink-subtle">
                No engineering projects match your current query or selected filters.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-6 rounded-control bg-ink px-4 py-2 text-sm font-medium text-ink-inverse"
              >
                Reset Filters
              </button>
            </div>
          </Reveal>
        )}
      </Container>
    </Section>
  );
}
