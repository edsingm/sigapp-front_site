import type { Metadata } from "next"

import { SITE, SITE_URL } from "@/lib/landing-data"

type PageMetadataInput = {
  title: string
  description: string
  path: `/${string}` | "/"
  absoluteTitle?: boolean
  socialTitle?: string
}

export function absoluteUrl(path: string) {
  return new URL(path, `${SITE_URL}/`).toString()
}

export function createPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  socialTitle,
}: PageMetadataInput): Metadata {
  const resolvedSocialTitle =
    socialTitle ??
    (title.includes(SITE.name) ? title : `${title} · ${SITE.name}`)
  const url = absoluteUrl(path)
  const image = {
    url: absoluteUrl("/opengraph-image"),
    width: 1200,
    height: 630,
    alt: `${SITE.name} — inteligência para incorporadoras`,
  }

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      url,
      siteName: SITE.name,
      title: resolvedSocialTitle,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedSocialTitle,
      description,
      images: [image],
    },
  }
}

export const organizationJsonLd = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl("/icon.svg"),
    width: 512,
    height: 512,
  },
  email: SITE.email,
  contactPoint: {
    "@type": "ContactPoint",
    email: SITE.email,
    contactType: "sales",
    areaServed: "BR",
    availableLanguage: "pt-BR",
  },
}

export const websiteJsonLd = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE.name,
  alternateName: "SIGAPP",
  inLanguage: "pt-BR",
  publisher: { "@id": `${SITE_URL}/#organization` },
}
