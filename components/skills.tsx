import { SectionLabel } from "@/components/section-label"
import { site } from "@/content/site"
import { languageColor, primaryLanguageCounts } from "@/lib/projects"
import type { Repo } from "@/lib/types"

export function Skills({ repos }: { repos: Repo[] }) {
  const { ranked, undisclosed, originals, forks } = primaryLanguageCounts(repos)
  const max = ranked[0]?.[1] ?? 1

  return (
    <section id="skills" className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <SectionLabel>skills</SectionLabel>
        <h2 className="mt-3 max-w-2xl font-serif text-4xl tracking-tight sm:text-5xl">
          Languages from the public repositories.
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          {originals} original {originals === 1 ? "repository" : "repositories"}
          {forks > 0 ? ` and ${forks} ${forks === 1 ? "fork" : "forks"}` : ""}. The bars count original
          repositories by the primary language GitHub reports.
          {undisclosed > 0
            ? ` ${undisclosed} original ${undisclosed === 1 ? "repository has" : "repositories have"} no language detected.`
            : ""}
        </p>

        <ul className="mt-8 space-y-4" aria-label="Primary languages">
          {ranked.map(([language, count]) => {
            const width = Math.max(8, Math.round((count / max) * 100))
            return (
              <li key={language}>
                <div className="mb-1.5 flex items-baseline justify-between gap-4 text-sm">
                  <span className="font-medium">{language}</span>
                  <span className="text-muted-foreground">
                    {count} {count === 1 ? "repo" : "repos"}
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-background">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${width}%`, background: languageColor(language) }}
                  />
                </div>
              </li>
            )
          })}
        </ul>

        <div className="mt-14">
          <h3 className="font-serif text-3xl tracking-tight">Named in the repository files</h3>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            These are libraries and services written down in READMEs and package files, plus the hosts used by the live
            homepages. They are not a separate résumé.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {site.stack.map((group) => (
              <section key={group.title} className="rounded-2xl border border-border bg-card p-5">
                <h4 className="font-medium">{group.title}</h4>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={item.name} className="grid gap-0.5">
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="text-sm text-muted-foreground">{item.source}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
