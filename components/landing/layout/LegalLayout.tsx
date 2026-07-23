import Link from "next/link"
import { ArrowUpRight, Mail, ShieldCheck } from "lucide-react"

import { LandingFooter } from "@/components/landing/layout/LandingFooter"
import { LandingNav } from "@/components/landing/layout/LandingNav"
import { SecondaryPageHero } from "@/components/landing/layout/SecondaryPageHero"

export type LegalSection = {
  id: string
  title: string
}

type LegalLayoutProps = {
  title: string
  description: string
  lastUpdated: string
  sections: LegalSection[]
  children: React.ReactNode
}

const LEGAL_PAGES = [
  { label: "Termos de Uso", href: "/legal/termos-de-uso", match: "Termos" },
  { label: "Privacidade", href: "/legal/privacidade", match: "Privacidade" },
  { label: "LGPD", href: "/legal/lgpd", match: "LGPD" },
  { label: "Cookies", href: "/legal/cookies", match: "Cookies" },
]

export function LegalLayout({
  title,
  description,
  lastUpdated,
  sections,
  children,
}: LegalLayoutProps) {
  return (
    <>
      <LandingNav />
      <main className="legal-page">
        <SecondaryPageHero
          variant="editorial"
          eyebrow="Base legal"
          title={title}
          description={description}
          breadcrumbs={[
            { label: "Início", href: "/" },
            { label: "Legal" },
            { label: title },
          ]}
          afterDescription={
            <dl className="legal-hero-meta">
              <div>
                <dt>Status</dt>
                <dd>
                  <i aria-hidden="true" /> Vigente
                </dd>
              </div>
              <div>
                <dt>Atualização</dt>
                <dd>{lastUpdated}</dd>
              </div>
              <div>
                <dt>Estrutura</dt>
                <dd>{String(sections.length).padStart(2, "0")} seções</dd>
              </div>
            </dl>
          }
        />

        <section className="legal-stage" aria-label={`Conteúdo: ${title}`}>
          <div className="container-landing">
            <nav
              className="legal-document-switcher"
              aria-label="Documentos legais"
            >
              {LEGAL_PAGES.map((page, index) => {
                const isCurrent = title.includes(page.match)

                return (
                  <Link
                    key={page.href}
                    href={page.href}
                    aria-current={isCurrent ? "page" : undefined}
                  >
                    <span aria-hidden="true">0{index + 1}</span>
                    {page.label}
                  </Link>
                )
              })}
            </nav>

            <details className="legal-mobile-toc">
              <summary>Nesta página · {sections.length} seções</summary>
              <nav aria-label="Índice desta página">
                {sections.map((section) => (
                  <a key={section.id} href={`#${section.id}`}>
                    {section.title}
                  </a>
                ))}
              </nav>
            </details>

            <div className="legal-layout-grid">
              <aside className="legal-sidebar">
                <div className="legal-sidebar-index">
                  <span>Índice do documento</span>
                  <nav aria-label="Índice desta página">
                    {sections.map((section, index) => (
                      <a key={section.id} href={`#${section.id}`}>
                        <span aria-hidden="true">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {section.title.replace(/^\d+\.\s*/, "")}
                      </a>
                    ))}
                  </nav>
                </div>

                <div className="legal-dpo-card">
                  <ShieldCheck aria-hidden="true" />
                  <span>Canal de privacidade</span>
                  <strong>Dúvidas ou solicitações?</strong>
                  <p>Fale diretamente com nosso Encarregado de Dados.</p>
                  <a href="mailto:privacidade@sigapp.com.br">
                    <Mail aria-hidden="true" />
                    privacidade@sigapp.com.br
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                </div>
              </aside>

              <article className="legal-document">{children}</article>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </>
  )
}

export function LSection({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="legal-content-section">
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  )
}

export function LP({ children }: { children: React.ReactNode }) {
  return <p className="legal-paragraph">{children}</p>
}

export function LList({ items }: { items: (string | React.ReactNode)[] }) {
  return (
    <ul className="legal-list">
      {items.map((item, index) => (
        <li key={index}>
          <span aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function LSubsection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="legal-subsection">
      <h3>{title}</h3>
      <div>{children}</div>
    </section>
  )
}

export function LHighlight({ children }: { children: React.ReactNode }) {
  return (
    <aside className="legal-highlight">
      <span aria-hidden="true">Leitura essencial</span>
      <p>{children}</p>
    </aside>
  )
}

export function LTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: string[][]
}) {
  return (
    <div className="legal-table-wrap">
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
