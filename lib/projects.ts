import { site, type FeaturedProjectConfig } from "@/content/site"
import type { FeaturedCard, Repo } from "@/lib/types"

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "#c9a227",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#6f5499",
  Mako: "#8a7560",
  Shell: "#89e051",
  PowerShell: "#012456",
}

export function languageColor(language: string) {
  return LANGUAGE_COLORS[language] ?? "var(--primary)"
}

/** A homepage visitors can open. GitHub repo pages are not treated as live sites. */
export function liveUrl(homepage: string | null | undefined) {
  if (!homepage) return null
  try {
    const url = new URL(homepage)
    if (url.protocol !== "http:" && url.protocol !== "https:") return null
    if (url.hostname === "github.com" || url.hostname === "www.github.com") return null
    return url.toString()
  } catch {
    return null
  }
}

export function languageEntries(languages: Record<string, number> | null) {
  if (!languages) return []
  const total = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0)
  if (total <= 0) return []
  return Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .map(([name, bytes]) => ({
      name,
      bytes,
      percent: Math.round((bytes / total) * 1000) / 10,
    }))
}

export function primaryLanguageCounts(repos: Repo[]) {
  const counts = new Map<string, number>()
  let undisclosed = 0
  const originals = repos.filter((repo) => !repo.fork)
  for (const repo of originals) {
    if (!repo.language) {
      undisclosed += 1
      continue
    }
    counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1)
  }
  const ranked = [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  return {
    ranked,
    undisclosed,
    originals: originals.length,
    forks: repos.length - originals.length,
  }
}

function findRepo(repos: Repo[], names: string[]) {
  const wanted = new Set(names.map((name) => name.toLowerCase()))
  return repos.find((repo) => wanted.has(repo.name.toLowerCase())) ?? null
}

export function buildFeatured(repos: Repo[], configs: FeaturedProjectConfig[] = site.featured): FeaturedCard[] {
  return configs.map((config) => {
    const repo = findRepo(repos, config.matchNames)
    const configuredLive = liveUrl(config.homepage)
    const repoLive = repo ? liveUrl(repo.homepage) : null
    const configuredRepo = config.repoUrl.trim()
    return {
      title: config.title,
      kind: config.kind,
      icon: config.icon,
      summary: config.summary || repo?.description || "No description on GitHub.",
      tags: config.tags,
      repoUrl: repo?.htmlUrl || configuredRepo || null,
      liveUrl: configuredLive || repoLive,
      languages: repo?.languages ?? null,
      pushedAt: repo?.pushedAt ?? null,
      matched: Boolean(repo),
    }
  })
}

export function repoMatchesQuery(repo: Repo, query: string) {
  const needle = query.trim().toLowerCase()
  if (!needle) return true
  const haystack = [repo.name, repo.description ?? "", repo.language ?? ""].join(" ").toLowerCase()
  return haystack.includes(needle)
}
