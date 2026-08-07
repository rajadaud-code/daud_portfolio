import type { ExperienceEntry } from "@/types";

/**
 * Experience timeline. All four entries are fully specified in the PRD —
 * no gaps here.
 *
 * Authored newest-first for readability, but consumers should call
 * `getExperience()` rather than trusting this array's order.
 */
export const experience: ExperienceEntry[] = [
  {
    slug: "techling-software-engineer",
    role: "Software Engineer",
    company: "Techling (Private) Limited",
    start: "2025-12",
    end: null, // Present
    focus: ["Backend Engineering", "LLM", "AI Agents", "REST APIs"],
  },
  {
    slug: "huawei-ai-cloud-trainee",
    role: "AI & Cloud Trainee",
    company: "Huawei",
    start: "2025-06",
    end: "2025-09",
    focus: [
      "PyTorch",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Seaborn",
      "ModelArts",
    ],
  },
  {
    slug: "pny-backend-developer",
    role: "Backend Developer",
    company: "PNY Trainings",
    start: "2025-03",
    end: "2025-05",
    focus: ["Node.js", "Express", "Authentication", "REST APIs"],
  },
  {
    slug: "den-python-developer-intern",
    role: "Python Developer Intern",
    company: "Digital Empowerment Network",
    start: "2024-08",
    end: "2024-09",
    focus: ["Python", "Automation", "Backend"],
  },
];

/**
 * Timeline entries, newest first.
 *
 * Sorts on the ISO `start` string — lexicographic order on "YYYY-MM" is
 * chronological order, so this needs no date parsing and no timezone.
 */
export function getExperience(): ExperienceEntry[] {
  return [...experience].sort((a, b) => b.start.localeCompare(a.start));
}

/** The ongoing role, if any. */
export function getCurrentRole(): ExperienceEntry | undefined {
  return getExperience().find((entry) => entry.end === null);
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

/**
 * "2025-12" → "Dec 2025", the PRD's own date style.
 *
 * String arithmetic, no Date: `new Date("2025-12")` is parsed as UTC midnight,
 * which a formatter in a west-of-UTC timezone renders as *November* — the
 * classic off-by-one-month bug this type exists to avoid (see types/experience).
 * An unparseable value falls through unformatted rather than throwing; the
 * timeline should degrade to raw data, not crash on it.
 */
export function formatYearMonth(value: string): string {
  const [year, month] = value.split("-");
  const name = MONTHS[Number(month) - 1];
  return name && year ? `${name} ${year}` : value;
}
