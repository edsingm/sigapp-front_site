"use client"

import { useEffect } from "react"

// Listener global único: atualiza --spot-x/--spot-y dos .card-bezel próximos
// ao cursor para iluminar a moldura (ver .card-bezel::after em globals.css).
// Sem JS o efeito simplesmente não ocorre — progressivo por construção.
export function BezelSpotlight() {
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return

    let raf = 0
    const onMove = (e: PointerEvent) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        document.querySelectorAll<HTMLElement>(".card-bezel").forEach((el) => {
          const rect = el.getBoundingClientRect()
          if (
            e.clientX < rect.left - 80 ||
            e.clientX > rect.right + 80 ||
            e.clientY < rect.top - 80 ||
            e.clientY > rect.bottom + 80
          ) {
            return
          }
          el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`)
          el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`)
        })
      })
    }

    document.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      document.removeEventListener("pointermove", onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return null
}
