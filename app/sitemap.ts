import type { MetadataRoute } from "next"

import { SITE_URL, SOLUTION_PAGES } from "@/lib/landing-data"
import { BLOG_POSTS } from "@/lib/blog-data"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${SITE_URL}/sobre`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(BLOG_POSTS[0].publishedAt),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/demonstracao`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/solucoes`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/legal/termos-de-uso`,
      lastModified: new Date("2026-06-07"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/legal/privacidade`,
      lastModified: new Date("2026-06-07"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/legal/lgpd`,
      lastModified: new Date("2026-06-07"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/legal/cookies`,
      lastModified: new Date("2026-06-07"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]

  const solutionRoutes: MetadataRoute.Sitemap = SOLUTION_PAGES.map((page) => ({
    url: `${SITE_URL}/solucoes/${page.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }))

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...solutionRoutes, ...blogRoutes]
}
