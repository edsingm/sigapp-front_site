import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, ArrowUpRight } from "lucide-react"

import { LandingFooter } from "@/components/landing/layout/LandingFooter"
import { LandingNav } from "@/components/landing/layout/LandingNav"
import { SecondaryPageHero } from "@/components/landing/layout/SecondaryPageHero"
import { BLOG_POSTS } from "@/lib/blog-data"
import {
  getSolutionBySlug,
  LINKS,
  SOLUTION_PAGES,
} from "@/lib/landing-data"
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

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return SOLUTION_PAGES.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = getSolutionBySlug(slug)

  if (!page) return { title: "Solução não encontrada" }

  return createPageMetadata({
    title: page.seoTitle,
    description: page.metaDescription,
    path: `/solucoes/${page.slug}`,
  })
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params
  const page = getSolutionBySlug(slug)

  if (!page) notFound()

  const relatedPosts = page.relatedBlogSlugs
    .map((relatedSlug) => BLOG_POSTS.find((post) => post.slug === relatedSlug))
    .filter((post): post is NonNullable<typeof post> => Boolean(post))

  const otherSolutions = SOLUTION_PAGES.filter((item) => item.slug !== page.slug)

  const solutionJsonLd = jsonLdGraph([
    organizationJsonLd,
    websiteJsonLd,
    softwareApplicationJsonLd,
    webPageJsonLd({
      path: `/solucoes/${page.slug}`,
      name: page.seoTitle,
      description: page.metaDescription,
    }),
    breadcrumbJsonLd([
      { name: "Início", path: "/" },
      { name: "Soluções", path: "/solucoes" },
      { name: page.seoTitle, path: `/solucoes/${page.slug}` },
    ]),
    {
      "@type": "Service",
      "@id": `${absoluteUrl(`/solucoes/${page.slug}`)}#service`,
      name: page.seoTitle,
      description: page.metaDescription,
      url: absoluteUrl(`/solucoes/${page.slug}`),
      provider: { "@id": `${absoluteUrl("/")}#organization` },
      areaServed: "BR",
      serviceType: page.seoTitle,
    },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(solutionJsonLd) }}
      />
      <LandingNav />
      <main id="conteudo-principal" tabIndex={-1} className="solution-page">
        <SecondaryPageHero
          variant="editorial"
          eyebrow={page.eyebrow}
          title={page.title}
          description={page.description}
          breadcrumbs={[
            { label: "Início", href: "/" },
            { label: "Soluções", href: "/solucoes" },
            { label: page.seoTitle },
          ]}
        />

        <section
          className="about-mission-stage"
          aria-labelledby="solution-problem"
        >
          <div className="container-landing about-mission-grid">
            <div className="about-section-heading">
              <span className="editorial-index">01 / {page.problemTitle}</span>
              <p>{page.eyebrow}</p>
              <h2 id="solution-problem">{page.problemLead}</h2>
            </div>
            <div className="about-mission-copy">
              {page.problemBody.map((paragraph, index) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className={index === 0 ? "is-lead" : undefined}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section
          className="about-principles-stage"
          aria-labelledby="solution-outcomes"
        >
          <div className="container-landing">
            <header className="about-principles-header">
              <div>
                <span className="editorial-index">02 / Resultados</span>
                <h2 id="solution-outcomes">{page.outcomesTitle}</h2>
              </div>
              <p>
                O que a operação ganha quando a frente deixa de viver em
                planilha paralela.
              </p>
            </header>
            <ol className="about-principles-grid">
              {page.outcomes.map((item, index) => (
                <li key={item.title}>
                  <span aria-hidden="true">0{index + 1}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="about-stage" aria-labelledby="solution-how">
          <div className="container-landing about-stage-grid">
            <div className="about-stage-copy">
              <span className="editorial-index">03 / Fluxo</span>
              <p className="about-stage-kicker">Como funciona</p>
              <h2 id="solution-how">{page.howTitle}</h2>
              <ul>
                {page.howSteps.map((step, index) => (
                  <li key={step.title}>
                    <span aria-hidden="true">0{index + 1}</span>
                    {`${step.title}: ${step.description}`}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {relatedPosts.length > 0 ? (
          <section
            className="blog-archive-stage"
            aria-labelledby="solution-related"
          >
            <div className="container-landing">
              <header className="blog-section-header">
                <div>
                  <span className="editorial-index">04 / Leituras</span>
                  <h2 id="solution-related">Artigos relacionados</h2>
                </div>
                <p>Contexto de domínio para a mesma frente de decisão.</p>
              </header>
              <div className="blog-archive-list">
                {relatedPosts.map((post, index) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="blog-archive-row"
                  >
                    <span className="blog-archive-index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="blog-archive-title">
                      <div className="blog-post-meta">
                        <span>{post.category}</span>
                      </div>
                      <h3>{post.title}</h3>
                    </div>
                    <p>{post.excerpt}</p>
                    <div className="blog-archive-action">
                      <span>{post.readTime} min</span>
                      <ArrowRight aria-hidden="true" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {otherSolutions.length > 0 ? (
          <section
            className="about-principles-stage"
            aria-labelledby="solution-siblings"
          >
            <div className="container-landing">
              <header className="about-principles-header">
                <div>
                  <span className="editorial-index">05 / Também no dossiê</span>
                  <h2 id="solution-siblings">Outras frentes</h2>
                </div>
                <p>
                  <Link href="/solucoes">Ver todas as soluções</Link>
                </p>
              </header>
              <ol className="about-principles-grid">
                {otherSolutions.map((item, index) => (
                  <li key={item.slug}>
                    <span aria-hidden="true">0{index + 1}</span>
                    <div>
                      <h3>
                        <Link href={`/solucoes/${item.slug}`}>
                          {item.seoTitle}
                        </Link>
                      </h3>
                      <p>{item.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        ) : null}

        <section
          className="editorial-cta-stage"
          aria-labelledby="solution-cta-title"
        >
          <div className="container-landing editorial-cta-panel">
            <div>
              <span className="editorial-index">Próximo passo</span>
              <h2 id="solution-cta-title">{page.ctaTitle}</h2>
            </div>
            <div className="editorial-cta-action">
              <p>{page.ctaDescription}</p>
              <div>
                <Link
                  href={LINKS.demo}
                  className="editorial-primary-link"
                  data-analytics-event="demo_request"
                  data-analytics-location={`solution-${page.slug}`}
                >
                  Solicitar demonstração
                  <ArrowRight aria-hidden="true" />
                </Link>
                <a
                  href={LINKS.sales}
                  className="editorial-secondary-link"
                  data-analytics-event="sales_contact_click"
                  data-analytics-location={`solution-${page.slug}`}
                >
                  Falar com vendas
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </>
  )
}
