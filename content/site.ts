/**
 * Site content for Vivian Wanjiku.
 *
 * Edit this file to change the copy, contact details, and featured projects.
 * Optional fields left as an empty string are hidden. Do not invent employers,
 * degrees, or testimonials here unless they are yours to add.
 *
 * Repository names, descriptions, and languages are loaded from GitHub.
 * They are not edited in this file. See content/github-fallback.json for the
 * saved snapshot used when api.github.com is unavailable.
 */

export type ExperienceItem = {
  role: string
  organization: string
  dates: string
  summary: string
}

export type FeaturedIcon =
  | "plane"
  | "wifi"
  | "map"
  | "package"
  | "dumbbell"
  | "calendar"

export type FeaturedProjectConfig = {
  /** GitHub repository names that should fill this card. Matching is case-insensitive. */
  matchNames: string[]
  title: string
  /** Short label, such as "Web app" or "REST API". */
  kind: string
  icon: FeaturedIcon
  /**
   * Summary shown on the card. For matched repositories this is condensed from
   * that repo's README. SkyLink is described from the brief for this site.
   */
  summary: string
  /** Public site. Leave "" to use the homepage field from GitHub, if it has one. */
  homepage: string
  /**
   * Used only when matchNames does not find a public repository.
   * SkyLink Aviation was not in the public repo list on 20 Oct 2026.
   * Paste the repository URL here when it is public, for example
   * "https://github.com/vivianwanjiku-gif/skylink-aviation"
   */
  repoUrl: string
  /**
   * Technologies named in the repository's README or package manifest.
   * These are not guessed. SkyLink's Next.js tag is from the live site,
   * which serves Next.js assets. Add the rest when the repo is public.
   */
  tags: string[]
}

export type StackItem = {
  name: string
  /** Where this was read: a repository file, README, or live site. */
  source: string
}

export type StackGroup = {
  title: string
  items: StackItem[]
}

