import type { Certification } from "@/types";

/**
 * The PRD specifies a grid of 4 cards, of which only the first is real —
 * cards 2–4 are literal "Placeholder".
 */
export const CERTIFICATION_TARGET = 4;

export const certifications: Certification[] = [
  {
    slug: "claude-101",
    title: "Claude 101",
    // NOTE (confirm): the PRD gives a title and a verify URL but names no
    // issuer. "Anthropic" is inferred from the course and the verify host
    // (Anthropic's Skilljar tenant) — high confidence, but it is an inference.
    // Correct it here if wrong.
    issuer: "Anthropic",
    verifyUrl: "https://verify.skilljar.com/c/zuzpwmkihdge",
    image: {
      src: "/certifications/claude-101.png",
      alt: "Claude 101 Certificate of Completion awarded to Muhammad Daud Israr by Anthropic",
      width: 939,
      height: 710,
    },
  },
  {
    slug: "ai-fluency-framework-foundations",
    title: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    verifyUrl: "https://verify.skilljar.com/c/dnb336vsnnqp",
    image: {
      src: "/certifications/ai-fluency-framework-foundations.png",
      alt: "AI Fluency: Framework & Foundations Certificate of Completion awarded to Muhammad Daud Israr by Anthropic",
      width: 832,
      height: 627,
    },
  },
  {
    slug: "huawei-cloud-developer-certification-hccda-ai",
    title: "Huawei Cloud Developer Certification (HCCDA-AI)",
    issuer: "Huawei",
    verifyUrl: "/certifications/huawei-hccda-ai.png",
    image: {
      src: "/certifications/huawei-hccda-ai.png",
      alt: "Huawei Cloud Developer Certification (HCCDA-AI) Certificate of Completion awarded to Muhammad Daud Israr",
      width: 906,
      height: 634,
    },
  },
  {
    slug: "python-programming-den",
    title: "Python Programming",
    issuer: "Digital Empowerment Network",
    verifyUrl: "/certifications/python-programming-den.png",
    issued: "2024-08",
    image: {
      src: "/certifications/python-programming-den.png",
      alt: "Python Programming Certificate of Completion awarded to Muhammad Daud Israr by Digital Empowerment Network",
      width: 950,
      height: 675,
    },
  },

  /* --------------------------------------------------------------------------
   * TODO (content): certifications 2–4 are "Placeholder" in the PRD.
   *
   * {
   *   slug: "",
   *   title: "",
   *   issuer: "",
   *   verifyUrl: "",
   * },
   * ------------------------------------------------------------------------ */
];

export function getCertifications(): Certification[] {
  return certifications;
}

/**
 * How many of the PRD's 4 slots are unfilled. The certifications grid renders
 * this many placeholder cards, which vanish on their own as real credentials
 * are added above — same contract as getFeaturedShortfall in projects.ts.
 */
export function getCertificationShortfall(): number {
  return Math.max(0, CERTIFICATION_TARGET - certifications.length);
}
