"use client"

import { ArrowUpRight, Search } from "lucide-react"
import { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { formatUpdated } from "@/lib/format"
import { liveUrl, repoMatchesQuery } from "@/lib/projects"
import type { PortfolioData, Repo } from "@/lib/types"

type SourceFilter = "original" | "forks" | "all"

export function ProjectBrowser({ data }: { data: PortfolioData }) {
  const [query, setQuery] = useState("")
  const [source, setSource] = useState<SourceFilter>("original")
  const [language, setLanguage] = useState("All")

  const languages = useMemo(() => {
    const names = new Set<string>()
    for (const repo of data.repos) {
      if (repo.language) names.add(repo.language)
    }
    return ["All", ...[...names].sort((a, b) => a.localeCompare(b))]
  }, [data.repos])

  const visible = useMemo(() => {
    return data.repos
      .filter((repo) => {
        if (source === "original" && repo.fork) return false
        if (source === "forks" && !repo.fork) return false
        if (language !== "All" && repo.language !== language) return false
        return repoMatchesQuery(repo, query)
      })
      .sort((a, b) => Date.parse(b.pushedAt) - Date.parse(a.pushedAt))
  }, [data.repos, language, query, source])

  const sourceOptions: { id: SourceFilter; label: string }[] = [
    { id: "original", label: "Original" },
    { id: "forks", label: "Forks" },
    { id: "all", label: "All" },
  ]

  return (
    <section id="projects" className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <p className="text-sm font-medium tracking-[0.16em] text-copper uppercase">Repositories</p>
        <h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">All projects</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          {data.source === "github"
            ? `Loaded from the GitHub API and refreshed about hourly. Last read ${formatUpdated(data.fetchedAt) ?? "recently"}.`
            : `GitHub did not respond, so this is the saved snapshot from ${formatUpdated(data.fetchedAt) ?? "the last successful read"}.`}
          {data.profile.publicRepos > data.repos.length
            ? ` GitHub reports ${data.profile.publicRepos} public repositories; ${data.repos.length} are listed here.`
            : ""}
        </p>

        <div className="mt-8 flex flex-col gap-4">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name or description"
              aria-label="Search repositories"
              className="h-11 pl-9"
            />
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Repository source">
              {sourceOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={source === option.id}
                  onClick={() => setSource(option.id)}
                  className={`rounded-full border px-3 py-1.5 text-sm transition-colors focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none ${
                    source === option.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card hover:bg-background"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter by language">
              {languages.map((name) => (
                <button
                  key={name}
                  type="button"
                  aria-pressed={language === name}
                  onClick={() => setLanguage(name)}
                  className={`shrink-0 rounded-full border px-3 py-1.5 text-sm transition-colors focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none ${
                    language === name
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card hover:bg-background"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? "repository" : "repositories"}
        </p>

        {visible.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-border bg-card px-5 py-10 text-center">
            <p className="font-medium">No repositories match that filter.</p>
            <button
              type="button"
              className="mt-3 text-sm font-medium underline-offset-4 hover:underline"
              onClick={() => {
                setQuery("")
                setLanguage("All")
                setSource("all")
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <ul className="mt-4 grid gap-4 md:grid-cols-2">
            {visible.map((repo) => (
              <li key={repo.id}>
                <RepoCard repo={repo} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

function RepoCard({ repo }: { repo: Repo }) {
  const homepage = liveUrl(repo.homepage)
  const updated = formatUpdated(repo.pushedAt)

  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="font-serif text-2xl tracking-tight">
          <a className="hover:underline" href={repo.htmlUrl} rel="noreferrer">
            {repo.name}
          </a>
        </h3>
        {repo.fork ? <Badge variant="outline">Fork</Badge> : null}
        {repo.archived ? <Badge variant="outline">Archived</Badge> : null}
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {repo.description ?? "No description on GitHub."}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        {repo.language ? <span className="font-medium">{repo.language}</span> : <span className="text-muted-foreground">Language not detected</span>}
        {updated ? <span className="text-muted-foreground">Updated {updated}</span> : null}
        {repo.stars > 0 ? (
          <span className="text-muted-foreground">
            {repo.stars} {repo.stars === 1 ? "star" : "stars"}
          </span>
        ) : null}
      </div>
      <div className="mt-4 flex flex-wrap gap-4 text-sm font-medium">
        <a className="inline-flex items-center gap-1 underline-offset-4 hover:underline" href={repo.htmlUrl} rel="noreferrer">
          Repository <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
        {homepage ? (
          <a className="inline-flex items-center gap-1 underline-offset-4 hover:underline" href={homepage} rel="noreferrer">
            Homepage <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </article>
  )
}
