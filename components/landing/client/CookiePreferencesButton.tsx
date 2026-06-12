"use client"

import { openCookiePrefs } from "@/lib/cookie-consent"

export function CookiePreferencesButton() {
  return (
    <button
      onClick={openCookiePrefs}
      className="inline-flex min-h-11 items-center rounded-lg px-2 text-xs font-medium text-foreground/72 transition-colors hover:text-foreground"
    >
      Gerenciar cookies
    </button>
  )
}