export const site = {
  name: "Vivian Wanjiku",
  role: "Full-stack developer",
  location: "Nairobi, Kenya",
  email: "vividorpass@gmail.com",
  /**
   * Published in vivianwanjiku-gif/vivianwanjiku-lab.github.io (index.html).
   * Set to "" to hide the phone number.
   */
  phoneDisplay: "0740 758 072",
  phoneHref: "tel:+254740758072",
  githubUsername: "vivianwanjiku-gif",
  githubUrl: "https://github.com/vivianwanjiku-gif",

  /** Path in /public, for example "/portrait.jpg". Empty shows a monogram. */
  portrait: "",

  /** One short line under the role, for example "Available for contract work". */
  availability: "",

  /** Full URL. Empty hides the link. */
  linkedinUrl: "",

  /** Path or URL to a CV, for example "/cv.pdf". Empty hides the link. */
  resumeUrl: "",

  /**
   * One or two sentences. Empty hides the line.
   * Add a school or qualification here only if you want it public.
   */
  education: "",

  /**
   * Add roles only if you want them public. An empty list hides the section.
   * Example:
   * { role: "Software developer", organization: "Studio name", dates: "2024 — 2025", summary: "What you worked on." }
   */
  experience: [] as ExperienceItem[],

  intro:
    "I build web applications from the interface through to the API. Public repositories cover React and TypeScript apps, Flask services, and Python tools.",

  about: [
    "I'm a software developer in Nairobi, Kenya. This page reads the public GitHub account vivianwanjiku-gif and lists those repositories with the name, description, languages, and links GitHub publishes.",
    "Selected live work includes SkyLink Aviation, an aircraft sales and charter platform, and TapNet Network, an ISP site where customers compare plans and pay with M-Pesa STK Push or Airtel Money.",
    "Other original repositories include Open Bench, a TypeScript map of adult changing tables; Flask APIs for inventory and workout tracking; a healthcare appointment scheduler in HTML, CSS, and JavaScript; and Master CLI, a Python quiz that runs in the terminal.",
  ],

  featured: [
    {
      matchNames: [
        "SkyLink",
        "skylink",
        "skylink-aviation",
        "SkyLink-Aviation",
        "SkyLink_Aviation",
        "Skylink-Aviation",
      ],
      title: "SkyLink Aviation",
      kind: "Aircraft sales and charter",
      icon: "plane",
      summary:
        "An aircraft sales and charter platform for scheduled flights, private charter requests, and aircraft listings.",
      homepage: "https://skylink-aviation.vercel.app",
      repoUrl: "",
      tags: ["Next.js"],
    },
    {
      matchNames: ["Tapnet_Network", "TapNet_Network", "tapnet-network"],
      title: "TapNet Network",
      kind: "ISP platform",
      icon: "wifi",
      summary:
        "Prepaid internet for Kenya. Customers compare plans, subscribe, pay, and manage a line. Staff manage customers, packages, routers, tickets, and payments. M-Pesa STK Push and Airtel Money run through the API and are stored in Postgres. The public site is a Vite and React app; a separate Flask API lives in the repo.",
      homepage: "https://tapnet-network-udrn.vercel.app",
      repoUrl: "",
      tags: [
        "React",
        "Vite",
        "JavaScript",
        "Tailwind CSS",
        "Redux Toolkit",
        "Flask",
        "PostgreSQL",
        "M-Pesa STK Push",
        "Airtel Money",
      ],
    },
    {
      matchNames: ["open-bench"],
      title: "Open Bench",
      kind: "Web app",
      icon: "map",
      summary:
        "A crowd-sourced map of adult changing tables: full-size benches in public restrooms, for disabled adults, caregivers, families, and venues. The public map currently uses sample listings.",
      homepage: "",
      repoUrl: "",
      tags: ["TypeScript", "React", "Vite", "Tailwind CSS", "Leaflet"],
    },
    {
      matchNames: ["INVENTORY_MANAGEMENT"],
      title: "Inventory Management",
      kind: "API and CLI",
      icon: "package",
      summary:
        "An e-commerce administrator portal with a Flask REST API, a command-line interface, OpenFoodFacts product lookups, search, and unit tests.",
      homepage: "",
      repoUrl: "",
      tags: ["Python", "Flask", "pytest", "OpenFoodFacts"],
    },
    {
      matchNames: ["Workout-API"],
      title: "Workout Tracker API",
      kind: "REST API",
      icon: "dumbbell",
      summary:
        "A Flask API for personal trainers to manage workouts and exercises, with SQLAlchemy, Marshmallow, CRUD endpoints, and validation.",
      homepage: "",
      repoUrl: "",
      tags: ["Python", "Flask", "SQLAlchemy", "Marshmallow"],
    },
    {
      matchNames: ["Final-project"],
      title: "Appointment Scheduler",
      kind: "Web app",
      icon: "calendar",
      summary:
        "A healthcare booking app. Patients browse doctors and book appointments. Built with HTML, CSS, and JavaScript.",
      homepage: "",
      repoUrl: "",
      tags: ["HTML", "CSS", "JavaScript"],
    },
  ] satisfies FeaturedProjectConfig[],

  /**
   * Libraries and tools named in repository files on 20 Oct 2026.
   * The language chart elsewhere is computed from GitHub, not from this list.
   */
  stack: [
    {
      title: "Interfaces",
      items: [
        {
          name: "JavaScript",
          source: "Primary language on TapNet, the appointment scheduler, React Lab, and other original repos",
        },
        { name: "TypeScript", source: "open-bench" },
        { name: "HTML", source: "Static repositories including the appointment scheduler and an earlier one-page portfolio" },
        { name: "CSS", source: "My-Brand, photography, and the appointment scheduler" },
        { name: "React", source: "Tapnet_Network, open-bench, and React-lab package.json" },
        { name: "Vite", source: "Tapnet_Network, open-bench, and React-lab" },
        { name: "Tailwind CSS", source: "Tapnet_Network and open-bench" },
        { name: "Redux Toolkit", source: "Tapnet_Network package.json" },
        { name: "Leaflet", source: "open-bench package.json" },
      ],
    },
    {
      title: "APIs and data",
      items: [
        { name: "Python", source: "Inventory Management, Workout API, Master CLI, and the TapNet backend" },
        { name: "Flask", source: "TapNet README, Inventory Management requirements, Workout API README" },
        { name: "PostgreSQL", source: "TapNet README and the pg package" },
        { name: "SQLAlchemy", source: "Workout API README" },
        { name: "Marshmallow", source: "Workout API README" },
        {
          name: "Express",
          source: "Kasarani-pool-league README, described there as a minimal scaffold",
        },
        {
          name: "MongoDB",
          source: "Kasarani-pool-league README, described there as a minimal scaffold",
        },
      ],
    },
    {
      title: "Payments",
      items: [
        { name: "M-Pesa STK Push", source: "TapNet README" },
        { name: "Airtel Money", source: "TapNet README" },
      ],
    },
    {
      title: "Tests and hosting",
      items: [
        { name: "pytest", source: "Inventory Management requirements.txt" },
        { name: "Vitest", source: "open-bench package.json" },
        { name: "Node test runner", source: "TapNet payment tests" },
        { name: "Vercel", source: "Live homepages for TapNet, SkyLink Aviation, and React Lab" },
        { name: "GitHub Pages", source: "Live homepages for Open Bench and the appointment scheduler" },
      ],
    },
  ] satisfies StackGroup[],
}

export function isShown(value: string | null | undefined): value is string {
  if (!value) return false
  const trimmed = value.trim()
  if (!trimmed) return false
  return !/^placeholder\b/i.test(trimmed)
}
