"use client"

import { useEffect, useRef, useState } from "react"
import {
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
  ShieldCheck,
} from "lucide-react"

import { SignupBrand } from "@/components/landing/ui/SignupBrand"
import { fetchSignupStatus } from "@/lib/api"
import { LINKS } from "@/lib/landing-data"
import { cn } from "@/lib/utils"

type Props = { sessionId: string }
type Phase = "provisioning" | "ready" | "timeout"

const MAX_ATTEMPTS = 40
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

    void poll()
    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [sessionId])

  const content =
    phase === "ready"
      ? {
          eyebrow: "Ambiente liberado",
          title: "Sua operação está pronta.",
          description:
            "O pagamento foi confirmado e o ambiente já pode receber sua primeira oportunidade.",
          status: "Concluído",
          icon: CheckCircle2,
          action: "Acessar minha conta",
        }
      : phase === "timeout"
        ? {
            eyebrow: "Preparação estendida",
            title: "Seu ambiente está quase lá.",
            description:
              "O pagamento foi recebido. A configuração continua em segundo plano e você será avisado por e-mail assim que o acesso estiver pronto.",
            status: "Em processamento",
            icon: AlertCircle,
            action: "Ir para o login",
          }
        : {
            eyebrow: "Provisionamento seguro",
            title: "Estamos preparando seu território.",
            description:
              "Pagamento confirmado. Agora conectamos plano, permissões e ambiente para sua equipe começar com contexto.",
            status: "Sincronizando",
            icon: Loader2,
            action: null,
          }

  const StatusIcon = content.icon

  return (
    <main className="signup-status-stage" data-phase={phase}>
      <div className="signup-status-grid" aria-hidden="true" />
      <div className="signup-status-orbit" aria-hidden="true" />

      <header className="signup-status-header">
        <SignupBrand tone="on-dark" />
        <span>
          <ShieldCheck aria-hidden="true" />
          Retorno protegido
        </span>
      </header>

      <section
        className="signup-status-card"
        aria-live="polite"
        aria-labelledby="signup-status-title"
      >
        <header>
          <span>Ativação da conta</span>
          <strong>{content.status}</strong>
        </header>

        <div className="signup-status-content">
          <span className="signup-status-icon">
            <StatusIcon
              className={cn(phase === "provisioning" && "animate-spin")}
              aria-hidden="true"
            />
          </span>
          <p>{content.eyebrow}</p>
          <h1 id="signup-status-title">{content.title}</h1>
          <p>{content.description}</p>

          {content.action ? (
            <a href={LINKS.login} className="signup-status-action">
              {content.action}
              <ArrowRight aria-hidden="true" />
            </a>
          ) : (
            <div className="signup-status-pulse" role="status">
              <i aria-hidden="true" />
              Você pode manter esta página aberta
            </div>
          )}
        </div>

        <ol className="signup-status-route" aria-label="Etapas da ativação">
          <li className="is-complete">
            <span>
              <Check aria-hidden="true" />
            </span>
            <div>
              <small>01</small>
              <strong>Pagamento</strong>
            </div>
          </li>
          <li className={cn(phase === "ready" ? "is-complete" : "is-active")}>
            <span>
              {phase === "ready" ? (
                <Check aria-hidden="true" />
              ) : (
                <Loader2 className="animate-spin" aria-hidden="true" />
              )}
            </span>
            <div>
              <small>02</small>
              <strong>Ambiente</strong>
            </div>
          </li>
          <li className={cn(phase === "ready" && "is-complete")}>
            <span>
              {phase === "ready" ? <Check aria-hidden="true" /> : "03"}
            </span>
            <div>
              <small>03</small>
              <strong>Acesso</strong>
            </div>
          </li>
        </ol>
      </section>

      <footer className="signup-status-footer">
        <span>Não feche durante a sincronização</span>
        <strong>SIGAPP / Ativação 01</strong>
      </footer>
    </main>
  )
}
