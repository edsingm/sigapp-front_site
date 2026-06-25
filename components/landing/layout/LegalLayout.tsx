import Link from "next/link"
import { SecondaryPageHero } from "@/components/landing/layout/SecondaryPageHero"
import { LandingNav } from "@/components/landing/layout/LandingNav"
import { LandingFooter } from "@/components/landing/layout/LandingFooter"
import { cn } from "@/lib/utils"

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
  { label: "Visão Geral", href: "/legal" },
  { label: "Termos de Uso", href: "/legal/termos-de-uso" },
  { label: "Privacidade", href: "/legal/privacidade" },
  { label: "LGPD", href: "/legal/lgpd" },
  { label: "Cookies", href: "/legal/cookies" },
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
      <main>
        {/* Header */}
        <SecondaryPageHero
          eyebrow="Documento legal"
          title={title}
          description={description}
          align="left"
          breadcrumbs={[
            { label: "Início", href: "/" },
            { label: "Legal", href: "/legal" },
            { label: title },
          ]}
          meta={
            <p className="text-xs text-white/56">
              Última atualização:{" "}
              <span className="font-medium text-white/80">{lastUpdated}</span>
            </p>
          }
        />

        <div className="container-landing py-12">
          <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 flex flex-col gap-6">
                {/* Documents nav */}
                <div className="rounded-2xl border border-border bg-card p-4">
                  <p className="mb-2 text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                    Documentos legais
                  </p>
                  <nav className="flex flex-col gap-0.5">
                    {LEGAL_PAGES.map((page) => (
                      <Link
                        key={page.href}
                        href={page.href}
                        className={cn(
                          "rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted hover:text-foreground",
                          "text-muted-foreground"
                        )}
                      >
                        {page.label}
                      </Link>
                    ))}
                  </nav>
                </div>

                {/* Table of contents */}
                {sections.length > 0 && (
                  <div className="rounded-2xl border border-border bg-card p-4">
                    <p className="mb-2 text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                      Nesta página
                    </p>
                    <nav className="flex flex-col gap-0.5">
                      {sections.map((section) => (
                        <a
                          key={section.id}
                          href={`#${section.id}`}
                          className="rounded-md px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                          {section.title}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}

                {/* DPO contact */}
                <div className="rounded-2xl border border-primary/12 bg-accent/50 p-4">
                  <p className="text-xs font-semibold text-foreground">
                    Dúvidas sobre privacidade?
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Entre em contato com nosso Encarregado (DPO).
                  </p>
                  <a
                    href="mailto:privacidade@sigapp.com.br"
                    className="mt-2 block text-xs font-medium text-primary hover:underline"
                  >
                    privacidade@sigapp.com.br
                  </a>
                </div>
              </div>
            </aside>

            {/* Content */}
            <article className="prose-legal min-w-0">{children}</article>
          </div>
        </div>
      </main>
      <LandingFooter />
    </>
  )
}

/* ── Prose components ─────────────────────────────────────────── */

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
    <section id={id} className="mb-10 scroll-mt-24">
      <h2 className="mb-4 border-b border-border pb-2 font-heading text-xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  )
}

export function LP({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm leading-relaxed text-foreground/80">{children}</p>
  )
}

export function LList({ items }: { items: (string | React.ReactNode)[] }) {
  return (
    <ul className="flex flex-col gap-1.5 pl-1">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-2 text-sm text-foreground/80"
        >
          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
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
    <div className="mt-4">
      <h3 className="mb-2 font-heading text-base font-semibold text-foreground">
        {title}
      </h3>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  )
}

export function LHighlight({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-primary/20 bg-accent/40 p-4 text-sm text-foreground/80">
      {children}
    </div>
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
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40">
            {headers.map((h) => (
              <th
                key={h}
                className="px-4 py-2.5 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={cn(
                "border-b border-border/50 last:border-0",
                i % 2 === 0 ? "" : "bg-muted/20"
              )}
            >
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 align-top text-foreground/80">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
