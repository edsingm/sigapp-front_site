import Link from "next/link"

import { NAV_COPY, SITE } from "@/lib/landing-data"
import { cn } from "@/lib/utils"

export function SignupBrand({
  tone = "on-light",
  compact = false,
}: {
  tone?: "on-light" | "on-dark"
  compact?: boolean
}) {
  return (
    <Link
      href="/"
      aria-label="SIGAPP — início"
      className={cn(
        "signup-brand",
        tone === "on-dark" && "is-on-dark",
        compact && "is-compact"
      )}
    >
      <span className="signup-brand-symbol" aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="none">
          <path d="M5 8.5 16 3l11 5.5v15L16 29 5 23.5Z" />
          <path d="m5 8.5 11 6 11-6M16 14.5V29" />
          <circle cx="16" cy="14.5" r="2.25" />
        </svg>
      </span>
      <span className="signup-brand-copy">
        <strong>{SITE.name}</strong>
        <small>{NAV_COPY.productLabel}</small>
      </span>
    </Link>
  )
}
