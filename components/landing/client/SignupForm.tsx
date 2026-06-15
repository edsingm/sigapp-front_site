"use client"

import { useEffect, useState, type ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check, Eye, EyeOff, Loader2, ShieldCheck, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SigappLogoMark } from "@/components/branding/SigappLogoMark"
import { PLANS, LINKS, METRICS } from "@/lib/landing-data"
import { checkSubdomain, submitSignup, type ApiPlan } from "@/lib/api"

type Props = {
  plans: ApiPlan[]
  initialPlanSlug?: string
  cancelled?: boolean
}

const TENANT_SUFFIX = ".sigapp.com.br"

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 63)
}

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/

// Bullets de marketing por slug (copy curada em landing-data)
function featureBullets(slug: string): string[] {
  return PLANS.find((p) => p.id === slug)?.features ?? []
}

type SlugStatus = "idle" | "checking" | "available" | "taken" | "invalid"

export function SignupForm({ plans, initialPlanSlug, cancelled }: Props) {
  const initialSlug =
    plans.find((p) => p.slug === initialPlanSlug)?.slug ??
    plans.find((p) => p.is_popular)?.slug ??
    plans[0]?.slug ??
    ""

  const [selectedSlug, setSelectedSlug] = useState(initialSlug)
  const [organizationName, setOrganizationName] = useState("")
  const [subdomain, setSubdomain] = useState("")
  const [subdomainTouched, setSubdomainTouched] = useState(false)
  const [adminName, setAdminName] = useState("")
  const [adminEmail, setAdminEmail] = useState("")
  const [adminPassword, setAdminPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [acceptContract, setAcceptContract] = useState(false)
  const [step, setStep] = useState<1 | 2>(1)

  // Resultado de disponibilidade atrelado ao slug consultado (evita estado obsoleto)
  const [availability, setAvailability] = useState<{ slug: string; available: boolean } | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const selectedPlan = plans.find((p) => p.slug === selectedSlug)

  const slugValid = subdomain.length >= 3 && SLUG_REGEX.test(subdomain)

  // Status derivado — sem setState em render
  const slugStatus: SlugStatus =
    subdomain.length === 0
      ? "idle"
      : !slugValid
        ? "invalid"
        : availability?.slug === subdomain
          ? availability.available
            ? "available"
            : "taken"
          : "checking"

  function handleOrganizationName(value: string) {
    setOrganizationName(value)
    if (!subdomainTouched) setSubdomain(slugify(value))
  }

  // Checagem de disponibilidade do subdomínio (debounced; setState só no callback assíncrono)
  useEffect(() => {
    if (!slugValid) return
    const handle = setTimeout(async () => {
      const result = await checkSubdomain(subdomain)
      if (result !== null) setAvailability({ slug: subdomain, available: result.available })
    }, 500)
    return () => clearTimeout(handle)
  }, [subdomain, slugValid])

  function validateStepOne(): Record<string, string[]> {
    const errs: Record<string, string[]> = {}
    if (adminName.trim().length < 3) errs.admin_name = ["Seu nome deve ter ao menos 3 caracteres"]
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminEmail)) errs.admin_email = ["E-mail inválido"]
    if (adminPassword.length < 8 || !PASSWORD_REGEX.test(adminPassword))
      errs.admin_password = ["A senha precisa de 8+ caracteres, com maiúscula, minúscula e número"]
    if (!acceptContract)
      errs.accept_usage_contract = ["Você precisa aceitar o Contrato de Utilização"]
    return errs
  }

  function validateStepTwo(): Record<string, string[]> {
    const errs: Record<string, string[]> = {}
    if (organizationName.trim().length < 3)
      errs.organization_name = ["O nome da organização deve ter ao menos 3 caracteres"]
    if (!SLUG_REGEX.test(subdomain) || subdomain.length < 3)
      errs.slug = ["O endereço deve ter ao menos 3 caracteres (letras minúsculas, números e hífens)"]
    else if (slugStatus === "taken") errs.slug = ["Este endereço já está em uso"]
    return errs
  }

  function goToStepTwo() {
    const errs = validateStepOne()
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs)
      return
    }
    setFieldErrors({})
    setStep(2)
  }

  async function handleSubmit() {
    setFormError(null)
    if (step === 1) {
      goToStepTwo()
      return
    }

    const errs = { ...validateStepOne(), ...validateStepTwo() }
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs)
      return
    }
    setFieldErrors({})
    setSubmitting(true)

    const result = await submitSignup({
      plan_slug: selectedSlug,
      organization_name: organizationName.trim(),
      slug: subdomain,
      admin_name: adminName.trim(),
      admin_email: adminEmail.trim(),
      admin_password: adminPassword,
      accept_usage_contract: acceptContract,
    })

    if (result.ok) {
      // Mantém o botão em "Redirecionando" durante a navegação para o Stripe
      window.location.href = result.data.checkout_url
      return
    }

    setSubmitting(false)
    setFieldErrors(result.fieldErrors)
    setFormError(result.message)
  }

  return (
    <div className="grid min-h-dvh lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      {/* ───────── Painel de marca (desktop) ───────── */}
      <aside className="relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-between lg:p-12 xl:p-14">
        <Image
          src="/hero-bg.webp"
          alt=""
          fill
          sizes="50vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-br from-[#071529]/98 via-[#0B1E39]/94 to-[#1648C9]/84" />
        <div className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-70" />

        {/* Topo — logo */}
        <div className="relative">
          <BrandLogo variant="light" />
        </div>

        {/* Meio — proposta + resumo do plano */}
        <div className="relative flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit items-center gap-2 rounded-md border border-white/20 bg-white/8 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-(--color-data-green)" />
              {selectedPlan ? `Trial de ${selectedPlan.trial_days} dias` : "Trial de 7 dias"}
            </span>
            <h1 className="font-heading text-3xl font-semibold leading-tight tracking-tight text-white xl:text-4xl">
              Do terreno ao retorno.
            </h1>
          </div>

          {selectedPlan && <PlanSummaryGlass plan={selectedPlan} />}
        </div>

        {/* Base — social proof + selo */}
        <div className="relative flex flex-col gap-5">
          <div className="grid grid-cols-3 gap-4">
            {METRICS.slice(0, 3).map((m) => (
              <div key={m.label}>
                <p className="font-heading text-xl font-black text-white">{m.value}</p>
                <p className="text-xs leading-tight text-white/60">{m.label}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/55">
            <ShieldCheck className="size-3.5 shrink-0" />
            <span>
              Pagamento seguro via <span className="font-semibold text-white/80">Stripe</span>
            </span>
          </div>
        </div>
      </aside>

      {/* ───────── Painel do formulário ───────── */}
      <div className="flex flex-col bg-background px-5 py-8 sm:px-8 lg:px-12 lg:py-10 xl:px-16">
        {/* Barra superior */}
        <div className="mb-8 flex items-center justify-between">
          <span className="lg:hidden">
            <BrandLogo variant="dark" />
          </span>
          <Link
            href="/"
            className="ml-auto text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Voltar ao site
          </Link>
        </div>

        <div className="mx-auto w-full max-w-md">
          {/* Resumo compacto (somente mobile) */}
          {selectedPlan && (
            <div className="mb-6 flex items-center justify-between rounded-xl border border-border bg-card p-4 lg:hidden">
              <div>
                <p className="text-xs text-muted-foreground">Plano {selectedPlan.name}</p>
                <p className="font-mono text-lg font-bold text-foreground">
                  {selectedPlan.formatted_price}
                  <span className="text-xs font-normal text-muted-foreground">/mês</span>
                </p>
              </div>
              <span className="inline-flex items-center rounded-full bg-(--color-data-green)/12 px-2.5 py-1 text-xs font-medium text-(--color-data-green)">
                {selectedPlan.trial_days} dias grátis
              </span>
            </div>
          )}

          <div className="mb-7">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Passo {step} de 2
            </p>
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {step === 1 ? "Crie seu acesso" : "Agora configure sua conta"}
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {step === 1 ? (
                "Comece com nome, e-mail e senha. Os dados da conta ficam para o próximo passo."
              ) : selectedPlan ? (
                <>
                  Defina o nome da organização, o endereço da conta e revise o plano antes de seguir
                  para o checkout. O trial continua sendo de {selectedPlan.trial_days} dias.
                </>
              ) : (
                "Comece seu trial e calcule viabilidade hoje mesmo."
              )}
            </p>
          </div>

          {cancelled && (
            <div className="mb-6 rounded-lg border border-border bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
              Pagamento não concluído. Seus dados continuam aqui — é só revisar e tentar novamente.
            </div>
          )}

          {formError && (
            <div
              role="alert"
              className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
            >
              {formError}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault()
              void handleSubmit()
            }}
            noValidate
            className="flex flex-col gap-5"
          >
            {step === 1 ? (
              <>
                <Field id="admin_name" label="Seu nome" error={fieldErrors.admin_name?.[0]}>
                  <Input
                    id="admin_name"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    placeholder="Maria Silva"
                    autoComplete="name"
                    aria-invalid={!!fieldErrors.admin_name}
                  />
                </Field>

                <Field id="admin_email" label="E-mail" error={fieldErrors.admin_email?.[0]}>
                  <Input
                    id="admin_email"
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="voce@empresa.com.br"
                    autoComplete="email"
                    aria-invalid={!!fieldErrors.admin_email}
                  />
                </Field>

                <Field
                  id="admin_password"
                  label="Senha"
                  error={fieldErrors.admin_password?.[0]}
                  hint={
                    <span className="text-xs text-muted-foreground">
                      Mínimo 8 caracteres, com maiúscula, minúscula e número.
                    </span>
                  }
                >
                  <div className="relative">
                    <Input
                      id="admin_password"
                      type={showPassword ? "text" : "password"}
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      aria-invalid={!!fieldErrors.admin_password}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground hover:text-foreground"
                      aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </Field>

                <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={acceptContract}
                    onChange={(e) => setAcceptContract(e.target.checked)}
                    className="mt-0.5 size-4 shrink-0 rounded border-input accent-primary"
                    aria-invalid={!!fieldErrors.accept_usage_contract}
                  />
                  <span>
                    Li e aceito o{" "}
                    <a
                      href="/legal/termos-de-uso"
                      target="_blank"
                      className="font-medium text-primary underline-offset-2 hover:underline"
                    >
                      Contrato de Utilização
                    </a>{" "}
                    e a{" "}
                    <a
                      href="/legal/privacidade"
                      target="_blank"
                      className="font-medium text-primary underline-offset-2 hover:underline"
                    >
                      Política de Privacidade
                    </a>
                    .
                  </span>
                </label>
                {fieldErrors.accept_usage_contract && (
                  <p className="-mt-3 text-xs text-destructive">
                    {fieldErrors.accept_usage_contract[0]}
                  </p>
                )}
              </>
            ) : (
              <>
                <fieldset className="rounded-2xl border border-border bg-card/60 p-4">
                  <legend className="px-1 text-sm font-medium text-foreground">
                    Plano escolhido
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {plans.map((plan) => {
                      const active = plan.slug === selectedSlug
                      return (
                        <button
                          key={plan.slug}
                          type="button"
                          onClick={() => setSelectedSlug(plan.slug)}
                          aria-pressed={active}
                          className={`flex flex-col items-start rounded-lg border px-3 py-2 text-left transition-colors ${
                            active
                              ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                              : "border-border hover:border-primary/40 hover:bg-muted/50"
                          }`}
                        >
                          <span className="text-sm font-semibold text-foreground">{plan.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {plan.formatted_price}/mês
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </fieldset>

                <Field
                  id="organization_name"
                  label="Nome da organização"
                  error={fieldErrors.organization_name?.[0]}
                >
                  <Input
                    id="organization_name"
                    value={organizationName}
                    onChange={(e) => handleOrganizationName(e.target.value)}
                    placeholder="Construtora Terraplan"
                    autoComplete="organization"
                    aria-invalid={!!fieldErrors.organization_name}
                  />
                </Field>

                <Field
                  id="slug"
                  label="Endereço da sua conta"
                  error={fieldErrors.slug?.[0]}
                  hint={<SlugHint status={slugStatus} />}
                >
                  <div className="flex items-stretch">
                    <Input
                      id="slug"
                      value={subdomain}
                      onChange={(e) => {
                        setSubdomainTouched(true)
                        setSubdomain(slugify(e.target.value))
                      }}
                      placeholder="sua-empresa"
                      autoComplete="off"
                      spellCheck={false}
                      aria-invalid={!!fieldErrors.slug}
                      className="rounded-r-none"
                    />
                    <span className="inline-flex items-center rounded-r-lg border border-l-0 border-input bg-muted px-3 text-sm text-muted-foreground">
                      {TENANT_SUFFIX}
                    </span>
                  </div>
                </Field>

                <div className="rounded-2xl border border-border bg-muted/35 p-4 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">Quase pronto.</p>
                  <p className="mt-1 leading-relaxed">
                    Depois do checkout, você continua a configuração dentro do produto com mais
                    contexto sobre equipe, carteira e operação.
                  </p>
                </div>
              </>
            )}

            <Button
              type="submit"
              variant="brand"
              size="lg"
              disabled={submitting}
              className="mt-1 h-12 w-full gap-2 text-base font-semibold"
              data-analytics-event={step === 2 ? "trial_signup_click" : undefined}
              data-analytics-location={step === 2 ? "signup-form" : undefined}
              data-analytics-plan={step === 2 ? selectedSlug : undefined}
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Redirecionando para o pagamento…
                </>
              ) : (
                <>
                  {step === 1 ? "Continuar" : "Continuar para o pagamento"}
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>

            {step === 2 ? (
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => setStep(1)}
                className="h-11 w-full"
              >
                Voltar e revisar acesso
              </Button>
            ) : null}

            <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground lg:hidden">
              <ShieldCheck className="size-3.5 shrink-0 text-[oklch(0.55_0.22_272)]" />
              <span>
                Pagamento seguro via{" "}
                <span className="font-semibold text-[oklch(0.55_0.22_272)]">Stripe</span>
              </span>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Já tem conta?{" "}
              <a href={LINKS.login} className="font-medium text-primary hover:underline">
                Entrar
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

/** Card de resumo do plano em vidro (sobre o painel de marca escuro). */
function PlanSummaryGlass({ plan }: { plan: ApiPlan }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/8 p-6 backdrop-blur-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Resumo</p>
          <h2 className="mt-1.5 font-heading text-xl font-semibold text-white">{plan.name}</h2>
        </div>
        <div className="text-right">
          <p className="font-mono text-2xl font-bold tracking-tight text-white">
            {plan.formatted_price}
          </p>
          <p className="text-xs text-white/55">/mês</p>
        </div>
      </div>

      {plan.description && <p className="mt-2 text-sm text-white/65">{plan.description}</p>}

      <div className="my-5 h-px bg-white/15" />

      <ul className="space-y-2.5 text-sm">
        {featureBullets(plan.slug).map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-(--color-data-green)" />
            <span className="text-white/85">{f}</span>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-xs text-white/50">
        Primeira cobrança em {plan.trial_days} dias. Cancele antes sem custo.
      </p>
    </div>
  )
}

function BrandLogo({ variant }: { variant: "light" | "dark" }) {
  const wordmark = variant === "light" ? "text-white" : "text-foreground"
  const mark = variant === "light" ? "text-white" : "text-primary"
  const box =
    variant === "light"
      ? "text-secondary"
      : "text-primary"
  return (
    <Link href="/" className="flex items-center gap-3 focus:outline-none">
      <SigappLogoMark className={`size-7 ${mark} ${box}`} />
      <span className={`font-heading text-base font-bold tracking-[0.14em] ${wordmark}`}>
        SIGAPP
      </span>
    </Link>
  )
}

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string
  label: string
  error?: string
  hint?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? (
        <p className="text-xs text-destructive">{error}</p>
      ) : hint ? (
        <div>{hint}</div>
      ) : null}
    </div>
  )
}

function SlugHint({ status }: { status: SlugStatus }) {
  if (status === "checking")
    return (
      <span className="flex items-center gap-1 text-xs text-muted-foreground">
        <Loader2 className="size-3 animate-spin" /> Verificando disponibilidade…
      </span>
    )
  if (status === "available")
    return (
      <span className="flex items-center gap-1 text-xs text-(--color-data-green)">
        <Check className="size-3" /> Endereço disponível
      </span>
    )
  if (status === "taken")
    return (
      <span className="flex items-center gap-1 text-xs text-destructive">
        <X className="size-3" /> Endereço já está em uso
      </span>
    )
  if (status === "invalid")
    return (
      <span className="text-xs text-muted-foreground">
        Use ao menos 3 caracteres: letras minúsculas, números e hífens.
      </span>
    )
  return (
    <span className="text-xs text-muted-foreground">Será o endereço de acesso da sua equipe.</span>
  )
}
