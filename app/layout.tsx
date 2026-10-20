import type { Metadata } from "next"
import { Figtree, Geist_Mono, Newsreader } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { site } from "@/content/site"
import { getSiteUrl } from "@/lib/site-url"
import { themeBootScript } from "@/lib/theme-script"
import "./globals.css"

const sans = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
})

const serif = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-newsreader",
})

const mono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})

const description =
  "Vivian Wanjiku is a full-stack developer in Nairobi, Kenya. Selected work includes SkyLink Aviation and TapNet Network, plus public repositories for web apps, Flask APIs, and Python tools."

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | ${site.role}`,
    template: `%s | ${site.name}`,
  },
  description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.githubUrl }],
  creator: site.name,
  keywords: [
    "Vivian Wanjiku",
    "full-stack developer",
    "Nairobi",
    "Kenya",
    "React",
    "Python",
    "Flask",
    "SkyLink Aviation",
    "TapNet Network",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "/",
    siteName: site.name,
    title: `${site.name} | ${site.role}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.role}`,
    description,
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  telephone: "+254740758072",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  url: siteUrl,
  sameAs: [site.githubUrl],
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${serif.variable} ${mono.variable} dark h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  )
}
