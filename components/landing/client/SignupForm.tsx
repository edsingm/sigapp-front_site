"use client"

import { useEffect, useState, type ReactNode } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CircleHelp,
  Eye,
  EyeOff,
  Loader2,
  ShieldCheck,
  X,
} from "lucide-react"

import { SignupBrand } from "@/components/landing/ui/SignupBrand"
import { ThemeToggleButton } from "@/components/landing/client/ThemeToggleButton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { checkSubdomain, submitSignup, type ApiPlan } from "@/lib/api"
import { LINKS, METRICS } from "@/lib/landing-data"
import { planFeatureBullets } from "@/lib/plan-display"
import { cn } from "@/lib/utils"

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

type SlugStatus = "idle" | "checking" | "available" | "taken" | "invalid"

export function SignupForm({ plans, initialPlanSlug, cancelled }: Props) {
  const initialSlug =
    plans.find((plan) => plan.slug === initialPlanSlug)?.slug ??
    plans.find((plan) => plan.is_popular)?.slug ??
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
  const [availability, setAvailability] = useState<{
    slug: string
    available: boolean
  } | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const selectedPlan = plans.find((plan) => plan.slug === selectedSlug)
  const slugValid = subdomain.length >= 3 && SLUG_REGEX.test(subdomain)

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

  useEffect(() => {
    if (!slugValid) return
    const handle = setTimeout(async () => {
      const result = await checkSubdomain(subdomain)
      if (result !== null) {
        setAvailability({ slug: subdomain, available: result.available })
      }
    }, 500)
    return () => clearTimeout(handle)
  }, [subdomain, slugValid])

  function validateStepOne(): Record<string, string[]> {
    const errs: Record<string, string[]> = {}
    if (adminName.trim().length < 3) {
      errs.admin_name = ["Seu nome deve ter ao menos 3 caracteres"]
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminEmail)) {
      errs.admin_email = ["E-mail inválido"]
    }
    if (adminPassword.length < 8 || !PASSWORD_REGEX.test(adminPassword)) {
      errs.admin_password = [
        "A senha precisa de 8+ caracteres, com maiúscula, minúscula e número",
      ]
    }
    if (!acceptContract) {
      errs.accept_usage_contract = [
        "Você precisa aceitar o Contrato de Utilização",
      ]
    }
    return errs
  }

  function validateStepTwo(): Record<string, string[]> {
    const errs: Record<string, string[]> = {}
    if (organizationName.trim().length < 3) {
      errs.organization_name = [
        "O nome da organização deve ter ao menos 3 caracteres",
      ]
    }
    if (!SLUG_REGEX.test(subdomain) || subdomain.length < 3) {
      errs.slug = [
        "O endereço deve ter ao menos 3 caracteres (letras minúsculas, números e hífens)",
      ]
    } else if (slugStatus === "taken") {
      errs.slug = ["Este endereço já está em uso"]
    }
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
      window.location.href = result.data.checkout_url
      return
    }

    setSubmitting(false)
    setFieldErrors(result.fieldErrors)
    setFormError(result.message)
  }

  return (
    <main id="conteudo-principal" tabIndex={-1} className="signup-stage">
      <aside className="signup-context" aria-label="Contexto da avaliação">
        <div className="signup-context-grid" aria-hidden="true" />
        <div className="signup-context-orbit" aria-hidden="true" />

        <header className="signup-context-header">
          <SignupBrand tone="on-dark" />
          <span>Ativação segura</span>
        </header>

        <div className="signup-context-body">
          <span className="signup-context-eyebrow">
            <i aria-hidden="true" />
            Avaliação guiada / 02 etapas
          </span>
          <p className="signup-context-title">
            Sua operação começa <strong>inteira.</strong>
          </p>
          <p className="signup-context-description">
            Abra sua conta com plano, equipe e território no mesmo contexto —
            sem uma implantação longa antes da primeira análise.
          </p>

          <ol className="signup-context-route" aria-label="Jornada de ativação">
            <li>
              <span>01</span>
              <strong>Acesso</strong>
              <small>Credenciais seguras</small>
            </li>
            <li>
              <span>02</span>
              <strong>Empresa</strong>
              <small>Plano e endereço</small>
            </li>
            <li>
              <span>03</span>
              <strong>Território</strong>
              <small>Primeira análise</small>
            </li>
          </ol>

          {selectedPlan ? <PlanSummary plan={selectedPlan} /> : null}
        </div>

        <footer className="signup-context-footer">
          <dl>
            {METRICS.slice(0, 3).map((metric) => (
              <div key={metric.label}>
                <dt>{metric.label}</dt>
                <dd>{metric.value}</dd>
              </div>
            ))}
          </dl>
          <p>
            <ShieldCheck aria-hidden="true" />
            Pagamento processado com segurança pelo Stripe
          </p>
        </footer>
      </aside>

      <section className="signup-form-panel" aria-labelledby="signup-title">
        <header className="signup-form-header">
          <span className="lg:hidden">
            <SignupBrand compact />
          </span>
          <Link href="/" className="signup-back-link">
            <ArrowLeft aria-hidden="true" />
            Voltar ao site
          </Link>
          <ThemeToggleButton className="signup-theme-toggle" />
        </header>

        <div className="signup-form-shell">
          {selectedPlan ? <MobilePlanSummary plan={selectedPlan} /> : null}

          <SignupProgress step={step} />

          <div className="signup-form-intro">
            <span>Etapa {String(step).padStart(2, "0")} / 02</span>
            <h1 id="signup-title">
              {step === 1
                ? "Crie seu acesso de decisão."
                : "Defina o espaço da sua operação."}
            </h1>
            <p>
              {step === 1
                ? "Seus dados de acesso abrem a avaliação. A empresa e o endereço da equipe vêm no próximo passo."
                : selectedPlan
                  ? `Revise o plano, defina o endereço da conta e continue para o Stripe. A primeira cobrança será em ${selectedPlan.trial_days} dias.`
                  : "Crie sua conta e comece a organizar a análise territorial."}
            </p>
          </div>

          {cancelled ? (
            <div className="signup-notice" role="status">
              <CircleHelp aria-hidden="true" />
              <p>
                <strong>Pagamento não concluído.</strong>
                Seus dados continuam aqui. Revise as informações e tente
                novamente quando estiver pronto.
              </p>
            </div>
          ) : null}

          {formError ? (
            <div className="signup-error" role="alert">
              <X aria-hidden="true" />
              <p>{formError}</p>
            </div>
          ) : null}

          <form
            onSubmit={(event) => {
              event.preventDefault()
              void handleSubmit()
            }}
            noValidate
            className="signup-form"
          >
            {step === 1 ? (
              <>
                <Field
                  id="admin_name"
                  label="Seu nome"
                  error={fieldErrors.admin_name?.[0]}
                >
                  <Input
                    id="admin_name"
                    value={adminName}
                    onChange={(event) => setAdminName(event.target.value)}
                    placeholder="Maria Silva"
                    autoComplete="name"
                    aria-invalid={!!fieldErrors.admin_name}
                    aria-describedby="admin_name-feedback"
                  />
                </Field>

                <Field
                  id="admin_email"
                  label="E-mail profissional"
                  error={fieldErrors.admin_email?.[0]}
                >
                  <Input
                    id="admin_email"
                    type="email"
                    value={adminEmail}
                    onChange={(event) => setAdminEmail(event.target.value)}
                    placeholder="voce@empresa.com.br"
                    autoComplete="email"
                    aria-invalid={!!fieldErrors.admin_email}
                    aria-describedby="admin_email-feedback"
                  />
                </Field>

                <Field
                  id="admin_password"
                  label="Crie uma senha"
                  error={fieldErrors.admin_password?.[0]}
                  hint="Mínimo 8 caracteres, com maiúscula, minúscula e número."
                >
                  <div className="signup-password-field">
                    <Input
                      id="admin_password"
                      type={showPassword ? "text" : "password"}
                      value={adminPassword}
                      onChange={(event) => setAdminPassword(event.target.value)}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      aria-invalid={!!fieldErrors.admin_password}
                      aria-describedby="admin_password-feedback"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      aria-label={
                        showPassword ? "Ocultar senha" : "Mostrar senha"
                      }
                    >
                      {showPassword ? (
                        <EyeOff aria-hidden="true" />
                      ) : (
                        <Eye aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </Field>

                <label className="signup-contract">
                  <input
                    type="checkbox"
                    checked={acceptContract}
                    onChange={(event) =>
                      setAcceptContract(event.target.checked)
                    }
                    aria-invalid={!!fieldErrors.accept_usage_contract}
                    aria-describedby={
                      fieldErrors.accept_usage_contract
                        ? "contract-error"
                        : undefined
                    }
                  />
                  <span aria-hidden="true">
                    <Check />
                  </span>
                  <p>
                    Li e aceito o{" "}
                    <a href="/legal/termos-de-uso" target="_blank">
                      Contrato de Utilização
                    </a>{" "}
                    e a{" "}
                    <a href="/legal/privacidade" target="_blank">
                      Política de Privacidade
                    </a>
                    .
                  </p>
                </label>
                {fieldErrors.accept_usage_contract ? (
                  <p id="contract-error" className="signup-field-error">
                    {fieldErrors.accept_usage_contract[0]}
                  </p>
                ) : null}
              </>
            ) : (
              <>
                <fieldset className="signup-plan-selector">
                  <legend>Escolha o perímetro da operação</legend>
                  <div>
                    {plans.map((plan) => {
                      const active = plan.slug === selectedSlug
                      return (
                        <button
                          key={plan.slug}
                          type="button"
                          onClick={() => setSelectedSlug(plan.slug)}
                          aria-pressed={active}
                          className={cn(active && "is-active")}
                        >
                          <span>
                            <strong>{plan.name}</strong>
                            {plan.is_popular ? <em>Recomendado</em> : null}
                          </span>
                          <small>{plan.formatted_price}/mês</small>
                        </button>
                      )
                    })}
                  </div>
                </fieldset>

                {selectedPlan ? <CheckoutSummary plan={selectedPlan} /> : null}

                <Field
                  id="organization_name"
                  label="Nome da organização"
                  error={fieldErrors.organization_name?.[0]}
                >
                  <Input
                    id="organization_name"
                    value={organizationName}
                    onChange={(event) =>
                      handleOrganizationName(event.target.value)
                    }
                    placeholder="Construtora Terraplan"
                    autoComplete="organization"
                    aria-invalid={!!fieldErrors.organization_name}
                    aria-describedby="organization_name-feedback"
                  />
                </Field>

                <Field
                  id="slug"
                  label="Endereço da equipe"
                  error={fieldErrors.slug?.[0]}
                  hint={<SlugHint status={slugStatus} />}
                >
                  <div className="signup-slug-field">
                    <Input
                      id="slug"
                      value={subdomain}
                      onChange={(event) => {
                        setSubdomainTouched(true)
                        setSubdomain(slugify(event.target.value))
                      }}
                      placeholder="sua-empresa"
                      autoComplete="off"
                      spellCheck={false}
                      aria-invalid={!!fieldErrors.slug}
                      aria-describedby="slug-feedback"
                    />
                    <span>{TENANT_SUFFIX}</span>
                  </div>
                </Field>

                <div className="signup-guidance">
                  <Building2 aria-hidden="true" />
                  <p>
                    Depois do pagamento, sua equipe conclui a configuração da
                    carteira dentro do produto, sem perder este contexto.
                  </p>
                </div>
              </>
            )}

            <Button
              type="submit"
              variant="brand"
              size="lg"
              disabled={submitting}
              className="signup-primary-action"
              data-analytics-event={
                step === 2 ? "trial_signup_click" : undefined
              }
              data-analytics-location={step === 2 ? "signup-form" : undefined}
              data-analytics-plan={step === 2 ? selectedSlug : undefined}
            >
              {submitting ? (
                <>
                  <Loader2 className="animate-spin" aria-hidden="true" />
                  Redirecionando para o pagamento…
                </>
              ) : (
                <>
                  {step === 1
                    ? "Continuar para a empresa"
                    : "Ir para o pagamento seguro"}
                  <ArrowRight aria-hidden="true" />
                </>
              )}
            </Button>

            {step === 2 && selectedPlan ? (
              <p className="signup-checkout-note">
                Você será direcionado ao Stripe. Primeira cobrança em{" "}
                {selectedPlan.trial_days} dias; cancele antes, sem custo.
              </p>
            ) : null}

            {step === 2 ? (
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => setStep(1)}
                className="signup-secondary-action"
              >
                <ArrowLeft aria-hidden="true" />
                Voltar e revisar acesso
              </Button>
            ) : null}

            <div className="signup-secure-payment">
              <ShieldCheck aria-hidden="true" />
              <span>
                Checkout protegido por <strong>Stripe</strong>
              </span>
            </div>

            <p className="signup-login-link">
              Já tem uma conta? <a href={LINKS.login}>Entrar no SIGAPP</a>
            </p>
          </form>
        </div>
      </section>
    </main>
  )
}

