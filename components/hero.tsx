import { ArrowUpRight, MapPin } from "lucide-react"
import { isShown, site } from "@/content/site"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Hero() {
  const preview = site.featured.slice(0, 2)

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="hero-wash pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="grid-fade pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:items-end">
        <div className="rise">
          <p className="flex items-center gap-2 text-sm font-medium text-copper">
            <MapPin className="size-4" aria-hidden="true" />
            {site.location}
          </p>
          <h1 className="mt-4 font-serif text-[clamp(3.4rem,9vw,6.6rem)] leading-[0.9] tracking-[-0.035em] text-balance">
            {site.name}
          </h1>
          <p className="mt-5 text-lg font-medium sm:text-xl">{site.role}</p>
          {isShown(site.availability) ? (
            <p className="mt-2 text-sm text-copper">{site.availability}</p>
          ) : null}
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">{site.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#work" className={cn(buttonVariants({ size: "lg" }), "h-11 px-4")}>
              Featured work
            </a>
            <a
              href="#contact"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 px-4")}
            >
              Contact
            </a>
            <a
              href={site.githubUrl}
              className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "h-11 px-4")}
              rel="me noreferrer"
            >
              GitHub
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <aside className="rise rise-delay grid gap-3" aria-label="Selected live projects">
          {preview.map((project, index) => (
            <a
              key={project.title}
              href="#work"
              className="group rounded-2xl border border-border bg-card/90 p-5 shadow-sm motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-0.5"
            >
              <p className="font-serif text-sm text-copper">0{index + 1}</p>
              <h2 className="mt-2 font-serif text-2xl tracking-tight">{project.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{project.kind}</p>
              <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium">
                View project
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </p>
            </a>
          ))}
        </aside>
      </div>
    </section>
  )
}
