import { PageHeader } from "@/components/ui";
import { getAllCategories, getAllProjects, getAllTech } from "@/content";
import { buildMetadata } from "@/lib/seo";
import { ProjectsExplorer } from "./projects-explorer";

export const metadata = buildMetadata({
  title: "Projects & Engineering Case Studies",
  description:
    "Explore full-stack AI platforms, autonomous RAG engines, multi-agent workflows, and backend REST microservices built by Muhammad Daud Israr.",
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = getAllProjects();
  const allTech = getAllTech();
  const allCategories = getAllCategories();

  return (
    <>
      <PageHeader
        eyebrow="Selected Engineering Work"
        title="Projects & Systems"
        description="A showcase of AI agents, RAG engines, full-stack platforms, and backend REST APIs. Designed with production architecture, strict type safety, and real-world system requirements."
      />

      <ProjectsExplorer
        projects={projects}
        allTech={allTech}
        allCategories={allCategories}
      />
    </>
  );
}
