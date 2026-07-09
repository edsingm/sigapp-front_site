"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DEMO_PAGE, LINKS } from "@/lib/landing-data"
import { submitDemoRequest } from "@/lib/api"
import { trackEvent } from "@/lib/analytics"

export function DemoRequestForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [city, setCity] = useState("")
  const [role, setRole] = useState(DEMO_PAGE.roles[0] ?? "")
  const [land, setLand] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormError(null)
    setFieldErrors({})
    setSubmitting(true)

    const result = await submitDemoRequest({
      name,
      email,
      company,
      city,
      role,
      land_context: land,
      source: "demonstracao",
    })

    setSubmitting(false)

    if (!result.ok) {
      setFieldErrors(result.fieldErrors ?? {})
      setFormError(result.message)
      return
    }

    trackEvent("demo_request", { location: "demo-form" })
    setDone(true)
  }

  if (done) {
    return (
      <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-7 shadow-raise sm:p-8">
        <span className="flex size-11 items-center justify-center rounded-full bg-(--color-data-green)/12 text-(--color-data-green)">
          <CheckCircle2 className="size-5" strokeWidth={1.75} />
        </span>
        <div className="space-y-2">
          <h2 className="font-heading text-xl font-bold text-foreground">
            {DEMO_PAGE.successTitle}
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {DEMO_PAGE.successBody}
          </p>
        </div>
        <Button
          variant="outline"
          className="h-11 w-fit gap-2"
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
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 shadow-raise sm:p-8"
      noValidate
    >
      <div>
        <h2 className="font-heading text-xl font-bold text-foreground">
          {DEMO_PAGE.formTitle}
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {DEMO_PAGE.formHint}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
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
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="demo-city" label={DEMO_PAGE.fields.city}>
          <Input
            id="demo-city"
            name="city"
            autoComplete="address-level2"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Field>
        <Field id="demo-role" label={DEMO_PAGE.fields.role}>
          <select
            id="demo-role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm shadow-sm focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-none"
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
          className="w-full resize-y rounded-lg border border-input bg-background px-3 py-2.5 text-sm shadow-sm placeholder:text-muted-foreground/60 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-none"
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

      <Button
        type="submit"
        size="lg"
        className="group/cta h-12 gap-2 rounded-xl pr-2 pl-6 font-semibold shadow-cta"
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
            <span className="flex size-8 items-center justify-center rounded-lg bg-white/20 transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover/cta:translate-x-0.5">
              <ArrowRight className="size-4" />
            </span>
          </>
        )}
      </Button>

      <p className="text-xs leading-relaxed text-muted-foreground">
        Ao enviar, você concorda em ser contatado sobre o SIGAPP.{" "}
        <Link href="/legal/privacidade" className="underline underline-offset-2">
          Privacidade
        </Link>
      </p>
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
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
