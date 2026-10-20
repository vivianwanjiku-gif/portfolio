export type Repo = {
  id: number
  name: string
  description: string | null
  language: string | null
  languages: Record<string, number> | null
  homepage: string | null
  htmlUrl: string
  fork: boolean
  stars: number
  pushedAt: string
  updatedAt: string
  archived: boolean
  topics: string[]
}

export type GithubProfile = {
  login: string
  publicRepos: number
  followers: number
  avatarUrl: string
  htmlUrl: string
  createdAt: string
  name: string | null
  bio: string | null
  location: string | null
  blog: string | null
}

export type PortfolioData = {
  source: "github" | "snapshot"
  fetchedAt: string
  profile: GithubProfile
  repos: Repo[]
}

export type FeaturedCard = {
  title: string
  kind: string
  icon: string
  summary: string
  tags: string[]
  repoUrl: string | null
  liveUrl: string | null
  languages: Record<string, number> | null
  pushedAt: string | null
  matched: boolean
}
