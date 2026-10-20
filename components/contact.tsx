import { Mail, Phone } from "lucide-react"
import { GithubMark } from "@/components/github-mark"
import { site, isShown } from "@/content/site"
import { ContactForm } from "@/components/contact-form"

export function Contact() {
  return (
    <section id="contact" className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div>
          <p className="text-sm font-medium tracking-[0.16em] text-copper uppercase">Contact</p>
          <h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">Start a conversation.</h2>
          <p className="mt-4 text-muted-foreground">
            Email is the direct route. The form prepares a message in your own email app.
          </p>
          <ul className="mt-8 space-y-3">
            <li>
              <a className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:bg-muted" href={`mailto:${site.email}`}>
                <Mail className="size-4 text-copper" aria-hidden="true" />
                <span>
                  <span className="block text-xs tracking-[0.14em] text-muted-foreground uppercase">Email</span>
                  {site.email}
                </span>
              </a>
            </li>
            {isShown(site.phoneDisplay) ? (
              <li>
                <a className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:bg-muted" href={site.phoneHref}>
                  <Phone className="size-4 text-copper" aria-hidden="true" />
                  <span>
                    <span className="block text-xs tracking-[0.14em] text-muted-foreground uppercase">Phone</span>
                    {site.phoneDisplay}
                  </span>
                </a>
              </li>
            ) : null}
            <li>
              <a className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:bg-muted" href={site.githubUrl} rel="me noreferrer">
                <GithubMark className="size-4 text-copper" />
                <span>
                  <span className="block text-xs tracking-[0.14em] text-muted-foreground uppercase">GitHub</span>
                  github.com/{site.githubUsername}
                </span>
              </a>
            </li>
            {isShown(site.linkedinUrl) ? (
              <li>
                <a className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:bg-muted" href={site.linkedinUrl} rel="me noreferrer">
                  <span>
                    <span className="block text-xs tracking-[0.14em] text-muted-foreground uppercase">LinkedIn</span>
                    Profile
                  </span>
                </a>
              </li>
            ) : null}
            {isShown(site.resumeUrl) ? (
              <li>
                <a className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:bg-muted" href={site.resumeUrl}>
                  <span>
                    <span className="block text-xs tracking-[0.14em] text-muted-foreground uppercase">CV</span>
                    Download
                  </span>
                </a>
              </li>
            ) : null}
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  )
}
