export type CookieCategories = {
  functional: boolean
  analytics: boolean
  marketing: boolean
}

export type CookieConsent = {
  version: string
  given: boolean
  consent_id: string
  categories: CookieCategories
  timestamp: string
}

export const CONSENT_KEY = "sigapp_cookie_consent"
export const CONSENT_VERSION = "1.0"

export const DEFAULT_CATEGORIES: CookieCategories = {
  functional: true,
  analytics: false,
  marketing: false,
}

export function getConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(CONSENT_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as CookieConsent
    if (parsed.version !== CONSENT_VERSION) return null
    return parsed
  } catch {
    return null
  }
}

export function saveConsent(categories: CookieCategories): CookieConsent {
  if (typeof window === "undefined") throw new Error("saveConsent must run client-side")

  // mantém o mesmo consent_id se já existir (permite rastrear mudanças)
  const existing = getConsent()
  const consent: CookieConsent = {
    version: CONSENT_VERSION,
    given: true,
    consent_id: existing?.consent_id ?? crypto.randomUUID(),
    categories,
    timestamp: new Date().toISOString(),
  }

  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent))

  // cookie HTTP para possível leitura server-side futura
  const maxAge = 365 * 24 * 60 * 60
  document.cookie = `${CONSENT_KEY}=1; path=/; max-age=${maxAge}; SameSite=Lax`

  return consent
}

export function clearConsent(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(CONSENT_KEY)
  document.cookie = `${CONSENT_KEY}=; path=/; max-age=0`
}

export function openCookiePrefs(): void {
  window.dispatchEvent(new CustomEvent("sigapp:open-cookie-prefs"))
}

/** Envia o consentimento ao backend Laravel (fire-and-forget). */
export async function sendConsentToBackend(consent: CookieConsent): Promise<void> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) return

  try {
    await fetch(`${apiUrl}/api/v1/consent-log`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        consent_id: consent.consent_id,
        categories: consent.categories,
        version: consent.version,
        timestamp: consent.timestamp,
      }),
    })
  } catch {
    // falha silenciosa — não impede o fluxo do usuário
  }
}
