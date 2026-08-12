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
  taxID: SITE.cnpj,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl("/logo-512.png"),
    width: 512,
    height: 512,
  },
  image: absoluteUrl("/logo-512.png"),
  email: SITE.email,
  sameAs: [
    "https://www.instagram.com/sigappbr",
    "https://x.com/sigappbr",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: SITE.email,
    contactType: "sales",
    areaServed: "BR",
    availableLanguage: "pt-BR",
  },
  areaServed: {
    "@type": "Country",
    name: "BR",
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

export const softwareApplicationJsonLd = {
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#software`,
  name: SITE.name,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Real Estate Software",
  operatingSystem: "Web",
  inLanguage: "pt-BR",
  url: SITE_URL,
  description: SITE.description,
  offers: {
    "@type": "Offer",
    priceCurrency: "BRL",
    availability: "https://schema.org/InStock",
    url: absoluteUrl("/#precos"),
  },
  provider: { "@id": `${SITE_URL}/#organization` },
  publisher: { "@id": `${SITE_URL}/#organization` },
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Incorporadoras, loteadoras e construtoras",
  },
  featureList: [
    "Estudo de viabilidade imobiliária",
    "DRE e indicadores (TIR, VPL, ROI)",
    "Comitê de aprovação de terrenos",
    "Gestão territorial e mapas",
    "Legalização e trilha de parecer",
  ],
}

export function webPageJsonLd({
  path,
  name,
  description,
  type = "WebPage",
}: {
  path: `/${string}` | "/"
  name: string
  description: string
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage"
}) {
  const url = absoluteUrl(path)
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "pt-BR",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#software` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  }
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: `/${string}` | "/" }>
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function jsonLdGraph(nodes: Array<Record<string, unknown>>) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  }
}
