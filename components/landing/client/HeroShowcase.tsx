"use client"

import { useEffect, useRef } from "react"

import { DashboardPreviewMock } from "@/components/landing/mocks/DashboardPreviewMock"

// Vitrine flutuante do produto no hero (apenas lg+). Aplica parallax sutil
// ao mover o mouse, gravando --px/--py no root. Respeita reduced-motion.
export function HeroShowcase() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (window.matchMedia("(max-width: 1023px)").matches) return

    let raf = 0
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.setProperty(
          "--px",
          (e.clientX / window.innerWidth - 0.5).toFixed(3)
        )
        el.style.setProperty(
          "--py",
          (e.clientY / window.innerHeight - 0.5).toFixed(3)
        )
      })
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden lg:block"
    >
      <div ref={ref} className="hero-mock-pos">
        <div className="hero-mock-glow" />
        <div className="hero-mock-float">
          <div className="hero-mock-tilt">
            <DashboardPreviewMock />
          </div>
        </div>
      </div>
    </div>
  )
}
