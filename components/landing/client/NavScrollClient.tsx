"use client"

import { useScrollPosition } from "@/hooks/use-scroll-position"
type NavScrollClientProps = {
  children: React.ReactNode
  overlay?: boolean
}

/**
 * N10 scroll-morph: full-bleed on top; denser floating surface after scroll.
 * data-scrolled drives child styles via group-data selectors.
 */
export function NavScrollClient({
  children,
  overlay = false,
}: NavScrollClientProps) {
  const scrolled = useScrollPosition(20)

  return (
    <header
      data-scrolled={scrolled ? "true" : "false"}
      data-overlay={overlay ? "true" : "false"}
      className="landing-nav-host"
    >
      <div className="landing-nav-frame">{children}</div>
    </header>
  )
}
