import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react"

import { LandingFooter } from "@/components/landing/layout/LandingFooter"
import { LandingNav } from "@/components/landing/layout/LandingNav"
import { SecondaryPageHero } from "@/components/landing/layout/SecondaryPageHero"
import { ABOUT_PAGE, LINKS } from "@/lib/landing-data"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Sobre a plataforma para incorporadoras",
  description: ABOUT_PAGE.metaDescription,
  path: "/sobre",
})

export default function SobrePage() {
  return (
    <>
      <LandingNav />
      <main id="conteudo-principal" tabIndex={-1} className="about-page">
        <SecondaryPageHero
          variant="editorial"
          eyebrow={ABOUT_PAGE.eyebrow}
          title={ABOUT_PAGE.title}
          description={ABOUT_PAGE.description}
          meta={
            <div className="about-hero-location">
              <MapPin aria-hidden="true" />
              <span>{ABOUT_PAGE.location}</span>
            </div>
          }
        />

        <section
          className="about-mission-stage"
          aria-labelledby="about-mission"
        >
          <div className="container-landing about-mission-grid">
            <div className="about-section-heading">
              <span className="editorial-index">01 / Tese</span>
              <p>{ABOUT_PAGE.missionTitle}</p>
              <h2 id="about-mission">{ABOUT_PAGE.missionLead}</h2>
            </div>

            <div className="about-mission-copy">
              {ABOUT_PAGE.missionBody.map((paragraph, index) => (
                <p
                  key={paragraph.slice(0, 32)}
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
          aria-labelledby="about-principles"
        >
          <div className="container-landing">
            <header className="about-principles-header">
              <div>
                <span className="editorial-index">02 / Princípios</span>
                <h2 id="about-principles">Como decidimos o produto</h2>
              </div>
              <p>
                Quatro critérios para manter tecnologia, governança e operação
                no mesmo eixo.
              </p>
            </header>

            <ol className="about-principles-grid">
              {ABOUT_PAGE.principles.map((item, index) => (
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

        <section className="about-stage" aria-labelledby="about-stage-title">
          <div className="container-landing about-stage-grid">
            <div className="about-stage-copy">
              <span className="editorial-index">03 / Agora</span>
              <p className="about-stage-kicker">{ABOUT_PAGE.stageTitle}</p>
              <h2 id="about-stage-title">{ABOUT_PAGE.stageBody}</h2>
              <ul>
                {ABOUT_PAGE.stagePoints.map((point, index) => (
                  <li key={point}>
                    <span aria-hidden="true">0{index + 1}</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <figure className="about-stage-figure">
              <div className="about-stage-image">
                <Image
                  src="/images/dossie-mesa.jpg"
                  alt="Mesa de trabalho com plantas e documentos de análise imobiliária"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="eager"
                  className="object-cover"
                />
                <span aria-hidden="true">SIG / 03</span>
              </div>
              <figcaption>
                <span>Ofício, não teatro</span>
                <strong>Matéria da decisão no centro da marca</strong>
              </figcaption>
            </figure>
          </div>
        </section>

        <section
          className="editorial-cta-stage"
          aria-labelledby="about-cta-title"
        >
          <div className="container-landing editorial-cta-panel">
            <div>
              <span className="editorial-index">Próximo terreno</span>
              <h2 id="about-cta-title">{ABOUT_PAGE.ctaTitle}</h2>
            </div>
            <div className="editorial-cta-action">
              <p>{ABOUT_PAGE.ctaDescription}</p>
              <div>
                <Link
                  href={LINKS.demo}
                  className="editorial-primary-link"
                  data-analytics-event="demo_request"
                  data-analytics-location="about-cta"
                >
                  {ABOUT_PAGE.ctaPrimary}
                  <ArrowRight aria-hidden="true" />
                </Link>
                <a
                  href={LINKS.sales}
                  className="editorial-secondary-link"
                  data-analytics-event="sales_contact_click"
                  data-analytics-location="about-cta"
                >
                  {ABOUT_PAGE.ctaSecondary}
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
