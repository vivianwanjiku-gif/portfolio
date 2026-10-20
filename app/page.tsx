import { Suspense } from "react"
import { Contact } from "@/components/contact"
import { Hero } from "@/components/hero"
import { KonamiEgg } from "@/components/konami-egg"
import { Playground } from "@/components/playground"
import { PortfolioSections, SectionsFallback } from "@/components/portfolio-sections"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="content" tabIndex={-1}>
        <Hero />
        <Suspense fallback={<SectionsFallback />}>
          <PortfolioSections />
        </Suspense>
        <Playground />
        <Contact />
      </main>
      <KonamiEgg />
      <SiteFooter />
    </>
  )
}
