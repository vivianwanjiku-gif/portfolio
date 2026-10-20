/** Absolute origin for canonical URLs, the sitemap, and social cards. */
export function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")
  if (explicit) return explicit
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL
  if (production) return `https://${production}`
  const preview = process.env.VERCEL_URL
  if (preview) return `https://${preview}`
  return "http://127.0.0.1:4327"
}
