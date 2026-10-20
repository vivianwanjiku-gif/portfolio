import { SectionLabel } from "@/components/section-label"
import { site, isShown } from "@/content/site"
import type { GithubProfile } from "@/lib/types"

export function About({ profile }: { profile?: GithubProfile }) {
  const facts = [
    ["Based in", site.location],
    ["Focus", site.role],
    ["GitHub", site.githubUsername],
    ["Email", site.email],
  ]
  if (isShown(site.phoneDisplay)) facts.push(["Phone", site.phoneDisplay])
  if (profile?.location && profile.location !== site.location) facts.push(["GitHub location", profile.location])

  return (
    <section id="about" className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1.4fr)_minmax(240px,0.7fr)]">
        <div>
          <SectionLabel>about</SectionLabel>
          <h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">Work that is public, and only that.</h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {site.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {profile?.bio ? (
            <blockquote className="mt-6 border-l-2 border-copper pl-4 text-base leading-relaxed">
              <p>{profile.bio}</p>
              <footer className="mt-2 text-sm text-muted-foreground">GitHub bio</footer>
            </blockquote>
          ) : null}
          {isShown(site.education) ? (
            <p className="mt-6 text-base leading-relaxed">
              <span className="font-medium">Education. </span>
              {site.education}
            </p>
          ) : null}
          {site.experience.length > 0 ? (
            <div className="mt-8">
              <h3 className="font-serif text-2xl">Experience</h3>
              <ul className="mt-4 space-y-5">
                {site.experience.map((item) => (
                  <li key={`${item.organization}-${item.role}`}>
                    <p className="font-medium">
                      {item.role}
                      <span className="text-muted-foreground"> · {item.organization}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">{item.dates}</p>
                    <p className="mt-1 text-sm leading-relaxed">{item.summary}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-card p-5 sm:p-6">
          <div className="mb-5 grid size-16 place-items-center rounded-full bg-primary font-serif text-xl text-primary-foreground">
            VW
          </div>
          <dl className="space-y-4">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs tracking-[0.14em] text-muted-foreground uppercase">{label}</dt>
                <dd className="mt-1 text-sm break-all sm:text-base sm:break-normal">{value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  )
}
