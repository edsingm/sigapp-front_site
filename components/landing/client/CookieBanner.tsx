"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  Check,
  Cookie,
  LockKeyhole,
  Megaphone,
  ShieldCheck,
  SlidersHorizontal,
  X,
} from "lucide-react"

import {
  DEFAULT_CATEGORIES,
  getConsent,
  saveConsent,
  sendConsentToBackend,
  type CookieCategories,
} from "@/lib/cookie-consent"
import {
  applyGtagConsentUpdate,
  clearVendorCookies,
  hasRevokedOptionalConsent,
} from "@/lib/consent-mode"
import { cn } from "@/lib/utils"

type View = "hidden" | "banner" | "modal"

type CategoryDef = {
  key: keyof CookieCategories
  label: string
  description: string
  icon: React.ElementType
}

const CATEGORIES: CategoryDef[] = [
  {
    key: "functional",
    label: "Funcionais",
    description:
      "Lembram a preferência de tema (claro/escuro) no navegador.",
    icon: ShieldCheck,
  },
  {
    key: "analytics",
    label: "Analíticos",
    description:
      "Geram dados agregados de uso para identificar problemas e melhorar a experiência.",
    icon: BarChart3,
  },
  {
    key: "marketing",
    label: "Marketing",
    description:
      "Medem campanhas no site institucional. Não interferem no uso da plataforma.",
    icon: Megaphone,
  },
]

function Toggle({
  checked,
  disabled = false,
  label,
  onChange,
}: {
  checked: boolean
  disabled?: boolean
  label: string
  onChange: (value: boolean) => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "cookie-toggle",
        checked && "is-checked",
        disabled && "is-disabled"
      )}
    >
      <span />
    </button>
  )
}

