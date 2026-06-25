import type { Metadata } from "next"
import Link from "next/link"
import { LandingNav } from "@/components/landing/layout/LandingNav"
import { LandingFooter } from "@/components/landing/layout/LandingFooter"
import { SecondaryPageHero } from "@/components/landing/layout/SecondaryPageHero"
import { FileText, Shield, Lock, Cookie, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Central Legal — SIGAPP",
  description:
    "Documentos legais do SIGAPP: Termos de Uso, Política de Privacidade, LGPD e Política de Cookies.",
}

const LEGAL_DOCS = [
  {
    icon: FileText,
    title: "Termos de Uso",
    description:
      "As condições que regem o uso da plataforma SIGAPP, incluindo direitos, obrigações, planos e limitação de responsabilidade.",
    href: "/legal/termos-de-uso",
    updated: "07 de junho de 2026",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Shield,
    title: "Política de Privacidade",
    description:
      "Como coletamos, utilizamos e protegemos seus dados pessoais, em conformidade com a LGPD (Lei 13.709/2018).",
    href: "/legal/privacidade",
    updated: "07 de junho de 2026",
    color: "bg-accent text-primary",
  },
  {
    icon: Lock,
    title: "LGPD — Seus Direitos",
    description:
      "Informações específicas sobre como exercer seus direitos como titular de dados pessoais conforme a Lei Geral de Proteção de Dados.",
    href: "/legal/lgpd",
    updated: "07 de junho de 2026",
    color: "bg-primary/12 text-primary",
  },
  {
    icon: Cookie,
    title: "Política de Cookies",
    description:
      "Quais cookies utilizamos, para quê servem e como você pode gerenciar suas preferências de rastreamento.",
    href: "/legal/cookies",
    updated: "07 de junho de 2026",
    color: "bg-muted text-foreground/70",
  },
]

export default function LegalPage() {
  return (
    <>
      <LandingNav />
      <main>
        {/* Header */}
        <SecondaryPageHero
          eyebrow="Central legal"
          title="Transparência, privacidade e governança sem ruído"
          description="Aqui estão os documentos que regem o uso do SIGAPP, o tratamento de dados pessoais e a forma como operamos com responsabilidade."
          align="left"
          breadcrumbs={[{ label: "Início", href: "/" }, { label: "Legal" }]}
        />

        {/* Documents */}
        <section className="py-16">
          <div className="container-landing">
            <div className="grid gap-6 sm:grid-cols-2">
              {LEGAL_DOCS.map((doc) => {
                const Icon = doc.icon
                return (
                  <Link
                    key={doc.href}
                    href={doc.href}
                    className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className={`flex size-10 items-center justify-center rounded-xl ${doc.color}`}
                      >
                        <Icon className="size-5" strokeWidth={1.75} />
                      </div>
                      <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
                    </div>
                    <div>
                      <h2 className="font-heading text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                        {doc.title}
                      </h2>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {doc.description}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground/60">
                      Atualizado em {doc.updated}
                    </p>
                  </Link>
                )
              })}
            </div>

            {/* Contact */}
            <div className="mt-10 rounded-2xl border border-primary/12 bg-accent/40 p-6">
              <h2 className="font-heading text-base font-bold text-foreground">
                Dúvidas sobre privacidade ou termos?
              </h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Entre em contato com nosso Encarregado de Dados (DPO) ou com o
                time jurídico.
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">
                    DPO / Privacidade:{" "}
                  </span>
                  <a
                    href="mailto:privacidade@sigapp.com.br"
                    className="font-medium text-primary hover:underline"
                  >
                    privacidade@sigapp.com.br
                  </a>
                </div>
                <div>
                  <span className="text-muted-foreground">Jurídico: </span>
                  <a
                    href="mailto:juridico@sigapp.com.br"
                    className="font-medium text-primary hover:underline"
                  >
                    juridico@sigapp.com.br
                  </a>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                <strong className="text-foreground">
                  SIGAPP Tecnologia Ltda.
                </strong>{" "}
                · CNPJ 00.000.000/0001-00 · Av. Paulista, 1234, Conjunto 56 ·
                São Paulo, SP · CEP 01310-100
              </p>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </>
  )
}
