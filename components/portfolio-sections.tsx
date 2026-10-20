import { About } from "@/components/about"
import { FeaturedProjects } from "@/components/featured-projects"
import { ProjectBrowser } from "@/components/project-browser"
import { Skills } from "@/components/skills"
import { getPortfolioData } from "@/lib/github"
import { buildFeatured } from "@/lib/projects"

export async function PortfolioSections() {
  const data = await getPortfolioData()
  const featured = buildFeatured(data.repos)

  return (
    <>
      <About profile={data.profile} />
      <Skills repos={data.repos} />
      <FeaturedProjects projects={featured} />
      <ProjectBrowser data={data} />
    </>
  )
}

export function SectionsFallback() {
  return (
    <div aria-busy="true" aria-live="polite" className="border-t border-border">
      <p className="sr-only">Loading repositories from GitHub.</p>
      <div id="about" />
      <div id="skills" />
      <div id="work" />
      <div id="projects" />
      <div className="mx-auto max-w-6xl space-y-6 px-5 py-16 sm:px-8">
        <div className="h-8 w-40 rounded-full bg-muted" />
        <div className="h-16 max-w-xl rounded-2xl bg-muted" />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="h-64 rounded-2xl bg-muted" />
          <div className="h-64 rounded-2xl bg-muted" />
        </div>
      </div>
    </div>
  )
}
