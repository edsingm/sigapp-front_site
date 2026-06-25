"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import {
  Cookie,
  X,
  ChevronRight,
  Shield,
  BarChart2,
  Megaphone,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  getConsent,
  saveConsent,
  sendConsentToBackend,
  DEFAULT_CATEGORIES,
  type CookieCategories,
} from "@/lib/cookie-consent"

type View = "hidden" | "banner" | "modal"

type CategoryDef = {
  key: keyof CookieCategories
  label: string
  description: string
  required: boolean
  icon: React.ElementType
}

const CATEGORIES: CategoryDef[] = [
  {
    key: "functional",
    label: "Funcionais",
    description:
      "Lembram preferências de interface e operação, como último tenant acessado, estado do menu e escolhas de navegação. Não requerem consentimento para os estritamente necessários, mas incluímos aqui para transparência.",
    required: false,
    icon: Shield,
  },
  {
    key: "analytics",
    label: "Analíticos",
    description:
      "Coletam dados anonimizados de uso para identificar problemas e melhorar a Plataforma. Não identificamos você individualmente. Você pode recusar sem perder funcionalidades.",
    required: false,
    icon: BarChart2,
  },
  {
    key: "marketing",
    label: "Marketing",
    description:
      "Medem a efetividade de campanhas pagas (Google Ads, Meta). Usados apenas no site institucional. Você pode recusar sem qualquer impacto no uso da Plataforma.",
    required: false,
    icon: Megaphone,
  },
]

function Toggle({
  checked,
  disabled,
  onChange,
}: {
  checked: boolean
  disabled?: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none",
        checked ? "bg-primary" : "bg-muted-foreground/30",
        disabled && "cursor-not-allowed opacity-60"
      )}
    >
      <span
        className={cn(
          "pointer-events-none block size-4 rounded-full bg-white shadow-md ring-0 transition-transform duration-200",
          checked ? "translate-x-4" : "translate-x-0"
        )}
      />
    </button>
  )
}

