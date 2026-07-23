"use client"

import { openCookiePrefs } from "@/lib/cookie-consent"
import { FOOTER_COPY } from "@/lib/landing-data"

export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={openCookiePrefs}
      className="footer-cookie-button"
      aria-haspopup="dialog"
    >
      <span aria-hidden="true">
        <i />
      </span>
      {FOOTER_COPY.cookiePreferences}
    </button>
  )
}