function SignupProgress({ step }: { step: 1 | 2 }) {
  const steps = ["Seu acesso", "Sua empresa"]

  return (
    <ol className="signup-progress" aria-label="Progresso do cadastro">
      {steps.map((label, index) => {
        const number = index + 1
        const current = number === step
        const complete = number < step

        return (
          <li
            key={label}
            className={cn(current && "is-current", complete && "is-complete")}
          >
            <span aria-current={current ? "step" : undefined}>
              {complete ? <Check aria-hidden="true" /> : `0${number}`}
            </span>
            <div>
              <small>{complete ? "Concluído" : `Etapa 0${number}`}</small>
              <strong>{label}</strong>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

function MobilePlanSummary({ plan }: { plan: ApiPlan }) {
  return (
    <section className="signup-mobile-plan" aria-label="Plano selecionado">
      <div>
        <span>Plano ativo</span>
        <strong>{plan.name}</strong>
      </div>
      <p>
        <strong>{plan.formatted_price}</strong>
        <span>/mês</span>
      </p>
      <small>{plan.trial_days} dias grátis</small>
    </section>
  )
}

function CheckoutSummary({ plan }: { plan: ApiPlan }) {
  return (
    <section className="signup-checkout-summary" aria-label="Resumo do pedido">
      <header>
        <div>
          <span>Perímetro selecionado</span>
          <strong>SIGAPP {plan.name}</strong>
        </div>
        <p>
          <strong>{plan.formatted_price}</strong>
          <small>por mês</small>
        </p>
      </header>
      <footer>
        <Check aria-hidden="true" />
        {plan.trial_days} dias de avaliação antes da primeira cobrança
      </footer>
    </section>
  )
}

function PlanSummary({ plan }: { plan: ApiPlan }) {
  return (
    <section className="signup-plan-summary" aria-label="Resumo do plano">
      <header>
        <div>
          <span>Perímetro selecionado</span>
          <h2>{plan.name}</h2>
        </div>
        <p>
          <strong>{plan.formatted_price}</strong>
          <small>/mês</small>
        </p>
      </header>

      {plan.description ? <p>{plan.description}</p> : null}

      <ul>
        {planFeatureBullets(plan).map((feature) => (
          <li key={feature}>
            <Check aria-hidden="true" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <footer>
        <span>{plan.trial_days} dias para avaliar</span>
        <strong>Sem fidelidade</strong>
      </footer>
    </section>
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
    <div className="signup-field">
      <Label htmlFor={id}>{label}</Label>
      {children}
      <div id={`${id}-feedback`} className="signup-field-feedback">
        {error ? (
          <p className="signup-field-error">{error}</p>
        ) : hint ? (
          hint
        ) : null}
      </div>
    </div>
  )
}

function SlugHint({ status }: { status: SlugStatus }) {
  if (status === "checking") {
    return (
      <span className="signup-slug-hint">
        <Loader2 className="animate-spin" aria-hidden="true" />
        Verificando disponibilidade…
      </span>
    )
  }
  if (status === "available") {
    return (
      <span className="signup-slug-hint is-available">
        <Check aria-hidden="true" />
        Endereço disponível
      </span>
    )
  }
  if (status === "taken") {
    return (
      <span className="signup-slug-hint is-taken">
        <X aria-hidden="true" />
        Endereço já está em uso
      </span>
    )
  }
  if (status === "invalid") {
    return (
      <span className="signup-slug-hint">
        Use ao menos 3 caracteres: letras minúsculas, números e hífens.
      </span>
    )
  }
  return (
    <span className="signup-slug-hint">
      Será o endereço de acesso da sua equipe.
    </span>
  )
}
