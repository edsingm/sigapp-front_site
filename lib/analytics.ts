type GtagFn = (
  command: string,
  action: string,
  params?: object
) => void
type FbqFn = (
  command: string,
  event: string,
  params?: Record<string, unknown>
) => void

declare global {
  interface Window {
    gtag?: GtagFn
    fbq?: FbqFn
    dataLayer?: unknown[]
  }
}

export const EVENTS = {
  trial_signup_click: "trial_signup_click",
  demo_request: "demo_request",
  demo_form_submit: "demo_form_submit",
  demo_form_error: "demo_form_error",
  sales_contact_click: "sales_contact_click",
  login_click: "login_click",
} as const

export type AnalyticsEvent = keyof typeof EVENTS

export function trackEvent(
  name: AnalyticsEvent,
  params?: Record<string, string>
) {
  if (typeof window === "undefined") return
  window.gtag?.("event", name, params)
  window.fbq?.("trackCustom", name, params)
}