export function CookieBanner() {
  const [view, setView] = useState<View>("hidden")
  const [categories, setCategories] = useState<CookieCategories>(
    () => getConsent()?.categories ?? DEFAULT_CATEGORIES
  )

  useEffect(() => {
    if (!getConsent()) {
      // pequeno delay para não piscar na hidratação
      const t = setTimeout(() => setView("banner"), 600)
      return () => clearTimeout(t)
    }
  }, [])

  useEffect(() => {
    const handler = () => {
      const current = getConsent()
      if (current) setCategories(current.categories)
      setView("modal")
    }
    window.addEventListener("sigapp:open-cookie-prefs", handler)
    return () => window.removeEventListener("sigapp:open-cookie-prefs", handler)
  }, [])

  const acceptAll = useCallback(() => {
    const all: CookieCategories = {
      functional: true,
      analytics: true,
      marketing: true,
    }
    const consent = saveConsent(all)
    void sendConsentToBackend(consent)
    setCategories(all)
    setView("hidden")
  }, [])

  const acceptNecessary = useCallback(() => {
    const minimal: CookieCategories = {
      functional: false,
      analytics: false,
      marketing: false,
    }
    const consent = saveConsent(minimal)
    void sendConsentToBackend(consent)
    setCategories(minimal)
    setView("hidden")
  }, [])

  const savePreferences = useCallback(() => {
    const consent = saveConsent(categories)
    void sendConsentToBackend(consent)
    setView("hidden")
  }, [categories])

  const toggleCategory = (key: keyof CookieCategories, value: boolean) => {
    setCategories((prev) => ({ ...prev, [key]: value }))
  }

  if (view === "hidden") return null

  return (
    <>
      {/* ── OVERLAY (modal only) ──────────────────────────────── */}
      {view === "modal" && (
        <div
          className="fixed inset-0 z-60 bg-foreground/40 backdrop-blur-sm"
          onClick={() => {
            // fechar só se já havia consentimento
            if (getConsent()) setView("hidden")
          }}
        />
      )}

      {/* ── BANNER ───────────────────────────────────────────── */}
      {view === "banner" && (
        <div className="fixed right-0 bottom-0 left-0 z-50 border-t border-border bg-background/95 shadow-2xl backdrop-blur-md">
          <div className="container-landing py-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Cookie className="size-4 text-primary" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Usamos cookies neste site
                  </p>
                  <p className="mt-0.5 max-w-[55ch] text-xs leading-relaxed text-muted-foreground">
                    Cookies essenciais garantem o funcionamento. Com seu
                    consentimento, usamos cookies analíticos e de marketing.{" "}
                    <Link
                      href="/legal/cookies"
                      className="font-medium text-primary hover:underline"
                    >
                      Saiba mais
                    </Link>
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-2">
                <button
                  onClick={() => setView("modal")}
                  className="flex min-h-11 items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground/76 transition-colors hover:border-foreground/20 hover:text-foreground"
                >
                  Personalizar
                  <ChevronRight className="size-3" />
                </button>
                <button
                  onClick={acceptNecessary}
                  className="min-h-11 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground/76 transition-colors hover:border-foreground/20 hover:text-foreground"
                >
                  Apenas necessários
                </button>
                <button
                  onClick={acceptAll}
                  className="flex min-h-11 items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <Check className="size-3" />
                  Aceitar todos
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL DE PREFERÊNCIAS ────────────────────────────── */}
      {view === "modal" && (
        <div className="fixed inset-x-4 bottom-4 z-70 mx-auto max-w-lg rounded-2xl border border-border bg-background shadow-2xl sm:inset-x-auto sm:left-1/2 sm:w-full sm:-translate-x-1/2">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div className="flex items-center gap-2.5">
              <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10">
                <Cookie className="size-3.5 text-primary" strokeWidth={1.75} />
              </div>
              <h2 className="font-heading text-base font-bold text-foreground">
                Preferências de Cookies
              </h2>
            </div>
            {getConsent() && (
              <button
                onClick={() => setView("hidden")}
                className="flex size-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {/* Body */}
          <div className="max-h-[60vh] overflow-y-auto px-5 py-4">
            <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
              Escolha quais categorias de cookies você permite. Cookies
              estritamente necessários (autenticação, segurança e consentimento)
              não podem ser desativados pois são indispensáveis ao funcionamento
              da Plataforma.{" "}
              <Link
                href="/legal/cookies"
                className="font-medium text-primary hover:underline"
              >
                Ver política completa
              </Link>
            </p>

            {/* Necessários (sempre ligados) */}
            <div className="mb-3 flex items-start justify-between gap-4 rounded-xl border border-border bg-muted/30 p-3.5">
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/10">
                  <Shield
                    className="size-3.5 text-primary"
                    strokeWidth={1.75}
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    Estritamente necessários
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    Sessão, CSRF e consentimento. Indispensáveis — não é
                    possível desativá-los.
                  </p>
                </div>
              </div>
              <div className="shrink-0 pt-0.5">
                <Toggle checked disabled onChange={() => {}} />
              </div>
            </div>

            {/* Categorias configuráveis */}
            <div className="flex flex-col gap-3">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon
                return (
                  <div
                    key={cat.key}
                    className="flex items-start justify-between gap-4 rounded-xl border border-border p-3.5 transition-colors hover:bg-muted/20"
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-muted">
                        <Icon
                          className="size-3.5 text-muted-foreground"
                          strokeWidth={1.75}
                        />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground">
                          {cat.label}
                        </p>
                        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                          {cat.description}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 pt-0.5">
                      <Toggle
                        checked={categories[cat.key]}
                        onChange={(v) => toggleCategory(cat.key, v)}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-2 border-t border-border px-5 py-4 sm:flex-row">
            <button
              onClick={acceptNecessary}
              className="min-h-11 flex-1 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground/76 transition-colors hover:border-foreground/20 hover:text-foreground"
            >
              Apenas necessários
            </button>
            <button
              onClick={savePreferences}
              className="min-h-11 flex-1 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
            >
              Salvar preferências
            </button>
            <button
              onClick={acceptAll}
              className="min-h-11 flex-1 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Aceitar todos
            </button>
          </div>
        </div>
      )}
    </>
  )
}
