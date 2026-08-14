import { NextResponse } from "next/server"

import { DEMO_PAGE } from "@/lib/landing-data"

type DemoBody = {
  name?: string
  email?: string
  company?: string
  city?: string
  role?: string
  land_context?: string
  source?: string
  accepted_privacy?: boolean
}

function apiBaseUrl(): string | null {
  const url = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL
  if (!url) return null
  return url.replace(/\/$/, "")
}

function validate(body: DemoBody): Record<string, string[]> {
  const errors: Record<string, string[]> = {}
  const name = body.name?.trim() ?? ""
  const email = body.email?.trim() ?? ""
  const company = body.company?.trim() ?? ""

  if (name.length < 2) errors.name = ["Informe seu nome"]
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = ["E-mail inválido"]
  if (company.length < 2) errors.company = ["Informe a empresa"]
  if (body.accepted_privacy !== true) {
    errors.accepted_privacy = [DEMO_PAGE.privacyError]
  }

  return errors
}

export async function POST(request: Request) {
  let body: DemoBody
  try {
    body = (await request.json()) as DemoBody
  } catch {
    return NextResponse.json(
      { ok: false, message: "JSON inválido" },
      { status: 400 }
    )
  }

  const fieldErrors = validate(body)
  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      {
        ok: false,
        message: "Revise os campos destacados",
        fieldErrors,
      },
      { status: 422 }
    )
  }

  const payload = {
    name: body.name!.trim(),
    email: body.email!.trim().toLowerCase(),
    company: body.company!.trim(),
    city: (body.city ?? "").trim(),
    role: (body.role ?? "").trim(),
    land_context: (body.land_context ?? "").trim(),
    source: (body.source ?? "site").trim(),
    page: "demonstracao",
    accepted_privacy: true,
  }

  const base = apiBaseUrl()
  if (base) {
    try {
      const res = await fetch(`${base}/api/v1/demo-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      })

      if (res.ok) {
        return NextResponse.json({
          ok: true,
          message:
            "Solicitação enviada. Entraremos em contato pelo e-mail informado.",
        })
      }

      const json = await res.json().catch(() => null)
      if (res.status === 422) {
        return NextResponse.json(
          {
            ok: false,
            message: json?.message ?? "Revise os campos",
            fieldErrors: json?.errors ?? json?.error?.details ?? {},
          },
          { status: 422 }
        )
      }

      return NextResponse.json(
        {
          ok: false,
          message:
            "Não foi possível registrar sua solicitação agora. Tente novamente ou envie por e-mail.",
        },
        { status: 502 }
      )
    } catch {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Não foi possível conectar ao atendimento agora. Tente novamente ou envie por e-mail.",
        },
        { status: 503 }
      )
    }
  }

  return NextResponse.json(
    {
      ok: false,
      message:
        "O atendimento está indisponível no momento. Tente novamente ou envie por e-mail.",
    },
    { status: 503 }
  )
}
