import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { LandingFooter } from "@/components/landing/layout/LandingFooter"
import { LandingNav } from "@/components/landing/layout/LandingNav"
import { SecondaryPageHero } from "@/components/landing/layout/SecondaryPageHero"
import { LINKS, SOLUTION_PAGES, SOLUTIONS_HUB } from "@/lib/landing-data"
import {
  absoluteUrl,
  breadcrumbJsonLd,
  createPageMetadata,
  jsonLdGraph,
  organizationJsonLd,
  softwareApplicationJsonLd,
  webPageJsonLd,
  websiteJsonLd,
} from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: SOLUTIONS_HUB.seoTitle,
  description: SOLUTIONS_HUB.metaDescription,
  path: "/solucoes",
})

const solutionsHubJsonLd = jsonLdGraph([
  organizationJsonLd,
  websiteJsonLd,
  softwareApplicationJsonLd,
  webPageJsonLd({
    path: "/solucoes",
    name: SOLUTIONS_HUB.seoTitle,
    description: SOLUTIONS_HUB.metaDescription,
    type: "CollectionPage",
  }),
  breadcrumbJsonLd([
    { name: "Início", path: "/" },
    { name: "Soluções", path: "/solucoes" },
  ]),
  {
    "@type": "ItemList",
    name: "Soluções SIGAPP",
    numberOfItems: SOLUTION_PAGES.length,
    itemListElement: SOLUTION_PAGES.map((page, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: page.seoTitle,
      url: absoluteUrl(`/solucoes/${page.slug}`),
      description: page.metaDescription,
    })),
  },
])

export default function SolucoesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(solutionsHubJsonLd),
        }}
      />
      <LandingNav />
      <main id="conteudo-principal" tabIndex={-1} className="solution-page">
        <SecondaryPageHero
          variant="editorial"
          eyebrow={SOLUTIONS_HUB.eyebrow}
          title={SOLUTIONS_HUB.title}
          description={SOLUTIONS_HUB.description}
          breadcrumbs={[
            { label: "Início", href: "/" },
            { label: "Soluções" },
          ]}
        />

        <section
          className="about-principles-stage"
          aria-labelledby="solutions-list"
        >
          <div className="container-landing">
            <header className="about-principles-header">
              <div>
                <span className="editorial-index">01 / Frentes</span>
                <h2 id="solutions-list">Escolha por dor de ofício</h2>
              </div>
              <p>
                Cada página aprofunda uma frente. O dossiê conecta as três no
                mesmo fluxo operacional.
              </p>
            </header>

            <ol className="about-principles-grid">
              {SOLUTION_PAGES.map((page, index) => (
                <li key={page.slug}>
                  <span aria-hidden="true">0{index + 1}</span>
                  <div>
                    <h3>
                      <Link href={`/solucoes/${page.slug}`}>{page.seoTitle}</Link>
                    </h3>
                    <p>{page.description}</p>
                    <Link
                      href={`/solucoes/${page.slug}`}
                      className="solution-card-link"
                    >
                      Ver solução
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="editorial-cta-stage"
          aria-labelledby="solutions-cta-title"
        >
          <div className="container-landing editorial-cta-panel">
            <div>
              <span className="editorial-index">Fluxo completo</span>
              <h2 id="solutions-cta-title">{SOLUTIONS_HUB.ctaTitle}</h2>
            </div>
            <div className="editorial-cta-action">
              <p>{SOLUTIONS_HUB.ctaDescription}</p>
              <div>
                <Link
                  href={LINKS.demo}
                  className="editorial-primary-link"
                  data-analytics-event="demo_request"
                  data-analytics-location="solutions-hub-cta"
                >
                  Solicitar demonstração
                  <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </>
  )
}
