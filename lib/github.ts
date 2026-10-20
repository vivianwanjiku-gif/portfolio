import { cacheLife, cacheTag } from "next/cache"
import fallbackJson from "@/content/github-fallback.json"
import type { GithubProfile, PortfolioData, Repo } from "@/lib/types"

const fallback = fallbackJson as unknown as PortfolioData

type GithubRepoPayload = {
  id: number
  name: string
  description: string | null
  language: string | null
  homepage: string | null
  html_url: string
  fork: boolean
  stargazers_count: number
  pushed_at: string
  updated_at: string
  archived: boolean
  topics?: string[]
}

type GithubUserPayload = {
  login: string
  public_repos: number
  followers: number
  avatar_url: string
  html_url: string
  created_at: string
  name: string | null
  bio: string | null
  location: string | null
  blog: string | null
}

const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "vivian-wanjiku-portfolio",
  "X-GitHub-Api-Version": "2022-11-28",
}

function blankToNull(value: string | null | undefined) {
  if (!value) return null
  const trimmed = value.trim()
  return trimmed ? trimmed : null
}

function normalizeRepo(repo: GithubRepoPayload): Repo {
  return {
    id: repo.id,
    name: repo.name,
    description: blankToNull(repo.description),
    language: repo.language,
    languages: null,
    homepage: blankToNull(repo.homepage),
    htmlUrl: repo.html_url,
    fork: repo.fork,
    stars: repo.stargazers_count,
    pushedAt: repo.pushed_at,
    updatedAt: repo.updated_at,
    archived: repo.archived,
    topics: repo.topics ?? [],
  }
}

function snapshotLanguages() {
  return new Map(fallback.repos.map((repo) => [repo.name.toLowerCase(), repo.languages]))
}

async function fetchLive(): Promise<PortfolioData> {
  "use cache"
  cacheLife("hours")
  cacheTag("github-repos")

  const userResponse = await fetch("https://api.github.com/users/vivianwanjiku-gif", {
    headers,
    signal: AbortSignal.timeout(8000),
  })
  if (!userResponse.ok) {
    throw new Error(`GitHub user request failed with ${userResponse.status}`)
  }

  const repos: GithubRepoPayload[] = []
  for (let page = 1; page <= 5; page += 1) {
    const response = await fetch(
      `https://api.github.com/users/vivianwanjiku-gif/repos?per_page=100&page=${page}&type=owner&sort=updated`,
      { headers, signal: AbortSignal.timeout(8000) },
    )
    if (!response.ok) {
      throw new Error(`GitHub repo request failed with ${response.status}`)
    }
    const batch = (await response.json()) as GithubRepoPayload[]
    if (!Array.isArray(batch)) {
      throw new Error("GitHub repo response was not a list")
    }
    repos.push(...batch)
    if (batch.length < 100) break
  }

  const user = (await userResponse.json()) as GithubUserPayload
  const savedLanguages = snapshotLanguages()
  const profile: GithubProfile = {
    login: user.login,
    publicRepos: user.public_repos,
    followers: user.followers,
    avatarUrl: user.avatar_url,
    htmlUrl: user.html_url,
    createdAt: user.created_at,
    name: blankToNull(user.name),
    bio: blankToNull(user.bio),
    location: blankToNull(user.location),
    blog: blankToNull(user.blog),
  }

  return {
    source: "github",
    fetchedAt: new Date().toISOString(),
    profile,
    repos: repos.map((repo) => {
      const normalized = normalizeRepo(repo)
      normalized.languages = savedLanguages.get(normalized.name.toLowerCase()) ?? null
      return normalized
    }),
  }
}

export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    return await fetchLive()
  } catch {
    return {
      source: "snapshot",
      fetchedAt: fallback.fetchedAt,
      profile: fallback.profile,
      repos: fallback.repos,
    }
  }
}
