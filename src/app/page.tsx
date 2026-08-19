import {
  Certifications,
  ContactCta,
  Experience,
  FeaturedProjects,
  Hero,
} from "@/components/sections";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Home",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />

      {/*
        The PRD is emphatic that projects follow the hero immediately, which is
        why the hero's height is content-driven rather than min-h-screen (see
        components/sections/hero.tsx) and why this section drops its top padding
        (spacing="tight"). Nothing belongs between these two.
      */}
      <FeaturedProjects />

      {/* Certifications before Experience — the PRD's own order. */}
      <Certifications />

      <Experience />

      {/* Collaboration and Contact Call to Action */}
      <ContactCta />
    </>
  );
}
