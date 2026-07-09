import type { Metadata } from "next"
import Link from "next/link"

import { LandingNav } from "@/components/landing/layout/LandingNav"
import { LandingFooter } from "@/components/landing/layout/LandingFooter"
import { DemoRequestForm } from "@/components/landing/client/DemoRequestForm"
import { DEMO_PAGE, LINKS } from "@/lib/landing-data"
import { SectionLabel } from "@/components/landing/ui/SectionLabel"

export const metadata: Metadata = {
  title: "Solicitar demonstração",
  description: DEMO_PAGE.description,
  alternates: { canonical: "/demonstracao" },
}

export default function DemonstracaoPage() {
  return (
    <>
      <LandingNav />
      <main>
        <section className="relative overflow-hidden border-b border-border bg-background pt-28 pb-20 md:pt-32 md:pb-28">
          <div className="container-landing">
            <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="flex flex-col gap-6 lg:col-span-5 lg:sticky lg:top-28">
                <SectionLabel>{DEMO_PAGE.eyebrow}</SectionLabel>
                <h1 className="font-heading text-3xl leading-[1.05] font-bold tracking-tight text-balance text-foreground md:text-4xl lg:text-5xl">
                  {DEMO_PAGE.title}
                </h1>
                <p className="max-w-[42ch] text-base leading-relaxed text-muted-foreground md:text-lg">
                  {DEMO_PAGE.description}
                </p>

                <ul className="mt-2 flex flex-col gap-5 border-t border-border pt-6">
                  {DEMO_PAGE.sidePoints.map((point) => (
                    <li key={point.title} className="grid gap-1">
                      <p className="font-heading text-sm font-semibold text-foreground">
                        {point.title}
                      </p>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {point.text}
                      </p>
                    </li>
                  ))}
                </ul>

                <p className="coord text-muted-foreground">
                  Prefere e-mail?{" "}
                  <a
                    href={LINKS.demoEmail}
                    className="text-foreground underline underline-offset-2"
                  >
                    contato@sigapp.com.br
                  </a>
                </p>
              </div>

              <div className="lg:col-span-7">
                <DemoRequestForm />
                <p className="mt-5 text-center text-sm text-muted-foreground">
                  Já tem conta?{" "}
                  <Link
                    href={LINKS.login}
                    className="font-medium text-foreground underline underline-offset-2"
                  >
                    Entrar
                  </Link>
                  {" · "}
                  <Link
                    href={LINKS.signup}
                    className="font-medium text-foreground underline underline-offset-2"
                  >
                    Criar conta
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </>
  )
}