export function CookieBanner() {
  const [view, setView] = useState<View>("hidden")
  const [categories, setCategories] = useState<CookieCategories>(
    () => getConsent()?.categories ?? DEFAULT_CATEGORIES
  )
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const openPreferences = useCallback(() => {
    const current = getConsent()
    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null
    setCategories(current?.categories ?? DEFAULT_CATEGORIES)
    setView("modal")
  }, [])

  const closePreferences = useCallback(() => {
    const hasConsent = Boolean(getConsent())
    const previousFocus = previousFocusRef.current
    setView(hasConsent ? "hidden" : "banner")

    requestAnimationFrame(() => {
      const fallback = document.querySelector<HTMLElement>(
        ".cookie-banner-customize"
      )
      const target = previousFocus?.isConnected ? previousFocus : fallback
      target?.focus()
    })
  }, [])

  useEffect(() => {
    if (getConsent()) return

    const timer = window.setTimeout(() => setView("banner"), 600)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handler = () => openPreferences()
    window.addEventListener("sigapp:open-cookie-prefs", handler)
    return () => window.removeEventListener("sigapp:open-cookie-prefs", handler)
  }, [openPreferences])

  useEffect(() => {
    if (view !== "modal") return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const dialog = modalRef.current
    const focusableSelector =
      'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    const firstFocusable = dialog?.querySelector<HTMLElement>(focusableSelector)
    firstFocusable?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        closePreferences()
        return
      }

      if (event.key !== "Tab" || !dialog) return

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(focusableSelector)
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [closePreferences, view])

  const persistConsent = useCallback((next: CookieCategories) => {
    const previous = getConsent()?.categories ?? null
    const revoked = hasRevokedOptionalConsent(previous, next)
    const consent = saveConsent(next)
    void sendConsentToBackend(consent)
    applyGtagConsentUpdate(next)
    setCategories(next)
    setView("hidden")
    if (revoked) {
      clearVendorCookies()
      window.location.reload()
    }
  }, [])

  const acceptAll = useCallback(() => {
    persistConsent({ functional: true, analytics: true, marketing: true })
  }, [persistConsent])

  const acceptNecessary = useCallback(() => {
    persistConsent({ functional: false, analytics: false, marketing: false })
  }, [persistConsent])

  const savePreferences = useCallback(() => {
    persistConsent(categories)
  }, [categories, persistConsent])

  const toggleCategory = (key: keyof CookieCategories, value: boolean) => {
    setCategories((current) => ({ ...current, [key]: value }))
  }

  if (view === "hidden") return null

  return (
    <>
      {view === "banner" ? (
        <section
          className="cookie-banner"
          role="region"
          aria-labelledby="cookie-banner-title"
        >
          <div className="cookie-banner-frame">
            <header className="cookie-banner-bar">
              <span>
                <Cookie aria-hidden="true" /> Controle de privacidade
              </span>
              <span>Consent / 01</span>
            </header>

            <div className="cookie-banner-content">
              <div className="cookie-banner-copy">
                <span>Escolha transparente</span>
                <h2 id="cookie-banner-title">Você decide o que fica ativo.</h2>
                <p>
                  Usamos cookies necessários para segurança e funcionamento.
                  Funcionais, analíticos e marketing só são ativados conforme a
                  sua escolha. <Link href="/legal/cookies">Ler a política</Link>
                </p>
              </div>

              <div className="cookie-banner-actions">
                <button
                  type="button"
                  className="cookie-action-primary"
                  onClick={acceptAll}
                >
                  <Check aria-hidden="true" />
                  Aceitar todos
                  <ArrowRight aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="cookie-action-secondary"
                  onClick={acceptNecessary}
                >
                  Somente necessários
                </button>
                <button
                  type="button"
                  className="cookie-banner-customize"
                  onClick={openPreferences}
                >
                  <SlidersHorizontal aria-hidden="true" />
                  Personalizar
                </button>
              </div>
            </div>

            <footer className="cookie-banner-footer">
              <span>
                <i aria-hidden="true" /> Necessários sempre ativos
              </span>
              <span>Preferências alteráveis no rodapé</span>
            </footer>
          </div>
        </section>
      ) : null}

      {view === "modal" ? (
        <div className="cookie-modal-layer">
          <div
            className="cookie-modal-overlay"
            aria-hidden="true"
            onClick={closePreferences}
          />
          <div
            ref={modalRef}
            className="cookie-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-modal-title"
            aria-describedby="cookie-modal-description"
          >
            <button
              type="button"
              className="cookie-modal-close"
              onClick={closePreferences}
              aria-label={
                getConsent() ? "Fechar preferências" : "Voltar ao aviso"
              }
            >
              <X aria-hidden="true" />
            </button>

            <aside className="cookie-modal-intro">
              <span className="cookie-modal-index">Consent / 02</span>
              <Cookie aria-hidden="true" />
              <h2 id="cookie-modal-title">Controle seus dados de navegação.</h2>
              <p id="cookie-modal-description">
                Escolha as categorias opcionais. Você pode mudar esta decisão a
                qualquer momento pelo rodapé do site.
              </p>
              <Link href="/legal/cookies" onClick={closePreferences}>
                Política completa <ArrowRight aria-hidden="true" />
              </Link>
              <div>
                <span>
                  <i aria-hidden="true" /> Necessários
                </span>
                <strong>Sempre ativos</strong>
              </div>
            </aside>

            <div className="cookie-modal-config">
              <header>
                <span>Preferências de cookies</span>
                <strong>03 categorias opcionais</strong>
              </header>

              <div className="cookie-category-list">
                <section className="cookie-category is-required">
                  <div className="cookie-category-icon">
                    <LockKeyhole aria-hidden="true" />
                  </div>
                  <div className="cookie-category-copy">
                    <div>
                      <h3>Estritamente necessários</h3>
                      <span>Obrigatório</span>
                    </div>
                    <p>
                      Registram esta escolha de cookies e o funcionamento
                      básico do site institucional. Não podem ser desativados.
                    </p>
                  </div>
                  <Toggle
                    checked
                    disabled
                    label="Cookies estritamente necessários, sempre ativos"
                    onChange={() => {}}
                  />
                </section>

                {CATEGORIES.map((category) => {
                  const Icon = category.icon
                  const checked = categories[category.key]

                  return (
                    <section
                      key={category.key}
                      className={cn("cookie-category", checked && "is-enabled")}
                    >
                      <div className="cookie-category-icon">
                        <Icon aria-hidden="true" />
                      </div>
                      <div className="cookie-category-copy">
                        <div>
                          <h3>{category.label}</h3>
                          <span>{checked ? "Ativo" : "Inativo"}</span>
                        </div>
                        <p>{category.description}</p>
                      </div>
                      <Toggle
                        checked={checked}
                        label={`${checked ? "Desativar" : "Ativar"} cookies ${category.label.toLowerCase()}`}
                        onChange={(value) =>
                          toggleCategory(category.key, value)
                        }
                      />
                    </section>
                  )
                })}
              </div>

              <footer className="cookie-modal-actions">
                <button type="button" onClick={acceptNecessary}>
                  Somente necessários
                </button>
                <button type="button" onClick={savePreferences}>
                  Salvar minha escolha
                </button>
                <button type="button" onClick={acceptAll}>
                  Aceitar todos
                  <ArrowRight aria-hidden="true" />
                </button>
              </footer>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
