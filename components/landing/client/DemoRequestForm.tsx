"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, CheckCircle2, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DEMO_PAGE, LINKS } from "@/lib/landing-data"
import { submitDemoRequest } from "@/lib/api"
import { trackEvent } from "@/lib/analytics"

function validateRequiredFields({
  name,
  email,
  company,
  acceptedPrivacy,
}: {
  name: string
  email: string
  company: string
  acceptedPrivacy: boolean
}) {
  const errors: Record<string, string[]> = {}

  if (name.trim().length < 2) errors.name = ["Informe seu nome"]
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    errors.email = ["E-mail inválido"]
  if (company.trim().length < 2) errors.company = ["Informe a empresa"]
  if (!acceptedPrivacy) errors.accepted_privacy = [DEMO_PAGE.privacyError]

  return errors
}

function PrivacyLabel() {
  const label = DEMO_PAGE.privacyLabel
  const linkText = "Política de Privacidade"
  const index = label.indexOf(linkText)

  if (index === -1) {
    return (
      <p>
        {label}{" "}
        <Link href="/legal/privacidade">{linkText}</Link>
      </p>
    )
  }

  return (
    <p>
      {label.slice(0, index)}
      <Link href="/legal/privacidade">{linkText}</Link>
      {label.slice(index + linkText.length)}
    </p>
  )
}

export function DemoRequestForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [city, setCity] = useState("")
  const [role, setRole] = useState(DEMO_PAGE.roles[0] ?? "")
  const [land, setLand] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormError(null)
    setFieldErrors({})

    const validationErrors = validateRequiredFields({
      name,
      email,
      company,
      acceptedPrivacy,
    })
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors)
      setFormError("Revise os campos destacados")
      trackEvent("demo_form_error", {
        location: "demo-form",
        reason: "validation",
      })
      return
    }

    setSubmitting(true)

    const result = await submitDemoRequest({
      name,
      email,
      company,
      city,
      role,
      land_context: land,
      source: "demonstracao",
      accepted_privacy: true,
    })

    setSubmitting(false)

    if (!result.ok) {
      setFieldErrors(result.fieldErrors ?? {})
      setFormError(result.message)
      trackEvent("demo_form_error", {
        location: "demo-form",
        reason: "submission",
      })
      return
    }

    trackEvent("demo_form_submit", { location: "demo-form" })
    setDone(true)
  }

  if (done) {
    return (
      <div
        className="demo-request-card demo-request-success"
        aria-live="polite"
      >
        <span className="demo-success-icon">
          <CheckCircle2 className="size-5" strokeWidth={1.75} />
        </span>
        <div className="demo-success-copy">
          <span>Solicitação recebida</span>
          <h2>{DEMO_PAGE.successTitle}</h2>
          <p>{DEMO_PAGE.successBody}</p>
        </div>
        <Button
          variant="outline"
          className="demo-success-action"
          nativeButton={false}
          render={<Link href="/#como-funciona" />}
        >
          {DEMO_PAGE.successSecondary}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="demo-request-card" noValidate>
      <div className="demo-form-heading">
        <span>Conversa inicial</span>
        <h2>{DEMO_PAGE.formTitle}</h2>
        <p>{DEMO_PAGE.formHint}</p>
      </div>

      <div className="demo-form-grid">
        <Field
          id="demo-name"
          label={DEMO_PAGE.fields.name}
          error={fieldErrors.name?.[0]}
        >
          <Input
            id="demo-name"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "demo-name-error" : undefined}
            className="demo-control"
          />
        </Field>
        <Field
          id="demo-email"
          label={DEMO_PAGE.fields.email}
          error={fieldErrors.email?.[0]}
        >
          <Input
            id="demo-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={
              fieldErrors.email ? "demo-email-error" : undefined
            }
            className="demo-control"
          />
        </Field>
      </div>

      <Field
        id="demo-company"
        label={DEMO_PAGE.fields.company}
        error={fieldErrors.company?.[0]}
      >
        <Input
          id="demo-company"
          name="company"
          autoComplete="organization"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
          aria-invalid={Boolean(fieldErrors.company)}
          aria-describedby={
            fieldErrors.company ? "demo-company-error" : undefined
          }
          className="demo-control"
        />
      </Field>

      <div className="demo-form-grid">
        <Field id="demo-city" label={DEMO_PAGE.fields.city}>
          <Input
            id="demo-city"
            name="city"
            autoComplete="address-level2"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="demo-control"
          />
        </Field>
        <Field id="demo-role" label={DEMO_PAGE.fields.role}>
          <select
            id="demo-role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="demo-control"
          >
            {DEMO_PAGE.roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="demo-land" label={DEMO_PAGE.fields.land}>
        <textarea
          id="demo-land"
          name="land_context"
          rows={3}
          value={land}
          onChange={(e) => setLand(e.target.value)}
          placeholder={DEMO_PAGE.fields.landPlaceholder}
          className="demo-control demo-textarea"
        />
      </Field>

      {formError ? (
        <p className="text-sm text-destructive" role="alert">
          {formError}{" "}
          <a href={LINKS.demoEmail} className="underline underline-offset-2">
            Enviar por e-mail
          </a>
        </p>
      ) : null}

      <label className="signup-contract demo-privacy">
        <input
          type="checkbox"
          name="accepted_privacy"
          checked={acceptedPrivacy}
          onChange={(event) => setAcceptedPrivacy(event.target.checked)}
          required
          aria-invalid={Boolean(fieldErrors.accepted_privacy)}
          aria-describedby={
            fieldErrors.accepted_privacy ? "demo-privacy-error" : undefined
          }
        />
        <span aria-hidden="true">
          <Check />
        </span>
        <PrivacyLabel />
      </label>
      {fieldErrors.accepted_privacy ? (
        <p id="demo-privacy-error" className="demo-field-error" role="alert">
          {fieldErrors.accepted_privacy[0]}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        className="demo-submit group/cta"
        disabled={submitting}
      >
        {submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            {DEMO_PAGE.fields.submitting}
          </>
        ) : (
          <>
            {DEMO_PAGE.fields.submit}
            <span>
              <ArrowRight className="size-4" />
            </span>
          </>
        )}
      </Button>
    </form>
  )
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="demo-field">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="demo-field-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
