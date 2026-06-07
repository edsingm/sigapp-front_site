export type CookieCategories = {
  functional: boolean
  analytics: boolean
  marketing: boolean
}

export type CookieConsent = {
  version: string
  given: boolean
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

export function saveConsent(categories: CookieCategories): void {
  if (typeof window === "undefined") return
  const consent: CookieConsent = {
    version: CONSENT_VERSION,
    given: true,
    categories,
    timestamp: new Date().toISOString(),
  }
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent))
  // também seta cookie HTTP para acesso server-side futuro
  const maxAge = 365 * 24 * 60 * 60
  document.cookie = `${CONSENT_KEY}=1; path=/; max-age=${maxAge}; SameSite=Lax`
}

export function clearConsent(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(CONSENT_KEY)
  document.cookie = `${CONSENT_KEY}=; path=/; max-age=0`
}

export function openCookiePrefs(): void {
  window.dispatchEvent(new CustomEvent("sigapp:open-cookie-prefs"))
}
