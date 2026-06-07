"use client"

import { openCookiePrefs } from "@/lib/cookie-consent"

export function CookiePreferencesButton() {
  return (
    <button
      onClick={openCookiePrefs}
      className="text-xs text-muted-foreground transition-colors hover:text-foreground"
    >
      Gerenciar cookies
    </button>
  )
}
