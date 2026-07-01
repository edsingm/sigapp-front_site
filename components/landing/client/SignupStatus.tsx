"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { CheckCircle2, Loader2, ArrowRight, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LINKS } from "@/lib/landing-data"
import { fetchSignupStatus } from "@/lib/api"

type Props = { sessionId: string }

type Phase = "provisioning" | "ready" | "timeout"

const MAX_ATTEMPTS = 40 // ~100s a cada 2.5s
const INTERVAL_MS = 2500

export function SignupStatus({ sessionId }: Props) {
  const [phase, setPhase] = useState<Phase>("provisioning")
  const attempts = useRef(0)

  useEffect(() => {
    let active = true
    let timer: ReturnType<typeof setTimeout>

    async function poll() {
      const data = await fetchSignupStatus(sessionId)
      if (!active) return

      if (data?.is_ready) {
        setPhase("ready")
        return
      }

      attempts.current += 1
      if (attempts.current >= MAX_ATTEMPTS) {
        setPhase("timeout")
        return
      }
      timer = setTimeout(poll, INTERVAL_MS)
    }

    poll()
    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [sessionId])

  return (
    <main className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-background px-5 py-16">
      <div className="bg-dot-pattern pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)] opacity-[0.5]" />

      <Link
        href="/"
        className="absolute top-8 left-1/2 flex -translate-x-1/2 items-center gap-2.5 focus:outline-none"
      >
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
          <svg viewBox="0 0 24 24" className="size-4 text-primary" fill="none">
            <polygon
              points="12,2 22,7 22,17 12,22 2,17 2,7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
              className="fill-primary/15"
            />
          </svg>
        </div>
        <span className="font-heading text-lg font-extrabold tracking-tight text-foreground">
          SIGAPP
        </span>
      </Link>

      <div className="relative flex max-w-md flex-col items-center text-center">
        {phase === "ready" ? (
          <>
            <span className="flex size-14 items-center justify-center rounded-full bg-[var(--color-data-green)]/12 text-[var(--color-data-green)]">
              <CheckCircle2 className="size-7" />
            </span>
            <h1 className="mt-5 font-heading text-2xl font-black tracking-tight text-foreground md:text-3xl">
              Conta criada com sucesso!
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Seu pagamento foi confirmado e seu ambiente está pronto. Faça
              login para começar a calcular viabilidade.
            </p>
            <Button
              variant="brand"
              size="lg"
              nativeButton={false}
              className="mt-6 h-12 gap-2 px-6 text-base font-semibold"
              render={<a href={LINKS.login} />}
            >
              Acessar minha conta
              <ArrowRight className="size-4" />
            </Button>
          </>
        ) : phase === "timeout" ? (
          <>
            <span className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <AlertCircle className="size-7" />
            </span>
            <h1 className="mt-5 font-heading text-2xl font-black tracking-tight text-foreground md:text-3xl">
              Quase lá…
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Seu pagamento foi recebido e estamos finalizando a preparação do
              seu ambiente. Isso pode levar mais alguns instantes. Você receberá
              um e-mail assim que estiver tudo pronto.
            </p>
            <Button
              variant="outline"
              size="lg"
              nativeButton={false}
              className="mt-6 h-12 gap-2 px-6 text-base font-semibold"
              render={<a href={LINKS.login} />}
            >
              Ir para o login
              <ArrowRight className="size-4" />
            </Button>
          </>
        ) : (
          <>
            <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Loader2 className="size-7 animate-spin" />
            </span>
            <h1 className="mt-5 font-heading text-2xl font-black tracking-tight text-foreground md:text-3xl">
              Preparando seu ambiente
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Pagamento confirmado. Estamos provisionando sua conta com
              segurança — isso leva apenas alguns segundos. Não feche esta
              página.
            </p>
          </>
        )}
      </div>
    </main>
  )
}
