import type { CookieCategories } from "@/lib/cookie-consent"

export type GtagConsentValue = "granted" | "denied"

export type GtagConsentState = {
  ad_storage: GtagConsentValue
  ad_user_data: GtagConsentValue
  ad_personalization: GtagConsentValue
  analytics_storage: GtagConsentValue
  functionality_storage: GtagConsentValue
  personalization_storage: GtagConsentValue
  security_storage: GtagConsentValue
}

export const DENIED_GTAG_CONSENT: GtagConsentState = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
  functionality_storage: "denied",
  personalization_storage: "denied",
  security_storage: "granted",
}

function flag(granted: boolean): GtagConsentValue {
  return granted ? "granted" : "denied"
}

export function categoriesToGtagConsent(
  categories: CookieCategories
): GtagConsentState {
  return {
    ad_storage: flag(categories.marketing),
    ad_user_data: flag(categories.marketing),
    ad_personalization: flag(categories.marketing),
    analytics_storage: flag(categories.analytics),
    functionality_storage: flag(categories.functional),
    personalization_storage: flag(categories.functional),
    security_storage: "granted",
  }
}

export function applyGtagConsentUpdate(categories: CookieCategories): void {
  if (typeof window === "undefined") return

  const state = categoriesToGtagConsent(categories)
  window.dataLayer = window.dataLayer ?? []

  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", state)
    return
  }

  window.dataLayer.push(["consent", "update", state])
}

/** Primeira escolha (sem consentimento prévio) não é revogação. */
export function hasRevokedOptionalConsent(
  previous: CookieCategories | null | undefined,
  next: CookieCategories
): boolean {
  if (!previous) return false
  return (
    (previous.analytics && !next.analytics) ||
    (previous.marketing && !next.marketing)
  )
}

function isVendorCookieName(name: string): boolean {
  return (
    name === "_ga" ||
    name.startsWith("_ga_") ||
    name === "_gid" ||
    name === "_gat" ||
    name.startsWith("_gat_") ||
    name.startsWith("_gcl_") ||
    name === "_fbp" ||
    name === "_fbc"
  )
}

export function clearVendorCookies(): void {
  if (typeof document === "undefined") return

  const names = document.cookie.split(";").flatMap((part) => {
    const name = part.split("=")[0]?.trim()
    return name && isVendorCookieName(name) ? [name] : []
  })

  if (names.length === 0) return

  const hostname = window.location.hostname
  const domains = new Set<string>(["", hostname, `.${hostname}`])
  const labels = hostname.split(".")
  if (labels.length >= 2) {
    const root = labels.slice(-2).join(".")
    domains.add(root)
    domains.add(`.${root}`)
  }

  for (const name of names) {
    for (const domain of domains) {
      const domainAttr = domain ? `; domain=${domain}` : ""
      document.cookie = `${name}=; Path=/${domainAttr}; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`
    }
  }
}
