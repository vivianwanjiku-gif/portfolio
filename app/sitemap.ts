import type { MetadataRoute } from "next"
import { getSiteUrl } from "@/lib/site-url"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: getSiteUrl(),
      lastModified: "2026-10-20",
      changeFrequency: "weekly",
      priority: 1,
    },
  ]
}
