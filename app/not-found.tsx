import Link from "next/link"
import { site } from "@/content/site"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6 py-24">
      <p className="text-sm font-medium tracking-[0.16em] text-copper uppercase">404</p>
      <h1 className="mt-3 font-serif text-5xl tracking-tight">That page is not here.</h1>
      <p className="mt-4 text-muted-foreground">The portfolio lives on the home page.</p>
      <Link href="/" className={cn(buttonVariants(), "mt-8 h-11 w-fit px-4")}>
        Back to {site.name.split(" ")[0]}
      </Link>
    </main>
  )
}
