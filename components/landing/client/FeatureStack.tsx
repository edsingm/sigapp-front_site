"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

type Props = {
  className?: string
  children: React.ReactNode
}

/** Desktop sticky stack: previous cards recess (scale/opacity) as the next one covers them. */
export function FeatureStack({ className, children }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const desktop = window.matchMedia("(min-width: 1024px)")
    const layers = Array.from(
      root.querySelectorAll<HTMLElement>("[data-feature-layer]")
    )

    if (layers.length === 0) return

    let ticking = false

    const clearProgress = () => {
      layers.forEach((layer) => {
        layer.style.removeProperty("--stack-progress")
        layer.classList.remove("is-recessed")
      })
    }

    const update = () => {
      ticking = false

      if (reduceMotion.matches || !desktop.matches) {
        clearProgress()
        return
      }

      layers.forEach((layer, index) => {
        if (index === layers.length - 1) {
          layer.style.setProperty("--stack-progress", "0")
          layer.classList.remove("is-recessed")
          return
        }

        const next = layers[index + 1]
        const currentTop = layer.getBoundingClientRect().top
        const nextTop = next.getBoundingClientRect().top
        const gap = nextTop - currentTop

        // Start recessing when the next layer approaches; full cover near sticky overlap.
        const start = 180
        const end = 28
        const progress = Math.min(1, Math.max(0, (start - gap) / (start - end)))

        layer.style.setProperty("--stack-progress", progress.toFixed(3))
        layer.classList.toggle("is-recessed", progress > 0.4)
      })
    }

    const onScrollOrResize = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    root.classList.add("is-stack-ready")
    update()

    window.addEventListener("scroll", onScrollOrResize, { passive: true })
    window.addEventListener("resize", onScrollOrResize, { passive: true })
    reduceMotion.addEventListener("change", onScrollOrResize)
    desktop.addEventListener("change", onScrollOrResize)

    return () => {
      root.classList.remove("is-stack-ready")
      clearProgress()
      window.removeEventListener("scroll", onScrollOrResize)
      window.removeEventListener("resize", onScrollOrResize)
      reduceMotion.removeEventListener("change", onScrollOrResize)
      desktop.removeEventListener("change", onScrollOrResize)
    }
  }, [])

  return (
    <div ref={ref} className={cn("feature-layers", className)}>
      {children}
    </div>
  )
}
