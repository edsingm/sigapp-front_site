import { NextResponse } from "next/server"

type DemoBody = {
  name?: string
  email?: string
  company?: string
  city?: string
  role?: string
  land_context?: string
  source?: string
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

      // 404 = endpoint ainda não existe no Laravel — aceita localmente
      if (res.status !== 404) {
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
      }
    } catch {
      // segue para aceite local (lead capturado no log do servidor)
    }
  }

  // Fallback honesto: registra no log do servidor para operação manual
  // até o endpoint Laravel existir. Em produção, configure API_URL + rota.
  console.info("[demo-request]", JSON.stringify(payload))

  return NextResponse.json({
    ok: true,
    message:
      "Solicitação registrada. Entraremos em contato pelo e-mail informado.",
  })
}
