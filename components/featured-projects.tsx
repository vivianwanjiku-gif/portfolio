import { ArrowUpRight, Calendar, Dumbbell, Map, Package, Plane, Wifi } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { formatUpdated } from "@/lib/format"
import { languageColor, languageEntries } from "@/lib/projects"
import type { FeaturedCard } from "@/lib/types"
import { SectionLabel } from "@/components/section-label"
import { Badge } from "@/components/ui/badge"

const icons: Record<string, LucideIcon> = {
  plane: Plane,
  wifi: Wifi,
  map: Map,
  package: Package,
  dumbbell: Dumbbell,
  calendar: Calendar,
}

export function FeaturedProjects({ projects }: { projects: FeaturedCard[] }) {
  return (
    <section id="work" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <SectionLabel>work</SectionLabel>
        <h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">Featured projects</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          SkyLink Aviation and TapNet Network lead the list. The other cards are original repositories with a README
          and, where GitHub has one, a homepage.
        </p>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {projects.map((project, index) => {
            const Icon = icons[project.icon]
            const languages = languageEntries(project.languages)
            const updated = formatUpdated(project.pushedAt)
            return (
              <article
                key={project.title}
                className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
              >
                <div className="relative flex items-end justify-between bg-primary px-5 py-6 text-primary-foreground sm:px-6">
                  <div>
                    <p className="font-serif text-sm opacity-80">0{index + 1}</p>
                    <p className="mt-4 text-sm">{project.kind}</p>
                  </div>
                  {Icon ? <Icon className="size-8 opacity-80" aria-hidden="true" /> : null}
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-serif text-3xl tracking-tight">{project.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{project.summary}</p>
                  {languages.length > 0 ? (
                    <div className="mt-5">
                      <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">Languages</p>
                      <div
                        className="mt-2 flex h-2 overflow-hidden rounded-full"
                        role="img"
                        aria-label={languages.map((entry) => `${entry.name} ${entry.percent}%`).join(", ")}
                      >
                        {languages.map((entry) => (
                          <span
                            key={entry.name}
                            style={{ width: `${entry.percent}%`, background: languageColor(entry.name) }}
                          />
                        ))}
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {languages.map((entry) => `${entry.name} ${entry.percent}%`).join(" · ")}
                      </p>
                    </div>
                  ) : null}
                  {project.tags.length > 0 ? (
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
                      {project.tags.map((tag) => (
                        <li key={tag}>
                          <Badge variant="secondary">{tag}</Badge>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                    {project.repoUrl ? (
                      <a className="inline-flex items-center gap-1 font-medium underline-offset-4 hover:underline" href={project.repoUrl} rel="noreferrer">
                        Repository <ArrowUpRight className="size-4" aria-hidden="true" />
                      </a>
                    ) : null}
                    {project.liveUrl ? (
                      <a className="inline-flex items-center gap-1 font-medium underline-offset-4 hover:underline" href={project.liveUrl} rel="noreferrer">
                        Live site <ArrowUpRight className="size-4" aria-hidden="true" />
                      </a>
                    ) : null}
                    {updated ? <span className="text-muted-foreground">Updated {updated}</span> : null}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
