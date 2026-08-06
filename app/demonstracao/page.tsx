import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Mail } from "lucide-react"

import { DemoRequestForm } from "@/components/landing/client/DemoRequestForm"
import { LandingFooter } from "@/components/landing/layout/LandingFooter"
import { LandingNav } from "@/components/landing/layout/LandingNav"
import { DEMO_PAGE, LINKS, SITE } from "@/lib/landing-data"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Demonstração do software para incorporadoras",
  description: DEMO_PAGE.description,
  path: "/demonstracao",
})

export default function DemonstracaoPage() {
  return (
    <>
      <LandingNav />
      <main id="conteudo-principal" tabIndex={-1} className="demo-page">
        <section className="demo-stage" aria-labelledby="demo-title">
          <div className="demo-stage-grid" aria-hidden="true" />
          <div className="container-landing demo-shell">
            <header className="demo-intro">
              <span className="demo-eyebrow">{DEMO_PAGE.eyebrow}</span>
              <h1 id="demo-title">{DEMO_PAGE.title}</h1>
              <p className="demo-description">{DEMO_PAGE.description}</p>

              <dl className="demo-session-specs">
                <div>
                  <dt>Duração</dt>
                  <dd>≈ 40 min</dd>
                </div>
                <div>
                  <dt>Fluxo</dt>
                  <dd>03 etapas</dd>
                </div>
                <div>
                  <dt>Formato</dt>
                  <dd>01 caso real</dd>
                </div>
              </dl>

              <ol className="demo-proof-list">
                {DEMO_PAGE.sidePoints.map((point, index) => (
                  <li key={point.title}>
                    <span aria-hidden="true">0{index + 1}</span>
                    <div>
                      <h2>{point.title}</h2>
                      <p>{point.text}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <a href={LINKS.demoEmail} className="demo-email-link">
                <Mail aria-hidden="true" />
                <span>
                  <small>Prefere escrever?</small>
                  {SITE.email}
                </span>
                <ArrowUpRight aria-hidden="true" />
              </a>
            </header>

            <div className="demo-form-region">
              <div className="demo-form-status" aria-hidden="true">
                <span>
                  <i /> Agenda de decisão
                </span>
                <span>SIG / DEMO</span>
              </div>
              <DemoRequestForm />
              <p className="demo-account-links">
                Já tem conta? <Link href={LINKS.login}>Entrar</Link>
                <span aria-hidden="true">/</span>
                <Link href={LINKS.signup}>Criar conta</Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </>
  )
}
