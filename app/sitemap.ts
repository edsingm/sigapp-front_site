import type { MetadataRoute } from "next"

import { SITE_URL } from "@/lib/landing-data"
import { BLOG_POSTS } from "@/lib/blog-data"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL },
    { url: `${SITE_URL}/sobre` },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(BLOG_POSTS[0].publishedAt),
    },
    { url: `${SITE_URL}/demonstracao` },
    {
      url: `${SITE_URL}/legal/termos-de-uso`,
      lastModified: new Date("2026-06-07"),
    },
    {
      url: `${SITE_URL}/legal/privacidade`,
      lastModified: new Date("2026-06-07"),
    },
    {
      url: `${SITE_URL}/legal/lgpd`,
      lastModified: new Date("2026-06-07"),
    },
    {
      url: `${SITE_URL}/legal/cookies`,
      lastModified: new Date("2026-06-07"),
    },
  ]

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
  }))

  return [...staticRoutes, ...blogRoutes]
}
