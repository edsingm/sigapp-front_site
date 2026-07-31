import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { LandingNav } from "@/components/landing/layout/LandingNav"
import { LandingFooter } from "@/components/landing/layout/LandingFooter"
import { CadastralMapBackdrop } from "@/components/landing/ui/CadastralMapBackdrop"

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false },
}

export default function NotFound() {
  return (
    <>
      <LandingNav />
      <main
        id="conteudo-principal"
        tabIndex={-1}
        className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-background px-4 pt-28 pb-20 text-center"
      >
        <CadastralMapBackdrop className="opacity-35 dark:opacity-25" />
        <div className="relative flex flex-col items-center gap-6">
          <span className="eyebrow eyebrow--center text-[var(--landing-accent-strong)]">
            Erro 404
          </span>
          <h1 className="font-heading text-4xl leading-[1.02] font-bold tracking-tight text-balance text-foreground sm:text-5xl">
            Coordenada não encontrada.
          </h1>
          <p className="max-w-[42ch] text-pretty text-muted-foreground md:text-lg">
            O endereço que você procura está fora da área mapeada. Volte à base
            para continuar a análise.
          </p>
          <p className="data-mono text-xs text-muted-foreground/70">
            LAT — · LON — · Setor desconhecido
          </p>
          <Button
            size="lg"
            className="h-12 gap-2 rounded-xl px-6 text-base font-semibold"
            nativeButton={false}
            render={<Link href="/" />}
          >
            <ArrowLeft className="size-4" />
            Voltar ao início
          </Button>
        </div>
      </main>
      <LandingFooter />
    </>
  )
}
