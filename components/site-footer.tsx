import { cacheLife } from "next/cache"
import { site } from "@/content/site"

export async function SiteFooter() {
  "use cache"
  cacheLife("days")
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {year} {site.name}
          <span className="px-2" aria-hidden="true">
            ·
          </span>
          {site.location}
        </p>
        <p className="flex gap-4">
          <a className="hover:text-foreground" href={site.githubUrl} rel="me noreferrer">
            GitHub
          </a>
          <a className="hover:text-foreground" href={`mailto:${site.email}`}>
            Email
          </a>
          <a className="hover:text-foreground" href="#top">
            Back to top
          </a>
        </p>
      </div>
    </footer>
  )
}
