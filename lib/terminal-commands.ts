import { isShown, site } from "@/content/site"

export type CommandResult = {
  lines: string[]
  action?: "clear" | "game"
}

const HELP = [
  "help       show this list",
  "about      short introduction",
  "projects   featured work on this page",
  "skills     tools named in the repositories",
  "contact    email, phone, and GitHub",
  "game       open a game of Snake",
  "clear      clear the screen",
]

export function runCommand(raw: string): CommandResult {
  const name = raw.trim().toLowerCase().split(/\s+/)[0] ?? ""
  if (!name) return { lines: [] }

  switch (name) {
    case "help":
      return { lines: ["Commands:", ...HELP] }
    case "about":
      return {
        lines: [
          `${site.name} — ${site.role}, ${site.location}.`,
          site.intro,
          "The About section has the longer version. Nothing there is invented.",
        ],
      }
    case "projects":
      return {
        lines: [
          "Featured on this page:",
          ...site.featured.flatMap((project) => {
            const lines = [`${project.title} — ${project.kind}`]
            if (project.homepage) lines.push(`  ${project.homepage}`)
            return lines
          }),
          "Every public repository is in the Projects section.",
        ],
      }
    case "skills":
      return {
        lines: site.stack.map((group) => `${group.title}: ${group.items.map((item) => item.name).join(", ")}`),
      }
    case "contact": {
      const lines = [`Email: ${site.email}`, `GitHub: ${site.githubUrl}`]
      if (isShown(site.phoneDisplay)) lines.splice(1, 0, `Phone: ${site.phoneDisplay}`)
      return { lines }
    }
    case "game":
      return { lines: ["Opening Snake. Arrow keys, WASD, swipe, or the pad."], action: "game" }
    case "clear":
      return { lines: [], action: "clear" }
    default:
      return { lines: [`${name}: command not found. Type help.`] }
  }
}
